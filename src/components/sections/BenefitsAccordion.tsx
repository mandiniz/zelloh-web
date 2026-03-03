"use client";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { SiEthereum, SiPolygon, SiSolana, SiBinance } from "react-icons/si";

const TezosIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10.12 21.67h2.64V18h3.33v-2.6h-3.33l.03-4.57h3.3v-2.6h-3.3V4.62h2.63V2H7.91v2.62h2.21v3.21H7.07v2.6h3.05v4.57H7.07v2.6h3.05v4.07z" />
  </svg>
);

const NFTS = [
  { id: 1, type: "image", img: "assets/byc-asset.png" },
  { id: 2, type: "image", img: "assets/awesome-cats-asset.png" },
  { id: 3, type: "image", img: "assets/doodles-asset.png" },
  { id: 4, type: "image", img: "assets/invisible-friends-asset.png" },
  { id: 5, type: "image", img: "assets/metapixel-asset.png" },
  { id: 6, type: "image", img: "assets/bizarre-skull-society-asset.png" },
  { id: 7, type: "image", img: "assets/hipnotic-cookie-asset.png" },
  { id: 8, type: "image", img: "assets/mixure-street-asset.png" },
  { id: 9, type: "image", img: "assets/power-bees-asset.png" },
  { id: 10, type: "image", img: "assets/metaminions-asset.png" },
  { id: 11, type: "image", img: "assets/bg-asset.png" },
  { id: 12, type: "image", img: "assets/bay-6543-asset.png" },
  { id: 13, type: "image", img: "assets/moonbirds-asset.png" },
];

export const BenefitsAccordion = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-black text-white py-20 overflow-hidden relative border-b border-white/5">
      {/* Luces de Fondo - Reducidas para mayor enfoque */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E6F379]/30 to-transparent" />
      
      <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
        
        {/* TITULAR: Más compacto (mb-20 en lugar de 32) */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-[90px] font-black text-center mb-20 uppercase italic leading-[0.85] tracking-tighter"
        >
          THE <span className="text-[#E6F379]">ADVANTAGE</span> <br /> 
          <span className="text-zinc-800">ECOSYSTEM</span>
        </motion.h2>

        {/* ACORDEÓN: Altura ajustada para evitar "fugatividad" visual */}
        <div className="flex justify-center items-center h-[420px] mb-24" style={{ perspective: "2000px" }}>
          <div className="flex items-center">
            {NFTS.map((nft, i) => {
              const isHovered = hoveredIndex === i;
              const isStacked = i > 3;
              
              return (
                <motion.div
                  key={nft.id}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={{
                    width: isHovered ? "300px" : isStacked ? "12px" : "200px",
                    rotateY: isHovered ? 0 : isStacked ? -35 : -12,
                    z: isHovered ? 150 : 0,
                    filter: hoveredIndex !== null && !isHovered ? "brightness(0.4) blur(1px)" : "brightness(1) blur(0px)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="relative h-[340px] rounded-[2rem] overflow-hidden cursor-pointer bg-[#050505] border border-white/10 shadow-2xl"
                  style={{
                    marginLeft: i === 0 ? 0 : isStacked ? "4px" : "18px",
                    zIndex: isHovered ? 100 : i,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {nft.type === "details" ? (
                    <div className="w-full h-full p-6 flex flex-col justify-between bg-black border-2 border-[#E6F379]/30 relative">
                      <div className="relative z-10">
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-[#E6F379] font-mono text-[8px] tracking-[0.3em]">CORE_v8</span>
                          <div className="w-1.5 h-1.5 bg-[#E6F379] rounded-full animate-pulse" />
                        </div>
                        <h4 className="text-3xl font-black italic uppercase leading-none mb-4 tracking-tighter text-white">VAULT<br/>_SYSTEM</h4>
                        <div className="space-y-2 font-mono text-[8px] text-zinc-500 uppercase">
                          <p className="flex justify-between border-b border-white/5"><span>Sync:</span> <span className="text-white">Active</span></p>
                          <p className="flex justify-between border-b border-white/5"><span>Lvl:</span> <span className="text-white">Diamond</span></p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-black text-zinc-700 italic">ZELLOH_PRIME</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full relative group/img">
                      <img src={nft.img} className="w-full h-full object-cover" alt="NFT" />
                      {!isHovered && isStacked && <div className="absolute inset-0 bg-black/70" />}
                      <div className={`absolute inset-0 border-2 transition-colors duration-500 ${isHovered ? 'border-[#E6F379]/40' : 'border-transparent'}`} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* BENEFICIOS: Padding reducido (py-12 en lugar de 16) */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-0 border-y border-white/10 mb-20">
          {[
            { t: "Get a Free NFT", s: "01" },
            { t: "Become a Royalty Owner", s: "02" },
            { t: "Earn $$$ on deals", s: "03" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ backgroundColor: "rgba(230,243,121,0.02)" }}
              className="flex-1 py-12 px-10 flex flex-col items-center border-x border-white/5 group relative cursor-pointer"
            >
              <span className="text-[#E6F379] font-mono text-[10px] mb-3 opacity-30 group-hover:opacity-100 tracking-widest">{item.s}</span>
              <h3 className="text-xl md:text-2xl font-black italic uppercase text-center tracking-tighter transition-all duration-300">
                {item.t}
              </h3>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E6F379] group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* ICONOS: Más densos y cercanos al grid */}
        <div className="flex justify-center gap-10">
          {[
            { icon: <SiEthereum />, color: "hover:text-blue-400" },
            { icon: <SiPolygon />, color: "hover:text-purple-500" },
            { icon: <SiSolana />, color: "hover:text-cyan-400" },
            { icon: <TezosIcon />, color: "hover:text-[#E6F379]" },
            { icon: <SiBinance />, color: "hover:text-yellow-500" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.1 }}
              className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#080808] border border-white/5 flex items-center justify-center text-3xl md:text-4xl text-zinc-700 transition-all duration-500 cursor-pointer ${item.color} hover:border-white/20`}
            >
              {item.icon}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};