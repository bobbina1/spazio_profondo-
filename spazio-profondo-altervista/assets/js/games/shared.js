/** SPAZIO PROFONDO — elementi comuni ai giochi del Laboratorio. */

import { html, raw, $ } from '../core/dom.js';
import { saveGameRecord, getGameRecord } from '../core/store.js';

/** Intestazione con regole e record personale. */
export function gameHeader(game) {
  const record = getGameRecord(game.id);
  return html`
    <div class="game-head">
      <div class="row row--between">
        <span class="eyebrow">${game.kicker}</span>
        ${record ? raw(html`<span class="badge badge--amber badge--dot">Record: ${record.score} punti</span>`) : ''}
      </div>
      <h2>${game.name}</h2>
      <p class="card__text">${game.summary}</p>
    </div>`;
}

export function rulesBlock(rules) {
  return html`<div class="game-rules">
    <strong>Regole</strong>
    <ol>${rules.map((r) => raw(`<li>${r}</li>`))}</ol>
  </div>`;
}

export function hud(items) {
  return html`<div class="game-hud" data-hud>
    ${items.map(({ label, value, id }) => raw(html`
      <span>${label}<br><b data-hud-${id}>${value}</b></span>`))}
  </div>`;
}

export function gauge(label, value, max, id) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return html`<div class="gauge" data-gauge="${id}">
    <span class="gauge__label"><span>${label}</span><span data-gauge-value>${Math.round(value)}</span></span>
    <span class="gauge__bar"><span class="gauge__fill ${raw(pct < 30 ? 'is-low' : '')}" style="width:${pct}%"></span></span>
  </div>`;
}

export function updateGauge(root, id, value, max) {
  const node = root.querySelector(`[data-gauge="${id}"]`);
  if (!node) return;
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const fill = node.querySelector('.gauge__fill');
  fill.style.width = `${pct}%`;
  fill.classList.toggle('is-low', pct < 30);
  node.querySelector('[data-gauge-value]').textContent = Math.round(value);
}

/** Schermata finale condivisa: punteggio, giudizio, record, rigioca. */
export function resultScreen({ gameId, score, max, title, text, details = [] }) {
  const { isBest, record } = saveGameRecord(gameId, score);
  const percent = max ? Math.round((score / max) * 100) : 0;
  return html`
    <div class="result">
      ${isBest ? raw('<span class="badge badge--amber badge--dot">Nuovo record personale</span>') : ''}
      <div class="result__score">${score}</div>
      <div>
        <h3>${title}</h3>
        <p class="card__text" style="max-width:48ch;margin-inline:auto">${text}</p>
      </div>
      ${details.length ? raw(html`<ul class="prose" style="text-align:left">
        ${details.map((d) => raw(`<li>${d}</li>`))}</ul>`) : ''}
      <div class="row" style="justify-content:center">
        <button class="btn btn--primary" type="button" data-restart>Gioca di nuovo</button>
        <a class="btn btn--ghost" href="#/laboratorio">Torna al laboratorio</a>
      </div>
      <p class="card__text">Punteggio massimo possibile: ${max} · Il tuo record: ${record.score}${percent ? ` · Questa partita: ${percent}%` : ''}</p>
    </div>`;
}

export function onRestart(root, fn) {
  root.querySelector('[data-restart]')?.addEventListener('click', fn);
}

/** Timer al secondo, con callback allo scadere. */
export function createTimer(seconds, onTick, onEnd) {
  let left = seconds, id = null;
  return {
    start() {
      onTick(left);
      id = setInterval(() => {
        left -= 1;
        onTick(left);
        if (left <= 0) { clearInterval(id); id = null; onEnd(); }
      }, 1000);
    },
    stop() { if (id) clearInterval(id); id = null; },
    get left() { return left; },
    addTime(s) { left += s; onTick(left); }
  };
}
