"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBox, FiMap, FiCpu, FiGlobe, FiPlus, FiArrowUpRight, FiLayers, FiZap, FiActivity, FiSearch, FiCheck, FiLoader, FiShield } from "react-icons/fi";

// --- BASE DE DATOS DE ACTIVOS ---
const ASSETS = [
  { id: 1, name: "Neo-Tokyo Plot #882", area: "Decentraland", value: "4.2 ETH", usd: "$10,240.00", category: "Land", image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000", coordinates: "40.4°N 3.7°W" },
  { id: 2, name: "Zelloh HQ Penthouse", area: "The Sandbox", value: "12,500 SAND", usd: "$8,450.00", category: "Building", image: "https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?q=80&w=1000", coordinates: "12.8°S 45.1°E" },
  { id: 3, name: "Hyper-Blade V2", area: "Somnium Space", value: "0.8 ETH", usd: "$1,950.00", category: "Wearable", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000", coordinates: "N/A - INSTANCED" },
  { id: 4, name: "Cyber-Nexus Node", area: "Otherside", value: "2.5 APE", usd: "$3,120.00", category: "Utility", image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1000", coordinates: "88.1°N 0.5°W" },
];

export default function MetaverseDashboard() {
  const [selectedAsset, setSelectedAsset] = useState(ASSETS[0]);
  const [isBridging, setIsBridging] = useState(false);
  const [bridgeComplete, setBridgeComplete] = useState(false);
  const [filter, setFilter] = useState("All");

  const filteredAssets = filter === "All" ? ASSETS : ASSETS.filter(a => a.category === filter);

  // Simulación de proceso de Bridge (Transferencia)
  const handleBridge = () => {
    setIsBridging(true);
    setTimeout(() => {
      setIsBridging(false);
      setBridgeComplete(true);
      setTimeout(() => setBridgeComplete(false), 3000);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 md:p-12 font-sans selection:bg-[#E6F379] selection:text-black overflow-x-hidden">
      
      {/* 1. SISTEMA DE FILTRADO TÁCTICO */}
      <nav className="flex flex-wrap gap-4 mb-16 border-b border-white/5 pb-8">
        {["All", "Land", "Building", "Wearable", "Utility"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-[#E6F379] text-black' : 'bg-white/5 text-zinc-500 hover:text-white'}`}
          >
            {cat}
          </button>
        ))}
      </nav>

      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-20 gap-12">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#E6F379] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Multiverse Asset Management</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-[1000] tracking-tighter italic uppercase leading-[0.8]">
            Estate<br />Vault<span className="text-[#E6F379]">.</span>
          </h1>
        </motion.div>

        <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/10 flex items-center gap-8 backdrop-blur-xl">
          <div>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Portfolio Value</p>
            <p className="text-3xl font-[1000] italic">$23,760.00</p>
          </div>
          <div className="w-[1px] h-12 bg-white/10" />
          <button className="bg-[#E6F379] text-black w-14 h-14 rounded-2xl flex items-center justify-center hover:rotate-90 transition-transform duration-500">
            <FiPlus size={24} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* 2. VISOR DE PROPIEDAD (INTERACTIVO) */}
        <div className="lg:col-span-8 space-y-12">
          <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img 
                key={selectedAsset.id}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.8 }}
                src={selectedAsset.image} 
                className="w-full h-full object-cover grayscale brightness-50"
              />
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            
            {/* DATA OVERLAYS */}
            <div className="absolute top-8 left-8 flex gap-4">
              <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                <p className="text-[8px] font-black text-zinc-500 uppercase">Coord_Stream</p>
                <p className="text-xs font-mono text-[#E6F379]">{selectedAsset.coordinates}</p>
              </div>
            </div>

            <div className="absolute bottom-10 left-10">
              <motion.div initial={{ x: -20 }} animate={{ x: 0 }} className="space-y-2">
                <span className="bg-[#E6F379] text-black px-4 py-1 text-[10px] font-[1000] uppercase italic tracking-widest">
                  {selectedAsset.area}
                </span>
                <h2 className="text-5xl md:text-7xl font-[1000] uppercase italic tracking-tighter leading-none">
                  {selectedAsset.name}
                </h2>
              </motion.div>
            </div>
          </div>

          {/* GRID DE ACTIVOS FILTRADOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredAssets.map((asset) => (
              <motion.div 
                key={asset.id}
                layout
                onClick={() => setSelectedAsset(asset)}
                className={`group p-8 rounded-[2.5rem] border transition-all cursor-pointer relative overflow-hidden ${selectedAsset.id === asset.id ? 'bg-[#E6F379] border-[#E6F379]' : 'bg-zinc-950 border-white/5 hover:border-white/20'}`}
              >
                <div className={`relative z-10 ${selectedAsset.id === asset.id ? 'text-black' : 'text-white'}`}>
                  <FiBox className={`mb-6 text-2xl ${selectedAsset.id === asset.id ? 'text-black' : 'text-[#E6F379]'}`} />
                  <h3 className="font-black uppercase italic tracking-tighter text-lg leading-none mb-1">{asset.name}</h3>
                  <p className="text-[10px] font-bold opacity-60 uppercase">{asset.value}</p>
                </div>
                {selectedAsset.id === asset.id && (
                  <motion.div layoutId="active-bg" className="absolute inset-0 bg-[#E6F379]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3. TERMINAL DE OPERACIONES */}
        <div className="lg:col-span-4 space-y-8">
          
          <div className="bg-zinc-900/30 border border-white/5 p-10 rounded-[3rem] backdrop-blur-2xl">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-3">
                <FiActivity className="text-[#E6F379]" /> Operations
              </h3>
              <span className="text-[10px] font-mono text-zinc-500">0x882_AUTH</span>
            </div>
            
            <div className="space-y-8">
              <DataRow label="Asset Valuation" value={selectedAsset.usd} />
              <DataRow label="Market Demand" value="HIGH" color="#E6F379" />
              <DataRow label="Taxes / Gas" value="0.002 ETH" />
              
              <div className="pt-6">
                <button 
                  onClick={handleBridge}
                  disabled={isBridging}
                  className={`w-full py-6 rounded-2xl font-[1000] uppercase text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-4 ${bridgeComplete ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-[#E6F379]'}`}
                >
                  {isBridging ? (
                    <>Processing... <FiLoader className="animate-spin" /></>
                  ) : bridgeComplete ? (
                    <>Success <FiCheck /></>
                  ) : (
                    <>Bridge to Card <FiArrowUpRight /></>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#E6F379] p-12 rounded-[3.5rem] text-black relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-125 transition-transform duration-1000">
              <FiZap size={250} />
            </div>
            <div className="relative z-10">
              <h4 className="text-4xl font-[1000] uppercase italic tracking-tighter leading-[0.85] mb-6">Neural<br />Sync_</h4>
              <p className="text-[10px] font-black uppercase leading-relaxed mb-10 max-w-[200px]">
                Sincroniza tus activos con el Zelloh Neural Shield para protección contra hacks de contrato.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-[#E6F379]">
                  <FiShield />
                </div>
                <span className="text-xs font-black uppercase tracking-widest italic">Shield Active</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// COMPONENTES AUXILIARES FUNCIONALES
function DataRow({ label, value, color = "white" }: any) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-4">
      <span className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em]">{label}</span>
      <span className="text-lg font-black italic tracking-tighter" style={{ color }}>{value}</span>
    </div>
  );
}