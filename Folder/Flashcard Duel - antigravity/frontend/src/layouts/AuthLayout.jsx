import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate normalized mouse position from -1 to 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax offsets based on depth layer
  const parallax = (depth) => ({
    x: mousePos.x * depth,
    y: mousePos.y * depth,
  });

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden bg-premium-cream flex items-center justify-center selection:bg-premium-cyan/30">
      {/* Cinematic Depth Overlay (Charcoal / Black Gradient) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-premium-cream via-premium-slate/20 to-premium-charcoal/90 z-0 pointer-events-none mix-blend-multiply"></div>

      {/* Floating Holographic Light Orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/3 w-[40vw] h-[40vw] bg-premium-cyan/20 rounded-full filter blur-[100px] z-0 pointer-events-none"
        animate={{ 
          x: parallax(-40).x, 
          y: parallax(-40).y,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 100 }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/3 w-[30vw] h-[30vw] bg-premium-purple/20 rounded-full filter blur-[80px] z-0 pointer-events-none"
        animate={{ 
          x: parallax(-60).x, 
          y: parallax(-60).y,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 100 }}
      />

      {/* Floating Particles (Flashcards & XP) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-xl backdrop-blur-md border border-white/20 shadow-cinematic ${i % 2 === 0 ? 'bg-white/40' : 'bg-premium-purple/10'}`}
            style={{
              width: i % 2 === 0 ? '120px' : '60px',
              height: i % 2 === 0 ? '160px' : '80px',
              top: `${15 + (i * 12)}%`,
              left: `${10 + (i * 15)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, i % 2 === 0 ? 10 : -10, 0],
              x: parallax(i * 15 + 20).x,
            }}
            transition={{
              y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
              x: { type: "spring", stiffness: 50, damping: 20 },
            }}
          />
        ))}
      </div>

      {/* Render children (Home, Login, Register) */}
      <div className="relative z-20 w-full h-full">
        <Outlet context={{ parallax }} />
      </div>
    </div>
  );
};

export default AuthLayout;
