/**
 * VISTA — scheda di missione
 * La pagina del Voyager è il modello di riferimento per gli approfondimenti:
 * storia, obiettivi, risultati, timeline, dati, avvertenze, fonti, quiz.
 */

import { html, raw } from '../core/dom.js';
import { MISSIONS, missionById } from '../../data/missions.js';
import { crumbs, factGrid, sourcesBlock, statusBadge, relatedLinks, infoNote } from './partials.js';
import { initReveal } from '../fx/reveal.js';
import { articleLd } from '../core/seo.js';
import { resolveSources } from '../../data/sources.js';
import { createSimulation } from '../fx/simulations.js';

export function meta(params) {
  const m = missionById(params.id);
  if (!m) return { title: 'Missione non trovata' };
  return {
    title: m.name,
    description: m.hero.slice(0, 180),
    type: 'article',
    jsonLd: articleLd({
      title: m.name,
      description: m.tagline,
      url: `${location.origin}${location.pathname}#/missioni/${m.id}`,
      sources: resolveSources(m.sourceIds)
    })
  };
}

let sim = null;

export function render(params) {
  const m = missionById(params.id);
  if (!m) {
    return html`<section class="section container"><div class="empty">
      <h1>Missione non trovata</h1>
      <p class="text-dim">Questo indirizzo non corrisponde a nessuna missione in archivio.</p>
      <a class="btn btn--ghost" href="#/missioni">Vedi tutte le missioni</a>
    </div></section>`;
  }

  const others = MISSIONS.filter((x) => x.id !== m.id && x.target === m.target).slice(0, 2);

  return html`
  <article class="section">
    <div class="container stack-6">
      ${raw(crumbs([
        { label: 'Home', href: '#/' },
        { label: 'Missioni spaziali', href: '#/missioni' },
        { label: m.short }
      ]))}

      <header class="stack-5 reveal">
        <div class="row">
          <span class="badge badge--blue">${m.agency}</span>
          ${raw(statusBadge(m))}
        </div>
        <h1 style="font-size:var(--t-h1);text-transform:uppercase;letter-spacing:-.03em">
          ${m.name} — ${m.tagline}
        </h1>
        <p class="lead" style="max-width:62ch">${m.hero}</p>
      </header>

      ${raw(factGrid([
        { k: 'Agenzia', v: m.agency },
        { k: 'Obiettivo', v: m.target },
        { k: 'Lancio', v: m.launch },
        { k: 'Stato', v: m.status, note: `dato verificato al ${m.statusAsOf}` }
      ], { columns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))' }))}

      ${m.dataPoints?.length ? raw(html`
        <div class="stack-5 reveal">
          <span class="eyebrow">Dati scientifici</span>
          ${raw(factGrid(m.dataPoints))}
        </div>`) : ''}

      <hr class="hr-glow">

      <div class="grid grid--2" style="gap:var(--s-6)">
        <div class="card card--flat reveal">
          <span class="eyebrow">Obiettivi</span>
          <ul class="prose">${m.objectives.map((o) => raw(`<li>${o}</li>`))}</ul>
        </div>
        <div class="card card--flat reveal">
          <span class="eyebrow">Principali risultati</span>
          <ul class="prose">${m.results.map((r) => raw(`<li>${r}</li>`))}</ul>
        </div>
      </div>

      <div class="stack-6">
        <span class="eyebrow">La storia</span>
        ${m.sections.map((s) => raw(html`
          <div class="${s.emphasis ? 'card card--pad-lg' : 'prose'} reveal">
            <h3>${s.h}</h3>
            <p class="${s.emphasis ? 'text-dim' : ''}">${s.p}</p>
          </div>`))}
      </div>

      ${m.cautions?.length ? raw(html`
        <div class="note reveal" role="note">
          <span class="note__icon" aria-hidden="true">⚠</span>
          <div>
            <strong>Da non confondere.</strong>
            <ul class="prose" style="margin-top:var(--s-2)">
              ${m.cautions.map((c) => raw(`<li style="color:inherit">${c}</li>`))}
            </ul>
          </div>
        </div>`) : ''}

      <!-- Timeline della missione -->
      <div class="stack-5 reveal">
        <span class="eyebrow">Timeline della missione</span>
        <div class="stack">
          ${m.timeline.map((t) => raw(html`
            <div class="sky-event">
              <span class="sky-event__when" style="min-width:94px">
                <span class="sky-event__mon" style="font-size:.7rem;letter-spacing:.1em">${t.date}</span>
              </span>
              <span class="sky-event__body"><span class="card__text" style="color:var(--c-text)">${t.text}</span></span>
            </div>`))}
        </div>
      </div>

      ${m.id === 'voyager' ? raw(trajectoryBlock()) : ''}

      ${raw(infoNote('Le fotografie ufficiali di questa missione sono consultabili sui siti degli enti che la gestiscono, linkati qui sotto. Le illustrazioni di questo sito sono generate graficamente: nessuna immagine protetta da copyright viene riprodotta.'))}

      ${raw(relatedLinks([
        ...others.map((o) => ({ href: `#/missioni/${o.id}`, title: o.name, text: o.tagline, kicker: 'Stessa destinazione' })),
        { href: '#/quiz', title: 'Quiz collegato', text: `Domande sulla categoria "${m.quizCategory}", con spiegazione e fonte.`, kicker: 'Mettiti alla prova' }
      ]))}

      ${raw(sourcesBlock(m.sourceIds))}
    </div>
  </article>`;
}

/** Illustrazione della traiettoria: generata, non fotografica. */
function trajectoryBlock() {
  return html`
  <div class="stack-5 reveal">
    <span class="eyebrow">Illustrazione della traiettoria</span>
    <div class="viz">
      <svg viewBox="0 0 800 360" role="img" aria-label="Schema delle traiettorie di Voyager 1 e Voyager 2 attraverso i pianeti esterni">
        <defs>
          <radialGradient id="sunGrad"><stop offset="0" stop-color="#fff6d8"/><stop offset="1" stop-color="#f07a12"/></radialGradient>
          <linearGradient id="v1" x1="0" x2="1"><stop offset="0" stop-color="#5ee7e0"/><stop offset="1" stop-color="#4da3ff"/></linearGradient>
          <linearGradient id="v2" x1="0" x2="1"><stop offset="0" stop-color="#9a7bff"/><stop offset="1" stop-color="#ff8f5e"/></linearGradient>
        </defs>
        ${[70, 120, 180, 250].map((r, i) => `
          <ellipse cx="110" cy="200" rx="${r}" ry="${r * 0.38}" fill="none"
                   stroke="rgba(173,198,255,.16)" stroke-width="1"/>`).join('')}
        <circle cx="110" cy="200" r="13" fill="url(#sunGrad)"/>
        <text x="110" y="232" fill="#a7b8d6" font-size="10" text-anchor="middle"
              font-family="ui-monospace, monospace">SOLE</text>

        <path d="M110 200 C 200 160, 260 120, 330 96 C 430 62, 560 40, 780 24" fill="none"
              stroke="url(#v1)" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M110 200 C 210 240, 280 276, 360 292 C 470 314, 600 326, 780 336" fill="none"
              stroke="url(#v2)" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="7 5"/>

        <g font-family="ui-monospace, monospace" font-size="10" fill="#e9f0ff">
          <circle cx="232" cy="139" r="6" fill="#c9a177"/><text x="244" y="136">Giove 1979</text>
          <circle cx="330" cy="96" r="5.4" fill="#d6b887"/><text x="342" y="93">Saturno 1980 · V1</text>
          <circle cx="300" cy="271" r="5.4" fill="#d6b887"/><text x="312" y="290">Saturno 1981 · V2</text>
          <circle cx="470" cy="312" r="4.6" fill="#8ed3e0"/><text x="482" y="316">Urano 1986</text>
          <circle cx="600" cy="326" r="4.4" fill="#3b6fd4"/><text x="612" y="330">Nettuno 1989</text>
        </g>
        <g font-family="ui-monospace, monospace" font-size="10">
          <text x="700" y="18" fill="#5ee7e0">VOYAGER 1</text>
          <text x="700" y="356" fill="#9a7bff">VOYAGER 2</text>
        </g>
      </svg>
      <div class="viz__caption">Schema delle due traiettorie e degli incontri planetari. Rappresentazione illustrativa, non in scala: le orbite reali sono quasi complanari e le distanze molto maggiori.</div>
    </div>
  </div>`;
}

export function mount(root) {
  initReveal(root);
  const canvas = root.querySelector('[data-sim]');
  if (canvas) { sim = createSimulation(canvas, canvas.dataset.sim, { height: 240 }); sim.start(); }
}

export function unmount() { sim?.destroy(); sim = null; }
