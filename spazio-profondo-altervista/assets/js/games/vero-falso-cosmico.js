/**
 * GIOCO 5 — Vero o falso cosmico
 * Serie di affermazioni sorprendenti sull'universo, a tempo.
 * Le affermazioni provengono dall'archivio del quiz (tipo vero-falso),
 * quindi ognuna ha spiegazione e fonte verificabile.
 */

import { html, raw, $$, shuffle } from '../core/dom.js';
import { QUESTIONS } from '../../data/quiz-questions.js';
import { SOURCES } from '../../data/sources.js';
import { gameHeader, rulesBlock, resultScreen, onRestart, createTimer } from './shared.js';

export const meta = {
  id: 'vero-falso-cosmico',
  name: 'Vero o falso cosmico',
  kicker: 'Gioco 5',
  summary: 'Novanta secondi, affermazioni sorprendenti sull\'universo: quante riesci a giudicare correttamente?',
  icon: 'bolt'
};

const SECONDS = 90;
const POINTS = 100;
const PENALTY = 40;
let pool = [];

export function render() {
  pool = shuffle(QUESTIONS.filter((q) => q.type === 'vero-falso'));
  return html`<section class="game-shell">
    ${raw(gameHeader(meta))}
    <div class="game-body" data-game>
      ${raw(rulesBlock([
        `Hai ${SECONDS} secondi di tempo.`,
        `Risposta corretta: +${POINTS} punti. Errore: −${PENALTY} punti.`,
        'Ogni affermazione è accompagnata dalla spiegazione e dalla fonte.',
        'Il cronometro non si ferma: rispondere d\'istinto conviene.'
      ]))}
      <div class="game-hud">
        <span>Tempo<br><b data-time>${SECONDS}s</b></span>
        <span>Punteggio<br><b data-score>0</b></span>
        <span>Risposte<br><b data-answered>0</b></span>
      </div>
      <div data-stage>
        <div class="empty">
          <p class="text-dim">Pronto? Il cronometro parte al primo tocco.</p>
          <button class="btn btn--primary" type="button" data-start>Inizia la serie</button>
        </div>
      </div>
    </div>
  </section>`;
}

export function mount(root, { onFinish } = {}) {
  const body = root.querySelector('[data-game]');
  const stage = body.querySelector('[data-stage]');
  let score = 0, answered = 0, ok = 0, index = 0, running = false;
  const log = [];

  const timer = createTimer(SECONDS,
    (left) => {
      const node = body.querySelector('[data-time]');
      node.textContent = `${Math.max(0, left)}s`;
      node.style.color = left <= 10 ? 'var(--c-err)' : '';
    },
    () => finish());

  function paint() {
    if (index >= pool.length) index = 0;     // riparte dall'archivio se finisce
    const q = pool[index];
    stage.innerHTML = html`
      <div class="stack-5">
        <p class="quiz-question">${q.text}</p>
        <div class="answers answers--2col">
          <button class="answer" type="button" data-bool="true">
            <span class="answer__key" aria-hidden="true">V</span><span>Vero</span></button>
          <button class="answer" type="button" data-bool="false">
            <span class="answer__key" aria-hidden="true">F</span><span>Falso</span></button>
        </div>
      </div>`;
    $$('[data-bool]', stage).forEach((btn) =>
      btn.addEventListener('click', () => answer(btn.dataset.bool === 'true')));
  }

  function answer(value) {
    if (!running) return;
    const q = pool[index];
    const correct = value === q.correct;
    answered += 1;
    if (correct) { score += POINTS; ok += 1; } else { score = Math.max(0, score - PENALTY); }
    log.push(`${correct ? '✓' : '✗'} ${q.text}`);
    body.querySelector('[data-score]').textContent = score;
    body.querySelector('[data-answered]').textContent = answered;

    $$('[data-bool]', stage).forEach((btn) => {
      btn.disabled = true;
      const val = btn.dataset.bool === 'true';
      if (val === q.correct) btn.classList.add('is-correct');
      else if (val === value) btn.classList.add('is-wrong');
    });

    const src = SOURCES[q.sourceId];
    const note = document.createElement('div');
    note.className = 'explain';
    note.innerHTML = html`
      <div class="explain__verdict ${raw(correct ? 'ok' : 'err')}">${correct ? 'Corretto' : 'Sbagliato'}</div>
      <p class="explain__text">${q.explanation}</p>
      ${src ? raw(html`<p class="explain__text"><a href="${src.url}" target="_blank" rel="noopener noreferrer">Fonte: ${src.org} — ${src.title}</a></p>`) : ''}
      <button class="btn btn--primary btn--sm" type="button" data-next>Avanti</button>`;
    stage.append(note);
    const next = note.querySelector('[data-next]');
    next.addEventListener('click', () => { index += 1; paint(); });
    next.focus();
  }

  function finish() {
    running = false;
    timer.stop();
    stage.innerHTML = resultScreen({
      gameId: meta.id, score, max: pool.length * POINTS,
      title: ok >= 8 ? 'Istinto affidabile' : ok >= 5 ? 'Buon equilibrio' : 'Attenzione ai luoghi comuni',
      text: `${ok} risposte corrette su ${answered} in ${SECONDS} secondi. Molte di queste affermazioni sono equivoci diffusi: la spiegazione conta più del punteggio.`,
      details: log
    });
    onRestart(stage, () => onFinish?.('restart'));
  }

  stage.querySelector('[data-start]').addEventListener('click', () => {
    running = true;
    timer.start();
    paint();
  });

  const keyHandler = (e) => {
    if (!running) return;
    const k = e.key.toUpperCase();
    if (k === 'V') stage.querySelector('[data-bool="true"]')?.click();
    if (k === 'F') stage.querySelector('[data-bool="false"]')?.click();
    if (e.key === 'Enter') stage.querySelector('[data-next]')?.click();
  };
  document.addEventListener('keydown', keyHandler);

  return () => { timer.stop(); document.removeEventListener('keydown', keyHandler); };
}
