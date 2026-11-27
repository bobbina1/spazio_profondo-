/** SPAZIO PROFONDO — utility DOM minimale (nessuna dipendenza esterna). */

/** Escape dei caratteri HTML: tutto ciò che arriva dai dati passa da qui. */
export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/** Template tag: interpola valori già "escapati", a meno che siano marcati raw. */
export const RAW = Symbol('raw');
export const raw = (html) => ({ [RAW]: String(html) });

export function html(strings, ...values) {
  return strings.reduce((out, str, i) => {
    if (i === 0) return str;
    const v = values[i - 1];
    let piece;
    if (v == null || v === false) piece = '';
    else if (Array.isArray(v)) piece = v.map((x) => (x && x[RAW] != null ? x[RAW] : esc(x))).join('');
    else if (v[RAW] != null) piece = v[RAW];
    else piece = esc(v);
    return out + piece + str;
  }, '');
}

export const $  = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') node.className = v;
    else if (k === 'dataset') Object.assign(node.dataset, v);
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    node.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return node;
}

/** Delegazione eventi: un solo listener per contenitore. */
export function on(root, event, selector, handler) {
  root.addEventListener(event, (e) => {
    const target = e.target.closest(selector);
    if (target && root.contains(target)) handler(e, target);
  });
}

/* ---------------- Formattazione numeri e date (locale italiano) --------- */
const NF = new Intl.NumberFormat('it-IT');
export const num = (n) => NF.format(n);

export function kmText(km) {
  if (km >= 1e9) return `${num(+(km / 1e9).toFixed(3))} miliardi di km`;
  if (km >= 1e6) return `${num(+(km / 1e6).toFixed(1))} milioni di km`;
  return `${num(km)} km`;
}

export function dateText(iso, opts = { day: 'numeric', month: 'long', year: 'numeric' }) {
  const d = iso instanceof Date ? iso : new Date(iso);
  return new Intl.DateTimeFormat('it-IT', opts).format(d);
}

/** "fra 21 giorni", "oggi", "3 giorni fa" */
export function relativeDays(days) {
  if (days === 0) return 'oggi';
  const rtf = new Intl.RelativeTimeFormat('it-IT', { numeric: 'auto' });
  return rtf.format(days, 'day');
}

export const slug = (s) => String(s).toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/* ---------------- Casualità e array ------------------------------------ */
export function shuffle(arr, rng = Math.random) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
export const sample = (arr, rng = Math.random) => arr[Math.floor(rng() * arr.length)];
export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
export const lerp = (a, b, t) => a + (b - a) * t;

/* ---------------- Preferenze di movimento ------------------------------ */
/* Accesso pigro e protetto: i moduli restano importabili anche fuori dal
   browser (test headless, e rendering lato server se si migra su Next.js). */
const hasDOM = typeof window !== 'undefined' && typeof window.matchMedia === 'function';
let reduceQuery = null;
function motionQuery() {
  if (!hasDOM) return null;
  if (!reduceQuery) reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return reduceQuery;
}
export const prefersReducedMotion = () => motionQuery()?.matches ?? false;
export function onMotionPreferenceChange(fn) {
  motionQuery()?.addEventListener('change', (e) => fn(e.matches));
}

/** Annuncio per screen reader (regione live creata una volta sola). */
let liveRegion;
export function announce(message) {
  if (!liveRegion) {
    liveRegion = el('div', { class: 'sr-only', role: 'status', 'aria-live': 'polite' });
    document.body.append(liveRegion);
  }
  liveRegion.textContent = '';
  setTimeout(() => { liveRegion.textContent = message; }, 60);
}

/** Canvas ad alta densità di pixel, con dimensioni CSS gestite dal layout. */
export function fitCanvas(canvas, cssWidth, cssHeight) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.round(cssWidth * dpr));
  canvas.height = Math.max(1, Math.round(cssHeight * dpr));
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}
