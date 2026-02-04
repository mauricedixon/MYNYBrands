"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { cursorVariant } = useCursor();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Slightly tighter spring for the crosshair to feel precise
  const springConfig = { damping: 30, stiffness: 800 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Center the 24px crosshair (12px offset)
      mouseX.set(e.clientX - 12);
      mouseY.set(e.clientY - 12);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  const isHovering = cursorVariant === "link";

  return (
    <motion.div
      className={`fixed top-0 left-0 pointer-events-none z-[9999] ${isHovering ? '' : 'mix-blend-difference'}`}
      style={{
        x: cursorX,
        y: cursorY,
        width: 24,
        height: 24,
      }}
    >
        {/* Crosshair SVG */}
        <motion.svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            strokeWidth="2"
            animate={{
                scale: isHovering ? 1.5 : 1,
                rotate: isHovering ? 45 : 0, // Adds a cool 45deg turn on hover (becomes an X)
                stroke: isHovering ? "#E60000" : "#FFFFFF"
            }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
        >
            <line x1="12" y1="4" x2="12" y2="20" />
            <line x1="4" y1="12" x2="20" y2="12" />
        </motion.svg>
    </motion.div>
  );
};
