"use client";
import React, { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { X, QrCode } from "lucide-react";

// Definimos una interfaz para evitar errores de tipado
interface Tool {
  emoji: string;
  title: string;
  desc: string;
  detail: string;
}

export const WebPayments = () => {
  // CORRECCIÓN: Tipamos el estado con la interfaz Tool
  const [activeTool, setActiveTool] = useState<null | Tool>(null);

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

  const tools: Tool[] = [
    { 
      emoji: "📝", title: "Generar informe y", desc: "facturas", 
      detail: "Exporta informes detallados en PDF o Excel con un solo clic. Gestiona tu contabilidad de marketing sin esfuerzo." 
    },
    { 
      emoji: "🤖", title: "Rastrea y envio", desc: "recordatorios de facturas", 
      detail: "Nuestra IA detecta pagos atrasados y envía recordatorios automáticos por WhatsApp o Email a tus clientes." 
    },
    { 
      emoji: "👌", title: "Todas las monedas y", desc: "criptomonedas", 
      detail: "Acepta pagos en USD, EUR, BTC o ETH. Zelloh convierte automáticamente a tu moneda local si lo prefieres." 
    },
    { 
      emoji: "📟", title: "Comparte tu enlace", desc: "unico de pago", 
      detail: "Un link personalizado (zelloh.me/tu-nombre) para que cualquiera pueda pagarte sin necesidad de pedir datos bancarios." 
    }
  ];

  return (
    <section className="relative bg-black text-white py-32 px-6 md:px-16 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* COLUMNA IZQUIERDA: CONVERSACIÓN + QR */}
        <div className="flex-1 flex flex-col space-y-3 w-full max-w-[400px]">
          <Bubble side="right" color="bg-[#5B89F7]" delay={0.1}>
            Crear factura de $ 350,00 para marketing de RRSS
          </Bubble>
          
          <Bubble side="left" color="bg-[#2C2C2E]" delay={0.3}>
            Guardado. ¿Creado para múltiples usos?
          </Bubble>

          <Bubble side="right" color="bg-[#5B89F7]" delay={0.5}>
            Si guardar como anticipo mensual
          </Bubble>

          <Bubble side="left" color="bg-[#2C2C2E]" delay={0.7}>
            Tu factura esta lista ¡Que te paguen rápido!
          </Bubble>

          <Bubble side="left" color="bg-[#2C2C2E]" delay={0.9}>
            Enviar Código QR http://www.zelloh.co/qrtee5
          </Bubble>

          {/* QR CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white p-6 rounded-[2rem] w-[240px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] mt-6 self-start relative overflow-hidden group"
          >
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute left-0 w-full h-[2px] bg-[#E6F379] z-20 shadow-[0_0_15px_#E6F379] opacity-0 group-hover:opacity-100 transition-opacity"
            />

            <div className="flex flex-col items-center relative z-10">
               <div className="w-36 h-36 bg-white border-[10px] border-white rounded-xl mb-4 relative text-black">
                  <QrCode size="100%" strokeWidth={1.5} />
                  <div className="absolute inset-0 m-auto w-8 h-8 bg-black rounded-md flex items-center justify-center border-2 border-white">
                     <div className="w-1 h-4 bg-[#E6F379] rounded-full rotate-12" />
                  </div>
               </div>
               <p className="text-black text-[11px] font-[1000] text-center leading-tight uppercase tracking-tight italic">
                 Factura $ 350,00<br/>
                 <span className="text-zinc-400 font-bold">Marketing RRSS</span>
               </p>
            </div>
          </motion.div>
        </div>

        {/* COLUMNA DERECHA: TEXTO (CORREGIDO A 3 LÍNEAS) */}
        <motion.div 
          className="flex-[1.6] z-10 lg:ml-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          <div className="space-y-1">
            <motion.h2 className="text-[32px] sm:text-[45px] md:text-[52px] lg:text-[62px] font-black text-white leading-[1.1] tracking-tighter uppercase">
              <motion.span variants={lineVariants} className="block whitespace-nowrap">
                Paga y envia 💵
              </motion.span>
              <motion.span variants={lineVariants} className="block text-zinc-600 whitespace-nowrap">
                desde la web
              </motion.span>
              <motion.span variants={lineVariants} className="block text-zinc-600 whitespace-nowrap">
                con codigo QR
              </motion.span>
            </motion.h2>
          </div>

          <motion.div variants={lineVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 mt-12">
            {tools.map((tool, index) => (
              <ToolItem 
                key={index}
                {...tool}
                onClick={() => setActiveTool(tool)}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* MODAL POPUP */}
      <AnimatePresence>
        {activeTool && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#111111] border border-[#E6F379]/20 p-8 rounded-[2.5rem] max-w-sm w-full relative shadow-[0_0_50px_rgba(230,243,121,0.1)]"
            >
              <button 
                onClick={() => setActiveTool(null)}
                className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="w-16 h-16 bg-[#1A1A1A] rounded-2xl flex items-center justify-center text-3xl mb-6 border border-zinc-800">
                {activeTool.emoji}
              </div>
              
              <h3 className="text-2xl font-black uppercase italic text-[#E6F379] leading-none mb-2">
                {activeTool.title} {activeTool.desc}
              </h3>
              
              <p className="text-zinc-400 font-medium leading-relaxed mb-8">
                {activeTool.detail}
              </p>

              <button 
                onClick={() => setActiveTool(null)}
                className="w-full py-4 bg-[#E6F379] text-black rounded-xl font-[1000] uppercase italic tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all"
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

const Bubble = ({ children, side, color, delay }: { children: React.ReactNode, side: 'left' | 'right', color: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={`flex ${side === 'right' ? 'justify-end' : 'justify-start'}`}
  >
    <motion.div 
      animate={{ y: [0, -3, 0] }}
      transition={{ repeat: Infinity, duration: 3, delay: delay * 2 }}
      className={`${color} px-5 py-3 rounded-[1.4rem] ${side === 'right' ? 'rounded-tr-none' : 'rounded-tl-none'} max-w-[85%] text-[14px] font-bold leading-snug shadow-lg border border-white/5`}
    >
      {children}
    </motion.div>
  </motion.div>
);

const ToolItem = ({ emoji, title, desc, onClick }: { emoji: string, title: string, desc: string, onClick: () => void }) => (
  <motion.div 
    whileHover={{ x: 8 }}
    onClick={onClick}
    className="flex items-center gap-4 group cursor-pointer"
  >
    <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1A1A1A] border border-zinc-800 rounded-full flex items-center justify-center text-2xl shadow-lg group-hover:border-[#E6F379] group-hover:shadow-[0_0_20px_rgba(230,243,121,0.2)] transition-all duration-300">
      {emoji}
    </div>
    <div className="flex flex-col">
      <h3 className="text-[17px] md:text-[19px] font-[1000] leading-tight uppercase tracking-tighter group-hover:text-[#E6F379] transition-colors">
        {title} <span className="text-zinc-500 font-bold block text-sm md:text-base lowercase">{desc}</span>
      </h3>
    </div>
  </motion.div>
);