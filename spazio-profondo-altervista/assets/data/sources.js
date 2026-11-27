/**
 * SPAZIO PROFONDO — Registro delle fonti
 *
 * Tutti i contenuti scientifici del sito rimandano a una voce di questo
 * registro tramite `sourceIds`. Un contenuto senza fonte è un bug, non
 * una scelta editoriale.
 *
 * `checked` = data in cui il dato è stato verificato sulla fonte.
 */

export const SOURCES = {
  /* --- Enti e portali principali --- */
  'nasa':                { org: 'NASA',       title: 'Portale ufficiale NASA', url: 'https://www.nasa.gov/', checked: '2026-11-23' },
  'nasa-science':        { org: 'NASA Science', title: 'NASA Science', url: 'https://science.nasa.gov/', checked: '2026-11-23' },
  'esa':                 { org: 'ESA',        title: 'Agenzia Spaziale Europea', url: 'https://www.esa.int/', checked: '2026-11-23' },
  'jpl':                 { org: 'NASA JPL',   title: 'Jet Propulsion Laboratory', url: 'https://www.jpl.nasa.gov/', checked: '2026-11-23' },
  'eso-general':         { org: 'ESO',        title: 'European Southern Observatory', url: 'https://www.eso.org/', checked: '2026-11-23' },
  'spacex':              { org: 'SpaceX',     title: 'SpaceX — missioni e lanci', url: 'https://www.spacex.com/', checked: '2026-11-23' },

  /* --- Sistema Solare --- */
  'nasa-sun':            { org: 'NASA Science', title: 'Il Sole', url: 'https://science.nasa.gov/sun/', checked: '2026-11-23' },
  'nasa-mercury':        { org: 'NASA Science', title: 'Mercurio', url: 'https://science.nasa.gov/mercury/', checked: '2026-11-23' },
  'nasa-venus':          { org: 'NASA Science', title: 'Venere', url: 'https://science.nasa.gov/venus/', checked: '2026-11-23' },
  'nasa-earth':          { org: 'NASA Science', title: 'La Terra', url: 'https://science.nasa.gov/earth/', checked: '2026-11-23' },
  'nasa-mars':           { org: 'NASA Science', title: 'Marte', url: 'https://science.nasa.gov/mars/', checked: '2026-11-23' },
  'nasa-jupiter':        { org: 'NASA Science', title: 'Giove', url: 'https://science.nasa.gov/jupiter/', checked: '2026-11-23' },
  'nasa-saturn':         { org: 'NASA Science', title: 'Saturno', url: 'https://science.nasa.gov/saturn/', checked: '2026-11-23' },
  'nasa-uranus':         { org: 'NASA Science', title: 'Urano', url: 'https://science.nasa.gov/uranus/', checked: '2026-11-23' },
  'nasa-neptune':        { org: 'NASA Science', title: 'Nettuno', url: 'https://science.nasa.gov/neptune/', checked: '2026-11-23' },
  'nasa-moon':           { org: 'NASA Science', title: 'La Luna', url: 'https://science.nasa.gov/moon/', checked: '2026-11-23' },
  'nasa-lro':            { org: 'NASA Science', title: 'Lunar Reconnaissance Orbiter', url: 'https://science.nasa.gov/mission/lro/', checked: '2026-11-23' },
  'nasa-asteroids':      { org: 'NASA Science', title: 'Asteroidi', url: 'https://science.nasa.gov/solar-system/asteroids/', checked: '2026-11-23' },
  'nasa-comets':         { org: 'NASA Science', title: 'Comete', url: 'https://science.nasa.gov/solar-system/comets/', checked: '2026-11-23' },
  'nasa-meteors':        { org: 'NASA Science', title: 'Meteore e meteoriti', url: 'https://science.nasa.gov/solar-system/meteors-meteorites/', checked: '2026-11-23' },
  'nasa-kuiper':         { org: 'NASA Science', title: 'Fascia di Kuiper', url: 'https://science.nasa.gov/solar-system/kuiper-belt/', checked: '2026-11-23' },
  'nasa-dwarf':          { org: 'NASA Science', title: 'Pianeti nani', url: 'https://science.nasa.gov/solar-system/dwarf-planets/', checked: '2026-11-23' },
  'mpc-moons':           { org: 'IAU MPC',    title: 'Minor Planet Center — circolari sui satelliti naturali', url: 'https://www.minorplanetcenter.net/', checked: '2026-11-23',
                           note: 'Il conteggio ufficiale dei satelliti cambia con ogni nuova scoperta annunciata.' },

  /* --- Missioni --- */
  'nasa-voyager-where':    { org: 'NASA Science', title: 'Dove sono Voyager 1 e Voyager 2', url: 'https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/', checked: '2026-11-23' },
  'nasa-voyager-blog':     { org: 'NASA Blogs',  title: 'Voyager — aggiornamenti di missione', url: 'https://blogs.nasa.gov/voyager/', checked: '2026-11-23' },
  'nasa-voyager-spacecraft':{ org: 'NASA Science', title: 'Voyager — stato degli strumenti', url: 'https://science.nasa.gov/mission/voyager/spacecraft/', checked: '2026-11-23' },
  'nasa-apollo':           { org: 'NASA',        title: 'Programma Apollo', url: 'https://www.nasa.gov/the-apollo-program/', checked: '2026-11-23' },
  'nasa-artemis':          { org: 'NASA',        title: 'Programma Artemis', url: 'https://www.nasa.gov/artemis/', checked: '2026-11-23' },
  'nasa-artemis2-blog':    { org: 'NASA Blogs',  title: 'Artemis II — cronaca di missione', url: 'https://www.nasa.gov/blogs/missions/', checked: '2026-11-23' },
  'nasa-perseverance':     { org: 'NASA Science', title: 'Mars 2020 Perseverance', url: 'https://science.nasa.gov/mission/mars-2020-perseverance/', checked: '2026-11-23' },
  'nasa-perseverance-record':{ org: 'NASA Science', title: 'Perseverance stabilisce il record di distanza percorsa', url: 'https://science.nasa.gov/blogs/perseverance-mars-rover/', checked: '2026-11-23' },
  'nasa-curiosity':        { org: 'NASA Science', title: 'Mars Science Laboratory Curiosity', url: 'https://science.nasa.gov/mission/msl-curiosity/', checked: '2026-11-23' },
  'nasa-cassini':          { org: 'NASA Science', title: 'Cassini-Huygens', url: 'https://science.nasa.gov/mission/cassini/', checked: '2026-11-23' },
  'nasa-newhorizons':      { org: 'NASA Science', title: 'New Horizons', url: 'https://science.nasa.gov/mission/new-horizons/', checked: '2026-11-23' },
  'nasa-nh-wake':          { org: 'NASA Science', title: 'New Horizons si risveglia dall\'ibernazione', url: 'https://science.nasa.gov/missions/new-horizons/', checked: '2026-11-23' },
  'nasa-parker':           { org: 'NASA Science', title: 'Parker Solar Probe', url: 'https://science.nasa.gov/mission/parker-solar-probe/', checked: '2026-11-23' },
  'nasa-parker-blog':      { org: 'NASA Science', title: 'Parker Solar Probe — blog di missione', url: 'https://science.nasa.gov/blogs/parker-solar-probe/', checked: '2026-11-23' },
  'nasa-webb':             { org: 'NASA Science', title: 'James Webb Space Telescope', url: 'https://science.nasa.gov/mission/webb/', checked: '2026-11-23' },
  'stsci-jwst':            { org: 'STScI',       title: 'Webb — operazioni scientifiche', url: 'https://www.stsci.edu/jwst', checked: '2026-11-23' },
  'nasa-hubble':           { org: 'NASA Science', title: 'Hubble Space Telescope', url: 'https://science.nasa.gov/mission/hubble/', checked: '2026-11-23' },
  'stsci-hst':             { org: 'STScI',       title: 'Hubble — stato e documentazione', url: 'https://hst-docs.stsci.edu/hstos', checked: '2026-11-23' },
  'esa-bepi':              { org: 'ESA',         title: 'BepiColombo', url: 'https://www.esa.int/Science_Exploration/Space_Science/BepiColombo', checked: '2026-11-23' },
  'esa-bepi-arrival':      { org: 'ESA',         title: 'BepiColombo — aggiornamenti sull\'arrivo a Mercurio', url: 'https://www.esa.int/Science_Exploration/Space_Science/BepiColombo/Latest_updates_BepiColombo_s_arrival_at_Mercury', checked: '2026-11-23' },
  'esa-rosetta':           { org: 'ESA',         title: 'Rosetta', url: 'https://www.esa.int/Science_Exploration/Space_Science/Rosetta', checked: '2026-11-23' },
  'esa-gaia':              { org: 'ESA',         title: 'Missione Gaia', url: 'https://www.esa.int/Science_Exploration/Space_Science/Gaia', checked: '2026-11-23' },

  /* --- Astrofisica e universo --- */
  'nasa-stars':          { org: 'NASA Science', title: 'Stelle', url: 'https://science.nasa.gov/universe/stars/', checked: '2026-11-23' },
  'nasa-nebulae':        { org: 'NASA Science', title: 'Nebulose', url: 'https://science.nasa.gov/universe/nebulae/', checked: '2026-11-23' },
  'nasa-galaxies':       { org: 'NASA Science', title: 'Galassie', url: 'https://science.nasa.gov/universe/galaxies/', checked: '2026-11-23' },
  'nasa-milkyway':       { org: 'NASA Science', title: 'La Via Lattea', url: 'https://science.nasa.gov/universe/galaxies/milky-way/', checked: '2026-11-23' },
  'nasa-blackholes':     { org: 'NASA Science', title: 'Buchi neri', url: 'https://science.nasa.gov/universe/black-holes/', checked: '2026-11-23' },
  'nasa-supernovae':     { org: 'NASA Science', title: 'Supernove', url: 'https://science.nasa.gov/universe/stars/supernovae/', checked: '2026-11-23' },
  'nasa-chandra':        { org: 'Chandra / NASA', title: 'Chandra X-ray Observatory', url: 'https://chandra.harvard.edu/', checked: '2026-11-23' },
  'nasa-messier':        { org: 'NASA',        title: 'Catalogo di Messier', url: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/', checked: '2026-11-23' },
  'nasa-expansion':      { org: 'NASA Science', title: 'L\'universo in espansione', url: 'https://science.nasa.gov/universe/overview/', checked: '2026-11-23' },
  'nasa-gravwaves':      { org: 'NASA Science', title: 'Onde gravitazionali', url: 'https://science.nasa.gov/universe/black-holes/', checked: '2026-11-23' },
  'ligo-virgo':          { org: 'LIGO / Virgo', title: 'Collaborazione LIGO-Virgo-KAGRA', url: 'https://www.ligo.org/', checked: '2026-11-23' },
  'eht':                 { org: 'EHT',         title: 'Event Horizon Telescope', url: 'https://eventhorizontelescope.org/', checked: '2026-11-23' },

  /* --- Fenomeni e osservazione --- */
  'nasa-eclipses':       { org: 'NASA Science', title: 'Eclissi: guida e sicurezza', url: 'https://science.nasa.gov/eclipses/', checked: '2026-11-23' },
  'eclipsewise-2027':    { org: 'EclipseWise',  title: 'Eclissi solare totale del 2 agosto 2027', url: 'https://eclipsewise.com/solar/SEprime/2001-2100/SE2027Aug02Tprime.html', checked: '2026-11-23' },
  'nasa-skywatching':    { org: 'NASA Science', title: 'Che cosa guardare nel cielo', url: 'https://science.nasa.gov/skywatching/', checked: '2026-11-23' },
  'nasa-solarstorms':    { org: 'NASA Science', title: 'Tempeste solari e meteorologia spaziale', url: 'https://science.nasa.gov/sun/solar-storms-and-flares/', checked: '2026-11-23' },
  'nasa-aurora':         { org: 'NASA Science', title: 'Aurore', url: 'https://science.nasa.gov/sun/solar-storms-and-flares/', checked: '2026-11-23' },
  'imo-calendar':        { org: 'IMO',         title: 'Calendario degli sciami meteorici', url: 'https://www.imo.net/resources/calendar/', checked: '2026-11-23' },
  'ign-geminids':        { org: 'IGN',         title: 'Geminidi — previsioni di attività', url: 'https://astronomia.ign.es/en/geminidas', checked: '2026-11-23' }
};

export const sourceById = (id) => SOURCES[id];

/** Risolve una lista di id in oggetti fonte, scartando gli id sconosciuti. */
export function resolveSources(ids = []) {
  return ids.map((id) => SOURCES[id] ? { id, ...SOURCES[id] } : null).filter(Boolean);
}

/** Fonti principali, per la pagina dedicata. */
export const PRIMARY_SOURCE_IDS = ['nasa', 'nasa-science', 'esa', 'jpl', 'eso-general', 'nasa-hubble', 'nasa-webb', 'spacex'];
