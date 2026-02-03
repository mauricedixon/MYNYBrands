"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import { motion } from "framer-motion";
import { playlist } from "@/data/playlist";

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
           console.log("Playback failed:", error);
           // Auto-play often blocked by browsers until user interaction
           setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const handleEnded = () => {
    nextTrack();
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-8 right-8 z-40"
    >
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onEnded={handleEnded}
      />
      
      <div className="bg-white text-black border border-gray-100 p-4 flex items-center space-x-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] min-w-[280px]">
        {/* Controls */}
        <div className="flex items-center space-x-2">
            <button 
                onClick={prevTrack}
                className="p-1 hover:text-brand-red transition-colors"
            >
                <SkipBack size={14} fill="currentColor" />
            </button>
            
            <button
            onClick={togglePlay}
            className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-none hover:bg-brand-red transition-colors flex-shrink-0"
            >
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            </button>

            <button 
                onClick={nextTrack}
                className="p-1 hover:text-brand-red transition-colors"
            >
                <SkipForward size={14} fill="currentColor" />
            </button>
        </div>

        {/* Info */}
        <div className="flex flex-col overflow-hidden">
          <span className="text-[10px] uppercase text-gray-400 tracking-wider">
            Now Playing
          </span>
          <div className="relative overflow-hidden w-full">
            <motion.div 
                key={currentTrack.id}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="whitespace-nowrap"
            >
                <span className="text-xs font-bold font-heading uppercase tracking-wide">
                {currentTrack.title}
                </span>
                <span className="text-xs font-mono text-gray-500 ml-2">
                    {currentTrack.artist}
                </span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
