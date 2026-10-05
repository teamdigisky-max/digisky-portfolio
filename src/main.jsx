import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import "./styles.css";
import { supabase } from "./lib/supabase";

const ADMIN_PASSWORD = "digisky2026";

const DEFAULT_COPY = {
  work: { tag: "Featured work / selected builds", title: "Our latest projects.", text: "Stores, websites and digital experiences built to look sharp, load fast and give the next click somewhere useful to go." },
  services: { tag: "Our services", titleA: "Everything you need", titleB: "to grow online.", text: "One studio for the parts that matter most: a stronger website, a better store and marketing that gives people a reason to click." },
  faq: { tag: "Shopify development FAQs", title: "Planning a Shopify website?", text: "Clear answers about our Shopify store design and development services.", items: [["What does DigiSky's Shopify website development service include?","DigiSky can help with Shopify storefront design and development, responsive layouts, product and collection setup, navigation, payment and shipping setup assistance, basic SEO structure and launch testing. The exact scope is agreed for each project."],["How much does a Shopify website cost?","Shopify website cost depends on the design, number of pages and products, custom functionality and integrations required. Contact DigiSky with your requirements for a project-specific quote."],["Does DigiSky work with businesses outside India?","Yes. DigiSky works with ambitious brands in India and worldwide on Shopify, ecommerce and custom website projects."],["Can DigiSky customize an existing Shopify theme?","Yes. DigiSky can tailor a Shopify storefront to a brand's products and customer journey, including theme sections, interactions and conversion-focused user experience."]] },
  process: { tag: "Simple process", title: "How it works.", text: "One clear workflow. No mystery handoffs. You always know what happens next." },
  testimonials: { tag: "Client notes", titleA: "Good work.", titleB: "Good people.", text: "Short notes from brands that trusted DigiSky with their website, store or digital growth." },
  cta: { tag: "Let\u2019s build together", title: "Ready to grow your brand online?", text: "Let\u2019s create a powerful digital presence for your business." },
};
const SECTION_DEFS = [["hero","Hero","hero"],["marquee","Services ticker strip","copy"],["work","Our work (projects)","work"],["proof","Numbers & brand names","stats"],["services","Services","services"],["shopify","Shopify expertise","shopify"],["pricing","Pricing","pricing"],["faq","FAQ","copy"],["why","Why DigiSky switch","why"],["process","How it works","process"],["about","About","about"],["testimonials","Client notes","reviews"],["cta","Final call-to-action","copy"]];
function mergeCopy(c) {
  const out = {};
  Object.keys(DEFAULT_COPY).forEach(k => { out[k] = { ...DEFAULT_COPY[k], ...((c || {})[k] || {}) }; });
  if (!Array.isArray(out.faq.items) || !out.faq.items.length) out.faq.items = DEFAULT_COPY.faq.items;
  return out;
}
function mergeLayout(l) {
  const ids = SECTION_DEFS.map(s => s[0]);
  const saved = Array.isArray(l?.order) ? l.order.filter(id => ids.includes(id)) : [];
  return { order: [...saved, ...ids.filter(id => !saved.includes(id))], hidden: { ...(l?.hidden || {}) } };
}
function ensureShape(d) { return { ...d, copy: mergeCopy(d.copy), layout: mergeLayout(d.layout) }; }

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
  copy: DEFAULT_COPY,
  layout: { order: SECTION_DEFS.map(s => s[0]), hidden: {} },
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

