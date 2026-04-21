// =========================================================
// LCG Portal — Isometric Engineering Animations
// Pure SVG. Each builder draws a technical blueprint that
// animates in, representing a pillar's idea "being built".
// =========================================================

const SVG_NS = 'http://www.w3.org/2000/svg';

function svg(tag, attrs = {}, parent = null) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(el);
  return el;
}

function defs(root) {
  const defsEl = svg('defs', {}, root);
  defsEl.innerHTML = `
    <linearGradient id="face-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#E7F1EE" stop-opacity=".95"/>
      <stop offset="1" stop-color="#FFFFFF" stop-opacity=".85"/>
    </linearGradient>
    <linearGradient id="face-grad-2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8AF4E9" stop-opacity=".55"/>
      <stop offset="1" stop-color="#03B585" stop-opacity=".35"/>
    </linearGradient>
    <linearGradient id="face-grad-warm" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#8AF4E9" stop-opacity=".5"/>
      <stop offset="1" stop-color="#03B585" stop-opacity=".2"/>
    </linearGradient>
    <radialGradient id="glow" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#03B585" stop-opacity=".4"/>
      <stop offset="1" stop-color="#03B585" stop-opacity="0"/>
    </radialGradient>
  `;
  return defsEl;
}

// Isometric projection helpers (dimetric-like, 30°)
const ISO_X = { x: Math.cos(Math.PI / 6), y: Math.sin(Math.PI / 6) };   // 30°
const ISO_Y = { x: -Math.cos(Math.PI / 6), y: Math.sin(Math.PI / 6) };  // 150°
function iso(x, y, z) {
  return {
    x: x * ISO_X.x + y * ISO_Y.x,
    y: x * ISO_X.y + y * ISO_Y.y - z
  };
}
function p(x, y, z) { const pt = iso(x, y, z); return `${pt.x.toFixed(2)},${pt.y.toFixed(2)}`; }

