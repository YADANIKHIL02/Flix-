import React, { useState, useMemo } from 'react';
import { Movie } from '../types';
import { Search as SearchIcon, Play, Plus, Check, Info, Film } from 'lucide-react';

interface SearchViewProps {
  movies: Movie[];
  myList: string[];
  onToggleMyList: (id: string) => void;
  onPlayMovie: (movie: Movie) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  movies,
  myList,
  onToggleMyList,
  onPlayMovie,
}) => {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [hoveredMovieId, setHoveredMovieId] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Direct Genre Options list (extracted dynamically from data)
  const genres = useMemo(() => {
    const list = new Set<string>();
    movies.forEach(m => m.genre.forEach(g => list.add(g)));
    return ['All', ...Array.from(list)];
  }, [movies]);

  // Compute matched movies with search term + genre filters
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      // 1. Filter by category click
      if (selectedGenre !== 'All' && !movie.genre.includes(selectedGenre)) {
        return false;
      }
      // 2. Filter by search input keyword
      if (!query.trim()) return true;
      const terms = query.toLowerCase();
      return (
        movie.title.toLowerCase().includes(terms) ||
        movie.synopsis.toLowerCase().includes(terms) ||
        movie.tagline.toLowerCase().includes(terms) ||
        movie.director.toLowerCase().includes(terms) ||
        movie.cast.some(actor => actor.toLowerCase().includes(terms)) ||
        movie.genre.some(g => g.toLowerCase().includes(terms))
      );
    });
  }, [movies, query, selectedGenre]);

  return (
    <div className="w-full text-left px-6 sm:px-12 py-8 min-h-screen pb-28">
      {/* Page Title Header */}
      <div className="flex flex-col gap-1.5 mb-8">
        <h1 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide">Library Search</h1>
        <p className="font-sans text-xs sm:text-sm text-[#bab8b7]/60">Explore specific genres, directors, cast members, or storylines.</p>
      </div>

      {/* Inputs Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-8 select-none">
        {/* Dynamic Search Box */}
        <div className="relative flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
            <SearchIcon className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, actors, directors, keywords..."
            className="w-full pl-11 pr-4 py-3 bg-[#1e2020] text-sm text-stone-200 rounded-lg border border-white/5 focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] focus:bg-[#282a2b] transition-all outline-none font-sans"
          />
        </div>

        {/* Dynamic Genre Chips Container */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none max-w-full">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer whitespace-nowrap focus:outline-none ${
                selectedGenre === genre
                  ? 'bg-[#e50914] border-[#e50914] text-white'
                  : 'bg-zinc-900 border-white/5 hover:border-white/15 text-stone-400 hover:text-white'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Results display */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredMovies.map((movie) => {
            const inList = myList.includes(movie.id);
            return (
              <div
                key={movie.id}
                onClick={() => setSelectedMovie(movie)}
                className="relative aspect-[2/3] rounded-lg overflow-hidden border border-white/5 bg-[#1a1c1c] cursor-pointer hover:scale-[1.03] active:scale-[0.98] hover:border-[#e50914] hover:shadow-[0_0_15px_rgba(229,9,20,0.25)] transition-all duration-300 group"
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Visual hovering card drawer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end text-left select-none">
                  <h4 className="font-bebas text-lg text-white leading-tight mb-1">{movie.title}</h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-stone-300 font-mono mb-2">
                    <span className="text-emerald-400 font-bold">{movie.userScore}%</span>
                    <span>•</span>
                    <span className="font-bold border border-zinc-500 px-0.5 rounded leading-none text-[8px]">{movie.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayMovie(movie);
                      }}
                      className="flex-1 bg-white hover:bg-neutral-200 text-black text-[10px] font-bold py-1.5 rounded flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" /> Play
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleMyList(movie.id);
                      }}
                      className="p-1.5 bg-black/50 text-white hover:bg-[#e50914] rounded transition-all active:scale-[0.92] cursor-pointer"
                    >
                      {inList ? <Check className="w-3.5 h-3.5 text-[#e50914]" /> : <Plus className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty grid fallback description */
        <div className="py-24 text-center flex flex-col items-center gap-4 text-stone-500 select-none">
          <Film className="w-12 h-12 text-[#e50914] opacity-30 stroke-1" />
          <div>
            <h3 className="font-sans text-stone-300 font-semibold mb-1 text-base">No Matching Cinematic Titles Found</h3>
            <p className="font-sans text-stone-500 text-xs text-center max-w-xs">{`Try searching representing terms or keyword titles. Tap "All" to browse the full catalogue.`}</p>
          </div>
        </div>
      )}

      {/* Modal Quick Info Copy inside search */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#1e2020] rounded-xl overflow-hidden border border-white/10 max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-4 right-4 z-30 p-2 bg-black/50 hover:bg-neutral-900 text-stone-300 hover:text-white rounded-full transition-colors cursor-pointer border border-white/5"
            >
              <span className="font-semibold block text-sm px-1">✕ Close</span>
            </button>

            <div className="relative h-[200px] sm:h-[300px]">
              <img
                src={selectedMovie.backdropUrl}
                alt={selectedMovie.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e2020] via-black/10 to-transparent"></div>
              
              <div className="absolute bottom-4 left-6 text-left">
                <span className="text-[10px] font-bold bg-[#e50914] text-white py-0.5 px-2 rounded-sm mb-2 inline-block">
                  {selectedMovie.rating}
                </span>
                <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-tight drop-shadow-md leading-none">
                  {selectedMovie.title}
                </h3>
              </div>
            </div>

            <div className="p-6 md:p-8 text-left grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
              <div className="md:col-span-2 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-xs text-stone-400">
                  <span className="text-emerald-400 font-bold">{selectedMovie.userScore}% MATCH</span>
                  <span>{selectedMovie.releaseYear}</span>
                  <span className="border border-stone-600 px-1 py-0.2 rounded text-[10px] uppercase font-bold text-stone-300">{selectedMovie.rating}</span>
                  <span>{selectedMovie.duration}</span>
                </div>

                <p className="text-stone-300 text-sm leading-relaxed">
                  {selectedMovie.synopsis}
                </p>

                <div className="py-2.5 px-4 bg-zinc-900 border-l-[3px] border-[#e50914] text-xs font-medium italic text-stone-400 rounded-r">
                  "{selectedMovie.tagline}"
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-5 text-xs">
                <div>
                  <h5 className="text-stone-500 font-semibold mb-1 uppercase tracking-wide">Director</h5>
                  <p className="text-stone-200 font-semibold">{selectedMovie.director}</p>
                </div>

                <div>
                  <h5 className="text-stone-500 font-semibold mb-1 uppercase tracking-wide">Starring Cast</h5>
                  <ul className="flex flex-wrap gap-1 md:flex-col text-stone-200 font-medium">
                    {selectedMovie.cast.map((actor, idx) => (
                      <li key={idx}>{actor}{idx < selectedMovie.cast.length - 1 ? ',' : ''}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      onPlayMovie(selectedMovie);
                      setSelectedMovie(null);
                    }}
                    className="w-full bg-[#e50914] text-white font-bold py-3 rounded-md flex items-center justify-center gap-1.5 hover:opacity-95 transition-all text-sm cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" /> PLAY
                  </button>
                  <button
                    onClick={() => onToggleMyList(selectedMovie.id)}
                    className={`w-full py-2.5 rounded-md flex items-center justify-center gap-1 border transition-all text-xs cursor-pointer ${
                      myList.includes(selectedMovie.id)
                        ? 'bg-[#e50914]/15 border-[#e50914]/40 text-[#ffb4aa]'
                        : 'bg-stone-800 border-white/5 hover:bg-stone-700 text-stone-200'
                    }`}
                  >
                    {myList.includes(selectedMovie.id) ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#e50914]" /> REMOVE
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" /> ADD TO LIST
                      </>
                    )}
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