const PAGE_METADATA = {
  home: {
    title: "DigiSky | Shopify & Ecommerce Development Agency in India",
    description: "DigiSky is a digital agency specializing in Shopify development, ecommerce website development, custom web development, SEO and digital marketing for growing brands in India.",
    canonical: "https://www.digisky.info/",
    ogTitle: "DigiSky | Shopify & Ecommerce Development Agency",
    ogDescription: "Shopify stores, ecommerce websites and digital growth solutions for ambitious brands in India.",
    ogImage: "https://www.digisky.info/portfolio-reference.png"
  },
  services: {
    title: "Shopify & Ecommerce Services | DigiSky",
    description: "Explore DigiSky Shopify development, ecommerce website design, Shopify SEO, digital marketing and custom web development services for growing brands.",
    canonical: "https://www.digisky.info/services",
    ogTitle: "DigiSky Services",
    ogDescription: "Shopify development, ecommerce websites, SEO and digital marketing services built for growing brands.",
    ogImage: "https://www.digisky.info/portfolio-reference.png"
  },
  "services/shopify-development": {
    title: "Shopify Development Company in India | DigiSky",
    description: "DigiSky builds custom Shopify websites and ecommerce stores in India with theme customization, product setup, integrations, SEO and conversion-focused design.",
    canonical: "https://www.digisky.info/services/shopify-development",
    ogTitle: "Shopify Development Company | DigiSky",
    ogDescription: "Custom Shopify development, theme customization, store setup and optimization for growth-focused ecommerce brands.",
    ogImage: "https://www.digisky.info/portfolio-reference.png",
    heading: "Shopify development company built for growth.",
    intro: "DigiSky helps brands launch and improve Shopify stores that are fast, conversion-ready and aligned with the business. We build storefronts that look premium, support product discovery and make it easier for shoppers to buy.",
    highlights: ["Custom Shopify storefronts", "Theme customization & section builds", "Responsive ecommerce UX", "Product, collection and navigation setup", "SEO & speed improvements"],
    deliverables: ["Store architecture & homepage structure", "Shopify theme customization and section builds", "Product and collection setup", "Payment, shipping and app integrations", "Analytics-ready launch and post-launch support"],
    faqs: [{ q: "What does a Shopify development project include?", a: "Scope usually includes storefront design, theme customization, product configuration, collection structure, navigation, mobile UX, app integrations and launch support tailored to the brand." }, { q: "Do you work with businesses in India?", a: "Yes. DigiSky works with ecommerce brands and startups across India and beyond on Shopify builds and optimization projects." }, { q: "Can you customize an existing Shopify theme?", a: "Yes. We can update an existing theme, build custom sections and improve layout, speed and conversion flow without starting from scratch when it is the better fit." }],
    related: [
      { to: "/services/shopify-store-design", label: "Shopify store design" },
      { to: "/services/shopify-theme-customization", label: "Shopify theme customization" },
      { to: "/services/shopify-seo", label: "Shopify SEO services" }
    ]
  },
  "services/shopify-store-design": {
    title: "Shopify Store Design Services | DigiSky",
    description: "DigiSky creates Shopify store design systems that improve buyer trust, showcase collections clearly and support stronger conversion-focused ecommerce experiences.",
    canonical: "https://www.digisky.info/services/shopify-store-design",
    ogTitle: "Shopify Store Design | DigiSky",
    ogDescription: "Premium Shopify store design and ecommerce UX for brands that want a better customer journey and higher conversion potential.",
    ogImage: "https://www.digisky.info/portfolio-reference.png",
    heading: "Shopify store design for stronger first impressions.",
    intro: "A polished storefront helps customers understand the offer quickly and builds trust before the first purchase. DigiSky designs Shopify stores with clear product storytelling, intuitive navigation and conversion-focused layouts.",
    highlights: ["Brand-led ecommerce design", "Conversion-focused homepage flow", "Mobile-first experience design", "Collection and product page thinking", "Design systems for growth"],
    deliverables: ["Homepage and landing page design", "Collection page structure", "Product page UX recommendations", "Navigation and buyer journey mapping", "Responsive design refinements"],
    faqs: [{ q: "Is Shopify store design only for new brands?", a: "Not at all. We also redesign or refresh established stores that need a cleaner experience, faster mobile UX or better conversion flow." }, { q: "How does good store design improve sales?", a: "Clear messaging, stronger product storytelling and easier navigation reduce friction and help shoppers understand the offer with less confusion." }],
    related: [
      { to: "/services/shopify-development", label: "Shopify development" },
      { to: "/services/shopify-website-redesign", label: "Shopify website redesign" },
      { to: "/services/ecommerce-development", label: "Ecommerce development" }
    ]
  },
  "services/shopify-theme-customization": {
    title: "Shopify Theme Customization Services | DigiSky",
    description: "DigiSky provides Shopify theme customization services for brands that need custom sections, storefront improvements, better UX and stronger conversion performance.",
    canonical: "https://www.digisky.info/services/shopify-theme-customization",
    ogTitle: "Shopify Theme Customization | DigiSky",
    ogDescription: "Shopify theme customization, custom sections and storefront updates for brands that need a better customer experience.",
    ogImage: "https://www.digisky.info/portfolio-reference.png",
    heading: "Shopify theme customization that fits your brand.",
    intro: "A Shopify theme can be a good starting point, but most growing brands eventually need more than a template. We customize the layout, sections and interactions to match the products, customer journey and conversion goals.",
    highlights: ["Custom sections and page blocks", "Improved shopping flow", "Theme-level UX refinement", "Responsive styling and performance", "Brand consistency"],
    deliverables: ["Theme section edits and custom blocks", "Homepage, collection and product improvements", "Mobile handling and spacing adjustments", "Custom styling and interaction refinements", "Launch QA and optimization support"],
    faqs: [{ q: "Can you customize a theme without rebuilding the whole store?", a: "Yes. In many cases we improve the current theme with targeted customizations that reduce cost while improving brand presentation and conversion flow." }, { q: "Does Shopify theme customization help SEO?", a: "It can help by improving layout clarity, mobile usability, page speed and overall user experience, which supports stronger engagement and better performance." }],
    related: [
      { to: "/services/shopify-development", label: "Shopify development" },
      { to: "/services/shopify-website-redesign", label: "Shopify redesign" },
      { to: "/services/shopify-seo", label: "Shopify SEO" }
    ]
  },
  "services/shopify-website-redesign": {
    title: "Shopify Website Redesign Services | DigiSky",
    description: "DigiSky helps brands redesign their Shopify website with clearer messaging, better UX and a premium experience designed for conversion and growth.",
    canonical: "https://www.digisky.info/services/shopify-website-redesign",
    ogTitle: "Shopify Website Redesign | DigiSky",
    ogDescription: "Improve your Shopify storefront with stronger user experience, clearer messaging and a more conversion-focused design.",
    ogImage: "https://www.digisky.info/portfolio-reference.png",
    heading: "Shopify website redesign for a stronger customer journey.",
    intro: "If a store feels outdated, hard to navigate or inconsistent with the brand, it can quietly reduce trust and sales. DigiSky redesigns Shopify stores to create a more premium and easier-to-buy experience.",
    highlights: ["UX and messaging improvements", "Modern storefront styling", "Faster and cleaner browsing flow", "Better product discovery", "Mobile-first improvements"],
    deliverables: ["Homepage and category page redesign", "Navigation cleanup and structure review", "Conversion-focused UX updates", "Product page refinement", "Visual refresh aligned to the brand"],
    faqs: [{ q: "When should a business consider a Shopify redesign?", a: "A redesign is a good option when the site no longer reflects the brand, has inconsistent product presentation, weak mobile UX or lower conversion performance than expected." }, { q: "Can redesigns include SEO improvements?", a: "Yes. We can improve structure, page hierarchy, content clarity and technical foundations to support better crawlability and user experience." }],
    related: [
      { to: "/services/shopify-store-design", label: "Shopify store design" },
      { to: "/services/shopify-development", label: "Shopify development" },
      { to: "/services/shopify-seo", label: "Shopify SEO" }
    ]
  },
  "services/shopify-seo": {
    title: "Shopify SEO Services | DigiSky",
    description: "DigiSky provides Shopify SEO services to improve product discoverability, collection ranking and technical optimization for ecommerce growth.",
    canonical: "https://www.digisky.info/services/shopify-seo",
    ogTitle: "Shopify SEO Services | DigiSky",
    ogDescription: "Shopify SEO, technical optimization and content improvements to help stores become easier to find and easier to buy from.",
    ogImage: "https://www.digisky.info/portfolio-reference.png",
    heading: "Shopify SEO services that help stores get found.",
    intro: "Search visibility matters for ecommerce brands that rely on product discovery and organic traffic. DigiSky supports Shopify SEO with technical, on-page and content-driven improvements designed around the store's real commercial goals.",
    highlights: ["Technical SEO fixes", "Collection and product page optimization", "Keyword-aligned content structure", "Internal linking and crawlability support", "Improved page experience"],
    deliverables: ["Technical SEO review", "Collection page and product page optimization", "Metadata and content structure improvements", "Internal linking guidance", "Shopify performance and crawlability support"],
    faqs: [{ q: "Does Shopify SEO include technical fixes?", a: "Yes. Technical structure, crawlability, internal linking, metadata and faster page experiences are all relevant parts of ecommerce SEO strategy." }, { q: "Can SEO improvements work alongside design and development?", a: "Absolutely. Good Shopify SEO is strongest when it is built alongside how the store is structured, how products are organized and how shoppers browse." }],
    related: [
      { to: "/services/ecommerce-development", label: "Ecommerce development" },
      { to: "/services/seo-services", label: "SEO services" },
      { to: "/services/shopify-development", label: "Shopify development" }
    ]
  },
  "services/ecommerce-development": {
    title: "Ecommerce Website Development Company | DigiSky",
    description: "DigiSky offers ecommerce website development services for brands that need a polished online store, custom product flows and conversion-focused digital experiences.",
    canonical: "https://www.digisky.info/services/ecommerce-development",
    ogTitle: "Ecommerce Website Development | DigiSky",
    ogDescription: "Ecommerce website development and custom online store builds for businesses ready to sell more online.",
    ogImage: "https://www.digisky.info/portfolio-reference.png",
    heading: "Ecommerce website development for bigger online growth.",
    intro: "A strong ecommerce site does more than look modern. It helps shoppers understand the offer, browse naturally and complete purchases without unnecessary friction. DigiSky builds online stores designed around real buyer behavior.",
    highlights: ["Custom ecommerce storefronts", "Product and collection structure", "Conversion-focused UX", "Payment, shipping and app support", "Performance and SEO foundations"],
    deliverables: ["Store structure and UX planning", "Homepage and category page build", "Product detail and checkout support", "Platform setup and integrations", "Launch QA and optimization"],
    faqs: [{ q: "Do you build non-Shopify ecommerce websites too?", a: "Yes. DigiSky works on ecommerce website development projects beyond Shopify when a custom platform or technology stack is a better fit for the business." }, { q: "What makes an ecommerce site more effective?", a: "Strong product presentation, transparent offers, a simple path to purchase and a faster, mobile-friendly storefront all contribute to better conversion performance." }],
    related: [
      { to: "/services/shopify-development", label: "Shopify development" },
      { to: "/services/custom-web-development", label: "Custom web development" },
      { to: "/services/seo-services", label: "SEO services" }
    ]
  },
  "services/custom-web-development": {
    title: "Custom Website Development Agency | DigiSky",
    description: "DigiSky builds custom website development solutions for brands that need flexibility, cleaner user experience and a digital presence designed around their business goals.",
    canonical: "https://www.digisky.info/services/custom-web-development",
    ogTitle: "Custom Web Development | DigiSky",
    ogDescription: "Custom website development for businesses that need tailored user experiences, clearer messaging and better digital performance.",
    ogImage: "https://www.digisky.info/portfolio-reference.png",
    heading: "Custom web development without the template limit.",
    intro: "When a business needs more than a standard template, custom development creates room for more flexibility, tailored flows and a clearer digital strategy. DigiSky focuses on clean execution and user experience that supports business objectives.",
    highlights: ["Custom UX and front-end builds", "Flexible, scalable pages and flows", "Business-specific functionality", "Fast and responsive experiences", "Clear conversion opportunities"],
    deliverables: ["Custom website architecture", "Responsive front-end implementation", "Business-specific sections and interactions", "Performance monitoring and iterative improvements", "Launch and optimization support"],
    faqs: [{ q: "When is custom web development a better fit than a template?", a: "When the business has a more specific experience, conversion flow or technical requirement than a standard setup can comfortably support." }, { q: "Can custom websites be built to grow over time?", a: "Yes. A custom foundation can be structured with long-term expansion in mind without forcing the business to rebuild the entire experience later." }],
    related: [
      { to: "/services/ecommerce-development", label: "Ecommerce website development" },
      { to: "/services/seo-services", label: "SEO services" },
      { to: "/services/digital-marketing", label: "Digital marketing" }
    ]
  },
  "services/seo-services": {
    title: "SEO Services India | DigiSky",
    description: "DigiSky provides SEO services in India for brands looking to improve technical foundations, content structure, search visibility and organic growth.",
    canonical: "https://www.digisky.info/services/seo-services",
    ogTitle: "SEO Services India | DigiSky",
    ogDescription: "Search engine optimization services for businesses that want stronger technical foundations and sustainable organic growth.",
    ogImage: "https://www.digisky.info/portfolio-reference.png",
    heading: "SEO services that support long-term visibility.",
    intro: "SEO works best when the site architecture, content and technical health all support the same objective. DigiSky builds practical SEO strategy around how buyers actually search and how the website converts that traffic.",
    highlights: ["Technical SEO review", "On-page and content structure support", "Ecommerce SEO improvements", "Search Console and crawlability guidance", "Organic growth support"],
    deliverables: ["SEO audit and opportunity review", "Technical health recommendations", "Content structure support", "Internal linking guidance", "Performance and crawlability improvements"],
    faqs: [{ q: "What types of businesses benefit from SEO services?", a: "Any business with a website, service offer or ecommerce funnel can benefit when they need more sustainable discovery beyond paid traffic." }, { q: "Does SEO require a new website?", a: "Not necessarily. Many improvements can be made to an existing site, especially when the technical and content foundations are not aligned with search intent." }],
    related: [
      { to: "/services/shopify-seo", label: "Shopify SEO" },
      { to: "/services/ecommerce-development", label: "Ecommerce development" },
      { to: "/services/digital-marketing", label: "Digital marketing" }
    ]
  },
  "services/digital-marketing": {
    title: "Digital Marketing Agency India | DigiSky",
    description: "DigiSky offers digital marketing services that connect brand awareness, lead generation and website performance across customer journeys.",
    canonical: "https://www.digisky.info/services/digital-marketing",
    ogTitle: "Digital Marketing Agency India | DigiSky",
    ogDescription: "Digital marketing services for brands looking to grow demand, generate leads and improve online visibility across channels.",
    ogImage: "https://www.digisky.info/portfolio-reference.png",
    heading: "Digital marketing services built around real demand.",
    intro: "Digital marketing works best when it is connected to the right offer, landing experience and conversion path. DigiSky helps brands align their channels with the business goals rather than driving traffic without structure.",
    highlights: ["Campaign strategy", "Search and performance marketing", "Creative support", "Lead and conversion focus", "Brand visibility improvements"],
    deliverables: ["Audience and offer review", "Channel planning", "Ad creative and landing page alignment", "Campaign reporting guidance", "Conversion optimization support"],
    faqs: [{ q: "Which channels do you support?", a: "DigiSky works across digital channels relevant to the brand, including search, social and performance marketing depending on the business objective." }, { q: "Is digital marketing only for paid ads?", a: "No. It can also include website alignment, offers, messaging, funnel clarity and testing that improves how the brand turns attention into action." }],
    related: [
      { to: "/services/google-ads", label: "Google Ads" },
      { to: "/services/meta-ads", label: "Meta Ads" },
      { to: "/services/seo-services", label: "SEO services" }
    ]
  },
  "services/social-media-marketing": {
    title: "Social Media Marketing Services | DigiSky",
    description: "DigiSky supports social media marketing strategies for brands that need stronger audience engagement, content consistency and stronger digital visibility.",
    canonical: "https://www.digisky.info/services/social-media-marketing",
    ogTitle: "Social Media Marketing | DigiSky",
    ogDescription: "Social media marketing support that helps brands stay visible, relevant and consistent across customer touchpoints.",
    ogImage: "https://www.digisky.info/portfolio-reference.png",
    heading: "Social media marketing for visible, consistent brand growth.",
    intro: "Social content does not only create awareness; it reinforces the brand, supports engagement and drives closer attention to the offer. DigiSky helps brands build a more coherent and useful social presence.",
    highlights: ["Content planning", "Brand visibility", "Audience engagement support", "Creative direction", "Sales and lead support"],
    deliverables: ["Content strategy support", "Campaign and asset guidance", "Brand consistency review", "Audience engagement planning", "Cross-channel alignment"],
    faqs: [{ q: "What is included in social media marketing support?", a: "The right mix depends on the brand, but it often includes content planning, channel strategy, creative direction and messaging alignment to keep the audience engaged and moving toward the offer." }],
    related: [
      { to: "/services/digital-marketing", label: "Digital marketing" },
      { to: "/services/meta-ads", label: "Meta Ads" },
      { to: "/services/google-ads", label: "Google Ads" }
    ]
  },
  "services/google-ads": {
    title: "Google Ads Management Services | DigiSky",
    description: "DigiSky helps brands create more relevant traffic and leads with search-focused Google Ads strategies aligned to ecommerce and business goals.",
    canonical: "https://www.digisky.info/services/google-ads",
    ogTitle: "Google Ads Services | DigiSky",
    ogDescription: "Google Ads strategy and campaign support for brands that want more qualified demand and stronger online performance.",
    ogImage: "https://www.digisky.info/portfolio-reference.png",
    heading: "Google Ads strategies built for intent-driven demand.",
    intro: "Search demand is often the clearest signal of buyer intent. DigiSky supports paid search strategies that align messaging, targeting and landing experience so campaigns are built around the right opportunity.",
    highlights: ["Search campaign strategy", "Landing page alignment", "Performance monitoring", "Keyword and offer refinement", "Lead or sales focus"],
    deliverables: ["Campaign structure guidance", "Offer and landing-page review", "Targeting and keyword planning", "Reporting support", "Optimization roadmap"],
    faqs: [{ q: "Do Google Ads work for service businesses and ecommerce brands?", a: "Yes. Search-based campaigns can be very effective when the offer, audience and landing experience are aligned with the actual customer intent." }],
    related: [
      { to: "/services/meta-ads", label: "Meta Ads" },
      { to: "/services/digital-marketing", label: "Digital marketing" },
      { to: "/services/seo-services", label: "SEO services" }
    ]
  },
  "services/meta-ads": {
    title: "Meta Ads Services | DigiSky",
    description: "DigiSky creates Meta Ads strategies for brands that want stronger social visibility, audience engagement and action-oriented campaign performance.",
    canonical: "https://www.digisky.info/services/meta-ads",
    ogTitle: "Meta Ads Services | DigiSky",
    ogDescription: "Meta Ads management and audience growth support for brands looking to improve visibility, engagement and qualified action.",
    ogImage: "https://www.digisky.info/portfolio-reference.png",
    heading: "Meta Ads campaigns designed around your offer.",
    intro: "Meta channels can work well when the creative and message match the audience and the landing experience. DigiSky helps brands build campaigns that are more strategic and more aligned to measurable business goals.",
    highlights: ["Audience and offer strategy", "Creative alignment", "Campaign testing", "Landing page and conversion flow support", "Performance-focused reporting"],
    deliverables: ["Campaign planning", "Creative direction support", "Audience strategy review", "Offer and funnel alignment", "Optimization guidance"],
    faqs: [{ q: "Are Meta Ads useful for ecommerce brands?", a: "Yes, especially when product storytelling, offer clarity and landing experience all support the campaign objective." }],
    related: [
      { to: "/services/google-ads", label: "Google Ads" },
      { to: "/services/social-media-marketing", label: "Social media marketing" },
      { to: "/services/digital-marketing", label: "Digital marketing" }
    ]
  },
  about: {
    title: "About DigiSky | Shopify & Ecommerce Agency",
    description: "Learn more about DigiSky, a digital agency focused on Shopify development, ecommerce websites, custom web design and digital growth for ambitious brands.",
    canonical: "https://www.digisky.info/about",
    ogTitle: "About DigiSky",
    ogDescription: "DigiSky is a digital agency focused on ecommerce, Shopify development and custom digital experiences for growing brands.",
    ogImage: "https://www.digisky.info/portfolio-reference.png",
    heading: "DigiSky builds digital experiences that do more than look premium.",
    intro: "DigiSky helps brands create cleaner, clearer and more conversion-focused digital experiences. The focus is on practical growth: websites, storefronts and digital systems that support real customer journeys and business goals.",
    highlights: ["Shopify and ecommerce specialists", "UX, design and technical execution together", "Longer-term support after launch", "Clear conversion thinking"],
    deliverables: ["Design and development guidance", "Brand-led ecommerce strategy", "Launch support and iterative improvements", "Business-focused digital growth support"],
    faqs: [{ q: "What does DigiSky focus on?", a: "DigiSky focuses on Shopify development, ecommerce websites, custom web development, SEO and digital marketing for brands that want a more cohesive online presence." }, { q: "Does DigiSky work with businesses in India?", a: "Yes. DigiSky works with brands in India and beyond, especially where growth depends on stronger ecommerce and digital experience design." }],
    related: [
      { to: "/services/shopify-development", label: "Shopify development" },
      { to: "/services/ecommerce-development", label: "Ecommerce development" },
      { to: "/contact", label: "Contact DigiSky" }
    ]
  },
  contact: {
    title: "Contact DigiSky | Shopify & Ecommerce Development",
    description: "Contact DigiSky for Shopify development, ecommerce website development, custom web projects, SEO and digital marketing support.",
    canonical: "https://www.digisky.info/contact",
    ogTitle: "Contact DigiSky",
    ogDescription: "Talk to DigiSky about your Shopify, ecommerce or web development project.",
    ogImage: "https://www.digisky.info/portfolio-reference.png",
    heading: "Start a project with DigiSky.",
    intro: "If you want a more polished ecommerce experience, a stronger Shopify store or a clear digital growth foundation, DigiSky can help with the next step.",
    highlights: ["Shopify project enquiries", "Custom website development", "SEO and digital growth conversations", "Existing store improvements"],
    deliverables: ["Project discussion", "Website and ecommerce planning", "Recommendations on scope and next steps", "A practical path toward launch or optimization"],
    faqs: [{ q: "How do I start?", a: "Use the WhatsApp contact or email to share your project goals, timeline and business context so DigiSky can suggest the best next step." }],
    related: [
      { to: "/services/shopify-development", label: "Shopify development" },
      { to: "/services/ecommerce-development", label: "Ecommerce development" },
      { to: "/about", label: "About DigiSky" }
    ]
  },
  work: {
    title: "DigiSky Portfolio | Shopify & Ecommerce Projects",
    description: "View DigiSky portfolio work across Shopify stores, ecommerce websites and custom digital experiences built for growing brands.",
    canonical: "https://www.digisky.info/work",
    ogTitle: "DigiSky Portfolio",
    ogDescription: "Explore selected DigiSky projects across Shopify and ecommerce website development.",
    ogImage: "https://www.digisky.info/portfolio-reference.png",
    heading: "Selected work for brands with momentum.",
    intro: "DigiSky's portfolio reflects storefront design, ecommerce strategy and web experiences built for brands looking for an easier path to sell online.",
    highlights: ["Shopify storefronts", "Ecommerce websites", "Custom digital experiences", "Brand-first UX"],
    deliverables: ["Portfolio case studies", "Project highlights", "Platform-specific examples", "Relevant service links"],
    related: [
      { to: "/services/shopify-development", label: "Shopify development" },
      { to: "/services/ecommerce-development", label: "Ecommerce development" },
      { to: "/about", label: "About DigiSky" }
    ]
  },
  blog: {
    title: "DigiSky Blog | Shopify, SEO and Ecommerce Insights",
    description: "Read practical Shopify, ecommerce and SEO insights from DigiSky to help growing brands understand store strategy, design and digital growth.",
    canonical: "https://www.digisky.info/blog",
    ogTitle: "DigiSky Blog",
    ogDescription: "Insights on Shopify ecommerce, conversion strategy, SEO and digital growth for modern brands.",
    ogImage: "https://www.digisky.info/portfolio-reference.png",
    heading: "Useful ecommerce and Shopify guidance.",
    intro: "The DigiSky blog focuses on practical strategy, ecommerce UX and digital growth topics that help founders and teams make better decisions.",
    highlights: ["Shopify ecommerce guidance", "SEO and technical improvements", "Conversion optimization", "Ecommerce growth strategy"],
    deliverables: ["Practical article topics", "Commercial and informational guidance", "Links to relevant services"],
    related: [
      { to: "/services/shopify-seo", label: "Shopify SEO" },
      { to: "/services/shopify-development", label: "Shopify development" },
      { to: "/services/ecommerce-development", label: "Ecommerce development" }
    ]
  }
};

