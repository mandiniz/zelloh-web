"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Cambiado el nombre a VirtualCardsHero para que coincida con tu importación
export const VirtualCardsHero = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Efectos de profundidad Sayayin para el asset
  const rotateValue = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.9]);

  return (
    <section 
      ref={containerRef} 
      className="bg-black py-32 md:py-52 px-6 overflow-hidden flex flex-col items-center"
    >
      <div className="max-w-[1200px] w-full">
        
        {/* TITULAR NIVEL OMEGA */}
        <div className="mb-24 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="absolute -top-16 left-0 bg-[#E6F379] text-black px-8 py-2 rounded-full font-black uppercase italic text-lg shadow-[0_0_40px_rgba(230,243,121,0.3)]"
          >
            Virtual Bank
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[120px] font-[1000] text-white leading-[0.85] uppercase italic tracking-tighter"
          >
            Crear <br />
            <span className="text-[#E6F379]">Tarjetas</span> virtuales.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-zinc-500 text-xl md:text-3xl mt-8 font-bold italic max-w-xl"
          >
            Establece límites de gastos diarios y mensuales personalizados.
          </motion.p>
        </div>

        {/* CONTENEDOR DEL ASSET VIRTUAL CARDS */}
        <motion.div 
          style={{ rotate: rotateValue, scale: scaleValue }}
          className="relative w-full group"
        >
          {/* Glow de fondo dinámico */}
          <div className="absolute -inset-10 bg-[#E6F379]/5 blur-[120px] rounded-full group-hover:bg-[#E6F379]/15 transition-all duration-1000" />
          
          <div className="relative rounded-[3rem] md:rounded-[5rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.9)]">
            {/* TU ASSET DESDE LA RUTA ESPECIFICADA */}
            <img 
              src="/assets/virtual-cards-metaverse.png" 
              alt="Zelloh Virtual Cards" 
              className="w-full h-auto object-cover transform transition-transform duration-[2s] group-hover:scale-110"
            />
            
            {/* Efecto de cristalizado superior */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          </div>

          {/* Sticker flotante de Zelloh Bank */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-10 -right-10 w-32 h-32 md:w-48 md:h-48 pointer-events-none z-20"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-90 drop-shadow-2xl">
              <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
              <text className="fill-[#E6F379] font-black uppercase text-[10px] tracking-[3px]">
                <textPath xlinkHref="#curve"> • ZELLOH BANK • META CARD • ORIGINAL • </textPath>
              </text>
            </svg>
          </motion.div>
        </motion.div>

        {/* PIE DE SECCIÓN - CALL TO ACTION */}
        <div className="mt-32 flex flex-col md:flex-row items-center justify-between gap-12 border-t border-white/5 pt-20">
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl">
                   💳
                </div>
                <h4 className="text-2xl md:text-4xl font-black text-white uppercase italic leading-none">
                    Crea una cuenta bancaria <br /> Con tarjeta gratuita en <span className="text-[#E6F379]">Zelloh</span>
                </h4>
            </div>

            <motion.button
                whileHover={{ scale: 1.1, x: 10 }}
                whileTap={{ scale: 0.9 }}
                className="bg-[#E6F379] text-black px-16 py-6 rounded-full font-[1000] uppercase italic text-2xl shadow-[0_20px_40px_rgba(230,243,121,0.3)]"
            >
                Unete a ZELLOH
            </motion.button>
        </div>
      </div>
    </section>
  );
};