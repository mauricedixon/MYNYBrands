"use client";

import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl md:text-9xl font-heading font-bold text-white tracking-tighter mix-blend-overlay"
        >
          CULTURE
          <br />
          <span className="text-brand-red">FIRST</span>.
        </motion.h1>
        
        <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.8 }}
           className="mt-6 text-sm uppercase tracking-[0.2em] text-gray-300"
        >
            Est. New York City
        </motion.p>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent opacity-50"></div>
      </motion.div>
    </section>
  );
};
