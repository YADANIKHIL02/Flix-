import { Movie } from './types';

export const movies: Movie[] = [
  {
    id: 'm1',
    title: 'NEON SOUL: 2099',
    tagline: 'In a city of wires, humanity is the ultimate upgrade.',
    synopsis: 'A cybersecurity detective in Neo-Tokyo gets dragged into a subterranean cybernetic conspiracy after a high-profile target transfers their digitized consciousness directly into his neurological implants.',
    genre: ['Sci-Fi', 'Action', 'Thriller'],
    rating: 'R',
    userScore: 98,
    releaseYear: 2025,
    duration: '2h 14m',
    director: 'Kento Takahashi',
    cast: ['Yuki Sato', 'Elena Vance', 'Marcus Chen'],
    posterUrl: 'https://picsum.photos/seed/neo2099/400/600',
    backdropUrl: 'https://picsum.photos/seed/neo2099/1200/675',
    isTrending: true,
    isPopular: true,
    scenes: [
      { time: '0:00', title: 'Rain Over Neo-Tokyo', desc: 'Rain-soaked synthetic neon-lit streets of the lower wards.' },
      { time: '0:45', title: 'The Consciousness Hack', desc: 'A cyber-heist gone wrong leads to a high-speed neural download.' },
      { time: '1:20', title: 'The Grid Chase', desc: 'Sprinting across hyper-loop rails to escape sector security.' },
      { time: '1:55', title: 'The Machine Core', desc: 'A philosophical digital showdown inside the city\'s main server.' }
    ]
  },
  {
    id: 'm2',
    title: 'THE SILENT ECHO',
    tagline: 'Some secrets should remain buried in the deep polar silence.',
    synopsis: 'During a grueling winter expedition at an isolated Antarctic research station, a team of climatologists uncovers a mysterious acoustic signal vibrating from deep inside an ancient glacier.',
    genre: ['Mystery', 'Thriller', 'Drama'],
    rating: 'PG-13',
    userScore: 94,
    releaseYear: 2024,
    duration: '1h 58m',
    director: 'Sarah Larsson',
    cast: ['Ingrid Bergman', 'David Hauer', 'Thomas Cole'],
    posterUrl: 'https://picsum.photos/seed/silentecho/400/600',
    backdropUrl: 'https://picsum.photos/seed/silentecho/1200/675',
    isTrending: true,
    isPopular: false,
    scenes: [
      { time: '0:00', title: 'The Frozen Plain', desc: 'An endless white desert beaten by unrelenting sub-zero gales.' },
      { time: '0:35', title: 'Unusual Vibrations', desc: 'Sensing an rhythmic acoustic bass wave underneath the ice shelf.' },
      { time: '1:10', title: 'Isolation Syndrome', desc: 'Cabin fever sets in as communication systems abruptly fail.' },
      { time: '1:40', title: 'Descent into the Rift', desc: 'Rappelling down into a luminous, echoing ice cave.' }
    ]
  },
  {
    id: 'm3',
    title: 'SHADOW RECKONING',
    tagline: 'Vengeance has no blind spots.',
    synopsis: 'A blind ex-special forces operative turned piano tuner is forced back into the criminal underworld when his young apprentice is kidnapped by a ruthless human-trafficking syndicate.',
    genre: ['Action', 'Thriller'],
    rating: 'R',
    userScore: 92,
    releaseYear: 2025,
    duration: '2h 05m',
    director: 'Chad Stahel',
    cast: ['Christian Bale', 'Zoe Saldana', 'John Goodman'],
    posterUrl: 'https://picsum.photos/seed/shadowreckon/400/600',
    backdropUrl: 'https://picsum.photos/seed/shadowreckon/1200/675',
    isTrending: false,
    isPopular: true,
    scenes: [
      { time: '0:00', title: 'Quiet Melodies', desc: 'Tuning an grand piano in a dimly lit, atmospheric penthouse.' },
      { time: '0:30', title: 'The Breach', desc: 'Using tactical combat hearing to disarm three covert hitmen.' },
      { time: '1:15', title: 'The Warehouse Ambush', desc: 'A beautifully choreographed melee utilizing proximity and sound.' },
      { time: '1:50', title: 'Final Retribution', desc: 'A face-to-face showdown with the head mastermind in the docks.' }
    ]
  },
  {
    id: 'm4',
    title: 'THE CHRONOS PARADOX',
    tagline: 'To save the tomorrow we know, we must fracture yesterday.',
    synopsis: 'When a brilliant young physicist invents a device that can send letters exactly 7 days into the past, she tries to prevent her husband\'s murder, accidentally launching a chain sequence of catastrophic distortions.',
    genre: ['Sci-Fi', 'Mystery', 'Drama'],
    rating: 'PG-13',
    userScore: 96,
    releaseYear: 2026,
    duration: '2h 20m',
    director: 'Christopher Nolan',
    cast: ['Cillian Murphy', 'Jessica Chastain', 'Nicholas Hoult'],
    posterUrl: 'https://picsum.photos/seed/chronospara/400/600',
    backdropUrl: 'https://picsum.photos/seed/chronospara/1200/675',
    isTrending: true,
    isPopular: true,
    scenes: [
      { time: '0:00', title: 'The First Letter', desc: 'Feeding an handwritten note into an electromagnetic tachyon chamber.' },
      { time: '0:40', title: 'Altered Timelines', desc: 'Recognizing subtle changes in wedding rings and house decorations.' },
      { time: '1:25', title: 'The Double Hunt', desc: 'A desperate chase through a library where two separate hours overlap.' },
      { time: '2:00', title: 'The Collapse', desc: 'Merging two parallel realities into a single breathtaking nexus point.' }
    ]
  },
  {
    id: 'm5',
    title: 'WHISPERS OF A STORM',
    tagline: 'Two souls stranded in the heart of the dust bowl.',
    synopsis: 'During the devastating Dust Bowl era of the 1930s, a traveling cellist and a runaway mechanic seek refuge in an abandoned farmhouse, forging an intense, poetic bond while a raging sandstorm locks them in.',
    genre: ['Drama', 'Romance'],
    rating: 'PG',
    userScore: 89,
    releaseYear: 2023,
    duration: '1h 50m',
    director: 'Sofia Coppola',
    cast: ['Saoirse Ronan', 'Timothée Chalamet', 'Willem Dafoe'],
    posterUrl: 'https://picsum.photos/seed/whisperstorm/400/600',
    backdropUrl: 'https://picsum.photos/seed/whisperstorm/1200/675',
    isTrending: false,
    isPopular: false,
    scenes: [
      { time: '0:00', title: 'Amber Fields', desc: 'A vast, dry landscape turning crimson under a wall of heavy dust.' },
      { time: '0:25', title: 'Shelter Found', desc: 'Breaking into a creaky wood porch as the gale force storm intensifies.' },
      { time: '1:00', title: 'Nocturnal Duet', desc: 'A haunting cello melody played with candlelight and rain of sand.' },
      { time: '1:35', title: 'The Clearing Glow', desc: 'Sunshine cutting through the orange dust haze to reveal a clean path.' }
    ]
  },
  {
    id: 'm6',
    title: 'THE ARCHITECTS OF MIND',
    tagline: 'Your memories are just blueprint assets in their file system.',
    synopsis: 'In an era where memories can be fully corporate engineered, a master memory architect specializing in premium nostalgic illusions realizes someone has spliced a fictional murder directly into his own personal childhood record.',
    genre: ['Sci-Fi', 'Thriller', 'Mystery'],
    rating: 'R',
    userScore: 95,
    releaseYear: 2025,
    duration: '2h 10m',
    director: 'Denis Villeneuve',
    cast: ['Ryan Gosling', 'Florence Pugh', 'Mark Ruffalo'],
    posterUrl: 'https://picsum.photos/seed/mindarchitect/400/600',
    backdropUrl: 'https://picsum.photos/seed/mindarchitect/1200/675',
    isTrending: true,
    isPopular: true,
    scenes: [
      { time: '0:00', title: 'Splicing Sweet Memories', desc: 'Drafting beautiful golden summer afternoons inside a digital canvas.' },
      { time: '0:45', title: 'The Ghost Child', desc: 'Sifting through code sequences only to find an unknown silhouette.' },
      { time: '1:25', title: 'San Francisco Grid', desc: 'Stealthy infiltration of a high-tech corporate memory archive.' },
      { time: '1:55', title: 'Waking Reality', desc: 'Shattering the artificial memory visor to realize where he truly is.' }
    ]
  },
  {
    id: 'm7',
    title: 'MIDNIGHT RIDE',
    tagline: 'One car. Two briefcases. Zero rules.',
    synopsis: 'A specialized nocturnal getaway driver agrees to take an eccentric wealthy tech mogul across Los Angeles, unaware they are being pursued by crooked federal marshals and elite cybernetic mercenaries.',
    genre: ['Action', 'Thriller'],
    rating: 'R',
    userScore: 91,
    releaseYear: 2024,
    duration: '1h 45m',
    director: 'Nicolas Winding Refn',
    cast: ['Oscar Isaac', 'Ana de Armas', 'Pedro Pascal'],
    posterUrl: 'https://picsum.photos/seed/midnightride/400/600',
    backdropUrl: 'https://picsum.photos/seed/midnightride/1200/675',
    isTrending: false,
    isPopular: true,
    scenes: [
      { time: '0:00', title: 'Ignition Over L.A.', desc: 'Engines roaring in front of a skyline painted in warm purple fog.' },
      { time: '0:30', title: 'The Freeway Breakout', desc: 'Slick drifting maneuvers under low-lit concrete architectural tunnels.' },
      { time: '1:05', title: 'The Desert Hideout', desc: 'Refueling at a fluorescent desert truck stop. Tensions rise.' },
      { time: '1:35', title: 'Full Throttle', desc: 'Speeding towards the international border with helicopters overhead.' }
    ]
  },
  {
    id: 'm8',
    title: 'STARDUST MELANCHOLY',
    tagline: 'An orbital romance drifting 200,000 miles from home.',
    synopsis: 'Two lonely maintenance engineers stationed on a deep-space communications relay satellite fall deeply in love via audio transcripts, only to discover their company is decommissioning the relay and returning them to opposite sides of the galaxy.',
    genre: ['Sci-Fi', 'Romance', 'Drama'],
    rating: 'PG-13',
    userScore: 93,
    releaseYear: 2024,
    duration: '2h 02m',
    director: 'Alfonso Cuarón',
    cast: ['Andrew Garfield', 'Emma Stone', 'Dev Patel'],
    posterUrl: 'https://picsum.photos/seed/stardustm/400/600',
    backdropUrl: 'https://picsum.photos/seed/stardustm/1200/675',
    isTrending: true,
    isPopular: false,
    scenes: [
      { time: '0:00', title: 'Deep Solitude', desc: 'Floating modules silently rotating over an immense blue gas giant.' },
      { time: '0:35', title: 'Voice Over Static', desc: 'Trading jokes and diary logs across short-wave radio interferences.' },
      { time: '1:10', title: 'The Space Walk Rendezvous', desc: 'Meeting face-to-face for the first time in high-altitude extravehicular suits.' },
      { time: '1:45', title: 'The Decommission', desc: 'Packaged crates ready for separate homeward trajectory launches.' }
    ]
  },
  {
    id: 'm9',
    title: 'THE COLD CASE LAB',
    tagline: 'The truth survives under a layer of frozen soil.',
    synopsis: 'A persistent rookie coroner uncovers a major medical cover-up when she examines the perfectly preserved body of a victim from a decades-old mining disaster in a remote Alaskan town.',
    genre: ['Mystery', 'Thriller'],
    rating: 'PG-13',
    userScore: 90,
    releaseYear: 2025,
    duration: '1h 52m',
    director: 'David Fincher',
    cast: ['Rooney Mara', 'Jake Gyllenhaal', 'Laurence Fishburne'],
    posterUrl: 'https://picsum.photos/seed/coldcase/400/600',
    backdropUrl: 'https://picsum.photos/seed/coldcase/1200/675',
    isTrending: false,
    isPopular: false,
    scenes: [
      { time: '0:00', title: 'Tundra Coroner', desc: 'Unpacking sensitive lab gear as heavy winter sleet beats the morgue roof.' },
      { time: '0:30', title: 'Mining Secrets', desc: 'Cracking a sealed safe to find ancient carbon blueprints.' },
      { time: '1:05', title: 'The Sentry Pursuit', desc: 'A slow-burn foot chase through a rusty, abandoned industrial elevator shaft.' },
      { time: '1:40', title: 'Glacial Disclosure', desc: 'An intense deposition scene in a high-security arctic courtroom.' }
    ]
  },
  {
    id: 'm10',
    title: 'THE CHESSMASTER\'S gambit',
    tagline: 'Every move has already been written in the algorithm.',
    synopsis: 'An aging grandmaster takes on an eccentric Silicon Valley billionaire\'s highly secretive quantum AI engine in a globally broadcast match, quickly discovering the stakes are much larger than a board game.',
    genre: ['Drama', 'Mystery'],
    rating: 'PG',
    userScore: 92,
    releaseYear: 2023,
    duration: '2h 01m',
    director: 'Wes Anderson',
    cast: ['Mads Mikkelsen', 'Timothée Chalamet', 'Tilda Swinton'],
    posterUrl: 'https://picsum.photos/seed/chessgambit/400/600',
    backdropUrl: 'https://picsum.photos/seed/chessgambit/1200/675',
    isTrending: false,
    isPopular: true,
    scenes: [
      { time: '0:00', title: 'The Grand Salon', desc: 'Symmetrical luxury hotel in Geneva decked in red velvet curtains.' },
      { time: '0:30', title: 'The Machine Boots Up', desc: 'A complex holographic display projecting 10 million possible defenses.' },
      { time: '1:10', title: 'Mental Overclock', desc: 'Sweating bullets during the infamous 14th Sicilian Defence variation.' },
      { time: '1:45', title: 'Checkmate', desc: 'A standing ovation with a shocking, quiet revelation right after.' }
    ]
  },
  {
    id: 'm11',
    title: 'FRACTURED FRAME',
    tagline: 'Art captures things the eye wishes to forget.',
    synopsis: 'A high-end art restorer in Florence discovers a microscopic encrypted code painted into a famous 16th-century masterpiece that reveals the secret burial location of a legendary Florentine family\'s treasure.',
    genre: ['Mystery', 'Action'],
    rating: 'PG-13',
    userScore: 88,
    releaseYear: 2026,
    duration: '2h 08m',
    director: 'Ron Howard',
    cast: ['Tom Hanks', 'Alicia Vikander', 'Jean Reno'],
    posterUrl: 'https://picsum.photos/seed/fractureframe/400/600',
    backdropUrl: 'https://picsum.photos/seed/fractureframe/1200/675',
    isTrending: true,
    isPopular: false,
    scenes: [
      { time: '0:00', title: 'Under the Loupe', desc: 'Meticulously scraping layers of historic pigment under UV spotlights.' },
      { time: '0:40', title: 'Uncovering the Map', desc: 'Splicing high-density canvas scans together on a digital tablet.' },
      { time: '1:15', title: 'Catacomb Descent', desc: 'Exploring hidden brick tunnels directly under the Florence Cathedral.' },
      { time: '1:50', title: 'The Gilded Safe', desc: 'A dramatic confrontation inside an ancient family crypt.' }
    ]
  },
  {
    id: 'm12',
    title: 'STREETS OF CHROME',
    tagline: 'Speed is the currency; adrenaline is the law.',
    synopsis: 'An underground hover-cycle racer must execute a dangerous cross-district contraband run in less than twenty minutes to pay off a massive debt to the sector\'s most ruthless cybernetic overlord.',
    genre: ['Action', 'Sci-Fi'],
    rating: 'R',
    userScore: 90,
    releaseYear: 2025,
    duration: '1h 38m',
    director: 'Justin Lin',
    cast: ['Zac Efron', 'John Boyega', 'Daniel Dae Kim'],
    posterUrl: 'https://picsum.photos/seed/chromestreets/400/600',
    backdropUrl: 'https://picsum.photos/seed/chromestreets/1200/675',
    isTrending: false,
    isPopular: true,
    scenes: [
      { time: '0:00', title: 'Pre-Flight Check', desc: 'Assembling supercharged magnetic ion propulsion units in a garage.' },
      { time: '0:20', title: 'Green Light Spark', desc: 'An adrenaline fueled drag start through neon expressway tunnels.' },
      { time: '0:55', title: 'Sector Police Blockade', desc: 'A gravity-defying leap across elevated industrial sector cooling towers.' },
      { time: '1:20', title: 'Delivery & Burn', desc: 'Exchanging cargo seconds before an absolute tactical localized blackout.' }
    ]
  }
];

export const genres = ['All', 'Sci-Fi', 'Action', 'Thriller', 'Mystery', 'Drama', 'Romance'];

export const profileAvatars = [
  { id: 'av1', name: 'The Cinephile', icon: '🍿', color: 'from-amber-500 to-red-500' },
  { id: 'av2', name: 'Sci-Fi Geek', icon: '👽', color: 'from-purple-500 to-indigo-500' },
  { id: 'av3', name: 'Action Buff', icon: '🔥', color: 'from-orange-500 to-rose-600' },
  { id: 'av4', name: 'Drama Fanatic', icon: '🎭', color: 'from-cyan-500 to-blue-600' },
  { id: 'av5', name: 'Midnight Mystery', icon: '🕵️‍♂️', color: 'from-slate-600 to-zinc-900' }
];
