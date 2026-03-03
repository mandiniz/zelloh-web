"use client";
import { motion } from "framer-motion";

const LOGOS = [
  { name: "c|net", font: "font-mono" },
  { name: "Forbes", font: "font-serif" },
  { name: "The New York Times", font: "font-serif" },
  { name: "EL PAÍS", font: "font-sans" },
  { name: "TechCrunch", font: "font-mono" },
  { name: "Wired", font: "font-serif" },
  { name: "Vogue", font: "font-serif" },
  { name: "Bloomberg", font: "font-sans" },
  { name: "Reuters", font: "font-serif" },
  { name: "Fortune", font: "font-serif" },
];

export const Press = () => {
  return (
    <section className="py-20 bg-black overflow-hidden relative group">
      {/* Máscaras de degradado laterales para suavizar la entrada/salida */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="flex">
        <motion.div
          className="flex flex-nowrap gap-16 md:gap-24 items-center"
          animate={{ x: [0, -1920] }} // Ajustar según el ancho total de los logos
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40, // Velocidad del carrusel
              ease: "linear",
            },
          }}
          // Pausa sutil al hacer hover
          whileHover={{ transition: { duration: 80 } }}
        >
          {/* Duplicamos el array tres veces para asegurar que no haya huecos en pantallas anchas */}
          {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
            <motion.span
              key={i}
              initial={{ color: "#3f3f46" }} // zinc-600 para un look más sutil
              whileHover={{ 
                color: "#E6F379", 
                scale: 1.1,
                transition: { duration: 0.2 } 
              }}
              className={`text-3xl md:text-5xl font-black cursor-pointer select-none tracking-tighter whitespace-nowrap transition-colors ${logo.font}`}
            >
              {logo.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};