function normalizePath(pathname) {
  const normalized = pathname || "/";
  if (normalized === "/") return "/";
  return normalized.replace(/\/+$/, "") || "/";
}

function setMetaTag(selector, attributeName, content, attributeValue) {
  const node = document.head.querySelector(selector);
  if (node) {
    node.setAttribute(attributeName, attributeValue);
    node.setAttribute("content", content);
    return;
  }
  const meta = document.createElement("meta");
  meta.setAttribute(attributeName, attributeValue);
  meta.setAttribute("content", content);
  document.head.appendChild(meta);
}

function applySeo(metadata) {
  const fallback = PAGE_METADATA.home;
  const page = metadata || fallback;
  document.title = page.title || fallback.title;
  setMetaTag('meta[name="description"]', "name", page.description || fallback.description, "description");
  const canonical = document.head.querySelector('link[rel="canonical"]') || document.createElement("link");
  canonical.setAttribute("rel", "canonical");
  canonical.setAttribute("href", page.canonical || fallback.canonical);
  if (!document.head.contains(canonical)) document.head.appendChild(canonical);
  const ogTitle = document.head.querySelector('meta[property="og:title"]') || document.createElement("meta");
  ogTitle.setAttribute("property", "og:title");
  ogTitle.setAttribute("content", page.ogTitle || page.title || fallback.ogTitle);
  if (!document.head.contains(ogTitle)) document.head.appendChild(ogTitle);
  const ogDescription = document.head.querySelector('meta[property="og:description"]') || document.createElement("meta");
  ogDescription.setAttribute("property", "og:description");
  ogDescription.setAttribute("content", page.ogDescription || page.description || fallback.ogDescription);
  if (!document.head.contains(ogDescription)) document.head.appendChild(ogDescription);
  const ogImage = document.head.querySelector('meta[property="og:image"]') || document.createElement("meta");
  ogImage.setAttribute("property", "og:image");
  ogImage.setAttribute("content", page.ogImage || fallback.ogImage);
  if (!document.head.contains(ogImage)) document.head.appendChild(ogImage);
  const twitterTitle = document.head.querySelector('meta[name="twitter:title"]') || document.createElement("meta");
  twitterTitle.setAttribute("name", "twitter:title");
  twitterTitle.setAttribute("content", page.ogTitle || page.title || fallback.ogTitle);
  if (!document.head.contains(twitterTitle)) document.head.appendChild(twitterTitle);
  const twitterDescription = document.head.querySelector('meta[name="twitter:description"]') || document.createElement("meta");
  twitterDescription.setAttribute("name", "twitter:description");
  twitterDescription.setAttribute("content", page.ogDescription || page.description || fallback.ogDescription);
  if (!document.head.contains(twitterDescription)) document.head.appendChild(twitterDescription);
  const twitterImage = document.head.querySelector('meta[name="twitter:image"]') || document.createElement("meta");
  twitterImage.setAttribute("name", "twitter:image");
  twitterImage.setAttribute("content", page.ogImage || fallback.ogImage);
  if (!document.head.contains(twitterImage)) document.head.appendChild(twitterImage);
}

