"use client";

import { useCursor } from "@/context/CursorContext";

export const Footer = () => {
  const { setCursorVariant } = useCursor();

  return (
    <footer className="bg-black text-white py-12 px-6 md:px-12 border-t border-neutral-900">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest text-gray-600">
        <p>&copy; 2026 My New York Brands.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="#"
            className="hover:text-white transition-colors"
            onMouseEnter={() => setCursorVariant("link")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Instagram
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors"
            onMouseEnter={() => setCursorVariant("link")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Twitter
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors"
            onMouseEnter={() => setCursorVariant("link")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Spotify
          </a>
        </div>
      </div>
    </footer>
  );
};
