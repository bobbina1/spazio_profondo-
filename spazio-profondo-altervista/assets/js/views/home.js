/**
 * VISTA — Home page
 * Hero a schermo intero e introduzione progressiva delle sezioni durante
 * lo scorrimento. I contenuti in evidenza sono calcolati dai dati:
 * il "pianeta della settimana" ruota in base al numero di settimana ISO,
 * l'evento e la missione in evidenza derivano dalle date reali.
 */

import { html, raw, dateText } from '../core/dom.js';
import { sphereHTML } from '../fx/planet.js';
import { PLANETS } from '../../data/planets.js';
import { MISSIONS } from '../../data/missions.js';
import { CATEGORIES } from '../../data/universe.js';
import { upcomingEvents, eventStatus } from '../../data/events.js';
import { latestContents, contentLink } from '../../data/content.js';
import { archiveStats } from '../../data/quiz-questions.js';
import { initReveal, initParallax, stopParallax } from '../fx/reveal.js';
import { heroIntro } from '../fx/intro.js';

export const meta = () => ({
  title: null,
  description: 'Spazio Profondo: un viaggio interattivo nell\'universo. Sistema Solare in 3D, missioni spaziali, fenomeni astronomici, quiz e giochi scientifici, con fonti NASA ed ESA.'
});

