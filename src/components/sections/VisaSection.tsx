"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

// Duplicamos la lista para el efecto de carrusel infinito sin cortes
const PRESS_LOGOS = ["TechCrunch", "WSJ", "TheBanker", "Product Hunt", "Forbes", "Bloomberg", "Wired", "TechCrunch", "WSJ", "TheBanker", "Product Hunt", "Forbes", "Bloomberg", "Wired"];

export const VisaSection = () => {
  const containerRef = useRef(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setRotateX((e.clientY - centerY) / 20);
    setRotateY((centerX - e.clientX) / 20);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);

  return (
    <section ref={containerRef} className="w-full py-40 bg-black relative overflow-hidden">
      {/* Luces de ambiente */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#E6F379]/5 blur-[150px] rounded-full pointer-events-none" />
      
      <motion.div style={{ opacity, scale }} className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center mb-32">
          <motion.h2 
            initial={{ filter: "blur(10px)", opacity: 0 }}
            whileInView={{ filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-7xl md:text-[150px] font-black leading-[0.8] tracking-tighter uppercase italic"
          >
            <span className="text-white">VISA</span><br />
            <span className="text-[#E6F379]">METAVERSE</span>
          </motion.h2>
        </div>

        {/* 3D CARD DISPLAY */}
        <div className="flex justify-center items-center mb-40" style={{ perspective: "1200px" }}>
          <motion.div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { setRotateX(0); setRotateY(0); }}
            animate={{ rotateX, rotateY }}
            transition={{ type: "spring", stiffness: 100, damping: 25 }}
            className="relative w-full max-w-4xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img 
              src="/assets/metaverse-visa-card.svg" 
              alt="VISA Card" 
              className="w-full h-auto drop-shadow-[0_50px_100px_rgba(230,243,121,0.25)] relative z-10"
            />
          </motion.div>
        </div>

        {/* PRENSA: CARRUSEL AUTOMÁTICO INFINITO */}
        <div className="relative mb-48 w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-40 before:bg-gradient-to-r before:from-black before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-40 after:bg-gradient-to-l after:after:from-black after:to-transparent">
          <motion.div 
            className="flex gap-20 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {PRESS_LOGOS.map((name, i) => (
              <span key={i} className="text-3xl md:text-5xl font-black text-zinc-800 hover:text-[#E6F379] transition-colors cursor-default uppercase italic tracking-tighter">
                {name}
              </span>
            ))}
          </motion.div>
        </div>

        {/* MISSION CARD: DISEÑO MEJORADO PRO */}
        <motion.div 
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Resplandor exterior */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#E6F379]/50 to-[#7D26FF]/50 rounded-[4.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000" />
          
          <div className="relative bg-[#080808] rounded-[4rem] p-12 md:p-24 overflow-hidden border border-white/10">
            {/* Animación de luz que recorre el fondo */}
            <motion.div 
              animate={{ 
                x: [-500, 500],
                opacity: [0, 0.5, 0] 
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#E6F379] to-transparent"
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h5 className="text-[#E6F379] font-black uppercase tracking-[0.3em] text-sm mb-6">Our Core Purpose</h5>
                <h2 className="text-6xl md:text-8xl font-[1000] text-white italic leading-none uppercase mb-8">
                  The <br /> Mission
                </h2>
              </div>
              
              <div className="text-left lg:border-l lg:border-white/10 lg:pl-12">
                <p className="text-2xl md:text-3xl text-zinc-400 font-medium leading-tight mb-10">
                  Convierte <span className="text-white">el botín digital</span> en valor real. Reducimos la brecha entre los logros virtuales y la realidad financiera..
                </p>
                <motion.button 
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 bg-[#E6F379] text-black px-10 py-5 rounded-full font-black text-xl uppercase italic group/btn"
                >
                  Join the movement
                  <span className="group-hover/btn:translate-x-2 transition-transform">→</span>
                </motion.button>
              </div>
            </div>

            {/* Círculos decorativos internos */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#7D26FF]/10 blur-[100px] rounded-full" />
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};