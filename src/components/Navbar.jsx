import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Sparkles, Gift } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // --- ALL 9 SECTIONS COMPACTED ---
  const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'Bond', href: 'bond' },
    { name: 'Treats', href: 'gallery' },
    { name: 'Smiles', href: 'smile' },
    { name: 'Music', href: 'music' },
    { name: 'Notes', href: 'notes' },
    { name: 'Care', href: 'care' }, 
    { name: 'Wishes', href: 'wishes' },
    { name: 'Cake', href: 'cake' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(link => document.getElementById(link.href)).filter(Boolean);
      const surpriseSection = document.getElementById('surprise');
      if (surpriseSection) sections.push(surpriseSection);

      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  const handleScrollToSection = (e, href) => {
    e.preventDefault();
    setIsOpen(false); 
    const element = document.getElementById(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          isScrolled ? 'py-3 bg-deepblue-900/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/5' : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          <a href="#home" onClick={(e) => handleScrollToSection(e, 'home')} className="group flex items-center gap-2 relative z-50">
            <div className="w-8 h-8 rounded-full bg-deepblue-800 border border-ocean/30 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(14,165,233,0.5)] transition-all duration-300">
              <Sparkles className="w-4 h-4 text-ocean-light group-hover:text-white transition-colors" />
            </div>
            <span className="text-xl font-creative tracking-wider text-white group-hover:text-ocean-light transition-colors drop-shadow-[0_0_10px_rgba(14,165,233,0.3)] pt-1">
              Tulip
            </span>
          </a>

          {/* Ultra-compacted desktop menu to fit 9 links beautifully */}
          <div className="hidden lg:flex items-center gap-0.5 bg-deepblue-800/40 p-1 rounded-full border border-white/10 backdrop-blur-md shadow-lg">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href;
              return (
                <a key={index} href={`#${link.href}`} onClick={(e) => handleScrollToSection(e, link.href)}
                  className={`relative px-3 py-1.5 rounded-full text-[13px] font-medium tracking-wide transition-all duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-ocean-light'}`}
                >
                  {isActive && (
                    <motion.div layoutId="activeNavIndicator" className="absolute inset-0 bg-ocean/20 border border-ocean/50 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.3)]" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <a href="#surprise" onClick={(e) => handleScrollToSection(e, 'surprise')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeSection === 'surprise' ? 'bg-ocean text-white shadow-[0_0_20px_rgba(14,165,233,0.6)] scale-105' : 'bg-ocean/10 border border-ocean/30 text-ocean-light hover:bg-ocean/20'
              }`}
            >
              <Gift className="w-4 h-4" /> Vault
            </a>
          </div>

          <button className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[5px] p-2 rounded-full bg-deepblue-800/80 border border-white/10 backdrop-blur-md" onClick={() => setIsOpen(!isOpen)}>
            <motion.span animate={isOpen ? { rotate: 45, y: 7, backgroundColor: '#38bdf8' } : { rotate: 0, y: 0, backgroundColor: '#7dd3fc' }} className="w-5 h-[2px] block rounded-full transition-transform"></motion.span>
            <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1, backgroundColor: '#7dd3fc' }} className="w-5 h-[2px] block rounded-full"></motion.span>
            <motion.span animate={isOpen ? { rotate: -45, y: -7, backgroundColor: '#38bdf8' } : { rotate: 0, y: 0, backgroundColor: '#7dd3fc' }} className="w-5 h-[2px] block rounded-full transition-transform"></motion.span>
          </button>
        </div>
        
        <motion.div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-ocean-dark via-ocean-light to-white origin-left" style={{ scaleX }} />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(24px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)", transition: { delay: 0.3 } }} transition={{ duration: 0.4 }} className="fixed inset-0 z-[50] bg-deepblue-900/95 flex flex-col items-center justify-center overflow-y-auto py-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-ocean-dark/20 rounded-full blur-[80px] pointer-events-none z-0"></div>
            <div className="flex flex-col items-center gap-4 w-full px-6 relative z-10 mt-10">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.a key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ delay: 0.03 * index, type: "spring", stiffness: 300, damping: 24 }} href={`#${link.href}`} onClick={(e) => handleScrollToSection(e, link.href)}
                    className={`text-2xl font-heading font-bold transition-all ${isActive ? 'text-ocean-light drop-shadow-[0_0_15px_rgba(14,165,233,0.5)] scale-110' : 'text-gray-300 hover:text-white'}`}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
              <motion.a initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: 0.3, type: "spring" }} href="#surprise" onClick={(e) => handleScrollToSection(e, 'surprise')}
                className="mt-6 flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-ocean-dark to-ocean text-white font-semibold text-lg shadow-[0_0_30px_rgba(14,165,233,0.4)]"
              >
                <Gift className="w-5 h-5" /> Unlock Vault
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;