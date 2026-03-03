"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiCopy, FiMove, FiGrid, FiArrowRight, FiCode, FiXCircle } from "react-icons/fi";
import Image from "next/image";

export default function BrandingEngineeringFinal() {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <main className="bg-[#050505] text-[#F0F0F0] min-h-screen selection:bg-[#E6F379] selection:text-black font-sans">
      <Header />

      {/* --- MÁRGENES LATERALES CONTROLADOS (max-w-7xl o 1400px) --- */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-16">
        
        {/* --- SECTION 00: HERO (TECHNICAL CORE) --- */}
        <section className="relative pt-60 pb-32 border-b border-white/5">
          {/* Grid de fondo decorativo limitado al contenedor */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:30px_30px]" />
          
          <div className="relative z-10 space-y-20">
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#E6F379]">Zelloh // Design_System // 2026</span>
              <div className="h-[1px] flex-grow bg-white/10" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-8">
                <h1 className="text-[clamp(3.5rem,8vw,10rem)] font-[1000] uppercase italic leading-[0.8] tracking-tighter">
                  Visual<br />Standard<span className="text-[#E6F379]">_</span>
                </h1>
              </div>
              <div className="lg:col-span-4 flex flex-col justify-end gap-12">
                <p className="text-zinc-500 font-bold uppercase text-[10px] leading-relaxed tracking-widest border-l-2 border-[#E6F379] pl-6">
                  Nuestra arquitectura visual es el puente entre el código y la experiencia del usuario. Cada activo está optimizado para integridad técnica absoluta.
                </p>
                <button className="bg-white text-black w-full py-8 rounded-sm font-[1000] uppercase text-xs tracking-[0.4em] hover:bg-[#E6F379] transition-all flex items-center justify-center gap-4">
                  Download kit <FiDownload />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 01: LOGO SPECIFICATIONS --- */}
        <section className="py-32">
          <div className="flex items-baseline justify-between mb-20">
            <h2 className="text-4xl font-[1000] uppercase italic tracking-tighter flex items-center gap-4">
              <span className="text-[#E6F379] text-lg font-mono tracking-normal not-italic">01/</span> Signature_System
            </h2>
            <p className="text-zinc-700 font-mono text-[9px] uppercase tracking-[0.2em]">Scale: 1.0 // Vector_Master</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            <TechnicalLogoCard label="Signature_Primary" bg="bg-[#7D26FF]">
              <div className="relative w-full h-48"> {/* CAMBIADO DE h-12 A h-24 */}
                <Image 
                  src="/assets/zelloh-rec-logo-original.png" 
                  alt="Zelloh Signature Primary"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </TechnicalLogoCard>
            <TechnicalLogoCard label="Identity_Dark" bg="bg-white" invert>
              <div className="relative w-full h-48"> {/* CAMBIADO DE h-12 A h-24 */}
                <Image 
                  src="/assets/zelloh-rec-logo-white.png" 
                  alt="Zelloh Identity Dark"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </TechnicalLogoCard>
            <TechnicalLogoCard label="Identity_Light" bg="bg-zinc-950">
              <div className="relative w-full h-48"> {/* CAMBIADO DE h-12 A h-24 */}
                <Image 
                  src="/assets/zelloh-rec-logo-black.png" 
                  alt="Zelloh Identity Light"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </TechnicalLogoCard>
          </div>
        </section>

        {/* --- SECTION 02: NEURAL PALETTE --- */}
        <section className="py-32 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4">
              <h2 className="text-4xl font-[1000] uppercase italic tracking-tighter mb-8 leading-none">
                Color_Frequency
              </h2>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-loose max-w-xs">
                El espectro de Zelloh utiliza contrastes agresivos para garantizar la visibilidad en entornos de alta densidad de datos.
              </p>
            </div>
            <div className="lg:col-span-8 bg-zinc-900/20 rounded-xl overflow-hidden border border-white/5">
              <ColorDataRow hex="#E6F379" name="Zelloh Neon" tag="Primary" onCopy={copyToClipboard} copied={copied} />
              <ColorDataRow hex="#7D26FF" name="Vivid Purple" tag="Action" onCopy={copyToClipboard} copied={copied} />
              <ColorDataRow hex="#FFFFFF" name="Pure Acid" tag="Surface" onCopy={copyToClipboard} copied={copied} />
              <ColorDataRow hex="#000000" name="Deep Void" tag="Base" onCopy={copyToClipboard} copied={copied} />
            </div>
          </div>
        </section>

        {/* --- SECTION 03: VIOLATIONS --- */}
        <section className="py-32 border-t border-white/5">
          <h2 className="text-4xl font-[1000] uppercase italic tracking-tighter mb-20 text-center">Protocol_Violations</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <ViolationSquare img="/assets/zelloh-rec-logo-original.png" effect="blur-lg" label="No_Filtering" />
            <ViolationSquare img="/assets/no-skew-logo.png" effect="rotate-12" label="No_Skew" />
            <ViolationSquare img="/assets/no-distortion-logo.png" effect="scale-x-150" label="No_Distortion" />
            <ViolationSquare img="/assets/no-overlay-logo.png" effect="grayscale brightness-150" label="No_Overlay" />
          </div>
        </section>

        {/* --- SECTION 04: FINAL CALL TO ACTION --- */}
        <section className="pb-40 pt-20">
          <div className="bg-[#E6F379] p-12 md:p-24 rounded-sm flex flex-col md:flex-row justify-between items-center group cursor-pointer relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-black text-5xl md:text-7xl font-[1000] uppercase italic tracking-tighter leading-none mb-4">
                Full_Repo.zip
              </h3>
              <p className="text-black/60 font-black uppercase text-[10px] tracking-[0.3em]">SVG_PNG_EPS_FIGMA // 124 ACTIVOS</p>
            </div>
            <button className="relative z-10 mt-10 md:mt-0 bg-black text-white px-16 py-7 rounded-sm font-black uppercase text-xs tracking-widest flex items-center gap-4 hover:gap-8 transition-all">
              Initialize Download <FiArrowRight />
            </button>
            {/* Logo de fondo sutil */}
            <FiGrid className="absolute -right-10 -bottom-10 text-black/5" size={300} />
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}

