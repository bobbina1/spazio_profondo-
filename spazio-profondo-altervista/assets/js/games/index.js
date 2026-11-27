/** SPAZIO PROFONDO — registro dei giochi del Laboratorio Spaziale. */

export const GAMES = [
  { id: 'ordina-pianeti',     load: () => import('./ordina-pianeti.js') },
  { id: 'riconosci-pianeta',  load: () => import('./riconosci-pianeta.js') },
  { id: 'missione-spaziale',  load: () => import('./missione.js') },
  { id: 'viaggio-tempo',      load: () => import('./viaggio-tempo.js') },
  { id: 'vero-falso-cosmico', load: () => import('./vero-falso-cosmico.js') }
];

/** Metadati statici per la pagina indice: evita di caricare tutti i moduli. */
export const GAME_CARDS = [
  { id: 'ordina-pianeti', n: 1, name: 'Sistema Solare',
    summary: 'Disponi gli otto pianeti nell\'ordine corretto a partire dal Sole, contro il tempo.',
    tags: ['trascinamento', 'bonus tempo'], accent: '#4da3ff' },
  { id: 'riconosci-pianeta', n: 2, name: 'Riconosci il pianeta',
    summary: 'Immagine parziale e indizi progressivi: meno indizi usi, più punti ottieni.',
    tags: ['indizi', '5 round'], accent: '#9a7bff' },
  { id: 'missione-spaziale', n: 3, name: 'Missione nello spazio',
    summary: 'Progetta una missione interplanetaria gestendo propellente, tempo di volo e rischio.',
    tags: ['risorse', 'meccanica orbitale'], accent: '#5ee7e0' },
  { id: 'viaggio-tempo', n: 4, name: 'Viaggio nel tempo',
    summary: 'Ricostruisci la cronologia esatta dei grandi eventi dell\'esplorazione spaziale.',
    tags: ['cronologia', '6 eventi'], accent: '#ffc46b' },
  { id: 'vero-falso-cosmico', n: 5, name: 'Vero o falso cosmico',
    summary: 'Novanta secondi di affermazioni sorprendenti: smonta gli equivoci più diffusi.',
    tags: ['a tempo', '90 secondi'], accent: '#e2714b' }
];

export const gameById = (id) => GAMES.find((g) => g.id === id);
export const gameCardById = (id) => GAME_CARDS.find((g) => g.id === id);
