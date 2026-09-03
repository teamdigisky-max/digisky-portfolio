import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const ADMIN_PASSWORD = "digisky2026";

const DEFAULT_DATA = {
  brand: { name: "DigiSky", tagline: "Step Up Digitally", email: "team.digisky@gmail.com", whatsapp: "", instagram: "https://www.instagram.com/digisky.world/" },
  hero: { kicker: "Shopify & WordPress studio", titleA: "Websites", titleB: "built to", titleC: "sell.", description: "DigiSky designs and builds high-converting Shopify, WordPress and custom stores for ambitious Indian and global brands — 34 launched and counting." },
  stats: [["34+", "Stores launched"], ["Shopify", "& WordPress"], ["7,500", "Starting price (INR)"], ["India + Global", "Clients served"]],
  pricing: { title: "Shopify Website", price: "\u20B97,500", description: "A polished Shopify storefront designed, configured and made ready to launch — without needing a premium theme.", features: ["Custom homepage design", "Mobile responsive layout", "Product & collection setup", "Navigation, pages & basic policies", "Payment / shipping setup assistance", "Basic SEO structure", "Launch-ready testing"] },
  projects: [{"id": 1, "name": "Aaysa", "industry": "E-commerce", "platform": "Shopify", "description": "E-commerce website designed for a polished, conversion-focused digital experience.", "url": "https://aaysa.store", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://aaysa.store"}, {"id": 2, "name": "Bonglooms", "industry": "Textiles & Fashion", "platform": "Shopify", "description": "Textiles & Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://bonglooms.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://bonglooms.com"}, {"id": 3, "name": "Tattva Elixir", "industry": "Beauty & Wellness", "platform": "Shopify", "description": "Beauty & Wellness website designed for a polished, conversion-focused digital experience.", "url": "https://www.tattvaelixir.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.tattvaelixir.com"}, {"id": 4, "name": "Miraza", "industry": "Fashion E-commerce", "platform": "Shopify", "description": "Fashion E-commerce website designed for a polished, conversion-focused digital experience.", "url": "https://miraza.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://miraza.in"}, {"id": 5, "name": "Popout Fashion", "industry": "Fashion Brand", "platform": "Shopify", "description": "Fashion Brand website designed for a polished, conversion-focused digital experience.", "url": "https://popoutfashion.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://popoutfashion.com"}, {"id": 6, "name": "Presquo", "industry": "Premium Brand", "platform": "Shopify", "description": "Premium Brand website designed for a polished, conversion-focused digital experience.", "url": "https://presquo.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://presquo.com"}, {"id": 7, "name": "Dr Aroras", "industry": "Healthcare", "platform": "Website Development", "description": "Healthcare website designed for a polished, conversion-focused digital experience.", "url": "https://www.draroras.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.draroras.com"}, {"id": 8, "name": "Tota Cart", "industry": "E-commerce", "platform": "E-commerce", "description": "E-commerce website designed for a polished, conversion-focused digital experience.", "url": "https://totacart.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://totacart.in"}, {"id": 9, "name": "Nitarya", "industry": "Fashion", "platform": "Shopify", "description": "Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://nitarya.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://nitarya.com"}, {"id": 10, "name": "Take A Chef", "industry": "Hospitality", "platform": "Website", "description": "Hospitality website designed for a polished, conversion-focused digital experience.", "url": "https://www.takeachef.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.takeachef.com"}, {"id": 11, "name": "Paivi", "industry": "Fashion", "platform": "Shopify", "description": "Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://www.paivi.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.paivi.in"}, {"id": 12, "name": "Maestra Jewellery", "industry": "Luxury Jewellery", "platform": "E-commerce", "description": "Luxury Jewellery website designed for a polished, conversion-focused digital experience.", "url": "https://maestrajewellery.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://maestrajewellery.com"}, {"id": 13, "name": "Equitia", "industry": "Lifestyle", "platform": "Shopify", "description": "Lifestyle website designed for a polished, conversion-focused digital experience.", "url": "https://www.equitia.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.equitia.in"}, {"id": 14, "name": "The House of Eraya", "industry": "Fashion", "platform": "Shopify", "description": "Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://www.thehouseoferaya.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.thehouseoferaya.in"}, {"id": 15, "name": "The Green Ritual", "industry": "Wellness", "platform": "Shopify", "description": "Wellness website designed for a polished, conversion-focused digital experience.", "url": "https://thegreenritual.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://thegreenritual.com"}, {"id": 16, "name": "Krinks", "industry": "Fashion", "platform": "Shopify", "description": "Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://krinks.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://krinks.in"}, {"id": 17, "name": "Acharima Delights", "industry": "Food & Delights", "platform": "E-commerce", "description": "Food & Delights website designed for a polished, conversion-focused digital experience.", "url": "https://acharimaadelights.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://acharimaadelights.com"}, {"id": 18, "name": "RP Paris", "industry": "Luxury Fashion", "platform": "Shopify", "description": "Luxury Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://www.rpparis.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.rpparis.com"}, {"id": 19, "name": "Munchlet", "industry": "Food & Beverage", "platform": "E-commerce", "description": "Food & Beverage website designed for a polished, conversion-focused digital experience.", "url": "https://www.munchlet.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.munchlet.com"}, {"id": 20, "name": "Inkwalkers", "industry": "Art & Creative", "platform": "Website", "description": "Art & Creative website designed for a polished, conversion-focused digital experience.", "url": "https://inkwalkers.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://inkwalkers.com"}, {"id": 21, "name": "Tiara Skin", "industry": "Skincare", "platform": "Shopify", "description": "Skincare website designed for a polished, conversion-focused digital experience.", "url": "https://tiara.skin", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://tiara.skin"}, {"id": 22, "name": "The Premium Basket", "industry": "Premium E-commerce", "platform": "Shopify", "description": "Premium E-commerce website designed for a polished, conversion-focused digital experience.", "url": "https://thepremiumbasket.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://thepremiumbasket.com"}, {"id": 23, "name": "Haus of Jawhar", "industry": "Luxury Fashion", "platform": "Shopify", "description": "Luxury Fashion website designed for a polished, conversion-focused digital experience.", "url": "https://hausofjawhar.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://hausofjawhar.com"}, {"id": 24, "name": "Pancha Bhootani", "industry": "Wellness", "platform": "Shopify", "description": "Wellness website designed for a polished, conversion-focused digital experience.", "url": "https://panchabhootani.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://panchabhootani.com"}, {"id": 25, "name": "Bevy Good", "industry": "Lifestyle", "platform": "Shopify", "description": "Lifestyle website designed for a polished, conversion-focused digital experience.", "url": "https://www.bevygood.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.bevygood.com"}, {"id": 26, "name": "Innocent Fresh", "industry": "Food & Beverage", "platform": "E-commerce", "description": "Food & Beverage website designed for a polished, conversion-focused digital experience.", "url": "https://www.innocentfresh.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.innocentfresh.com"}, {"id": 27, "name": "Rare Blanc", "industry": "Premium Brand", "platform": "Shopify", "description": "Premium Brand website designed for a polished, conversion-focused digital experience.", "url": "https://www.rareblanc.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.rareblanc.com"}, {"id": 28, "name": "Uzvieco Store", "industry": "Lifestyle", "platform": "Shopify", "description": "Lifestyle website designed for a polished, conversion-focused digital experience.", "url": "https://uzviecostore.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://uzviecostore.com"}, {"id": 29, "name": "Alpino Super One", "industry": "Sports & Wellness", "platform": "Shopify", "description": "Sports & Wellness website designed for a polished, conversion-focused digital experience.", "url": "https://alpinosuperone.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://alpinosuperone.com"}, {"id": 30, "name": "The Skin Depth", "industry": "Skincare", "platform": "Shopify", "description": "Skincare website designed for a polished, conversion-focused digital experience.", "url": "https://www.theskindepth.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.theskindepth.com"}, {"id": 31, "name": "Guapha", "industry": "E-commerce", "platform": "E-commerce", "description": "E-commerce website designed for a polished, conversion-focused digital experience.", "url": "https://www.guapha.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.guapha.com"}, {"id": 32, "name": "Swasth Setu", "industry": "Healthcare", "platform": "Website", "description": "Healthcare website designed for a polished, conversion-focused digital experience.", "url": "https://swasthsetu.co.in", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://swasthsetu.co.in"}, {"id": 33, "name": "Drinkyasu", "industry": "Beverage", "platform": "Shopify", "description": "Beverage website designed for a polished, conversion-focused digital experience.", "url": "https://drinkyasu.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://drinkyasu.com"}, {"id": 34, "name": "Planto Store", "industry": "Plant Store", "platform": "Shopify", "description": "Plant Store website designed for a polished, conversion-focused digital experience.", "url": "https://www.plantostore.com", "image": "https://image.thum.io/get/width/1200/crop/760/noanimate/https://www.plantostore.com"}],
  services: [["Shopify stores", "Custom-built storefronts for brands ready to sell more, without a generic theme feel."], ["WordPress websites", "Flexible, content-friendly websites designed around how your business actually runs."], ["Custom development", "High-performance digital experiences built from scratch, without platform limitations."], ["Website redesigns", "Transform an outdated website into a premium, conversion-ready digital experience."]],
  about: { titleA: "Small studio.", titleB: "Big digital thinking.", text: "DigiSky is a creative digital studio focused on building modern websites and e-commerce experiences for ambitious brands. We combine strategy, design and development to create websites that don't just look premium — they perform." }
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

function saveData(data) {
  localStorage.setItem("digisky_data", JSON.stringify(data));
}

function waLink(number, message) {
  const clean = (number || "").replace(/[^\d]/g, "");
  return clean ? `https://wa.me/${clean}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`;
}

function Arrow() { return <span aria-hidden="true">\u2197</span>; }

function InstagramIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/>
  </svg>;
}

function Header({ data }) {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <header className="site-header">
      <div className="site-header-in">
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
          {data.brand.instagram && <a className="icon-link" href={data.brand.instagram} target="_blank" rel="noreferrer" aria-label="DigiSky on Instagram"><InstagramIcon/></a>}
          <a className="pill-button" href={waLink(data.brand.whatsapp, "Hi DigiSky, I want to start a project.")} target="_blank" rel="noreferrer">Start a project</a>
        </div>
      </div>
    </header>
  );
}

function HeroShowcase({ projects }) {
  const pick = (name, fallback) => projects.find(p => p.name === name) || fallback;
  const a = pick("Popout Fashion", projects[4] || projects[0]);
  const b = pick("Maestra Jewellery", projects[11] || projects[1]);
  const c = pick("Tiara Skin", projects[20] || projects[2]);
  return (
    <div className="hero-showcase" aria-hidden="true">
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
      <img src={thumbnail} alt={`${project.name} project thumbnail`} loading={index < 6 ? "eager" : "lazy"} onError={(e)=>{ if(e.currentTarget.dataset.fallback) return; e.currentTarget.dataset.fallback="1"; e.currentTarget.src=fallback; }} />
      <div className="project-overlay"><span>{hasUrl ? "View live website" : "Website link not added"}</span><Arrow/></div>
    </div>
    <div className="project-meta"><div><h3>{project.name}</h3><p>{project.industry}</p></div><div className="project-tags"><i/>{project.platform}</div></div>
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

  const save = () => { saveData(draft); setData(draft); onClose(); };
  const reset = () => { localStorage.removeItem("digisky_data"); setData(DEFAULT_DATA); setDraft(JSON.parse(JSON.stringify(DEFAULT_DATA))); };
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
        <div className="admin-banner">Changes save to this browser only. To make them go live for everyone, click <b>Export</b> below and send the file back for a permanent update.</div>
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
        </>}
        {tab==="pricing" && <>
          {input("Package title",["pricing","title"])}
          {input("Price",["pricing","price"])}
          {input("Description",["pricing","description"],"textarea")}
          <div className="admin-subtitle">What's included</div>
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
  useEffect(()=>{ document.documentElement.style.scrollBehavior="smooth"; },[]);

  const projects = useMemo(()=>data.projects, [data.projects]);

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
            <h1>{data.hero.titleA} {data.hero.titleB}<br/>{data.hero.titleC}</h1>
            <p>{data.hero.description}</p>
            <div className="hero-actions">
              <a className="pill-button" href={waLink(data.brand.whatsapp, "Hi DigiSky, I want to start a project.")} target="_blank" rel="noreferrer">Start a project</a>
              <button className="text-link" onClick={()=>document.getElementById("work")?.scrollIntoView({behavior:"smooth"})}>View our work</button>
            </div>
          </div>
          <HeroShowcase projects={projects}/>
        </section>

        <Marquee projects={projects}/>

        <section className="stats-strip">
          {data.stats.map((s,i)=><div key={i}><strong>{s[0]}</strong><span>{s[1]}</span></div>)}
        </section>

        <section id="work" className="section work-section">
          <div className="section-top">
            <h2>Stores we've<br/>shipped.</h2>
            <span className="project-count">{projects.length} projects</span>
          </div>
          <div className="projects-grid">{projects.map((p,i)=><ProjectCard project={p} index={i} key={p.id}/>)}</div>
        </section>

        <section className="featured section">
          <div className="featured-copy">
            <h2>Design that does the selling.</h2>
            <p>Every screen has a job — build trust, explain the offer, remove friction and make the next click obvious.</p>
            <a className="text-link" href="#work">Explore the work</a>
          </div>
          <div className="featured-art">
            <p className="fa-quote">We don't ship templates. Every store is built around <span>what the brand actually sells</span> and how people actually buy it.</p>
            <div className="fa-meta"><strong>DigiSky Studio</strong>34 stores designed &amp; shipped since launch</div>
          </div>
        </section>

        <section className="services-section section">
          <h2 className="services-heading">What we do.</h2>
          <div className="services-list">{data.services.map((s,i)=><div className="service-row" key={i}><span>{i}</span><h3>{s[0]}</h3><p>{s[1]}</p><b>&#8599;</b></div>)}</div>
        </section>

        <Pricing data={data}/>

        <section id="about" className="about section">
          <div className="about-grid">
            <h2>{data.about.titleA}<br/>{data.about.titleB}</h2>
            <p>{data.about.text}</p>
          </div>
        </section>

        <section className="final-cta section">
          <h2>Let's make your next move<br/>digital.</h2>
          <a className="pill-button light" href={waLink(data.brand.whatsapp, "Hi DigiSky, I want to start a project.")} target="_blank" rel="noreferrer">Start your project</a>
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
