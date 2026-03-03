"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  FiChevronDown, FiSearch, FiGlobe, FiZap, 
  FiTrendingUp, FiPocket, FiAward, FiCpu, FiTarget, FiLayers, FiActivity
} from "react-icons/fi";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// --- COMPONENTE: TITAN MODULE (El nuevo estándar de contenedores) ---
const TitanModule = ({ children, className = "", spotlight = false }: any) => (
  <div className={`relative backdrop-blur-3xl bg-white/[0.01] border border-white/5 rounded-[4rem] overflow-hidden ${className}`}>
    {spotlight && (
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E6F379]/50 to-transparent" />
    )}
    {children}
  </div>
);

export default function EarnQuantumUltimate() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Efectos de paralaje y rotación para el "Core"
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main ref={containerRef} className="bg-[#000] min-h-screen text-white font-sans selection:bg-[#E6F379] selection:text-black overflow-x-hidden">
      <Header />
      
      {/* --- ATMOSPHERE ENGINE --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#E6F379]/5 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#4D1BDB]/5 blur-[180px] rounded-full" />
      </div>

      {/* --- HERO: KINETIC INJECTION --- */}
      <section className="relative z-10 pt-56 pb-40 px-6 md:px-20 lg:px-32 max-w-[1800px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 text-[10px] font-[1000] text-[#E6F379] uppercase tracking-[0.6em]"
            >
              <FiLayers className="text-lg" /> Liquidity_Mining_Protocol
            </motion.div>
            
            <h1 className="text-8xl md:text-[11rem] font-[1000] italic uppercase leading-[0.75] tracking-tighter">
              FUEL_THE<br />
              <span className="text-outline-godtier">ENGINE.</span>
            </h1>
            
            <p className="text-zinc-500 text-2xl font-medium leading-tight max-w-lg italic border-l border-white/10 pl-8">
              Convert your market activity into <span className="text-white">Pure Equity</span>. High-yield incentives for the next generation of NFT traders.
            </p>

            <div className="flex flex-wrap gap-8">
              <button className="group relative px-16 py-8 bg-white text-black rounded-full font-[1000] uppercase italic text-xl overflow-hidden transition-transform active:scale-95">
                <span className="relative z-10 flex items-center gap-4">Start_Earning <FiZap /></span>
                <div className="absolute inset-0 bg-[#E6F379] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
              <button className="px-16 py-8 bg-transparent border border-white/10 rounded-full font-[1000] uppercase italic text-xl hover:bg-white/5 transition-all">
                Documentation
              </button>
            </div>
          </div>

          {/* THE CORE VISUALIZER */}
          <div className="relative flex items-center justify-center">
             <motion.div style={{ rotate }} className="relative w-[500px] h-[500px]">
                <div className="absolute inset-0 border border-white/5 rounded-[4rem]" />
                <div className="absolute inset-10 border border-[#E6F379]/20 rounded-[3.5rem] border-dashed" />
                <div className="absolute inset-24 border border-white/10 rounded-full" />
             </motion.div>
             <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="w-40 h-40 bg-[#E6F379] rounded-full blur-[100px] opacity-20" 
                />
                <FiActivity size={120} className="text-[#E6F379] relative z-10 opacity-80" strokeWidth={1} />
             </div>
          </div>
        </div>
      </section>

      {/* --- LIVE STATS HUB --- */}
      <section className="relative z-10 px-6 md:px-20 lg:px-32 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* User Performance */}
          <TitanModule spotlight className="lg:col-span-2 p-16 space-y-16">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em]">Active_Yield_Session</h4>
                <div className="text-6xl font-[1000] italic">0.00 <span className="text-[#E6F379] text-2xl uppercase not-italic">Points</span></div>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl text-right">
                <span className="text-[9px] font-black text-zinc-500 uppercase block mb-1">Estimated_Payout</span>
                <div className="text-3xl font-[1000] italic text-[#E6F379]">0.00 $ZLLH</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/5">
              {[
                { l: "Multiplier", v: "1.0x" },
                { l: "Ranking", v: "#--" },
                { l: "Uptime", v: "100%" },
                { l: "Status", v: "Standby" }
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[9px] font-black text-zinc-700 uppercase mb-1">{item.l}</p>
                  <p className="text-xl font-black italic">{item.v}</p>
                </div>
              ))}
            </div>
          </TitanModule>

          {/* Wallet Actions */}
          <TitanModule className="p-16 flex flex-col justify-between bg-zinc-950/50">
             <div className="space-y-6">
               <FiPocket size={40} className="text-[#E6F379]" />
               <h3 className="text-4xl font-[1000] italic uppercase leading-none">Vault_<br />Control.</h3>
             </div>
             <div className="space-y-4">
                <button className="w-full py-6 bg-white text-black rounded-3xl font-[1000] uppercase italic tracking-tighter hover:bg-[#E6F379] transition-colors">Connect_Mainframe</button>
                <button className="w-full py-6 bg-white/5 border border-white/10 rounded-3xl font-[1000] uppercase italic text-sm">View_Ledger</button>
             </div>
          </TitanModule>
        </div>
      </section>

      {/* --- NETWORK DOSSIER: THE BANNER --- */}
      <section className="relative z-10 px-6 md:px-20 lg:px-32 mb-40">
        <TitanModule className="p-24 text-center group">
          <div className="absolute inset-0 bg-gradient-to-b from-[#E6F379]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative z-10 space-y-12">
             <div className="inline-block p-4 bg-[#E6F379]/10 rounded-2xl mb-4">
                <FiAward size={40} className="text-[#E6F379]" />
             </div>
             <h2 className="text-6xl md:text-9xl font-[1000] italic uppercase tracking-tighter leading-[0.8]">
               PHASE_04<br />
               DEVOURED.
             </h2>
             <p className="text-zinc-500 font-bold uppercase tracking-[0.5em] text-xs">
               333,000 $ZELLOH distributed // Network Integrity Verified
             </p>
             <div className="pt-6">
               <button className="px-12 py-5 bg-white text-black rounded-full font-[1000] uppercase italic text-lg hover:scale-110 transition-transform">
                 Join_Discussion_05
               </button>
             </div>
          </div>
        </TitanModule>
      </section>

      {/* --- LEADERBOARD: QUANTUM GRID --- */}
      <section className="relative z-10 px-6 md:px-20 lg:px-32 max-w-[1800px] mx-auto pb-64">
        <div className="flex items-center gap-8 mb-16">
           <h2 className="text-5xl font-[1000] italic uppercase tracking-tighter">Leaderboard_</h2>
           <div className="h-px flex-grow bg-white/5" />
           <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">Awaiting_Genesis</span>
        </div>

        <TitanModule className="min-h-[600px] flex items-center justify-center relative">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <div className="relative z-10 text-center space-y-12">
            <div className="space-y-4">
              <h3 className="text-5xl font-[1000] italic uppercase tracking-tighter text-zinc-800">No_Active_Nodes</h3>
              <p className="text-zinc-600 max-w-sm mx-auto font-black uppercase text-[9px] tracking-[0.4em] leading-loose">
                The current epoch has finished. Please vote on the next proposal to re-activate reward streams.
              </p>
            </div>
            <button className="px-16 py-7 bg-transparent border-2 border-zinc-800 text-zinc-800 rounded-full font-[1000] uppercase italic text-xl hover:border-[#E6F379] hover:text-[#E6F379] transition-all">
              Initialize_Vote_Cycle
            </button>
          </div>
        </TitanModule>
      </section>

      <Footer />

      <style jsx global>{`
        .text-outline-godtier {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
          color: transparent;
        }
      `}</style>
    </main>
  );
}