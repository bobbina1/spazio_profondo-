/**
 * VISTA — Luna e satelliti naturali
 * Include la simulazione delle fasi (con lo schema orbitale che spiega
 * il perché), la mappa interattiva delle formazioni principali, eclissi,
 * missioni Apollo e moderne, cartografia e satelliti degli altri pianeti.
 */

import { html, raw, $, $$ } from '../core/dom.js';
import { MOON, OTHER_MOONS } from '../../data/moon.js';
import { sphereHTML } from '../fx/planet.js';
import { createMoonLab } from '../widgets/moon-phases.js';
import { createSimulation } from '../fx/simulations.js';
import { crumbs, sectionHead, factGrid, sourcesBlock, infoNote, safetyNote } from './partials.js';
import { initReveal } from '../fx/reveal.js';

export const meta = () => ({
  title: 'Luna e satelliti naturali',
  description: 'Origine della Luna, superficie, mari e crateri, simulazione interattiva delle fasi lunari, eclissi, missioni Apollo e moderne, cartografia lunare e satelliti degli altri pianeti.'
});

let lab = null;
let sims = [];

export function render() {
  return html`
  <section class="section" aria-labelledby="titolo">
    <div class="container stack-6">
      ${raw(crumbs([{ label: 'Home', href: '#/' }, { label: 'Luna' }]))}
      ${raw(sectionHead({
        kicker: 'Luna e satelliti naturali',
        title: 'L\'unico altro mondo su cui abbiamo camminato',
        text: 'Un quarto del diametro terrestre, a 1,3 secondi luce da noi. Abbastanza vicina per essere studiata nei dettagli, abbastanza diversa da riscrivere quello che sapevamo sulla formazione dei pianeti.',
        level: 1
      }))}
      ${raw(factGrid(MOON.facts))}
    </div>
  </section>

  <!-- ============ SIMULAZIONE FASI ============ -->
  <section class="section section--night" aria-labelledby="fasi-titolo">
    <div class="container stack-6">
      ${raw(sectionHead({ kicker: 'Simulazione', title: 'Le fasi lunari, e perché funzionano così' }))}
      <div class="moon-lab">
        <div class="moon-stage reveal" style="padding:0;overflow:hidden">
          <canvas data-moon style="width:100%"></canvas>
        </div>
        <div class="stack-5 reveal">
          <div class="card card--flat">
            <span class="eyebrow">Fase attuale della simulazione</span>
            <h3 data-phase-name style="margin-top:var(--s-2)">—</h3>
            <p class="card__text" data-phase-text></p>
            <p class="mono" style="font-size:var(--t-micro);color:var(--c-text-faint)" data-phase-illum></p>
          </div>
          <div class="slider">
            <label for="phase-range" class="kv__k">Scorri il mese lunare</label>
            <input id="phase-range" type="range" min="0" max="1" step="0.005" value="0.25" data-phase-range
                   aria-label="Posizione nel mese lunare">
          </div>
          <div class="row">
            <button class="btn btn--ghost btn--sm" type="button" data-phase-play aria-pressed="true">Pausa</button>
            <div class="chips" role="group" aria-label="Vai a una fase">
              ${MOON.phases.filter((p) => p.id % 2 === 0).map((p) => raw(html`
                <button class="chip" type="button" data-goto="${p.id / 8}">${p.name}</button>`))}
            </div>
          </div>
          ${raw(infoNote(`<strong>L'equivoco più comune.</strong> ${MOON.phaseNote}`))}
        </div>
      </div>

      <div class="card card--flat reveal">
        <span class="eyebrow">${MOON.tidalLock.h}</span>
        <p class="text-dim" style="margin-top:var(--s-3)">${MOON.tidalLock.p}</p>
      </div>
    </div>
  </section>

  <!-- ============ MAPPA ============ -->
  <section class="section" aria-labelledby="mappa-titolo">
    <div class="container stack-6">
      ${raw(sectionHead({
        kicker: 'Cartografia',
        title: 'Mappa del lato visibile',
        text: 'Tocca una formazione per leggerne la scheda. Le posizioni sono indicative: è una rappresentazione schematica, non una carta metrica.'
      }))}
      <div class="moon-lab">
        <div class="moon-stage reveal">
          <div class="moon-map" data-map>
            ${raw(sphereHTML(MOON.visual, { size: 380, className: 'moon-map__disc' }))}
            ${MOON.mapFeatures.map((f) => raw(html`
              <button class="moon-map__hotspot" type="button" data-feature="${f.id}"
                      style="left:${f.x}%;top:${f.y}%" aria-pressed="false"
                      aria-label="${f.name}"><span class="sr-only">${f.name}</span></button>`))}
          </div>
        </div>
        <div class="stack-5 reveal">
          <div class="card card--flat" data-feature-panel aria-live="polite">
            <span class="eyebrow">Seleziona una formazione</span>
            <p class="card__text">Le macchie scure visibili a occhio nudo sono i mari lunari: pianure di basalto, non distese d'acqua.</p>
          </div>
          <div class="chips">
            ${MOON.mapFeatures.map((f) => raw(html`
              <button class="chip" type="button" data-feature-chip="${f.id}">${f.name}</button>`))}
          </div>
        </div>
      </div>
      <div class="grid grid--2" style="gap:var(--s-5)">
        ${MOON.surface.map((s) => raw(html`
          <div class="prose reveal"><h3>${s.h}</h3><p>${s.p}</p></div>`))}
      </div>
      <div class="card card--flat reveal">
        <span class="eyebrow">${MOON.cartography.h}</span>
        <p class="text-dim" style="margin-top:var(--s-3)">${MOON.cartography.p}</p>
      </div>
    </div>
  </section>

  <!-- ============ ORIGINE ============ -->
  <section class="section section--night">
    <div class="container stack-6">
      <div class="card card--pad-lg reveal">
        <div class="row row--between">
          <span class="eyebrow">Origine</span>
          <span class="badge badge--amber badge--dot">${MOON.origin.status}</span>
        </div>
        <h2 style="margin-top:var(--s-3)">${MOON.origin.h}</h2>
        <p class="text-dim">${MOON.origin.p}</p>
      </div>
    </div>
  </section>

  <!-- ============ ECLISSI ============ -->
  <section class="section" aria-labelledby="eclissi-titolo">
    <div class="container stack-6">
      ${raw(sectionHead({ kicker: 'Eclissi', title: 'Quando Terra, Luna e Sole si allineano' }))}
      <div class="grid grid--2" style="gap:var(--s-6)">
        ${MOON.eclipses.map((e) => raw(html`
          <div class="stack-5 reveal">
            <div class="viz">
              <canvas data-sim="${e.id === 'lunare' ? 'eclipse-lunar' : 'eclipse-solar'}" height="240"></canvas>
              <div class="viz__caption">Simulazione schematica, non in scala</div>
            </div>
            <h3>${e.name}</h3>
            <p class="text-dim">${e.p}</p>
            <p class="card__text"><strong>Visibilità.</strong> ${e.visibility}</p>
          </div>`))}
      </div>
      ${raw(infoNote(`<strong>Perché non ogni mese.</strong> ${MOON.eclipseWhyNotMonthly}`))}
      ${raw(safetyNote('Per osservare un\'eclissi di Sole servono filtri solari certificati ISO 12312-2. Occhiali da sole, lastre radiografiche, vetri affumicati e filtri improvvisati non proteggono la retina. Le eclissi di Luna, invece, si osservano senza alcun filtro.'))}
    </div>
  </section>

  <!-- ============ MISSIONI ============ -->
  <section class="section section--night" aria-labelledby="missioni-titolo">
    <div class="container stack-6">
      ${raw(sectionHead({ kicker: 'Esplorazione', title: 'Dalle missioni Apollo al ritorno sulla Luna' }))}
      <div class="stack-5 reveal">
        <span class="eyebrow">Allunaggi del programma Apollo</span>
        <div class="grid grid--3">
          ${MOON.apollo.map((a) => raw(html`
            <div class="card card--flat">
              <span class="row row--between">
                <span class="card__title">${a.m}</span>
                <span class="badge">${a.y}</span>
              </span>
              <span class="card__text"><strong>${a.site}</strong></span>
              <span class="card__text">${a.note}</span>
            </div>`))}
        </div>
      </div>
      <div class="stack-5 reveal">
        <span class="eyebrow">Missioni lunari moderne</span>
        <div class="stack">
          ${MOON.modernMissions.map((m) => raw(html`
            <div class="sky-event">
              <span class="sky-event__when"><span class="sky-event__day" style="font-size:1.1rem">${m.year}</span></span>
              <span class="sky-event__body">
                <strong>${m.name}</strong>
                <span class="card__text">${m.note}</span>
              </span>
              <span class="sky-event__count">${m.agency}</span>
            </div>`))}
        </div>
        <a class="btn btn--ghost btn--sm" href="#/missioni/artemis">Scheda del programma Artemis →</a>
      </div>
    </div>
  </section>

  <!-- ============ ALTRI SATELLITI ============ -->
  <section class="section" aria-labelledby="satelliti-titolo">
    <div class="container stack-6">
      ${raw(sectionHead({
        kicker: 'Satelliti naturali',
        title: 'Gli altri mondi in orbita attorno ai pianeti',
        text: 'Alcuni satelliti sono più interessanti dei pianeti che orbitano: oceani sotto il ghiaccio, vulcani attivi, laghi di metano.'
      }))}
      <div class="grid grid--3">
        ${OTHER_MOONS.map((m) => raw(html`
          <div class="card reveal">
            <div class="row" style="gap:var(--s-4);align-items:center">
              ${raw(sphereHTML(m.visual, { size: 48 }))}
              <span>
                <span class="card__title">${m.name}</span><br>
                <span class="badge">${m.planet}</span>
              </span>
            </div>
            <span class="card__text">${m.note}</span>
            <span class="card__foot"><span class="mono" style="font-size:var(--t-micro);color:var(--c-text-faint)">⌀ ${m.diameterKm.toLocaleString('it-IT')} km</span></span>
          </div>`))}
      </div>
      ${raw(sourcesBlock(MOON.sourceIds))}
    </div>
  </section>`;
}

export function mount(root) {
  initReveal(root);

  /* --- simulazione delle fasi --- */
  const canvas = $('[data-moon]', root);
  const nameNode = $('[data-phase-name]', root);
  const textNode = $('[data-phase-text]', root);
  const illumNode = $('[data-phase-illum]', root);
  const range = $('[data-phase-range]', root);
  const playBtn = $('[data-phase-play]', root);

  if (canvas) {
    lab = createMoonLab(canvas, {
      height: window.innerWidth < 700 ? 260 : 320,
      onPhaseChange(phase, info) {
        nameNode.textContent = info.name;
        textNode.textContent = info.text;
        illumNode.textContent = `illuminazione ≈ ${Math.round(info.illum * 100)}% · giorno ${Math.round(phase * 29.53)} del mese sinodico`;
        if (document.activeElement !== range) range.value = String(phase);
      }
    });
    lab.init();

    range.addEventListener('input', (e) => {
      if (lab.state?.playing !== false) { /* lo slider ha priorità */ }
      lab.setPhase(Number(e.target.value));
    });
    range.addEventListener('pointerdown', () => {
      if (playBtn.getAttribute('aria-pressed') === 'true') playBtn.click();
    });
    playBtn.addEventListener('click', () => {
      const playing = lab.togglePlay();
      playBtn.textContent = playing ? 'Pausa' : 'Riprendi';
      playBtn.setAttribute('aria-pressed', String(playing));
    });
    $$('[data-goto]', root).forEach((btn) => btn.addEventListener('click', () => {
      if (playBtn.getAttribute('aria-pressed') === 'true') playBtn.click();
      lab.setPhase(Number(btn.dataset.goto));
      range.value = btn.dataset.goto;
    }));
  }

  /* --- mappa lunare --- */
  const panel = $('[data-feature-panel]', root);
  const selectFeature = (id) => {
    const f = MOON.mapFeatures.find((x) => x.id === id);
    if (!f) return;
    panel.innerHTML = html`
      <span class="eyebrow">${f.type === 'mare' ? 'Mare lunare' : f.type === 'crater' ? 'Cratere' : 'Regione'}</span>
      <h3 style="margin-top:var(--s-2)">${f.name}</h3>
      <p class="card__text">${f.text}</p>`;
    $$('[data-feature]', root).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.feature === id)));
    $$('[data-feature-chip]', root).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.featureChip === id)));
  };
  $$('[data-feature]', root).forEach((b) => b.addEventListener('click', () => selectFeature(b.dataset.feature)));
  $$('[data-feature-chip]', root).forEach((b) => b.addEventListener('click', () => selectFeature(b.dataset.featureChip)));

  /* --- simulazioni delle eclissi --- */
  sims = $$('[data-sim]', root).map((c) => {
    const s = createSimulation(c, c.dataset.sim, { height: 240 });
    s.start();
    return s;
  });
}

export function unmount() {
  lab?.destroy(); lab = null;
  sims.forEach((s) => s.destroy()); sims = [];
}
