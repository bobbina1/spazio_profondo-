/**
 * SPAZIO PROFONDO — Luna e satelliti naturali
 * La mappa lunare è una rappresentazione schematica delle formazioni
 * principali del lato visibile: posizioni indicative, non cartografia metrica.
 */

export const MOON = {
  name: 'Luna',
  tagline: 'Il nostro satellite naturale, e l\'unico mondo che abbiamo visitato',
  visual: { base: '#b8b3ab', light: '#f2efe8', dark: '#2a2823' },
  facts: [
    { k: 'Diametro', v: '3.474 km', note: 'circa un quarto di quello terrestre' },
    { k: 'Distanza media', v: '384.400 km', note: '1,3 secondi luce' },
    { k: 'Periodo orbitale', v: '27,32 giorni', note: 'rispetto alle stelle fisse' },
    { k: 'Mese sinodico', v: '29,53 giorni', note: 'da luna nuova a luna nuova' },
    { k: 'Gravità superficiale', v: '1,62 m/s²', note: 'un sesto di quella terrestre' },
    { k: 'Temperature', v: 'da −173 °C a +127 °C' },
    { k: 'Allontanamento', v: '≈ 3,8 cm all\'anno' }
  ],
  origin: {
    h: 'Origine: l\'ipotesi dell\'impatto gigante',
    p: 'Il modello più accreditato prevede che circa 4,5 miliardi di anni fa un corpo delle dimensioni di Marte, chiamato convenzionalmente Theia, abbia colpito la Terra primordiale. I detriti espulsi in orbita si sarebbero poi aggregati formando la Luna. A sostegno di questa ricostruzione ci sono la composizione isotopica dei campioni Apollo, molto simile a quella del mantello terrestre, e il basso contenuto di ferro della Luna. Restano punti aperti: la somiglianza isotopica è in realtà più stretta di quanto alcune simulazioni prevedano, e i modelli vengono ancora rivisti.',
    status: 'ipotesi ampiamente sostenuta, dettagli in discussione'
  },
  surface: [
    { h: 'Mari lunari', p: 'Le grandi macchie scure visibili a occhio nudo sono pianure di basalto, formate da colate di lava che hanno riempito antichi bacini da impatto fra 3 e 3,5 miliardi di anni fa. Vennero chiamate "mari" dagli osservatori del Seicento, che le ritenevano distese d\'acqua: il nome è rimasto, ma non c\'è e non c\'è mai stata acqua liquida in superficie.' },
    { h: 'Crateri', p: 'La superficie è coperta da crateri da impatto conservati per centinaia di milioni di anni: senza atmosfera e senza tettonica, nulla li cancella, a parte altri impatti. Il bacino Polo Sud-Aitken, sul lato nascosto, ha un diametro di circa 2.500 km ed è uno dei più grandi crateri da impatto del Sistema Solare.' },
    { h: 'Regolite', p: 'Il suolo è ricoperto da uno strato di polvere e frammenti prodotti da miliardi di anni di micro-impatti. È abrasiva e taglientissima perché nessun processo di erosione ne arrotonda i bordi: per le missioni Apollo fu un problema concreto, per le future basi lunari resta una sfida tecnica.' },
    { h: 'Ghiaccio ai poli', p: 'Nei crateri in ombra permanente ai poli, dove la temperatura resta sotto i −200 °C, le osservazioni orbitali indicano la presenza di ghiaccio d\'acqua. È la ragione principale per cui le missioni moderne, Artemis compresa, puntano al polo sud: acqua significa acqua potabile, ossigeno e propellente prodotti sul posto.' }
  ],
  /** Formazioni del lato visibile: x,y in percentuale sul disco (0-100). */
  mapFeatures: [
    { id: 'imbrium',     name: 'Mare Imbrium',          x: 33, y: 24, type: 'mare',   text: 'Bacino da impatto di circa 1.145 km, riempito da colate basaltiche. Uno dei più grandi mari lunari.' },
    { id: 'serenitatis', name: 'Mare Serenitatis',      x: 59, y: 29, type: 'mare',   text: 'Mare circolare visitato dall\'Apollo 17 nel 1972, l\'ultima missione umana del programma.' },
    { id: 'tranquillitatis', name: 'Mare Tranquillitatis', x: 64, y: 41, type: 'mare', text: 'Sito di allunaggio dell\'Apollo 11, il 20 luglio 1969.' },
    { id: 'crisium',     name: 'Mare Crisium',          x: 82, y: 31, type: 'mare',   text: 'Mare ben distinguibile vicino al bordo orientale, con un profilo quasi circolare.' },
    { id: 'procellarum', name: 'Oceanus Procellarum',   x: 17, y: 44, type: 'mare',   text: 'La distesa basaltica più estesa, oltre 2.500 km: l\'unica a cui è stato dato il nome di "oceano".' },
    { id: 'copernicus',  name: 'Cratere Copernico',     x: 36, y: 46, type: 'crater', text: 'Cratere di 93 km con terrazze e picco centrale, visibile con un piccolo telescopio.' },
    { id: 'tycho',       name: 'Cratere Tycho',         x: 43, y: 79, type: 'crater', text: 'Cratere giovane, circa 108 milioni di anni: i suoi raggi chiari si estendono per oltre 1.500 km.' },
    { id: 'nubium',      name: 'Mare Nubium',           x: 45, y: 66, type: 'mare',   text: 'Mare meridionale dai contorni irregolari, circondato da antiche terre alte.' },
    { id: 'polo-sud',    name: 'Regione del polo sud',  x: 50, y: 93, type: 'region', text: 'Obiettivo delle missioni moderne: crateri in ombra permanente che conservano ghiaccio d\'acqua.' }
  ],
  phases: [
    { id: 0, name: 'Luna nuova',           illum: 0,    text: 'La Luna è fra Terra e Sole: la faccia illuminata è quella che non vediamo.' },
    { id: 1, name: 'Falce crescente',      illum: 0.25, text: 'Una sottile falce visibile dopo il tramonto, a occidente.' },
    { id: 2, name: 'Primo quarto',         illum: 0.5,  text: 'Metà del disco illuminata; la Luna è alta nel cielo alla sera.' },
    { id: 3, name: 'Gibbosa crescente',    illum: 0.75, text: 'Più di metà illuminata, sorge nel pomeriggio.' },
    { id: 4, name: 'Luna piena',           illum: 1,    text: 'Terra fra Sole e Luna: il disco è completamente illuminato e visibile tutta la notte.' },
    { id: 5, name: 'Gibbosa calante',      illum: 0.75, text: 'La porzione illuminata diminuisce; sorge dopo il tramonto.' },
    { id: 6, name: 'Ultimo quarto',        illum: 0.5,  text: 'Metà disco illuminata, visibile nella seconda parte della notte.' },
    { id: 7, name: 'Falce calante',        illum: 0.25, text: 'Falce sottile visibile all\'alba, a oriente.' }
  ],
  phaseNote: 'Le fasi non sono ombre della Terra sulla Luna: dipendono soltanto da quanta parte dell\'emisfero illuminato dal Sole è rivolta verso di noi. L\'ombra terrestre entra in gioco solo nelle eclissi di Luna.',
  tidalLock: {
    h: 'Perché vediamo sempre la stessa faccia',
    p: 'La Luna compie una rotazione su se stessa nello stesso tempo in cui compie un\'orbita: è una rotazione sincrona, prodotta dalle forze di marea terrestri nel corso di centinaia di milioni di anni. Per questo dalla Terra vediamo sempre lo stesso emisfero. Grazie a piccole oscillazioni dette librazioni, nel tempo si riesce comunque a osservare circa il 59% della superficie. Il lato nascosto non è "buio": riceve luce solare esattamente come quello visibile.'
  },
  eclipses: [
    {
      id: 'lunare', name: 'Eclissi di Luna',
      p: 'Si verifica quando la Terra si frappone fra Sole e Luna e il nostro pianeta proietta la propria ombra sul satellite. Può essere penombrale, parziale o totale. Durante una totale la Luna non scompare: assume una tonalità rossastra, perché l\'atmosfera terrestre devia verso di essa la luce rossa del Sole. È lo stesso fenomeno che rende rossi i tramonti.',
      visibility: 'Visibile da tutto l\'emisfero notturno: non serve trovarsi in un punto preciso.'
    },
    {
      id: 'solare', name: 'Eclissi di Sole',
      p: 'Si verifica quando la Luna si frappone fra Sole e Terra. Per una coincidenza notevole, Sole e Luna hanno dimensioni apparenti quasi identiche: per questo la Luna può coprire esattamente il disco solare. Se è più lontana nella sua orbita ellittica, lascia visibile un anello di luce e l\'eclissi è anulare.',
      visibility: 'La totalità è visibile solo da una fascia stretta, in genere larga 100-250 km: fuori da quella fascia l\'eclissi appare parziale.'
    }
  ],
  eclipseWhyNotMonthly: 'L\'orbita lunare è inclinata di circa 5° rispetto al piano dell\'orbita terrestre. Le eclissi avvengono soltanto quando la luna nuova o piena cade vicino a uno dei due nodi, i punti in cui i due piani si intersecano: per questo non si verificano ogni mese.',
  apollo: [
    { m: 'Apollo 11', y: 1969, site: 'Mare Tranquillitatis', note: 'Primo allunaggio umano: Neil Armstrong e Buzz Aldrin.' },
    { m: 'Apollo 12', y: 1969, site: 'Oceanus Procellarum',  note: 'Atterraggio di precisione a poca distanza dalla sonda Surveyor 3.' },
    { m: 'Apollo 14', y: 1971, site: 'Fra Mauro',            note: 'Prima raccolta sistematica di campioni delle terre alte.' },
    { m: 'Apollo 15', y: 1971, site: 'Hadley-Apennine',      note: 'Primo uso del rover lunare: oltre 27 km percorsi.' },
    { m: 'Apollo 16', y: 1972, site: 'Altopiano di Descartes', note: 'Esplorazione di terreni di altopiano antico.' },
    { m: 'Apollo 17', y: 1972, site: 'Taurus-Littrow',       note: 'Ultima missione umana del programma, con il geologo Harrison Schmitt a bordo.' }
  ],
  modernMissions: [
    { name: 'Chang\'e 4', agency: 'CNSA', year: 2019, note: 'Primo atterraggio morbido sul lato nascosto della Luna.' },
    { name: 'Chang\'e 5', agency: 'CNSA', year: 2020, note: 'Riporta a Terra circa 1,7 kg di campioni lunari.' },
    { name: 'Chandrayaan-3', agency: 'ISRO', year: 2023, note: 'Atterraggio nella regione polare sud, con il rover Pragyan.' },
    { name: 'SLIM', agency: 'JAXA', year: 2024, note: 'Dimostrazione di atterraggio di precisione, con errore di poche decine di metri.' },
    { name: 'Chang\'e 6', agency: 'CNSA', year: 2024, note: 'Primi campioni al mondo riportati dal lato nascosto della Luna.' },
    { name: 'Artemis II', agency: 'NASA, CSA', year: 2026, note: 'Primo volo con equipaggio del programma Artemis: sorvolo lunare e rientro.' }
  ],
  cartography: {
    h: 'Cartografia lunare',
    p: 'Le mappe moderne della Luna derivano in gran parte dal Lunar Reconnaissance Orbiter, in orbita dal 2009, che ha prodotto modelli topografici con risoluzione metrica. I nomi delle formazioni sono assegnati dall\'Unione Astronomica Internazionale e seguono convenzioni precise: i crateri portano nomi di scienziati, i mari denominazioni latine di stati d\'animo o condizioni meteorologiche, come Mare Serenitatis o Mare Nubium.'
  },
  sourceIds: ['nasa-moon', 'nasa-lro', 'nasa-apollo']
};

