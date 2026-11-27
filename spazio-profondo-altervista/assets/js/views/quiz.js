/**
 * VISTA — Quiz Spazio Profondo
 * Schermata di scelta, partita con le 8 tipologie, spiegazione dopo ogni
 * risposta, risultato finale con riepilogo e classifica locale.
 */

import { html, raw, esc, $, $$, announce } from '../core/dom.js';
import { QUESTIONS, CATEGORIES_QUIZ, DIFFICULTIES, archiveStats } from '../../data/quiz-questions.js';
import { SOURCES } from '../../data/sources.js';
import { createGame, availableQuestions, correctAnswerText, verdict, DEFAULT_COUNT } from '../quiz/engine.js';
import { TYPES, typeLabel, cleanupType } from '../quiz/types.js';
import { getScores, available as storageAvailable } from '../core/store.js';
import { crumbs, sectionHead } from './partials.js';
import { initReveal } from '../fx/reveal.js';

export const meta = () => ({
  title: 'Quiz Spazio Profondo',
  description: `Quiz scientifico con ${QUESTIONS.length} domande in archivio e 8 tipologie di gioco: risposta multipla, vero o falso, risposta aperta, indovina il pianeta, ordina le orbite, abbina le missioni e riconosci il fenomeno.`
});

const COUNTS = [5, 10, 15, 20];
let game = null;
let bodyRoot = null;

export function render() {
  return html`
  <section class="section" aria-labelledby="titolo">
    <div class="container stack-6">
      ${raw(crumbs([{ label: 'Home', href: '#/' }, { label: 'Quiz' }]))}
      <div data-quiz>${raw(setupScreen())}</div>
    </div>
  </section>`;
}

/* ---------------- schermata di configurazione ---------------- */
function setupScreen() {
  const stats = archiveStats();
  const scores = storageAvailable ? getScores().slice(0, 5) : [];

  return html`
    ${raw(sectionHead({
      kicker: 'Quiz Spazio Profondo',
      title: 'Un piccolo gioco scientifico, non un\'interrogazione',
      text: `${stats.total} domande in archivio, estratte a sorte a ogni partita. Ogni risposta porta con sé la spiegazione e la fonte verificabile: anche sbagliando, si impara qualcosa.`,
      level: 1
    }))}

    <form class="card card--pad-lg reveal" data-setup>
      <div class="stack-6">
        <div class="stack">
          <span class="eyebrow">Categoria</span>
          <div class="chips" role="group" aria-label="Categoria">
            <button class="chip" type="button" data-opt-cat="tutte" aria-pressed="true">Tutte le categorie</button>
            ${CATEGORIES_QUIZ.map((c) => {
              const n = availableQuestions({ category: c.id }).length;
              return raw(html`<button class="chip" type="button" data-opt-cat="${c.id}" aria-pressed="false">
                ${c.label} <span class="mono" style="opacity:.6">${n}</span></button>`);
            })}
          </div>
        </div>

        <div class="stack">
          <span class="eyebrow">Difficoltà</span>
          <div class="chips" role="group" aria-label="Difficoltà">
            <button class="chip" type="button" data-opt-diff="tutte" aria-pressed="true">Tutte</button>
            ${DIFFICULTIES.map((d) => {
              const n = availableQuestions({ difficulty: d.id }).length;
              return raw(html`<button class="chip" type="button" data-opt-diff="${d.id}" aria-pressed="false">
                ${d.label} <span class="mono" style="opacity:.6">${n}</span></button>`);
            })}
          </div>
        </div>

        <div class="stack">
          <span class="eyebrow">Numero di domande</span>
          <div class="chips" role="group" aria-label="Numero di domande">
            ${COUNTS.map((n) => raw(html`
              <button class="chip" type="button" data-opt-count="${n}" aria-pressed="${n === DEFAULT_COUNT}">${n}</button>`))}
          </div>
        </div>

        <div class="row row--between">
          <span class="card__text" data-avail>Domande disponibili con questi filtri: ${stats.total}</span>
          <button class="btn btn--primary" type="submit">Inizia la partita</button>
        </div>
      </div>
    </form>

    <div class="grid grid--2" style="gap:var(--s-5)">
      <div class="card card--flat reveal">
        <span class="eyebrow">Le otto tipologie</span>
        <div class="stack" style="margin-top:var(--s-3)">
          ${Object.entries(stats.byType).map(([t, n]) => raw(html`
            <div class="row row--between">
              <span class="card__text" style="color:var(--c-text)">${typeLabel[t] || t}</span>
              <span class="badge">${n}</span>
            </div>`))}
        </div>
      </div>

      <div class="card card--flat reveal">
        <span class="eyebrow">Record personali</span>
        ${scores.length ? raw(html`
          <div class="leaderboard" style="margin-top:var(--s-3)">
            ${scores.map((s, i) => raw(html`
              <div class="lb-row ${raw(i === 0 ? 'lb-row--best' : '')}">
                <span class="lb-row__rank">${i + 1}</span>
                <span>${s.category === 'tutte' ? 'Tutte le categorie' : (CATEGORIES_QUIZ.find((c) => c.id === s.category)?.label || s.category)}
                  ${s.difficulty !== 'tutte' ? raw(`<span class="badge" style="margin-left:6px">${s.difficulty}</span>`) : ''}</span>
                <span class="mono">${s.score}/${s.total}</span>
                <span class="lb-row__date">${new Date(s.date).toLocaleDateString('it-IT')}</span>
              </div>`))}
          </div>`) : raw(`<p class="card__text">${storageAvailable
            ? 'Nessuna partita registrata finora. I risultati restano salvati solo su questo dispositivo.'
            : 'Il salvataggio locale non è disponibile in questo browser: la partita funziona comunque, ma i record non verranno conservati.'}</p>`)}
      </div>
    </div>`;
}

