"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiPlus, FiUsers, FiInfo, FiArrowRight, 
  FiShare2, FiZap, FiAward, FiShield, FiX, FiCheck, FiPocket
} from "react-icons/fi";
import { 
  IoTrophy, IoStar, IoDiamond, IoWallet, 
  IoShareSocial, IoCalculator, IoPulse, IoLink, IoRocket, IoLayers, IoClose, IoCashOutline, IoShieldCheckmark
} from "react-icons/io5";
import { RiAppleFill, RiGooglePlayFill } from "react-icons/ri";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JoinModal } from "@/components/sections/JoinModal";

// --- TIPOS ---
interface TrophyDetail {
  emoji: string;
  title: string;
  desc: string;
  rarity: "Common" | "Epic" | "Legendary";
  reward: string;
}

export default function TrophyPassInfoPage() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [activePreview, setActivePreview] = useState<TrophyDetail | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleOpenJoin = () => {
    setIsJoinModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  if (!mounted) return <div className="bg-[#020202] min-h-screen" />;

  const showcaseTrophies: TrophyDetail[] = [
    { emoji: "🍩", title: "Donut Welcome", desc: "Se otorga al verificar tu primera cuenta.", rarity: "Common", reward: "Status: Newbie" },
    { emoji: "🤑", title: "Zeller Master", desc: "Invita a 9 amigos y activa el protocolo ZLL.", rarity: "Epic", reward: "Fee: -25%" },
    { emoji: "💎", title: "Whale Badge", desc: "Mantén actividad constante por 90 días.", rarity: "Legendary", reward: "Profit: 80%" },
  ];

  return (
    <main className="bg-[#020202] text-white min-h-screen w-full font-sans selection:bg-[#E6F379] selection:text-black overflow-x-hidden">
      <Header />

      {/* --- HERO SECTION: EL PASAPORTE AL ÉXITO --- */}
      <section className="max-w-7xl mx-auto px-6 pt-32 md:pt-48 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 rounded-full mb-8">
              <span className="w-2 h-2 bg-[#E6F379] rounded-full animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Manual de Recompensas v2.0</span>
            </div>
            
            <h1 className="text-6xl md:text-[8.5rem] font-[1000] italic uppercase tracking-tighter leading-[0.85] mb-8">
              GAMIFICA_ <br />
              <span className="text-[#E6F379]">TU DINERO_</span>
            </h1>
            
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs md:text-sm max-w-lg leading-relaxed mb-10">
              Bienvenido al Trophy Pass de Zelloh. No es solo un sistema de logros; es un protocolo de crecimiento financiero donde cada badge desbloquea beneficios reales, comisiones más bajas y participación en ganancias.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleOpenJoin}
                className="bg-white text-black px-10 py-5 rounded-2xl font-[1000] uppercase text-xs hover:bg-[#E6F379] transition-all flex items-center justify-center gap-3 hover:scale-105 active:scale-95"
              >
                <IoWallet size={18} /> OBTENER MI PASSE GRATIS
              </button>
              <div className="flex -space-x-3 items-center">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800" />
                ))}
                <span className="pl-6 text-[10px] font-black text-zinc-500 uppercase">+12K USUARIOS ACTIVOS</span>
              </div>
            </div>
          </motion.div>

          {/* VISUAL: EL TICKET DINÁMICO */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 bg-[#E6F379]/10 blur-[120px] rounded-full" />
            <TrophyStaticTicket />
          </motion.div>
        </div>
      </section>

      {/* --- INFO BARS: LOS NÚMEROS --- */}
      <section className="border-y border-zinc-900 bg-zinc-950/50 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatBox label="Recompensa Total" val="$400.00" sub="Al completar vitrina" />
          <StatBox label="Max. Profit Share" val="80%" sub="Nivel Diamante" />
          <StatBox label="Trophys Totales" val="+50" sub="Badges verificados" />
          <StatBox label="Partner Fee" val="0.00%" sub="Para Zeller Elite" />
        </div>
      </section>

      {/* --- SECTION: RANKING DE ESTRELLAS (EXPLICATIVO) --- */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="text-[10px] font-black text-[#E6F379] uppercase tracking-[0.5em] mb-4 block">Calculadora de Impacto</span>
            <h2 className="text-5xl md:text-7xl font-[1000] italic uppercase tracking-tighter leading-none">
              RANKING DE <br /><span className="text-zinc-700">RESEÑAS_</span>
            </h2>
          </div>
          <p className="text-zinc-500 font-bold uppercase text-[10px] max-w-xs text-right hidden md:block">
            Tu reputación en Zelloh se traduce directamente en ingresos adicionales. A más estrellas, mayor el multiplicador de tus servicios.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-4">
            <RankingRow stars="1 ⭐️" likes="25 Likes" perk="PayPal Secure Pay" level="Básico" />
            <RankingRow stars="3 ⭐️⭐️⭐️" likes="70 Likes" perk="Bitcoin Secure Pay" level="Pro" active />
            <RankingRow stars="5 ⭐️⭐️⭐️⭐️⭐️" likes="+100 Likes" perk="Tarifa Master +100%" level="Titán" />
          </div>

          <div className="lg:col-span-5 bg-white text-black p-10 rounded-[3rem] flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
              <IoCalculator size={120} />
            </div>
            <div>
              <h4 className="text-3xl font-[1000] italic uppercase leading-none mb-10">SIMULACIÓN <br />DE GANANCIAS_</h4>
              <div className="space-y-6">
                <CalcLine label="Tarifa Base" val="$17.00" />
                <CalcLine label="Nivel 4 Estrellas (+50%)" val="+$8.50" color="text-blue-600" />
                <div className="h-[2px] bg-black/10 w-full" />
                <div className="flex justify-between items-end">
                  <span className="font-black uppercase text-xs">Total por Servicio</span>
                  <span className="text-4xl font-[1000] italic">$25.50</span>
                </div>
              </div>
            </div>
            <button onClick={handleOpenJoin} className="mt-12 w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] transition-transform">
              QUIERO ESTE NIVEL
            </button>
          </div>
        </div>
      </section>

      {/* --- SECTION: EL SISTEMA DE TICKETS (VISUAL) --- */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-zinc-900">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-8xl font-[1000] italic uppercase tracking-tighter mb-6">MUESTRA TU <span className="text-[#E6F379]">PODER_</span></h2>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Añade tus logros a tu Apple Wallet o Google Pay y úsalos como prueba de estatus.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {showcaseTrophies.map((t, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -20 }}
              onClick={() => setActivePreview(t)}
              className="cursor-pointer"
            >
              <div className="bg-zinc-900 rounded-[3rem] p-8 border border-zinc-800 hover:border-[#E6F379]/40 transition-all">
                <div className="flex justify-between items-start mb-12">
                   <span className="text-6xl">{t.emoji}</span>
                   <span className="bg-zinc-800 text-zinc-400 text-[8px] font-black px-3 py-1 rounded-full uppercase">{t.rarity}</span>
                </div>
                <h3 className="text-2xl font-[1000] uppercase italic mb-2">{t.title}</h3>
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-8">{t.desc}</p>
                <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[#E6F379] font-black text-[10px] uppercase">{t.reward}</span>
                  <FiPlus className="text-zinc-700" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="max-w-7xl mx-auto px-6 py-40 text-center">
        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ repeat: Infinity, duration: 3 }}
          className="inline-block mb-10"
        >
          <IoRocket size={80} className="text-[#E6F379]" />
        </motion.div>
        <h2 className="text-6xl md:text-[9rem] font-[1000] italic uppercase tracking-tighter leading-[0.8] mb-12">
          LISTO PARA <br /> <span className="text-zinc-800">EL SIGUIENTE_</span> <br /> NIVEL?
        </h2>
        <button 
          onClick={handleOpenJoin}
          className="bg-[#E6F379] text-black px-16 py-8 rounded-full font-[1000] italic text-2xl uppercase hover:scale-110 transition-transform shadow-[0_0_50px_rgba(230,243,121,0.2)]"
        >
          ACTIVAR TROPHY PASS
        </button>
      </section>

      <Footer />

      {/* MODAL DE PREVIEW (SISTEMA WALLET) */}
      <AnimatePresence>
        {activePreview && (
          <WalletPreviewModal 
            trophy={activePreview} 
            onClose={() => setActivePreview(null)} 
            onJoin={handleOpenJoin}
          />
        )}
      </AnimatePresence>

      <JoinModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </main>
  );
}

// --- SUB-COMPONENTES INTERNOS ---

function TrophyStaticTicket() {
  return (
    <div className="w-[320px] md:w-[380px] bg-zinc-900 rounded-[3rem] border border-zinc-800 overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
      <div className="bg-[#E6F379] p-6 flex justify-between items-center">
        <span className="text-black font-black italic text-2xl tracking-tighter">zelloh_</span>
        <div className="flex gap-1">
          {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 bg-black rounded-full" />)}
        </div>
      </div>
      <div className="p-10 space-y-10">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[8px] font-black text-zinc-500 uppercase mb-1">Status de Usuario</p>
            <h4 className="text-3xl font-[1000] italic uppercase tracking-tighter">MAESTRO_</h4>
          </div>
          <span className="text-6xl drop-shadow-lg">🏆</span>
        </div>
        <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5">
          <TicketData label="Rango" val="Elite Diamond" />
          <TicketData label="Servicios" val="500+" />
          <TicketData label="País" val="Internacional" />
          <TicketData label="ID" val="#Z-88291" />
        </div>
        <div className="flex justify-center opacity-30 grayscale">
          <div className="w-full h-12 bg-zinc-800 rounded flex items-center justify-around px-4">
             {[...Array(20)].map((_, i) => (
               <div key={i} className={`w-1 bg-zinc-600 ${i % 3 === 0 ? 'h-8' : 'h-4'}`} />
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WalletPreviewModal({ trophy, onClose, onJoin }: { trophy: any, onClose: any, onJoin: any }) {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
      <motion.div 
        initial={{ y: 100, opacity: 0, scale: 0.9 }} 
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-[400px]"
      >
        <button onClick={onClose} className="absolute -top-16 right-0 text-white/50 hover:text-white"><FiX size={32}/></button>
        
        <div className="bg-zinc-900 rounded-[3rem] overflow-hidden border border-zinc-800 shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
          <div className="bg-[#E6F379] p-6 flex justify-between items-center text-black">
            <span className="font-[1000] italic text-xl">zelloh_</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Trophy Pass</span>
          </div>
          <div className="p-10 space-y-10">
            <div className="flex justify-between items-center">
              <h4 className="text-4xl font-[1000] uppercase italic tracking-tighter">{trophy.title}</h4>
              <span className="text-6xl">{trophy.emoji}</span>
            </div>
            <div className="grid grid-cols-2 gap-6 py-6 border-y border-zinc-800">
               <TicketData label="Rareza" val={trophy.rarity} />
               <TicketData label="Serial" val="#Z-TMP-001" />
               <TicketData label="Beneficio" val={trophy.reward} />
               <TicketData label="Expiración" val="Nunca" />
            </div>
            <div className="flex flex-col items-center gap-4">
               <div className="p-4 bg-white rounded-3xl">
                  <div className="w-32 h-32 bg-zinc-100 flex items-center justify-center">
                    <IoTrophy className="text-black text-6xl opacity-20" />
                  </div>
               </div>
               <p className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.5em]">AUTH_REQUIRED_TO_GENERATE</p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <p className="text-center text-zinc-500 text-[10px] font-black uppercase mb-4 tracking-widest">Regístrate para exportar este badge</p>
          <button onClick={() => { onClose(); onJoin(); }} className="w-full bg-white text-black py-5 rounded-[2rem] font-black uppercase text-xs flex items-center justify-center gap-3 hover:bg-[#E6F379] transition-all">
            <RiAppleFill size={20} /> Crear mi cuenta ahora
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function StatBox({ label, val, sub }: any) {
  return (
    <div className="text-center md:text-left">
      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-3xl md:text-5xl font-[1000] italic uppercase text-[#E6F379] tracking-tighter">{val}</p>
      <p className="text-[8px] font-bold text-zinc-700 uppercase mt-1">{sub}</p>
    </div>
  );
}

function RankingRow({ stars, likes, perk, level, active }: any) {
  return (
    <div className={`p-6 md:p-8 rounded-3xl border transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${active ? 'bg-[#E6F379]/10 border-[#E6F379] scale-[1.02]' : 'bg-zinc-950 border-white/5 opacity-50'}`}>
      <div>
        <span className="text-xl font-[1000] italic text-[#E6F379]">{stars}</span>
        <span className="ml-4 text-[10px] font-black text-zinc-600 uppercase">{likes} VERIFICADOS</span>
      </div>
      <div className="text-left md:text-right">
        <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">{level} STATUS</p>
        <p className="text-sm md:text-lg font-[1000] italic uppercase tracking-tighter">{perk}</p>
      </div>
    </div>
  );
}

function CalcLine({ label, val, color = "text-black" }: any) {
  return (
    <div className="flex justify-between items-center text-[10px] font-black uppercase">
      <span className="opacity-40">{label}</span>
      <span className={color}>{val}</span>
    </div>
  );
}

function TicketData({ label, val }: any) {
  return (
    <div>
      <p className="text-[8px] font-black text-zinc-600 uppercase mb-1 tracking-tighter">{label}</p>
      <p className="text-xs font-black uppercase text-white">{val}</p>
    </div>
  );
}