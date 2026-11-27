/**
 * SPAZIO PROFONDO — Missioni spaziali
 *
 * Ogni voce distingue i fatti storici (immutabili) dallo STATO della missione,
 * che cambia nel tempo: lo stato porta sempre `statusAsOf` e la fonte ufficiale.
 * Aggiornando `statusAsOf` e `status` si aggiorna anche la UI, che mostra
 * la data del dato all'utente.
 */

export const MISSIONS = [
  {
    id: 'voyager',
    name: 'Voyager 1 e 2',
    short: 'Voyager',
    agency: 'NASA / JPL',
    target: 'Pianeti esterni e spazio interstellare',
    launch: '20 agosto 1977 (Voyager 2) e 5 settembre 1977 (Voyager 1)',
    launchYear: 1977,
    featured: true,
    status: 'Operative nello spazio interstellare, con strumenti progressivamente spenti per risparmiare energia',
    statusLevel: 'active',
    statusAsOf: '23 novembre 2026',
    tagline: 'Il viaggio oltre i confini del Sistema Solare',
    hero: 'Due sonde costruite con la tecnologia degli anni Settanta, progettate per cinque anni di missione, funzionano ancora dopo quasi mezzo secolo. Sono gli oggetti costruiti dall\'uomo più lontani dalla Terra.',
    objectives: [
      'Studiare Giove e Saturno, i loro anelli e i loro satelliti maggiori.',
      'Sfruttare un allineamento planetario raro per estendere il viaggio a Urano e Nettuno (Voyager 2).',
      'Misurare le proprietà del vento solare e dei campi magnetici fino ai confini dell\'eliosfera.',
      'Attraversare l\'eliopausa e misurare direttamente il mezzo interstellare.'
    ],
    results: [
      'Scoperta del vulcanismo attivo su Io, il primo osservato fuori dalla Terra.',
      'Indizi di un oceano di acqua liquida sotto la crosta ghiacciata di Europa.',
      'Scoperta di nuovi anelli e satelliti a Giove, Saturno, Urano e Nettuno.',
      'Prime e finora uniche immagini ravvicinate di Urano (1986) e Nettuno (1989).',
      'Prima misura diretta del plasma interstellare, con il Voyager 1 nel 2012 e il Voyager 2 nel 2018.'
    ],
    timeline: [
      { date: '20 ago 1977', text: 'Lancio del Voyager 2 da Cape Canaveral.' },
      { date: '5 set 1977', text: 'Lancio del Voyager 1, su una traiettoria più rapida.' },
      { date: 'mar 1979', text: 'Voyager 1 al sistema di Giove: scoperta dei vulcani di Io.' },
      { date: 'nov 1980', text: 'Voyager 1 a Saturno: ultimo incontro planetario della sonda.' },
      { date: 'ago 1981', text: 'Voyager 2 a Saturno.' },
      { date: 'gen 1986', text: 'Voyager 2 è la prima e unica sonda a sorvolare Urano.' },
      { date: 'ago 1989', text: 'Voyager 2 sorvola Nettuno e Tritone: fine del "Grand Tour".' },
      { date: '14 feb 1990', text: 'Voyager 1 riprende il "Pale Blue Dot": la Terra come punto di luce a 6 miliardi di km.' },
      { date: '25 ago 2012', text: 'Voyager 1 attraversa l\'eliopausa ed entra nello spazio interstellare.' },
      { date: '5 nov 2018', text: 'Voyager 2 raggiunge a sua volta lo spazio interstellare.' },
      { date: '25 feb 2025', text: 'Spento il rivelatore di raggi cosmici (CRS) del Voyager 1 per risparmiare energia.' },
      { date: 'mar 2025', text: 'Spento lo strumento per le particelle cariche a bassa energia (LECP) del Voyager 2.' },
      { date: 'apr 2026', text: 'Spento anche il LECP del Voyager 1: restano attivi il magnetometro e il sistema per le onde di plasma.' },
      { date: '18 nov 2026', text: 'Voyager 1 raggiunge la distanza di un giorno-luce dalla Terra: 25,902 miliardi di km.' }
    ],
    dataPoints: [
      { k: 'Distanza del Voyager 1', v: '25,902 miliardi di km', note: 'al 18 novembre 2026: un giorno-luce' },
      { k: 'Tempo di comunicazione', v: '≈ 23 ore per ciascun senso', note: 'un semplice "ciao" richiede quasi due giorni per avere risposta' },
      { k: 'Energia disponibile', v: '≈ 225 W', note: 'dato 2023; alla partenza erano 470 W' },
      { k: 'Strumenti attivi (Voyager 1)', v: '2 su 10' },
      { k: 'Strumenti attivi (Voyager 2)', v: '3 su 10' }
    ],
    sections: [
      {
        h: 'Il lancio del 1977 e un allineamento irripetibile',
        p: 'Le due sonde partirono a sedici giorni di distanza per sfruttare una configurazione dei pianeti esterni che si ripete ogni 176 anni. La traiettoria permetteva di usare la gravità di ciascun pianeta per accelerare verso il successivo, una tecnica chiamata fionda gravitazionale, riducendo enormemente il carburante necessario. La missione nominale, però, prevedeva solo Giove e Saturno: tutto il resto è stato aggiunto strada facendo.'
      },
      {
        h: 'Giove, Saturno e la sorpresa dei satelliti',
        p: 'Nel 1979 il Voyager 1 rivelò che Io, il satellite più interno di Giove, è il corpo vulcanicamente più attivo del Sistema Solare. Europa mostrò una superficie di ghiaccio fratturata, indizio di un oceano sottostante. A Saturno, i Voyager scoprirono la struttura fine degli anelli e rivelarono un\'atmosfera densa su Titano, troppo opaca per vedere il suolo: ci vorranno Cassini e Huygens, vent\'anni dopo, per guardarci attraverso.'
      },
      {
        h: 'Urano e Nettuno: una sola visita in tutta la storia',
        p: 'Il Voyager 2 raggiunse Urano nel 1986 e Nettuno nel 1989. Restano a oggi i soli sorvoli ravvicinati di questi due pianeti mai effettuati: praticamente tutto ciò che sappiamo da vicino dei giganti ghiacciati viene da quei pochi giorni di osservazioni. A Nettuno la sonda scoprì i geyser di azoto di Tritone e venti fra i più rapidi del Sistema Solare.'
      },
      {
        h: 'Il Golden Record',
        p: 'Ogni sonda porta un disco placcato in oro con suoni e immagini della Terra: 115 immagini, saluti in 55 lingue, canti di balene, musica da tutto il mondo. È un messaggio simbolico, rivolto a eventuali civiltà extraterrestri, e insieme un documento su come l\'umanità ha scelto di rappresentarsi nel 1977. Le sonde non stanno cercando attivamente forme di vita: esplorano lo spazio interstellare, e il disco è un messaggio in bottiglia, non uno strumento di ricerca.',
        emphasis: true
      },
      {
        h: 'Uscire dall\'eliosfera',
        p: 'L\'eliosfera è la bolla di particelle e campo magnetico generata dal Sole. Il suo confine, l\'eliopausa, è il punto in cui la pressione del vento solare si equilibra con quella del mezzo interstellare. Il Voyager 1 lo ha attraversato nel 2012, il Voyager 2 nel 2018: sono le uniche due sonde a operare oltre quel confine, e gli unici strumenti che abbiano mai misurato direttamente quell\'ambiente.'
      },
      {
        h: 'Energia che finisce, un watt alla volta',
        p: 'I generatori termoelettrici a radioisotopi convertono in elettricità il calore del decadimento del plutonio-238, e perdono circa 4 watt all\'anno. Per questo gli ingegneri spengono gli strumenti uno a uno, cercando di prolungare il più possibile la raccolta di dati scientifici. Ogni comando è una scommessa: ci vogliono quasi ventitré ore perché arrivi, e altrettante perché torni una risposta.'
      }
    ],
    cautions: [
      'Le sonde Voyager non cercano forme di vita: il Golden Record è un messaggio simbolico, non uno strumento scientifico.',
      'Lo spazio interstellare non è "fuori dal Sistema Solare" in senso gravitazionale: le sonde sono ancora ben dentro il campo gravitazionale del Sole, che si estende fino alla nube di Oort.'
    ],
    quizCategory: 'missioni',
    sourceIds: ['nasa-voyager-where', 'nasa-voyager-blog', 'nasa-voyager-spacecraft']
  },

  {
    id: 'apollo',
    name: 'Programma Apollo',
    short: 'Apollo',
    agency: 'NASA',
    target: 'Luna',
    launch: '1961-1972 (primo allunaggio: 20 luglio 1969)',
    launchYear: 1969,
    status: 'Concluso nel 1972 con Apollo 17',
    statusLevel: 'completed',
    statusAsOf: 'dato storico',
    tagline: 'Dodici persone sulla superficie lunare',
    hero: 'Fra il 1969 e il 1972 sei missioni Apollo sono atterrate sulla Luna e dodici astronauti ne hanno percorso la superficie, riportando a Terra 382 kg di campioni che gli scienziati studiano ancora oggi.',
    objectives: [
      'Portare esseri umani sulla Luna e riportarli a Terra in sicurezza.',
      'Raccogliere campioni di suolo e roccia lunare.',
      'Installare strumenti scientifici permanenti sulla superficie.'
    ],
    results: [
      'Sei allunaggi con equipaggio: Apollo 11, 12, 14, 15, 16 e 17.',
      '382 kg di campioni lunari riportati a Terra, in parte ancora sigillati per analisi future.',
      'Retroriflettori laser ancora in uso: permettono di misurare la distanza Terra-Luna con precisione centimetrica.',
      'Prove a sostegno dell\'ipotesi dell\'impatto gigante sull\'origine della Luna.'
    ],
    timeline: [
      { date: 'gen 1967', text: 'Incendio dell\'Apollo 1 durante un test a terra: muoiono tre astronauti.' },
      { date: 'dic 1968', text: 'Apollo 8: primo equipaggio a orbitare intorno alla Luna.' },
      { date: '20 lug 1969', text: 'Apollo 11: Armstrong e Aldrin atterrano nel Mare della Tranquillità.' },
      { date: 'apr 1970', text: 'Apollo 13: un\'esplosione costringe a rinunciare all\'allunaggio; l\'equipaggio rientra salvo.' },
      { date: 'lug 1971', text: 'Apollo 15: primo utilizzo del rover lunare.' },
      { date: 'dic 1972', text: 'Apollo 17: ultima missione umana sulla Luna del programma.' }
    ],
    dataPoints: [
      { k: 'Allunaggi con equipaggio', v: '6' },
      { k: 'Persone sulla Luna', v: '12' },
      { k: 'Campioni riportati', v: '382 kg' },
      { k: 'Missione più lunga sulla superficie', v: 'Apollo 17, circa 75 ore' }
    ],
    sections: [
      { h: 'Un obiettivo politico, un risultato scientifico', p: 'Il programma nasce in pieno contesto di competizione fra Stati Uniti e Unione Sovietica, ma lascia un\'eredità scientifica enorme: la datazione dei campioni ha permesso di ricostruire la cronologia degli impatti nel Sistema Solare interno, un orologio che oggi usiamo per datare le superfici di Marte e Mercurio.' },
      { h: 'Cosa resta sulla Luna', p: 'Oltre alle tracce delle attività umane, sono rimasti strumenti scientifici, fra cui sismometri e retroriflettori laser. Questi ultimi funzionano ancora: puntando un laser dalla Terra si misura la distanza con precisione centimetrica, e si è così scoperto che la Luna si allontana da noi di circa 3,8 cm all\'anno.' }
    ],
    quizCategory: 'storia',
    sourceIds: ['nasa-apollo']
  },

  {
    id: 'artemis',
    name: 'Programma Artemis',
    short: 'Artemis',
    agency: 'NASA, con ESA, CSA e JAXA',
    target: 'Luna',
    launch: 'Artemis I: novembre 2022 — Artemis II: 1 aprile 2026',
    launchYear: 2022,
    featured: true,
    status: 'Artemis II completata con successo il 10 aprile 2026; Artemis III, primo allunaggio del programma, non prima del 2027',
    statusLevel: 'active',
    statusAsOf: '23 novembre 2026',
    tagline: 'Il ritorno dell\'uomo verso la Luna',
    hero: 'Nell\'aprile 2026 quattro astronauti hanno volato intorno alla Luna e sono rientrati sulla Terra: la prima missione umana oltre l\'orbita terrestre bassa dai tempi dell\'Apollo 17, nel 1972.',
    objectives: [
      'Verificare con equipaggio i sistemi di Orion e del razzo SLS (Artemis I e II).',
      'Riportare esseri umani sulla superficie lunare, nella regione del polo sud (Artemis III).',
      'Costruire una presenza sostenibile intorno e sulla Luna, con la stazione Gateway.'
    ],
    results: [
      'Artemis I (2022): volo senza equipaggio intorno alla Luna e rientro di Orion.',
      'Artemis II (aprile 2026): primo volo con equipaggio del programma, su traiettoria di ritorno libero.',
      'Nuovo record di distanza dalla Terra raggiunta da esseri umani.',
      'Rientro e ammaraggio riusciti nel Pacifico, al largo di San Diego.'
    ],
    timeline: [
      { date: 'nov 2022', text: 'Artemis I: volo di prova senza equipaggio intorno alla Luna.' },
      { date: '1 apr 2026', text: 'Lancio di Artemis II dal Kennedy Space Center, rampa 39B.' },
      { date: '6 apr 2026', text: 'Sorvolo lunare dell\'equipaggio a bordo della capsula Orion "Integrity".' },
      { date: '10 apr 2026', text: 'Ammaraggio nel Pacifico al largo di San Diego: missione di circa dieci giorni completata.' },
      { date: 'non prima del 2027', text: 'Artemis III: previsto allunaggio con equipaggio nella regione del polo sud lunare.' }
    ],
    dataPoints: [
      { k: 'Equipaggio di Artemis II', v: 'Reid Wiseman, Victor Glover, Christina Koch, Jeremy Hansen (CSA)' },
      { k: 'Durata', v: '≈ 10 giorni' },
      { k: 'Traiettoria', v: 'ritorno libero, come Apollo 13' },
      { k: 'Lanciatore', v: 'Space Launch System Block 1' }
    ],
    sections: [
      { h: 'Perché una traiettoria di ritorno libero', p: 'Artemis II ha seguito una traiettoria che, una volta impostata, riporta la capsula verso la Terra per effetto della sola gravità, senza bisogno di ulteriori accensioni dei motori. È la scelta più prudente per un primo volo con equipaggio: anche in caso di guasto alla propulsione, la rotta conduce comunque a casa.' },
      { h: 'Che cosa cambia rispetto ad Apollo', p: 'Apollo era una corsa: missioni brevi, ciascuna autosufficiente. Artemis punta invece su infrastruttura, con la stazione Gateway in orbita lunare, lander forniti da aziende private e il polo sud come destinazione, dove nei crateri in ombra permanente si trova ghiaccio d\'acqua, utilizzabile per acqua, ossigeno e propellente.' }
    ],
    quizCategory: 'missioni',
    sourceIds: ['nasa-artemis2-blog', 'nasa-artemis']
  },

  {
    id: 'bepicolombo',
    name: 'BepiColombo',
    short: 'BepiColombo',
    agency: 'ESA e JAXA',
    target: 'Mercurio',
    launch: '20 ottobre 2018, da Kourou',
    launchYear: 2018,
    featured: true,
    status: 'In orbita attorno a Mercurio dal 21 novembre 2026; separazione dei due orbiter prevista a dicembre 2026, fase scientifica da aprile 2027',
    statusLevel: 'active',
    statusAsOf: '23 novembre 2026',
    tagline: 'Dopo otto anni di viaggio, in orbita attorno a Mercurio',
    hero: 'Il 21 novembre 2026 la missione europeo-giapponese BepiColombo è stata catturata dalla gravità di Mercurio: è la seconda missione della storia a entrare in orbita attorno al pianeta più interno, dopo MESSENGER.',
    objectives: [
      'Studiare la struttura interna di Mercurio e il suo nucleo metallico insolitamente grande.',
      'Capire l\'origine del debole campo magnetico del pianeta.',
      'Analizzare la composizione della superficie e la tenue esosfera.',
      'Verificare previsioni della relatività generale nel forte campo gravitazionale solare.'
    ],
    results: [
      'Sei sorvoli di Mercurio fra il 2021 e il gennaio 2026, con osservazioni scientifiche già durante la crociera.',
      'Separazione riuscita del modulo di trasferimento (MTM) il 3 settembre 2026.',
      'Cattura in orbita polare il 21 novembre 2026, confermata dall\'ESA.'
    ],
    timeline: [
      { date: '20 ott 2018', text: 'Lancio con Ariane 5 dallo spazioporto europeo di Kourou.' },
      { date: '2020-2025', text: 'Un sorvolo della Terra, due di Venere e sei di Mercurio per rallentare verso il pianeta.' },
      { date: '2024', text: 'Un problema di alimentazione limita la spinta dei propulsori elettrici: l\'arrivo slitta da dicembre 2025 a novembre 2026.' },
      { date: '8 gen 2026', text: 'Sesto e ultimo sorvolo gravitazionale di Mercurio.' },
      { date: '3 set 2026', text: 'Separazione del modulo di trasferimento: inizia la fase di arrivo.' },
      { date: '21 nov 2026', text: 'Accensione per l\'inserimento in orbita alle 18:24 UTC, della durata di 37 minuti: cattura confermata.' },
      { date: '9-10 dic 2026', text: 'Separazione prevista fra l\'orbiter europeo MPO e quello giapponese Mio.' },
      { date: 'apr 2027', text: 'Inizio previsto della fase scientifica principale.' }
    ],
    dataPoints: [
      { k: 'Orbiter', v: 'MPO (ESA) e Mio (JAXA)' },
      { k: 'Durata del viaggio', v: '≈ 8 anni' },
      { k: 'Inserimento in orbita', v: '21 novembre 2026, 18:24 UTC' },
      { k: 'Durata dell\'accensione', v: '37 minuti' }
    ],
    sections: [
      { h: 'Perché arrivare a Mercurio è così difficile', p: 'Avvicinarsi al Sole significa accelerare: una sonda diretta verso l\'interno del Sistema Solare arriva troppo veloce per essere catturata. BepiColombo ha quindi dovuto frenare, usando nove sorvoli planetari e anni di propulsione elettrica per smaltire velocità. Da qui gli otto anni di crociera per un pianeta che, in linea d\'aria, è relativamente vicino.' },
      { h: 'Un inserimento in orbita non perfetto', p: 'Durante la manovra del 21 novembre 2026 un problema software ha interrotto l\'accensione prima del previsto. L\'ESA ha comunque confermato la cattura in orbita e che la sonda è al sicuro, con i team al lavoro sull\'analisi dei dati di telemetria. È un promemoria utile: nelle missioni reali gli imprevisti sono la norma, e il margine progettuale serve esattamente a questo.', emphasis: true },
      { h: 'Due sonde, due punti di vista', p: 'MPO studierà la superficie e l\'interno da un\'orbita più bassa, Mio si concentrerà sulla magnetosfera da un\'orbita molto più ellittica. Osservare contemporaneamente da due posizioni diverse permette di distinguere ciò che cambia nel tempo da ciò che cambia nello spazio: una cosa impossibile con una sola sonda.' }
    ],
    quizCategory: 'missioni',
    sourceIds: ['esa-bepi', 'esa-bepi-arrival']
  },

  {
    id: 'perseverance',
    name: 'Perseverance',
    short: 'Perseverance',
    agency: 'NASA / JPL',
    target: 'Marte, cratere Jezero',
    launch: '30 luglio 2020 (atterraggio: 18 febbraio 2021)',
    launchYear: 2020,
    status: 'Operativo; dall\'11 ottobre 2026 detiene il record di distanza percorsa da un veicolo su un altro mondo',
    statusLevel: 'active',
    statusAsOf: '23 novembre 2026',
    tagline: 'Alla ricerca di tracce di vita antica su Marte',
    hero: 'Il rover esplora il cratere Jezero, un antico delta fluviale, raccogliendo campioni di roccia sigillati in vista di un possibile ritorno a Terra. Nell\'ottobre 2026 ha superato il record di guida fuori dalla Terra.',
    objectives: [
      'Cercare segni di vita microbica antica nelle rocce del cratere Jezero.',
      'Raccogliere e sigillare campioni per una futura missione di ritorno.',
      'Caratterizzare la geologia e il clima passato di Marte.',
      'Sperimentare tecnologie utili all\'esplorazione umana, come la produzione di ossigeno dall\'atmosfera.'
    ],
    results: [
      'Decine di campioni di roccia raccolti come carote intatte, della dimensione di un gessetto.',
      'Ingenuity, il primo velivolo a compiere un volo controllato su un altro pianeta, con 72 voli complessivi.',
      'L\'esperimento MOXIE ha prodotto ossigeno dall\'anidride carbonica dell\'atmosfera marziana.',
      '11 ottobre 2026: superato il record di 45,16 km dell\'Opportunity, con una guida in gran parte autonoma.'
    ],
    timeline: [
      { date: '18 feb 2021', text: 'Atterraggio nel cratere Jezero.' },
      { date: 'apr 2021', text: 'Primo volo di Ingenuity: il primo volo motorizzato su un altro pianeta.' },
      { date: '14 giu 2026', text: 'Il rover completa la distanza di una maratona, 42,195 km.' },
      { date: '11 ott 2026', text: 'Supera il record di guida di Opportunity: oltre 45,16 km percorsi.' },
      { date: 'nov 2026', text: 'Indagini nella regione "Lac de Charmes", su crosta marziana antichissima fuori dal cratere.' }
    ],
    dataPoints: [
      { k: 'Luogo di atterraggio', v: 'Cratere Jezero, antico delta fluviale' },
      { k: 'Distanza percorsa', v: 'oltre 45 km', note: 'record per un veicolo su un altro mondo, dall\'11 ottobre 2026' },
      { k: 'Elicottero Ingenuity', v: '72 voli, missione conclusa' },
      { k: 'Guida autonoma', v: 'gran parte dei percorsi pianificati a bordo' }
    ],
    sections: [
      { h: 'Perché proprio Jezero', p: 'Le immagini dall\'orbita mostravano un delta: il punto in cui un fiume antico sfociava in un lago, depositando sedimenti a grana fine. Sulla Terra ambienti di questo tipo conservano bene le tracce chimiche della vita microbica. Jezero è stato scelto perché, se su Marte è mai esistita vita, questo è uno dei posti dove potremmo riconoscerne i segni.' },
      { h: 'Campioni in attesa di un passaggio', p: 'Perseverance non può analizzare i campioni con la precisione di un laboratorio terrestre: li sigilla e li deposita, in attesa di una missione di ritorno. L\'architettura e i costi di quel ritorno sono ancora in discussione, e per questo i campioni restano su Marte: è un punto da non confondere, perché il rover ha già fatto la sua parte.', emphasis: true }
    ],
    quizCategory: 'missioni',
    sourceIds: ['nasa-perseverance', 'nasa-perseverance-record']
  },

  {
    id: 'curiosity',
    name: 'Curiosity',
    short: 'Curiosity',
    agency: 'NASA / JPL',
    target: 'Marte, cratere Gale',
    launch: '26 novembre 2011 (atterraggio: 6 agosto 2012)',
    launchYear: 2011,
    status: 'Operativo, in salita sul Monte Sharp, con oltre 38 km percorsi',
    statusLevel: 'active',
    statusAsOf: '23 novembre 2026',
    tagline: 'Quattordici anni di geologia marziana',
    hero: 'Il rover a propulsione nucleare esplora il cratere Gale dal 2012, risalendo gli strati del Monte Sharp: ogni strato è un capitolo della storia climatica di Marte, letto dal più antico al più recente.',
    objectives: [
      'Stabilire se il cratere Gale abbia mai avuto condizioni favorevoli alla vita microbica.',
      'Studiare la composizione minerale e chimica della superficie.',
      'Misurare le radiazioni a cui sarebbe esposto un equipaggio umano.'
    ],
    results: [
      'Prove di un antico lago di acqua dolce persistito per milioni di anni nel cratere Gale.',
      'Rilevamento di molecole organiche nelle rocce, mattoni chimici compatibili con la vita ma non prova della sua esistenza.',
      'Misure di metano nell\'atmosfera con variazioni stagionali ancora non spiegate.',
      'Studio delle formazioni a nido d\'ape ("boxwork") sui fianchi del Monte Sharp.'
    ],
    timeline: [
      { date: '6 ago 2012', text: 'Atterraggio nel cratere Gale con la manovra della "gru volante".' },
      { date: '2013', text: 'Prove di un antico ambiente lacustre abitabile.' },
      { date: '2018', text: 'Rilevate molecole organiche conservate in rocce di 3 miliardi di anni.' },
      { date: '2025-2026', text: 'Esplorazione delle formazioni "boxwork", reti di creste minerali depositate da acqua sotterranea.' }
    ],
    dataPoints: [
      { k: 'Durata della missione', v: 'oltre 14 anni' },
      { k: 'Distanza percorsa', v: 'oltre 38 km' },
      { k: 'Alimentazione', v: 'generatore termoelettrico a radioisotopi' },
      { k: 'Obiettivo attuale', v: 'strati più recenti del Monte Sharp' }
    ],
    sections: [
      { h: 'Leggere un pianeta come un libro', p: 'Il Monte Sharp si eleva per circa 5 km al centro del cratere Gale, ed è composto da strati sedimentari. Salendo, Curiosity attraversa epoche diverse: dalle argille deposte in acqua, segno di un Marte umido, ai solfati tipici di un ambiente che si stava prosciugando. È la registrazione, strato per strato, di come Marte ha perso la sua acqua.' },
      { h: 'Molecole organiche non vogliono dire vita', p: 'Le molecole organiche trovate da Curiosity contengono carbonio e possono formarsi anche attraverso processi non biologici. Sono un indizio sull\'abitabilità, non una firma biologica. È una distinzione essenziale: la presenza dei mattoni non dimostra che sia stata costruita la casa.', emphasis: true }
    ],
    quizCategory: 'missioni',
    sourceIds: ['nasa-curiosity', 'nasa-perseverance-record']
  },

  {
    id: 'cassini',
    name: 'Cassini-Huygens',
    short: 'Cassini',
    agency: 'NASA, ESA e ASI',
    target: 'Saturno e il suo sistema',
    launch: '15 ottobre 1997 (arrivo a Saturno: 1 luglio 2004)',
    launchYear: 1997,
    status: 'Conclusa il 15 settembre 2017 con l\'ingresso controllato nell\'atmosfera di Saturno',
    statusLevel: 'completed',
    statusAsOf: 'dato storico',
    tagline: 'Tredici anni dentro il sistema di Saturno',
    hero: 'Cassini ha orbitato intorno a Saturno per tredici anni e ha rilasciato la sonda europea Huygens su Titano: il primo atterraggio su un satellite del Sistema Solare esterno.',
    objectives: [
      'Studiare l\'atmosfera, gli anelli e la magnetosfera di Saturno.',
      'Esplorare Titano con un orbiter e con il lander Huygens.',
      'Caratterizzare i satelliti ghiacciati del sistema saturniano.'
    ],
    results: [
      'Atterraggio di Huygens su Titano il 14 gennaio 2005, con immagini della superficie.',
      'Scoperta dei getti di vapore d\'acqua di Encelado e dell\'oceano sotterraneo che li alimenta.',
      'Scoperta di laghi e mari di metano ed etano liquidi su Titano.',
      'Misura della massa degli anelli durante le orbite finali, che suggerisce una loro origine recente.'
    ],
    timeline: [
      { date: '15 ott 1997', text: 'Lancio da Cape Canaveral.' },
      { date: '1 lug 2004', text: 'Inserimento in orbita attorno a Saturno.' },
      { date: '14 gen 2005', text: 'Huygens atterra su Titano, trasmettendo per oltre un\'ora dalla superficie.' },
      { date: '2005', text: 'Scoperta dei pennacchi di Encelado.' },
      { date: '2017', text: 'Il "Grand Finale": 22 orbite fra il pianeta e gli anelli.' },
      { date: '15 set 2017', text: 'Ingresso controllato nell\'atmosfera di Saturno, per non contaminare i satelliti potenzialmente abitabili.' }
    ],
    dataPoints: [
      { k: 'Durata in orbita', v: '13 anni' },
      { k: 'Orbite di Saturno', v: '294' },
      { k: 'Satelliti scoperti', v: 'almeno 7' },
      { k: 'Fine missione', v: 'ingresso deliberato nell\'atmosfera' }
    ],
    sections: [
      { h: 'Perché distruggere una sonda funzionante', p: 'Al termine della missione Cassini aveva poco carburante, e un orbiter senza controllo avrebbe potuto impattare Encelado o Titano, contaminando con microrganismi terrestri due mondi fra i più promettenti per la ricerca di vita. La scelta è stata quindi distruggerla nell\'atmosfera di Saturno: una decisione di protezione planetaria, non un incidente.' }
    ],
    quizCategory: 'missioni',
    sourceIds: ['nasa-cassini']
  },

  {
    id: 'newhorizons',
    name: 'New Horizons',
    short: 'New Horizons',
    agency: 'NASA / APL',
    target: 'Plutone e fascia di Kuiper',
    launch: '19 gennaio 2006',
    launchYear: 2006,
    status: 'Operativa nella fascia di Kuiper esterna; risvegliata dall\'ibernazione il 23 giugno 2026 in buone condizioni',
    statusLevel: 'active',
    statusAsOf: '23 novembre 2026',
    tagline: 'Il primo sguardo ravvicinato a Plutone',
    hero: 'Dopo nove anni di viaggio New Horizons ha rivelato un Plutone geologicamente attivo. Oggi, a oltre 9 miliardi di km dalla Terra, studia la fascia di Kuiper e i confini dell\'eliosfera.',
    objectives: [
      'Caratterizzare geologia, superficie e atmosfera di Plutone e Caronte.',
      'Esplorare uno o più oggetti della fascia di Kuiper.',
      'Misurare l\'ambiente di polvere e particelle cariche nell\'eliosfera esterna.'
    ],
    results: [
      'Luglio 2015: primo sorvolo di Plutone, con ghiacciai di azoto, montagne di ghiaccio d\'acqua e una tenue atmosfera stratificata.',
      '1 gennaio 2019: sorvolo di Arrokoth, il corpo più distante mai visitato, formato da due lobi fusi.',
      'Il contatore di polveri rileva una densità che non diminuisce come previsto oltre il "Kuiper Cliff": la fascia potrebbe estendersi più del previsto.'
    ],
    timeline: [
      { date: '19 gen 2006', text: 'Lancio: la sonda più veloce mai partita dalla Terra.' },
      { date: 'feb 2007', text: 'Sorvolo di Giove per la fionda gravitazionale.' },
      { date: '14 lug 2015', text: 'Massimo avvicinamento a Plutone.' },
      { date: '1 gen 2019', text: 'Sorvolo di Arrokoth, oggetto primordiale della fascia di Kuiper.' },
      { date: '7 ago 2025', text: 'Inizio dell\'ibernazione più lunga della missione.' },
      { date: '23 giu 2026', text: 'Risveglio confermato, sonda in buone condizioni a circa 9,5 miliardi di km dalla Terra.' }
    ],
    dataPoints: [
      { k: 'Distanza attuale', v: '≈ 9,5 miliardi di km', note: 'dato di giugno 2026' },
      { k: 'Ritardo del segnale', v: 'oltre 8 ore e mezza per senso' },
      { k: 'Ibernazioni dal 2007', v: 'più di 20' },
      { k: 'Prospettiva', v: 'attraversamento del termination shock atteso nei prossimi anni' }
    ],
    sections: [
      { h: 'Perché ibernare una sonda', p: 'Nei lunghi tratti senza obiettivi la sonda viene messa in uno stato di riposo: consuma meno, riduce l\'usura dei componenti e libera tempo di antenna del Deep Space Network, risorsa condivisa fra decine di missioni. Anche in ibernazione, però, tre strumenti continuano a misurare particelle cariche e polveri, accumulando dati che vengono trasmessi al risveglio.' }
    ],
    quizCategory: 'missioni',
    sourceIds: ['nasa-newhorizons', 'nasa-nh-wake']
  },

  {
    id: 'parker',
    name: 'Parker Solar Probe',
    short: 'Parker',
    agency: 'NASA / Johns Hopkins APL',
    target: 'Corona solare',
    launch: '12 agosto 2018',
    launchYear: 2018,
    status: 'Operativa, in buone condizioni; missione estesa fino al 2029',
    statusLevel: 'active',
    statusAsOf: '23 novembre 2026',
    tagline: 'L\'oggetto più veloce mai costruito, dentro l\'atmosfera del Sole',
    hero: 'Parker Solar Probe attraversa la corona solare, l\'atmosfera esterna del Sole, protetta da uno scudo termico di composito di carbonio. È l\'oggetto artificiale più veloce e più vicino al Sole della storia.',
    objectives: [
      'Capire perché la corona solare è molto più calda della superficie.',
      'Determinare come viene accelerato il vento solare.',
      'Studiare l\'origine delle particelle energetiche che possono colpire la Terra.'
    ],
    results: [
      'Record di avvicinamento: 6,1 milioni di km dalla superficie solare, il 24 dicembre 2024.',
      'Record di velocità: circa 692.000 km/h, pari a 430.000 miglia orarie.',
      'Attraversamenti ripetuti della corona, con misure dirette del plasma all\'interno di essa.',
      'Scoperta della struttura a zig-zag del campo magnetico nel vento solare ("switchback").'
    ],
    timeline: [
      { date: '12 ago 2018', text: 'Lancio da Cape Canaveral.' },
      { date: '2018-2024', text: 'Sette sorvoli di Venere per ridurre progressivamente la distanza dal Sole.' },
      { date: '24 dic 2024', text: 'Massimo avvicinamento: 6,1 milioni di km dalla superficie solare.' },
      { date: '4 set 2026', text: 'Ulteriore passaggio ravvicinato, con cui eguaglia i propri record.' },
      { date: '2026', text: 'La revisione di programma dell\'eliofisica estende la missione fino al 2029.' }
    ],
    dataPoints: [
      { k: 'Distanza minima dal Sole', v: '6,1 milioni di km' },
      { k: 'Velocità massima', v: '≈ 692.000 km/h' },
      { k: 'Temperatura dello scudo', v: 'oltre 1.000 °C sul lato esposto' },
      { k: 'Missione estesa', v: 'fino al 2029' }
    ],
    sections: [
      { h: 'Come si sopravvive vicino al Sole', p: 'Lo scudo termico è uno spesso pannello di composito di carbonio che mantiene gli strumenti a temperatura ambiente mentre la faccia esposta supera i mille gradi. Il punto delicato non è il materiale, ma il puntamento: il software deve tenere lo scudo rivolto verso il Sole con precisione costante. Un errore di orientamento di pochi istanti sarebbe fatale.' },
      { h: 'Una domanda ancora aperta', p: 'Il motivo per cui la corona è centinaia di volte più calda della superficie solare resta irrisolto, nonostante decine di passaggi. Parker ha ristretto il campo delle spiegazioni possibili e scoperto fenomeni inattesi, ma il problema del riscaldamento coronale, posto negli anni Quaranta, è ancora una questione aperta.', emphasis: true }
    ],
    quizCategory: 'missioni',
    sourceIds: ['nasa-parker', 'nasa-parker-blog']
  },

  {
    id: 'jwst',
    name: 'James Webb Space Telescope',
    short: 'James Webb',
    agency: 'NASA, ESA e CSA',
    target: 'Universo profondo, nell\'infrarosso',
    launch: '25 dicembre 2021',
    launchYear: 2021,
    status: 'Operativo nel punto L2; osservazioni del quinto ciclo scientifico in corso',
    statusLevel: 'active',
    statusAsOf: '23 novembre 2026',
    tagline: 'Il più grande telescopio spaziale mai costruito',
    hero: 'Con uno specchio segmentato di 6,5 metri e strumenti raffreddati a meno di 50 kelvin, Webb osserva nell\'infrarosso la luce delle prime galassie, la formazione delle stelle e l\'atmosfera dei pianeti extrasolari.',
    objectives: [
      'Osservare le prime galassie formatesi dopo il Big Bang.',
      'Studiare la nascita di stelle e sistemi planetari dentro le nubi di polvere.',
      'Analizzare la composizione delle atmosfere dei pianeti extrasolari.'
    ],
    results: [
      'Individuazione di galassie candidate fra le più antiche mai osservate.',
      'Immagini infrarosse di regioni di formazione stellare altrimenti nascoste dalla polvere.',
      'Rilevazione di molecole nelle atmosfere di pianeti extrasolari.',
      'Scoperta dei "little red dots", oggetti compatti e rossi la cui natura è ancora in discussione.'
    ],
    timeline: [
      { date: '25 dic 2021', text: 'Lancio con Ariane 5 dalla Guyana francese.' },
      { date: 'gen 2022', text: 'Dispiegamento completo dello specchio e del parasole, e arrivo al punto L2.' },
      { date: 'lug 2022', text: 'Prime immagini scientifiche pubbliche.' },
      { date: '2026', text: 'Osservazioni del quinto ciclo scientifico; operazioni previste fino agli anni Quaranta.' }
    ],
    dataPoints: [
      { k: 'Diametro dello specchio', v: '6,5 m, in 18 segmenti esagonali' },
      { k: 'Posizione', v: 'punto di Lagrange L2, a 1,5 milioni di km dalla Terra' },
      { k: 'Temperatura di lavoro', v: 'sotto i 50 kelvin, circa −223 °C' },
      { k: 'Banda osservata', v: 'infrarosso, da 0,6 a 28 micrometri' }
    ],
    sections: [
      { h: 'Perché l\'infrarosso', p: 'L\'espansione dell\'universo sposta la luce delle galassie più distanti verso lunghezze d\'onda maggiori: ciò che partì come luce visibile arriva a noi come infrarosso. Per vedere gli oggetti più antichi serve quindi un telescopio infrarosso, e per funzionare deve essere freddo: altrimenti il suo stesso calore accecherebbe gli strumenti. Da qui il parasole delle dimensioni di un campo da tennis e l\'orbita a 1,5 milioni di km dalla Terra.' },
      { h: 'Non è il sostituto di Hubble', p: 'Webb e Hubble osservano bande diverse. Hubble resta l\'unico strumento ad alta risoluzione nell\'ultravioletto e nel visibile, capacità che nessun telescopio in orbita potrà rimpiazzare prima del futuro Habitable Worlds Observatory. I due osservatori lavorano insieme, non uno al posto dell\'altro.', emphasis: true }
    ],
    quizCategory: 'universo',
    sourceIds: ['nasa-webb', 'stsci-jwst']
  },

  {
    id: 'hubble',
    name: 'Hubble Space Telescope',
    short: 'Hubble',
    agency: 'NASA ed ESA',
    target: 'Universo, dall\'ultravioletto al vicino infrarosso',
    launch: '24 aprile 1990',
    launchYear: 1990,
    status: 'Operativo dopo 36 anni di attività, con capacità ultraviolette ancora senza sostituti',
    statusLevel: 'active',
    statusAsOf: '23 novembre 2026',
    tagline: 'Trentasei anni di osservazioni che hanno riscritto la cosmologia',
    hero: 'Lanciato nel 1990 e riparato in orbita dagli equipaggi dello Space Shuttle, Hubble ha misurato il tasso di espansione dell\'universo, osservato la nascita delle stelle e fornito le immagini che hanno definito l\'immaginario dell\'astronomia moderna.',
    objectives: [
      'Osservare l\'universo senza la distorsione dell\'atmosfera terrestre.',
      'Misurare la distanza delle galassie e il tasso di espansione dell\'universo.',
      'Studiare la formazione e l\'evoluzione di stelle e galassie.'
    ],
    results: [
      'Misura precisa della costante di Hubble e contributo alla scoperta dell\'accelerazione dell\'espansione cosmica.',
      'Campi profondi: immagini di porzioni di cielo apparentemente vuote rivelano migliaia di galassie.',
      'Osservazione diretta dell\'impatto della cometa Shoemaker-Levy 9 su Giove nel 1994.',
      'Dati fondamentali per stimare l\'età dell\'universo in circa 13,8 miliardi di anni.'
    ],
    timeline: [
      { date: '24 apr 1990', text: 'Lancio con lo Space Shuttle Discovery.' },
      { date: 'dic 1993', text: 'Prima missione di servizio: corretto il difetto dello specchio primario.' },
      { date: '1995', text: 'Primo Hubble Deep Field.' },
      { date: 'mag 2009', text: 'Ultima missione di servizio con equipaggio.' },
      { date: '2024', text: 'Passaggio a una modalità di puntamento con un solo giroscopio per prolungare la vita operativa.' },
      { date: '2026', text: 'Ancora operativo: 36 anni di attività scientifica.' }
    ],
    dataPoints: [
      { k: 'Diametro dello specchio', v: '2,4 m' },
      { k: 'Orbita', v: '≈ 515 km di quota, intorno alla Terra' },
      { k: 'Anni di operatività', v: '36' },
      { k: 'Missioni di servizio', v: '5, fra il 1993 e il 2009' }
    ],
    sections: [
      { h: 'Il difetto che per poco non rovinò tutto', p: 'Dopo il lancio le immagini risultarono sfocate: lo specchio primario era stato lucidato con un errore di circa due micrometri. Nel 1993 una missione dello Shuttle installò un sistema di ottiche correttive, trasformando quello che sembrava un fallimento storico nel telescopio più produttivo mai costruito.' }
    ],
    quizCategory: 'universo',
    sourceIds: ['nasa-hubble', 'stsci-hst']
  }
];

