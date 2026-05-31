import React, { useState, useMemo } from 'react';
import { Movie } from '../types';
import { Sparkles, Play, Search, Info, Film, Radio, ArrowRight, Compass, HelpCircle, Check } from 'lucide-react';

interface AIRecommenderViewProps {
  movies: Movie[];
  onPlayMovie: (movie: Movie) => void;
  onToggleMyList: (id: string) => void;
  myList: string[];
}

interface MoodOption {
  id: string;
  name: string;
  emoji: string;
  gradient: string;
  tags: string[];
  explanation: string;
}

const MOODS: MoodOption[] = [
  {
    id: 'mood_cyber',
    name: 'Mind-Bending & Cyberpunk',
    emoji: '👽',
    gradient: 'from-purple-900 via-indigo-950 to-black',
    tags: ['Sci-Fi', 'cybernetic', 'conspiracy', 'quantum', 'consciousness', 'memory', 'mind'],
    explanation: 'For those who love reality puzzles, high-tech dystopian futures, and psychological glitches.'
  },
  {
    id: 'mood_action',
    name: 'Adrenaline Thrill Rush',
    emoji: '🔥',
    gradient: 'from-red-950 via-rose-950 to-black',
    tags: ['Action', 'Thriller', 'chase', 'getaway', 'combat', 'retribution', 'speed'],
    explanation: 'High impact choreography, intense high-speed chases, and relentless suspense.'
  },
  {
    id: 'mood_cold',
    name: 'Glacial Isolation & mystery',
    emoji: '❄️',
    gradient: 'from-sky-950 via-slate-900 to-black',
    tags: ['Mystery', 'climatologists', 'polar', 'Antarctic', 'Alaskan', 'isolation', 'cold'],
    explanation: 'Deep mysteries, sub-zero temperatures, and quiet, heavy atmosphere.'
  },
  {
    id: 'mood_heart',
    name: 'Poetic & Atmospheric',
    emoji: '🌸',
    gradient: 'from-pink-950/80 via-neutral-900 to-black',
    tags: ['Drama', 'Romance', 'Dust Bowl', 'cellist', 'love', 'romantic', 'melancholy'],
    explanation: 'Stunning cinematography, emotional depth, and beautiful character pairings.'
  },
  {
    id: 'mood_intellect',
    name: 'Intellectual Games',
    emoji: '♟️',
    gradient: 'from-amber-950/70 via-stone-900 to-black',
    tags: ['chess', 'grandmaster', 'Florence', 'restorer', 'Geneva', 'code', 'masterpiece'],
    explanation: 'Complex mental plots, strategic moves, art history codes, and elite circles.'
  }
];

