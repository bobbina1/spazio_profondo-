/**
 * SPAZIO PROFONDO — rivelazione progressiva allo scroll e parallasse leggero.
 * Usa IntersectionObserver: nessun listener di scroll per elemento.
 */

import { $$, prefersReducedMotion } from '../core/dom.js';

let revealObserver = null;
let parallaxItems = [];
let parallaxRaf = null;

export function initReveal(root = document) {
  const targets = $$('.reveal:not(.is-in)', root);
  if (prefersReducedMotion()) { targets.forEach((t) => t.classList.add('is-in')); return; }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  }
  targets.forEach((t, i) => {
    // ritardo a cascata solo fra fratelli vicini, per non rallentare la lettura
    if (!t.style.getPropertyValue('--reveal-delay')) {
      t.style.setProperty('--reveal-delay', `${Math.min(i, 6) * 55}ms`);
    }
    revealObserver.observe(t);
  });
}

/** Parallasse: data-parallax="0.12" sposta l'elemento col 12% dello scroll. */
export function initParallax(root = document) {
  stopParallax();
  if (prefersReducedMotion()) return;
  parallaxItems = $$('[data-parallax]', root).map((node) => ({
    node, factor: parseFloat(node.dataset.parallax) || 0.1, top: 0
  }));
  if (!parallaxItems.length) return;
  measure();
  window.addEventListener('resize', measure, { passive: true });
  loop();
}

function measure() {
  const y = window.scrollY;
  parallaxItems.forEach((item) => {
    item.node.style.transform = '';
    item.top = item.node.getBoundingClientRect().top + y;
  });
}

function loop() {
  const y = window.scrollY;
  const vh = window.innerHeight;
  parallaxItems.forEach((item) => {
    const rel = y + vh - item.top;
    if (rel < -vh || rel > vh * 3) return;   // fuori dalla finestra utile
    const offset = (rel - vh) * item.factor;
    item.node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
  });
  parallaxRaf = requestAnimationFrame(loop);
}

export function stopParallax() {
  if (parallaxRaf) cancelAnimationFrame(parallaxRaf);
  parallaxRaf = null;
  parallaxItems.forEach((i) => { i.node.style.transform = ''; });
  parallaxItems = [];
  window.removeEventListener('resize', measure);
}

/** Conteggio animato di un numero (microinterazione sui dati). */
export function countUp(node, to, { duration = 1100, decimals = 0, suffix = '' } = {}) {
  if (prefersReducedMotion()) { node.textContent = to.toFixed(decimals) + suffix; return; }
  const start = performance.now();
  const from = 0;
  const step = (now) => {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    const value = from + (to - from) * eased;
    node.textContent = new Intl.NumberFormat('it-IT', {
      minimumFractionDigits: decimals, maximumFractionDigits: decimals
    }).format(value) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