export const missionById = (id) => MISSIONS.find((m) => m.id === id);

/** Tappe principali della storia dell'esplorazione spaziale (timeline + gioco). */
export const SPACE_HISTORY = [
  { id: 'sputnik',  year: 1957, date: '4 ottobre 1957',   title: 'Sputnik 1',            text: 'L\'Unione Sovietica mette in orbita il primo satellite artificiale: inizia l\'era spaziale.' },
  { id: 'laika',    year: 1957, date: '3 novembre 1957',  title: 'Laika in orbita',       text: 'Il primo essere vivente in orbita terrestre, a bordo dello Sputnik 2.' },
  { id: 'gagarin',  year: 1961, date: '12 aprile 1961',   title: 'Jurij Gagarin',         text: 'Primo volo umano nello spazio: un\'orbita completa intorno alla Terra in 108 minuti.' },
  { id: 'tereshkova', year: 1963, date: '16 giugno 1963', title: 'Valentina Tereshkova',  text: 'Prima donna nello spazio, con tre giorni di volo orbitale.' },
  { id: 'leonov',   year: 1965, date: '18 marzo 1965',    title: 'Prima attività extraveicolare', text: 'Aleksej Leonov esce dalla capsula Voschod 2: la prima "passeggiata spaziale".' },
  { id: 'apollo8',  year: 1968, date: '21-27 dicembre 1968', title: 'Apollo 8',           text: 'Primo equipaggio umano a orbitare intorno alla Luna, con la celebre foto "Earthrise".' },
  { id: 'apollo11', year: 1969, date: '20 luglio 1969',   title: 'Apollo 11',             text: 'Armstrong e Aldrin camminano sulla Luna: la prima volta per un essere umano.' },
  { id: 'salyut',   year: 1971, date: '19 aprile 1971',   title: 'Saljut 1',              text: 'Prima stazione spaziale in orbita terrestre.' },
  { id: 'voyagers', year: 1977, date: 'agosto-settembre 1977', title: 'Lancio dei Voyager', text: 'Due sonde partono per il "Grand Tour" dei pianeti esterni.' },
  { id: 'shuttle',  year: 1981, date: '12 aprile 1981',   title: 'Primo volo dello Space Shuttle', text: 'Il Columbia inaugura il primo veicolo spaziale riutilizzabile con equipaggio.' },
  { id: 'hubble-l', year: 1990, date: '24 aprile 1990',   title: 'Lancio di Hubble',      text: 'Il telescopio spaziale che riscriverà la cosmologia raggiunge l\'orbita.' },
  { id: 'iss',      year: 1998, date: '20 novembre 1998', title: 'Primo modulo della ISS', text: 'Il modulo Zarja apre la costruzione della Stazione Spaziale Internazionale.' },
  { id: 'spirit',   year: 2004, date: 'gennaio 2004',     title: 'Spirit e Opportunity',  text: 'Due rover atterrano su Marte e trovano prove geologiche di acqua passata.' },
  { id: 'huygens',  year: 2005, date: '14 gennaio 2005',  title: 'Huygens su Titano',     text: 'Primo atterraggio su un satellite del Sistema Solare esterno.' },
  { id: 'v1-inter', year: 2012, date: '25 agosto 2012',   title: 'Voyager 1 nello spazio interstellare', text: 'Per la prima volta un oggetto umano attraversa l\'eliopausa.' },
  { id: 'rosetta',  year: 2014, date: '12 novembre 2014', title: 'Philae sulla cometa',   text: 'La missione Rosetta posa un lander sul nucleo della cometa 67P.' },
  { id: 'pluto',    year: 2015, date: '14 luglio 2015',   title: 'New Horizons a Plutone', text: 'Il primo sorvolo ravvicinato di Plutone e del suo satellite Caronte.' },
  { id: 'falcon',   year: 2015, date: '21 dicembre 2015', title: 'Primo rientro propulsivo orbitale', text: 'Il primo stadio di un Falcon 9 atterra integro dopo una missione orbitale: inizia il riutilizzo di routine.' },
  { id: 'ligo',     year: 2016, date: '11 febbraio 2016', title: 'Onde gravitazionali',   text: 'Annuncio della prima rilevazione diretta, da parte di LIGO, di onde gravitazionali da due buchi neri.' },
  { id: 'eht',      year: 2019, date: '10 aprile 2019',   title: 'Prima immagine di un buco nero', text: 'L\'Event Horizon Telescope mostra l\'ombra del buco nero al centro di M87.' },
  { id: 'ingenuity',year: 2021, date: '19 aprile 2021',   title: 'Primo volo su un altro pianeta', text: 'L\'elicottero Ingenuity si solleva dal suolo marziano.' },
  { id: 'jwst-l',   year: 2021, date: '25 dicembre 2021', title: 'Lancio del James Webb', text: 'Parte il più grande telescopio spaziale mai costruito.' },
  { id: 'dart',     year: 2022, date: '26 settembre 2022',title: 'Impatto di DART',       text: 'Una sonda modifica deliberatamente l\'orbita dell\'asteroide Dimorphos: primo test di difesa planetaria.' },
  { id: 'artemis2', year: 2026, date: '1-10 aprile 2026', title: 'Artemis II',            text: 'Quattro astronauti volano intorno alla Luna: la prima missione umana oltre l\'orbita bassa dal 1972.' },
  { id: 'bepi-moi', year: 2026, date: '21 novembre 2026', title: 'BepiColombo a Mercurio',text: 'La missione ESA-JAXA entra in orbita attorno a Mercurio, seconda nella storia dopo MESSENGER.' }
];
