"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiZap, FiTarget, FiArrowRight, FiShield, 
  FiTrendingUp, FiCpu, FiLock, FiActivity, FiTerminal, FiDatabase, FiAlertCircle 
} from "react-icons/fi";

const HACKS = [
  { id: 1, brand: "Apple Store", offer: "15% Cashback", code: "ZELL_O_MAC", category: "Tech", color: "#E6F379", expires: "2h 15m", difficulty: "Low", security: "Tier 1" },
  { id: 2, brand: "Farfetch", offer: "$200 Credit", code: "HACK_STYL", category: "Fashion", color: "#00F0FF", expires: "5h 40m", difficulty: "Medium", security: "Tier 2" },
  { id: 3, brand: "Tesla Supercharge", offer: "Free 1000km", code: "ELEC_TRIC", category: "Transport", color: "#FF0055", expires: "45m", difficulty: "High", security: "Vault 9" },
];

export default function HacksElitePrime() {
  const [selectedHack, setSelectedHack] = useState(HACKS[0]);
  const [status, setStatus] = useState("IDLE"); // IDLE, HACKING, SUCCESS
  const [logs, setLogs] = useState<string[]>(["Waiting for injection..."]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev.slice(0, 4)]);
  };

  const executeHack = () => {
    setStatus("HACKING");
    addLog(`Targeting ${selectedHack.brand} servers...`);
    
    setTimeout(() => addLog("Bypassing RSA-4096 Encryption..."), 800);
    setTimeout(() => addLog("Injecting Zelloh_Exploit_v2.bin..."), 1600);
    
    setTimeout(() => {
      setStatus("SUCCESS");
      addLog("ACCESS GRANTED: Token extracted.");
    }, 2500);

    setTimeout(() => {
      setStatus("IDLE");
      setLogs(["Connection stabilized. Ready."]);
    }, 8000);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 md:p-12 font-sans selection:bg-[#E6F379] selection:text-black overflow-hidden relative">
      
      {/* CAPA DE TEXTURA Y RUIDO VISUAL */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-[1500px] mx-auto">
        
        {/* HEADER DE ALTA PRESIÓN */}
        <header className="mb-20 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6F379] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E6F379]"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#E6F379]">Proxy_Chain: Active</span>
            </div>
            <h1 className="text-8xl md:text-[11rem] font-[1000] tracking-[-0.06em] italic uppercase leading-[0.75]">
              Elite<br /><span className="text-zinc-800">Hacks_</span>
            </h1>
          </div>
          
          {/* LIVE CONSOLE READOUT */}
          <div className="w-full lg:w-80 bg-zinc-950 border border-white/10 p-6 rounded-3xl font-mono text-[9px] text-zinc-500 uppercase tracking-widest hidden md:block shadow-2xl">
            <div className="flex justify-between mb-4 border-b border-white/5 pb-2">
              <span>System_Logs</span>
              <FiTerminal className="text-[#E6F379]" />
            </div>
            {logs.map((log, i) => (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={i} className={i === 0 ? "text-[#E6F379]" : ""}>
                {">"} {log}
              </motion.p>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* SIDEBAR: SELECCIÓN DE OBJETIVOS */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-8 pl-4">Primary_Targets</h3>
            {HACKS.map((hack) => (
              <motion.div
                key={hack.id}
                onClick={() => { if(status === "IDLE") setSelectedHack(hack) }}
                whileHover={status === "IDLE" ? { x: 10 } : {}}
                className={`group p-8 rounded-[2.5rem] border transition-all duration-500 cursor-pointer relative overflow-hidden ${
                  selectedHack.id === hack.id 
                  ? 'bg-white text-black border-white' 
                  : 'bg-zinc-950/30 border-white/5 grayscale hover:grayscale-0'
                }`}
              >
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className={`text-[9px] font-black uppercase tracking-widest mb-2 ${selectedHack.id === hack.id ? 'text-black/40' : 'text-zinc-600'}`}>
                      {hack.security} // {hack.difficulty}
                    </p>
                    <h4 className="text-3xl font-[1000] uppercase italic tracking-tighter">{hack.brand}</h4>
                  </div>
                  <FiZap size={24} className={selectedHack.id === hack.id ? "text-black" : "text-zinc-800"} />
                </div>
                {selectedHack.id === hack.id && (
                  <motion.div layoutId="hackGlow" className="absolute inset-0 bg-[#E6F379] opacity-5 shadow-inner" />
                )}
              </motion.div>
            ))}
          </div>

          {/* MAIN FRAME: INTERFAZ DE INYECCIÓN */}
          <div className="lg:col-span-8">
            <div className="bg-[#050505] border border-white/5 rounded-[4rem] p-10 md:p-16 relative overflow-hidden">
              
              {/* RADAR / SCANNER FX */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#E6F379] shadow-[0_0_20px_#E6F379] opacity-20 animate-scan" />
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12 mb-20">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 bg-zinc-900 px-4 py-2 rounded-full border border-white/5">
                    <FiDatabase className="text-[#E6F379]" size={12} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Target_Database_Remote</span>
                  </div>
                  <h2 className="text-6xl md:text-8xl font-[1000] uppercase italic tracking-tighter leading-none">
                    {selectedHack.brand}<span className="text-[#E6F379]">_</span>
                  </h2>
                </div>

                <div className="bg-black/50 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 min-w-[240px]">
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4">Network_Status</p>
                  <div className="space-y-3 font-mono">
                    <StatusLine label="Lat" value="0.002ms" />
                    <StatusLine label="Enc" value="Open_SSL" />
                    <StatusLine label="Vln" value="Buffer_Over" />
                  </div>
                </div>
              </div>

              {/* ACTION AREA */}
              <div className="relative z-10 bg-zinc-900/30 rounded-[3.5rem] p-10 border border-white/5">
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Reward_Payload</p>
                    <p className="text-5xl font-[1000] italic text-[#E6F379] tracking-tighter">{selectedHack.offer}</p>
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Access_Code</p>
                    <p className="text-2xl font-mono font-bold tracking-widest">{status === "SUCCESS" ? selectedHack.code : "********"}</p>
                  </div>
                </div>

                <button 
                  onClick={executeHack}
                  disabled={status !== "IDLE"}
                  className={`group relative w-full py-10 rounded-[2.5rem] overflow-hidden transition-all duration-500 ${
                    status === "SUCCESS" ? 'bg-[#E6F379] text-black' : 
                    status === "HACKING" ? 'bg-zinc-900 cursor-wait' : 
                    'bg-white text-black hover:scale-[1.01] active:scale-[0.98]'
                  }`}
                >
                  <span className="relative z-10 text-xl font-[1000] uppercase italic tracking-widest flex items-center justify-center gap-4">
                    {status === "IDLE" && <>Initialize_Injection <FiArrowRight /></>}
                    {status === "HACKING" && <span className="animate-pulse">Bypassing_Nodes...</span>}
                    {status === "SUCCESS" && <>Compromised_Success <FiCheckCircle /></>}
                  </span>

                  {/* LOADING BAR INTERNA */}
                  {status === "HACKING" && (
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.5 }}
                      className="absolute inset-0 bg-[#E6F379]/20"
                    />
                  )}
                </button>
              </div>

              {/* FOOTER: SECURITY INFO */}
              <div className="mt-10 flex flex-col md:flex-row gap-6 justify-between items-center opacity-40">
                <div className="flex items-center gap-4">
                  <FiShield size={20} />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em]">AES-256 Bit Encryption Protected By Zelloh Guard</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiAlertCircle size={14} className="text-[#E6F379]" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Offers refresh in 24h</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: -10%; opacity: 0; }
          50% { opacity: 0.5; }
          100% { top: 110%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}

function StatusLine({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center text-[10px]">
      <span className="text-zinc-600 font-black">{label}</span>
      <span className="text-zinc-300 font-bold">{value}</span>
    </div>
  );
}

function FiCheckCircle(props: any) {
  return (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" height="24" width="24" {...props}>
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}