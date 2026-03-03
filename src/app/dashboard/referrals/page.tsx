"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiCopy, FiZap, FiCheck, FiShare2, FiActivity, 
  FiGlobe, FiCommand, FiArrowUpRight, FiUsers, FiX, FiCode, FiSmartphone 
} from "react-icons/fi";

const NODES = [
  { id: "NODE_01", alias: "u_alpha_7", revenue: 120.00, uptime: "98%", status: "sync" },
  { id: "NODE_02", alias: "ghost_proto", revenue: 0.00, uptime: "0%", status: "idle" },
  { id: "NODE_03", alias: "richie_v3", revenue: 450.50, uptime: "100%", status: "sync" },
  { id: "NODE_04", alias: "neo_punk", revenue: 22.10, uptime: "45%", status: "sync" },
];

export default function ReferralsProPage() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const userData = { fullName: "Ricardo Valentino Mandini Zanchetta", birthYear: "1994" };

  const refCode = useMemo(() => {
    const names = userData.fullName.split(" ");
    const initials = names.map(name => name[0].toUpperCase()).join("").substring(0, 6);
    return `${initials}${userData.birthYear}`;
  }, [userData]);

  const shareText = `👋 ¡Oye! Te invito a unirte a ZELLOH gratis 💳 y te regalo hasta €20 de reembolso en tu primera compra! Obtén tu cuenta en menos de 30 segundos ⚡️. Únete aquí: https://zelloh.me/${refCode.toLowerCase()}`;

  useEffect(() => { setMounted(true); }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://zelloh.me/${refCode.toLowerCase()}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Join Zelloh', text: shareText, url: `https://zelloh.me/${refCode.toLowerCase()}` });
      } catch (err) { console.log(err); }
    } else { copyToClipboard(); }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 md:p-16 font-sans selection:bg-[#E6F379] selection:text-black overflow-x-hidden">
      
      {/* GLOW DE FONDO */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#E6F37910_0%,transparent_50%)] pointer-events-none" />

      {/* HEADER: EL "HOOK" DE INVITACIÓN */}
      <header className="relative z-10 mb-24 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
        <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <div className="flex items-center gap-4 mb-6 text-[#E6F379]">
            <FiUsers size={20} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.6em]">Network_Expansion_Protocol</span>
          </div>
          <h1 className="text-7xl md:text-[9rem] font-[1000] tracking-tighter italic uppercase leading-[0.75]">
            Invite<br />Nodes<span className="text-[#E6F379]">_</span>
          </h1>
          <p className="mt-8 text-zinc-500 max-w-md font-bold text-xs uppercase leading-relaxed tracking-widest">
            Expande el ecosistema Zelloh. Por cada nodo activado, ambos reciben <span className="text-white">€20 en cashback</span> instantáneo.
          </p>
        </motion.div>

        {/* CARD DE REFERIDO PRO */}
        <div className="relative group w-full lg:w-auto">
          <div className={`absolute -inset-1 bg-[#E6F379] rounded-[3rem] blur-xl opacity-10 group-hover:opacity-20 transition-opacity`} />
          <div className="relative bg-zinc-900/40 border border-white/10 backdrop-blur-3xl p-10 rounded-[3rem] flex flex-col gap-8 w-full md:w-[450px]">
            <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Your_Unique_ID</span>
                <div className="flex gap-2">
                    <button onClick={() => setShowQR(true)} className="p-3 bg-white/5 rounded-xl hover:bg-[#E6F379] hover:text-black transition-all">
                        <FiCode size={18} />
                    </button>
                    <button onClick={handleNativeShare} className="p-3 bg-white/5 rounded-xl hover:bg-[#E6F379] hover:text-black transition-all">
                        <FiShare2 size={18} />
                    </button>
                </div>
            </div>

            <div className="bg-black p-8 rounded-2xl border border-white/5 flex justify-between items-center group/code cursor-pointer" onClick={copyToClipboard}>
              <div className="space-y-1">
                <p className="text-[9px] font-black text-zinc-700 uppercase">Referral Link</p>
                <span className="text-2xl font-black italic tracking-tighter text-[#E6F379]">zelloh.me/{refCode.toLowerCase()}</span>
              </div>
              <div className="text-white group-hover/code:scale-110 transition-transform">
                {copied ? <FiCheck size={28} className="text-[#E6F379]" /> : <FiCopy size={28} className="opacity-20 group-hover/code:opacity-100" />}
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#E6F379]/5 p-4 rounded-xl border border-[#E6F379]/10">
                <FiZap className="text-[#E6F379]" />
                <p className="text-[9px] text-[#E6F379] font-black uppercase tracking-widest leading-tight">
                    ⚡️ Fast Track: Account setup in 30s for your peers
                </p>
            </div>
          </div>
        </div>
      </header>

      {/* GRID DE ESTADÍSTICAS E INGRESOS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* PANEL IZQUIERDO: REVENUE TRACKER */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-[#0A0A0A] p-12 rounded-[4rem] border border-white/5 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-10">Accumulated_Earnings</p>
              <h2 className="text-7xl font-[1000] italic mb-6 leading-none tracking-tighter tabular-nums">
                $592<span className="text-3xl text-zinc-700">.60</span>
              </h2>
              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5">
                <div>
                    <p className="text-[8px] font-black text-zinc-600 uppercase mb-1">Total Invites</p>
                    <p className="text-xl font-black italic">42</p>
                </div>
                <div>
                    <p className="text-[8px] font-black text-zinc-600 uppercase mb-1">Conversion</p>
                    <p className="text-xl font-black italic text-[#E6F379]">84%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#E6F379] p-12 rounded-[4rem] text-black group cursor-pointer overflow-hidden relative">
            <motion.div whileHover={{ scale: 1.1 }} className="relative z-10">
                <h3 className="text-4xl font-[1000] uppercase italic tracking-tighter leading-none mb-4">Cashback<br />Unlocked.</h3>
                <p className="text-[11px] font-black uppercase leading-tight opacity-70 mb-8 max-w-[200px]">You have €140.00 pending in node rewards.</p>
                <button className="flex items-center gap-4 bg-black text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:gap-6 transition-all shadow-2xl">
                    Withdraw to Vault <FiArrowUpRight />
                </button>
            </motion.div>
            <FiActivity className="absolute -right-10 -bottom-10 text-black/5" size={250} />
          </div>
        </div>

        {/* PANEL DERECHO: DETALLE DE NODOS (Ingresos) */}
        <div className="lg:col-span-8">
          <div className="bg-zinc-900/10 border border-white/5 rounded-[4rem] p-12 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-16">
              <h3 className="text-2xl font-[1000] uppercase italic tracking-tighter flex items-center gap-4">
                <FiGlobe className="text-[#E6F379]" /> Network_Activity
              </h3>
              <div className="flex items-center gap-3">
                 <div className="flex -space-x-3">
                    {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-black" />)}
                 </div>
                 <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">+39 Nodes Online</span>
              </div>
            </div>

            <div className="space-y-4">
              {NODES.map((node) => (
                <div key={node.id} className="bg-black/40 border border-white/5 p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-[#E6F379]/30 transition-all">
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl bg-zinc-900 group-hover:bg-[#E6F379] group-hover:text-black transition-all`}>
                      <FiSmartphone />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{node.id}</p>
                      <h4 className="text-xl font-[1000] uppercase italic tracking-tighter">{node.alias}</h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end font-mono">
                    <div className="text-right">
                      <p className="text-[8px] font-black text-zinc-600 uppercase mb-1">Node Revenue</p>
                      <p className="text-lg font-black text-[#E6F379]">+{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(node.revenue)}</p>
                    </div>
                    <div className="text-right border-l border-white/5 pl-12 hidden md:block">
                      <p className="text-[8px] font-black text-zinc-600 uppercase mb-1">Status</p>
                      <span className="text-[10px] font-black text-white uppercase italic">{node.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL QR (God Mode) */}
      <AnimatePresence>
        {showQR && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowQR(false)} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-zinc-950 border border-white/10 p-12 rounded-[4rem] text-center max-w-sm w-full">
                <button onClick={() => setShowQR(false)} className="absolute top-8 right-8 text-zinc-500 hover:text-white"><FiX size={24}/></button>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-10">Scan_Neural_Node</p>
                <div className="bg-[#E6F379] p-8 rounded-[3rem] aspect-square flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(230,243,121,0.2)]">
                    {/* Aquí iría el componente QR real o un SVG */}
                    <FiCode size={180} className="text-black" />
                </div>
                <h3 className="text-2xl font-[1000] uppercase italic tracking-tighter mb-4">Instant Invite</h3>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                    Muestra este código para que tus amigos se unan al instante y activen sus €20 de beneficio.
                </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}