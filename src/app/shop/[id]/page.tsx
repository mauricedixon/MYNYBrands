"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { products } from "@/data/products";
import { useCursor } from "@/context/CursorContext";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
  const params = useParams();
  const { setCursorVariant } = useCursor();
  const { addToCart } = useCart();
  
  // Find product
  const product = products.find((p) => p.id === Number(params.id));
  
  // State for selections
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string>(product?.image || "");

  // Update main image if product changes (or initial load)
  if (product && mainImage === "") {
    setMainImage(product.image);
  }

  if (!product) {
    return notFound();
  }

  const sizes = ["S", "M", "L", "XL"];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    if (product) {
        addToCart(product, selectedSize, quantity);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black selection:bg-brand-red selection:text-white pb-20">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 lg:pt-40">
        {/* Breadcrumb / Back */}
        <Link 
            href="/#shop"
            className="inline-flex items-center text-sm uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-8 group"
            onMouseEnter={() => setCursorVariant("link")}
            onMouseLeave={() => setCursorVariant("default")}
        >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Image Section */}
            <div className="flex flex-col space-y-4">
              <div className="bg-gray-100 aspect-[3/4] relative w-full overflow-hidden">
                  <Image
                      src={mainImage || product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                  />
              </div>
              
              {/* Thumbnails */}
              {product.images && product.images.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(img)}
                      className={`relative aspect-square bg-gray-100 overflow-hidden border-2 transition-all ${
                        mainImage === img ? "border-black" : "border-transparent hover:border-gray-300"
                      }`}
                      onMouseEnter={() => setCursorVariant("link")}
                      onMouseLeave={() => setCursorVariant("default")}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="flex flex-col h-full lg:pt-8">
                <div className="mb-auto">
                    <span className="text-sm text-gray-500 uppercase tracking-widest block mb-2">
                        {product.category}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-tighter mb-4 leading-[0.9]">
                        {product.name}
                    </h1>
                    <p className="text-2xl font-mono mb-8">
                        ${product.price}
                    </p>

                    <p className="text-gray-600 leading-relaxed mb-10 max-w-md">
                        A premium staple for your wardrobe. Designed in New York City with attention to detail and quality construction. Built to last and represent the culture.
                    </p>

                    {/* Size Selector */}
                    <div className="mb-10">
                        <span className="text-xs uppercase font-bold tracking-widest block mb-4">
                            Select Size
                        </span>
                        <div className="flex space-x-4">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-12 h-12 flex items-center justify-center border transition-all duration-200
                                        ${selectedSize === size 
                                            ? "border-black bg-black text-white" 
                                            : "border-gray-200 text-gray-500 hover:border-black hover:text-black"
                                        }
                                    `}
                                    onMouseEnter={() => setCursorVariant("link")}
                                    onMouseLeave={() => setCursorVariant("default")}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="mb-10">
                        <span className="text-xs uppercase font-bold tracking-widest block mb-4">
                            Quantity
                        </span>
                        <div className="flex items-center border border-gray-200 w-fit">
                            <button 
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                onMouseEnter={() => setCursorVariant("link")}
                                onMouseLeave={() => setCursorVariant("default")}
                            >
                                <Minus size={14} />
                            </button>
                            <span className="w-12 text-center font-mono">
                                {quantity}
                            </span>
                            <button 
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                onMouseEnter={() => setCursorVariant("link")}
                                onMouseLeave={() => setCursorVariant("default")}
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Add to Cart */}
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-brand-red text-white py-4 font-bold font-heading uppercase tracking-widest text-lg hover:bg-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!selectedSize}
                    onMouseEnter={() => setCursorVariant("link")}
                    onMouseLeave={() => setCursorVariant("default")}
                >
                    {selectedSize ? `Add to Cart - $${product.price * quantity}` : "Select a Size"}
                </button>
            </div>
        </div>
      </div>
    </main>
  );
}