/* ---------------- partita ---------------- */
function gameShell() {
  return html`
  <div class="quiz-shell reveal">
    <div class="quiz-head">
      <div class="row" style="gap:var(--s-3)">
        <span class="eyebrow eyebrow--plain" data-pos>1 / 10</span>
        <span class="badge" data-type>—</span>
      </div>
      <div class="row" style="gap:var(--s-3)">
        <span class="mono" style="font-size:var(--t-micro);color:var(--c-text-faint)" data-score>0 corrette</span>
        <button class="btn btn--quiet btn--sm" type="button" data-abort>Esci</button>
      </div>
    </div>
    <div class="quiz-progress"><div class="quiz-progress__bar" data-bar></div></div>
    <div class="quiz-body" data-body></div>
  </div>`;
}

function questionHTML(q) {
  const diff = DIFFICULTIES.find((d) => d.id === q.difficulty);
  const cat = CATEGORIES_QUIZ.find((c) => c.id === q.category);
  return html`
    <div class="quiz-meta">
      <span class="badge badge--${raw(diff?.color || 'blue')}">${diff?.label || q.difficulty}</span>
      <span class="badge">${cat?.label || q.category}</span>
    </div>
    <p class="quiz-question">${q.text}</p>
    <div data-answer-area>${raw(TYPES[q.type].render(q))}</div>
    <div data-explain></div>`;
}

function explainHTML(q, correct, given) {
  const src = SOURCES[q.sourceId];
  return html`
  <div class="explain">
    <div class="explain__verdict ${raw(correct ? 'ok' : 'err')}">
      <span aria-hidden="true">${correct ? '✓' : '✗'}</span>
      ${correct ? 'Risposta corretta' : `Risposta corretta: ${correctAnswerText(q)}`}
    </div>
    <p class="explain__text">${q.explanation}</p>
    ${src ? raw(html`<p class="explain__text">
      <a href="${src.url}" target="_blank" rel="noopener noreferrer">Fonte: ${src.org} — ${src.title}</a>
    </p>`) : ''}
    <div class="row">
      <button class="btn btn--primary" type="button" data-next>Avanti</button>
    </div>
  </div>`;
}

function resultHTML(result, breakdown) {
  const v = verdict(result.percent);
  const dash = Math.PI * 2 * 78;
  return html`
  <div class="result">
    <svg width="0" height="0" aria-hidden="true"><defs>
      <linearGradient id="gradRing" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#4da3ff"/><stop offset="1" stop-color="#9a7bff"/>
      </linearGradient></defs></svg>

    <div class="result__ring">
      <svg viewBox="0 0 168 168" aria-hidden="true">
        <circle class="track" cx="84" cy="84" r="78"></circle>
        <circle class="bar" cx="84" cy="84" r="78"
                stroke-dasharray="${dash}" stroke-dashoffset="${dash}" data-ring></circle>
      </svg>
      <div class="result__score" style="font-size:2.6rem">${result.percent}%</div>
    </div>

    ${result.isRecord ? raw('<span class="badge badge--amber badge--dot">Nuovo record personale</span>') : ''}
    <div>
      <h2>${v.title}</h2>
      <p class="lead">${result.score} risposte corrette su ${result.total}, in ${Math.round(result.timeMs / 1000)} secondi.</p>
      <p class="card__text" style="max-width:50ch;margin-inline:auto">${v.text}</p>
    </div>

    ${Object.keys(breakdown).length > 1 ? raw(html`
      <div class="stack" style="width:min(100%,520px)">
        <span class="eyebrow eyebrow--plain">Per categoria</span>
        ${Object.entries(breakdown).map(([cat, b]) => raw(html`
          <div class="row row--between">
            <span class="card__text" style="color:var(--c-text)">${CATEGORIES_QUIZ.find((c) => c.id === cat)?.label || cat}</span>
            <span class="badge badge--${raw(b.ok === b.total ? 'ok' : b.ok ? 'blue' : 'err')}">${b.ok} / ${b.total}</span>
          </div>`))}
      </div>`) : ''}

    <div class="row" style="justify-content:center">
      <button class="btn btn--primary" type="button" data-again>Nuova partita</button>
      <button class="btn btn--ghost" type="button" data-setup-back>Cambia impostazioni</button>
      <a class="btn btn--ghost" href="#/laboratorio">Laboratorio Spaziale</a>
    </div>
    ${result.previousBest ? raw(`<p class="card__text">Record precedente in questa configurazione: ${result.previousBest.percent}%</p>`) : ''}
  </div>`;
}

