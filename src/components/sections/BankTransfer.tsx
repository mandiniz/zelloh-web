"use client";
import React, { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

// Interfaz para asegurar que no haya errores de tipado
interface Feature {
  emoji: string;
  title: string;
  desc: string;
  detail: string;
}

export const BankTransfer = () => {
  const [activeFeature, setActiveFeature] = useState<null | Feature>(null);

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const features: Feature[] = [
    { 
      emoji: "💸", title: "Desde", desc: "tu cuenta bancaria", 
      detail: "Conecta tu banco de forma segura mediante Open Banking. Envía fondos directamente sin pasar por intermediarios ni cargar billeteras." 
    },
    { 
      emoji: "🙊", title: "Sin", desc: "aplicaciones", 
      detail: "No necesitas instalar nada nuevo. Gestiona tus finanzas desde tu aplicación de mensajería favorita de forma nativa." 
    },
    { 
      emoji: "👀", title: "Inteligencia", desc: "Artificial integrada", 
      detail: "Nuestra IA entiende lenguaje natural. Solo di 'Paga el alquiler' y Zelloh identificará el contacto y el monto habitual." 
    },
    { 
      emoji: "💀", title: "Tus mismos", desc: "contactos", 
      detail: "Zelloh se sincroniza con tu agenda. Olvídate de pedir números de cuenta larguísimos; usa el número de teléfono o nombre." 
    }
  ];

  return (
    <section className="relative bg-black text-white py-32 px-6 md:px-16 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-6">
        
        {/* COLUMNA IZQUIERDA: TEXTO (CORREGIDO A 3 LÍNEAS) */}
        <motion.div 
          className="flex-[1.6] z-10 lg:order-2 lg:ml-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          <div className="space-y-1">
            <motion.h2 className="text-[32px] sm:text-[45px] md:text-[52px] lg:text-[62px] font-black text-white leading-[1.1] tracking-tighter uppercase">
              <motion.span variants={lineVariants} className="block whitespace-nowrap">
                Envia 💸 Dinero
              </motion.span>
              <motion.span variants={lineVariants} className="block text-zinc-600 whitespace-nowrap">
                desde tu cuenta
              </motion.span>
              <motion.span variants={lineVariants} className="block text-zinc-600 whitespace-nowrap">
                bancaria sin
              </motion.span>
              <motion.span variants={lineVariants} className="block text-zinc-600 whitespace-nowrap">
                apps
              </motion.span>
            </motion.h2>
          </div>

          <motion.div variants={lineVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 mt-12">
            {features.map((item, index) => (
              <FeatureItem 
                key={index} 
                {...item} 
                onClick={() => setActiveFeature(item)} 
              />
            ))}
          </motion.div>
        </motion.div>

        {/* COLUMNA DERECHA: CHAT */}
        <div className="flex-1 flex flex-col items-center lg:items-center w-full lg:order-1">
          
          {/* AVATAR ZELLOH ACTUALIZADO */}
          <div className="relative mb-8 flex justify-center lg:mr-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-b from-[#E6F379] to-[#7D26FF] flex items-center justify-center shadow-[0_0_40px_rgba(230,243,121,0.15)] overflow-hidden relative border-[3px] border-black"
            >
               <div className="relative w-12 h-12 md:w-14 md:h-14">
                 <Image 
                    src="/assets/logo-white.svg" 
                    alt="Zelloh Logo" 
                    fill
                    className="object-contain"
                 />
               </div>
            </motion.div>

            {/* VERIFIED BADGE */}
            <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
              className="absolute bottom-0 right-0 w-7 h-7 md:w-8 md:h-8 bg-[#0095f6] rounded-full border-[2px] border-black flex items-center justify-center shadow-lg z-10"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" stroke="white" strokeWidth="1" />
              </svg>
            </motion.div>
          </div>

          {/* Burbujas de Chat con animación */}
          <div className="space-y-3 w-full max-w-[380px]">
            <TransferBubble side="right" color="bg-[#5B89F7]" delay={0.1}>
              Hola Zelloh, enviale $20 a +34622779909
            </TransferBubble>
            
            <TransferBubble side="left" color="bg-[#2C2C2E]" delay={0.3}>
              ¡Hola Matias!! 👋
            </TransferBubble>

            <TransferBubble side="left" color="bg-[#2C2C2E]" delay={0.5}>
              Deseas enviarle $20 a Ricardo?
            </TransferBubble>

            <TransferBubble side="right" color="bg-[#5B89F7]" delay={0.7}>
              Si, por favor!
            </TransferBubble>

            <TransferBubble side="left" color="bg-[#2C2C2E]" delay={0.9}>
              ¡De acuerdo! ¿Que metodo de pago te gustaría utilizar?
            </TransferBubble>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex items-center justify-center lg:justify-start gap-2 px-4 py-2"
            >
               <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#E6F379", color: "#000" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-transparent border-2 border-[#E6F379] text-[#E6F379] px-6 py-2.5 rounded-full text-[10px] font-black uppercase italic tracking-widest transition-all shadow-[0_0_15px_rgba(230,243,121,0.15)]"
              >
                🏦 Mi cuenta Bancaria
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* MINI MODAL POPUP */}
      <AnimatePresence>
        {activeFeature && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#111111] border border-[#E6F379]/20 p-8 rounded-[2.5rem] max-w-sm w-full relative shadow-[0_0_50px_rgba(230,243,121,0.1)] text-center"
            >
              <button 
                onClick={() => setActiveFeature(null)}
                className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <div className="text-4xl mb-4">{activeFeature.emoji}</div>
              <h3 className="text-2xl font-black uppercase italic text-[#E6F379] mb-2">{activeFeature.title}</h3>
              <p className="text-zinc-400 font-bold mb-4 uppercase text-xs tracking-widest">{activeFeature.desc}</p>
              <p className="text-zinc-300 leading-relaxed mb-8">{activeFeature.detail}</p>
              <button 
                onClick={() => setActiveFeature(null)}
                className="w-full py-4 bg-[#E6F379] text-black rounded-xl font-[1000] uppercase italic tracking-widest text-sm"
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

const TransferBubble = ({ children, side, color, delay }: { children: React.ReactNode, side: 'left' | 'right', color: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: delay || 0, duration: 0.5 }}
    className={`flex ${side === 'right' ? 'justify-end' : 'justify-start'}`}
  >
    <div className={`${color} px-5 py-2.5 rounded-[1.2rem] ${side === 'right' ? 'rounded-tr-none' : 'rounded-tl-none'} max-w-[85%] text-[14px] font-bold leading-snug shadow-md`}>
      {children}
    </div>
  </motion.div>
);

const FeatureItem = ({ emoji, title, desc, onClick }: { emoji: string, title: string, desc: string, onClick: () => void }) => (
  <motion.div 
    whileHover={{ x: 8 }}
    onClick={onClick}
    className="flex items-center gap-4 group cursor-pointer"
  >
    <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1A1A1A] border border-zinc-800 rounded-full flex items-center justify-center text-2xl shadow-lg group-hover:border-[#E6F379] transition-all duration-300">
      {emoji}
    </div>
    <div className="flex flex-col">
      <h3 className="text-[17px] md:text-[19px] font-black leading-tight uppercase tracking-tighter group-hover:text-[#E6F379] transition-colors">
        {title} <span className="text-zinc-500 font-bold block text-sm md:text-base lowercase">{desc}</span>
      </h3>
    </div>
  </motion.div>
);