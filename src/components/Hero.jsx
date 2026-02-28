import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Sparkles, HeartPulse, ChevronDown, Stars, PartyPopper } from 'lucide-react';

// --- Reusable Advanced Components ---

// 1. Floating Glassmorphic Badge
const FloatingBadge = ({ icon: Icon, text, delay, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={`absolute hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(14,165,233,0.1)] z-20 ${className}`}
  >
    <Icon className="w-4 h-4 text-ocean-light" />
    <span className="text-xs font-medium tracking-wider text-gray-300 uppercase">{text}</span>
  </motion.div>
);

// 2. Animated Letter for Name Reveal (Fixed for cursive clipping)
const AnimatedLetter = ({ letter, index }) => {
  const variants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { duration: 0.6, delay: 0.8 + (index * 0.05), type: "spring", damping: 12, stiffness: 100 }
    }
  };
  return (
    <motion.span 
      variants={variants} 
      className="inline-block origin-bottom text-transparent bg-clip-text bg-gradient-to-br from-white via-ocean-light to-ocean-dark py-4 px-[2px]"
    >
      {letter}
    </motion.span>
  );
};

// --- Main Hero Component ---

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  // Track mouse for the interactive spotlight effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    controls.start("visible");
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [controls]);

  // Framer Motion Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const nameString = "Tulip Didi";

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center overflow-hidden bg-deepblue-900 px-4 sm:px-6 z-0">
      
      {/* Injecting Custom Google Font & Keyframes directly for true plug-and-play */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        .font-creative {
          font-family: 'Dancing Script', cursive;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />

      {/* --- Interactive Ambient Spotlight --- */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40 transition-opacity duration-500"
        animate={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(14, 165, 233, 0.15), transparent 40%)`
        }}
      />

      {/* --- Static Glowing Background Orbs --- */}
      <div className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-ocean-dark/20 blur-[150px] mix-blend-screen animate-float-slow pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-ocean/10 blur-[120px] mix-blend-screen animate-float-fast pointer-events-none z-0"></div>

      {/* --- Floating Elements (Desktop Only for cleanliness) --- */}
      <FloatingBadge icon={PartyPopper} text="1st March" delay={1.2} className="top-[20%] left-[15%] animate-float-slow" />
      <FloatingBadge icon={HeartPulse} text="Est. Aug 2025" delay={1.4} className="bottom-[30%] right-[15%] animate-float-fast" />

      {/* --- Main Content Container --- */}
      <motion.div 
        initial="hidden"
        animate={controls}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center mt-10"
      >
        {/* Top Mini Tag */}
        <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-deepblue-800/50 border border-ocean/30 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(14,165,233,0.15)]">
          <Stars className="w-4 h-4 text-ocean-light animate-pulse" />
          <span className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-ocean-light">A God-Level Tribute</span>
          <Stars className="w-4 h-4 text-ocean-light animate-pulse" />
        </motion.div>

        {/* Massive Animated Typography */}
        <motion.div variants={fadeUp} className="mb-2 relative">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white drop-shadow-2xl mb-2">
            Happy Birthday,
          </h1>
        </motion.div>

        {/* God-Level Word & Letter Reveal (No more cutting!) */}
        <motion.div className="mb-6 w-full mx-auto flex flex-wrap justify-center gap-x-6 sm:gap-x-10 px-4">
          {nameString.split(" ").map((word, wordIndex) => (
            <div key={wordIndex} className="flex">
              <h2 className="text-[5rem] sm:text-[7rem] lg:text-[8.5rem] font-creative leading-none drop-shadow-[0_0_40px_rgba(14,165,233,0.7)]">
                {word.split("").map((char, charIndex) => (
                  <AnimatedLetter key={charIndex} letter={char} index={(wordIndex * 10) + charIndex} />
                ))}
              </h2>
            </div>
          ))}
        </motion.div>

        {/* Sophisticated Subtitle */}
        <motion.p variants={fadeUp} className="text-base sm:text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light mb-12 px-4">
          Crafted with love and code. For the sister who pampers me, protects me, and makes my world endlessly brighter. 
        </motion.p>

        {/* Premium Call to Action Button */}
        <motion.button 
          variants={fadeUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-8 py-4 sm:px-10 sm:py-5 rounded-full overflow-hidden bg-deepblue-800 border border-ocean/50 shadow-[0_0_40px_rgba(14,165,233,0.3)] hover:shadow-[0_0_60px_rgba(14,165,233,0.5)] transition-all duration-300"
        >
          {/* Sweeping light effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
          
          <span className="relative flex items-center gap-3 text-white font-semibold text-lg sm:text-xl tracking-wide z-10">
            Scroll to Unwrap <Sparkles className="w-5 h-5 text-ocean-light group-hover:rotate-12 transition-transform" />
          </span>
        </motion.button>
      </motion.div>

      {/* --- Bouncing Scroll Indicator --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs font-mono tracking-widest text-gray-500 uppercase">Discover</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-ocean/70" />
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;