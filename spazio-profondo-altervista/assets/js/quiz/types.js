/**
 * SPAZIO PROFONDO — rendering e interazione delle 8 tipologie di quiz
 *
 * Ogni tipologia espone:
 *   render(question) -> stringa HTML
 *   mount(root, question, submit) -> installa l'interazione; submit(valore)
 *   readValue(root) -> valore corrente (per i tipi con conferma esplicita)
 *
 * Accessibilità: il trascinamento ha sempre un'alternativa da tastiera
 * (selezione con Invio/Spazio e spostamento), e ogni controllo è un
 * elemento focalizzabile con stato aria.
 */

import { html, esc, raw, $$, shuffle, announce } from '../core/dom.js';
import { sphereHTML } from '../fx/planet.js';
import { PLANETS, planetById } from '../../data/planets.js';
import { createSimulation } from '../fx/simulations.js';

const KEYS = ['A', 'B', 'C', 'D', 'E', 'F'];
let activeSim = null;

/* ---------------- scelta multipla / oggetto / fenomeno ---------------- */
function optionList(options, { twoCols = false } = {}) {
  return html`<div class="answers ${raw(twoCols ? 'answers--2col' : '')}" role="group" aria-label="Opzioni di risposta">
    ${options.map((opt, i) => raw(html`
      <button class="answer" type="button" data-choice="${i}">
        <span class="answer__key" aria-hidden="true">${KEYS[i]}</span>
        <span>${opt}</span>
      </button>`))}
  </div>`;
}

const multipla = {
  render: (q) => optionList(q.options, { twoCols: q.options.every((o) => o.length < 26) }),
  mount(root, q, submit) {
    $$('[data-choice]', root).forEach((btn) => {
      btn.addEventListener('click', () => submit(Number(btn.dataset.choice)));
    });
    // Scorciatoie da tastiera: A/B/C/D e 1/2/3/4
    root._keyHandler = (e) => {
      const k = e.key.toUpperCase();
      let idx = KEYS.indexOf(k);
      if (idx < 0 && /^[1-9]$/.test(k)) idx = Number(k) - 1;
      const btn = root.querySelector(`[data-choice="${idx}"]`);
      if (idx >= 0 && btn && !btn.disabled) { e.preventDefault(); btn.click(); }
    };
    document.addEventListener('keydown', root._keyHandler);
  },
  markResult(root, q, given) {
    $$('[data-choice]', root).forEach((btn) => {
      const i = Number(btn.dataset.choice);
      btn.disabled = true;
      if (i === q.correct) btn.classList.add('is-correct');
      else if (i === given) btn.classList.add('is-wrong');
      else btn.classList.add('is-muted');
    });
  }
};

/* ---------------- vero o falso ---------------- */
const veroFalso = {
  render: () => html`<div class="answers answers--2col" role="group" aria-label="Vero o falso">
    <button class="answer" type="button" data-bool="true">
      <span class="answer__key" aria-hidden="true">V</span><span>Vero</span></button>
    <button class="answer" type="button" data-bool="false">
      <span class="answer__key" aria-hidden="true">F</span><span>Falso</span></button>
  </div>`,
  mount(root, q, submit) {
    $$('[data-bool]', root).forEach((btn) =>
      btn.addEventListener('click', () => submit(btn.dataset.bool === 'true')));
    root._keyHandler = (e) => {
      const k = e.key.toUpperCase();
      if (k === 'V' || k === 'T') root.querySelector('[data-bool="true"]')?.click();
      if (k === 'F') root.querySelector('[data-bool="false"]')?.click();
    };
    document.addEventListener('keydown', root._keyHandler);
  },
  markResult(root, q, given) {
    $$('[data-bool]', root).forEach((btn) => {
      const val = btn.dataset.bool === 'true';
      btn.disabled = true;
      if (val === q.correct) btn.classList.add('is-correct');
      else if (val === given) btn.classList.add('is-wrong');
      else btn.classList.add('is-muted');
    });
  }
};

