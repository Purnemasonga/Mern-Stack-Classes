import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [isEntering, setIsEntering] = useState(false);
  const { parallax } = useOutletContext(); // Inherit parallax from AuthLayout

  const handleEnterArena = () => {
    setIsEntering(true);
    setTimeout(() => {
      navigate('/login');
    }, 800);
  };

  return (
    <motion.div 
      className="w-full h-full flex flex-col items-center justify-center pointer-events-none relative z-20"
      initial="initial"
      animate={isEntering ? "exiting" : "animate"}
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exiting: { scale: 0.85, opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }
      }}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        style={{
          x: parallax ? parallax(-15).x : 0,
          y: parallax ? parallax(-15).y : 0,
        }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter uppercase mb-4 text-holographic drop-shadow-2xl">
          Flashcard Duel
        </h1>
        <p className="text-xl md:text-3xl text-premium-cream mix-blend-difference font-bold tracking-widest uppercase opacity-80 mb-16 shadow-black drop-shadow-lg">
          Master Anything. Defeat Everyone.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="pointer-events-auto flex flex-col items-center gap-6"
        style={{
          x: parallax ? parallax(-15).x : 0,
          y: parallax ? parallax(-15).y : 0,
        }}
      >
        <button
          onClick={handleEnterArena}
          className="group relative px-12 py-5 bg-premium-black text-premium-cream text-xl font-bold uppercase tracking-[0.2em] overflow-hidden rounded-full transition-all hover:scale-105 active:scale-95 shadow-cinematic border border-premium-slate/30"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-premium-cyan/20 via-premium-purple/20 to-premium-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="relative z-10 flex items-center gap-4">
            Enter The Arena
            <span className="w-2 h-2 rounded-full bg-premium-yellow shadow-[0_0_10px_#f5b041] animate-pulse"></span>
          </span>
        </button>

        <button
          onClick={() => navigate('/login?admin=true')}
          className="group flex items-center gap-2 text-premium-slate hover:text-premium-cream transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <Shield size={14} className="group-hover:text-premium-yellow transition-colors" />
          Admin Access
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Home;
