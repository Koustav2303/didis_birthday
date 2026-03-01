import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PackageOpen, Package, HeartCrack, Coffee, Sparkles, Phone, ShieldCheck, Heart } from 'lucide-react';

const CarePackage = () => {
  const [activeMood, setActiveMood] = useState(null);
  const [isOpening, setIsOpening] = useState(false);

  // The customized care packages based on her mood
  const moods = [
    {
      id: 'down',
      label: "Feeling Down",
      icon: HeartCrack,
      color: "from-blue-400 to-indigo-500",
      glow: "shadow-[0_0_20px_rgba(99,102,241,0.5)]",
      message: "Take a deep breath, Didi. You are the strongest, most resilient girl I know. Whatever is bothering you will pass, and I am always in your corner cheering for you.",
      rewardIcon: ShieldCheck
    },
    {
      id: 'stressed',
      label: "Too Stressed",
      icon: Coffee,
      color: "from-amber-400 to-orange-500",
      glow: "shadow-[0_0_20px_rgba(245,158,11,0.5)]",
      message: "Close the laptop, put down the phone, and drink some water! You work way too hard. Give yourself permission to take a break and let me pamper you for a change.",
      rewardIcon: Coffee
    },
    {
      id: 'laugh',
      label: "Need a Laugh",
      icon: Sparkles,
      color: "from-emerald-400 to-teal-500",
      glow: "shadow-[0_0_20px_rgba(16,185,129,0.5)]",
      message: "I was going to tell you a joke, but then I remembered my existence is already the funniest thing that ever happened to you. (Just kidding, you're stuck with me!)",
      rewardIcon: Sparkles
    },
    {
      id: 'miss',
      label: "Miss My Brother",
      icon: Phone,
      color: "from-rose-400 to-pink-500",
      glow: "shadow-[0_0_20px_rgba(244,63,94,0.5)]",
      message: "I am literally just one call or text away! Distance means nothing when you have a bond like ours. Sending you a massive virtual hug right this second. 🫂",
      rewardIcon: Heart
    }
  ];

  const handleMoodSelect = (mood) => {
    if (activeMood && activeMood.id === mood.id) return;
    
    setIsOpening(true);
    setActiveMood(mood);
    
    // Simulate the unboxing delay
    setTimeout(() => {
      setIsOpening(false);
    }, 1200);
  };

  return (
    <section className="relative py-24 sm:py-32 bg-deepblue-900 px-6 sm:px-12 flex justify-center items-center overflow-hidden z-0">
      
      {/* Dynamic Background Glow based on selected mood */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full blur-[120px] pointer-events-none z-0 transition-colors duration-1000 ${activeMood ? (activeMood.id === 'down' ? 'bg-indigo-500/10' : activeMood.id === 'stressed' ? 'bg-orange-500/10' : activeMood.id === 'laugh' ? 'bg-teal-500/10' : 'bg-pink-500/10') : 'bg-ocean/5'}`}></div>

      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deepblue-800 border border-ocean/20 mb-6 shadow-[0_0_15px_rgba(14,165,233,0.1)]">
            <PackageOpen className="w-4 h-4 text-ocean-light" />
            <span className="text-xs font-mono tracking-widest text-ocean-light uppercase">Emergency Kit</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            Didi's <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-light to-purple-400 drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]">Care Package</span>
          </h2>
          <p className="text-gray-400 text-lg font-light">
            How are you feeling right now? Select your mood to open your custom care package.
          </p>
        </motion.div>

        {/* The Mood Selection Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16">
          {moods.map((mood) => {
            const MoodIcon = mood.icon;
            const isSelected = activeMood?.id === mood.id;
            return (
              <motion.button
                key={mood.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMoodSelect(mood)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300 border backdrop-blur-md ${
                  isSelected 
                    ? `bg-gradient-to-r ${mood.color} text-white border-transparent ${mood.glow}` 
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                <MoodIcon className={`w-4 h-4 ${isSelected ? 'animate-pulse' : ''}`} />
                {mood.label}
              </motion.button>
            );
          })}
        </div>

        {/* The Interactive Unboxing Area */}
        <div className="w-full min-h-[250px] flex items-center justify-center relative">
          
          <AnimatePresence mode="wait">
            {/* STATE 1: No mood selected yet */}
            {!activeMood && !isOpening && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center opacity-50"
              >
                <Package className="w-20 h-20 text-gray-500 mb-4" />
                <p className="text-gray-500 font-mono text-sm tracking-widest">AWAITING SELECTION...</p>
              </motion.div>
            )}

            {/* STATE 2: Unboxing Animation (Shaking Box) */}
            {isOpening && activeMood && (
              <motion.div
                key="opening"
                animate={{ 
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.1, 1.1, 1.1, 1.1, 1.2],
                  y: [0, -10, -10, -10, -10, -20]
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="flex items-center justify-center relative"
              >
                <Package className="w-24 h-24 text-ocean-light drop-shadow-[0_0_30px_rgba(14,165,233,0.8)]" />
                <div className="absolute inset-0 bg-ocean-light/20 blur-xl rounded-full animate-ping"></div>
              </motion.div>
            )}

            {/* STATE 3: The Revealed Message */}
            {!isOpening && activeMood && (
              <motion.div
                key="revealed"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className={`relative w-full max-w-xl p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-deepblue-800 to-deepblue-900 border backdrop-blur-xl shadow-2xl flex flex-col items-center text-center overflow-hidden border-white/10`}
              >
                {/* Subtle colored glow ring inside the card */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-r ${activeMood.color} opacity-20 blur-3xl`}></div>
                
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${activeMood.color} flex items-center justify-center mb-6 shadow-lg z-10`}>
                  <activeMood.rewardIcon className="w-8 h-8 text-white drop-shadow-md" />
                </div>
                
                <p className="text-lg sm:text-xl text-white font-light leading-relaxed tracking-wide z-10">
                  "{activeMood.message}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default CarePackage;