/**
 * GIOCO 4 — Viaggio nel tempo
 * Ordina cronologicamente gli eventi più importanti dell'esplorazione spaziale.
 * Gli eventi sono estratti dalla timeline storica del sito: aggiungendo una
 * tappa in data/missions.js entra automaticamente anche nel gioco.
 */

import { html, raw, $$, shuffle, announce } from '../core/dom.js';
import { SPACE_HISTORY } from '../../data/missions.js';
import { gameHeader, rulesBlock, resultScreen, onRestart } from './shared.js';

export const meta = {
  id: 'viaggio-tempo',
  name: 'Viaggio nel tempo',
  kicker: 'Gioco 4',
  summary: 'Sei eventi della storia dell\'esplorazione spaziale, in ordine sparso. Ricostruisci la cronologia esatta.',
  icon: 'timeline'
};

const COUNT = 6;
const MAX = 600;
let picked = [];

export function render() {
  picked = shuffle(SPACE_HISTORY).slice(0, COUNT).sort(() => Math.random() - 0.5);
  return html`<section class="game-shell">
    ${raw(gameHeader(meta))}
    <div class="game-body" data-game>
      ${raw(rulesBlock([
        'Trascina gli eventi nella fascia superiore, dal più antico al più recente.',
        'Tocca un evento per inserirlo o rimuoverlo; da tastiera usa Invio e le frecce.',
        'Ogni evento nella posizione corretta vale 100 punti.',
        'Alla fine vedrai le date reali di tutti gli eventi.'
      ]))}
      <div class="dnd">
        <div class="dnd__slots" data-slots role="list" aria-label="Cronologia da comporre"
             style="min-height:120px;flex-direction:column;align-items:stretch"></div>
        <div class="row row--between">
          <span class="eyebrow eyebrow--plain">Dal più antico ↓ al più recente</span>
          <button class="btn btn--quiet btn--sm" type="button" data-reset>Azzera</button>
        </div>
        <div class="dnd__pool" data-pool role="list" aria-label="Eventi da collocare" style="flex-direction:column;align-items:stretch">
          ${picked.map((e) => raw(html`
            <button class="token" type="button" role="listitem" draggable="true" data-id="${e.id}"
                    aria-pressed="false" style="justify-content:flex-start;text-align:left;border-radius:var(--r-md)">
              <span>${e.title}</span>
            </button>`))}
        </div>
        <button class="btn btn--primary" type="button" data-check disabled>Verifica la cronologia</button>
      </div>
    </div>
  </section>`;
}

export function mount(root, { onFinish } = {}) {
  const body = root.querySelector('[data-game]');
  const slots = body.querySelector('[data-slots]');
  const pool = body.querySelector('[data-pool]');
  const check = body.querySelector('[data-check]');
  let selected = null;

  const solution = [...picked].sort((a, b) => {
    const da = SPACE_HISTORY.find((x) => x.id === a.id).year;
    const db = SPACE_HISTORY.find((x) => x.id === b.id).year;
    if (da !== db) return da - db;
    return SPACE_HISTORY.indexOf(a) - SPACE_HISTORY.indexOf(b);
  }).map((e) => e.id);

  const refresh = () => {
    $$('.token', slots).forEach((t, i) => {
      let idx = t.querySelector('.token__idx');
      if (!idx) { idx = document.createElement('span'); idx.className = 'token__idx'; t.prepend(idx); }
      idx.textContent = `${i + 1}`;
    });
    check.disabled = $$('.token', slots).length !== COUNT;
  };

  const place = (token, container, before = null) => {
    container.insertBefore(token, before);
    if (container === pool) token.querySelector('.token__idx')?.remove();
    refresh();
  };

  $$('.token', body).forEach((token) => {
    token.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', token.dataset.id);
      token.classList.add('is-dragging');
    });
    token.addEventListener('dragend', () => token.classList.remove('is-dragging'));
    token.addEventListener('click', () => place(token, token.parentElement === pool ? slots : pool));
    token.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selected = selected === token ? null : token;
        $$('.token', body).forEach((t) => t.setAttribute('aria-pressed', String(t === selected)));
        announce(selected ? `${token.textContent.trim()} selezionato` : 'Selezione annullata');
        return;
      }
      if (selected !== token) return;
      const siblings = $$('.token', token.parentElement);
      const i = siblings.indexOf(token);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (token.parentElement === pool) place(token, slots);
        else if (i < siblings.length - 1) place(token, slots, siblings[i + 2] || null);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (token.parentElement === slots && i > 0) place(token, slots, siblings[i - 1]);
        else if (token.parentElement === slots) place(token, pool);
      }
      token.focus();
    });
  });

  [slots, pool].forEach((zone) => {
    zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('is-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('is-over'));
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('is-over');
      const token = body.querySelector(`.token[data-id="${e.dataTransfer.getData('text/plain')}"]`);
      if (!token) return;
      const after = $$('.token', zone).find((t) => {
        const r = t.getBoundingClientRect();
        return e.clientY < r.top + r.height / 2;
      });
      place(token, zone, after || null);
    });
  });

  body.querySelector('[data-reset]').addEventListener('click', () => {
    $$('.token', slots).forEach((t) => place(t, pool));
  });

  check.addEventListener('click', () => {
    const given = $$('.token', slots).map((t) => t.dataset.id);
    const correct = given.filter((id, i) => id === solution[i]).length;
    const score = correct * 100;

    $$('.token', slots).forEach((t, i) => {
      t.draggable = false; t.disabled = true;
      t.style.cssText += given[i] === solution[i]
        ? ';border-color:var(--c-ok);background:rgba(81,216,138,.14)'
        : ';border-color:var(--c-err);background:rgba(255,107,127,.12)';
    });

    const panel = document.createElement('div');
    panel.innerHTML = resultScreen({
      gameId: meta.id, score, max: MAX,
      title: correct === COUNT ? 'Cronologia perfetta' : `${correct} eventi al posto giusto`,
      text: 'La cronologia completa è nella timeline della sezione Missioni spaziali.',
      details: solution.map((id, i) => {
        const e = SPACE_HISTORY.find((x) => x.id === id);
        return `${i + 1}. <strong>${e.date}</strong> — ${e.title}: ${e.text}`;
      })
    });
    body.append(panel);
    onRestart(panel, () => onFinish?.('restart'));
    panel.querySelector('.result').scrollIntoView({ block: 'center', behavior: 'smooth' });
  });

  refresh();
  return () => {};
}
