/**
 * VISTA — Video e contenuti
 * Filtri per argomento, griglia leggibile da smartphone, e collegamento
 * di ogni contenuto al relativo approfondimento scientifico del sito.
 */

import { html, raw, $, $$, dateText } from '../core/dom.js';
import { CONTENTS, CONTENT_CATEGORIES, SOCIAL, contentLink, latestContents } from '../../data/content.js';
import { crumbs, sectionHead, infoNote } from './partials.js';
import { initReveal } from '../fx/reveal.js';

export const meta = () => ({
  title: 'Video e contenuti',
  description: 'I contenuti pubblicati da Spazio Profondo, con filtri per argomento e collegamento diretto all\'approfondimento scientifico corrispondente sul sito.'
});

export function render() {
  const latest = latestContents(2).map((c) => c.id);
  const sorted = [...CONTENTS].sort((a, b) => new Date(b.date) - new Date(a.date));

  return html`
  <section class="section" aria-labelledby="titolo">
    <div class="container stack-6">
      ${raw(crumbs([{ label: 'Home', href: '#/' }, { label: 'Video e contenuti' }]))}
      ${raw(sectionHead({
        kicker: 'Video e contenuti',
        title: 'Ogni contenuto porta a un approfondimento',
        text: 'Un video sulla sonda Voyager rimanda alla scheda della missione; uno sulle Geminidi alla pagina sulle piogge meteoriche. Il contenuto incuriosisce, la scheda risponde.',
        level: 1
      }))}

      ${raw(infoNote(`<strong>Nota sui contenuti in elenco.</strong> Il profilo Instagram del progetto non è leggibile in automatico (il suo robots.txt lo vieta), quindi nessun post reale è stato copiato qui: le voci sono segnaposto con struttura completa, etichettate come "contenuto di esempio". Per pubblicare i post reali basta sostituire le voci in <code>assets/data/content.js</code> con titolo, data, link originale e approfondimento collegato: filtri, griglia e collegamenti si aggiornano da soli. Profilo del progetto: <a href="${SOCIAL.instagram}" target="_blank" rel="noopener noreferrer">${SOCIAL.handle}</a>.`))}

      <div class="chips reveal" role="group" aria-label="Filtra per argomento">
        <button class="chip" type="button" data-cat="tutte" aria-pressed="true">Tutti</button>
        ${CONTENT_CATEGORIES.map((c) => raw(html`
          <button class="chip" type="button" data-cat="${c.id}" aria-pressed="false">${c.label}</button>`))}
      </div>

      <div class="grid grid--3" data-grid>
        ${sorted.map((c) => raw(html`
          <a class="card reveal" href="${contentLink(c)}" data-cat-item="${c.category}">
            <div class="card__media content-card__cover"
                 style="--cover-bg:linear-gradient(140deg, ${c.cover.from}, ${c.cover.to})">
              ${c.hasVideo ? raw('<span class="content-card__play" aria-hidden="true">▶</span>') : ''}
              ${latest.includes(c.id) ? raw('<span class="badge badge--cyan" style="position:absolute;top:var(--s-3);left:var(--s-3)">novità</span>') : ''}
            </div>
            <div class="row row--between">
              <span class="eyebrow eyebrow--plain">${dateText(c.date)}</span>
              <span class="badge">${CONTENT_CATEGORIES.find((x) => x.id === c.category)?.label || c.category}</span>
            </div>
            <span class="card__title">${c.title}</span>
            <span class="card__text">${c.description}</span>
            <span class="card__foot">
              ${c.isExample ? raw('<span class="badge badge--amber">contenuto di esempio</span>') : ''}
              <span class="btn__arrow" aria-hidden="true">→</span>
            </span>
          </a>`))}
      </div>
      <p class="card__text" data-empty hidden>Nessun contenuto in questa categoria.</p>

      <div class="card card--flat reveal">
        <span class="eyebrow">Struttura di ogni contenuto</span>
        <p class="card__text">Titolo · immagine di copertina · descrizione · categoria · data di pubblicazione · video incorporato quando disponibile · link al contenuto originale · approfondimento scientifico collegato. Il campo per l'incorporamento del video è già previsto nel modello dati: inserendo l'URL, il player compare automaticamente nella pagina del contenuto.</p>
      </div>
    </div>
  </section>`;
}

export function mount(root) {
  initReveal(root);
  const items = $$('[data-cat-item]', root);
  const empty = $('[data-empty]', root);
  $$('[data-cat]', root).forEach((btn) => btn.addEventListener('click', () => {
    const cat = btn.dataset.cat;
    $$('[data-cat]', root).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    let visible = 0;
    items.forEach((it) => {
      const show = cat === 'tutte' || it.dataset.catItem === cat;
      it.hidden = !show;
      if (show) visible += 1;
    });
    empty.hidden = visible > 0;
  }));
}
