"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiPlus, FiMoreVertical, FiCreditCard, FiUnlock, 
  FiZap, FiArrowUpRight, FiShield, FiCpu, FiEye, 
  FiEyeOff, FiX, FiCopy, FiInfo, FiSmartphone, FiPlusCircle 
} from "react-icons/fi";
import { RiTwitterXFill, RiDiscordFill, RiWhatsappFill } from "react-icons/ri";

// --- TIPOS Y MOCK DATA ---
type TabType = "Zelloh" | "Crypto" | "Digital assets" | "CBDC’s";

const ACCOUNTS_DATA = [
  { id: "1", tab: "Zelloh", type: "Fiat Account", title: "Euro Vault", balance: "2,450.00", currency: "EUR", meta: "ES88 •••• 890", icon: "🇪🇺", details: { number: "ES88 2100 0421 22 1234567890", swift: "ZELLOHESMM", address: "Serrano 12, Madrid" } },
  { id: "2", tab: "Zelloh", type: "Global Account", title: "USD BREX", balance: "5,120.50", currency: "USD", meta: "Routing: 021000", icon: "🇺🇸", details: { number: "1029384756", routing: "021000021", swift: "ZELLOHUS33" } },
  { id: "3", tab: "Zelloh", type: "Digital Asset", title: "Zelloh Coin", balance: "12,500", currency: "ZLL", meta: "Mainnet Active", icon: "🟡", details: { address: "0x71C7...d897", network: "Zelloh Chain" } },
];

