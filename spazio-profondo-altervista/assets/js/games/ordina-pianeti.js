/**
 * GIOCO 1 — Sistema Solare
 * Trascina gli otto pianeti nell'ordine corretto partendo dal Sole.
 * Punteggio: posizioni corrette (100 punti ciascuna) più bonus tempo.
 */

import { html, raw, $$, shuffle, announce } from '../core/dom.js';
import { sphereHTML } from '../fx/planet.js';
import { PLANETS } from '../../data/planets.js';
import { gameHeader, rulesBlock, resultScreen, onRestart, createTimer } from './shared.js';

export const meta = {
  id: 'ordina-pianeti',
  name: 'Sistema Solare',
  kicker: 'Gioco 1',
  summary: 'Disponi gli otto pianeti nell\'ordine corretto a partire dal Sole. Più sei rapido, più il bonus cresce.',
  icon: 'orbit'
};

const SOLUTION = PLANETS.map((p) => p.id);
const MAX = SOLUTION.length * 100 + 200;

export function render() {
  return html`<section class="game-shell">
    ${raw(gameHeader(meta))}
    <div class="game-body" data-game>
      ${raw(rulesBlock([
        'Trascina i pianeti nella fascia superiore, o toccali per inserirli.',
        'Da tastiera: Invio per selezionare, frecce per spostare.',
        'Ogni pianeta nella posizione giusta vale 100 punti.',
        'Un bonus fino a 200 punti premia la rapidità.'
      ]))}
      <div class="game-hud">
        <span>Tempo<br><b data-time>0:00</b></span>
        <span>Posizionati<br><b data-placed>0 / 8</b></span>
      </div>
      <div class="dnd">
        <div class="dnd__slots" data-slots role="list" aria-label="Sequenza dal Sole verso l'esterno"></div>
        <div class="row row--between">
          <span class="eyebrow eyebrow--plain">Dal Sole verso l'esterno →</span>
          <button class="btn btn--quiet btn--sm" type="button" data-reset>Azzera</button>
        </div>
        <div class="dnd__pool" data-pool role="list" aria-label="Pianeti da collocare">
          ${shuffle(PLANETS).map((p) => raw(html`
            <button class="token" type="button" role="listitem" draggable="true" data-id="${p.id}" aria-pressed="false">
              ${raw(sphereHTML(p.visual, { size: 20 }))}<span>${p.name}</span>
            </button>`))}
        </div>
        <button class="btn btn--primary" type="button" data-check disabled>Verifica la sequenza</button>
      </div>
    </div>
  </section>`;
}

export function mount(root, { onFinish } = {}) {
  const body = root.querySelector('[data-game]');
  const slots = body.querySelector('[data-slots]');
  const pool = body.querySelector('[data-pool]');
  const check = body.querySelector('[data-check]');
  const placedLabel = body.querySelector('[data-placed]');
  let elapsed = 0, selected = null;

  const timer = createTimer(0, () => {}, () => {});
  const tick = setInterval(() => {
    elapsed += 1;
    body.querySelector('[data-time]').textContent =
      `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')}`;
  }, 1000);

  const refresh = () => {
    const placed = $$('.token', slots);
    placed.forEach((t, i) => {
      let idx = t.querySelector('.token__idx');
      if (!idx) { idx = document.createElement('span'); idx.className = 'token__idx'; t.prepend(idx); }
      idx.textContent = `${i + 1}`;
    });
    placedLabel.textContent = `${placed.length} / 8`;
    check.disabled = placed.length !== 8;
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
    token.addEventListener('click', () => {
      place(token, token.parentElement === pool ? slots : pool);
    });
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
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (token.parentElement === pool) place(token, slots);
        else if (i < siblings.length - 1) place(token, slots, siblings[i + 2] || null);
      }
      if (e.key === 'ArrowLeft') {
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
        return e.clientX < r.left + r.width / 2 && e.clientY < r.bottom;
      });
      place(token, zone, after || null);
    });
  });

  body.querySelector('[data-reset]').addEventListener('click', () => {
    $$('.token', slots).forEach((t) => place(t, pool));
  });

  check.addEventListener('click', () => {
    clearInterval(tick);
    timer.stop();
    const given = $$('.token', slots).map((t) => t.dataset.id);
    const correct = given.filter((id, i) => id === SOLUTION[i]).length;
    const bonus = Math.max(0, 200 - elapsed * 4);
    const score = correct * 100 + bonus;

    $$('.token', slots).forEach((t, i) => {
      t.draggable = false;
      t.style.cssText += given[i] === SOLUTION[i]
        ? ';border-color:var(--c-ok);background:rgba(81,216,138,.14)'
        : ';border-color:var(--c-err);background:rgba(255,107,127,.12)';
    });

    const details = [
      `Posizioni corrette: <strong>${correct} su 8</strong> (${correct * 100} punti)`,
      `Bonus tempo: <strong>${bonus} punti</strong> (${elapsed} secondi impiegati)`,
      `Ordine corretto: ${SOLUTION.map((id) => PLANETS.find((p) => p.id === id).name).join(' → ')}`
    ];
    const panel = document.createElement('div');
    panel.innerHTML = resultScreen({
      gameId: meta.id, score, max: MAX,
      title: correct === 8 ? 'Sequenza perfetta' : `${correct} pianeti al posto giusto`,
      text: correct === 8
        ? 'Hai ricostruito l\'intero Sistema Solare nell\'ordine esatto.'
        : 'Un trucco mnemonico: i quattro rocciosi stanno dentro la fascia degli asteroidi, i quattro giganti fuori.',
      details
    });
    body.append(panel);
    onRestart(panel, () => onFinish?.('restart'));
    panel.querySelector('.result').scrollIntoView({ block: 'center', behavior: 'smooth' });
  });

  refresh();
  return () => { clearInterval(tick); timer.stop(); };
}
