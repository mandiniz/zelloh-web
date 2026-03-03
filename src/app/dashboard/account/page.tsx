"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiPlus, FiCreditCard, FiZap, FiEye, 
  FiEyeOff, FiX, FiCopy, FiSmartphone, FiPlusCircle,
  FiLoader, FiChevronRight, FiLayers, FiShield // <--- Faltaba este boludo
} from "react-icons/fi";
import { RiTwitterXFill } from "react-icons/ri";

// --- INTERFACES (Blindadas para TS) ---
interface AccountDetails {
  number?: string;
  swift?: string;
  address?: string;
  routing?: string;
  network?: string;
  contract?: string;
}

interface Account {
  id: string;
  tab: "Zelloh" | "Crypto" | "Digital assets" | "CBDC’s";
  type: string;
  title: string;
  balance: string;
  currency: string;
  meta: string;
  icon: string;
  details: AccountDetails;
}

export default function UnifiedAccountFinal() {
  const [activeTab, setActiveTab] = useState<Account["tab"]>("Zelloh");
  const [modal, setModal] = useState<"none" | "create">("none");
  const [isLoading, setIsLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [selectedAcc, setSelectedAcc] = useState<Account | null>(null);

  const tabs: Account["tab"][] = ["Zelloh", "Crypto", "Digital assets", "CBDC’s"];

  // --- MOCK DATA ---
  const [accounts, setAccounts] = useState<Account[]>([
    { id: "1", tab: "Zelloh", type: "Fiat Account", title: "Euro Vault", balance: "2,450.00", currency: "EUR", meta: "ES88 •••• 890", icon: "🇪🇺", details: { number: "ES88 2100 0421 22 1234567890", swift: "ZELLOHESMM" } },
    { id: "2", tab: "Crypto", type: "Main Wallet", title: "Ethereum", balance: "1.42", currency: "ETH", meta: "0x71...d897", icon: "💎", details: { address: "0x71C7656EC7ab88b098defB751B7401B5f6d897", network: "Ethereum" } },
    { id: "3", tab: "Digital assets", type: "NFT", title: "Zelloh Ape #1", balance: "1", currency: "NFT", meta: "ID: 4421", icon: "🖼️", details: { contract: "0xbc4c...f132" } },
    { id: "4", tab: "CBDC’s", type: "Digital Currency", title: "Digital Euro", balance: "100.00", currency: "eEUR", meta: "Central Bank", icon: "🏛️", details: { number: "E-EUR-990" } },
  ]);

  const handleCreate = (title: string, currency: string, icon: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newAcc: Account = {
        id: Math.random().toString(),
        tab: activeTab,
        type: activeTab === "Zelloh" ? "New Vault" : "Active Asset",
        title, currency, icon,
        balance: "0.00",
        meta: "Pending Verification",
        details: { number: "GEN-" + Math.floor(Math.random() * 900000) }
      };
      setAccounts([...accounts, newAcc]);
      setIsLoading(false);
      setModal("none");
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#E6F379] selection:text-black">
      <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20 space-y-16">
        
        {/* HERO SECTION */}
        <header className="space-y-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 bg-[#E6F379]/10 border border-[#E6F379]/20 px-4 py-2 rounded-full">
            <FiZap className="text-[#E6F379]" size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#E6F379]">Premium Financial Suite</span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-[1000] uppercase italic tracking-tighter leading-[0.8]">
            Accounts <br /> <span className="text-[#E6F379]">& Assets_</span>
          </h1>
        </header>

        {/* --- NAVEGACIÓN (FORZADA PARA QUE APAREZCA) --- */}
        <div className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-md pt-4 border-b border-zinc-900">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-6">
            <nav className="flex items-center gap-8 md:gap-12 overflow-x-auto no-scrollbar w-full md:w-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative py-2 text-[11px] font-[1000] uppercase tracking-[0.25em] transition-colors whitespace-nowrap ${
                    activeTab === tab ? "text-white" : "text-zinc-600 hover:text-zinc-400"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="nav_underline" 
                      className="absolute -bottom-[25px] left-0 right-0 h-[3px] bg-[#E6F379] z-50"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </nav>
            <button 
              onClick={() => setModal("create")}
              className="group bg-white text-black px-8 py-4 rounded-full text-[11px] font-[1000] uppercase italic hover:bg-[#E6F379] transition-all flex items-center gap-2"
            >
              <FiPlusCircle size={18} className="group-hover:rotate-90 transition-transform" />
              New {activeTab}
            </button>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* COLUMNA IZQUIERDA: PERFIL */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-zinc-950 border border-zinc-900 rounded-[3rem] p-10 space-y-8 sticky top-40">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-tr from-[#E6F379] to-white rounded-[1.5rem] flex items-center justify-center shadow-[0_0_40px_rgba(230,243,121,0.2)]">
                  <span className="text-black font-black italic text-2xl">Z</span>
                </div>
                <div>
                  <h2 className="text-2xl font-[1000] uppercase italic leading-none">@mandini</h2>
                  <p className="text-[9px] font-black uppercase text-zinc-600 tracking-widest mt-2">Verified Hub</p>
                </div>
              </div>
              <div className="pt-8 border-t border-zinc-900 space-y-5">
                <StatRow label="Global Status" value="Online" color="text-[#E6F379]" />
                <StatRow label="Active Hub" value={activeTab} color="text-white" />
                <StatRow label="Security" value="AES-256" />
              </div>
              <button className="w-full py-4 bg-zinc-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">
                Access Audit Logs
              </button>
            </div>
          </aside>

          {/* COLUMNA DERECHA: CONTENIDO */}
          <section className="lg:col-span-8 space-y-10">
            {/* CARDS ESPECÍFICAS DE ZELLOH */}
            {activeTab === "Zelloh" && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative group">
                <div className="absolute inset-0 bg-[#E6F379]/5 blur-[100px] rounded-full -z-10" />
                <div className="bg-gradient-to-br from-zinc-800 to-black p-10 rounded-[3rem] border border-white/10 flex flex-col justify-between h-72">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-[#E6F379] uppercase tracking-[0.3em]">Default Asset</span>
                      <h3 className="text-4xl font-[1000] uppercase italic tracking-tighter">Zelloh Black_</h3>
                    </div>
                    <FiCreditCard size={35} className="text-white/20" />
                  </div>
                  <div className="flex items-center gap-6">
                    <p className={`text-3xl font-black tracking-[0.25em] ${!showCard && 'blur-xl select-none'}`}>4492 8812 0034 9921</p>
                    <button onClick={() => setShowCard(!showCard)} className="text-zinc-500 hover:text-white transition-colors">
                      {showCard ? <FiEyeOff size={22} /> : <FiEye size={22} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* LISTA DE ACTIVOS FILTRADA */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] px-4">{activeTab} Ledger</h3>
              <div className="space-y-3">
                {accounts.filter(a => a.tab === activeTab).map((acc) => (
                  <AssetItem key={acc.id} acc={acc} onClick={() => setSelectedAcc(acc)} />
                ))}
                {accounts.filter(a => a.tab === activeTab).length === 0 && (
                  <div className="py-20 text-center border-2 border-dashed border-zinc-900 rounded-[3rem]">
                    <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">No assets in this vault</p>
                  </div>
                )}
              </div>
            </div>

            {/* ACCIONES PARA ZELLOH */}
            {activeTab === "Zelloh" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ActionBtn icon={<FiSmartphone />} label="New Virtual" />
                <ActionBtn icon={<FiCreditCard />} label="Order Physical" highlight />
              </div>
            )}
          </section>
        </div>
      </div>

      {/* MODAL DE CREACIÓN */}
      <AnimatePresence>
        {modal === "create" && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal("none")} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-[3rem] p-10">
              {isLoading ? (
                <div className="py-20 flex flex-col items-center gap-6">
                  <FiLoader className="animate-spin text-[#E6F379]" size={40} />
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Syncing with {activeTab}...</p>
                </div>
              ) : (
                <div className="space-y-8">
                  <h3 className="text-3xl font-[1000] uppercase italic text-white tracking-tighter">Add_{activeTab}</h3>
                  <div className="space-y-4">
                    <button onClick={() => handleCreate(`${activeTab} Vault`, activeTab === "Zelloh" ? "EUR" : "BTC", "⚡")} className="w-full p-6 bg-zinc-900 rounded-2xl flex justify-between items-center hover:bg-white hover:text-black transition-all font-black uppercase italic">
                      Generate Asset <FiChevronRight />
                    </button>
                    <button onClick={() => setModal("none")} className="w-full py-4 text-[10px] font-black uppercase text-zinc-600 tracking-widest">Cancel</button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DRAWER DETALLES */}
      <AnimatePresence>
        {selectedAcc && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedAcc(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 200 }} className="relative w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full p-12 flex flex-col">
              <button onClick={() => setSelectedAcc(null)} className="absolute top-10 right-10 text-zinc-500 hover:text-white"><FiX size={28}/></button>
              <div className="mt-20 space-y-12 flex-grow">
                <div className="flex items-center gap-8">
                  <span className="text-7xl drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">{selectedAcc.icon}</span>
                  <div>
                    <h2 className="text-4xl font-[1000] uppercase italic tracking-tighter leading-none">{selectedAcc.title}</h2>
                    <p className="text-[#E6F379] font-black text-2xl mt-4">{selectedAcc.balance} {selectedAcc.currency}</p>
                  </div>
                </div>
                <div className="space-y-8 pt-12 border-t border-zinc-900">
                  {selectedAcc.details.number && <CopyRow label="Internal ID" value={selectedAcc.details.number} />}
                  {selectedAcc.details.address && <CopyRow label="Public Address" value={selectedAcc.details.address} />}
                  {selectedAcc.details.network && <CopyRow label="Network Node" value={selectedAcc.details.network} />}
                </div>
              </div>
              <div className="p-8 bg-zinc-900/50 rounded-3xl border border-zinc-800 flex items-center gap-4">
                <FiShield className="text-[#E6F379]" size={24} />
                <p className="text-[9px] font-black uppercase text-zinc-500 leading-relaxed">End-to-end encryption active for this asset. No unauthorized access detected.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

// --- COMPONENTES AUXILIARES ---

function StatRow({ label, value, color = "text-zinc-500" }: any) {
  return (
    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.15em]">
      <span className="text-zinc-600">{label}</span>
      <span className={color}>{value}</span>
    </div>
  );
}

function AssetItem({ acc, onClick }: { acc: Account, onClick: () => void }) {
  return (
    <div onClick={onClick} className="group bg-zinc-950 border border-zinc-900 p-8 rounded-[2.5rem] flex items-center justify-between hover:border-[#E6F379]/40 hover:bg-zinc-900/50 transition-all cursor-pointer">
      <div className="flex items-center gap-8">
        <div className="w-16 h-16 bg-zinc-900 rounded-[1.5rem] flex items-center justify-center text-3xl border border-zinc-800 group-hover:border-[#E6F379]/20 transition-all">
          {acc.icon}
        </div>
        <div className="space-y-1">
          <span className="text-[9px] font-black uppercase text-[#E6F379] tracking-[0.2em]">{acc.type}</span>
          <h4 className="text-2xl font-[1000] uppercase italic tracking-tighter">{acc.title}</h4>
        </div>
      </div>
      <div className="text-right">
        <p className="text-2xl font-[1000] italic">{acc.balance} <span className="text-xs text-zinc-600 font-bold">{acc.currency}</span></p>
        <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1 tracking-widest">{acc.meta}</p>
      </div>
    </div>
  );
}

function ActionBtn({ icon, label, highlight }: any) {
  return (
    <button className={`p-8 rounded-[2.5rem] border flex items-center gap-6 transition-all hover:scale-[1.02] ${highlight ? 'bg-[#E6F379] text-black border-transparent shadow-[0_20px_40px_rgba(230,243,121,0.15)]' : 'bg-zinc-950 border-zinc-900 text-white hover:border-zinc-700'}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${highlight ? 'bg-black/10' : 'bg-zinc-900'}`}>{icon}</div>
      <span className="font-[1000] uppercase italic text-lg tracking-tighter">{label}</span>
    </button>
  );
}

function CopyRow({ label, value }: any) {
  return (
    <div className="space-y-3">
      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">{label}</p>
      <div className="flex justify-between items-center bg-black p-5 rounded-2xl border border-zinc-900 group">
        <code className="text-xs text-zinc-400 font-bold break-all mr-6">{value}</code>
        <button onClick={() => navigator.clipboard.writeText(value)} className="text-zinc-700 hover:text-[#E6F379] transition-colors">
          <FiCopy size={18} />
        </button>
      </div>
    </div>
  );
}