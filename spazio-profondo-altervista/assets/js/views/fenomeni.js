/**
 * VISTA — Fenomeni astronomici + "Cosa sta succedendo nel cielo?"
 * Gli eventi passati non vengono mai presentati come imminenti: lo stato
 * è calcolato dalla data corrente e gli eventi conclusi finiscono in archivio.
 */

import { html, raw, $, $$, dateText, relativeDays } from '../core/dom.js';
import { PHENOMENA } from '../../data/phenomena.js';
import { upcomingEvents, pastEvents, eventStatus } from '../../data/events.js';
import { resolveSources } from '../../data/sources.js';
import { crumbs, sectionHead, epistemicBadge, safetyNote, infoNote } from './partials.js';
import { initReveal } from '../fx/reveal.js';
import { createSimulation } from '../fx/simulations.js';

export const meta = () => ({
  title: 'Fenomeni astronomici',
  description: 'Eclissi, piogge meteoriche, congiunzioni, tempeste solari, aurore, supernove, onde gravitazionali ed espansione dell\'universo, con simulazioni animate e il calendario degli eventi verificati.'
});

let sims = [];

export function render() {
  const now = new Date();
  const next = upcomingEvents(now);
  const past = pastEvents(now, 4);

  return html`
  <!-- ============ COSA STA SUCCEDENDO NEL CIELO ============ -->
  <section class="section" aria-labelledby="cielo-titolo">
    <div class="container stack-6">
      ${raw(crumbs([{ label: 'Home', href: '#/' }, { label: 'Fenomeni astronomici' }]))}
      ${raw(sectionHead({
        kicker: 'Cosa sta succedendo nel cielo?',
        title: 'Eventi astronomici verificati, in ordine di data',
        text: `Ogni voce riporta la fonte e la data di verifica. Gli eventi già avvenuti finiscono in archivio: non vengono mai mostrati come imminenti. Dati aggiornati al ${dateText(now)}.`,
        level: 1
      }))}

      <div class="stack reveal">
        ${next.map((e) => {
          const st = eventStatus(e, now);
          const d = new Date(e.date);
          const src = resolveSources(e.sourceIds)[0];
          return raw(html`
          <details class="sky-event ${raw(e.highlight ? '' : '')}" style="display:block">
            <summary class="sky-event" style="border:0;background:none;padding:0;list-style:none;cursor:pointer">
              <span class="sky-event__when">
                <span class="sky-event__day">${d.getUTCDate()}</span>
                <span class="sky-event__mon">${dateText(d, { month: 'short' }).replace('.', '')} ${String(d.getUTCFullYear()).slice(2)}</span>
              </span>
              <span class="sky-event__body">
                <span class="row" style="gap:var(--s-2)">
                  <strong>${e.title}</strong>
                  ${e.highlight ? raw('<span class="badge badge--cyan">da non perdere</span>') : ''}
                  ${e.visibleFromItaly ? raw('<span class="badge">visibile dall\'Italia</span>') : raw('<span class="badge">non osservabile da Terra</span>')}
                </span>
                <span class="card__text">${e.summary}</span>
              </span>
              <span class="sky-event__count">
                ${st.state === 'in-corso' ? 'in corso' : st.state === 'oggi' ? 'oggi' : relativeDays(st.days)}
              </span>
            </summary>
            <div class="stack" style="margin-top:var(--s-4);padding-left:var(--s-6)">
              <p class="card__text">${e.detail}</p>
              ${e.numbers?.length ? raw(html`<div class="row">
                ${e.numbers.map((n) => raw(`<span class="badge badge--blue">${n.k}: ${n.v}</span>`))}
              </div>`) : ''}
              <p class="card__text"><strong>Come osservarlo.</strong> ${e.howToSee}</p>
              ${e.safety ? raw(safetyNote('Questo evento riguarda il Sole: usare esclusivamente filtri solari certificati ISO 12312-2.')) : ''}
              ${src ? raw(html`<p class="source__date">Fonte: <a href="${src.url}" target="_blank" rel="noopener noreferrer">${src.org} — ${src.title}</a> · dato verificato il ${dateText(e.verifiedOn)}</p>`) : ''}
            </div>
          </details>`);
        })}
      </div>

      ${past.length ? raw(html`
      <details class="card card--flat reveal">
        <summary style="cursor:pointer"><span class="eyebrow eyebrow--plain">Archivio eventi conclusi (${past.length})</span></summary>
        <div class="stack" style="margin-top:var(--s-4)">
          ${past.map((e) => raw(html`
            <div class="sky-event sky-event--past">
              <span class="sky-event__when">
                <span class="sky-event__day">${new Date(e.date).getUTCDate()}</span>
                <span class="sky-event__mon">${dateText(e.date, { month: 'short' }).replace('.', '')} ${String(new Date(e.date).getUTCFullYear()).slice(2)}</span>
              </span>
              <span class="sky-event__body">
                <strong>${e.title}</strong>
                <span class="card__text">${e.summary}</span>
              </span>
              <span class="sky-event__count">concluso</span>
            </div>`))}
        </div>
      </details>`) : ''}
    </div>
  </section>

  <!-- ============ I FENOMENI ============ -->
  <section class="section section--night" aria-labelledby="fenomeni-titolo">
    <div class="container stack-6">
      ${raw(sectionHead({
        kicker: 'Fenomeni astronomici e astrofisici',
        title: 'Dieci fenomeni, dieci simulazioni',
        text: 'Ogni scheda ha una simulazione animata schematica e dichiara che cosa è un fatto accertato, che cosa è un\'ipotesi e che cosa resta una questione aperta.'
      }))}

      <div class="grid grid--2">
        ${PHENOMENA.map((p, i) => raw(html`
          <a class="card reveal" href="#/fenomeni/${p.id}" style="--reveal-delay:${i * 40}ms">
            <div class="row row--between">
              <span class="eyebrow eyebrow--plain">${p.kind}</span>
              <span class="mono" style="font-size:var(--t-micro);color:var(--c-text-faint)">0${p.order}</span>
            </div>
            <span class="card__title">${p.name}</span>
            <span class="card__text">${p.tagline}</span>
            <span class="card__foot">
              ${raw(epistemicBadge(p.epistemic.length > 46 ? p.epistemic.slice(0, 44) + '…' : p.epistemic))}
              <span class="btn__arrow" aria-hidden="true">→</span>
            </span>
          </a>`))}
      </div>

      ${raw(infoNote('Le simulazioni di questo sito sono <strong>schematiche e non in scala</strong>: servono a mostrare un meccanismo, non a riprodurre proporzioni o tempi reali. Dove la differenza conta, è scritto nella didascalia.'))}
    </div>
  </section>`;
}

export function mount(root) { initReveal(root); }
export function unmount() { sims.forEach((s) => s.destroy()); sims = []; }
