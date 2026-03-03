"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { 
  FiArrowUp, FiBell, FiChevronDown, FiHeart, FiLink, 
  FiBookmark, FiRotateCcw, FiCommand, FiActivity, FiCpu, FiHash 
} from "react-icons/fi";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// --- COMPONENTE: MODULO TÁCTICO (Glass Design) ---
const GlassModule = ({ children, className = "" }: any) => (
  <div className={`backdrop-blur-3xl bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden ${className}`}>
    {children}
  </div>
);

export default function ProposalDetailGodTier() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <main ref={containerRef} className="bg-[#000] min-h-screen text-white font-sans selection:bg-[#E6F379] selection:text-black overflow-x-hidden">
      <Header />

      {/* --- LAYER 0: HUD BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#E6F379]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 pt-44 pb-32 px-6 md:px-12 lg:px-24 flex flex-col xl:flex-row gap-16 max-w-[1800px] mx-auto">
        
        {/* --- MAIN CONTENT: THE MISSION DOSSIER --- */}
        <div className="flex-1 space-y-12">
          
          {/* Header de Propuesta Brutalista */}
          <header className="space-y-6">
            <div className="flex items-center gap-3 text-[10px] font-black text-[#E6F379] uppercase tracking-[0.5em]">
              <FiCommand className="animate-pulse" /> Protocol_Dossier // 004
            </div>
            <h1 className="text-5xl md:text-7xl font-[1000] italic uppercase leading-[0.85] tracking-tighter">
              $Zelloh Rewards: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-700">Program_Feedback_Cycle</span>
            </h1>
          </header>

          {/* Bloque de Autoría Estilo Nodo */}
          <div className="flex flex-col md:flex-row items-center gap-6 p-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] backdrop-blur-xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-400 to-black p-[2px]">
              <div className="w-full h-full bg-black rounded-[calc(1rem-2px)] flex items-center justify-center font-[1000] italic text-2xl">Z</div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="text-xl font-[1000] italic uppercase tracking-tight">ZELLOH.Foundation</div>
              <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.3em] flex items-center justify-center md:justify-start gap-2 mt-1">
                <FiCpu className="text-[#E6F379]" /> Core_Authority_Node
              </div>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest block mb-1">Synchronization</span>
              <div className="text-[#E6F379] font-black italic text-sm uppercase">Immutable_Nov_22</div>
            </div>
          </div>

          {/* Cuerpo de la Propuesta */}
          <article className="space-y-10">
            <p className="text-2xl italic text-white/90 font-medium leading-tight border-l-4 border-[#E6F379] pl-8 py-2">
              Today marks the final day of the current $ZELLOH Rewards program. 420,000 $ZELLOH successfully deployed across the network infrastructure.
            </p>

            {/* GMV Chart: Estilo Monitor de Hardware */}
            <GlassModule className="p-10 border-white/10 group">
               <div className="flex justify-between items-center mb-10">
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-[9px] font-black text-white uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 bg-[#E6F379] rounded-full shadow-[0_0_8px_#E6F379]" /> GMV_Injection
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full" /> Reference_USD
                    </div>
                  </div>
                  <FiActivity className="text-zinc-800 group-hover:text-[#E6F379]/50 transition-colors" />
               </div>
               
               <div className="h-56 w-full flex items-end gap-3 md:gap-4">
                  {[30, 80, 45, 90, 60, 95, 70, 85].map((h, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05, duration: 1, ease: "circOut" }}
                      className="flex-1 bg-gradient-to-t from-zinc-900 via-[#E6F379]/40 to-[#E6F379] rounded-t-lg relative group/bar"
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[9px] font-black text-[#E6F379] opacity-0 group-hover/bar:opacity-100 transition-opacity">
                        ${h}K
                      </div>
                    </motion.div>
                  ))}
               </div>
            </GlassModule>

            {/* Metrics Bar Estilo Dashboard de Vuelo */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
               {[
                 { l: 'Created', v: "Nov '22" },
                 { l: 'Replies', v: '35' },
                 { l: 'Net_Views', v: '6.7K' },
                 { l: 'Likes', v: '988' },
                 { l: 'Consensus', v: '94%' }
               ].map((stat, i) => (
                 <div key={i} className="bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] text-center space-y-1 hover:border-[#E6F379]/30 transition-colors">
                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{stat.l}</span>
                    <div className="text-xl font-[1000] italic uppercase">{stat.v}</div>
                 </div>
               ))}
            </div>

            {/* Comments: Estilo Terminal Neural */}
            <section className="space-y-6 pt-12">
               <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-2xl font-[1000] italic uppercase tracking-tight">Neural_Feedback_</h3>
                  <div className="h-px flex-grow bg-white/5" />
               </div>
               
               {[1, 2].map(c => (
                 <div key={c} className="p-10 bg-white/[0.01] border border-white/5 rounded-[2.5rem] space-y-6 hover:bg-white/[0.03] transition-all group">
                   <div className="flex justify-between items-center">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 group-hover:border-[#E6F379] transition-colors" />
                       <div>
                         <span className="font-[1000] italic text-lg uppercase tracking-tight text-[#E6F379]">poytrea_node</span>
                         <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mt-0.5">Contributor_Level_1</div>
                       </div>
                     </div>
                     <span className="text-[10px] font-black text-zinc-700 italic">SYNC_12:04:00</span>
                   </div>
                   <p className="text-zinc-400 font-medium leading-relaxed italic border-l-2 border-white/5 pl-6 group-hover:text-white transition-colors">
                     "I agree with all the potential improvement points. It's unfair to see projects with much lower floor get the same rewards."
                   </p>
                   <div className="flex justify-end gap-6 pt-6 border-t border-white/[0.03] opacity-40 group-hover:opacity-100 transition-opacity">
                     <span className="flex items-center gap-2 text-xs font-[1000] italic hover:text-[#E6F379] cursor-pointer">18 <FiHeart /></span>
                     <FiLink className="hover:text-[#E6F379] cursor-pointer" />
                     <FiBookmark className="hover:text-[#E6F379] cursor-pointer" />
                     <span className="text-xs font-black uppercase italic cursor-pointer hover:text-[#E6F379]">Reply_Thread</span>
                   </div>
                 </div>
               ))}
            </section>
          </article>
        </div>

        {/* --- SIDEBAR: TACTICAL PROGRESS --- */}
        <aside className="hidden xl:block w-48 relative">
          <div className="sticky top-44 flex flex-col items-center">
             <div className="flex flex-col items-center mb-8 gap-2">
                <span className="text-[10px] font-black text-white tracking-widest">NAV_ORBIT</span>
                <div className="h-2 w-2 bg-[#E6F379] rounded-full shadow-[0_0_10px_#E6F379]" />
             </div>
             
             <div className="w-[1px] h-64 bg-white/5 relative">
                <motion.div 
                   style={{ height: scaleY }}
                   className="absolute top-0 w-full bg-[#E6F379] shadow-[0_0_15px_#E6F379]"
                />
             </div>

             <div className="mt-12 flex flex-col gap-6">
                <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-600 hover:text-[#E6F379] hover:border-[#E6F379]/40 transition-all">
                  <FiArrowUp />
                </button>
                <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-600 hover:text-[#E6F379] hover:border-[#E6F379]/40 transition-all">
                  <FiBell />
                </button>
             </div>
          </div>
        </aside>
      </div>

      <Footer />
    </main>
  );
}