"use client";
import { motion } from "framer-motion";

export const StatsTable = ({ limit }: { limit: number }) => {
  const data = Array(100).fill(null).map((_, i) => ({
    id: i + 1,
    name: "Mutant Ape #" + (1000 + i),
    volume: "4,998 ETH",
    change: "+56%",
    floor: "14.28 ETH",
    sales: "342"
  }));

  const visibleData = data.slice(0, limit);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-4 min-w-[900px]">
        <thead>
          <tr className="text-zinc-600 font-black uppercase text-[10px] tracking-widest italic">
            <th className="pb-4 pl-6">#</th>
            <th className="pb-4">Collection</th>
            <th className="pb-4">Volume</th>
            <th className="pb-4 text-center">24h %</th>
            <th className="pb-4">Floor Price</th>
            <th className="pb-4">Sales</th>
          </tr>
        </thead>
        <tbody>
          {visibleData.map((row, i) => (
            <motion.tr 
              key={row.id} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (i % 16) * 0.02 }}
              className="group hover:bg-zinc-900/40 transition-all cursor-pointer"
            >
              <td className="py-5 pl-6 rounded-l-2xl border-l border-t border-b border-white/5 font-black italic text-zinc-500">{row.id}</td>
              <td className="py-5 border-t border-b border-white/5 font-black uppercase italic text-xs tracking-tighter text-white">{row.name}</td>
              <td className="py-5 border-t border-b border-white/5 font-black text-xs">{row.volume}</td>
              <td className="py-5 border-t border-b border-white/5 font-black text-xs text-[#E6F379] text-center">{row.change}</td>
              <td className="py-5 border-t border-b border-white/5 font-black text-xs">{row.floor}</td>
              <td className="py-5 pr-6 rounded-r-2xl border-r border-t border-b border-white/5 font-black text-xs">{row.sales}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};