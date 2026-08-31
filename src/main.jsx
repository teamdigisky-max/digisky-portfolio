import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { supabase } from "./lib/supabase";

const DEFAULT_DATA = {
  brand: { name: "DigiSky", tagline: "Step Up Digitally", email: "team.digisky@gmail.com", whatsapp: "" },
  hero: { eyebrow: "DIGITAL EXPERIENCES THAT DRIVE GROWTH", titleA: "Websites", titleB: "Made", titleC: "To Sell.", description: "We design and develop high-converting Shopify, WordPress and custom websites for ambitious brands." },
  stats: [["34+", "Projects Delivered"], ["Shopify", "Stores"], ["WordPress", "Websites"], ["India + Global", "Clients"]],
  pricing: { title: "Shopify Website", price: "₹7,500", description: "A polished Shopify storefront designed, configured and made ready to launch — without needing a premium theme.", features: ["Custom homepage design", "Mobile responsive layout", "Product & collection setup", "Navigation, pages & basic policies", "Payment / shipping setup assistance", "Basic SEO structure", "Launch-ready testing"] },
  projects: [{"id": 1, "name": "Aaysa", "industry": "E-commerce", "platform": "Shopify", "description": "E-commerce website designed for a polished, conversion-focused digital experience.", "url": "https://aaysa.store", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://aaysa.store"}, {"id": 2, "name": "Bonglooms", "industry": "Textiles & Fashion", "platform": "Shopify", "description": "Textiles & Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://bonglooms.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://bonglooms.com"}, {"id": 3, "name": "Tattva Elixir", "industry": "Beauty & Wellness", "platform": "Shopify", "description": "Beauty & Wellness website designed for a polished, conversion-focused digital experience.", "url": "https://www.tattvaelixir.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.tattvaelixir.com"}, {"id": 4, "name": "Miraza", "industry": "Fashion E-commerce", "platform": "Shopify", "description": "Fashion E-commerce website designed for a polished, conversion-focused digital experience.", "url": "https://miraza.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://miraza.in"}, {"id": 5, "name": "Popout Fashion", "industry": "Fashion Brand", "platform": "Shopify", "description": "Fashion Brand website designed for a polished, conversion-focused digital experience.", "url": "https://popoutfashion.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://popoutfashion.com"}, {"id": 6, "name": "Presquo", "industry": "Premium Brand", "platform": "Shopify", "description": "Premium Brand website designed for a polished, conversion-focused digital experience.", "url": "https://presquo.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://presquo.com"}, {"id": 7, "name": "Dr Aroras", "industry": "Healthcare", "platform": "Website Development", "description": "Healthcare website designed for a polished, conversion-focused digital experience.", "url": "https://www.draroras.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.draroras.com"}, {"id": 8, "name": "Tota Cart", "industry": "E-commerce", "platform": "E-commerce", "description": "E-commerce website designed for a polished, conversion-focused digital experience.", "url": "https://totacart.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://totacart.in"}, {"id": 9, "name": "Nitarya", "industry": "Fashion", "platform": "Shopify", "description": "Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://nitarya.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://nitarya.com"}, {"id": 10, "name": "Take A Chef", "industry": "Hospitality", "platform": "Website", "description": "Hospitality website designed for a polished, conversion-focused digital experience.", "url": "https://www.takeachef.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.takeachef.com"}, {"id": 11, "name": "Paivi", "industry": "Fashion", "platform": "Shopify", "description": "Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://www.paivi.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.paivi.in"}, {"id": 12, "name": "Maestra Jewellery", "industry": "Luxury Jewellery", "platform": "E-commerce", "description": "Luxury Jewellery website designed for a polished, conversion-focused digital experience.", "url": "https://maestrajewellery.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://maestrajewellery.com"}, {"id": 13, "name": "Equitia", "industry": "Lifestyle", "platform": "Shopify", "description": "Lifestyle website designed for a polished, conversion-focused digital experience.", "url": "https://www.equitia.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.equitia.in"}, {"id": 14, "name": "The House of Eraya", "industry": "Fashion", "platform": "Shopify", "description": "Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://www.thehouseoferaya.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.thehouseoferaya.in"}, {"id": 15, "name": "The Green Ritual", "industry": "Wellness", "platform": "Shopify", "description": "Wellness website designed for a polished, conversion-focused digital experience.", "url": "https://thegreenritual.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://thegreenritual.com"}, {"id": 16, "name": "Krinks", "industry": "Fashion", "platform": "Shopify", "description": "Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://krinks.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://krinks.in"}, {"id": 17, "name": "Acharima Delights", "industry": "Food & Delights", "platform": "E-commerce", "description": "Food & Delights website designed for a polished, conversion-focused digital experience.", "url": "https://acharimaadelights.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://acharimaadelights.com"}, {"id": 18, "name": "RP Paris", "industry": "Luxury Fashion", "platform": "Shopify", "description": "Luxury Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://www.rpparis.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.rpparis.com"}, {"id": 19, "name": "Munchlet", "industry": "Food & Beverage", "platform": "E-commerce", "description": "Food & Beverage website designed for a polished, conversion-focused digital experience.", "url": "https://www.munchlet.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.munchlet.com"}, {"id": 20, "name": "Inkwalkers", "industry": "Art & Creative", "platform": "Website", "description": "Art & Creative website designed for a polished, conversion-focused digital experience.", "url": "https://inkwalkers.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://inkwalkers.com"}, {"id": 21, "name": "Tiara Skin", "industry": "Skincare", "platform": "Shopify", "description": "Skincare website designed for a polished, conversion-focused digital experience.", "url": "https://tiara.skin", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://tiara.skin"}, {"id": 22, "name": "The Premium Basket", "industry": "Premium E-commerce", "platform": "Shopify", "description": "Premium E-commerce website designed for a polished, conversion-focused digital experience.", "url": "https://thepremiumbasket.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://thepremiumbasket.com"}, {"id": 23, "name": "Haus of Jawhar", "industry": "Luxury Fashion", "platform": "Shopify", "description": "Luxury Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://hausofjawhar.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://hausofjawhar.com"}, {"id": 24, "name": "Pancha Bhootani", "industry": "Wellness", "platform": "Shopify", "description": "Wellness website designed for a polished, conversion-focused digital experience.", "url": "https://panchabhootani.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://panchabhootani.com"}, {"id": 25, "name": "Bevy Good", "industry": "Lifestyle", "platform": "Shopify", "description": "Lifestyle website designed for a polished, conversion-focused digital experience.", "url": "https://www.bevygood.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.bevygood.com"}, {"id": 26, "name": "Innocent Fresh", "industry": "Food & Beverage", "platform": "E-commerce", "description": "Food & Beverage website designed for a polished, conversion-focused digital experience.", "url": "https://www.innocentfresh.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.innocentfresh.com"}, {"id": 27, "name": "Rare Blanc", "industry": "Premium Brand", "platform": "Shopify", "description": "Premium Brand website designed for a polished, conversion-focused digital experience.", "url": "https://www.rareblanc.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.rareblanc.com"}, {"id": 28, "name": "Uzvieco Store", "industry": "Lifestyle", "platform": "Shopify", "description": "Lifestyle website designed for a polished, conversion-focused digital experience.", "url": "https://uzviecostore.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://uzviecostore.com"}, {"id": 29, "name": "Alpino Super One", "industry": "Sports & Wellness", "platform": "Shopify", "description": "Sports & Wellness website designed for a polished, conversion-focused digital experience.", "url": "https://alpinosuperone.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://alpinosuperone.com"}, {"id": 30, "name": "The Skin Depth", "industry": "Skincare", "platform": "Shopify", "description": "Skincare website designed for a polished, conversion-focused digital experience.", "url": "https://www.theskindepth.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.theskindepth.com"}, {"id": 31, "name": "Guapha", "industry": "E-commerce", "platform": "E-commerce", "description": "E-commerce website designed for a polished, conversion-focused digital experience.", "url": "https://www.guapha.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.guapha.com"}, {"id": 32, "name": "Swasth Setu", "industry": "Healthcare", "platform": "Website", "description": "Healthcare website designed for a polished, conversion-focused digital experience.", "url": "https://swasthsetu.co.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://swasthsetu.co.in"}, {"id": 33, "name": "Drinkyasu", "industry": "Beverage", "platform": "Shopify", "description": "Beverage website designed for a polished, conversion-focused digital experience.", "url": "https://drinkyasu.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://drinkyasu.com"}, {"id": 34, "name": "Planto Store", "industry": "Plant Store", "platform": "Shopify", "description": "Plant Store website designed for a polished, conversion-focused digital experience.", "url": "https://www.plantostore.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.plantostore.com"}],
  services: [["01","Shopify","Stores built for brands ready to sell more."],["02","WordPress","Flexible websites designed around your business."],["03","Custom Development","High-performance digital experiences without limitations."],["04","Website Redesign","Transform outdated websites into premium digital experiences."]],
  about: { titleA: "Small Team.", titleB: "Big Digital Thinking.", text: "DigiSky is a creative digital agency focused on building modern websites and e-commerce experiences for ambitious brands. We combine strategy, design and technology to create websites that don't just look premium — they perform." }
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
      pricing: { ...DEFAULT_DATA.pricing, ...(saved.pricing || {}) },
      about: { ...DEFAULT_DATA.about, ...(saved.about || {}) },
    };
    const savedProjects = Array.isArray(saved.projects) ? saved.projects : [];
    const byName = new Map(savedProjects.map(p => [String(p.name || "").trim().toLowerCase(), p]));
    const mappedDefaults = DEFAULT_DATA.projects.map((p, i) => {
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

function saveData(data) {
  localStorage.setItem("digisky_data", JSON.stringify(data));
}

function waLink(number, message) {
  const clean = (number || "").replace(/[^\d]/g, "");
  return clean ? `https://wa.me/${clean}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`;
}

function Arrow() { return <span aria-hidden="true">↗</span>; }

function BrowserVisual() {
  return <div className="hero-visual" aria-hidden="true">
    <div className="hero-glow" />
    <div className="hero-browser browser-back"><div className="browser-bar"><i/><i/><i/></div></div>
    <div className="hero-browser browser-main">
      <div className="browser-bar"><i/><i/><i/><span>DIGISKY / DIGITAL EXPERIENCES</span></div>
      <div className="hero-site-preview"><small>SHOPIFY EXPERTS</small><h3>Timeless style,<br/><em>modern you.</em></h3><button>SHOP NOW ↗</button></div>
      <div className="hero-phone"><div className="phone-notch"/><small>NEW COLLECTION</small><strong>POP OUT<br/>FASHION</strong><span>EXPLORE ↗</span></div>
    </div>
    <div className="float-chip chip-one">SHOPIFY <em>EXPERTS</em></div>
    <div className="float-chip chip-two">DESIGN <em>× CODE</em></div>
    <div className="float-chip chip-three">HIGH <em>CONVERTING</em></div>
  </div>;
}

function Header({ data }) {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <header className="site-header">
      <a className="brand" href="#top" onClick={(e)=>{e.preventDefault(); go("top")}}>
        <img src="/logo.png" alt="DigiSky logo" />
        <span>{data.brand.name}</span>
      </a>
      <nav>
        <button onClick={()=>go("work")}>Work</button>
        <button onClick={()=>go("pricing")}>Pricing</button>
        <button onClick={()=>go("about")}>About</button>
      </nav>
      <div className="header-actions">
        <a className="pill-button" href={waLink(data.brand.whatsapp, "Hi DigiSky, I want to start a project.")} target="_blank" rel="noreferrer">Start a project <Arrow/></a>
      </div>
    </header>
  );
}

function makeThumb(project, index) {
  const palettes = [["#eaf8f1","#0b120f"],["#101411","#e8f5ef"],["#f3eadf","#111111"],["#e9eef7","#102030"],["#f7f1e8","#3d2414"],["#e7f4ed","#15382a"]];
  const [bg, fg] = palettes[index % palettes.length];
  const safe = String(project.name).replace(/&/g,"and").replace(/[<>]/g,"");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760"><rect width="1200" height="760" fill="${bg}"/><rect x="48" y="42" width="1104" height="676" rx="28" fill="white" opacity=".96"/><circle cx="84" cy="78" r="6" fill="${fg}" opacity=".25"/><circle cx="106" cy="78" r="6" fill="${fg}" opacity=".18"/><circle cx="128" cy="78" r="6" fill="${fg}" opacity=".12"/><text x="92" y="156" font-family="Arial" font-size="18" letter-spacing="5" fill="${fg}" opacity=".55">DIGITAL EXPERIENCE</text><text x="92" y="270" font-family="Georgia" font-size="86" fill="${fg}">${safe}</text><rect x="92" y="320" width="330" height="12" rx="6" fill="${fg}" opacity=".12"/><rect x="92" y="352" width="240" height="12" rx="6" fill="${fg}" opacity=".09"/><rect x="760" y="168" width="292" height="340" rx="22" fill="${bg}"/><circle cx="906" cy="338" r="96" fill="${fg}" opacity=".09"/><rect x="828" y="548" width="170" height="38" rx="19" fill="${fg}" opacity=".9"/><text x="853" y="573" font-family="Arial" font-size="14" fill="white">VIEW PROJECT</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function ProjectCard({ project, index }) {
  const hasUrl = typeof project.url === "string" && /^https?:\/\//i.test(project.url.trim());
  const fallback = `/thumbnails/${(index % 34) + 1}.svg`;
  const remoteThumb = hasUrl ? `https://image.thum.io/get/width/1200/crop/760/noanimate/${project.url.trim()}` : "";
  const thumbnail = project.image || remoteThumb || fallback;
  const card = <article className="project-card reveal" style={{ "--delay": `${Math.min(index,12) * 45}ms` }}>
    <div className="project-media">
      <img src={thumbnail} alt={`${project.name} project thumbnail`} loading={index < 8 ? "eager" : "lazy"} onError={(e)=>{ if(e.currentTarget.dataset.fallback) return; e.currentTarget.dataset.fallback="1"; e.currentTarget.src=fallback; }} />
      <div className="project-overlay"><span>{hasUrl ? "View website" : "Website link not added"}</span><Arrow/></div>
    </div>
    <div className="project-meta"><div><h3>{project.name}</h3><p>{project.industry}</p></div><div className="project-tags"><span>{project.platform}</span></div></div>
  </article>;
  return hasUrl ? <a className="project-link" href={project.url.trim()} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} website`}>{card}</a> : card;
}

function Pricing({ data }) {
  const message = `Hi DigiSky, I'm interested in the ${data.pricing.title} package (${data.pricing.price}).`;
  return (
    <section id="pricing" className="section pricing-section">
      <div className="section-label">STARTING FROM</div>
      <div className="pricing-grid">
        <div>
          <h2>Everything you need<br/><span>to launch.</span></h2>
          <p className="section-copy">{data.pricing.description}</p>
        </div>
        <div className="price-card">
          <div className="price-top"><span>{data.pricing.title}</span><strong>{data.pricing.price}</strong></div>
          <div className="feature-list">
            {data.pricing.features.map((f,i)=><div key={i}><b>0{i+1}</b><span>{f}</span><i>✓</i></div>)}
          </div>
          <a className="pill-button dark" href={waLink(data.brand.whatsapp, message)} target="_blank" rel="noreferrer">Get started <Arrow/></a>
        </div>
      </div>
    </section>
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

  const save = () => { saveData(draft); setData(draft); onClose(); };
  const reset = () => { localStorage.removeItem("digisky_data"); setData(DEFAULT_DATA); setDraft(JSON.parse(JSON.stringify(DEFAULT_DATA))); };

  const input = (label, path, type="text") => (
    <label className="admin-field"><span>{label}</span>
      {type === "textarea" ? <textarea value={path.reduce((o,k)=>o[k],draft)} onChange={e=>update(path,e.target.value)} /> :
      <input type={type} value={path.reduce((o,k)=>o[k],draft)} onChange={e=>update(path,e.target.value)} />}
    </label>
  );

  return (
    <aside className="admin-panel">
      <div className="admin-head"><div><small>DIGISKY</small><h2>Content Studio</h2></div><button onClick={onClose}>×</button></div>
      <div className="admin-tabs">
        {["home","pricing","projects","services","contact"].map(t=><button className={tab===t?"active":""} key={t} onClick={()=>setTab(t)}>{t}</button>)}
      </div>
      <div className="admin-scroll">
        {tab==="home" && <>
          {input("Eyebrow",["hero","eyebrow"])}
          {input("Main title — line 1",["hero","titleA"])}
          {input("Main title — line 2",["hero","titleB"])}
          {input("Main title — line 3",["hero","titleC"])}
          {input("Hero description",["hero","description"],"textarea")}
          {input("About heading — line 1",["about","titleA"])}
          {input("About heading — line 2",["about","titleB"])}
          {input("About text",["about","text"],"textarea")}
        </>}
        {tab==="pricing" && <>
          {input("Package title",["pricing","title"])}
          {input("Price",["pricing","price"])}
          {input("Description",["pricing","description"],"textarea")}
          <div className="admin-subtitle">What is included in ₹7,500</div>
          {draft.pricing.features.map((f,i)=><label className="admin-field" key={i}><span>Feature {i+1}</span><input value={f} onChange={e=>update(["pricing","features",i],e.target.value)}/></label>)}
        </>}
        {tab==="projects" && <div className="admin-projects">
          <div className="projects-admin-top">
            <p className="admin-help">All portfolio projects are shown on the website. Website links open in a new tab. Thumbnails are generated automatically from each website; you can still replace a thumbnail with your own image URL.</p>
            <button className="add-project" onClick={()=>setDraft(prev=>({...prev,projects:[...prev.projects,{id:Date.now(),name:"New Project",industry:"E-commerce",platform:"Shopify",description:"Add your project description here.",image:"",url:""}]}))}>+ Add project</button>
          </div>
          {draft.projects.map((p,i)=><div className="admin-project" key={p.id}>
            <div className="admin-project-title"><b>{String(i+1).padStart(2,"0")}</b><strong>{p.name}</strong><button className="delete-project" onClick={()=>setDraft(prev=>({...prev,projects:prev.projects.filter((_,idx)=>idx!==i)}))}>Delete</button></div>
            <input placeholder="Project name" value={p.name} onChange={e=>update(["projects",i,"name"],e.target.value)}/>
            <input placeholder="Industry" value={p.industry} onChange={e=>update(["projects",i,"industry"],e.target.value)}/>
            <input placeholder="Platform" value={p.platform} onChange={e=>update(["projects",i,"platform"],e.target.value)}/>
            <input placeholder="Website URL (https://...)" value={p.url || ""} onChange={e=>update(["projects",i,"url"],e.target.value)}/>
            <input placeholder="Custom thumbnail URL (optional)" value={p.image} onChange={e=>update(["projects",i,"image"],e.target.value)}/>
            <textarea placeholder="Description" value={p.description} onChange={e=>update(["projects",i,"description"],e.target.value)}/>
          </div>)}
        </div>}
        {tab==="services" && <>
          {draft.services.map((s,i)=><div className="admin-project" key={i}>
            <div className="admin-project-title"><b>{s[0]}</b><strong>Service</strong></div>
            <input value={s[1]} onChange={e=>update(["services",i,1],e.target.value)}/>
            <textarea value={s[2]} onChange={e=>update(["services",i,2],e.target.value)}/>
          </div>)}
        </>}
        {tab==="contact" && <>
          {input("WhatsApp number (country code + number)",["brand","whatsapp"])}
          {input("Email",["brand","email"])}
          <p className="admin-help">WhatsApp is used on Start a Project, pricing and the final CTA. Example: 919876543210.</p>
        </>}
      </div>
      <div className="admin-actions"><button className="save" onClick={save}>Save changes</button><button className="reset" onClick={reset}>Reset</button></div>
    </aside>
  );
}

function App() {
  const [data, setData] = useState(loadData);
  useEffect(() => {
  async function loadProjectsFromSupabase() {
    const { data: dbProjects, error } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Supabase projects error:", error);
      return;
    }

    if (dbProjects && dbProjects.length > 0) {
      setData(prev => {
        const dbProjectsFormatted = dbProjects.map(p => ({
          id: p.id,
          name: p.name || "",
          industry: p.industry || "",
          platform: p.platform || "",
          description: p.description || "",
          url: p.url || "",
          image: p.image || ""
        }));

        const dbNames = new Set(
          dbProjectsFormatted.map(p => p.name.trim().toLowerCase())
        );

        const remainingDefaults = prev.projects.filter(
          p => !dbNames.has(p.name.trim().toLowerCase())
        );

        return {
          ...prev,
          projects: [...dbProjectsFormatted, ...remainingDefaults]
        };
      });
    }
  }

  loadProjectsFromSupabase();
}, []);
  const isAdminRoute = window.location.pathname.replace(/\/$/,"") === "/admin" || new URLSearchParams(window.location.search).has("admin");
  const [adminOpen, setAdminOpen] = useState(isAdminRoute);
  useEffect(()=>{ document.documentElement.style.scrollBehavior="smooth"; },[]);

  const projects = useMemo(()=>data.projects, [data.projects]);
  return (
    <div id="top">
      <Header data={data}/>
      {adminOpen && isAdminRoute && <AdminPanel data={data} setData={setData} onClose={()=>{ if(window.location.pathname.replace(/\/$/,"")==="/admin"){ window.location.href="/"; } else { setAdminOpen(false); } }}/>}
      <main>
        <section className="hero section">
          <div className="hero-copy">
            <div className="section-label">{data.hero.eyebrow}</div>
            <h1><span>{data.hero.titleA}</span><span>{data.hero.titleB}</span><em>{data.hero.titleC}</em></h1>
            <p>{data.hero.description}</p>
            <div className="hero-actions">
              <a className="pill-button" href={waLink(data.brand.whatsapp, "Hi DigiSky, I want to start a project.")} target="_blank" rel="noreferrer">Start a Project <Arrow/></a>
              <button className="text-link" onClick={()=>document.getElementById("work")?.scrollIntoView({behavior:"smooth"})}>View Our Work <span>↓</span></button>
            </div>
          </div>
          <BrowserVisual/>
        </section>

        <section className="stats-strip">
          {data.stats.map((s,i)=><div key={i}><strong>{s[0]}</strong><span>{s[1]}</span></div>)}
        </section>

        <section id="work" className="section work-section">
          <div className="section-top"><div><div className="section-label">SELECTED WORK</div><h2>Stores we've built<span>.</span></h2></div><span className="project-count">{projects.length} projects</span></div>
          <div className="projects-grid">{projects.map((p,i)=><ProjectCard project={p} index={i} key={p.id}/>)}</div>
        </section>

        <section className="featured section">
          <div className="featured-copy"><div className="section-label">FEATURED PROJECT</div><h2>Design that<br/><span>does the selling.</span></h2><p>Every screen has a job — create trust, explain the offer, remove friction and make the next click obvious.</p><a className="text-link" href="#work">Explore the work <Arrow/></a></div>
          <div className="featured-art"><div className="feature-browser"><div className="fb-top"><span>● ● ●</span><b>DIGISKY / CASE STUDY</b></div><div className="fb-main"><small>ECOMMERCE EXPERIENCE</small><h3>Built to look<br/><i>remarkable.</i></h3><div className="fb-card"><span>01</span><strong>Conversion<br/>first.</strong></div></div></div></div>
        </section>

        <Pricing data={data}/>

        <section className="section services-section">
          <div className="section-label">WHAT WE DO</div>
          <div className="services-list">{data.services.map((s,i)=><div className="service-row" key={i}><span>{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p><b>↗</b></div>)}</div>
        </section>

        <section id="about" className="about section">
          <div className="section-label">ABOUT DIGISKY</div>
          <div className="about-grid">
            <h2>{data.about.titleA}<br/><span>{data.about.titleB}</span></h2>
            <p>{data.about.text}</p>
          </div>
        </section>

        <section className="final-cta section">
          <div className="cta-glow"/>
          <div className="section-label">HAVE SOMETHING WORTH BUILDING?</div>
          <h2>Let's make your<br/><span>next move digital.</span></h2>
          <a className="pill-button light" href={waLink(data.brand.whatsapp, "Hi DigiSky, I want to start a project.")} target="_blank" rel="noreferrer">Start Your Project <Arrow/></a>
          <p>{data.brand.email}</p>
        </section>
      </main>

      <footer>
        <div className="footer-top">
          <a className="brand footer-brand" href="#top"><img src="/logo.png" alt="DigiSky logo"/><span>{data.brand.name}</span></a>
          <div><small>NAVIGATION</small><a href="#work">Work</a><a href="#pricing">Pricing</a><a href="#about">About</a></div>
          <div><small>SERVICES</small><span>Shopify Development</span><span>WordPress Development</span><span>Custom Websites</span></div>
          <div><small>CONTACT</small><a href={waLink(data.brand.whatsapp,"Hi DigiSky, I want to start a project.")} target="_blank" rel="noreferrer">WhatsApp</a><a href={`mailto:${data.brand.email}`}>{data.brand.email}</a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} DigiSky</span><strong>STEP UP <i>DIGITALLY.</i></strong></div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