// --- COMPONENTES INTERNOS ---

function TechnicalLogoCard({ children, label, bg, invert }: any) {
  return (
    <div className="group space-y-6 bg-zinc-950/40 p-10 border border-white/5 hover:bg-zinc-900 transition-all">
      <div className={`${bg} aspect-video flex items-center justify-center relative overflow-hidden`}>
        {children}
        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
          <FiMove size={12} className={invert ? 'text-black' : 'text-white'} />
        </div>
      </div>
      <div className="flex justify-between items-center px-1">
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 italic">{label}</span>
        <div className="w-1 h-1 rounded-full bg-[#E6F379]" />
      </div>
    </div>
  );
}

function ColorDataRow({ hex, name, tag, onCopy, copied }: any) {
  const isSelected = copied === hex;
  return (
    <div 
      onClick={() => onCopy(hex)}
      className="flex flex-col md:flex-row items-center gap-8 p-8 border-b border-white/5 last:border-0 hover:bg-white/5 transition-all cursor-pointer group"
    >
      <div className="w-12 h-12 rounded-full border border-white/10" style={{ backgroundColor: hex }} />
      <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 w-full items-baseline">
        <div>
          <p className="text-[7px] font-black text-zinc-600 uppercase mb-1">Layer_Type</p>
          <p className="text-xs font-black uppercase italic">{tag}</p>
        </div>
        <div>
          <p className="text-[7px] font-black text-zinc-600 uppercase mb-1">Designation</p>
          <p className="text-xs font-bold uppercase text-zinc-400">{name}</p>
        </div>
        <div>
          <p className="text-[7px] font-black text-zinc-600 uppercase mb-1">Hex_Protocol</p>
          <p className="text-xs font-mono font-bold text-[#E6F379]">{isSelected ? "COPIED" : hex}</p>
        </div>
        <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
          <FiCopy className="text-zinc-500" size={14} />
        </div>
      </div>
    </div>
  );
}

function ViolationSquare({ img, effect, label }: any) {
  return (
    <div className="bg-[#0A0A0A] border border-white/5 p-12 flex flex-col items-center gap-10 group relative">
      <div className="absolute top-4 right-4 opacity-20 text-red-500 group-hover:opacity-100 transition-opacity">
        <FiXCircle size={16} />
      </div>
      <div className="relative w-20 h-20">
        <Image 
          src={img} 
          alt={`Violation example: ${label}`}
          fill
          className={`object-contain ${effect}`}
          sizes="80px"
        />
      </div>
      <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 italic group-hover:text-red-500/50 transition-colors">
        {label}
      </span>
    </div>
  );
}