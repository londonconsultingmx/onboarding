// =========================================================
// LCG Portal — Shared UI
// =========================================================

// ---------- Tweaks (paleta de categorías) ----------
const PALETTES = {
  mono: {
    label: "Monocromático verde",
    sub: "Institucional · 3 tonos LCG",
    met:  "#085E54", sys:  "#03B585", tool: "#8AF4E9",
    metBg:"#E4EFEC", sysBg:"#DFF5EB", toolBg:"#DAF5F0",
    toolInk:"#0E5A52"
  },
  warm: {
    label: "Verde + cálidos",
    sub: "Pedagógico · terracota y dorado",
    met:  "#085E54", sys:  "#C68A3E", tool: "#B84A39",
    metBg:"#E4EFEC", sysBg:"#F5ECDC", toolBg:"#F4E1DC",
    toolInk:"#7A2E1F"
  },
  editorial: {
    label: "Verde + grafito + crema",
    sub: "Editorial · muy sobrio",
    met:  "#085E54", sys:  "#2A3A37", tool: "#A68C5B",
    metBg:"#E4EFEC", sysBg:"#E7E8E4", toolBg:"#F0E9D7",
    toolInk:"#5E4C28"
  },
};

function applyPalette(key){
  const p = PALETTES[key] || PALETTES.mono;
  const r = document.documentElement;
  r.style.setProperty('--cat-met',  p.met);
  r.style.setProperty('--cat-sys',  p.sys);
  r.style.setProperty('--cat-tool', p.tool);
  r.style.setProperty('--cat-met-bg',  p.metBg);
  r.style.setProperty('--cat-sys-bg',  p.sysBg);
  r.style.setProperty('--cat-tool-bg', p.toolBg);
  r.style.setProperty('--cat-tool-ink', p.toolInk || p.tool);
  try { localStorage.setItem('lcg_palette', key); } catch(e){}
  // Update any active state UI
  document.querySelectorAll('[data-palette]').forEach(el=>{
    el.classList.toggle('is-active', el.dataset.palette === key);
  });
}

function initTweaks(){
  const saved = (() => { try { return localStorage.getItem('lcg_palette'); } catch(e){ return null; } })();
  applyPalette(saved || 'mono');

  // Build panel
  const panel = document.createElement('div');
  panel.className = 'tweaks-panel';
  panel.innerHTML = `
    <h4>Tweaks · Paleta de categorías</h4>
    ${Object.entries(PALETTES).map(([k,p])=>`
      <div class="swatch-row" data-palette="${k}">
        <div class="dots">
          <i style="background:${p.met}"></i>
          <i style="background:${p.sys}"></i>
          <i style="background:${p.tool}"></i>
        </div>
        <div style="flex:1; min-width:0;">
          <div class="lbl">${p.label}</div>
          <div class="sub">${p.sub}</div>
        </div>
      </div>
    `).join('')}
    <div class="caption" style="margin-top:4px; color:var(--ink-4);">
      Cambia el color-coding de las 3 categorías temáticas.
    </div>
  `;
  document.body.appendChild(panel);
  panel.querySelectorAll('[data-palette]').forEach(row=>{
    row.addEventListener('click', ()=> applyPalette(row.dataset.palette));
  });

  // Mark active
  applyPalette(saved || 'mono');

  // Listen for host edit-mode messages
  window.addEventListener('message', (e)=>{
    const d = e.data || {};
    if (d.type === '__activate_edit_mode') panel.classList.add('is-open');
    if (d.type === '__deactivate_edit_mode') panel.classList.remove('is-open');
  });
  // Announce availability
  try { window.parent.postMessage({type:'__edit_mode_available'}, '*'); } catch(e){}
}

document.addEventListener('DOMContentLoaded', initTweaks);

