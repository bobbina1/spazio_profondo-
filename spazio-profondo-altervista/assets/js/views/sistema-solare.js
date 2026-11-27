/**
 * VISTA — Sistema Solare
 * Modello interattivo con due modalità di scala dichiarate, selezione dei
 * pianeti via canvas o via barra accessibile, pannello di dettaglio,
 * più le sezioni su Sole, fasce, pianeti nani, comete e meteoroidi.
 */

import { html, raw, $, $$, num } from '../core/dom.js';
import { PLANETS, SUN, SMALL_BODIES, planetById } from '../../data/planets.js';
import { sphereHTML, sunHTML } from '../fx/planet.js';
import { createSolarSystem } from '../widgets/solar-system.js';
import { sectionHead, factGrid, sourcesBlock, infoNote } from './partials.js';
import { initReveal } from '../fx/reveal.js';

export const meta = () => ({
  title: 'Sistema Solare',
  description: 'Modello interattivo del Sistema Solare con due scale dichiarate: otto pianeti selezionabili con dati, atmosfera, satelliti e missioni, più Sole, fasce, pianeti nani e comete.'
});

let widget = null;

export function render() {
  return html`
  <section class="section" aria-labelledby="titolo">
    <div class="container stack-6">
      ${raw(sectionHead({
        kicker: 'Sistema Solare',
        title: 'Il nostro quartiere cosmico, in scala dichiarata',
        text: 'Clicca o tocca un pianeta per aprirne la scheda. Trascina per spostare la vista, usa la rotellina per lo zoom, oppure scegli dalla barra in basso: tutto è raggiungibile da tastiera.',
        level: 1
      }))}

      <div class="solar reveal">
        <div class="solar__toolbar" role="group" aria-label="Controlli del modello">
          <div class="chips" role="group" aria-label="Scala di rappresentazione">
            <button class="chip" type="button" data-mode="illustrativa" aria-pressed="true">Modalità illustrativa</button>
            <button class="chip" type="button" data-mode="scientifica" aria-pressed="false">Scala dichiarata</button>
          </div>
          <span style="flex:1"></span>
          <button class="btn btn--quiet btn--sm" type="button" data-play aria-pressed="true">Pausa</button>
          <label class="row" style="gap:var(--s-2);font-size:var(--t-micro);color:var(--c-text-faint)">
            Velocità
            <input type="range" min="0.2" max="4" step="0.2" value="1" data-speed
                   aria-label="Velocità dell'animazione" style="width:90px">
          </label>
          <button class="btn btn--quiet btn--sm" type="button" data-reset-view>Centra</button>
        </div>

        <div style="position:relative">
          <canvas data-solar role="img"
                  aria-label="Modello animato del Sistema Solare: Sole al centro e otto pianeti in orbita"></canvas>
          <span class="solar__hint" aria-hidden="true">trascina · zoom · clic sul pianeta</span>
          <span class="solar__legend" data-legend></span>
        </div>

        <div class="planet-rail" role="group" aria-label="Seleziona un pianeta">
          ${PLANETS.map((p) => raw(html`
            <button class="planet-rail__btn" type="button" data-select="${p.id}" aria-pressed="false">
              ${raw(sphereHTML(p.visual, { size: 34 }))}
              <span>${p.name}</span>
            </button>`))}
        </div>

        <div data-panel></div>
      </div>

      ${raw(infoNote('<strong>Perché due modalità.</strong> Con le proporzioni reali, se Nettuno stesse a 400 pixel dal Sole la Terra sarebbe a 13 pixel e Mercurio a 5: i pianeti interni risulterebbero inutilizzabili. La modalità illustrativa comprime le distanze per rendere il modello leggibile; la scala dichiarata usa una progressione logaritmica in unità astronomiche e i raggi nel rapporto reale fra i pianeti. Nessuna delle due è "la realtà": per questo la modalità attiva è sempre scritta sul modello.'))}
    </div>
  </section>

  <!-- ============ IL SOLE ============ -->
  <section class="section section--night" aria-labelledby="sole-titolo">
    <div class="container stack-6">
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:var(--s-7);align-items:center">
        <div class="stack-5 reveal">
          <span class="eyebrow">La stella</span>
          <h2 id="sole-titolo">${SUN.name}</h2>
          <p class="lead">${SUN.tagline}</p>
          <p class="text-dim">${SUN.intro}</p>
        </div>
        <div class="reveal" style="display:grid;place-items:center">
          ${raw(sunHTML(200))}
        </div>
      </div>
      ${raw(factGrid(SUN.facts))}
      <div class="stack-6">
        ${SUN.deep.map((d) => raw(html`
          <div class="prose reveal"><h3>${d.h}</h3><p>${d.p}</p></div>`))}
      </div>
      <div class="card card--flat reveal">
        <span class="eyebrow">Curiosità</span>
        <ul class="prose">${SUN.curiosities.map((c) => raw(`<li>${c}</li>`))}</ul>
      </div>
      ${raw(sourcesBlock(SUN.sourceIds))}
    </div>
  </section>

  <!-- ============ ALTRI CORPI ============ -->
  <section class="section" aria-labelledby="corpi-titolo">
    <div class="container stack-6">
      ${raw(sectionHead({
        kicker: 'Non solo pianeti',
        title: 'Fasce, pianeti nani, comete e meteoroidi',
        text: 'La maggior parte dei corpi del Sistema Solare non è un pianeta. Sono questi oggetti a conservare la memoria di come tutto si è formato.'
      }))}
      <div class="stack-5">
        ${SMALL_BODIES.map((b) => raw(html`
          <details class="card reveal" style="cursor:pointer">
            <summary class="row row--between" style="gap:var(--s-4);list-style:none">
              <span class="row" style="gap:var(--s-4)">
                ${raw(sphereHTML(b.visual, { size: 38 }))}
                <span>
                  <span class="card__title">${b.name}</span><br>
                  <span class="badge">${b.badge}</span>
                </span>
              </span>
              <span class="btn__arrow" aria-hidden="true">+</span>
            </summary>
            <div class="stack-5" style="margin-top:var(--s-5)">
              <p class="text-dim">${b.intro}</p>
              ${raw(factGrid(b.facts))}
              <ul class="prose">${b.points.map((p) => raw(`<li>${p}</li>`))}</ul>
              ${raw(sourcesBlock(b.sourceIds, { title: 'Fonti di questa scheda' }))}
            </div>
          </details>`))}
      </div>
    </div>
  </section>`;
}

