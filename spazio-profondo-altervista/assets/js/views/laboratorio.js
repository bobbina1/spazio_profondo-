/**
 * VISTA — Laboratorio Spaziale (5 giochi)
 * Indice dei giochi e contenitore di esecuzione: ogni gioco è un modulo
 * caricato su richiesta, con il proprio punteggio e record personale.
 */

import { html, raw, $ } from '../core/dom.js';
import { GAME_CARDS, gameById, gameCardById } from '../games/index.js';
import { getGameRecords } from '../core/store.js';
import { crumbs, sectionHead } from './partials.js';
import { initReveal } from '../fx/reveal.js';
import { navigate } from '../core/router.js';

export function meta(params) {
  const card = params.id && gameCardById(params.id);
  return card
    ? { title: `${card.name} — Laboratorio Spaziale`, description: card.summary }
    : {
        title: 'Laboratorio Spaziale',
        description: 'Cinque giochi educativi: ordina i pianeti, riconosci il pianeta dagli indizi, progetta una missione interplanetaria, ricostruisci la cronologia spaziale e sfida il vero o falso cosmico.'
      };
}

let cleanup = null;

export async function render(params) {
  if (params.id && gameById(params.id)) {
    const mod = await gameById(params.id).load();
    const card = gameCardById(params.id);
    return html`<section class="section">
      <div class="container stack-6">
        ${raw(crumbs([
          { label: 'Home', href: '#/' },
          { label: 'Laboratorio Spaziale', href: '#/laboratorio' },
          { label: card.name }
        ]))}
        <h1 class="sr-only">${card.name} — Laboratorio Spaziale</h1>
        <div data-game-host>${raw(mod.render())}</div>
      </div>
    </section>`;
  }

  const records = getGameRecords();
  return html`
  <section class="section">
    <div class="container stack-6">
      ${raw(crumbs([{ label: 'Home', href: '#/' }, { label: 'Laboratorio Spaziale' }]))}
      ${raw(sectionHead({
        kicker: 'Laboratorio Spaziale',
        title: 'Cinque giochi per capire con le mani',
        text: 'Ogni gioco ha regole chiare, un punteggio e un risultato finale con la spiegazione di quello che è successo. I record restano salvati su questo dispositivo.',
        level: 1
      }))}

      <div class="grid grid--2">
        ${GAME_CARDS.map((g, i) => raw(html`
          <a class="card reveal" href="#/laboratorio/${g.id}" style="--reveal-delay:${i * 45}ms">
            <div class="card__media" style="background:
                radial-gradient(70% 90% at 25% 20%, ${g.accent}44, transparent 65%),
                radial-gradient(60% 80% at 80% 75%, ${g.accent}22, transparent 60%), var(--c-night);
                display:grid;place-items:center">
              <span class="display" style="font-size:3.4rem;opacity:.22">0${g.n}</span>
            </div>
            <span class="eyebrow eyebrow--plain">Gioco ${g.n}</span>
            <span class="card__title">${g.name}</span>
            <span class="card__text">${g.summary}</span>
            <span class="card__foot">
              <span class="row" style="gap:var(--s-2)">
                ${g.tags.map((t) => raw(`<span class="badge">${t}</span>`))}
              </span>
              ${records[g.id] ? raw(`<span class="badge badge--amber badge--dot">${records[g.id].score}</span>`) : ''}
            </span>
          </a>`))}
      </div>

      <div class="card card--flat reveal">
        <span class="eyebrow">Anche il quiz è un gioco</span>
        <p class="card__text">Le otto tipologie del quiz includono trascinamento, abbinamenti e riconoscimento di fenomeni dalle simulazioni animate.</p>
        <a class="btn btn--ghost btn--sm" href="#/quiz">Vai al quiz →</a>
      </div>
    </div>
  </section>`;
}

export async function mount(root, params) {
  initReveal(root);
  if (!params.id || !gameById(params.id)) return;
  const mod = await gameById(params.id).load();
  const host = $('[data-game-host]', root);
  cleanup = mod.mount(host, {
    onFinish(action) {
      if (action === 'restart') {
        // ricarica la vista per generare una partita nuova
        host.innerHTML = mod.render();
        cleanup?.();
        cleanup = mod.mount(host, { onFinish: (a) => a === 'restart' && navigate(`laboratorio/${params.id}`) });
      }
    }
  });
}

export function unmount() { cleanup?.(); cleanup = null; }
