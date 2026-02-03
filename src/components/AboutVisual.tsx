"use client";

import { motion } from "framer-motion";

export const AboutVisual = () => {
  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[3/4] bg-neutral-900 overflow-hidden group">
      {/* Image/Video Container */}
      <div className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-700">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
        >
          <source src="/about.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Spinning Badge Overlay */}
      <div className="absolute bottom-6 right-6 z-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 relative flex items-center justify-center"
        >
          {/* Circular Text SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text className="text-[11px] font-bold font-mono tracking-widest uppercase">
              <textPath href="#circlePath">
                • New York City • Est. 2026 • Culture First
              </textPath>
            </text>
          </svg>
          
          {/* Center Logo/Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="font-heading font-bold text-xl text-brand-red">NY</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative Border */}
      <div className="absolute inset-4 border border-white/10 group-hover:border-white/30 transition-colors pointer-events-none" />
    </div>
  );
};