/** Pannello di dettaglio: tutti i campi richiesti dal progetto. */
function panelHTML(p) {
  return html`
  <div class="planet-panel" role="region" aria-live="polite" aria-label="Scheda di ${p.name}">
    <div class="planet-panel__visual">
      ${raw(sphereHTML(p.visual, { size: 220, spin: true }))}
      <span class="eyebrow eyebrow--plain" style="margin-top:var(--s-4)">${p.kind}</span>
    </div>
    <div class="stack-5">
      <div>
        <h3 style="font-size:var(--t-h2)">${p.name}</h3>
        <p class="lead">${p.tagline}</p>
      </div>
      <div class="planet-panel__facts">
        <div class="kv"><span class="kv__k">Diametro</span><span class="kv__v">${num(p.diameterKm)} km</span></div>
        <div class="kv"><span class="kv__k">Distanza media dal Sole</span><span class="kv__v">${p.distanceKmText}</span>
          <span class="card__text">${p.orbit.au} unità astronomiche</span></div>
        <div class="kv"><span class="kv__k">Durata del giorno</span><span class="kv__v">${p.rotation.text}</span>
          <span class="card__text">giorno solare: ${p.rotation.solarDayText}${p.rotation.retrograde ? ' · rotazione retrograda' : ''}</span></div>
        <div class="kv"><span class="kv__k">Durata dell'anno</span><span class="kv__v">${
          p.orbit.periodDays > 700 ? `${(p.orbit.periodDays / 365.26).toFixed(1)} anni terrestri` : `${Math.round(p.orbit.periodDays)} giorni`
        }</span></div>
        <div class="kv"><span class="kv__k">Temperatura</span><span class="kv__v" style="font-size:.95rem">${p.temp.text}</span></div>
        <div class="kv"><span class="kv__k">Inclinazione dell'asse</span><span class="kv__v">${p.axialTiltDeg}°</span></div>
        <div class="kv"><span class="kv__k">Satelliti naturali</span><span class="kv__v">${p.moons.count === 0 ? 'nessuno' : num(p.moons.count)}</span>
          ${p.moons.asOf ? raw(`<span class="card__text">conteggio al ${p.moons.asOf}, in aggiornamento</span>`) : ''}
          ${p.moons.named.length ? raw(`<span class="card__text">principali: ${p.moons.named.join(', ')}</span>`) : ''}</div>
      </div>
      <div class="stack">
        <div><span class="kv__k">Composizione</span><p class="card__text">${p.composition}</p></div>
        <div><span class="kv__k">Atmosfera</span><p class="card__text">${p.atmosphere}</p></div>
      </div>
      <div class="stack">
        <span class="kv__k">Caratteristiche particolari</span>
        <ul class="prose">${p.features.map((f) => raw(`<li>${f}</li>`))}</ul>
      </div>
      <div class="stack">
        <span class="kv__k">Missioni che lo hanno studiato</span>
        <p class="card__text">${p.missionsText}</p>
      </div>
      <div class="row">
        <a class="btn btn--primary btn--sm" href="#/sistema-solare/${p.id}">Scheda completa di ${p.name}</a>
        ${p.missionIds.length ? raw(`<a class="btn btn--ghost btn--sm" href="#/missioni/${p.missionIds[0]}">Missione collegata</a>`) : ''}
      </div>
    </div>
  </div>`;
}

