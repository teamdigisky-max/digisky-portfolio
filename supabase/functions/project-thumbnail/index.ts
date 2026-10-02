import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const bucket = "project-thumbnails";
const maxImageBytes = 5 * 1024 * 1024;

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function parsePublicWebsiteUrl(value: unknown) {
  if (typeof value !== "string") throw new Error("Project website URL is missing.");
  const url = new URL(value);
  const hostname = url.hostname.toLowerCase();
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    !hostname.includes(".") ||
    hostname === "localhost" ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal") ||
    hostname.startsWith("[") ||
    /^\d{1,3}(?:\.\d{1,3}){3}$/.test(hostname)
  ) {
    throw new Error("Project URL must be a public HTTP or HTTPS website.");
  }
  return url;
}

async function fetchScreenshot(websiteUrl: URL) {
  const encodedUrl = encodeURIComponent(websiteUrl.href);
  const screenshotUrls = [
    `https://image.thum.io/get/width/1200/crop/760/noanimate/${websiteUrl.href}`,
    `https://api.microlink.io/?url=${encodedUrl}&screenshot=true&meta=false&embed=screenshot.url`,
  ];
  const failures: string[] = [];

  for (const screenshotUrl of screenshotUrls) {
    try {
      const response = await fetch(screenshotUrl, {
        signal: AbortSignal.timeout(35_000),
        headers: { Accept: "image/*" },
      });
      if (!response.ok) throw new Error(`Screenshot service returned HTTP ${response.status}.`);
      const contentType = response.headers.get("content-type")?.split(";")[0].trim() || "";
      if (!contentType.startsWith("image/")) throw new Error("Screenshot service did not return an image.");
      const declaredLength = Number(response.headers.get("content-length") || 0);
      if (declaredLength > maxImageBytes) throw new Error("Generated screenshot exceeds 5 MB.");
      const image = new Uint8Array(await response.arrayBuffer());
      if (!image.length || image.length > maxImageBytes) throw new Error("Generated screenshot is empty or exceeds 5 MB.");
      return { image, contentType };
    } catch (error) {
      failures.push(error instanceof Error ? error.message : String(error));
    }
  }
  throw new Error(`All screenshot providers failed: ${failures.join(" ")}`);
}

function extensionFor(contentType: string) {
  if (contentType === "image/jpeg" || contentType === "image/jpg") return "jpg";
  if (contentType === "image/webp") return "webp";
  return "png";
}

Deno.serve(async request => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed." }, 405);

  try {
    const { projectId, force = false, useAutomatic = false } = await request.json();
    if (typeof projectId !== "string" || !projectId.trim() || projectId.length > 128) {
      return jsonResponse({ error: "A valid project ID is required." }, 400);
    }
    if (typeof force !== "boolean" || typeof useAutomatic !== "boolean" || (useAutomatic && !force)) {
      return jsonResponse({ error: "Invalid thumbnail generation options." }, 400);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) throw new Error("Supabase server environment is not configured.");

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data: contentRow, error: readError } = await supabase
      .from("site_content")
      .select("content")
      .eq("id", "homepage")
      .maybeSingle();
    if (readError) throw readError;

    const projects = Array.isArray(contentRow?.content?.projects) ? contentRow.content.projects : [];
    const project = projects.find((item: Record<string, unknown>) => String(item.id) === projectId);
    if (!project) return jsonResponse({ error: "Project was not found in homepage content." }, 404);

    const currentUrl = typeof project.thumbnail_url === "string" ? project.thumbnail_url : "";
    if (project.thumbnail_source === "manual" && !useAutomatic) {
      return jsonResponse({ thumbnail_url: currentUrl, thumbnail_source: "manual", skipped: true });
    }
    if (currentUrl && !force) {
      return jsonResponse({ thumbnail_url: currentUrl, thumbnail_source: "automatic", cached: true });
    }

    const websiteUrl = parsePublicWebsiteUrl(project.url);
    const { image, contentType } = await fetchScreenshot(websiteUrl);
    const extension = extensionFor(contentType);
    const safeProjectId = projectId.replace(/[^a-zA-Z0-9_-]/g, "_");
    const storagePath = `automatic/${safeProjectId}-${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from(bucket).upload(
      storagePath,
      new Blob([image], { type: contentType }),
      {
        cacheControl: "31536000",
        contentType,
        upsert: true,
      },
    );
    if (uploadError) throw uploadError;

    const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(storagePath);
    const thumbnailUrl = publicData.publicUrl;
    const { data: saved, error: saveError } = await supabase.rpc("save_automatic_project_thumbnail", {
      p_project_id: projectId,
      p_thumbnail_url: thumbnailUrl,
      p_allow_manual_override: useAutomatic,
      p_expected_thumbnail_url: currentUrl,
      p_expected_project_url: String(project.url),
    });
    if (saveError) throw saveError;
    if (!saved) {
      const { data: latestRow, error: latestError } = await supabase
        .from("site_content")
        .select("content")
        .eq("id", "homepage")
        .maybeSingle();
      if (latestError) throw latestError;
      const latestProjects = Array.isArray(latestRow?.content?.projects) ? latestRow.content.projects : [];
      const latestProject = latestProjects.find((item: Record<string, unknown>) => String(item.id) === projectId);
      if (latestProject?.thumbnail_source === "manual" && typeof latestProject.thumbnail_url === "string") {
        return jsonResponse({
          thumbnail_url: latestProject.thumbnail_url,
          thumbnail_source: "manual",
          skipped: true,
        });
      }
      throw new Error("Project changed while its thumbnail was being saved. Please retry.");
    }

    return jsonResponse({ thumbnail_url: thumbnailUrl, thumbnail_source: "automatic" });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("project-thumbnail failed:", message);
    return jsonResponse({ error: message }, 500);
  }
});
