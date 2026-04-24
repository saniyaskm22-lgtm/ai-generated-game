import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, Music, Volume2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
  color: string;
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "STATIC_NEBULA",
    artist: "VOID_ENGINE",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "#00ffff"
  },
  {
    id: 2,
    title: "SYNTH_GHOST",
    artist: "CORE_FAILURE",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    color: "#ff00ff"
  },
  {
    id: 3,
    title: "VOID_RESONANCE",
    artist: "USER_004",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    color: "#ffff00"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed, user interaction needed"));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const skipTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  return (
    <div className="bg-black/60 backdrop-blur-md border border-cyan/30 p-4 rounded-none h-full flex flex-col justify-between relative overflow-hidden group">
      {/* Glitch Overlay Effect */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 pointer-events-none transition-opacity">
        <div className="absolute inset-x-0 top-0 h-px bg-cyan shadow-[0_0_10px_#00ffff]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-magenta shadow-[0_0_10px_#ff00ff]" />
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={skipTrack}
      />

      <div className="flex items-start justify-between">
        <div>
          <span className="text-[10px] font-mono text-cyan/70 block mb-1 uppercase tracking-widest">
            Now Sequencing //
          </span>
          <h2 
            className="text-xl font-bold tracking-tighter text-white glitch-text" 
            data-text={currentTrack.title}
          >
            {currentTrack.title}
          </h2>
          <p className="text-xs font-mono text-magenta/80 mt-1 uppercase">
            {currentTrack.artist}
          </p>
        </div>
        <div className="p-2 border border-white/10 rounded-full animate-pulse">
          <Music className="w-4 h-4 text-cyan" />
        </div>
      </div>

      {/* Visualizer Mock */}
      <div className="flex items-end gap-1 h-12 my-4 px-2">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="w-full bg-cyan/50"
            animate={{
              height: isPlaying ? [10, 40, 20, 35, 15][i % 5] : 5,
              opacity: isPlaying ? [0.4, 1, 0.6][i % 3] : 0.2
            }}
            transition={{
              repeat: Infinity,
              duration: 0.5 + Math.random() * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="relative h-1 bg-white/10 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-cyan shadow-[0_0_8px_#00ffff]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-10 h-10 flex items-center justify-center bg-cyan text-void hover:bg-white transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current translate-x-0.5" />
              )}
            </button>
            <button
              onClick={skipTrack}
              className="w-8 h-8 flex items-center justify-center border border-magenta/50 text-magenta hover:bg-magenta hover:text-white transition-all"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase">
            <Volume2 className="w-3 h-3" />
            <span>EXT_AUDIO_ACTIVE</span>
          </div>
        </div>
      </div>
      
      {/* Small cryptic info */}
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between opacity-30 text-[8px] font-mono whitespace-nowrap">
        <span>DATA_STREAM_OK</span>
        <div className="flex items-center gap-2">
          <span>{`00:${Math.floor(audioRef.current?.currentTime || 0).toString().padStart(2, '0')}`}</span>
          <span>/</span>
          <span>100:00</span>
        </div>
      </div>
    </div>
  );
}
