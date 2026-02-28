import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Notice: We removed Infinity and used Flame instead to stop the crash!
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ListMusic, Music, Heart, Sparkles, Star, Moon, Sun, Gift, Flame } from 'lucide-react';

// --- Moved outside to prevent React re-render glitches ---
const Equalizer = ({ isPlaying }) => (
  <div className="flex items-end gap-1 h-4">
    {[1, 2, 3, 4].map((bar) => (
      <motion.div
        key={bar}
        animate={isPlaying ? { height: ["20%", "100%", "40%", "80%", "20%"] } : { height: "20%" }}
        transition={{ repeat: Infinity, duration: 0.5 + (bar * 0.1), ease: "linear" }}
        className="w-1 bg-ocean-light rounded-t-sm"
      />
    ))}
  </div>
);

const MusicPlayer = () => {
  // --- Your 7 Custom Songs with Glowing Icons ---
  const playlist = [
    {
      id: 1,
      title: "Phoolon Ka Taaron Ka",
      artist: "Kishore kumar",
      src: "/didis_birthday/audio/song1.mp3", 
      icon: Heart
    },
    {
      id: 2,
      title: "Behna Meri",
      artist: "Swasti Mehul",
      src: "/didis_birthday/audio/song2.mp3",
      icon: Sparkles
    },
    {
      id: 3,
      title: "Behna Meri",
      artist: "Yash Baid",
      src: "/didis_birthday/audio/song3.mp3",
      icon: Star
    },
    {
      id: 4,
      title: "My Sister-I",
      artist: "Koustav",
      src: "/didis_birthday/audio/song4.mp3",
      icon: Moon
    },
    {
      id: 5,
      title: "My Sister-II",
      artist: "Sweetest Sister",
      src: "/didis_birthday/audio/song5.mp3",
      icon: Gift
    },
    {
      id: 6,
      title: "Happy Birthday Sister-I",
      artist: "Koustav",
      src: "/didis_birthday/audio/song6.mp3",
      icon: Sun
    },
    {
      id: 7,
      title: "Happy Birthday Sister-II",
      artist: "Koustav",
      src: "/didis_birthday/audio/song7.mp3",
      icon: Flame // Safely using Flame instead of Infinity
    }
  ];

  // --- State & Refs ---
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const currentSong = playlist[currentSongIndex];
  const CurrentIcon = currentSong.icon;

  // --- Audio Event Handlers ---
  useEffect(() => {
    // Only try to play if audioRef exists
    if (audioRef.current) {
      if (isPlaying) {
        // Catch the error if the file doesn't exist yet so it doesn't crash the page
        audioRef.current.play().catch(err => {
          console.log("Waiting for audio files to be uploaded...");
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) setProgress(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleSongEnd = () => {
    handleNext();
  };

  // --- Controls ---
  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const handleProgressClick = (e) => {
    const bar = progressBarRef.current;
    if (!bar || !audioRef.current) return;
    const clickPosition = e.clientX - bar.getBoundingClientRect().left;
    const clickPercentage = clickPosition / bar.offsetWidth;
    const newTime = clickPercentage * duration;
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const selectSong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    setShowPlaylist(false);
  };

  // --- Helpers ---
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds === 0) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <section className="relative py-24 sm:py-32 bg-deepblue-900 px-6 sm:px-12 flex justify-center items-center overflow-hidden z-0">
      
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnd}
      />

      {/* Ambient glowing background synced to playing state */}
      <motion.div 
        animate={{ scale: isPlaying ? [1, 1.05, 1] : 1, opacity: isPlaying ? 0.8 : 0.3 }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-ocean-dark/20 rounded-full blur-[100px] pointer-events-none z-0"
      ></motion.div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deepblue-800 border border-ocean/20 mb-6 shadow-[0_0_15px_rgba(14,165,233,0.1)]">
            <Music className="w-4 h-4 text-ocean-light animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-ocean-light uppercase">The Soundtrack</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            Songs for <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-light to-ocean drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]">Tulip Didi</span>
          </h2>
        </motion.div>

        {/* --- Main Player Card --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-2xl bg-deepblue-800/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 sm:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-center gap-8 sm:gap-12 relative overflow-hidden group hover:border-ocean/30 transition-colors duration-500"
        >
          {/* Subtle Glare Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          {/* Left Side: Holographic Glowing Disc */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 shrink-0">
            <div className={`absolute inset-0 rounded-full border-2 border-ocean/30 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''} border-dashed opacity-50`}></div>
            
            <motion.div 
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="w-full h-full rounded-full border-4 border-deepblue-900 bg-gradient-to-br from-deepblue-800 to-deepblue-900 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] flex items-center justify-center relative"
            >
              <div className="absolute inset-2 rounded-full border border-white/5"></div>
              <div className="absolute inset-6 rounded-full border border-white/5"></div>
              <div className="absolute inset-10 rounded-full border border-white/5"></div>
              <div className="absolute inset-14 rounded-full border border-white/5"></div>

              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-deepblue-900 rounded-full border-2 border-ocean/40 flex items-center justify-center shadow-[0_0_25px_rgba(14,165,233,0.4)] z-10 relative">
                <div className="absolute w-3 h-3 bg-deepblue-900 rounded-full border border-ocean/20 z-20"></div>
                <CurrentIcon className="w-10 h-10 sm:w-12 sm:h-12 text-ocean-light drop-shadow-[0_0_15px_rgba(14,165,233,0.9)]" />
              </div>
            </motion.div>
          </div>

          {/* Right Side: Info & Controls */}
          <div className="w-full flex flex-col items-center sm:items-start text-center sm:text-left">
            
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-xs font-mono tracking-widest text-ocean-light bg-ocean/10 px-3 py-1 rounded-full border border-ocean/20">TRACK 0{currentSongIndex + 1}</span>
              <Equalizer isPlaying={isPlaying} />
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-1 truncate w-full">{currentSong.title}</h3>
            <p className="text-gray-400 font-light mb-8">{currentSong.artist}</p>

            {/* Custom Progress Bar */}
            <div className="w-full mb-6">
              <div 
                ref={progressBarRef}
                onClick={handleProgressClick}
                className="w-full h-2 bg-deepblue-900 rounded-full cursor-pointer overflow-hidden relative group/bar"
              >
                <motion.div 
                  className="h-full bg-gradient-to-r from-ocean-dark to-ocean-light relative"
                  style={{ width: `${duration > 0 ? (progress / duration) * 100 : 0}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/bar:opacity-100 transition-opacity shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                </motion.div>
              </div>
              <div className="flex justify-between mt-2 text-xs font-mono text-gray-500">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Controls & Features */}
            <div className="flex items-center justify-between w-full">
              <div className="hidden sm:flex items-center gap-2 group/vol relative">
                <button onClick={() => setIsMuted(!isMuted)} className="text-gray-400 hover:text-white transition-colors">
                  {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <div className="w-0 overflow-hidden group-hover/vol:w-20 transition-all duration-300 flex items-center">
                  <input 
                    type="range" min="0" max="1" step="0.01" 
                    value={isMuted ? 0 : volume} 
                    onChange={(e) => { setVolume(parseFloat(e.target.value)); setIsMuted(false); }}
                    className="w-full h-1 bg-deepblue-900 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-ocean-light [&::-webkit-slider-thumb]:rounded-full cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <button onClick={handlePrev} className="text-gray-400 hover:text-white hover:scale-110 transition-all">
                  <SkipBack className="w-6 h-6 fill-current" />
                </button>
                
                <button 
                  onClick={togglePlay} 
                  className="w-14 h-14 rounded-full bg-ocean flex items-center justify-center text-white hover:bg-ocean-light hover:shadow-[0_0_20px_rgba(14,165,233,0.5)] hover:scale-105 transition-all"
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                </button>
                
                <button onClick={handleNext} className="text-gray-400 hover:text-white hover:scale-110 transition-all">
                  <SkipForward className="w-6 h-6 fill-current" />
                </button>
              </div>

              <button 
                onClick={() => setShowPlaylist(!showPlaylist)}
                className={`text-gray-400 hover:text-white transition-colors ${showPlaylist ? 'text-ocean-light' : ''}`}
              >
                <ListMusic className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* --- Collapsible Playlist --- */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full max-w-2xl mt-4 bg-deepblue-800/50 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden"
            >
              <div className="p-4 flex flex-col gap-2">
                {playlist.map((song, index) => {
                  const ListIcon = song.icon;
                  return (
                    <button
                      key={song.id}
                      onClick={() => selectSong(index)}
                      className={`flex items-center gap-4 w-full p-3 rounded-2xl transition-all duration-300 ${
                        currentSongIndex === index 
                          ? 'bg-ocean/20 border border-ocean/30 shadow-[0_0_15px_rgba(14,165,233,0.1)]' 
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="relative w-12 h-12 rounded-xl bg-deepblue-900 border border-white/10 flex items-center justify-center shrink-0">
                        <ListIcon className={`w-6 h-6 ${currentSongIndex === index ? 'text-ocean-light drop-shadow-[0_0_8px_rgba(14,165,233,0.8)]' : 'text-gray-400'}`} />
                        {currentSongIndex === index && isPlaying && (
                          <div className="absolute inset-0 bg-deepblue-900/80 rounded-xl flex items-center justify-center">
                            <Equalizer isPlaying={isPlaying} />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-start">
                        <span className={`font-medium ${currentSongIndex === index ? 'text-ocean-light' : 'text-white'}`}>{song.title}</span>
                        <span className="text-sm text-gray-500">{song.artist}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default MusicPlayer;