// ---------- Shared sidebar day list ----------
// Single source of truth for the "Semana 1" block so every page renders
// the exact same menu. Each HTML just needs a placeholder:
//     <ul class="day-list" data-sidebar="days"></ul>
// Active / current / open states are inferred from location.pathname.
const SIDEBAR_DAYS = [
  {
    num: 1, name: "Día 01 · Identidad", href: "day-1-lunes.html", cat: "ide",
    sessions: [
      { name: "Bienvenida ejecutiva",         href: "session-d1-b01-bienvenida-ejecutiva.html" },
      { name: "Accesos & firma",              href: "session-d1-bienvenida.html" },
      { name: "Cultura y valores",            href: "#" },
      { name: "Estructura organizacional",    href: "#" },
      { name: "Políticas y Código de conducta", href: "#" },
      { name: "Administración & reembolsos",  href: "#" },
      { name: "SharePoint & M365",            href: "#" },
      { name: "Networking virtual",           href: "#" }
    ]
  },
  {
    num: 2, name: "Día 02 · Metodología", href: "day-2-martes.html", cat: "met",
    sessions: [
      { name: "Plan de Vuelo",                href: "#" },
      { name: "Performance Analysis",         href: "#" },
      { name: "Value Stream Analysis (VSA)",  href: "#" },
      { name: "MEF · Evaluación Financiera",  href: "#" },
      { name: "PASER",                        href: "#" },
      { name: "PreDx & Análisis Exhaustivo",  href: "#" },
      { name: "Diseño e Implementación",      href: "#" }
    ]
  },
  {
    num: 3, name: "Día 03 · Industria", href: "day.html", cat: "ind",
    sessions: [
      { name: "Verticales LCG · overview",    href: "session-d3-b01-verticales.html" },
      { name: "Supply SCM · diagnóstico",     href: "session.html" },
      { name: "Lean 4.0 · fundamentos",       href: "day.html" },
      { name: "Excelencia Comercial",         href: "day.html" }
    ]
  },
  {
    num: 4, name: "Día 04 · Herramientas & AI", href: "day-4-jueves.html", cat: "ai",
    sessions: [
      { name: "Power BI",                     href: "#" },
      { name: "Monday & Miro",                href: "#" },
      { name: "AI-1 · Fundamentos Claude",    href: "#" },
      { name: "AI-2 · Claude.ai día a día",   href: "#" },
      { name: "AI-3 · Integraciones LCG",     href: "#" },
      { name: "AI-4 · Stack complementario",  href: "#" },
      { name: "AI-5 · Framework Competencia", href: "#" }
    ]
  },
  {
    num: 5, name: "Día 05 · Aplicación", href: "day-5-viernes.html", cat: "apl",
    sessions: [
      { name: "Caso integrado",               href: "#" },
      { name: "Presentación a panel",         href: "#" },
      { name: "Intro a primer proyecto",      href: "#" },
      { name: "Cierre ejecutivo",             href: "#" }
    ]
  }
];

function escapeHtml(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
                  .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function renderSidebarDayList(container){
  const path = (location.pathname.split('/').pop() || 'landing.html').toLowerCase();

  container.innerHTML = SIDEBAR_DAYS.map(day => {
    const dayActive      = day.href !== '#' && path === day.href.toLowerCase();
    const currentSession = day.sessions.find(s => s.href !== '#' && s.href.toLowerCase() === path);
    const isOpen         = dayActive || !!currentSession;

    const subItems = day.sessions.map(s => {
      const current = s.href !== '#' && s.href.toLowerCase() === path;
      return `<li><a class="sub-sess${current ? ' is-current' : ''}" href="${s.href}"><span class="dot" style="background:var(--cat-${day.cat})"></span> ${escapeHtml(s.name)}</a></li>`;
    }).join('');

    return (
      `<li${isOpen ? ' class="is-open"' : ''}>` +
        `<a class="day-item${dayActive ? ' is-active' : ''}" href="${day.href}">` +
          `<span class="num">${day.num}</span>` +
          `<span class="name">${escapeHtml(day.name)}</span>` +
          `<span class="pct">0%</span>` +
        `</a>` +
        `<button class="day-chev" type="button" aria-label="Mostrar sesiones">` +
          `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>` +
        `</button>` +
        `<ul class="sub-sessions">${subItems}</ul>` +
      `</li>`
    );
  }).join('');
}

// ---------- Collapsible sidebar days ----------
// Day label acts as a normal link — single click navigates to the day
// page. The chevron button (right side of the row) toggles the nested
// sub-session list. Only one day open at a time.
function initSidebarCollapse(){
  document.querySelectorAll('.sidebar .day-list > li').forEach(li => {
    const chev = li.querySelector('.day-chev');
    if (!chev) return;
    chev.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const wasOpen = li.classList.contains('is-open');
      li.parentElement.querySelectorAll('li.is-open').forEach(o => o.classList.remove('is-open'));
      if (!wasOpen) li.classList.add('is-open');
    });
  });
}

function initSidebar(){
  // Render dynamic day list (if the page uses the shared placeholder)
  const container = document.querySelector('.sidebar [data-sidebar="days"]');
  if (container) renderSidebarDayList(container);
  // Wire click-to-expand on whatever day-list is present
  initSidebarCollapse();
}
document.addEventListener('DOMContentLoaded', initSidebar);
