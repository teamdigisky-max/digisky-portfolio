import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { supabase } from "./lib/supabase";

const ADMIN_PASSWORD = "digisky2026";

const DEFAULT_DATA = {
  brand: { name: "DigiSky", tagline: "Step Up Digitally", email: "team.digisky@gmail.com", whatsapp: "+919753622101", instagram: "https://www.instagram.com/digisky.world/" },
  hero: { trustItems: ["Website development", "Shopify & e-commerce", "Conversion-focused marketing"], kicker: "SHOPIFY & WORDPRESS STUDIO", titleA: "Shopify Stores", titleB: "Built To", titleC: "Sell.", description: "We design, build and optimise high-converting Shopify stores for ambitious brands — from strategy and UX to launch and growth.", images: ["", "", ""] },
  stats: [["31+", "Projects Delivered"], ["20+", "Happy Clients"], ["4.9/5", "Client Satisfaction"], ["2x", "Average Growth"]],
  pricing: { title: "Shopify Website", price: "\u20B97,500", description: "A polished Shopify storefront designed, configured and made ready to launch — without needing a premium theme.", features: ["Custom homepage design", "Mobile responsive layout", "Product & collection setup", "Navigation, pages & basic policies", "Payment / shipping setup assistance", "Basic SEO structure", "Launch-ready testing"] },
  projects: [{"id": 1, "name": "Aaysa", "industry": "E-commerce", "platform": "Shopify", "description": "E-commerce website designed for a polished, conversion-focused digital experience.", "url": "https://aaysa.store", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://aaysa.store"}, {"id": 2, "name": "Bonglooms", "industry": "Textiles & Fashion", "platform": "Shopify", "description": "Textiles & Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://bonglooms.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://bonglooms.com"}, {"id": 3, "name": "Tattva Elixir", "industry": "Beauty & Wellness", "platform": "Shopify", "description": "Beauty & Wellness website designed for a polished, conversion-focused digital experience.", "url": "https://www.tattvaelixir.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.tattvaelixir.com"}, {"id": 4, "name": "Miraza", "industry": "Fashion E-commerce", "platform": "Shopify", "description": "Fashion E-commerce website designed for a polished, conversion-focused digital experience.", "url": "https://miraza.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://miraza.in"}, {"id": 5, "name": "Popout Fashion", "industry": "Fashion Brand", "platform": "Shopify", "description": "Fashion Brand website designed for a polished, conversion-focused digital experience.", "url": "https://popoutfashion.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://popoutfashion.com"}, {"id": 6, "name": "Presquo", "industry": "Premium Brand", "platform": "Shopify", "description": "Premium Brand website designed for a polished, conversion-focused digital experience.", "url": "https://presquo.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://presquo.com"}, {"id": 7, "name": "Dr Aroras", "industry": "Healthcare", "platform": "Website Development", "description": "Healthcare website designed for a polished, conversion-focused digital experience.", "url": "https://www.draroras.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.draroras.com"}, {"id": 8, "name": "Tota Cart", "industry": "E-commerce", "platform": "E-commerce", "description": "E-commerce website designed for a polished, conversion-focused digital experience.", "url": "https://totacart.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://totacart.in"}, {"id": 9, "name": "Nitarya", "industry": "Fashion", "platform": "Shopify", "description": "Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://nitarya.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://nitarya.com"}, {"id": 10, "name": "Take A Chef", "industry": "Hospitality", "platform": "Website", "description": "Hospitality website designed for a polished, conversion-focused digital experience.", "url": "https://www.takeachef.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.takeachef.com"}, {"id": 11, "name": "Paivi", "industry": "Fashion", "platform": "Shopify", "description": "Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://www.paivi.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.paivi.in"}, {"id": 12, "name": "Maestra Jewellery", "industry": "Luxury Jewellery", "platform": "E-commerce", "description": "Luxury Jewellery website designed for a polished, conversion-focused digital experience.", "url": "https://maestrajewellery.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://maestrajewellery.com"}, {"id": 13, "name": "Equitia", "industry": "Lifestyle", "platform": "Shopify", "description": "Lifestyle website designed for a polished, conversion-focused digital experience.", "url": "https://www.equitia.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.equitia.in"}, {"id": 14, "name": "The House of Eraya", "industry": "Fashion", "platform": "Shopify", "description": "Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://www.thehouseoferaya.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.thehouseoferaya.in"}, {"id": 15, "name": "The Green Ritual", "industry": "Wellness", "platform": "Shopify", "description": "Wellness website designed for a polished, conversion-focused digital experience.", "url": "https://thegreenritual.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://thegreenritual.com"}, {"id": 16, "name": "Krinks", "industry": "Fashion", "platform": "Shopify", "description": "Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://krinks.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://krinks.in"}, {"id": 17, "name": "Acharima Delights", "industry": "Food & Delights", "platform": "E-commerce", "description": "Food & Delights website designed for a polished, conversion-focused digital experience.", "url": "https://acharimaadelights.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://acharimaadelights.com"}, {"id": 18, "name": "RP Paris", "industry": "Luxury Fashion", "platform": "Shopify", "description": "Luxury Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://www.rpparis.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.rpparis.com"}, {"id": 19, "name": "Munchlet", "industry": "Food & Beverage", "platform": "E-commerce", "description": "Food & Beverage website designed for a polished, conversion-focused digital experience.", "url": "https://www.munchlet.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.munchlet.com"}, {"id": 20, "name": "Inkwalkers", "industry": "Art & Creative", "platform": "Website", "description": "Art & Creative website designed for a polished, conversion-focused digital experience.", "url": "https://inkwalkers.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://inkwalkers.com"}, {"id": 21, "name": "Tiara Skin", "industry": "Skincare", "platform": "Shopify", "description": "Skincare website designed for a polished, conversion-focused digital experience.", "url": "https://tiara.skin", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://tiara.skin"}, {"id": 22, "name": "The Premium Basket", "industry": "Premium E-commerce", "platform": "Shopify", "description": "Premium E-commerce website designed for a polished, conversion-focused digital experience.", "url": "https://thepremiumbasket.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://thepremiumbasket.com"}, {"id": 23, "name": "Haus of Jawhar", "industry": "Luxury Fashion", "platform": "Shopify", "description": "Luxury Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://hausofjawhar.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://hausofjawhar.com"}, {"id": 24, "name": "Pancha Bhootani", "industry": "Wellness", "platform": "Shopify", "description": "Wellness website designed for a polished, conversion-focused digital experience.", "url": "https://panchabhootani.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://panchabhootani.com"}, {"id": 25, "name": "Bevy Good", "industry": "Lifestyle", "platform": "Shopify", "description": "Lifestyle website designed for a polished, conversion-focused digital experience.", "url": "https://www.bevygood.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.bevygood.com"}, {"id": 26, "name": "Innocent Fresh", "industry": "Food & Beverage", "platform": "E-commerce", "description": "Food & Beverage website designed for a polished, conversion-focused digital experience.", "url": "https://www.innocentfresh.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.innocentfresh.com"}, {"id": 27, "name": "Rare Blanc", "industry": "Premium Brand", "platform": "Shopify", "description": "Premium Brand website designed for a polished, conversion-focused digital experience.", "url": "https://www.rareblanc.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.rareblanc.com"}, {"id": 28, "name": "Uzvieco Store", "industry": "Lifestyle", "platform": "Shopify", "description": "Lifestyle website designed for a polished, conversion-focused digital experience.", "url": "https://uzviecostore.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://uzviecostore.com"}, {"id": 29, "name": "Alpino Super One", "industry": "Sports & Wellness", "platform": "Shopify", "description": "Sports & Wellness website designed for a polished, conversion-focused digital experience.", "url": "https://alpinosuperone.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://alpinosuperone.com"}, {"id": 30, "name": "The Skin Depth", "industry": "Skincare", "platform": "Shopify", "description": "Skincare website designed for a polished, conversion-focused digital experience.", "url": "https://www.theskindepth.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.theskindepth.com"}, {"id": 31, "name": "Guapha", "industry": "E-commerce", "platform": "E-commerce", "description": "E-commerce website designed for a polished, conversion-focused digital experience.", "url": "https://www.guapha.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.guapha.com"}, {"id": 32, "name": "Swasth Setu", "industry": "Healthcare", "platform": "Website", "description": "Healthcare website designed for a polished, conversion-focused digital experience.", "url": "https://swasthsetu.co.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://swasthsetu.co.in"}, {"id": 33, "name": "Drinkyasu", "industry": "Beverage", "platform": "Shopify", "description": "Beverage website designed for a polished, conversion-focused digital experience.", "url": "https://drinkyasu.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://drinkyasu.com"}, {"id": 34, "name": "Planto Store", "industry": "Plant Store", "platform": "Shopify", "description": "Plant Store website designed for a polished, conversion-focused digital experience.", "url": "https://www.plantostore.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.plantostore.com"}],
  categories: ["All", "E-commerce", "Business", "Fashion", "Healthcare", "Food & Beverage", "Lifestyle", "Other"],
  services: [["Shopify stores", "Custom-built storefronts for brands ready to sell more, without a generic theme feel."], ["WordPress websites", "Flexible, content-friendly websites designed around how your business actually runs."], ["Custom development", "High-performance digital experiences built from scratch, without platform limitations."], ["Website redesigns", "Transform an outdated website into a premium, conversion-ready digital experience."]],
  featured: { title: "Design that does the selling.", description: "Every screen has a job — build trust, explain the offer, remove friction and make the next click obvious.", quoteBefore: "We don't ship templates. Every store is built around", quoteHighlight: "what the brand actually sells", quoteAfter: "and how people actually buy it.", metaTitle: "DigiSky Studio", metaText: "34 stores designed & shipped since launch" },
  about: { titleA: "Small studio.", titleB: "Big digital thinking.", text: "DigiSky is a creative digital studio focused on building modern websites and e-commerce experiences for ambitious brands. We combine strategy, design and development to create websites that don't just look premium — they perform.", points: ["Senior-level thinking on every project", "Built for speed, clarity and conversion", "A partner after launch, not just before"] },
  trust: { eyebrow: "Trusted by growing brands", names: ["Aaysa", "Bonglooms", "Tattva Elixir", "Miraza", "Popout", "Presquo"] },
  features: [["01", "Premium by default", "Thoughtful details, clear hierarchy and a visual system made to earn trust."], ["02", "Built to perform", "Fast, responsive experiences that make it easy for the right people to take action."], ["03", "A real partner", "Direct collaboration, honest advice and support that continues beyond launch."]],
  process: [["01", "Discover", "We learn the business, audience and opportunity."], ["02", "Shape", "We turn the brief into a focused digital direction."], ["03", "Design", "We create a distinctive system your brand can own."], ["04", "Build", "We develop, test and polish every interaction."], ["05", "Launch", "We go live with clarity and a plan for growth."]],
  testimonials: [{ name: "Aaysa team", company: "Aaysa", quote: "DigiSky turned a rough idea into a store that finally feels like our brand.", rating: 5 }],
  blog: [{ title: "What makes a storefront feel premium?", category: "Perspective", date: "2026-02-12", excerpt: "The details that turn a website visit into confidence, and confidence into a sale." }],
  cta: { title: "Have a project in mind?", text: "Let's build something people remember.", button: "Start a project" },
  marqueeItems: ["SHOPIFY", "WEB DEVELOPMENT", "META ADS", "GOOGLE ADS", "AI AUTOMATION", "SEO + CRO", "AD CREATIVES", "CUSTOM CODE"],
  proof: { tag: "The numbers don't lie", title: "Big builds. Bigger results.", description: "From Shopify storefronts to custom-coded experiences, the work speaks for itself — and every number is a piece of that story.", labels: ["Projects delivered", "Shopify builds", "Custom-coded", "Client satisfaction"], values: ["34+", "20+", "Custom", "100%"] },
  growthServices: [
    ["META ADS", "Performance campaigns built around the offer, audience and landing experience."],
    ["GOOGLE ADS", "Search and intent-led campaigns designed to turn demand into qualified leads."],
    ["AI AUTOMATION", "Smarter workflows that reduce repetitive work and keep customer journeys moving."],
    ["AD CREATIVES", "Scroll-stopping static, UGC and short-form creative for modern campaigns."],
    ["SEO + CRO", "Technical foundations and conversion improvements that help more visitors become customers."],
    ["SOCIAL MEDIA", "A consistent content system that keeps your brand visible, useful and memorable."]
  ],
  shopify: {
    titleA: "Built for brands", titleB: "that want to sell more.", description: "From a clean Shopify storefront to a fully custom-coded experience, DigiSky builds around the business — not around a template.",
    points: [
      ["Shopify store design", "Premium storefronts designed around the brand, customer journey and product."],
      ["Custom Shopify development", "Sections, interactions and functionality built beyond the limits of a basic theme."],
      ["Custom coded websites", "When Shopify is not the right fit, we build the experience from the ground up."],
      ["Conversion-focused UX", "Navigation, product pages and checkout journeys shaped around customer intent."]
    ]
  },
  why: {
    tag: "WHY DIGISKY?", subtitle: "Flip the switch. See the difference.", digiTitle: "Your brand on DigiSky.", otherTitle: "Your brand without the usual friction.", digiEmoji: "🤩", otherEmoji: "🤯", digiStatus: "Built to move.", otherStatus: "Still figuring it out…",
    digi: [["Strategy tied to the next click", "Every section has a job — explain, build trust or move the visitor forward."],["Design made around your brand", "A distinctive visual system built around your offer, audience and products."],["Design + development together", "One team keeps the experience consistent from first screen to final interaction."],["Built for speed and growth", "Clean structure, responsive interactions and a foundation ready for the next stage."],["Support beyond launch", "We stay close when you need improvements, fixes, new pages or growth experiments."]],
    other: [["Strategy without a clear conversion path", "Looks polished, but the next action is often unclear."],["Template-first experiences", "The brand gets adjusted to the template instead of the other way around."],["Slow handoffs", "Too many layers between the idea, design and final build."],["One-size-fits-all packages", "The same process is applied even when the business needs something different."],["Launch and disappear", "The project ends at launch instead of improving after real users arrive."]]
  },
  footer: { eyebrow: "DIGITAL PARTNERS FOR MODERN BRANDS", titleA: "Step Up Your", titleB: "Digital Presence", text: "From Shopify stores and e-commerce websites to high-converting websites and digital growth, DigiSky helps brands build a stronger presence online." }
};

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem("digisky_data") || "null");
    if (!saved) return DEFAULT_DATA;
    const merged = {
      ...DEFAULT_DATA,
      ...saved,
      brand: { ...DEFAULT_DATA.brand, ...(saved.brand || {}) },
      hero: { ...DEFAULT_DATA.hero, ...(saved.hero || {}) },
      featured: { ...DEFAULT_DATA.featured, ...(saved.featured || {}) },
      pricing: { ...DEFAULT_DATA.pricing, ...(saved.pricing || {}) },
      about: { ...DEFAULT_DATA.about, ...(saved.about || {}) },
      trust: { ...DEFAULT_DATA.trust, ...(saved.trust || {}) },
      cta: { ...DEFAULT_DATA.cta, ...(saved.cta || {}) },
      proof: { ...DEFAULT_DATA.proof, ...(saved.proof || {}) },
      shopify: { ...DEFAULT_DATA.shopify, ...(saved.shopify || {}) },
      why: { ...DEFAULT_DATA.why, ...(saved.why || {}) },
      footer: { ...DEFAULT_DATA.footer, ...(saved.footer || {}) },
      marqueeItems: Array.isArray(saved.marqueeItems) && saved.marqueeItems.length ? saved.marqueeItems : DEFAULT_DATA.marqueeItems,
      growthServices: Array.isArray(saved.growthServices) && saved.growthServices.length ? saved.growthServices : DEFAULT_DATA.growthServices,
      categories: (Array.isArray(saved.categories) && saved.categories.length ? saved.categories : DEFAULT_DATA.categories).filter(category => category !== "E-commerce"),
    };
    merged.hero.images = Array.isArray(saved.hero?.images) ? saved.hero.images.slice(0, 3).concat(["", "", ""]).slice(0, 3) : [saved.hero?.image || "", "", ""];
    const savedProjects = Array.isArray(saved.projects) ? saved.projects : [];
    const byName = new Map(savedProjects.map(p => [String(p.name || "").trim().toLowerCase(), p]));
    const mappedDefaults = DEFAULT_DATA.projects.map((p, index) => {
      const old = byName.get(p.name.toLowerCase());
      const safeProject = { ...p, ...(old || {}), id: old?.id ?? p.id };
      const cleanedImage = safeProject.image || makeThumb(safeProject, index);
      return { ...safeProject, image: cleanedImage };
    });
    const defaultNames = new Set(DEFAULT_DATA.projects.map(p => p.name.toLowerCase()));
    const custom = savedProjects.filter(p => !defaultNames.has(String(p.name || "").trim().toLowerCase())).map((p, index) => ({
      ...p,
      image: p.image || makeThumb(p, index + DEFAULT_DATA.projects.length),
    }));
    merged.projects = [...mappedDefaults, ...custom];
    return merged;
  } catch {
    return DEFAULT_DATA;
  }
}

