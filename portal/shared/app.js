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
