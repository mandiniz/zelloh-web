"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export const SteamInventorySection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yCharacters = useTransform(scrollYProgress, [0, 1], [60, -80]);
  
  const [count, setCount] = useState(0);
  const targetNumber = 95070;

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = targetNumber;
      const duration = 2500;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView]);

  // Lista de logos desde /assets/
  const gameLogos = [
    { name: "CS-GO", src: "/assets/cs-go.png" },
    { name: "Dota 2", src: "/assets/dota-2.png" },
    { name: "Team Fortress 2", src: "/assets/team-fortress.png" },
    { name: "Rust", src: "/assets/rust.png" },
  ];

  return (
    <section ref={sectionRef} className="bg-black text-white py-24 px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto text-center">
        
        {/* TITULAR */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[48px] md:text-[80px] font-black leading-[0.9] tracking-tighter uppercase italic mb-6">
            Gana en tu inventario <br />
            <span className="text-zinc-800">Steam</span>
          </h2>
          <p className="text-zinc-500 text-lg md:text-xl font-light mb-16 tracking-tight max-w-2xl mx-auto">
            Descubre el valor total de tu inventario y negocia con seguridad
          </p>
        </motion.div>

        {/* CARD PRIME */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative bg-[#111111] rounded-[4rem] min-h-[550px] md:min-h-[700px] pt-24 pb-0 px-8 md:px-20 overflow-hidden border border-white/[0.03] flex flex-col justify-between mb-16"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-[#E6F379]/[0.02] blur-[80px]" />
          
          <div className="relative z-40">
            <p className="text-zinc-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] mb-6">
              Total items on ZELLOH marketplace
            </p>
            <motion.div className="text-[70px] md:text-[120px] font-black text-[#E6F379] leading-none mb-8 tracking-tighter drop-shadow-[0_10px_40px_rgba(230,243,121,0.15)]">
              {count.toLocaleString()}
            </motion.div>
          </div>

          <div className="relative w-full flex justify-center items-end h-full mt-auto">
            <motion.div 
              style={{ y: yCharacters }}
              className="relative w-full max-w-[1000px] z-30"
            >
              <img 
                src="/assets/metaverse-inventory-image.png" 
                alt="Steam Inventory"
                className="w-full h-auto object-contain brightness-110 contrast-[1.05]"
              />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#111111] via-[#111111]/90 to-transparent z-40" />
            </motion.div>
          </div>

          <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10" 
               style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
          />
        </motion.div>

        {/* LOGO CLOUD: Los logos de los juegos debajo del card */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 hover:opacity-100 transition-opacity duration-700"
        >
          {gameLogos.map((logo, idx) => (
            <motion.img
              key={idx}
              src={logo.src}
              alt={logo.name}
              whileHover={{ scale: 1.1, filter: "brightness(1.5)" }}
              className="h-8 md:h-12 w-auto grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer object-contain"
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
};