/**
 * VISTA — Missioni spaziali
 * Elenco filtrabile più timeline interattiva della storia dell'esplorazione.
 */

import { html, raw, $, $$ } from '../core/dom.js';
import { MISSIONS, SPACE_HISTORY } from '../../data/missions.js';
import { crumbs, sectionHead, statusBadge } from './partials.js';
import { initReveal } from '../fx/reveal.js';

export const meta = () => ({
  title: 'Missioni spaziali',
  description: 'Voyager, Apollo, Artemis, BepiColombo, Perseverance, Curiosity, Cassini, New Horizons, Parker Solar Probe, James Webb e Hubble: storia, obiettivi, risultati e stato aggiornato con le fonti ufficiali.'
});

const FILTERS = [
  { id: 'tutte', label: 'Tutte' },
  { id: 'active', label: 'In corso' },
  { id: 'completed', label: 'Concluse' }
];

export function render() {
  const sorted = [...MISSIONS].sort((a, b) => b.launchYear - a.launchYear);
  return html`
  <section class="section" aria-labelledby="titolo">
    <div class="container stack-6">
      ${raw(crumbs([{ label: 'Home', href: '#/' }, { label: 'Missioni spaziali' }]))}
      ${raw(sectionHead({
        kicker: 'Missioni spaziali',
        title: 'Le macchine che hanno esteso i nostri sensi',
        text: 'Ogni scheda riporta storia, obiettivi, risultati, dati e stato della missione. Lo stato cambia nel tempo: accanto è sempre indicata la data a cui il dato si riferisce, con il link alla fonte ufficiale.',
        level: 1
      }))}

      <div class="chips reveal" role="group" aria-label="Filtra per stato">
        ${FILTERS.map((f) => raw(html`
          <button class="chip" type="button" data-filter="${f.id}" aria-pressed="${f.id === 'tutte'}">${f.label}</button>`))}
      </div>

      <div class="grid grid--2" data-list>
        ${sorted.map((m) => raw(html`
          <a class="card reveal" href="#/missioni/${m.id}" data-status="${m.statusLevel}">
            <div class="row row--between">
              <span class="eyebrow eyebrow--plain">${m.agency}</span>
              <span class="mono" style="font-size:var(--t-micro);color:var(--c-text-faint)">${m.launchYear}</span>
            </div>
            <span class="card__title">${m.name}</span>
            <span class="card__text">${m.tagline}</span>
            <span class="card__text" style="color:var(--c-text-faint)">Obiettivo: ${m.target}</span>
            <span class="card__foot">
              ${raw(statusBadge(m))}
              <span class="btn__arrow" aria-hidden="true">→</span>
            </span>
          </a>`))}
      </div>
      <p class="card__text" data-empty hidden>Nessuna missione corrisponde al filtro selezionato.</p>
    </div>
  </section>

  <!-- ============ TIMELINE ============ -->
  <section class="section section--night" aria-labelledby="timeline-titolo">
    <div class="container stack-6">
      ${raw(sectionHead({
        kicker: 'Storia dell\'esplorazione spaziale',
        title: 'Settant\'anni in ${SPACE_HISTORY.length} tappe'.replace('${SPACE_HISTORY.length}', SPACE_HISTORY.length),
        text: 'Scorri la timeline in orizzontale, o usa le frecce della tastiera dopo averla selezionata.'
      }))}
      <div class="timeline reveal">
        <div class="timeline__scroller" data-timeline tabindex="0" role="list"
             aria-label="Timeline dell'esplorazione spaziale">
          ${SPACE_HISTORY.map((e) => raw(html`
            <article class="tl-item" role="listitem">
              <span class="tl-item__dot" aria-hidden="true"></span>
              <span class="tl-item__year">${e.year}</span>
              <span class="eyebrow eyebrow--plain">${e.date}</span>
              <h3 style="font-size:1.05rem">${e.title}</h3>
              <p class="card__text">${e.text}</p>
            </article>`))}
        </div>
        <div class="row" style="justify-content:space-between">
          <button class="btn btn--quiet btn--sm" type="button" data-tl-prev>← Indietro</button>
          <span class="mono" style="font-size:var(--t-micro);color:var(--c-text-faint)">dal 1957 a oggi</span>
          <button class="btn btn--quiet btn--sm" type="button" data-tl-next>Avanti →</button>
        </div>
      </div>
      <div class="card card--flat reveal">
        <span class="eyebrow">Gioco collegato</span>
        <p class="card__text">Gli stessi eventi, in ordine sparso: prova a ricostruire la cronologia esatta.</p>
        <a class="btn btn--ghost btn--sm" href="#/laboratorio/viaggio-tempo">Apri "Viaggio nel tempo" →</a>
      </div>
    </div>
  </section>`;
}

export function mount(root) {
  initReveal(root);

  const cards = $$('[data-status]', root);
  const empty = $('[data-empty]', root);
  $$('[data-filter]', root).forEach((btn) => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    $$('[data-filter]', root).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    let visible = 0;
    cards.forEach((c) => {
      const show = f === 'tutte' || c.dataset.status === f;
      c.hidden = !show;
      if (show) visible += 1;
    });
    empty.hidden = visible > 0;
  }));

  const scroller = $('[data-timeline]', root);
  if (scroller) {
    const step = () => Math.min(360, scroller.clientWidth * 0.8);
    $('[data-tl-next]', root).addEventListener('click', () => scroller.scrollBy({ left: step(), behavior: 'smooth' }));
    $('[data-tl-prev]', root).addEventListener('click', () => scroller.scrollBy({ left: -step(), behavior: 'smooth' }));
    scroller.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); scroller.scrollBy({ left: step(), behavior: 'smooth' }); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); scroller.scrollBy({ left: -step(), behavior: 'smooth' }); }
      if (e.key === 'Home') { e.preventDefault(); scroller.scrollTo({ left: 0, behavior: 'smooth' }); }
      if (e.key === 'End') { e.preventDefault(); scroller.scrollTo({ left: scroller.scrollWidth, behavior: 'smooth' }); }
    });
  }
}
