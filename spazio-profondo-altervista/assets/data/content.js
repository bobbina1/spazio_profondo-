/**
 * SPAZIO PROFONDO — Video e contenuti pubblicati
 *
 * NOTA IMPORTANTE (letta anche dalla UI):
 * Il profilo Instagram del progetto non è leggibile automaticamente
 * (robots.txt lo vieta), quindi nessun post reale è stato copiato qui.
 * Le voci marcate `isExample: true` sono SEGNAPOSTO con struttura completa:
 * mostrano come il contenuto si collega agli approfondimenti scientifici
 * del sito e vengono etichettate in pagina come esempi.
 *
 * Per pubblicare contenuti reali: sostituire le voci qui sotto con
 * titolo, data, link originale e `relatedTo` del post corrispondente.
 * Non serve toccare altro: filtri, griglia e collegamenti sono automatici.
 */

export const SOCIAL = {
  instagram: 'https://www.instagram.com/spazio.profondo/',
  handle: '@spazio.profondo'
};

export const CONTENT_CATEGORIES = [
  { id: 'sistema-solare', label: 'Sistema Solare' },
  { id: 'missioni',       label: 'Missioni spaziali' },
  { id: 'universo',       label: 'Universo profondo' },
  { id: 'fenomeni',       label: 'Fenomeni' },
  { id: 'luna',           label: 'Luna' }
];

export const CONTENTS = [
  {
    id: 'voyager-giorno-luce',
    title: 'Voyager 1 a un giorno-luce dalla Terra',
    category: 'missioni',
    date: '2026-11-18',
    isExample: true,
    cover: { from: '#1b2f5e', to: '#0a1226', accent: '#5ee7e0' },
    description: 'Il 18 novembre 2026 il Voyager 1 ha raggiunto la distanza che la luce percorre in 24 ore: 25,902 miliardi di chilometri. Che cosa significa, in pratica, parlare con una sonda così lontana.',
    relatedType: 'missione',
    relatedTo: 'voyager',
    originalUrl: 'https://www.instagram.com/spazio.profondo/',
    hasVideo: true
  },
  {
    id: 'bepicolombo-mercurio',
    title: 'BepiColombo è in orbita attorno a Mercurio',
    category: 'missioni',
    date: '2026-11-22',
    isExample: true,
    cover: { from: '#4a3a2a', to: '#120d08', accent: '#ffc46b' },
    description: 'Dopo otto anni di viaggio e nove sorvoli planetari, la missione ESA-JAXA è stata catturata dalla gravità di Mercurio. Perché arrivare al pianeta più interno è più difficile che andare su Marte.',
    relatedType: 'missione',
    relatedTo: 'bepicolombo',
    originalUrl: 'https://www.instagram.com/spazio.profondo/',
    hasVideo: true
  },
  {
    id: 'geminidi-come-vederle',
    title: 'Geminidi 2026: come vederle davvero',
    category: 'fenomeni',
    date: '2026-11-20',
    isExample: true,
    cover: { from: '#2a2350', to: '#0b0a1a', accent: '#9a7bff' },
    description: 'Lo sciame più ricco dell\'anno arriva con la Luna quasi assente. Niente telescopio, niente app: solo cielo buio, venti minuti di pazienza e la direzione giusta.',
    relatedType: 'fenomeno',
    relatedTo: 'piogge-meteoriche',
    originalUrl: 'https://www.instagram.com/spazio.profondo/',
    hasVideo: false
  },
  {
    id: 'saturno-anelli',
    title: 'Gli anelli di Saturno stanno scomparendo',
    category: 'sistema-solare',
    date: '2026-11-12',
    isExample: true,
    cover: { from: '#5c4a24', to: '#14100a', accent: '#e4d2a8' },
    description: 'Il materiale degli anelli ricade lentamente sul pianeta, e ogni quindici anni circa li vediamo di taglio. Due fenomeni diversi che vengono spesso confusi.',
    relatedType: 'pianeta',
    relatedTo: 'saturno',
    originalUrl: 'https://www.instagram.com/spazio.profondo/',
    hasVideo: true
  },
  {
    id: 'perseverance-record',
    title: 'Il rover che guida da solo su Marte',
    category: 'missioni',
    date: '2026-10-14',
    isExample: true,
    cover: { from: '#5e2a18', to: '#180907', accent: '#e2714b' },
    description: 'L\'11 ottobre 2026 Perseverance ha superato il record di distanza percorsa su un altro mondo. La parte interessante non è il numero: è che gran parte del percorso l\'ha pianificato da sé.',
    relatedType: 'missione',
    relatedTo: 'perseverance',
    originalUrl: 'https://www.instagram.com/spazio.profondo/',
    hasVideo: true
  },
  {
    id: 'fasi-lunari-errore',
    title: 'Le fasi lunari non sono l\'ombra della Terra',
    category: 'luna',
    date: '2026-10-02',
    isExample: true,
    cover: { from: '#3a3a42', to: '#0e0e12', accent: '#e6e2d8' },
    description: 'È l\'equivoco più diffuso sulla Luna. Le fasi dipendono solo da quanta parte dell\'emisfero illuminato è rivolta verso di noi: l\'ombra terrestre entra in gioco soltanto nelle eclissi.',
    relatedType: 'sezione',
    relatedTo: 'luna',
    originalUrl: 'https://www.instagram.com/spazio.profondo/',
    hasVideo: false
  },
  {
    id: 'buco-nero-immagine',
    title: 'Che cosa vediamo nella foto di un buco nero',
    category: 'universo',
    date: '2026-09-18',
    isExample: true,
    cover: { from: '#2b1c07', to: '#0a0703', accent: '#ffb648' },
    description: 'L\'immagine dell\'Event Horizon Telescope non mostra il buco nero: mostra la sua ombra, più grande dell\'orizzonte degli eventi, perché la gravità devia la luce attorno a essa.',
    relatedType: 'categoria',
    relatedTo: 'buchi-neri',
    originalUrl: 'https://www.instagram.com/spazio.profondo/',
    hasVideo: true
  },
  {
    id: 'webb-infrarosso',
    title: 'Perché il James Webb guarda nell\'infrarosso',
    category: 'universo',
    date: '2026-09-05',
    isExample: true,
    cover: { from: '#1a3a3a', to: '#061010', accent: '#5ee7e0' },
    description: 'L\'espansione dell\'universo sposta la luce delle galassie più antiche verso lunghezze d\'onda maggiori. Per vedere il passato più remoto serve un telescopio freddo e infrarosso.',
    relatedType: 'missione',
    relatedTo: 'jwst',
    originalUrl: 'https://www.instagram.com/spazio.profondo/',
    hasVideo: false
  }
];

/** Collegamento fra un contenuto e la pagina di approfondimento del sito. */
export function contentLink(item) {
  switch (item.relatedType) {
    case 'missione':  return `#/missioni/${item.relatedTo}`;
    case 'pianeta':   return `#/sistema-solare/${item.relatedTo}`;
    case 'categoria': return `#/esplora/${item.relatedTo}`;
    case 'fenomeno':  return `#/fenomeni/${item.relatedTo}`;
    case 'sezione':   return `#/${item.relatedTo}`;
    default:          return '#/contenuti';
  }
}

export const latestContents = (n = 3) =>
  [...CONTENTS].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, n);
