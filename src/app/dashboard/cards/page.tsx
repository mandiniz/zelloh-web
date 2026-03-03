"use client";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { 
  FiPlus, FiLock, FiUnlock, FiEye, FiZap, FiShield, 
  FiCpu, FiGlobe, FiChevronRight, FiActivity, FiX, 
  FiCheckCircle, FiLayers, FiRadio, FiTerminal, FiDatabase, FiServer,
  FiCreditCard
} from "react-icons/fi";

// --- TIPOS ---
type ModalType = "Vault" | "Assets" | "Security" | "Nodes" | "none";
type Notification = { id: number; message: string; type: "success" | "alert" | "system" };

export default function CardsPageGodMode() {
  const [activeModal, setActiveModal] = useState<ModalType>("none");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 9102");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  // --- MOUSE/TOUCH TRACKING (Ajustado para evitar desbordamiento en móvil) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // En móviles reducimos la rotación a la mitad (7.5deg) para que no se "corte" la tarjeta
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]), { stiffness: 150, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]), { stiffness: 150, damping: 25 });
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]));
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]));

  const addNotify = (message: string, type: Notification["type"] = "success") => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  };

  useEffect(() => {
    if (isRevealing && !isFrozen) {
      let iterations = 0;
      const target = "4555 8812 0900 9102";
      const characters = "0123456789X$/#";
      const interval = setInterval(() => {
        setCardNumber(target.split("").map((char, index) => {
          if (char === " ") return " ";
          if (index < iterations) return target[index];
          return characters[Math.floor(Math.random() * characters.length)];
        }).join(""));
        if (iterations >= target.length) clearInterval(interval);
        iterations += 1/3;
      }, 40);
      return () => clearInterval(interval);
    } else {
      setCardNumber("•••• •••• •••• 9102");
    }
  }, [isRevealing, isFrozen]);

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 md:p-12 font-sans selection:bg-[#E6F379] selection:text-black overflow-x-hidden relative">
      
      {/* BACKGROUND FX */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} />

      {/* SISTEMA DE TOASTS - Reposicionado para móvil */}
      <div className="fixed top-4 right-4 left-4 md:left-auto md:top-10 md:right-10 z-[150] space-y-3">
        <AnimatePresence mode="popLayout">
          {notifications.map(n => (
            <motion.div key={n.id} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ x: 50, opacity: 0 }}
              className={`flex items-center gap-4 px-6 py-4 border backdrop-blur-2xl rounded-2xl shadow-2xl ${n.type === 'alert' ? 'border-red-500/50 bg-red-500/10 text-red-500' : 'border-[#E6F379]/30 bg-black/60 text-[#E6F379]'}`}>
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">{n.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-[1500px] mx-auto relative z-10">
        
        {/* HEADER RESPONSIVO */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12 md:mb-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <FiTerminal className="text-black" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Zelloh_OS v2.0</span>
          </motion.div>

          {/* NAVEGACIÓN: Scroll horizontal en móviles */}
          <nav className="flex gap-4 md:gap-10 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar justify-center">
            {(["Vault", "Assets", "Security", "Nodes"] as ModalType[]).map((item) => (
              <button key={item} onClick={() => setActiveModal(item)} className="group relative py-2 flex-shrink-0">
                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeModal === item ? "text-[#E6F379]" : "text-zinc-500 group-hover:text-white"}`}>
                  {item}
                </span>
                {activeModal === item && (
                  <motion.div layoutId="headerDot" className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#E6F379] shadow-[0_0_8px_#E6F379]" />
                )}
              </button>
            ))}
          </nav>
        </header>

        {/* --- MAIN CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
          
          {/* TEXTO: Títulos escalables */}
          <div className="lg:col-span-5 space-y-8 md:space-y-12 text-center lg:text-left">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
               <h1 className="text-[clamp(4rem,15vw,9rem)] font-[1000] leading-[0.8] uppercase italic tracking-tighter">
                Black<br /><span className="text-[#E6F379]">Core_</span>
              </h1>
            </motion.div>
            <div className="flex bg-zinc-900/30 p-5 md:p-6 rounded-3xl border border-white/5 items-center gap-5 justify-center lg:justify-start">
                <FiActivity className="text-[#E6F379] animate-pulse shrink-0" size={20} />
                <p className="text-[9px] md:text-[10px] font-black uppercase text-zinc-500 leading-relaxed tracking-widest text-left">
                  Encryption: <span className="text-white">Active</span> — 
                  Status: <span className="text-white italic">God_Mode</span>
                </p>
            </div>
          </div>

          {/* ÁREA DE TARJETA 3D */}
          <div className="lg:col-span-7 flex flex-col items-center relative">
            <div className="relative w-full max-w-[540px] aspect-[1.58/1] perspective-[2000px] cursor-none"
                 onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
                    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
                 }}
                 onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
                 // Soporte táctil básico
                 onTouchMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const touch = e.touches[0];
                    mouseX.set((touch.clientX - rect.left) / rect.width - 0.5);
                    mouseY.set((touch.clientY - rect.top) / rect.height - 0.5);
                 }}
                 onTouchEnd={() => { mouseX.set(0); mouseY.set(0); }}
                 >
              
              <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 40, damping: 12 }}
                className="w-full h-full relative">
                
                {/* FRONT */}
                <div className={`absolute inset-0 backface-hidden rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-12 border border-white/10 overflow-hidden shadow-2xl transition-all duration-700 ${isFrozen ? 'grayscale brightness-[0.2]' : 'bg-[#080808]'}`}>
                  <motion.div style={{ background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(230,243,121,0.12) 0%, transparent 60%)` }} className="absolute inset-0 pointer-events-none" />
                  
                  <div className="flex justify-between items-start relative z-10 text-[#E6F379]">
                    <FiZap size={32} className="md:size-[40px]" />
                    <div className="text-right">
                      <span className="block font-mono text-[8px] tracking-[0.4em] opacity-50 uppercase">Secured by</span>
                      <span className="font-mono text-[10px] tracking-[0.2em] font-black">{isFrozen ? "LOCKED" : "ZELLOH_PROTOCOL"}</span>
                    </div>
                  </div>

                  <div className="mt-16 md:mt-24 relative z-10">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-mono tracking-widest font-black text-white whitespace-nowrap overflow-hidden">
                      {cardNumber}
                    </h2>
                    <div className="mt-4 md:mt-8 flex justify-between items-end">
                      <div>
                        <p className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em]">Card Holder</p>
                        <p className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest">Richie Mandini</p>
                      </div>
                      <div className="w-10 h-6 md:w-14 md:h-8 bg-zinc-800/50 rounded-md border border-white/5" />
                    </div>
                  </div>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 backface-hidden rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-12 bg-[#050505] border border-white/10 shadow-2xl flex flex-col justify-between" style={{ transform: "rotateY(180deg)" }}>
                   <div className="w-full h-10 md:h-14 bg-zinc-900 -mx-12 mt-4" />
                   <div className="bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10 flex justify-between items-center">
                      <div>
                        <p className="text-[8px] font-black text-zinc-500 uppercase">Secure_Code</p>
                        <p className="text-2xl md:text-3xl font-bold text-[#E6F379]">{isFrozen ? "•••" : "882"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] font-black text-zinc-500 uppercase">Valid_Thru</p>
                        <p className="text-sm md:text-xl font-bold">12 / 28</p>
                      </div>
                   </div>
                </div>
              </motion.div>
            </div>

            {/* CONTROL DOCK - Ajustado para ser más táctil */}
            <div className="mt-8 md:mt-12 flex bg-zinc-950/80 backdrop-blur-md p-2 rounded-full border border-white/10 gap-2 md:gap-4 shadow-2xl">
               <DockBtn icon={<FiEye />} onClick={() => { setIsRevealing(!isRevealing); addNotify(isRevealing ? "HIDDEN" : "REVEALED", "system"); }} active={isRevealing} />
               <DockBtn icon={isFrozen ? <FiUnlock /> : <FiLock />} onClick={() => { setIsFrozen(!isFrozen); addNotify(isFrozen ? "RESTORING..." : "CARD_FROZEN", isFrozen ? "success" : "alert"); }} active={isFrozen} danger />
               <DockBtn icon={<FiCpu />} onClick={() => setIsFlipped(!isFlipped)} />
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL MAESTRO RESPONSIVO --- */}
      <AnimatePresence>
        {activeModal !== "none" && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal("none")} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.9, y: 50, opacity: 0 }} 
              animate={{ scale: 1, y: 0, opacity: 1 }} 
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              className="relative w-full max-w-xl bg-zinc-950 border border-[#E6F379]/20 rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(230,243,121,0.05)]"
            >
              <div className="p-8 md:p-10">
                <div className="flex justify-between items-center mb-10">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#E6F379] flex items-center justify-center text-black shrink-0 shadow-[0_0_15px_rgba(230,243,121,0.3)]">
                         {activeModal === "Vault" && <FiDatabase />}
                         {activeModal === "Assets" && <FiLayers />}
                         {activeModal === "Security" && <FiShield />}
                         {activeModal === "Nodes" && <FiServer />}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-[1000] uppercase italic tracking-tighter text-white">{activeModal}_Module</h3>
                   </div>
                   <button onClick={() => setActiveModal("none")} className="p-3 rounded-full bg-zinc-900 text-zinc-500 hover:text-white transition-colors">
                      <FiX size={18} />
                   </button>
                </div>

                <div className="space-y-4 md:space-y-6">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <DataPoint label="Status" value="OPERATIONAL" highlight />
                      <DataPoint label="Protocol" value="GOD_V.2" />
                      <DataPoint label="Region" value="Decentralized" />
                      <DataPoint label="Integrity" value="Verified" />
                   </div>
                   
                   <div className="mt-6 p-6 md:p-8 bg-black/50 rounded-2xl border border-white/5 space-y-3 font-mono text-[9px] md:text-[11px]">
                      <p className="text-zinc-600"> {">"} Syncing with Zelloh Network...</p>
                      <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                         <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1 }} className="h-full bg-[#E6F379]" />
                      </div>
                      <p className="text-[#E6F379] animate-pulse"> {">"} ACCESS_GRANTED: GOD_MODE_ENABLED</p>
                   </div>
                </div>

                <button onClick={() => { setActiveModal("none"); addNotify(`${activeModal} Updated`, "success"); }} className="w-full mt-8 py-4 md:py-5 bg-white text-black rounded-xl font-[1000] uppercase italic text-[10px] tracking-[0.2em] hover:bg-[#E6F379] active:scale-95 transition-all">
                  Confirm Operation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTES OPTIMIZADOS ---

function DockBtn({ icon, onClick, active, danger }: any) {
  return (
    <button onClick={onClick} className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-xl transition-all active:scale-90 ${active ? (danger ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-[#E6F379] text-black shadow-[0_0_20px_rgba(230,243,121,0.4)]') : 'bg-zinc-900/50 text-zinc-500 hover:text-white'}`}>
       {icon}
    </button>
  );
}

function DataPoint({ label, value, highlight }: any) {
  return (
    <div className="p-5 bg-zinc-900/20 border border-white/5 rounded-xl">
      <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-xs md:text-sm font-[1000] uppercase tracking-tighter ${highlight ? 'text-[#E6F379]' : 'text-white'}`}>{value}</p>
    </div>
  );
}