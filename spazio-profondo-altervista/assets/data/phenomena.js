/**
 * SPAZIO PROFONDO — Fenomeni astronomici e astrofisici
 * `sim` indica quale simulazione animata disegnare (vedi fx/simulations.js).
 * `epistemic` è obbligatorio: fatto accertato, ipotesi o questione aperta.
 */

export const PHENOMENA = [
  {
    id: 'eclissi',
    name: 'Eclissi',
    order: 1,
    kind: 'geometria orbitale',
    epistemic: 'fenomeno accertato e prevedibile con precisione al secondo',
    sim: 'eclipse-solar',
    tagline: 'Tre corpi allineati, pochi minuti di buio',
    intro: 'Un\'eclissi si verifica quando tre corpi si allineano e uno proietta la propria ombra su un altro. Nelle eclissi di Sole la Luna copre il disco solare; in quelle di Luna è la Terra a proiettare la propria ombra sul satellite.',
    how: 'Le eclissi solari totali sono possibili grazie a una coincidenza: il Sole è circa 400 volte più grande della Luna, ma anche circa 400 volte più distante, quindi i due dischi appaiono quasi uguali. Poiché l\'orbita lunare è ellittica, la dimensione apparente della Luna varia: quando è più lontana resta visibile un anello luminoso e l\'eclissi è anulare.',
    observe: 'Mai guardare il Sole direttamente, nemmeno durante un\'eclissi parziale, e mai con occhiali da sole o filtri improvvisati: servono filtri solari certificati ISO 12312-2, o l\'osservazione per proiezione. Solo durante la fase di totalità completa, e soltanto in quella, il disco solare è interamente coperto.',
    safety: true,
    points: [
      'La totalità dura al massimo poco più di sette minuti, in genere molto meno.',
      'La fascia di totalità è larga in genere 100-250 km: fuori da essa l\'eclissi appare parziale.',
      'Durante la totalità diventa visibile la corona solare, altrimenti nascosta dalla luce del disco.',
      'Le eclissi si ripetono in cicli di circa 18 anni e 11 giorni, detti saros.'
    ],
    relatedEvents: ['eclissi-2027-08-02'],
    sourceIds: ['nasa-eclipses'],
    linkTopic: null
  },
  {
    id: 'piogge-meteoriche',
    name: 'Piogge meteoriche',
    order: 2,
    kind: 'detriti di comete e asteroidi',
    epistemic: 'fenomeno accertato; l\'intensità esatta di ogni anno è una previsione',
    sim: 'meteors',
    tagline: 'La Terra attraversa una scia di detriti',
    intro: 'Ogni anno la Terra incrocia le orbite di comete e asteroidi, attraversando le scie di polvere che hanno lasciato. I frammenti entrano in atmosfera a decine di chilometri al secondo e si incendiano per compressione dell\'aria davanti a loro, generando le scie luminose che chiamiamo stelle cadenti.',
    how: 'Tutte le meteore di uno sciame sembrano provenire da un unico punto del cielo, il radiante: è un effetto di prospettiva, perché i frammenti viaggiano su traiettorie parallele. Lo sciame prende il nome dalla costellazione in cui si trova il radiante. Il numero di meteore visibili per ora in condizioni ideali si chiama ZHR.',
    observe: 'Serve un cielo buio, lontano dalle luci cittadine, e almeno venti minuti perché l\'occhio si adatti. Non occorrono strumenti: binocoli e telescopi riducono il campo visivo e peggiorano le cose. La fase lunare conta più del telescopio: una luna piena cancella la maggior parte delle meteore debolissime.',
    points: [
      'Le Geminidi derivano da un asteroide, 3200 Phaethon, e non da una cometa: è un caso raro.',
      'Le Ursidi provengono dalla cometa 8P/Tuttle, le Quadrantidi dall\'asteroide 2003 EH1.',
      'Gran parte dei frammenti ha la dimensione di un granello di sabbia: si consuma fra 75 e 100 km di quota.',
      'Il valore ZHR è un dato teorico in condizioni perfette: quello che si vede davvero è di norma inferiore.'
    ],
    relatedEvents: ['geminidi-2026', 'quadrantidi-2027'],
    sourceIds: ['nasa-meteors', 'imo-calendar'],
    linkTopic: null
  },
  {
    id: 'congiunzioni',
    name: 'Congiunzioni planetarie',
    order: 3,
    kind: 'prospettiva',
    epistemic: 'fenomeno accertato e calcolabile con precisione',
    sim: 'conjunction',
    tagline: 'Due pianeti vicini in cielo, lontanissimi nello spazio',
    intro: 'Una congiunzione si verifica quando due o più corpi appaiono vicini nel cielo visto dalla Terra. È un allineamento apparente: i pianeti coinvolti restano separati da centinaia di milioni di chilometri.',
    how: 'I pianeti si muovono lungo una fascia ristretta del cielo, vicina al piano dell\'eclittica, perché le loro orbite sono quasi complanari. Questo fa sì che si incontrino periodicamente nella stessa direzione. Quando la Luna copre un pianeta si parla invece di occultazione.',
    observe: 'Le congiunzioni più spettacolari coinvolgono Venere e Giove, i due pianeti più luminosi, e si osservano al crepuscolo a occhio nudo. Un binocolo basta per vedere nello stesso campo i satelliti di Giove.',
    points: [
      'Non esiste alcun effetto fisico sulla Terra: è solo un fatto di prospettiva.',
      'Le "grandi congiunzioni" fra Giove e Saturno si verificano circa ogni vent\'anni.',
      'Tre o più pianeti nella stessa regione di cielo vengono spesso chiamati impropriamente "allineamento": i corpi non sono allineati nello spazio.'
    ],
    relatedEvents: [],
    sourceIds: ['nasa-skywatching'],
    linkTopic: null
  },
  {
    id: 'tempeste-solari',
    name: 'Tempeste solari',
    order: 4,
    kind: 'attività solare',
    epistemic: 'fenomeno accertato; la previsione a breve termine resta limitata',
    sim: 'solar-storm',
    tagline: 'Quando il Sole lancia un miliardo di tonnellate di plasma',
    intro: 'Il campo magnetico solare si attorciglia e accumula energia, che può rilasciarsi improvvisamente in brillamenti, lampi di radiazione, o in espulsioni di massa coronale: nubi di plasma magnetizzato che viaggiano nel Sistema Solare a milioni di chilometri orari.',
    how: 'L\'energia viene liberata dalla riconnessione magnetica, un processo in cui linee di campo di polarità opposta si riorganizzano bruscamente. La radiazione di un brillamento raggiunge la Terra in otto minuti; una nube di plasma impiega da uno a tre giorni. Se il suo campo magnetico ha l\'orientamento giusto, si accoppia con la magnetosfera terrestre e genera una tempesta geomagnetica.',
    observe: 'Gli effetti visibili sono le aurore, che durante le tempeste intense scendono a latitudini insolitamente basse. Osservare il Sole richiede sempre strumentazione con filtri specifici.',
    points: [
      'L\'attività segue un ciclo di circa 11 anni, al termine del quale la polarità del campo magnetico solare si inverte.',
      'L\'evento di Carrington del 1859 produsse aurore visibili ai Caraibi e mandò in tilt le linee telegrafiche.',
      'Le tempeste intense possono disturbare le reti elettriche, i satelliti e i segnali di navigazione: per questo esistono servizi di meteorologia spaziale.',
      'Parker Solar Probe attraversa la corona proprio per migliorare la comprensione di questi fenomeni.'
    ],
    relatedEvents: [],
    sourceIds: ['nasa-solarstorms', 'nasa-parker'],
    linkTopic: null
  },
  {
    id: 'aurore',
    name: 'Aurore polari',
    order: 5,
    kind: 'interazione atmosfera-magnetosfera',
    epistemic: 'fenomeno accertato, meccanismo compreso nelle sue linee principali',
    sim: 'aurora',
    tagline: 'L\'atmosfera che si illumina colpita dal vento solare',
    intro: 'Le aurore sono emissioni luminose dell\'alta atmosfera, prodotte quando particelle cariche di origine solare, guidate dal campo magnetico terrestre, collidono con gli atomi di ossigeno e azoto a quote fra 100 e 300 km.',
    how: 'Le collisioni portano gli atomi in uno stato eccitato; tornando allo stato di partenza emettono luce a lunghezze d\'onda caratteristiche. L\'ossigeno produce il verde tipico a circa 100-150 km e un rosso profondo alle quote più alte; l\'azoto contribuisce con tonalità blu e violette. Il campo magnetico convoglia le particelle verso i poli: da qui gli ovali aurorali attorno alle regioni polari.',
    observe: 'Servono cielo buio, orizzonte libero verso nord (nell\'emisfero settentrionale) e attività geomagnetica elevata. Durante le tempeste più forti le aurore sono state osservate anche dall\'Italia settentrionale, in genere come un bagliore rossastro basso sull\'orizzonte.',
    points: [
      'Il colore dipende dal gas e dalla quota, non dalla temperatura.',
      'Esistono aurore anche su Giove e Saturno, molto più energetiche di quelle terrestri.',
      'Nell\'emisfero sud lo stesso fenomeno si chiama aurora australe e si verifica simultaneamente.'
    ],
    relatedEvents: [],
    sourceIds: ['nasa-aurora'],
    linkTopic: null
  },
  {
    id: 'tempeste-geomagnetiche',
    name: 'Tempeste geomagnetiche',
    order: 6,
    kind: 'meteorologia spaziale',
    epistemic: 'fenomeno accertato e monitorato in tempo reale',
    sim: 'solar-storm',
    tagline: 'Quando il campo magnetico terrestre viene scosso',
    intro: 'Una tempesta geomagnetica è una perturbazione temporanea della magnetosfera terrestre, causata dall\'arrivo di vento solare particolarmente intenso o di un\'espulsione di massa coronale.',
    how: 'L\'intensità si misura con l\'indice Kp, da 0 a 9, e con la scala G da G1 a G5. Durante una tempesta la magnetosfera si comprime sul lato diurno e si allunga su quello notturno; le correnti indotte nell\'alta atmosfera e nel suolo possono raggiungere milioni di ampere.',
    observe: 'Non è un fenomeno osservabile direttamente: lo si segue tramite gli indici pubblicati dai centri di meteorologia spaziale. Il suo effetto visibile sono le aurore.',
    points: [
      'Le correnti indotte nel terreno possono danneggiare i trasformatori delle reti elettriche.',
      'Durante le tempeste l\'atmosfera si espande e aumenta l\'attrito sui satelliti in orbita bassa, che perdono quota più rapidamente.',
      'I segnali GNSS possono degradarsi a causa delle perturbazioni ionosferiche.'
    ],
    relatedEvents: [],
    sourceIds: ['nasa-solarstorms'],
    linkTopic: null
  },
  {
    id: 'supernove-fenomeno',
    name: 'Supernove',
    order: 7,
    kind: 'morte stellare',
    epistemic: 'fenomeno accertato; dettagli del meccanismo di esplosione ancora in studio',
    sim: 'supernova',
    tagline: 'Una stella che per settimane brilla come una galassia',
    intro: 'Una supernova è l\'esplosione che conclude la vita di alcune stelle. In poche settimane può liberare più energia di quanta il Sole produrrà in tutta la sua esistenza, e disperde nello spazio gli elementi prodotti dalla stella.',
    how: 'Nelle supernove da collasso del nucleo, la stella massiccia esaurisce il combustibile, il nucleo implode in una frazione di secondo e l\'onda di rimbalzo, sostenuta dai neutrini, espelle gli strati esterni. Nelle supernove di tipo Ia una nana bianca accresce materia da una compagna fino a innescare una detonazione termonucleare che la distrugge.',
    observe: 'Nessuna supernova della nostra Galassia è stata osservata a occhio nudo dal 1604. Quelle in altre galassie vengono scoperte ogni anno a migliaia da survey automatizzate, e sono osservabili con telescopi amatoriali di buona apertura.',
    points: [
      'La maggior parte dell\'energia esce come neutrini, non come luce.',
      'Le supernove di tipo Ia servono da candele standard per misurare le distanze cosmiche.',
      'Il ferro presente nel nostro sangue si è formato in stelle esplose prima della nascita del Sistema Solare.'
    ],
    relatedEvents: [],
    sourceIds: ['nasa-supernovae', 'nasa-chandra'],
    linkTopic: 'supernove'
  },
  {
    id: 'onde-gravitazionali',
    name: 'Onde gravitazionali',
    order: 8,
    kind: 'relatività generale',
    epistemic: 'previsione teorica del 1916, confermata sperimentalmente nel 2015',
    sim: 'gravwaves',
    tagline: 'Lo spaziotempo che vibra',
    intro: 'Le onde gravitazionali sono deformazioni dello spaziotempo che si propagano alla velocità della luce, generate da masse in accelerazione violenta: fusioni di buchi neri o di stelle di neutroni. Previste da Einstein nel 1916, sono state rilevate direttamente un secolo dopo.',
    how: 'Gli interferometri LIGO e Virgo misurano la variazione di lunghezza di due bracci perpendicolari lunghi chilometri, attraversati da fasci laser. Il passaggio di un\'onda gravitazionale allunga un braccio e accorcia l\'altro di una quantità inferiore al millesimo del diametro di un protone: per questo l\'impresa è rimasta tecnicamente impossibile per decenni.',
    observe: 'Non sono osservabili con strumenti amatoriali. I dati e gli allerta degli eventi rilevati sono però pubblici, e le collaborazioni scientifiche pubblicano cataloghi aggiornati.',
    points: [
      'Il primo evento rilevato, il 14 settembre 2015, fu la fusione di due buchi neri di circa 29 e 36 masse solari; l\'annuncio arrivò l\'11 febbraio 2016.',
      'Nel 2017 la fusione di due stelle di neutroni è stata osservata sia in onde gravitazionali sia in luce: la nascita dell\'astronomia multimessaggero.',
      'Le onde gravitazionali permettono di osservare eventi che non emettono alcuna luce.'
    ],
    relatedEvents: [],
    sourceIds: ['ligo-virgo', 'nasa-gravwaves'],
    linkTopic: 'buchi-neri'
  },
  {
    id: 'buchi-neri-fenomeno',
    name: 'Buchi neri: come li osserviamo',
    order: 9,
    kind: 'gravità estrema',
    epistemic: 'esistenza accertata da prove indipendenti; fisica interna non descrivibile con le teorie attuali',
    sim: 'blackhole',
    tagline: 'Vedere l\'invisibile dai suoi effetti',
    intro: 'Un buco nero non emette luce, quindi non si osserva direttamente. Si osservano le sue conseguenze: il moto delle stelle vicine, la radiazione del gas che vi cade dentro, le onde gravitazionali delle fusioni e l\'ombra dell\'orizzonte contro il materiale luminoso circostante.',
    how: 'Il gas in caduta forma un disco di accrescimento e si riscalda fino a milioni di gradi per attrito, emettendo raggi X. Vicino all\'orizzonte la gravità devia i percorsi della luce, e il risultato è l\'anello luminoso che circonda una regione scura: l\'immagine pubblicata dall\'Event Horizon Telescope nel 2019 per M87 e nel 2022 per Sagittarius A*.',
    observe: 'Nessun buco nero è osservabile con strumenti amatoriali. Le immagini dell\'Event Horizon Telescope sono il risultato della combinazione di radiotelescopi distribuiti in tutto il pianeta, che insieme funzionano come un unico strumento di dimensioni terrestri.',
    points: [
      'L\'ombra osservata è più grande dell\'orizzonte degli eventi: la gravità devia la luce e amplifica la regione scura.',
      'Le orbite delle stelle intorno a Sagittarius A* sono state seguite per decenni: quel lavoro ha ricevuto il Nobel per la fisica nel 2020.',
      'Un buco nero non "aspira" il materiale circostante più di quanto farebbe qualunque altra massa equivalente.'
    ],
    relatedEvents: [],
    sourceIds: ['nasa-blackholes', 'eht'],
    linkTopic: 'buchi-neri'
  },
  {
    id: 'espansione',
    name: 'Espansione dell\'universo',
    order: 10,
    kind: 'cosmologia',
    epistemic: 'espansione accertata; accelerazione accertata; causa dell\'accelerazione sconosciuta',
    sim: 'expansion',
    tagline: 'Non le galassie che si allontanano, ma lo spazio che si dilata',
    intro: 'Le osservazioni mostrano che le galassie lontane si allontanano da noi, e che più sono distanti più rapidamente si allontanano. Non si tratta di un moto attraverso lo spazio: è lo spazio stesso fra le galassie che si dilata.',
    how: 'La luce proveniente da galassie distanti arriva spostata verso lunghezze d\'onda maggiori: è il redshift cosmologico. La relazione fra distanza e velocità di allontanamento, scoperta da Hubble e Lemaître, è quantificata dalla costante di Hubble. Dalla fine degli anni Novanta le supernove di tipo Ia hanno mostrato che l\'espansione non sta rallentando, ma accelerando.',
    observe: 'Non è un fenomeno osservabile a occhio: si misura analizzando gli spettri delle galassie. Gli effetti sono rilevabili soltanto su scale di milioni di anni luce: all\'interno di una galassia la gravità domina largamente.',
    points: [
      'L\'età dell\'universo è stimata in circa 13,8 miliardi di anni.',
      'L\'energia responsabile dell\'accelerazione viene chiamata energia oscura: il nome indica il problema, non la soluzione.',
      'Le misure della costante di Hubble ottenute con metodi diversi non coincidono perfettamente: è la cosiddetta "tensione di Hubble", un problema aperto.',
      'Non esiste un centro dell\'espansione: ogni osservatore vede le altre galassie allontanarsi da sé.'
    ],
    relatedEvents: [],
    sourceIds: ['nasa-expansion', 'nasa-hubble'],
    linkTopic: 'galassie'
  }
];

export const phenomenonById = (id) => PHENOMENA.find((p) => p.id === id);
