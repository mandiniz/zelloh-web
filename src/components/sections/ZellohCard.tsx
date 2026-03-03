"use client";
import { motion, Variants } from "framer-motion";
import { FaApple } from "react-icons/fa"; 
import { FcGoogle } from "react-icons/fc"; 
import Image from "next/image";

export const ZellohCard = () => {
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

  return (
    <section className="relative bg-black text-white py-32 px-6 md:px-16 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* COLUMNA IZQUIERDA: IPHONE */}
        <div className="flex-1 flex justify-center lg:justify-start lg:ml-20 z-10">
          <div className="relative w-[280px] h-[560px] md:w-[310px] md:h-[620px] border-[10px] border-[#1A1A1A] rounded-[3.5rem] bg-black overflow-hidden shadow-2xl">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1A1A1A] rounded-b-3xl z-20" />
            
            <div className="p-6 pt-16 flex flex-col items-center h-full">
              {/* TARJETA CON LOGO INTEGRADO */}
              <motion.div 
                whileHover={{ rotateY: 10, rotateX: -5, scale: 1.02 }}
                className="w-full h-44 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border border-zinc-700 rounded-2xl p-5 shadow-2xl relative flex flex-col justify-between group overflow-hidden cursor-pointer"
              >
                {/* Reflejo metálico */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                <div className="flex justify-between items-start relative z-10">
                  <Image 
                    src="/assets/logo-white.svg" 
                    alt="Zelloh Logo" 
                    width={80} 
                    height={24} 
                    className="brightness-125 group-hover:brightness-150 transition-all"
                  />
                  <div className="w-10 h-7 bg-zinc-700/50 rounded-md border border-zinc-600/50" />
                </div>
                
                <div className="flex justify-between items-end relative z-10">
                  <span className="text-[10px] text-zinc-500 font-mono tracking-[0.2em]">**** 5544</span>
                  <Image 
                    src="/assets/Mastercard-Logo.wine.png" 
                    alt="Mastercard" 
                    width={50} 
                    height={30} 
                    className="brightness-0 invert opacity-90 object-contain"
                  />
                </div>
              </motion.div> {/* ← CERRADO CORRECTAMENTE */}

              {/* Face ID Simulation - AHORA FUERA DEL motion.div DE LA TARJETA */}
              <div className="mt-24 flex flex-col items-center gap-4">
                <div className="w-14 h-14 border-2 border-zinc-800 rounded-2xl flex items-center justify-center">
                  <div className="w-7 h-7 border-2 border-zinc-700 rounded-lg relative overflow-hidden">
                    <motion.div 
                      animate={{ top: ['-100%', '100%'] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                      className="absolute left-0 w-full h-[2px] bg-[#f4e452] shadow-[0_0_8px_rgba(244,228,82,0.6)]"
                    />
                  </div>
                </div>
                <span className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.3em]">Face ID Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: TEXTO */}
        <motion.div 
          className="flex-[1.8] z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          <div className="space-y-1">
            <motion.h2 className="text-[30px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-black text-white leading-[1.1] tracking-tighter uppercase">
              <motion.span variants={lineVariants} className="block whitespace-nowrap">
                Tarjeta Zelloh<span className="text-[#f4e452]">🤑</span>
              </motion.span>
              <motion.span variants={lineVariants} className="block text-zinc-600 whitespace-nowrap">
                En 30 segundos. Utilizala
              </motion.span>
              <motion.span variants={lineVariants} className="block text-zinc-600 whitespace-nowrap">
                Donde sea
              </motion.span>
              <motion.span variants={lineVariants} className="block text-zinc-600 whitespace-nowrap">
                y cuando sea.
              </motion.span>
            </motion.h2>
          </div>

          <motion.div variants={lineVariants} className="flex flex-col xl:flex-row items-start xl:items-center gap-10 mt-12">
            
            {/* GRUPO DE BOTONES */}
            <div className="flex flex-wrap gap-4">
               
               {/* BOTÓN APPLE PAY */}
               <motion.button 
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 0 25px rgba(255,255,255,0.4)" 
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 bg-[#111111] border border-white/10 px-7 py-3.5 rounded-[1.2rem] transition-all duration-300 min-w-[190px] group"
               >
                 <FaApple className="text-2xl mb-1 text-white group-hover:text-black transition-colors duration-300" />
                 <span className="text-lg font-bold tracking-tight text-white group-hover:text-black transition-colors duration-300">
                    Apple Pay
                 </span>
               </motion.button>

               {/* BOTÓN GOOGLE PAY */}
               <motion.button 
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 0 25px rgba(66,133,244,0.3)" 
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 bg-[#111111] border border-white/10 px-7 py-3.5 rounded-[1.2rem] transition-all duration-300 min-w-[190px] group"
               >
                 <FcGoogle className="text-2xl transition-transform group-hover:scale-110" />
                 <span className="text-lg font-bold tracking-tight text-white group-hover:text-black transition-colors duration-300">
                    Google Pay
                 </span>
               </motion.button>
            </div>
            
            {/* TEXTOS MEJORADOS */}
            <div className="flex flex-col gap-4 max-w-[320px] border-l border-zinc-800 pl-6 py-1">
              <div className="space-y-4">
                {/* Item 1 */}
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f4e452] shadow-[0_0_8px_#f4e452]" />
                  <p className="text-zinc-200 text-[13px] font-black leading-tight tracking-wider uppercase">
                    Lista en tu Wallet. <br />
                    <span className="text-zinc-500 font-bold normal-case lowercase tracking-normal">Añádela al monedero móvil al instante.</span>
                  </p>
                </motion.div>

                {/* Item 2 */}
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-600" />
                  <p className="text-zinc-200 text-[13px] font-black leading-tight tracking-wider uppercase">
                    Pago Contactless. <br />
                    <span className="text-zinc-500 font-bold normal-case lowercase tracking-normal">En cualquier terminal del mundo.</span>
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};