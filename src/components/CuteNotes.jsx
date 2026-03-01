import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Coffee, Shield, Award, Sparkles, Pin } from 'lucide-react';

const CuteNotes = () => {
  // The boundary area so she can't throw the notes off the screen
  const boardRef = useRef(null);

  const notes = [
    {
      id: 1,
      text: "Unlimited Free Hugs Coupon 🫂",
      subtext: "Redeemable anytime, anywhere.",
      icon: Heart,
      color: "from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-300",
      rotate: -6,
      x: "-20%", y: "-10%"
    },
    {
      id: 2,
      text: "Official 'Best Didi' Certificate 🏆",
      subtext: "Signed, sealed, and delivered by Koustav.",
      icon: Award,
      color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-300",
      rotate: 4,
      x: "20%", y: "-20%"
    },
    {
      id: 3,
      text: "Late Night Rants Supporter 🌙",
      subtext: "Always here to listen to you.",
      icon: Coffee,
      color: "from-ocean-light/20 to-ocean/20 border-ocean/30 text-ocean-light",
      rotate: -3,
      x: "-10%", y: "20%"
    },
    {
      id: 4,
      text: "Lifetime Protector Guarantee 🛡️",
      subtext: "I've always got your back.",
      icon: Shield,
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300",
      rotate: 8,
      x: "15%", y: "15%"
    }
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-deepblue-900 px-4 sm:px-12 flex justify-center items-center overflow-hidden z-0">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] bg-gradient-to-tr from-ocean/10 via-pink-500/5 to-purple-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deepblue-800 border border-pink-500/20 mb-6 shadow-[0_0_15px_rgba(236,72,153,0.1)]">
            <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-pink-400 uppercase">Interactive Board</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            Little <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">Reminders</span>
          </h2>
          <p className="text-gray-400 text-lg font-light">
            Grab a note, drag it around, and toss it!
          </p>
        </motion.div>

        {/* --- The Interactive Drag Board --- */}
        <div 
          ref={boardRef}
          className="w-full h-[500px] sm:h-[600px] relative rounded-[3rem] border border-white/5 bg-deepblue-800/30 backdrop-blur-sm shadow-inner overflow-hidden flex items-center justify-center"
        >
          {/* Subtle grid background to make it look like a pinboard */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

          {notes.map((note, index) => {
            const Icon = note.icon;
            return (
              <motion.div
                key={note.id}
                drag // This single prop enables the god-level drag physics!
                dragConstraints={boardRef} // Keeps them inside the box
                dragElastic={0.2} // Makes it feel rubbery when she hits the edge
                dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }} // Bouncy physics
                whileDrag={{ scale: 1.1, rotate: 0, zIndex: 50, cursor: "grabbing" }}
                whileHover={{ scale: 1.05, zIndex: 40 }}
                initial={{ opacity: 0, scale: 0, rotate: note.rotate, x: note.x, y: note.y }}
                whileInView={{ opacity: 1, scale: 1, rotate: note.rotate }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
                className={`absolute w-64 sm:w-72 p-6 rounded-2xl bg-gradient-to-br ${note.color} border backdrop-blur-xl shadow-[0_15px_30px_rgba(0,0,0,0.3)] cursor-grab flex flex-col items-center text-center`}
              >
                {/* Cute Top Pin */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white/10 border border-white/30 shadow-sm flex items-center justify-center backdrop-blur-md">
                  <div className="w-2 h-2 rounded-full bg-white/50"></div>
                </div>

                <div className="p-3 rounded-full bg-white/10 mb-4 shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-heading font-bold text-white mb-2 leading-tight">
                  {note.text}
                </h3>
                
                <p className="text-sm opacity-80 font-light font-mono">
                  {note.subtext}
                </p>
                
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CuteNotes;