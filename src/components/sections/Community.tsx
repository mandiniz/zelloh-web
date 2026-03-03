"use client";
import { motion, Variants } from "framer-motion";
import { FaDiscord, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";

// Definimos los enlaces y sus colores de marca originales
const SOCIALS = [
  { 
    name: "Discord", 
    icon: <FaDiscord />, 
    url: "https://discord.gg/raYFhaR2",
    brandColor: "#5865F2" // Discord Blurple
  },
  { 
    name: "X (Twitter)", 
    icon: <FaTwitter />, 
    url: "https://twitter.com/zelloh_co",
    brandColor: "#1DA1F2" // Twitter Sky Blue
  },
  { 
    name: "Instagram", 
    icon: <FaInstagram />, 
    url: "https://instagram.com/zelloh_co",
    brandColor: "#E4405F" // Instagram Pink
  },
  { 
    name: "Tik-Tok", 
    icon: <FaTiktok />, 
    url: "https://tiktok.com/zelloh_co",
    brandColor: "#00f2ea" // TikTok Cyan (o puedes usar #ff0050)
  },
];

export const Community = () => {
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

  return (
    <section className="relative bg-black text-white py-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        
        {/* CABECERA CENTRADA */}
        <motion.div 
          className="mb-24 text-center flex flex-col items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          <div className="space-y-1">
            <motion.h2 className="text-[32px] sm:text-[45px] md:text-[52px] lg:text-[62px] font-black text-white leading-[1.1] tracking-tighter uppercase">
              <motion.span variants={lineVariants} className="block whitespace-nowrap">
                ¿Eres nuevo en Zelloh?
              </motion.span>
              <motion.span variants={lineVariants} className="block text-zinc-600 whitespace-nowrap">
                Unete a nuestro movimiento
              </motion.span>
            </motion.h2>
          </div>
          
          <motion.p 
            variants={lineVariants}
            className="text-[#E6F379] text-lg md:text-2xl font-bold mt-6 uppercase tracking-widest italic"
          >
            Ventajas, dinero y regalos cada semana
          </motion.p>
        </motion.div>

        {/* REDES SOCIALES */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-16 w-full">
          {SOCIALS.map((social, i) => (
            <motion.a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="flex flex-col items-center gap-6 group"
            >
              <div 
                className="w-20 h-20 md:w-24 md:h-24 bg-[#1A1A1A] border border-zinc-800 rounded-[2.2rem] flex items-center justify-center text-3xl md:text-4xl text-zinc-500 transition-all duration-300"
                style={{ 
                  // Usamos variables de CSS inline para que el hover sea dinámico por cada marca
                  '--brand-color': social.brandColor 
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = social.brandColor;
                  e.currentTarget.style.borderColor = social.brandColor;
                  e.currentTarget.style.boxShadow = `0 0 30px ${social.brandColor}44`; // 44 es opacidad en hex
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '';
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                {social.icon}
              </div>
              <span 
                className="text-zinc-500 font-[1000] text-xs md:text-sm uppercase tracking-[0.2em] transition-colors duration-300"
                onMouseEnter={(e) => e.currentTarget.style.color = social.brandColor}
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
              >
                {social.name}
              </span>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};