/* ---------------- controller ---------------- */
export function mount(root) {
  initReveal(root);
  const container = $('[data-quiz]', root);
  let opts = { category: 'tutte', difficulty: 'tutte', count: DEFAULT_COUNT };

  function bindSetup() {
    const form = $('[data-setup]', container);
    if (!form) return;
    const avail = $('[data-avail]', container);

    const refresh = () => {
      const n = availableQuestions(opts).length;
      avail.textContent = `Domande disponibili con questi filtri: ${n}`;
      const btn = form.querySelector('[type="submit"]');
      btn.disabled = n === 0;
      if (n > 0 && n < opts.count) {
        avail.textContent += ` · la partita ne userà ${n}`;
      }
    };

    const bindGroup = (sel, key, cast = (v) => v) => {
      $$(sel, container).forEach((btn) => btn.addEventListener('click', () => {
        $$(sel, container).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        opts = { ...opts, [key]: cast(btn.dataset[Object.keys(btn.dataset)[0]]) };
        refresh();
      }));
    };
    bindGroup('[data-opt-cat]', 'category');
    bindGroup('[data-opt-diff]', 'difficulty');
    bindGroup('[data-opt-count]', 'count', Number);

    form.addEventListener('submit', (e) => { e.preventDefault(); startGame(); });
    refresh();
  }

  function startGame() {
    game = createGame(opts);
    if (!game.total) { announce('Nessuna domanda disponibile con questi filtri'); return; }
    container.innerHTML = gameShell();
    bodyRoot = $('[data-body]', container);
    $('[data-abort]', container).addEventListener('click', () => {
      cleanupType(bodyRoot);
      container.innerHTML = setupScreen();
      bindSetup();
      initReveal(container);
    });
    paintQuestion();
  }

  function paintQuestion() {
    const q = game.current;
    if (!q) return finishGame();
    cleanupType(bodyRoot);
    bodyRoot.innerHTML = questionHTML(q);
    $('[data-pos]', container).textContent = `${game.position} / ${game.total}`;
    $('[data-type]', container).textContent = typeLabel[q.type] || q.type;
    $('[data-score]', container).textContent = `${game.score} corrette`;
    $('[data-bar]', container).style.width = `${((game.position - 1) / game.total) * 100}%`;

    const area = $('[data-answer-area]', bodyRoot);
    TYPES[q.type].mount(area, q, (value) => handleAnswer(q, area, value));
  }

  function handleAnswer(q, area, value) {
    const entry = game.answer(value);
    TYPES[q.type].markResult?.(area, q, value, entry.correct);
    $('[data-score]', container).textContent = `${game.score} corrette`;
    $('[data-bar]', container).style.width = `${(game.position / game.total) * 100}%`;

    const slot = $('[data-explain]', bodyRoot);
    slot.innerHTML = explainHTML(q, entry.correct, value);
    announce(entry.correct ? 'Risposta corretta' : `Risposta errata. ${correctAnswerText(q)}`);
    const next = $('[data-next]', slot);
    next.addEventListener('click', () => {
      game.next();
      if (game.isFinished) finishGame();
      else paintQuestion();
    });
    next.focus();
    slot.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function finishGame() {
    cleanupType(bodyRoot);
    const breakdown = game.breakdown();
    const result = game.finish();
    container.innerHTML = `<div class="quiz-shell"><div class="quiz-body">${resultHTML(result, breakdown)}</div></div>`;
    // anima l'anello del punteggio
    const ring = $('[data-ring]', container);
    if (ring) {
      const dash = Math.PI * 2 * 78;
      requestAnimationFrame(() => { ring.style.strokeDashoffset = String(dash * (1 - result.percent / 100)); });
    }
    $('[data-again]', container).addEventListener('click', startGame);
    $('[data-setup-back]', container).addEventListener('click', () => {
      container.innerHTML = setupScreen();
      bindSetup();
      initReveal(container);
    });
    announce(`Partita conclusa: ${result.score} risposte corrette su ${result.total}`);
  }

  bindSetup();
}

export function unmount() {
  cleanupType(bodyRoot);
  bodyRoot = null;
  game = null;
}
