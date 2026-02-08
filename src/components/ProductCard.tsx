"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Product } from "@/data/products";
import { useCursor } from "@/context/CursorContext";

export const ProductCard = ({ product }: { product: Product }) => {
  const { setCursorVariant } = useCursor();
  const [isHovered, setIsHovered] = useState(false);

  const hasBackImage = product.images && product.images.length > 1;
  const frontImage = product.image;
  const backImage = hasBackImage ? product.images![1] : product.image;

  return (
    <Link
      href={`/shop/${product.id}`}
      className="group cursor-pointer block"
      onMouseEnter={() => {
        setCursorVariant("link");
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setCursorVariant("default");
        setIsHovered(false);
      }}
    >
      <div className="overflow-hidden bg-neutral-900 aspect-[3/4] relative">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-full relative"
        >
          {/* Front Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isHovered && hasBackImage ? "back" : "front"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={isHovered && hasBackImage ? backImage : frontImage}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Front/Back Label */}
          {hasBackImage && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
              <span className="text-[10px] uppercase tracking-widest text-white/60 font-mono bg-black/40 px-2 py-1 rounded-sm backdrop-blur-sm">
                {isHovered ? "Back" : "Front"}
              </span>
            </div>
          )}
        </motion.div>
      </div>
      <div className="mt-4 flex justify-between items-start">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {product.category}
          </p>
          <h3 className="text-sm font-bold font-heading uppercase tracking-tight mt-1">
            {product.name}
          </h3>
        </div>
        <span className="text-sm font-medium font-mono">${product.price}</span>
      </div>
    </Link>
  );
};
