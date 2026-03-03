"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  FiHeart, FiLink, FiBookmark, FiRotateCcw, FiChevronDown, 
  FiArrowUp, FiBell, FiSearch, FiGlobe, FiCommand, FiActivity, FiCpu, FiTerminal, FiHash
} from "react-icons/fi";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// --- COMPONENTE: GLASS MODULE ---
const GlassModule = ({ children, className = "" }: any) => (
  <div className={`backdrop-blur-3xl bg-white/[0.02] border border-white/10 rounded-[3rem] overflow-hidden ${className}`}>
    {children}
  </div>
);

export default function ProposalDetailGodTier() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <main ref={containerRef} className="bg-[#000] min-h-screen text-white font-sans selection:bg-[#E6F379] selection:text-black overflow-x-hidden">
      <Header />
      
      {/* --- HUD DE LECTURA (Progress Bar) --- */}
      <motion.div 
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-[#E6F379] origin-left z-[110] shadow-[0_0_20px_#E6F379]"
      />

      {/* --- BACKGROUND ATMOSPHERE --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay" />
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-[#4D1BDB]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-[#E6F379]/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 pt-48 pb-32 px-6 md:px-12 lg:px-24 flex flex-col xl:flex-row gap-16 max-w-[1800px] mx-auto">
        
        {/* --- MAIN CONTENT: THE DOSSIER --- */}
        <div className="flex-1 space-y-16">
          
          {/* Header de la Propuesta */}
          <header className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 text-[10px] font-black text-[#E6F379] uppercase tracking-[0.5em]"
            >
              <FiTerminal className="text-lg" /> Protocol_Dossier / {<span className="text-white/40">ID_74920</span>}
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-[1000] italic uppercase leading-[0.85] tracking-tighter max-w-5xl">
              $Zelloh Rewards: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600">Phase_04 Completion_</span>
            </h1>

            {/* Author Block Estilo "Intel" */}
            <div className="flex flex-col md:flex-row items-center gap-6 p-10 bg-white/[0.03] border border-white/10 rounded-[3.5rem] backdrop-blur-md">
              <div className="w-20 h-20 rounded-full bg-zinc-900 border border-white/20 p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-zinc-400 to-black overflow-hidden relative">
                   <div className="absolute inset-0 flex items-center justify-center font-black italic text-2xl">Z</div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="text-2xl font-[1000] italic uppercase tracking-tight">ZELLOH.Foundation</div>
                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em] flex items-center justify-center md:justify-start gap-2 mt-2">
                  <FiCpu className="text-[#E6F379]" /> Core_Infrastructure_Node <FiHash className="ml-2" /> Verified
                </div>
              </div>
              <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10">
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block mb-2">Ledger_Status</span>
                <div className="text-[#E6F379] font-[1000] italic text-xl uppercase animate-pulse">IMMUTABLE_</div>
              </div>
            </div>
          </header>

          {/* Body Content */}
          <article className="space-y-12">
            <div className="text-2xl md:text-3xl italic text-white/90 font-medium leading-tight border-l-8 border-[#4D1BDB] pl-10 py-4 bg-gradient-to-r from-[#4D1BDB]/5 to-transparent rounded-r-3xl">
              "Today marks the final synchronization of the $ZELLOH Rewards program. A 4-week tactical sprint with 420,000 $ZELLOH successfully distributed."
            </div>

            <div className="prose prose-invert max-w-none text-zinc-400 text-lg leading-relaxed">
              <p>
                Our objective with Phase 04 was to stress-test the liquidity injection protocols under high-volatility conditions. 
                The data collected suggests a <span className="text-white font-bold">14.2% increase</span> in long-term node retention. 
                We are now requesting feedback on the next distribution cycle.
              </p>
            </div>

            {/* Futuristic GMV Chart (Oscilloscope Style) */}
            <GlassModule className="p-12 relative overflow-hidden group">
              <div className="flex justify-between items-center mb-16">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#E6F379] mb-4">Metric_Oscilloscope</h4>
                  <div className="flex gap-8">
                    <div className="flex items-center gap-2 text-[10px] font-black text-white"><div className="w-2 h-2 bg-[#E6F379] rounded-full animate-pulse" /> GMV_TRANSMISSION</div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500"><div className="w-2 h-2 bg-zinc-800 rounded-full" /> REFERENCE_USD</div>
                  </div>
                </div>
                <FiActivity className="text-4xl text-[#E6F379]/20 group-hover:text-[#E6F379]/50 transition-all" />
              </div>
              
              <div className="h-72 flex items-end gap-2 md:gap-4">
                {[45, 80, 55, 95, 70, 90, 40, 85, 60, 100].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ delay: i * 0.05, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 bg-gradient-to-t from-[#E6F379]/0 via-[#E6F379]/40 to-[#E6F379] rounded-full relative group/bar"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black opacity-0 group-hover/bar:opacity-100 transition-opacity text-[#E6F379]">${h}K</div>
                  </motion.div>
                ))}
              </div>
            </GlassModule>
          </article>

          {/* Metrics Hub */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Sync_Date', value: "Nov '22" },
              { label: 'Node_Replies', value: '35' },
              { label: 'Net_Views', value: '6.7K' },
              { label: 'Consensus', value: '98%' },
              { label: 'Status', value: 'FINAL' }
            ].map((stat, i) => (
              <div key={i} className="bg-zinc-950/50 border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center justify-center space-y-2 hover:border-[#E6F379]/30 transition-colors">
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{stat.label}</span>
                <div className="text-2xl font-[1000] italic uppercase text-white">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Comments Section (Neural Feedback) */}
          <section className="space-y-8 pt-20">
            <div className="flex items-center gap-6 mb-12">
               <h2 className="text-4xl font-[1000] italic uppercase tracking-tighter">Neural_Feedback</h2>
               <div className="h-[1px] flex-grow bg-white/10" />
               <FiChevronDown className="text-zinc-600" />
            </div>
            
            {[1, 2].map((_, i) => (
              <GlassModule key={i} className="p-12 border-white/5 hover:border-[#E6F379]/20 transition-all group">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-zinc-900 border border-white/10 overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" />
                    </div>
                    <div>
                      <div className="text-xl font-[1000] italic uppercase tracking-tight text-[#E6F379]">Node_Contributor_{i+4}</div>
                      <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Trust_Level_0{i+1}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-zinc-700 uppercase italic">Aug 0{i+1} / 2024</span>
                </div>
                <p className="text-zinc-300 text-lg leading-relaxed italic mb-8 border-l-2 border-white/10 pl-6">
                  "The rewards architecture in Phase 04 was solid, but we need more transparency on the floor price multipliers for smaller nodes."
                </p>
                <div className="flex justify-end gap-8 pt-8 border-t border-white/5 opacity-40 group-hover:opacity-100 transition-opacity">
                   <div className="flex items-center gap-2 text-xs font-black italic hover:text-[#E6F379] cursor-pointer">18 <FiHeart /></div>
                   <FiRotateCcw className="hover:text-[#E6F379] cursor-pointer transition-all" />
                   <FiBookmark className="hover:text-[#E6F379] cursor-pointer transition-all" />
                   <span className="text-xs font-black uppercase italic cursor-pointer bg-white/5 px-4 py-2 rounded-lg hover:bg-[#E6F379] hover:text-black transition-all">Reply_Node</span>
                </div>
              </GlassModule>
            ))}
          </section>
        </div>

        {/* --- TACTICAL TIMELINE (SIDEBAR) --- */}
        <aside className="hidden xl:block w-48 relative pt-20">
          <div className="sticky top-48 flex flex-col items-center">
            <div className="w-px h-[400px] bg-white/5 relative">
              <motion.div 
                style={{ height: scaleX }}
                className="absolute top-0 w-full bg-[#E6F379] shadow-[0_0_20px_#E6F379]" 
              />
              
              {/* Timeline Checkpoints */}
              <div className="absolute top-0 -left-1 w-2.5 h-2.5 rounded-full bg-[#E6F379] shadow-[0_0_15px_#E6F379]" />
              <div className="absolute top-0 left-8 text-left whitespace-nowrap">
                <div className="text-[10px] font-black text-white">NOV '22</div>
                <div className="text-[8px] font-black text-[#E6F379] uppercase tracking-widest">GENESIS_SYNC</div>
              </div>

              <div className="absolute top-[50%] -left-1 w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="absolute top-[50%] left-8 text-left whitespace-nowrap opacity-40">
                <div className="text-[10px] font-black text-white">AUG 01</div>
                <div className="text-[8px] font-black text-white uppercase tracking-widest">LATEST_SYNC</div>
              </div>
            </div>

            <div className="mt-24 flex flex-col gap-10">
              <motion.button whileHover={{ scale: 1.2 }} className="p-4 bg-white/5 rounded-full text-zinc-500 hover:text-[#E6F379] border border-white/10 transition-all shadow-xl">
                <FiArrowUp size={20} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.2 }} className="p-4 bg-white/5 rounded-full text-zinc-500 hover:text-[#E6F379] border border-white/10 transition-all shadow-xl">
                <FiBell size={20} />
              </motion.button>
            </div>
          </div>
        </aside>

      </div>
      <Footer />
    </main>
  );
}