async function saveData(data) {
  localStorage.setItem("digisky_data", JSON.stringify(data));
  const { error } = await supabase.from("site_content").upsert({
    id: "homepage",
    content: data,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}

const THUMBNAIL_BUCKET = "project-thumbnails";

async function uploadThumbnail(file, projectId, folder = "projects") {
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");
  if (file.size > 5 * 1024 * 1024) throw new Error("Thumbnail images must be 5 MB or smaller.");
  const filename = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
  const path = `${folder}/${projectId}-${Date.now()}-${filename}`;
  const { error } = await supabase.storage.from(THUMBNAIL_BUCKET).upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(THUMBNAIL_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

async function fetchRemoteData() {
  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("id", "homepage")
    .maybeSingle();
  if (error) throw error;
  return data?.content || null;
}

function waLink(number, message) {
  const clean = (number || "").replace(/[^\d]/g, "");
  return clean ? `https://wa.me/${clean}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`;
}

function projectCategory(project) {
  if (project.category && project.category !== "E-commerce") return project.category;
  const text = `${project.industry || ""} ${project.name || ""}`.toLowerCase();
  if (/fashion|textile|jewellery|jewelry|apparel/.test(text)) return "Fashion";
  if (/beauty|wellness|skin|elixir|lifestyle|cosmetic|personal care/.test(text)) return "Lifestyle";
  if (/health|doctor|clinic|medical|dental|care/.test(text)) return "Healthcare";
  if (/food|chef|restaurant|cafe|grocery|drink|delight/.test(text)) return "Food & Beverage";
  if (/shopify|e-commerce|ecommerce|store|retail/.test(`${text} ${project.platform || ""}`.toLowerCase())) return "E-commerce";
  if (/business|agency|brand|startup|services/.test(text)) return "Business";
  return "Other";
}

function Arrow() { return null; }

function LockIcon() {
  return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="5" y="10.5" width="14" height="10" rx="2.4" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>;
}

function CtaArrow() {
  return <svg className="cta-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5 19 19 5M19 5H9M19 5V15" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}

function CheckIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity=".12"/>
    <path d="m7.5 12.5 3 3 6-6.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}

function InstagramIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/>
  </svg>;
}

function LinkedInIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M6.4 8.1H3.2V20h3.2V8.1ZM4.8 3A1.9 1.9 0 1 0 4.8 6.8 1.9 1.9 0 0 0 4.8 3ZM20.8 13.2c0-3.6-1.9-5.3-4.5-5.3-2.1 0-3 .9-3.5 1.6V8.1H9.6V20h3.2v-5.9c0-1.6.3-3.2 2.3-3.2 2 0 2 1.9 2 3.3V20h3.2l.5-6.8Z"/>
  </svg>;
}

function GitHubIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2.5a9.6 9.6 0 0 0-3 18.72c.48.09.65-.2.65-.46v-1.7c-2.65.58-3.21-1.13-3.21-1.13-.43-1.1-1.06-1.4-1.06-1.4-.87-.6.07-.59.07-.59.96.07 1.47.99 1.47.99.86 1.47 2.26 1.05 2.81.8.09-.62.34-1.05.61-1.29-2.12-.24-4.35-1.06-4.35-4.72 0-1.04.37-1.9.98-2.57-.1-.24-.42-1.22.09-2.54 0 0 .8-.26 2.63.98A9.2 9.2 0 0 1 12 7.27c.8 0 1.61.11 2.36.32 1.83-1.24 2.63-.98 2.63-.98.51 1.32.19 2.3.09 2.54.61.67.98 1.53.98 2.57 0 3.67-2.24 4.47-4.37 4.71.35.3.65.87.65 1.76v2.61c0 .26.17.56.66.46A9.6 9.6 0 0 0 12 2.5Z"/>
  </svg>;
}

function CodeBackground() {
  const snippets = [
    { text: "</>", x: "7%", y: "16%", size: "22px", delay: "0s" },
    { text: "{ }", x: "88%", y: "12%", size: "20px", delay: "2s" },
    { text: "01", x: "12%", y: "68%", size: "14px", delay: "4s" },
    { text: "=>", x: "92%", y: "56%", size: "18px", delay: "1s" },
    { text: "const", x: "4%", y: "43%", size: "12px", delay: "3s" },
    { text: "npm", x: "82%", y: "78%", size: "12px", delay: "5s" },
    { text: "git push", x: "16%", y: "88%", size: "11px", delay: "2.5s" },
    { text: "<div>", x: "74%", y: "34%", size: "11px", delay: "1.5s" },
    { text: "Shopify", x: "86%", y: "90%", size: "11px", delay: "4.5s" },
    { text: "0101", x: "25%", y: "12%", size: "10px", delay: "3.5s" }
  ];

  return (
    <div className="code-background" aria-hidden="true">
      {snippets.map((item, index) => (
        <span key={index} className="code-float" style={{ left: item.x, top: item.y, fontSize: item.size, animationDelay: item.delay }}>
          {item.text}
        </span>
      ))}
    </div>
  );
}

function AmbientCanvas() {
  const canvasRef = React.useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = canvas.getContext("2d");
    const pointer = { x: 0, y: 0, active: false };
    let frameId;
    let width = 0;
    let height = 0;
    const particles = Array.from({ length: 34 }, (_, index) => ({
      x: Math.random(), y: Math.random(),
      size: 1 + Math.random() * 2.5,
      speed: 0.00008 + Math.random() * 0.00016,
      phase: index * 0.7,
    }));
    const resize = () => {
      const bounds = canvas.parentElement.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width; height = bounds.height;
      canvas.width = width * ratio; canvas.height = height * ratio;
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const move = event => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left; pointer.y = event.clientY - bounds.top; pointer.active = true;
    };
    const draw = time => {
      context.clearRect(0, 0, width, height);
      const glow = context.createRadialGradient(width * .68, height * .42, 0, width * .68, height * .42, width * .55);
      glow.addColorStop(0, "rgba(34,139,34,.14)"); glow.addColorStop(1, "rgba(34,139,34,0)");
      context.fillStyle = glow; context.fillRect(0, 0, width, height);
      particles.forEach(particle => {
        const x = particle.x * width + Math.sin(time * particle.speed + particle.phase) * 26;
        const y = ((particle.y + time * particle.speed * .18) % 1) * height;
        const dx = pointer.active ? pointer.x - x : 0;
        const dy = pointer.active ? pointer.y - y : 0;
        const distance = Math.max(80, Math.hypot(dx, dy));
        const nudge = pointer.active ? Math.max(0, 1 - distance / 260) : 0;
        context.beginPath(); context.arc(x - dx * nudge * .05, y - dy * nudge * .05, particle.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(34,139,34,${.12 + nudge * .2})`; context.fill();
      });
      frameId = requestAnimationFrame(draw);
    };
    resize(); window.addEventListener("resize", resize); canvas.addEventListener("pointermove", move); canvas.addEventListener("pointerleave", () => { pointer.active = false; });
    frameId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frameId); window.removeEventListener("resize", resize); canvas.removeEventListener("pointermove", move); };
  }, []);
  return <canvas className="ambient-canvas" ref={canvasRef} aria-hidden="true"/>;
}

function Header({ data }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const navigate = id => { go(id); setMenuOpen(false); };
  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="scroll-progress-track"><div className="scroll-progress-bar" style={{ width: `${scrollPct}%` }} /></div>
      <div className="site-header-in">
        <a className="brand" href="#top" onClick={(e)=>{e.preventDefault(); go("top")}}>
          <span className="term-dots" aria-hidden="true"><i/><i/><i/></span>
          <img src="/logo.png" alt="DigiSky logo" />
          <span>{data.brand.name}</span>
        </a>
        <nav className={menuOpen ? "open" : ""}>
          <button onClick={()=>navigate("top")}>Home</button>
          <button onClick={()=>navigate("services")}>Services</button>
          <button onClick={()=>navigate("work")}>Work</button>
          <button onClick={()=>navigate("about")}>About</button>
          <button onClick={()=>navigate("contact")}>Contact</button>
          <a className="mobile-nav-cta" href={waLink(data.brand.whatsapp, "Hi DigiSky, I want to start a project.")} target="_blank" rel="noreferrer">Start a project <CtaArrow/></a>
        </nav>
        <div className="header-actions">
          {data.brand.instagram && <a className="icon-link" href={data.brand.instagram} target="_blank" rel="noreferrer" aria-label="DigiSky on Instagram"><InstagramIcon/></a>}
          <a className="pill-button" href={waLink(data.brand.whatsapp, "Hi DigiSky, I want to start a project.")} target="_blank" rel="noreferrer">Start a project</a>
          <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={()=>setMenuOpen(v=>!v)}><span/><span/><span/></button>
        </div>
      </div>
    </header>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <button className={`back-to-top${visible ? " is-visible" : ""}`} aria-label="Back to top" onClick={()=>window.scrollTo({ top: 0, behavior: "smooth" })}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </button>;
}

function IntroSplash() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);
  if (!visible) return null;
  return <div className="intro-splash" role="status" aria-label="DigiSky Shopify specialists"><div className="splash-lockup"><div className="splash-brand-line"><strong className="splash-digisky">DigiSky</strong><span className="splash-x">×</span><img className="splash-shopify-logo" src="/shopify-icon.png" alt="Shopify"/></div><span className="splash-typing">DigiSky Shopify specialists<span className="typing-caret" aria-hidden="true"/></span></div></div>;
}

function TrustStrip({ data }) {
  return <section className="trust-strip"><div className="section trust-inner"><span>{data.trust.eyebrow}</span><div>{data.trust.names.map(name=><strong key={name}>{name}</strong>)}</div></div></section>;
}

function AboutSection({ data }) {
  return <section id="about" className="about section about-redesigned">
    <div className="about-intro">
      <div><span className="tag-chip">About DigiSky</span><h2>Small studio.<br/><em>Serious digital thinking.</em></h2></div>
      <p>{data.about.text} We bring strategy, design, development and growth thinking into one focused workflow — so your website feels like a business asset, not just another project.</p>
    </div>
    <div className="about-story-grid">
      <div className="about-orbit-card">
        <div className="about-orbit"><div className="about-logo-core"><img src="/logo.png" alt="DigiSky" /></div><i>✦</i><b>01</b><strong>BUILD<br/>BETTER</strong></div>
        <div className="about-orbit-caption"><span>INDORE / INDIA</span><span>WEB • E-COMMERCE • GROWTH</span></div>
      </div>
      <div className="about-content-card">
        <div className="about-copy"><span className="mini-label">What we believe</span><h3>Clarity first. Design second. Results always.</h3><p>We start by understanding what needs to happen after someone lands on your website. Then we build the design, content and technology around that goal.</p></div>
        <div className="about-points-grid">{data.about.points.map((point,i)=><div key={point}><span>0{i+1}</span><strong>{point}</strong></div>)}</div>
        <div className="about-metrics"><div><strong><CountUpNumber value="34+"/></strong><span>projects shipped</span></div><div><strong><CountUpNumber value="20+"/></strong><span>brands worked with</span></div><div><strong>24/7</strong><span>digital mindset</span></div></div>
      </div>
    </div>
  </section>;
}
function ProcessSection({ data }) {
  return <section id="process" className="process section"><div className="section-top"><div><span className="tag-chip">How we work</span><h2>Our process.</h2></div><p className="section-copy">A clear path from first conversation to a digital experience ready to grow with you.</p></div><div className="process-grid">{data.process.map(step=><div className="process-step" key={step[0]}><span>{step[0]}</span><h3>{step[1]}</h3><p>{step[2]}</p></div>)}</div></section>;
}

function Testimonials({ data }) {
  const stories = Array.isArray(data.testimonials) ? data.testimonials : [];
  const lead = stories[0] || { name: "DigiSky Client", company: "Brand partner", quote: "Clear communication, strong execution and a website that feels built for the business.", rating: 5 };
  const rest = stories.slice(1, 4);
  return <section id="testimonials" className="testimonials section testimonials-redesigned">
    <div className="client-notes-head">
      <div><span className="tag-chip">Client notes</span><h2>Good work.<br/><em>Good people.</em></h2></div>
      <p>Short notes from brands that trusted DigiSky with their website, store or digital growth.</p>
    </div>
    <div className="client-notes-grid">
      <article className="client-note-main">
        <div className="client-note-top"><span>CLIENT NOTE / 01</span><span className="client-stars">{"★".repeat(Number(lead.rating || 5))}</span></div>
        <blockquote>“{lead.quote}”</blockquote>
        <div className="client-note-person"><div className="client-avatar">{String(lead.name || "D").slice(0,1)}</div><div><strong>{lead.name}</strong><small>{lead.company}</small></div><span>DIGISKY PARTNER ↗</span></div>
      </article>
      <div className="client-note-list">
        {rest.map((item,index)=><article className="client-note-small" key={`${item.name}-${index}`}><span>0{index+2}</span><p>“{item.quote}”</p><div><strong>{item.name}</strong><small>{item.company}</small></div></article>)}
        {rest.length === 0 && <article className="client-note-small"><span>02</span><p>“From strategy to launch, the process stays clear and focused.”</p><div><strong>DigiSky</strong><small>Website & growth partner</small></div></article>}
      </div>
      <aside className="client-note-standard"><img src="/logo.png" alt="DigiSky"/><span>THE DIGISKY STANDARD</span><h3>Clear work.<br/><em>Clear results.</em></h3><p>Strategy, design, development and support — one focused team from first call to launch.</p><div><b>01</b> Direct communication</div><div><b>02</b> Premium execution</div><div><b>03</b> Support after launch</div></aside>
    </div>
  </section>;
}
function Journal({ data }) {
  const growthServices = Array.isArray(data.growthServices) && data.growthServices.length ? data.growthServices : [];
  const icons = ["◎","⌁","✦","◈","↗","◌","✺","＋"];
  return <section id="journal" className="journal section growth-services-section"><div className="growth-services-heading"><div><span className="tag-chip">More ways we help</span><h2>More ways to turn <em>attention into growth.</em></h2></div><p>Pick the growth layer your brand needs next. Every service is designed to work with your website, store and customer journey.</p></div><div className="growth-services-grid">{growthServices.map((service,index)=><article className={`growth-service-card growth-service-${(index % 8)+1}`} key={`${service[0]}-${index}`}><div className="growth-service-top"><span>{String(index+1).padStart(2,"0")}</span><i>↗</i></div><div className="growth-service-icon">{icons[index % icons.length]}</div><small>{service[0]}</small><h3>{service[1]}</h3><a className="growth-service-bottom" href={waLink(data.brand.whatsapp, `Hi DigiSky, I am interested in ${service[0]}. Please share the details.`)} target="_blank" rel="noreferrer"><span>EXPLORE SERVICE</span><b>→</b></a></article>)}</div></section>;
}
function ShopifyExpertise({ projects, data }) {
  const [active, setActive] = useState(0);
  const shopifyData = data.shopify || {};
  const points = Array.isArray(shopifyData.points) && shopifyData.points.length ? shopifyData.points : [
    ["Shopify store design", "Premium storefronts designed around the brand, customer journey and product."],
    ["Custom Shopify development", "Sections, interactions and functionality built beyond the limits of a basic theme."],
    ["Custom coded websites", "When Shopify is not the right fit, we build the experience from the ground up."],
    ["Conversion-focused UX", "Navigation, product pages and checkout journeys shaped around customer intent."],
  ];
  const previewProjects = [
    projects.find(project => project.platform === "Shopify") || projects[0],
    projects.find(project => /Shopify/i.test(project.platform || "") && /fashion|e-commerce/i.test(`${project.industry} ${project.name}`)) || projects[4] || projects[0],
    projects.find(project => /Website|Custom/i.test(project.platform || "")) || projects[6] || projects[0],
    projects.find(project => /Shopify/i.test(project.platform || "")) || projects[0],
  ];
  const preview = previewProjects[active] || projects[0];
  return <section id="shopify-expertise" className="shopify-expertise section shopify-redesigned">
    <div className="shopify-topline"><span className="tag-chip">Shopify expertise</span><span>SHOPIFY + CUSTOM CODE</span></div>
    <div className="shopify-heading"><div><h2>{shopifyData.titleA || "Built for brands"}<br/><em>{shopifyData.titleB || "that want to sell more."}</em></h2></div><p>{shopifyData.description || "From a clean Shopify storefront to a fully custom-coded experience, DigiSky builds around the business — not around a template."}</p></div>
    <div className="shopify-platform-pills"><span className="active">SHOPIFY</span><span>CUSTOM CODED</span><span>ECOMMERCE</span></div>
    <div className="shopify-stage">
      <div className="shopify-list">{points.map((point,index)=><button className={active === index ? "active" : ""} key={point[0]} onClick={()=>setActive(index)}><span>0{index + 1}</span><div><strong>{point[0]}</strong><small>{point[1]}</small></div><b>↗</b></button>)}</div>
      <div className="shopify-preview"><div className="preview-top"><span>digisky / digital build</span><b>● ● ●</b></div><div className="preview-screen" key={`${active}-${preview?.name || "preview"}`}><img src={preview?.image} alt={`${preview?.name || "DigiSky"} project preview`} loading="lazy"/><div><span>{active === 2 ? "Custom coded experience" : active === 1 ? "Custom Shopify development" : "Selected DigiSky build"}</span><strong>{preview?.name || "DigiSky Store"}</strong></div></div><div className="preview-footer"><span>{active === 2 ? "Built from the ground up" : "Conversion-first ecommerce"}</span><span>0{active + 1} — 04</span></div></div>
    </div>
  </section>;
}

function ShopifyFaq() {
  const questions = [
    ["What does DigiSky's Shopify website development service include?", "DigiSky can help with Shopify storefront design and development, responsive layouts, product and collection setup, navigation, payment and shipping setup assistance, basic SEO structure and launch testing. The exact scope is agreed for each project."],
    ["How much does a Shopify website cost?", "Shopify website cost depends on the design, number of pages and products, custom functionality and integrations required. Contact DigiSky with your requirements for a project-specific quote."],
    ["Does DigiSky work with businesses outside India?", "Yes. DigiSky works with ambitious brands in India and worldwide on Shopify, ecommerce and custom website projects."],
    ["Can DigiSky customize an existing Shopify theme?", "Yes. DigiSky can tailor a Shopify storefront to a brand's products and customer journey, including theme sections, interactions and conversion-focused user experience."],
  ];
  return <section className="faq-section section" aria-labelledby="shopify-faq-title">
    <div className="faq-heading"><span className="tag-chip">Shopify development FAQs</span><h2 id="shopify-faq-title">Planning a Shopify website?</h2><p>Clear answers about our Shopify store design and development services.</p></div>
    <div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
  </section>;
}

function HeroShowcase({ projects, heroImages = [] }) {
  const showcaseRef = React.useRef(null);
  const move = event => {
    if (!showcaseRef.current) return;
    const bounds = showcaseRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - .5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - .5) * 2;
    showcaseRef.current.style.setProperty("--parallax-x", `${x * 10}px`);
    showcaseRef.current.style.setProperty("--parallax-y", `${y * 10}px`);
  };
  const reset = () => { if (showcaseRef.current) { showcaseRef.current.style.setProperty("--parallax-x", "0px"); showcaseRef.current.style.setProperty("--parallax-y", "0px"); } };
  const pick = (name, fallback) => projects.find(p => p.name === name) || fallback;
  const a = pick("Popout Fashion", projects[4] || projects[0]);
  const b = pick("Maestra Jewellery", projects[11] || projects[1]);
  const c = pick("Tiara Skin", projects[20] || projects[2]);
  const imageA = heroImages[0] || a?.image;
  const imageB = heroImages[1] || b?.image;
  const imageC = heroImages[2] || c?.image;
  const heroImage = (source, project, index) => {
    const fallback = makeThumb(project || { name: `Hero image ${index + 1}` }, index);
    const usableSource = source && !/thum\.io/i.test(String(source)) ? source : "";
    return <img src={usableSource || fallback} alt="" loading="eager" onError={event => {
      if (event.currentTarget.dataset.fallback) return;
      event.currentTarget.dataset.fallback = "1";
      event.currentTarget.src = fallback;
    }} />;
  };
  return (
    <div className="hero-showcase" ref={showcaseRef} onPointerMove={move} onPointerLeave={reset} aria-hidden="true">
      <div className="hs-card hs-c">{heroImage(imageC, c, 2)}<span className="hs-tag">{c?.name || "Hero image 3"}</span></div>
      <div className="hs-card hs-a">{heroImage(imageA, a, 0)}<span className="hs-tag">{a?.name || "Hero image 1"}</span></div>
      <div className="hs-card hs-b">{heroImage(imageB, b, 1)}<span className="hs-tag">{b?.name || "Hero image 2"}</span></div>
      <div className="hs-badge"><strong>34+</strong>stores designed<br/>&amp; shipped</div>
    </div>
  );
}

function Marquee({ projects }) {
  const names = projects.map(p => p.name);
  const loop = [...names, ...names];
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {loop.map((n,i)=><span key={i} className={i % 5 === 0 ? "on" : ""}>{n}</span>)}
      </div>
    </div>
  );
}

function makeThumb(project, index) {
  const palettes = [["#eaf8f1","#0b120f"],["#101411","#e8f5ef"],["#f3eadf","#111111"],["#e9eef7","#102030"],["#f7f1e8","#3d2414"],["#e7f4ed","#15382a"]];
  const [bg, fg] = palettes[index % palettes.length];
  const safe = String(project.name).replace(/&/g,"and").replace(/[<>]/g,"");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760"><rect width="1200" height="760" fill="${bg}"/><rect x="48" y="42" width="1104" height="676" rx="28" fill="white" opacity=".96"/><text x="92" y="270" font-family="Georgia" font-size="86" fill="${fg}">${safe}</text><rect x="760" y="168" width="292" height="340" rx="22" fill="${bg}"/></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function isAutoGeneratedUrl(url) {
  return /thum\.io|api\.microlink\.io/i.test(String(url || ""));
}

function ProjectCard({ project, index, featured = false }) {
  const hasUrl = typeof project.url === "string" && /^https?:\/\//i.test(project.url.trim());
  const rawImage = project.image || "";
  const customImage = rawImage && !isAutoGeneratedUrl(rawImage) ? rawImage : "";
  const thumIoUrl = rawImage && /thum\.io/i.test(rawImage) ? rawImage : "";
  const generatedThumb = makeThumb(project, index);
  // Priority: admin-uploaded custom image always wins and is never overridden.
  // The generated placeholder card is the guaranteed, instant, zero-network default —
  // it never fails to load, so a thumbnail is always visible immediately.
  // A legacy thum.io URL (if one is stored) is tried as a bonus before falling back,
  // but the site never depends on it being available.
  const candidates = [customImage, thumIoUrl, generatedThumb].filter(Boolean);
  const thumbnail = candidates[0];
  const projectCategoryName = projectCategory(project);
  const domain = hasUrl ? project.url.trim().replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/$/, "") : "preview unavailable";
  const image = <img src={thumbnail} alt={`${project.name} project thumbnail`} loading={index < 12 ? "eager" : "lazy"} fetchPriority={index < 6 ? "high" : "auto"} decoding="async" onError={(e)=>{
    const stage = Number(e.currentTarget.dataset.fallback || "0") + 1;
    if (stage < candidates.length) { e.currentTarget.dataset.fallback = String(stage); e.currentTarget.src = candidates[stage]; }
  }} />;
  const frame = <div className="project-browser-frame">
    <div className="browser-bar">
      <div className="browser-dots"><i/><i/><i/></div>
      <div className="browser-url"><LockIcon/><span>{domain}</span></div>
    </div>
    <div className="browser-viewport">{image}</div>
  </div>;
  const card = <article className={`project-card${featured ? " project-card-featured" : ""}`}>
    <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
    <div className="project-media">
      {hasUrl ? <a className="project-media-link" href={project.url.trim()} target="_blank" rel="noopener noreferrer" aria-label={`View live preview of ${project.name}`}>{frame}<span className="project-overlay"><span>View live preview</span><CtaArrow/></span></a> : <>{frame}<div className="project-overlay"><span>Website link not added</span></div></>}
    </div>
    <div className="project-meta">
      <div className="project-copy">
        <div className="project-labels">
          <span className="project-label-category"><i/>{projectCategoryName}</span>
          <span>{project.platform || "Website"}</span>
        </div>
        <h3>{project.name}</h3>
        <p>{project.description || project.industry || "Digital experience designed for growth."}</p>
      </div>
      <a className="project-cta" href={hasUrl ? project.url.trim() : undefined} target={hasUrl ? "_blank" : undefined} rel={hasUrl ? "noopener noreferrer" : undefined} aria-label={`View live preview of ${project.name}`}>
        <span>{hasUrl ? "View live preview" : "Preview unavailable"}</span> <CtaArrow/>
      </a>
    </div>
  </article>;
  return card;
}

function Pricing({ data }) {
  const message = `Hi DigiSky, I'm interested in the ${data.pricing.title} package (${data.pricing.price}).`;
  return (
    <section id="pricing" className="section pricing-section">
      <div className="pricing-heading-row">
        <div><span className="tag-chip">Pricing</span><h2>Everything you need<br/><em>to launch properly.</em></h2></div>
        <p>One focused package for brands that want a premium storefront without a confusing list of add-ons. Need custom development or marketing too? We can build the scope around you.</p>
      </div>
      <div className="pricing-grid">
        <div className="pricing-intro-card">
          <span className="pricing-number">01</span>
          <div><strong>Launch ready.</strong><span>Not just another template.</span></div>
          <div className="pricing-mini-list"><span>✓ Strategy + UX</span><span>✓ Responsive build</span><span>✓ Store setup</span><span>✓ Launch support</span></div>
          <a className="text-link" href="#contact">Talk about your project <CtaArrow/></a>
        </div>
        <div className="price-card">
          <div className="price-card-badge">MOST REQUESTED <span>✦</span></div>
          <div className="price-top"><span>{data.pricing.title}</span><strong>{data.pricing.price}</strong><small>starting package · final scope confirmed before work begins</small></div>
          <div className="feature-list">
            {data.pricing.features.map((f,i)=><div key={i}><i>&#10003;</i><span>{f}</span></div>)}
          </div>
          <a className="pill-button dark" href={waLink(data.brand.whatsapp, message)} target="_blank" rel="noreferrer" style={{width:"100%",justifyContent:"center"}}>Start your project <CtaArrow/></a>
        </div>
      </div>
    </section>
  );
}

function AdminGate({ onUnlock }) {
  const [value, setValue] = useState("");
  const [err, setErr] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (value === ADMIN_PASSWORD) {
      sessionStorage.setItem("digisky_admin_ok", "1");
      onUnlock();
    } else {
      setErr(true);
    }
  };
  return (
    <div className="admin-gate">
      <form className="admin-gate-card" onSubmit={submit}>
        <img src="/logo.png" alt="DigiSky logo" />
        <h2>Content Studio</h2>
        <p>Enter the admin password to edit this website.</p>
        <input type="password" autoFocus placeholder="Password" value={value} onChange={e=>{setValue(e.target.value); setErr(false);}} />
        {err && <div className="err">That password isn't right — try again.</div>}
        <button type="submit">Unlock</button>
        <div className="admin-gate-back"><a href="/">&larr; Back to website</a></div>
      </form>
    </div>
  );
}

function AdminPanel({ data, setData, onClose }) {
  const [draft, setDraft] = useState(() => {
    const next = JSON.parse(JSON.stringify(data));
    next.hero.images = Array.isArray(next.hero.images) ? next.hero.images.slice(0, 3).concat(["", "", ""]).slice(0, 3) : [next.hero.image || "", "", ""];
    return next;
  });
  const [tab, setTab] = useState("overview");
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [jsonValue, setJsonValue] = useState(() => JSON.stringify(data, null, 2));
  const [jsonError, setJsonError] = useState("");

  const update = (path, value) => setDraft(prev => {
    const next = JSON.parse(JSON.stringify(prev));
    let obj = next;
    path.slice(0, -1).forEach(k => obj = obj[k]);
    obj[path[path.length - 1]] = value;
    return next;
  });
  const removeAt = (path, index) => setDraft(prev => {
    const next = JSON.parse(JSON.stringify(prev));
    let arr = next;
    path.forEach(k => arr = arr[k]);
    arr.splice(index, 1);
    return next;
  });
  const addTo = (path, value) => setDraft(prev => {
    const next = JSON.parse(JSON.stringify(prev));
    let arr = next;
    path.forEach(k => arr = arr[k]);
    arr.push(value);
    return next;
  });
  const save = async () => {
    try {
      await saveData(draft);
      setData(draft);
      setJsonValue(JSON.stringify(draft, null, 2));
      window.alert("Saved. Your website content is now updated.");
    } catch (error) {
      window.alert(`Could not save to the live database: ${error.message}`);
    }
  };
  const applyJSON = () => {
    try {
      const parsed = JSON.parse(jsonValue);
      if (!parsed || typeof parsed !== "object") throw new Error("JSON must contain an object.");
      setDraft(parsed);
      setJsonError("");
    } catch (error) { setJsonError(error.message); }
  };
  const handleThumbnailUpload = async (index, file) => {
    setUploadingIndex(index);
    try {
      const image = await uploadThumbnail(file, draft.projects[index].id || `project-${index}`);
      update(["projects", index, "image"], image);
    } catch (error) { window.alert(`Could not upload thumbnail: ${error.message}`); }
    finally { setUploadingIndex(null); }
  };
  const handleHeroImageUpload = async (index, file) => {
    try {
      const image = await uploadThumbnail(file, `hero-${index + 1}`, "hero");
      update(["hero", "images", index], image);
    } catch (error) { window.alert(`Could not upload hero image: ${error.message}`); }
  };
  const reset = async () => {
    if (!window.confirm("Reset all website content to the default content?")) return;
    try {
      await saveData(DEFAULT_DATA);
      localStorage.removeItem("digisky_data");
      const fresh = JSON.parse(JSON.stringify(DEFAULT_DATA));
      setData(fresh); setDraft(fresh); setJsonValue(JSON.stringify(fresh, null, 2));
    } catch (error) { window.alert(`Could not reset the live database: ${error.message}`); }
  };
  const exportData = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = "digisky-data.json"; a.click(); URL.revokeObjectURL(url);
  };
  const field = (label, path, type="text", placeholder="") => {
    const value = path.reduce((o,k)=>o?.[k], draft) ?? "";
    return <label className="admin-field"><span>{label}</span>{type === "textarea" ? <textarea placeholder={placeholder} value={value} onChange={e=>update(path,e.target.value)} /> : <input type={type} placeholder={placeholder} value={value} onChange={e=>update(path,e.target.value)} />}</label>;
  };
  const pairRows = (path, title, firstLabel="Title", secondLabel="Description") => {
    const rows = path.reduce((o,k)=>o?.[k], draft) || [];
    return <div className="admin-editor-block"><div className="admin-block-head"><div><small>EDITOR</small><h3>{title}</h3></div><button className="add-project" onClick={()=>addTo(path,["New item","Add description here."])}>+ Add</button></div>{rows.map((row,i)=><div className="admin-repeat-card" key={i}><div className="admin-repeat-top"><b>{String(i+1).padStart(2,"0")}</b><button className="delete-project" onClick={()=>removeAt(path,i)}>Delete</button></div><input aria-label={firstLabel} placeholder={firstLabel} value={row?.[0] || ""} onChange={e=>update([...path,i,0],e.target.value)}/><textarea aria-label={secondLabel} placeholder={secondLabel} value={row?.[1] || ""} onChange={e=>update([...path,i,1],e.target.value)}/></div>)}</div>;
  };
  const tabs = [
    ["overview","Overview","◈"],["hero","Hero","✦"],["stats","Numbers","#"],["trust","Brands","∞"],["work","Projects","↗"],["services","Services","◎"],["shopify","Shopify","S"],["why","Why DigiSky","✓"],["pricing","Pricing","₹"],["featured","Featured","◆"],["about","About","A"],["process","Process","01"],["reviews","Client notes","★"],["growth","More services","+"],["footer","Footer","▣"],["advanced","Advanced","{}"]
  ];
  return <aside className="admin-panel admin-v2">
    <div className="admin-head admin-v2-head"><div><div className="admin-kicker"><span className="admin-live-dot"/> DIGISKY / CONTENT CONTROL</div><h2>Website Control Center</h2><p>Edit the content, sections, projects, services, links and visual copy of the live website from one place.</p></div><div className="admin-head-tools"><span><i/> Supabase sync</span><button onClick={onClose} aria-label="Close content studio">&times;</button></div></div>
    <div className="admin-tabs admin-v2-tabs">{tabs.map(([id,label,icon])=><button className={tab===id?"active":""} key={id} onClick={()=>setTab(id)}><b>{icon}</b>{label}</button>)}</div>
    <div className="admin-scroll admin-v2-scroll">
      {tab === "overview" && <div className="admin-dashboard"><div className="admin-welcome"><span className="tag-chip">LIVE WEBSITE</span><h3>Your website, one control center.</h3><p>Everything is editable here. Make changes, save once, refresh the website.</p><button className="save admin-main-save" onClick={save}>Save all changes</button></div><div className="admin-stat-grid"><div><strong>{draft.projects?.length || 0}</strong><span>Projects</span></div><div><strong>{draft.services?.length || 0}</strong><span>Core services</span></div><div><strong>{draft.process?.length || 0}</strong><span>Process steps</span></div><div><strong>{draft.testimonials?.length || 0}</strong><span>Client notes</span></div></div><div className="admin-quick-grid">{[["hero","Hero content","Headline, description & images"],["work","Portfolio","Projects, thumbnails & links"],["why","Why DigiSky","Comparison switch & animations"],["advanced","Advanced editor","Edit the complete website JSON"]].map(([id,t,d])=><button key={id} onClick={()=>setTab(id)}><b>{t}</b><span>{d}</span><i>↗</i></button>)}</div><div className="admin-help-box"><strong>Tip</strong><p>Use <b>Advanced</b> if you want complete control over every stored value, including new fields added later.</p></div></div>}

      {tab === "hero" && <><div className="admin-section-title"><span>01</span><div><h3>Hero & brand</h3><p>Control the first impression and the header brand information.</p></div></div>{field("Brand name",["brand","name"])}{field("Tagline",["brand","tagline"])}{field("Hero kicker",["hero","kicker"])}{field("Hero title — line 1",["hero","titleA"])}{field("Hero title — line 2",["hero","titleB"])}{field("Hero title — line 3",["hero","titleC"])}{field("Hero description",["hero","description"],"textarea")}<div className="admin-subtitle">Hero images</div><div className="hero-image-admin-grid">{(draft.hero.images || []).map((image,index)=><div className="hero-image-admin" key={index}><strong>Image {index+1}</strong><div className="thumbnail-upload"><label className="thumbnail-upload-button">{image?"Change image":"Upload image"}<input type="file" accept="image/*" onChange={e=>{const file=e.target.files?.[0];if(file)handleHeroImageUpload(index,file);e.target.value=""}}/></label>{image&&<button className="delete-feature" onClick={()=>update(["hero","images",index],"")}>Remove</button>}</div>{image&&<a className="thumbnail-preview" href={image} target="_blank" rel="noreferrer"><img src={image} alt="Hero"/><span>View image</span></a>}</div>)}</div></>}

      {tab === "stats" && <><div className="admin-section-title"><span>02</span><div><h3>Numbers & proof</h3><p>Edit the four proof cards shown in “The numbers don’t lie”.</p></div></div>{field("Section tag",["proof","tag"])}{field("Heading",["proof","title"])}{field("Description",["proof","description"],"textarea")}<div className="admin-proof-editor">{[0,1,2,3].map(i=><div className="admin-repeat-card" key={i}><div className="admin-repeat-top"><b>0{i+1}</b></div><input placeholder="Big value" value={draft.proof.values?.[i]||""} onChange={e=>update(["proof","values",i],e.target.value)}/><input placeholder="Card label" value={draft.proof.labels?.[i]||""} onChange={e=>update(["proof","labels",i],e.target.value)}/></div>)}</div></>}

      {tab === "trust" && <><div className="admin-section-title"><span>03</span><div><h3>Brand rail</h3><p>These names power the running “Worked with amazing brands” section.</p></div></div>{field("Eyebrow",["trust","eyebrow"])}<div className="admin-editor-block"><div className="admin-block-head"><div><small>BRANDS</small><h3>Portfolio brand names</h3></div></div>{(draft.trust.names||[]).map((name,i)=><div className="admin-feature-row" key={i}><input value={name} onChange={e=>update(["trust","names",i],e.target.value)}/><button className="delete-feature" onClick={()=>removeAt(["trust","names"],i)}>Delete</button></div>)}<button className="add-project" onClick={()=>addTo(["trust","names"],"New brand")}>+ Add brand</button></div><div className="admin-subtitle">Running marquee</div><p className="admin-help">Edit the services and topics used in the top running strip.</p>{(draft.marqueeItems||[]).map((item,i)=><div className="admin-feature-row" key={i}><input value={item} onChange={e=>update(["marqueeItems",i],e.target.value)}/><button className="delete-feature" onClick={()=>removeAt(["marqueeItems"],i)}>Delete</button></div>)}<button className="add-project" onClick={()=>addTo(["marqueeItems"],"NEW SERVICE")}>+ Add marquee item</button></>}

      {tab === "work" && <><div className="admin-section-title"><span>02</span><div><h3>Portfolio manager</h3><p>Add, edit, remove, reorder content fields and upload real website screenshots.</p></div></div><div className="projects-admin-top"><button className="add-project" onClick={()=>setDraft(prev=>({...prev,projects:[...prev.projects,{id:Date.now(),name:"New Project",category:"Business",industry:"",platform:"Custom",description:"",image:"",url:""}]}))}>+ Add project</button></div>{draft.projects.map((p,i)=><div className="admin-project admin-project-v2" key={p.id}><div className="admin-project-title"><b>{String(i+1).padStart(2,"0")}</b><strong>{p.name || "Untitled project"}</strong><button className="delete-project" onClick={()=>removeAt(["projects"],i)}>Delete</button></div><div className="admin-two-col"><input placeholder="Project name" value={p.name||""} onChange={e=>update(["projects",i,"name"],e.target.value)}/><input placeholder="Category" value={p.category||""} onChange={e=>update(["projects",i,"category"],e.target.value)}/><input placeholder="Industry" value={p.industry||""} onChange={e=>update(["projects",i,"industry"],e.target.value)}/><input placeholder="Platform" value={p.platform||""} onChange={e=>update(["projects",i,"platform"],e.target.value)}/></div><input placeholder="Website URL" value={p.url||""} onChange={e=>update(["projects",i,"url"],e.target.value)}/><textarea placeholder="Description" value={p.description||""} onChange={e=>update(["projects",i,"description"],e.target.value)}/><div className="thumbnail-upload"><label className="thumbnail-upload-button">{uploadingIndex===i?"Uploading…":"Upload thumbnail"}<input type="file" accept="image/*" disabled={uploadingIndex!==null} onChange={e=>{const file=e.target.files?.[0];if(file)handleThumbnailUpload(i,file);e.target.value=""}}/></label>{p.image&&<button className="delete-feature" onClick={()=>update(["projects",i,"image"],"")}>Remove image</button>}</div></div>)}</>}

      {tab === "services" && <><div className="admin-section-title"><span>03</span><div><h3>Services</h3><p>Add, remove and edit the services shown across the website.</p></div></div>{pairRows(["services"],"Core services")}<div className="admin-subtitle">Portfolio filters</div>{(draft.categories||[]).map((c,i)=><div className="category-admin-row" key={`${c}-${i}`}><input value={c} onChange={e=>update(["categories",i],e.target.value)}/>{i>0&&<button className="delete-project" onClick={()=>removeAt(["categories"],i)}>Delete</button>}</div>)}<button className="add-project" onClick={()=>addTo(["categories"],"New category")}>+ Add category</button></>}

      {tab === "shopify" && <><div className="admin-section-title"><span>04</span><div><h3>Shopify expertise</h3><p>Edit the heading, supporting copy and every clickable option in the Shopify section.</p></div></div>{field("Heading line 1",["shopify","titleA"])}{field("Heading line 2",["shopify","titleB"])}{field("Description",["shopify","description"],"textarea")}{pairRows(["shopify","points"],"Clickable expertise options")}</>}

      {tab === "why" && <><div className="admin-section-title"><span>05</span><div><h3>Why DigiSky comparison</h3><p>Edit the switch labels, emojis, headings and every comparison point.</p></div></div>{field("Section tag",["why","tag"])}{field("Subtitle",["why","subtitle"])}{field("DigiSky heading",["why","digiTitle"])}{field("Typical agency heading",["why","otherTitle"])}<div className="admin-two-col">{field("DigiSky emoji",["why","digiEmoji"])}{field("Typical agency emoji",["why","otherEmoji"])}{field("DigiSky status",["why","digiStatus"])}{field("Typical agency status",["why","otherStatus"])}</div>{pairRows(["why","digi"],"DigiSky points")}{pairRows(["why","other"],"Typical agency points")}</>}

      {tab === "pricing" && <><div className="admin-section-title"><span>06</span><div><h3>Pricing</h3><p>Edit the offer, price, description and unlimited feature rows.</p></div></div>{field("Package title",["pricing","title"])}{field("Price",["pricing","price"])}{field("Description",["pricing","description"],"textarea")}<div className="admin-subtitle">Included features</div>{(draft.pricing.features||[]).map((f,i)=><div className="admin-feature-row" key={i}><input value={f} onChange={e=>update(["pricing","features",i],e.target.value)}/><button className="delete-feature" onClick={()=>removeAt(["pricing","features"],i)}>Delete</button></div>)}<button className="add-project" onClick={()=>addTo(["pricing","features"],"New feature")}>+ Add feature</button></>}

      {tab === "featured" && <><div className="admin-section-title"><span>10</span><div><h3>Featured section</h3><p>Edit the editorial featured block content.</p></div></div>{field("Heading",["featured","title"])}{field("Description",["featured","description"],"textarea")}{field("Quote before highlight",["featured","quoteBefore"],"textarea")}{field("Highlighted quote",["featured","quoteHighlight"])}{field("Quote after highlight",["featured","quoteAfter"],"textarea")}{field("Card title",["featured","metaTitle"])}{field("Card subtitle",["featured","metaText"])}</>}

      {tab === "about" && <><div className="admin-section-title"><span>07</span><div><h3>About DigiSky</h3><p>Edit the story and supporting points.</p></div></div>{field("Heading line 1",["about","titleA"])}{field("Heading line 2",["about","titleB"])}{field("About text",["about","text"],"textarea")}<div className="admin-subtitle">About points</div>{(draft.about.points||[]).map((x,i)=><div className="admin-feature-row" key={i}><input value={x} onChange={e=>update(["about","points",i],e.target.value)}/><button className="delete-feature" onClick={()=>removeAt(["about","points"],i)}>Delete</button></div>)}<button className="add-project" onClick={()=>addTo(["about","points"],"New point")}>+ Add point</button></>}

      {tab === "process" && <><div className="admin-section-title"><span>08</span><div><h3>Simple process</h3><p>Edit every step, title and description used by the process timeline.</p></div></div>{pairRows(["process"],"Process steps","Step name","Step description")}</>}

      {tab === "reviews" && <><div className="admin-section-title"><span>09</span><div><h3>Client notes</h3><p>Add, edit or remove testimonials shown on the website.</p></div></div><div className="admin-editor-block"><div className="admin-block-head"><div><small>REVIEWS</small><h3>Testimonials</h3></div><button className="add-project" onClick={()=>addTo(["testimonials"],{name:"Client name",company:"Company",quote:"Client feedback…",rating:5})}>+ Add review</button></div>{(draft.testimonials||[]).map((t,i)=><div className="admin-repeat-card" key={i}><div className="admin-repeat-top"><b>0{i+1}</b><button className="delete-project" onClick={()=>removeAt(["testimonials"],i)}>Delete</button></div><div className="admin-two-col"><input placeholder="Client name" value={t.name||""} onChange={e=>update(["testimonials",i,"name"],e.target.value)}/><input placeholder="Company" value={t.company||""} onChange={e=>update(["testimonials",i,"company"],e.target.value)}/></div><textarea placeholder="Quote" value={t.quote||""} onChange={e=>update(["testimonials",i,"quote"],e.target.value)}/><input type="number" min="1" max="5" placeholder="Rating" value={t.rating||5} onChange={e=>update(["testimonials",i,"rating"],Number(e.target.value))}/></div>)}</div></>}

      {tab === "growth" && <><div className="admin-section-title"><span>10</span><div><h3>More ways we help</h3><p>Manage the six growth cards and the WhatsApp enquiry copy.</p></div></div>{pairRows(["growthServices"],"Growth service cards","Service name","Service description")}</>}

      {tab === "footer" && <><div className="admin-section-title"><span>11</span><div><h3>Footer & contact</h3><p>Control footer messaging and all social/contact details.</p></div></div>{field("Email",["brand","email"])}{field("WhatsApp number",["brand","whatsapp"])}{field("Instagram URL",["brand","instagram"])}{field("LinkedIn URL",["brand","linkedin"])}{field("GitHub URL",["brand","github"])}{field("Footer eyebrow",["footer","eyebrow"])}{field("Footer heading line 1",["footer","titleA"])}{field("Footer heading line 2",["footer","titleB"])}{field("Footer description",["footer","text"],"textarea")}{field("CTA button",["cta","button"])}{field("CTA title",["cta","title"])}{field("CTA supporting text",["cta","text"],"textarea")}</>}

      {tab === "advanced" && <div className="admin-json-editor"><div className="admin-section-title"><span>∞</span><div><h3>Advanced content editor</h3><p>This is the master editor. Every value stored for the website can be edited here.</p></div></div><textarea className="admin-json-textarea" value={jsonValue} onChange={e=>{setJsonValue(e.target.value);setJsonError("")}} spellCheck={false}/>{jsonError&&<div className="admin-json-error">{jsonError}</div>}<div className="admin-json-actions"><button className="export" onClick={applyJSON}>Apply JSON to editor</button><button className="export" onClick={()=>setJsonValue(JSON.stringify(draft,null,2))}>Refresh JSON</button></div></div>}
    </div>
    <div className="admin-actions admin-v2-actions"><button className="save" onClick={save}>Save all changes</button><button className="export" onClick={exportData}>Export JSON</button><button className="reset" onClick={reset}>Reset</button></div>
  </aside>;
}

function MarqueeStrip({ reverse = false, items = [] }) {
  const safeItems = Array.isArray(items) && items.length ? items : ["SHOPIFY", "WEB DEVELOPMENT", "META ADS", "GOOGLE ADS", "AI AUTOMATION", "SEO + CRO", "AD CREATIVES", "CUSTOM CODE"];
  const row = [...safeItems, ...safeItems];
  return <section className={`marquee-strip ${reverse ? "marquee-reverse" : ""}`} aria-label="DigiSky services">
    <div className="marquee-window">
      <div className="marquee-track">{row.map((item, index) => <span className="marquee-item" key={`${item}-${index}`}><b>{item}</b><i aria-hidden="true">•</i></span>)}</div>
    </div>
  </section>;
}

function CountUpNumber({ value }) {
  const raw = String(value ?? "");
  const match = raw.match(/(\d+(?:\.\d+)?)/);
  const target = match ? Number(match[1]) : null;
  const prefix = target === null ? raw : raw.slice(0, match.index);
  const suffix = target === null ? "" : raw.slice((match.index || 0) + match[0].length);
  const [shown, setShown] = useState(0);
  const ref = React.useRef(null);
  useEffect(() => {
    if (target === null) return;
    let started = false;
    let frame;
    const run = () => {
      if (started) return;
      started = true;
      const start = performance.now();
      const duration = 1100;
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setShown(target * eased);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) { run(); return () => cancelAnimationFrame(frame); }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { run(); observer.disconnect(); } }, { threshold: 0.45 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [target]);
  if (target === null) return <span ref={ref}>{raw}</span>;
  const formatted = target % 1 ? shown.toFixed(1) : Math.round(shown).toLocaleString();
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

function ProofNumbers({ data }) {
  const proof = data.proof || {};
  const labels = proof.labels || ["Projects delivered", "Shopify builds", "Custom-coded", "Client satisfaction"];
  const values = proof.values || [data.stats?.[0]?.[0] || "34+", "20+", "Custom", "100%"];
  const brandNames = Array.from(new Set((data.projects || []).map(project => String(project.name || "").trim()).filter(Boolean)));
  const brandLoop = [...brandNames, ...brandNames];
  return <section className="proof-section section">
    <div className="proof-head"><div><span className="tag-chip">{proof.tag || "The numbers don't lie"}</span><h2>{proof.title || "Big builds. Bigger results."}</h2></div><p>{proof.description || "From Shopify storefronts to custom-coded experiences, the work speaks for itself."}</p></div>
    <div className="proof-grid">{[0,1,2,3].map(index => <article className={`proof-card proof-card-${index+1}`} key={index}><span className="proof-index">0{index+1}</span><strong><CountUpNumber value={values[index] ?? ""}/></strong><span>{labels[index] || ""}</span><i className="proof-line"/><b className="proof-card-mark">{index===0?"↗":index===1?"S":index===2?"</>":"★"}</b></article>)}</div>
    <div className="proof-brands" aria-label="Brands and projects DigiSky has worked with"><div className="proof-brands-heading">Worked with amazing brands</div><div className="proof-brand-window"><div className="proof-brand-track">{brandLoop.map((name,index)=><span className="proof-brand-name" key={`${name}-${index}`}><b>{name}</b><i aria-hidden="true">✦</i></span>)}</div></div></div>
  </section>;
}

function HowItWorks({ data }) {
  return <section id="how-it-works" className="how-section section how-redesigned">
    <div className="how-head"><div><span className="tag-chip">Simple process</span><h2>How it works.</h2></div><p>One clear workflow. No mystery handoffs. You always know what happens next.</p></div>
    <div className="how-timeline">
      <div className="how-progress-line"><span/></div>
      {data.process.map((step,index)=><article className="how-step-card" key={step[0]}>
        <div className="how-step-number">{String(index+1).padStart(2,"0")}</div>
        <span className="how-step-label">{step[0]}</span>
        <h3>{step[1]}</h3><p>{step[2]}</p>
        <div className="how-step-foot"><span>{index === data.process.length-1 ? "GO LIVE" : "NEXT STEP"}</span><b>↗</b></div>
      </article>)}
    </div>
  </section>;
}
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frame = 0;
    let visible = false;
    let overInteractive = false;

    const setPosition = (x, y) => {
      mouseX = x;
      mouseY = y;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (!visible) {
        ringX = x;
        ringY = y;
        ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        document.documentElement.classList.add("custom-cursor-ready");
        visible = true;
      }
    };

    const onMove = (event) => setPosition(event.clientX, event.clientY);
    const onOver = (event) => {
      const target = event.target instanceof Element ? event.target.closest("a, button, [role=button], input, select, textarea, summary, .clickable, [data-cursor-hover]") : null;
      overInteractive = Boolean(target);
      document.documentElement.classList.toggle("cursor-hovering", overInteractive);
    };
    const onDown = () => document.documentElement.classList.add("cursor-pressed");
    const onUp = () => document.documentElement.classList.remove("cursor-pressed");
    const onLeave = () => document.documentElement.classList.remove("custom-cursor-ready");
    const onEnter = () => document.documentElement.classList.add("custom-cursor-ready");

    const animate = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    frame = requestAnimationFrame(animate);

    const onMediaChange = (event) => {
      if (!event.matches) {
        document.documentElement.classList.remove("custom-cursor-ready", "cursor-hovering", "cursor-pressed");
      }
    };
    finePointer.addEventListener?.("change", onMediaChange);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      finePointer.removeEventListener?.("change", onMediaChange);
      document.documentElement.classList.remove("custom-cursor-ready", "cursor-hovering", "cursor-pressed");
    };
  }, []);

  return <>
    <span ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    <span ref={ringRef} className="custom-cursor-ring" aria-hidden="true"><i /></span>
  </>;
}

function WhyDigiSky({ data }) {
  const [mode, setMode] = useState("digisky");
  const config = data.why || {};
  const isDigi = mode === "digisky";
  const items = isDigi ? (config.digi || []) : (config.other || []);
  return <section className="why-switch-section section" id="why-digisky">
    <div className="why-switch-head"><span className="why-switch-tag">{config.tag || "WHY DIGISKY?"}</span><h2>{isDigi ? (config.digiTitle || "Your brand on DigiSky.") : (config.otherTitle || "Your brand without the usual friction.")}</h2><p>{config.subtitle || "Flip the switch. See the difference."}</p></div>
    <div className="why-switch-toggle" role="tablist" aria-label="Why DigiSky comparison"><button className={!isDigi ? "active" : ""} onClick={()=>setMode("other")} role="tab" aria-selected={!isDigi}>Typical agency</button><button className={isDigi ? "active" : ""} onClick={()=>setMode("digisky")} role="tab" aria-selected={isDigi}>DigiSky</button></div>
    <div className={`why-switch-content ${isDigi ? "is-digisky" : "is-other"}`}><div className="why-switch-visual"><div className="why-device-card"><div className="why-orbit orbit-one"/><div className="why-orbit orbit-two"/><div className="why-core" aria-hidden="true">{isDigi ? (config.digiEmoji || "🤩") : (config.otherEmoji || "🤯")}</div><div className="why-spark spark-one">✦</div><div className="why-spark spark-two">✦</div><div className="why-spark spark-three">✦</div><div className="why-progress"><span/></div><strong>{isDigi ? (config.digiStatus || "Built to move.") : (config.otherStatus || "Still figuring it out…")}</strong><small>{isDigi ? "strategy · design · build · growth" : "brief · handoff · revisions · launch"}</small></div></div><div className="why-switch-list" aria-live="polite">{items.map(([title,desc],index)=><article className="why-switch-item" key={`${mode}-${index}`} style={{"--delay":`${index*70}ms`}}><span className="why-switch-icon">{isDigi ? "✓" : "×"}</span><div><h3>{title}</h3><p>{desc}</p></div></article>)}</div></div>
  </section>;
}

function App() {
  const [data, setData] = useState(loadData);
  const isAdminRoute = window.location.pathname.replace(/\/$/,"") === "/admin" || new URLSearchParams(window.location.search).has("admin");
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("digisky_admin_ok") === "1");
  const [adminOpen, setAdminOpen] = useState(isAdminRoute);
  const [activeFilter, setActiveFilter] = useState("All");
  useEffect(() => {
    let active = true;
    fetchRemoteData()
      .then(remote => {
        if (active && remote) {
          const remoteProjects = Array.isArray(remote.projects) ? remote.projects.map((project, index) => ({
            ...project,
            image: project.image || makeThumb(project, index),
          })) : undefined;
          setData(prev => ({
            ...prev,
            ...remote,
            ...(remoteProjects ? { projects: remoteProjects } : {}),
            categories: (Array.isArray(remote.categories) && remote.categories.length ? remote.categories : prev.categories).filter(category => category !== "E-commerce"),
          }));
        }
      })
      .catch(error => console.warn("Remote content unavailable; using local content.", error.message));
    return () => { active = false; };
  }, []);
  useEffect(()=>{
    document.documentElement.style.scrollBehavior="smooth";
    const revealItems = document.querySelectorAll(".hero-copy, .hero-showcase, .stats-strip, .section-top, .featured-copy, .featured-art, .services-heading, .pricing-grid, .about-grid, .final-cta, .footer-panel, .footer-nav, .footer-divider, .footer-message, .footer-socials, .shopify-heading, .shopify-stage, .shopify-list button");
    revealItems.forEach((item, index) => {
      item.classList.add("reveal");
      item.style.setProperty("--reveal-delay", `${Math.min(index * 45, 360)}ms`);
    });
    revealItems.forEach(item => {
      if (item.classList.contains("hero-copy") || item.classList.contains("hero-showcase")) item.classList.add("is-visible");
    });
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach(item => item.classList.add("is-visible"));
      return () => { revealItems.forEach(item => item.style.removeProperty("--reveal-delay")); };
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    revealItems.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  },[]);

  const projects = useMemo(()=>data.projects, [data.projects]);
  const effectiveFilter = data.categories.includes(activeFilter) ? activeFilter : "All";
  const filteredProjects = useMemo(() => effectiveFilter === "All" ? projects : projects.filter(project => projectCategory(project) === effectiveFilter), [effectiveFilter, projects]);

  const closeAdmin = () => {
    if (window.location.pathname.replace(/\/$/,"")==="/admin") { window.location.href="/"; }
    else { setAdminOpen(false); }
  };

  return (
    <div id="top">
      <CodeBackground />
      <IntroSplash />
      <Header data={data}/>
      <CustomCursor />
      {adminOpen && isAdminRoute && (unlocked
        ? <AdminPanel data={data} setData={setData} onClose={closeAdmin}/>
        : <AdminGate onUnlock={()=>setUnlocked(true)}/>
      )}
      <main id="top">
        <section className="hero section">
          <div className="hero-copy">
            <span className="hero-kicker">✦ {data.hero.kicker}</span>
            <h1>{data.hero.titleA}<br/>{data.hero.titleB}<br/>{data.hero.titleC}</h1>
            <p>{data.hero.description}</p>
            <div className="hero-actions">
              <a className="pill-button" href={waLink(data.brand.whatsapp, "Hi DigiSky, I want to start a project.")} target="_blank" rel="noreferrer">Start a project</a>
              <button className="text-link" onClick={()=>document.getElementById("work")?.scrollIntoView({behavior:"smooth"})}>View our work</button>
            </div>
            <div className="hero-trust">{(data.hero.trustItems || ["Website development","Shopify & e-commerce","Conversion-focused marketing"]).map(item=><span key={item}><CheckIcon/>{item}</span>)}</div>
          </div>
          <div className="hero-visual"><HeroShowcase projects={projects} heroImages={data.hero.images || [data.hero.image || "", "", ""]} /></div>
        </section>

        <MarqueeStrip items={data.marqueeItems} />

        <section id="work" className="section work-section work-showcase-section">
          <div className="work-showcase-head">
            <div><span className="tag-chip">Featured work / selected builds</span><h2>Our latest projects<span>.</span></h2><p>Stores, websites and digital experiences built to look sharp, load fast and give the next click somewhere useful to go.</p></div>
            <div className="work-head-side"><span>ALL SELECTED BUILDS</span><a className="pill-button work-head-button" href="#work">Explore all work <CtaArrow/></a></div>
          </div>
          <div className="project-filters" role="group" aria-label="Filter projects by category">{data.categories.map(filter=><button key={filter} className={effectiveFilter === filter ? "active" : ""} onClick={()=>setActiveFilter(filter)}>{filter}</button>)}</div>
          <div className="projects-featured-layout projects-all-layout">
            {filteredProjects.map((p,i)=><ProjectCard project={p} index={i} featured={i === 0} key={`${p.id || "project"}-${p.name}-${i}`}/>)}
          </div>
        </section>

        <Pricing data={data}/>

        <section id="featured" className="featured section">
          <div className="featured-copy">
            <h2>{data.featured.title}</h2>
            <p>{data.featured.description}</p>
            <a className="text-link" href="#work">View all projects</a>
          </div>
          <div className="featured-art">
            <p className="fa-quote">{data.featured.quoteBefore} <span>{data.featured.quoteHighlight}</span> {data.featured.quoteAfter}</p>
            <div className="fa-meta"><strong>{data.featured.metaTitle}</strong>{data.featured.metaText}</div>
          </div>
        </section>

        <ProofNumbers data={data} />

        <section id="services" className="services-section section services-redesigned">
          <div className="services-intro"><div><span className="tag-chip">Our services</span><h2 className="services-heading">Everything you need<br/><em>to grow online.</em></h2></div><p>One studio for the parts that matter most: a stronger website, a better store and marketing that gives people a reason to click.</p></div>
          <div className="services-list services-card-grid">{data.services.map((s,i)=><article className={`service-card ${i === 0 ? "service-featured" : ""}`} key={i}><div className="service-card-top"><span>{String(i + 1).padStart(2,"0")}</span><b>↗</b></div><div><small>{i === 0 ? "ECOMMERCE" : i === 1 ? "WEBSITE" : i === 2 ? "DEVELOPMENT" : "CONVERSION"}</small><h3>{s[0]}</h3><p>{s[1]}</p></div><div className="service-card-bottom"><span>Explore service</span><i/></div></article>)}</div>
        </section>

        <ShopifyExpertise projects={projects} data={data}/>

        <ShopifyFaq />

        <WhyDigiSky data={data}/> 

        <AboutSection data={data}/>
        <HowItWorks data={data}/>
        <Testimonials data={data}/>
        <Journal data={data}/>

        <section id="contact" className="final-cta section">
          <span className="tag-chip">Let’s build together</span>
          <h2>Ready to grow your brand online?</h2>
          <p>Let’s create a powerful digital presence for your business.</p>
          <a className="pill-button light" href={waLink(data.brand.whatsapp, "Hi DigiSky, I want to start a project.")} target="_blank" rel="noreferrer">{data.cta.button}</a>
        </section>
      </main>

      <footer className="footer-shell">
        <div className="footer-panel">
          <div className="footer-message">
            <div className="footer-message-copy">
              <span className="footer-eyebrow">{data.footer?.eyebrow || "DIGITAL PARTNERS FOR MODERN BRANDS"}</span>
              <h2>{data.footer?.titleA || "Step Up Your"}<br className="footer-break"/> {data.footer?.titleB || "Digital Presence"}</h2>
              <p>{data.footer?.text || "From Shopify stores and e-commerce websites to high-converting websites and digital growth, DigiSky helps brands build a stronger presence online."}</p>
              <a className="footer-cta" href={waLink(data.brand.whatsapp,"Hi DigiSky, I want to start a project.")} target="_blank" rel="noreferrer">Start a Project <CtaArrow/></a>
            </div>
            <div className="footer-socials">
              <small>SOCIALS</small>
              <div>
                {data.brand.instagram && <a href={data.brand.instagram} target="_blank" rel="noreferrer" aria-label="DigiSky on Instagram"><InstagramIcon/><span>Instagram</span></a>}
                {data.brand.whatsapp && <a href={waLink(data.brand.whatsapp, "Hi DigiSky, I want to discuss a project.")} target="_blank" rel="noreferrer" aria-label="DigiSky on WhatsApp"><span className="footer-whatsapp-icon" aria-hidden="true">⌕</span><span>WhatsApp</span></a>}
                {data.brand.linkedin && <a href={data.brand.linkedin} target="_blank" rel="noreferrer" aria-label="DigiSky on LinkedIn"><LinkedInIcon/><span>LinkedIn</span></a>}
                {data.brand.github && <a href={data.brand.github} target="_blank" rel="noreferrer" aria-label="DigiSky on GitHub"><GitHubIcon/><span>GitHub</span></a>}
              </div>
            </div>
          </div>
          <div className="footer-bottom"><span>&copy; 2026 DigiSky. All rights reserved.</span><span>Built by DigiSky</span></div>
        </div>
      </footer>
      <BackToTop />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);