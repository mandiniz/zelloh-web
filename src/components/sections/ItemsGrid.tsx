"use client";
import { motion } from "framer-motion";
import { FiShoppingCart, FiPlus, FiHeart } from "react-icons/fi";

const nftItems = [
  { id: 1, name: "#8817", price: "72.69 ETH", bid: "3.278 zETH", img: "https://api.dicebear.com/7.x/identicon/svg?seed=8817" },
  { id: 2, name: "#1123", price: "65.40 ETH", bid: "2.100 zETH", img: "https://api.dicebear.com/7.x/identicon/svg?seed=1123" },
  { id: 3, name: "#4456", price: "81.20 ETH", bid: "4.500 zETH", img: "https://api.dicebear.com/7.x/identicon/svg?seed=4456" },
  { id: 4, name: "#9901", price: "77.00 ETH", bid: "1.950 zETH", img: "https://api.dicebear.com/7.x/identicon/svg?seed=9901" },
  { id: 5, name: "#2234", price: "90.15 ETH", bid: "5.600 zETH", img: "https://api.dicebear.com/7.x/identicon/svg?seed=2234" },
  { id: 6, name: "#7765", price: "68.90 ETH", bid: "2.400 zETH", img: "https://api.dicebear.com/7.x/identicon/svg?seed=7765" },
  { id: 7, name: "#1234", price: "70.00 ETH", bid: "1.200 zETH", img: "https://api.dicebear.com/7.x/identicon/svg?seed=1234" },
  { id: 8, name: "#5566", price: "95.00 ETH", bid: "6.100 zETH", img: "https://api.dicebear.com/7.x/identicon/svg?seed=5566" },
  { id: 9, name: "#3321", price: "62.10 ETH", bid: "1.100 zETH", img: "https://api.dicebear.com/7.x/identicon/svg?seed=3321" },
  { id: 10, name: "#4490", price: "88.00 ETH", bid: "4.200 zETH", img: "https://api.dicebear.com/7.x/identicon/svg?seed=4490" },
];

export const ItemsGrid = () => {
  return (
    // GRID ULTRA-DENSE: Hasta 6 columnas en pantallas muy anchas
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {nftItems.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden group cursor-pointer relative flex flex-col transition-all duration-300 hover:border-white/20 hover:bg-[#111111]"
        >
          {/* IMAGE: Aspecto cuadrado perfecto */}
          <div className="relative aspect-square overflow-hidden bg-zinc-900">
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* BOTÓN LIKE MINI */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="bg-black/40 backdrop-blur-md p-1.5 rounded-md text-white/70 hover:text-[#E6F379]">
                <FiHeart size={12} />
              </button>
            </div>

            {/* BOTONES ACCIÓN RÁPIDA MINI */}
            <div className="absolute inset-x-0 bottom-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent">
              <div className="flex gap-1">
                <button className="flex-1 bg-white text-black text-[9px] font-bold uppercase italic py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-[#E6F379] transition-colors">
                  <FiShoppingCart size={10}/> Buy
                </button>
                <button className="bg-zinc-800 text-white p-2 rounded-lg hover:bg-zinc-700">
                  <FiPlus size={10} />
                </button>
              </div>
            </div>
          </div>

          {/* INFO: Espaciado quirúrgico */}
          <div className="p-3 flex flex-col gap-2">
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                <span className="text-[7px] font-bold uppercase text-zinc-500 tracking-widest">BAYC</span>
                <span className="text-[#E6F379] text-[7px]">✔️</span>
              </div>
              <h3 className="text-white text-[10px] font-bold uppercase italic tracking-tight truncate">
                {item.name}
              </h3>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-white/5">
              <div className="flex flex-col">
                <span className="text-[6px] font-black uppercase text-zinc-600">Price</span>
                <span className="text-white text-[10px] font-black italic">{item.price}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[6px] font-black uppercase text-zinc-600">Bid</span>
                <span className="text-zinc-500 text-[10px] font-black italic">{item.bid}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};