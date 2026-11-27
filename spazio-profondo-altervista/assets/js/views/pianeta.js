/**
 * VISTA — scheda completa di un pianeta (o di un corpo minore).
 * URL dedicato e condivisibile: #/sistema-solare/marte
 */

import { html, raw, num } from '../core/dom.js';
import { PLANETS, planetById, bodyById } from '../../data/planets.js';
import { missionById } from '../../data/missions.js';
import { sphereHTML } from '../fx/planet.js';
import { crumbs, factGrid, sourcesBlock, relatedLinks } from './partials.js';
import { initReveal } from '../fx/reveal.js';
import { articleLd } from '../core/seo.js';
import { resolveSources } from '../../data/sources.js';

/** Costruisce una meta description piu' informativa: la tagline da sola
 *  (32-52 caratteri sui pianeti) e' troppo corta per una buona SEO, quindi
 *  la arricchiamo con dati chiave quando disponibili. */
function describeBody(p) {
  if (p.diameterKm) {
    const bits = [p.tagline];
    bits.push(`Diametro ${p.diameterKm.toLocaleString('it-IT')} km`);
    if (p.distanceKmText) bits.push(`a ${p.distanceKmText} dal Sole`);
    if (p.moons) {
      bits.push(p.moons.count === 0 ? 'senza lune conosciute' : `${p.moons.count} lune note`);
    }
    return bits.filter(Boolean).join(', ') + '.';
  }
  return p.intro?.slice(0, 190) || p.badge;
}

export function meta(params) {
  const p = planetById(params.id) || bodyById(params.id);
  if (!p) return { title: 'Corpo non trovato' };
  const description = describeBody(p);
  return {
    title: p.name,
    description,
    type: 'article',
    jsonLd: articleLd({
      title: p.name,
      description,
      url: `${location.origin}${location.pathname}#/sistema-solare/${p.id}`,
      sources: resolveSources(p.sourceIds)
    })
  };
}

export function render(params) {
  const p = planetById(params.id);
  if (!p) {
    const b = bodyById(params.id);
    if (b) return renderBody(b);
    return html`<section class="section container"><div class="empty">
      <h1>Corpo celeste non trovato</h1>
      <p class="text-dim">Questo indirizzo non corrisponde a nessun pianeta del Sistema Solare.</p>
      <a class="btn btn--ghost" href="#/sistema-solare">Torna al Sistema Solare</a>
    </div></section>`;
  }

  const i = PLANETS.findIndex((x) => x.id === p.id);
  const prev = PLANETS[i - 1], next = PLANETS[i + 1];
  const missions = p.missionIds.map(missionById).filter(Boolean);

  return html`
  <article class="section">
    <div class="container stack-6">
      ${raw(crumbs([
        { label: 'Home', href: '#/' },
        { label: 'Sistema Solare', href: '#/sistema-solare' },
        { label: p.name }
      ]))}

      <header class="grid reveal" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:var(--s-7);align-items:center">
        <div class="stack-5">
          <span class="eyebrow">${p.kind}</span>
          <h1 style="font-size:var(--t-h1)">${p.name}</h1>
          <p class="lead">${p.tagline}</p>
          <div class="row">
            <span class="badge badge--blue">${p.distanceKmText} dal Sole</span>
            <span class="badge">${num(p.diameterKm)} km di diametro</span>
            <span class="badge">${p.moons.count === 0 ? 'nessun satellite' : `${num(p.moons.count)} satelliti`}</span>
          </div>
        </div>
        <div style="display:grid;place-items:center">
          ${raw(sphereHTML(p.visual, { size: 260, spin: true }))}
        </div>
      </header>

      ${raw(factGrid([
        { k: 'Diametro', v: `${num(p.diameterKm)} km` },
        { k: 'Distanza media dal Sole', v: p.distanceKmText, note: `${p.orbit.au} UA` },
        { k: 'Durata del giorno', v: p.rotation.text, note: `giorno solare: ${p.rotation.solarDayText}` },
        { k: 'Durata dell\'anno', v: p.orbit.periodDays > 700 ? `${(p.orbit.periodDays / 365.26).toFixed(1)} anni` : `${Math.round(p.orbit.periodDays)} giorni` },
        { k: 'Temperatura', v: p.temp.text },
        { k: 'Inclinazione dell\'asse', v: `${p.axialTiltDeg}°` },
        { k: 'Satelliti naturali', v: p.moons.count === 0 ? 'nessuno' : num(p.moons.count),
          note: p.moons.asOf ? `conteggio al ${p.moons.asOf}, in aggiornamento` : p.moons.named.join(', ') },
        { k: 'Eccentricità orbitale', v: String(p.orbit.eccentricity) }
      ]))}

      <hr class="hr-glow">

      <div class="grid grid--2" style="gap:var(--s-6)">
        <div class="prose reveal">
          <h3>Composizione</h3><p>${p.composition}</p>
          <h3>Atmosfera</h3><p>${p.atmosphere}</p>
        </div>
        <div class="stack-5 reveal">
          <div class="card card--flat">
            <span class="eyebrow">Caratteristiche particolari</span>
            <ul class="prose">${p.features.map((f) => raw(`<li>${f}</li>`))}</ul>
          </div>
        </div>
      </div>

      <div class="card card--flat reveal">
        <span class="eyebrow">Curiosità</span>
        <ul class="prose">${p.curiosities.map((c) => raw(`<li>${c}</li>`))}</ul>
      </div>

      <div class="stack-5 reveal">
        <span class="eyebrow">Missioni spaziali che lo hanno studiato</span>
        <p class="text-dim">${p.missionsText}</p>
        ${missions.length ? raw(html`<div class="grid grid--3">
          ${missions.map((m) => raw(html`
            <a class="card" href="#/missioni/${m.id}">
              <span class="eyebrow eyebrow--plain">${m.agency}</span>
              <span class="card__title">${m.name}</span>
              <span class="card__text">${m.tagline}</span>
            </a>`))}
        </div>`) : ''}
      </div>

      ${raw(relatedLinks([
        prev && { href: `#/sistema-solare/${prev.id}`, title: prev.name, text: prev.tagline, kicker: 'Pianeta precedente' },
        next && { href: `#/sistema-solare/${next.id}`, title: next.name, text: next.tagline, kicker: 'Pianeta successivo' },
        { href: '#/quiz', title: 'Mettiti alla prova', text: 'Domande sul Sistema Solare, con spiegazione e fonte.', kicker: 'Quiz' }
      ].filter(Boolean)))}

      ${raw(sourcesBlock(p.sourceIds))}
    </div>
  </article>`;
}

function renderBody(b) {
  return html`
  <article class="section">
    <div class="container stack-6">
      ${raw(crumbs([
        { label: 'Home', href: '#/' },
        { label: 'Sistema Solare', href: '#/sistema-solare' },
        { label: b.name }
      ]))}
      <header class="stack-5 reveal">
        <span class="eyebrow">${b.badge}</span>
        <h1>${b.name}</h1>
        <p class="lead">${b.intro}</p>
      </header>
      ${raw(factGrid(b.facts))}
      <ul class="prose reveal">${b.points.map((p) => raw(`<li>${p}</li>`))}</ul>
      ${raw(sourcesBlock(b.sourceIds))}
    </div>
  </article>`;
}

export function mount(root) { initReveal(root); }
