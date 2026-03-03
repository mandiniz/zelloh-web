"use client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiX, FiTerminal, FiHash, FiLayers, FiMail, 
  FiZap, FiShield, FiAlertTriangle, FiArrowRight,
  FiAlertCircle // Corregido: Importación añadida para evitar el error 2304
} from "react-icons/fi";

const EXPO_EASE = [0.16, 1, 0.3, 1] as const;

export default function NewTopicModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl">
      {/* Decoración de Fondo (Grid Técnico) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 40, rotateX: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40, rotateX: -10 }}
        transition={{ duration: 0.8, ease: EXPO_EASE }}
        className="relative bg-[#080808] w-full max-w-5xl rounded-[4rem] border border-white/10 shadow-[0_0_100px_rgba(230,243,121,0.05)] overflow-hidden flex flex-col lg:flex-row h-full max-h-[90vh]"
      >
        
        {/* --- SIDEBAR DE ESTADO (Look Industrial) --- */}
        <div className="lg:w-1/3 bg-[#E6F379] p-12 flex flex-col justify-between text-black">
          <div className="space-y-8">
            <FiTerminal size={40} className="animate-pulse" />
            <div className="space-y-2">
              <h2 className="text-5xl font-[1000] italic uppercase leading-[0.85] tracking-tighter">
                INITIATE_<br />PROPOSAL.
              </h2>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
                Protocol_Version: 4.0.2-ALPHA
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-black/5 border border-black/10 rounded-3xl space-y-2">
              <FiShield className="mb-2" />
              <p className="text-xs font-bold leading-tight uppercase italic">
                "Every proposal is recorded on the immutable Zelloh Ledger."
              </p>
            </div>
            <div className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">
              Authorized_Session_Only
            </div>
          </div>
        </div>

        {/* --- ÁREA DE FORMULARIO (Look Tech-Dark) --- */}
        <div className="flex-1 p-8 md:p-16 overflow-y-auto custom-scrollbar space-y-12">
          {/* Header del Formulario */}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[#E6F379] text-[10px] font-black uppercase tracking-[0.5em]">Input_Phase_01</span>
              <h3 className="text-2xl font-black italic uppercase tracking-tighter">Transmission_Details</h3>
            </div>
            <button 
              onClick={onClose}
              className="group p-4 bg-white/5 hover:bg-[#E6F379] rounded-full transition-all duration-500"
            >
              <FiX className="text-white group-hover:text-black transition-colors" size={20} />
            </button>
          </div>

          {/* Grid de Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Brief Input */}
            <div className="col-span-2 group">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4 block group-focus-within:text-[#E6F379] transition-colors">Discussion_Header</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Summarize the core intent..." 
                  className="w-full bg-transparent border-b-2 border-white/10 py-4 text-2xl font-bold italic outline-none focus:border-[#E6F379] transition-all placeholder:text-zinc-800"
                />
              </div>
            </div>

            {/* Project Select */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block">Core_Project</label>
              <div className="relative">
                <FiHash className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700" />
                <select className="w-full bg-white/5 border border-white/5 rounded-2xl py-6 pl-14 pr-8 font-black italic appearance-none outline-none focus:border-[#E6F379] focus:bg-white/10 transition-all">
                  <option className="bg-zinc-950">Grant_Proposals</option>
                  <option className="bg-zinc-950">Infrastructure_Audit</option>
                  <option className="bg-zinc-950">Community_Growth</option>
                </select>
              </div>
            </div>

            {/* Topic Input */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block">Topic_Vector</label>
              <div className="relative">
                <FiLayers className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700" />
                <input 
                  type="text" 
                  placeholder="e.g. Governance" 
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-6 pl-14 pr-8 font-black italic outline-none focus:border-[#E6F379] focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            {/* Markdown Editor Area */}
            <div className="col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Extended_Data_Buffer</label>
                <span className="text-[9px] font-black text-zinc-800 uppercase italic">Markdown_Enabled</span>
              </div>
              <textarea 
                rows={5} 
                placeholder="Type your detailed proposal here..." 
                className="w-full bg-white/5 border border-white/5 rounded-[2.5rem] p-8 font-bold italic outline-none focus:border-[#E6F379] focus:bg-white/10 transition-all resize-none placeholder:text-zinc-800"
              />
            </div>
          </div>

          {/* Footer del Modal */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/5">
            <div className="flex gap-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-5 h-5 rounded-md border-2 border-zinc-800 group-hover:border-[#E6F379] flex items-center justify-center transition-all">
                  <div className="w-2 h-2 bg-[#E6F379] rounded-sm scale-0 group-hover:scale-100 transition-transform" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Public_View</span>
              </label>
              <div className="flex items-center gap-2 text-zinc-700">
                <FiAlertCircle size={14} />
                <span className="text-[9px] font-black uppercase">Gas_Estimate: 0.0002 SOL</span>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-12 py-6 bg-white text-black rounded-full font-[1000] uppercase italic tracking-tighter text-xl flex items-center gap-4 hover:bg-[#E6F379] transition-all overflow-hidden group"
            >
              {/* --- EFECTO GLITCH EN HOVER --- */}
              <span className="absolute inset-0 translate-x-1 group-hover:animate-glitch-1 opacity-0 group-hover:opacity-100 bg-red-500/20 pointer-events-none" />
              <span className="absolute inset-0 -translate-x-1 group-hover:animate-glitch-2 opacity-0 group-hover:opacity-100 bg-blue-500/20 pointer-events-none" />
              
              <span className="relative z-10 flex items-center gap-4">
                Confirm_Broadcast <FiArrowRight strokeWidth={3} />
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* --- ESTILOS PARA SCROLLBAR Y ANIMACIÓN GLITCH --- */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #E6F379; }

        @keyframes glitch-1 {
          0% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); }
          40% { transform: translate(-3px, -3px); }
          60% { transform: translate(3px, 3px); }
          80% { transform: translate(3px, -3px); }
          100% { transform: translate(0); }
        }

        @keyframes glitch-2 {
          0% { transform: translate(0); }
          25% { transform: translate(3px, -3px); }
          50% { transform: translate(-3px, 3px); }
          75% { transform: translate(3px, 3px); }
          100% { transform: translate(0); }
        }

        .group:hover .group-hover\:animate-glitch-1 { animation: glitch-1 0.2s infinite; }
        .group:hover .group-hover\:animate-glitch-2 { animation: glitch-2 0.2s infinite reverse; }
      `}</style>
    </div>
  );
}