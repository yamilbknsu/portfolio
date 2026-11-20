// Hero background: a world map drawn as size-encoded hexagons with decorative,
// procedurally generated weather (storms, jet streams, wind particles, lightning).
// Settings fixed from the C4 design sample: busy weather, ice base colours,
// viridis on hover, medium cells, land drawn as outlined cells, Toronto marker.
import { geoContains, geoEqualEarth, geoPath, type GeoProjection } from 'd3-geo';
import { feature } from 'topojson-client';
import landTopo from 'world-atlas/land-110m.json';

type RGB = [number, number, number];
interface Cell { x: number; y: number; lon: number; lat: number; land: boolean; dim: number; heat: number }
interface Storm { lon: number; lat: number; v: number; r: number; a: number; k: number; spin: number; ph: number }
interface Particle { lon: number; lat: number; life: number; age: number }

const hex = (h: string): RGB => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB;
const ICE = ['#0d1330', '#25346b', '#396fa5', '#69afc7', '#eafdfd'].map(hex);
const VIR = ['#440154', '#3b528b', '#21918c', '#5ec962', '#fde725'].map(hex);
const R = 9; // cell radius (px)
const TORONTO: [number, number] = [-79.4, 43.66];
const N_STORMS = 11, N_PARTICLES = 180, LIGHTNING_PER_S = 7;
const DEG = Math.PI / 180;

