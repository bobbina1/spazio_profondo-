/**
 * SPAZIO PROFONDO — persistenza locale
 * Tutto incapsulato in try/catch: localStorage può essere assente,
 * pieno o disabilitato, e il sito deve funzionare comunque.
 */

const PREFIX = 'spazio-profondo:';

export function read(key, fallback = null) {
  try {
    const v = localStorage.getItem(PREFIX + key);
    return v == null ? fallback : JSON.parse(v);
  } catch { return fallback; }
}

export function write(key, value) {
  try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); return true; }
  catch { return false; }
}

export function remove(key) {
  try { localStorage.removeItem(PREFIX + key); return true; } catch { return false; }
}

export const available = (() => {
  try {
    const k = PREFIX + 'test';
    localStorage.setItem(k, '1'); localStorage.removeItem(k); return true;
  } catch { return false; }
})();

/* ---------------- Classifica locale del quiz ---------------- */
const SCORES_KEY = 'quiz-scores';
const MAX_SCORES = 20;

export function addScore(entry) {
  const list = read(SCORES_KEY, []);
  list.push({ ...entry, date: new Date().toISOString() });
  list.sort((a, b) => (b.percent - a.percent) || (a.timeMs - b.timeMs));
  write(SCORES_KEY, list.slice(0, MAX_SCORES));
  return getScores();
}

export const getScores = () => read(SCORES_KEY, []);

export function personalBest(filter = {}) {
  const scores = getScores().filter((s) =>
    (!filter.category || s.category === filter.category) &&
    (!filter.difficulty || s.difficulty === filter.difficulty));
  return scores.length ? scores[0] : null;
}

/* ---------------- Record dei giochi ---------------- */
const GAMES_KEY = 'game-records';

export function saveGameRecord(gameId, score, extra = {}) {
  const all = read(GAMES_KEY, {});
  const prev = all[gameId];
  const isBest = !prev || score > prev.score;
  if (isBest) all[gameId] = { score, date: new Date().toISOString(), ...extra };
  write(GAMES_KEY, all);
  return { isBest, record: all[gameId] };
}

export const getGameRecords = () => read(GAMES_KEY, {});
export const getGameRecord = (gameId) => read(GAMES_KEY, {})[gameId] || null;

/** Domande già viste: usate per preferire contenuti nuovi fra le partite. */
const SEEN_KEY = 'quiz-seen';
export function markSeen(ids) {
  const seen = read(SEEN_KEY, {});
  const now = Date.now();
  ids.forEach((id) => { seen[id] = now; });
  const entries = Object.entries(seen).sort((a, b) => b[1] - a[1]).slice(0, 400);
  write(SEEN_KEY, Object.fromEntries(entries));
}
export const getSeen = () => read(SEEN_KEY, {});
