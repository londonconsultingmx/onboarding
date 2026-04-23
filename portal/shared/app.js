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
    num: 1, name: "Día 01 · Identidad", short: "Identidad", href: "day-1-lunes.html", cat: "ide",
    sessions: [
      { name: "Bienvenida ejecutiva",           href: "session-d1-b01-bienvenida-ejecutiva.html", sid: "d1-b01-bienvenida-ejecutiva" },
      { name: "Accesos & firma",                href: "session-d1-bienvenida.html",               sid: "__accesos__" },
      { name: "Valores y comportamientos",      href: "session-d1-b03-valores.html", sid: "d1-b03-valores" },
      { name: "Estructura organizacional",      href: "#", sid: "d1-b04-estructura" },
      { name: "Políticas y Código de conducta", href: "#", sid: "d1-b05-politicas" },
      { name: "Administración & reembolsos",    href: "#", sid: "d1-b06-admin" },
      { name: "SharePoint & M365",              href: "#", sid: "d1-b07-sharepoint" },
      { name: "Networking virtual",             href: "#", sid: "d1-b08-networking" }
    ]
  },
  {
    num: 2, name: "Día 02 · Metodología", short: "Metodología", href: "day-2-martes.html", cat: "met",
    sessions: [
      { name: "Plan de Vuelo",                href: "#", sid: "d2-b01-plan-vuelo" },
      { name: "Performance Analysis",         href: "#", sid: "d2-b02-performance" },
      { name: "Value Stream Analysis (VSA)",  href: "#", sid: "d2-b03-vsa" },
      { name: "MEF · Evaluación Financiera",  href: "#", sid: "d2-b04-mef" },
      { name: "PASER",                        href: "#", sid: "d2-b05-paser" },
      { name: "PreDx & Análisis Exhaustivo",  href: "#", sid: "d2-b06-predx" },
      { name: "Diseño e Implementación",      href: "#", sid: "d2-b07-diseno" }
    ]
  },
  {
    num: 3, name: "Día 03 · Industria", short: "Industria", href: "day.html", cat: "ind",
    sessions: [
      { name: "Verticales LCG · overview",    href: "session-d3-b01-verticales.html", sid: "d3-b01-verticales" },
      { name: "Supply SCM · diagnóstico",     href: "#",                              sid: "d3-b02-supply-scm" },
      { name: "Lean 4.0 · fundamentos",       href: "#",                              sid: "d3-b03-lean-40" },
      { name: "Excelencia Comercial",         href: "#",                              sid: "d3-b04-excelencia-comercial" }
    ]
  },
  {
    num: 4, name: "Día 04 · Herramientas & AI", short: "Herramientas & AI", href: "day-4-jueves.html", cat: "ai",
    sessions: [
      { name: "Power BI",                     href: "#", sid: "d4-b01-power-bi" },
      { name: "Monday & Miro",                href: "session-d4-b02-monday-miro.html", sid: "d4-b02-monday-miro" },
      { name: "AI-1 · Fundamentos Claude",    href: "#", sid: "d4-b03-ai1-fundamentos" },
      { name: "AI-2 · Claude.ai día a día",   href: "#", sid: "d4-b04-ai2-claude" },
      { name: "AI-3 · Integraciones LCG",     href: "#", sid: "d4-b05-ai3-integraciones" },
      { name: "AI-4 · Stack complementario",  href: "#", sid: "d4-b06-ai4-stack" },
      { name: "AI-5 · Framework Competencia", href: "#", sid: "d4-b07-ai5-framework" }
    ]
  },
  {
    num: 5, name: "Día 05 · Aplicación", short: "Aplicación", href: "day-5-viernes.html", cat: "apl",
    sessions: [
      { name: "Caso integrado",               href: "#", sid: "d5-b01-caso" },
      { name: "Presentación a panel",         href: "#", sid: "d5-b02-presentacion" },
      { name: "Intro a primer proyecto",      href: "#", sid: "d5-b03-proyecto" },
      { name: "Cierre ejecutivo",             href: "#", sid: "d5-b04-cierre" }
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
    const dayPct         = computeDayProgress(day.num).pct;

    const subItems = day.sessions.map(s => {
      const current = s.href !== '#' && s.href.toLowerCase() === path;
      const done    = isSessionComplete(s.sid);
      return `<li><a class="sub-sess${current ? ' is-current' : ''}${done ? ' is-done' : ''}" href="${s.href}"><span class="dot" style="background:var(--cat-${day.cat})"></span> ${escapeHtml(s.name)}</a></li>`;
    }).join('');

    return (
      `<li${isOpen ? ' class="is-open"' : ''} data-sidebar-day="${day.num}">` +
        `<a class="day-item${dayActive ? ' is-active' : ''}" href="${day.href}">` +
          `<span class="num">${day.num}</span>` +
          `<span class="name">${escapeHtml(day.name)}</span>` +
          `<span class="pct" data-day-pct="${day.num}">${dayPct}%</span>` +
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

// ---------- Global progress ----------
// Session-level checkboxes on individual pages write to localStorage under
// key lcg-onb-sessions-v1 as a map {sessionId: true}. "Accesos & firma"
// uses a separate internal checklist (lcg-onb-d1-bienvenida-v1) with 8
// items (sid "__accesos__") — we count that session as complete only when
// all 8 are checked.
const TOTAL_SESSIONS = SIDEBAR_DAYS.reduce((n, d) => n + d.sessions.length, 0);
const ACCESOS_REQUIRED = ['doc-contrato','doc-aviso','doc-nom','doc-reembolso',
                          'acc-m365','acc-power','acc-monday','acc-miro'];

function loadSessionStore(){
  try { return JSON.parse(localStorage.getItem('lcg-onb-sessions-v1') || '{}'); }
  catch(e){ return {}; }
}
function loadAccesosStore(){
  try { return JSON.parse(localStorage.getItem('lcg-onb-d1-bienvenida-v1') || '{}'); }
  catch(e){ return {}; }
}

function isSessionComplete(sid){
  if (!sid) return false;
  if (sid === '__accesos__'){
    const b = loadAccesosStore();
    return ACCESOS_REQUIRED.every(k => b[k]);
  }
  return !!loadSessionStore()[sid];
}

function computeDayProgress(dayNum){
  const day = SIDEBAR_DAYS.find(d => d.num === dayNum);
  if (!day) return { completed: 0, total: 0, pct: 0 };
  const completed = day.sessions.filter(s => isSessionComplete(s.sid)).length;
  const total = day.sessions.length;
  const pct = total ? Math.round(completed / total * 100) : 0;
  return { completed, total, pct };
}

function computeGlobalProgress(){
  let completed = 0;
  for (const day of SIDEBAR_DAYS){
    for (const s of day.sessions){
      if (isSessionComplete(s.sid)) completed++;
    }
  }
  const pct = TOTAL_SESSIONS ? Math.round(completed / TOTAL_SESSIONS * 100) : 0;
  return { completed, total: TOTAL_SESSIONS, pct };
}

// Returns the next session to do (first incomplete in day/index order),
// or null if everything is complete. The returned object includes day and
// 1-based block index for UI strings.
function findNextSession(){
  for (const day of SIDEBAR_DAYS){
    for (let i = 0; i < day.sessions.length; i++){
      const s = day.sessions[i];
      if (!isSessionComplete(s.sid)){
        return { day, session: s, blockIdx: i + 1, blockTotal: day.sessions.length };
      }
    }
  }
  return null;
}

// Returns up to N upcoming incomplete sessions starting *after* the
// "next" one — used by the landing-side up-next list.
function findUpcomingSessions(limit, skip){
  const out = [];
  let skipped = 0;
  for (const day of SIDEBAR_DAYS){
    for (let i = 0; i < day.sessions.length; i++){
      const s = day.sessions[i];
      if (isSessionComplete(s.sid)) continue;
      if (skipped < (skip || 0)){ skipped++; continue; }
      out.push({ day, session: s, blockIdx: i + 1, blockTotal: day.sessions.length });
      if (out.length >= limit) return out;
    }
  }
  return out;
}

function updateSidebarProgress(){
  const p = computeGlobalProgress();
  const valEl  = document.querySelector('.sidebar .side-progress .val');
  const barEl  = document.querySelector('.sidebar .side-progress .progress > span');
  const metaEl = document.querySelector('.sidebar .side-progress .meta');
  if (valEl){
    valEl.innerHTML = p.pct + '<span style="font-size:20px; color:#8AF4E9;">%</span>';
  }
  if (barEl) barEl.style.width = p.pct + '%';
  if (metaEl){
    const status = p.completed === 0 ? 'Por iniciar'
                 : p.completed === p.total ? 'Completado'
                 : 'En curso';
    metaEl.textContent = `${p.completed} de ${p.total} bloques · ${status}`;
  }
  // Refresh per-day pct in the day-list (rendered by renderSidebarDayList).
  document.querySelectorAll('.sidebar [data-day-pct]').forEach(el => {
    const n = parseInt(el.dataset.dayPct, 10);
    if (Number.isFinite(n)) el.textContent = computeDayProgress(n).pct + '%';
  });
}

// ---------- Landing-only progress hooks ----------
// The landing page exposes data attributes that we fill from the same store
// so pillar cards, week cards, the hero stat and the "Retomar" CTA all
// reflect real local state rather than hand-rolled numbers.
function updateLandingProgress(){
  const global = computeGlobalProgress();

  // Pillar cards: <article data-pillar-day="N"> with a .u-mono inside.
  document.querySelectorAll('[data-pillar-day]').forEach(el => {
    const n = parseInt(el.dataset.pillarDay, 10);
    if (!Number.isFinite(n)) return;
    const p = computeDayProgress(n);
    const pctEl = el.querySelector('[data-day-pct-text]') || el.querySelector('.u-mono');
    if (pctEl) pctEl.textContent = p.pct + '%';
    el.classList.toggle('is-done',    p.pct === 100);
    el.classList.toggle('is-current', p.pct > 0 && p.pct < 100);
  });

  // Week cards: <a data-week-day="N"> with .day-bar > span and .sessions-row > .sess-tick
  document.querySelectorAll('[data-week-day]').forEach(el => {
    const n = parseInt(el.dataset.weekDay, 10);
    if (!Number.isFinite(n)) return;
    const day = SIDEBAR_DAYS.find(d => d.num === n);
    if (!day) return;
    const p = computeDayProgress(n);
    const bar = el.querySelector('.day-bar > span');
    if (bar) bar.style.width = p.pct + '%';
    const ticks = el.querySelectorAll('.sessions-row .sess-tick');
    let nextHit = false;
    day.sessions.forEach((s, i) => {
      const tick = ticks[i];
      if (!tick) return;
      tick.classList.remove('done', 'doing');
      if (isSessionComplete(s.sid)){
        tick.classList.add('done');
      } else if (!nextHit){
        // first incomplete session in this day → mark as in-progress visually
        tick.classList.add('doing');
        nextHit = true;
      }
    });
    el.classList.toggle('is-done',    p.pct === 100);
    el.classList.toggle('is-current', p.pct > 0 && p.pct < 100);
  });

  // Hero stat — "Completado X%"
  const heroStat = document.querySelector('[data-hero-stat="completed"]');
  if (heroStat){
    heroStat.innerHTML = global.pct + '<sup>%</sup>';
  }

  // Resume CTA + Nextup card
  const next = findNextSession();
  const cta = document.querySelector('[data-cta="resume"]');
  if (cta){
    const labelEl = cta.querySelector('[data-cta-label]');
    if (next){
      const verb = global.completed === 0 ? 'Empezar onboarding' : 'Continuar onboarding';
      if (labelEl) labelEl.textContent = verb;
      // Only navigate to the next session if its page actually exists.
      cta.setAttribute('href', next.session.href !== '#' ? next.session.href : next.day.href);
    } else {
      if (labelEl) labelEl.textContent = 'Repasar onboarding';
      cta.setAttribute('href', 'progress.html');
    }
  }

  const nextupKicker  = document.querySelector('[data-nextup="kicker"]');
  const nextupTitle   = document.querySelector('[data-nextup="title"]');
  const nextupCta     = document.querySelector('[data-nextup="cta"]');
  const nextupCtaLbl  = document.querySelector('[data-nextup="cta-label"]');
  const nextupDayCta  = document.querySelector('[data-nextup="day-cta"]');
  const nextupCatDot  = document.querySelector('[data-nextup="cat-dot"]');
  const nextupCatLbl  = document.querySelector('[data-nextup="cat-label"]');
  const sectionTitle  = document.querySelector('[data-nextup="section-title"]');

  if (sectionTitle){
    if (!next)                       sectionTitle.textContent = '¡Has completado el onboarding!';
    else if (global.completed === 0) sectionTitle.textContent = 'Empieza por la primera sesión.';
    else                             sectionTitle.textContent = 'Retomar donde te quedaste.';
  }

  if (next){
    const status = global.completed === 0 ? 'Sin iniciar' : 'En curso';
    if (nextupKicker) nextupKicker.textContent =
      `${status} · Día ${next.day.num} · Bloque ${next.blockIdx} de ${next.blockTotal}`;
    if (nextupTitle)  nextupTitle.textContent = next.session.name;
    if (nextupCatDot) nextupCatDot.style.background = `var(--cat-${next.day.cat})`;
    if (nextupCatLbl) nextupCatLbl.textContent = `Día ${next.day.num} · ${next.day.short}`;
    if (nextupCta){
      nextupCta.setAttribute('href',
        next.session.href !== '#' ? next.session.href : next.day.href);
    }
    if (nextupCtaLbl){
      nextupCtaLbl.textContent = global.completed === 0 ? 'Empezar primera sesión' : 'Continuar sesión';
    }
    if (nextupDayCta) nextupDayCta.setAttribute('href', next.day.href);
  } else {
    if (nextupKicker) nextupKicker.textContent = 'Onboarding completo · ¡Felicidades!';
    if (nextupTitle)  nextupTitle.textContent = 'Has terminado las 30 sesiones del onboarding.';
    if (nextupCtaLbl) nextupCtaLbl.textContent = 'Ver mi progreso';
    if (nextupCta)    nextupCta.setAttribute('href', 'progress.html');
  }

  // Side list: up to 3 sessions after the "next" one.
  const sideEl = document.querySelector('[data-nextup="side"]');
  if (sideEl){
    const upcoming = findUpcomingSessions(3, 1);
    if (upcoming.length === 0){
      sideEl.innerHTML = '';
    } else {
      sideEl.innerHTML = upcoming.map(item => {
        const href = item.session.href !== '#' ? item.session.href : item.day.href;
        const cat  = item.day.cat;
        return (
          `<a class="up-item" href="${escapeHtml(href)}">` +
            `<div class="mini-iso" style="display:flex; align-items:center; justify-content:center;">` +
              `<span style="display:inline-flex; width:36px; height:36px; border-radius:10px; background:var(--cat-${cat}-bg); color:var(--cat-${cat}); font-family:var(--serif); font-size:18px; align-items:center; justify-content:center;">${item.blockIdx}</span>` +
            `</div>` +
            `<div class="up-body">` +
              `<div class="caption"><span style="width:6px;height:6px;background:var(--cat-${cat});border-radius:50%;display:inline-block;"></span> ${escapeHtml(item.day.short)} · Día ${item.day.num} · Bloque ${item.blockIdx}</div>` +
              `<h4>${escapeHtml(item.session.name)}</h4>` +
              `<p>${item.session.href !== '#' ? 'Página disponible' : 'Próximamente'}</p>` +
            `</div>` +
            `<div class="up-cta">` +
              `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></svg>` +
            `</div>` +
          `</a>`
        );
      }).join('');
    }
  }
}

// Hook localStorage.setItem so same-tab session toggles also refresh the
// sidebar progress without needing changes in each session page.
(function(){
  const _origSet = Storage.prototype.setItem;
  Storage.prototype.setItem = function(key, value){
    _origSet.call(this, key, value);
    if (key === 'lcg-onb-sessions-v1' || key === 'lcg-onb-d1-bienvenida-v1'){
      window.dispatchEvent(new Event('lcg:progress-update'));
    }
  };
})();

function refreshAllProgress(){
  updateSidebarProgress();
  updateLandingProgress();
}

function initSidebar(){
  // Render dynamic day list (if the page uses the shared placeholder)
  const container = document.querySelector('.sidebar [data-sidebar="days"]');
  if (container) renderSidebarDayList(container);
  // Wire click-to-expand on whatever day-list is present
  initSidebarCollapse();
  // Compute and render all progress (sidebar + landing hooks if present)
  refreshAllProgress();
  // Same-tab updates via the custom event (hooked above)
  window.addEventListener('lcg:progress-update', refreshAllProgress);
  // Cross-tab updates
  window.addEventListener('storage', (e) => {
    if (e.key === 'lcg-onb-sessions-v1' || e.key === 'lcg-onb-d1-bienvenida-v1') {
      refreshAllProgress();
    }
  });
}
document.addEventListener('DOMContentLoaded', initSidebar);
