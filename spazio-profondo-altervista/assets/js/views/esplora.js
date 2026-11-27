/**
 * VISTA — Esplora l'universo
 * Esperienza di scelta per categorie più una sezione dedicata alla
 * percezione delle distanze: il tempo-luce è la chiave di lettura.
 */

import { html, raw, num } from '../core/dom.js';
import { CATEGORIES, SCALE_STEPS } from '../../data/universe.js';
import { sectionHead, infoNote } from './partials.js';
import { initReveal } from '../fx/reveal.js';
import { createSimulation } from '../fx/simulations.js';

export const meta = () => ({
  title: 'Esplora l\'universo',
  description: 'Sette categorie per attraversare l\'universo: stelle e costellazioni, nebulose, galassie, Via Lattea, buchi neri, supernove e oggetti del cielo profondo.'
});

let sim = null;

export function render() {
  return html`
  <section class="section" aria-labelledby="titolo">
    <div class="container stack-6">
      ${raw(sectionHead({
        kicker: 'Esplora l\'universo',
        title: 'Dalla stella più vicina ai confini dell\'osservabile',
        text: 'Sette categorie, ordinate per scala crescente. Ogni pagina distingue i fatti accertati dalle ipotesi e dalle questioni ancora aperte, e cita le fonti.',
        level: 1
      }))}

      <div class="grid grid--2">
        ${CATEGORIES.map((c, i) => raw(html`
          <a class="card reveal" href="#/esplora/${c.id}" style="--reveal-delay:${i * 45}ms">
            <div class="card__media" style="background:
                radial-gradient(70% 90% at 25% 20%, ${c.visual.base}44, transparent 65%),
                radial-gradient(60% 80% at 80% 70%, ${c.visual.accent}33, transparent 60%),
                var(--c-night)">
              <span class="eyebrow eyebrow--plain" style="position:absolute;left:var(--s-4);bottom:var(--s-3)">
                ${c.scaleLabel}
              </span>
            </div>
            <span class="eyebrow eyebrow--plain">Categoria 0${c.order}</span>
            <span class="card__title">${c.name}</span>
            <span class="card__text">${c.intro.slice(0, 180)}…</span>
            <span class="card__foot">
              <span class="badge badge--blue">${c.tagline}</span>
              <span class="btn__arrow" aria-hidden="true">→</span>
            </span>
          </a>`))}
      </div>
    </div>
  </section>

  <section class="section section--night" aria-labelledby="scala-titolo">
    <div class="container stack-6">
      ${raw(sectionHead({
        kicker: 'Percepire le distanze',
        title: 'Il modo più onesto di misurare l\'universo è il tempo',
        text: 'I chilometri perdono significato molto presto. Contare in tempo-luce, invece, funziona: ogni distanza diventa il tempo che la luce impiega a coprirla, e quindi quanto indietro nel passato stiamo guardando.'
      }))}

      <div class="stack-5 reveal">
        ${SCALE_STEPS.map((s, i) => raw(html`
          <div class="sky-event">
            <span class="sky-event__when" style="min-width:86px">
              <span class="sky-event__day" style="font-size:1.05rem">${s.lightTime}</span>
              <span class="sky-event__mon">di luce</span>
            </span>
            <span class="sky-event__body">
              <strong>${s.label}</strong>
              <span class="card__text">${num(Math.round(s.km))} km${s.note ? ` · ${s.note}` : ''}</span>
            </span>
            <span class="sky-event__count">${i + 1} / ${SCALE_STEPS.length}</span>
          </div>`))}
      </div>

      ${raw(infoNote('Un esempio concreto: la galassia di Andromeda che vediamo oggi è quella di 2,5 milioni di anni fa. Qualunque cosa le stia accadendo adesso, lo sapremo fra 2,5 milioni di anni.'))}

      <div class="viz reveal">
        <canvas data-sim="expansion" height="280"></canvas>
        <div class="viz__caption">Espansione dell'universo — simulazione schematica, non in scala. Le galassie non si muovono attraverso lo spazio: è lo spazio fra loro che si dilata, e nessun punto è il centro.</div>
      </div>
    </div>
  </section>`;
}

export function mount(root) {
  initReveal(root);
  const canvas = root.querySelector('[data-sim]');
  if (canvas) { sim = createSimulation(canvas, 'expansion', { height: 280 }); sim.start(); }
}

export function unmount() { sim?.destroy(); sim = null; }
