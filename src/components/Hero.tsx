"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";

// The hero video is large, so only load it on wider screens for visitors
// who haven't asked for reduced motion or reduced data.
const shouldPlayVideo = () => {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return (
    window.matchMedia("(min-width: 768px)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !connection?.saveData
  );
};

const subscribe = () => () => {};

export const Hero = () => {
  // False during server render, then decided once in the browser
  const showVideo = useSyncExternalStore(subscribe, shouldPlayVideo, () => false);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-black">
      {showVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      )}

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Headline stays readable even before (or without) the animation */}
        <motion.h1
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl md:text-9xl font-heading font-bold text-white tracking-tighter"
        >
          CULTURE
          <br />
          <span className="text-brand-red">FIRST</span>.
        </motion.h1>

        <p className="mt-6 text-sm uppercase tracking-[0.2em] text-gray-300">
          Est. New York City
        </p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent opacity-50"></div>
      </motion.div>
    </section>
  );
};
