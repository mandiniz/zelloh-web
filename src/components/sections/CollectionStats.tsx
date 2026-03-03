"use client";
import { FiCopy, FiExternalLink } from "react-icons/fi";

export const CollectionStats = () => {
  const stats = [
    { label: "Floor", value: "72.69 ETH" },
    { label: "Volume", value: "965.8K ETH" },
    { label: "Items", value: "10K" },
    { label: "Owners", value: "6.6K" },
    { label: "Listed", value: "7%" },
    { label: "Blockchain", value: "Ethereum" },
    { label: "Address", value: "0xbc4...f13d", isAddress: true },
  ];

  return (
    <div className="bg-[#0D0D0D]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-7 min-w-[320px] shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
      <div className="flex flex-col gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex justify-between items-center group transition-all">
            <span className="text-zinc-600 text-[9px] font-[1000] uppercase tracking-[0.25em]">
              {stat.label}
            </span>
            
            <div className="flex items-center gap-2">
              <span className="text-white text-[11px] font-[1000] uppercase italic group-hover:text-[#E6F379] transition-colors tracking-tight">
                {stat.value}
              </span>
              
              {stat.isAddress && (
                <div className="flex gap-2 ml-1 opacity-40 group-hover:opacity-100 transition-opacity">
                  <button className="text-zinc-400 hover:text-white"><FiCopy size={11} /></button>
                  <button className="text-zinc-400 hover:text-white"><FiExternalLink size={11} /></button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};