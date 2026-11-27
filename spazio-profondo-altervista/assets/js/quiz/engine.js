/**
 * SPAZIO PROFONDO — motore del quiz
 *
 * Requisiti implementati:
 * - estrazione casuale dall'archivio a ogni partita;
 * - nessun duplicato nella stessa partita, ripetizioni ammesse fra partite;
 * - preferenza per le domande non ancora viste (memoria locale);
 * - filtri per categoria, difficoltà e tipologia;
 * - valutazione tollerante per le risposte aperte;
 * - punteggio, tempi, record personali e classifica locale.
 *
 * Aggiungere domande all'archivio NON richiede modifiche a questo file.
 */

import { QUESTIONS } from '../../data/quiz-questions.js';
import { shuffle } from '../core/dom.js';
import { getSeen, markSeen, addScore, personalBest } from '../core/store.js';

export const DEFAULT_COUNT = 10;

/** Domande disponibili dopo i filtri. */
export function availableQuestions({ category = 'tutte', difficulty = 'tutte', types } = {}) {
  return QUESTIONS.filter((q) =>
    (category === 'tutte' || q.category === category) &&
    (difficulty === 'tutte' || q.difficulty === difficulty) &&
    (!types || types.includes(q.type)));
}

/**
 * Estrazione: mescola, poi ordina dando priorità alle domande mai viste
 * o viste meno di recente. Nessun duplicato: si pesca da un insieme unico.
 */
export function drawQuestions(opts = {}) {
  const count = opts.count || DEFAULT_COUNT;
  const pool = availableQuestions(opts);
  if (!pool.length) return [];
  const seen = getSeen();
  const mixed = shuffle(pool).sort((a, b) => (seen[a.id] || 0) - (seen[b.id] || 0));
  // Prende dal gruppo "meno visto" ma mescola di nuovo, così l'ordine
  // non è prevedibile anche quando l'archivio è piccolo.
  const picked = shuffle(mixed.slice(0, Math.max(count, Math.ceil(count * 1.6)))).slice(0, count);
  markSeen(picked.map((q) => q.id));
  return picked;
}

/* ============================================================
   Valutazione delle risposte
   ============================================================ */

