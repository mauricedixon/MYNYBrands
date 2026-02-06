"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { AboutVisual } from "@/components/AboutVisual";
import { products } from "@/data/products";
import { useCursor } from "@/context/CursorContext";

const PageContent = () => {
  const { setCursorVariant } = useCursor();

  return (
    <main className="bg-white min-h-screen selection:bg-brand-red selection:text-white">
      <Navbar />
      <Hero />

      <section id="shop" className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter uppercase leading-[0.9]">
            Latest
            <br />
            <span className="text-brand-red">Drops</span>
          </h2>
          <span className="text-sm font-mono text-gray-400 hidden md:block uppercase tracking-widest border-l border-gray-200 pl-4">
            Spring/Summer 2026
            <br />
            New York City
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="about" className="py-32 bg-black text-white px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter uppercase mb-8 leading-none">
              From The
              <br />
              <span className="text-brand-red">Block</span> Up.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md font-light">
              My New York Brands represents the gritty, authentic spirit of the
              city. We don&apos;t just sell clothes; we curate culture. Designed
              in Brooklyn, worn everywhere.
            </p>
            <div className="mt-8 flex items-center space-x-4">
               <button 
                className="px-8 py-3 bg-white text-black font-bold font-heading uppercase tracking-wide hover:bg-brand-red hover:text-white transition-colors"
                onMouseEnter={() => setCursorVariant("link")}
                onMouseLeave={() => setCursorVariant("default")}
               >
                  Read Manifesto
               </button>
            </div>
          </div>
          <AboutVisual />
        </div>
      </section>
    </main>
  );
};

export default function Home() {
  return <PageContent />;
}