/* ---------------- risposta aperta ---------------- */
const aperta = {
  render: () => html`<form class="open-answer" data-open novalidate>
      <input type="text" name="risposta" autocomplete="off" autocapitalize="off"
             spellcheck="false" placeholder="Scrivi la tua risposta…"
             aria-label="La tua risposta" required>
      <button class="btn btn--primary" type="submit">Conferma</button>
    </form>
    <p class="card__text">Le formulazioni equivalenti e i piccoli errori di battitura vengono accettati.</p>`,
  mount(root, q, submit) {
    const form = root.querySelector('[data-open]');
    const input = form.querySelector('input');
    setTimeout(() => input.focus(), 120);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!input.value.trim()) { input.focus(); return; }
      submit(input.value);
    });
  },
  markResult(root, q, given, correct) {
    const form = root.querySelector('[data-open]');
    const input = form.querySelector('input');
    input.disabled = true;
    form.querySelector('button').disabled = true;
    input.style.borderColor = correct ? 'var(--c-ok)' : 'var(--c-err)';
  }
};

/* ---------------- indovina il pianeta ---------------- */
const indovinaPianeta = {
  render(q) {
    // quattro alternative: quella giusta più tre pianeti pescati a caso
    const others = shuffle(PLANETS.filter((p) => p.id !== q.correct)).slice(0, 3);
    const choices = shuffle([planetById(q.correct), ...others]);
    q._choices = choices.map((c) => c.id);
    return html`
      <ul class="prose" style="margin-bottom:var(--s-5)">
        ${q.clues.map((c) => raw(`<li>${esc(c)}</li>`))}
      </ul>
      <div class="planet-rail" role="group" aria-label="Scegli il pianeta" style="border:0;padding:0;gap:var(--s-3)">
        ${choices.map((p) => raw(html`
          <button class="planet-rail__btn" type="button" data-planet="${p.id}" style="flex:1 1 90px">
            ${raw(sphereHTML(p.visual, { size: 42 }))}
            <span>${p.name}</span>
          </button>`))}
      </div>`;
  },
  mount(root, q, submit) {
    $$('[data-planet]', root).forEach((btn) =>
      btn.addEventListener('click', () => submit(btn.dataset.planet)));
  },
  markResult(root, q, given) {
    $$('[data-planet]', root).forEach((btn) => {
      btn.disabled = true;
      const id = btn.dataset.planet;
      if (id === q.correct) btn.style.cssText += ';border-color:var(--c-ok);background:rgba(81,216,138,.14)';
      else if (id === given) btn.style.cssText += ';border-color:var(--c-err);background:rgba(255,107,127,.12)';
      else btn.style.opacity = '.45';
    });
  }
};

/* ---------------- indovina l'oggetto astronomico ---------------- */
const indovinaOggetto = {
  render(q) {
    return html`
      <ul class="prose" style="margin-bottom:var(--s-5)">
        ${q.clues.map((c) => raw(`<li>${esc(c)}</li>`))}
      </ul>
      ${raw(optionList(q.options))}`;
  },
  mount: multipla.mount,
  markResult: multipla.markResult
};

/* ---------------- riconosci il fenomeno ---------------- */
const riconosciFenomeno = {
  render(q) {
    return html`
      <div class="viz" style="margin-bottom:var(--s-5)">
        <canvas data-sim="${q.sim}" height="240"></canvas>
        <div class="viz__caption">Simulazione schematica, non in scala</div>
      </div>
      ${raw(optionList(q.options))}`;
  },
  mount(root, q, submit) {
    const canvas = root.querySelector('[data-sim]');
    if (canvas) {
      activeSim?.destroy();
      activeSim = createSimulation(canvas, q.sim, { height: 240 });
      activeSim.start();
    }
    multipla.mount(root, q, submit);
  },
  markResult: multipla.markResult,
  cleanup() { activeSim?.destroy(); activeSim = null; }
};