export const OTHER_MOONS = [
  { id: 'io',        name: 'Io',        planet: 'Giove',   diameterKm: 3643, visual: { base: '#e8d169', light: '#fff3b8', dark: '#6b5410' },
    note: 'Il corpo vulcanicamente più attivo del Sistema Solare: centinaia di vulcani attivi, alimentati dal riscaldamento di marea prodotto da Giove.' },
  { id: 'europa',    name: 'Europa',    planet: 'Giove',   diameterKm: 3122, visual: { base: '#d9cdb4', light: '#fbf6ea', dark: '#5c5343' },
    note: 'Una crosta di ghiaccio fratturata sopra un oceano salato di acqua liquida: uno dei luoghi più promettenti per cercare vita. Europa Clipper è in viaggio.' },
  { id: 'ganimede',  name: 'Ganimede',  planet: 'Giove',   diameterKm: 5268, visual: { base: '#9b9289', light: '#dcd6cd', dark: '#332f2a' },
    note: 'Il satellite più grande del Sistema Solare, più grande di Mercurio, e l\'unico con un campo magnetico proprio.' },
  { id: 'callisto',  name: 'Callisto',  planet: 'Giove',   diameterKm: 4821, visual: { base: '#6e6a63', light: '#b3aea6', dark: '#211f1c' },
    note: 'Una delle superfici più craterizzate che conosciamo: un paesaggio quasi intatto da quattro miliardi di anni.' },
  { id: 'titano',    name: 'Titano',    planet: 'Saturno', diameterKm: 5150, visual: { base: '#e0a44f', light: '#ffdda6', dark: '#5e3c0e' },
    note: 'L\'unico satellite con un\'atmosfera densa, prevalentemente di azoto, e con laghi e fiumi di metano ed etano liquidi.' },
  { id: 'encelado',  name: 'Encelado',  planet: 'Saturno', diameterKm: 504,  visual: { base: '#e8f3fb', light: '#ffffff', dark: '#6f8698' },
    note: 'Getti di vapore d\'acqua dal polo sud alimentano un anello di Saturno e rivelano un oceano sotterraneo.' },
  { id: 'tritone',   name: 'Tritone',   planet: 'Nettuno', diameterKm: 2707, visual: { base: '#cbbed6', light: '#f4edf8', dark: '#473d52' },
    note: 'Orbita in senso retrogrado: è quasi certamente un oggetto della fascia di Kuiper catturato dalla gravità di Nettuno.' },
  { id: 'phobos',    name: 'Phobos',    planet: 'Marte',   diameterKm: 22,   visual: { base: '#7b6f62', light: '#b6a897', dark: '#231f1a' },
    note: 'Piccolo e irregolare, orbita così vicino a Marte che sorge e tramonta due volte per ogni giorno marziano.' },
  { id: 'miranda',   name: 'Miranda',   planet: 'Urano',   diameterKm: 471,  visual: { base: '#aebfc9', light: '#e6eef3', dark: '#3a474f' },
    note: 'Una superficie caotica, con la scarpata Verona Rupes: una parete alta fino a circa 20 km.' }
];
