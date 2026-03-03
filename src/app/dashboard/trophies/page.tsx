"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiPlus, FiUsers, FiInfo, FiArrowRight, 
  FiShare2, FiZap, FiAward, FiShield, FiX, FiCheck
} from "react-icons/fi";
import { RiAppleFill, RiGooglePlayFill } from "react-icons/ri";

// --- TIPOS ---
interface Trophy {
  id: string;
  emoji: string;
  title: string;
  desc: string;
  status: "unlocked" | "locked";
  rarity: "Common" | "Epic" | "Legendary";
  date?: string;
  progress?: number;
}

export default function TrophyPassPage() {
  const [selectedTrophy, setSelectedTrophy] = useState<Trophy | null>(null);
  
  const trophies: Trophy[] = [
    { id: "1", emoji: "🍩", title: "Donut de Bienvenida", desc: "Huele bien, ¡pero no lo muerdas! Tu primer paso.", status: "unlocked", rarity: "Common", date: "FEB 2026" },
    { id: "2", emoji: "🤑", title: "Zeller Master", desc: "Alcanza el nivel Zeller invitando a 10 amigos.", status: "locked", rarity: "Epic", progress: 15 },
    { id: "3", emoji: "🔑", title: "Maze Ambassador", desc: "Llave maestra para accesos anticipados.", status: "locked", rarity: "Legendary" },
    { id: "4", emoji: "🛡️", title: "Early Protector", desc: "Verifica tu identidad antes del primer mes.", status: "unlocked", rarity: "Epic", date: "ENE 2026" },
    { id: "5", emoji: "💎", title: "Zelloh Whale", desc: "Mantén un balance de +1000 ZLL por 30 días.", status: "locked", rarity: "Legendary" },
    { id: "6", emoji: "🔥", title: "Zelloh Streaks", desc: "Entra 7 días seguidos al dashboard.", status: "unlocked", rarity: "Common", date: "HOY" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 pb-32 p-4 md:p-8">
      
      {/* HEADER DE ESTADO */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-900 pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-6xl font-[1000] uppercase italic tracking-tighter text-white">Trophy_Pass</h1>
            <div className="bg-[#E6F379] text-black text-[10px] font-black px-4 py-1 rounded-full uppercase italic animate-pulse">
              Level: Newbie 💚
            </div>
          </div>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-[0.3em]">
            Desbloquea logros exclusivos y canjealos por beneficios en el mundo real.
          </p>
        </div>

        <div className="flex items-center gap-8 bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800">
          <StatMini label="Trofeos" val="3 / 12" />
          <div className="w-[1px] h-10 bg-zinc-800" />
          <StatMini label="Ranking" val="#1,204" />
          <div className="w-[1px] h-10 bg-zinc-800" />
          <StatMini label="Liga" val="Bronze" />
        </div>
      </header>

      {/* GRID DE TROFEOS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {trophies.map((trophy) => (
          <TrophyTicket 
            key={trophy.id} 
            trophy={trophy} 
            onAdd={() => setSelectedTrophy(trophy)} 
          />
        ))}
      </section>

      {/* MODAL DE PREVIEW ESTILO WALLET */}
      <AnimatePresence>
        {selectedTrophy && (
          <WalletPreviewModal 
            trophy={selectedTrophy} 
            onClose={() => setSelectedTrophy(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTES ---

function TrophyTicket({ trophy, onAdd }: { trophy: Trophy; onAdd: () => void }) {
  const isLocked = trophy.status === "locked";
  
  const rarityColors = {
    Common: "border-zinc-800 text-zinc-500",
    Epic: "border-blue-500 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]",
    Legendary: "border-yellow-400 text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.2)]"
  };

  return (
    <motion.div 
      layoutId={trophy.id}
      whileHover={{ y: -10 }}
      className={`group relative flex flex-col h-[400px] rounded-[2.5rem] border overflow-hidden transition-all ${
        isLocked ? 'bg-zinc-950 border-zinc-900' : 'bg-zinc-900 border-zinc-800 cursor-pointer'
      }`}
    >
      <div className={`h-1/2 flex items-center justify-center relative bg-gradient-to-b from-white/5 to-transparent`}>
        <span className={`text-7xl transition-all duration-500 ${isLocked ? 'grayscale blur-md opacity-20' : 'group-hover:scale-110 drop-shadow-2xl'}`}>
          {trophy.emoji}
        </span>
        <div className="absolute top-6 right-6">
          <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md border ${rarityColors[trophy.rarity]}`}>
            {trophy.rarity}
          </span>
        </div>
        {/* Perforación de ticket */}
        <div className="absolute -bottom-3 left-0 right-0 flex justify-between z-20">
          <div className="w-6 h-6 bg-[#050505] rounded-full -ml-3 border-r border-zinc-900" />
          <div className="w-6 h-6 bg-[#050505] rounded-full -mr-3 border-l border-zinc-900" />
        </div>
      </div>

      <div className="p-6 flex flex-col justify-between flex-grow">
        <div className="space-y-2">
          <h3 className={`font-[1000] uppercase italic tracking-tighter ${isLocked ? 'text-zinc-700' : 'text-white text-lg'}`}>
            {trophy.title}
          </h3>
          <p className="text-[10px] text-zinc-500 font-bold uppercase leading-tight">
            {trophy.desc}
          </p>
        </div>

        {isLocked ? (
          <div className="space-y-2">
            <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
              <div className="h-full bg-zinc-800" style={{ width: `${trophy.progress || 0}%` }} />
            </div>
            <p className="text-[8px] font-black text-zinc-700 uppercase">BLOQUEADO</p>
          </div>
        ) : (
          <button 
            onClick={(e) => { e.stopPropagation(); onAdd(); }}
            className="w-full py-3 bg-white text-black rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#E6F379] transition-colors flex items-center justify-center gap-2"
          >
            <FiPlus /> Añadir a Billetera
          </button>
        )}
      </div>
    </motion.div>
  );
}

function WalletPreviewModal({ trophy, onClose }: { trophy: Trophy; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ scale: 0.9, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 50, opacity: 0 }}
        className="relative w-full max-w-[380px] z-10"
      >
        <button onClick={onClose} className="absolute -top-12 right-0 text-white/50 hover:text-white"><FiX size={24}/></button>
        
        {/* APPLE WALLET TICKET DESIGN */}
        <div className="bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-zinc-800">
          <div className="bg-[#E6F379] p-6 flex justify-between items-center">
            <span className="text-black font-black italic text-xl tracking-tighter">zelloh_</span>
            <span className="text-[10px] text-black font-black uppercase tracking-widest">Trophy Pass</span>
          </div>
          
          <div className="p-8 space-y-8">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-[8px] font-black uppercase text-zinc-500">Logro Desbloqueado</p>
                <h4 className="text-2xl font-[1000] uppercase italic tracking-tighter">{trophy.title}</h4>
              </div>
              <span className="text-5xl">{trophy.emoji}</span>
            </div>

            <div className="grid grid-cols-2 gap-6 border-y border-zinc-800 py-6">
              <TicketInfo label="Nivel" val="Legendary" />
              <TicketInfo label="Serial No." val={`#Z-00${trophy.id}992`} />
              <TicketInfo label="Titular" val="RICARDO M." />
              <TicketInfo label="Fecha" val={trophy.date || "FEB 2026"} />
            </div>

            <div className="flex flex-col items-center gap-4 py-4">
              <div className="bg-white p-3 rounded-2xl">
                {/* Simulador de QR */}
                <div className="w-32 h-32 bg-black flex flex-wrap p-1">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className={`w-1/4 h-1/4 border border-zinc-900 ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`} />
                  ))}
                </div>
              </div>
              <p className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.4em]">Z-TRACKER-AUTH</p>
            </div>
          </div>
        </div>

        {/* BOTONES DE ACCIÓN REAL */}
        <div className="mt-8 space-y-3">
          <button className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:scale-105 transition-transform">
            <RiAppleFill size={18} /> Add to Apple Wallet
          </button>
          <button className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 border border-zinc-800">
            <RiGooglePlayFill size={18} /> Add to Google Pay
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function StatMini({ label, val }: { label: string; val: string }) {
  return (
    <div className="text-center">
      <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{label}</p>
      <p className="text-white font-[1000] uppercase text-xl italic tracking-tighter">{val}</p>
    </div>
  );
}

function TicketInfo({ label, val }: { label: string; val: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[8px] font-black uppercase text-zinc-600">{label}</p>
      <p className="text-xs font-black uppercase text-white">{val}</p>
    </div>
  );
}