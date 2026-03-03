"use client";
import { motion } from "framer-motion";
import { FiSmartphone, FiWatch, FiZap, FiArrowRight } from "react-icons/fi";

export const NfcWalletSection = () => {
  return (
    <section className="bg-[#050505] text-white py-24 px-6 lg:px-20 overflow-hidden min-h-screen flex items-center">
      {/* Luces de ambiente en esquinas opuestas */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#E6F379]/[0.02] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/[0.02] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* COLUMNA IZQUIERDA: DISPOSITIVOS (Visual Side) */}
          <div className="relative flex justify-center items-center">
            {/* iPhone Wireframe */}
            <motion.div 
              initial={{ opacity: 0, x: -50, rotate: -5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-[260px] h-[530px] md:w-[300px] md:h-[600px] bg-[#0A0A0A] rounded-[3.5rem] border border-white/10 p-3 shadow-[0_0_80px_rgba(0,0,0,1)] z-10"
            >
              <div className="w-full h-full bg-black rounded-[2.8rem] overflow-hidden flex flex-col p-6 relative">
                {/* Dynamic Island */}
                <div className="w-20 h-5 bg-zinc-900 mx-auto mt-2 rounded-full mb-12" />

                {/* NFT Asset Area */}
                <div className="flex-1 relative rounded-[2rem] overflow-hidden border border-white/5 bg-zinc-950 group">
                   <motion.div 
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-full h-full flex items-center justify-center p-4"
                   >
                     <div className="w-full h-full bg-[#111] rounded-2xl flex items-center justify-center relative overflow-hidden">
                        <img src="/assets/tu-nft-iphone.png" className="w-full h-full object-cover opacity-60" alt="" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#E6F379]/20 to-transparent" />
                        <span className="text-[9px] font-black tracking-[0.4em] text-[#E6F379] z-10">ACTIVE ASSET</span>
                     </div>
                   </motion.div>
                   {/* Scanning Line */}
                   <motion.div 
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-[1px] bg-[#E6F379]/50 shadow-[0_0_10px_#E6F379] z-20"
                   />
                </div>

                <div className="mt-8 flex flex-col items-center gap-3 opacity-30">
                  <FiSmartphone />
                  <div className="w-16 h-1 bg-white/10 rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* Apple Watch Wireframe - Overlapping el iPhone */}
            <motion.div 
              initial={{ opacity: 0, x: 30, y: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, y: 80, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -right-4 md:right-0 bottom-20 z-20"
            >
              <div className="w-[160px] h-[200px] md:w-[190px] md:h-[230px] bg-zinc-950 rounded-[2.8rem] border border-white/20 p-2 shadow-2xl">
                 <div className="w-full h-full bg-black rounded-[2.2rem] overflow-hidden p-4 flex flex-col items-center justify-center relative">
                    <div className="w-full aspect-square rounded-xl border border-dashed border-[#E6F379]/30 bg-[#E6F379]/5 flex items-center justify-center">
                       <FiWatch className="text-[#E6F379] opacity-40 size-10" />
                    </div>
                    <span className="mt-3 text-[7px] font-black uppercase tracking-widest text-zinc-500">Syncing...</span>
                 </div>
                 {/* Crown Glow */}
                 <div className="absolute -right-0.5 top-1/3 w-1.5 h-8 bg-zinc-800 rounded-l-sm" />
              </div>
            </motion.div>
          </div>

          {/* COLUMNA DERECHA: TEXTO (Action Side) */}
          <div className="flex flex-col items-start text-left space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 bg-[#E6F379]/10 border border-[#E6F379]/20 px-4 py-1.5 rounded-full">
                <div className="w-1.5 h-1.5 bg-[#E6F379] rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#E6F379]">Next-Gen Wallet Support</span>
              </div>
              
              <h2 className="text-[48px] md:text-[72px] font-[1000] leading-[0.9] tracking-tighter uppercase italic">
                TRAE TU <br /> 
                <span className="text-[#E6F379]">COLECCION</span> <br />
                A LA VIDA DE NUEVO
              </h2>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 text-base md:text-xl max-w-lg leading-relaxed font-medium"
            >
              Añade tus NFT a <span className="text-white">Apple Wallet.</span> y <span className="text-white">Google Pay</span> con un solo toque. Lleva tus activos en tu<span className="text-[#E6F379]"> Smart Watch</span> y muestra tu estado en el mundo físico.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto"
            >
              <button className="bg-[#E6F379] text-black px-10 py-5 rounded-2xl font-[1000] text-lg uppercase italic tracking-tighter flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-[0_10px_40px_rgba(230,243,121,0.2)] group">
                Repotenciar Billetera <FiZap className="group-hover:fill-black" />
              </button>
              
              <button className="bg-white/5 border border-white/10 text-white px-8 py-5 rounded-2xl font-black text-sm uppercase italic tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
                Aprende como funciona <FiArrowRight />
              </button>
            </motion.div>

            {/* Micro Stats o Logos de soporte */}
            <div className="pt-12 flex gap-8 opacity-30 grayscale contrast-125">
               <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="h-6 invert" alt="Apple" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_Logo_%282020%29.svg" className="h-6 invert" alt="Google Pay" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};