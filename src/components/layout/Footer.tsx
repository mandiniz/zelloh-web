"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowModal(true);
      setEmail("");
    } 
  };

  const footerLinks = {
    bank: [
      //{ name: 'Banco', href: '/metabank' },
      { name: 'Bonus', href: '/bonuses'},
      { name: 'Oficina Virtual', href: '/virtual-office'},
      { name: 'ECO Zelloh', href: '/eco'},
      { name: 'Zelloh Card', href: '/cards'},
      { name: 'Trophy Pass', href: '/trophy-pass'},
    ],
    dev: [
      { name: 'Zelloh API', href: '/api' },
      // { name: 'Zelloh Token', href: '/token' },
      // { name: 'Bug bounty', href: '/bug-bounty' },
      //{ name: 'Transparencia', href: '/transparency' },
      { name: 'Press Kit', href: '/press-kit' }, 
      { name: 'Branding', href: '/branding' }, 
      { name: 'Legal', href: '/legal' },
      { name: 'FAQS', href: '/faqs' },
    ],
    social: [ 
      { name: 'X (Twitter)', href: 'https://x.com/zelloh' },
      { name: 'Facebook', href: 'https://facebook.com/zelloh' },
      { name: 'Instagram', href: 'https://instagram.com/zelloh' },
      { name: 'Tik Tok', href: 'https://tiktok.com/zelloh' },
      { name: 'Discord', href: 'https://discord.gg/zelloh' },
      { name: 'Medium', href: 'https://medium.com/@zelloh' },
    ]
  };

  return (
    <footer className="bg-black text-white pt-20 md:pt-32 pb-12 px-6 md:px-16 border-t border-white/5 relative overflow-hidden">
      {/* Efecto de luz ambiental - Reducido en móvil para performance */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#f4e452]/5 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-20 md:mb-24">
          
          {/* BRANDING & NEWSLETTER - Centrado en móvil */}
          <div className="space-y-8 md:space-y-12 flex flex-col items-center md:items-start text-center md:text-left">
            <a href="#hero" className="block hover:opacity-80 transition-opacity">
              <Image 
                src="/assets/logo-white.svg" 
                alt="Zelloh Logo" 
                width={130} 
                height={36} 
              />
            </a>
            <div className="space-y-6 w-full">
              <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Mantente conectado</p>
              <form onSubmit={handleNewsletter} className="relative group w-full max-w-[320px] mx-auto md:mx-0">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 md:py-5 px-6 text-[10px] md:text-[11px] font-black tracking-widest text-white placeholder:text-zinc-600 focus:border-[#f4e452] outline-none transition-all uppercase"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#f4e452] rounded-xl flex items-center justify-center text-black hover:scale-110 transition-transform">
                  <FaArrowRight size={12} />
                </button>
              </form>
            </div>
          </div>

          {/* COLUMNAS DE LINKS - 2 columnas en Tablet, 1 en Móvil */}
          <div className="text-center md:text-left">
            <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[#f4e452] mb-6 md:mb-10">Banca & Ecosistema</h4>
            <ul className="space-y-4 md:space-y-5">
              {footerLinks.bank.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-[12px] md:text-[13px] font-black text-zinc-500 hover:text-white transition-colors uppercase tracking-widest block group">
                    <span className="inline-block transition-transform md:group-hover:translate-x-2">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[#f4e452] mb-6 md:mb-10">Infraestructura</h4>
            <ul className="space-y-4 md:space-y-5">
              {footerLinks.dev.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-[12px] md:text-[13px] font-black text-zinc-500 hover:text-white transition-colors uppercase tracking-widest block group">
                    <span className="inline-block transition-transform md:group-hover:translate-x-2">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[#f4e452] mb-6 md:mb-10">Conectate</h4>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-5">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-[11px] md:text-[13px] font-black text-zinc-500 hover:text-white transition-colors uppercase tracking-widest block group">
                    <span className="inline-block transition-transform md:group-hover:translate-x-2">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR - Stacked on mobile */}
        <div className="border-t border-white/5 pt-12 flex flex-col lg:flex-row justify-between items-center gap-8 md:gap-10">
          <div className="flex flex-col items-center lg:items-start gap-6">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600">
              <a href="/terms" className="hover:text-[#f4e452] transition-colors">Terminos</a>
              <a href="/privacy" className="hover:text-[#f4e452] transition-colors">Privacidad</a>
              <a href="/cookies" className="hover:text-[#f4e452] transition-colors">Cookies</a>
              <a href="/zelloh-elite" className="hover:text-[#f4e452] transition-colors">Zelloh Elite Program</a>

            </div>
            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-zinc-700">© 2026 ZELLOH INC.</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600">Engineering by</span>
            <a href="https://richierich.com" target="_blank" className="bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-[#f4e452]/50 transition-all group flex items-center gap-2">
              <span className="text-[#f4e452] font-black italic tracking-tighter text-xs">RICHIE</span>
              <span className="text-white font-black italic tracking-tighter text-xs">MANDINI</span>
            </a>
          </div>
        </div>
      </div>

      {/* MODAL - Optimizado para pantallas pequeñas */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#111] border border-[#f4e452]/20 p-8 md:p-10 rounded-[2rem] max-w-xs md:max-w-sm w-full relative text-center shadow-2xl"
            >
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-zinc-500"><FiX size={20} /></button>
              <div className="w-14 h-14 bg-[#f4e452] rounded-2xl flex items-center justify-center text-black mx-auto mb-6"><FaCheckCircle size={24} /></div>
              <h3 className="text-xl md:text-2xl font-black uppercase italic text-white mb-2">¡HECHO!</h3>
              <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-8">Registro confirmado</p>
              <button onClick={() => setShowModal(false)} className="w-full py-4 bg-[#f4e452] text-black rounded-xl font-black uppercase text-[10px] tracking-widest">CERRAR</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};