// =========================================================
// HERO — a grand integration blueprint: a 5-day stepped base
// with 3 towers of different heights (pillars), connected
// by wireframe links, with orbital "nodes" (sessions).
// =========================================================
function buildHeroIso(host) {
  if (!host) return;
  const root = svg('svg', { viewBox: '-200 -200 400 400', xmlns: SVG_NS }, host);
  defs(root);

  const g = svg('g', {}, root);

  // --- Ground grid (isometric floor) ---
  const grid = svg('g', { opacity: '.45' }, g);
  const N = 8, step = 18;
  for (let i = -N; i <= N; i++) {
    const a = iso(i * step, -N * step, 0), b = iso(i * step, N * step, 0);
    svg('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: 'stroke-dim' }, grid);
    const c = iso(-N * step, i * step, 0), d = iso(N * step, i * step, 0);
    svg('line', { x1: c.x, y1: c.y, x2: d.x, y2: d.y, class: 'stroke-dim' }, grid);
  }

  // --- Base plinth (5-day stepped platform) ---
  const baseG = svg('g', {}, g);
  // 5 slabs representing days, stepped
  const baseW = 140;
  for (let i = 0; i < 5; i++) {
    const x0 = -baseW/2 + i * (baseW/5);
    const x1 = x0 + baseW/5 - 2;
    const y0 = -60, y1 = 60;
    const h = 4 + i * 1.2;
    // top
    const top = svg('polygon', {
      points: `${p(x0,y0,h)} ${p(x1,y0,h)} ${p(x1,y1,h)} ${p(x0,y1,h)}`,
      class: 'fill-face draw',
      style: `--d:${0.1 + i*0.1}s; --len:800;`
    }, baseG);
    // front face
    svg('polygon', {
      points: `${p(x0,y1,0)} ${p(x1,y1,0)} ${p(x1,y1,h)} ${p(x0,y1,h)}`,
      class: 'fill-face-2 draw',
      style: `--d:${0.15 + i*0.1}s; --len:600;`
    }, baseG);
    // right face
    svg('polygon', {
      points: `${p(x1,y0,0)} ${p(x1,y1,0)} ${p(x1,y1,h)} ${p(x1,y0,h)}`,
      class: 'fill-face draw',
      style: `--d:${0.18 + i*0.1}s; --len:500;`
    }, baseG);
  }

  // --- 3 pillars (towers) of different heights ---
  const towers = [
    { x: -40, y: 0, h: 80, color: '#085E54', accent: '#085E54', label: 'MET' },
    { x:   0, y: 0, h: 120, color: '#03B585', accent: '#085E54', label: 'SYS' },
    { x:  40, y: 0, h: 60, color: '#C68A3E', accent: '#7A5420', label: 'TOOL' }
  ];
  const tG = svg('g', {}, g);
  towers.forEach((t, i) => {
    const half = 12, base = 10;
    const x0 = t.x - half, x1 = t.x + half;
    const y0 = t.y - half, y1 = t.y + half;
    const delay = 1.0 + i * 0.25;
    // four vertical edges (drawn up)
    [[x0,y0],[x1,y0],[x1,y1],[x0,y1]].forEach((pt, k)=>{
      const a = iso(pt[0],pt[1],base), b = iso(pt[0],pt[1],base+t.h);
      svg('line', {
        x1:a.x, y1:a.y, x2:b.x, y2:b.y,
        class: 'stroke-strong draw',
        style: `--d:${delay + k*0.05}s; --len:${t.h+2};`,
        stroke: t.accent
      }, tG);
    });
    // top face
    svg('polygon', {
      points: `${p(x0,y0,base+t.h)} ${p(x1,y0,base+t.h)} ${p(x1,y1,base+t.h)} ${p(x0,y1,base+t.h)}`,
      fill: t.color, 'fill-opacity':'.5', stroke: t.accent, 'stroke-width':'1.1',
      class: 'fadeIn', style: `--d:${delay+0.4}s;`
    }, tG);
    // front face (translucent)
    svg('polygon', {
      points: `${p(x0,y1,base)} ${p(x1,y1,base)} ${p(x1,y1,base+t.h)} ${p(x0,y1,base+t.h)}`,
      fill: t.color, 'fill-opacity':'.3', stroke: t.accent, 'stroke-width':'.9',
      class: 'fadeIn', style: `--d:${delay+0.5}s;`
    }, tG);
    // right face
    svg('polygon', {
      points: `${p(x1,y0,base)} ${p(x1,y1,base)} ${p(x1,y1,base+t.h)} ${p(x1,y0,base+t.h)}`,
      fill: t.color, 'fill-opacity':'.4', stroke: t.accent, 'stroke-width':'.9',
      class: 'fadeIn', style: `--d:${delay+0.55}s;`
    }, tG);
    // horizontal floor lines (rhythm)
    const floors = Math.floor(t.h/14);
    for (let f=1; f<=floors; f++){
      const z = base + f*14;
      svg('polyline', {
        points: `${p(x0,y1,z)} ${p(x1,y1,z)} ${p(x1,y0,z)}`,
        class: 'stroke-dim draw', style: `--d:${delay+0.7+f*0.06}s; --len:60;`
      }, tG);
    }
    // top cap accent
    const capPt = iso(t.x, t.y, base+t.h+4);
    svg('circle', { cx:capPt.x, cy:capPt.y, r:2.5, fill:t.accent, class:'fadeIn pulse', style:`--d:${delay+1.2}s;`}, tG);
    // label
    const lp = iso(t.x, t.y+14, base+t.h+8);
    const txt = svg('text', {
      x: lp.x, y: lp.y, 'text-anchor':'middle',
      fill:'#085E54', 'font-family':'ui-monospace,Menlo,monospace', 'font-size':'7',
      'letter-spacing':'.12em',
      class:'fadeIn', style:`--d:${delay+1.3}s;`
    }, tG);
    txt.textContent = t.label;
  });

  // --- Connecting wireframe arcs between tower tops ---
  const linksG = svg('g', {}, g);
  const tops = towers.map(t=> iso(t.x, t.y, 10 + t.h));
  // Create arc from [0] to [1] to [2]
  for (let i=0;i<tops.length-1;i++){
    const a = tops[i], b = tops[i+1];
    const mx = (a.x+b.x)/2, my = Math.min(a.y,b.y) - 22;
    svg('path', {
      d: `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`,
      class:'stroke draw',
      style: `--d:${2.2+i*0.25}s; --len:160;`,
      stroke:'#085E54', 'stroke-dasharray':'3 3'
    }, linksG);
  }

  // --- Orbiting sessions (small nodes) ---
  const nodesG = svg('g', {}, g);
  const nodes = [
    { x: -70, y: -20, z: 30 }, { x: -60, y: 40, z: 50 },
    { x: 10, y: -60, z: 70 }, { x: 60, y: -30, z: 35 },
    { x: 70, y: 40, z: 55 }, { x: -30, y: 60, z: 20 },
    { x: 40, y: 60, z: 25 }, { x: -80, y: 10, z: 18 }
  ];
  nodes.forEach((n, i) => {
    const pos = iso(n.x, n.y, n.z);
    const delay = 2.6 + i * 0.08;
    svg('circle', {
      cx: pos.x, cy: pos.y, r: 1.8,
      fill:'#085E54', class:'fadeIn', style:`--d:${delay}s;`
    }, nodesG);
    // connector line to nearest tower
    const tower = towers.reduce((best, t) => {
      const d = Math.hypot(t.x - n.x, t.y - n.y);
      return (!best || d < best.d) ? { t, d } : best;
    }, null).t;
    const tPos = iso(tower.x, tower.y, 10 + Math.random() * (60));
    svg('line', {
      x1: tPos.x, y1: tPos.y, x2: pos.x, y2: pos.y,
      class:'stroke-dim draw',
      style: `--d:${delay}s; --len:${Math.hypot(tPos.x-pos.x, tPos.y-pos.y).toFixed(0)};`,
      'stroke-dasharray':'1.5 2'
    }, nodesG);
  });

  // --- Axis indicator bottom-left ---
  const ax = svg('g', { transform: 'translate(-160,140)' }, g);
  const axes = [
    { dx: ISO_X.x * 30, dy: ISO_X.y * 30, lbl: 'X' },
    { dx: ISO_Y.x * 30, dy: ISO_Y.y * 30, lbl: 'Y' },
    { dx: 0, dy: -30, lbl: 'Z' }
  ];
  axes.forEach((a,i) => {
    svg('line', { x1:0, y1:0, x2:a.dx, y2:a.dy, stroke:'#085E54', 'stroke-width':'.8', opacity:'.7',
      class:'draw', style:`--d:${3.2+i*0.1}s; --len:30;` }, ax);
    const t = svg('text', { x: a.dx*1.15, y: a.dy*1.15, fill:'#085E54', 'font-size':'7', 'text-anchor':'middle', class:'fadeIn', style:`--d:${3.4+i*0.1}s;`}, ax);
    t.textContent = a.lbl;
  });
}

// =========================================================
// MET pillar — ORG-CHART tree being drawn in iso
// =========================================================
function buildMetIso(host) {
  if (!host) return;
  const root = svg('svg', { viewBox: '-120 -100 240 200', xmlns: SVG_NS }, host);
  defs(root);
  const g = svg('g', {}, root);

  // baseline grid
  for (let i = -4; i <= 4; i++) {
    const a = iso(i*18, -70, 0), b = iso(i*18, 70, 0);
    svg('line', { x1:a.x, y1:a.y, x2:b.x, y2:b.y, class:'stroke-dim' }, g);
  }
  for (let i = -4; i <= 4; i++) {
    const a = iso(-70, i*18, 0), b = iso(70, i*18, 0);
    svg('line', { x1:a.x, y1:a.y, x2:b.x, y2:b.y, class:'stroke-dim' }, g);
  }

  // Org chart tree nodes (iso boxes)
  const tree = [
    { x:0,   y:0,   z:36, w:14, size:'big',    d:0.2 },        // CEO
    { x:-34, y:0,   z:24, w:10, size:'med',    d:0.7 },
    { x: 34, y:0,   z:24, w:10, size:'med',    d:0.9 },
    { x:-50, y:-26, z:14, w:8,  size:'small',  d:1.2 },
    { x:-20, y:-26, z:14, w:8,  size:'small',  d:1.35 },
    { x: 20, y:-26, z:14, w:8,  size:'small',  d:1.5 },
    { x: 50, y:-26, z:14, w:8,  size:'small',  d:1.65 },
    { x:-40, y: 30, z:14, w:8,  size:'small',  d:1.8 },
    { x: 40, y: 30, z:14, w:8,  size:'small',  d:1.95 }
  ];

  // Connector lines drawn first (so they appear under)
  const links = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[1,7],[2,8]];
  links.forEach(([a,b], i)=>{
    const A = iso(tree[a].x, tree[a].y, tree[a].z);
    const B = iso(tree[b].x, tree[b].y, tree[b].z);
    svg('line', {
      x1: A.x, y1: A.y, x2: B.x, y2: B.y,
      class: 'stroke draw',
      style: `--d:${0.4+i*0.12}s; --len:80;`,
      'stroke-dasharray':'2 2'
    }, g);
  });

  // Then the boxes
  tree.forEach(n => {
    const x0 = n.x - n.w/2, x1 = n.x + n.w/2;
    const y0 = n.y - n.w/2, y1 = n.y + n.w/2;
    const h = 6;
    const zT = n.z, zB = n.z - h;
    // top
    svg('polygon', {
      points: `${p(x0,y0,zT)} ${p(x1,y0,zT)} ${p(x1,y1,zT)} ${p(x0,y1,zT)}`,
      class:'fill-face fadeIn', style:`--d:${n.d}s;`
    }, g);
    // front
    svg('polygon', {
      points: `${p(x0,y1,zB)} ${p(x1,y1,zB)} ${p(x1,y1,zT)} ${p(x0,y1,zT)}`,
      class:'fill-face-2 fadeIn', style:`--d:${n.d+0.05}s;`
    }, g);
    // right
    svg('polygon', {
      points: `${p(x1,y0,zB)} ${p(x1,y1,zB)} ${p(x1,y1,zT)} ${p(x1,y0,zT)}`,
      class:'fill-face fadeIn', style:`--d:${n.d+0.08}s;`
    }, g);
    // dot
    const dp = iso(n.x, n.y, zT);
    svg('circle', { cx:dp.x, cy:dp.y, r: n.size==='big'?2.6:1.8,
      fill: n.size==='big' ? '#085E54' : '#03B585',
      class:'fadeIn pulse', style:`--d:${n.d+0.3}s;`
    }, g);
  });
}

