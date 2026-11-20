// Shared plumbing for the highlight widgets: crisp canvas sizing, an animation loop
// that only runs while the widget is on screen, and a still frame for reduced motion.
export interface WidgetCtx {
  ctx: CanvasRenderingContext2D;
  W: number;
  H: number;
}

export function runWidget(
  canvas: HTMLCanvasElement,
  opts: {
    setup: (w: WidgetCtx) => void; // called on first run and on resize
    frame: (w: WidgetCtx, t: number, dt: number) => void; // t in seconds
    stillTime?: number; // time to render when reduced motion is on
  },
) {
  const ctx = canvas.getContext('2d')!;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const w: WidgetCtx = { ctx, W: 0, H: 0 };
  // ?wt=<seconds> starts every widget at that time (handy for checking later phases)
  const t0 = Number(new URLSearchParams(location.search).get('wt')) || 0;
  let raf = 0, running = false, t = t0, last = 0;

  const size = () => {
    const dpr = Math.min(2, devicePixelRatio || 1);
    w.W = canvas.clientWidth; w.H = canvas.clientHeight;
    canvas.width = w.W * dpr; canvas.height = w.H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    opts.setup(w);
  };
  const still = () => opts.frame(w, t0 || (opts.stillTime ?? 0), 0);
  const loop = (ts: number) => {
    const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0;
    last = ts; t += dt;
    opts.frame(w, t, dt);
    raf = requestAnimationFrame(loop);
  };

  size();
  still();
  if (reduce) {
    new ResizeObserver(() => { size(); still(); }).observe(canvas);
    return;
  }
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !running) { running = true; last = 0; raf = requestAnimationFrame(loop); }
    else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
  }).observe(canvas);
  let rt = 0;
  new ResizeObserver(() => { clearTimeout(rt); rt = window.setTimeout(() => { size(); if (!running) still(); }, 100); }).observe(canvas);
}

/** Small deterministic PRNG so the scenes look the same on every visit. */
export function rng(seed: number) {
  let s = seed % 2147483647 || 1;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export const PALETTE = {
  bg: '#050913',
  ice: ['#0d1330', '#25346b', '#396fa5', '#69afc7', '#eafdfd'],
  vir: ['#440154', '#3b528b', '#21918c', '#5ec962', '#fde725'],
  muted: '#7f8fa3',
  ink: '#eef2f6',
};

export function hexPath(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 30);
    ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
  }
  ctx.closePath();
}

const hexRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
/** Interpolate a 5-stop palette at t in [0, 1]. */
export function ramp(stops: string[], t: number, a = 1) {
  t = Math.max(0, Math.min(0.999, t)) * (stops.length - 1);
  const i = Math.floor(t), f = t - i, p = hexRgb(stops[i]), q = hexRgb(stops[i + 1]);
  const c = p.map((v, k) => Math.round(v + (q[k] - v) * f));
  return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
}

export const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
