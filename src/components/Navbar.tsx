"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useCursor } from "@/context/CursorContext";
import { useCart } from "@/context/CartContext";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { setCursorVariant } = useCursor();
  const { totalItems, toggleCart } = useCart();

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
          onMouseEnter={() => setCursorVariant("link")}
          onMouseLeave={() => setCursorVariant("default")}
          className="relative w-32 h-10 group hover:opacity-80 transition-opacity"
        >
          <Image
            src={scrolled ? "/logo.png" : "/logo-white-v2.png"}
            alt="MNYB Logo"
            fill
            className={`object-contain object-left transition-opacity duration-300 ${!scrolled ? 'mix-blend-screen contrast-200' : ''}`}
            priority
          />
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
          {["SHOP", "LIFESTYLE", "MEDIA", "ABOUT"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              onMouseEnter={() => setCursorVariant("link")}
              onMouseLeave={() => setCursorVariant("default")}
              className="hover:text-brand-red transition-colors relative group/link"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover/link:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Cart */}
        <button 
            className="relative group"
            onClick={toggleCart}
            onMouseEnter={() => setCursorVariant("link")}
            onMouseLeave={() => setCursorVariant("default")}
        >
          <ShoppingBag className="w-5 h-5 group-hover:text-brand-red transition-colors" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[10px] text-white">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};
