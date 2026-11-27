/**
 * VISTA — scheda di un singolo fenomeno, con simulazione animata.
 */

import { html, raw, dateText } from '../core/dom.js';
import { PHENOMENA, phenomenonById } from '../../data/phenomena.js';
import { eventById, eventStatus } from '../../data/events.js';
import { categoryById } from '../../data/universe.js';
import { crumbs, sourcesBlock, epistemicBadge, safetyNote, relatedLinks } from './partials.js';
import { initReveal } from '../fx/reveal.js';
import { createSimulation } from '../fx/simulations.js';
import { articleLd } from '../core/seo.js';
import { resolveSources } from '../../data/sources.js';

export function meta(params) {
  const p = phenomenonById(params.id);
  if (!p) return { title: 'Fenomeno non trovato' };
  return {
    title: p.name,
    description: p.intro.slice(0, 180),
    type: 'article',
    jsonLd: articleLd({
      title: p.name, description: p.tagline,
      url: `${location.origin}${location.pathname}#/fenomeni/${p.id}`,
      sources: resolveSources(p.sourceIds)
    })
  };
}

let sim = null;

export function render(params) {
  const p = phenomenonById(params.id);
  if (!p) {
    return html`<section class="section container"><div class="empty">
      <h1>Fenomeno non trovato</h1>
      <a class="btn btn--ghost" href="#/fenomeni">Torna ai fenomeni</a>
    </div></section>`;
  }

  const now = new Date();
  const events = (p.relatedEvents || []).map(eventById).filter(Boolean)
    .filter((e) => eventStatus(e, now).state !== 'passato');
  const topic = p.linkTopic ? categoryById(p.linkTopic) : null;
  const i = PHENOMENA.findIndex((x) => x.id === p.id);

  return html`
  <article class="section">
    <div class="container stack-6">
      ${raw(crumbs([
        { label: 'Home', href: '#/' },
        { label: 'Fenomeni astronomici', href: '#/fenomeni' },
        { label: p.name }
      ]))}

      <header class="stack-5 reveal">
        <div class="row">
          <span class="badge badge--blue">${p.kind}</span>
          ${raw(epistemicBadge(p.epistemic))}
        </div>
        <h1>${p.name}</h1>
        <p class="lead" style="max-width:60ch">${p.tagline}</p>
      </header>

      <div class="viz reveal">
        <canvas data-sim="${p.sim}" height="320"></canvas>
        <div class="viz__caption" data-sim-caption>Simulazione schematica, non in scala</div>
      </div>

      <div class="prose reveal">
        <p style="font-size:clamp(1.02rem,1.9vw,1.16rem)">${p.intro}</p>
        <h3>Come funziona</h3>
        <p>${p.how}</p>
        <h3>Come si osserva</h3>
        <p>${p.observe}</p>
      </div>

      ${p.safety ? raw(safetyNote('Non guardare mai il Sole direttamente, nemmeno durante una fase parziale. Servono filtri solari certificati ISO 12312-2 oppure l\'osservazione per proiezione.')) : ''}

      <div class="card card--flat reveal">
        <span class="eyebrow">Punti chiave</span>
        <ul class="prose">${p.points.map((x) => raw(`<li>${x}</li>`))}</ul>
      </div>

      ${events.length ? raw(html`
        <div class="stack-5 reveal">
          <span class="eyebrow">Prossimi eventi collegati</span>
          ${events.map((e) => raw(html`
            <div class="sky-event">
              <span class="sky-event__when">
                <span class="sky-event__day">${new Date(e.date).getUTCDate()}</span>
                <span class="sky-event__mon">${dateText(e.date, { month: 'short' }).replace('.', '')}</span>
              </span>
              <span class="sky-event__body">
                <strong>${e.title}</strong>
                <span class="card__text">${e.detail}</span>
              </span>
              <span class="sky-event__count">fra ${eventStatus(e, now).days} g</span>
            </div>`))}
          <a class="btn btn--quiet btn--sm" href="#/fenomeni">Calendario completo →</a>
        </div>`) : ''}

      ${raw(relatedLinks([
        topic && { href: `#/esplora/${topic.id}`, title: topic.name, text: 'La fisica dietro il fenomeno, in dettaglio.', kicker: 'Approfondimento' },
        PHENOMENA[i + 1] && { href: `#/fenomeni/${PHENOMENA[i + 1].id}`, title: PHENOMENA[i + 1].name, text: PHENOMENA[i + 1].tagline, kicker: 'Fenomeno successivo' },
        { href: '#/quiz', title: 'Riconosci il fenomeno', text: 'Una delle otto tipologie del quiz usa proprio queste simulazioni.', kicker: 'Quiz' }
      ].filter(Boolean)))}

      ${raw(sourcesBlock(p.sourceIds))}
    </div>
  </article>`;
}

export function mount(root) {
  initReveal(root);
  const canvas = root.querySelector('[data-sim]');
  if (!canvas) return;
  sim = createSimulation(canvas, canvas.dataset.sim, { height: 320 });
  sim.start();
  const caption = root.querySelector('[data-sim-caption]');
  if (caption && sim.label) caption.textContent = `${sim.label} — simulazione schematica, non in scala.`;
}

export function unmount() { sim?.destroy(); sim = null; }
