import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cake, Sparkles, Wind, Stars } from 'lucide-react';

const VirtualCake = () => {
  // Track the state of our 3 virtual candles
  const [candles, setCandles] = useState([
    { id: 1, isBlown: false },
    { id: 2, isBlown: false },
    { id: 3, isBlown: false }
  ]);

  // Check if all candles are blown out
  const allBlown = candles.every(candle => candle.isBlown);

  const blowOutCandle = (id) => {
    setCandles(prev => prev.map(c => 
      c.id === id ? { ...c, isBlown: true } : c
    ));
  };

  return (
    <section className="relative py-24 sm:py-32 bg-deepblue-800 px-6 sm:px-12 flex justify-center items-center overflow-hidden z-0">
      
      {/* Ambient background glow based on candle state */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full blur-[120px] pointer-events-none transition-colors duration-1000 ${allBlown ? 'bg-ocean/20' : 'bg-orange-500/10'}`}></div>

      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deepblue-900 border border-orange-500/20 mb-6 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
            <Cake className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-mono tracking-widest text-orange-400 uppercase">Make A Wish</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            Close Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]">Eyes</span>
          </h2>
          <p className="text-gray-400 text-lg font-light">
            Make your biggest birthday wish, Tulip Didi. Then tap the flames to blow out your virtual candles.
          </p>
        </motion.div>

        {/* The Candles Area */}
        <div className="flex justify-center items-end gap-6 sm:gap-12 h-64 mb-16 relative">
          {candles.map((candle, index) => (
            <div key={candle.id} className="relative flex flex-col items-center justify-end h-full">
              
              {/* The Interactive Flame */}
              <AnimatePresence>
                {!candle.isBlown ? (
                  <motion.button
                    exit={{ opacity: 0, scale: 0, y: -20 }}
                    onClick={() => blowOutCandle(candle.id)}
                    className="absolute -top-12 z-20 cursor-pointer group"
                    style={{ touchAction: 'manipulation' }}
                  >
                    {/* Glowing Aura */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-orange-500/30 blur-xl rounded-full group-hover:bg-orange-500/50 transition-colors"></div>
                    {/* The Flame Shape */}
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.1, 0.9, 1],
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{ repeat: Infinity, duration: 1.5 + (index * 0.2) }}
                      className="w-8 h-12 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-100 rounded-full blur-[2px] shadow-[0_0_20px_rgba(250,204,21,0.8)]"
                    ></motion.div>
                  </motion.button>
                ) : (
                  /* Smoke Effect after blown out */
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.5 }}
                    animate={{ opacity: [0, 0.5, 0], y: -50, scale: 2 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute -top-16 z-20 w-4 h-4 rounded-full bg-gray-400 blur-sm"
                  >
                    <Wind className="w-6 h-6 text-gray-400/50 -ml-1 -mt-1" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* The Candle Body */}
              <div className="w-12 sm:w-16 h-32 sm:h-40 bg-gradient-to-b from-white/20 to-white/5 border border-white/10 rounded-t-xl backdrop-blur-md shadow-lg relative overflow-hidden flex flex-col items-center">
                {/* Candle Wick */}
                <div className="w-1 h-3 bg-gray-800 rounded-t-full mt-1"></div>
                {/* Decorative Strip */}
                <div className="absolute top-10 left-0 w-full h-2 bg-ocean/30 -skew-y-12"></div>
                <div className="absolute top-20 left-0 w-full h-2 bg-ocean/30 -skew-y-12"></div>
              </div>
              
            </div>
          ))}
        </div>

        {/* The Magical Reveal when all are blown out */}
        <div className="min-h-[100px] flex items-center justify-center">
          <AnimatePresence>
            {allBlown && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                className="px-8 py-4 rounded-3xl bg-ocean/10 border border-ocean/30 backdrop-blur-lg flex items-center gap-4 shadow-[0_0_30px_rgba(14,165,233,0.3)]"
              >
                <Stars className="w-8 h-8 text-ocean-light animate-spin-slow" />
                <h3 className="text-2xl sm:text-3xl font-creative text-white tracking-wide">
                  May all your wishes come true!
                </h3>
                <Sparkles className="w-8 h-8 text-ocean-light animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default VirtualCake;