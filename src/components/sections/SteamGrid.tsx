"use client";
import { motion } from "framer-motion";

export const SteamGrid = ({ limit }: { limit: number }) => {
  const items = Array(100).fill(null).map((_, i) => ({
    id: i,
    name: "Item #" + i,
    img: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYi5D49i6lY2FpfbiP77Vk39v58t0teDA_Inx0A3m80A6amnyco7EdlBoZgvY_gW8yOzu05S07pmaznBguyYn7XfcnR3ig0wZbbNshqHIFxzAueE86XU"
  }));

  const visible = items.slice(0, limit);

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
      {visible.map((item, i) => (
        <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i % 8) * 0.05 }} className="bg-[#0D0D0D] rounded-3xl p-1 border border-white/5 group hover:border-[#E6F379]/50 transition-all">
          <div className="aspect-square bg-[#E6F379] rounded-2xl flex items-center justify-center p-6 relative overflow-hidden">
             <img src={item.img} className="w-full h-auto object-contain drop-shadow-2xl z-10 group-hover:scale-110 transition-transform duration-500" alt="steam-item" />
             <div className="absolute inset-0 bg-black/5" />
          </div>
          <div className="p-4 text-center">
            <p className="text-white font-black uppercase italic text-[11px] mb-4 truncate">{item.name}</p>
            <button className="w-full py-2.5 rounded-xl border border-white/10 text-[9px] font-black uppercase bg-[#E6F379] text-black shadow-lg">View in Steam</button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};