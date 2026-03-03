"use client";
import { motion } from "framer-motion";

export const CoinsGrid = ({ searchQuery, limit }: { searchQuery: string, limit: number }) => {
  const coins = Array(100).fill(null).map((_, i) => ({
    id: i,
    name: i % 2 === 0 ? "Zelloh Coin" : "Ethereum",
    symbol: i % 2 === 0 ? "ZLH" : "ETH",
    price: i % 2 === 0 ? "$0.84" : "$2,450.12",
    change: "+12.5%",
    color: i % 2 === 0 ? "#E6F379" : "#627EEA"
  }));

  const filtered = coins.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, limit);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filtered.map((coin, i) => (
        <motion.div key={coin.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i % 8) * 0.05 }} className="bg-[#0D0D0D] border border-white/5 rounded-[2rem] p-6 flex items-center justify-between group hover:border-[#E6F379]/30 transition-all">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center font-black text-xl border border-white/10" style={{ color: coin.color }}>{coin.symbol[0]}</div>
            <div>
              <h4 className="font-black uppercase italic text-lg leading-none group-hover:text-white transition-colors">{coin.name}</h4>
              <p className="text-zinc-600 font-bold text-[10px] mt-1 uppercase tracking-widest">{coin.symbol} / USDT</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-[1000] text-xl italic">{coin.price}</p>
            <p className="text-xs font-black text-[#E6F379]">{coin.change}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};