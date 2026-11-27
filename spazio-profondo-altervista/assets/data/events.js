/**
 * SPAZIO PROFONDO — "Cosa sta succedendo nel cielo?"
 *
 * REGOLA DI PROGETTO: nessun evento scaduto viene mostrato come imminente.
 * La vista calcola lo stato confrontando `date` con la data odierna e
 * sposta automaticamente gli eventi passati in archivio.
 * Ogni voce porta la fonte e la data di verifica del dato.
 */

export const SKY_EVENTS = [
  {
    id: 'geminidi-2026',
    title: 'Massimo delle Geminidi',
    type: 'sciame meteorico',
    date: '2026-12-14T14:00:00Z',
    window: 'notte fra il 13 e il 14 dicembre 2026',
    activeFrom: '2026-12-04',
    activeTo: '2026-12-17',
    visibleFromItaly: true,
    highlight: true,
    summary: 'Lo sciame più ricco dell\'anno, con un massimo ampio e condizioni lunari favorevoli.',
    detail: 'Il picco è previsto il 14 dicembre intorno alle 14:00 UTC, ma il massimo è largo: tassi superiori a 100 meteore all\'ora possono durare 10-12 ore. Nel 2026 la Luna è una falce crescente, con illuminazione intorno al 20%, quindi non disturba. Dall\'emisfero nord il radiante, nei Gemelli, sorge già al tramonto: si può iniziare a osservare la sera del 13.',
    howToSee: 'A occhio nudo, da un luogo buio, con venti minuti di adattamento al buio. Nessuno strumento ottico.',
    numbers: [{ k: 'ZHR previsto', v: 'fino a ≈ 150' }, { k: 'Corpo progenitore', v: 'asteroide 3200 Phaethon' }, { k: 'Illuminazione lunare', v: '≈ 20%' }],
    sourceIds: ['imo-calendar', 'ign-geminids'],
    verifiedOn: '2026-11-23'
  },
  {
    id: 'solstizio-2026',
    title: 'Solstizio di dicembre',
    type: 'evento stagionale',
    date: '2026-12-21T00:00:00Z',
    window: '21 dicembre 2026',
    visibleFromItaly: true,
    summary: 'Il giorno più corto dell\'anno nell\'emisfero nord: inizio dell\'inverno astronomico.',
    detail: 'Il solstizio è il momento in cui il Sole raggiunge la massima declinazione sud. Nell\'emisfero settentrionale corrisponde al giorno con il minor numero di ore di luce, nell\'emisfero australe all\'inizio dell\'estate.',
    howToSee: 'Non è un fenomeno osservabile come evento puntuale: si nota nella durata del giorno e nella posizione del Sole all\'orizzonte.',
    numbers: [],
    sourceIds: ['nasa-skywatching'],
    verifiedOn: '2026-11-23'
  },
  {
    id: 'ursidi-2026',
    title: 'Massimo delle Ursidi',
    type: 'sciame meteorico',
    date: '2026-12-22T00:00:00Z',
    window: 'notte fra il 21 e il 22 dicembre 2026',
    visibleFromItaly: true,
    summary: 'Sciame modesto dalla cometa 8P/Tuttle, quest\'anno penalizzato dalla Luna.',
    detail: 'Le Ursidi hanno un radiante nell\'Orsa Minore e un tasso tipico di circa 10 meteore all\'ora. Nel 2026 il picco cade con la Luna illuminata al 95%: le condizioni di osservazione sono sfavorevoli, e conviene concentrarsi sulle Geminidi la settimana precedente.',
    howToSee: 'A occhio nudo, guardando verso nord, ma con aspettative contenute per via del chiarore lunare.',
    numbers: [{ k: 'ZHR tipico', v: '≈ 10' }, { k: 'Corpo progenitore', v: 'cometa 8P/Tuttle' }, { k: 'Illuminazione lunare', v: '≈ 95%' }],
    sourceIds: ['imo-calendar'],
    verifiedOn: '2026-11-23'
  },
  {
    id: 'quadrantidi-2027',
    title: 'Massimo delle Quadrantidi',
    type: 'sciame meteorico',
    date: '2027-01-04T03:30:00Z',
    window: 'notte fra il 3 e il 4 gennaio 2027',
    activeFrom: '2026-12-28',
    activeTo: '2027-01-12',
    visibleFromItaly: true,
    highlight: true,
    summary: 'Uno dei tre sciami più intensi dell\'anno, ma con un massimo di poche ore.',
    detail: 'Il picco è previsto intorno alle 03:30 UTC del 4 gennaio 2027, con un\'incertezza di circa due ore e mezza indicata dall\'International Meteor Organization. La finestra utile è breve: conviene osservare dalle 3 del mattino fino alla fine della notte buia. La Luna è una falce calante sottile e non disturba. Il radiante si trova nel Boote, vicino al confine con Ercole.',
    howToSee: 'A occhio nudo, dopo mezzanotte, da un luogo buio. Essendo il picco breve, il momento conta più del luogo.',
    numbers: [{ k: 'ZHR previsto', v: '≈ 120' }, { k: 'Corpo progenitore', v: 'asteroide 2003 EH1' }, { k: 'Durata del picco', v: 'poche ore' }],
    sourceIds: ['imo-calendar'],
    verifiedOn: '2026-11-23'
  },
  {
    id: 'eclissi-2027-08-02',
    title: 'Eclissi solare totale',
    type: 'eclissi',
    date: '2027-08-02T10:07:50Z',
    window: '2 agosto 2027',
    visibleFromItaly: true,
    highlight: true,
    summary: 'La totalità più lunga del secolo osservabile da terre emerse: 6 minuti e 23 secondi.',
    detail: 'L\'ombra lunare attraverserà l\'Oceano Atlantico, la Spagna meridionale, il Marocco e il Nord Africa fino all\'Egitto, per concludersi nell\'Oceano Indiano. Il massimo è previsto alle 10:07:50 UTC a circa 25,5° N e 33,2° E, in Egitto, con una durata di 6 minuti e 23 secondi. Dall\'Italia l\'eclissi sarà parziale: in Sicilia la copertura supererà il 90%, e la fascia di totalità passerà sulle acque a poche decine di chilometri dall\'isola, nella zona di Lampedusa.',
    howToSee: 'Solo con filtri solari certificati ISO 12312-2. Mai a occhio nudo, mai con occhiali da sole, mai attraverso strumenti ottici senza filtri specifici.',
    safety: true,
    numbers: [{ k: 'Durata massima', v: '6 min 23 s' }, { k: 'Massimo (UTC)', v: '10:07:50' }, { k: 'Dall\'Italia', v: 'parziale, oltre il 90% in Sicilia' }],
    sourceIds: ['nasa-eclipses', 'eclipsewise-2027'],
    verifiedOn: '2026-11-23'
  },
  {
    id: 'bepi-separazione',
    title: 'Separazione degli orbiter di BepiColombo',
    type: 'missione spaziale',
    date: '2026-12-09T00:00:00Z',
    window: '9-10 dicembre 2026',
    visibleFromItaly: false,
    summary: 'A Mercurio, l\'orbiter europeo MPO rilascia quello giapponese Mio.',
    detail: 'Dopo l\'inserimento in orbita del 21 novembre 2026, le due sonde ancora unite si separeranno per raggiungere orbite diverse: MPO più bassa, per studiare superficie e interno, Mio molto più ellittica, per la magnetosfera. La fase scientifica principale è prevista da aprile 2027.',
    howToSee: 'Non osservabile da Terra: gli aggiornamenti vengono pubblicati dall\'ESA.',
    numbers: [],
    sourceIds: ['esa-bepi-arrival'],
    verifiedOn: '2026-11-23'
  },
  {
    id: 'eclissi-2028-01-26',
    title: 'Eclissi solare parziale',
    type: 'eclissi',
    date: '2028-01-26T00:00:00Z',
    window: '26 gennaio 2028',
    visibleFromItaly: true,
    summary: 'Prossima eclissi solare parziale osservabile dall\'Italia dopo quella del 2027.',
    detail: 'Un\'eclissi anulare il cui percorso principale non interessa l\'Italia, da cui sarà visibile come parziale. Per una nuova eclissi totale osservabile dal territorio italiano i tempi sono molto più lunghi.',
    howToSee: 'Solo con filtri solari certificati ISO 12312-2.',
    safety: true,
    numbers: [],
    sourceIds: ['nasa-eclipses'],
    verifiedOn: '2026-11-23'
  },
  {
    id: 'eclissi-lunare-2028-12-31',
    title: 'Eclissi totale di Luna',
    type: 'eclissi',
    date: '2028-12-31T00:00:00Z',
    window: '31 dicembre 2028',
    visibleFromItaly: true,
    summary: 'Eclissi totale di Luna visibile dall\'Italia: la Luna assume una tonalità rossastra.',
    detail: 'Durante la fase totale la Luna resta visibile, illuminata dalla luce solare filtrata dall\'atmosfera terrestre, che le conferisce il tipico colore ramato. A differenza delle eclissi solari non richiede alcuna protezione e si osserva da tutto l\'emisfero notturno.',
    howToSee: 'A occhio nudo, senza alcun filtro. Un binocolo aiuta ad apprezzare le sfumature di colore.',
    numbers: [],
    sourceIds: ['nasa-eclipses'],
    verifiedOn: '2026-11-23'
  },

  /* ---- Eventi già avvenuti: restano in archivio, mai come imminenti ---- */
  {
    id: 'eclissi-2026-08-12',
    title: 'Eclissi solare totale sull\'Europa',
    type: 'eclissi',
    date: '2026-08-12T00:00:00Z',
    window: '12 agosto 2026',
    visibleFromItaly: true,
    summary: 'La prima eclissi solare totale visibile dall\'Europa continentale dopo 27 anni.',
    detail: 'Il percorso di totalità ha attraversato l\'Artico siberiano, la Groenlandia, l\'Islanda occidentale e la Spagna settentrionale. Dall\'Italia l\'eclissi è stata osservata come parziale.',
    howToSee: 'Evento concluso.',
    numbers: [],
    sourceIds: ['nasa-eclipses'],
    verifiedOn: '2026-11-23'
  },
  {
    id: 'eclissi-lunare-2026-08-28',
    title: 'Eclissi parziale di Luna',
    type: 'eclissi',
    date: '2026-08-28T00:00:00Z',
    window: '27-28 agosto 2026',
    visibleFromItaly: true,
    summary: 'Eclissi parziale profonda di Luna, con buona parte del disco nell\'ombra terrestre.',
    detail: 'Evento concluso: inserito in archivio come riferimento.',
    howToSee: 'Evento concluso.',
    numbers: [],
    sourceIds: ['nasa-eclipses'],
    verifiedOn: '2026-11-23'
  },
  {
    id: 'bepi-moi-2026',
    title: 'BepiColombo in orbita attorno a Mercurio',
    type: 'missione spaziale',
    date: '2026-11-21T18:24:00Z',
    window: '21 novembre 2026',
    visibleFromItaly: false,
    summary: 'Cattura in orbita confermata dall\'ESA: seconda missione della storia a orbitare Mercurio.',
    detail: 'L\'accensione per l\'inserimento in orbita è iniziata alle 18:24 UTC ed è durata 37 minuti. Un problema software ha accorciato il burn, ma l\'ESA ha confermato la cattura e che la sonda è al sicuro.',
    howToSee: 'Evento concluso.',
    numbers: [],
    sourceIds: ['esa-bepi-arrival'],
    verifiedOn: '2026-11-23'
  }
];

/** Stato di un evento rispetto a una data di riferimento. */
export function eventStatus(event, now = new Date()) {
  const when = new Date(event.date);
  const dayMs = 86400000;
  const diff = when - now;
  if (event.activeFrom && event.activeTo) {
    const from = new Date(event.activeFrom + 'T00:00:00Z');
    const to = new Date(event.activeTo + 'T23:59:59Z');
    if (now >= from && now <= to) return { state: 'in-corso', days: Math.round(diff / dayMs) };
  }
  if (diff < -dayMs) return { state: 'passato', days: Math.round(diff / dayMs) };
  if (diff < 0) return { state: 'oggi', days: 0 };
  return { state: 'futuro', days: Math.ceil(diff / dayMs) };
}

/** Eventi futuri o in corso, ordinati per data. */
export function upcomingEvents(now = new Date(), limit = Infinity) {
  return SKY_EVENTS
    .filter((e) => eventStatus(e, now).state !== 'passato')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, limit);
}

/** Eventi conclusi, dal più recente. */
export function pastEvents(now = new Date(), limit = Infinity) {
  return SKY_EVENTS
    .filter((e) => eventStatus(e, now).state === 'passato')
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}

export const eventById = (id) => SKY_EVENTS.find((e) => e.id === id);
