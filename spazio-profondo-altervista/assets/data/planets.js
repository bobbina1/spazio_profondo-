/**
 * SPAZIO PROFONDO — Dati del Sistema Solare
 *
 * I dati fisici (diametri, distanze, periodi, temperature) sono valori
 * standard di riferimento NASA/JPL e non cambiano. I conteggi dei satelliti
 * e lo stato delle missioni cambiano: sono marcati con `asOf` e la fonte.
 *
 * `visual` contiene i token per il rendering procedurale (canvas + CSS):
 * nessuna immagine esterna, nessun problema di licenza.
 */

export const SUN = {
  id: 'sole',
  name: 'Sole',
  kind: 'stella',
  tagline: 'La stella che tiene insieme il Sistema Solare',
  visual: { base: '#ffb648', light: '#fff3c4', dark: '#d2560f', glow: '#ff9d2f', radiusPx: 42 },
  radiusKm: 696340,
  facts: [
    { k: 'Diametro', v: '1.392.700 km', note: '109 volte la Terra' },
    { k: 'Massa', v: '1,989 × 10³⁰ kg', note: '99,86% di tutta la massa del Sistema Solare' },
    { k: 'Temperatura superficiale', v: '≈ 5.500 °C' },
    { k: 'Temperatura del nucleo', v: '≈ 15 milioni di °C' },
    { k: 'Composizione', v: 'Idrogeno ≈ 73%, elio ≈ 25%' },
    { k: 'Età', v: '≈ 4,6 miliardi di anni' },
    { k: 'Rotazione', v: '≈ 25 giorni all\'equatore', note: 'Ruota più lentamente ai poli: è un corpo di plasma' }
  ],
  intro: 'Il Sole è una stella di sequenza principale di tipo G: una sfera di plasma tenuta insieme dalla propria gravità, in cui ogni secondo circa 600 milioni di tonnellate di idrogeno si fondono in elio. L\'energia prodotta nel nucleo impiega decine di migliaia di anni per raggiungere la superficie, e poi solo 8 minuti e 20 secondi per arrivare sulla Terra.',
  deep: [
    { h: 'Struttura interna', p: 'Il nucleo occupa circa un quarto del raggio e ospita la fusione nucleare. Attorno, la zona radiativa trasporta energia per radiazione, mentre la zona convettiva la muove con enormi celle di plasma ascendente e discendente, visibili in superficie come granulazione.' },
    { h: 'Atmosfera solare', p: 'La fotosfera è lo strato che vediamo. Sopra si trovano la cromosfera e la corona, quest\'ultima paradossalmente molto più calda (oltre un milione di gradi) della superficie. Il motivo di questo riscaldamento è ancora una questione aperta: è uno dei problemi che la sonda Parker Solar Probe è stata costruita per affrontare.' },
    { h: 'Attività e ciclo undecennale', p: 'Macchie solari, brillamenti ed espulsioni di massa coronale seguono un ciclo di circa 11 anni, durante il quale il campo magnetico solare si riorganizza e si inverte. Le espulsioni dirette verso la Terra generano tempeste geomagnetiche e aurore.' }
  ],
  curiosities: [
    'Il Sole contiene il 99,86% della massa del Sistema Solare: tutto il resto, pianeti compresi, è il residuo.',
    'La corona solare è più calda della superficie di oltre un fattore 200. Il perché è ancora oggetto di studio.',
    'Non ha una superficie solida: ciò che chiamiamo superficie è lo strato oltre il quale il plasma diventa trasparente alla luce.'
  ],
  sourceIds: ['nasa-sun', 'nasa-parker']
};

