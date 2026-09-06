import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { supabase } from "./lib/supabase";

const ADMIN_PASSWORD = "digisky2026";

const DEFAULT_DATA = {
  brand: { name: "DigiSky", tagline: "Step Up Digitally", email: "team.digisky@gmail.com", whatsapp: "", instagram: "https://www.instagram.com/digisky.world/" },
  hero: { kicker: "Shopify & WordPress studio", titleA: "Websites", titleB: "built to", titleC: "sell.", description: "DigiSky designs and builds high-converting Shopify, WordPress and custom stores for ambitious Indian and global brands — 34 launched and counting." },
  stats: [["34+", "Stores launched"], ["Shopify", "& WordPress"], ["7,500", "Starting price (INR)"], ["India + Global", "Clients served"]],
  pricing: { title: "Shopify Website", price: "\u20B97,500", description: "A polished Shopify storefront designed, configured and made ready to launch — without needing a premium theme.", features: ["Custom homepage design", "Mobile responsive layout", "Product & collection setup", "Navigation, pages & basic policies", "Payment / shipping setup assistance", "Basic SEO structure", "Launch-ready testing"] },
  projects: [{"id": 1, "name": "Aaysa", "industry": "E-commerce", "platform": "Shopify", "description": "E-commerce website designed for a polished, conversion-focused digital experience.", "url": "https://aaysa.store", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://aaysa.store"}, {"id": 2, "name": "Bonglooms", "industry": "Textiles & Fashion", "platform": "Shopify", "description": "Textiles & Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://bonglooms.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://bonglooms.com"}, {"id": 3, "name": "Tattva Elixir", "industry": "Beauty & Wellness", "platform": "Shopify", "description": "Beauty & Wellness website designed for a polished, conversion-focused digital experience.", "url": "https://www.tattvaelixir.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.tattvaelixir.com"}, {"id": 4, "name": "Miraza", "industry": "Fashion E-commerce", "platform": "Shopify", "description": "Fashion E-commerce website designed for a polished, conversion-focused digital experience.", "url": "https://miraza.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://miraza.in"}, {"id": 5, "name": "Popout Fashion", "industry": "Fashion Brand", "platform": "Shopify", "description": "Fashion Brand website designed for a polished, conversion-focused digital experience.", "url": "https://popoutfashion.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://popoutfashion.com"}, {"id": 6, "name": "Presquo", "industry": "Premium Brand", "platform": "Shopify", "description": "Premium Brand website designed for a polished, conversion-focused digital experience.", "url": "https://presquo.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://presquo.com"}, {"id": 7, "name": "Dr Aroras", "industry": "Healthcare", "platform": "Website Development", "description": "Healthcare website designed for a polished, conversion-focused digital experience.", "url": "https://www.draroras.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.draroras.com"}, {"id": 8, "name": "Tota Cart", "industry": "E-commerce", "platform": "E-commerce", "description": "E-commerce website designed for a polished, conversion-focused digital experience.", "url": "https://totacart.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://totacart.in"}, {"id": 9, "name": "Nitarya", "industry": "Fashion", "platform": "Shopify", "description": "Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://nitarya.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://nitarya.com"}, {"id": 10, "name": "Take A Chef", "industry": "Hospitality", "platform": "Website", "description": "Hospitality website designed for a polished, conversion-focused digital experience.", "url": "https://www.takeachef.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.takeachef.com"}, {"id": 11, "name": "Paivi", "industry": "Fashion", "platform": "Shopify", "description": "Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://www.paivi.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.paivi.in"}, {"id": 12, "name": "Maestra Jewellery", "industry": "Luxury Jewellery", "platform": "E-commerce", "description": "Luxury Jewellery website designed for a polished, conversion-focused digital experience.", "url": "https://maestrajewellery.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://maestrajewellery.com"}, {"id": 13, "name": "Equitia", "industry": "Lifestyle", "platform": "Shopify", "description": "Lifestyle website designed for a polished, conversion-focused digital experience.", "url": "https://www.equitia.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.equitia.in"}, {"id": 14, "name": "The House of Eraya", "industry": "Fashion", "platform": "Shopify", "description": "Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://www.thehouseoferaya.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.thehouseoferaya.in"}, {"id": 15, "name": "The Green Ritual", "industry": "Wellness", "platform": "Shopify", "description": "Wellness website designed for a polished, conversion-focused digital experience.", "url": "https://thegreenritual.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://thegreenritual.com"}, {"id": 16, "name": "Krinks", "industry": "Fashion", "platform": "Shopify", "description": "Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://krinks.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://krinks.in"}, {"id": 17, "name": "Acharima Delights", "industry": "Food & Delights", "platform": "E-commerce", "description": "Food & Delights website designed for a polished, conversion-focused digital experience.", "url": "https://acharimaadelights.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://acharimaadelights.com"}, {"id": 18, "name": "RP Paris", "industry": "Luxury Fashion", "platform": "Shopify", "description": "Luxury Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://www.rpparis.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.rpparis.com"}, {"id": 19, "name": "Munchlet", "industry": "Food & Beverage", "platform": "E-commerce", "description": "Food & Beverage website designed for a polished, conversion-focused digital experience.", "url": "https://www.munchlet.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.munchlet.com"}, {"id": 20, "name": "Inkwalkers", "industry": "Art & Creative", "platform": "Website", "description": "Art & Creative website designed for a polished, conversion-focused digital experience.", "url": "https://inkwalkers.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://inkwalkers.com"}, {"id": 21, "name": "Tiara Skin", "industry": "Skincare", "platform": "Shopify", "description": "Skincare website designed for a polished, conversion-focused digital experience.", "url": "https://tiara.skin", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://tiara.skin"}, {"id": 22, "name": "The Premium Basket", "industry": "Premium E-commerce", "platform": "Shopify", "description": "Premium E-commerce website designed for a polished, conversion-focused digital experience.", "url": "https://thepremiumbasket.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://thepremiumbasket.com"}, {"id": 23, "name": "Haus of Jawhar", "industry": "Luxury Fashion", "platform": "Shopify", "description": "Luxury Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://hausofjawhar.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://hausofjawhar.com"}, {"id": 24, "name": "Pancha Bhootani", "industry": "Wellness", "platform": "Shopify", "description": "Wellness website designed for a polished, conversion-focused digital experience.", "url": "https://panchabhootani.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://panchabhootani.com"}, {"id": 25, "name": "Bevy Good", "industry": "Lifestyle", "platform": "Shopify", "description": "Lifestyle website designed for a polished, conversion-focused digital experience.", "url": "https://www.bevygood.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.bevygood.com"}, {"id": 26, "name": "Innocent Fresh", "industry": "Food & Beverage", "platform": "E-commerce", "description": "Food & Beverage website designed for a polished, conversion-focused digital experience.", "url": "https://www.innocentfresh.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.innocentfresh.com"}, {"id": 27, "name": "Rare Blanc", "industry": "Premium Brand", "platform": "Shopify", "description": "Premium Brand website designed for a polished, conversion-focused digital experience.", "url": "https://www.rareblanc.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.rareblanc.com"}, {"id": 28, "name": "Uzvieco Store", "industry": "Lifestyle", "platform": "Shopify", "description": "Lifestyle website designed for a polished, conversion-focused digital experience.", "url": "https://uzviecostore.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://uzviecostore.com"}, {"id": 29, "name": "Alpino Super One", "industry": "Sports & Wellness", "platform": "Shopify", "description": "Sports & Wellness website designed for a polished, conversion-focused digital experience.", "url": "https://alpinosuperone.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://alpinosuperone.com"}, {"id": 30, "name": "The Skin Depth", "industry": "Skincare", "platform": "Shopify", "description": "Skincare website designed for a polished, conversion-focused digital experience.", "url": "https://www.theskindepth.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.theskindepth.com"}, {"id": 31, "name": "Guapha", "industry": "E-commerce", "platform": "E-commerce", "description": "E-commerce website designed for a polished, conversion-focused digital experience.", "url": "https://www.guapha.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.guapha.com"}, {"id": 32, "name": "Swasth Setu", "industry": "Healthcare", "platform": "Website", "description": "Healthcare website designed for a polished, conversion-focused digital experience.", "url": "https://swasthsetu.co.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://swasthsetu.co.in"}, {"id": 33, "name": "Drinkyasu", "industry": "Beverage", "platform": "Shopify", "description": "Beverage website designed for a polished, conversion-focused digital experience.", "url": "https://drinkyasu.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://drinkyasu.com"}, {"id": 34, "name": "Planto Store", "industry": "Plant Store", "platform": "Shopify", "description": "Plant Store website designed for a polished, conversion-focused digital experience.", "url": "https://www.plantostore.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.plantostore.com"}],
  services: [["Shopify stores", "Custom-built storefronts for brands ready to sell more, without a generic theme feel."], ["WordPress websites", "Flexible, content-friendly websites designed around how your business actually runs."], ["Custom development", "High-performance digital experiences built from scratch, without platform limitations."], ["Website redesigns", "Transform an outdated website into a premium, conversion-ready digital experience."]],
  featured: { title: "Design that does the selling.", description: "Every screen has a job — build trust, explain the offer, remove friction and make the next click obvious.", quoteBefore: "We don't ship templates. Every store is built around", quoteHighlight: "what the brand actually sells", quoteAfter: "and how people actually buy it.", metaTitle: "DigiSky Studio", metaText: "34 stores designed & shipped since launch" },
  about: { titleA: "Small studio.", titleB: "Big digital thinking.", text: "DigiSky is a creative digital studio focused on building modern websites and e-commerce experiences for ambitious brands. We combine strategy, design and development to create websites that don't just look premium — they perform.", points: ["Senior-level thinking on every project", "Built for speed, clarity and conversion", "A partner after launch, not just before"] },
  trust: { eyebrow: "Trusted by growing brands", names: ["Aaysa", "Bonglooms", "Tattva Elixir", "Miraza", "Popout", "Presquo"] },
  features: [["01", "Premium by default", "Thoughtful details, clear hierarchy and a visual system made to earn trust."], ["02", "Built to perform", "Fast, responsive experiences that make it easy for the right people to take action."], ["03", "A real partner", "Direct collaboration, honest advice and support that continues beyond launch."]],
  process: [["01", "Discover", "We learn the business, audience and opportunity."], ["02", "Shape", "We turn the brief into a focused digital direction."], ["03", "Design", "We create a distinctive system your brand can own."], ["04", "Build", "We develop, test and polish every interaction."], ["05", "Launch", "We go live with clarity and a plan for growth."]],
  testimonials: [{ name: "Aaysa team", company: "Aaysa", quote: "DigiSky turned a rough idea into a store that finally feels like our brand.", rating: 5 }],
  blog: [{ title: "What makes a storefront feel premium?", category: "Perspective", date: "2026-02-12", excerpt: "The details that turn a website visit into confidence, and confidence into a sale." }],
  cta: { title: "Have a project in mind?", text: "Let's build something people remember.", button: "Start a project" }
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
    };
    const savedProjects = Array.isArray(saved.projects) ? saved.projects : [];
    const byName = new Map(savedProjects.map(p => [String(p.name || "").trim().toLowerCase(), p]));
    const mappedDefaults = DEFAULT_DATA.projects.map((p) => {
      const old = byName.get(p.name.toLowerCase());
      return { ...p, ...(old || {}), url: p.url, image: p.image, id: old?.id ?? p.id };
    });
    const defaultNames = new Set(DEFAULT_DATA.projects.map(p => p.name.toLowerCase()));
    const custom = savedProjects.filter(p => !defaultNames.has(String(p.name || "").trim().toLowerCase()));
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

const PROJECT_FILTERS = ["All", "E-commerce", "Fashion", "Beauty", "Healthcare", "Food"];
function projectCategory(project) {
  if (project.category) return project.category;
  const text = `${project.industry || ""} ${project.name || ""}`.toLowerCase();
  if (/fashion|textile|jewellery|jewelry|apparel/.test(text)) return "Fashion";
  if (/beauty|wellness|skin|elixir/.test(text)) return "Beauty";
  if (/health|doctor|clinic|medical/.test(text)) return "Healthcare";
  if (/food|chef|cart|delight|drink|grocery/.test(text)) return "Food";
  if (/shopify|e-commerce|ecommerce/.test(`${text} ${project.platform || ""}`.toLowerCase())) return "E-commerce";
  return "Website";
}

function Arrow() { return <span aria-hidden="true">\u2197</span>; }

function InstagramIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/>
  </svg>;
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
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const navigate = id => { go(id); setMenuOpen(false); };
  return (
    <header className="site-header">
      <div className="site-header-in">
        <a className="brand" href="#top" onClick={(e)=>{e.preventDefault(); go("top")}}>
          <img src="/logo.png" alt="DigiSky logo" />
          <span>{data.brand.name}</span>
        </a>
        <nav className={menuOpen ? "open" : ""}>
          <button onClick={()=>navigate("work")}>Work</button>
          <button onClick={()=>navigate("services")}>Services</button>
          <button onClick={()=>navigate("about")}>About</button>
          <button onClick={()=>navigate("testimonials")}>Testimonials</button>
          <button onClick={()=>navigate("journal")}>Journal</button>
        </nav>
        <div className="header-actions">
          {data.brand.instagram && <a className="icon-link" href={data.brand.instagram} target="_blank" rel="noreferrer" aria-label="DigiSky on Instagram"><InstagramIcon/></a>}
          <a className="pill-button" href={waLink(data.brand.whatsapp, "Hi DigiSky, I want to start a project.")} target="_blank" rel="noreferrer">Start a project</a>
          <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={()=>setMenuOpen(v=>!v)}><span/><span/></button>
        </div>
      </div>
    </header>
  );
}

function TrustStrip({ data }) {
  return <section className="trust-strip"><div className="section trust-inner"><span>{data.trust.eyebrow}</span><div>{data.trust.names.map(name=><strong key={name}>{name}</strong>)}</div></div></section>;
}

function AboutSection({ data }) {
  return <section id="about" className="about section"><div className="about-grid"><div><span className="tag-chip">About DigiSky</span><h2>{data.about.titleA}<br/>{data.about.titleB}</h2><div className="about-stamp"><strong>DS</strong><span>Digital studio<br/>for ambitious brands</span></div></div><div><p>{data.about.text}</p><ul className="about-points">{data.about.points.map(point=><li key={point}><span>+</span>{point}</li>)}</ul><div className="about-metrics"><div><strong>34+</strong><span>launches</span></div><div><strong>100%</strong><span>custom thinking</span></div></div></div></div></section>;
}

function ProcessSection({ data }) {
  return <section id="process" className="process section"><div className="section-top"><div><span className="tag-chip">How we work</span><h2>Our process.</h2></div><p className="section-copy">A clear path from first conversation to a digital experience ready to grow with you.</p></div><div className="process-grid">{data.process.map(step=><div className="process-step" key={step[0]}><span>{step[0]}</span><h3>{step[1]}</h3><p>{step[2]}</p></div>)}</div></section>;
}

function Testimonials({ data }) {
  return <section id="testimonials" className="testimonials section"><div className="section-top"><div><span className="tag-chip">Client notes</span><h2>Good work travels.</h2></div><span className="testimonial-count">{String(data.testimonials.length).padStart(2,"0")} / client stories</span></div><div className="testimonial-grid">{data.testimonials.map((item, index)=><article className="testimonial" key={`${item.name}-${index}`}><span className="quote-mark">“</span><div className="rating">{"★".repeat(Number(item.rating || 5))}</div><blockquote>{item.quote}</blockquote><footer><strong>{item.name}</strong><span>{item.company}</span><em>Project partner</em></footer></article>)}</div></section>;
}

function Journal({ data }) {
  return <section id="journal" className="journal section"><div className="section-top"><div><span className="tag-chip">From the studio</span><h2>Ideas worth sharing.</h2></div><span className="project-count">Latest thinking</span></div><div className="journal-grid">{data.blog.map((post, index)=><article className={`journal-card ${index === 0 ? "journal-featured" : ""}`} key={`${post.title}-${index}`}><div className="journal-art"><span>{post.category}</span><b>↗</b><i>{String(index + 1).padStart(2,"0")}</i></div><div className="journal-copy"><small>{post.date}</small><h3>{post.title}</h3><p>{post.excerpt}</p><a href="#contact" className="journal-link">Read the note <Arrow/></a></div></article>)}</div></section>;
}

function HeroShowcase({ projects }) {
  const showcaseRef = React.useRef(null);
  const move = event => {
    const bounds = showcaseRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - .5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - .5) * 2;
    showcaseRef.current.style.setProperty("--parallax-x", `${x * 10}px`);
    showcaseRef.current.style.setProperty("--parallax-y", `${y * 10}px`);
  };
  const reset = () => { showcaseRef.current.style.setProperty("--parallax-x", "0px"); showcaseRef.current.style.setProperty("--parallax-y", "0px"); };
  const pick = (name, fallback) => projects.find(p => p.name === name) || fallback;
  const a = pick("Popout Fashion", projects[4] || projects[0]);
  const b = pick("Maestra Jewellery", projects[11] || projects[1]);
  const c = pick("Tiara Skin", projects[20] || projects[2]);
  return (
    <div className="hero-showcase" ref={showcaseRef} onPointerMove={move} onPointerLeave={reset} aria-hidden="true">
      {c && <div className="hs-card hs-c"><img src={c.image} alt="" loading="eager"/><span className="hs-tag">{c.name}</span></div>}
      {a && <div className="hs-card hs-a"><img src={a.image} alt="" loading="eager"/><span className="hs-tag">{a.name}</span></div>}
      {b && <div className="hs-card hs-b"><img src={b.image} alt="" loading="eager"/><span className="hs-tag">{b.name}</span></div>}
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

function ProjectCard({ project, index }) {
  const hasUrl = typeof project.url === "string" && /^https?:\/\//i.test(project.url.trim());
  const fallback = `/thumbnails/${(index % 34) + 1}.svg`;
  const remoteThumb = hasUrl ? `https://image.thum.io/get/width/1200/crop/760/noanimate/${project.url.trim()}` : "";
  const thumbnail = project.image || remoteThumb || fallback;
  const card = <article className="project-card">
    <div className="project-media">
      <img src={thumbnail} alt={`${project.name} project thumbnail`} loading={index < 12 ? "eager" : "lazy"} fetchPriority={index < 6 ? "high" : "auto"} decoding="async" onError={(e)=>{ if(e.currentTarget.dataset.fallback) return; e.currentTarget.dataset.fallback="1"; e.currentTarget.src=fallback; }} />
      <div className="project-overlay"><span>{hasUrl ? "View live website" : "Website link not added"}</span><Arrow/></div>
    </div>
    <div className="project-meta"><div><h3>{project.name}</h3><p>{project.industry}</p></div><div className="project-tags"><i/>{project.platform || projectCategory(project)}</div></div>
  </article>;
  return hasUrl ? <a className="project-link" href={project.url.trim()} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} website`}>{card}</a> : card;
}

function Pricing({ data }) {
  const message = `Hi DigiSky, I'm interested in the ${data.pricing.title} package (${data.pricing.price}).`;
  return (
    <section id="pricing" className="section pricing-section">
      <div className="pricing-grid">
        <div>
          <span className="tag-chip">Pricing</span>
          <h2>Everything you need<br/>to launch.</h2>
          <p className="section-copy">{data.pricing.description}</p>
        </div>
        <div className="price-card">
          <div className="price-top"><span>{data.pricing.title}</span><strong>{data.pricing.price}</strong></div>
          <div className="feature-list">
            {data.pricing.features.map((f,i)=><div key={i}><i>&#10003;</i><span>{f}</span></div>)}
          </div>
          <a className="pill-button dark" href={waLink(data.brand.whatsapp, message)} target="_blank" rel="noreferrer" style={{width:"100%",justifyContent:"center"}}>Get started</a>
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
  const [draft, setDraft] = useState(JSON.parse(JSON.stringify(data)));
  const [tab, setTab] = useState("home");

  const update = (path, value) => {
    setDraft(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      let obj = next;
      path.slice(0,-1).forEach(k => obj = obj[k]);
      obj[path[path.length-1]] = value;
      return next;
    });
  };

  const save = async () => {
    try {
      await saveData(draft);
      setData(draft);
      onClose();
    } catch (error) {
      window.alert(`Could not save to the live database: ${error.message}`);
    }
  };
  const reset = async () => {
    try {
      await saveData(DEFAULT_DATA);
      localStorage.removeItem("digisky_data");
      setData(DEFAULT_DATA);
      setDraft(JSON.parse(JSON.stringify(DEFAULT_DATA)));
    } catch (error) {
      window.alert(`Could not reset the live database: ${error.message}`);
    }
  };
  const exportData = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "digisky-data.json"; a.click();
    URL.revokeObjectURL(url);
  };

  const input = (label, path, type="text") => (
    <label className="admin-field"><span>{label}</span>
      {type === "textarea" ? <textarea value={path.reduce((o,k)=>o[k],draft)} onChange={e=>update(path,e.target.value)} /> :
      <input type={type} value={path.reduce((o,k)=>o[k],draft)} onChange={e=>update(path,e.target.value)} />}
    </label>
  );

  return (
    <aside className="admin-panel">
      <div className="admin-head"><div><small>DIGISKY</small><h2>Content Studio</h2></div><button onClick={onClose}>&times;</button></div>
      <div className="admin-tabs">
        {["home","pricing","projects","services","contact"].map(t=><button className={tab===t?"active":""} key={t} onClick={()=>setTab(t)}>{t}</button>)}
      </div>
      <div className="admin-scroll">
        <div className="admin-banner">Changes are saved to the shared Supabase database and appear on the live website after refresh.</div>
        {tab==="home" && <>
          {input("Main title \u2014 line 1",["hero","titleA"])}
          {input("Main title \u2014 line 2",["hero","titleB"])}
          {input("Main title \u2014 line 3",["hero","titleC"])}
          {input("Hero description",["hero","description"],"textarea")}
          <div className="admin-subtitle">Stats strip</div>
          {draft.stats.map((stat, i)=><div className="admin-project" key={i}>
            <div className="admin-project-title"><strong>Stat {i+1}</strong></div>
            <label className="admin-field"><span>Value</span><input value={stat[0]} onChange={e=>update(["stats",i,0],e.target.value)}/></label>
            <label className="admin-field"><span>Label</span><input value={stat[1]} onChange={e=>update(["stats",i,1],e.target.value)}/></label>
          </div>)}
          {input("About heading \u2014 line 1",["about","titleA"])}
          {input("About heading \u2014 line 2",["about","titleB"])}
          {input("About text",["about","text"],"textarea")}
          <div className="admin-subtitle">Trust strip</div>
          {input("Eyebrow",["trust","eyebrow"])}
          <label className="admin-field"><span>Client names (comma separated)</span><input value={draft.trust.names.join(", ")} onChange={e=>update(["trust","names"],e.target.value.split(",").map(name=>name.trim()).filter(Boolean))}/></label>
          <div className="admin-subtitle">Why choose us</div>
          {draft.features.map((feature,i)=><div className="admin-project" key={feature[0]}><div className="admin-project-title"><strong>{feature[0]}</strong></div><input value={feature[1]} onChange={e=>update(["features",i,1],e.target.value)}/><textarea value={feature[2]} onChange={e=>update(["features",i,2],e.target.value)}/></div>)}
          <div className="admin-subtitle">Final CTA</div>
          {input("Title",["cta","title"])}
          {input("Supporting line",["cta","text"])}
          {input("Button label",["cta","button"])}
          <div className="admin-subtitle">Featured section</div>
          {input("Heading",["featured","title"])}
          {input("Description",["featured","description"],"textarea")}
          {input("Quote before highlight",["featured","quoteBefore"],"textarea")}
          {input("Highlighted quote text",["featured","quoteHighlight"])}
          {input("Quote after highlight",["featured","quoteAfter"],"textarea")}
          {input("Card title",["featured","metaTitle"])}
          {input("Card subtitle",["featured","metaText"])}
        </>}
        {tab==="pricing" && <>
          {input("Package title",["pricing","title"])}
          {input("Price",["pricing","price"])}
          {input("Description",["pricing","description"],"textarea")}
          <div className="admin-subtitle">What's included</div>
          {draft.pricing.features.map((f,i)=><div className="admin-feature-row" key={i}><label className="admin-field"><span>Feature {i+1}</span><input value={f} onChange={e=>update(["pricing","features",i],e.target.value)}/></label><button type="button" className="delete-feature" onClick={()=>setDraft(prev=>({...prev,pricing:{...prev.pricing,features:prev.pricing.features.filter((_,idx)=>idx!==i)}}))}>Delete</button></div>)}
          <button type="button" className="add-project" onClick={()=>setDraft(prev=>({...prev,pricing:{...prev.pricing,features:[...prev.pricing.features,"New feature"]}}))}>+ Add feature</button>
        </>}
        {tab==="projects" && <div className="admin-projects">
          <div className="projects-admin-top">
            <p className="admin-help">All portfolio projects are shown on the website. Website links open in a new tab. Thumbnails are generated automatically from each website; you can still replace a thumbnail with your own image URL.</p>
            <button className="add-project" onClick={()=>setDraft(prev=>({...prev,projects:[...prev.projects,{id:Date.now(),name:"New Project",category:"E-commerce",industry:"E-commerce",platform:"Shopify",description:"Add your project description here.",image:"",url:""}]}))}>+ Add project</button>
          </div>
          {draft.projects.map((p,i)=><div className="admin-project" key={p.id}>
            <div className="admin-project-title"><b>{String(i+1).padStart(2,"0")}</b><strong>{p.name}</strong><button className="delete-project" onClick={()=>setDraft(prev=>({...prev,projects:prev.projects.filter((_,idx)=>idx!==i)}))}>Delete</button></div>
            <input placeholder="Project name" value={p.name} onChange={e=>update(["projects",i,"name"],e.target.value)}/>
            <input placeholder="Category (E-commerce, Fashion, Beauty...)" value={p.category || ""} onChange={e=>update(["projects",i,"category"],e.target.value)}/>
            <input placeholder="Industry" value={p.industry} onChange={e=>update(["projects",i,"industry"],e.target.value)}/>
            <input placeholder="Platform" value={p.platform} onChange={e=>update(["projects",i,"platform"],e.target.value)}/>
            <input placeholder="Website URL (https://...)" value={p.url || ""} onChange={e=>update(["projects",i,"url"],e.target.value)}/>
            <input placeholder="Custom thumbnail URL (optional)" value={p.image} onChange={e=>update(["projects",i,"image"],e.target.value)}/>
            <textarea placeholder="Description" value={p.description} onChange={e=>update(["projects",i,"description"],e.target.value)}/>
          </div>)}
        </div>}
        {tab==="services" && <>
          {draft.services.map((s,i)=><div className="admin-project" key={i}>
            <div className="admin-project-title"><strong>Service {i+1}</strong></div>
            <input value={s[0]} onChange={e=>update(["services",i,0],e.target.value)}/>
            <textarea value={s[1]} onChange={e=>update(["services",i,1],e.target.value)}/>
          </div>)}
        </>}
        {tab==="contact" && <>
          {input("WhatsApp number (country code + number)",["brand","whatsapp"])}
          {input("Email",["brand","email"])}
          {input("Instagram URL",["brand","instagram"])}
          <p className="admin-help">WhatsApp is used on Start a Project, pricing and the final CTA. Example: 919876543210.</p>
        </>}
      </div>
      <div className="admin-actions">
        <button className="save" onClick={save}>Save changes</button>
        <button className="export" onClick={exportData}>Export</button>
        <button className="reset" onClick={reset}>Reset</button>
      </div>
    </aside>
  );
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
        if (active && remote) setData(prev => ({ ...prev, ...remote }));
      })
      .catch(error => console.warn("Remote content unavailable; using local content.", error.message));
    return () => { active = false; };
  }, []);
  useEffect(()=>{
    document.documentElement.style.scrollBehavior="smooth";
    const revealItems = document.querySelectorAll(".hero-copy, .hero-showcase, .stats-strip, .section-top, .featured-copy, .featured-art, .services-heading, .pricing-grid, .about-grid, .final-cta, .footer-top");
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
  const filteredProjects = useMemo(() => activeFilter === "All" ? projects : projects.filter(project => projectCategory(project) === activeFilter), [activeFilter, projects]);

  const closeAdmin = () => {
    if (window.location.pathname.replace(/\/$/,"")==="/admin") { window.location.href="/"; }
    else { setAdminOpen(false); }
  };

  return (
    <div id="top">
      <Header data={data}/>
      {adminOpen && isAdminRoute && (unlocked
        ? <AdminPanel data={data} setData={setData} onClose={closeAdmin}/>
        : <AdminGate onUnlock={()=>setUnlocked(true)}/>
      )}
      <main>
        <section className="hero section">
          <div className="hero-copy">
            <span className="hero-kicker">✦ Shopify &amp; e-commerce specialists</span>
            <h1>{data.hero.titleA} {data.hero.titleB}<br/>{data.hero.titleC}</h1>
            <p>{data.hero.description}</p>
            <div className="hero-actions">
              <a className="pill-button" href={waLink(data.brand.whatsapp, "Hi DigiSky, I want to start a project.")} target="_blank" rel="noreferrer">Start a project</a>
              <button className="text-link" onClick={()=>document.getElementById("work")?.scrollIntoView({behavior:"smooth"})}>View our work</button>
            </div>
            <div className="hero-trust"><span>✓ Shopify specialists</span><span>✓ Custom store development</span><span>✓ Conversion-focused design</span></div>
          </div>
          <div className="hero-visual"><AmbientCanvas/><HeroShowcase projects={projects}/></div>
        </section>

        <TrustStrip data={data}/>
        <Marquee projects={projects}/>

        <section className="stats-strip">
          {data.stats.map((s,i)=><div key={i}><strong>{s[0]}</strong><span>{s[1]}</span></div>)}
        </section>

        <section id="work" className="section work-section">
          <div className="section-top">
            <h2>Stores we've<br/>shipped.</h2>
            <span className="project-count">{filteredProjects.length} of {projects.length} projects</span>
          </div>
          <div className="project-filters" role="group" aria-label="Filter projects by category">{PROJECT_FILTERS.map(filter=><button key={filter} className={activeFilter === filter ? "active" : ""} onClick={()=>setActiveFilter(filter)}>{filter}</button>)}</div>
          <div className="projects-grid">{filteredProjects.map((p,i)=><ProjectCard project={p} index={i} key={`${p.id || "project"}-${p.name}-${i}`}/>)}</div>
        </section>

        <section id="featured" className="featured section">
          <div className="featured-copy">
            <h2>{data.featured.title}</h2>
            <p>{data.featured.description}</p>
            <a className="text-link" href="#work">Explore the work</a>
          </div>
          <div className="featured-art">
            <p className="fa-quote">{data.featured.quoteBefore} <span>{data.featured.quoteHighlight}</span> {data.featured.quoteAfter}</p>
            <div className="fa-meta"><strong>{data.featured.metaTitle}</strong>{data.featured.metaText}</div>
          </div>
        </section>

        <section id="services" className="services-section section">
          <div className="services-intro"><div><span className="tag-chip">Capabilities</span><h2 className="services-heading">What we do.</h2></div><p>Digital foundations for brands that want to look sharper, move faster and sell with more confidence.</p></div>
          <div className="services-list">{data.services.map((s,i)=><div className={`service-row ${i === 0 ? "service-featured" : ""}`} key={i}><span className="service-number">{String(i + 1).padStart(2,"0")}</span><div className="service-copy"><h3>{s[0]}</h3><p>{s[1]}</p></div><b>&#8599;</b></div>)}</div>
        </section>

        <section className="why-section section"><div className="section-top"><div><span className="tag-chip">Why DigiSky</span><h2>Built with intent.</h2></div></div><div className="why-grid">{data.features.map(feature=><article key={feature[0]}><span>{feature[0]}</span><h3>{feature[1]}</h3><p>{feature[2]}</p></article>)}</div></section>

        <Pricing data={data}/>

        <AboutSection data={data}/>
        <ProcessSection data={data}/>
        <Testimonials data={data}/>
        <Journal data={data}/>

        <section className="final-cta section">
          <span className="tag-chip">Start a conversation</span>
          <h2>{data.cta.title}<br/>{data.cta.text}</h2>
          <a className="pill-button light" href={waLink(data.brand.whatsapp, "Hi DigiSky, I want to start a project.")} target="_blank" rel="noreferrer">{data.cta.button}</a>
          <p>{data.brand.email}</p>
        </section>
      </main>

      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <a className="brand" href="#top"><img src="/logo.png" alt="DigiSky logo"/><span>{data.brand.name}</span></a>
            <p>Digital experiences that drive growth — Shopify, WordPress and custom websites.</p>
            <div className="footer-social">
              {data.brand.instagram && <a className="icon-link" href={data.brand.instagram} target="_blank" rel="noreferrer" aria-label="DigiSky on Instagram"><InstagramIcon/></a>}
            </div>
          </div>
          <div><small>NAVIGATION</small><a href="#work">Work</a><a href="#pricing">Pricing</a><a href="#about">About</a></div>
          <div><small>SERVICES</small><span>Shopify Development</span><span>WordPress Development</span><span>Custom Websites</span></div>
          <div><small>CONTACT</small><a href={waLink(data.brand.whatsapp,"Hi DigiSky, I want to start a project.")} target="_blank" rel="noreferrer">WhatsApp</a><a href={`mailto:${data.brand.email}`}>{data.brand.email}</a></div>
        </div>
        <div className="footer-bottom"><span>&copy; {new Date().getFullYear()} DigiSky. All rights reserved.</span><span>Step up digitally.</span></div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