// =========================================================
// SYS pillar — Floating dashboard cube with bar chart + line
// =========================================================
function buildSysIso(host) {
  if (!host) return;
  const root = svg('svg', { viewBox: '-120 -100 240 200', xmlns: SVG_NS }, host);
  defs(root);
  const g = svg('g', {}, root);

  // base grid
  for (let i = -4; i <= 4; i++) {
    const a = iso(i*18, -70, 0), b = iso(i*18, 70, 0);
    svg('line', { x1:a.x, y1:a.y, x2:b.x, y2:b.y, class:'stroke-dim' }, g);
  }
  for (let i = -4; i <= 4; i++) {
    const a = iso(-70, i*18, 0), b = iso(70, i*18, 0);
    svg('line', { x1:a.x, y1:a.y, x2:b.x, y2:b.y, class:'stroke-dim' }, g);
  }

  // Main dashboard panel (iso rectangle, lifted)
  const W = 60, D = 36, lift = 14;
  const x0 = -W/2, x1 = W/2, y0 = -D/2, y1 = D/2;

  // Base plate (thin)
  [[x0,y0,lift],[x1,y0,lift],[x1,y1,lift],[x0,y1,lift]];
  // shadow plate below
  svg('polygon', {
    points:`${p(x0,y0,0)} ${p(x1,y0,0)} ${p(x1,y1,0)} ${p(x0,y1,0)}`,
    fill:'rgba(8,94,84,.06)', stroke:'#085E54', 'stroke-opacity':'.3', 'stroke-width':'.8',
    'stroke-dasharray':'2 2', class:'fadeIn', style:'--d:0.2s;'
  }, g);

  // Support columns
  [[x0,y0],[x1,y0],[x1,y1],[x0,y1]].forEach((pt,i)=>{
    const a = iso(pt[0],pt[1],0), b = iso(pt[0],pt[1],lift);
    svg('line', { x1:a.x, y1:a.y, x2:b.x, y2:b.y, class:'stroke draw',
      style:`--d:${0.3+i*0.05}s; --len:${lift};`
    }, g);
  });

  // Top plate — plate back (faded)
  svg('polygon', {
    points:`${p(x0,y0,lift)} ${p(x1,y0,lift)} ${p(x1,y1,lift)} ${p(x0,y1,lift)}`,
    class:'fill-face fadeIn', style:'--d:0.6s;'
  }, g);

  // BARS on the plate (4 bars growing)
  const bars = [
    { x:-20, h:14, d:1.1 },
    { x: -8, h:22, d:1.2 },
    { x:  4, h:30, d:1.3 },
    { x: 16, h:18, d:1.4 }
  ];
  bars.forEach(bar=>{
    const bx0 = bar.x - 3, bx1 = bar.x + 3;
    const by0 = -4, by1 = 4;
    const zB = lift, zT = lift + bar.h;
    // top
    svg('polygon', {
      points:`${p(bx0,by0,zT)} ${p(bx1,by0,zT)} ${p(bx1,by1,zT)} ${p(bx0,by1,zT)}`,
      fill:'#03B585', 'fill-opacity':'.8', stroke:'#085E54', 'stroke-width':'1',
      class:'fadeIn', style:`--d:${bar.d+0.2}s;`
    }, g);
    // front
    svg('polygon', {
      points:`${p(bx0,by1,zB)} ${p(bx1,by1,zB)} ${p(bx1,by1,zT)} ${p(bx0,by1,zT)}`,
      fill:'#085E54', 'fill-opacity':'.7', stroke:'#085E54', 'stroke-width':'.9',
      class:'fadeIn', style:`--d:${bar.d+0.25}s;`
    }, g);
    // right
    svg('polygon', {
      points:`${p(bx1,by0,zB)} ${p(bx1,by1,zB)} ${p(bx1,by1,zT)} ${p(bx1,by0,zT)}`,
      fill:'#085E54', 'fill-opacity':'.35', stroke:'#085E54', 'stroke-width':'.9',
      class:'fadeIn', style:`--d:${bar.d+0.3}s;`
    }, g);
  });

  // Floating "alert" node above
  const alertPos = iso(-22, 12, lift + 40);
  svg('circle', { cx:alertPos.x, cy:alertPos.y, r:10, fill:'url(#glow)', class:'fadeIn', style:'--d:1.6s;' }, g);
  svg('circle', { cx:alertPos.x, cy:alertPos.y, r:3, fill:'#085E54', class:'fadeIn pulse', style:'--d:1.7s;' }, g);
  const lPos = iso(-22,12, lift + 30);
  svg('line', { x1:lPos.x, y1:lPos.y, x2:alertPos.x, y2:alertPos.y, class:'stroke draw',
    style:'--d:1.5s; --len:30;', 'stroke-dasharray':'1.5 2'
  }, g);

  // Connector lines radiating across
  for (let i=0;i<3;i++){
    const a = iso(20, -10 + i*10, lift);
    const b = iso(48, -10 + i*10, lift + 4);
    svg('line', { x1:a.x, y1:a.y, x2:b.x, y2:b.y, class:'stroke-dim draw',
      style:`--d:${1.8 + i*0.1}s; --len:40;`, 'stroke-dasharray':'1.5 2' }, g);
    svg('circle', { cx:b.x, cy:b.y, r:1.5, fill:'#085E54', class:'fadeIn', style:`--d:${2.0 + i*0.1}s;`}, g);
  }
}

