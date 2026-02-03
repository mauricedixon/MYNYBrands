"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScroll, useMotionValueEvent } from "framer-motion";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        scrolled
          ? "bg-white text-black py-4 border-gray-100 shadow-sm"
          : "bg-transparent text-white py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-heading font-bold tracking-tighter group hover:opacity-80 transition-opacity"
        >
          MN<span className="text-brand-red">Y</span>B
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
          {["SHOP", "MEDIA", "ABOUT"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-brand-red transition-colors relative group/link"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover/link:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Cart */}
        <button className="relative group">
          <ShoppingBag className="w-5 h-5 group-hover:text-brand-red transition-colors" />
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
          </span>
        </button>
      </div>
    </nav>
  );
};
