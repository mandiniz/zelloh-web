"use client";
import { FiGlobe, FiTwitter, FiInstagram } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";

export const CollectionHero = () => {
  return (
    <section className="relative w-full">
      {/* 1. BANNER: Proporción cinemática y limpieza superior */}
      <div className="h-[280px] md:h-[350px] lg:h-[400px] w-full relative overflow-hidden">
        <img 
          src="https://framerusercontent.com/images/r98XvX6f2ZpXlK5A.png" 
          className="w-full h-full object-cover select-none" 
          alt="Collection Banner"
        />
        
        {/* Overlay: Gradiente multidireccional para fundir con el fondo y proteger el texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        
        {/* Social Links Badge: Flotando elegantemente a la derecha */}
        <div className="absolute bottom-8 right-6 md:right-12 z-20">
          <div className="flex items-center bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl p-1.5 px-4 shadow-2xl">
             <div className="flex items-center gap-2 pr-4 border-r border-white/10">
                <FiGlobe className="text-zinc-400 size-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-200 cursor-pointer hover:text-white transition-colors">
                  boredapeyatchclub.com
                </span>
             </div>
             
             <div className="flex gap-4 pl-4 items-center">
                <FiTwitter className="text-zinc-400 hover:text-[#E6F379] cursor-pointer transition-colors size-4" />
                <FaDiscord className="text-zinc-400 hover:text-[#E6F379] cursor-pointer transition-colors size-4" />
                <FiInstagram className="text-zinc-400 hover:text-[#E6F379] cursor-pointer transition-colors size-4" />
             </div>
          </div>
        </div>
      </div>

      {/* 2. AVATAR: El "Overlap" característico */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <div className="inline-block -mt-14 md:-mt-20 lg:-mt-24 relative z-30">
          {/* Contenedor del Avatar con sombreado profundo */}
          <div className="w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-[#050505] border-[6px] lg:border-[8px] border-[#050505] rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <img 
              src="https://api.dicebear.com/7.x/identicon/svg?seed=BAYC" 
              className="w-full h-full object-cover" 
              alt="Collection Profile" 
            />
          </div>
          
          {/* Badge de Verificado: Estilo Neón */}
          <div className="absolute -right-1 -bottom-1 lg:right-1 lg:bottom-1 bg-[#E6F379] text-black p-1.5 lg:p-2 rounded-full border-[4px] lg:border-[6px] border-[#050505] shadow-lg">
            <svg viewBox="0 0 24 24" className="w-3 h-3 lg:w-4 lg:h-4 fill-current font-bold">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};