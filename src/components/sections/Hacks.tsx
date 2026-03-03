"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Definimos la interfaz para los partners
interface Partner {
  name: string;
  discount: string;
  logo: string; // Nombre del archivo en /public/assets/
}

const PARTNERS: Partner[] = [
  { name: "Decathlon", discount: "20% OFF", logo: "decathlon-logo.svg" },
  { name: "Tenis Spain Club", discount: "10% OFF", logo: "tsc-logo.svg" },
  { name: "Brooklyn Fit Boxing", discount: "50% OFF", logo: "brooklyn-logo.svg" },
  { name: "Leroy Merlin", discount: "30% OFF", logo: "leroy-logo.svg" },
];

export const Hacks = () => {
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
    <section className="relative bg-black text-white py-32 px-6 md:px-16 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-6">
        
        {/* COLUMNA IZQUIERDA: LOS PARTNERS */}
        <div className="flex-1 grid grid-cols-2 gap-6 lg:gap-8 w-full max-w-[500px]">
          {PARTNERS.map((partner, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div 
                className="w-32 h-32 md:w-40 md:h-40 bg-white flex items-center justify-center p-8 shadow-2xl relative transition-all duration-300 group-hover:shadow-[#E6F379]/20"
                style={{ borderRadius: "2.5rem 0.5rem 2.5rem 0.5rem" }} 
              >
                <div className="relative w-full h-full">
                  <Image 
                    src={`/assets/${partner.logo}`} 
                    alt={partner.name}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
              <h3 className="font-black mt-4 text-sm md:text-base uppercase tracking-tighter group-hover:text-[#E6F379] transition-colors">
                {partner.name}
              </h3>
              <p className="text-[#E6F379] font-[1000] text-xs md:text-sm italic tracking-widest">
                {partner.discount}
              </p>
            </motion.div>
          ))}
        </div>

        {/* COLUMNA DERECHA: TEXTO */}
        <motion.div 
          className="flex-[1.4] z-10 lg:ml-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          <div className="space-y-1">
            <motion.h2 className="text-[32px] sm:text-[45px] md:text-[52px] lg:text-[62px] font-black text-white leading-[1.1] tracking-tighter uppercase">
              <motion.span variants={lineVariants} className="block whitespace-nowrap">
                Zelloh Hacks <span className="text-[#E6F379]">💡</span>
              </motion.span>
              <motion.span variants={lineVariants} className="block text-zinc-600 whitespace-nowrap">
                Beneficios exclusivos
              </motion.span>
            </motion.h2>
          </div>

          <motion.div variants={lineVariants} className="mt-12">
            <Link href="/hacks">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#E6F379] text-black px-10 py-4 rounded-full font-[1000] text-sm md:text-base uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_10px_30px_rgba(230,243,121,0.2)]"
              >
                Conoce más
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};