/**
 * GIOCO 3 — Missione nello spazio
 *
 * L'utente progetta una missione verso un pianeta gestendo tre risorse:
 * propellente (budget di delta-v), tempo di volo e rischio.
 * Le scelte riflettono compromessi reali della meccanica orbitale,
 * semplificati: trasferimento di Hohmann economico ma lento, rotta diretta
 * rapida ma costosa, fionda gravitazionale quasi gratuita ma lunga,
 * aerofrenaggio che risparmia propellente solo dove c'è atmosfera.
 */

import { html, raw, $$, sample } from '../core/dom.js';
import { sphereHTML } from '../fx/planet.js';
import { PLANETS } from '../../data/planets.js';
import { gameHeader, rulesBlock, gauge, updateGauge, resultScreen, onRestart } from './shared.js';

export const meta = {
  id: 'missione-spaziale',
  name: 'Missione nello spazio',
  kicker: 'Gioco 3',
  summary: 'Progetta una missione interplanetaria: scegli finestra di lancio, traiettoria e manovra di arrivo gestendo propellente, tempo e rischio.',
  icon: 'rocket'
};

const TARGETS = ['marte', 'giove', 'saturno', 'venere'];
const START = { fuel: 100, time: 0, risk: 10 };
const MAX = 1000;

const STEPS = [
  {
    id: 'finestra',
    title: 'Finestra di lancio',
    intro: 'I pianeti si allineano favorevolmente solo in certi periodi. Partire fuori finestra costa molto più propellente.',
    options: [
      { label: 'Attendere la finestra ottimale', fuel: -8, time: 10, risk: -2,
        note: 'La scelta reale di tutte le missioni interplanetarie: si aspetta l\'allineamento favorevole, che per Marte si ripete circa ogni 26 mesi.' },
      { label: 'Partire subito, fuori finestra', fuel: -34, time: 4, risk: 6,
        note: 'Partire fuori finestra richiede molta più energia per raggiungere la stessa destinazione: è il motivo per cui le date di lancio non sono negoziabili.' },
      { label: 'Finestra parziale, compromesso', fuel: -18, time: 7, risk: 2,
        note: 'Un compromesso praticabile: costa più del lancio ottimale ma riduce l\'attesa.' }
    ]
  },
  {
    id: 'traiettoria',
    title: 'Traiettoria di trasferimento',
    intro: 'Come arrivare: la rotta più breve nello spazio non è la più economica in propellente.',
    options: [
      { label: 'Trasferimento di Hohmann', fuel: -22, time: 28, risk: 2,
        note: 'L\'ellisse di trasferimento che tocca entrambe le orbite: il percorso con il minor consumo possibile fra due orbite circolari. In cambio, è lento.' },
      { label: 'Rotta diretta rapida', fuel: -48, time: 12, risk: 8,
        note: 'Riduce il tempo di volo ma richiede una spinta molto maggiore: adatta a missioni con equipaggio, proibitiva per sonde con budget stretto.' },
      { label: 'Fionda gravitazionale su Venere', fuel: -10, time: 42, risk: 10,
        note: 'Sfruttare la gravità di un pianeta per guadagnare velocità senza carburante. È la tecnica dei Voyager e di BepiColombo, che ha compiuto nove sorvoli planetari.' }
    ]
  },
  {
    id: 'crociera',
    title: 'Fase di crociera',
    intro: 'Mesi o anni di viaggio: come gestire correzioni di rotta e guasti.',
    options: [
      { label: 'Correzioni frequenti e precise', fuel: -14, time: 2, risk: -8,
        note: 'Piccole manovre di correzione riducono l\'errore di arrivo. Costano propellente ma abbattono il rischio di mancare il bersaglio.' },
      { label: 'Ibernazione, controlli minimi', fuel: -4, time: 4, risk: 4,
        note: 'È la strategia di New Horizons: in ibernazione la sonda consuma meno e si usura meno, ma si rinuncia a parte del controllo.' },
      { label: 'Propulsione elettrica continua', fuel: -8, time: 16, risk: 2,
        note: 'Spinta debolissima ma costante, molto efficiente. È il sistema di BepiColombo: funziona, ma allunga i tempi di anni.' }
    ]
  },
  {
    id: 'arrivo',
    title: 'Manovra di arrivo',
    intro: 'Arrivare non basta: senza frenare si passa oltre e si perde la missione.',
    options: [
      { label: 'Inserimento propulsivo in orbita', fuel: -30, time: 1, risk: -4,
        note: 'Si accende il motore contro il moto per farsi catturare dalla gravità del pianeta. Affidabile, ma è la manovra più costosa della missione.' },
      { label: 'Aerofrenaggio nell\'atmosfera', fuel: -12, time: 6, risk: 14, needsAtmosphere: true,
        note: 'Usare l\'attrito atmosferico per rallentare: risparmia molto propellente, ma richiede un\'atmosfera e un margine di errore ridottissimo.' },
      { label: 'Solo sorvolo, nessuna frenata', fuel: -2, time: 0, risk: -6, flyby: true,
        note: 'È la scelta del Voyager e di New Horizons: nessuna cattura, poche ore di osservazioni ravvicinate. Costa quasi nulla, ma non si resta.' }
    ]
  }
];

const HAS_ATMOSPHERE = { marte: true, venere: true, giove: true, saturno: true };

