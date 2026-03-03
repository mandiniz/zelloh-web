"use client";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  FiLock, FiShield, FiUsers, FiSearch, FiChevronDown, 
  FiZap, FiActivity, FiArrowRight, FiCpu, FiGlobe, FiDatabase,
  FiBarChart2, FiWifi, FiSunrise, FiAlertCircle, FiLayers
} from "react-icons/fi";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// --- COMPONENTE: GLASS MODULE (Sincronizado con el ecosistema) ---
const GlassModule = ({ children, className = "" }: any) => (
  <div className={`backdrop-blur-3xl bg-white/[0.02] border border-white/10 rounded-[3.5rem] overflow-hidden ${className}`}>
    {children}
  </div>
);

export default function FoundationLockGodTier() {
  const [lockAmount, setLockAmount] = useState("100");
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [networkStatus, setNetworkStatus] = useState("Online");
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkStatus(prev => prev === "Online" ? "Optimized" : "Online");
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Animaciones de Profundidad Cinematográfica
  const headerScale = useTransform(smoothProgress, [0, 0.1], [1, 0.85]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const coreRotate = useTransform(smoothProgress, [0, 1], [0, 360]);

  return (
    <main ref={containerRef} className="bg-[#000] text-white min-h-screen relative selection:bg-[#E6F379] selection:text-black font-sans overflow-x-hidden">
      <Header />

      {/* --- ATMOSPHERE & HUD --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] mix-blend-overlay" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_50%_0%,#E6F37905_0%,transparent_70%)]" />
        
        {/* HUD: Status Constant */}
        <div className="absolute inset-10 border border-white/5 rounded-[4rem] z-50 pointer-events-none">
          <div className="absolute top-10 right-10 flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest">
            <div className={`w-1.5 h-1.5 rounded-full ${networkStatus === "Online" ? "bg-[#E6F379]" : "bg-blue-400"} animate-pulse`} />
            <span className="text-zinc-400">Vault_Protocol:</span>
            <span className="text-white">{networkStatus}</span>
          </div>
        </div>
      </div>

      <section className="relative z-10 px-6 md:px-20 lg:px-32 pt-44 pb-40">
        
        {/* --- DYNAMIC HERO --- */}
        <motion.div 
          style={{ scale: headerScale, opacity: headerOpacity }}
          className="flex flex-col items-center text-center mb-32 space-y-8"
        >
          <div className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 rounded-full border border-white/10">
            <FiLock className="text-[#E6F379] text-xs" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">Security_Layer_v4.0</span>
          </div>
          <h1 className="text-[12vw] font-[1000] italic uppercase tracking-tighter leading-[0.8]">
            VAULT<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800">STASIS_</span>
          </h1>
          <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-widest text-zinc-500">
            <div className="flex items-center gap-2"><FiDatabase className="text-[#E6F379]" /> Synced: <span className="text-white">100%</span></div>
            <div className="flex items-center gap-2"><FiActivity className="text-[#E6F379]" /> APR: <span className="text-white">Up to 24%</span></div>
            <div className="flex items-center gap-2"><FiZap className="text-[#E6F379]" /> Balance: <span className="text-white">0.00 $ZLLH</span></div>
          </div>
        </motion.div>

        {/* --- THE INTERACTOR: QUANTUM VAULT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-40">
          
          {/* Main Control Panel */}
          <div className="lg:col-span-8">
            <GlassModule className="p-12 md:p-20 h-full relative group">
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-30 transition-opacity">
                <motion.div style={{ rotate: coreRotate }}>
                  <FiCpu size={120} className="text-[#E6F379]" />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                <div className="space-y-6">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#E6F379]" /> Injection_Volume
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={lockAmount}
                      onChange={(e) => setLockAmount(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 py-6 text-6xl font-[1000] italic outline-none focus:border-[#E6F379] transition-all text-white"
                    />
                    <button className="absolute right-0 bottom-6 text-[9px] font-black text-[#E6F379] border border-[#E6F379]/20 px-4 py-2 rounded-xl hover:bg-[#E6F379] hover:text-black transition-all uppercase italic">Max_Cap</button>
                  </div>
                </div>

                <div className="space-y-6">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-500" /> Time_Stasis_Lock
                  </label>
                  <div className="w-full p-6 bg-white/5 border border-white/10 rounded-[2rem] flex justify-between items-center font-[1000] italic text-2xl hover:bg-white/10 transition-all cursor-pointer">
                    12 MONTHS <FiChevronDown className="text-[#E6F379]" />
                  </div>
                </div>
              </div>

              <div className="p-10 bg-white/[0.03] border border-white/5 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Projected_Yield_Energy</span>
                  <div className="text-5xl font-[1000] italic text-[#E6F379] mt-2">
                    240.85 <span className="text-xl text-white not-italic font-black uppercase">veZLLH</span>
                  </div>
                </div>
                <motion.button 
                  onHoverStart={() => setIsButtonHovered(true)}
                  onHoverEnd={() => setIsButtonHovered(false)}
                  className="relative px-12 py-7 bg-white text-black rounded-full font-[1000] uppercase italic text-xl overflow-hidden group shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                >
                  <span className="relative z-10 flex items-center gap-4">Initialize_Vault <FiArrowRight /></span>
                  <AnimatePresence>
                    {isButtonHovered && (
                      <motion.div 
                        initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 bg-[#E6F379] z-0"
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </GlassModule>
          </div>

          {/* Perks Module */}
          <div className="lg:col-span-4">
            <div className="p-12 md:p-16 bg-[#E6F379] rounded-[3.5rem] h-full text-black flex flex-col justify-between group overflow-hidden relative">
              <div className="relative z-10">
                <FiShield size={40} className="mb-10" />
                <h3 className="text-4xl font-[1000] italic uppercase leading-none mb-12">Vault_<br />Exclusives.</h3>
                <div className="space-y-10">
                  {[
                    { l: "Vote_Weight", v: "2.5x Multiplier" },
                    { l: "Market_Fees", v: "0% Protocol" },
                    { l: "Status", v: "Zelloh_Prime" }
                  ].map((item, i) => (
                    <div key={i} className="border-b border-black/10 pb-4">
                      <p className="text-[9px] font-black uppercase opacity-40 mb-1">{item.l}</p>
                      <p className="text-xl font-[1000] italic uppercase">{item.v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                <FiLock size={300} />
              </div>
            </div>
          </div>
        </div>

        {/* --- DELEGATES HUB: THE NEURAL GRID --- */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16">
            <div className="space-y-4">
              <h2 className="text-6xl md:text-8xl font-[1000] italic uppercase tracking-tighter leading-none">THE_DELEGATES_</h2>
              <div className="flex items-center gap-3 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                <FiUsers className="text-[#E6F379]" /> Active Network Entities: 12,492
              </div>
            </div>
            <div className="relative w-full md:w-[450px]">
              <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                type="text" 
                placeholder="QUERY_NODE_IDENTITY..." 
                className="w-full bg-zinc-950 border border-white/5 rounded-[2rem] py-6 pl-16 pr-8 text-[10px] font-black uppercase tracking-[0.3em] focus:border-[#E6F379] outline-none"
              />
            </div>
          </div>

          <GlassModule className="p-2 border-white/5">
            <div className="grid grid-cols-1 gap-1">
              {/* Header */}
              <div className="hidden md:grid grid-cols-5 p-10 text-[9px] font-black text-zinc-600 uppercase tracking-[0.5em] border-b border-white/5">
                <span>Node_Rank</span>
                <span>Identity</span>
                <span>Activity</span>
                <span>Delegations</span>
                <span className="text-right">Power_Level</span>
              </div>
              
              {/* Rows */}
              {[884.36, 97.9, 58.4, 41.92, 10.208].map((val, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                  className="grid grid-cols-2 md:grid-cols-5 items-center p-10 md:p-12 border-b border-white/[0.02] last:border-0 group cursor-pointer transition-all"
                >
                  <div className="text-xl font-[1000] italic text-zinc-700 group-hover:text-white transition-colors">#0{i + 1}</div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 group-hover:border-[#E6F379] flex items-center justify-center transition-all">
                      <FiGlobe size={18} className="text-zinc-700 group-hover:text-[#E6F379]" />
                    </div>
                    <span className="font-[1000] italic uppercase tracking-tight">NODE_v{i}.SHB</span>
                  </div>
                  <div className="hidden md:flex flex-col">
                    <span className="text-xl font-[1000] italic">{(i * 12) + 4}</span>
                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Votes_Cast</span>
                  </div>
                  <div className="hidden md:flex flex-col">
                    <span className="text-xl font-[1000] italic">{i + 8}</span>
                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Received</span>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-[1000] italic text-[#E6F379] group-hover:drop-shadow-[0_0_15px_rgba(230,243,121,0.4)] transition-all">
                      {val}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassModule>

          <div className="flex justify-center pt-10">
             <button className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 hover:text-[#E6F379] transition-colors flex items-center gap-4 group">
               Load_More_Network_Nodes <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
             </button>
          </div>
        </div>

      </section>

      <Footer />

      <style jsx global>{`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </main>
  );
}