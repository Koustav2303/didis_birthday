import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Heart, Sparkles } from 'lucide-react';

const SecretSurprise = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  // One simple tap handles the entire cinematic sequence
  const handleTapToUnlock = () => {
    if (isUnlocking || isUnlocked) return;
    
    setIsUnlocking(true); // Starts the animation

    // Wait exactly 2 seconds for the ring to draw, then reveal the letter
    setTimeout(() => {
      setIsUnlocked(true);
    }, 2000);
  };

  // SVG Math for the glowing progress ring
  const circleRadius = 60;
  const circumference = 2 * Math.PI * circleRadius;

  return (
    <section className="relative py-32 bg-deepblue-900 px-6 sm:px-12 flex justify-center items-center min-h-[80vh] overflow-hidden z-0">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-ocean/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            /* --- STATE 1: THE LOCKED VAULT --- */
            <motion.div 
              key="locked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
                One Last <span className="text-ocean-light">Surprise</span>
              </h2>
              <p className="text-gray-400 mb-12 max-w-md">
                There is a secret message hidden here. <strong className="text-ocean-light">Tap the lock</strong> to break the seal and reveal your final gift.
              </p>

              {/* The Effortless One-Tap Button */}
              <button 
                onClick={handleTapToUnlock}
                className="relative flex justify-center items-center cursor-pointer group outline-none"
                disabled={isUnlocking}
              >
                {/* SVG Progress Ring */}
                <svg className="w-40 h-40 -rotate-90 transform" viewBox="0 0 140 140">
                  {/* Background Track */}
                  <circle
                    cx="70" cy="70" r={circleRadius}
                    fill="transparent"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="4"
                  />
                  {/* Glowing Fill Ring (Animates automatically when tapped) */}
                  <motion.circle
                    cx="70" cy="70" r={circleRadius}
                    fill="transparent"
                    stroke="#0ea5e9" // ocean color
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: isUnlocking ? 0 : circumference }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="drop-shadow-[0_0_10px_rgba(14,165,233,0.8)]"
                  />
                </svg>

                {/* Center Button */}
                <motion.div 
                  animate={{ 
                    scale: isUnlocking ? 0.9 : 1,
                    boxShadow: isUnlocking ? "0 0 40px rgba(14,165,233,0.8)" : "0 0 0px rgba(14,165,233,0)"
                  }}
                  className={`absolute w-24 h-24 rounded-full flex items-center justify-center transition-colors duration-500 ${
                    isUnlocking ? 'bg-ocean border-ocean-light' : 'bg-deepblue-800 border-white/10 group-hover:border-ocean/50'
                  } border-2 backdrop-blur-md z-10`}
                >
                  <Lock className={`w-10 h-10 transition-colors duration-500 ${isUnlocking ? 'text-white animate-pulse' : 'text-gray-400 group-hover:text-ocean-light'}`} />
                </motion.div>

                {/* Status Text under the button */}
                <div className="absolute -bottom-12 w-full text-center">
                  <span className={`font-mono font-bold tracking-widest text-sm transition-opacity duration-300 ${isUnlocking ? 'text-ocean-light animate-pulse opacity-100' : 'opacity-0'}`}>
                    UNLOCKING...
                  </span>
                </div>
              </button>
            </motion.div>
          ) : (
            /* --- STATE 2: THE REVEALED LETTER --- */
            <motion.div 
              key="unlocked"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="w-full relative"
            >
              {/* Explosion glow behind the letter */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-ocean/20 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-glow"></div>

              <div className="relative bg-deepblue-800/80 backdrop-blur-2xl border-2 border-ocean/40 rounded-[3rem] p-10 sm:p-16 shadow-[0_0_50px_rgba(14,165,233,0.2)] text-center overflow-hidden group">
                
                {/* Decorative Elements */}
                <Unlock className="w-12 h-12 text-ocean-light mx-auto mb-8 drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]" />
                <Sparkles className="absolute top-10 right-10 w-8 h-8 text-white/10 group-hover:text-ocean/30 transition-colors" />
                <Heart className="absolute bottom-10 left-10 w-12 h-12 text-white/5 group-hover:text-ocean/20 transition-colors rotate-12" />

                <h3 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-8">
                  My Dearest <span className="text-ocean-light">Sister</span>,
                </h3>
                
                <div className="space-y-6 text-lg sm:text-xl text-gray-300 leading-relaxed font-light max-w-3xl mx-auto relative z-10">
                  <p>
                    From the moment we met on Eloelo in August, you brought a warmth into my life that I didn't know I was missing. You aren't just a friend to me; you are my sister, my protector, and my guide.
                  </p>
                  <p>
                    Every time you pamper me, every time you check up on me, it reminds me of how incredibly lucky I am to have you. As a frontend developer, I write a lot of code, but this code was written entirely with my heart.
                  </p>
                  <p>
                    I hope this little website made you smile today. Happy Birthday, Tulip Didi. May you always be as happy and radiant as you make everyone else around you.
                  </p>
                </div>

                <div className="mt-16 text-right relative z-10 pr-4 sm:pr-12">
                  <p className="text-sm font-mono tracking-widest text-ocean uppercase mb-2">Yours truly,</p>
                  <p className="text-5xl sm:text-6xl font-creative text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    Koustav
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default SecretSurprise;