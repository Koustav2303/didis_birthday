import React from 'react';

// --- Component Imports ---
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurBond from './components/OurBond';
import Gallery from './components/Gallery';
import SmileGenerator from './components/SmileGenerator';
import MusicPlayer from './components/MusicPlayer';
import WishesCard from './components/WishesCard';
import VirtualCake from './components/VirtualCake';
import SecretSurprise from './components/SecretSurprise';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-deepblue-900 min-h-screen font-sans text-white overflow-hidden selection:bg-ocean selection:text-deepblue-900">
      
      {/* The God-Level Floating Navigation Bar */}
      <Navbar />
      
      {/* Main Content Wrapper 
        Every section has a specific 'id' so the Navbar links know exactly where to scroll.
      */}
      <main>
        {/* Chapter 0: The Grand Entrance */}
        <div id="home">
          <Hero />
        </div>
        
        {/* Chapter 1: The Interactive Bento Grid Story */}
        <div id="bond">
          <OurBond />
        </div>
        
        {/* Chapter 2: The Continuous 3D Cinematic Treats Carousel */}
        <div id="gallery">
          <Gallery />
        </div>
        
        {/* The Magic Smile Generator */}
        <div id="smile">
          <SmileGenerator />
        </div>
        
        {/* The Nostalgia Music Player */}
        <div id="music">
          <MusicPlayer />
        </div>
        
        {/* Chapter 3: The Physics-Based 3D Floating Wishes Cards */}
        <div id="wishes">
          <WishesCard />
        </div>
        
        {/* The "Make A Wish" Interactive Candles */}
        <div id="cake">
          <VirtualCake />
        </div>
        
        {/* The Final Hold-to-Unlock Secret Vault */}
        <div id="surprise">
          <SecretSurprise />
        </div>
      </main>
      
      {/* The Grand Finale Signature */}
      <Footer />
      
    </div>
  );
}

export default App;