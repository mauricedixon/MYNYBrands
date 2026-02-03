"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/data/products";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group cursor-pointer">
      <div className="overflow-hidden bg-gray-100 aspect-[3/4] relative">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-full relative"
        >
          {/* Note: Using unoptimized for local demo files if needed, but standard Image is better */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
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
    </div>
  );
};
