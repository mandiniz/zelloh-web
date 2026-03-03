"use client";
import { motion } from "framer-motion";

const ITEMS = [
  { name: "Karambit Freehand Knife", price: "$344.09", img: "/assets/karambit-freehand-knife.png", highlight: true },
  { name: "StatTrak™ M4A4 Asiimov", price: "$298.79", img: "/assets/stattrak.png", highlight: false },
  { name: "B.M.O.C. Roaming Roman Helmet", price: "$29.99", img: "/assets/roaming-roman-helmet.png", highlight: false },
  { name: "Yellow Police Jacket", price: "$46.70", img: "/assets/yellow-police-jacket.png", highlight: false },
];

export const LootEconomySection = () => {
  return (
    <section className="bg-black text-white py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
          
          {/* LADO IZQUIERDO */}
          <div className="hidden md:flex md:col-span-2 flex-col items-end text-right pr-6">
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-xl font-black uppercase italic leading-[0.85] tracking-tighter mb-6"
            >
              Turn game <br /> assets <br /> <span className="text-[#E6F379]">into cash</span>
            </motion.p>
            <svg width="100%" height="60" viewBox="0 0 100 60" fill="none" className="max-w-[120px]">
              <motion.path 
                d="M10 50 C 30 50, 60 40, 90 10" 
                stroke="#E6F379" strokeWidth="2.5" strokeDasharray="6 6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.2 }}
              />
              <path d="M75 15 L 90 10 L 85 25" stroke="#E6F379" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* RECUADRO CENTRAL CON ASSETS MÁS GRANDES */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="col-span-12 md:col-span-8 bg-[#111111] rounded-[3.5rem] p-4 border border-white/5 shadow-2xl"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {ITEMS.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ 
                    backgroundColor: item.highlight ? "#f2ff8c" : "rgba(230, 243, 121, 0.12)",
                    y: -8 
                  }}
                  className={`
                    p-6 md:p-10 rounded-[3rem] flex flex-col items-center justify-between text-center transition-all duration-300 cursor-pointer group min-h-[320px]
                    ${item.highlight ? 'bg-[#E6F379] text-black shadow-2xl' : 'bg-[#161616]/50'}
                  `}
                >
                  <span className={`text-[10px] font-black uppercase tracking-widest mb-6 transition-colors
                    ${item.highlight ? 'text-black/40' : 'text-zinc-600 group-hover:text-[#E6F379]'}`}>
                    {item.name}
                  </span>
                  
                  {/* ASSET CONTAINER: Tamaño aumentado */}
                  <div className="relative w-full flex justify-center items-center py-4">
                    <motion.img 
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                      whileHover={{ scale: 1.25, rotate: 8 }}
                      src={item.img} 
                      className="w-32 h-32 md:w-36 md:h-36 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] z-10 transition-transform duration-500"
                    />
                    {/* Sombra de suelo para mayor realismo con el nuevo tamaño */}
                    <div className="absolute bottom-2 w-16 h-3 bg-black/30 blur-md rounded-full scale-x-150" />
                  </div>

                  <span className={`text-3xl font-[1000] italic tracking-tighter mt-6 transition-colors
                    ${item.highlight ? 'text-black' : 'text-[#E6F379] group-hover:text-white'}`}>
                    {item.price}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* LADO DERECHO */}
          <div className="hidden md:flex md:col-span-2 flex-col items-start pl-6">
            <svg width="100%" height="60" viewBox="0 0 100 60" fill="none" className="max-w-[120px] mb-6">
              <motion.path 
                d="M10 10 C 40 10, 70 20, 90 50" 
                stroke="#E6F379" strokeWidth="2.5" strokeDasharray="6 6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              />
              <path d="M75 45 L 90 50 L 95 35" stroke="#E6F379" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <motion.p 
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-xl font-black uppercase italic leading-[0.85] tracking-tighter"
            >
              Thousand of <br /> <span className="text-zinc-800 text-3xl not-italic">assets</span> <br /> worldwide
            </motion.p>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-8 italic">Vende tu botín por dinero real</p>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#f2ff8c", boxShadow: "0 0 40px rgba(230, 243, 121, 0.25)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#E6F379] text-black px-16 py-6 rounded-full text-xl font-[1000] uppercase italic tracking-tighter transition-all"
          >
            Calcular el valor del botín
          </motion.button>
        </div>

      </div>
    </section>
  );
};