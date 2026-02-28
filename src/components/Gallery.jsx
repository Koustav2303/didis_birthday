import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import { Sparkles, Gift, Heart, Coffee, Star, Image as ImageIcon, Music, Cake } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const Gallery = () => {
  // Doubled the cards for an infinite, rich scrolling experience
  const treats = [
    {
      img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop",
      title: "Midnight Cake",
      desc: "A virtual slice of sweetness to start your special day.",
      icon: Cake
    },
    {
      img: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=1000&auto=format&fit=crop",
      title: "Fresh Blooms",
      desc: "Flowers as beautiful and radiant as your smile, Didi.",
      icon: Sparkles
    },
    {
      img: "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop",
      title: "Sweet Indulgence",
      desc: "Premium chocolates to add a little extra joy to your birthday.",
      icon: Star
    },
    {
      img: "https://images.unsplash.com/photo-1602734846297-9299fc2d4703?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Warm Hugs",
      desc: "A cute teddy sending you the biggest birthday hug from me.",
      icon: Heart
    },
    {
      img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1000&auto=format&fit=crop",
      title: "Your Favorite Sip",
      desc: "A virtual coffee date just for the two of us.",
      icon: Coffee
    },
    {
      img: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?q=80&w=1000&auto=format&fit=crop",
      title: "Little Joys",
      desc: "Cupcakes to celebrate all the little moments we share.",
      icon: Gift
    },
    {
      img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1000&auto=format&fit=crop",
      title: "Golden Memories",
      desc: "Looking back at all the fun times since August 2025.",
      icon: ImageIcon
    },
    {
      img: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?q=80&w=1000&auto=format&fit=crop",
      title: "Surprise Box",
      desc: "Packed with all my love, respect, and best wishes.",
      icon: Music
    }
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-deepblue-900 overflow-hidden px-4 sm:px-6 z-0">
      
      {/* Injecting God-Level CSS for Active Slide Focus & Smooth Transitions */}
      <style dangerouslySetInnerHTML={{__html: `
        .swiper-slide {
          width: 280px;
          height: 380px;
          opacity: 0.4; /* Dim inactive slides */
          transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
          filter: grayscale(40%) blur(2px);
        }
        @media (min-width: 640px) {
          .swiper-slide {
            width: 380px;
            height: 520px;
          }
        }
        
        /* The Magic: Make only the center card pop, glow, and become clear */
        .swiper-slide-active {
          opacity: 1 !important;
          filter: grayscale(0%) blur(0px) !important;
          box-shadow: 0 0 50px rgba(14, 165, 233, 0.4);
          border-color: rgba(14, 165, 233, 0.6) !important;
        }

        .swiper-pagination-bullet {
          background-color: #0ea5e9;
          transition: all 0.4s ease;
        }
        .swiper-pagination-bullet-active {
          width: 32px;
          border-radius: 8px;
          background-color: #38bdf8;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.8);
        }
        /* Glass reflection base */
        .glass-reflect {
          -webkit-box-reflect: below 4px linear-gradient(transparent, transparent, rgba(0,0,0,0.3));
        }
      `}} />

      {/* --- Ambient Glowing Background Orbs --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] bg-ocean/10 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse-glow"></div>

      <div className="max-w-[100vw] mx-auto relative z-10 flex flex-col items-center">
        
        {/* --- Section Header --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 px-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deepblue-800 border border-ocean/20 mb-6 shadow-[0_0_15px_rgba(14,165,233,0.1)]">
            <Gift className="w-4 h-4 text-ocean-light animate-bounce" />
            <span className="text-xs font-mono tracking-widest text-ocean-light uppercase">Chapter 02</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            Virtual <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-light to-ocean drop-shadow-[0_0_20px_rgba(14,165,233,0.5)]">Treats</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Since I can't give these to you in person today, I packed this digital space with all your favorites. Sit back and watch your gifts unfold.
          </p>
        </motion.div>

        {/* --- Ultra-Smooth Auto-Sliding 3D Carousel --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="w-full relative pb-20"
        >
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            speed={1200} // Buttery smooth, slow transition speed
            coverflowEffect={{
              rotate: 25,         // Subtle elegant rotation
              stretch: 0,         
              depth: 300,         // Deep 3D popping effect
              modifier: 1.2,      
              slideShadows: true, 
            }}
            autoplay={{
              delay: 2000, // Time it pauses on the center image
              disableOnInteraction: false, // Keeps sliding even if she touches it
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[EffectCoverflow, Autoplay, Pagination]}
            className="w-full py-10"
          >
            {treats.map((treat, index) => {
              const Icon = treat.icon;
              return (
                <SwiperSlide key={index} className="glass-reflect group rounded-[2.5rem] overflow-hidden bg-deepblue-800 border-2 border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  
                  {/* Image with slow continuous zoom */}
                  <img 
                    src={treat.img} 
                    alt={treat.title} 
                    className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[2000ms] ease-out" 
                  />
                  
                  {/* Heavy dark gradient overlay at the bottom so text is bright white */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deepblue-900/95 via-deepblue-900/40 to-transparent"></div>

                  {/* Glassmorphic Text Content Container */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col justify-end h-full">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                          <Icon className="w-5 h-5 text-ocean-light" />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-wide">{treat.title}</h3>
                      </div>
                      
                      <p className="text-sm sm:text-base text-gray-200 leading-relaxed opacity-0 group-[.swiper-slide-active]:opacity-100 transition-opacity duration-700 delay-200">
                        {treat.desc}
                      </p>
                      
                    </div>
                  </div>
                  
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>

      </div>
    </section>
  );
};

export default Gallery;