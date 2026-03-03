"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  FiPlus, FiMessageSquare, FiEye, 
  FiTrendingUp, FiCheckCircle, FiSearch, FiActivity, FiZap, FiBox, FiCpu
} from "react-icons/fi";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import NewTopicModal from "@/components/governance/NewTopicModal";

// --- COMPONENTE: GLASS MODULE ---
const GlassModule = ({ children, className = "" }: any) => (
  <div className={`backdrop-blur-3xl bg-white/[0.02] border border-white/10 rounded-[3rem] overflow-hidden ${className}`}>
    {children}
  </div>
);

export default function GovernanceQuantumHub() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [systemTime, setSystemTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const proposals = [
    { id: 1, title: "$Zelloh Rewards: Program completion and feedback request", author: "Patent DAO", status: "Active", votes: 35, views: "1.1k", date: "Aug '1", type: "Rewards" },
    { id: 2, title: "Proposal to Reinstate $Zelloh Rewards", author: "Grant Proposals", status: "Review", votes: 18, views: "2.5k", date: "Oct '27", type: "Grant" },
    { id: 3, title: "Screensaver.world X Zelloh Protocol - Form", author: "Contributor DAO", status: "Passed", votes: 29, views: "5.9k", date: "Jan '4", type: "Partnership" },
    { id: 4, title: "NFT gift button [Grant Proposal]", author: "Core Team", status: "Active", votes: 100, views: "12.2k", date: "Sep '14", type: "Core" },
  ];

  return (
    <main className="bg-[#000] text-white min-h-screen relative selection:bg-[#E6F379] selection:text-black font-sans overflow-x-hidden">
      <Header />
      
      {/* --- BACKGROUND ATMOSPHERE --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E6F379]/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 pt-48 pb-32 px-6 md:px-20 lg:px-32 max-w-[1600px] mx-auto">
        
        {/* --- HEADER: COMMAND CENTER --- */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-24">
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="px-4 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
                Network_Consensus_V1
              </span>
              <div className="h-[1px] w-20 bg-zinc-800" />
            </motion.div>
            <h1 className="text-7xl md:text-[10rem] font-[1000] italic uppercase tracking-tighter leading-[0.8] mb-8">
              GOVERN_ <br /><span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-700">POWER.</span>
            </h1>
          </div>
          
          <div className="lg:col-span-4 flex flex-col items-end gap-6">
            <GlassModule className="p-8 w-full border-[#E6F379]/20">
               <div className="flex justify-between items-center mb-4">
                  <FiZap className="text-[#E6F379]" />
                  <span className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Active_Voting_Power</span>
               </div>
               <div className="text-4xl font-[1000] italic uppercase leading-none text-white">842.1K <span className="text-sm text-[#E6F379]">$ZLLH</span></div>
            </GlassModule>
            <motion.button 
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setModalOpen(true)}
              className="w-full bg-[#E6F379] text-black py-6 rounded-3xl font-[1000] uppercase italic text-lg flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(230,243,121,0.15)] transition-all"
            >
              <FiPlus strokeWidth={4} /> PROPOSE_NEW_SYSTEM
            </motion.button>
          </div>
        </div>

        {/* --- METRICS RIBBON --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-20">
          {[
            { label: 'Total_Proposals', val: '1,284', icon: FiBox },
            { label: 'Participation_Rate', val: '64.2%', icon: FiActivity },
            { label: 'DAO_Treasury', val: '$12.4M', icon: FiCpu },
            { label: 'Uptime', val: '99.9%', icon: FiZap },
          ].map((m, i) => (
            <div key={i} className="p-8 bg-zinc-950/50 border border-white/5 rounded-[2.5rem] flex items-center gap-6">
              <div className="p-3 bg-white/5 rounded-2xl text-[#E6F379]"><m.icon /></div>
              <div>
                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{m.label}</p>
                <p className="text-xl font-[1000] italic uppercase">{m.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- FILTERS & INTERFACE --- */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10 items-center">
          <div className="flex flex-wrap gap-2 flex-grow">
            {['Active_Feed', 'Pending_Review', 'Executed', 'Archive'].map((filter, i) => (
              <button key={filter} className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-white text-black' : 'bg-zinc-950 text-zinc-500 border border-white/5 hover:border-white/20'}`}>
                {filter}
              </button>
            ))}
          </div>
          <div className="w-full lg:w-96 relative">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600" />
            <input 
              type="text" 
              placeholder="QUERY_BLOCKCHAIN..." 
              className="w-full bg-zinc-950 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-[10px] font-black uppercase tracking-widest focus:border-[#E6F379] outline-none"
            />
          </div>
        </div>

        {/* --- PROPOSALS DATA LAYER --- */}
        <div className="space-y-4">
          {/* HEADER TABLA */}
          <div className="grid grid-cols-12 px-12 py-6 text-[9px] font-black text-zinc-700 uppercase tracking-[0.5em] hidden lg:grid">
            <div className="col-span-6">Proposal_Identification</div>
            <div className="col-span-2 text-center">Consensus_Metrix</div>
            <div className="col-span-2 text-center">Protocol_Status</div>
            <div className="col-span-2 text-right">Timestamp</div>
          </div>

          {proposals.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ x: 10, borderColor: "rgba(230,243,121,0.3)" }}
              className="grid grid-cols-1 lg:grid-cols-12 items-center p-8 md:p-12 bg-zinc-950/30 backdrop-blur-md border border-white/5 rounded-[3.5rem] group cursor-pointer transition-all gap-8 lg:gap-0"
            >
              {/* Info Principal */}
              <div className="col-span-1 lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#E6F379]/10 text-[#E6F379] text-[8px] font-black uppercase tracking-tighter rounded-md border border-[#E6F379]/20">
                    {item.type}
                  </span>
                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">{item.author}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-[1000] italic uppercase leading-none group-hover:text-[#E6F379] transition-colors">{item.title}</h3>
              </div>

              {/* Engagement */}
              <div className="col-span-1 lg:col-span-2 flex flex-col items-center gap-3">
                 <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full bg-zinc-800 border-4 border-black overflow-hidden ring-1 ring-white/10">
                        <img src={`https://i.pravatar.cc/100?img=${item.id + i}`} alt="voter" />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full bg-[#E6F379] border-4 border-black flex items-center justify-center text-black text-[10px] font-black">+ {item.votes}</div>
                 </div>
                 <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em]">Governance_Verified</span>
              </div>

              {/* Status */}
              <div className="col-span-1 lg:col-span-2 flex justify-center">
                <div className={`px-6 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest ${
                  item.status === 'Active' ? 'border-green-500/50 text-green-400 bg-green-500/5' : 
                  item.status === 'Passed' ? 'border-[#E6F379]/50 text-[#E6F379] bg-[#E6F379]/5' : 
                  'border-blue-500/50 text-blue-400 bg-blue-500/5'
                }`}>
                  ● {item.status}
                </div>
              </div>

              {/* Activity */}
              <div className="col-span-1 lg:col-span-2 text-right">
                <p className="text-xl font-[1000] italic text-zinc-300">{item.date}</p>
                <p className="text-[9px] font-black text-zinc-700 uppercase tracking-tighter">Last_Interaction</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && <NewTopicModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>

      <Footer />
      
      <style jsx global>{`
        .text-outline-pro { -webkit-text-stroke: 1.5px rgba(255,255,255,0.2); color: transparent; }
      `}</style>
    </main>
  );
}