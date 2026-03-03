"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUser, FiShield, FiBell, FiGlobe, FiLock, 
  FiCpu, FiSmartphone, FiCheck, FiChevronRight, 
  FiLogOut, FiCreditCard, FiHash, FiZap, FiActivity, FiKey
} from "react-icons/fi";

// --- TIPOS ---
type SettingSection = "Identity" | "Security" | "Nodes" | "Alerts";

export default function SettingsGodMode() {
  const [activeTab, setActiveTab] = useState<SettingSection>("Identity");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#000] text-white p-6 md:p-12 lg:p-20 font-sans selection:bg-[#E6F379] selection:text-black relative overflow-hidden">
      
      {/* BACKGROUND FX: DEEP SPACE & GRID */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#4D1BDB10_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* HEADER TÁCTICO */}
        <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-3">
              <span className="w-12 h-[2px] bg-[#E6F379] shadow-[0_0_10px_#E6F379]" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#E6F379]">Node_Control_Center</span>
            </motion.div>
            <h1 className="text-8xl md:text-[10rem] font-[1000] tracking-tighter italic uppercase leading-[0.75]">
              System<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-800">Parameters.</span>
            </h1>
          </div>
          
          {/* SYSTEM UPTIME HUD */}
          <div className="hidden xl:flex items-center gap-12 p-8 bg-white/[0.02] border border-white/5 rounded-[3rem] backdrop-blur-xl">
             <div className="text-right">
                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Network_Uptime</p>
                <p className="text-xl font-black italic text-[#E6F379]">99.998%</p>
             </div>
             <div className="w-px h-10 bg-white/10" />
             <div className="text-right">
                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Identity_Hash</p>
                <p className="text-xl font-black italic">0x4F...33E</p>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* SIDEBAR: NAVEGACIÓN Y ESTATUS */}
          <div className="lg:col-span-4 space-y-8">
            <nav className="space-y-3">
              <TabButton 
                active={activeTab === "Identity"} 
                onClick={() => setActiveTab("Identity")} 
                icon={<FiUser />} 
                label="Identity_Profile" 
                sub="Biometric & Meta Data"
              />
              <TabButton 
                active={activeTab === "Security"} 
                onClick={() => setActiveTab("Security")} 
                icon={<FiShield />} 
                label="Security_Vault" 
                sub="Auth & Encryption"
              />
              <TabButton 
                active={activeTab === "Nodes"} 
                onClick={() => setActiveTab("Nodes")} 
                icon={<FiCpu />} 
                label="Remote_Nodes" 
                sub="API & Connected HW"
              />
              <TabButton 
                active={activeTab === "Alerts"} 
                onClick={() => setActiveTab("Alerts")} 
                icon={<FiBell />} 
                label="Neural_Inbox" 
                sub="Critical Protocols"
              />
            </nav>

            {/* STATUS CARD (DENTRO DEL SIDEBAR) */}
            <div className="p-10 bg-gradient-to-br from-zinc-950 to-black border border-white/5 rounded-[3.5rem] relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform">
                  <FiActivity size={80} />
               </div>
               <p className="text-[9px] font-black text-[#E6F379] uppercase tracking-widest mb-6 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-[#E6F379] animate-pulse" /> Global_Status
               </p>
               <h4 className="text-2xl font-[1000] italic uppercase leading-tight mb-2">Master_Node Active</h4>
               <p className="text-xs text-zinc-500 font-medium">Your node is currently participating in consensus voting with Tier 01 priority.</p>
               <button className="mt-8 flex items-center gap-4 text-red-500 hover:text-red-400 transition-colors font-black uppercase text-[9px] tracking-[0.3em]">
                <FiLogOut /> Terminate_All_Sessions
              </button>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-8 relative">
            {/* SCANNER LINE ANIMATION */}
            <div className="absolute -inset-1 bg-gradient-to-b from-transparent via-[#E6F37920] to-transparent w-full h-full pointer-events-none animate-[scan_4s_linear_infinite] z-0 opacity-30" />

            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="bg-zinc-950/40 border border-white/10 rounded-[4rem] p-10 md:p-20 backdrop-blur-3xl relative z-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
              >
                {activeTab === "Identity" && (
                  <div className="space-y-16">
                    <div>
                      <SectionTitle title="Biological_Registry" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <InputGroup label="Entity Name" placeholder="Ricardo Valentino Mandini" prefix="ID:" />
                        <InputGroup label="Temporal Region" placeholder="European Union" prefix="LOC:" />
                        <InputGroup label="Digital Mail" placeholder="richie@zelloh.io" prefix="EML:" />
                        <InputGroup label="Identity Hash" placeholder="rvzm-9494-001" prefix="#" disabled />
                      </div>
                    </div>

                    <div>
                      <SectionTitle title="Visual_Signature" />
                      <div className="flex flex-col md:flex-row items-center gap-10 bg-white/[0.02] p-10 rounded-[3rem] border border-white/5 group hover:border-[#E6F37930] transition-colors">
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#E6F379] to-white p-[2px] shadow-[0_0_30px_#E6F37920]">
                            <div className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center">
                               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Richie" alt="avatar" className="w-full h-full scale-110" />
                            </div>
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-[#E6F379] text-black p-2 rounded-full shadow-xl">
                            <FiCheck size={12} strokeWidth={4} />
                          </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <p className="text-[10px] font-black text-zinc-600 uppercase mb-2 tracking-widest">Verification_Tier</p>
                          <h4 className="text-3xl font-[1000] italic uppercase text-white">Elite God Mode</h4>
                          <p className="text-xs text-zinc-500 mt-2 font-medium italic">Validated via decentralized ledger on Nov '22</p>
                        </div>
                        <button className="px-8 py-4 bg-white/5 hover:bg-[#E6F379] hover:text-black rounded-2xl text-[10px] font-black uppercase italic transition-all">Upload_New</button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Security" && (
                  <div className="space-y-12">
                    <SectionTitle title="Active_Defense_Protocols" />
                    <div className="space-y-4">
                      <ToggleOption label="Two-Factor Neural Auth" active desc="Hardware key required for all wallet signatures." />
                      <ToggleOption label="Chain_Obfuscation" desc="Enables Zero-Knowledge proof for metadata protection." />
                      <ToggleOption label="Quantum_Lock" active desc="Instant session termination on unauthorized IP change." />
                    </div>
                    
                    <div className="mt-16 pt-16 border-t border-white/5">
                       <SectionTitle title="Terminal_Reset" />
                       <div className="bg-red-500/5 border border-red-500/20 p-10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8">
                          <div className="space-y-2 text-center md:text-left">
                            <h5 className="text-red-500 font-black uppercase italic tracking-tighter text-xl">Danger Zone</h5>
                            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">This action will wipe all local encrypted session keys.</p>
                          </div>
                          <button className="px-10 py-5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl font-black uppercase italic text-[10px] tracking-[0.2em] transition-all border border-red-500/20 shadow-2xl">
                             Master_Key_Purge
                          </button>
                       </div>
                    </div>
                  </div>
                )}

                {/* ACTION BAR INFERIOR */}
                <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
                  <div className="flex items-center gap-3 text-zinc-700">
                    <FiKey />
                    <span className="text-[9px] font-black uppercase tracking-widest">Auth_Level: 05_Master</span>
                  </div>
                  <button 
                    onClick={handleSave}
                    className={`px-16 py-6 rounded-2xl font-[1000] uppercase italic text-sm tracking-[0.2em] transition-all flex items-center gap-5 shadow-2xl ${isSaving ? 'bg-[#E6F379] text-black' : 'bg-white text-black hover:bg-[#E6F379] hover:scale-105 active:scale-95'}`}
                  >
                    {isSaving ? (
                      <><FiZap className="animate-spin" /> Synchronizing...</>
                    ) : (
                      <><FiCheck strokeWidth={3} /> Commit_Changes</>
                    )}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}

// --- COMPONENTES AUXILIARES CON REFINAMIENTO ---

function TabButton({ active, onClick, icon, label, sub }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-6 p-8 rounded-[3rem] transition-all relative overflow-hidden group ${active ? 'bg-white text-black shadow-2xl scale-[1.03]' : 'hover:bg-white/5 text-zinc-500'}`}
    >
      <div className={`text-3xl ${active ? 'text-black' : 'text-[#E6F379] opacity-50 group-hover:opacity-100 transition-opacity'}`}>
        {icon}
      </div>
      <div className="text-left">
        <p className="text-[12px] font-[1000] uppercase tracking-tighter leading-none mb-1.5">{label}</p>
        <p className={`text-[9px] font-bold uppercase opacity-60 ${active ? 'text-black' : 'text-zinc-600'}`}>{sub}</p>
      </div>
      {active && (
        <motion.div layoutId="tabMarker" className="absolute right-8 w-2 h-2 rounded-full bg-black shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
      )}
    </button>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-6 mb-12">
      <h3 className="text-2xl font-[1000] uppercase italic tracking-tighter text-zinc-600">{title}</h3>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  );
}

function InputGroup({ label, placeholder, disabled, prefix }: any) {
  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em] ml-4">{label}</label>
      <div className="relative group">
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#E6F379] opacity-40 group-focus-within:opacity-100 transition-opacity italic">
          {prefix}
        </span>
        <input 
          type="text" 
          placeholder={placeholder}
          disabled={disabled}
          className="w-full bg-black/60 border border-white/5 rounded-3xl pl-16 pr-8 py-5 text-sm font-bold text-white focus:outline-none focus:border-[#E6F379] transition-all placeholder:text-zinc-800 disabled:opacity-20 disabled:cursor-not-allowed group-hover:border-white/10"
        />
      </div>
    </div>
  );
}

function ToggleOption({ label, desc, active }: any) {
  const [isOn, setIsOn] = useState(active || false);
  return (
    <div 
      onClick={() => setIsOn(!isOn)}
      className="flex items-center justify-between p-8 bg-black/40 rounded-[2.5rem] border border-white/5 cursor-pointer group hover:bg-white/[0.03] hover:border-white/10 transition-all"
    >
      <div className="max-w-[80%]">
        <p className="text-sm font-[1000] uppercase italic tracking-tight mb-2 text-white/90">{label}</p>
        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-relaxed">{desc}</p>
      </div>
      <div className={`w-16 h-9 rounded-full relative transition-all duration-500 p-1.5 ${isOn ? 'bg-[#E6F379]' : 'bg-zinc-900'}`}>
        <motion.div 
          animate={{ x: isOn ? 28 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="w-6 h-6 rounded-full bg-black shadow-lg flex items-center justify-center"
        >
          {isOn && <FiCheck className="text-[#E6F379] text-[12px]" strokeWidth={4} />}
        </motion.div>
      </div>
    </div>
  );
}