export const AIRecommenderView: React.FC<AIRecommenderViewProps> = ({
  movies,
  onPlayMovie,
  onToggleMyList,
  myList,
}) => {
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isCurating, setIsCurating] = useState(false);
  const [curatedLineup, setCuratedLineup] = useState<{ movie: Movie; rationale: string }[]>([]);
  const [activeMoodTitle, setActiveMoodTitle] = useState('');
  const [showDetailMovie, setShowDetailMovie] = useState<Movie | null>(null);

  // Core smart curation logic matching prompts or moods
  const handleCurate = (moodId: string | null, textPrompt?: string) => {
    setIsCurating(true);
    setCuratedLineup([]);

    setTimeout(() => {
      let matchedList: { movie: Movie; score: number; reason: string }[] = [];

      if (moodId) {
        // Mode 1: Pre-set Mood option selection
        const mood = MOODS.find(m => m.id === moodId)!;
        setActiveMoodTitle(mood.name);
        
        movies.forEach((m) => {
          let score = 0;
          let matchingWords: string[] = [];
          
          // Match genres and keywords in synopsis, title, tagline
          mood.tags.forEach((tag) => {
            const regex = new RegExp(`\\b${tag}\\b`, 'gi');
            const inTitle = (m.title.match(regex) || []).length * 4;
            const inGenres = m.genre.includes(tag) ? 6 : 0;
            const inSynopsis = (m.synopsis.match(regex) || []).length * 2;
            const inTagline = (m.tagline.match(regex) || []).length * 2;

            const increment = inTitle + inGenres + inSynopsis + inTagline;
            if (increment > 0) {
              score += increment;
              matchingWords.push(tag);
            }
          });

          // Fallbacks for baseline score to keep results highly relevant
          if (moodId === 'mood_cyber' && m.genre.includes('Sci-Fi')) score += 3;
          if (moodId === 'mood_action' && m.genre.includes('Action')) score += 3;
          if (moodId === 'mood_cold' && (m.title.includes('COLD') || m.title.includes('SILENT') || m.synopsis.includes('Alaskan') || m.synopsis.includes('Antarctic'))) score += 5;
          if (moodId === 'mood_heart' && (m.genre.includes('Romance') || m.genre.includes('Drama'))) score += 3;
          if (moodId === 'mood_intellect' && (m.genre.includes('Mystery') || m.synopsis.includes('chess') || m.synopsis.includes('art'))) score += 4;

          if (score > 0) {
            matchedList.push({
              movie: m,
              score,
              reason: `Matched categories such as ${m.genre.join('/')}. Perfect alignment with fields of ${matchingWords.slice(0, 3).join(', ') || 'aesthetic mood'}.`
            });
          }
        });
      } else if (textPrompt) {
        // Mode 2: Custom Text Prompt Analysis
        setActiveMoodTitle(`Custom Search: "${textPrompt.slice(0, 30)}${textPrompt.length > 30 ? '...' : ''}"`);
        const searchWords = textPrompt.toLowerCase().split(/\s+/).filter(w => w.length > 2);

        movies.forEach((m) => {
          let score = 0;
          let foundMatches: string[] = [];

          searchWords.forEach((word) => {
            if (m.title.toLowerCase().includes(word)) { score += 10; foundMatches.push(word); }
            if (m.synopsis.toLowerCase().includes(word)) { score += 5; foundMatches.push(word); }
            if (m.tagline.toLowerCase().includes(word)) { score += 3; foundMatches.push(word); }
            if (m.director.toLowerCase().includes(word)) { score += 6; foundMatches.push(word); }
            if (m.cast.some(c => c.toLowerCase().includes(word))) { score += 5; foundMatches.push(word); }
            if (m.genre.some(g => g.toLowerCase().includes(word))) { score += 8; foundMatches.push(word); }
          });

          if (score > 0) {
            matchedList.push({
              movie: m,
              score,
              reason: `Direct keyword semantic connection found for: "${foundMatches.join(', ')}".`
            });
          }
        });
      }

      // Sort matched movies
      matchedList.sort((a, b) => b.score - a.score);

      // Take top 3-4 matches, compile a beautiful curator commentary explanation!
      const formattedLineup = matchedList.slice(0, 4).map((item) => {
        let customizedCommentary = '';
        if (selectedMoodId === 'mood_cyber') {
          customizedCommentary = `This selection perfectly mirrors your choice for futuristic complexity. Director ${item.movie.director} constructs a layered grid full of technological hazards, deep-rooted corporate plots, and beautiful neon reflections.`;
        } else if (selectedMoodId === 'mood_action') {
          customizedCommentary = `Prepare for an intense thrill ride. Featuring outstanding physical choreography by ${item.movie.cast[0] || 'the cast'}, this movie maintains a lightning-fast pace with zero visual fluff.`;
        } else if (selectedMoodId === 'mood_cold') {
          customizedCommentary = `A beautiful example of isolated cinematic noir. The pacing is deliberate, allowing polar environments and heavy acoustic tracking to establish a gorgeous, eye-strain-friendly winter chill.`;
        } else if (selectedMoodId === 'mood_heart') {
          customizedCommentary = `An outstanding piece of emotional storytelling. Centered on a poignant character dynamic, it uses gorgeous atmospheric sunset palettes and instrumental cello overlays to create deep resonance.`;
        } else if (selectedMoodId === 'mood_intellect') {
          customizedCommentary = `A highly rewarding brain-twister. It expects your undivided attention as directors drop subtle visual setups and symmetric configurations that tie directly into Florence art mysteries or high-stakes Geneva grandmaster chess matches.`;
        } else {
          customizedCommentary = `Our AI detected outstanding visual metrics for your prompt. We have prioritized this title due to its narrative pace, glowing scores, and thematic alignment.`;
        }

        return {
          movie: item.movie,
          rationale: `${item.reason} ${customizedCommentary}`
        };
      });

      // Fallback if zero matches
      if (formattedLineup.length === 0) {
        // Recommend Neon Soul and Chronos Paradox as safe blockbusters
        setCuratedLineup([
          { movie: movies[0], rationale: "Our recommendation algorithms suggested this premium cyberpunk feature to matches your custom query." },
          { movie: movies[3], rationale: "A universal mind-bender with outstanding audience grades. Recommended as a classic fallback selection." }
        ]);
      } else {
        setCuratedLineup(formattedLineup);
      }

      setIsCurating(false);
    }, 1500); // Cinematic pulse duration
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    setSelectedMoodId(null);
    handleCurate(null, customPrompt);
  };

  const selectPreMood = (mood: MoodOption) => {
    setSelectedMoodId(mood.id);
    setCustomPrompt('');
    handleCurate(mood.id);
  };

  return (
    <div className="w-full text-left px-6 sm:px-12 py-8 min-h-screen pb-28 select-none">
      
      {/* Header Title */}
      <div className="flex flex-col gap-1.5 mb-8">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#e50914] animate-pulse" />
          <h1 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide">AI Mood Curator</h1>
        </div>
        <p className="font-sans text-xs sm:text-sm text-[#bab8b7]/60">Select an atmospheric style or specify a custom feeling to generate tailored playlists.</p>
      </div>

      {/* Grid of Preset Mood Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {MOODS.map((mood) => {
          const isActive = selectedMoodId === mood.id;
          return (
            <button
              key={mood.id}
              onClick={() => selectPreMood(mood)}
              className={`relative rounded-xl p-5 text-left border flex flex-col justify-between h-40 transition-all cursor-pointer group hover:scale-[1.02] active:scale-[0.98] ${
                isActive
                  ? 'bg-zinc-900 border-[#e50914] shadow-[0_0_15px_rgba(229,9,20,0.2)]'
                  : 'bg-[#1e2020] border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-3xl">{mood.emoji}</span>
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#e50914] animate-ping' : 'bg-transparent'}`}></span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-sans font-bold text-xs text-white uppercase tracking-wider">{mood.name}</h3>
                <p className="font-sans text-[10px] text-stone-500 leading-tight group-hover:text-stone-300 transition-colors">
                  {mood.explanation}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom Text Prompt Input Form */}
      <form onSubmit={handleCustomSubmit} className="w-full max-w-2xl bg-zinc-900 border border-white/5 p-4 rounded-xl mb-12 flex gap-3 items-center">
        <Compass className="w-5 h-5 text-stone-500 flex-shrink-0" />
        <input
          type="text"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="E.g., A slow-burn classic romance set during dust storms with string instruments..."
          className="flex-1 bg-transparent text-sm text-stone-200 outline-none font-sans"
          disabled={isCurating}
        />
        <button
          type="submit"
          disabled={isCurating || !customPrompt.trim()}
          className="bg-white hover:bg-neutral-200 text-black font-bold p-2 px-4 rounded-lg text-xs flex items-center gap-1 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 cursor-pointer"
        >
          CURATE <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* CURATOR ACTIVE LOADER */}
      {isCurating && (
        <div className="py-24 text-center flex flex-col items-center justify-center gap-4 animate-pulse">
          <div className="w-12 h-12 rounded-full border-4 border-zinc-800 border-t-[#e50914] animate-spin" />
          <h3 className="font-sans font-semibold text-stone-300">Curating Perfect Cinematic Alignment...</h3>
          <p className="font-sans text-xs text-stone-500 max-w-xs">{`Scanning poster indexes, synopses tags, and crew metrics.`}</p>
        </div>
      )}

      {/* CURATED LINEUP DISPLAYER */}
      {!isCurating && curatedLineup.length > 0 && (
        <div className="space-y-6 animate-fade-in text-left">
          {/* Section banner subtitle */}
          <div className="flex items-center gap-3 border-b border-white/5 pb-3">
            <Radio className="w-4 h-4 text-[#e50914] animate-pulse" />
            <h2 className="font-bebas text-2xl text-stone-200 uppercase tracking-wide">
              {activeMoodTitle} — Curator Selections
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {curatedLineup.map(({ movie, rationale }, index) => {
              const inList = myList.includes(movie.id);
              return (
                <div
                  key={movie.id}
                  className="bg-[#1e2020] border border-white/5 rounded-xl overflow-hidden flex flex-col sm:flex-row shadow-lg hover:border-white/10 transition-all p-4.5 gap-4"
                >
                  {/* Poster left */}
                  <div
                    onClick={() => setShowDetailMovie(movie)}
                    className="w-full sm:w-[130px] aspect-[2/3] rounded-md overflow-hidden bg-neutral-900 cursor-pointer hover:opacity-90 flex-shrink-0 border border-white/5"
                  >
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Info right */}
                  <div className="flex-1 flex flex-col justify-between text-left">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3
                          onClick={() => setShowDetailMovie(movie)}
                          className="font-bebas text-2xl text-white leading-none hover:text-[#ffb4aa] cursor-pointer"
                        >
                          {movie.title}
                        </h3>
                        <span className="font-mono text-[10px] text-emerald-400 font-bold bg-emerald-950/20 px-1.5 py-0.5 rounded leading-none">
                          {movie.userScore}% Match
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-[10px] text-stone-500 font-sans mb-3 font-semibold uppercase">
                        <span>{movie.releaseYear}</span>
                        <span>•</span>
                        <span>{movie.duration}</span>
                        <span>•</span>
                        <span>{movie.rating}</span>
                      </div>

                      {/* AI explanation block quote */}
                      <div className="text-xs text-stone-400 leading-relaxed py-2 px-3 bg-zinc-950 rounded border-l-2 border-[#e50914]/60 font-sans select-text italic mb-4">
                        💡 "{rationale}"
                      </div>
                    </div>

                    {/* Quick play/list actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onPlayMovie(movie)}
                        className="flex-1 bg-white hover:bg-stone-200 text-black text-xs font-bold py-2 px-4 rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" /> Play Movie
                      </button>
                      <button
                        onClick={() => onToggleMyList(movie.id)}
                        className={`p-2 rounded border transition-colors flex items-center justify-center cursor-pointer ${
                          inList ? 'border-[#e50914]/20 text-[#ffb4aa]' : 'border-white/5 hover:border-white/15 text-stone-300'
                        }`}
                        title={inList ? "Remove from List" : "Add to List"}
                      >
                        {inList ? <Check className="w-4 h-4 text-[#e50914]" /> : <ArrowRight className="w-4 h-4 text-stone-400" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Preset curator welcome screen info if empty */}
      {!isCurating && curatedLineup.length === 0 && (
        <div className="py-16 text-center max-w-md mx-auto flex flex-col items-center gap-5 text-stone-500">
          <Sparkles className="w-12 h-12 text-[#e50914] stroke-1 opacity-25 animate-bounce" />
          <div>
            <h3 className="font-sans font-semibold text-stone-300 mb-1 text-sm">Curation Engine Ready</h3>
            <p className="font-sans text-xs text-stone-500 leading-relaxed">
              Tap any atmospheric mood preset triggers, or type a custom emotional request in the input bar to create your unique watch series lineup instantly.
            </p>
          </div>
        </div>
      )}

      {/* QUICK INFO DETAIL SLIDE-OVER */}
      {showDetailMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#1e2020] rounded-xl overflow-hidden border border-white/10 max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setShowDetailMovie(null)}
              className="absolute top-4 right-4 z-30 p-2 bg-black/50 hover:bg-neutral-900 text-stone-300 rounded-full cursor-pointer"
            >
              <span className="font-semibold block text-xs px-1">✕ Close</span>
            </button>

            <div className="relative h-[200px] sm:h-[300px]">
              <img
                src={showDetailMovie.backdropUrl}
                alt={showDetailMovie.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e2020] via-black/15 to-transparent"></div>
              
              <div className="absolute bottom-4 left-6 text-left">
                <span className="text-[10px] font-bold bg-[#e50914] text-white py-0.5 px-2 rounded-sm mb-2 inline-block">
                  {showDetailMovie.rating}
                </span>
                <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-tight leading-none">
                  {showDetailMovie.title}
                </h3>
              </div>
            </div>

            <div className="p-6 md:p-8 text-left grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
              <div className="md:col-span-2 flex flex-col gap-3.5">
                <div className="flex items-center gap-3 text-stone-400 font-mono">
                  <span className="text-emerald-400 font-bold">{showDetailMovie.userScore}% MATCH</span>
                  <span>{showDetailMovie.releaseYear}</span>
                  <span>{showDetailMovie.duration}</span>
                </div>

                <p className="text-stone-300 text-sm leading-relaxed font-sans font-normal">
                  {showDetailMovie.synopsis}
                </p>

                <div className="py-2.5 px-4 bg-zinc-950 border-l-[3px] border-[#e50914] text-stone-400 italic font-medium">
                  "{showDetailMovie.tagline}"
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-5 text-stone-300 font-sans">
                <div>
                  <h5 className="text-stone-500 font-semibold uppercase mb-1">Director</h5>
                  <p className="font-semibold text-white">{showDetailMovie.director}</p>
                </div>

                <div>
                  <h5 className="text-stone-500 font-semibold uppercase mb-1">Principal Cast</h5>
                  <ul className="flex flex-wrap gap-1 md:flex-col leading-tight font-medium">
                    {showDetailMovie.cast.map((actor, idx) => (
                      <li key={idx}>{actor}{idx < showDetailMovie.cast.length - 1 ? ',' : ''}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      onPlayMovie(showDetailMovie);
                      setShowDetailMovie(null);
                    }}
                    className="w-full bg-[#e50914] text-white font-bold py-3 rounded-md flex items-center justify-center gap-1 hover:opacity-95 text-xs cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> PLAY
                  </button>
                  <button
                    onClick={() => onToggleMyList(showDetailMovie.id)}
                    className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-md flex items-center justify-center gap-1 border border-white/5 text-[11px] cursor-pointer"
                  >
                    {myList.includes(showDetailMovie.id) ? 'REMOVE LIST' : 'ADD TO LIST'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
