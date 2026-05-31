import React, { useState, useEffect } from 'react';
import { movies, profileAvatars } from './moviesData';
import { Movie, UserProfile, ActiveTab } from './types';
import { SplashView } from './components/SplashView';
import { BrowseView } from './components/BrowseView';
import { PlayerView } from './components/PlayerView';
import { SearchView } from './components/SearchView';
import { AIRecommenderView } from './components/AIRecommenderView';
import { ProfileView } from './components/ProfileView';
import { Film, Search, Sparkles, User, List, LogOut } from 'lucide-react';

export default function App() {
  // 1. Initial State Syncing from LocalStorage
  const [userEmail, setUserEmail] = useState<string>(() => {
    return localStorage.getItem('flix_user_email') || '';
  });
  
  const [isRegistered, setIsRegistered] = useState<boolean>(() => {
    return !!localStorage.getItem('flix_user_email');
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  const [myList, setMyList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('flix_my_list');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activePlayMovie, setActivePlayMovie] = useState<Movie | null>(null);

  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('flix_user_profile');
      if (saved) return JSON.parse(saved);
    } catch {}
    
    // Default fallback profile configuration
    const defaultEmail = localStorage.getItem('flix_user_email') || 'critic@flix.app';
    const cleanName = defaultEmail.split('@')[0];
    const initialName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    
    return {
      name: initialName ? `${initialName}` : 'Theater Fanatic',
      email: defaultEmail,
      avatarId: 'av1',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      favoriteGenre: 'All',
      watchTimeMinutes: 194
    };
  });

  // Watch count syncing on action plays
  useEffect(() => {
    if (activePlayMovie) {
      setProfile(prev => {
        const updated = {
          ...prev,
          watchTimeMinutes: prev.watchTimeMinutes + 12 // increment simulated minutes per play
        };
        localStorage.setItem('flix_user_profile', JSON.stringify(updated));
        return updated;
      });
    }
  }, [activePlayMovie]);

  // Persisting configurations
  useEffect(() => {
    localStorage.setItem('flix_my_list', JSON.stringify(myList));
  }, [myList]);

  const handleRegister = (email: string) => {
    setUserEmail(email);
    setIsRegistered(true);
    localStorage.setItem('flix_user_email', email);
    
    const cleanName = email.split('@')[0];
    const initialName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    
    const updatedProfile: UserProfile = {
      ...profile,
      name: initialName || 'Theater Critic',
      email: email,
    };
    setProfile(updatedProfile);
    localStorage.setItem('flix_user_profile', JSON.stringify(updatedProfile));
  };

  const handleToggleMyList = (id: string) => {
    setMyList((prev) => {
      if (prev.includes(id)) {
        return prev.filter(mId => mId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleResetApp = () => {
    localStorage.removeItem('flix_my_list');
    localStorage.removeItem('flix_user_profile');
    setMyList([]);
    
    const cleanName = userEmail.split('@')[0];
    const initialName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

    const freshProfile = {
      name: initialName || 'Critic Enthusiast',
      email: userEmail,
      avatarId: 'av1',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      favoriteGenre: 'All',
      watchTimeMinutes: 0
    };
    setProfile(freshProfile);
    localStorage.setItem('flix_user_profile', JSON.stringify(freshProfile));
  };

  const handleSignOut = () => {
    localStorage.removeItem('flix_user_email');
    localStorage.removeItem('flix_user_profile');
    localStorage.removeItem('flix_my_list');
    setUserEmail('');
    setIsRegistered(false);
    setMyList([]);
    setActiveTab('home');
    // Wipe profile state
    setProfile({
      name: 'critic',
      email: '',
      avatarId: 'av1',
      joinedDate: '',
      favoriteGenre: 'All',
      watchTimeMinutes: 0
    });
  };

  const currentAvatar = profileAvatars.find(av => av.id === profile.avatarId) || profileAvatars[0];

  // 2. Splash view routing guard
  if (!isRegistered) {
    return (
      <SplashView
        onGetStarted={handleRegister}
        onSignIn={() => handleRegister('technicalgeming@gmail.com')}
      />
    );
  }

  // 3. Immersive media player viewport mode
  if (activePlayMovie) {
    return (
      <PlayerView
        movie={activePlayMovie}
        onClose={() => setActivePlayMovie(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#121414] text-[#e2e2e2] flex flex-col justify-between selection:bg-[#e50914]/35 relative">
      
      {/* 4. MAIN GLOBAL STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-[#121414]/75 backdrop-blur-xl border-b border-white/5 px-6 py-4.5 sm:px-12 flex items-center justify-between transition-colors select-none">
        <div className="flex items-center gap-8">
          {/* Logo brand and navigation redirect */}
          <button
            onClick={() => setActiveTab('home')}
            className="font-bebas text-3xl text-[#e50914] tracking-tighter drop-shadow-[0_0_15px_rgba(229,9,20,0.5)] active:scale-95 transition-all cursor-pointer hover:opacity-90"
          >
            FLIX
          </button>

          {/* Desktop Navigation Link Row */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-sans font-bold tracking-wide text-stone-400">
            <button
              onClick={() => setActiveTab('home')}
              className={`hover:text-white transition-colors cursor-pointer ${activeTab === 'home' ? 'text-white border-b-2 border-[#e50914] pb-1' : ''}`}
            >
              Browse Home
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`hover:text-white transition-colors cursor-pointer ${activeTab === 'search' ? 'text-white border-b-2 border-[#e50914] pb-1' : ''}`}
            >
              Advanced Search
            </button>
            <button
              onClick={() => setActiveTab('mylist')}
              className={`hover:text-white transition-colors cursor-pointer ${activeTab === 'mylist' ? 'text-white border-b-2 border-[#e50914] pb-1' : ''}`}
            >
              My Saved list
            </button>
            <button
              onClick={() => setActiveTab('ai-recs')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${activeTab === 'ai-recs' ? 'text-white border-b-2 border-[#e50914] pb-1' : ''}`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e50914]" /> Mood Curator
            </button>
          </nav>
        </div>

        {/* Right Header Panel: Avatar & sign out */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2.5 bg-zinc-900 border border-white/5 rounded-full pl-2.5 pr-2 py-1 hover:border-[#e50914] transition-all cursor-pointer group"
          >
            <span className="text-xs font-sans font-bold text-stone-300 group-hover:text-white hidden sm:inline leading-none">
              {profile.name.length > 14 ? `${profile.name.slice(0, 12)}...` : profile.name}
            </span>
            <div className={`w-7.5 h-7.5 rounded-full bg-gradient-to-tr ${currentAvatar.color} flex items-center justify-center text-sm shadow border border-white/10 group-hover:scale-105 transition-transform`}>
              {currentAvatar.icon}
            </div>
          </button>
          
          <button
            onClick={handleSignOut}
            className="p-2 border border-white/5 rounded-full hover:bg-neutral-950 text-stone-500 hover:text-white transition-colors hidden md:flex cursor-pointer"
            title="Sign Out Account"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 5. PRIMARY PAGE CONTENT AREA VIEW ROUTER */}
      <main className="flex-grow w-full relative">
        {activeTab === 'home' && (
          <BrowseView
            movies={movies}
            myList={myList}
            onToggleMyList={handleToggleMyList}
            onPlayMovie={(movie) => setActivePlayMovie(movie)}
            userEmail={userEmail}
          />
        )}

        {activeTab === 'search' && (
          <SearchView
            movies={movies}
            myList={myList}
            onToggleMyList={handleToggleMyList}
            onPlayMovie={(movie) => setActivePlayMovie(movie)}
          />
        )}

        {activeTab === 'mylist' && (
          <div className="w-full text-left px-6 sm:px-12 py-8 min-h-screen pb-28 select-none">
            <div className="flex flex-col gap-1.5 mb-8">
              <h1 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide">My Saved List</h1>
              <p className="font-sans text-xs sm:text-sm text-[#bab8b7]/60">Your private queue of blockbusters and favorites, synced automatically.</p>
            </div>
            
            {myList.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {movies.filter(m => myList.includes(m.id)).map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => setActivePlayMovie(movie)}
                    className="relative aspect-[2/3] rounded-lg overflow-hidden border border-white/5 bg-[#1a1c1c] cursor-pointer hover:scale-[1.03] active:scale-[0.98] hover:border-[#e50914] hover:shadow-[0_0_15px_rgba(229,9,20,0.25)] transition-all duration-300 group"
                  >
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end text-left select-none">
                      <h4 className="font-bebas text-lg text-white leading-tight mb-1">{movie.title}</h4>
                      <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold mb-2">
                        <span>{movie.userScore}% Match</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-white hover:bg-stone-200 text-black text-[10px] font-bold py-1 px-3 rounded flex items-center justify-center gap-1 cursor-pointer">
                          Play
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleMyList(movie.id);
                          }}
                          className="p-1 px-1.5 bg-black/60 rounded text-stone-300 hover:text-[#e50914]"
                          title="Remove"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center flex flex-col items-center gap-4 text-stone-500 select-none">
                <List className="w-12 h-12 text-[#e50914] opacity-35 stroke-1" />
                <div>
                  <h3 className="font-sans text-stone-300 font-semibold mb-1 text-base">Your Queue is Empty</h3>
                  <p className="font-sans text-stone-500 text-xs text-center max-w-xs">{`Explore blockbusters in Home or advanced search categories, and select "+" to save them here.`}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ai-recs' && (
          <AIRecommenderView
            movies={movies}
            onPlayMovie={(movie) => setActivePlayMovie(movie)}
            onToggleMyList={handleToggleMyList}
            myList={myList}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            profile={profile}
            onChangeProfile={(updated) => {
              setProfile(updated);
              localStorage.setItem('flix_user_profile', JSON.stringify(updated));
            }}
            myListSize={myList.length}
            onResetApp={handleResetApp}
            onSignOut={handleSignOut}
          />
        )}
      </main>

      {/* 6. MOBILE STICKY BOTTOM TABS HEADER (Strict Contextual Glassmorphic Overlay) */}
      <footer className="fixed bottom-0 inset-x-0 z-45 md:hidden bg-[#121414]/80 backdrop-blur-2xl border-t border-white/5 py-3.5 flex justify-around items-center leading-none select-none">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-transform duration-200 active:scale-95 ${activeTab === 'home' ? 'text-[#e50914]' : 'text-stone-500'}`}
        >
          <Film className="w-5.5 h-5.5" />
          <span className="text-[9px] font-sans font-bold tracking-wider uppercase">Home</span>
        </button>

        <button
          onClick={() => setActiveTab('search')}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-transform duration-200 active:scale-95 ${activeTab === 'search' ? 'text-[#e50914]' : 'text-stone-500'}`}
        >
          <Search className="w-5.5 h-5.5" />
          <span className="text-[9px] font-sans font-bold tracking-wider uppercase">Search</span>
        </button>

        <button
          onClick={() => setActiveTab('mylist')}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-transform duration-200 active:scale-95 ${activeTab === 'mylist' ? 'text-[#e50914]' : 'text-stone-500'}`}
        >
          <List className="w-5.5 h-5.5" />
          <span className="text-[9px] font-sans font-bold tracking-wider uppercase">My List</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-recs')}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-transform duration-200 active:scale-95 ${activeTab === 'ai-recs' ? 'text-[#e50914]' : 'text-stone-500'}`}
        >
          <Sparkles className="w-5.5 h-5.5" />
          <span className="text-[9px] font-sans font-bold tracking-wider uppercase">Curator</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-transform duration-200 active:scale-95 ${activeTab === 'profile' ? 'text-[#e50914]' : 'text-stone-500'}`}
        >
          <User className="w-5.5 h-5.5" />
          <span className="text-[9px] font-sans font-bold tracking-wider uppercase">Profile</span>
        </button>
      </footer>
    </div>
  );
}
