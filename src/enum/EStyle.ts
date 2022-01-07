/**
 * Styles
 */
enum EStyle {
    POPROCK = 'Pop Rock',
    HOUSE = 'House',
    DISCO = 'Disco',
    SYNTHPOP = 'Synth-pop',
    SOUL = 'Soul',
    VOCAL = 'Vocal',
    ALTERNATIVEROCK = 'Alternative Rock',
    TECHNO = 'Techno',
    INDIEROCK = 'Indie Rock',
    PUNK = 'Punk',
    ELECTRO = 'Electro',
    FUNK = 'Funk',
    EXPERIMENTAL = 'Experimental',
    BALLAD = 'Ballad',
    ROCKROLL = 'Rock & Roll',
    CLASSICROCK = 'Classic Rock',
    HARDROCK = 'Hard Rock',
    FOLKROCK = 'Folk Rock',
    DOWNTEMPO = 'Downtempo',
    PSYCHEDELICROCK = 'Psychedelic Rock',
    PROGROCK = 'Prog Rock',
    HARDCORE = 'Hardcore',
    COUNTRY = 'Country',
    CHANSON = 'Chanson',
    NEWWAVE = 'New Wave',
    TRANCE = 'Trance',
    EUROHOUSE = 'Euro House',
    DEEPHOUSE = 'Deep House',
    HEAVYMETAL = 'Heavy Metal',
    SOFTROCK = 'Soft Rock',
    BLUESROCK = 'Blues Rock',
    SOUNDTRACK = 'Soundtrack',
    FOLK = 'Folk',
    EASYLISTENING = 'Easy Listening',
    RHYTHMBLUES = 'Rhythm & Blues',
    AMBIENT = 'Ambient',
    RNBSWING = 'RnB/Swing',
    TECHHOUSE = 'Tech House',
    SCHLAGER = 'Schlager',
    ROMANTIC = 'Romantic',
    BLACKMETAL = 'Black Metal',
    COUNTRYROCK = 'Country Rock',
    GARAGEROCK = 'Garage Rock',
    MINIMAL = 'Minimal',
    DEATHMETAL = 'Death Metal',
    PROGRESSIVEHOUSE = 'Progressive House',
    EUROPOP = 'Europop',
    DRUMNBASS = 'Drum n Bass',
    DUB = 'Dub',
    GARAGEHOUSE = 'Garage House',
    INDUSTRIAL = 'Industrial',
    BREAKBEAT = 'Breakbeat',
    CLASSICAL = 'Classical',
    ACOUSTIC = 'Acoustic',
    BIGBAND = 'Big Band',
    SWING = 'Swing',
    JAZZFUNK = 'Jazz-Funk',
    DANCEHALL = 'Dancehall',
    CONTEMPORARYJAZZ = 'Contemporary Jazz',
    ABSTRACT = 'Abstract',
    FUSION = 'Fusion',
    THRASH = 'Thrash',
    ARTROCK = 'Art Rock',
    POPRAP = 'Pop Rap',
    REGGAE = 'Reggae',
    HARDTRANCE = 'Hard Trance',
    SOULJAZZ = 'Soul-Jazz',
    NOISE = 'Noise',
    BREAKS = 'Breaks',
    LEFTFIELD = 'Leftfield',
    BAROQUE = 'Baroque',
    GLAM = 'Glam',
    PROGRESSIVETRANCE = 'Progressive Trance',
    MODERN = 'Modern',
    ITALODISCO = 'Italo-Disco',
    JAZZROCK = 'Jazz-Rock',
    ACID = 'Acid',
    ROOTSREGGAE = 'Roots Reggae',
    AVANTGARDE = 'Avantgarde',
    BEAT = 'Beat',
    CONTEMPORARY = 'Contemporary',
    HIPHOP = 'Hip Hop',
    THEME = 'Theme',
    GOSPEL = 'Gospel',
    MODERNCLASSICAL = 'Modern Classical',
    ROCKABILLY = 'Rockabilly',
    SCORE = 'Score',
    HARDHOUSE = 'Hard House',
    DOOMMETAL = 'Doom Metal',
    BOP = 'Bop',
    POWERPOP = 'Power Pop',
    OPERA = 'Opera',
    TRIPHOP = 'Trip Hop',
    SYMPHONICROCK = 'Symphonic Rock',
    LATINJAZZ = 'Latin Jazz',
    FUTUREJAZZ = 'Future Jazz',
    SMOOTHJAZZ = 'Smooth Jazz',
    GOTHROCK = 'Goth Rock',
    COMEDY = 'Comedy',
    GANGSTA = 'Gangsta',
    LATIN = 'Latin',
    SKA = 'Ska',
    CONSCIOUS = 'Conscious',
    MUSICAL = 'Musical',
    IDM = 'IDM',
    HARDBOP = 'Hard Bop',
    ACIDHOUSE = 'Acid House',
    UKGARAGE = 'UK Garage',
    POSTPUNK = 'Post-Punk',
    TRIBAL = 'Tribal',
    COOLJAZZ = 'Cool Jazz',
    ITALODANCE = 'Italodance',
    POSTROCK = 'Post Rock',
    FREEJAZZ = 'Free Jazz',
    AFRICAN = 'African',
    INSTRUMENTAL = 'Instrumental',
    HINRG = 'Hi NRG',
    SOUTHERNROCK = 'Southern Rock',
    ACIDJAZZ = 'Acid Jazz',
    ARENAROCK = 'Arena Rock',
    POSTBOP = 'Post Bop',
    DOOWOP = 'Doo Wop',
    GRINDCORE = 'Grindcore',
    INDIEPOP = 'Indie Pop',
    REGGAEPOP = 'Reggae-Pop',
    SURF = 'Surf',
    LOFI = 'Lo-Fi',
    BRITPOP = 'Brit Pop',
    SPOKENWORD = 'Spoken Word',
    TRIBALHOUSE = 'Tribal House',
    FREEIMPROVISATION = 'Free Improvisation',
    NOVELTY = 'Novelty',
    BIGBEAT = 'Big Beat',
    STONERROCK = 'Stoner Rock',
    DANCEPOP = 'Dance-pop',
    CONTEMPORARYRB = 'Contemporary R&B',
    HIPHOUSE = 'Hip-House',
    DUBSTEP = 'Dubstep',
    RELIGIOUS = 'Religious',
    SALSA = 'Salsa',
    KRAUTROCK = 'Krautrock',
    FREESTYLE = 'Freestyle',
    MPB = 'MPB',
    NEWAGE = 'New Age',
    DIXIELAND = 'Dixieland',
    LAÏKÓ = 'Laïkó',
    EBM = 'EBM',
    JUNGLE = 'Jungle',
    GRUNGE = 'Grunge',
    SAMBA = 'Samba',
    DRONE = 'Drone',
    PARODY = 'Parody',
    EMO = 'Emo',
    BOOGIE = 'Boogie',
    MOD = 'Mod',
    BLUEGRASS = 'Bluegrass',
    SPACEROCK = 'Space Rock',
    ELECTRICBLUES = 'Electric Blues',
    SHOEGAZE = 'Shoegaze',
    BOSSANOVA = 'Bossanova',
    DARKAMBIENT = 'Dark Ambient',
    HAPPYHARDCORE = 'Happy Hardcore',
    NUMETAL = 'Nu Metal',
    THUGRAP = 'Thug Rap',
    FLAMENCO = 'Flamenco',
    SPEEDMETAL = 'Speed Metal',
    BROKENBEAT = 'Broken Beat',
    AOR = 'AOR',
    NEOSOUL = 'Neo Soul',
    JPOP = 'J-pop',
    CELTIC = 'Celtic',
    JAZZDANCE = 'Jazzdance',
    GABBER = 'Gabber',
    COUNTRYBLUES = 'Country Blues',
    EURODANCE = 'Eurodance',
    OI = 'Oi',
    MODAL = 'Modal',
    AFROBEAT = 'Afrobeat',
    BOLERO = 'Bolero',
    CHICAGOBLUES = 'Chicago Blues',
    LOUNGE = 'Lounge',
    RAGGAHIPHOP = 'Ragga HipHop',
    POWERMETAL = 'Power Metal',
    DUBTECHNO = 'Dub Techno',
    FIELDRECORDING = 'Field Recording',
    PSYCHEDELIC = 'Psychedelic',
    NEWJACKSWING = 'New Jack Swing',
    NEOCLASSICAL = 'Neo-Classical',
    HARDSTYLE = 'Hardstyle',
    LOVERSROCK = 'Lovers Rock',
    BASSMUSIC = 'Bass Music',
    CHACHA = 'Cha-Cha',
    ETHEREAL = 'Ethereal',
    ÉNTEKHNO = 'Éntekhno',
    POPPUNK = 'Pop Punk',
    CALYPSO = 'Calypso',
    NEWBEAT = 'New Beat',
    NEOFOLK = 'Neofolk',
    RUMBA = 'Rumba',
    PROGRESSIVEMETAL = 'Progressive Metal',
    TANGO = 'Tango',
    RAGTIME = 'Ragtime',
    RAGGA = 'Ragga',
    EURODISCO = 'Euro-Disco',
    DARKWAVE = 'Darkwave',
    INTERVIEW = 'Interview',
    STORY = 'Story',
    ROCKSTEADY = 'Rocksteady',
    AFROCUBAN = 'Afro-Cuban',
    AVANTGARDEJAZZ = 'Avant-garde Jazz',
    ITALOHOUSE = 'Italo House',
    FUNKMETAL = 'Funk Metal',
    ELECTROHOUSE = 'Electro House',
    CUMBIA = 'Cumbia',
    HARDCOREHIPHOP = 'Hardcore Hip-Hop',
    PSYTRANCE = 'Psy-Trance',
    POETRY = 'Poetry',
    MAMBO = 'Mambo',
    RENAISSANCE = 'Renaissance',
    METALCORE = 'Metalcore',
    SPACEAGE = 'Space-Age',
    CUTUPDJ = 'Cut-up/DJ',
    AFROCUBANJAZZ = 'Afro-Cuban Jazz',
    MERENGUE = 'Merengue',
    JAZZYHIPHOP = 'Jazzy Hip-Hop',
    RADIOPLAY = 'Radioplay',
    MUSIQUECONCRÈTE = 'Musique Concrète',
    MATHROCK = 'Math Rock',
    PSYCHOBILLY = 'Psychobilly',
    PIANOBLUES = 'Piano Blues',
    GOATRANCE = 'Goa Trance',
    SPEEDGARAGE = 'Speed Garage',
    GLITCH = 'Glitch',
    MAKINA = 'Makina',
    NEOROMANTIC = 'Neo-Romantic',
    SLUDGEMETAL = 'Sludge Metal',
    CHORAL = 'Choral',
    MINIMALTECHNO = 'Minimal Techno',
    SOCA = 'Soca',
    PFUNK = 'P.Funk',
    DELTABLUES = 'Delta Blues',
    TWIST = 'Twist',
    MODERNELECTRICBLUES = 'Modern Electric Blues',
    GRIME = 'Grime',
    DIALOGUE = 'Dialogue',
    HINDUSTANI = 'Hindustani',
    GOTHICMETAL = 'Gothic Metal',
    ACIDROCK = 'Acid Rock',
    POLITICAL = 'Political',
}

export default EStyle