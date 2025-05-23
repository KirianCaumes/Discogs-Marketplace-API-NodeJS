// cspell: disable
/**
 * Styles
 */
export type Style =
    | 'AOR'
    | 'Aboriginal'
    | 'Abstract'
    | 'Acid'
    | 'Acid House'
    | 'Acid Jazz'
    | 'Acid Rock'
    | 'Acoustic'
    | 'African'
    | 'Afro-Cuban'
    | 'Afro-Cuban Jazz'
    | 'Afrobeat'
    | 'Aguinaldo'
    | 'Alternative Rock'
    | 'Ambient'
    | 'Andalusian Classical'
    | 'Andean Music'
    | 'Appalachian Music'
    | 'Arena Rock'
    | 'Art Rock'
    | 'Atmospheric Black Metal'
    | 'Audiobook'
    | 'Avant-garde Jazz'
    | 'Avantgarde'
    | 'Axé'
    | 'Azonto'
    | 'Bachata'
    | 'Baião'
    | 'Balearic'
    | 'Ballad'
    | 'Ballroom'
    | 'Baltimore Club'
    | 'Bambuco'
    | 'Bangladeshi Classical'
    | 'Barbershop'
    | 'Baroque'
    | 'Baroque Pop'
    | 'Basque Music'
    | 'Bass Music'
    | 'Bassline'
    | 'Batucada'
    | 'Bayou Funk'
    | 'Beat'
    | 'Beatbox'
    | 'Beatdown'
    | 'Beguine'
    | 'Bengali Music'
    | 'Berlin-School'
    | 'Bhangra'
    | 'Big Band'
    | 'Big Beat'
    | 'Black Metal'
    | 'Bleep'
    | 'Bluegrass'
    | 'Blues Rock'
    | 'Bolero'
    | 'Bollywood'
    | 'Bomba'
    | 'Bongo Flava'
    | 'Boogaloo'
    | 'Boogie'
    | 'Boogie Woogie'
    | 'Boom Bap'
    | 'Bop'
    | 'Bossa Nova'
    | 'Bossanova'
    | 'Bounce'
    | 'Brass Band'
    | 'Break-In'
    | 'Breakbeat'
    | 'Breakcore'
    | 'Breaks'
    | 'Brit Pop'
    | 'Britcore'
    | 'Britpop'
    | 'Broken Beat'
    | 'Bubblegum'
    | 'Bubbling'
    | 'Cabaret'
    | 'Caipira'
    | 'Cajun'
    | 'Calypso'
    | 'Cambodian Classical'
    | 'Candombe'
    | 'Cantopop'
    | 'Canzone Napoletana'
    | 'Cape Jazz'
    | 'Carimbó'
    | 'Carnatic'
    | 'Catalan Music'
    | 'Celtic'
    | 'Cha-Cha'
    | 'Chacarera'
    | 'Chamamé'
    | 'Champeta'
    | 'Chanson'
    | 'Charanga'
    | 'Chicago Blues'
    | 'Chillwave'
    | 'Chinese Classical'
    | 'Chiptune'
    | 'Choral'
    | 'Choro'
    | 'Chutney'
    | 'City Pop'
    | 'Classic Rock'
    | 'Classical'
    | 'Cloud Rap'
    | 'Cobla'
    | 'Coldwave'
    | 'Comedy'
    | 'Compas'
    | 'Conjunto'
    | 'Conscious'
    | 'Contemporary'
    | 'Contemporary Jazz'
    | 'Contemporary R&B'
    | 'Cool Jazz'
    | 'Copla'
    | 'Corrido'
    | 'Country'
    | 'Country Blues'
    | 'Country Rock'
    | 'Cretan'
    | 'Crunk'
    | 'Crust'
    | 'Cuatro'
    | 'Cubano'
    | 'Cumbia'
    | 'Cut-up/DJ'
    | 'DJ Battle Tool'
    | 'Dance-pop'
    | 'Dancehall'
    | 'Dangdut'
    | 'Danzon'
    | 'Dark Ambient'
    | 'Dark Jazz'
    | 'Darkwave'
    | 'Death Metal'
    | 'Deathcore'
    | 'Deathrock'
    | 'Deep House'
    | 'Deep Techno'
    | 'Delta Blues'
    | 'Depressive Black Metal'
    | 'Descarga'
    | 'Dialogue'
    | 'Disco'
    | 'Disco Polo'
    | 'Dixieland'
    | 'Donk'
    | 'Doo Wop'
    | 'Doom Metal'
    | 'Doomcore'
    | 'Downtempo'
    | 'Dream Pop'
    | 'Drone'
    | 'Drum n Bass'
    | 'Dub'
    | 'Dub Poetry'
    | 'Dub Techno'
    | 'Dubstep'
    | 'Dungeon Synth'
    | 'EBM'
    | 'Early'
    | 'East Coast Blues'
    | 'Easy Listening'
    | 'Education'
    | 'Educational'
    | 'Electric Blues'
    | 'Electro'
    | 'Electro House'
    | 'Electro Swing'
    | 'Electroacoustic'
    | 'Electroclash'
    | 'Emo'
    | 'Enka'
    | 'Erotic'
    | 'Ethereal'
    | 'Ethno-pop'
    | 'Euro House'
    | 'Euro-Disco'
    | 'Eurobeat'
    | 'Eurodance'
    | 'Europop'
    | 'Experimental'
    | 'Fado'
    | 'Favela Funk'
    | 'Field Recording'
    | 'Filk'
    | 'Flamenco'
    | 'Folk'
    | 'Folk Metal'
    | 'Folk Rock'
    | 'Footwork'
    | 'Forró'
    | 'Free Funk'
    | 'Free Improvisation'
    | 'Free Jazz'
    | 'Freestyle'
    | 'Freetekno'
    | 'Funaná'
    | 'Funeral Doom Metal'
    | 'Funk'
    | 'Funk Metal'
    | 'Funkot'
    | 'Fusion'
    | 'Future Jazz'
    | 'G-Funk'
    | 'Gabber'
    | 'Gagaku'
    | 'Gaita'
    | 'Galician Traditional'
    | 'Gamelan'
    | 'Gangsta'
    | 'Garage House'
    | 'Garage Rock'
    | 'Ghazal'
    | 'Ghetto'
    | 'Ghetto House'
    | 'Ghettotech'
    | 'Glam'
    | 'Glitch'
    | 'Glitch Hop'
    | 'Go-Go'
    | 'Goa Trance'
    | 'Gogo'
    | 'Goregrind'
    | 'Gospel'
    | 'Goth Rock'
    | 'Gothic Metal'
    | 'Gqom'
    | 'Grime'
    | 'Grindcore'
    | 'Griot'
    | 'Groove Metal'
    | 'Group Sounds'
    | 'Grunge'
    | 'Guaguancó'
    | 'Guajira'
    | 'Guaracha'
    | 'Guarania'
    | 'Guggenmusik'
    | 'Gwo Ka'
    | 'Gypsy Jazz'
    | 'Għana'
    | 'Halftime'
    | 'Hands Up'
    | 'Happy Hardcore'
    | 'Hard Beat'
    | 'Hard Bop'
    | 'Hard House'
    | 'Hard Rock'
    | 'Hard Techno'
    | 'Hard Trance'
    | 'Hardcore'
    | 'Hardcore Hip-Hop'
    | 'Hardstyle'
    | 'Harmonica Blues'
    | 'Harsh Noise Wall'
    | 'Hawaiian'
    | 'Health-Fitness'
    | 'Heavy Metal'
    | 'Hi NRG'
    | 'Highlife'
    | 'Hill Country Blues'
    | 'Hillbilly'
    | 'Hindustani'
    | 'Hip Hop'
    | 'Hip-House'
    | 'Hiplife'
    | 'Hokkien Pop'
    | 'Honky Tonk'
    | 'Horror Rock'
    | 'Horrorcore'
    | 'House'
    | 'Huayno'
    | 'Hyperpop'
    | 'Hyphy'
    | 'IDM'
    | 'Illbient'
    | 'Impressionist'
    | 'Indian Classical'
    | 'Indie Pop'
    | 'Indie Rock'
    | 'Indo-Pop'
    | 'Industrial'
    | 'Industrial Metal'
    | 'Instrumental'
    | 'Interview'
    | 'Italo House'
    | 'Italo-Disco'
    | 'Italodance'
    | 'J-Core'
    | 'J-Rock'
    | 'J-pop'
    | 'Jangle Pop'
    | 'Jazz-Funk'
    | 'Jazz-Rock'
    | 'Jazzdance'
    | 'Jazzy Hip-Hop'
    | 'Jersey Club'
    | 'Jibaro'
    | 'Joropo'
    | 'Jota'
    | 'Jug Band'
    | 'Juke'
    | 'Jump Blues'
    | 'Jumpstyle'
    | 'Jungle'
    | 'Junkanoo'
    | 'K-Rock'
    | 'K-pop'
    | 'Karaoke'
    | 'Kaseko'
    | 'Kayōkyoku'
    | 'Keroncong'
    | 'Kizomba'
    | 'Klasik'
    | 'Klezmer'
    | 'Korean Court Music'
    | 'Krautrock'
    | 'Kuduro'
    | 'Kwaito'
    | 'Lambada'
    | 'Lao Music'
    | 'Latin'
    | 'Latin Jazz'
    | 'Laïkó'
    | 'Leftfield'
    | 'Lento Violento'
    | 'Levenslied'
    | 'Light Music'
    | 'Liscio'
    | 'Lo-Fi'
    | 'Louisiana Blues'
    | 'Lounge'
    | 'Lovers Rock'
    | 'Luk Krung'
    | 'Luk Thung'
    | 'MPB'
    | 'Makina'
    | 'Maloya'
    | 'Mambo'
    | 'Mandopop'
    | 'Marcha Carnavalesca'
    | 'Marches'
    | 'Mariachi'
    | 'Marimba'
    | 'Math Rock'
    | 'Mbalax'
    | 'Medical'
    | 'Medieval'
    | 'Melodic Death Metal'
    | 'Melodic Hardcore'
    | 'Memphis Blues'
    | 'Mento'
    | 'Merengue'
    | 'Metalcore'
    | 'Miami Bass'
    | 'Military'
    | 'Milonga'
    | "Min'yō"
    | 'Minimal'
    | 'Minimal Techno'
    | 'Minneapolis Sound'
    | 'Mizrahi'
    | 'Mo Lam'
    | 'Mod'
    | 'Modal'
    | 'Modern'
    | 'Modern Classical'
    | 'Modern Electric Blues'
    | 'Monolog'
    | 'Moombahton'
    | 'Morna'
    | 'Motswako'
    | 'Mouth Music'
    | 'Movie Effects'
    | 'Mugham'
    | 'Musette'
    | 'Music Hall'
    | 'Musical'
    | 'Musique Concrète'
    | 'Música Criolla'
    | 'NDW'
    | 'Neo Soul'
    | 'Neo Trance'
    | 'Neo-Classical'
    | 'Neo-Romantic'
    | 'Neofolk'
    | 'Nerdcore Techno'
    | 'New Age'
    | 'New Beat'
    | 'New Jack Swing'
    | 'New Wave'
    | 'Nhạc Vàng'
    | 'No Wave'
    | 'Noise'
    | 'Noisecore'
    | 'Nordic'
    | 'Norteño'
    | 'Novelty'
    | 'Nu Metal'
    | 'Nu-Disco'
    | 'Nueva Cancion'
    | 'Nueva Trova'
    | 'Nursery Rhymes'
    | 'Néo Kyma'
    | 'Népzene'
    | 'Occitan'
    | 'Oi'
    | 'Opera'
    | 'Operetta'
    | 'Oratorio'
    | 'Ottoman Classical'
    | 'Overtone Singing'
    | 'P.Funk'
    | 'Pachanga'
    | 'Pacific'
    | 'Parody'
    | 'Pasodoble'
    | 'Persian Classical'
    | 'Philippine Classical'
    | 'Phleng Phuea Chiwit'
    | 'Phonk'
    | 'Piano Blues'
    | 'Piedmont Blues'
    | 'Piobaireachd'
    | 'Pipe & Drum'
    | 'Plena'
    | 'Poetry'
    | 'Political'
    | 'Polka'
    | 'Pop Punk'
    | 'Pop Rap'
    | 'Pop Rock'
    | 'Pornogrind'
    | 'Porro'
    | 'Post Bop'
    | 'Post Rock'
    | 'Post-Hardcore'
    | 'Post-Metal'
    | 'Post-Modern'
    | 'Post-Punk'
    | 'Power Electronics'
    | 'Power Metal'
    | 'Power Pop'
    | 'Power Violence'
    | 'Prog Rock'
    | 'Progressive Bluegrass'
    | 'Progressive Breaks'
    | 'Progressive House'
    | 'Progressive Metal'
    | 'Progressive Trance'
    | 'Promotional'
    | 'Psy-Trance'
    | 'Psychedelic'
    | 'Psychedelic Rock'
    | 'Psychobilly'
    | 'Pub Rock'
    | 'Public Broadcast'
    | 'Public Service Announcement'
    | 'Punk'
    | 'Qawwali'
    | 'Quechua'
    | 'Radioplay'
    | 'Ragga'
    | 'Ragga HipHop'
    | 'Ragtime'
    | 'Ranchera'
    | 'Rapso'
    | 'Raï'
    | 'Rebetiko'
    | 'Reggae'
    | 'Reggae Gospel'
    | 'Reggae-Pop'
    | 'Reggaeton'
    | 'Religious'
    | 'Renaissance'
    | 'Rhythm & Blues'
    | 'Rhythmic Noise'
    | 'RnB/Swing'
    | 'Rock & Roll'
    | 'Rock Opera'
    | 'Rockabilly'
    | 'Rocksteady'
    | 'Romani'
    | 'Romantic'
    | 'Roots Reggae'
    | 'Rumba'
    | 'Rune Singing'
    | 'Ryūkōka'
    | 'Rōkyoku'
    | 'Salegy'
    | 'Salsa'
    | 'Samba'
    | 'Samba-Canção'
    | 'Schlager'
    | 'Schranz'
    | 'Score'
    | 'Screw'
    | 'Sea Shanties'
    | 'Sean-nós'
    | 'Sephardic'
    | 'Seresta'
    | 'Serial'
    | 'Sermon'
    | 'Sertanejo'
    | 'Shaabi'
    | 'Shidaiqu'
    | 'Shoegaze'
    | 'Singeli'
    | 'Ska'
    | 'Skiffle'
    | 'Skweee'
    | 'Sludge Metal'
    | 'Smooth Jazz'
    | 'Soca'
    | 'Soft Rock'
    | 'Son'
    | 'Son Montuno'
    | 'Sonero'
    | 'Soukous'
    | 'Soul'
    | 'Soul-Jazz'
    | 'Sound Art'
    | 'Sound Collage'
    | 'Sound Poetry'
    | 'Soundtrack'
    | 'Southern Rock'
    | 'Space Rock'
    | 'Space-Age'
    | 'Spaza'
    | 'Special Effects'
    | 'Speech'
    | 'Speed Garage'
    | 'Speed Metal'
    | 'Speedcore'
    | 'Spirituals'
    | 'Spoken Word'
    | 'Steel Band'
    | 'Stoner Rock'
    | 'Story'
    | 'Stride'
    | 'Surf'
    | 'Swamp Pop'
    | 'Swing'
    | 'Swingbeat'
    | 'Symphonic Metal'
    | 'Symphonic Rock'
    | 'Synth-pop'
    | 'Synthwave'
    | 'Sámi Music'
    | 'Séga'
    | 'Taarab'
    | 'Tamil Film Music'
    | 'Tango'
    | 'Tech House'
    | 'Tech Trance'
    | 'Technical'
    | 'Technical Death Metal'
    | 'Techno'
    | 'Tejano'
    | 'Texas Blues'
    | 'Thai Classical'
    | 'Theme'
    | 'Therapy'
    | 'Thrash'
    | 'Thug Rap'
    | 'Timba'
    | 'Trallalero'
    | 'Trance'
    | 'Trap'
    | 'Tribal'
    | 'Tribal House'
    | 'Trip Hop'
    | 'Tropical House'
    | 'Trova'
    | 'Turntablism'
    | 'Twelve-tone'
    | 'Twist'
    | 'UK Funky'
    | 'UK Garage'
    | 'UK Street Soul'
    | 'Vallenato'
    | 'Vaporwave'
    | 'Vaudeville'
    | 'Video Game Music'
    | 'Viking Metal'
    | 'Villancicos'
    | 'Vocal'
    | 'Volksmusik'
    | 'Waiata'
    | 'Western Swing'
    | 'Witch House'
    | 'Yemenite Jewish'
    | 'Yé-Yé'
    | 'Zamba'
    | 'Zarzuela'
    | 'Zemer Ivri'
    | 'Zouk'
    | 'Zydeco'
    | 'Éntekhno'
    | ({} & string)
