"use client";
import { motion, Variants } from "framer-motion";

export const MarketplaceTeaser = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } 
    },
  };

  return (
    <section className="bg-black text-white py-20 px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        
        {/* HEADER: COMPACTO Y AGRESIVO */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16 border-b border-white/10 pb-12"
        >
          <h2 className="text-[50px] md:text-[90px] font-black leading-[0.8] tracking-[-0.05em] uppercase italic">
            ZELLOH  para  <span className="text-[#E6F379]"> Gen Z</span>, <br />
            <span className="text-zinc-800">inversionistas & autonomos</span>
          </h2>
        </motion.div>

        {/* GRID: TENSIÓN VISUAL MÁXIMA */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-0"
        >
          {/* Columna 1 */}
          <motion.div variants={itemVariants} className="group p-8 md:pl-0 md:pr-10 border-b md:border-b-0 md:border-r border-white/10 relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-[#E6F379] rounded-full group-hover:animate-ping" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase">System_Node_01</span>
            </div>
            <h3 className="text-3xl font-bold uppercase mb-4 italic tracking-tighter">Neo Banco</h3>
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed tracking-tight">
              Tarjeta VISA con <span className="text-white">Apple Pay & Google Pay</span> en 30 seconds.
            </p>
          </motion.div>

          {/* Columna 2 */}
          <motion.div variants={itemVariants} className="group p-8 md:px-10 border-b md:border-b-0 md:border-r border-white/10 relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-[#E6F379] rounded-full group-hover:animate-ping" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase">System_Node_02</span>
            </div>
            <h3 className="text-3xl font-bold uppercase mb-4 italic tracking-tighter">NFT'S</h3>
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed tracking-tight">
              Obtenga un <span className="text-white">NFT gratis</span> cuando se una desde el enlace de un amigo.
            </p>
          </motion.div>

          {/* Columna 3 */}
          <motion.div variants={itemVariants} className="group p-8 md:pl-10 md:pr-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-[#E6F379] rounded-full group-hover:animate-ping" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase">System_Node_03</span>
            </div>
            <h3 className="text-3xl font-bold uppercase mb-4 italic tracking-tighter">Botines</h3>
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed tracking-tight">
              Intercambio <span className="text-white">P2P seguro</span> de sus artículos de juego por dinero real.
            </p>
          </motion.div>
        </motion.div>

        {/* CTA: INTEGRADO AL GRID */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-16 pt-16 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
            Listo para lanzar? 🚀 Ingresa al marketplace ahora.
          </p>
          <motion.button
            whileHover={{ 
              backgroundColor: "#E6F379", 
              color: "#000",
              scale: 1.05 
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-auto border-2 border-[#E6F379] text-[#E6F379] px-12 py-4 rounded-full font-black uppercase italic tracking-tighter transition-colors duration-300"
          >
            Ir al marketplace
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};