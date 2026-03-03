"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// 6 Assets de ejemplo (puedes cambiarlos por tus rutas locales)
const heroAssets = [
  "assets/byc-asset.png",
  "assets/doodles-asset.png",
  "assets/invisible-friends-asset.png",
  "assets/moonbirds-asset.png",
  "assets/power-bees-asset.png",
  "assets/bg-asset.png"
];

export const MarketplaceHero = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Carrusel automático cada 4 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroAssets.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="pt-24 pb-6 px-6 lg:px-10 max-w-[1440px] mx-auto overflow-hidden"
    >
      {/* HEADER COMPACTO */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl md:text-5xl font-[1000] italic uppercase tracking-tighter">
          Marketplace <span className="text-[#E6F379] drop-shadow-[0_0_10px_rgba(230,243,121,0.3)]">showcase</span>
        </h1>
      </motion.div>

      {/* BANNER ULTRA-SLIM CON AUTO-CAROUSEL */}
      <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#080808] min-h-[350px] md:min-h-[420px] flex items-center">
        
        {/* FX: SCAN LINE */}
        <motion.div 
          animate={{ left: ["-100%", "200%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 bottom-0 w-[80px] bg-gradient-to-r from-transparent via-[#E6F379]/5 to-transparent skew-x-12 z-20"
        />

        <div className="relative z-10 p-8 md:p-12 w-full flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* TEXTO IZQUIERDA */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E6F379]/20 bg-[#E6F379]/5 text-[#E6F379] text-[10px] font-black uppercase tracking-widest">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#E6F379] animate-pulse" />
              Live Asset Stream
            </div>

            <h3 className="text-5xl md:text-7xl font-[1000] italic uppercase leading-[0.9] tracking-[-0.04em] text-white">
              ZELLOH <br /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 uppercase">Vault</span>
            </h3>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(230,243,121,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#E6F379] text-black px-10 py-3.5 rounded-full font-[1000] uppercase italic text-sm mt-2 transition-all"
            >
              Explore Drops
            </motion.button>
          </div>

          {/* NFT STACK CON AUTO-CAROUSEL (DERECHA) */}
          <div className="relative flex-1 flex justify-center items-center h-[320px] md:h-full overflow-visible">
            
            {/* Tarjeta fantasma estática para profundidad */}
            <motion.div 
              className="absolute w-[220px] h-[280px] bg-zinc-900 rounded-[2rem] border border-white/5 rotate-12 translate-x-10 opacity-20 blur-[1px]"
            />
            
            {/* Contenedor del Carrusel con AnimatePresence */}
            <div className="relative z-10 w-[240px] h-[320px] md:w-[280px] md:h-[360px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, rotateY: 90, scale: 0.8, x: 50 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1, x: 0 }}
                  exit={{ opacity: 0, rotateY: -90, scale: 0.8, x: -50 }}
                  transition={{ duration: 0.6, ease: "circOut" }}
                  className="w-full h-full rounded-[2.5rem] p-2 bg-gradient-to-b from-white/20 to-transparent backdrop-blur-md border border-white/30 shadow-2xl overflow-hidden group cursor-pointer"
                >
                  <div className="w-full h-full rounded-[2.2rem] overflow-hidden relative">
                    <motion.img 
                      src={heroAssets[currentIndex]} 
                      alt={`Asset ${currentIndex}`} 
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 4 }}
                    />
                    
                    {/* Overlay de información del asset */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-5 left-6 right-6 flex justify-between items-end">
                      <div>
                        <p className="text-[#E6F379] font-black italic uppercase text-[10px] tracking-widest">Asset 0{currentIndex + 1}</p>
                        <p className="text-white font-bold text-xs uppercase tracking-tighter">Verified Collection</p>
                      </div>
                      <div className="flex gap-1">
                        {heroAssets.map((_, i) => (
                          <div 
                            key={i} 
                            className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? "w-4 bg-[#E6F379]" : "w-1 bg-white/20"}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Decoración: Círculo de carga futurista detrás */}
            <svg className="absolute w-[400px] h-[400px] opacity-10 pointer-events-none" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="#E6F379" strokeWidth="0.5" strokeDasharray="4 4" className="animate-[spin_20s_linear_infinite]" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};