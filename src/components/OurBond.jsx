import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Crown, HeartPulse, Shield, CalendarClock, Quote } from 'lucide-react';

// --- God-Level Interactive Glow Card ---
const GlowCard = ({ children, className, delay }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: delay, ease: [0.16, 1, 0.3, 1] }}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={`group relative overflow-hidden rounded-[2rem] bg-deepblue-800/80 border border-white/5 backdrop-blur-xl transition-all duration-500 hover:border-ocean/30 hover:shadow-[0_0_40px_rgba(14,165,233,0.15)] ${className}`}
    >
      {/* Interactive Mouse Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 z-0"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(14,165,233,0.12), transparent 40%)`,
        }}
      />
      
      {/* Subtle Static Background Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-ocean-dark/10 rounded-full blur-[80px] group-hover:bg-ocean/20 transition-colors duration-700 z-0"></div>

      {/* Card Content */}
      <div className="relative z-10 h-full p-8 sm:p-10 flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
};

// --- Main Section ---
const OurBond = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 sm:py-32 bg-deepblue-900 px-6 sm:px-12 lg:px-24 overflow-hidden" ref={ref}>
      
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ocean-dark/50 to-transparent"></div>

      {/* Ambient Background Light */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-ocean-dark/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deepblue-800 border border-ocean/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-ocean animate-pulse"></span>
            <span className="text-xs font-mono tracking-widest text-ocean-light uppercase">Chapter 01</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            A Bond of Brother and Sister <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-light to-ocean">Beyond Words</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            Some connections are just meant to be. From a random digital encounter to finding the most caring sister in the world.
          </p>
        </motion.div>

        {/* --- Advanced Bento Grid Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 sm:gap-8 auto-rows-fr">
          
          {/* Item 1: Wide Card (Spans 2 columns) */}
          <GlowCard delay={0.1} className="md:col-span-2 md:row-span-1">
            <div className="flex justify-between items-start mb-8">
              <div className="w-16 h-16 rounded-2xl bg-deepblue-900 border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:border-ocean/30 transition-all duration-500 shadow-lg">
                <CalendarClock className="w-8 h-8 text-ocean-light" />
              </div>
              <span className="text-sm font-mono tracking-widest text-gray-500 bg-deepblue-900/50 px-4 py-1 rounded-full border border-white/5">August 2025</span>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-4 font-heading tracking-wide group-hover:text-ocean-light transition-colors">The Eloelo Chapter</h3>
              <p className="text-lg text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors max-w-xl">
                We crossed paths on a social app, and little did I know I was about to find the best sister. What started as a random encounter turned into one of the most beautiful connections of my life.
              </p>
            </div>
          </GlowCard>

          {/* Item 2: Tall Card (Spans 1 column, 2 rows) */}
          <GlowCard delay={0.2} className="md:col-span-1 md:row-span-2 flex flex-col justify-center">
            <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Shield className="w-32 h-32 text-ocean" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-center">
              <div className="w-16 h-16 rounded-2xl bg-deepblue-900 border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:border-ocean/30 transition-all duration-500 mb-8 shadow-lg">
                <Shield className="w-8 h-8 text-ocean-light" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 font-heading tracking-wide group-hover:text-ocean-light transition-colors">My Guardian</h3>
              <p className="text-lg text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors mb-8">
                You look out for me, protect me, and guide me exactly like a real older sister. Knowing you have my back gives me so much peace. I always feel incredibly safe and supported with you around.
              </p>
              <div className="mt-auto inline-flex items-center gap-2 text-ocean-light text-sm font-medium tracking-wide uppercase">
                <Shield className="w-4 h-4" /> Always & Forever
              </div>
            </div>
          </GlowCard>

          {/* Item 3: Square Card 1 */}
          <GlowCard delay={0.3} className="md:col-span-1 md:row-span-1">
            <div className="w-14 h-14 rounded-2xl bg-deepblue-900 border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:border-ocean/30 transition-all duration-500 mb-6 shadow-lg">
              <HeartPulse className="w-7 h-7 text-ocean-light" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 font-heading tracking-wide group-hover:text-ocean-light transition-colors">Endless Pampering</h3>
            <p className="text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
              Nobody pampers me the way you do, Tulip Didi. Your sweet gestures and constant care make me feel incredibly valued every single day.
            </p>
          </GlowCard>

          {/* Item 4: Square Card 2 */}
          <GlowCard delay={0.4} className="md:col-span-1 md:row-span-1 relative">
            <Quote className="absolute right-6 bottom-6 w-16 h-16 text-white/5 group-hover:text-ocean/10 transition-colors duration-500" />
            <div className="w-14 h-14 rounded-2xl bg-deepblue-900 border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:border-ocean/30 transition-all duration-500 mb-6 shadow-lg">
              <Crown className="w-7 h-7 text-ocean-light" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 font-heading tracking-wide group-hover:text-ocean-light transition-colors">Favourite Didi</h3>
            <p className="text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors relative z-10">
              I am profoundly grateful to call you my sister. You hold a place in my heart that no one else ever could.
            </p>
          </GlowCard>

        </div>
      </div>
    </section>
  );
};

export default OurBond;