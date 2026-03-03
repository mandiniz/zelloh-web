"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  FiArrowUpRight, FiTarget, FiGlobe, FiShield, 
  FiDownloadCloud, FiMaximize2, FiTerminal, FiLayers, FiCpu, FiActivity, FiLock, FiUsers
} from "react-icons/fi";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

// --- COMPONENTES ATÓMICOS DE ALTA FIDELIDAD ---

const GlassModule = ({ children, className = "" }: any) => (
  <div className={`backdrop-blur-3xl bg-white/[0.02] border border-white/10 rounded-[3.5rem] overflow-hidden ${className}`}>
    {children}
  </div>
);

const TokenPortal = ({ title, desc, href, icon: Icon, tag }: any) => (
  <Link href={href} className="group relative">
    <div className="absolute inset-0 bg-[#E6F379]/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-full" />
    <GlassModule className="p-10 h-full flex flex-col justify-between border-white/5 group-hover:border-[#E6F379]/40 group-hover:bg-white/[0.05] transition-all duration-500 min-h-[380px]">
      <div>
        <div className="flex justify-between items-start mb-10">
          <div className="p-4 bg-zinc-900 rounded-2xl group-hover:bg-[#E6F379] transition-colors duration-500">
            <Icon className="text-2xl text-[#E6F379] group-hover:text-black" />
          </div>
          <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">{tag}</span>
        </div>
        <h4 className="text-4xl font-[1000] italic uppercase tracking-tighter leading-none mb-6 group-hover:text-[#E6F379] transition-colors">
          {title}
        </h4>
        <p className="text-[11px] font-bold text-zinc-500 uppercase leading-relaxed tracking-wider italic">
          {desc}
        </p>
      </div>
      
      <div className="flex items-center gap-4 mt-12 overflow-hidden">
        <span className="text-[10px] font-black uppercase text-[#E6F379] translate-y-10 group-hover:translate-y-0 transition-transform duration-500">Entrar al Módulo</span>
        <div className="h-[1px] flex-grow bg-zinc-800 group-hover:bg-[#E6F379]/30 transition-colors" />
        <FiArrowUpRight className="text-[#E6F379] text-xl group-hover:rotate-45 transition-transform duration-500" />
      </div>
    </GlassModule>
  </Link>
);

