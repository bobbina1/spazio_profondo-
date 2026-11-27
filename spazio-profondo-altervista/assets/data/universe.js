/**
 * SPAZIO PROFONDO — Categorie di "Esplora l'universo"
 *
 * Ogni categoria ha: introduzione, approfondimento, dati, curiosità,
 * collegamenti ad argomenti correlati e fonti.
 * `epistemic` distingue fatti accertati, ipotesi e questioni aperte:
 * è un requisito del progetto, non un abbellimento.
 */

export const CATEGORIES = [
  {
    id: 'stelle',
    name: 'Stelle e costellazioni',
    order: 1,
    tagline: 'Fornaci nucleari e disegni immaginari',
    scaleLabel: 'da 0,08 a oltre 200 masse solari',
    visual: { base: '#ffd98a', accent: '#4da3ff', pattern: 'stars' },
    intro: 'Una stella è una sfera di plasma tenuta insieme dalla propria gravità, al cui interno la fusione nucleare trasforma elementi leggeri in elementi più pesanti. Le costellazioni, invece, non sono strutture fisiche: sono schemi che culture diverse hanno tracciato fra stelle che spesso non hanno alcun legame fra loro e si trovano a distanze molto diverse.',
    deep: [
      { h: 'Come funziona una stella', p: 'Nel nucleo, temperature di milioni di gradi permettono ai nuclei di idrogeno di fondersi in elio, liberando energia. Questa pressione verso l\'esterno bilancia esattamente la gravità che tende a far collassare la stella: un equilibrio chiamato equilibrio idrostatico, che dura finché c\'è combustibile.' },
      { h: 'Classificazione spettrale', p: 'Le stelle si classificano in base alla temperatura superficiale nelle classi O, B, A, F, G, K, M: dalle blu più calde, oltre 30.000 K, alle rosse più fredde, sotto i 3.500 K. Il Sole è una G2: una stella media, né grande né piccola. Il diagramma di Hertzsprung-Russell mette in relazione luminosità e temperatura e mostra come le stelle si distribuiscano in famiglie ben definite.' },
      { h: 'Il destino dipende dalla massa', p: 'Una stella come il Sole esaurirà l\'idrogeno fra circa 5 miliardi di anni, si espanderà in gigante rossa e lascerà una nana bianca. Le stelle con massa superiore a circa 8 volte quella solare terminano invece con una supernova, lasciando una stella di neutroni o un buco nero. La massa decide tutto: durata della vita, luminosità e tipo di morte.' },
      { h: 'Costellazioni: convenzione, non struttura', p: 'L\'Unione Astronomica Internazionale riconosce 88 costellazioni, che coprono l\'intera sfera celeste e servono come sistema di riferimento. Le stelle di una costellazione possono trovarsi a decine o centinaia di anni luce di distanza l\'una dall\'altra: la figura esiste soltanto dal nostro punto di vista.' }
    ],
    facts: [
      { k: 'Stella più vicina', v: 'Proxima Centauri, 4,24 anni luce' },
      { k: 'Costellazioni ufficiali', v: '88, riconosciute dall\'IAU' },
      { k: 'Temperatura superficiale', v: 'da ≈ 2.000 K a oltre 40.000 K' },
      { k: 'Durata della vita', v: 'da pochi milioni a migliaia di miliardi di anni' },
      { k: 'Stelle nella Via Lattea', v: 'stima fra 100 e 400 miliardi' }
    ],
    curiosities: [
      'Le stelle più massicce vivono meno: bruciano il loro combustibile molto più rapidamente, anche solo per qualche milione di anni.',
      'Le stelle rosse di piccola massa sono le più comuni, ma nessuna è visibile a occhio nudo: sono troppo deboli.',
      'La luce di molte stelle che vediamo è partita secoli fa: guardare il cielo è sempre guardare il passato.'
    ],
    openQuestions: [
      'Non sappiamo con precisione quale sia il limite superiore di massa per una stella.',
      'I dettagli della formazione delle primissime stelle, le cosiddette stelle di popolazione III, non sono ancora stati osservati direttamente.'
    ],
    related: ['nebulose', 'supernove', 'via-lattea'],
    sourceIds: ['nasa-stars', 'eso-general']
  },

  {
    id: 'nebulose',
    name: 'Nebulose',
    order: 2,
    tagline: 'Dove nascono e dove muoiono le stelle',
    scaleLabel: 'da pochi a centinaia di anni luce',
    visual: { base: '#b98aff', accent: '#5ee7e0', pattern: 'nebula' },
    intro: 'Una nebulosa è una nube di gas e polvere nello spazio interstellare. Alcune sono culle stellari in cui la gravità sta comprimendo il gas fino ad accendere nuove stelle; altre sono ciò che resta di stelle morte, che restituiscono al mezzo interstellare gli elementi prodotti nel loro nucleo.',
    deep: [
      { h: 'Nebulose a emissione', p: 'Il gas, prevalentemente idrogeno, viene ionizzato dalla radiazione ultravioletta di stelle giovani e massicce vicine, e riemette luce a lunghezze d\'onda caratteristiche. Il tipico colore rossastro nelle immagini corrisponde alla riga H-alfa dell\'idrogeno. La Nebulosa di Orione è l\'esempio più noto e il vivaio stellare più vicino a noi.' },
      { h: 'Nebulose a riflessione e nebulose scure', p: 'Le nebulose a riflessione non emettono luce propria: diffondono quella delle stelle vicine, e appaiono azzurrine perché la polvere diffonde meglio le lunghezze d\'onda corte. Le nebulose scure, invece, sono così dense da bloccare la luce retrostante: per questo in osservazione visibile appaiono come vuoti nel cielo. Gli strumenti infrarossi, come il James Webb, riescono a vedere al loro interno.' },
      { h: 'Nebulose planetarie: un nome fuorviante', p: 'Non hanno alcun rapporto con i pianeti. Il nome risale al Settecento, quando nei telescopi dell\'epoca apparivano come piccoli dischi. Sono in realtà gli involucri di gas espulsi da stelle di massa media al termine della loro vita, illuminati dalla nana bianca che resta al centro. Il Sole produrrà una nebulosa planetaria.' },
      { h: 'Il ciclo della materia', p: 'Le nebulose sono il punto di passaggio di un ciclo: le stelle si formano dal gas, producono elementi più pesanti, e li restituiscono con venti stellari ed esplosioni. Il carbonio, l\'ossigeno e il ferro presenti sulla Terra sono passati per questo ciclo prima che il Sistema Solare si formasse.' }
    ],
    facts: [
      { k: 'Nebulosa di Orione, distanza', v: '≈ 1.350 anni luce' },
      { k: 'Densità tipica', v: 'molto inferiore a quella del miglior vuoto di laboratorio' },
      { k: 'Composizione', v: 'idrogeno ≈ 70%, elio, tracce di elementi più pesanti e polvere' },
      { k: 'Temperature', v: 'da 10 K nelle nubi molecolari a 10.000 K nelle regioni ionizzate' }
    ],
    curiosities: [
      'Una nebulosa è meno densa dell\'aria che ci circonda di molti ordini di grandezza: appare massiccia solo perché è enorme.',
      'I colori delle immagini astronomiche sono spesso attribuiti a lunghezze d\'onda invisibili all\'occhio: sono rappresentazioni fedeli ai dati, non fotografie come le vedrebbe un occhio umano.',
      'La Nebulosa Testa di Cavallo è una nebulosa scura: la riconosciamo per la luce che blocca, non per quella che emette.'
    ],
    openQuestions: [
      'Non è ancora chiaro che cosa determini l\'efficienza con cui una nube molecolare trasforma il proprio gas in stelle.'
    ],
    related: ['stelle', 'supernove', 'deep-sky'],
    sourceIds: ['nasa-nebulae', 'nasa-webb']
  },

  {
    id: 'galassie',
    name: 'Galassie',
    order: 3,
    tagline: 'Sistemi di miliardi di stelle legati dalla gravità',
    scaleLabel: 'da migliaia a centinaia di migliaia di anni luce',
    visual: { base: '#6f9eff', accent: '#9a7bff', pattern: 'spiral' },
    intro: 'Una galassia è un sistema di stelle, gas, polvere e materia oscura tenuto insieme dalla gravità. Le osservazioni indicano che l\'universo osservabile contiene centinaia di miliardi di galassie, dalle nane con pochi milioni di stelle alle giganti ellittiche con migliaia di miliardi.',
    deep: [
      { h: 'Tipi morfologici', p: 'La classificazione di Hubble distingue galassie ellittiche, a spirale, a spirale barrata e irregolari. Le ellittiche contengono in prevalenza stelle vecchie e poco gas; le spirali, come la nostra, hanno bracci dove la formazione stellare è ancora attiva. La forma riflette la storia della galassia, in particolare quante fusioni ha subito.' },
      { h: 'Nuclei galattici attivi', p: 'Al centro di quasi tutte le grandi galassie si trova un buco nero supermassiccio. Quando accresce materia in modo intenso, il nucleo diventa estremamente luminoso: sono i quasar, visibili fino a distanze enormi. L\'attività del nucleo influenza la formazione stellare dell\'intera galassia, un meccanismo chiamato feedback.' },
      { h: 'Fusioni e ammassi', p: 'Le galassie non sono distribuite in modo uniforme: formano gruppi, ammassi e superammassi, collegati da filamenti di materia. Le collisioni fra galassie sono comuni: le stelle raramente si scontrano, ma le nubi di gas sì, innescando intense ondate di formazione stellare. La Via Lattea e la galassia di Andromeda si avvicinano e interagiranno fra alcuni miliardi di anni.' },
      { h: 'La prova della materia oscura', p: 'Le stelle nelle regioni esterne delle galassie ruotano più velocemente di quanto la massa visibile possa giustificare. Questa discrepanza, insieme alle lenti gravitazionali e alla struttura su grande scala, è alla base dell\'ipotesi della materia oscura: una componente che interagisce gravitazionalmente ma non emette luce. La sua esistenza è ben sostenuta dalle osservazioni, la sua natura è ancora sconosciuta.' }
    ],
    facts: [
      { k: 'Galassia maggiore più vicina', v: 'Andromeda (M31), ≈ 2,5 milioni di anni luce' },
      { k: 'Galassie nell\'universo osservabile', v: 'stima: centinaia di miliardi' },
      { k: 'Diametro tipico di una spirale', v: 'da 30.000 a 200.000 anni luce' },
      { k: 'Gruppo Locale', v: 'oltre 80 galassie, dominato da Via Lattea e Andromeda' }
    ],
    curiosities: [
      'Andromeda è visibile a occhio nudo da un cielo buio: è l\'oggetto più distante osservabile senza strumenti.',
      'In una collisione galattica le stelle quasi mai si scontrano: le distanze fra loro sono enormi rispetto alle loro dimensioni.',
      'Osservare una galassia lontana un miliardo di anni luce significa vederla come era un miliardo di anni fa.'
    ],
    openQuestions: [
      'La natura della materia oscura resta sconosciuta: ne misuriamo gli effetti, non abbiamo identificato di che cosa sia fatta.',
      'I "little red dots" scoperti dal James Webb nel 2022 non hanno ancora una spiegazione condivisa.'
    ],
    related: ['via-lattea', 'buchi-neri', 'deep-sky'],
    sourceIds: ['nasa-galaxies', 'nasa-webb', 'eso-general']
  },

  {
    id: 'via-lattea',
    name: 'Via Lattea',
    order: 4,
    tagline: 'La galassia che abitiamo, vista da dentro',
    scaleLabel: '≈ 100.000 anni luce di diametro',
    visual: { base: '#8fb6ff', accent: '#ffd98a', pattern: 'milkyway' },
    intro: 'La Via Lattea è una galassia a spirale barrata di circa 100.000 anni luce di diametro. Ci troviamo al suo interno, su uno dei bracci, a circa 26.000 anni luce dal centro: per questo la vediamo come una banda luminosa che attraversa il cielo, e per questo mapparla è particolarmente difficile.',
    deep: [
      { h: 'Struttura', p: 'Un bulbo centrale con una barra di stelle, un disco con bracci di spirale dove si concentrano gas e formazione stellare, un alone sferoidale di stelle vecchie e ammassi globulari, e un alone di materia oscura molto più esteso. Il Sole si trova nel braccio di Orione, una struttura secondaria, e compie un\'orbita completa in circa 230 milioni di anni.' },
      { h: 'Sagittarius A*', p: 'Al centro della Galassia c\'è un buco nero supermassiccio di circa 4 milioni di masse solari. La sua esistenza è stata dimostrata seguendo per decenni le orbite delle stelle che gli girano attorno, lavoro premiato con il Nobel per la fisica nel 2020. Nel 2022 l\'Event Horizon Telescope ne ha pubblicato l\'immagine dell\'ombra.' },
      { h: 'Il censimento di Gaia', p: 'La missione Gaia dell\'ESA ha misurato posizioni, distanze e moti di circa 1,8 miliardi di stelle, permettendo di ricostruire la struttura tridimensionale e la storia dinamica della Galassia. Da questi dati sono emerse tracce di antiche fusioni con galassie minori, i cui resti stellari sono ancora riconoscibili.' },
      { h: 'Il futuro', p: 'La Via Lattea e Andromeda si avvicinano a circa 110 km/s. Le simulazioni indicano un\'interazione fra alcuni miliardi di anni, che probabilmente porterà alla formazione di una galassia più grande. Il Sole non verrebbe distrutto: cambierebbe orbita.' }
    ],
    facts: [
      { k: 'Diametro', v: '≈ 100.000 anni luce' },
      { k: 'Distanza del Sole dal centro', v: '≈ 26.000 anni luce' },
      { k: 'Anno galattico', v: '≈ 230 milioni di anni' },
      { k: 'Massa di Sagittarius A*', v: '≈ 4 milioni di masse solari' },
      { k: 'Stelle', v: 'stima fra 100 e 400 miliardi' }
    ],
    curiosities: [
      'Il nome deriva dal suo aspetto: una scia lattiginosa nel cielo, che Galileo nel 1610 scoprì essere composta da innumerevoli stelle.',
      'Da un cielo urbano la Via Lattea è invisibile: l\'inquinamento luminoso la cancella completamente.',
      'Il Sistema Solare ha compiuto circa venti orbite galattiche da quando si è formato.'
    ],
    openQuestions: [
      'Il numero esatto dei bracci di spirale e la loro struttura precisa sono ancora discussi: dall\'interno è difficile ricostruire la forma d\'insieme.'
    ],
    related: ['galassie', 'buchi-neri', 'stelle'],
    sourceIds: ['nasa-milkyway', 'esa-gaia']
  },

  {
    id: 'buchi-neri',
    name: 'Buchi neri',
    order: 5,
    tagline: 'Regioni da cui nemmeno la luce può uscire',
    scaleLabel: 'da masse stellari a miliardi di masse solari',
    visual: { base: '#1b2340', accent: '#ffb648', pattern: 'blackhole' },
    intro: 'Un buco nero è una regione dello spaziotempo in cui la gravità è così intensa che nulla, nemmeno la luce, può sfuggire. Il confine oltre il quale non si torna si chiama orizzonte degli eventi. Non sono "aspirapolvere cosmici": la loro attrazione segue le stesse leggi di qualunque altra massa.',
    deep: [
      { h: 'Come si formano', p: 'I buchi neri di massa stellare nascono dal collasso del nucleo di stelle massicce al termine della loro vita, in genere sopra le 20-25 masse solari iniziali. I buchi neri supermassicci, da milioni a miliardi di masse solari, risiedono al centro delle galassie; come abbiano raggiunto masse così grandi così presto nella storia dell\'universo è una questione aperta.' },
      { h: 'Che cosa vediamo davvero', p: 'Un buco nero non si osserva direttamente: si osservano i suoi effetti. Il gas che cade verso di esso forma un disco di accrescimento che si riscalda fino a emettere raggi X; le stelle vicine mostrano orbite anomale; e nelle immagini dell\'Event Horizon Telescope si vede l\'ombra dell\'orizzonte stagliata contro il materiale luminoso circostante.' },
      { h: 'Prove osservative', p: 'Le evidenze convergono da fonti indipendenti: orbite stellari intorno a Sagittarius A*, emissione X dai dischi di accrescimento, onde gravitazionali da fusioni di buchi neri rilevate da LIGO e Virgo dal 2015, e le immagini di M87* nel 2019 e di Sagittarius A* nel 2022.' },
      { h: 'Limiti della nostra conoscenza', p: 'La relatività generale descrive l\'esterno di un buco nero con grande precisione, ma al centro prevede una singolarità, dove la teoria stessa perde validità. Capire cosa accada richiede una teoria quantistica della gravità, che ancora non abbiamo. Anche il destino dell\'informazione che cade in un buco nero resta un problema teorico irrisolto.' }
    ],
    facts: [
      { k: 'Prima immagine', v: 'M87*, pubblicata il 10 aprile 2019' },
      { k: 'Massa di M87*', v: '≈ 6,5 miliardi di masse solari' },
      { k: 'Prima rilevazione di onde gravitazionali', v: 'annunciata l\'11 febbraio 2016 (evento del settembre 2015)' },
      { k: 'Orizzonte di un buco nero di 10 masse solari', v: '≈ 30 km di raggio' }
    ],
    curiosities: [
      'Se il Sole diventasse un buco nero di pari massa, le orbite dei pianeti non cambierebbero: cambierebbe soltanto la luce.',
      'Vicino a un orizzonte degli eventi il tempo scorre più lentamente rispetto a un osservatore distante: è dilatazione gravitazionale del tempo, un effetto misurato e confermato.',
      'Stephen Hawking ha previsto che i buchi neri emettano una debolissima radiazione: un effetto teorico non ancora osservato.'
    ],
    openQuestions: [
      'Come si siano formati buchi neri supermassicci già pochi centinaia di milioni di anni dopo il Big Bang è un problema aperto.',
      'La radiazione di Hawking resta una previsione teorica senza conferma osservativa.',
      'Che cosa accada all\'informazione che attraversa l\'orizzonte degli eventi è ancora oggetto di dibattito.'
    ],
    related: ['supernove', 'galassie', 'via-lattea'],
    sourceIds: ['nasa-blackholes', 'eso-general']
  },

  {
    id: 'supernove',
    name: 'Supernove',
    order: 6,
    tagline: 'Le esplosioni che hanno costruito gli elementi',
    scaleLabel: 'fino a 10 miliardi di volte la luminosità del Sole',
    visual: { base: '#ff8f5e', accent: '#5ee7e0', pattern: 'burst' },
    intro: 'Una supernova è l\'esplosione di una stella, capace per settimane di brillare quanto un\'intera galassia. In quegli istanti si formano e si disperdono molti degli elementi pesanti dell\'universo: il ferro dell\'emoglobina e il calcio delle ossa provengono da stelle esplose prima che il Sole esistesse.',
    deep: [
      { h: 'Due meccanismi diversi', p: 'Le supernove di tipo II nascono dal collasso del nucleo di una stella massiccia che ha esaurito il combustibile: il nucleo implode e l\'onda di rimbalzo espelle gli strati esterni. Le supernove di tipo Ia hanno origine diversa: una nana bianca in un sistema binario accresce materia dalla compagna fino a superare una soglia critica e innescare una detonazione termonucleare che la distrugge completamente.' },
      { h: 'Candele standard e cosmologia', p: 'Le supernove di tipo Ia esplodono a una massa quasi costante, quindi con luminosità intrinseca molto simile: confrontando luminosità apparente e reale si ricava la distanza. Su questo metodo si basa la scoperta, nel 1998, che l\'espansione dell\'universo sta accelerando, risultato premiato con il Nobel per la fisica nel 2011.' },
      { h: 'Che cosa resta', p: 'Dopo un collasso del nucleo resta una stella di neutroni, oggetto di una decina di chilometri di diametro e densità estrema, o un buco nero se la massa è sufficiente. Il materiale espulso forma un resto di supernova in espansione, come la Nebulosa del Granchio, generata dall\'esplosione osservata e registrata nel 1054.' },
      { h: 'Nucleosintesi', p: 'Gli elementi fino al ferro si formano nelle stelle durante la loro vita. Gli elementi più pesanti richiedono condizioni estreme: supernove e, soprattutto, fusioni di stelle di neutroni, di cui nel 2017 è stata osservata la prima controparte di onde gravitazionali e luce.' }
    ],
    facts: [
      { k: 'Ultima supernova nella Via Lattea osservata a occhio nudo', v: '1604, documentata da Kepler' },
      { k: 'SN 1987A', v: 'nella Grande Nube di Magellano: la più vicina dell\'epoca moderna' },
      { k: 'Resto di supernova del 1054', v: 'Nebulosa del Granchio' },
      { k: 'Frequenza stimata nella nostra Galassia', v: '1-3 per secolo, molte nascoste dalla polvere' }
    ],
    curiosities: [
      'La supernova del 1054 fu registrata da astronomi cinesi e giapponesi: rimase visibile in pieno giorno per settimane.',
      'In un collasso del nucleo la maggior parte dell\'energia non esce come luce, ma come neutrini.',
      'Betelgeuse esploderà, ma su tempi di decine o centinaia di migliaia di anni: le sue variazioni di luminosità non sono un segnale imminente.'
    ],
    openQuestions: [
      'I dettagli del meccanismo che trasforma il collasso in esplosione non sono ancora completamente riprodotti dalle simulazioni.',
      'La natura esatta dei sistemi progenitori delle supernove di tipo Ia è ancora discussa.'
    ],
    related: ['stelle', 'nebulose', 'buchi-neri'],
    sourceIds: ['nasa-supernovae', 'nasa-chandra']
  },

  {
    id: 'deep-sky',
    name: 'Oggetti del cielo profondo',
    order: 7,
    tagline: 'Tutto ciò che sta oltre il Sistema Solare',
    scaleLabel: 'dai 4 anni luce ai miliardi',
    visual: { base: '#5ee7e0', accent: '#9a7bff', pattern: 'cluster' },
    intro: 'Con "cielo profondo" gli astronomi indicano gli oggetti esterni al Sistema Solare: ammassi stellari, nebulose, galassie. Sono i bersagli classici dell\'osservazione amatoriale, catalogati nel Settecento da Charles Messier e poi nel New General Catalogue.',
    deep: [
      { h: 'Ammassi aperti e globulari', p: 'Gli ammassi aperti, come le Pleiadi, raccolgono da poche decine a qualche migliaio di stelle giovani nate insieme, e si disperdono in alcune centinaia di milioni di anni. Gli ammassi globulari sono invece sistemi densi e sferici di centinaia di migliaia di stelle molto antiche, in orbita nell\'alone galattico: sono fra gli oggetti più vecchi della Galassia.' },
      { h: 'I cataloghi', p: 'Il catalogo di Messier contiene 110 oggetti, compilati per non confonderli con le comete. Il New General Catalogue, pubblicato nel 1888, ne elenca 7.840. Per questo lo stesso oggetto ha spesso più nomi: la Galassia di Andromeda è M31 e anche NGC 224.' },
      { h: 'Osservare con attenzione', p: 'A occhio nudo e al telescopio amatoriale, gli oggetti del cielo profondo appaiono quasi sempre grigi e tenui: i colori intensi delle immagini pubblicate derivano da lunghe esposizioni e dalla combinazione di filtri diversi. Riconoscere questa differenza è parte dell\'educazione dello sguardo, non una delusione.' }
    ],
    facts: [
      { k: 'Oggetti del catalogo Messier', v: '110' },
      { k: 'Oggetti nel New General Catalogue', v: '7.840' },
      { k: 'Pleiadi, distanza', v: '≈ 444 anni luce' },
      { k: 'Età degli ammassi globulari', v: 'fino a circa 13 miliardi di anni' }
    ],
    curiosities: [
      'Messier compilò il suo catalogo per sapere cosa ignorare: cercava comete, e quegli oggetti lo distraevano.',
      'Omega Centauri è così grande e massiccio che potrebbe essere il nucleo residuo di una galassia nana catturata.',
      'Dalle Pleiadi si vedono sei o sette stelle a occhio nudo, ma l\'ammasso ne contiene oltre mille.'
    ],
    openQuestions: [
      'L\'origine di alcuni ammassi globulari, e se alcuni siano nuclei di galassie nane assorbite, è ancora in discussione.'
    ],
    related: ['galassie', 'nebulose', 'stelle'],
    sourceIds: ['nasa-messier', 'eso-general']
  }
];

export const categoryById = (id) => CATEGORIES.find((c) => c.id === id);

/**
 * Riferimenti di scala per far percepire le distanze.
 * `lightTime` = tempo che la luce impiega a coprire la distanza.
 */
export const SCALE_STEPS = [
  { label: 'Terra-Luna',            lightTime: '1,3 secondi',      km: 384400 },
  { label: 'Terra-Sole',            lightTime: '8 minuti e 20 s',  km: 149600000 },
  { label: 'Terra-Nettuno',         lightTime: '≈ 4 ore',          km: 4350000000 },
  { label: 'Voyager 1',             lightTime: '24 ore',           km: 25902000000, note: 'al 18 novembre 2026' },
  { label: 'Proxima Centauri',      lightTime: '4,24 anni',        km: 40100000000000 },
  { label: 'Centro della Galassia', lightTime: '≈ 26.000 anni',    km: 2.46e17 },
  { label: 'Galassia di Andromeda', lightTime: '2,5 milioni di anni', km: 2.4e19 }
];