/* ---------------- ordina (trascinamento + tastiera) ---------------- */
const ordina = {
  render(q) {
    const pool = shuffle(q.items);
    return html`
      <div class="dnd">
        <p class="card__text">${q.hint || 'Trascina gli elementi nella sequenza corretta.'}
          Da tastiera: seleziona con Invio, poi usa le frecce per spostare.</p>
        <div class="dnd__slots" data-slots role="list" aria-label="Sequenza da comporre"></div>
        <div class="row row--between">
          <span class="eyebrow eyebrow--plain">Elementi disponibili</span>
          <button class="btn btn--quiet btn--sm" type="button" data-reset>Ricomincia</button>
        </div>
        <div class="dnd__pool" data-pool role="list" aria-label="Elementi disponibili">
          ${pool.map((item) => raw(html`
            <button class="token" type="button" role="listitem" draggable="true"
                    data-id="${item.id}" aria-pressed="false">
              ${raw(planetById(item.id) ? sphereHTML(planetById(item.id).visual, { size: 18 }) : '')}
              <span>${item.label}</span>
            </button>`))}
        </div>
        <button class="btn btn--primary" type="button" data-confirm disabled>Conferma la sequenza</button>
      </div>`;
  },
  mount(root, q, submit) {
    const slots = root.querySelector('[data-slots]');
    const pool = root.querySelector('[data-pool]');
    const confirm = root.querySelector('[data-confirm]');
    let selected = null;

    const refresh = () => {
      const placed = $$('.token', slots);
      placed.forEach((t, i) => {
        let idx = t.querySelector('.token__idx');
        if (!idx) { idx = document.createElement('span'); idx.className = 'token__idx'; t.prepend(idx); }
        idx.textContent = `${i + 1}`;
      });
      confirm.disabled = placed.length !== q.items.length;
    };

    const place = (token, container, before = null) => {
      container.insertBefore(token, before);
      if (container === pool) token.querySelector('.token__idx')?.remove();
      refresh();
    };

    // --- trascinamento con mouse e touch (HTML5 drag & drop) ---
    $$('.token', root).forEach((token) => {
      token.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', token.dataset.id);
        token.classList.add('is-dragging');
      });
      token.addEventListener('dragend', () => token.classList.remove('is-dragging'));
      // clic: alterna fra lista e sequenza, utile anche su touch
      token.addEventListener('click', () => {
        if (token.parentElement === pool) place(token, slots);
        else place(token, pool);
        announce(token.parentElement === slots
          ? `${token.textContent.trim()} inserito in posizione ${$$('.token', slots).indexOf(token) + 1}`
          : `${token.textContent.trim()} rimosso dalla sequenza`);
      });
      // --- alternativa da tastiera ---
      token.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selected = selected === token ? null : token;
          $$('.token', root).forEach((t) => t.setAttribute('aria-pressed', String(t === selected)));
          announce(selected ? `${token.textContent.trim()} selezionato: usa le frecce per spostarlo` : 'Selezione annullata');
          return;
        }
        if (selected !== token) return;
        const siblings = $$('.token', token.parentElement);
        const i = siblings.indexOf(token);
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          if (token.parentElement === pool) place(token, slots);
          else if (i < siblings.length - 1) place(token, slots, siblings[i + 2] || null);
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
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
        const id = e.dataTransfer.getData('text/plain');
        const token = root.querySelector(`.token[data-id="${id}"]`);
        if (!token) return;
        // inserisce nel punto in cui si rilascia
        const after = $$('.token', zone).find((t) => {
          const r = t.getBoundingClientRect();
          return e.clientX < r.left + r.width / 2 && e.clientY < r.bottom;
        });
        place(token, zone, after || null);
      });
    });

    root.querySelector('[data-reset]').addEventListener('click', () => {
      $$('.token', slots).forEach((t) => place(t, pool));
      announce('Sequenza azzerata');
    });

    confirm.addEventListener('click', () => submit($$('.token', slots).map((t) => t.dataset.id)));
    refresh();
  },
  markResult(root, q, given) {
    const slots = root.querySelector('[data-slots]');
    root.querySelector('[data-confirm]').disabled = true;
    root.querySelector('[data-reset]').disabled = true;
    $$('.token', root).forEach((t) => { t.draggable = false; t.disabled = true; });
    $$('.token', slots).forEach((t, i) => {
      const ok = q.solution[i] === t.dataset.id;
      t.style.cssText += ok
        ? ';border-color:var(--c-ok);background:rgba(81,216,138,.14)'
        : ';border-color:var(--c-err);background:rgba(255,107,127,.12)';
    });
  }
};

