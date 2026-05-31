import React, { useState, useRef } from 'react';
import { Movie } from '../types';
import { Play, Plus, Check, Info, ChevronLeft, ChevronRight, Search, X, Volume2, VolumeX } from 'lucide-react';

interface BrowseViewProps {
  movies: Movie[];
  myList: string[];
  onToggleMyList: (id: string) => void;
  onPlayMovie: (movie: Movie) => void;
  userEmail: string;
}

export const BrowseView: React.FC<BrowseViewProps> = ({
  movies,
  myList,
  onToggleMyList,
  onPlayMovie,
  userEmail,
}) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [muted, setMuted] = useState(true);

  // Use the first movie as the giant hero banner movie
  const heroMovie = movies[0];

  // Group movies by category
  const trendingMovies = movies.filter(m => m.isTrending);
  const popularMovies = movies.filter(m => m.isPopular);
  const sciFiMovies = movies.filter(m => m.genre.includes('Sci-Fi'));
  const mysteryMovies = movies.filter(m => m.genre.includes('Mystery') || m.genre.includes('Thriller'));
  const dramaMovies = movies.filter(m => m.genre.includes('Drama'));
  const myListMovies = movies.filter(m => myList.includes(m.id));

  // Refs for custom scroll control on rows
  const rowRefs = {
    trending: useRef<HTMLDivElement>(null),
    popular: useRef<HTMLDivElement>(null),
    scifi: useRef<HTMLDivElement>(null),
    mystery: useRef<HTMLDivElement>(null),
    drama: useRef<HTMLDivElement>(null),
    mylist: useRef<HTMLDivElement>(null),
  };

  const scrollRow = (category: keyof typeof rowRefs, direction: 'left' | 'right') => {
    const ref = rowRefs[category];
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.75;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const MovieCard = ({ movie, isLarge = false }: { movie: Movie; isLarge?: boolean }) => {
    const inList = myList.includes(movie.id);
    return (
      <div 
        onClick={() => setSelectedMovie(movie)}
        className="relative flex-none w-[150px] sm:w-[200px] md:w-[220px] aspect-[2/3] rounded-md overflow-hidden cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 border border-white/5 hover:border-[#e50914] hover:shadow-[0_0_15px_rgba(229,9,20,0.3)] group"
      >
        <img
          src={isLarge ? movie.posterUrl : movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {/* Hover overlay with brief details */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-left">
          <h4 className="font-bebas text-lg md:text-xl text-white leading-tight mb-1">{movie.title}</h4>
          <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-stone-300 font-sans mb-2">
            <span className="text-emerald-400 font-semibold">{movie.userScore}% Match</span>
            <span>•</span>
            <span className="border border-stone-500 px-1 py-0.2 rounded text-[9px] uppercase leading-none font-bold text-stone-300">{movie.rating}</span>
            <span>•</span>
            <span>{movie.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlayMovie(movie);
              }}
              className="p-1 px-3.5 bg-white text-black font-semibold text-[10px] md:text-xs rounded flex items-center gap-1 hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <Play className="w-2.5 h-2.5 fill-current" /> Play
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleMyList(movie.id);
              }}
              className="p-1 bg-white/10 text-white rounded hover:bg-white/20 transition-all active:scale-90 cursor-pointer"
              title={inList ? "Remove from List" : "Add to List"}
            >
              {inList ? <Check className="w-3.5 h-3.5 text-[#e50914]" /> : <Plus className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const MovieRow = ({ 
    title, 
    movieList, 
    category 
  }: { 
    title: string; 
    movieList: Movie[]; 
    category: keyof typeof rowRefs 
  }) => {
    if (movieList.length === 0) return null;
    return (
      <div className="relative group/row py-6 text-left">
        <h3 className="font-sans text-lg font-bold text-white mb-2.5 px-6 sm:px-12 flex items-center justify-between">
          <span>{title}</span>
        </h3>
        
        {/* Left Arrow */}
        <button
          onClick={() => scrollRow(category, 'left')}
          className="absolute left-0 top-[45%] z-20 bg-black/50 backdrop-blur-md p-1.5 sm:p-2.5 text-white rounded-r-lg shadow-md cursor-pointer hover:bg-black/85 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 flex items-center justify-center border border-l-0 border-white/10 hidden md:flex"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Carousel container */}
        <div
          ref={rowRefs[category]}
          className="flex gap-4 overflow-x-auto scrollbar-none px-6 sm:px-12 scroll-smooth py-1"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {movieList.map(movie => (
            <div key={movie.id} style={{ scrollSnapAlign: 'start' }}>
              <MovieCard movie={movie} />
            </div>
          ))}
          {/* Invisible trailing buffer card for clean edge peeking */}
          <div className="w-6 flex-none" />
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scrollRow(category, 'right')}
          className="absolute right-0 top-[45%] z-20 bg-black/50 backdrop-blur-md p-1.5 sm:p-2.5 text-white rounded-l-lg shadow-md cursor-pointer hover:bg-black/85 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 flex items-center justify-center border border-r-0 border-white/10 hidden md:flex"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  return (
    <div className="w-full relative pb-28">
      {/* Giant Hero Featured Banner */}
      <div className="relative w-full h-[65vh] sm:h-[80vh] overflow-hidden">
        {/* Background photo */}
        <div className="absolute inset-0">
          <img
            src={heroMovie.backdropUrl}
            alt={heroMovie.title}
            className="w-full h-full object-cover brightness-75 scale-105 filter saturate-110"
            referrerPolicy="no-referrer"
          />
          {/* Subtle cinematic overlays for blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-transparent to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#121414]/90 via-[#121414]/20 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,transparent_30%,rgba(18,20,20,0.85)_100%)]"></div>
        </div>

        {/* Big Movie Info Block */}
        <div className="absolute bottom-0 left-0 w-full z-10 px-6 pb-8 sm:px-12 sm:pb-16 flex flex-col items-start text-left max-w-2xl">
          <span className="bg-[#e50914]/20 border border-[#e50914]/40 text-[#ffb4aa] text-[10px] font-bold tracking-wider px-2.5 py-1 rounded mb-3 sm:mb-4 uppercase">
            ★ Featured Blockbuster
          </span>
          <h2 className="font-bebas text-5xl sm:text-[5.5rem] text-white leading-none tracking-tighter drop-shadow-md mb-2 sm:mb-3">
            {heroMovie.title}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-neutral-300 drop-shadow-sm font-medium mb-4 italic sm:max-w-md">
            "{heroMovie.tagline}"
          </p>
          <p className="font-sans text-xs sm:text-sm text-neutral-400 drop-shadow-sm mb-6 max-w-sm sm:max-w-lg hidden sm:block">
            {heroMovie.synopsis}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onPlayMovie(heroMovie)}
              className="bg-white text-black font-sans text-xs sm:text-sm font-bold tracking-wider px-6 py-3.5 rounded-lg flex items-center gap-2 hover:bg-stone-200 transition-all active:scale-[0.98] shadow-lg cursor-pointer"
            >
              <Play className="w-4.5 h-4.5 fill-current" /> PLAY
            </button>
            <button
              onClick={() => setSelectedMovie(heroMovie)}
              className="bg-zinc-800/80 backdrop-blur-md text-white font-sans text-xs sm:text-sm font-bold tracking-wider px-5 py-3.5 rounded-lg flex items-center gap-2 hover:bg-zinc-700 hover:border-white/10 border border-white/5 transition-all active:scale-[0.98] shadow-lg cursor-pointer animate-fade-in"
            >
              <Info className="w-4.5 h-4.5" /> DETAILS
            </button>
            <button
              onClick={() => onToggleMyList(heroMovie.id)}
              className={`p-3.5 rounded-lg flex items-center justify-center border transition-all active:scale-[0.98] ${
                myList.includes(heroMovie.id) 
                  ? 'bg-neutral-900/80 border-[#e50914]/40 text-[#ffb4aa]' 
                  : 'bg-zinc-800/80 backdrop-blur-md border-white/5 text-stone-200'
              } cursor-pointer`}
              title={myList.includes(heroMovie.id) ? "Remove from List" : "Add to List"}
            >
              {myList.includes(heroMovie.id) ? <Check className="w-5 h-5 text-[#e50914]" /> : <Plus className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Floating Sound Toggle */}
        <button
          onClick={() => setMuted(!muted)}
          className="absolute bottom-16 right-6 z-10 p-3 bg-black/60 backdrop-blur-md border border-white/10 text-stone-300 rounded-full hover:bg-black/90 active:scale-90 transition-all cursor-pointer"
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Categories & Carousels */}
      <div className="relative -mt-10 sm:-mt-16 z-20 flex flex-col gap-2">
        {/* Dynamic List Row */}
        <MovieRow title="My Watch List" movieList={myListMovies} category="mylist" />
        <MovieRow title="Trending and Hot" movieList={trendingMovies} category="trending" />
        <MovieRow title="Popular on FLIX" movieList={popularMovies} category="popular" />
        <MovieRow title="Sci-Fi Thrillers" movieList={sciFiMovies} category="scifi" />
        <MovieRow title="Murder Mysteries" movieList={mysteryMovies} category="mystery" />
        <MovieRow title="Moving Dramas" movieList={dramaMovies} category="drama" />
      </div>

      {/* QUICK INFO DETAIL SLIDE-OVER / MODAL */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#1e2020] rounded-xl overflow-hidden border border-white/10 max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal close */}
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-4 right-4 z-30 p-2 bg-black/60 hover:bg-black/15 text-stone-300 hover:text-white rounded-full transition-colors cursor-pointer border border-white/10"
            >
              <X className="w-5.5 h-5.5" />
            </button>

            {/* Modal Banner Backdrop */}
            <div className="relative h-[250px] sm:h-[350px]">
              <img
                src={selectedMovie.backdropUrl}
                alt={selectedMovie.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e2020] via-[#1e2020]/20 to-transparent"></div>
              
              <div className="absolute bottom-4 left-6 text-left">
                <span className="text-[10px] font-bold bg-[#e50914] text-white py-0.5 px-2 rounded-sm mb-2 inline-block">
                  {selectedMovie.rating}
                </span>
                <h3 className="font-bebas text-4xl sm:text-6xl text-white tracking-tight drop-shadow-md leading-none">
                  {selectedMovie.title}
                </h3>
              </div>
            </div>

            {/* Modal Body Info Panel */}
            <div className="p-6 md:p-8 text-left grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Main Details Column */}
              <div className="md:col-span-2 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-400 font-sans">
                  <span className="text-emerald-400 font-bold">{selectedMovie.userScore}% MATCH</span>
                  <span>{selectedMovie.releaseYear}</span>
                  <span className="border border-stone-600 px-1.5 py-0.2 rounded text-[10px] uppercase font-bold text-stone-300">{selectedMovie.rating}</span>
                  <span>{selectedMovie.duration}</span>
                </div>

                <p className="font-sans text-stone-200 text-sm leading-relaxed sm:text-base">
                  {selectedMovie.synopsis}
                </p>

                {/* Subtitle / Quote Tagline */}
                <div className="py-2.5 px-4 bg-zinc-900 border-l-[3px] border-[#e50914] text-xs font-medium italic text-stone-400 rounded-r">
                  "{selectedMovie.tagline}"
                </div>

                {/* Scenes breakdown checkpoint */}
                <div className="mt-2">
                  <h4 className="text-white font-bold text-sm mb-3">SCENE CHECKPOINTS</h4>
                  <div className="flex flex-col gap-2.5">
                    {selectedMovie.scenes.map((scene, idx) => (
                      <div key={idx} className="flex gap-3 text-xs text-stone-400 items-start">
                        <span className="font-mono text-[#e50914] bg-[#e50914]/10 transition-colors px-1.5 py-0.5 rounded leading-none">
                          {scene.time}
                        </span>
                        <div>
                          <strong className="text-[#e2e2e2]">{scene.title}: </strong>
                          <span>{scene.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Cast & Crew Meta Bar */}
              <div className="flex flex-col gap-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-5 text-xs font-sans">
                <div>
                  <h5 className="text-stone-500 font-semibold mb-1 uppercase tracking-wide">Director</h5>
                  <p className="text-stone-200 font-medium">{selectedMovie.director}</p>
                </div>

                <div>
                  <h5 className="text-stone-500 font-semibold mb-1 uppercase tracking-wide">Starring Cast</h5>
                  <ul className="flex flex-wrap gap-1 md:flex-col text-stone-200 font-medium">
                    {selectedMovie.cast.map((actor, idx) => (
                      <li key={idx}>{actor}{idx < selectedMovie.cast.length - 1 ? ',' : ''}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-stone-500 font-semibold mb-1 uppercase tracking-wide">Genres</h5>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedMovie.genre.map((g, idx) => (
                      <span key={idx} className="bg-stone-800 text-stone-300 font-semibold px-2 py-0.5 rounded text-[10px]">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Control Actions Row */}
                <div className="mt-4 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      onPlayMovie(selectedMovie);
                      setSelectedMovie(null);
                    }}
                    className="w-full bg-[#e50914] text-white font-bold py-3 rounded-md flex items-center justify-center gap-1.5 hover:opacity-95 transition-all text-sm cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" /> PLAY NOW
                  </button>
                  <button
                    onClick={() => onToggleMyList(selectedMovie.id)}
                    className={`w-full py-2.5 rounded-md flex items-center justify-center gap-1.5 border transition-all text-xs cursor-pointer ${
                      myList.includes(selectedMovie.id)
                        ? 'bg-[#e50914]/15 border-[#e50914]/40 text-[#ffb4aa]'
                        : 'bg-stone-800 border-white/5 hover:bg-stone-700 text-stone-200'
                    }`}
                  >
                    {myList.includes(selectedMovie.id) ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#e50914]" /> REMOVE FROM LIST
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" /> ADD TO MY LIST
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
