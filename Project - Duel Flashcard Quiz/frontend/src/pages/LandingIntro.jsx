import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';

const LandingIntro = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">

      {/* BACKGROUND VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>

      {/* DARK SOFT OVERLAY */}
      <div className="absolute inset-0 bg-black/45" />

      {/* CONTENT */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">

        {/* SMALL TAG */}
        <p
          className="mb-6 text-[10px] sm:text-xs tracking-[0.45em] uppercase"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: 'rgb(82, 194, 235)',
            letterSpacing: '0.35em',
          }}
        >
          Multiplayer Flashcard Arena
        </p>

        {/* MAIN TITLE */}
        <h1
          className="leading-none uppercase"
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
            color: 'rgb(240, 207, 74)',
            textShadow: `
              0 0 10px rgba(240,207,74,0.18),
              0 0 20px rgba(82,194,235,0.12)
            `,
            lineHeight: '1.2',
          }}
        >
          FLASHCARD
          <br />
          DUEL
        </h1>

        {/* SUBTEXT */}
        <p
          className="mt-8 max-w-xl text-sm sm:text-base leading-relaxed"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: 'rgba(255,255,255,0.72)',
          }}
        >
          Sharpen memory skills and challenge players
          in fast-paced multiplayer quiz battles.
        </p>

        {/* BUTTON */}
        <button
          onClick={() => navigate('/auth')}
          className="mt-10 flex items-center gap-3 rounded-xl px-8 py-4 font-bold transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: 'rgb(82, 194, 235)',
            color: '#001529',
            fontFamily: "'Space Grotesk', sans-serif",
            boxShadow: '0 0 25px rgba(82,194,235,0.25)',
          }}
        >
          <Zap size={18} />
          ENTER THE ARENA
        </button>
      </div>
    </section>
  );
};

export default LandingIntro;