// =========================================================
// TOOL pillar — exploded isometric gear / modular parts
// =========================================================
function buildToolIso(host) {
  if (!host) return;
  const root = svg('svg', { viewBox: '-120 -100 240 200', xmlns: SVG_NS }, host);
  defs(root);
  const g = svg('g', {}, root);

  // base grid
  for (let i = -4; i <= 4; i++) {
    const a = iso(i*18, -70, 0), b = iso(i*18, 70, 0);
    svg('line', { x1:a.x, y1:a.y, x2:b.x, y2:b.y, class:'stroke-dim' }, g);
  }
  for (let i = -4; i <= 4; i++) {
    const a = iso(-70, i*18, 0), b = iso(70, i*18, 0);
    svg('line', { x1:a.x, y1:a.y, x2:b.x, y2:b.y, class:'stroke-dim' }, g);
  }

  // Stack of 3 modular parts (exploded)
  const parts = [
    { z: 50, size: 16, color: '#085E54', d: 0.3, shape: 'gear' },
    { z: 28, size: 24, color: '#03B585', d: 0.6, shape: 'disk' },
    { z: 10, size: 32, color: '#085E54', d: 0.9, shape: 'plate' }
  ];

  parts.forEach((part,i)=>{
    const s = part.size, h = 5;
    if (part.shape === 'plate' || part.shape === 'disk') {
      const x0 = -s, x1 = s, y0 = -s, y1 = s;
      // top
      svg('polygon', {
        points: `${p(x0,y0,part.z+h)} ${p(x1,y0,part.z+h)} ${p(x1,y1,part.z+h)} ${p(x0,y1,part.z+h)}`,
        fill: part.color, 'fill-opacity':'.6', stroke:'#085E54', 'stroke-width':'1',
        class:'fadeIn', style:`--d:${part.d}s;`
      }, g);
      // front
      svg('polygon', {
        points: `${p(x0,y1,part.z)} ${p(x1,y1,part.z)} ${p(x1,y1,part.z+h)} ${p(x0,y1,part.z+h)}`,
        fill: part.color, 'fill-opacity':'.4', stroke:'#085E54', 'stroke-width':'.9',
        class:'fadeIn', style:`--d:${part.d+0.05}s;`
      }, g);
      // right
      svg('polygon', {
        points: `${p(x1,y0,part.z)} ${p(x1,y1,part.z)} ${p(x1,y1,part.z+h)} ${p(x1,y0,part.z+h)}`,
        fill: part.color, 'fill-opacity':'.5', stroke:'#085E54', 'stroke-width':'.9',
        class:'fadeIn', style:`--d:${part.d+0.08}s;`
      }, g);
      // inner pattern (for disk: concentric squares)
      if (part.shape === 'disk') {
        for (let k=1; k<=2; k++) {
          const s2 = s * (1 - k*0.3);
          svg('polygon', {
            points: `${p(-s2,-s2,part.z+h+0.1)} ${p(s2,-s2,part.z+h+0.1)} ${p(s2,s2,part.z+h+0.1)} ${p(-s2,s2,part.z+h+0.1)}`,
            fill:'none', stroke:'#085E54', 'stroke-width':'.7', 'stroke-opacity':'.6',
            class:'fadeIn', style:`--d:${part.d+0.15+k*0.05}s;`
          }, g);
        }
      }
    }
    // gear: draw cross pattern + teeth
    if (part.shape === 'gear') {
      const cp = iso(0, 0, part.z+h+1);
      // teeth positions (8)
      for (let k=0;k<8;k++){
        const ang = (k/8) * Math.PI * 2;
        const r1 = s, r2 = s * 1.3;
        const a = iso(Math.cos(ang)*r1, Math.sin(ang)*r1, part.z+h);
        const b = iso(Math.cos(ang)*r2, Math.sin(ang)*r2, part.z+h);
        svg('line', { x1:a.x, y1:a.y, x2:b.x, y2:b.y, stroke:'#085E54', 'stroke-width':'1.4', 'stroke-linecap':'round',
          class:'fadeIn', style:`--d:${part.d+0.1+k*0.03}s;`
        }, g);
      }
      // central disc
      svg('ellipse', { cx:cp.x, cy:cp.y, rx:s*0.9, ry:s*0.9*Math.sin(Math.PI/6)*2,
        fill: part.color, 'fill-opacity':'.7', stroke:'#085E54', 'stroke-width':'1.2',
        class:'fadeIn', style:`--d:${part.d}s;`
      }, g);
      // inner hole
      svg('ellipse', { cx:cp.x, cy:cp.y, rx:s*0.3, ry:s*0.3*Math.sin(Math.PI/6)*2,
        fill:'#F5ECDC', stroke:'#085E54', 'stroke-width':'1',
        class:'fadeIn', style:`--d:${part.d+0.3}s;`
      }, g);
    }
    // vertical connector
    if (i < parts.length - 1) {
      const next = parts[i+1];
      const a = iso(0,0, part.z);
      const b = iso(0,0, next.z + 5);
      svg('line', { x1:a.x, y1:a.y, x2:b.x, y2:b.y, class:'stroke draw',
        style:`--d:${part.d+0.4}s; --len:20;`, 'stroke-dasharray':'2 2'
      }, g);
    }
  });

  // Dimension lines on the side
  const dimX = 56;
  const top = iso(dimX, -20, parts[0].z + 5);
  const bot = iso(dimX, -20, 0);
  svg('line', { x1:top.x, y1:top.y, x2:bot.x, y2:bot.y, class:'stroke-dim draw',
    style:'--d:1.6s; --len:60;' }, g);
  [parts[0].z+5, parts[1].z+5, parts[2].z+5, 0].forEach((z,i)=>{
    const a = iso(dimX-3, -20, z), b = iso(dimX+3, -20, z);
    svg('line', { x1:a.x, y1:a.y, x2:b.x, y2:b.y, class:'stroke-dim draw',
      style:`--d:${1.7+i*0.05}s; --len:8;` }, g);
  });
  const tT = svg('text', { x: top.x+8, y: top.y-2, fill:'#085E54', 'font-size':'6', class:'fadeIn', style:'--d:2s;' }, g);
  tT.textContent = 'H·055';
}

// =========================================================
// SESSION topic iso — smaller, specific to a topic
// =========================================================
function buildTopicIso(host, topic) {
  // Re-use one of the pillar builders depending on topic
  if (!host) return;
  if (topic === 'met') return buildMetIso(host);
  if (topic === 'sys') return buildSysIso(host);
  if (topic === 'tool') return buildToolIso(host);
  // default: hero
  return buildHeroIso(host);
}

// Export
window.buildHeroIso = buildHeroIso;
window.buildMetIso = buildMetIso;
window.buildSysIso = buildSysIso;
window.buildToolIso = buildToolIso;
window.buildTopicIso = buildTopicIso;