export const PLANETS = [
  {
    id: 'mercurio', name: 'Mercurio', order: 1, kind: 'pianeta terrestre',
    tagline: 'Il mondo delle escursioni termiche estreme',
    visual: {
      base: '#8c8279', light: '#d8d2c8', dark: '#2e2a26', radiusPx: 7,
      texture: 'radial-gradient(circle at 62% 38%, rgba(0,0,0,.34) 0 7%, transparent 8%), radial-gradient(circle at 28% 66%, rgba(0,0,0,.3) 0 5%, transparent 6%), radial-gradient(circle at 76% 72%, rgba(0,0,0,.26) 0 4%, transparent 5%)',
      textureOpacity: 0.9
    },
    orbit: { au: 0.387, periodDays: 87.97, eccentricity: 0.206, inclinationDeg: 7.0 },
    diameterKm: 4879, radiusKm: 2439.7,
    distanceKmText: '57,9 milioni di km',
    rotation: { hours: 1407.6, text: '58 giorni e 15 ore', retrograde: false, solarDayText: '176 giorni terrestri' },
    axialTiltDeg: 0.03,
    temp: { meanC: 167, text: 'da −180 °C a +430 °C' },
    atmosphere: 'Praticamente assente: una tenue esosfera di ossigeno, sodio, idrogeno, elio e potassio, continuamente rinnovata dal vento solare.',
    composition: 'Roccioso e differenziato, con un nucleo metallico che occupa circa l\'85% del raggio: la frazione più grande fra i pianeti del Sistema Solare.',
    moons: { count: 0, named: [] },
    features: [
      'Il bacino Caloris, un cratere da impatto di circa 1.550 km di diametro.',
      'Scarpate compressive (rupes) lunghe centinaia di chilometri: la crosta si è contratta mentre il pianeta si raffreddava.',
      'Ghiaccio d\'acqua nei crateri in ombra permanente ai poli, dove la luce solare non arriva mai.'
    ],
    curiosities: [
      'Un giorno solare su Mercurio dura due anni mercuriani: il pianeta compie tre rotazioni ogni due orbite (risonanza 3:2).',
      'Non è il pianeta più caldo, nonostante sia il più vicino al Sole: senza atmosfera non trattiene il calore, e Venere lo supera largamente.',
      'È il pianeta che in media si trova più vicino alla Terra, perché resta sempre nelle vicinanze del Sole.'
    ],
    missionIds: ['bepicolombo'],
    missionsText: 'Mariner 10 (1974-75, tre sorvoli), MESSENGER (in orbita 2011-2015), BepiColombo (ESA/JAXA, in orbita dal 21 novembre 2026).',
    sourceIds: ['nasa-mercury', 'esa-bepi']
  },
  {
    id: 'venere', name: 'Venere', order: 2, kind: 'pianeta terrestre',
    tagline: 'Un effetto serra fuori controllo',
    visual: {
      base: '#d9a85f', light: '#fbe7bd', dark: '#6b4a1c', radiusPx: 11,
      texture: 'repeating-linear-gradient(176deg, rgba(255,245,220,.30) 0 6%, rgba(190,150,90,.22) 6% 13%)',
      textureOpacity: 0.75
    },
    orbit: { au: 0.723, periodDays: 224.7, eccentricity: 0.007, inclinationDeg: 3.4 },
    diameterKm: 12104, radiusKm: 6051.8,
    distanceKmText: '108,2 milioni di km',
    rotation: { hours: 5832.5, text: '243 giorni terrestri', retrograde: true, solarDayText: '117 giorni terrestri' },
    axialTiltDeg: 177.4,
    temp: { meanC: 464, text: '≈ 464 °C, quasi uniforme su tutto il pianeta' },
    atmosphere: 'Densissima: anidride carbonica al 96,5%, azoto al 3,5%, con nubi di acido solforico. La pressione al suolo è di circa 92 bar, come 900 metri di profondità marina sulla Terra.',
    composition: 'Roccioso, di dimensioni e densità simili alla Terra, con una superficie vulcanica rimodellata in tempi geologicamente recenti.',
    moons: { count: 0, named: [] },
    features: [
      'Maxwell Montes, rilievo che supera gli 11 km di altezza.',
      'Oltre 1.600 strutture vulcaniche maggiori: è il pianeta con più vulcani del Sistema Solare.',
      'Una superficie giovane, rimodellata da estesi eventi vulcanici.'
    ],
    curiosities: [
      'Ruota in senso opposto a quasi tutti gli altri pianeti e così lentamente che un suo giorno dura più del suo anno.',
      'È il pianeta più caldo del Sistema Solare: l\'effetto serra della sua atmosfera supera di gran lunga la maggiore vicinanza al Sole di Mercurio.',
      'Le sonde sovietiche Venera sopravvissero al massimo poco più di due ore sulla superficie.'
    ],
    missionIds: [],
    missionsText: 'Serie Venera (URSS, 1961-1984), Magellan (NASA, mappatura radar 1990-94), Venus Express (ESA, 2006-2014), Akatsuki (JAXA, dal 2015). In sviluppo: DAVINCI e VERITAS (NASA), EnVision (ESA).',
    sourceIds: ['nasa-venus']
  },
  {
    id: 'terra', name: 'Terra', order: 3, kind: 'pianeta terrestre',
    tagline: 'L\'unico pianeta dove sappiamo che esiste la vita',
    visual: {
      base: '#2f7ad6', light: '#bfe4ff', dark: '#06203f', radiusPx: 11.5,
      texture: 'radial-gradient(ellipse 30% 18% at 30% 38%, rgba(96,186,120,.85), transparent 70%), radial-gradient(ellipse 24% 14% at 66% 62%, rgba(96,186,120,.8), transparent 70%), radial-gradient(ellipse 18% 10% at 48% 80%, rgba(240,248,255,.6), transparent 70%)',
      textureOpacity: 0.95
    },
    orbit: { au: 1.0, periodDays: 365.26, eccentricity: 0.017, inclinationDeg: 0 },
    diameterKm: 12742, radiusKm: 6371,
    distanceKmText: '149,6 milioni di km (1 unità astronomica)',
    rotation: { hours: 23.934, text: '23 ore e 56 minuti', retrograde: false, solarDayText: '24 ore' },
    axialTiltDeg: 23.44,
    temp: { meanC: 15, text: 'media ≈ 15 °C' },
    atmosphere: 'Azoto 78%, ossigeno 21%, argon quasi 1%, più vapore d\'acqua e anidride carbonica in tracce. Protegge la superficie dalle radiazioni e permette l\'acqua liquida.',
    composition: 'Nucleo di ferro e nichel (interno solido, esterno liquido), mantello roccioso, crosta sottile divisa in placche in movimento.',
    moons: { count: 1, named: ['Luna'] },
    features: [
      'Tettonica a placche attiva: è l\'unico pianeta in cui ne abbiamo conferma.',
      'Un campo magnetico globale generato dal nucleo esterno liquido, che devia il vento solare.',
      'Acqua liquida stabile in superficie su circa il 71% del pianeta.'
    ],
    curiosities: [
      'L\'inclinazione dell\'asse di 23,44° è la causa delle stagioni, non la distanza dal Sole.',
      'La Luna rallenta la rotazione terrestre: i giorni si allungano di circa 1,8 millisecondi per secolo.',
      'Vista da Saturno, la Terra appare come un singolo punto di luce: è la celebre immagine "Pale Blue Dot" ripresa dal Voyager 1 nel 1990.'
    ],
    missionIds: ['hubble', 'jwst'],
    missionsText: 'Migliaia di satelliti di osservazione terrestre, dalla serie Landsat al programma europeo Copernicus.',
    sourceIds: ['nasa-earth']
  },
  {
    id: 'marte', name: 'Marte', order: 4, kind: 'pianeta terrestre',
    tagline: 'Il mondo più esplorato dopo la Terra',
    visual: {
      base: '#c1552f', light: '#f6c5a4', dark: '#45170c', radiusPx: 8,
      texture: 'radial-gradient(ellipse 40% 22% at 50% 14%, rgba(255,255,255,.55), transparent 70%), radial-gradient(ellipse 34% 18% at 50% 88%, rgba(255,255,255,.45), transparent 70%), radial-gradient(circle at 36% 54%, rgba(0,0,0,.32) 0 12%, transparent 13%)',
      textureOpacity: 0.85
    },
    orbit: { au: 1.524, periodDays: 686.98, eccentricity: 0.093, inclinationDeg: 1.85 },
    diameterKm: 6779, radiusKm: 3389.5,
    distanceKmText: '227,9 milioni di km',
    rotation: { hours: 24.623, text: '24 ore e 37 minuti', retrograde: false, solarDayText: '24 ore e 39 minuti (un "sol")' },
    axialTiltDeg: 25.19,
    temp: { meanC: -63, text: 'da −143 °C ai poli in inverno a +35 °C all\'equatore d\'estate' },
    atmosphere: 'Rarefatta: anidride carbonica al 95%, con azoto e argon. La pressione al suolo è circa lo 0,6% di quella terrestre, troppo bassa perché l\'acqua resti liquida a lungo in superficie.',
    composition: 'Roccioso, ricco di ossidi di ferro che gli danno il colore rosso. Nucleo di ferro, zolfo e nichel, parzialmente liquido.',
    moons: { count: 2, named: ['Phobos', 'Deimos'] },
    features: [
      'Olympus Mons, il vulcano più alto del Sistema Solare: circa 22 km di altezza.',
      'Valles Marineris, un sistema di canyon lungo oltre 4.000 km.',
      'Calotte polari di ghiaccio d\'acqua e anidride carbonica, che crescono e si ritirano con le stagioni.',
      'Reti di antichi canali e minerali idrati: segni che acqua liquida scorreva in superficie miliardi di anni fa.'
    ],
    curiosities: [
      'Un anno marziano dura 687 giorni terrestri, quasi il doppio del nostro.',
      'Le sue tempeste di polvere possono avvolgere il pianeta intero per settimane.',
      'Phobos si avvicina lentamente a Marte: fra alcune decine di milioni di anni potrebbe frammentarsi e formare un anello.'
    ],
    missionIds: ['perseverance', 'curiosity'],
    missionsText: 'Viking 1 e 2 (1976), Mars Pathfinder (1997), Spirit e Opportunity (2004), Curiosity (dal 2012), Perseverance con l\'elicottero Ingenuity (dal 2021), più gli orbiter Mars Reconnaissance Orbiter, MAVEN, Mars Express, ExoMars TGO e Tianwen-1.',
    sourceIds: ['nasa-mars', 'nasa-perseverance']
  },
  {
    id: 'giove', name: 'Giove', order: 5, kind: 'gigante gassoso',
    tagline: 'Il gigante che ha plasmato il Sistema Solare',
    visual: {
      base: '#c9a177', light: '#f4dfc2', dark: '#5a3a1f', radiusPx: 26,
      texture: 'repeating-linear-gradient(178deg, rgba(247,230,205,.55) 0 7%, rgba(150,102,60,.5) 7% 12%, rgba(214,180,140,.45) 12% 19%, rgba(120,78,46,.42) 19% 25%), radial-gradient(ellipse 16% 9% at 68% 62%, rgba(206,86,52,.95), transparent 72%)',
      textureOpacity: 0.95
    },
    orbit: { au: 5.204, periodDays: 4332.59, eccentricity: 0.049, inclinationDeg: 1.3 },
    diameterKm: 142984, radiusKm: 69911,
    distanceKmText: '778,5 milioni di km',
    rotation: { hours: 9.925, text: '9 ore e 56 minuti', retrograde: false, solarDayText: '9 ore e 56 minuti' },
    axialTiltDeg: 3.13,
    temp: { meanC: -145, text: '≈ −145 °C alla cima delle nubi' },
    atmosphere: 'Idrogeno (≈ 90%) ed elio (≈ 10%) in numero di molecole, con tracce di metano, ammoniaca e vapore d\'acqua. Non esiste una superficie: scendendo, il gas diventa progressivamente più denso.',
    composition: 'Gigante gassoso senza superficie solida. All\'interno, l\'idrogeno viene compresso fino allo stato metallico; al centro potrebbe trovarsi un nucleo "diluito" di elementi più pesanti.',
    moons: { count: 101, asOf: '16 marzo 2026', named: ['Io', 'Europa', 'Ganimede', 'Callisto'] },
    features: [
      'La Grande Macchia Rossa: una tempesta anticiclonica più larga della Terra, osservata da oltre un secolo e in lenta contrazione.',
      'I quattro satelliti galileiani, scoperti da Galileo nel 1610: Io vulcanicamente attivo, Europa con un oceano sotto il ghiaccio, Ganimede più grande di Mercurio, Callisto antichissimo e craterizzato.',
      'Il campo magnetico più intenso fra i pianeti e aurore polari permanenti.'
    ],
    curiosities: [
      'Ha una massa 2,5 volte superiore a quella di tutti gli altri pianeti sommati.',
      'Ruota così rapidamente da risultare visibilmente schiacciato ai poli.',
      'Il conteggio dei suoi satelliti cresce di anno in anno: i piccoli corpi irregolari vengono scoperti man mano che migliorano le ricerche.'
    ],
    missionIds: ['voyager'],
    missionsText: 'Pioneer 10 e 11, Voyager 1 e 2, Galileo (in orbita 1995-2003), Cassini e New Horizons (sorvoli), Juno (in orbita dal 2016). In viaggio: JUICE (ESA) ed Europa Clipper (NASA).',
    sourceIds: ['nasa-jupiter', 'mpc-moons']
  },
  {
    id: 'saturno', name: 'Saturno', order: 6, kind: 'gigante gassoso',
    tagline: 'Il sistema di anelli più spettacolare che conosciamo',
    visual: {
      base: '#d6b887', light: '#f8ecd0', dark: '#6b522c', radiusPx: 22,
      texture: 'repeating-linear-gradient(179deg, rgba(250,238,210,.5) 0 9%, rgba(188,156,110,.42) 9% 17%)',
      textureOpacity: 0.8,
      ring: { color: '#e4d2a8', tiltDeg: -17, innerScale: 1.35, outerScale: 2.25 }
    },
    orbit: { au: 9.583, periodDays: 10759.22, eccentricity: 0.057, inclinationDeg: 2.49 },
    diameterKm: 120536, radiusKm: 58232,
    distanceKmText: '1,434 miliardi di km',
    rotation: { hours: 10.56, text: '≈ 10 ore e 34 minuti', retrograde: false, solarDayText: '≈ 10 ore e 34 minuti' },
    axialTiltDeg: 26.73,
    temp: { meanC: -178, text: '≈ −178 °C alla cima delle nubi' },
    atmosphere: 'Idrogeno ed elio, con tracce di metano e ammoniaca. Venti equatoriali che superano i 1.600 km/h.',
    composition: 'Gigante gassoso. La sua densità media è di 0,687 g/cm³: è l\'unico pianeta meno denso dell\'acqua.',
    moons: { count: 285, asOf: '16 marzo 2026', named: ['Titano', 'Encelado', 'Mimas', 'Giapeto', 'Rea', 'Dione'] },
    features: [
      'Anelli di miliardi di frammenti di ghiaccio d\'acqua e roccia, dal micrometro a diversi metri, spessi in alcuni punti solo decine di metri.',
      'Titano: l\'unico satellite con un\'atmosfera densa, e con laghi e fiumi di metano ed etano liquidi.',
      'Encelado: getti di vapore d\'acqua dal polo sud, alimentati da un oceano sotterraneo.',
      'Un esagono atmosferico stabile al polo nord, largo quasi 30.000 km.'
    ],
    curiosities: [
      'Gli anelli sono relativamente giovani e stanno lentamente ricadendo sul pianeta.',
      'Se esistesse una vasca abbastanza grande, Saturno vi galleggerebbe.',
      'Ogni circa 15 anni gli anelli si presentano di taglio e diventano quasi invisibili dalla Terra.'
    ],
    missionIds: ['cassini', 'voyager'],
    missionsText: 'Pioneer 11 (1979), Voyager 1 e 2 (1980-81), Cassini-Huygens (in orbita 2004-2017, con l\'atterraggio di Huygens su Titano nel 2005). Approvata: Dragonfly, un velivolo a rotori per Titano.',
    sourceIds: ['nasa-saturn', 'nasa-cassini', 'mpc-moons']
  },
  {
    id: 'urano', name: 'Urano', order: 7, kind: 'gigante ghiacciato',
    tagline: 'Il pianeta che ruota coricato su un fianco',
    visual: {
      base: '#8ed3e0', light: '#dcf6fb', dark: '#2a6b7c', radiusPx: 15,
      texture: 'repeating-linear-gradient(92deg, rgba(222,248,252,.28) 0 14%, rgba(110,180,196,.24) 14% 28%)',
      textureOpacity: 0.6,
      ring: { color: '#9fd4e0', tiltDeg: 82, innerScale: 1.5, outerScale: 2.0 }
    },
    orbit: { au: 19.191, periodDays: 30688.5, eccentricity: 0.047, inclinationDeg: 0.77 },
    diameterKm: 51118, radiusKm: 25362,
    distanceKmText: '2,871 miliardi di km',
    rotation: { hours: 17.24, text: '17 ore e 14 minuti', retrograde: true, solarDayText: '17 ore e 14 minuti' },
    axialTiltDeg: 97.77,
    temp: { meanC: -195, text: 'minima registrata ≈ −224 °C: la più bassa fra i pianeti' },
    atmosphere: 'Idrogeno ed elio con circa il 2% di metano, che assorbe la luce rossa e dà al pianeta il colore verde-azzurro.',
    composition: 'Gigante ghiacciato: sotto l\'atmosfera, un mantello di acqua, ammoniaca e metano ad alta pressione, in uno stato fluido e caldo.',
    moons: { count: 28, named: ['Titania', 'Oberon', 'Umbriel', 'Ariel', 'Miranda'] },
    features: [
      'Un asse inclinato di quasi 98°: ruota praticamente su un fianco, probabilmente dopo un impatto gigantesco.',
      'Stagioni che durano circa 21 anni terrestri ciascuna, con poli al buio per decenni.',
      'Un sistema di 13 anelli stretti e scuri.',
      'Miranda, con la scarpata Verona Rupes: una parete alta fino a circa 20 km.'
    ],
    curiosities: [
      'È stato il primo pianeta scoperto con il telescopio, da William Herschel nel 1781.',
      'Una sola sonda lo ha visitato: il Voyager 2, nel gennaio 1986.',
      'Emette meno calore interno di quanto ci si aspetterebbe, e non sappiamo ancora perché.'
    ],
    missionIds: ['voyager'],
    missionsText: 'Soltanto il sorvolo del Voyager 2 nel 1986. Una missione orbitale dedicata è la priorità indicata dall\'ultima Planetary Science Decadal Survey statunitense.',
    sourceIds: ['nasa-uranus']
  },
  {
    id: 'nettuno', name: 'Nettuno', order: 8, kind: 'gigante ghiacciato',
    tagline: 'Venti supersonici al confine del Sistema Solare',
    visual: {
      base: '#3b6fd4', light: '#aecbff', dark: '#10224f', radiusPx: 14.5,
      texture: 'repeating-linear-gradient(176deg, rgba(190,216,255,.26) 0 12%, rgba(40,80,170,.3) 12% 24%), radial-gradient(ellipse 14% 8% at 36% 58%, rgba(10,25,60,.9), transparent 70%)',
      textureOpacity: 0.7
    },
    orbit: { au: 30.07, periodDays: 60195, eccentricity: 0.009, inclinationDeg: 1.77 },
    diameterKm: 49528, radiusKm: 24622,
    distanceKmText: '4,495 miliardi di km',
    rotation: { hours: 16.11, text: '16 ore e 6 minuti', retrograde: false, solarDayText: '16 ore e 6 minuti' },
    axialTiltDeg: 28.32,
    temp: { meanC: -201, text: '≈ −214 °C alla cima delle nubi' },
    atmosphere: 'Idrogeno, elio e metano. Le nubi più alte sono di metano ghiacciato; più in basso si trovano nubi di solfuro di idrogeno e ammoniaca.',
    composition: 'Gigante ghiacciato simile a Urano, ma più denso e con una sorgente di calore interno più attiva.',
    moons: { count: 16, named: ['Tritone', 'Nereide', 'Proteo'] },
    features: [
      'I venti più veloci del Sistema Solare: fino a circa 2.100 km/h.',
      'Tritone, che orbita in senso retrogrado: è quasi certamente un oggetto della fascia di Kuiper catturato.',
      'Grandi macchie scure, tempeste che appaiono e svaniscono in pochi anni.',
      'Geyser di azoto sulla superficie di Tritone, osservati dal Voyager 2.'
    ],
    curiosities: [
      'È stato scoperto nel 1846 grazie al calcolo: le irregolarità nell\'orbita di Urano indicavano la presenza di un pianeta non ancora osservato.',
      'Dalla scoperta ha completato una sola orbita intorno al Sole, nel 2011.',
      'È più caldo del previsto nel suo interno: emette più energia di quanta ne riceva dal Sole.'
    ],
    missionIds: ['voyager'],
    missionsText: 'Soltanto il sorvolo del Voyager 2 nell\'agosto 1989, l\'ultima tappa planetaria della missione.',
    sourceIds: ['nasa-neptune']
  }
];

