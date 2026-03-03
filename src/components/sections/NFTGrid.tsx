"use client";
import { motion } from "framer-motion";

export const NFTGrid = ({ searchQuery, limit }: { searchQuery: string, limit: number }) => {
  const nfts = Array(100).fill(null).map((_, i) => ({
    id: i,
    name: "Collection #" + i,
    floor: "2.70 ETH",
  }));

  const filtered = nfts.filter(n => n.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, limit);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
      {filtered.map((nft, i) => (
        <motion.div key={nft.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: (i % 8) * 0.05 }} className="group bg-[#0D0D0D] border border-white/5 rounded-[2.5rem] p-5 hover:border-[#E6F379]/40 transition-all duration-500">
          <div className="aspect-square rounded-[2rem] overflow-hidden mb-6 grid grid-cols-2 gap-1 bg-zinc-900 group-hover:scale-[1.02] transition-transform">
            {[1, 2, 3, 4].map(x => (
              <img key={x} src={`https://api.dicebear.com/7.x/shapes/svg?seed=${nft.id}-${x}`} className="w-full h-full object-cover opacity-60" alt="nft" />
            ))}
          </div>
          <h4 className="text-white font-black uppercase text-sm tracking-tight mb-4 group-hover:text-[#E6F379] transition-colors">{nft.name}</h4>
          <button className="w-full py-3 rounded-2xl border border-white/10 font-black text-[10px] uppercase tracking-widest group-hover:bg-[#E6F379] group-hover:text-black transition-all">View Collection</button>
        </motion.div>
      ))}
    </div>
  );
};