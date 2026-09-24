"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useCursor } from "@/context/CursorContext";
import { useCart } from "@/context/CartContext";

// Only link to sections that exist; add Lifestyle / Media once those pages are built.
const navLinks = [
  { label: "SHOP", href: "/#shop" },
  { label: "ABOUT", href: "/#about" },
];

/** `transparent` lets the bar sit over a dark hero until the page scrolls. */
export const Navbar = ({ transparent = false }: { transparent?: boolean }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { setCursorVariant } = useCursor();
  const { totalItems, toggleCart } = useCart();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });
  const solid = scrolled || !transparent;

  // Lock page scroll and close on Escape while the phone menu is open
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        solid
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
            src={solid ? "/logo.png" : "/logo-white-v2.png"}
            alt="My New York Brands"
            fill
            className={`object-contain object-left transition-opacity duration-300 ${!solid ? 'mix-blend-screen contrast-200' : ''}`}
            priority
          />
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onMouseEnter={() => setCursorVariant("link")}
              onMouseLeave={() => setCursorVariant("default")}
              className="hover:text-brand-red transition-colors relative group/link"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover/link:w-full"></span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Cart */}
          <button
            className="relative group w-11 h-11 flex items-center justify-center"
            onClick={toggleCart}
            aria-label={`Open cart${totalItems > 0 ? `, ${totalItems} item${totalItems === 1 ? "" : "s"}` : ""}`}
            onMouseEnter={() => setCursorVariant("link")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <ShoppingBag className="w-5 h-5 group-hover:text-brand-red transition-colors" />
            {totalItems > 0 && (
              <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[10px] text-white">
                {totalItems}
              </span>
            )}
          </button>

          {/* Phone menu toggle */}
          <button
            className="md:hidden w-11 h-11 flex items-center justify-center -mr-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Phone menu (no fade, so it's never stuck half-visible) */}
      {menuOpen && (
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="md:hidden fixed inset-0 z-[60] bg-black text-white flex flex-col px-6 py-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-xl tracking-tight">MY NY</span>
              <button
                className="w-11 h-11 flex items-center justify-center -mr-2"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                autoFocus
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <ul className="mt-16 space-y-4">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block font-heading font-bold text-6xl uppercase tracking-tighter leading-none hover:text-brand-red transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-auto text-xs uppercase tracking-[0.2em] text-gray-500">New York City</p>
          </div>
      )}
    </nav>
  );
};
