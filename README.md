# DigiSky Portfolio — Redesigned

A fresh, clean redesign of the DigiSky agency portfolio. All 34 projects and their live links are unchanged.

## What changed in this redesign
- New visual identity: Fraunces (headline serif) + Inter (body), a calmer paper background, and the brand green used only as an accent — not everywhere.
- Hero now shows real screenshots from 3 of your own projects instead of a fake illustrated mockup, plus a scrolling strip of all 34 client names as social proof.
- Cleaner project grid, simplified pricing card, a "What we do" section (no fake numbering, since services aren't a sequence), and a redesigned footer with your Instagram link.
- `/admin` is now behind a password screen.

## Admin panel
Open `yourdomain.com/admin`.
- **Password:** `digisky2026` — change this any time by asking your developer to update the `ADMIN_PASSWORD` value in `src/main.jsx`.
- Changes made in `/admin` are saved to the shared Supabase `site_content` row and are loaded by the public website on refresh.

### One-time Supabase setup
1. Open the Supabase project connected in `.env`.
2. Open **SQL Editor** and run the contents of `supabase-schema.sql`.
3. Apply `supabase/migrations/20261002230000_project_thumbnail_metadata.sql` in the **SQL Editor**, or install the Supabase CLI and run `supabase login`, `supabase link --project-ref YOUR_PROJECT_REF`, then `supabase db push`.
4. Deploy the thumbnail Edge Function with `supabase functions deploy project-thumbnail` after linking the CLI.
5. Commit and deploy the web app with the commands below.

Project records remain in the existing `site_content.content` JSONB data; the migration adds `thumbnail_url` and `thumbnail_source` to each project without replacing or deleting project data. When an automatic thumbnail is missing, the Edge Function generates a screenshot, stores the image in the public `project-thumbnails` bucket, and saves its permanent public URL. Manual thumbnail URLs and uploaded images are marked `manual` and cannot be overwritten by automatic generation. The Supabase service-role key is read only by the Edge Function runtime and must never be added to the frontend `.env`.

The app keeps a local browser fallback if the database is temporarily unavailable. The current password gate is client-side only; use Supabase Auth and server-side policies before treating this as a security boundary for sensitive content.

## Run locally
```bash
npm install
npm run dev
```

## Deploy
This project is already set up for Vercel (see `vercel.json`, which routes `/admin` correctly). If you already have this connected to Vercel, just replace the old project files with these and redeploy the same way you did before — no new hosting or account needed.

If you're not sure how, the easiest path:
1. Run `npm run build` (or use the pre-built `dist` folder already included).
2. Upload the contents of `dist/` to your existing host, or drag-and-drop the `dist` folder into Vercel's dashboard.

## Thumbnail note
Portfolio cards render `thumbnail_url` from Supabase, with the existing generated preview as a fallback. Automatic screenshots are copied into Supabase Storage so the public site does not depend on expiring screenshot-provider URLs. In **Admin → Projects**, enter a thumbnail URL or upload an image, then choose **Save**. Choose **Use Automatic Thumbnail** to regenerate from the project's website URL, or **Regenerate Thumbnail** to refresh an existing automatic screenshot.