function SeoMeta() {
  const location = useLocation();
  useEffect(() => {
    const routePath = normalizePath(location.pathname);
    const key = routePath === "/" ? "home" : routePath.replace(/^\//, "");
    applySeo(PAGE_METADATA[key] || PAGE_METADATA.home);
  }, [location.pathname]);
  return null;
}

function GenericPage({ pageKey, heroTitle, introduction, points, deliverables, faqs, relatedLinks }) {
  const waMessage = "Hi DigiSky, I want to discuss a digital project.";
  return (
    <div className="seo-page-shell">
      <div className="seo-page-hero">
        <div className="seo-page-copy">
          <span className="tag-chip">DigiSky</span>
          <h1>{heroTitle}</h1>
          <p>{introduction}</p>
          <div className="hero-actions">
            <a className="pill-button" href={waLink("+919753622101", waMessage)} target="_blank" rel="noreferrer">Start a project</a>
            <Link className="text-link" to="/services">Explore services</Link>
          </div>
        </div>
      </div>
      <div className="seo-page-content">
        <section className="seo-details">
          <h2>What this service includes</h2>
          <ul>{points.map((point) => <li key={point}>{point}</li>)}</ul>
        </section>
        <section className="seo-details">
          <h2>Deliverables</h2>
          <ul>{deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="seo-details">
          <h2>FAQs</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <article key={faq.q}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="seo-details">
          <h2>Related services</h2>
          <div className="seo-related-links">
            {relatedLinks.map((link) => (
              <Link key={link.to} to={link.to}>{link.label}</Link>
            ))}
          </div>
        </section>
      </div>
      <div className="seo-page-cta">
        <h2>Talk to DigiSky</h2>
        <p>Build a smarter ecommerce or digital presence with a team that focuses on clarity, speed and conversion.</p>
        <a className="pill-button light" href={waLink("+919753622101", waMessage)} target="_blank" rel="noreferrer">Discuss your project</a>
      </div>
    </div>
  );
}

function ServicePage({ pageKey }) {
  const page = PAGE_METADATA[pageKey] || PAGE_METADATA.home;
  return (
    <GenericPage
      pageKey={pageKey}
      heroTitle={page.heading || page.title}
      introduction={page.intro || page.description}
      points={page.highlights || []}
      deliverables={page.deliverables || []}
      faqs={page.faqs || []}
      relatedLinks={page.related || []}
    />
  );
}

function LandingPage({ pageKey }) {
  const page = PAGE_METADATA[pageKey] || PAGE_METADATA.home;
  return (
    <div className="seo-page-shell">
      <div className="seo-page-hero">
        <div className="seo-page-copy">
          <span className="tag-chip">DigiSky</span>
          <h1>{page.heading || page.title}</h1>
          <p>{page.intro || page.description}</p>
          <div className="hero-actions">
            <a className="pill-button" href={waLink("+919753622101", "Hi DigiSky, I want to start a project.")} target="_blank" rel="noreferrer">Start a project</a>
            <Link className="text-link" to="/services">View services</Link>
          </div>
        </div>
      </div>
      <div className="seo-page-content">
        <section className="seo-details">
          <h2>Key focus areas</h2>
          <ul>{(page.highlights || []).map((point) => <li key={point}>{point}</li>)}</ul>
        </section>
        <section className="seo-details">
          <h2>Related pages</h2>
          <div className="seo-related-links">
            {(page.related || []).map((link) => <Link key={link.to} to={link.to}>{link.label}</Link>)}
          </div>
        </section>
      </div>
    </div>
  );
}


/* ---------- DigiSky Assistant ---------- */
function DigiSkyBotAvatar({ small = false }) {
  return (
    <span className={`dsk-robot-avatar ${small ? "small" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 64 64" role="img">
        <path d="M32 8v7" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="32" cy="6" r="3" fill="currentColor"/>
        <rect x="10" y="16" width="44" height="37" rx="13" fill="currentColor"/>
        <rect x="15" y="21" width="34" height="25" rx="9" fill="white"/>
        <circle cx="25" cy="33" r="4" fill="currentColor"/>
        <circle cx="39" cy="33" r="4" fill="currentColor"/>
        <path d="M25 40c4 3 10 3 14 0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M10 29H6M58 29h-4" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    </span>
  );
}

function DigiSkyAssistant({ data }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! 👋 I’m DigiSky Assistant. Tell me what you’re planning — your business, platform, budget or goal — and I’ll guide you from there." }
  ]);
  const [typing, setTyping] = useState(false);

  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const services = Array.isArray(data?.services) ? data.services : [];
  const stats = Array.isArray(data?.stats) ? data.stats : [];
  const pricing = data?.pricing || {};
  const email = data?.brand?.email || "team.digisky@gmail.com";
  const whatsapp = data?.brand?.whatsapp || "+919753622101";
  const projectCount = stats.find(s => /project|store|launch/i.test(String(s?.[1] || "")))?.[0] || (projects.length ? `${projects.length}+` : "30+");
  const serviceNames = services.map(s => s?.[0]).filter(Boolean);

  const actions = [
    ["🤖 Start a project", "I want to start a project. Ask me what you need to know."],
    ["Shopify", "I need a Shopify website for my business."],
    ["Pricing", "What would a website like mine roughly cost?"],
    ["Services", "Which services would you recommend for a new ecommerce brand?"],
    ["Portfolio", "Can you show me relevant DigiSky work?"],
    ["Contact", "I want to talk to the DigiSky team."]
  ];

  const normalize = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9₹@._+\s-]/gi, " ").replace(/\s+/g, " ").trim();
  const has = (t, words) => words.some(word => t.includes(word));
  const hasWhole = (t, word) => new RegExp(`\\b${word.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\b`, "i").test(t);
  const money = (value) => {
    const n = Number(String(value || "").replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) && n > 0 ? `₹${n.toLocaleString("en-IN")}` : String(value || "");
  };

  const relevantProjects = (t) => {
    const words = t.split(" ").filter(w => w.length > 3);
    const scored = projects.map(p => {
      const hay = normalize(`${p?.name || ""} ${p?.category || ""} ${p?.description || ""} ${p?.tags || ""}`);
      const score = words.reduce((n, w) => n + (hay.includes(w) ? 1 : 0), 0);
      return { p, score };
    }).filter(x => x.score > 0).sort((a,b) => b.score-a.score).slice(0,4).map(x => x.p?.name).filter(Boolean);
    return scored.length ? scored : projects.slice(0,4).map(p => p?.name).filter(Boolean);
  };

  const answer = (text) => {
    const raw = String(text || "").trim();
    const t = normalize(raw);
    if (!t) return "Tell me a little about what you need and I’ll help you choose the right DigiSky service.";

    if (/^(hi|hello|hey|namaste|hii+|helo+|good morning|good afternoon|good evening)[!. ]*$/.test(t)) {
      return "Hey! 👋 Good to meet you. What are you building — a Shopify store, a normal business website, or something else? If you tell me your business type, I can suggest the best starting point.";
    }
    if (has(t, ["how are you", "how r u", "how are u"])) {
      return "I’m doing great and ready to help 😄 More importantly, how can I help you today? Tell me what you sell, your platform and what you want to achieve.";
    }
    if (has(t, ["thank", "thanks", "thx"])) {
      return "You’re welcome! 😊 If you tell me your business and what you want to build, I can also help you figure out the right DigiSky service and next step.";
    }

    const ecommerce = has(t, ["ecommerce", "e commerce", "online store", "online shop", "sell online", "products"]);
    const shopify = has(t, ["shopify"]);
    const wordpress = has(t, ["wordpress", "woocommerce"]);
    const ads = has(t, ["meta ads", "facebook ads", "instagram ads", "google ads", "advertising", "run ads", "ads"]);
    const seo = has(t, ["seo", "google ranking", "rank on google", "search ranking"]);
    const pricingQ = has(t, ["price", "pricing", "cost", "charge", "budget", "rate", "how much", "starting at"]);
    const portfolioQ = has(t, ["portfolio", "our work", "projects", "examples", "previous work", "website you made", "show me"]);

    if (has(t, ["start a project", "want to start", "need a website", "need a store", "build a website", "build a store"])) {
      return "Absolutely. Let’s make it specific to your business. Tell me these 4 things: 1) what you sell, 2) Shopify/WordPress/custom or no platform decided, 3) approximate number of products/pages, and 4) your target budget. I’ll suggest the most suitable DigiSky route.";
    }

    if (pricingQ && shopify) {
      const shopifyPrice = pricing?.shopify || pricing?.Shopify || pricing?.price;
      return shopifyPrice
        ? `For Shopify, the current site data lists ${money(shopifyPrice)} as the starting reference. Your final quote can change with pages, products, custom design, apps, integrations and other requirements. If you tell me your product count and what features you need, I can help narrow it down.`
        : "Shopify pricing depends on the scope rather than one fixed number. Tell me your product count, pages, design level and integrations, and I’ll help you estimate the right package.";
    }
    if (pricingQ && wordpress) {
      return "For WordPress/WooCommerce, the quote depends on the store structure, products, design, payment/shipping setup and custom features. Tell me roughly how many products you have and what you need, and I’ll help you scope it.";
    }
    if (pricingQ && ecommerce) {
      return "For an ecommerce project, the main cost drivers are platform, number of products/pages, design level, payment/shipping integrations and custom features. Tell me your product count, platform preference and budget and I’ll guide you to the right setup.";
    }
    if (pricingQ) {
      return "I can give you a much more useful estimate if you tell me what you want to build. For example: ‘I sell clothes, need a Shopify store, around 50 products, budget ₹15k.’ Then I can guide you based on the scope instead of giving you a generic price.";
    }

    if (shopify && has(t, ["what", "include", "features", "do you build", "can you build", "need"])) {
      return "For Shopify, DigiSky can handle storefront design/development, responsive layouts, product and collection structure, navigation, payment and shipping setup assistance, theme customization, basic SEO structure and launch testing. If you tell me your brand category, I can suggest what your store should include.";
    }
    if (shopify) {
      return "Yes — DigiSky works with Shopify. If you’re launching a new store, tell me your product category and approximate product count. I can suggest the right store structure, key pages and the type of setup you’ll need.";
    }

    if (wordpress) {
      return "Yes, DigiSky also works with WordPress and WooCommerce. We can help with the design, responsive development, ecommerce structure, products, payment/shipping setup and launch support. Is yours a business website or an online store?";
    }

    if (ecommerce) {
      return "For ecommerce, I’d first choose the platform and then plan the customer journey. Shopify is a strong option for a managed store; WooCommerce can be useful when you need more WordPress flexibility. Tell me what you sell and how many products you have, and I’ll suggest a practical setup.";
    }

    if (ads) {
      const platform = has(t, ["google ads"]) && !has(t, ["meta ads", "facebook", "instagram"]) ? "Google Ads" : has(t, ["meta ads", "facebook", "instagram"]) ? "Meta Ads" : "Meta Ads or Google Ads";
      return `${platform} can work, but the right campaign depends on your product, audience, offer and landing page. DigiSky can help with campaign strategy, audience/offer alignment, creative direction and optimisation. Tell me what you sell and your daily/monthly ad budget, and I can suggest a starting approach.`;
    }

    if (seo) {
      return "DigiSky can help with technical SEO foundations, metadata, site structure, internal linking and conversion-focused improvements. No agency can honestly guarantee a #1 Google ranking because results depend on competition and ongoing work. If you tell me your website/platform and target keyword or city, I can suggest the first SEO priorities.";
    }

    if (portfolioQ) {
      const names = relevantProjects(t);
      return `Sure. DigiSky currently has ${projectCount} projects/launches represented on the site. ${names.length ? `A few relevant examples are ${names.join(", ")}.` : "The portfolio includes Shopify, ecommerce and custom website work."} If you tell me your industry — fashion, beauty, jewellery, food, etc. — I can point you toward the most relevant examples.`;
    }

    if (has(t, ["service", "services", "what do you do", "offer", "agency"])) {
      const names = serviceNames.slice(0, 7);
      return `DigiSky works across ${names.length ? names.join(", ") : "Shopify, ecommerce, websites, SEO and digital marketing"}. The best service depends on your goal. Are you trying to launch a website, improve an existing store, get more leads/sales, or grow on Google/Meta?`;
    }

    if (has(t, ["timeline", "how long", "delivery", "days", "deadline", "when can", "time will"])) {
      return "Timeline depends on the scope, pages, products and custom functionality. If you tell me the platform and approximate size of the project, I can help you understand what will affect the delivery time.";
    }

    if (has(t, ["contact", "whatsapp", "email", "call", "talk to", "reach you", "human", "team"])) {
      return `Sure. You can reach the DigiSky team on WhatsApp at ${whatsapp}${email ? ` or email ${email}` : ""}. If you share what you need here first, I can also help you prepare the requirements before you contact the team.`;
    }

    if (has(t, ["domain", "hosting", "payment gateway", "shipping", "razorpay", "cod"])) {
      return "Those can be part of the setup. The exact solution depends on your platform and business. Tell me whether you’re using Shopify, WooCommerce or a custom site, plus which payment/shipping provider you want, and I’ll explain the setup.";
    }

    if (has(t, ["who are you", "about digisky", "what is digisky"])) {
      return "DigiSky is a digital studio focused on Shopify, ecommerce, custom websites and digital growth. The site is built around creating premium, clear and conversion-focused digital experiences for brands.";
    }

    // Instead of repeating one generic paragraph, ask a targeted qualification question.
    if (has(t, ["clothing", "fashion", "apparel", "jewellery", "jewelry", "beauty", "cosmetic", "food", "dry fruit", "restaurant"])) {
      return `That sounds like a good fit for an ecommerce setup. For a ${raw.toLowerCase()} brand, I’d normally look at product presentation, mobile UX, collections/categories, checkout flow and conversion elements first. Are you starting from zero or do you already have a website?`;
    }

    if (has(t, ["help", "suggest", "recommend", "what should i do", "which is better"])) {
      return "Yes — I can help you decide. Tell me your business, what you’re selling, whether you already have a website, and your approximate budget. I’ll break down the practical next step instead of giving you a generic list.";
    }

    return `I understand you’re asking about “${raw}”. I can help, but I need one detail to make the answer specific: are you looking for a Shopify store, WordPress/WooCommerce site, custom website, SEO, or ads? Tell me your business type too, and I’ll guide you from there.`;
  };

  const send = (text) => {
    const value = String(text || "").trim();
    if (!value || typing) return;
    setMessages(m => [...m, { from: "user", text: value }]);
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { from: "bot", text: answer(value) }]);
    }, 450);
  };

  const waHref = `https://wa.me/${String(whatsapp).replace(/\D/g, "")}?text=${encodeURIComponent("Hi DigiSky, I want to discuss a project.")}`;

  return (
    <div className={`dsk-assistant ${open ? "is-open" : ""}`}>
      {open && (
        <div className="dsk-chat" role="dialog" aria-label="DigiSky Assistant">
          <div className="dsk-chat-head">
            <DigiSkyBotAvatar />
            <div className="dsk-chat-title">
              <strong>DigiSky Assistant</strong>
              <span><i/> Online</span>
            </div>
            <button type="button" className="dsk-close" onClick={() => setOpen(false)} aria-label="Close assistant">×</button>
          </div>

          <div className="dsk-chat-body">
            {messages.map((m, i) => (
              <div className={`dsk-msg ${m.from}`} key={i}>{m.text}</div>
            ))}
            {typing && <div className="dsk-msg bot dsk-typing"><i/><i/><i/></div>}
          </div>

          <div className="dsk-actions">
            {actions.map(([label, value]) => (
              <button type="button" key={label} onClick={() => send(value)}>{label}</button>
            ))}
          </div>

          <div className="dsk-chat-bottom">
            <a href={waHref} target="_blank" rel="noreferrer" className="dsk-whatsapp">WhatsApp DigiSky</a>
            <div className="dsk-input-row">
              <input
                aria-label="Message DigiSky Assistant"
                placeholder="Ask about your project..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    send(e.currentTarget.value);
                    e.currentTarget.value = "";
                  }
                }}
              />
              <button type="button" aria-label="Send message" onClick={(e) => {
                const input = e.currentTarget.previousElementSibling;
                send(input.value);
                input.value = "";
              }}>↑</button>
            </div>
          </div>
          <div className="dsk-powered">DigiSky · Step Up Digitally</div>
        </div>
      )}

      <button type="button" className="dsk-launcher" onClick={() => setOpen(v => !v)} aria-label={open ? "Close DigiSky Assistant" : "Open DigiSky Assistant"}>
        <span className="dsk-launcher-glow"/>
        {open ? <span className="dsk-launcher-x">×</span> : <><DigiSkyBotAvatar small/><span className="dsk-launcher-dot"/></>}
      </button>
    </div>
  );
}

function AppRoutes() {
  return (
    <>
      <SeoMeta />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<App />} />
        <Route path="/services" element={<LandingPage pageKey="services" />} />
        <Route path="/services/shopify-development" element={<ServicePage pageKey="services/shopify-development" />} />
        <Route path="/services/shopify-store-design" element={<ServicePage pageKey="services/shopify-store-design" />} />
        <Route path="/services/shopify-theme-customization" element={<ServicePage pageKey="services/shopify-theme-customization" />} />
        <Route path="/services/shopify-website-redesign" element={<ServicePage pageKey="services/shopify-website-redesign" />} />
        <Route path="/services/shopify-seo" element={<ServicePage pageKey="services/shopify-seo" />} />
        <Route path="/services/ecommerce-development" element={<ServicePage pageKey="services/ecommerce-development" />} />
        <Route path="/services/custom-web-development" element={<ServicePage pageKey="services/custom-web-development" />} />
        <Route path="/services/seo-services" element={<ServicePage pageKey="services/seo-services" />} />
        <Route path="/services/digital-marketing" element={<ServicePage pageKey="services/digital-marketing" />} />
        <Route path="/services/social-media-marketing" element={<ServicePage pageKey="services/social-media-marketing" />} />
        <Route path="/services/google-ads" element={<ServicePage pageKey="services/google-ads" />} />
        <Route path="/services/meta-ads" element={<ServicePage pageKey="services/meta-ads" />} />
        <Route path="/about" element={<LandingPage pageKey="about" />} />
        <Route path="/contact" element={<LandingPage pageKey="contact" />} />
        <Route path="/work" element={<LandingPage pageKey="work" />} />
        <Route path="/blog" element={<LandingPage pageKey="blog" />} />
      </Routes>
    </>
  );
}

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem("digisky_data") || "null");
    if (!saved) {
      return {
        ...DEFAULT_DATA,
        projects: DEFAULT_DATA.projects.map((project, index) => normalizeProjectThumbnail(project, index)),
      };
    }
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
      return normalizeProjectThumbnail(safeProject, index);
    });
    const defaultNames = new Set(DEFAULT_DATA.projects.map(p => p.name.toLowerCase()));
    const custom = savedProjects.filter(p => !defaultNames.has(String(p.name || "").trim().toLowerCase())).map((p, index) => ({
      ...normalizeProjectThumbnail(p, index + DEFAULT_DATA.projects.length),
    }));
    merged.projects = [...mappedDefaults, ...custom];
    return ensureShape(merged);
  } catch {
    return DEFAULT_DATA;
  }
}

