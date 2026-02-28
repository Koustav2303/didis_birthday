import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Quote, PartyPopper, Sun, Gift, Star, Sparkles } from 'lucide-react';

// --- God-Level 3D Tilt Card Component ---
const TiltCard = ({ wish, delay }) => {
  const ref = useRef(null);

  // Framer Motion values for physics-based tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth return-to-center
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse position to rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate percentage from center (-0.5 to 0.5)
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = wish.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: delay }}
      style={{ perspective: 1000 }} // Establishes 3D space
      className="h-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d", // Allows children to pop out
        }}
        className="relative h-full bg-gradient-to-br from-deepblue-800/90 to-deepblue-900 border border-white/10 rounded-[2.5rem] p-8 sm:p-10 flex flex-col shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-ocean/40 transition-colors duration-500 group"
      >
        {/* Dynamic Glare Effect inside the card */}
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-ocean/0 via-ocean/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        {/* Giant Watermark Quote Icon */}
        <Quote 
          style={{ transform: "translateZ(20px)" }} 
          className="absolute top-8 right-8 w-24 h-24 text-white/5 rotate-12 group-hover:text-ocean/10 transition-colors duration-500" 
        />
        
        {/* Floating Icon Base */}
        <div 
          style={{ transform: "translateZ(50px)" }} // Pops out of the card
          className="w-16 h-16 rounded-2xl bg-deepblue-900 border border-ocean/20 flex items-center justify-center mb-8 shadow-[0_10px_20px_rgba(14,165,233,0.1)] group-hover:shadow-[0_10px_30px_rgba(14,165,233,0.3)] transition-all duration-300"
        >
          <Icon className="w-8 h-8 text-ocean-light group-hover:scale-110 transition-transform duration-300" />
        </div>
        
        {/* 3D Floating Text */}
        <p 
          style={{ transform: "translateZ(30px)" }}
          className="text-lg sm:text-xl text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300 flex-grow relative z-10 font-light"
        >
          "{wish.text}"
        </p>
        
        {/* Handwritten Signature Footer */}
        <div 
          style={{ transform: "translateZ(40px)" }}
          className="mt-10 pt-6 border-t border-white/10 relative z-10 flex justify-between items-end"
        >
          <span className="text-xs font-mono tracking-widest text-ocean uppercase">From Your Brother</span>
          <span className="text-3xl font-creative text-ocean-light drop-shadow-[0_0_10px_rgba(14,165,233,0.5)] pr-2">Koustav</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Wishes Section ---
const WishesCard = () => {
  const wishes = [
    {
      icon: PartyPopper,
      text: "May this 1st of March bring you as much joy, happiness, and peace as you bring into my life every single day. You deserve the absolute best, Tulip Didi.",
      delay: 0.1
    },
    {
      icon: Sun,
      text: "You radiate kindness. I hope your upcoming year is filled with immense success, good health, and moments that make your beautiful heart smile endlessly.",
      delay: 0.2
    },
    {
      icon: Gift,
      text: "This small digital universe is just a token of my love. No gift could ever truly match the way you care for me and pamper me as a real younger brother.",
      delay: 0.3
    }
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-deepblue-900 px-6 sm:px-12 lg:px-24 overflow-hidden z-0">
      
      {/* --- Ambient Background Magic --- */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ocean/30 to-transparent"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-ocean-dark/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-ocean/10 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse-glow"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Section Header --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deepblue-800 border border-ocean/20 mb-6 shadow-[0_0_15px_rgba(14,165,233,0.1)]">
            <Sparkles className="w-4 h-4 text-ocean-light" />
            <span className="text-xs font-mono tracking-widest text-ocean-light uppercase">Chapter 03</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            A Brother's <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-light to-ocean">Promises</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Words fall short when I try to explain how grateful I am for you. But here is what I wish for you today, tomorrow, and forever.
          </p>
        </motion.div>

        {/* --- 3D Grid Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 perspective-[2000px]">
          {wishes.map((wish, index) => (
            <TiltCard key={index} wish={wish} delay={wish.delay} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default WishesCard;