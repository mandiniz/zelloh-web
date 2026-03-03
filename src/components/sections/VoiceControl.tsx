"use client";
import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import Image from "next/image";

export const VoiceControl = () => {
  const [activeFeature, setActiveFeature] = useState<null | {title: string, desc: string, detail: string}>(null);

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const features = [
    { emoji: "💸", title: "Envía", desc: "y solicita dinero", detail: "Transfiere fondos instantáneamente a cualquier Zeller sin comisiones ocultas. Solo escribe el monto y el nombre." },
    { emoji: "🙊", title: "Revisa", desc: "tu saldo", detail: "Consulta tu balance en tiempo real con un simple comando. Zelloh te muestra el desglose de tus cuentas principales." },
    { emoji: "👀", title: "Monitorea", desc: "los extractos", detail: "Visualiza tus últimos movimientos categorizados por IA para entender mejor en qué gastas tu dinero." },
    { emoji: "💀", title: "Establece", desc: "límites de gastos", detail: "Mantén el control total. Configura límites diarios o semanales para tus tarjetas y evita sorpresas." }
  ];

  return (
    <section className="relative bg-black text-white py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-16 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 md:gap-12 lg:gap-6">
        
        {/* COLUMNA IZQUIERDA: TEXTO Y GRID (3 LÍNEAS) */}
        <motion.div 
          className="flex-[1.6] z-10 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          <div className="space-y-1 text-center lg:text-left">
            <motion.h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[62px] font-black text-white leading-[1.1] tracking-tighter uppercase">
              <motion.span variants={lineVariants} className="block whitespace-normal sm:whitespace-nowrap">
                Piensa y di 💭 lo que 
              </motion.span>
              <motion.span variants={lineVariants} className="block text-zinc-600 whitespace-normal sm:whitespace-nowrap">
                necesitas y ZELLOH
              </motion.span>
              <motion.span variants={lineVariants} className="block text-zinc-600 whitespace-normal sm:whitespace-nowrap">
                hará el resto
              </motion.span>
            </motion.h2>
          </div>

          <motion.div variants={lineVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-x-8 md:gap-y-8 mt-8 sm:mt-10 md:mt-12">
            {features.map((f, i) => (
              <FeatureItem 
                key={i} 
                emoji={f.emoji} 
                title={f.title} 
                desc={f.desc} 
                onClick={() => setActiveFeature({ title: f.title, desc: f.desc, detail: f.detail })} 
              />
            ))}
          </motion.div>
        </motion.div>

        {/* COLUMNA DERECHA: NOTA DE VOZ Y CHAT */}
        <div className="relative flex-1 flex flex-col items-center lg:items-center w-full max-w-[600px] lg:max-w-none mx-auto">
          
          <div className="relative mb-6 sm:mb-8 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-b from-[#E6F379] to-[#7D26FF] flex items-center justify-center shadow-[0_0_40px_rgba(230,243,121,0.15)] overflow-hidden relative border-[3px] border-black"
            >
               <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
                 <Image 
                    src="/assets/logo-white.svg" 
                    alt="Zelloh Logo" 
                    fill
                    className="object-contain"
                 />
               </div>
            </motion.div>

            <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
              className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-[#0095f6] rounded-full border-[2px] border-black flex items-center justify-center shadow-lg z-10"
            >
              <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-current">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" stroke="white" strokeWidth="1" />
              </svg>
            </motion.div>
          </div>

          <div className="space-y-3 sm:space-y-4 w-full max-w-[480px] px-2 sm:px-0">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-[#5B89F7] rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 shadow-xl w-full"
            >
              <div className="bg-white/20 p-1.5 sm:p-2 rounded-full text-white shrink-0">
                <Play size={16} fill="currentColor" className="sm:w-[18px] sm:h-[18px]" />
              </div>
              <div className="flex-1 flex items-center gap-[2px] sm:gap-[4px] h-8 sm:h-10 overflow-hidden">
                {[...Array(24)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [6, Math.random() * 20 + 8, 6] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.04 }}
                    className="w-[3px] sm:w-[4px] bg-white/70 rounded-full shrink-0"
                  />
                ))}
              </div>
              <span className="text-[8px] sm:text-[10px] font-black text-white shrink-0">00:20</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#2C2C2E] p-4 sm:p-5 rounded-2xl sm:rounded-[1.5rem] rounded-tl-none border border-zinc-800 shadow-lg"
            >
              <p className="font-bold text-sm sm:text-[15px] md:text-[16px] text-zinc-200 leading-snug">
                ¿Quieres pedirle a Alberto $ 50,00 para tu noche de fiesta? 🍹
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-start pl-2 sm:pl-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#E6F379", color: "#000" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-transparent border-2 border-[#E6F379] text-[#E6F379] px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-black uppercase italic tracking-widest transition-all shadow-[0_0_15px_rgba(230,243,121,0.15)]"
              >
                <span className="text-sm sm:text-base">💰</span> Pedir a Alberto $ 50,00
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeFeature && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#1A1A1A] border border-white/10 p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] max-w-sm w-full relative shadow-2xl text-center"
            >
              <button 
                onClick={() => setActiveFeature(null)}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
              <h3 className="text-xl sm:text-2xl font-black uppercase italic text-[#E6F379] mb-2">{activeFeature.title}</h3>
              <p className="text-zinc-400 font-bold mb-3 sm:mb-4 uppercase text-[10px] sm:text-xs tracking-widest">{activeFeature.desc}</p>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-5 sm:mb-6">{activeFeature.detail}</p>
              <button 
                onClick={() => setActiveFeature(null)}
                className="w-full py-2.5 sm:py-3 bg-[#E6F379] text-black rounded-xl font-black uppercase italic text-xs sm:text-sm transition-transform active:scale-95"
              >
                Zelloh
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const FeatureItem = ({ emoji, title, desc, onClick }: { emoji: string, title: string, desc: string, onClick: () => void }) => (
  <motion.div 
    whileHover={{ x: 10 }}
    onClick={onClick}
    className="flex items-center gap-3 sm:gap-4 cursor-pointer group w-full"
  >
    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#1A1A1A] border border-zinc-800 rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-lg group-hover:border-[#E6F379] group-hover:shadow-[#E6F379]/10 transition-all shrink-0">
      {emoji}
    </div>
    <div className="flex flex-col min-w-0">
      <h3 className="text-base sm:text-lg md:text-xl font-black leading-tight group-hover:text-[#E6F379] transition-colors">
        {title} <span className="text-zinc-500 font-bold block text-xs sm:text-sm md:text-base truncate">{desc}</span>
      </h3>
    </div>
  </motion.div>
);