export function mount(root) {
  initReveal(root);
  const canvas = $('[data-solar]', root);
  const panel = $('[data-panel]', root);
  const legend = $('[data-legend]', root);
  if (!canvas) return;

  const setLegend = (mode) => {
    legend.textContent = mode === 'illustrativa'
      ? 'Modalità illustrativa: distanze compresse con radice quarta, raggi compressi. Serve a leggere e selezionare i pianeti.'
      : 'Scala dichiarata: distanze su scala logaritmica in unità astronomiche, raggi nel rapporto reale fra i pianeti.';
  };

  widget = createSolarSystem(canvas, {
    height: window.innerWidth < 700 ? 400 : 520,
    onSelect(id) {
      const p = planetById(id);
      if (!p) return;
      panel.innerHTML = panelHTML(p);
      $$('[data-select]', root).forEach((b) =>
        b.setAttribute('aria-pressed', String(b.dataset.select === id)));
    }
  });
  widget.init();
  setLegend('illustrativa');

  $$('[data-mode]', root).forEach((btn) => btn.addEventListener('click', () => {
    const mode = btn.dataset.mode;
    widget.setMode(mode);
    setLegend(mode);
    $$('[data-mode]', root).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
  }));

  $$('[data-select]', root).forEach((btn) => btn.addEventListener('click', () => {
    widget.select(btn.dataset.select);
    panel.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }));

  const playBtn = $('[data-play]', root);
  playBtn.addEventListener('click', () => {
    const playing = widget.togglePlay();
    playBtn.textContent = playing ? 'Pausa' : 'Riprendi';
    playBtn.setAttribute('aria-pressed', String(playing));
  });
  if (!widget.state.playing) { playBtn.textContent = 'Riprendi'; playBtn.setAttribute('aria-pressed', 'false'); }

  $('[data-speed]', root).addEventListener('input', (e) => widget.setSpeed(Number(e.target.value)));
  $('[data-reset-view]', root).addEventListener('click', () => widget.resetView());

  widget.select('terra');
}

export function unmount() { widget?.destroy(); widget = null; }
