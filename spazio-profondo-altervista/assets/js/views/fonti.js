/**
 * VISTA — Fonti e metodo
 * Pagina dedicata alla trasparenza: enti usati, come sono trattati i dati
 * che cambiano, come vengono gestite immagini e licenze.
 */

import { html, raw, dateText } from '../core/dom.js';
import { SOURCES, PRIMARY_SOURCE_IDS } from '../../data/sources.js';
import { crumbs, sectionHead, infoNote } from './partials.js';
import { initReveal } from '../fx/reveal.js';

export const meta = () => ({
  title: 'Fonti e metodo',
  description: 'Gli enti scientifici usati come fonte, il modo in cui vengono trattati i dati che cambiano nel tempo e le scelte su immagini e licenze.'
});

export function render() {
  const primary = PRIMARY_SOURCE_IDS.map((id) => ({ id, ...SOURCES[id] }));
  const all = Object.entries(SOURCES)
    .map(([id, s]) => ({ id, ...s }))
    .sort((a, b) => a.org.localeCompare(b.org) || a.title.localeCompare(b.title));

  return html`
  <section class="section">
    <div class="container stack-6">
      ${raw(crumbs([{ label: 'Home', href: '#/' }, { label: 'Fonti e metodo' }]))}
      ${raw(sectionHead({
        kicker: 'Fonti e metodo',
        title: 'Come sono costruiti i contenuti di questo sito',
        text: 'La correttezza scientifica è un requisito, non un obiettivo facoltativo. Questa pagina spiega da dove vengono i dati e come vengono trattati quelli che cambiano nel tempo.',
        level: 1
      }))}

      <div class="grid grid--2" style="gap:var(--s-6)">
        <div class="prose reveal">
          <h3>Tre categorie, sempre distinte</h3>
          <p>Ogni affermazione del sito appartiene a una di queste categorie, e l'etichetta è visibile in pagina:</p>
          <ul>
            <li><strong>Fatto accertato</strong>: misurato e confermato da osservazioni indipendenti.</li>
            <li><strong>Ipotesi scientifica</strong>: modello sostenuto da prove, ma non definitivo. Per esempio l'origine della Luna per impatto gigante.</li>
            <li><strong>Questione aperta</strong>: problema su cui la comunità scientifica non ha una risposta. Per esempio il riscaldamento coronale o la natura della materia oscura.</li>
          </ul>
          <h3>I dati che cambiano</h3>
          <p>Lo stato di una missione, il conteggio dei satelliti di Giove, le date degli eventi futuri: sono informazioni che invecchiano. Accanto a ciascuna è indicata la data a cui il dato si riferisce, e il link alla pagina ufficiale dove verificarlo. Nessun dato viene presentato come definitivo se non lo è.</p>
          <h3>Eventi del cielo</h3>
          <p>Il calendario degli eventi calcola lo stato di ogni voce dalla data corrente: un evento concluso finisce in archivio e non viene mai mostrato come imminente.</p>
        </div>
        <div class="stack-5 reveal">
          <div class="card card--flat">
            <span class="eyebrow">Immagini e licenze</span>
            <p class="card__text">Tutte le illustrazioni di questo sito sono <strong>generate graficamente</strong> con Canvas, SVG e gradienti CSS: pianeti, nebulose, simulazioni e schemi. Non viene riprodotta nessuna fotografia protetta da copyright, e nessuna immagine viene prelevata da archivi esterni. Le fotografie reali restano accessibili tramite i link diretti alle gallerie ufficiali degli enti, dove valgono le loro condizioni d'uso.</p>
          </div>
          <div class="card card--flat">
            <span class="eyebrow">Che cosa non facciamo</span>
            <ul class="prose">
              <li>Non vengono inventate missioni, dati, citazioni o scoperte.</li>
              <li>Un dato non verificabile non viene presentato come certezza.</li>
              <li>Le simulazioni sono dichiarate schematiche e non in scala.</li>
              <li>Le previsioni, come l'intensità di uno sciame meteorico, sono indicate come tali.</li>
            </ul>
          </div>
        </div>
      </div>

      <hr class="hr-glow">

      <div class="stack-5 reveal">
        <span class="eyebrow">Enti e portali principali</span>
        <div class="grid grid--3">
          ${primary.map((s) => raw(html`
            <a class="card" href="${s.url}" target="_blank" rel="noopener noreferrer">
              <span class="eyebrow eyebrow--plain">${s.org}</span>
              <span class="card__title" style="font-size:1rem">${s.title}</span>
              <span class="card__foot">
                <span class="source__date">verificata il ${dateText(s.checked)}</span>
                <span class="btn__arrow" aria-hidden="true">↗</span>
              </span>
            </a>`))}
        </div>
      </div>

      ${raw(infoNote(`Il registro completo contiene <strong>${all.length} voci</strong>: ogni scheda del sito rimanda alle fonti pertinenti attraverso questo registro. Un contenuto senza fonte è considerato un errore da correggere, non una scelta editoriale.`))}

      <details class="card card--flat reveal">
        <summary style="cursor:pointer"><span class="eyebrow eyebrow--plain">Registro completo delle fonti (${all.length})</span></summary>
        <div class="sources" style="margin-top:var(--s-5)">
          ${all.map((s) => raw(html`
            <div class="source">
              <span class="source__org">${s.org}</span>
              <div class="source__body">
                <a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.title}</a>
                <span class="source__date">verificata il ${dateText(s.checked)}</span>
                ${s.note ? raw(`<span class="source__date">${s.note}</span>`) : ''}
              </div>
            </div>`))}
        </div>
      </details>
    </div>
  </section>`;
}

export function mount(root) { initReveal(root); }
