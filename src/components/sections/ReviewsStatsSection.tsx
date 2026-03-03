"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// --- COUNTER LOGIC ---
const Counter = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const nodeRef = useRef(null);

  useEffect(() => {
    const numericValue = parseInt(value.replace(/\D/g, ""));
    const suffix = value.replace(/[0-9]/g, "");
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / 2000, 1);
      const current = Math.floor(progress * numericValue);
      setDisplayValue(current.toLocaleString("de-DE") + suffix);
      if (progress < 1) window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) window.requestAnimationFrame(step);
    });

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={nodeRef}>{displayValue}</span>;
};

const allReviews = [
  { name: "Mosh Vain", handle: "@mvain", text: "Luv to play CS and get drops there. Now I can swap the loot wit my teammates for cash instantly." },
  { name: "KnightLee", handle: "@KnightL", text: "Found out that my items cost $108!! My bro got a free NFT with my ref link, gg Zelf." },
  { name: "Satoshi_N", handle: "@satnaka", text: "The virtual card integration is seamless. Finally a bank that understands the metaverse." },
  { name: "Valkyrie", handle: "@valk_crypto", text: "Best UI/UX I've seen. The limits control is a game changer for my daily spends." },
  { name: "CyberPunk", handle: "@cp2077", text: "Safety first. Zelloh Bank gives me peace of mind with their enterprise-level security." },
  { name: "DegenDave", handle: "@dave_nft", text: "Swapping assets for real-world spending has never been this fast. 10/10." },
  { name: "Luna_X", handle: "@lunax", text: "Joined the waitlist and it's the best decision. The cardholder perks are insane." }
];

const stats = [
  { label: "Zellers en todo el mundo", value: "500K+" },
  { label: "Seguro FDIC", value: "$250K" },
  { label: "Usuarios globales", value: "1M+" }
];

export const ReviewsStatsSection = () => {
  return (
    <section className="bg-black py-32 overflow-hidden">
      {/* CONTENEDOR RESTRINGIDO PARA EL MARQUEE (Para que no se salga de los márgenes) */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        
        <div className="relative mb-32 overflow-hidden rounded-[3rem]">
          {/* Degradados laterales internos */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

          <motion.div 
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            whileHover={{ transition: { duration: 60 } }} // Se ralentiza al pasar el mouse
          >
            {[...allReviews, ...allReviews].map((rev, i) => (
              <div
                key={i}
                className="w-[300px] md:w-[500px] bg-[#0D0D0D] border border-white/[0.05] rounded-[2.5rem] p-8 md:p-10"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#E6F379] flex items-center justify-center font-bold text-black text-xs">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-white font-black text-sm md:text-base uppercase italic">{rev.name}</h5>
                    <p className="text-zinc-500 font-bold text-xs">{rev.handle}</p>
                  </div>
                </div>
                <p className="text-zinc-300 text-base md:text-xl font-bold italic leading-snug">
                  "{rev.text}"
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* STATS - CENTRADOS Y ESTRUCTURADOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/10 pt-20">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative inline-block mb-4">
                <span className="text-[clamp(3.5rem,7vw,5.5rem)] font-[1000] text-[#E6F379] italic leading-none tracking-tighter block group-hover:scale-110 transition-transform duration-500">
                  <Counter value={stat.value} />
                </span>
                {/* Glow central */}
                <div className="absolute inset-0 bg-[#E6F379]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <p className="text-zinc-500 text-sm md:text-base font-black uppercase tracking-[0.2em] italic max-w-[200px]">
                {stat.label}
              </p>

              {/* Decoración: Barra de progreso centrada */}
              <div className="w-12 h-[2px] bg-white/10 mt-6 overflow-hidden rounded-full">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  className="h-full bg-[#E6F379]"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};