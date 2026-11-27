/**
 * GIOCO 2 — Riconosci il pianeta
 * Indizi rivelati uno alla volta: meno indizi usi, più punti ottieni.
 * Il pianeta è mostrato parzialmente coperto, senza nome.
 */

import { html, raw, $$, shuffle, sample } from '../core/dom.js';
import { sphereHTML } from '../fx/planet.js';
import { PLANETS } from '../../data/planets.js';
import { gameHeader, rulesBlock, resultScreen, onRestart } from './shared.js';

export const meta = {
  id: 'riconosci-pianeta',
  name: 'Riconosci il pianeta',
  kicker: 'Gioco 2',
  summary: 'Un\'immagine parziale e alcuni indizi: identifica il pianeta usando il minor numero di indizi possibile.',
  icon: 'telescope'
};

const ROUNDS = 5;
const MAX = ROUNDS * 100;

/** Indizi generati dai dati reali del pianeta, dal più vago al più specifico. */
function cluesFor(p) {
  return [
    `È un ${p.kind}.`,
    `Un suo giorno dura ${p.rotation.text} e il suo anno ${p.orbit.periodDays > 365 ? `${(p.orbit.periodDays / 365.26).toFixed(1)} anni terrestri` : `${Math.round(p.orbit.periodDays)} giorni`}.`,
    `Satelliti naturali conosciuti: ${p.moons.count === 0 ? 'nessuno' : p.moons.count}.`,
    `Temperatura: ${p.temp.text}.`,
    `Diametro: ${p.diameterKm.toLocaleString('it-IT')} km, a ${p.distanceKmText} dal Sole.`
  ];
}

function buildRound() {
  const target = sample(PLANETS);
  const options = shuffle([target, ...shuffle(PLANETS.filter((p) => p.id !== target.id)).slice(0, 3)]);
  return { target, options, clues: cluesFor(target), revealed: 1 };
}

let rounds = [];

export function render() {
  rounds = Array.from({ length: ROUNDS }, buildRound);
  return html`<section class="game-shell">
    ${raw(gameHeader(meta))}
    <div class="game-body" data-game>
      ${raw(rulesBlock([
        'Ogni round mostra un pianeta parzialmente coperto e un primo indizio.',
        'Puoi chiedere altri indizi: ogni indizio in più riduce i punti del round.',
        'Risposta al primo indizio: 100 punti. Al secondo: 80. Poi 60, 40, 20.',
        'Cinque round per partita.'
      ]))}
      <div class="game-hud">
        <span>Round<br><b data-round>1 / ${ROUNDS}</b></span>
        <span>Punteggio<br><b data-score>0</b></span>
        <span>Valore round<br><b data-value>100</b></span>
      </div>
      <div data-stage></div>
    </div>
  </section>`;
}

export function mount(root, { onFinish } = {}) {
  const body = root.querySelector('[data-game]');
  const stage = body.querySelector('[data-stage]');
  let index = 0, score = 0;
  const log = [];

  const value = (revealed) => Math.max(20, 120 - revealed * 20);

  function paint() {
    const r = rounds[index];
    body.querySelector('[data-round]').textContent = `${index + 1} / ${ROUNDS}`;
    body.querySelector('[data-score]').textContent = score;
    body.querySelector('[data-value]').textContent = value(r.revealed);

    stage.innerHTML = html`
      <div class="grid grid--2" style="align-items:center">
        <div class="viz" style="display:grid;place-items:center;padding:var(--s-6);position:relative">
          ${raw(sphereHTML(r.target.visual, { size: 170, spin: true }))}
          <div style="position:absolute;inset:0;background:
            linear-gradient(100deg, rgba(3,5,11,.96) 42%, rgba(3,5,11,0) 62%)"></div>
          <div class="viz__caption" style="position:absolute;left:0;right:0;bottom:0">Immagine parziale generata dai dati del pianeta</div>
        </div>
        <div class="stack">
          <span class="eyebrow">Indizi</span>
          <ul class="prose" data-clues>
            ${r.clues.slice(0, r.revealed).map((c) => raw(`<li>${c}</li>`))}
          </ul>
          ${r.revealed < r.clues.length
            ? raw('<button class="btn btn--ghost btn--sm" type="button" data-more>Chiedi un altro indizio (−20 punti)</button>')
            : raw('<p class="card__text">Hai usato tutti gli indizi disponibili.</p>')}
        </div>
      </div>
      <div class="answers answers--2col" style="margin-top:var(--s-5)">
        ${r.options.map((p) => raw(html`
          <button class="answer" type="button" data-answer="${p.id}">
            ${raw(sphereHTML(p.visual, { size: 26 }))}<span>${p.name}</span>
          </button>`))}
      </div>`;

    stage.querySelector('[data-more]')?.addEventListener('click', () => { r.revealed += 1; paint(); });
    $$('[data-answer]', stage).forEach((btn) => btn.addEventListener('click', () => answer(btn.dataset.answer)));
  }

  function answer(id) {
    const r = rounds[index];
    const correct = id === r.target.id;
    const gained = correct ? value(r.revealed) : 0;
    score += gained;
    log.push(`${r.target.name}: ${correct ? `indovinato con ${r.revealed} indizi, +${gained} punti` : 'non indovinato'}`);

    $$('[data-answer]', stage).forEach((btn) => {
      btn.disabled = true;
      if (btn.dataset.answer === r.target.id) btn.classList.add('is-correct');
      else if (btn.dataset.answer === id) btn.classList.add('is-wrong');
      else btn.classList.add('is-muted');
    });
    body.querySelector('[data-score]').textContent = score;

    const note = document.createElement('div');
    note.className = 'explain';
    note.innerHTML = html`
      <div class="explain__verdict ${raw(correct ? 'ok' : 'err')}">
        ${correct ? `Esatto: ${r.target.name}` : `Era ${r.target.name}`}
      </div>
      <p class="explain__text">${r.target.tagline}. ${r.target.curiosities[0]}</p>
      <button class="btn btn--primary btn--sm" type="button" data-next>
        ${index + 1 < ROUNDS ? 'Round successivo' : 'Vedi il risultato'}
      </button>`;
    stage.append(note);
    note.querySelector('[data-next]').addEventListener('click', () => {
      index += 1;
      if (index >= ROUNDS) finish();
      else paint();
    });
  }

  function finish() {
    stage.innerHTML = resultScreen({
      gameId: meta.id, score, max: MAX,
      title: score >= MAX * 0.8 ? 'Occhio esperto' : score >= MAX * 0.5 ? 'Buona osservazione' : 'Serve più pratica',
      text: 'I dati usati come indizi sono gli stessi che trovi nelle schede del Sistema Solare.',
      details: log
    });
    onRestart(stage, () => onFinish?.('restart'));
  }

  paint();
  return () => {};
}
