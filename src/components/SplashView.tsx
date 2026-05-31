import React, { useState } from 'react';

interface SplashViewProps {
  onGetStarted: (email: string) => void;
  onSignIn: () => void;
}

export const SplashView: React.FC<SplashViewProps> = ({ onGetStarted, onSignIn }) => {
  const [emailInput, setEmailInput] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) {
      setErrorStatus('Please enter an email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      setErrorStatus('Please enter a valid email address.');
      return;
    }
    setErrorStatus('');
    setIsLoading(true);

    // Simulate cinematic loading and transition
    setTimeout(() => {
      onGetStarted(emailInput);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <main className="relative h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-[#121414]">
      {/* Cinematic Background Image with Dark Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover filter brightness-50 contrast-125"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIl2mLdYKsZPedFo_BYKza0k2qxIqDCVFn7-vWbiE9nzuQUg5aiRE_pBp50s1Do_2fuBQ7MSDLrznvH3FwyPmF4Q0EceJwXHPz_VJDWk9owSCAOq8rFjgPBq3XlgBsyF23tRYOXQNkgj7ekFTnXt5qUBksfVbnIIV5c3Vkf1U_lhruxXxTZwtubyupHS43rpJTF4Y7JEcPvMo9X5Ws1KWIQsMx0GZvRW9YdTd_He1ijvQBQkE7rvNgKSVSf60Bk_UAkZMIATXFzrvX"
          alt="FLIX Cinema Montage Background"
          referrerPolicy="no-referrer"
        />
        {/* Vignette & Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(18,20,20,0.4)_40%,rgba(18,20,20,1)_100%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-transparent to-[#121414]/50"></div>
      </div>

      {/* Top Header Navigation */}
      <header className="relative z-10 w-full flex justify-between items-center px-6 pt-8 md:px-16">
        <div className="font-bebas text-4xl text-[#e50914] tracking-tighter drop-shadow-[0_0_20px_rgba(229,9,20,0.6)]">
          FLIX
        </div>
        <button 
          onClick={onSignIn}
          className="font-sans text-xs font-semibold text-white bg-white/10 backdrop-blur-md px-4 py-2 rounded-md hover:bg-white/20 transition-all active:scale-95 cursor-pointer"
        >
          Privacy
        </button>
      </header>

      {/* Center Brand Identity */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl">
        <div className="animate-pulse mb-1">
          <h1 className="font-bebas text-7xl md:text-9xl text-[#e50914] tracking-tighter drop-shadow-[0_0_35px_rgba(229,9,20,0.7)]">
            FLIX
          </h1>
        </div>
        <p className="font-sans text-lg md:text-xl font-medium text-[#e2e2e2] max-w-xs md:max-w-md">
          Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.
        </p>
      </section>

      {/* Bottom Action Area */}
      <footer className="relative z-10 w-full px-6 pb-12 md:max-w-md md:pb-20 flex flex-col gap-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="w-full relative">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
                if (errorStatus) setErrorStatus('');
              }}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 bg-black/60 backdrop-blur-md text-white border border-white/15 focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] rounded-lg text-sm transition-all outline-none"
              disabled={isLoading}
            />
            {errorStatus && (
              <p className="mt-1 text-xs text-[#ffb4ab] text-left ml-1 font-sans">{errorStatus}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#e50914] text-white font-sans text-xs font-bold tracking-wider py-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all duration-300 shadow-xl shadow-red-900/20 group cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center gap-1.5">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                LOADING EXPERIENCE...
              </span>
            ) : (
              <>
                GET STARTED
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onSignIn}
            className="w-full bg-white/5 backdrop-blur-xl text-white font-sans text-xs font-bold py-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all active:scale-[0.98] cursor-pointer"
          >
            SIGN IN WITH EMAIL
          </button>
        </form>

        <p className="text-center font-sans text-xs text-[#bab8b7]/60 px-6">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
      </footer>

      {/* Ambient Light Ribbon at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-[#e50914]/30 blur-xl rounded-full"></div>
    </main>
  );
};
