/**
 * VISTA — pagina di categoria (stelle, nebulose, galassie…)
 * Struttura richiesta: immagine principale, introduzione, approfondimento,
 * curiosità, dati, collegamenti correlati, fonti.
 */

import { html, raw } from '../core/dom.js';
import { CATEGORIES, categoryById } from '../../data/universe.js';
import { crumbs, sourcesBlock, factGrid, relatedLinks, openQuestions, epistemicBadge } from './partials.js';
import { initReveal } from '../fx/reveal.js';
import { articleLd } from '../core/seo.js';
import { resolveSources } from '../../data/sources.js';

export function meta(params) {
  const c = categoryById(params.id);
  if (!c) return { title: 'Categoria non trovata' };
  return {
    title: c.name,
    description: c.intro.slice(0, 180),
    type: 'article',
    jsonLd: articleLd({
      title: c.name,
      description: c.tagline,
      url: `${location.origin}${location.pathname}#/esplora/${c.id}`,
      sources: resolveSources(c.sourceIds)
    })
  };
}

export function render(params) {
  const c = categoryById(params.id);
  if (!c) {
    return html`<section class="section container">
      <div class="empty">
        <h1>Categoria non trovata</h1>
        <p class="text-dim">L'argomento richiesto non esiste.</p>
        <a class="btn btn--ghost" href="#/esplora">Torna a Esplora l'universo</a>
      </div></section>`;
  }

  const related = c.related.map((id) => {
    const r = categoryById(id);
    return r && { href: `#/esplora/${r.id}`, title: r.name, text: r.tagline, kicker: 'Categoria' };
  }).filter(Boolean);

  return html`
  <article class="section">
    <div class="container stack-6">
      ${raw(crumbs([
        { label: 'Home', href: '#/' },
        { label: 'Esplora l\'universo', href: '#/esplora' },
        { label: c.name }
      ]))}

      <header class="topic-hero reveal" style="--topic-bg:
          radial-gradient(70% 90% at 20% 15%, ${c.visual.base}55, transparent 62%),
          radial-gradient(60% 80% at 85% 60%, ${c.visual.accent}44, transparent 60%)">
        <span class="eyebrow">${c.scaleLabel}</span>
        <h1>${c.name}</h1>
        <p class="lead" style="max-width:52ch">${c.tagline}</p>
      </header>

      <div class="prose reveal">
        <p style="font-size:clamp(1.05rem,2vw,1.2rem)">${c.intro}</p>
      </div>

      ${raw(factGrid(c.facts))}

      <hr class="hr-glow">

      <div class="stack-6">
        <span class="eyebrow">Approfondimento scientifico</span>
        ${c.deep.map((d) => raw(html`
          <div class="prose reveal">
            <h3>${d.h}</h3>
            <p>${d.p}</p>
          </div>`))}
      </div>

      <div class="grid grid--2" style="gap:var(--s-5)">
        <div class="card card--flat reveal">
          <span class="eyebrow">Curiosità</span>
          <ul class="prose">${c.curiosities.map((x) => raw(`<li>${x}</li>`))}</ul>
        </div>
        ${raw(openQuestions(c.openQuestions))}
      </div>

      ${raw(relatedLinks(related))}
      ${raw(sourcesBlock(c.sourceIds))}

      <nav class="row row--between reveal" style="padding-top:var(--s-5);border-top:1px solid var(--c-line)">
        ${raw(prevNext(c))}
      </nav>
    </div>
  </article>`;
}

function prevNext(current) {
  const i = CATEGORIES.findIndex((c) => c.id === current.id);
  const prev = CATEGORIES[i - 1];
  const next = CATEGORIES[i + 1];
  return html`
    ${prev ? raw(`<a class="btn btn--quiet" href="#/esplora/${prev.id}">← ${prev.name}</a>`) : raw('<span></span>')}
    ${next ? raw(`<a class="btn btn--quiet" href="#/esplora/${next.id}">${next.name} →</a>`) : raw('<span></span>')}`;
}

export function mount(root) { initReveal(root); }
