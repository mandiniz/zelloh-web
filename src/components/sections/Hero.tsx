"use client";
import { motion, Variants } from "framer-motion";

interface HeroProps {
  onOpenModal: () => void;
}

export const Hero = ({ onOpenModal }: HeroProps) => {
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
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  const circleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 1,
        ease: "easeOut",
      },
    },
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative bg-black min-h-screen pt-1 pb-20 px-6 md:px-5 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* Columna Izquierda - Ajustada para no empujar el contenido */}
        <motion.div
          className="w-full md:w-[60%] lg:w-[65%] z-10"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <motion.h1 
            className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[58px] xl:text-[66px] font-black text-white leading-[1.1] tracking-tighter uppercase"
          >
            {/* 1. Quitamos whitespace-nowrap para que el texto respete su contenedor */}
            {/* 2. Usamos block pero permitimos el salto de línea si es necesario */}
            <motion.span variants={lineVariants} className="block mb-1">
              Dinero inmediato
            </motion.span>
            <motion.span variants={lineVariants} className="block text-zinc-600 mb-1">
              En messengers,
            </motion.span>
            <motion.span variants={lineVariants} className="block text-zinc-600">
              Sin apps, bancos, ni contratos.
            </motion.span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col md:flex-row items-start md:items-center gap-8 mt-16 md:mt-24"
          >
            <motion.button 
              onClick={onOpenModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#E6F379] text-black px-12 py-5 rounded-full font-black text-xl whitespace-nowrap cursor-pointer shadow-lg shadow-[#E6F379]/10 shrink-0"
            >
              Unete a Zelloh
            </motion.button>
            <div className="text-white text-sm md:text-base font-bold leading-tight max-w-[300px]">
              <p>¡Consigue tu cuenta y/o tarjeta en 30 segundos!</p>
              <p className="text-zinc-500 font-medium italic mt-1 text-xs">
                Invita a tus amigos. $ 5,00 para ti, y $ 10,00 para ellos. No hay limites!
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Columna Derecha - Ajustada para mantenerse fija */}
        <div className="w-full md:w-[40%] lg:w-[35%] flex justify-center items-center">
          <motion.div 
            variants={circleVariants}
            initial="hidden"
            animate={["visible", "float"]}
            className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px]"
          >
            <img 
              src="/assets/zelloh-round-circle-hero.svg" 
              alt="Zelloh Hero Circle" 
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};