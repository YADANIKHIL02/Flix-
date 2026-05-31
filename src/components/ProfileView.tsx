import React, { useState } from 'react';
import { UserProfile } from '../types';
import { profileAvatars } from '../moviesData';
import { User, Shield, Film, Clock, Heart, RefreshCw, LogOut, Check, Save } from 'lucide-react';

interface ProfileViewProps {
  profile: UserProfile;
  onChangeProfile: (updated: UserProfile) => void;
  myListSize: number;
  onResetApp: () => void;
  onSignOut: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onChangeProfile,
  myListSize,
  onResetApp,
  onSignOut,
}) => {
  const [userName, setUserName] = useState(profile.name);
  const [userEmail, setUserEmail] = useState(profile.email);
  const [selectedGenre, setSelectedGenre] = useState(profile.favoriteGenre);
  const [savingStatus, setSavingStatus] = useState('');

  const genresOptions = ['All', 'Sci-Fi', 'Action', 'Thriller', 'Mystery', 'Drama', 'Romance'];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingStatus('saving');

    const updatedProfile: UserProfile = {
      ...profile,
      name: userName,
      email: userEmail,
      favoriteGenre: selectedGenre
    };

    setTimeout(() => {
      onChangeProfile(updatedProfile);
      setSavingStatus('success');
      setTimeout(() => setSavingStatus(''), 2000);
    }, 800);
  };

  const handleAvatarSelect = (avatarId: string) => {
    const updatedProfile: UserProfile = {
      ...profile,
      avatarId
    };
    onChangeProfile(updatedProfile);
  };

  const currentAvatar = profileAvatars.find(av => av.id === profile.avatarId) || profileAvatars[0];

  return (
    <div className="w-full text-left px-6 sm:px-12 py-8 min-h-screen pb-28 select-none">
      
      {/* Header Info */}
      <div className="flex flex-col gap-1.5 mb-8">
        <h1 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide">Account & Settings</h1>
        <p className="font-sans text-xs sm:text-sm text-[#bab8b7]/60">Customize your theater profile, review watch history statistics, and adjust active credentials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Primary Profile Card and Avatar selection */}
        <div className="lg:col-span-1 bg-[#1e2020] border border-white/5 p-6 rounded-xl flex flex-col gap-6">
          <div className="flex flex-col items-center text-center gap-3">
            {/* Dynamic visual badge */}
            <div className={`w-24 h-24 rounded-2xl bg-gradient-to-tr ${currentAvatar.color} flex items-center justify-center text-5xl shadow-lg border border-white/10 relative group`}>
              <span className="block">{currentAvatar.icon}</span>
              <span className="absolute bottom-1 right-1 bg-black/60 backdrop-blur text-[9px] text-zinc-400 border border-white/5 px-1.5 py-0.5 rounded leading-none">
                {currentAvatar.name.split(' ')[0]}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="font-sans font-bold text-lg text-white leading-tight">{profile.name || 'FLIX Enthusiast'}</h3>
              <p className="font-sans text-xs text-stone-500 font-medium">{profile.email}</p>
              <span className="mt-2 text-[10px] font-mono border border-zinc-800 bg-black/35 text-stone-400 px-2.5 py-1 rounded">
                MEMBER SINCE: {profile.joinedDate}
              </span>
            </div>
          </div>

          {/* Preset Profile Avatar Lists picker */}
          <div className="flex flex-col gap-2 border-t border-white/5 pt-5">
            <h4 className="text-xs uppercase font-sans font-extrabold tracking-wider text-stone-400">Select Avatar Persona</h4>
            <div className="grid grid-cols-5 gap-2 mt-1">
              {profileAvatars.map((av) => (
                <button
                  key={av.id}
                  onClick={() => handleAvatarSelect(av.id)}
                  className={`aspect-square rounded-lg flex items-center justify-center text-2xl bg-zinc-900 border transition-all hover:scale-105 active:scale-95 cursor-pointer relative ${
                    profile.avatarId === av.id
                      ? 'border-[#e50914] shadow-[0_0_10px_rgba(229,9,20,0.15)] bg-[#1e2020]'
                      : 'border-white/5 hover:border-white/10'
                  }`}
                  title={av.name}
                >
                  <span>{av.icon}</span>
                  {profile.avatarId === av.id && (
                    <span className="absolute -top-1 -right-1 bg-[#e50914] text-white p-0.5 rounded-full">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Col: Profile Settings Edits inputs form */}
        <div className="lg:col-span-1 bg-[#1e2020] border border-white/5 p-6 rounded-xl">
          <form onSubmit={handleSave} className="flex flex-col gap-5">
            <h4 className="text-sm font-sans font-bold text-white border-b border-white/5 pb-2">Modify Account Values</h4>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider font-sans">Profile Display Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-zinc-900 text-stone-300 rounded border border-white/5 focus:border-[#e50914] outline-none text-xs transition-colors font-sans"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider font-sans">Active Email Address</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-zinc-900 text-stone-300 rounded border border-white/5 focus:border-[#e50914] outline-none text-xs transition-colors font-sans"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider font-sans">Preferred Library Genre</label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-900 text-stone-300 rounded border border-white/5 focus:border-[#e50914] outline-none text-xs transition-colors font-sans"
              >
                {genresOptions.map((g) => (
                  <option key={g} value={g}>{g === 'All' ? 'None (Browse Everything)' : g}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={savingStatus === 'saving'}
              className="mt-2 w-full bg-[#e50914] hover:opacity-95 text-white text-xs font-bold py-3 px-4 rounded-md flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer"
            >
              {savingStatus === 'saving' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Saving Changes
                </>
              ) : savingStatus === 'success' ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Saved Successfully!
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" /> Save Changes
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Col: Admin controls and mock statistics panel */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Mock Watch Telemetry Stats */}
          <div className="bg-[#1e2020] border border-white/5 p-6 rounded-xl flex flex-col gap-4">
            <h4 className="text-sm font-sans font-bold text-white border-b border-white/5 pb-2">Watch telemetry</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900 p-3.5 rounded border border-white/5 flex flex-col items-start gap-1 justify-between h-20">
                <Film className="w-4 h-4 text-[#e50914] opacity-75" />
                <div>
                  <span className="text-lg font-bebas text-white block leading-none">{myListSize}</span>
                  <span className="text-[9px] font-sans text-stone-500 uppercase font-semibold">Movies In List</span>
                </div>
              </div>

              <div className="bg-zinc-900 p-3.5 rounded border border-white/5 flex flex-col items-start gap-1 justify-between h-20">
                <Clock className="w-4 h-4 text-emerald-400 opacity-75" />
                <div>
                  <span className="text-lg font-bebas text-white block leading-none">{profile.watchTimeMinutes}m</span>
                  <span className="text-[9px] font-sans text-stone-500 uppercase font-semibold">Watch Minutes</span>
                </div>
              </div>

              <div className="bg-zinc-900 p-3.5 rounded border border-white/5 flex flex-col items-start gap-1 justify-between h-20 col-span-2">
                <Heart className="w-4 h-4 text-pink-400 opacity-75" />
                <div className="w-full flex justify-between items-end">
                  <div>
                    <span className="text-sm font-sans font-bold text-white block leading-none">{profile.favoriteGenre === 'All' ? 'Deep-Dive Drama' : profile.favoriteGenre}</span>
                    <span className="text-[8px] font-sans text-stone-500 uppercase font-semibold">Favored Focus Genre</span>
                  </div>
                  <span className="text-[9px] text-[#ffb4aa] uppercase font-bold tracking-wide">Pro Profile</span>
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance Actions and System Reset config options */}
          <div className="bg-[#1e2020] border border-white/5 p-6 rounded-xl flex flex-col gap-3">
            <h4 className="text-sm font-sans font-bold text-white border-b border-white/5 pb-2">System Operations</h4>
            
            <button
              onClick={onResetApp}
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-stone-300 text-xs font-semibold py-2.5 px-4 rounded border border-white/5 hover:border-white/10 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>Reset Local Database</span>
              <RefreshCw className="w-3.5 h-3.5 text-[#e50914]" />
            </button>

            <button
              onClick={onSignOut}
              className="w-full bg-[#e50914]/10 hover:bg-[#e50914]/15 text-[#ffb4aa] text-xs font-semibold py-2.5 px-4 rounded border border-[#e50914]/25 hover:border-[#e50914]/40 flex items-center justify-between transition-colors cursor-pointer"
              title="Return to Welcome Page"
            >
              <span>Sign Out Credentials</span>
              <LogOut className="w-3.5 h-3.5 text-[#ffb4aa]" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
