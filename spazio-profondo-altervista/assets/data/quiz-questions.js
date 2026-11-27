/**
 * SPAZIO PROFONDO — Archivio domande del quiz
 *
 * Aggiungere domande NON richiede modifiche al motore: basta inserire
 * un oggetto in questo array rispettando il formato del tipo scelto.
 * Il motore estrae a sorte rispettando categoria e difficoltà richieste,
 * senza duplicati all'interno della stessa partita.
 *
 * Campi comuni obbligatori:
 *   id, type, category, difficulty, text, explanation, sourceId
 *
 * Tipi e campo risposta:
 *   'multipla'       -> options: string[], correct: indice
 *   'vero-falso'     -> correct: true | false
 *   'aperta'         -> accept: string[]  (varianti accettabili)
 *   'indovina-pianeta'  -> clues: string[], correct: id pianeta
 *   'indovina-oggetto'  -> clues: string[], options: string[], correct: indice
 *   'ordina'         -> items: [{id,label}], solution: id[] (ordine corretto)
 *   'abbina'         -> pairs: [{left, right}]
 *   'riconosci-fenomeno' -> sim: string, options: string[], correct: indice
 */

export const CATEGORIES_QUIZ = [
  { id: 'sistema-solare', label: 'Sistema Solare' },
  { id: 'pianeti',        label: 'Pianeti' },
  { id: 'stelle',         label: 'Stelle' },
  { id: 'galassie',       label: 'Galassie' },
  { id: 'luna',           label: 'Luna' },
  { id: 'missioni',       label: 'Missioni spaziali' },
  { id: 'storia',         label: 'Storia dell\'esplorazione' },
  { id: 'fisica',         label: 'Fisica' },
  { id: 'astrofisica',    label: 'Astrofisica' },
  { id: 'universo',       label: 'Universo' },
  { id: 'curiosita',      label: 'Curiosità scientifiche' }
];

export const DIFFICULTIES = [
  { id: 'principiante', label: 'Principiante', color: 'ok' },
  { id: 'intermedio',   label: 'Intermedio',   color: 'blue' },
  { id: 'avanzato',     label: 'Avanzato',     color: 'violet' }
];

