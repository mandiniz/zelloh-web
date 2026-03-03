"use client";
import { useState } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";

interface FilterSectionProps {
  title: string;
  isOpenInitial?: boolean;
  children: React.ReactNode;
}

const FilterSection = ({ title, isOpenInitial = false, children }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(isOpenInitial);
  return (
    <div className="border-b border-white/5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-5 group"
      >
        <span className="text-[11px] font-[1000] uppercase italic tracking-[0.15em] text-zinc-400 group-hover:text-white transition-colors">
          {title}
        </span>
        <FiChevronDown className={`text-zinc-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="pb-6 animate-in fade-in slide-in-from-top-1">{children}</div>}
    </div>
  );
};

export const CollectionFilters = () => {
  return (
    <div className="flex flex-col w-full pr-4 custom-scrollbar sticky top-28 max-h-[calc(100vh-120px)] overflow-y-auto">
      
      {/* Rewards Toggle */}
      <div className="flex justify-between items-center py-5 border-b border-white/5">
        <span className="text-[11px] font-[1000] uppercase italic tracking-widest text-white">Rewards</span>
        <div className="w-10 h-5 bg-zinc-800 rounded-full relative p-1 cursor-pointer">
          <div className="w-3 h-3 bg-zinc-500 rounded-full" />
        </div>
      </div>

      <FilterSection title="Status" isOpenInitial>
        <div className="flex flex-col gap-3">
          {["Buy now", "On auction", "New", "Has offers"].map((opt) => (
            <label key={opt} className="flex items-center justify-between cursor-pointer group">
              <span className="text-[10px] font-black uppercase text-zinc-500 group-hover:text-zinc-300 transition-colors">{opt}</span>
              <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-transparent accent-[#E6F379]" />
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price">
        <div className="space-y-4">
          <select className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl py-3 px-4 text-[10px] font-black uppercase italic outline-none text-white">
            <option>United States Dollar (USD)</option>
            <option>Ethereum (ETH)</option>
          </select>
          <div className="flex gap-2">
            <input type="text" placeholder="Min" className="w-1/2 bg-[#1A1A1A] border border-white/10 rounded-xl py-3 px-4 text-[10px] outline-none focus:border-[#E6F379]/50" />
            <input type="text" placeholder="Max" className="w-1/2 bg-[#1A1A1A] border border-white/10 rounded-xl py-3 px-4 text-[10px] outline-none focus:border-[#E6F379]/50" />
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Fur" isOpenInitial>
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
          <input 
            type="text" 
            placeholder="Search by ID" 
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-[10px] outline-none focus:border-[#E6F379]/30"
          />
        </div>
        <div className="flex flex-col gap-3">
          {[
            { name: "Brown", color: "#633919", count: 130 },
            { name: "Black", color: "#000000", count: 115 },
            { name: "Golden Brown", color: "#935E32", count: 98 },
            { name: "Cream", color: "#E8D3B9", count: 84 },
            { name: "Tan", color: "#D2B48C", count: 72 }
          ].map((fur) => (
            <label key={fur.name} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-md border border-white/10" style={{ backgroundColor: fur.color }} />
                <span className="text-[10px] font-black uppercase text-zinc-500 group-hover:text-zinc-300">{fur.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-bold text-zinc-700">{fur.count}</span>
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-transparent accent-[#E6F379]" />
              </div>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Background">
        <div className="flex flex-col gap-3">
          {["Aquamarine", "Army Green", "Blue", "Gray", "New Punk Blue"].map((opt) => (
            <label key={opt} className="flex items-center justify-between cursor-pointer group">
              <span className="text-[10px] font-black uppercase text-zinc-500 group-hover:text-zinc-300">{opt}</span>
              <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-transparent accent-[#E6F379]" />
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );
};