function StatusTile({ label, value, detail, highlight = false }: any) {
  return (
    <div className={`p-16 rounded-[4rem] border transition-all duration-500 group ${highlight ? 'bg-[#E6F379] text-black border-transparent shadow-[0_0_50px_rgba(230,243,121,0.1)]' : 'bg-zinc-950 border-white/5 text-white hover:bg-zinc-900'}`}>
       <div className="flex justify-between items-center mb-10">
          <span className={`text-[10px] font-black uppercase tracking-widest ${highlight ? 'text-black/50' : 'text-zinc-600'}`}>{label}</span>
          <div className={`w-2 h-2 rounded-full animate-pulse ${highlight ? 'bg-black' : 'bg-[#E6F379]'}`} />
       </div>
       <h4 className="text-7xl font-[1000] italic uppercase tracking-tighter mb-4">{value}</h4>
       <p className={`text-[10px] font-bold uppercase tracking-widest ${highlight ? 'text-black/40' : 'text-zinc-700'}`}>{detail}</p>
       <div className={`h-[1px] w-full mt-10 overflow-hidden ${highlight ? 'bg-black/10' : 'bg-white/5'}`}>
          <motion.div 
            animate={{ x: ['-100%', '100%'] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className={`h-full w-1/2 ${highlight ? 'bg-black' : 'bg-[#E6F379]'}`} 
          />
       </div>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL ---

export default function ZellohTokenUniverse() {
  const containerRef = useRef<HTMLElement>(null);
  const [systemTime, setSystemTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Animaciones de Profundidad Cinematográfica
  const coinRotate = useTransform(smoothProgress, [0, 1], [0, 1440]);
  const coinY = useTransform(smoothProgress, [0, 0.5, 1], [0, -150, -300]);
  const coinZ = useTransform(smoothProgress, [0, 0.2, 0.5, 1], [1, 2.2, 1.5, 0.6]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0.4]);
  const heroTextScale = useTransform(smoothProgress, [0, 0.15], [1, 0.85]);

  return (
    <main ref={containerRef} className="bg-[#000] text-white min-h-[500vh] relative selection:bg-[#E6F379] selection:text-black overflow-x-hidden font-sans">
      <Header />

      {/* --- LAYER 0: HUD & BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] mix-blend-overlay" />
        <motion.div style={{ opacity: bgOpacity }} className="absolute top-[-10%] right-[-5%] w-[1000px] h-[1000px] bg-[#E6F379]/5 blur-[180px] rounded-full" />
        
        {/* HUD Interface Lines */}
        <div className="absolute inset-10 border border-white/5 rounded-[4rem] z-50">
           <div className="absolute top-10 left-10 flex flex-col gap-1">
              <span className="text-[9px] font-black text-[#E6F379] tracking-[0.5em]">ZELLOH_PROTOCOL_V.4</span>
              <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-tighter">Status: Synchronized</span>
           </div>
           <div className="absolute top-10 right-10 text-right">
              <span className="text-[10px] font-black text-white tracking-[0.2em]">{systemTime}</span>
           </div>
        </div>
      </div>

      {/* --- LAYER 1: CINEMATIC HERO --- */}
      <section className="h-screen flex flex-col justify-center items-center sticky top-0 z-10 overflow-hidden">
        <motion.div style={{ scale: heroTextScale, y: coinY }} className="relative z-30 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-md mb-12"
          >
            <div className="w-2 h-2 rounded-full bg-[#E6F379] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Zelloh_Mainnet_Asset</span>
          </motion.div>
          
          <h1 className="text-[14vw] font-[1000] italic uppercase tracking-tighter leading-[0.7] mb-12">
            ZELLOH<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#E6F379] to-[#8a9244]">COIN_</span>
          </h1>

          <div className="flex justify-center gap-20 border-t border-white/5 pt-12">
            <div className="text-left">
              <p className="text-3xl font-[1000] italic leading-none">$ZLLH</p>
              <p className="text-[8px] font-black text-zinc-500 uppercase mt-2 tracking-widest italic">Asset_Ticker</p>
            </div>
            <div className="text-left border-l border-white/10 pl-20">
              <p className="text-3xl font-[1000] italic leading-none">BEP-20</p>
              <p className="text-[8px] font-black text-zinc-500 uppercase mt-2 tracking-widest italic">Network_Standard</p>
            </div>
          </div>
        </motion.div>

        {/* 3D COIN RENDER */}
        <motion.div 
          style={{ rotateY: coinRotate, scale: coinZ, y: coinY }}
          className="absolute z-20 pointer-events-none"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#E6F379]/10 blur-[150px] rounded-full" />
            <img 
              src="https://cdn.pixabay.com/photo/2021/04/30/16/47/coin-6219383_1280.png" 
              className="w-[500px] md:w-[850px] filter brightness-110 contrast-125 drop-shadow-[0_0_100px_rgba(230,243,121,0.2)]"
              alt="Zelloh Quantum Coin"
            />
          </div>
        </motion.div>
      </section>

      {/* --- LAYER 2: PROTOCOLS & UTILITY GRID --- */}
      <section className="relative z-40 px-6 md:px-20 lg:px-32 py-96 bg-black/40 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-6 mb-32">
            {/* Core Architecture */}
            <div className="lg:col-span-8">
              <GlassModule className="p-16 md:p-32 h-full border-white/10 hover:border-[#E6F379]/20 transition-colors">
                 <FiCpu className="text-[#E6F379] text-6xl mb-12" />
                 <h3 className="text-6xl md:text-8xl font-[1000] italic uppercase tracking-tighter leading-none mb-12">
                  THE_LIQUIDITY_ <br />FOUNDATION.
                 </h3>
                 <p className="text-xl font-bold text-zinc-500 max-w-2xl leading-relaxed italic uppercase">
                  Zelloh Coin es la unidad de valor soberana que impulsa el intercambio de servicios y activos digitales dentro de nuestro <span className="text-white">ecosistema descentralizado</span>.
                 </p>
              </GlassModule>
            </div>

            {/* Micro Stats Card */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="p-12 bg-[#E6F379] rounded-[3.5rem] text-black flex flex-col justify-between group h-full">
                 <h4 className="text-4xl font-[1000] italic uppercase leading-none">Neural<br />Minting_</h4>
                 <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Emisión algorítmica basada en demanda_</p>
                    <div className="h-[2px] w-full bg-black/10 rounded-full overflow-hidden">
                       <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-black" />
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Tokenomics Feed */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <StatusTile label="Total_Supply" value="1.0 Q" detail="Supply Architecture" />
             <StatusTile label="Burn_Index" value="2.4 %" detail="Deflationary Mode" highlight />
             <StatusTile label="Confirmation" value="0.02ms" detail="Network Latency" />
          </div>
        </div>
      </section>

      {/* --- LAYER 3: ECOSYSTEM PORTALS (NEW SUBSECTIONS) --- */}
      <section className="relative z-50 px-6 md:px-20 lg:px-32 py-40">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <h2 className="text-5xl md:text-8xl font-[1000] italic uppercase tracking-tighter leading-none">
              TOKEN_ <br /><span className="text-[#E6F379]">UTILITY_LAYERS</span>
            </h2>
            <p className="text-zinc-600 font-black uppercase text-[10px] tracking-[0.5em] mt-8">
              Protocolos de interacción para poseedores de activos_
            </p>
          </div>
          <div className="text-right">
             <FiLayers className="text-8xl text-white/5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TokenPortal 
            title="Topics" 
            desc="Acceso a hilos de datos y tendencias del mercado global en tiempo real."
            href="/token/topic"
            icon={FiTerminal}
            tag="Discovery_V1"
          />
          <TokenPortal 
            title="Lock" 
            desc="Bloqueo inteligente de activos para asegurar la estabilidad del ecosistema."
            href="/token/lock"
            icon={FiLock}
            tag="Security_V2"
          />
          <TokenPortal 
            title="Governance" 
            desc="Poder de voto descentralizado para definir el futuro de la DAO."
            href="/token/governance"
            icon={FiUsers}
            tag="Consensus_Power"
          />
          <TokenPortal 
            title="Earn" 
            desc="Protocolos de rendimiento para maximizar el capital estacionario."
            href="/token/earn"
            icon={FiActivity}
            tag="Yield_Engine"
          />
        </div>
      </section>

      {/* --- LAYER 4: SECURITY PROTOCOL --- */}
      <section className="px-6 py-64 relative">
        <div className="max-w-[1600px] mx-auto bg-white text-black rounded-[5rem] p-16 md:p-32 group relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
              <FiShield className="text-8xl mb-12 animate-pulse" />
              <h2 className="text-6xl md:text-[10rem] font-[1000] italic uppercase tracking-tighter leading-[0.75] mb-12">
                POST_<br />QUANTUM_
              </h2>
              <p className="text-sm font-black uppercase tracking-[0.3em] mb-16 opacity-40 max-w-sm">
                Seguridad inalterable mediante cifrado de grado militar post-cuántico.
              </p>
              <button className="px-16 py-8 bg-black text-white rounded-full font-[1000] italic uppercase text-2xl hover:scale-[1.05] transition-transform flex items-center gap-6 shadow-2xl">
                WHITE PAPER 2.0 <FiDownloadCloud />
              </button>
            </div>
            <div className="hidden lg:flex justify-center relative">
               <div className="absolute inset-0 bg-black/5 blur-[100px] rounded-full animate-pulse" />
               <div className="text-[25rem] font-[1000] italic text-black/5 select-none">SAFE</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap');
        .text-outline {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
          color: transparent;
        }
      `}</style>
    </main>
  );
}