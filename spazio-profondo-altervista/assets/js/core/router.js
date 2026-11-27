/**
 * SPAZIO PROFONDO — router a hash
 *
 * Scelta tecnica: hash routing (#/missioni/voyager) perché il sito è
 * completamente statico e deve funzionare su qualunque hosting senza
 * regole di rewrite. Gli URL restano leggibili e condivisibili.
 * Migrando su Next.js (vedi README) si ottengono path puliti e SSR.
 *
 * Ogni vista è un modulo caricato on demand con import() dinamico:
 * l'utente scarica solo il codice della sezione che apre.
 * Le viste espongono: render(params) -> string | Node, e opzionalmente
 * mount(root, params) e unmount(), chiamata prima di cambiare pagina.
 */

import { $, announce, prefersReducedMotion } from './dom.js';
import { applyMeta } from './seo.js';

const ROUTES = [
  { path: '',                     view: () => import('../views/home.js'),          key: 'home' },
  { path: 'esplora',              view: () => import('../views/esplora.js'),       key: 'esplora' },
  { path: 'esplora/:id',          view: () => import('../views/categoria.js'),     key: 'categoria' },
  { path: 'sistema-solare',       view: () => import('../views/sistema-solare.js'),key: 'sistema-solare' },
  { path: 'sistema-solare/:id',   view: () => import('../views/pianeta.js'),       key: 'pianeta' },
  { path: 'luna',                 view: () => import('../views/luna.js'),          key: 'luna' },
  { path: 'missioni',             view: () => import('../views/missioni.js'),      key: 'missioni' },
  { path: 'missioni/:id',         view: () => import('../views/missione.js'),      key: 'missione' },
  { path: 'fenomeni',             view: () => import('../views/fenomeni.js'),      key: 'fenomeni' },
  { path: 'fenomeni/:id',         view: () => import('../views/fenomeno.js'),      key: 'fenomeno' },
  { path: 'contenuti',            view: () => import('../views/contenuti.js'),     key: 'contenuti' },
  { path: 'quiz',                 view: () => import('../views/quiz.js'),          key: 'quiz' },
  { path: 'laboratorio',          view: () => import('../views/laboratorio.js'),   key: 'laboratorio' },
  { path: 'laboratorio/:id',      view: () => import('../views/laboratorio.js'),   key: 'laboratorio' },
  { path: 'fonti',               view: () => import('../views/fonti.js'),          key: 'fonti' }
];

/** Confronta un percorso con un pattern, estraendo i parametri. */
function match(pattern, parts) {
  const pp = pattern === '' ? [] : pattern.split('/');
  if (pp.length !== parts.length) return null;
  const params = {};
  for (let i = 0; i < pp.length; i++) {
    if (pp[i].startsWith(':')) params[pp[i].slice(1)] = decodeURIComponent(parts[i]);
    else if (pp[i] !== parts[i]) return null;
  }
  return params;
}

export function parseHash(hash = location.hash) {
  const clean = hash.replace(/^#\/?/, '').replace(/\?.*$/, '').replace(/\/+$/, '');
  const parts = clean === '' ? [] : clean.split('/');
  const query = Object.fromEntries(new URLSearchParams(hash.split('?')[1] || ''));
  for (const route of ROUTES) {
    const params = match(route.path, parts);
    if (params) return { route, params: { ...params, ...query }, path: clean };
  }
  return { route: null, params: {}, path: clean };
}

let current = null;        // modulo della vista attiva
let navToken = 0;          // evita condizioni di gara fra navigazioni
const scrollMemory = new Map();

async function renderRoute() {
  const token = ++navToken;
  const { route, params, path } = parseHash();
  const root = $('#view');
  if (!root) return;

  // Pulizia della vista precedente: ferma animazioni e listener.
  if (current?.unmount) { try { current.unmount(); } catch (e) { console.warn('unmount:', e); } }
  current = null;

  root.setAttribute('aria-busy', 'true');

  let mod;
  try {
    mod = route ? await route.view() : await import('../views/non-trovata.js');
  } catch (err) {
    console.error('Caricamento vista fallito:', err);
    root.innerHTML = `<section class="section container"><div class="empty">
      <h2>Sezione non disponibile</h2>
      <p class="text-dim">Non è stato possibile caricare questa parte del sito. Verifica la connessione e riprova.</p>
      <a class="btn btn--ghost" href="#/">Torna alla home</a></div></section>`;
    root.removeAttribute('aria-busy');
    return;
  }
  if (token !== navToken) return; // una navigazione più recente ha la precedenza

  let output;
  try {
    output = await mod.render(params);
  } catch (err) {
    console.error('Render vista fallito:', err);
    output = `<section class="section container"><div class="empty">
      <h2>Contenuto non trovato</h2>
      <p class="text-dim">L'indirizzo richiesto non corrisponde a nessun contenuto.</p>
      <a class="btn btn--ghost" href="#/">Torna alla home</a></div></section>`;
  }
  if (token !== navToken) return;

  root.innerHTML = '';
  if (output instanceof Node) root.append(output);
  else root.innerHTML = output;

  applyMeta(mod.meta ? mod.meta(params) : null, path);
  current = mod;
  if (mod.mount) { try { mod.mount(root, params); } catch (e) { console.error('mount:', e); } }

  root.removeAttribute('aria-busy');
  updateNavState(path);

  // Ripristino posizione: indietro torna dove si era, un nuovo link parte dall'alto.
  const saved = scrollMemory.get(location.hash);
  const behavior = prefersReducedMotion() ? 'auto' : 'auto';
  window.scrollTo({ top: saved ?? 0, behavior });

  // Accessibilità: sposta il focus sul titolo della nuova pagina.
  const heading = root.querySelector('h1');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.classList.add('route-focus');
    heading.focus({ preventScroll: true });
    announce(`${heading.textContent.trim()} — pagina caricata`);
  }
  document.dispatchEvent(new CustomEvent('route:changed', { detail: { path, params } }));
}

function updateNavState(path) {
  const section = path.split('/')[0] || 'home';
  document.querySelectorAll('[data-nav]').forEach((link) => {
    const isCurrent = link.dataset.nav === section;
    if (isCurrent) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  document.body.dataset.section = section;
}

export function navigate(to) {
  const target = to.startsWith('#') ? to : `#/${to.replace(/^\//, '')}`;
  if (location.hash === target) renderRoute();
  else location.hash = target;
}

export function start() {
  // Memorizza lo scroll prima di cambiare hash, per il tasto "indietro".
  window.addEventListener('beforeunload', () => scrollMemory.set(location.hash, window.scrollY));
  let lastHash = location.hash;
  window.addEventListener('hashchange', () => {
    scrollMemory.set(lastHash, 0);
    lastHash = location.hash;
    renderRoute();
  });
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#/"]');
    if (a) scrollMemory.set(location.hash, window.scrollY);
  }, true);
  if (!location.hash) history.replaceState(null, '', '#/');
  renderRoute();
}

export const routeKeys = ROUTES.map((r) => r.key);