const ramp = (S: RGB[], t: number): RGB => {
  t = Math.max(0, Math.min(0.999, t)) * 4;
  const i = Math.floor(t), f = t - i, a = S[i], b = S[i + 1];
  return a.map((c, k) => Math.round(c + (b[k] - c) * f)) as RGB;
};
// base (ice) blended toward viridis by cursor proximity b
const colour = (t: number, b: number): RGB => {
  const a = ramp(ICE, t), h = ramp(VIR, t * 0.7 + 0.3 * b), m = Math.min(1, b * 1.6);
  return a.map((c, k) => Math.round(c + (h[k] - c) * m)) as RGB;
};
const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a))})`;

export function initHexMap(hero: HTMLElement, canvas: HTMLCanvasElement, tip: HTMLElement) {
  const ctx = canvas.getContext('2d')!;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const land = feature(landTopo as any, (landTopo as any).objects.land) as any;
  const SPHERE = { type: 'Sphere' } as const;

  let W = 0, H = 0, cw = 0, ch = 0, dpr = 1;
  let proj: GeoProjection;
  let cells: Cell[] = [], grid: Cell[][] = [];
  let toronto: Cell | null = null;
  let mx = -9999, my = -9999, T = 0, lastT = 0, raf = 0, running = false;
  let storms: Storm[] = [], parts: Particle[] = [], flashes: { c: Cell; t0: number }[] = [];

  function build() {
    dpr = Math.min(2, devicePixelRatio || 1);
    W = hero.clientWidth; H = hero.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const narrow = W < 820;
    // full-width map; Toronto sits in the gap between text and photo; north edge at the top
    // keep Toronto in the gap just left of the photo, wherever the photo ends up
    const photo = hero.querySelector('.photo')?.getBoundingClientRect(), box = hero.getBoundingClientRect();
    const ax = narrow || !photo ? 0.55 : Math.max(0.5, (photo.left - box.left - 90) / W);
    proj = geoEqualEarth().rotate([-(TORONTO[0] - (ax - 0.5) * 360), 0]).fitWidth(Math.max(W, 900) * 1.02, SPHERE);
    const t0 = proj(TORONTO)!, tr = proj.translate(), top = geoPath(proj).bounds(SPHERE)[0][1];
    proj.translate([tr[0] + W * ax - t0[0], tr[1] - top - 6]);

    cw = Math.sqrt(3) * R; ch = 1.5 * R; cells = []; grid = [];
    for (let row = 0; row * ch < H + R; row++) {
      grid[row] = [];
      for (let c = 0; c * cw < W + cw; c++) {
        const x = c * cw + (row & 1 ? cw / 2 : 0), y = row * ch;
        const ll = proj.invert!([x, y]);
        if (!ll || !isFinite(ll[0]) || !geoContains(SPHERE, ll)) continue;
        const p = proj(ll);
        if (!p || Math.hypot(p[0] - x, p[1] - y) > 1) continue;
        // dim cells behind the text column so the copy stays readable (hover still lights them)
        const dim = narrow ? 0.35 : 0.15 + 0.85 * Math.max(0, Math.min(1, (x / W - 0.34) / 0.24));
        const cell: Cell = { x, y, lon: ll[0], lat: ll[1], land: geoContains(land, ll), dim, heat: 0 };
        cells.push(cell); grid[row][c] = cell;
      }
    }
    const tp = proj(TORONTO)!;
    toronto = nearest(tp[0], tp[1]);
    seedWeather();
  }

  // nearest cell via the row/column grid (checks neighbouring rows and columns)
  function nearest(x: number, y: number): Cell | null {
    const r0 = Math.round(y / ch);
    let best: Cell | null = null, d = 1e9;
    for (let r = r0 - 1; r <= r0 + 1; r++) {
      const g = grid[r]; if (!g) continue;
      const c0 = Math.round((x - (r & 1 ? cw / 2 : 0)) / cw);
      for (let c = c0 - 1; c <= c0 + 1; c++) {
        const e = g[c]; if (!e) continue;
        const dd = (e.x - x) ** 2 + (e.y - y) ** 2;
        if (dd < d) { d = dd; best = e; }
      }
    }
    return best;
  }

  // ---------- decorative weather ----------
  function seedWeather() {
    let sd = 11;
    const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
    storms = Array.from({ length: N_STORMS }, (_, i) => {
      const north = i % 2 === 0, trop = i < 6;
      return {
        lon: rnd() * 360 - 180,
        lat: (north ? 1 : -1) * (trop ? 12 + rnd() * 16 : 40 + rnd() * 18),
        v: trop ? -(2 + rnd() * 2.5) : 3 + rnd() * 4,
        r: trop ? 6 + rnd() * 4 : 9 + rnd() * 5,
        a: 1.2 + rnd() * 0.7, k: 0.5 + rnd() * 0.4, spin: 1.5 + rnd() * 1.5, ph: rnd() * 6,
      };
    });
    parts = Array.from({ length: N_PARTICLES }, () => spawn(rnd));
    flashes = [];
  }
  const spawn = (rnd: () => number = Math.random): Particle => ({ lon: rnd() * 360 - 180, lat: (rnd() * 2 - 1) * 72, life: 2 + rnd() * 5, age: 0 });
  const stormPos = (s: Storm, t: number) => [((s.lon + t * s.v + 540) % 360) - 180, s.lat + Math.sin(t * 0.25 + s.ph) * 5];

  function value(c: Cell, t: number) {
    let s = 0;
    for (const st of storms) {
      const [lon, lat] = stormPos(st, t);
      let dl = ((c.lon - lon + 540) % 360) - 180; dl *= Math.cos(c.lat * DEG);
      const dy = c.lat - lat, d2 = dl * dl + dy * dy;
      if (d2 > 9 * st.r * st.r) continue;
      const d = Math.sqrt(d2), th = Math.atan2(dy, dl);
      const spiral = 0.65 + 0.35 * Math.sin(2 * th + d * st.k * (st.lat > 0 ? 1 : -1) - t * st.spin);
      const eye = 1 - Math.exp(-d2 / (0.35 * st.r * st.r));
      s += st.a * Math.exp(-d2 / (2 * st.r * st.r)) * spiral * eye;
    }
    const jet = (lat0: number, amp: number, f: number, sp: number) =>
      Math.exp(-((c.lat - (lat0 + amp * Math.sin(c.lon * DEG * f + t * sp) + 2 * Math.sin(c.lon * DEG * 7 - t * 0.9))) ** 2) / 45);
    s += 0.7 * (jet(50, 9, 3, 0.35) + jet(-55, 7, 4, -0.3)) * (0.7 + 0.3 * Math.sin(c.lon * DEG * 12 - t * 2));
    s += 0.3 * Math.exp(-((c.lat - 6 * Math.sin(c.lon * DEG * 2 + t * 0.2)) ** 2) / 30) * (0.5 + 0.5 * Math.sin(c.lon * DEG * 20 + t * 1.5));
    return Math.min(1, s + c.heat);
  }

  // idealised general circulation (degrees / second): trades, westerlies, polar easterlies
  function wind(lon: number, lat: number, t: number): [number, number] {
    const a = Math.abs(lat);
    const u = a < 30 ? -7 - 3 * Math.cos(a * DEG * 6) : a < 62 ? 9 + 5 * Math.sin((a - 30) * DEG * 5.6) : -4;
    const v = 2.5 * Math.sin(lon * DEG * 3 + t * 0.4) * (a > 30 && a < 62 ? 1 : 0.4) + (a < 30 ? -Math.sign(lat) * 1.2 : 0);
    return [u, v];
  }

  function step(dt: number) {
    const decay = Math.pow(0.12, dt);
    for (const c of cells) c.heat *= decay;
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i], [u, v] = wind(p.lon, p.lat, T);
      p.lon = ((p.lon + (1.8 * u * dt) / Math.max(0.25, Math.cos(p.lat * DEG)) + 540) % 360) - 180;
      p.lat += 1.8 * v * dt; p.age += dt;
      if (p.age > p.life || Math.abs(p.lat) > 80) { parts[i] = spawn(); continue; }
      const xy = proj([p.lon, p.lat]); if (!xy) continue;
      const c = nearest(xy[0], xy[1]);
      if (c) c.heat = Math.min(0.7, c.heat + 0.45 * Math.min(1, p.age * 2) * (1 - p.age / p.life));
    }
    if (Math.random() < dt * LIGHTNING_PER_S) {
      const st = storms[Math.floor(Math.random() * storms.length)];
      const [lon, lat] = stormPos(st, T);
      const xy = proj([lon + (Math.random() - 0.5) * st.r * 1.6, lat + (Math.random() - 0.5) * st.r * 1.6]);
      const c = xy && nearest(xy[0], xy[1]);
      if (c) flashes.push({ c, t0: T });
    }
    flashes = flashes.filter((f) => T - f.t0 < 0.35);
  }

  // ---------- drawing ----------
  const hexPath = (x: number, y: number, r: number) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) { const a = DEG * (60 * i - 30); ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a)); }
    ctx.closePath();
  };
  const boost = (c: Cell) => Math.max(0, 1 - Math.hypot(c.x - mx, c.y - my) / 110);

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const r0 = R - 1, hi = ramp(ICE, 0.85);
    // land: faint fill + clear outline
    for (const c of cells) {
      if (!c.land) continue;
      ctx.fillStyle = rgba(hi, 0.05 * c.dim); hexPath(c.x, c.y, r0 - 0.3); ctx.fill();
      ctx.strokeStyle = rgba(hi, 0.3 * c.dim); ctx.lineWidth = 1; ctx.stroke();
    }
    // weather: size and colour encode intensity
    for (const c of cells) {
      const b = boost(c), v = value(c, T);
      if (v < 0.05 && b === 0) continue;
      const s = Math.min(1, Math.max(0.08, v) + b * 0.75);
      ctx.fillStyle = rgba(colour(v, b), Math.min(1, (0.3 + 0.65 * v) * c.dim + b * 0.5));
      hexPath(c.x, c.y, r0 * s); ctx.fill();
    }
    // Toronto marker: two staggered expanding rings, a fixed ring, a glowing core
    if (toronto) {
      const top = VIR[4], { x, y } = toronto;
      for (const off of [0, 0.5]) {
        const k = (T * 0.55 + off) % 1;
        ctx.strokeStyle = rgba(top, 0.9 * (1 - k)); ctx.lineWidth = 2; hexPath(x, y, R * (1.4 + 3.2 * k)); ctx.stroke();
      }
      ctx.strokeStyle = rgba(top, 0.9); ctx.lineWidth = 1.5; hexPath(x, y, R * 1.7); ctx.stroke();
      ctx.save(); ctx.shadowColor = rgba(top, 0.9); ctx.shadowBlur = 18; ctx.fillStyle = rgba(top, 1); hexPath(x, y, R * 1.1); ctx.fill(); ctx.restore();
    }
    // lightning
    for (const f of flashes) {
      const k = 1 - (T - f.t0) / 0.35;
      ctx.fillStyle = `rgba(255,255,240,${0.95 * k})`; hexPath(f.c.x, f.c.y, r0 * 1.05); ctx.fill();
      ctx.strokeStyle = `rgba(255,255,240,${0.5 * k})`; ctx.lineWidth = 1; hexPath(f.c.x, f.c.y, r0 * 1.9); ctx.stroke();
    }
  }

  // ---------- loop, visibility, input ----------
  const loop = (ts: number) => {
    T = ts / 1000;
    const dt = lastT ? Math.min(0.05, T - lastT) : 0;
    lastT = T;
    step(dt); draw();
    raf = requestAnimationFrame(loop);
  };
  const start = () => { if (running || reduce) return; running = true; lastT = 0; raf = requestAnimationFrame(loop); };
  const stop = () => { running = false; cancelAnimationFrame(raf); };
  const redrawIfStatic = () => { if (!running) requestAnimationFrame(draw); };

  new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop())).observe(hero);
  let rt = 0;
  new ResizeObserver(() => { clearTimeout(rt); rt = window.setTimeout(() => { build(); draw(); }, 120); }).observe(hero);

  hero.addEventListener('pointermove', (e) => {
    const b = canvas.getBoundingClientRect();
    mx = e.clientX - b.left; my = e.clientY - b.top;
    const c = nearest(mx, my);
    if (c && Math.hypot(c.x - mx, c.y - my) < R * 1.2) {
      tip.textContent = `${Math.abs(c.lat).toFixed(1)}°${c.lat >= 0 ? 'N' : 'S'} ${Math.abs(c.lon).toFixed(1)}°${c.lon >= 0 ? 'E' : 'W'} · ${c.land ? 'land' : 'ocean'} · ${value(c, T).toFixed(2)}`;
      tip.style.transform = `translate(${mx + 14}px, ${my + 14}px)`;
      tip.style.opacity = '1';
    } else tip.style.opacity = '0';
    redrawIfStatic();
  });
  hero.addEventListener('pointerleave', () => { mx = my = -9999; tip.style.opacity = '0'; redrawIfStatic(); });

  build(); draw();
  hero.classList.add('map-ready');
}