export function render() {
  // La destinazione va estratta UNA volta: chiamare sample() dentro il
  // predicato di find() confronterebbe ogni pianeta con un id diverso.
  const targetId = sample(TARGETS);
  const target = PLANETS.find((p) => p.id === targetId);
  return html`<section class="game-shell" data-target="${target.id}">
    ${raw(gameHeader(meta))}
    <div class="game-body" data-game>
      ${raw(rulesBlock([
        'Parti con 100 unità di propellente, 0 di tempo e 10 di rischio.',
        'Ogni scelta consuma propellente, aggiunge tempo e modifica il rischio.',
        'Il propellente non può scendere sotto zero e il rischio non deve superare 60.',
        'Punteggio finale: propellente residuo e tempo contenuto premiano, il rischio penalizza.'
      ]))}
      <div class="row" style="gap:var(--s-5);align-items:center">
        ${raw(sphereHTML(target.visual, { size: 64, spin: true }))}
        <div>
          <span class="eyebrow">Destinazione</span>
          <h3 style="margin-top:var(--s-2)">${target.name}</h3>
          <p class="card__text">${target.distanceKmText} dal Sole · ${target.tagline}</p>
        </div>
      </div>
      <div class="mission-gauges">
        ${raw(gauge('Propellente', START.fuel, 100, 'fuel'))}
        ${raw(gauge('Tempo di volo (mesi)', START.time, 100, 'time'))}
        ${raw(gauge('Rischio', START.risk, 60, 'risk'))}
      </div>
      <div class="mission-board" data-board></div>
    </div>
  </section>`;
}

export function mount(root, { onFinish } = {}) {
  const shell = root.querySelector('[data-target]');
  const body = root.querySelector('[data-game]');
  const board = body.querySelector('[data-board]');
  const targetId = shell.dataset.target;
  const target = PLANETS.find((p) => p.id === targetId);
  const res = { ...START };
  let step = 0;
  const log = [];

  function paintStep() {
    const s = STEPS[step];
    const options = s.options.filter((o) => !o.needsAtmosphere || HAS_ATMOSPHERE[targetId]);
    board.innerHTML = html`
      <div class="mission-step">
        <span class="eyebrow">Fase ${step + 1} di ${STEPS.length}</span>
        <h4>${s.title}</h4>
        <p class="card__text">${s.intro}</p>
        <div class="answers">
          ${options.map((o, i) => raw(html`
            <button class="answer" type="button" data-opt="${s.options.indexOf(o)}">
              <span class="answer__key" aria-hidden="true">${i + 1}</span>
              <span><strong>${o.label}</strong><br>
                <span class="card__text">propellente ${o.fuel} · tempo +${o.time} · rischio ${o.risk > 0 ? '+' : ''}${o.risk}</span>
              </span>
            </button>`))}
        </div>
      </div>`;
    $$('[data-opt]', board).forEach((btn) =>
      btn.addEventListener('click', () => choose(STEPS[step].options[Number(btn.dataset.opt)])));
  }

  function choose(opt) {
    res.fuel = Math.max(0, res.fuel + opt.fuel);
    res.time += opt.time;
    res.risk = Math.max(0, res.risk + opt.risk);
    updateGauge(body, 'fuel', res.fuel, 100);
    updateGauge(body, 'time', res.time, 100);
    updateGauge(body, 'risk', res.risk, 60);
    log.push({ step: STEPS[step].title, choice: opt.label, note: opt.note, flyby: !!opt.flyby });

    const note = document.createElement('div');
    note.className = 'explain';
    note.innerHTML = html`
      <div class="explain__verdict">${opt.label}</div>
      <p class="explain__text">${opt.note}</p>
      <button class="btn btn--primary btn--sm" type="button" data-next>
        ${step + 1 < STEPS.length ? 'Fase successiva' : 'Esito della missione'}
      </button>`;
    board.append(note);
    $$('[data-opt]', board).forEach((b) => { b.disabled = true; b.classList.add('is-muted'); });
    note.querySelector('[data-next]').addEventListener('click', () => {
      step += 1;
      if (step >= STEPS.length) finish();
      else paintStep();
    });
  }

  function finish() {
    const failedFuel = res.fuel <= 0;
    const failedRisk = res.risk > 60;
    const flyby = log.some((l) => l.flyby);
    const success = !failedFuel && !failedRisk;

    let score = 0;
    if (success) {
      score = Math.round(res.fuel * 6 + Math.max(0, 100 - res.time) * 2.5 + Math.max(0, 60 - res.risk) * 2);
      if (flyby) score = Math.round(score * 0.6);   // sorvolo: obiettivo parziale
    }

    const title = failedFuel ? 'Propellente esaurito'
      : failedRisk ? 'Rischio troppo elevato'
      : flyby ? 'Sorvolo riuscito'
      : `In orbita attorno a ${target.name}`;

    const text = failedFuel
      ? 'La sonda non ha potuto completare la manovra di arrivo: senza propellente non si frena, e si passa oltre la destinazione.'
      : failedRisk
      ? 'Troppe scelte aggressive accumulate: nelle missioni reali un rischio così alto non supererebbe la revisione di volo.'
      : flyby
      ? `Hai raggiunto ${target.name} e raccolto dati durante il passaggio, ma la sonda non è stata catturata in orbita: è la strategia del Voyager, non quella di Cassini.`
      : `Missione completata: sonda in orbita stabile attorno a ${target.name} con ${Math.round(res.fuel)} unità di propellente residuo.`;

    board.innerHTML = resultScreen({
      gameId: meta.id, score, max: MAX, title, text,
      details: [
        `Propellente residuo: <strong>${Math.round(res.fuel)}</strong>`,
        `Tempo di volo accumulato: <strong>${res.time} mesi</strong>`,
        `Rischio finale: <strong>${Math.round(res.risk)}</strong> su 60`,
        ...log.map((l) => `${l.step}: ${l.choice}`)
      ]
    });
    onRestart(board, () => onFinish?.('restart'));
  }

  paintStep();
  return () => {};
}
