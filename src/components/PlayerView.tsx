import React, { useState, useEffect, useRef } from 'react';
import { Movie } from '../types';
import { ArrowLeft, Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Subtitles, Maximize, Settings, AlignLeft } from 'lucide-react';

interface PlayerViewProps {
  movie: Movie;
  onClose: () => void;
}

export const PlayerView: React.FC<PlayerViewProps> = ({ movie, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0); // in seconds
  const [duration, setDuration] = useState(134); // mock overall duration corresponding to ~2hr (just in virtual units for easy slider mapping)
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');
  const [subtitle, setSubtitle] = useState('English [CC]');
  const [showSubtitlesPanel, setShowSubtitlesPanel] = useState(false);
  const [showSpeedPanel, setShowSpeedPanel] = useState(false);
  const [activeScene, setActiveScene] = useState('');

  // Particle list for background cinema simulation
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; speed: number; opacity: number }[]>([]);

  useEffect(() => {
    // Generate mock background dust particles and soft theater static
    const pts = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.5 + 0.2
    }));
    setParticles(pts);
  }, []);

  // Interval timer for playback simulation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          // Increment according to speed scale
          const speedFactor = parseFloat(playbackSpeed.replace('x', ''));
          return prev + 1 * speedFactor;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playbackSpeed, duration]);

  // Handle ambient floating particle loops
  useEffect(() => {
    let pInterval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      pInterval = setInterval(() => {
        setParticles((prev) =>
          prev.map((p) => {
            let nextY = p.y - p.speed;
            if (nextY < 0) nextY = 100;
            return { ...p, y: nextY };
          })
        );
      }, 100);
    }
    return () => {
      if (pInterval) clearInterval(pInterval);
    };
  }, [isPlaying]);

  // Map progress to active dynamic movie scenes
  useEffect(() => {
    // Convert duration into proportion of scene distribution
    const percent = (currentTime / duration) * 100;
    if (percent < 25) {
      setActiveScene(movie.scenes[0]?.title || 'Opening Scene');
    } else if (percent < 50) {
      setActiveScene(movie.scenes[1]?.title || 'Rising Conflict');
    } else if (percent < 75) {
      setActiveScene(movie.scenes[2]?.title || 'The Climax Chase');
    } else {
      setActiveScene(movie.scenes[3]?.title || 'Resolution Epilogue');
    }
  }, [currentTime, duration, movie]);

  const formatVideoTime = (secs: number) => {
    const hours = Math.floor(secs / 60);
    const remainingMins = Math.floor(secs % 60);
    const randomSecsStr = Math.floor((secs * 17) % 60).toString().padStart(2, '0');
    return `${hours}:${remainingMins.toString().padStart(2, '0')}:${randomSecsStr}`;
  };

  const handleSkip = (seconds: number) => {
    setCurrentTime((prev) => {
      const next = prev + seconds;
      if (next < 0) return 0;
      if (next > duration) return duration;
      return next;
    });
  };

  const currentPercent = (currentTime / duration) * 100;

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col justify-between overflow-hidden font-sans">
      
      {/* Dynamic Ambient Cinematic Theater Canvas */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        {/* Soft, moving colored clouds corresponding to movie palette */}
        <div 
          className={`absolute inset-0 bg-radial-gradient from-red-950/20 via-black to-black transition-transform duration-1000 ${
            isPlaying ? 'scale-105 rotate-1 animate-pulse' : 'scale-100'
          }`}
          style={{ mixBlendMode: 'screen' }}
        />
        {/* Film Grain & Dust Simulation */}
        {particles.map((p, idx) => (
          <div
            key={idx}
            className="absolute rounded-full bg-white transition-all duration-300 pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: isPlaying ? p.opacity : p.opacity * 0.3,
            }}
          />
        ))}

        {/* Big stylized movie details */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none animate-pulse px-6">
          <h2 className="font-bebas text-4xl sm:text-5xl text-neutral-800 tracking-wider mb-2 opacity-35">
            {movie.title}
          </h2>
          <div className="text-xs uppercase bg-neutral-900/40 border border-neutral-800/60 text-stone-500 font-mono tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
            {isPlaying ? 'PLAYING VIDEO ILLUSION' : 'PAUSED'}
          </div>
        </div>
      </div>

      {/* TOP HEADER CONTROLS */}
      <header className="relative z-10 w-full bg-gradient-to-b from-black/80 to-transparent p-6 sm:p-8 flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-stone-300 hover:text-white font-semibold text-sm transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Exit Theater</span>
        </button>

        <div className="text-center">
          <h1 className="font-bebas text-2xl tracking-wide select-none">{movie.title}</h1>
          <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">{activeScene}</p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-black/40 backdrop-blur-md border border-white/5 opacity-80 rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="font-semibold text-neutral-300">1080P PRO</span>
        </div>
      </header>

      {/* MOCK SUBTITLES DIALOG DISPLAY */}
      {isPlaying && (
        <div className="relative z-10 w-full max-w-xl mx-auto px-6 text-center text-stone-200 select-none">
          {subtitle !== 'None' && (
            <p className="bg-black/60 shadow-lg backdrop-blur px-5 py-2.5 rounded-lg inline-block text-sm md:text-base tracking-wide border border-white/5 leading-relaxed">
              {currentPercent < 15 && `[Dramatic orchestral arrangement plays in background]`}
              {currentPercent >= 15 && currentPercent < 30 && `"${movie.tagline}"`}
              {currentPercent >= 30 && currentPercent < 45 && `Voice over radio: "...this code runs deep in the system core, we have 4 minutes!"`}
              {currentPercent >= 45 && currentPercent < 65 && `[Action beat sounds swell, sirens echoing distant corridors]`}
              {currentPercent >= 65 && currentPercent < 85 && `"${movie.cast[0] || 'Unknown'}": "I'm downloading consciousness data right now, cover my flank!"`}
              {currentPercent >= 85 && currentPercent < 100 && `"${movie.cast[1] || 'Agent' || 'Elena'}": "We made it. Neon Tokyo looks gorgeous from the high towers..."`}
            </p>
          )}
        </div>
      )}

      {/* BOTTOM CONTROLS & TIMELINE DASHBOARD */}
      <footer className="relative z-10 w-full bg-gradient-to-t from-black via-black/90 to-transparent p-6 sm:p-8 flex flex-col gap-5">
        
        {/* Timeline bar with scrubber */}
        <div className="flex flex-col gap-1">
          <div className="w-full h-1.5 bg-zinc-800 rounded-full relative group cursor-pointer">
            {/* Scrubber background trail */}
            <div 
              className="absolute h-full bg-[#e50914] rounded-full" 
              style={{ width: `${currentPercent}%` }}
            />
            {/* Scrubber pointer circle */}
            <div 
              className="absolute w-3.5 h-3.5 bg-white border-2 border-[#e50914] rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 shadow-md hidden group-hover:block transition-all focus:scale-125"
              style={{ left: `${currentPercent}%` }}
            />
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          
          {/* Time digits row */}
          <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500">
            <span>{formatVideoTime(currentTime)}</span>
            <span className="text-[#e50914] font-semibold tracking-wider">SCENE: {activeScene}</span>
            <span>-{formatVideoTime(duration - currentTime)}</span>
          </div>
        </div>

        {/* Media Control Tray */}
        <div className="flex flex-wrap items-center justify-between gap-4 select-none">
          {/* Left panel: Quick skipping & play state controls */}
          <div className="flex items-center gap-4.5">
            <button
              onClick={() => handleSkip(-10)}
              className="p-1.5 text-stone-400 hover:text-white active:scale-90 transition-all cursor-pointer"
              title="Rewind 10s"
            >
              <RotateCcw className="w-5.5 h-5.5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-white text-black hover:bg-neutral-200 active:scale-95 transition-all rounded-full cursor-pointer flex items-center justify-center shadow-lg"
            >
              {isPlaying ? <Pause className="w-5.5 h-5.5 fill-current" /> : <Play className="w-5.5 h-5.5 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => handleSkip(10)}
              className="p-1.5 text-stone-400 hover:text-white active:scale-90 transition-all cursor-pointer"
              title="Fast Forward 10s"
            >
              <RotateCw className="w-5.5 h-5.5" />
            </button>

            {/* Volume indicator widget */}
            <div className="flex items-center gap-2 sm:ml-4 group/vol">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-stone-400 hover:text-white active:scale-90 transition-all cursor-pointer"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-5.5 h-5.5" /> : <Volume2 className="w-5.5 h-5.5" />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseInt(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-16 accent-white bg-zinc-800 h-1 rounded-full cursor-pointer transition-all focus:h-1.5 opacity-60 hover:opacity-100"
              />
            </div>
          </div>

          {/* Right panel: customization overlays (subtitles, speed, fullscren) */}
          <div className="flex items-center gap-5 relative text-xs text-stone-400">
            {/* Playback speed trigger */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSpeedPanel(!showSpeedPanel);
                  setShowSubtitlesPanel(false);
                }}
                className={`py-1 px-2.5 rounded border border-white/10 hover:border-white/30 text-[10px] font-mono tracking-wider hover:text-white cursor-pointer ${
                  showSpeedPanel ? 'bg-white/10 text-white' : ''
                }`}
              >
                SPEED: {playbackSpeed}
              </button>

              {showSpeedPanel && (
                <div className="absolute bottom-10 right-0 z-40 bg-zinc-900/95 border border-white/10 rounded-lg p-2.5 flex flex-col gap-1.5 shadow-xl w-28">
                  {['0.75x', '1.0x', '1.25x', '1.5x', '2.0x'].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => {
                        setPlaybackSpeed(speed);
                        setShowSpeedPanel(false);
                      }}
                      className={`text-[11px] text-left px-2 py-1 rounded transition-colors ${
                        playbackSpeed === speed ? 'bg-[#e50914] text-white' : 'hover:bg-white/10 text-stone-300'
                      }`}
                    >
                      {speed === '1.0x' ? 'Normal (1.0x)' : speed}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Subtitles trigger */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSubtitlesPanel(!showSubtitlesPanel);
                  setShowSpeedPanel(false);
                }}
                className={`flex items-center gap-1.5 py-1 px-2.5 rounded border border-white/10 hover:border-white/30 hover:text-white text-[10px] tracking-wide cursor-pointer ${
                  showSubtitlesPanel ? 'bg-white/10 text-white' : ''
                }`}
              >
                <Subtitles className="w-3.5 h-3.5" />
                <span>CC: {subtitle.split(' ')[0]}</span>
              </button>

              {showSubtitlesPanel && (
                <div className="absolute bottom-10 right-0 z-40 bg-zinc-900/95 border border-white/10 rounded-lg p-2.5 flex flex-col gap-1.5 shadow-xl w-32">
                  <span className="text-[9px] text-[#e50914] font-bold p-1 uppercase border-b border-white/5">Subtitles Track</span>
                  {['English [CC]', 'Spanish Track', 'French Track', 'None'].map((track) => (
                    <button
                      key={track}
                      onClick={() => {
                        setSubtitle(track);
                        setShowSubtitlesPanel(false);
                      }}
                      className={`text-[11px] text-left px-2 py-1 rounded transition-colors ${
                        subtitle === track ? 'bg-[#e50914] text-white' : 'hover:bg-white/10 text-stone-300'
                      }`}
                    >
                      {track}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              className="hover:text-white p-1 cursor-not-allowed text-stone-600 active:scale-95 transition-all"
              title="Full Screen Mode"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
