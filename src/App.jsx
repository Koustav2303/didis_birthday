import React from 'react';

// --- All 10 God-Level Components ---
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurBond from './components/OurBond';
import Gallery from './components/Gallery';
import SmileGenerator from './components/SmileGenerator';
import MusicPlayer from './components/MusicPlayer';
import CuteNotes from './components/CuteNotes';
import CarePackage from './components/CarePackage';
import WishesCard from './components/WishesCard';
import VirtualCake from './components/VirtualCake';
import SecretSurprise from './components/SecretSurprise';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-deepblue-900 min-h-screen font-sans text-white overflow-hidden selection:bg-ocean selection:text-deepblue-900">
      
      {/* Floating Navigation */}
      <Navbar />
      
      {/* Main Content Flow */}
      <main>
        <div id="home"><Hero /></div>
        <div id="bond"><OurBond /></div>
        <div id="gallery"><Gallery /></div>
        <div id="smile"><SmileGenerator /></div>
        <div id="music"><MusicPlayer /></div>
        <div id="notes"><CuteNotes /></div>
        <div id="care"><CarePackage /></div>
        <div id="wishes"><WishesCard /></div>
        <div id="cake"><VirtualCake /></div>
        <div id="surprise"><SecretSurprise /></div>
      </main>
      
      {/* The Grand Finale */}
      <Footer />
      
    </div>
  );
}

export default App;