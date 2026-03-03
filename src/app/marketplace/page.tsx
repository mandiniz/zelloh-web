"use client";
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MarketplaceHero } from "@/components/sections/MarketplaceHero";
import { MarketplaceFilters } from "@/components/sections/MarketplaceFilters";
import { NFTGrid } from "@/components/sections/NFTGrid";
import { SteamGrid } from "@/components/sections/SteamGrid";
import { StatsTable } from "@/components/sections/StatsTable";
import { CoinsGrid } from "@/components/sections/CoinsGrid";
import { GamingAssetsGrid } from "@/components/sections/GamingAssetsGrid";
import { motion, AnimatePresence } from "framer-motion";

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("Coins");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleItems, setVisibleItems] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  // Reset al cambiar de pestaña
  useEffect(() => {
    setVisibleItems(8);
    setSearchQuery("");
  }, [activeTab]);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleItems(prev => prev + 16); // Carga 4 líneas más (16 items)
      setIsLoading(false);
    }, 1000);
  };

  const tabs = ["Coins", "NFTs", "Steam inventory", "Gaming Assets", "Collections Stats"];

  return (
    <main className="bg-black text-white min-h-screen w-full font-sans selection:bg-[#E6F379] selection:text-black overflow-x-hidden">
      <Header />
      <MarketplaceHero />
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mt-12 mb-32">
        {/* TABS NAVIGATION */}
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/5 mb-10 gap-6 overflow-x-auto">
          <nav className="flex gap-10 min-w-max">
            {tabs.map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)} 
                className={`pb-4 font-black uppercase italic tracking-tighter text-sm transition-all relative ${activeTab === tab ? "text-[#E6F379]" : "text-zinc-600 hover:text-zinc-400"}`}
              >
                {tab}
                {activeTab === tab && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E6F379] shadow-[0_0_15px_#E6F379]" />}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* SIDEBAR FILTERS */}
          <AnimatePresence mode="popLayout">
            {showFilters && activeTab !== "Collections Stats" && (
              <motion.aside 
                initial={{ opacity: 0, x: -20, width: 0 }}
                animate={{ opacity: 1, x: 0, width: "320px" }}
                exit={{ opacity: 0, x: -20, width: 0 }}
                className="shrink-0 hidden lg:block overflow-hidden"
              >
                <div className="w-[320px]">
                  <MarketplaceFilters activeTab={activeTab} />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          <section className="flex-1">
            {/* TOOLBAR */}
            <div className="flex flex-col xl:flex-row justify-between items-center mb-8 gap-4">
               <div className="flex gap-4 w-full xl:w-auto items-center">
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase italic border transition-all ${showFilters ? "bg-[#E6F379] text-black border-[#E6F379]" : "bg-[#1A1A1A] text-white border-white/5"}`}
                  >
                     <span>{showFilters ? "‹" : "›"}</span> {showFilters ? "Hide Filters" : "Show Filters"}
                  </button>
                  <span className="text-[9px] text-zinc-600 leading-tight uppercase font-black">
                     Status: <span className="text-[#E6F379] animate-pulse">Live</span>
                  </span>
               </div>

               <div className="flex items-center gap-3 w-full xl:w-auto">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search...`} 
                    className="w-full xl:w-80 bg-[#0D0D0D] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold focus:border-[#E6F379]/50 outline-none"
                  />
               </div>
            </div>

            {/* CONTENT AREA */}
            <AnimatePresence mode="wait">
              <motion.div key={activeTab + visibleItems} layout>
                {activeTab === "Coins" && <CoinsGrid searchQuery={searchQuery} limit={visibleItems} />}
                {activeTab === "NFTs" && <NFTGrid searchQuery={searchQuery} limit={visibleItems} />}
                {activeTab === "Steam inventory" && <SteamGrid limit={visibleItems} />}
                {activeTab === "Gaming Assets" && <GamingAssetsGrid searchQuery={searchQuery} limit={visibleItems} />}
                {activeTab === "Collections Stats" && <StatsTable limit={visibleItems} />}
              </motion.div>
            </AnimatePresence>

            {/* UNIVERSAL LOAD MORE BUTTON */}
            <div className="flex justify-center mt-20">
              <motion.button
                onClick={handleLoadMore}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                className="group relative px-24 py-6 overflow-hidden rounded-2xl bg-[#0D0D0D] border border-white/10 transition-all hover:border-[#E6F379]/50 shadow-2xl"
              >
                {isLoading && (
                  <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E6F379]/20 to-transparent" />
                )}
                <span className={`relative z-10 font-[1000] uppercase italic tracking-[0.3em] text-[10px] ${isLoading ? "text-[#E6F379]" : "text-zinc-500 group-hover:text-white"}`}>
                  {isLoading ? "Fetching more data..." : "Load more assets"}
                </span>
              </motion.button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}