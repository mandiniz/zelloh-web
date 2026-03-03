"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  FiShield, FiTarget, FiZap, FiAlertTriangle, 
  FiAward, FiEye, FiCrosshair, FiTerminal 
} from "react-icons/fi";
import { FaBug } from "react-icons/fa6"; // Corregido: FaBug de fa6

// --- COMPONENTE DE TARJETA DE RECOMPENSA (BOUNTY TIER) ---
const BountyTier = ({ level, amount, range, color }: { level: string, amount: string, range: string, color: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-[#0D0D0D] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity ${color}`} />
    <div className="relative z-10">
      <span className="text-zinc-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Level {level}</span>
      <h3 className="text-4xl font-[1000] italic uppercase tracking-tighter mb-2">{amount}</h3>
      <p className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] mb-8">{range}</p>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          whileInView={{ x: "0%" }}
          className={`h-full w-full ${color.replace('blur', 'bg')}`} 
        />
      </div>
    </div>
  </motion.div>
);

export default function BugBountyPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen w-full font-sans selection:bg-[#f4e452] selection:text-black">
      <Header />

      <section className="max-w-7xl mx-auto px-6 pt-48 pb-32 relative">
        {/* Radar Effect Background */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] border border-[#f4e452]/5 rounded-full pointer-events-none">
            <div className="absolute inset-0 border border-[#f4e452]/5 rounded-full scale-75" />
            <div className="absolute inset-0 border border-[#f4e452]/5 rounded-full scale-50" />
        </div>

        {/* HERO SECTION */}
        <div className="text-center mb-40 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-black uppercase tracking-[0.4em] text-red-500 mb-8"
          >
            <FiCrosshair className="animate-pulse" /> Bug Bounty Program 1.0
          </motion.div>
          <h1 className="text-7xl md:text-[10rem] font-[1000] italic uppercase tracking-tighter leading-[0.8] mb-8">
            HACK <br />
            <span className="text-[#f4e452]">ZELLOH</span>
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs leading-loose">
            Ayúdenos a proteger el protocolo bancario &apos;s más avanzado del mundo. <br />
            Encuentra vulnerabilidades, repórtelas de manera responsable y reciba tu pago en $USDC o $ZELLOH.
          </p>
        </div>

        {/* REWARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-48">
          <BountyTier level="Critical" amount="$25,000+" range="Remote Code Execution / Critical Loss" color="bg-red-600" />
          <BountyTier level="High" amount="$10,000" range="Unauthorized Access / Data Leak" color="bg-orange-500" />
          <BountyTier level="Medium" amount="$2,500" range="Logic Flaws / API Bypassing" color="bg-yellow-400" />
          <BountyTier level="Low" amount="$500" range="UI/UX Spooks / Minor XSS" color="bg-blue-500" />
        </div>

        {/* RULES & SCOPE BENTO */}
        <div className="grid lg:grid-cols-12 gap-8 mb-48">
          <div className="lg:col-span-8 bg-[#0D0D0D] border border-white/5 rounded-[3.5rem] p-12 md:p-16">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-4 bg-[#f4e452] rounded-2xl text-black">
                <FiShield size={32} />
              </div>
              <h2 className="text-4xl font-[1000] italic uppercase tracking-tighter">Scope & Rules</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h4 className="text-[#f4e452] font-black uppercase tracking-widest text-xs">In Scope:</h4>
                <ul className="space-y-4 text-zinc-400 font-medium">
                  <li className="flex items-center gap-3"><FiTarget className="text-zinc-700" /> zelloh.com (Core Platform)</li>
                  <li className="flex items-center gap-3"><FiTarget className="text-zinc-700" /> api.zelloh.com</li>
                  <li className="flex items-center gap-3"><FiTarget className="text-zinc-700" /> Zelloh Smart Contracts</li>
                  <li className="flex items-center gap-3"><FiTarget className="text-zinc-700" /> iOS & Android Mobile Apps</li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-red-500 font-black uppercase tracking-widest text-xs">Out of Scope:</h4>
                <ul className="space-y-4 text-zinc-500 font-medium italic">
                  <li>Social Engineering / Phishing</li>
                  <li>Physical attacks on Data Centers</li>
                  <li>Third-party integrations (Opensea, etc)</li>
                  <li>DDoS attacks</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-gradient-to-b from-[#111] to-black border border-white/5 rounded-[3.5rem] p-12 flex flex-col justify-between group">
            <div className="space-y-6">
                <FaBug size={48} className="text-[#f4e452] group-hover:rotate-12 transition-transform" />
                <h3 className="text-3xl font-[1000] italic uppercase tracking-tighter">Zelloh <br /> Hall of Fame</h3>
                <p className="text-zinc-500 text-sm font-medium">Top contributors receive exclusive Zelloh Founders NFTs and lifetime fee-free banking.</p>
            </div>
            <button className="mt-8 w-full py-4 border border-white/10 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/5 transition-colors">
                View Leaderboard
            </button>
          </div>
        </div>

        {/* SUBMISSION PROCESS */}
        <div className="text-center space-y-20 mb-40">
            <h2 className="text-5xl md:text-7xl font-[1000] italic uppercase tracking-tighter leading-none">
                Submit your <br /><span className="text-zinc-800">Intelligence.</span>
            </h2>

            <div className="flex flex-col md:flex-row justify-center gap-8">
                {[
                    { step: "01", title: "Discover", icon: <FiEye /> },
                    { step: "02", title: "Document", icon: <FiZap /> },
                    { step: "03", title: "Submit", icon: <FiAward /> }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-4 group">
                        <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center text-3xl group-hover:border-[#f4e452] group-hover:text-[#f4e452] transition-all">
                            {item.icon}
                        </div>
                        <span className="text-[10px] font-black text-zinc-600 tracking-[0.5em]">{item.step}</span>
                        <h4 className="font-[1000] italic uppercase tracking-tight text-xl">{item.title}</h4>
                    </div>
                ))}
            </div>

            <div className="bg-[#f4e452] rounded-[4rem] p-16 md:p-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
                    <FiAlertTriangle size={200} className="text-black" />
                </div>
                <div className="relative z-10">
                    <h2 className="text-black text-5xl md:text-7xl font-[1000] italic uppercase tracking-tighter mb-10 leading-none">
                        Found a <br /> security flaw?
                    </h2>
                    <button className="bg-black text-white px-16 py-6 rounded-2xl font-[1000] italic uppercase text-2xl hover:scale-105 transition-transform shadow-2xl">
                        Open Secure Report
                    </button>
                    <p className="mt-8 text-black/40 font-bold uppercase tracking-[0.3em] text-[10px]">
                        PGP KEY: 0xFD33...889B (SECURE COMMS ONLY)
                    </p>
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}