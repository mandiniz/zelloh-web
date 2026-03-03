"use client";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CollectionHero } from "@/components/sections/CollectionHero";
import { CollectionStats } from "@/components/sections/CollectionStats";
import { CollectionFilters } from "@/components/sections/CollectionFilters";
import { ItemsGrid } from "@/components/sections/ItemsGrid";
import { motion, AnimatePresence } from "framer-motion";

export default function CollectionPage() {
  const [activeTab, setActiveTab] = useState("Items");
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  return (
    <main className="bg-[#050505] text-white min-h-screen selection:bg-[#E6F379] selection:text-black">
      <Header />
      
      {/* 1. ELIMINACIÓN DE ESPACIO SUPERIOR
          -mt-[120px] asegura que el banner suba por detrás del header.
      */}
      <div className="relative w-full -mt-[80px] md:-mt-[100px] lg:-mt-[120px]">
        <CollectionHero />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
        
        {/* 2. CABECERA DE INFORMACIÓN (TÍTULO + STATS) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 mt-6 mb-12">
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-bold italic uppercase tracking-tight">
                  Bored Ape Yacht Club
                </h1>
                <span className="text-[#E6F379] text-xl">✓</span>
              </div>
              <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-[0.2em]">
                Created by <span className="text-white hover:text-[#E6F379] cursor-pointer transition-colors">00AAX00...22CD.</span>
              </p>
            </div>

            <p className="text-zinc-400 text-sm md:text-[15px] leading-relaxed max-w-2xl">
              The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs... 
              <span className="text-white cursor-pointer font-bold underline ml-1 hover:text-[#E6F379]">Show more</span>
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button className="bg-white text-black px-7 py-3 rounded-xl font-bold text-xs uppercase italic hover:bg-zinc-200 transition-all">
                Create marketplace
              </button>
              <button className="bg-[#141414] border border-white/10 px-6 py-3 rounded-xl font-bold text-[10px] text-zinc-400 uppercase italic hover:border-white/30">
                Place a bid for any NFT from this collection
              </button>
              <button className="bg-white text-black px-6 py-3 rounded-xl font-bold text-xs uppercase italic hover:bg-[#E6F379] transition-all">
                Place a bid
              </button>
            </div>
          </div>

          <div className="lg:-mt-28 xl:-mt-36 z-20">
            <CollectionStats />
          </div>
        </div>

        {/* 3. BARRA DE NAVEGACIÓN Y FILTROS (STICKY) */}
        <div className="sticky top-[80px] z-30 bg-[#050505]/80 backdrop-blur-md py-4 mb-8 border-b border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-8 overflow-x-auto no-scrollbar w-full md:w-auto">
              {["Items", "Activity"].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-[11px] font-bold uppercase tracking-[0.2em] italic relative whitespace-nowrap ${
                    activeTab === tab ? "text-[#E6F379]" : "text-zinc-500 hover:text-white"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E6F379]" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border text-[10px] font-bold uppercase italic transition-all ${
                  isFilterOpen ? "bg-[#E6F379] text-black border-transparent" : "bg-transparent border-white/10 text-white"
                }`}
              >
                Filters
              </button>
              <div className="flex-1 md:w-[300px] relative">
                <input 
                  type="text" 
                  placeholder="SEARCH BY NFTS" 
                  className="w-full bg-[#141414] border border-white/10 rounded-xl px-10 py-3 text-[10px] font-bold italic outline-none focus:border-[#E6F379]/50" 
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">🔍</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. LAYOUT PRINCIPAL (FILTROS + GRID) */}
        <div className="flex gap-10 items-start pb-20">
          <AnimatePresence>
            {isFilterOpen && (
              <motion.aside 
                initial={{ opacity: 0, width: 0, x: -20 }}
                animate={{ opacity: 1, width: 300, x: 0 }}
                exit={{ opacity: 0, width: 0, x: -20 }}
                className="hidden lg:block shrink-0 sticky top-[160px]"
              >
                <CollectionFilters />
              </motion.aside>
            )}
          </AnimatePresence>
          
          <div className="flex-1">
            <ItemsGrid />
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}