export const QUESTIONS = [
  /* ===================== SCELTA MULTIPLA ===================== */
  { id: 'm001', type: 'multipla', category: 'pianeti', difficulty: 'principiante',
    text: 'Qual è il pianeta più caldo del Sistema Solare?',
    options: ['Mercurio', 'Venere', 'Marte', 'Giove'], correct: 1,
    explanation: 'Venere, con una temperatura superficiale di circa 464 °C. Pur essendo più lontano dal Sole di Mercurio, la sua densissima atmosfera di anidride carbonica trattiene il calore con un effetto serra estremo.',
    sourceId: 'nasa-venus' },

  { id: 'm002', type: 'multipla', category: 'pianeti', difficulty: 'principiante',
    text: 'Quale pianeta ha il sistema di anelli più evidente?',
    options: ['Giove', 'Urano', 'Saturno', 'Nettuno'], correct: 2,
    explanation: 'Saturno. Tutti i quattro giganti hanno anelli, ma solo quelli di Saturno sono abbastanza luminosi ed estesi da essere visibili con un piccolo telescopio.',
    sourceId: 'nasa-saturn' },

  { id: 'm003', type: 'multipla', category: 'sistema-solare', difficulty: 'principiante',
    text: 'Quanti pianeti compongono il Sistema Solare?',
    options: ['Sette', 'Otto', 'Nove', 'Dieci'], correct: 1,
    explanation: 'Otto. Plutone è stato riclassificato come pianeta nano nel 2006, dopo la scoperta di molti corpi simili nella fascia di Kuiper.',
    sourceId: 'nasa-dwarf' },

  { id: 'm004', type: 'multipla', category: 'sistema-solare', difficulty: 'principiante',
    text: 'Quanto tempo impiega la luce del Sole per raggiungere la Terra?',
    options: ['8 secondi', '8 minuti e 20 secondi', '8 ore', '80 minuti'], correct: 1,
    explanation: 'Circa 8 minuti e 20 secondi: la distanza media è di 149,6 milioni di km, e la luce viaggia a circa 300.000 km/s.',
    sourceId: 'nasa-sun' },

  { id: 'm005', type: 'multipla', category: 'pianeti', difficulty: 'intermedio',
    text: 'Su quale pianeta un giorno dura più di un anno?',
    options: ['Mercurio', 'Venere', 'Urano', 'Nettuno'], correct: 1,
    explanation: 'Venere: ruota su se stesso in 243 giorni terrestri, mentre completa un\'orbita in 224,7 giorni. La rotazione, inoltre, è retrograda.',
    sourceId: 'nasa-venus' },

  { id: 'm006', type: 'multipla', category: 'pianeti', difficulty: 'intermedio',
    text: 'Qual è il vulcano più alto del Sistema Solare?',
    options: ['Maxwell Montes, su Venere', 'Olympus Mons, su Marte', 'Mauna Kea, sulla Terra', 'Ahuna Mons, su Cerere'], correct: 1,
    explanation: 'Olympus Mons su Marte, alto circa 22 km. L\'assenza di tettonica a placche ha permesso alla lava di accumularsi sempre nello stesso punto per lunghissimi periodi.',
    sourceId: 'nasa-mars' },

  { id: 'm007', type: 'multipla', category: 'pianeti', difficulty: 'avanzato',
    text: 'Perché Urano ha l\'asse di rotazione inclinato di quasi 98 gradi?',
    options: ['Per l\'attrazione gravitazionale di Nettuno', 'Probabilmente a causa di un impatto gigantesco in epoca primordiale', 'Per effetto dei suoi anelli', 'Perché ruota in senso retrogrado'], correct: 1,
    explanation: 'L\'ipotesi più accreditata è una o più collisioni con corpi di grandi dimensioni nelle fasi iniziali della formazione del Sistema Solare. Resta un\'ipotesi: non abbiamo prove dirette.',
    sourceId: 'nasa-uranus' },

  { id: 'm008', type: 'multipla', category: 'luna', difficulty: 'principiante',
    text: 'Perché dalla Terra vediamo sempre la stessa faccia della Luna?',
    options: ['Perché la Luna non ruota su se stessa', 'Perché ruota in sincronia con la propria orbita', 'Perché l\'altra faccia è sempre in ombra', 'Perché la Terra blocca la luce'], correct: 1,
    explanation: 'La Luna ha una rotazione sincrona: compie un giro su se stessa nello stesso tempo in cui orbita attorno alla Terra. Ruota, quindi, ma ci mostra sempre lo stesso emisfero.',
    sourceId: 'nasa-moon' },

  { id: 'm009', type: 'multipla', category: 'luna', difficulty: 'intermedio',
    text: 'Che cosa sono i "mari" lunari?',
    options: ['Antichi bacini di acqua ghiacciata', 'Pianure di lava basaltica solidificata', 'Depressioni riempite di polvere', 'Zone coperte di ghiaccio di anidride carbonica'], correct: 1,
    explanation: 'Sono pianure di basalto, formate da colate di lava che hanno riempito grandi bacini da impatto fra 3 e 3,5 miliardi di anni fa. Il nome risale agli osservatori del Seicento, che li credevano distese d\'acqua.',
    sourceId: 'nasa-moon' },

  { id: 'm010', type: 'multipla', category: 'luna', difficulty: 'avanzato',
    text: 'Perché le eclissi non si verificano ogni mese?',
    options: ['Perché la Luna è troppo piccola', 'Perché l\'orbita lunare è inclinata di circa 5° rispetto a quella terrestre', 'Perché la Terra ruota troppo velocemente', 'Perché la distanza Terra-Luna cambia continuamente'], correct: 1,
    explanation: 'L\'inclinazione di circa 5° fa sì che di norma la Luna passi sopra o sotto la linea Terra-Sole. Le eclissi avvengono solo quando la fase cade vicino a un nodo, cioè all\'intersezione dei due piani orbitali.',
    sourceId: 'nasa-eclipses' },

  { id: 'm011', type: 'multipla', category: 'stelle', difficulty: 'principiante',
    text: 'Qual è la stella più vicina al Sistema Solare, dopo il Sole?',
    options: ['Sirio', 'Alpha Centauri A', 'Proxima Centauri', 'Betelgeuse'], correct: 2,
    explanation: 'Proxima Centauri, a 4,24 anni luce. È una nana rossa troppo debole per essere visibile a occhio nudo, nonostante la vicinanza.',
    sourceId: 'nasa-stars' },

  { id: 'm012', type: 'multipla', category: 'stelle', difficulty: 'intermedio',
    text: 'Che cosa determina principalmente il destino finale di una stella?',
    options: ['Il colore', 'La massa', 'La distanza dal centro galattico', 'La velocità di rotazione'], correct: 1,
    explanation: 'La massa. Stelle come il Sole terminano come nane bianche, mentre quelle sopra circa 8 masse solari esplodono come supernove, lasciando una stella di neutroni o un buco nero.',
    sourceId: 'nasa-stars' },

  { id: 'm013', type: 'multipla', category: 'stelle', difficulty: 'avanzato',
    text: 'Nella classificazione spettrale, quale sequenza va dalle stelle più calde alle più fredde?',
    options: ['M, K, G, F, A, B, O', 'O, B, A, F, G, K, M', 'A, B, C, D, E, F, G', 'G, F, A, O, B, K, M'], correct: 1,
    explanation: 'La sequenza è O, B, A, F, G, K, M: dalle blu oltre 30.000 K alle rosse sotto 3.500 K. Il Sole è una stella di classe G2.',
    sourceId: 'nasa-stars' },

  { id: 'm014', type: 'multipla', category: 'galassie', difficulty: 'principiante',
    text: 'Come si chiama la galassia in cui si trova il Sistema Solare?',
    options: ['Andromeda', 'Via Lattea', 'Galassia del Triangolo', 'Nube di Magellano'], correct: 1,
    explanation: 'La Via Lattea, una galassia a spirale barrata di circa 100.000 anni luce di diametro. Il Sole si trova a circa 26.000 anni luce dal centro.',
    sourceId: 'nasa-milkyway' },

  { id: 'm015', type: 'multipla', category: 'galassie', difficulty: 'intermedio',
    text: 'Che cosa si trova al centro della Via Lattea?',
    options: ['Una stella gigante', 'Un buco nero supermassiccio', 'Un ammasso di nebulose', 'Una regione vuota'], correct: 1,
    explanation: 'Sagittarius A*, un buco nero supermassiccio di circa 4 milioni di masse solari. La sua esistenza è stata dimostrata seguendo per decenni le orbite delle stelle circostanti.',
    sourceId: 'nasa-milkyway' },

  { id: 'm016', type: 'multipla', category: 'galassie', difficulty: 'avanzato',
    text: 'Quale osservazione ha portato all\'ipotesi della materia oscura nelle galassie?',
    options: ['Il colore delle stelle nei bracci di spirale', 'Le stelle esterne ruotano più velocemente di quanto la massa visibile giustifichi', 'La presenza di buchi neri centrali', 'L\'assenza di gas nelle galassie ellittiche'], correct: 1,
    explanation: 'Le curve di rotazione galattiche restano piatte verso l\'esterno, invece di diminuire: serve una massa non visibile. L\'evidenza è solida, ma la natura della materia oscura è ancora sconosciuta.',
    sourceId: 'nasa-galaxies' },

  { id: 'm017', type: 'multipla', category: 'missioni', difficulty: 'principiante',
    text: 'In quale anno sono state lanciate le sonde Voyager?',
    options: ['1969', '1977', '1985', '1990'], correct: 1,
    explanation: 'Nel 1977: il Voyager 2 il 20 agosto e il Voyager 1 il 5 settembre. Sfruttavano un allineamento dei pianeti esterni che si ripete ogni 176 anni.',
    sourceId: 'nasa-voyager-where' },

  { id: 'm018', type: 'multipla', category: 'missioni', difficulty: 'intermedio',
    text: 'Quale sonda ha effettuato l\'unico sorvolo ravvicinato di Urano e Nettuno?',
    options: ['Voyager 1', 'Voyager 2', 'Pioneer 11', 'New Horizons'], correct: 1,
    explanation: 'Il Voyager 2, nel 1986 e nel 1989. Restano gli unici incontri ravvicinati con i giganti ghiacciati nella storia dell\'esplorazione spaziale.',
    sourceId: 'nasa-voyager-where' },

  { id: 'm019', type: 'multipla', category: 'missioni', difficulty: 'intermedio',
    text: 'Che cosa contiene il Golden Record a bordo delle sonde Voyager?',
    options: ['Dati scientifici cifrati', 'Suoni, musica e immagini della Terra', 'Un dispositivo per cercare forme di vita', 'Le mappe di navigazione della missione'], correct: 1,
    explanation: 'Un disco placcato in oro con 115 immagini, saluti in 55 lingue, suoni naturali e musica. È un messaggio simbolico: le sonde non stanno cercando attivamente forme di vita.',
    sourceId: 'nasa-voyager-where' },

  { id: 'm020', type: 'multipla', category: 'missioni', difficulty: 'avanzato',
    text: 'Perché la missione Cassini è stata deliberatamente distrutta nell\'atmosfera di Saturno?',
    options: ['Perché aveva esaurito gli obiettivi scientifici', 'Per evitare di contaminare satelliti potenzialmente abitabili', 'Per misurare la densità atmosferica', 'Perché aveva perso il contatto radio'], correct: 1,
    explanation: 'Con poco carburante residuo, un orbiter fuori controllo avrebbe potuto impattare Encelado o Titano, contaminandoli con microrganismi terrestri. È stata una scelta di protezione planetaria.',
    sourceId: 'nasa-cassini' },

  { id: 'm021', type: 'multipla', category: 'storia', difficulty: 'principiante',
    text: 'Chi è stato il primo essere umano ad andare nello spazio?',
    options: ['Neil Armstrong', 'Jurij Gagarin', 'Alan Shepard', 'Valentina Tereshkova'], correct: 1,
    explanation: 'Jurij Gagarin, il 12 aprile 1961, con un\'orbita completa attorno alla Terra in 108 minuti a bordo della Vostok 1.',
    sourceId: 'nasa-apollo' },

  { id: 'm022', type: 'multipla', category: 'storia', difficulty: 'principiante',
    text: 'Quante missioni Apollo hanno portato astronauti sulla superficie lunare?',
    options: ['Quattro', 'Sei', 'Sette', 'Nove'], correct: 1,
    explanation: 'Sei: Apollo 11, 12, 14, 15, 16 e 17, per un totale di dodici persone sulla superficie. Apollo 13 non è atterrata a causa di un\'avaria.',
    sourceId: 'nasa-apollo' },

  { id: 'm023', type: 'multipla', category: 'storia', difficulty: 'intermedio',
    text: 'Qual è stato il primo satellite artificiale messo in orbita?',
    options: ['Explorer 1', 'Sputnik 1', 'Vanguard 1', 'Telstar'], correct: 1,
    explanation: 'Lo Sputnik 1, lanciato dall\'Unione Sovietica il 4 ottobre 1957: l\'evento che ha dato inizio all\'era spaziale.',
    sourceId: 'nasa-apollo' },

  { id: 'm024', type: 'multipla', category: 'fisica', difficulty: 'principiante',
    text: 'Che cos\'è un anno luce?',
    options: ['Il tempo che la luce impiega per attraversare la Galassia', 'La distanza percorsa dalla luce in un anno', 'Un\'unità di tempo astronomico', 'La durata dell\'orbita terrestre'], correct: 1,
    explanation: 'È una distanza, non un tempo: circa 9.460 miliardi di chilometri, lo spazio percorso dalla luce in un anno nel vuoto.',
    sourceId: 'nasa-expansion' },

  { id: 'm025', type: 'multipla', category: 'fisica', difficulty: 'intermedio',
    text: 'Che cos\'è una fionda gravitazionale?',
    options: ['Un motore a propulsione nucleare', 'L\'uso della gravità di un pianeta per cambiare velocità e direzione di una sonda', 'Un sistema di frenata atmosferica', 'Un tipo di orbita circolare'], correct: 1,
    explanation: 'Una sonda che passa vicino a un pianeta in movimento può guadagnare o perdere velocità rispetto al Sole, senza consumare carburante. I Voyager e BepiColombo si basano su questa tecnica.',
    sourceId: 'esa-bepi' },

  { id: 'm026', type: 'multipla', category: 'fisica', difficulty: 'avanzato',
    text: 'Che cosa misurano gli interferometri LIGO e Virgo?',
    options: ['Le onde radio delle pulsar', 'Variazioni di lunghezza dei loro bracci causate dalle onde gravitazionali', 'La radiazione cosmica di fondo', 'La massa dei buchi neri tramite lenti gravitazionali'], correct: 1,
    explanation: 'Misurano variazioni di lunghezza inferiori al millesimo del diametro di un protone fra due bracci perpendicolari lunghi chilometri, prodotte dal passaggio di un\'onda gravitazionale.',
    sourceId: 'ligo-virgo' },

  { id: 'm027', type: 'multipla', category: 'astrofisica', difficulty: 'intermedio',
    text: 'Che cos\'è l\'orizzonte degli eventi di un buco nero?',
    options: ['La superficie solida del buco nero', 'Il confine oltre il quale nulla può sfuggire, nemmeno la luce', 'Il disco di gas che lo circonda', 'La regione in cui il tempo si ferma del tutto'], correct: 1,
    explanation: 'È un confine geometrico, non una superficie materiale: superarlo significa non poter più tornare indietro, perché nessun segnale può risalire verso l\'esterno.',
    sourceId: 'nasa-blackholes' },

  { id: 'm028', type: 'multipla', category: 'astrofisica', difficulty: 'avanzato',
    text: 'Perché le supernove di tipo Ia sono usate come "candele standard"?',
    options: ['Perché sono le più luminose dell\'universo', 'Perché esplodono a una massa quasi costante, quindi con luminosità intrinseca simile', 'Perché si verificano a intervalli regolari', 'Perché emettono solo luce visibile'], correct: 1,
    explanation: 'Una nana bianca esplode al superamento di una soglia critica di massa, quindi con energia molto simile. Confrontando luminosità reale e apparente si ricava la distanza: così è stata scoperta l\'accelerazione dell\'espansione cosmica.',
    sourceId: 'nasa-supernovae' },

  { id: 'm029', type: 'multipla', category: 'universo', difficulty: 'principiante',
    text: 'Quanti anni ha, secondo le stime attuali, l\'universo?',
    options: ['4,6 miliardi', '13,8 miliardi', '100 miliardi', '500 milioni'], correct: 1,
    explanation: 'Circa 13,8 miliardi di anni, stima ottenuta combinando le misure della radiazione cosmica di fondo con quelle dell\'espansione.',
    sourceId: 'nasa-expansion' },

  { id: 'm030', type: 'multipla', category: 'universo', difficulty: 'intermedio',
    text: 'Che cosa indica il redshift della luce di una galassia lontana?',
    options: ['Che la galassia è più calda', 'Che si sta allontanando da noi', 'Che contiene più polvere', 'Che è più giovane della nostra'], correct: 1,
    explanation: 'La luce arriva spostata verso lunghezze d\'onda maggiori perché lo spazio fra noi e la galassia si è dilatato durante il viaggio della luce.',
    sourceId: 'nasa-expansion' },

  { id: 'm031', type: 'multipla', category: 'universo', difficulty: 'avanzato',
    text: 'Che cos\'è la "tensione di Hubble"?',
    options: ['Una forza che contrasta l\'espansione', 'Il disaccordo fra le misure della costante di Hubble ottenute con metodi diversi', 'L\'effetto della materia oscura sulle galassie', 'La deformazione dello spazio vicino ai buchi neri'], correct: 1,
    explanation: 'Le misure basate sulle supernove vicine e quelle basate sulla radiazione cosmica di fondo danno valori che non coincidono entro gli errori: un problema aperto della cosmologia.',
    sourceId: 'nasa-expansion' },

  { id: 'm032', type: 'multipla', category: 'curiosita', difficulty: 'principiante',
    text: 'Quale pianeta galleggerebbe nell\'acqua, se esistesse una vasca abbastanza grande?',
    options: ['Giove', 'Saturno', 'Nettuno', 'Urano'], correct: 1,
    explanation: 'Saturno: la sua densità media è di 0,687 g/cm³, inferiore a quella dell\'acqua. È l\'unico pianeta del Sistema Solare in questa condizione.',
    sourceId: 'nasa-saturn' },

  { id: 'm033', type: 'multipla', category: 'curiosita', difficulty: 'intermedio',
    text: 'Di quanto si allontana la Luna dalla Terra ogni anno?',
    options: ['Circa 3,8 millimetri', 'Circa 3,8 centimetri', 'Circa 3,8 metri', 'Non si allontana'], correct: 1,
    explanation: 'Circa 3,8 cm all\'anno, misurati con i retroriflettori laser lasciati dalle missioni Apollo. Di conseguenza i giorni terrestri si allungano lentamente.',
    sourceId: 'nasa-moon' },

  { id: 'm034', type: 'multipla', category: 'sistema-solare', difficulty: 'intermedio',
    text: 'Che cos\'è la fascia degli asteroidi?',
    options: ['I resti di un pianeta distrutto', 'Materiale che la gravità di Giove ha impedito di aggregarsi in un pianeta', 'Un anello di ghiaccio attorno al Sole', 'Un gruppo di comete catturate'], correct: 1,
    explanation: 'Le perturbazioni gravitazionali di Giove hanno impedito al materiale di quella regione di formare un corpo unico. La massa totale della fascia è circa il 3% di quella della Luna.',
    sourceId: 'nasa-asteroids' },

  { id: 'm035', type: 'multipla', category: 'sistema-solare', difficulty: 'avanzato',
    text: 'Che cos\'è l\'eliopausa?',
    options: ['Il bordo esterno della fascia di Kuiper', 'Il confine in cui la pressione del vento solare si equilibra con quella del mezzo interstellare', 'La regione di formazione delle comete', 'La zona in cui il Sole perde massa'], correct: 1,
    explanation: 'È il confine dell\'eliosfera. Il Voyager 1 l\'ha attraversata nel 2012, il Voyager 2 nel 2018: sono gli unici strumenti ad aver misurato direttamente il plasma interstellare.',
    sourceId: 'nasa-voyager-where' },

  { id: 'm036', type: 'multipla', category: 'pianeti', difficulty: 'intermedio',
    text: 'Quale satellite del Sistema Solare è più grande del pianeta Mercurio?',
    options: ['Europa', 'Titano', 'Ganimede', 'Tritone'], correct: 2,
    explanation: 'Ganimede, con 5.268 km di diametro, è il satellite più grande del Sistema Solare e supera Mercurio. È anche l\'unico satellite con un campo magnetico proprio.',
    sourceId: 'nasa-jupiter' },

  { id: 'm037', type: 'multipla', category: 'pianeti', difficulty: 'avanzato',
    text: 'Quale satellite ha laghi e fiumi di metano ed etano liquidi?',
    options: ['Encelado', 'Titano', 'Io', 'Callisto'], correct: 1,
    explanation: 'Titano, il satellite maggiore di Saturno: l\'unico corpo oltre la Terra con liquidi stabili in superficie, confermati dalla missione Cassini-Huygens.',
    sourceId: 'nasa-saturn' },

  { id: 'm038', type: 'multipla', category: 'missioni', difficulty: 'intermedio',
    text: 'Qual è l\'oggetto costruito dall\'uomo più veloce della storia?',
    options: ['Voyager 1', 'New Horizons', 'Parker Solar Probe', 'La sonda Helios 2'], correct: 2,
    explanation: 'Parker Solar Probe, che ha raggiunto circa 692.000 km/h durante i passaggi ravvicinati al Sole. La velocità deriva dalla caduta nel campo gravitazionale solare.',
    sourceId: 'nasa-parker' },

  { id: 'm039', type: 'multipla', category: 'missioni', difficulty: 'avanzato',
    text: 'Quale problema fondamentale Parker Solar Probe è stata costruita per affrontare?',
    options: ['L\'origine delle macchie solari', 'Il motivo per cui la corona è molto più calda della superficie solare', 'La misura della massa del Sole', 'La previsione delle eclissi'], correct: 1,
    explanation: 'Il problema del riscaldamento coronale, posto negli anni Quaranta: la corona supera il milione di gradi mentre la superficie è a circa 5.500 °C. Nonostante decine di passaggi, la questione resta aperta.',
    sourceId: 'nasa-parker' },

  { id: 'm040', type: 'multipla', category: 'luna', difficulty: 'avanzato',
    text: 'Perché le missioni lunari moderne puntano al polo sud?',
    options: ['Perché la gravità è minore', 'Perché nei crateri in ombra permanente c\'è ghiaccio d\'acqua', 'Perché è la zona più pianeggiante', 'Perché è sempre illuminato dal Sole'], correct: 1,
    explanation: 'Nei crateri polari in ombra perenne la temperatura resta sotto i −200 °C e si conserva ghiaccio d\'acqua, utilizzabile per acqua potabile, ossigeno e propellente prodotti sul posto.',
    sourceId: 'nasa-moon' },

  { id: 'm041', type: 'multipla', category: 'stelle', difficulty: 'intermedio',
    text: 'Che cos\'è una nana bianca?',
    options: ['Una stella appena formata', 'Il nucleo residuo di una stella di massa media che ha esaurito il combustibile', 'Una stella di piccola massa molto fredda', 'Il nucleo di una galassia nana'], correct: 1,
    explanation: 'È il residuo compatto e caldo di una stella come il Sole, che dopo la fase di gigante rossa espelle gli strati esterni. Non produce più energia per fusione e si raffredda lentamente.',
    sourceId: 'nasa-stars' },

  { id: 'm042', type: 'multipla', category: 'astrofisica', difficulty: 'avanzato',
    text: 'Dove si formano principalmente gli elementi più pesanti del ferro?',
    options: ['Nel nucleo delle stelle come il Sole', 'In supernove e fusioni di stelle di neutroni', 'Nelle nebulose a emissione', 'Durante il Big Bang'], correct: 1,
    explanation: 'La fusione stellare si ferma al ferro, oltre il quale non libera energia. Gli elementi più pesanti richiedono ambienti estremi come le supernove e, soprattutto, le fusioni di stelle di neutroni.',
    sourceId: 'nasa-supernovae' },

  { id: 'm043', type: 'multipla', category: 'curiosita', difficulty: 'avanzato',
    text: 'Che cosa rende possibile un\'eclissi solare totale dalla Terra?',
    options: ['La Luna è grande quanto il Sole', 'Sole e Luna hanno dimensioni apparenti quasi identiche nel cielo', 'La Luna riflette la luce solare', 'L\'atmosfera terrestre amplifica l\'ombra lunare'], correct: 1,
    explanation: 'Il Sole è circa 400 volte più grande della Luna, ma anche circa 400 volte più distante: i due dischi appaiono quasi uguali. È una coincidenza della nostra epoca, non una regola generale.',
    sourceId: 'nasa-eclipses' },

  { id: 'm044', type: 'multipla', category: 'galassie', difficulty: 'intermedio',
    text: 'Qual è la galassia maggiore più vicina alla Via Lattea?',
    options: ['La Grande Nube di Magellano', 'La Galassia di Andromeda', 'La Galassia del Triangolo', 'Centaurus A'], correct: 1,
    explanation: 'Andromeda (M31), a circa 2,5 milioni di anni luce. È l\'oggetto più distante osservabile a occhio nudo da un cielo buio.',
    sourceId: 'nasa-galaxies' },

  { id: 'm045', type: 'multipla', category: 'fisica', difficulty: 'avanzato',
    text: 'Che cosa accade al tempo vicino a un campo gravitazionale molto intenso?',
    options: ['Scorre più velocemente', 'Scorre più lentamente rispetto a un osservatore distante', 'Si ferma completamente', 'Non viene influenzato'], correct: 1,
    explanation: 'È la dilatazione gravitazionale del tempo prevista dalla relatività generale, confermata sperimentalmente e di cui si tiene conto nei sistemi di navigazione satellitare.',
    sourceId: 'nasa-blackholes' },

  { id: 'm046', type: 'multipla', category: 'sistema-solare', difficulty: 'principiante',
    text: 'Quale percentuale della massa del Sistema Solare è concentrata nel Sole?',
    options: ['Circa il 50%', 'Circa il 75%', 'Circa il 99,86%', 'Circa il 90%'], correct: 2,
    explanation: 'Il 99,86%: tutti i pianeti, satelliti, asteroidi e comete insieme costituiscono appena lo 0,14% della massa totale.',
    sourceId: 'nasa-sun' },

  { id: 'm047', type: 'multipla', category: 'storia', difficulty: 'intermedio',
    text: 'Quando è stata pubblicata la prima immagine dell\'ombra di un buco nero?',
    options: ['2004', '2012', '2019', '2022'], correct: 2,
    explanation: 'Il 10 aprile 2019, dall\'Event Horizon Telescope, e riguardava M87*. L\'immagine di Sagittarius A*, al centro della nostra Galassia, è arrivata nel 2022.',
    sourceId: 'eht' },

  { id: 'm048', type: 'multipla', category: 'missioni', difficulty: 'principiante',
    text: 'Quale missione ha sorvolato Plutone per la prima volta?',
    options: ['Voyager 2', 'New Horizons', 'Cassini', 'Pioneer 10'], correct: 1,
    explanation: 'New Horizons, il 14 luglio 2015, dopo nove anni di viaggio. Ha rivelato un mondo geologicamente attivo, con ghiacciai di azoto e montagne di ghiaccio d\'acqua.',
    sourceId: 'nasa-newhorizons' },

  { id: 'm049', type: 'multipla', category: 'universo', difficulty: 'intermedio',
    text: 'Perché il James Webb Space Telescope osserva nell\'infrarosso?',
    options: ['Perché l\'infrarosso attraversa meglio l\'atmosfera', 'Perché la luce delle galassie più antiche ci arriva spostata verso lunghezze d\'onda maggiori', 'Perché consuma meno energia', 'Perché l\'infrarosso è più luminoso'], correct: 1,
    explanation: 'L\'espansione dell\'universo sposta verso il rosso la luce degli oggetti più distanti: ciò che partì come visibile arriva come infrarosso. Per questo Webb deve anche essere mantenuto molto freddo.',
    sourceId: 'nasa-webb' },

  { id: 'm050', type: 'multipla', category: 'curiosita', difficulty: 'intermedio',
    text: 'Quanto dura un "anno galattico", cioè un\'orbita del Sole attorno al centro della Via Lattea?',
    options: ['230 milioni di anni', '1 milione di anni', '4,6 miliardi di anni', '26.000 anni'], correct: 0,
    explanation: 'Circa 230 milioni di anni. Da quando si è formato, il Sistema Solare ha compiuto una ventina di orbite galattiche.',
    sourceId: 'nasa-milkyway' },

  /* ===================== VERO O FALSO ===================== */
  { id: 'v001', type: 'vero-falso', category: 'luna', difficulty: 'principiante',
    text: 'Le fasi lunari sono causate dall\'ombra della Terra sulla Luna.',
    correct: false,
    explanation: 'Falso. Le fasi dipendono da quanta parte dell\'emisfero illuminato dal Sole è rivolta verso di noi. L\'ombra terrestre interviene soltanto nelle eclissi di Luna.',
    sourceId: 'nasa-moon' },

  { id: 'v002', type: 'vero-falso', category: 'luna', difficulty: 'intermedio',
    text: 'Il lato nascosto della Luna è sempre buio.',
    correct: false,
    explanation: 'Falso. Riceve luce solare esattamente come il lato visibile: semplicemente non è mai rivolto verso la Terra, a causa della rotazione sincrona.',
    sourceId: 'nasa-moon' },

  { id: 'v003', type: 'vero-falso', category: 'pianeti', difficulty: 'principiante',
    text: 'Marte è rosso perché è molto caldo.',
    correct: false,
    explanation: 'Falso. Il colore deriva dagli ossidi di ferro presenti nella polvere superficiale. La temperatura media di Marte è di circa −63 °C.',
    sourceId: 'nasa-mars' },

  { id: 'v004', type: 'vero-falso', category: 'astrofisica', difficulty: 'intermedio',
    text: 'Un buco nero aspira tutta la materia che si trova nelle sue vicinanze.',
    correct: false,
    explanation: 'Falso. La sua attrazione gravitazionale segue le stesse leggi di qualunque altra massa: un oggetto in orbita stabile a distanza sufficiente resta in orbita. Se il Sole diventasse un buco nero di pari massa, le orbite dei pianeti non cambierebbero.',
    sourceId: 'nasa-blackholes' },

  { id: 'v005', type: 'vero-falso', category: 'missioni', difficulty: 'intermedio',
    text: 'Le sonde Voyager sono state progettate per cercare forme di vita extraterrestre.',
    correct: false,
    explanation: 'Falso. Il loro obiettivo era studiare i pianeti esterni e poi l\'eliosfera. Il Golden Record che trasportano è un messaggio simbolico, non uno strumento di ricerca.',
    sourceId: 'nasa-voyager-where' },

  { id: 'v006', type: 'vero-falso', category: 'sistema-solare', difficulty: 'intermedio',
    text: 'Attraversare la fascia degli asteroidi è estremamente pericoloso per una sonda.',
    correct: false,
    explanation: 'Falso. Nonostante il numero enorme di corpi, la fascia è quasi vuota: le distanze medie fra gli asteroidi sono di centinaia di migliaia di chilometri. Tutte le sonde dirette ai pianeti esterni l\'hanno attraversata senza danni.',
    sourceId: 'nasa-asteroids' },

  { id: 'v007', type: 'vero-falso', category: 'universo', difficulty: 'avanzato',
    text: 'L\'espansione dell\'universo significa che le galassie si muovono attraverso lo spazio allontanandosi da un punto centrale.',
    correct: false,
    explanation: 'Falso. È lo spazio fra le galassie che si dilata, e non esiste un centro: ogni osservatore, in qualunque galassia, vede le altre allontanarsi da sé.',
    sourceId: 'nasa-expansion' },

  { id: 'v008', type: 'vero-falso', category: 'stelle', difficulty: 'intermedio',
    text: 'Le stelle più massicce vivono più a lungo di quelle piccole.',
    correct: false,
    explanation: 'Falso, è vero il contrario. Le stelle massicce consumano il combustibile molto più rapidamente: possono vivere pochi milioni di anni, contro i miliardi di una stella come il Sole.',
    sourceId: 'nasa-stars' },

  { id: 'v009', type: 'vero-falso', category: 'pianeti', difficulty: 'principiante',
    text: 'Giove ha una massa superiore a quella di tutti gli altri pianeti sommati.',
    correct: true,
    explanation: 'Vero: circa 2,5 volte la massa di tutti gli altri pianeti insieme. È per questo che la sua gravità ha influenzato profondamente la struttura del Sistema Solare.',
    sourceId: 'nasa-jupiter' },

  { id: 'v010', type: 'vero-falso', category: 'curiosita', difficulty: 'intermedio',
    text: 'Le nebulose sono nubi molto più dense dell\'aria che respiriamo.',
    correct: false,
    explanation: 'Falso. Una nebulosa è meno densa del miglior vuoto ottenibile in laboratorio: appare massiccia soltanto perché si estende per molti anni luce.',
    sourceId: 'nasa-nebulae' },

  { id: 'v011', type: 'vero-falso', category: 'fisica', difficulty: 'principiante',
    text: 'Un anno luce è un\'unità di tempo.',
    correct: false,
    explanation: 'Falso: è una distanza, circa 9.460 miliardi di chilometri, pari allo spazio percorso dalla luce in un anno.',
    sourceId: 'nasa-expansion' },

  { id: 'v012', type: 'vero-falso', category: 'luna', difficulty: 'avanzato',
    text: 'Durante un\'eclissi totale di Luna il nostro satellite diventa invisibile.',
    correct: false,
    explanation: 'Falso. Assume una tonalità rossastra: l\'atmosfera terrestre devia verso la Luna la componente rossa della luce solare. È lo stesso fenomeno che colora i tramonti.',
    sourceId: 'nasa-eclipses' },

  { id: 'v013', type: 'vero-falso', category: 'missioni', difficulty: 'intermedio',
    text: 'Le sonde Voyager funzionano ancora con tutti i loro strumenti scientifici.',
    correct: false,
    explanation: 'Falso. L\'energia disponibile diminuisce di circa 4 watt all\'anno, e gli strumenti vengono spenti uno a uno: al 2026 restano attivi due strumenti sul Voyager 1 e tre sul Voyager 2, su dieci iniziali.',
    sourceId: 'nasa-voyager-spacecraft' },

  { id: 'v014', type: 'vero-falso', category: 'galassie', difficulty: 'avanzato',
    text: 'Quando due galassie collidono, le loro stelle si scontrano fra loro.',
    correct: false,
    explanation: 'Falso. Le distanze fra le stelle sono enormi rispetto alle loro dimensioni: le collisioni stellari sono rarissime. Sono invece le nubi di gas a scontrarsi, innescando intensa formazione stellare.',
    sourceId: 'nasa-galaxies' },

  { id: 'v015', type: 'vero-falso', category: 'storia', difficulty: 'principiante',
    text: 'Nessun essere umano è tornato sulla Luna dopo il 1972.',
    correct: true,
    explanation: 'Vero per quanto riguarda gli allunaggi: l\'ultimo è stato quello dell\'Apollo 17, nel dicembre 1972. Nell\'aprile 2026 la missione Artemis II ha portato un equipaggio intorno alla Luna, senza atterrare.',
    sourceId: 'nasa-artemis' },

  { id: 'v016', type: 'vero-falso', category: 'sistema-solare', difficulty: 'avanzato',
    text: 'Plutone è stato declassato perché si è scoperto che è più piccolo di quanto si pensasse.',
    correct: false,
    explanation: 'Falso. La riclassificazione del 2006 dipende dalla definizione di pianeta: Plutone non ha "ripulito" la propria fascia orbitale, dove orbitano molti corpi simili scoperti nella fascia di Kuiper.',
    sourceId: 'nasa-dwarf' },

  { id: 'v017', type: 'vero-falso', category: 'curiosita', difficulty: 'intermedio',
    text: 'Le costellazioni sono gruppi di stelle fisicamente vicine fra loro.',
    correct: false,
    explanation: 'Falso. Sono schemi prospettici: le stelle di una stessa costellazione possono trovarsi a distanze molto diverse e non avere alcun legame fisico.',
    sourceId: 'nasa-stars' },

  { id: 'v018', type: 'vero-falso', category: 'astrofisica', difficulty: 'avanzato',
    text: 'La radiazione di Hawking è stata osservata sperimentalmente.',
    correct: false,
    explanation: 'Falso. È una previsione teorica formulata negli anni Settanta: la radiazione prevista è così debole da risultare, con le tecnologie attuali, non rilevabile per i buchi neri astrofisici conosciuti.',
    sourceId: 'nasa-blackholes' },

  { id: 'v019', type: 'vero-falso', category: 'fisica', difficulty: 'intermedio',
    text: 'Nello spazio non c\'è gravità.',
    correct: false,
    explanation: 'Falso. Gli astronauti sulla Stazione Spaziale sono in caduta libera continua intorno alla Terra: la gravità c\'è, ed è circa il 90% di quella al suolo. L\'assenza di peso deriva dalla caduta, non dall\'assenza di gravità.',
    sourceId: 'nasa-earth' },

  { id: 'v020', type: 'vero-falso', category: 'pianeti', difficulty: 'intermedio',
    text: 'Su Venere un giorno solare dura più di un anno venusiano.',
    correct: false,
    explanation: 'Falso, ed è un tranello: il giorno sidereo, cioè la rotazione, dura 243 giorni, più dell\'anno di 224,7 giorni. Il giorno solare, però, per effetto della rotazione retrograda dura circa 117 giorni terrestri.',
    sourceId: 'nasa-venus' },

  { id: 'v021', type: 'vero-falso', category: 'universo', difficulty: 'intermedio',
    text: 'Guardare una galassia lontana significa vederla come era nel passato.',
    correct: true,
    explanation: 'Vero. La luce viaggia a velocità finita: osservare un oggetto a un miliardo di anni luce significa vederlo come era un miliardo di anni fa.',
    sourceId: 'nasa-galaxies' },

  { id: 'v022', type: 'vero-falso', category: 'missioni', difficulty: 'principiante',
    text: 'Il James Webb Space Telescope ha sostituito Hubble.',
    correct: false,
    explanation: 'Falso. Osservano bande diverse: Hubble resta l\'unico strumento ad alta risoluzione nell\'ultravioletto e nel visibile. I due telescopi lavorano insieme e vengono spesso usati sugli stessi obiettivi.',
    sourceId: 'nasa-webb' }
,
  /* ===================== RISPOSTA APERTA ===================== */
  { id: 'a001', type: 'aperta', category: 'pianeti', difficulty: 'principiante',
    text: 'Qual è il pianeta più grande del Sistema Solare?',
    accept: ['giove', 'jupiter'],
    explanation: 'Giove, con un diametro equatoriale di 142.984 km: oltre undici volte quello della Terra.',
    sourceId: 'nasa-jupiter' },

  { id: 'a002', type: 'aperta', category: 'luna', difficulty: 'principiante',
    text: 'Come si chiama il mare lunare in cui è atterrato l\'Apollo 11?',
    accept: ['mare della tranquillita', 'mare tranquillitatis', 'mare della tranquillità', 'mare tranquillita', 'tranquillitatis', 'mare di tranquillita'],
    explanation: 'Il Mare della Tranquillità (Mare Tranquillitatis), il 20 luglio 1969.',
    sourceId: 'nasa-apollo' },

  { id: 'a003', type: 'aperta', category: 'stelle', difficulty: 'intermedio',
    text: 'Qual è la stella più vicina al Sole? (nome completo)',
    accept: ['proxima centauri', 'proxima'],
    explanation: 'Proxima Centauri, una nana rossa a 4,24 anni luce, troppo debole per essere vista a occhio nudo.',
    sourceId: 'nasa-stars' },

  { id: 'a004', type: 'aperta', category: 'missioni', difficulty: 'intermedio',
    text: 'Quale sonda ha rilasciato il lander Huygens su Titano?',
    accept: ['cassini', 'cassini-huygens', 'cassini huygens'],
    explanation: 'Cassini, che il 14 gennaio 2005 ha rilasciato il lander europeo Huygens: il primo atterraggio su un satellite del Sistema Solare esterno.',
    sourceId: 'nasa-cassini' },

  { id: 'a005', type: 'aperta', category: 'galassie', difficulty: 'intermedio',
    text: 'Come si chiama il buco nero supermassiccio al centro della Via Lattea?',
    accept: ['sagittarius a*', 'sagittarius a', 'sgr a*', 'sgr a', 'sagittarius a stella'],
    explanation: 'Sagittarius A*, di circa 4 milioni di masse solari. La sua immagine è stata pubblicata nel 2022 dall\'Event Horizon Telescope.',
    sourceId: 'nasa-milkyway' },

  { id: 'a006', type: 'aperta', category: 'sistema-solare', difficulty: 'intermedio',
    text: 'Come si chiama la regione di corpi ghiacciati oltre l\'orbita di Nettuno?',
    accept: ['fascia di kuiper', 'kuiper', 'cintura di kuiper', 'fascia kuiper'],
    explanation: 'La fascia di Kuiper, fra circa 30 e 50 unità astronomiche dal Sole: è la regione di origine di molte comete di breve periodo e la casa di Plutone.',
    sourceId: 'nasa-kuiper' },

  { id: 'a007', type: 'aperta', category: 'astrofisica', difficulty: 'avanzato',
    text: 'Come si chiama il confine di un buco nero oltre il quale nulla può sfuggire?',
    accept: ['orizzonte degli eventi', 'orizzonte eventi', 'event horizon', 'orizzonte'],
    explanation: 'L\'orizzonte degli eventi: un confine geometrico, non una superficie materiale.',
    sourceId: 'nasa-blackholes' },

  { id: 'a008', type: 'aperta', category: 'curiosita', difficulty: 'intermedio',
    text: 'Quale satellite di Giove è il corpo vulcanicamente più attivo del Sistema Solare?',
    accept: ['io'],
    explanation: 'Io, la cui attività vulcanica è alimentata dal riscaldamento di marea prodotto dalla gravità di Giove.',
    sourceId: 'nasa-jupiter' },

  { id: 'a009', type: 'aperta', category: 'storia', difficulty: 'avanzato',
    text: 'In quale anno è stato lanciato il telescopio spaziale Hubble? (quattro cifre)',
    accept: ['1990'],
    explanation: 'Il 24 aprile 1990, con lo Space Shuttle Discovery. Nel 1993 una missione di servizio ne ha corretto il difetto dello specchio primario.',
    sourceId: 'nasa-hubble' },

  { id: 'a010', type: 'aperta', category: 'fisica', difficulty: 'avanzato',
    text: 'Come si chiama la bolla di particelle e campo magnetico generata dal Sole, attraversata dai Voyager?',
    accept: ['eliosfera', 'heliosphere'],
    explanation: 'L\'eliosfera. Il suo confine esterno è l\'eliopausa, attraversata dal Voyager 1 nel 2012 e dal Voyager 2 nel 2018.',
    sourceId: 'nasa-voyager-where' },

  { id: 'a011', type: 'aperta', category: 'universo', difficulty: 'principiante',
    text: 'Quanti anni ha circa l\'universo, in miliardi di anni? (solo il numero)',
    accept: ['13.8', '13,8', '138', '14', '13'],
    explanation: 'Circa 13,8 miliardi di anni. Il valore deriva dalle misure della radiazione cosmica di fondo combinate con quelle dell\'espansione.',
    sourceId: 'nasa-expansion' },

  { id: 'a012', type: 'aperta', category: 'pianeti', difficulty: 'avanzato',
    text: 'Quale pianeta ha i venti più veloci del Sistema Solare?',
    accept: ['nettuno', 'neptune'],
    explanation: 'Nettuno, con venti che raggiungono circa 2.100 km/h, nonostante riceva pochissima energia dal Sole.',
    sourceId: 'nasa-neptune' },

  { id: 'a013', type: 'aperta', category: 'missioni', difficulty: 'intermedio',
    text: 'Quale missione europea e giapponese è entrata in orbita attorno a Mercurio nel novembre 2026?',
    accept: ['bepicolombo', 'bepi colombo', 'bepi'],
    explanation: 'BepiColombo, missione ESA-JAXA: la seconda nella storia a orbitare attorno a Mercurio dopo MESSENGER.',
    sourceId: 'esa-bepi-arrival' },

  { id: 'a014', type: 'aperta', category: 'luna', difficulty: 'avanzato',
    text: 'Quanti giorni dura il mese sinodico lunare, da luna nuova a luna nuova? (numero approssimato)',
    accept: ['29.5', '29,5', '29', '30', '29.53', '29,53'],
    explanation: '29,53 giorni. È diverso dal periodo orbitale di 27,32 giorni perché nel frattempo anche la Terra si è spostata lungo la propria orbita.',
    sourceId: 'nasa-moon' },

  /* ===================== INDOVINA IL PIANETA ===================== */
  { id: 'p001', type: 'indovina-pianeta', category: 'pianeti', difficulty: 'principiante',
    text: 'Di quale pianeta si tratta?',
    clues: ['Ha il sistema di anelli più spettacolare del Sistema Solare.', 'La sua densità media è inferiore a quella dell\'acqua.', 'Un satellite che gli orbita attorno ha laghi di metano liquido.'],
    correct: 'saturno',
    explanation: 'Saturno. Densità media di 0,687 g/cm³ e il satellite con i laghi di metano è Titano.',
    sourceId: 'nasa-saturn' },

  { id: 'p002', type: 'indovina-pianeta', category: 'pianeti', difficulty: 'principiante',
    text: 'Di quale pianeta si tratta?',
    clues: ['È il più caldo del Sistema Solare, pur non essendo il più vicino al Sole.', 'La pressione al suolo è circa 92 volte quella terrestre.', 'Ruota in senso contrario a quasi tutti gli altri pianeti.'],
    correct: 'venere',
    explanation: 'Venere: un effetto serra estremo lo porta a circa 464 °C, più di Mercurio.',
    sourceId: 'nasa-venus' },

  { id: 'p003', type: 'indovina-pianeta', category: 'pianeti', difficulty: 'intermedio',
    text: 'Di quale pianeta si tratta?',
    clues: ['Il suo asse di rotazione è inclinato di quasi 98 gradi.', 'Una sola sonda lo ha visitato, nel 1986.', 'Ha registrato la temperatura più bassa fra i pianeti.'],
    correct: 'urano',
    explanation: 'Urano: ruota praticamente su un fianco e ha toccato circa −224 °C. L\'unica visita è quella del Voyager 2.',
    sourceId: 'nasa-uranus' },

  { id: 'p004', type: 'indovina-pianeta', category: 'pianeti', difficulty: 'intermedio',
    text: 'Di quale pianeta si tratta?',
    clues: ['Ospita il vulcano più alto del Sistema Solare.', 'Ha due piccoli satelliti irregolari.', 'Due rover della NASA vi stanno operando in questo momento.'],
    correct: 'marte',
    explanation: 'Marte: Olympus Mons, i satelliti Phobos e Deimos, e i rover Curiosity e Perseverance.',
    sourceId: 'nasa-mars' },

  { id: 'p005', type: 'indovina-pianeta', category: 'pianeti', difficulty: 'intermedio',
    text: 'Di quale pianeta si tratta?',
    clues: ['Un suo giorno solare dura due dei suoi anni.', 'Non ha praticamente atmosfera, solo una tenue esosfera.', 'Il suo nucleo metallico occupa circa l\'85% del raggio.'],
    correct: 'mercurio',
    explanation: 'Mercurio: la risonanza 3:2 fra rotazione e orbita produce un giorno solare di 176 giorni terrestri, pari a due anni mercuriani.',
    sourceId: 'nasa-mercury' },

  { id: 'p006', type: 'indovina-pianeta', category: 'pianeti', difficulty: 'avanzato',
    text: 'Di quale pianeta si tratta?',
    clues: ['È stato scoperto grazie a calcoli matematici prima che a osservazioni dirette.', 'Ha venti che superano i 2.000 km/h.', 'Un suo grande satellite orbita in senso retrogrado.'],
    correct: 'nettuno',
    explanation: 'Nettuno, individuato nel 1846 grazie alle irregolarità nell\'orbita di Urano. Il satellite retrogrado è Tritone, probabilmente catturato dalla fascia di Kuiper.',
    sourceId: 'nasa-neptune' },

  { id: 'p007', type: 'indovina-pianeta', category: 'pianeti', difficulty: 'principiante',
    text: 'Di quale pianeta si tratta?',
    clues: ['Ha una tempesta più larga della Terra, osservata da oltre un secolo.', 'Possiede oltre cento satelliti confermati.', 'La sua massa supera quella di tutti gli altri pianeti sommati.'],
    correct: 'giove',
    explanation: 'Giove: la Grande Macchia Rossa, i quattro satelliti galileiani fra oltre cento confermati, e una massa pari a 2,5 volte quella di tutti gli altri pianeti insieme.',
    sourceId: 'nasa-jupiter' },

  { id: 'p008', type: 'indovina-pianeta', category: 'pianeti', difficulty: 'avanzato',
    text: 'Di quale pianeta si tratta?',
    clues: ['È l\'unico pianeta su cui è confermata una tettonica a placche attiva.', 'La sua atmosfera è composta per il 78% di azoto.', 'Ha un solo satellite naturale, insolitamente grande rispetto al pianeta.'],
    correct: 'terra',
    explanation: 'La Terra. La Luna ha un diametro pari a circa un quarto del nostro: un rapporto molto alto fra i pianeti del Sistema Solare.',
    sourceId: 'nasa-earth' },

  /* ===================== INDOVINA L'OGGETTO ASTRONOMICO ===================== */
  { id: 'o001', type: 'indovina-oggetto', category: 'universo', difficulty: 'principiante',
    text: 'Quale oggetto astronomico corrisponde a questi indizi?',
    clues: ['È una nube di gas e polvere dove nascono nuove stelle.', 'Si trova a circa 1.350 anni luce da noi.', 'È il vivaio stellare più vicino alla Terra.'],
    options: ['Nebulosa di Orione', 'Nebulosa del Granchio', 'Galassia di Andromeda', 'Ammasso delle Pleiadi'], correct: 0,
    explanation: 'La Nebulosa di Orione: una nebulosa a emissione visibile anche con un binocolo, sotto la cintura di Orione.',
    sourceId: 'nasa-nebulae' },

  { id: 'o002', type: 'indovina-oggetto', category: 'universo', difficulty: 'intermedio',
    text: 'Quale oggetto astronomico corrisponde a questi indizi?',
    clues: ['È il resto di una stella esplosa, osservata e registrata nel 1054.', 'Al suo centro si trova una stella di neutroni che ruota rapidamente.', 'È il primo oggetto del catalogo di Messier.'],
    options: ['Nebulosa Testa di Cavallo', 'Nebulosa del Granchio', 'Nebulosa Aquila', 'Nebulosa Anulare'], correct: 1,
    explanation: 'La Nebulosa del Granchio (M1), resto della supernova del 1054 documentata da astronomi cinesi e giapponesi.',
    sourceId: 'nasa-supernovae' },

  { id: 'o003', type: 'indovina-oggetto', category: 'galassie', difficulty: 'intermedio',
    text: 'Quale oggetto astronomico corrisponde a questi indizi?',
    clues: ['È una galassia a spirale a circa 2,5 milioni di anni luce.', 'È l\'oggetto più distante visibile a occhio nudo.', 'Si sta avvicinando alla Via Lattea.'],
    options: ['Grande Nube di Magellano', 'Galassia del Triangolo', 'Galassia di Andromeda', 'Galassia Vortice'], correct: 2,
    explanation: 'La Galassia di Andromeda (M31), che interagirà con la Via Lattea fra alcuni miliardi di anni.',
    sourceId: 'nasa-galaxies' },

  { id: 'o004', type: 'indovina-oggetto', category: 'universo', difficulty: 'avanzato',
    text: 'Quale oggetto astronomico corrisponde a questi indizi?',
    clues: ['È un ammasso aperto di stelle giovani, a circa 444 anni luce.', 'A occhio nudo si distinguono sei o sette stelle, ma ne contiene oltre mille.', 'In molte culture viene chiamato con nomi che richiamano un gruppo di sorelle.'],
    options: ['Ammasso delle Pleiadi', 'Omega Centauri', 'Ammasso di Ercole', 'Presepe'], correct: 0,
    explanation: 'Le Pleiadi (M45), uno degli ammassi aperti più noti e facilmente riconoscibili del cielo invernale.',
    sourceId: 'nasa-messier' },

  { id: 'o005', type: 'indovina-oggetto', category: 'astrofisica', difficulty: 'avanzato',
    text: 'Quale oggetto astronomico corrisponde a questi indizi?',
    clues: ['Ha una massa di circa 6,5 miliardi di volte quella del Sole.', 'La sua ombra è stata la prima a essere fotografata, nel 2019.', 'Si trova al centro di una galassia ellittica gigante.'],
    options: ['Sagittarius A*', 'Cygnus X-1', 'M87*', 'TON 618'], correct: 2,
    explanation: 'M87*, il buco nero supermassiccio al centro della galassia M87, ritratto dall\'Event Horizon Telescope il 10 aprile 2019.',
    sourceId: 'eht' },

  { id: 'o006', type: 'indovina-oggetto', category: 'universo', difficulty: 'intermedio',
    text: 'Quale oggetto astronomico corrisponde a questi indizi?',
    clues: ['È una nebulosa scura: la riconosciamo per la luce che blocca, non per quella che emette.', 'Si trova nella costellazione di Orione.', 'Il suo nome deriva dalla forma della sua sagoma.'],
    options: ['Nebulosa Rosetta', 'Nebulosa Testa di Cavallo', 'Nebulosa Laguna', 'Nebulosa Elica'], correct: 1,
    explanation: 'La Nebulosa Testa di Cavallo: una nube di polvere densa che si staglia come silhouette davanti a una nebulosa a emissione.',
    sourceId: 'nasa-nebulae' },

  /* ===================== ORDINA ===================== */
  { id: 'r001', type: 'ordina', category: 'sistema-solare', difficulty: 'principiante',
    text: 'Ordina i pianeti partendo dal più vicino al Sole.',
    hint: 'Dal Sole verso l\'esterno.',
    items: [
      { id: 'mercurio', label: 'Mercurio' }, { id: 'venere', label: 'Venere' },
      { id: 'terra', label: 'Terra' }, { id: 'marte', label: 'Marte' }
    ],
    solution: ['mercurio', 'venere', 'terra', 'marte'],
    explanation: 'I quattro pianeti terrestri in ordine di distanza dal Sole: Mercurio 0,39 UA, Venere 0,72 UA, Terra 1 UA, Marte 1,52 UA.',
    sourceId: 'nasa-science' },

  { id: 'r002', type: 'ordina', category: 'sistema-solare', difficulty: 'intermedio',
    text: 'Ordina tutti gli otto pianeti partendo dal più vicino al Sole.',
    hint: 'Dal Sole verso l\'esterno.',
    items: [
      { id: 'marte', label: 'Marte' }, { id: 'nettuno', label: 'Nettuno' },
      { id: 'mercurio', label: 'Mercurio' }, { id: 'saturno', label: 'Saturno' },
      { id: 'terra', label: 'Terra' }, { id: 'giove', label: 'Giove' },
      { id: 'venere', label: 'Venere' }, { id: 'urano', label: 'Urano' }
    ],
    solution: ['mercurio', 'venere', 'terra', 'marte', 'giove', 'saturno', 'urano', 'nettuno'],
    explanation: 'Mercurio, Venere, Terra, Marte, Giove, Saturno, Urano, Nettuno. I primi quattro sono rocciosi, gli altri giganti gassosi e ghiacciati.',
    sourceId: 'nasa-science' },

  { id: 'r003', type: 'ordina', category: 'pianeti', difficulty: 'avanzato',
    text: 'Ordina questi pianeti dal più grande al più piccolo per diametro.',
    hint: 'Il diametro, non la distanza.',
    items: [
      { id: 'terra', label: 'Terra' }, { id: 'giove', label: 'Giove' },
      { id: 'nettuno', label: 'Nettuno' }, { id: 'saturno', label: 'Saturno' },
      { id: 'mercurio', label: 'Mercurio' }
    ],
    solution: ['giove', 'saturno', 'nettuno', 'terra', 'mercurio'],
    explanation: 'Giove 142.984 km, Saturno 120.536 km, Nettuno 49.528 km, Terra 12.742 km, Mercurio 4.879 km. Nettuno è più piccolo di Urano, che qui non compare.',
    sourceId: 'nasa-science' },

  { id: 'r004', type: 'ordina', category: 'storia', difficulty: 'intermedio',
    text: 'Ordina questi eventi dal più antico al più recente.',
    hint: 'Ordine cronologico.',
    items: [
      { id: 'apollo11', label: 'Primo uomo sulla Luna' },
      { id: 'sputnik', label: 'Primo satellite artificiale' },
      { id: 'hubble', label: 'Lancio del telescopio Hubble' },
      { id: 'gagarin', label: 'Primo uomo nello spazio' },
      { id: 'pluto', label: 'Primo sorvolo di Plutone' }
    ],
    solution: ['sputnik', 'gagarin', 'apollo11', 'hubble', 'pluto'],
    explanation: 'Sputnik 1 nel 1957, Gagarin nel 1961, Apollo 11 nel 1969, Hubble nel 1990, New Horizons a Plutone nel 2015.',
    sourceId: 'nasa-apollo' },

  { id: 'r005', type: 'ordina', category: 'universo', difficulty: 'avanzato',
    text: 'Ordina queste distanze dalla più piccola alla più grande.',
    hint: 'Pensa in tempo-luce.',
    items: [
      { id: 'luna', label: 'Terra-Luna' },
      { id: 'andromeda', label: 'Via Lattea-Andromeda' },
      { id: 'sole', label: 'Terra-Sole' },
      { id: 'proxima', label: 'Sole-Proxima Centauri' },
      { id: 'centro', label: 'Sole-centro della Galassia' }
    ],
    solution: ['luna', 'sole', 'proxima', 'centro', 'andromeda'],
    explanation: '1,3 secondi luce, 8 minuti e 20 secondi, 4,24 anni luce, circa 26.000 anni luce, 2,5 milioni di anni luce.',
    sourceId: 'nasa-expansion' },

  /* ===================== ABBINA LE MISSIONI ===================== */
  { id: 'b001', type: 'abbina', category: 'missioni', difficulty: 'principiante',
    text: 'Abbina ogni missione al corpo celeste che ha studiato.',
    pairs: [
      { left: 'New Horizons', right: 'Plutone' },
      { left: 'Cassini-Huygens', right: 'Saturno e Titano' },
      { left: 'Perseverance', right: 'Marte' },
      { left: 'BepiColombo', right: 'Mercurio' }
    ],
    explanation: 'New Horizons ha sorvolato Plutone nel 2015, Cassini ha orbitato Saturno per tredici anni rilasciando Huygens su Titano, Perseverance esplora il cratere Jezero su Marte e BepiColombo è in orbita attorno a Mercurio dal novembre 2026.',
    sourceId: 'nasa-science' },

  { id: 'b002', type: 'abbina', category: 'missioni', difficulty: 'intermedio',
    text: 'Abbina ogni missione al suo obiettivo principale.',
    pairs: [
      { left: 'Parker Solar Probe', right: 'Studiare la corona solare dall\'interno' },
      { left: 'James Webb', right: 'Osservare l\'universo nell\'infrarosso' },
      { left: 'Artemis II', right: 'Portare un equipaggio intorno alla Luna' },
      { left: 'Voyager 2', right: 'Sorvolare i quattro pianeti esterni' }
    ],
    explanation: 'Ogni missione nasce da una domanda precisa: il riscaldamento coronale per Parker, le prime galassie per Webb, il volo umano oltre l\'orbita bassa per Artemis II, il "Grand Tour" dei pianeti esterni per il Voyager 2.',
    sourceId: 'nasa-science' },

  { id: 'b003', type: 'abbina', category: 'storia', difficulty: 'intermedio',
    text: 'Abbina ogni missione al suo anno di lancio.',
    pairs: [
      { left: 'Voyager 1', right: '1977' },
      { left: 'Hubble Space Telescope', right: '1990' },
      { left: 'New Horizons', right: '2006' },
      { left: 'James Webb Space Telescope', right: '2021' }
    ],
    explanation: 'Voyager 1 il 5 settembre 1977, Hubble il 24 aprile 1990, New Horizons il 19 gennaio 2006, James Webb il 25 dicembre 2021.',
    sourceId: 'nasa-science' },

  { id: 'b004', type: 'abbina', category: 'luna', difficulty: 'avanzato',
    text: 'Abbina ogni missione lunare al suo risultato distintivo.',
    pairs: [
      { left: 'Apollo 11', right: 'Primo allunaggio umano' },
      { left: 'Apollo 15', right: 'Primo uso del rover lunare' },
      { left: 'Chang\'e 4', right: 'Primo atterraggio sul lato nascosto' },
      { left: 'Chang\'e 6', right: 'Primi campioni dal lato nascosto' }
    ],
    explanation: 'Apollo 11 nel 1969, Apollo 15 nel 1971 con il rover, Chang\'e 4 nel 2019 sul lato nascosto e Chang\'e 6 nel 2024 con il primo ritorno di campioni da quell\'emisfero.',
    sourceId: 'nasa-moon' },

  /* ===================== RICONOSCI IL FENOMENO ===================== */
  { id: 'f001', type: 'riconosci-fenomeno', category: 'fisica', difficulty: 'principiante',
    text: 'Quale fenomeno mostra questa simulazione?',
    sim: 'eclipse-solar',
    options: ['Eclissi di Luna', 'Eclissi di Sole', 'Congiunzione planetaria', 'Transito di Venere'], correct: 1,
    explanation: 'Un\'eclissi di Sole: la Luna si frappone fra Sole e Terra e proietta la propria ombra sulla superficie terrestre.',
    sourceId: 'nasa-eclipses' },

  { id: 'f002', type: 'riconosci-fenomeno', category: 'fisica', difficulty: 'principiante',
    text: 'Quale fenomeno mostra questa simulazione?',
    sim: 'meteors',
    options: ['Pioggia meteorica', 'Aurora polare', 'Supernova', 'Tempesta solare'], correct: 0,
    explanation: 'Una pioggia meteorica: le scie sembrano divergere da un unico punto, il radiante, per effetto di prospettiva.',
    sourceId: 'nasa-meteors' },

  { id: 'f003', type: 'riconosci-fenomeno', category: 'astrofisica', difficulty: 'intermedio',
    text: 'Quale fenomeno mostra questa simulazione?',
    sim: 'gravwaves',
    options: ['Espansione dell\'universo', 'Onde gravitazionali da una fusione di buchi neri', 'Campo magnetico solare', 'Lente gravitazionale'], correct: 1,
    explanation: 'Onde gravitazionali: due masse compatte in spirale emettono deformazioni dello spaziotempo che si propagano alla velocità della luce.',
    sourceId: 'ligo-virgo' },

  { id: 'f004', type: 'riconosci-fenomeno', category: 'universo', difficulty: 'intermedio',
    text: 'Quale fenomeno mostra questa simulazione?',
    sim: 'expansion',
    options: ['Rotazione galattica', 'Espansione dell\'universo', 'Collisione fra galassie', 'Formazione stellare'], correct: 1,
    explanation: 'L\'espansione dell\'universo: non sono le galassie a muoversi attraverso lo spazio, è lo spazio fra loro che si dilata. Nessun punto è il centro.',
    sourceId: 'nasa-expansion' },

  { id: 'f005', type: 'riconosci-fenomeno', category: 'fisica', difficulty: 'intermedio',
    text: 'Quale fenomeno mostra questa simulazione?',
    sim: 'aurora',
    options: ['Nubi nottilucenti', 'Aurora polare', 'Fulmini nell\'alta atmosfera', 'Luce zodiacale'], correct: 1,
    explanation: 'Un\'aurora polare: particelle cariche guidate dal campo magnetico terrestre eccitano ossigeno e azoto fra 100 e 300 km di quota.',
    sourceId: 'nasa-aurora' },

  { id: 'f006', type: 'riconosci-fenomeno', category: 'astrofisica', difficulty: 'avanzato',
    text: 'Quale fenomeno mostra questa simulazione?',
    sim: 'blackhole',
    options: ['Una nebulosa planetaria', 'Un disco di accrescimento attorno a un buco nero', 'Un ammasso globulare', 'Una pulsar'], correct: 1,
    explanation: 'Un disco di accrescimento: il gas in caduta si riscalda per attrito fino a emettere raggi X, e la gravità devia la luce formando un anello attorno alla regione scura.',
    sourceId: 'nasa-blackholes' }
];

/** Conteggi utili alla UI (nessuna logica di gioco qui). */
export function archiveStats() {
  const byCat = {}, byDiff = {}, byType = {};
  for (const q of QUESTIONS) {
    byCat[q.category] = (byCat[q.category] || 0) + 1;
    byDiff[q.difficulty] = (byDiff[q.difficulty] || 0) + 1;
    byType[q.type] = (byType[q.type] || 0) + 1;
  }
  return { total: QUESTIONS.length, byCat, byDiff, byType };
}
