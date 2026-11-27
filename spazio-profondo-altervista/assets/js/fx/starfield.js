/**
 * SPAZIO PROFONDO — sfondo stellato animato
 *
 * Prestazioni e accessibilità:
 * - numero di stelle proporzionale all'area dello schermo, con tetto massimo;
 * - su `prefers-reduced-motion` disegna un fotogramma statico e si ferma;
 * - si mette in pausa quando la pagina non è visibile;
 * - il parallasse legge lo scroll una volta per fotogramma (nessun reflow).
 */

import { fitCanvas, prefersReducedMotion, onMotionPreferenceChange, clamp } from '../core/dom.js';

const LAYERS = [
  { count: 0.00022, size: [0.4, 0.9], speed: 0.012, parallax: 0.015, alpha: [0.25, 0.55] },
  { count: 0.00012, size: [0.7, 1.5], speed: 0.030, parallax: 0.045, alpha: [0.40, 0.85] },
  { count: 0.00004, size: [1.2, 2.3], speed: 0.055, parallax: 0.090, alpha: [0.60, 1.00] }
];
const TINTS = ['#ffffff', '#dce9ff', '#fff3d6', '#cfe0ff', '#ffe2e2'];

let canvas, ctx, stars = [], rafId = null, running = false;
let w = 0, h = 0, scrollY = 0, t = 0;

function build() {
  const area = w * h;
  const budget = navigator.deviceMemory && navigator.deviceMemory < 4 ? 0.6 : 1;
  stars = [];
  LAYERS.forEach((layer, li) => {
    const n = clamp(Math.round(area * layer.count * budget), 12, 420);
    for (let i = 0; i < n; i++) {
      stars.push({
        layer: li,
        x: Math.random() * w,
        y: Math.random() * h,
        r: layer.size[0] + Math.random() * (layer.size[1] - layer.size[0]),
        a: layer.alpha[0] + Math.random() * (layer.alpha[1] - layer.alpha[0]),
        tint: TINTS[(Math.random() * TINTS.length) | 0],
        twinkle: Math.random() * Math.PI * 2,
        twinkleRate: 0.4 + Math.random() * 1.6
      });
    }
  });
}

function draw(animated = true) {
  ctx.clearRect(0, 0, w, h);
  for (const s of stars) {
    const layer = LAYERS[s.layer];
    const drift = animated ? (t * layer.speed) % (h + 40) : 0;
    const y = (s.y + drift) % (h + 40) - 20 - scrollY * layer.parallax;
    if (y < -8 || y > h + 8) continue;
    const flicker = animated ? 0.74 + 0.26 * Math.sin(s.twinkle + t * 0.0016 * s.twinkleRate) : 1;
    ctx.globalAlpha = s.a * flicker;
    ctx.fillStyle = s.tint;
    ctx.beginPath();
    ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
    ctx.fill();
    if (s.r > 1.5) { // alone sulle stelle più luminose
      ctx.globalAlpha = s.a * flicker * 0.14;
      ctx.beginPath();
      ctx.arc(s.x, y, s.r * 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}

function frame(ts) {
  if (!running) return;
  t = ts;
  scrollY = window.scrollY;
  draw(true);
  rafId = requestAnimationFrame(frame);
}

function resize() {
  const vw = window.innerWidth, vh = window.innerHeight;
  if (vw === w && vh === h) return;
  w = vw; h = vh;
  ctx = fitCanvas(canvas, w, h);
  build();
  if (!running) draw(false);
}

function play() {
  if (running || prefersReducedMotion()) { draw(false); return; }
  running = true;
  rafId = requestAnimationFrame(frame);
}

function pause() {
  running = false;
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
}

export function initStarfield(target = '#starfield') {
  canvas = typeof target === 'string' ? document.querySelector(target) : target;
  if (!canvas) return;
  resize();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 160);
  });
  document.addEventListener('visibilitychange', () => {
    document.hidden ? pause() : play();
  });
  onMotionPreferenceChange((reduced) => { reduced ? (pause(), draw(false)) : play(); });
  play();
}

export { pause as pauseStarfield, play as playStarfield };
