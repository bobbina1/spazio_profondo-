/** VISTA — 404 */

import { html, raw } from '../core/dom.js';
import { sphereHTML } from '../fx/planet.js';

export const meta = () => ({ title: 'Pagina non trovata' });

export function render() {
  return html`
  <section class="section" style="min-height:70vh;display:grid;place-items:center">
    <div class="container" style="text-align:center;display:grid;gap:var(--s-5);justify-items:center">
      ${raw(sphereHTML({ base: '#2b3a5e', light: '#8fa8d8', dark: '#070c1a' }, { size: 120, spin: true }))}
      <span class="eyebrow eyebrow--plain">Errore 404</span>
      <h1>Questo indirizzo non corrisponde a nessun contenuto</h1>
      <p class="lead" style="max-width:48ch">Può capitare anche alle sonde: un comando sbagliato, e si punta verso una regione di cielo vuota. Torniamo su una rotta nota.</p>
      <div class="row" style="justify-content:center">
        <a class="btn btn--primary" href="#/">Torna alla home</a>
        <a class="btn btn--ghost" href="#/esplora">Esplora l'universo</a>
        <a class="btn btn--ghost" href="#/sistema-solare">Sistema Solare</a>
      </div>
    </div>
  </section>`;
}