async function saveData(data) {
  const normalized = {
    ...data,
    projects: (data.projects || []).map((project, index) => normalizeProjectThumbnail(project, index)),
  };
  localStorage.setItem("digisky_data", JSON.stringify(normalized));
  const { error } = await supabase.from("site_content").upsert({
    id: "homepage",
    content: normalized,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}

const WORK_PREVIEW_COUNT = 9;
const THUMBNAIL_BUCKET = "project-thumbnails";
let projectThumbnailFunctionUnavailable = false;

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

function fallbackProjectThumbnail(project) {
  let thumbnailUrl = project?.thumbnail_url || project?.image || "";
  try {
    const website = new URL(project?.url || "");
    const hostname = website.hostname.toLowerCase();
    if (
      ["http:", "https:"].includes(website.protocol) &&
      !website.username &&
      !website.password &&
      hostname.includes(".") &&
      hostname !== "localhost" &&
      !hostname.endsWith(".local") &&
      !hostname.endsWith(".internal") &&
      !hostname.startsWith("[") &&
      !/^\d{1,3}(?:\.\d{1,3}){3}$/.test(hostname)
    ) {
      thumbnailUrl = `https://image.thum.io/get/width/1200/crop/760/noanimate/${website.href}`;
    }
  } catch {
    // Keep the existing thumbnail when the project URL is invalid.
  }
  return {
    thumbnail_url: thumbnailUrl,
    thumbnail_source: "automatic",
    image: thumbnailUrl,
  };
}

async function generateProjectThumbnail(project, force = false, useAutomatic = false) {
  if (projectThumbnailFunctionUnavailable) {
    return fallbackProjectThumbnail(project);
  }
  try {
    const { data, error } = await supabase.functions.invoke("project-thumbnail", {
      body: { projectId: String(project.id), force, useAutomatic },
    });
    if (error) {
      if (
        ["FunctionsFetchError", "FunctionsRelayError"].includes(error.name) ||
        (error.name === "FunctionsHttpError" && error.context?.status === 404)
      ) {
        projectThumbnailFunctionUnavailable = true;
      }
      console.warn("Automatic thumbnail generation failed; using the website screenshot fallback.", error);
      return fallbackProjectThumbnail(project);
    }
    if (!data?.thumbnail_url) {
      console.warn("Automatic thumbnail generation returned no URL; using the website screenshot fallback.");
      return fallbackProjectThumbnail(project);
    }
    return {
      thumbnail_url: data.thumbnail_url,
      thumbnail_source: data.thumbnail_source === "manual" ? "manual" : "automatic",
      image: data.thumbnail_url,
    };
  } catch (error) {
    if (
      ["FunctionsFetchError", "FunctionsRelayError", "TypeError"].includes(error?.name) ||
      (error?.name === "FunctionsHttpError" && error.context?.status === 404)
    ) {
      projectThumbnailFunctionUnavailable = true;
    }
    console.warn("Automatic thumbnail generation failed; using the website screenshot fallback.", error);
    return fallbackProjectThumbnail(project);
  }
}

function isValidProjectUrl(value) {
  try {
    const url = new URL(value);
    return (url.protocol === "http:" || url.protocol === "https:") && Boolean(url.hostname);
  } catch {
    return false;
  }
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
      <div><span className="tag-chip">{data.copy.testimonials.tag}</span><h2>{data.copy.testimonials.titleA}<br/><em>{data.copy.testimonials.titleB}</em></h2></div>
      <p>{data.copy.testimonials.text}</p>
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

function ShopifyFaq({ copy }) {
  const questions = copy.items;
  return <section className="faq-section section" aria-labelledby="shopify-faq-title">
    <div className="faq-heading"><span className="tag-chip">{copy.tag}</span><h2 id="shopify-faq-title">{copy.title}</h2><p>{copy.text}</p></div>
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
  return /thum\.io|api\.microlink\.io/i.test(String(url || "")) || /^(?:blob:|data:)/i.test(String(url || ""));
}

function normalizeProjectThumbnail(project, index) {
  const image = String(project.image || "");
  const existingUrl = String(project.thumbnail_url || "");
  const legacyManualUrl = !existingUrl && !isAutoGeneratedUrl(image) ? image : "";
  const automaticFallbackUrl = project.thumbnail_source === "automatic" && /^https:\/\/image\.thum\.io\//i.test(existingUrl)
    ? existingUrl
    : "";
  const thumbnailUrl = automaticFallbackUrl || (!isAutoGeneratedUrl(existingUrl) ? existingUrl : legacyManualUrl);
  const source = thumbnailUrl
    ? project.thumbnail_source === "automatic" && existingUrl
      ? "automatic"
      : "manual"
    : "automatic";
  return {
    ...project,
    thumbnail_url: thumbnailUrl,
    thumbnail_source: source,
    image: thumbnailUrl,
  };
}

function getProjectThumbnailCandidates(project, index) {
  const rawImage = String(project?.image || "");
  const manualThumbnail = project?.thumbnail_source === "manual"
    ? project.thumbnail_url || (!isAutoGeneratedUrl(rawImage) ? rawImage : "")
    : "";
  const storedThumbnail = project?.thumbnail_url || "";
  const automaticThumbnail = makeThumb(project || { name: "Project" }, index);
  return [...new Set([manualThumbnail, storedThumbnail, automaticThumbnail].filter(Boolean))];
}

function ProjectThumbnail({ project, index, alt, loading = "lazy", onRegenerate }) {
  const candidates = getProjectThumbnailCandidates(project, index);
  const imageRef = useRef(null);
  const regeneratedRef = useRef(false);
  useEffect(() => {
    regeneratedRef.current = false;
    if (imageRef.current) imageRef.current.dataset.fallback = "0";
  }, [candidates[0], project.id]);
  return <img ref={imageRef} src={candidates[0]} alt={alt} loading={loading} decoding="async" onError={event => {
    const stage = Number(event.currentTarget.dataset.fallback || "0") + 1;
    if (stage < candidates.length) {
      event.currentTarget.dataset.fallback = String(stage);
      event.currentTarget.src = candidates[stage];
    }
    if (
      !regeneratedRef.current &&
      project.thumbnail_source !== "manual" &&
      project.thumbnail_url &&
      onRegenerate
    ) {
      regeneratedRef.current = true;
      onRegenerate(project);
    }
  }} />;
}

function ProjectCard({ project, index, onThumbnailUpdate }) {
  const url = typeof project.url === "string" ? project.url.trim() : "";
  const hasUrl = /^https?:\/\//i.test(url);
  const domain = hasUrl ? url.replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/$/, "") : "Link not added";
  const tags = [...new Set([project.industry, project.platform].filter(Boolean))];
  const body = <>
    <div className="wk-shot">
      <ProjectThumbnail project={project} index={index} alt={`${project.name} homepage`} onRegenerate={onThumbnailUpdate} />
    </div>
    <div className="wk-meta">
      <div className="wk-text">
        <h3>{project.name}</h3>
        <span className="wk-domain">{domain}</span>
      </div>
      {hasUrl && <span className="wk-go" aria-hidden="true"><CtaArrow/></span>}
    </div>
    {tags.length > 0 && <ul className="wk-tags">{tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
  </>;
  return hasUrl
    ? <a className="wk-card" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${project.name}, visit ${domain} (opens in a new tab)`}>{body}</a>
    : <div className="wk-card">{body}</div>;
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
  const lastDataRef = useRef(data);
  useEffect(() => {
    const previousData = lastDataRef.current;
    if (JSON.stringify(draft) === JSON.stringify(previousData)) {
      const next = JSON.parse(JSON.stringify(data));
      next.hero.images = Array.isArray(next.hero.images)
        ? next.hero.images.slice(0, 3).concat(["", "", ""]).slice(0, 3)
        : [next.hero.image || "", "", ""];
      setDraft(next);
      setJsonValue(JSON.stringify(next, null, 2));
    } else {
      const previousProjects = new Map((previousData.projects || []).map(project => [String(project.id), project]));
      const incomingProjects = new Map((data.projects || []).map(project => [String(project.id), project]));
      setDraft(prev => ({
        ...prev,
        projects: prev.projects.map(project => {
          const previous = previousProjects.get(String(project.id));
          const incoming = incomingProjects.get(String(project.id));
          const thumbnailUnchanged = previous && incoming &&
            project.thumbnail_url === previous.thumbnail_url &&
            project.thumbnail_source === previous.thumbnail_source &&
            project.image === previous.image;
          return thumbnailUnchanged
            ? {
              ...project,
              thumbnail_url: incoming.thumbnail_url,
              thumbnail_source: incoming.thumbnail_source,
              image: incoming.image,
            }
            : project;
        }),
      }));
    }
    lastDataRef.current = data;
  }, [data]);
  const [tab, setTab] = useState("overview");
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [thumbnailActionIndex, setThumbnailActionIndex] = useState(null);
  const [jsonValue, setJsonValue] = useState(() => JSON.stringify(data, null, 2));
  const [jsonError, setJsonError] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [navQuery, setNavQuery] = useState("");
  const flash = (msg, ok = true) => { setToast({ msg, ok }); window.setTimeout(() => setToast(null), 3400); };

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
    setSaving(true);
    try {
      const next = {
        ...draft,
        projects: draft.projects.map(normalizeProjectThumbnail),
      };
      await saveData(next);
      setDraft(next);
      setData(next);
      setJsonValue(JSON.stringify(next, null, 2));
      flash("Saved — your website is updated.");
      const changedAutomaticUrls = new Set(next.projects
        .filter(project => project.thumbnail_source !== "manual" && data.projects.some(previous =>
          String(previous.id) === String(project.id) && previous.url !== project.url
        ))
        .map(project => String(project.id)));
      void generateMissingThumbnails(next.projects, changedAutomaticUrls);
    } catch (error) {
      flash(`Could not save: ${error.message}`, false);
    } finally { setSaving(false); }
  };
  const applyJSON = () => {
    try {
      const parsed = JSON.parse(jsonValue);
      if (!parsed || typeof parsed !== "object") throw new Error("JSON must contain an object.");
      setDraft(ensureShape(parsed));
      setJsonError("");
    } catch (error) { setJsonError(error.message); }
  };
  const setProjectThumbnail = (setter, index, values) => setter(prev => {
    const next = JSON.parse(JSON.stringify(prev));
    next.projects[index] = { ...next.projects[index], ...values };
    return next;
  });
  const applyGeneratedThumbnail = (projectId, thumbnail, allowManualOverride = false) => {
    const apply = prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        String(project.id) === String(projectId) && (allowManualOverride || project.thumbnail_source !== "manual")
          ? { ...project, ...thumbnail }
          : project
      ),
    });
    setData(apply);
    setDraft(apply);
  };
  const generateMissingThumbnails = async (projects, forceIds = new Set()) => {
    const pending = projects.filter(project =>
      project.thumbnail_source !== "manual" &&
      (!project.thumbnail_url || forceIds.has(String(project.id))) &&
      isValidProjectUrl(project.url)
    );
    for (let start = 0; start < pending.length; start += 3) {
      if (projectThumbnailFunctionUnavailable) return;
      await Promise.all(pending.slice(start, start + 3).map(async project => {
        try {
          const thumbnail = await generateProjectThumbnail(project, forceIds.has(String(project.id)));
          applyGeneratedThumbnail(project.id, thumbnail);
        } catch (error) {
          console.error(`Could not generate project thumbnail for ${project.name} (${project.id}).`, error);
        }
      }));
    }
  };
  const regenerateProjectThumbnail = async (index, force = true, useAutomatic = false) => {
    const project = draft.projects[index];
    if (project.thumbnail_source === "manual" && !useAutomatic) {
      throw new Error("Switch to automatic thumbnail before regenerating.");
    }
    setThumbnailActionIndex(index);
    try {
      const thumbnail = await generateProjectThumbnail(project, force, useAutomatic);
      applyGeneratedThumbnail(project.id, thumbnail, useAutomatic);
    } finally {
      setThumbnailActionIndex(null);
    }
  };
  const handleThumbnailUpload = async (index, file) => {
    setUploadingIndex(index);
    try {
      const image = await uploadThumbnail(file, draft.projects[index].id || `project-${index}`);
      setProjectThumbnail(setDraft, index, {
        thumbnail_url: image,
        thumbnail_source: "manual",
        image,
      });
    } catch (error) { window.alert(`Could not upload thumbnail: ${error.message}`); }
    finally { setUploadingIndex(null); }
  };
  const saveProjectThumbnail = async index => {
    try {
      const project = draft.projects[index];
      if (project.thumbnail_source === "manual" && !isValidProjectUrl(project.thumbnail_url)) {
        throw new Error("Enter a valid HTTP or HTTPS thumbnail URL, or upload an image.");
      }
      const next = {
        ...draft,
        projects: draft.projects.map((item, itemIndex) => normalizeProjectThumbnail(item, itemIndex)),
      };
      await saveData(next);
      setDraft(next);
      setData(next);
      if (next.projects[index].thumbnail_source !== "manual" && isValidProjectUrl(next.projects[index].url)) {
        try {
          const previous = data.projects.find(item => String(item.id) === String(project.id));
          const urlChanged = Boolean(previous && previous.url !== next.projects[index].url);
          const thumbnail = await generateProjectThumbnail(next.projects[index], urlChanged);
          applyGeneratedThumbnail(next.projects[index].id, thumbnail);
        } catch (error) {
          console.error(`Could not generate thumbnail for ${project.name} (${project.id}).`, error);
        }
      }
    } catch (error) {
      window.alert(`Could not save thumbnail: ${error.message}`);
    }
  };
  const useAutomaticThumbnail = async index => {
    const project = draft.projects[index];
    try {
      if (!isValidProjectUrl(project.url)) throw new Error("Add a valid website URL before switching to automatic thumbnails.");
      const next = {
        ...draft,
        projects: draft.projects.map((item, itemIndex) => normalizeProjectThumbnail(item, itemIndex)),
      };
      const savedProject = data.projects.find(item => String(item.id) === String(project.id));
      next.projects[index] = {
        ...next.projects[index],
        thumbnail_url: savedProject?.thumbnail_url || "",
        thumbnail_source: savedProject?.thumbnail_source || "automatic",
        image: savedProject?.image || "",
      };
      await saveData(next);
      setDraft(next);
      setData(next);
      const thumbnail = await generateProjectThumbnail(next.projects[index], true, true);
      if (thumbnail.thumbnail_url.startsWith("https://image.thum.io/")) {
        const updated = {
          ...next,
          projects: next.projects.map((item, itemIndex) =>
            itemIndex === index ? { ...item, ...thumbnail } : item
          ),
        };
        await saveData(updated);
        setDraft(updated);
        setData(updated);
      } else {
        applyGeneratedThumbnail(project.id, thumbnail, true);
      }
    } catch (error) {
      console.error(`Could not use automatic thumbnail for ${project.name} (${project.id}).`, error);
      window.alert(`Could not save the automatic thumbnail: ${error.message}`);
    }
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
      const fresh = {
        ...JSON.parse(JSON.stringify(DEFAULT_DATA)),
        projects: DEFAULT_DATA.projects.map((project, index) => normalizeProjectThumbnail(project, index)),
      };
      setData(fresh); setDraft(fresh); setJsonValue(JSON.stringify(fresh, null, 2));
      void generateMissingThumbnails(fresh.projects);
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
  const moveSection = (id, dir) => setDraft(prev => {
    const order = [...prev.layout.order];
    const i = order.indexOf(id); const k = i + dir;
    if (k < 0 || k >= order.length) return prev;
    [order[i], order[k]] = [order[k], order[i]];
    return { ...prev, layout: { ...prev.layout, order } };
  });
  const toggleSection = id => setDraft(prev => ({ ...prev, layout: { ...prev.layout, hidden: { ...prev.layout.hidden, [id]: !prev.layout.hidden[id] } } }));
  const listRows = (path, title) => {
    const rows = path.reduce((o, k) => o?.[k], draft) || [];
    return <div className="admin-editor-block"><div className="admin-block-head"><div><small>LIST</small><h3>{title}</h3></div><button className="add-project" onClick={()=>update(path,[...rows,"New item"])}>+ Add</button></div>{rows.map((r,i)=><div className="admin-feature-row" key={i}><input value={r} onChange={e=>update([...path,i],e.target.value)}/><button className="delete-feature" onClick={()=>update(path,rows.filter((_,x)=>x!==i))}>Remove</button></div>)}</div>;
  };
  const dirty = JSON.stringify(draft) !== JSON.stringify(data);
  const saveRef = useRef(save); saveRef.current = save;
  useEffect(() => {
    const onKey = e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") { e.preventDefault(); saveRef.current(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const tryClose = () => { if (dirty && !window.confirm("You have unsaved changes. Leave without saving?")) return; onClose(); };
  const NAV = [
    ["Start", [["overview","Overview","◈"]]],
    ["Page", [["layout","Sections & order","☰"],["hero","Hero & brand","✦"],["copy","Headings & text","T"],["stats","Numbers","#"],["trust","Brand names","∞"]]],
    ["Content", [["work","Projects","↗"],["services","Services","◎"],["shopify","Shopify","S"],["why","Why DigiSky","✓"],["pricing","Pricing","₹"],["about","About","A"],["process","Process","01"],["reviews","Client notes","★"]]],
    ["Site", [["footer","Footer & contact","▣"],["advanced","Advanced (JSON)","{}"]]],
  ];
  const q = navQuery.trim().toLowerCase();
  const sectionRows = draft.layout.order.map((id, i) => {
    const def = SECTION_DEFS.find(s => s[0] === id); if (!def) return null;
    const hidden = Boolean(draft.layout.hidden[id]);
    return <div className={`adm-sec-row${hidden ? " is-hidden" : ""}`} key={id}>
      <b>{String(i + 1).padStart(2, "0")}</b>
      <strong>{def[1]}</strong>
      <div className="adm-sec-tools">
        <button onClick={()=>setTab(def[2])}>Edit</button>
        <button onClick={()=>moveSection(id,-1)} disabled={i===0} aria-label="Move up">↑</button>
        <button onClick={()=>moveSection(id,1)} disabled={i===draft.layout.order.length-1} aria-label="Move down">↓</button>
        <button className={`adm-switch${hidden ? "" : " on"}`} onClick={()=>toggleSection(id)} aria-pressed={!hidden}>{hidden ? "Hidden" : "Visible"}</button>
      </div>
    </div>;
  });
  const copyGroup = (title, key, fields) => <div className="admin-editor-block" key={key}><div className="admin-block-head"><div><small>SECTION TEXT</small><h3>{title}</h3></div></div>{fields.map(([label, f, type]) => field(label, ["copy", key, f], type || "text"))}</div>;
  return <div className="adm admin-v2">
    <header className="adm-top">
      <div className="adm-brand"><img src="/logo.png" alt=""/><div><b>DigiSky</b><small>Content Studio</small></div></div>
      <div className={`adm-status${dirty ? " is-dirty" : ""}`}><i/>{dirty ? "Unsaved changes" : "All changes saved"}</div>
      <div className="adm-top-actions"><a href="/" target="_blank" rel="noreferrer">View site ↗</a><button className="adm-ghost" onClick={exportData}>Export</button><button className="adm-save" onClick={save} disabled={saving || !dirty}>{saving ? "Saving…" : "Save changes"}</button><button className="adm-close" onClick={tryClose} aria-label="Close content studio">×</button></div>
    </header>
    <div className="adm-body">
      <nav className="adm-nav" aria-label="Admin sections">
        <label className="adm-search"><input placeholder="Search sections…" value={navQuery} onChange={e=>setNavQuery(e.target.value)}/></label>
        {NAV.map(([group, items]) => { const shown = items.filter(([id,label]) => !q || label.toLowerCase().includes(q) || id.includes(q)); return shown.length ? <div className="adm-group" key={group}><small>{group}</small>{shown.map(([id,label,icon])=><button className={tab===id?"active":""} key={id} onClick={()=>setTab(id)}><b>{icon}</b>{label}</button>)}</div> : null; })}
        <button className="adm-danger" onClick={reset}>Reset to default content</button>
      </nav>
      <div className="adm-scroll"><div className="adm-page">
      {tab === "overview" && <div className="admin-dashboard"><div className="admin-welcome"><span className="tag-chip">LIVE WEBSITE</span><h3>Control every part of your website.</h3><p>Reorder or hide sections, edit every heading and paragraph, manage projects and pricing. Press Ctrl/⌘ + S to save at any time.</p><div className="adm-welcome-actions"><button className="adm-save adm-save-lg" onClick={save} disabled={saving || !dirty}>{saving ? "Saving…" : "Save changes"}</button><a className="adm-ghost-dark" href="/" target="_blank" rel="noreferrer">Open live site ↗</a></div></div><div className="admin-stat-grid"><div><strong>{draft.projects?.length || 0}</strong><span>Projects</span></div><div><strong>{draft.layout.order.filter(id=>!draft.layout.hidden[id]).length}/{draft.layout.order.length}</strong><span>Sections visible</span></div><div><strong>{draft.services?.length || 0}</strong><span>Core services</span></div><div><strong>{draft.testimonials?.length || 0}</strong><span>Client notes</span></div></div><div className="admin-quick-grid">{[["layout","Sections & order","Show, hide and reorder page sections"],["copy","Headings & text","Every section heading, FAQ and CTA"],["work","Projects","Portfolio cards, links & thumbnails"],["hero","Hero & brand","Headline, images and brand details"],["pricing","Pricing","Package, price and features"],["advanced","Advanced (JSON)","Edit any stored value directly"]].map(([id,t,d])=><button key={id} onClick={()=>setTab(id)}><b>{t}</b><span>{d}</span><i>↗</i></button>)}</div></div>}

      {tab === "layout" && <><div className="admin-section-title"><span>☰</span><div><h3>Sections & order</h3><p>Turn sections on or off and move them up or down. The live site follows this order exactly.</p></div></div><div className="adm-sec-list">{sectionRows}</div></>}

      {tab === "copy" && <><div className="admin-section-title"><span>T</span><div><h3>Headings & text</h3><p>Edit the tag, heading and description of every section, plus the FAQ, ticker strip and final call-to-action.</p></div></div>
        {copyGroup("Our work","work",[["Tag","tag"],["Heading","title"],["Description","text","textarea"]])}
        {copyGroup("Services","services",[["Tag","tag"],["Heading — line 1","titleA"],["Heading — line 2","titleB"],["Description","text","textarea"]])}
        {copyGroup("FAQ","faq",[["Tag","tag"],["Heading","title"],["Description","text","textarea"]])}
        {pairRows(["copy","faq","items"],"FAQ questions & answers","Question","Answer")}
        {copyGroup("How it works","process",[["Tag","tag"],["Heading","title"],["Description","text","textarea"]])}
        {copyGroup("Client notes","testimonials",[["Tag","tag"],["Heading — line 1","titleA"],["Heading — line 2","titleB"],["Description","text","textarea"]])}
        {copyGroup("Final call-to-action","cta",[["Tag","tag"],["Heading","title"],["Description","text","textarea"]])}
        {field("CTA button text",["cta","button"])}
        {listRows(["marqueeItems"],"Services ticker strip")}
        {listRows(["hero","trustItems"],"Hero checklist")}
      </>}

      {tab === "hero" && <><div className="admin-section-title"><span>01</span><div><h3>Hero & brand</h3><p>Control the first impression and the header brand information.</p></div></div>{field("Brand name",["brand","name"])}{field("Tagline",["brand","tagline"])}{field("Hero kicker",["hero","kicker"])}{field("Hero title — line 1",["hero","titleA"])}{field("Hero title — line 2",["hero","titleB"])}{field("Hero title — line 3",["hero","titleC"])}{field("Hero description",["hero","description"],"textarea")}<div className="admin-subtitle">Hero images</div><div className="hero-image-admin-grid">{(draft.hero.images || []).map((image,index)=><div className="hero-image-admin" key={index}><strong>Image {index+1}</strong><div className="thumbnail-upload"><label className="thumbnail-upload-button">{image?"Change image":"Upload image"}<input type="file" accept="image/*" onChange={e=>{const file=e.target.files?.[0];if(file)handleHeroImageUpload(index,file);e.target.value=""}}/></label>{image&&<button className="delete-feature" onClick={()=>update(["hero","images",index],"")}>Remove</button>}</div>{image&&<a className="thumbnail-preview" href={image} target="_blank" rel="noreferrer"><img src={image} alt="Hero"/><span>View image</span></a>}</div>)}</div></>}

      {tab === "stats" && <><div className="admin-section-title"><span>02</span><div><h3>Numbers & proof</h3><p>Edit the four proof cards shown in “The numbers don’t lie”.</p></div></div>{field("Section tag",["proof","tag"])}{field("Heading",["proof","title"])}{field("Description",["proof","description"],"textarea")}<div className="admin-proof-editor">{[0,1,2,3].map(i=><div className="admin-repeat-card" key={i}><div className="admin-repeat-top"><b>0{i+1}</b></div><input placeholder="Big value" value={draft.proof.values?.[i]||""} onChange={e=>update(["proof","values",i],e.target.value)}/><input placeholder="Card label" value={draft.proof.labels?.[i]||""} onChange={e=>update(["proof","labels",i],e.target.value)}/></div>)}</div></>}

      {tab === "trust" && <><div className="admin-section-title"><span>03</span><div><h3>Brand rail</h3><p>These names power the running “Worked with amazing brands” section.</p></div></div>{field("Eyebrow",["trust","eyebrow"])}<div className="admin-editor-block"><div className="admin-block-head"><div><small>BRANDS</small><h3>Portfolio brand names</h3></div></div>{(draft.trust.names||[]).map((name,i)=><div className="admin-feature-row" key={i}><input value={name} onChange={e=>update(["trust","names",i],e.target.value)}/><button className="delete-feature" onClick={()=>removeAt(["trust","names"],i)}>Delete</button></div>)}<button className="add-project" onClick={()=>addTo(["trust","names"],"New brand")}>+ Add brand</button></div><div className="admin-subtitle">Running marquee</div><p className="admin-help">Edit the services and topics used in the top running strip.</p>{(draft.marqueeItems||[]).map((item,i)=><div className="admin-feature-row" key={i}><input value={item} onChange={e=>update(["marqueeItems",i],e.target.value)}/><button className="delete-feature" onClick={()=>removeAt(["marqueeItems"],i)}>Delete</button></div>)}<button className="add-project" onClick={()=>addTo(["marqueeItems"],"NEW SERVICE")}>+ Add marquee item</button></>}

      {tab === "work" && <><div className="admin-section-title"><span>02</span><div><h3>Portfolio manager</h3><p>Manage permanent project thumbnails. Automatic screenshots are stored in Supabase Storage; manual images always take priority.</p></div></div><div className="projects-admin-top"><button className="add-project" onClick={()=>setDraft(prev=>({...prev,projects:[...prev.projects,{id:Date.now(),name:"New Project",category:"Business",industry:"",platform:"Custom",description:"",image:"",thumbnail_url:"",thumbnail_source:"automatic",url:""}]}))}>+ Add project</button></div>{draft.projects.map((p,i)=><div className="admin-project admin-project-v2" key={p.id}><div className="admin-project-title"><b>{String(i+1).padStart(2,"0")}</b><strong>{p.name || "Untitled project"}</strong><button className="delete-project" onClick={()=>removeAt(["projects"],i)}>Delete</button></div><div className="admin-two-col"><input placeholder="Project name" value={p.name||""} onChange={e=>update(["projects",i,"name"],e.target.value)}/><input placeholder="Category" value={p.category||""} onChange={e=>update(["projects",i,"category"],e.target.value)}/><input placeholder="Industry" value={p.industry||""} onChange={e=>update(["projects",i,"industry"],e.target.value)}/><input placeholder="Platform" value={p.platform||""} onChange={e=>update(["projects",i,"platform"],e.target.value)}/></div><input placeholder="Website URL" value={p.url||""} onChange={e=>update(["projects",i,"url"],e.target.value)}/><textarea placeholder="Description" value={p.description||""} onChange={e=>update(["projects",i,"description"],e.target.value)}/><div className="project-thumbnail-admin"><div className="project-thumbnail-admin-head"><strong>Thumbnail</strong><span className={p.thumbnail_source==="manual"?"manual":"automatic"}>{p.thumbnail_source==="manual"?"Manual thumbnail":"Automatic thumbnail"}</span></div><a className="thumbnail-preview" href={getProjectThumbnailCandidates(p,i)[0]} target="_blank" rel="noreferrer"><ProjectThumbnail project={p} index={i} alt={`${p.name || "Project"} thumbnail preview`} loading="lazy"/><span>Current thumbnail preview</span></a><label className="admin-field"><span>Thumbnail URL</span><input type="url" placeholder="https://example.com/image.jpg" value={p.thumbnail_url||""} onChange={e=>setProjectThumbnail(setDraft,i,{thumbnail_url:e.target.value,thumbnail_source:"manual",image:e.target.value})}/></label><div className="thumbnail-upload"><label className="thumbnail-upload-button">{uploadingIndex===i?"Uploading…":p.thumbnail_source==="manual"?"Change thumbnail":"Upload thumbnail"}<input type="file" accept="image/*" disabled={uploadingIndex!==null||thumbnailActionIndex!==null} onChange={e=>{const file=e.target.files?.[0];if(file)handleThumbnailUpload(i,file);e.target.value=""}}/></label><button className="save" disabled={uploadingIndex!==null||thumbnailActionIndex!==null} onClick={()=>saveProjectThumbnail(i)}>Save</button><button className="export" disabled={uploadingIndex!==null||thumbnailActionIndex!==null||!isValidProjectUrl(p.url)} onClick={()=>useAutomaticThumbnail(i)}>Use Automatic Thumbnail</button><button className="export" disabled={uploadingIndex!==null||thumbnailActionIndex!==null||p.thumbnail_source==="manual"||!isValidProjectUrl(p.url)} onClick={()=>regenerateProjectThumbnail(i,true).catch(error=>{console.error(`Could not regenerate thumbnail for ${p.name} (${p.id}).`,error);})}>{thumbnailActionIndex===i?"Generating…":"Regenerate Thumbnail"}</button></div></div></div>)}</>}

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
      </div></div>
    </div>
    {toast && <div className={`adm-toast ${toast.ok ? "ok" : "err"}`} role="status">{toast.msg}</div>}
  </div>;
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
    <div className="how-head"><div><span className="tag-chip">{data.copy.process.tag}</span><h2>{data.copy.process.title}</h2></div><p>{data.copy.process.text}</p></div>
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
  // "selected" is the toggle position and changes instantly on click.
  // "shown" is the content on screen; it swaps after the exit animation finishes.
  const [selected, setSelected] = useState("other");
  const [shown, setShown] = useState("other");
  const [leaving, setLeaving] = useState(false);
  const [wave, setWave] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [hinted, setHinted] = useState(false);
  const sectionRef = useRef(null);
  const toggleRef = useRef(null);
  const contentRef = useRef(null);
  const timerRef = useRef(0);
  const config = data.why || {};
  const isDigi = shown === "digisky";
  const switched = Boolean(wave);
  const items = isDigi ? (config.digi || []) : (config.other || []);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  // Play the entrance when the section scrolls into view, and nudge the switch once so people notice it.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) { setRevealed(true); setHinted(true); return undefined; }
    const watch = (node, onSee, threshold) => {
      if (!node) return () => {};
      const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { onSee(); observer.disconnect(); } }, { threshold });
      observer.observe(node);
      return () => observer.disconnect();
    };
    const stopContent = watch(contentRef.current, () => setRevealed(true), 0.2);
    const stopToggle = watch(toggleRef.current, () => setHinted(true), 0.9);
    return () => { stopContent(); stopToggle(); };
  }, []);

  const choose = next => {
    if (next === selected) return;
    window.clearTimeout(timerRef.current);
    setSelected(next);
    setLeaving(true);
    const section = sectionRef.current;
    const toggle = toggleRef.current;
    if (section && toggle) {
      const s = section.getBoundingClientRect();
      const t = toggle.getBoundingClientRect();
      setWave(prev => ({ id: (prev?.id || 0) + 1, x: t.left - s.left + t.width / 2, y: t.top - s.top + t.height / 2, mode: next }));
    } else {
      setWave(prev => ({ id: (prev?.id || 0) + 1, x: 0, y: 0, mode: next }));
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timerRef.current = window.setTimeout(() => { setShown(next); setLeaving(false); }, reduceMotion ? 0 : 340);
  };
  const onToggleKey = event => {
    if (event.key === "ArrowLeft") { event.preventDefault(); choose("other"); }
    if (event.key === "ArrowRight") { event.preventDefault(); choose("digisky"); }
  };

  return <section ref={sectionRef} className={`why-switch-section section${switched ? " is-switched" : ""}${leaving ? " is-leaving" : ""}`} id="why-digisky" data-mode={selected}>
    {wave && <span key={wave.id} className={`why-wave why-wave-${wave.mode}`} style={{ left: wave.x, top: wave.y }} aria-hidden="true"/>}
    <div className="why-switch-head"><span className="why-switch-tag">{config.tag || "WHY DIGISKY?"}</span><div className="why-title-stack"><h2 className={isDigi ? "is-active" : ""} aria-hidden={!isDigi}>{config.digiTitle || "Your brand on DigiSky."}</h2><h2 className={!isDigi ? "is-active" : ""} aria-hidden={isDigi}>{config.otherTitle || "Your brand without the usual friction."}</h2></div><p>{config.subtitle || "Flip the switch. See the difference."}</p></div>
    <div ref={toggleRef} className={`why-switch-toggle${hinted ? " is-hinted" : ""}`} role="tablist" aria-label="Why DigiSky comparison" data-selected={selected} onKeyDown={onToggleKey}>
      <span className="why-toggle-thumb" aria-hidden="true"/>
      <button type="button" role="tab" aria-selected={selected === "other"} onClick={()=>choose("other")}>Typical agency</button>
      <button type="button" role="tab" aria-selected={selected === "digisky"} onClick={()=>choose("digisky")}>DigiSky</button>
    </div>
    <div ref={contentRef} className={`why-switch-content ${isDigi ? "is-digisky" : "is-other"}${revealed ? " is-revealed" : ""}`}>
      <div className="why-switch-visual">
        <div className="why-device-card" key={shown}>
          <div className="why-orbit orbit-one"/><div className="why-orbit orbit-two"/>
          <div className="why-core" aria-hidden="true"><span className="why-emoji">{isDigi ? (config.digiEmoji || "🤩") : (config.otherEmoji || "🤯")}</span></div>
          <div className="why-spark spark-one">✦</div><div className="why-spark spark-two">✦</div><div className="why-spark spark-three">✦</div>
          {switched && <div className="why-burst" aria-hidden="true">{[0,1,2,3,4,5,6,7].map(i => <i key={i} style={{ "--a": `${i * 45}deg` }}/>)}</div>}
          <div className="why-progress"><span/></div>
          <strong>{isDigi ? (config.digiStatus || "Built to move.") : (config.otherStatus || "Still figuring it out…")}</strong>
          <small>{isDigi ? "strategy · design · build · growth" : "brief · handoff · revisions · launch"}</small>
        </div>
      </div>
      <div className="why-switch-list" aria-live="polite">{items.map(([title,desc],index)=><article className="why-switch-item" key={`${shown}-${index}`} style={{"--delay":`${index*80}ms`,"--i":index}}><span className="why-switch-icon">{isDigi ? "✓" : "×"}</span><div><h3>{title}</h3><p>{desc}</p></div></article>)}</div>
    </div>
  </section>;
}

function App() {
  const [data, setData] = useState(loadData);
  const isAdminRoute = window.location.pathname.replace(/\/$/,"") === "/admin" || new URLSearchParams(window.location.search).has("admin");
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("digisky_admin_ok") === "1");
  const [adminOpen, setAdminOpen] = useState(isAdminRoute);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    let active = true;
    let idleCallbackId;
    let timeoutId;
    const loadRemoteContent = () => {
      fetchRemoteData()
        .then(async remote => {
          if (active && remote) {
            const remoteProjects = Array.isArray(remote.projects)
              ? remote.projects.map(normalizeProjectThumbnail)
              : undefined;
            setData(prev => ensureShape({
              ...prev,
              ...remote,
              ...(remoteProjects ? { projects: remoteProjects } : {}),
              categories: (Array.isArray(remote.categories) && remote.categories.length ? remote.categories : prev.categories).filter(category => category !== "E-commerce"),
            }));
            if (remoteProjects) {
              const pending = remoteProjects.filter(project =>
                project.thumbnail_source !== "manual" &&
                !project.thumbnail_url &&
                isValidProjectUrl(project.url)
              );
              for (let start = 0; start < pending.length; start += 3) {
                if (projectThumbnailFunctionUnavailable) break;
                await Promise.all(pending.slice(start, start + 3).map(async project => {
                  try {
                    const thumbnail = await generateProjectThumbnail(project);
                    if (!active) return;
                    setData(prev => ({
                      ...prev,
                      projects: prev.projects.map(current =>
                        String(current.id) === String(project.id) && current.thumbnail_source !== "manual"
                          ? { ...current, ...thumbnail }
                          : current
                      ),
                    }));
                  } catch (error) {
                    console.warn(`Could not generate project thumbnail for ${project.name} (${project.id}).`, error);
                  }
                }));
              }
            }
          }
        })
        .catch(error => console.warn("Remote content unavailable; using local content.", error.message));
    };
    const scheduleRemoteContent = () => {
      if ("requestIdleCallback" in window) {
        idleCallbackId = window.requestIdleCallback(loadRemoteContent, { timeout: 2000 });
      } else {
        timeoutId = window.setTimeout(loadRemoteContent, 1000);
      }
    };
    if (document.readyState === "complete") scheduleRemoteContent();
    else window.addEventListener("load", scheduleRemoteContent, { once: true });
    return () => {
      active = false;
      window.removeEventListener("load", scheduleRemoteContent);
      if (idleCallbackId !== undefined && "cancelIdleCallback" in window) window.cancelIdleCallback(idleCallbackId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
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
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, WORK_PREVIEW_COUNT);
  const filterOptions = useMemo(() => data.categories
    .map(name => ({ name, count: name === "All" ? projects.length : projects.filter(project => projectCategory(project) === name).length }))
    .filter(option => option.name === "All" || option.count > 0), [data.categories, projects]);
  const regenerateUnavailableThumbnail = project => {
    generateProjectThumbnail(project, true)
      .then(thumbnail => setData(prev => ({
        ...prev,
        projects: prev.projects.map(current =>
          String(current.id) === String(project.id) && current.thumbnail_source !== "manual"
            ? { ...current, ...thumbnail }
            : current
        ),
      })))
      .catch(error => console.error(`Could not regenerate unavailable thumbnail for ${project.name} (${project.id}).`, error));
  };

  const closeAdmin = () => {
    if (window.location.pathname.replace(/\/$/,"")==="/admin") { window.location.href="/"; }
    else { setAdminOpen(false); }
  };

  const copy = data.copy;
  const layout = data.layout;
  const sectionNodes = {
    hero: (
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
    ),
    marquee: (
      <MarqueeStrip items={data.marqueeItems} />
    ),
    work: (
      <section id="work" className="wk" aria-labelledby="work-title">
          <div className="wk-inner">
            <div className="wk-head">
              <div><span className="tag-chip">{copy.work.tag}</span><h2 id="work-title">{copy.work.title}</h2></div>
              <p>{copy.work.text}</p>
            </div>
            <div className="wk-filters" role="group" aria-label="Filter projects by category">
              {filterOptions.map(option => <button key={option.name} type="button" className="wk-filter" aria-pressed={effectiveFilter === option.name} onClick={()=>{ setActiveFilter(option.name); setShowAll(false); }}>{option.name}<span>{option.count}</span></button>)}
            </div>
            <div className="wk-grid">
              {visibleProjects.map((p,i)=><ProjectCard project={p} index={i} onThumbnailUpdate={regenerateUnavailableThumbnail} key={`${p.id || "project"}-${p.name}-${i}`}/>)}
            </div>
            {filteredProjects.length > WORK_PREVIEW_COUNT && <div className="wk-more"><button type="button" onClick={()=>setShowAll(v=>!v)}>{showAll ? "Show fewer projects" : `Show all ${filteredProjects.length} projects`}</button></div>}
          </div>
        </section>
    ),
    proof: (
      <ProofNumbers data={data} />
    ),
    services: (
      <section id="services" className="services-section section services-redesigned">
          <div className="services-intro"><div><span className="tag-chip">{copy.services.tag}</span><h2 className="services-heading">{copy.services.titleA}<br/><em>{copy.services.titleB}</em></h2></div><p>{copy.services.text}</p></div>
          <div className="services-list services-card-grid">{data.services.map((s,i)=><article className={`service-card ${i === 0 ? "service-featured" : ""}`} key={i}><div className="service-card-top"><span>{String(i + 1).padStart(2,"0")}</span><b>↗</b></div><div><small>{i === 0 ? "ECOMMERCE" : i === 1 ? "WEBSITE" : i === 2 ? "DEVELOPMENT" : "CONVERSION"}</small><h3>{s[0]}</h3><p>{s[1]}</p></div><div className="service-card-bottom"><span>Explore service</span><i/></div></article>)}</div>
        </section>
    ),
    shopify: (
      <ShopifyExpertise projects={projects} data={data}/>
    ),
    pricing: (
      <Pricing data={data}/>
    ),
    faq: (
      <ShopifyFaq copy={copy.faq}/>
    ),
    why: (
      <WhyDigiSky data={data}/>
    ),
    process: (
      <HowItWorks data={data}/>
    ),
    about: (
      <AboutSection data={data}/>
    ),
    testimonials: (
      <Testimonials data={data}/>
    ),
    cta: (
      <section id="contact" className="final-cta section">
          <span className="tag-chip">{copy.cta.tag}</span>
          <h2>{copy.cta.title}</h2>
          <p>{copy.cta.text}</p>
          <a className="pill-button light" href={waLink(data.brand.whatsapp, "Hi DigiSky, I want to start a project.")} target="_blank" rel="noreferrer">{data.cta.button}</a>
        </section>
    ),
  };
  return (
    <div id="top">
      <IntroSplash />
      <Header data={data}/>
      {adminOpen && isAdminRoute && (unlocked
        ? <AdminPanel data={data} setData={setData} onClose={closeAdmin}/>
        : <AdminGate onUnlock={()=>setUnlocked(true)}/>
      )}
      <main id="top">
        {layout.order.filter(id => sectionNodes[id] && !layout.hidden[id]).map(id => <React.Fragment key={id}>{sectionNodes[id]}</React.Fragment>)}
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
      <DigiSkyAssistant data={data} />
      <BackToTop />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);