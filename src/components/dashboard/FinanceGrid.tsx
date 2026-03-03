// src/components/dashboard/FinanceGrid.tsx
import { motion } from "framer-motion";

const CARDS = [
  {
    title: "Tus compras online",
    desc: "Más seguras que nunca con Maze Wire.", // [cite: 47]
    tag: "Maze Wire",
    img: "/maze-wire.jpg"
  },
  {
    title: "Metaverse Bank",
    desc: "¿Sabías que quien recibe la MazeCard se convierte en Lifehacker?", // [cite: 49]
    tag: "Metaverse",
    img: "/metaverse.jpg"
  }
];

export const FinanceGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {CARDS.map((card, i) => (
        <motion.div 
          key={i}
          whileHover={{ y: -10 }}
          className="bg-white rounded-[2rem] p-8 text-black flex flex-col justify-between h-[450px]"
        >
          <div className="h-40 bg-zinc-100 rounded-2xl mb-6 overflow-hidden">
             {/* Aquí iría la imagen de la landing [cite: 44, 46] */}
          </div>
          <div>
            <h3 className="text-2xl font-black mb-4 leading-tight">{card.title}</h3>
            <p className="text-zinc-600 font-medium">{card.desc}</p>
          </div>
          <button className="mt-6 text-sm font-bold border-b-2 border-black w-fit">
            Conoce más
          </button>
        </motion.div>
      ))}
    </div>
  );
};