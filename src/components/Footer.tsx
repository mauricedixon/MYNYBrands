"use client";

import { useCursor } from "@/context/CursorContext";
import { socialLinks } from "@/data/site";

export const Footer = () => {
  const { setCursorVariant } = useCursor();
  const links = socialLinks.filter((link) => link.href);

  return (
    <footer className="bg-black text-white py-12 px-6 md:px-12 border-t border-neutral-900">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest text-gray-400">
        <p>&copy; {new Date().getFullYear()} My New York Brands.</p>
        {links.length > 0 && (
          <div className="flex space-x-6 mt-4 md:mt-0">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                onMouseEnter={() => setCursorVariant("link")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
};
