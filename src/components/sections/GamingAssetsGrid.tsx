"use client";
import { motion } from "framer-motion";

export const GamingAssetsGrid = ({ searchQuery, limit }: { searchQuery: string, limit: number }) => {
  const assets = Array(100).fill(null).map((_, i) => ({
    id: i,
    name: i % 2 === 0 ? "Cyber Sword" : "Heal Potion",
    game: "Neon Protocol",
    price: "450 ZLH"
  }));

  const filtered = assets.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, limit);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
      {filtered.map((asset, i) => (
        <motion.div key={asset.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i % 8) * 0.05 }} className="bg-[#0D0D0D] border border-white/5 rounded-[2.5rem] p-5 group hover:border-[#E6F379]/40 transition-all">
          <div className="aspect-square rounded-[2rem] overflow-hidden mb-6 bg-zinc-900 border border-white/5 relative flex items-center justify-center">
             <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${asset.id}`} className="w-3/4 h-3/4 object-contain opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="asset" />
             <div className="absolute top-4 right-4 bg-[#E6F379] px-2 py-0.5 rounded text-[8px] font-black text-black uppercase">Gaming</div>
          </div>
          <h4 className="font-black uppercase italic text-sm mb-1 text-white">{asset.name}</h4>
          <p className="text-zinc-600 font-bold text-[10px] uppercase mb-4">{asset.game}</p>
          <div className="flex justify-between items-center">
            <p className="font-black text-[#E6F379] italic">{asset.price}</p>
            <button className="px-5 py-2.5 bg-zinc-800 rounded-xl text-[9px] font-black uppercase hover:bg-[#E6F379] hover:text-black transition-all">Buy Now</button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};