import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Quote } from 'lucide-react';

const SmileGenerator = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [clicks, setClicks] = useState(0);

  // An array of cute, brotherly compliments and memories
  const cuteMessages = [
    "Tap the heart whenever you need a smile! 💙",
    "You have the absolute prettiest smile, Didi! ✨",
    "Thank you for always listening to my endless rants. 🥺",
    "You're not just my sister, you're my safest space. 🛡️",
    "I love how you always know exactly how to cheer me up! 🌟",
    "You are officially the Best Didi in the entire Universe. 🏆",
    "Your pampering makes me feel like the luckiest brother alive. 🥰",
    "I still can't believe how lucky I was to meet you in August 2025. 📅",
    "You have a heart of pure gold. Never change! 💛",
    "Sending you a massive virtual hug right now! 🫂"
  ];

  // Function to pick a random message that isn't the current one
  const handleTap = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setClicks(prev => prev + 1);
    
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * (cuteMessages.length - 1)) + 1; // +1 to skip the first intro message
    } while (nextIndex === messageIndex);
    
    setMessageIndex(nextIndex);
    
    // Unlock animation state after a short delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  return (
    <section className="relative py-24 sm:py-32 bg-deepblue-900 px-6 sm:px-12 flex justify-center items-center overflow-hidden z-0">
      
      {/* Soft Pink & Blue Ambient Glow to make it look "Cute" */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-gradient-to-tr from-ocean/10 to-pink-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deepblue-800 border border-pink-500/20 mb-6 shadow-[0_0_15px_rgba(236,72,153,0.1)]">
            <Star className="w-4 h-4 text-pink-400 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-pink-400 uppercase">Cute Corner</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            The Magic <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-ocean-light drop-shadow-[0_0_20px_rgba(236,72,153,0.3)]">Smile</span> Generator
          </h2>
          <p className="text-gray-400 text-lg font-light">
            Feeling a little down? Tap the glowing heart below for a quick reminder of how amazing you are.
          </p>
        </motion.div>

        {/* The Interactive Glowing Heart */}
        <div className="relative mb-12">
          {/* Ripple Effect Rings */}
          <motion.div 
            key={clicks} // Forces a re-render/animation on every click
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-2 border-ocean-light/50 pointer-events-none"
          ></motion.div>

          <motion.button
            whileHover={{ scale: 1.1, filter: "drop-shadow(0px 0px 30px rgba(14,165,233,0.8))" }}
            whileTap={{ scale: 0.85 }}
            onClick={handleTap}
            className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-deepblue-800 to-deepblue-900 border border-ocean/40 flex items-center justify-center shadow-[0_0_40px_rgba(14,165,233,0.3)] z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Heart className={`w-14 h-14 sm:w-16 sm:h-16 ${clicks > 0 ? 'text-pink-400 fill-pink-400/20' : 'text-ocean-light'} transition-colors duration-500`} />
            </motion.div>
            
            {/* Floating mini sparkles around the heart */}
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-ocean-light animate-bounce" />
            <Sparkles className="absolute -bottom-2 -left-2 w-5 h-5 text-pink-400 animate-pulse" />
          </motion.button>
        </div>

        {/* The Glassmorphic Dispenser Screen */}
        <div className="w-full relative min-h-[140px] flex items-center justify-center">
          <Quote className="absolute top-0 left-4 w-12 h-12 text-white/5 rotate-180" />
          <Quote className="absolute bottom-0 right-4 w-12 h-12 text-white/5" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, y: 20, scale: 0.9, rotateX: 90 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.9, filter: "blur(5px)" }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
              className="px-8 py-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl w-full max-w-lg"
            >
              <p className="text-xl sm:text-2xl font-medium text-white leading-relaxed tracking-wide">
                {cuteMessages[messageIndex]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Counter to show how many smiles she generated */}
        {clicks > 0 && (
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-8 text-sm font-mono text-ocean-light/60 tracking-widest"
          >
            SMILES GENERATED: {clicks}
          </motion.p>
        )}

      </div>
    </section>
  );
};

export default SmileGenerator;