/** Normalizza per il confronto: minuscole, senza accenti né punteggiatura. */
export function normalize(str) {
  return String(str ?? '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^\p{L}\p{N}\s*]/gu, ' ')
    .replace(/\b(il|lo|la|i|gli|le|un|uno|una|di|del|della|dei|delle|the)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Distanza di Levenshtein, per tollerare errori di battitura. */
export function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++) {
      row[j] = Math.min(
        prev[j] + 1,
        row[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    prev = row;
  }
  return prev[b.length];
}

/**
 * Risposta aperta: accetta varianti, sinonimi dichiarati, piccoli errori
 * di battitura e formulazioni più lunghe che contengono la risposta.
 * Una risposta corretta non viene mai respinta solo perché scritta
 * in modo diverso da quello previsto.
 */
export function checkOpenAnswer(input, accept = []) {
  const given = normalize(input);
  if (!given) return false;
  for (const variant of accept) {
    const target = normalize(variant);
    if (!target) continue;
    if (given === target) return true;
    // la risposta contiene il termine atteso ("è il pianeta giove")
    if (given.includes(target) && target.length >= 3) return true;
    // tolleranza errori: 1 carattere fino a 8, 2 oltre
    const tolerance = target.length > 8 ? 2 : target.length > 4 ? 1 : 0;
    if (tolerance && levenshtein(given, target) <= tolerance) return true;
    // confronto parola per parola, utile per risposte composte
    const gWords = given.split(' '), tWords = target.split(' ');
    if (tWords.length > 1 && tWords.every((tw) =>
      gWords.some((gw) => gw === tw || (tw.length > 4 && levenshtein(gw, tw) <= 1)))) return true;
  }
  return false;
}

/** Valuta una risposta qualunque sia il tipo di domanda. */
export function evaluate(question, answer) {
  switch (question.type) {
    case 'multipla':
    case 'indovina-oggetto':
    case 'riconosci-fenomeno':
      return answer === question.correct;
    case 'vero-falso':
      return answer === question.correct;
    case 'aperta':
      return checkOpenAnswer(answer, question.accept);
    case 'indovina-pianeta':
      return answer === question.correct;
    case 'ordina':
      return Array.isArray(answer) &&
        answer.length === question.solution.length &&
        answer.every((id, i) => id === question.solution[i]);
    case 'abbina':
      return answer && question.pairs.every((p) => answer[p.left] === p.right);
    default:
      return false;
  }
}

/** Risposta corretta in forma leggibile, per la spiegazione. */
export function correctAnswerText(question) {
  switch (question.type) {
    case 'multipla':
    case 'indovina-oggetto':
    case 'riconosci-fenomeno':
      return question.options[question.correct];
    case 'vero-falso':
      return question.correct ? 'Vero' : 'Falso';
    case 'aperta':
      return question.accept[0];
    case 'indovina-pianeta':
      return question.correct.charAt(0).toUpperCase() + question.correct.slice(1);
    case 'ordina':
      return question.solution
        .map((id) => question.items.find((i) => i.id === id)?.label || id)
        .join(' → ');
    case 'abbina':
      return question.pairs.map((p) => `${p.left} → ${p.right}`).join(' · ');
    default:
      return '';
  }
}

/* ============================================================
   Partita
   ============================================================ */
export function createGame(opts = {}) {
  const questions = drawQuestions(opts);
  const game = {
    opts,
    questions,
    index: 0,
    answers: [],         // { id, correct, answer, timeMs }
    startedAt: Date.now(),
    questionStartedAt: Date.now(),
    finished: false
  };

  return {
    get state() { return game; },
    get total() { return game.questions.length; },
    get current() { return game.questions[game.index] || null; },
    get position() { return game.index + 1; },
    get score() { return game.answers.filter((a) => a.correct).length; },
    get percent() {
      return game.questions.length
        ? Math.round(game.answers.filter((a) => a.correct).length / game.questions.length * 100)
        : 0;
    },
    get elapsedMs() { return Date.now() - game.startedAt; },
    get isLast() { return game.index >= game.questions.length - 1; },
    get isFinished() { return game.finished; },

    answer(value) {
      const q = game.questions[game.index];
      if (!q) return null;
      const correct = evaluate(q, value);
      const entry = {
        id: q.id, type: q.type, category: q.category, difficulty: q.difficulty,
        correct, answer: value, timeMs: Date.now() - game.questionStartedAt
      };
      game.answers.push(entry);
      return entry;
    },

    next() {
      game.index += 1;
      game.questionStartedAt = Date.now();
      if (game.index >= game.questions.length) {
        game.finished = true;
        return null;
      }
      return game.questions[game.index];
    },

    finish() {
      game.finished = true;
      const result = {
        score: this.score,
        total: this.total,
        percent: this.percent,
        timeMs: this.elapsedMs,
        category: opts.category || 'tutte',
        difficulty: opts.difficulty || 'tutte'
      };
      const previousBest = personalBest({ category: result.category, difficulty: result.difficulty });
      const scores = addScore(result);
      return {
        ...result,
        isRecord: !previousBest || result.percent > previousBest.percent,
        previousBest,
        scores
      };
    },

    /** Riepilogo per categoria, mostrato alla fine della partita. */
    breakdown() {
      const by = {};
      game.answers.forEach((a) => {
        by[a.category] = by[a.category] || { ok: 0, total: 0 };
        by[a.category].total += 1;
        if (a.correct) by[a.category].ok += 1;
      });
      return by;
    }
  };
}

/** Giudizio finale: tono incoraggiante, mai punitivo. */
export function verdict(percent) {
  if (percent === 100) return { title: 'Perfetto', text: 'Nessun errore: conosci davvero bene questi argomenti.' };
  if (percent >= 80)  return { title: 'Ottimo risultato', text: 'Padronanza solida della materia, con qualche dettaglio da rifinire.' };
  if (percent >= 60)  return { title: 'Buon lavoro', text: 'Basi chiare: le spiegazioni delle domande sbagliate colmano il resto.' };
  if (percent >= 40)  return { title: 'Ci sei quasi', text: 'Hai afferrato i concetti principali. Rileggi le spiegazioni e riprova.' };
  return { title: 'Buon punto di partenza', text: 'Ogni risposta sbagliata è accompagnata dalla spiegazione: è da lì che si impara.' };
}