export default function UnifiedAccountPage() {
  const [activeTab, setActiveTab] = useState<TabType>("Zelloh");
  const [selectedAcc, setSelectedAcc] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const tabs: TabType[] = ["Zelloh", "Crypto", "Digital assets", "CBDC’s"];

  return (
    <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 py-10 space-y-12">
      
      {/* HERO SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-[#E6F379]/10 border border-[#E6F379]/20 px-4 py-1.5 rounded-full">
            <FiZap className="text-[#E6F379]" size={12} />
            <span className="text-[10px] font-[1000] uppercase tracking-widest text-[#E6F379]">Premium Account Management</span>
          </motion.div>
          <h1 className="text-6xl md:text-7xl font-[1000] uppercase italic tracking-tighter leading-[0.85] text-white">
            Assets & <br /> <span className="text-[#E6F379]">Accounts_</span>
          </h1>
        </div>
        <div className="lg:col-span-4 text-right hidden lg:block pb-2">
           <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">
             Military-grade encryption <br /> & IOT security protocols <br /> active for @mandini
           </p>
        </div>
      </div>

      {/* NAVEGACIÓN Y ACCIÓN PRINCIPAL */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-zinc-900 pb-6 gap-6">
        <div className="flex gap-8 md:gap-12 overflow-x-auto w-full md:w-auto no-scrollbar">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`text-[11px] font-[1000] uppercase tracking-[0.25em] transition-all relative whitespace-nowrap ${activeTab === tab ? "text-white" : "text-zinc-600 hover:text-zinc-300"}`}>
              {tab}
              {activeTab === tab && <motion.div layoutId="tabUnderline" className="absolute -bottom-[26px] left-0 right-0 h-1 bg-[#E6F379]" />}
            </button>
          ))}
        </div>
        <button onClick={() => setIsModalOpen(true)} className="w-full md:w-auto bg-white text-black px-8 py-4 rounded-full text-[11px] font-[1000] uppercase italic hover:bg-[#E6F379] transition-all flex items-center justify-center gap-2">
          <FiPlusCircle size={18} strokeWidth={2.5} /> Open New Vault
        </button>
      </div>

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* COLUMNA IZQUIERDA: RESUMEN Y SOCIAL BOTS */}
        <div className="lg:col-span-4 space-y-8">
          {/* USER CARD */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-[3rem] p-10">
            <div className="space-y-8">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-gradient-to-tr from-[#E6F379] to-white rounded-[1.5rem] flex items-center justify-center shadow-[0_0_30px_rgba(230,243,121,0.2)]">
                  <span className="text-black font-[1000] italic text-2xl">Z</span>
                </div>
                <div>
                  <h2 className="text-2xl font-[1000] uppercase italic text-white leading-none">@mandini</h2>
                  <p className="text-[9px] font-black uppercase text-zinc-600 tracking-widest mt-1">Verified User</p>
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-zinc-900">
                <AccountStat label="Region" value="Madrid, ES" />
                <AccountStat label="Z-Security" value="Active" color="text-[#E6F379]" />
                <AccountStat label="X-Bridge" value="Connected" color="text-blue-400" />
              </div>
            </div>
          </div>

          {/* X MONEY BRIDGE */}
          <div className="bg-zinc-900/40 border border-zinc-900 p-8 rounded-[3rem] space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-white text-black p-1.5 rounded-lg"><RiTwitterXFill size={18} /></div>
              <span className="font-[1000] uppercase italic tracking-tighter text-white">X_Transfer_Bot</span>
            </div>
            <p className="text-[10px] text-zinc-500 font-bold leading-relaxed uppercase">
              Envía dinero vía Tweet: <br />
              <span className="text-zinc-300">"@zellohbot send 50€ to @user"</span>
            </p>
            <button className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl text-[9px] font-black uppercase tracking-widest text-white transition-all">
              Ir al Bot de X
            </button>
          </div>
        </div>

        {/* COLUMNA DERECHA: ASSETS & CARDS */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* DEFAULT VIRTUAL CARD */}
          <div className="relative group overflow-hidden bg-gradient-to-br from-zinc-800 to-black rounded-[2.5rem] p-8 border border-white/10 shadow-2xl h-64 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-[#E6F379] uppercase tracking-[0.3em]">Default Card</span>
                <h3 className="text-2xl font-[1000] uppercase italic tracking-tighter text-white">Zelloh Virtual_</h3>
              </div>
              <FiCreditCard size={32} className="text-white/20" />
            </div>
            <div className="flex items-center gap-6">
              <p className={`text-2xl font-black tracking-[0.25em] text-white ${!showCard && 'blur-md'}`}>
                4492 8812 0034 9921
              </p>
              <button onClick={() => setShowCard(!showCard)} className="text-zinc-500 hover:text-white transition-colors">
                {showCard ? <FiEyeOff size={20}/> : <FiEye size={20}/>}
              </button>
            </div>
          </div>

          {/* LISTA DE CUENTAS FILTRADAS */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] px-4">Your {activeTab} Assets</h3>
            {ACCOUNTS_DATA.filter(a => a.tab === activeTab).map((acc) => (
              <ProWalletCard 
                key={acc.id}
                type={acc.type}
                title={acc.title}
                id={acc.meta}
                balance={`${acc.balance} ${acc.currency}`}
                icon={acc.icon}
                onClick={() => setSelectedAcc(acc)}
              />
            ))}
          </div>

          {/* ACCIONES DE TARJETAS ADICIONALES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MiniActionCard icon={<FiSmartphone />} title="Add Virtual" />
            <MiniActionCard icon={<FiCreditCard />} title="Order Metal" highlight />
          </div>
        </div>
      </div>

      {/* MODAL: NEW VAULT FLOW */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-[3rem] p-10">
              <h3 className="text-3xl font-[1000] uppercase italic tracking-tighter text-white mb-8">Create_Vault</h3>
              <div className="space-y-3">
                <VaultTypeBtn icon="💶" label="Fiat IBAN/Routing" />
                <VaultTypeBtn icon="₿" label="Crypto Wallet" />
                <VaultTypeBtn icon="🟡" label="Zelloh Asset" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DRAWER: ACCOUNT DETAILS */}
      <AnimatePresence>
        {selectedAcc && (
          <AccountDrawer acc={selectedAcc} onClose={() => setSelectedAcc(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUBCOMPONENTES DE APOYO ---

function AccountStat({ label, value, color = "text-zinc-300" }: any) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[9px] font-black uppercase text-zinc-600 tracking-widest">{label}</span>
      <span className={`text-[11px] font-black uppercase ${color}`}>{value}</span>
    </div>
  );
}

function ProWalletCard({ type, title, id, balance, icon, onClick }: any) {
  return (
    <div onClick={onClick} className="group relative bg-zinc-900/50 border border-zinc-900 p-8 rounded-[2.5rem] hover:border-[#E6F379]/50 transition-all cursor-pointer flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-2xl border border-zinc-800 group-hover:border-[#E6F379]/30 transition-colors">
          {icon}
        </div>
        <div className="space-y-0.5">
          <span className="text-[8px] font-black uppercase text-[#E6F379] tracking-[0.3em]">{type}</span>
          <h3 className="text-xl font-[1000] uppercase italic tracking-tighter text-white">{title}</h3>
          <p className="text-[10px] font-bold text-zinc-500 uppercase">{id}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xl font-[1000] text-white italic tracking-tighter">{balance}</p>
        <div className="flex justify-end gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <FiUnlock size={14} className="text-zinc-500 hover:text-white" />
          <FiArrowUpRight size={14} className="text-zinc-500 hover:text-[#E6F379]" />
        </div>
      </div>
    </div>
  );
}

function MiniActionCard({ icon, title, highlight }: any) {
  return (
    <div className={`p-6 rounded-[2rem] border flex items-center gap-4 cursor-pointer transition-all hover:scale-105 ${highlight ? 'bg-[#E6F379] border-transparent text-black' : 'bg-zinc-900 border-zinc-800 text-white'}`}>
      <div className="w-10 h-10 bg-black/10 rounded-xl flex items-center justify-center text-xl">
        {icon}
      </div>
      <span className="font-[1000] uppercase italic tracking-tighter text-sm">{title}</span>
    </div>
  );
}

function VaultTypeBtn({ icon, label }: any) {
  return (
    <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-[#E6F379]/50 cursor-pointer transition-all group">
      <span className="text-2xl">{icon}</span>
      <span className="font-black uppercase italic tracking-tighter text-white group-hover:text-[#E6F379]">{label}</span>
    </div>
  );
}

function AccountDrawer({ acc, onClose }: any) {
  return (
    <div className="fixed inset-0 z-[120] flex justify-end">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="relative w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full p-10 flex flex-col">
          <button onClick={onClose} className="absolute top-8 right-8 text-zinc-500 hover:text-white"><FiX size={24}/></button>
          <div className="mt-12 space-y-10">
              <div className="flex items-center gap-6">
                <span className="text-6xl">{acc.icon}</span>
                <div>
                  <h2 className="text-4xl font-[1000] uppercase italic tracking-tighter text-white leading-none">{acc.title}</h2>
                  <p className="text-[#E6F379] font-black text-2xl mt-2">{acc.balance}</p>
                </div>
              </div>
              <div className="space-y-6">
                {acc.details.number && <DrawerRow label="Account / IBAN" value={acc.details.number} />}
                {acc.details.routing && <DrawerRow label="Routing Number" value={acc.details.routing} />}
                {acc.details.swift && <DrawerRow label="SWIFT / BIC" value={acc.details.swift} />}
                {acc.details.network && <DrawerRow label="Network" value={acc.details.network} />}
                {acc.details.address && <DrawerRow label="Address" value={acc.details.address} />}
              </div>
          </div>
          <div className="mt-auto bg-zinc-900 p-6 rounded-3xl border border-zinc-800 flex items-center gap-4">
            <FiShield size={24} className="text-[#E6F379]" />
            <p className="text-[9px] font-black uppercase text-zinc-500 leading-relaxed">
              Vault encriptado. No reveles las credenciales bancarias.
            </p>
          </div>
      </motion.div>
    </div>
  );
}

function DrawerRow({ label, value }: any) {
  return (
    <div className="space-y-2">
      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{label}</p>
      <div className="flex justify-between items-center bg-black p-4 rounded-xl border border-zinc-900">
        <code className="text-xs font-bold text-zinc-300 break-all">{value}</code>
        <button onClick={() => navigator.clipboard.writeText(value)} className="text-zinc-600 hover:text-[#E6F379]"><FiCopy /></button>
      </div>
    </div>
  );
}