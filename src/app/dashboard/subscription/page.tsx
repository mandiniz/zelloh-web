"use client";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { 
  FiCheck, FiInfo, FiZap, FiStar, FiShield, 
  FiCpu, FiLoader, FiArrowRight, FiLock 
} from "react-icons/fi";

type PlanTier = "Zeller" | "Premium" | "Patron" | "Pro";

export default function SubscriptionElitePage() {
  const [currentPlan, setCurrentPlan] = useState<PlanTier>("Zeller");
  const [isProcessing, setIsProcessing] = useState<PlanTier | null>(null);

  const handleSubscriptionChange = (tier: PlanTier) => {
    if (tier === currentPlan) return;
    setIsProcessing(tier);
    
    // Simulación de validación de seguridad y red
    setTimeout(() => {
      setCurrentPlan(tier);
      setIsProcessing(null);
    }, 2200);
  };

  return (
    <main className="bg-[#020202] text-white min-h-screen flex flex-col font-sans pb-32 selection:bg-[#E6F379] selection:text-black">
      <Header />

      {/* GRADIENTES AMBIENTALES DE ALTA FIDELIDAD */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#E6F379]/10 blur-[150px] rounded-full" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[50%] bg-purple-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="flex-grow max-w-[1440px] mx-auto w-full px-10 py-24 relative z-10">
        
        {/* SECCIÓN DE TÍTULO DINÁMICO */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-[11px] font-[1000] uppercase tracking-[0.5em] text-[#E6F379] mb-6 block"
            >
              Exclusive Membership
            </motion.span>
            <h1 className="text-7xl md:text-8xl font-[1000] uppercase italic tracking-tighter leading-[0.8] mb-4">
              Unlock the <br /> <span className="text-zinc-800">Next_</span> Level
            </h1>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800/50 p-6 rounded-[2rem] backdrop-blur-md">
            <p className="text-[10px] font-black uppercase text-zinc-500 mb-2">Active Subscription</p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#E6F379] animate-pulse" />
              <span className="text-xl font-[1000] uppercase italic">{currentPlan}</span>
            </div>
          </div>
        </header>

        {/* CONTENEDOR DE TARJETAS CON LAYOUT GROUP */}
        <LayoutGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <EliteCard 
              tier="Zeller" icon={<FiShield />} 
              features={["Standard Card", "Basic IBAN", "3 Free top up", "$1k Limit"]}
              current={currentPlan} isProcessing={isProcessing} onSelect={handleSubscriptionChange}
            />
            <EliteCard 
              tier="Premium" icon={<FiStar />} price="$4.99"
              features={["+1% Interest", "Priority Support", "5 Free top up", "$2.5k Limit"]}
              current={currentPlan} isProcessing={isProcessing} onSelect={handleSubscriptionChange}
            />
            <EliteCard 
              tier="Patron" icon={<FiZap />} price="$9.99" highlight
              features={["+1.5% Interest", "Multi-Account", "10 Free top up", "$5k Limit"]}
              current={currentPlan} isProcessing={isProcessing} onSelect={handleSubscriptionChange}
            />
            <EliteCard 
              tier="Pro" icon={<FiCpu />} price="$14.99"
              features={["Business Tools", "Invoicing API", "Unlimited top up", "No C/C Limits"]}
              current={currentPlan} isProcessing={isProcessing} onSelect={handleSubscriptionChange}
            />
          </div>
        </LayoutGroup>

        {/* FOOTER SMART FEE */}
        <footer className="mt-24 text-center">
          <div className="inline-flex items-center gap-4 bg-zinc-900/20 border border-zinc-800/40 px-8 py-4 rounded-full">
            <FiLock className="text-zinc-600" size={14} />
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              Encrypted transaction • $1 monthly maintenance fee applies
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}

function EliteCard({ tier, icon, features, price, current, isProcessing, onSelect, highlight }: any) {
  const isActive = current === tier;
  const loading = isProcessing === tier;

  return (
    <motion.div 
      layout
      className={`relative h-[620px] rounded-[3.5rem] p-[1px] overflow-hidden group transition-all duration-700 ${
        highlight ? 'bg-gradient-to-b from-[#E6F379] to-[#8A5CF6]' : 'bg-zinc-800/50 hover:bg-zinc-800'
      }`}
    >
      <div className={`h-full w-full rounded-[3.45rem] p-10 flex flex-col justify-between backdrop-blur-3xl ${
        highlight ? 'bg-[#E6F379]' : 'bg-black/90'
      }`}>
        
        <div>
          {/* ICONO CON EFECTO DE CRISTAL */}
          <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-2xl mb-10 shadow-2xl transition-transform group-hover:scale-110 duration-500 ${
            highlight ? 'bg-black text-[#E6F379]' : 'bg-zinc-900 text-[#E6F379]'
          }`}>
            {icon}
          </div>

          <h3 className={`text-4xl font-[1000] uppercase italic tracking-tighter leading-none mb-2 ${
            highlight ? 'text-black' : 'text-white'
          }`}>
            {tier}
          </h3>
          
          <div className="h-[2px] w-8 bg-[#8A5CF6] mb-8" />

          {/* LISTA DE FEATURES CON MICRO-ANIMACIONES */}
          <div className="space-y-5">
            {features.map((f: string, i: number) => (
              <div key={i} className="flex items-center gap-3 group/item">
                <FiCheck className={`${highlight ? 'text-black' : 'text-[#E6F379]'} shrink-0`} size={16} />
                <p className={`text-[12px] font-black uppercase tracking-tight ${
                  highlight ? 'text-black/70' : 'text-zinc-400'
                }`}>
                  {f}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ÁREA DE ACCIÓN PRO */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {isActive ? (
              <motion.div 
                key="active" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="w-full py-5 bg-black/5 border border-black/10 rounded-2xl flex items-center justify-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#8A5CF6]" />
                <span className={`text-[11px] font-black uppercase italic ${highlight ? 'text-black' : 'text-zinc-500'}`}>
                  Your Current Plan
                </span>
              </motion.div>
            ) : (
              <motion.button
                key="buy"
                onClick={() => onSelect(tier)}
                disabled={!!isProcessing}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-5 rounded-2xl font-[1000] uppercase italic text-xl flex items-center justify-center gap-3 transition-all ${
                  highlight 
                    ? 'bg-black text-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]' 
                    : 'bg-white text-black hover:bg-[#E6F379]'
                }`}
              >
                {loading ? <FiLoader className="animate-spin" /> : (
                  <>
                    {price || 'Switch'} 
                    <FiArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" size={18} />
                  </>
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* OVERLAY DE BRILLO EN HOVER */}
      {!highlight && (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#E6F379]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      )}
    </motion.div>
  );
}