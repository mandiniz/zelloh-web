"use client";
import { useState } from "react";

// Definimos la interfaz para que TypeScript acepte la prop activeTab
interface MarketplaceFiltersProps {
  activeTab?: string;
}

export const MarketplaceFilters = ({ activeTab }: MarketplaceFiltersProps) => {
  const [openSection, setOpenSection] = useState<string | null>("Collections");

  // Lista de categorías según el diseño adjunto
  const categories = [
    "Rewards", 
    "Status", 
    "Price", 
    "Marketplace", 
    "Type", 
    "Options", 
    "Collections"
  ];

  return (
    <div className="space-y-8 sticky top-32">
      {/* Switch de Rewards (Estilo Toggle) */}
      <div className="flex justify-between items-center px-2">
        <span className="font-black uppercase text-[11px] tracking-[0.2em] text-zinc-500">Rewards</span>
        <div className="w-10 h-5 bg-zinc-800 rounded-full relative cursor-pointer border border-white/10">
          <div className="absolute left-1 top-1 w-3 h-3 bg-zinc-500 rounded-full" />
        </div>
      </div>

      <div className="space-y-1">
        {categories.map((cat) => (
          <div key={cat} className="group overflow-hidden">
            <button 
              onClick={() => setOpenSection(openSection === cat ? null : cat)}
              className="w-full flex justify-between items-center py-4 border-b border-white/5 group-hover:border-white/10 transition-all text-left"
            >
              <span className={`font-black uppercase text-[11px] tracking-[0.2em] transition-colors ${
                openSection === cat ? "text-[#E6F379]" : "text-zinc-500 group-hover:text-white"
              }`}>
                {cat}
              </span>
              <span className={`text-[10px] transition-transform duration-300 ${
                openSection === cat ? "rotate-180 text-[#E6F379]" : "text-zinc-700"
              }`}>
                ▼
              </span>
            </button>
            
            {/* Contenido expandible del acordeón */}
            {openSection === cat && (
              <div className="py-4 px-1 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                {cat === "Collections" && (
                  <div className="relative mb-4">
                    <input 
                      type="text" 
                      placeholder="Search by Collection" 
                      className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-4 py-2.5 text-[10px] font-bold focus:border-[#E6F379]/50 transition-all outline-none"
                    />
                  </div>
                )}
                
                {/* Items de la lista (Simulando el diseño de la captura) */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-4 group/item cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-[#111] border border-white/5 overflow-hidden p-1 group-hover/item:border-[#E6F379]/30 transition-all">
                       <img 
                        src={`https://api.dicebear.com/7.x/identicon/svg?seed=${cat}-${i}`} 
                        className="w-full h-full object-contain opacity-70 group-hover:opacity-100" 
                        alt="filter-icon" 
                       />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black uppercase text-white tracking-tighter truncate">
                        {activeTab === "Steam inventory" ? "Counter-Strike: GO" : "Bored Ape Yacht Club"}
                      </p>
                      <p className="text-[9px] text-zinc-600 font-bold uppercase mt-0.5">
                        {activeTab === "Steam inventory" ? "From: $ 9,99" : "Floor: 2.70 ETH"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-white font-black italic">
                        {activeTab === "Steam inventory" ? "10 items" : "14ETH"}
                      </p>
                      {activeTab !== "Steam inventory" && (
                        <p className="text-[8px] text-zinc-600 font-bold uppercase">24h</p>
                      )}
                    </div>
                  </div>
                ))}
                
                <button className="w-full py-3 mt-2 bg-zinc-900/50 hover:bg-zinc-800 rounded-xl text-[9px] font-[1000] uppercase tracking-widest text-zinc-500 transition-all border border-white/5">
                  Load more
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};