/** Numero di settimana ISO: fa ruotare il pianeta in evidenza. */
function isoWeek(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

export function render() {
  const now = new Date();
  const planet = PLANETS[isoWeek(now) % PLANETS.length];
  const featured = MISSIONS.filter((m) => m.featured);
  const mission = featured[isoWeek(now) % featured.length];
  const events = upcomingEvents(now, 4);
  const nextEvent = events.find((e) => e.highlight) || events[0];
  const contents = latestContents(3);
  const stats = archiveStats();
  const curiosities = [
    { t: 'Un giorno-luce di distanza', d: 'Il 18 novembre 2026 il Voyager 1 ha raggiunto i 25,902 miliardi di km: la luce impiega 24 ore a coprire quella distanza.', href: '#/missioni/voyager' },
    { t: 'Saturno galleggerebbe', d: 'La sua densità media è 0,687 g/cm³, inferiore a quella dell\'acqua: è l\'unico pianeta in questa condizione.', href: '#/sistema-solare/saturno' },
    { t: 'Le fasi non sono ombre', d: 'Le fasi lunari dipendono da quanta parte dell\'emisfero illuminato è rivolta verso di noi, non dall\'ombra della Terra.', href: '#/luna' },
    { t: 'La corona è più calda della superficie', d: 'Oltre un milione di gradi contro 5.500 °C: perché, è ancora una questione aperta.', href: '#/missioni/parker' }
  ];

  return html`
  <!-- ============ HERO ============ -->
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__planet" data-parallax="0.06" aria-hidden="true">
      ${raw(sphereHTML({
        base: '#2f6ad0', light: '#cfe3ff', dark: '#060e22',
        texture: 'repeating-linear-gradient(170deg, rgba(207,227,255,.18) 0 8%, rgba(20,50,120,.22) 8% 16%)',
        textureOpacity: 0.7
      }, { size: 680, spin: true }))}
    </div>
    <div class="container hero__inner">
      <span class="eyebrow">Un progetto di divulgazione, con dati verificati da NASA ed ESA</span>
      <h1 class="display hero__title" id="hero-title">Spazio profondo</h1>
      <p class="hero__claim">L'universo è più vicino di quanto immagini.</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="#/esplora">Inizia l'esplorazione</a>
        <a class="btn btn--ghost" href="#/contenuti">Scopri gli ultimi contenuti</a>
      </div>
    </div>
    <div class="container hero__meta">
      <span class="hero__scroll"><i aria-hidden="true"></i> scorri per esplorare</span>
      <ul class="hero__stats">
        <li>${PLANETS.length} pianeti</li>
        <li>${MISSIONS.length} missioni</li>
        <li>${stats.total} domande</li>
      </ul>
      <span>aggiornato al ${dateText(now)}</span>
    </div>
  </section>

  <!-- ============ IN EVIDENZA ORA ============ -->
  <section class="section section--night" aria-labelledby="ora-title">
    <div class="container stack-6">
      <header class="section-head reveal">
        <span class="eyebrow">Che cosa sta succedendo</span>
        <h2 id="ora-title">Il cielo e lo spazio, in questo momento</h2>
      </header>
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))">

        <a class="card reveal" href="#/missioni/${mission.id}">
          <span class="eyebrow eyebrow--plain">Missione in evidenza</span>
          <span class="card__title">${mission.name}</span>
          <span class="card__text">${mission.tagline}</span>
          <span class="card__foot">
            <span class="badge badge--ok badge--dot">dato al ${mission.statusAsOf}</span>
            <span class="btn__arrow" aria-hidden="true">→</span>
          </span>
        </a>

        ${nextEvent ? raw(html`
        <a class="card reveal" href="#/fenomeni">
          <span class="eyebrow eyebrow--plain">Evento astronomico</span>
          <span class="card__title">${nextEvent.title}</span>
          <span class="card__text">${nextEvent.summary}</span>
          <span class="card__foot">
            <span class="badge badge--cyan">${nextEvent.window}</span>
            <span class="mono" style="font-size:var(--t-micro);color:var(--c-text-faint)">
              ${eventStatus(nextEvent, now).state === 'in-corso' ? 'in corso' : `fra ${eventStatus(nextEvent, now).days} giorni`}
            </span>
          </span>
        </a>`) : ''}

        <a class="card reveal" href="#/sistema-solare/${planet.id}">
          <span class="eyebrow eyebrow--plain">Pianeta della settimana</span>
          <div class="row" style="gap:var(--s-4);align-items:center">
            ${raw(sphereHTML(planet.visual, { size: 56, spin: true }))}
            <div>
              <span class="card__title">${planet.name}</span><br>
              <span class="card__text">${planet.tagline}</span>
            </div>
          </div>
          <span class="card__foot">
            <span class="badge">${planet.kind}</span>
            <span class="btn__arrow" aria-hidden="true">→</span>
          </span>
        </a>
      </div>

      <div class="stack reveal">
        <span class="eyebrow">Prossimi appuntamenti nel cielo</span>
        <div class="stack">
          ${events.slice(0, 3).map((e) => {
            const st = eventStatus(e, now);
            const d = new Date(e.date);
            return raw(html`
            <a class="sky-event" href="#/fenomeni">
              <span class="sky-event__when">
                <span class="sky-event__day">${d.getUTCDate()}</span>
                <span class="sky-event__mon">${dateText(d, { month: 'short' }).replace('.', '')}</span>
              </span>
              <span class="sky-event__body">
                <strong>${e.title}</strong>
                <span class="card__text">${e.summary}</span>
              </span>
              <span class="sky-event__count">${st.state === 'in-corso' ? 'in corso' : `−${st.days} g`}</span>
            </a>`);
          })}
        </div>
        <a class="btn btn--quiet btn--sm" href="#/fenomeni">Tutti gli eventi e i fenomeni →</a>
      </div>
    </div>
  </section>

  <!-- ============ ESPLORA L'UNIVERSO ============ -->
  <section class="section" aria-labelledby="esplora-title">
    <div class="container stack-6">
      <header class="section-head reveal">
        <span class="eyebrow">Esplora l'universo</span>
        <h2 id="esplora-title">Sette scale di grandezza, dal nostro quartiere cosmico ai confini dell'osservabile</h2>
        <p class="lead">Ogni categoria ha una pagina con approfondimento scientifico, dati, curiosità e fonti. Dove la scienza non ha una risposta, è scritto esplicitamente.</p>
      </header>
      <div class="grid grid--3">
        ${CATEGORIES.map((c, i) => raw(html`
          <a class="card reveal" href="#/esplora/${c.id}" style="--reveal-delay:${i * 50}ms">
            <span class="eyebrow eyebrow--plain">0${c.order}</span>
            <span class="card__title">${c.name}</span>
            <span class="card__text">${c.tagline}</span>
            <span class="card__foot">
              <span class="badge badge--blue">${c.scaleLabel}</span>
            </span>
          </a>`))}
      </div>
    </div>
  </section>

  <!-- ============ INVITO AL SISTEMA SOLARE ============ -->
  <section class="section section--night" aria-labelledby="solare-title">
    <div class="container">
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));align-items:center;gap:var(--s-7)">
        <div class="stack-5 reveal">
          <span class="eyebrow">Sistema Solare</span>
          <h2 id="solare-title">Un modello che puoi toccare, con la scala dichiarata</h2>
          <p class="lead">Distanze e dimensioni reali non stanno insieme su uno schermo: se Nettuno fosse a 400 pixel dal Sole, la Terra sarebbe a 13 pixel. Per questo il modello ha due modalità, entrambe etichettate: illustrativa e a scala scientifica dichiarata.</p>
          <div class="row">
            <a class="btn btn--primary" href="#/sistema-solare">Apri il modello interattivo</a>
            <a class="btn btn--ghost" href="#/luna">Vai alla Luna</a>
          </div>
        </div>
        <div class="row reveal" style="justify-content:center;gap:var(--s-3)" aria-hidden="true">
          ${PLANETS.map((p) => raw(sphereHTML(p.visual, { size: Math.max(22, Math.min(68, 14 + p.radiusKm / 1400)), spin: true })))}
        </div>
      </div>
    </div>
  </section>

  <!-- ============ ULTIMI CONTENUTI ============ -->
  <section class="section" aria-labelledby="contenuti-title">
    <div class="container stack-6">
      <header class="section-head reveal">
        <span class="eyebrow">Video e contenuti</span>
        <h2 id="contenuti-title">Gli ultimi contenuti pubblicati</h2>
        <p class="lead">Ogni contenuto rimanda all'approfondimento scientifico corrispondente sul sito.</p>
      </header>
      <div class="grid grid--3">
        ${contents.map((c) => raw(html`
          <a class="card reveal" href="${contentLink(c)}">
            <div class="card__media content-card__cover"
                 style="--cover-bg:linear-gradient(140deg, ${c.cover.from}, ${c.cover.to})">
              ${c.hasVideo ? raw('<span class="content-card__play" aria-hidden="true">▶</span>') : ''}
            </div>
            <span class="eyebrow eyebrow--plain">${dateText(c.date)}</span>
            <span class="card__title">${c.title}</span>
            <span class="card__text">${c.description}</span>
            <span class="card__foot">
              ${c.isExample ? raw('<span class="badge badge--amber">contenuto di esempio</span>') : raw('<span class="badge">approfondimento</span>')}
              <span class="btn__arrow" aria-hidden="true">→</span>
            </span>
          </a>`))}
      </div>
      <a class="btn btn--ghost reveal" href="#/contenuti">Vedi tutti i contenuti</a>
    </div>
  </section>

  <!-- ============ CURIOSITÀ ============ -->
  <section class="section section--night" aria-labelledby="curio-title">
    <div class="container stack-6">
      <header class="section-head reveal">
        <span class="eyebrow">Curiosità scientifiche</span>
        <h2 id="curio-title">Quattro cose vere che sembrano sbagliate</h2>
      </header>
      <div class="grid grid--2">
        ${curiosities.map((c) => raw(html`
          <a class="card card--flat reveal" href="${c.href}">
            <span class="card__title">${c.t}</span>
            <span class="card__text">${c.d}</span>
          </a>`))}
      </div>
    </div>
  </section>

  <!-- ============ QUIZ E LABORATORIO ============ -->
  <section class="section" aria-labelledby="quiz-title">
    <div class="container">
      <div class="card card--pad-lg reveal" style="background:
        radial-gradient(110% 130% at 10% 0%, rgba(77,163,255,.16), transparent 60%),
        radial-gradient(90% 120% at 90% 100%, rgba(154,123,255,.16), transparent 60%), var(--c-surface)">
        <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:var(--s-6);align-items:center">
          <div class="stack-5">
            <span class="eyebrow">Metti alla prova</span>
            <h2 id="quiz-title">${archiveStats().total} domande, 8 tipologie di gioco</h2>
            <p class="lead">Risposta multipla, vero o falso, risposta aperta, indovina il pianeta, ordina le orbite, abbina le missioni: ogni partita estrae domande diverse, e ogni risposta porta con sé la spiegazione scientifica e la fonte.</p>
            <div class="row">
              <a class="btn btn--primary" href="#/quiz">Inizia il quiz</a>
              <a class="btn btn--ghost" href="#/laboratorio">Laboratorio Spaziale</a>
            </div>
          </div>
          <div class="grid" style="grid-template-columns:1fr 1fr;gap:var(--s-4)">
            ${Object.entries(archiveStats().byDiff).map(([k, v]) => raw(html`
              <div class="kv">
                <span class="kv__k">${k}</span>
                <span class="kv__v">${v} domande</span>
              </div>`))}
            <div class="kv">
              <span class="kv__k">Tipologie</span>
              <span class="kv__v">${Object.keys(archiveStats().byType).length}</span>
            </div>
            <div class="kv">
              <span class="kv__k">Giochi</span>
              <span class="kv__v">5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

export function mount(root) {
  initReveal(root);
  initParallax(root);
  heroIntro(root);
}

export function unmount() {
  stopParallax();
}
