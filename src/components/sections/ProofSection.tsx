"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface ProofItemProps {
  num: string;
  title: string | React.ReactNode;
  desc: string;
  badge?: string;
  isYellowNum?: boolean;
  index: number;
}

const ProofItem = ({ num, title, desc, badge, isYellowNum, index }: ProofItemProps) => {
  const itemRef = useRef(null);
  
  return (
    <motion.div 
      ref={itemRef}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="relative flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-28 py-24 border-b border-white/5 group"
    >
      {/* NÚMERO CON EFECTO DE PROFUNDIDAD Y SOMBRA DINÁMICA */}
      <div className="relative perspective-1000">
        <motion.span 
          whileHover={{ 
            rotateY: -20, 
            rotateX: 10, 
            scale: 1.1,
            z: 50 
          }}
          className={`text-[160px] md:text-[250px] font-black leading-[0.8] select-none italic cursor-default transition-all duration-500 block
            ${isYellowNum 
              ? 'text-[#E6F379] drop-shadow-[0_0_50px_rgba(230,243,121,0.5)]' 
              : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 group-hover:from-[#E6F379] group-hover:to-white'
            } 
          `}
        >
          {num}
        </motion.span>
        {/* Sombra proyectada */}
        <span className="absolute -bottom-4 left-0 w-full h-10 bg-[#E6F379]/20 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity" />
      </div>

      <div className="flex-1 pt-8 md:pt-20 relative">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 mb-10">
          {/* TÍTULO CON REVEAL DE MÁSCARA */}
          <div className="relative">
            <motion.h3 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-[110px] font-[1000] uppercase tracking-tighter text-white italic leading-[0.85]"
            >
              {title}
            </motion.h3>
            {/* Destello que recorre el título */}
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] pointer-events-none"
            />
          </div>
          
          {badge && (
            <motion.div 
              whileHover={{ rotate: [-1, 1, -1], scale: 1.1 }}
              className="bg-[#E6F379] text-black px-10 py-3 rounded-2xl flex items-center gap-5 shadow-[0_20px_50px_rgba(230,243,121,0.3)]"
            >
              <span className="font-black text-lg md:text-2xl uppercase italic tracking-tighter">{badge}</span>
              <div className="w-4 h-4 bg-black rounded-full animate-ping" />
            </motion.div>
          )}
        </div>

        {/* DESCRIPCIÓN CINEMATOGRÁFICA */}
        <motion.p 
          initial={{ opacity: 0.3 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-5xl text-zinc-500 max-w-5xl leading-[0.95] font-black italic group-hover:text-white transition-all duration-700"
        >
          {desc}
        </motion.p>
      </div>

      {/* RAYO DE LUZ LATERAL */}
      <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#E6F379] group-hover:w-full transition-all duration-1000 shadow-[0_0_20px_#E6F379]" />
    </motion.div>
  );
};

export const ProofSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const rotateValue = useTransform(springScroll, [0, 1], [0, 15]);

  return (
    <section ref={containerRef} className="relative bg-[#050505] text-white py-60 px-6 overflow-hidden">
      
      {/* FONDO DE PARTÍCULAS Y NIEBLA NEÓN */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-[20%] -left-[10%] w-[1000px] h-[1000px] bg-[#E6F379]/10 rounded-full blur-[150px]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-12 relative z-10">
        
        {/* HEADER MEGA-PRO */}
        <div className="flex flex-col md:flex-row items-end gap-10 mb-60">
          <motion.div 
            style={{ rotate: rotateValue }}
            className="bg-[#E6F379] text-black px-16 py-6 rounded-[2rem] font-[1000] uppercase italic text-4xl md:text-6xl shadow-[0_0_80px_rgba(230,243,121,0.4)]"
          >
            La razón
          </motion.div>
          <h2 className="text-7xl md:text-[160px] font-black tracking-[-0.05em] text-center md:text-left leading-[0.75] uppercase italic">
            por la que <br /> <span className="text-outline-white text-transparent group-hover:text-white transition-all duration-1000">confían</span> <br /> tanto
          </h2>
        </div>

        {/* LISTA DE ITEMS */}
        <div className="flex flex-col">
          <ProofItem 
            index={0}
            num="1" 
            isYellowNum 
            title="Escalable" 
            desc="Alineados con nuestro éxito, apoyamos tanto a startups como a empresas." 
          />
          <ProofItem 
            index={1}
            num="2" 
            title="99,98%" 
            badge="Global Team" 
            desc="Capacidad demostrada para brindar soporte a clientes de todos los tamaños con un tiempo de actividad demostrable." 
          />
          <ProofItem 
            index={2}
            num="3" 
            isYellowNum 
            title="Seguro" 
            desc="Seguridad y privacidad a nivel empresarial, integradas en nuestra moderna infraestructura de API." 
          />
        </div>
      </div>

      <style jsx>{`
        .text-outline-white {
          -webkit-text-stroke: 2px rgba(255,255,255,0.3);
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};