/** Altri corpi del Sistema Solare: fasce, pianeti nani, comete. */
export const SMALL_BODIES = [
  {
    id: 'fascia-asteroidi', name: 'Fascia degli asteroidi',
    badge: 'fra Marte e Giove',
    visual: { base: '#9a9188', light: '#d8d2c8', dark: '#2b2724' },
    intro: 'Fra le orbite di Marte e Giove, da circa 2,2 a 3,2 unità astronomiche, orbitano milioni di corpi rocciosi. Non sono i resti di un pianeta distrutto: sono materiale che la gravità di Giove ha impedito di aggregarsi.',
    facts: [
      { k: 'Corpi catalogati', v: 'oltre 1,3 milioni' },
      { k: 'Massa totale', v: '≈ 3% della massa della Luna' },
      { k: 'Oggetto maggiore', v: 'Cerere, 940 km di diametro' }
    ],
    points: [
      'Nonostante il numero, la fascia è quasi vuota: le sonde la attraversano senza rischi particolari.',
      'Vesta e Cerere sono stati studiati da vicino dalla missione Dawn (NASA) fra il 2011 e il 2018.',
      'Alcuni asteroidi hanno satelliti propri, e la missione DART nel 2022 ha modificato l\'orbita del piccolo Dimorphos per testare la difesa planetaria.'
    ],
    sourceIds: ['nasa-asteroids']
  },
  {
    id: 'pianeti-nani', name: 'Pianeti nani',
    badge: '5 riconosciuti dall\'IAU',
    visual: { base: '#b9a7c7', light: '#eee3f5', dark: '#3a2d47' },
    intro: 'Un pianeta nano orbita intorno al Sole, ha massa sufficiente per assumere una forma quasi sferica, ma non ha "ripulito" la propria fascia orbitale dagli altri corpi. L\'Unione Astronomica Internazionale ne riconosce formalmente cinque.',
    facts: [
      { k: 'Riconosciuti', v: 'Cerere, Plutone, Haumea, Makemake, Eris' },
      { k: 'Plutone, diametro', v: '2.377 km' },
      { k: 'Satelliti di Plutone', v: '5, il maggiore è Caronte' }
    ],
    points: [
      'Plutone è stato riclassificato nel 2006, dopo la scoperta di numerosi corpi simili nella fascia di Kuiper.',
      'La sonda New Horizons ha rivelato nel 2015 un Plutone geologicamente attivo, con ghiacciai di azoto e montagne di ghiaccio d\'acqua.',
      'Molti altri candidati, come Gonggong, Quaoar e Sedna, attendono una classificazione formale.'
    ],
    sourceIds: ['nasa-dwarf', 'nasa-newhorizons']
  },
  {
    id: 'comete', name: 'Comete',
    badge: 'ghiaccio, polvere e roccia',
    visual: { base: '#8fe3d8', light: '#dffbf7', dark: '#1d4d49' },
    intro: 'Le comete sono corpi di ghiaccio, polvere e roccia che si formano nelle regioni esterne del Sistema Solare. Avvicinandosi al Sole, i ghiacci sublimano e generano una chioma e una o più code, che puntano sempre nella direzione opposta al Sole.',
    facts: [
      { k: 'Nucleo tipico', v: 'da poche centinaia di metri a decine di km' },
      { k: 'Code', v: 'una di polveri e una di ioni' },
      { k: 'Origine', v: 'fascia di Kuiper e nube di Oort' }
    ],
    points: [
      'La missione Rosetta (ESA) ha orbitato intorno alla cometa 67P/Churyumov-Gerasimenko e nel 2014 ha rilasciato il lander Philae sulla sua superficie.',
      'Le comete di lungo periodo provengono dalla nube di Oort, una regione sferica che si estende fino a decine di migliaia di unità astronomiche.',
      'Molti sciami meteorici sono i detriti lasciati da una cometa lungo la sua orbita: le Ursidi, per esempio, derivano dalla cometa 8P/Tuttle.'
    ],
    sourceIds: ['nasa-comets', 'esa-rosetta']
  },
  {
    id: 'meteoroidi', name: 'Meteoroidi, meteore e meteoriti',
    badge: 'tre nomi, tre stadi',
    visual: { base: '#ffc46b', light: '#fff0d2', dark: '#6b4512' },
    intro: 'Un meteoroide è un frammento di roccia o metallo nello spazio. Quando entra nell\'atmosfera e si incendia per attrito produce una meteora, la "stella cadente". Se un frammento raggiunge il suolo, si chiama meteorite.',
    facts: [
      { k: 'Velocità d\'ingresso', v: 'da 11 a 72 km/s' },
      { k: 'Quota di combustione', v: 'in genere fra 75 e 100 km' },
      { k: 'Materia che cade ogni giorno', v: 'decine di tonnellate, quasi tutta polvere' }
    ],
    points: [
      'Le Geminidi sono uno dei pochi sciami generati da un asteroide, 3200 Phaethon, e non da una cometa.',
      'I meteoriti sono campioni gratuiti di altri corpi: alcuni provengono da Marte e dalla Luna.',
      'Un bolide è una meteora particolarmente luminosa, più brillante del pianeta Venere.'
    ],
    sourceIds: ['nasa-meteors']
  },
  {
    id: 'fascia-kuiper', name: 'Fascia di Kuiper',
    badge: 'oltre l\'orbita di Nettuno',
    visual: { base: '#6f86c4', light: '#cdd9f6', dark: '#1b2443' },
    intro: 'Oltre Nettuno, fra circa 30 e 50 unità astronomiche, si estende una fascia di corpi ghiacciati rimasti dalla formazione del Sistema Solare. È la regione di origine di molte comete di breve periodo e la casa di Plutone.',
    facts: [
      { k: 'Estensione principale', v: 'da 30 a 50 unità astronomiche' },
      { k: 'Oggetti noti', v: 'oltre 3.000 catalogati, molti di più previsti' },
      { k: 'Visitata da', v: 'New Horizons (Plutone 2015, Arrokoth 2019)' }
    ],
    points: [
      'Arrokoth, sorvolato il 1° gennaio 2019, ha la forma di due lobi fusi: un corpo primordiale mai alterato.',
      'I dati del contatore di polveri di New Horizons mostrano che la densità di polvere non cala come previsto oltre il cosiddetto "Kuiper Cliff": la fascia potrebbe estendersi più del previsto.',
      'Non va confusa con la nube di Oort, molto più esterna e di forma sferica.'
    ],
    sourceIds: ['nasa-kuiper', 'nasa-newhorizons']
  }
];

export const planetById = (id) => PLANETS.find((p) => p.id === id);
export const bodyById = (id) => SMALL_BODIES.find((b) => b.id === id);