/* ---------------- abbina le missioni ---------------- */
const abbina = {
  render(q) {
    const lefts = shuffle(q.pairs.map((p) => p.left));
    const rights = shuffle(q.pairs.map((p) => p.right));
    return html`
      <div class="dnd">
        <p class="card__text">Seleziona un elemento a sinistra e il suo corrispondente a destra.</p>
        <div class="match">
          <div class="match__col" data-side="left" role="group" aria-label="Missioni">
            ${lefts.map((l) => raw(html`<button class="match__item" type="button" data-left="${l}" aria-pressed="false">${l}</button>`))}
          </div>
          <div class="match__col" data-side="right" role="group" aria-label="Corrispondenze">
            ${rights.map((r) => raw(html`<button class="match__item" type="button" data-right="${r}" aria-pressed="false">${r}</button>`))}
          </div>
        </div>
        <div class="row row--between">
          <span class="eyebrow eyebrow--plain" data-progress>0 di ${q.pairs.length} abbinate</span>
          <button class="btn btn--quiet btn--sm" type="button" data-reset>Ricomincia</button>
        </div>
        <button class="btn btn--primary" type="button" data-confirm disabled>Conferma gli abbinamenti</button>
      </div>`;
  },
  mount(root, q, submit) {
    const made = {};
    let pendingLeft = null;
    const progress = root.querySelector('[data-progress]');
    const confirm = root.querySelector('[data-confirm]');

    const refresh = () => {
      const n = Object.keys(made).length;
      progress.textContent = `${n} di ${q.pairs.length} abbinate`;
      confirm.disabled = n !== q.pairs.length;
    };

    const clearPending = () => {
      pendingLeft = null;
      $$('[data-left]', root).forEach((b) => b.setAttribute('aria-pressed', 'false'));
    };

    $$('[data-left]', root).forEach((btn) => btn.addEventListener('click', () => {
      if (made[btn.dataset.left]) return;
      clearPending();
      pendingLeft = btn.dataset.left;
      btn.setAttribute('aria-pressed', 'true');
      announce(`${pendingLeft} selezionata: scegli la corrispondenza`);
    }));

    $$('[data-right]', root).forEach((btn) => btn.addEventListener('click', () => {
      if (!pendingLeft || Object.values(made).includes(btn.dataset.right)) return;
      made[pendingLeft] = btn.dataset.right;
      root.querySelector(`[data-left="${CSS.escape(pendingLeft)}"]`)?.classList.add('is-paired');
      btn.classList.add('is-paired');
      announce(`${pendingLeft} abbinata a ${btn.dataset.right}`);
      clearPending();
      refresh();
    }));

    root.querySelector('[data-reset]').addEventListener('click', () => {
      Object.keys(made).forEach((k) => delete made[k]);
      $$('.match__item', root).forEach((b) => { b.classList.remove('is-paired'); b.setAttribute('aria-pressed', 'false'); });
      clearPending(); refresh();
    });

    confirm.addEventListener('click', () => submit({ ...made }));
    refresh();
  },
  markResult(root, q, given) {
    root.querySelector('[data-confirm]').disabled = true;
    root.querySelector('[data-reset]').disabled = true;
    $$('.match__item', root).forEach((b) => { b.disabled = true; });
    q.pairs.forEach((p) => {
      const ok = given?.[p.left] === p.right;
      const node = root.querySelector(`[data-left="${CSS.escape(p.left)}"]`);
      if (node) node.style.cssText += ok
        ? ';border-color:var(--c-ok)'
        : ';border-color:var(--c-err)';
    });
  }
};

/* ---------------- registro delle tipologie ---------------- */
export const TYPES = {
  'multipla': multipla,
  'vero-falso': veroFalso,
  'aperta': aperta,
  'indovina-pianeta': indovinaPianeta,
  'indovina-oggetto': indovinaOggetto,
  'riconosci-fenomeno': riconosciFenomeno,
  'ordina': ordina,
  'abbina': abbina
};

export const typeLabel = {
  'multipla': 'Risposta multipla',
  'vero-falso': 'Vero o falso',
  'aperta': 'Risposta aperta',
  'indovina-pianeta': 'Indovina il pianeta',
  'indovina-oggetto': 'Indovina l\'oggetto',
  'riconosci-fenomeno': 'Riconosci il fenomeno',
  'ordina': 'Ordina la sequenza',
  'abbina': 'Abbina le missioni'
};

/** Pulizia generale fra una domanda e l'altra. */
export function cleanupType(root) {
  if (root?._keyHandler) {
    document.removeEventListener('keydown', root._keyHandler);
    delete root._keyHandler;
  }
  riconosciFenomeno.cleanup();
}
