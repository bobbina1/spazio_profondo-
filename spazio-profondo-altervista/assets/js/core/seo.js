/**
 * SPAZIO PROFONDO — meta tag, Open Graph e dati strutturati per rotta.
 *
 * Il sito è una SPA statica: i meta vengono aggiornati lato client a
 * ogni cambio di rotta, e ogni approfondimento ha un URL condivisibile.
 * Per l'indicizzazione completa lato server si passa a Next.js (README).
 */

const SITE = 'Spazio Profondo';
const DEFAULT_DESC = 'Un viaggio interattivo nell\'universo: Sistema Solare, missioni spaziali, fenomeni astronomici, quiz e giochi scientifici. Contenuti basati su fonti NASA ed ESA.';
const BASE = location.origin + location.pathname;

function setMeta(selector, attr, value) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement('meta');
    const [, key, val] = selector.match(/\[(\w+)="([^"]+)"\]/) || [];
    if (key) node.setAttribute(key, val);
    document.head.append(node);
  }
  node.setAttribute(attr, value);
}

export function applyMeta(meta, path = '') {
  const title = meta?.title ? `${meta.title} — ${SITE}` : `${SITE} — L'universo è più vicino di quanto immagini`;
  const description = meta?.description || DEFAULT_DESC;
  const url = `${BASE}#/${path}`;

  document.title = title;
  setMeta('meta[name="description"]', 'content', description);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="og:url"]', 'content', url);
  setMeta('meta[property="og:type"]', 'content', meta?.type || 'website');
  setMeta('meta[name="twitter:title"]', 'content', title);
  setMeta('meta[name="twitter:description"]', 'content', description);

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.append(canonical);
  }
  canonical.href = url;

  applyStructuredData(meta, url);
}

/** JSON-LD: Article per gli approfondimenti, WebSite per le pagine indice. */
function applyStructuredData(meta, url) {
  const id = 'ld-route';
  document.getElementById(id)?.remove();
  const data = meta?.jsonLd || {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE,
    description: DEFAULT_DESC,
    url: BASE
  };
  if (!data.url) data.url = url;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.textContent = JSON.stringify(data);
  document.head.append(script);
}

/** Dati strutturati per una pagina di approfondimento scientifico. */
export function articleLd({ title, description, url, datePublished, sources = [] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished,
    inLanguage: 'it',
    isAccessibleForFree: true,
    publisher: { '@type': 'Organization', name: SITE },
    citation: sources.map((s) => ({ '@type': 'CreativeWork', name: s.title, url: s.url }))
  };
}
