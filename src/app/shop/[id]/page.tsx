"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { ArrowLeft, Minus, Plus, Expand, Ruler, ChevronDown, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ProductViewer3D } from "@/components/ProductViewer3D";
import { SizeGuide } from "@/components/SizeGuide";
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
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("details");

  // Update main image if product changes (or initial load)
  if (product && mainImage === "") {
    setMainImage(product.image);
  }

  if (!product) {
    return notFound();
  }

  const sizes = product.sizes || ["S", "M", "L", "XL"];
  const productImages = product.images || [product.image];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

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

      {/* 3D Product Viewer Modal */}
      <ProductViewer3D
        images={productImages}
        productName={product.name}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />

      {/* Size Guide Modal */}
      <SizeGuide
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category.toLowerCase()}
      />

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
            <div
              className="bg-neutral-100 aspect-[3/4] relative w-full overflow-hidden cursor-pointer group"
              onClick={() => setIsViewerOpen(true)}
              onMouseEnter={() => setCursorVariant("link")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <Image
                src={mainImage || product.image}
                alt={product.name}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Expand Button Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                  <Expand size={16} />
                  <span className="text-sm font-bold uppercase tracking-wide">Click to view 3D</span>
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`relative aspect-square bg-neutral-100 overflow-hidden border-2 transition-all ${mainImage === img ? "border-black" : "border-transparent hover:border-gray-300"
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
              <div className="flex items-center gap-4 mb-8">
                <p className="text-2xl font-mono">
                  ${product.price.toLocaleString()}
                </p>
                {product.limited && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-red/10 text-brand-red text-xs font-bold uppercase tracking-wider rounded-full">
                    <Sparkles size={12} />
                    Limited Edition
                  </span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed mb-10 max-w-md">
                {product.description || "A premium staple for your wardrobe. Designed in New York City with attention to detail and quality construction."}
              </p>

              {/* Size Selector */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase font-bold tracking-widest">
                    Select Size
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-black transition-colors uppercase tracking-wide"
                    onMouseEnter={() => setCursorVariant("link")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <Ruler size={14} />
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] h-12 px-4 flex items-center justify-center border-2 transition-all duration-200 font-medium
                        ${selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-200 text-gray-600 hover:border-black hover:text-black"
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
              {selectedSize ? `Add to Cart - $${(product.price * quantity).toLocaleString()}` : "Select a Size"}
            </button>

            {/* Product Details Accordion */}
            <div className="mt-8 border-t border-gray-100 pt-6 space-y-0">
              {/* Details Section */}
              {product.details && (
                <div className="border-b border-gray-100">
                  <button
                    onClick={() => toggleSection("details")}
                    className="w-full flex items-center justify-between py-4 text-left"
                    onMouseEnter={() => setCursorVariant("link")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <span className="text-sm font-bold uppercase tracking-wider">Details</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${expandedSection === "details" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedSection === "details" && (
                    <ul className="pb-4 space-y-2">
                      {product.details.map((detail, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-brand-red mt-1">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Materials Section */}
              {product.materials && (
                <div className="border-b border-gray-100">
                  <button
                    onClick={() => toggleSection("materials")}
                    className="w-full flex items-center justify-between py-4 text-left"
                    onMouseEnter={() => setCursorVariant("link")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <span className="text-sm font-bold uppercase tracking-wider">Materials</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${expandedSection === "materials" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedSection === "materials" && (
                    <ul className="pb-4 space-y-2">
                      {product.materials.map((material, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-brand-red mt-1">•</span>
                          {material}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Care Section */}
              {product.care && (
                <div className="border-b border-gray-100">
                  <button
                    onClick={() => toggleSection("care")}
                    className="w-full flex items-center justify-between py-4 text-left"
                    onMouseEnter={() => setCursorVariant("link")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <span className="text-sm font-bold uppercase tracking-wider">Care Instructions</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${expandedSection === "care" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedSection === "care" && (
                    <ul className="pb-4 space-y-2">
                      {product.care.map((instruction, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-brand-red mt-1">•</span>
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
