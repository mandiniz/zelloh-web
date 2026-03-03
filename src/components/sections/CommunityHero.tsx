"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const socialIcons = [
  { img: "https://www.vectorlogo.zone/logos/instagram/instagram-icon.svg", name: "Instagram" },
  { img: "https://www.vectorlogo.zone/logos/threads/threads-icon.svg", name: "Threads" },
  { img: "https://www.vectorlogo.zone/logos/x/x-icon.svg", name: "X" },
  { img: "https://www.vectorlogo.zone/logos/discord/discord-icon.svg", name: "Discord" },
  { img: "https://www.vectorlogo.zone/logos/tiktok/tiktok-icon.svg", name: "TikTok" },
  { img: "https://www.vectorlogo.zone/logos/medium/medium-icon.svg", name: "Medium" },
];

export const CommunityHero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Captura el scroll desde que asoma la sección
  });

  // Configuración de muelle ultra suave para el efecto Parallax
  const springConfig = { stiffness: 30, damping: 20, mass: 1 };
  
  // El logo empieza a aparecer cuando el scroll está al 50% de la sección y termina al 90%
  const logoScale = useSpring(useTransform(scrollYProgress, [0.4, 0.8], [0.7, 1]), springConfig);
  const logoY = useSpring(useTransform(scrollYProgress, [0.4, 0.8], [150, 0]), springConfig);
  const logoOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);

  return (
    <section 
      ref={containerRef}
      className="bg-black pt-32 pb-6 overflow-hidden relative"
    >
      {/* GRID DE FONDO DINÁMICO */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />

      <div className="max-w-[1200px] w-full mx-auto px-6 relative z-10 text-center">
        
        {/* TITULAR MONUMENTAL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="text-6xl md:text-[110px] font-[1000] text-white leading-[0.8] tracking-[-0.06em] italic uppercase mb-8">
            Conectate con <br /> otros <span className="text-[#E6F379]">Zellors</span>
          </h2>
          <p className="text-zinc-500 text-xl md:text-2xl max-w-2xl mx-auto font-bold italic leading-tight">
            ¿Nuevo en el mundo de Zelloh? Únete a nuestro movimiento. <br />
            <span className="text-zinc-800 uppercase text-sm tracking-widest mt-2 block">Nuevos bonus y beneficios cada semana.</span>
          </p>
        </motion.div>

        {/* SOCIAL ICONS: GRID ASEGURADO */}
        <div className="grid grid-cols-3 md:flex md:justify-center items-center gap-8 md:gap-14 mb-20 px-4">
          {socialIcons.map((icon, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8, filter: "brightness(2)", opacity: 1 }}
              className="flex justify-center items-center grayscale invert opacity-40 transition-all duration-300"
            >
              <img src={icon.img} alt={icon.name} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
            </motion.a>
          ))}
        </div>

        {/* CTA BUTTON */}
        <div className="mb-20">
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 50px rgba(230,243,121,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#E6F379] text-black px-12 py-5 rounded-full font-[1000] text-xl md:text-2xl uppercase italic tracking-tighter transition-all"
          >
            Unete a ZELLOH
          </motion.button>
        </div>

        {/* THE FINAL ASSET: PARALLAX LOGO-WHITE */}
        <motion.div 
          style={{ 
            scale: logoScale, 
            opacity: logoOpacity, 
            y: logoY 
          }}
          className="w-full relative pt-10"
        >
          {/* Brillo que recorre el logo */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:animate-[shimmer_3s_infinite] pointer-events-none" />
          
          <img 
            src="/assets/logo-white.svg" 
            alt="ZELLOH" 
            className="w-full h-auto object-contain brightness-110 drop-shadow-[0_-20px_80px_rgba(255,255,255,0.05)]"
          />
        </motion.div>

      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};