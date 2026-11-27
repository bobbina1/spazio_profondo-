/** SPAZIO PROFONDO — frammenti condivisi fra le viste. */

import { html, raw, esc, dateText } from '../core/dom.js';
import { resolveSources } from '../../data/sources.js';

/** Briciole di navigazione. */
export function crumbs(items) {
  return html`<nav class="crumbs" aria-label="Percorso di navigazione">
    ${items.map((it, i) => raw(
      (i ? '<span aria-hidden="true">/</span>' : '') +
      (it.href ? `<a href="${esc(it.href)}">${esc(it.label)}</a>` : `<span>${esc(it.label)}</span>`)
    ))}
  </nav>`;
}

/** Intestazione di sezione con occhiello, titolo e testo. */
export function sectionHead({ kicker, title, text, level = 2 }) {
  return html`<header class="section-head reveal">
    ${kicker ? raw(`<span class="eyebrow">${esc(kicker)}</span>`) : ''}
    ${raw(`<h${level}>${esc(title)}</h${level}>`)}
    ${text ? raw(`<p class="lead">${esc(text)}</p>`) : ''}
  </header>`;
}

/** Blocco fonti: ogni approfondimento del sito lo include. */
export function sourcesBlock(ids, { title = 'Fonti' } = {}) {
  const list = resolveSources(ids);
  if (!list.length) return '';
  return html`<div class="stack-5 reveal">
    <span class="eyebrow">${title}</span>
    <div class="sources">
      ${list.map((s) => raw(html`
        <div class="source">
          <span class="source__org">${s.org}</span>
          <div class="source__body">
            <a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.title}</a>
            <span class="source__date">verificata il ${dateText(s.checked)}</span>
            ${s.note ? raw(`<span class="source__date">${esc(s.note)}</span>`) : ''}
          </div>
        </div>`))}
    </div>
    <p class="card__text">I dati di questo sito provengono da enti scientifici ufficiali. Dove un dato cambia nel tempo, accanto al valore è indicata la data a cui si riferisce.</p>
  </div>`;
}

/** Etichetta dello stato epistemico: fatto, ipotesi, questione aperta. */
export function epistemicBadge(text) {
  if (!text) return '';
  const t = text.toLowerCase();
  const kind = t.includes('aperta') || t.includes('sconosciut') || t.includes('discussione') ? 'violet'
    : t.includes('ipotesi') || t.includes('previsione') ? 'amber'
    : 'cyan';
  return html`<span class="badge badge--${raw(kind)} badge--dot">${text}</span>`;
}

/** Riquadro "questioni aperte": distingue ciò che non sappiamo. */
export function openQuestions(list) {
  if (!list?.length) return '';
  return html`<div class="card card--flat reveal">
    <span class="eyebrow">Che cosa non sappiamo ancora</span>
    <ul class="prose">${list.map((q) => raw(`<li>${esc(q)}</li>`))}</ul>
  </div>`;
}

/** Nota di avvertenza, usata per la sicurezza nell'osservazione solare. */
export function safetyNote(text) {
  return html`<div class="note" role="note">
    <span class="note__icon" aria-hidden="true">⚠</span>
    <div><strong>Osservazione in sicurezza.</strong> ${text}</div>
  </div>`;
}

export function infoNote(text) {
  return html`<div class="note note--info" role="note">
    <span class="note__icon" aria-hidden="true">ℹ</span><div>${raw(text)}</div>
  </div>`;
}

/** Griglia di coppie chiave/valore. */
export function factGrid(facts, { columns = 'repeat(auto-fit, minmax(min(100%, 170px), 1fr))' } = {}) {
  return html`<div class="grid reveal" style="grid-template-columns:${raw(columns)}">
    ${facts.map((f) => raw(html`
      <div class="kv">
        <span class="kv__k">${f.k}</span>
        <span class="kv__v">${f.v}</span>
        ${f.note ? raw(`<span class="card__text">${esc(f.note)}</span>`) : ''}
      </div>`))}
  </div>`;
}

/** Card di collegamento ad argomenti correlati. */
export function relatedLinks(items) {
  if (!items?.length) return '';
  return html`<div class="stack-5 reveal">
    <span class="eyebrow">Argomenti correlati</span>
    <div class="grid grid--3">
      ${items.map((it) => raw(html`
        <a class="card" href="${it.href}">
          <span class="eyebrow eyebrow--plain">${it.kicker || 'Approfondimento'}</span>
          <span class="card__title">${it.title}</span>
          ${it.text ? raw(`<span class="card__text">${esc(it.text)}</span>`) : ''}
          <span class="card__foot"><span class="badge">Apri</span></span>
        </a>`))}
    </div>
  </div>`;
}

/** Stato di una missione, con la data a cui il dato si riferisce. */
export function statusBadge(mission) {
  const map = { active: 'ok', completed: 'blue', planned: 'amber' };
  const label = { active: 'in corso', completed: 'conclusa', planned: 'pianificata' };
  return html`<span class="badge badge--${raw(map[mission.statusLevel] || 'blue')} badge--dot">
    ${label[mission.statusLevel] || 'stato'} · dato al ${mission.statusAsOf}
  </span>`;
}
