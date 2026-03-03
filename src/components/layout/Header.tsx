"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiGlobe, FiCheck, FiMenu, FiX } from "react-icons/fi";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export const Header = () => {
  const [activeMenu, setActiveMenu] = useState<"bank" | "lang" | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLangLabel, setCurrentLangLabel] = useState("ES");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/es\/([^;]+)/);
    if (match && match[1]) {
      setCurrentLangLabel(match[1].toUpperCase());
    }
  }, []);

  // Cerramos el menú móvil si se cambia el tamaño de pantalla a desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 768) setIsMobileMenuOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bankItems = [
    // { name: "Banco", href: "/metabank"},
    { name: "Bonus", href: "/bonuses",  highlight: false },
    { name: "ECO Zelloh", href: "/eco" },
    { name: "Zelloh Card", href: "/cards" },
    { name: "Trophy Pass", href: "/trophy-pass" },
    { name: "Oficina Virtual", href: "/virtual-office" },
    //{ name: "Zelloh Token", href: "/token" },
    { name: "Press kit", href: "/press-kit" },
  ];

  const languages = [
    { name: "Español", code: "es", flag: "🇪🇸", label: "ES" },
    { name: "English", code: "en", flag: "🇺🇸", label: "EN" },
    { name: "Français", code: "fr", flag: "🇫🇷", label: "FR" },
    { name: "Português", code: "pt", flag: "🇵🇹", label: "PT" },
    { name: "Italiano", code: "it", flag: "🇮🇹", label: "IT" },
  ];

  const handleLanguageChange = (langCode: string) => {
    const domains = [window.location.hostname, "." + window.location.hostname, ""];
    domains.forEach(d => document.cookie = `googtrans=; expires=Thu, 01 Jan 1970; path=/;${d ? ` domain=${d};` : ""}`);
    if (langCode !== "es") {
      document.cookie = `googtrans=/es/${langCode}; path=/;`;
    }
    window.location.reload();
  };

  // Función para abrir el modal de login (simulado)
  const handleLoginClick = () => {
    // Aquí emitiremos un evento personalizado que el componente padre escuchará
    const event = new CustomEvent('openJoinModal');
    window.dispatchEvent(event);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-5 md:p-6 md:px-16 flex items-center justify-between z-[100] bg-black/40 backdrop-blur-xl border-b border-white/5">
        {/* LOGO */}
        <div className="flex items-center">
          <a href="/" className="block hover:opacity-80 transition-opacity">
            <Image src="/assets/logo-white.svg" alt="Zelloh Logo" width={100} height={28} className="md:w-[120px] md:h-[32px]" priority />
          </a>
        </div>

        {/* DESKTOP MENU (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8 text-white font-bold text-sm">
          {/* Zelloh Bank Dropdown */}
          <div className="relative" onMouseEnter={() => setActiveMenu("bank")} onMouseLeave={() => setActiveMenu(null)}>
            <span className={`cursor-pointer transition-colors flex items-center gap-1 uppercase tracking-[0.2em] text-[10px] font-black ${activeMenu === "bank" || bankItems.some(item => pathname === item.href) ? 'text-[#f4e452]' : 'hover:text-[#f4e452]'}`}>
              Zelloh Bank <FiChevronDown className={`transition-transform duration-300 ${activeMenu === "bank" ? 'rotate-180' : ''}`} />
            </span>
            <AnimatePresence>
              {activeMenu === "bank" && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full right-0 mt-4 w-[280px] bg-[#0D0D0D] rounded-3xl border border-white/10 p-2 shadow-2xl">
                  <div className="flex flex-col gap-1">
                    {bankItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <a 
                          key={item.name} 
                          href={item.href} 
                          className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            isActive 
                              ? 'text-[#f4e452] bg-[#f4e452]/10' // Estado Activo: Seleccionado
                              : item.highlight 
                                ? 'text-[#f4e452] bg-[#f4e452]/5 hover:bg-[#f4e452]/10' 
                                : 'text-zinc-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {item.name}
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="/faqs" className={`cursor-pointer transition-colors uppercase tracking-[0.2em] text-[10px] font-black ${pathname === '/faqs' ? 'text-[#f4e452]' : 'hover:text-[#f4e452]'}`}>FAQS</a>
          
          {/* Language Dropdown */}
          <div className="relative" onMouseEnter={() => setActiveMenu("lang")} onMouseLeave={() => setActiveMenu(null)}>
            <div className="flex items-center gap-2 cursor-pointer hover:text-[#f4e452] transition-colors">
              <span className="uppercase tracking-[0.2em] text-[10px] font-black flex items-center gap-2">
                 <FiGlobe className="text-[#f4e452]" /> {currentLangLabel}
              </span>
              <FiChevronDown className="text-xs" />
            </div>
            <AnimatePresence>
              {activeMenu === "lang" && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full right-0 mt-4 w-[200px] bg-[#0D0D0D] rounded-2xl border border-white/10 p-2 shadow-2xl">
                  {languages.map((lang) => (
                    <button key={lang.code} onClick={() => handleLanguageChange(lang.code)} className={`flex items-center justify-between px-5 py-3 rounded-xl w-full text-left ${currentLangLabel === lang.label ? 'bg-[#f4e452]/10 text-[#f4e452]' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
                      <span className="font-black text-[10px] uppercase">{lang.name}</span>
                      {currentLangLabel === lang.label && <FiCheck className="text-xs" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Login Button - Comentadas las rutas originales */}
          {/* <a href="/auth/login" className="w-11 h-11 bg-[#f4e452] rounded-2xl flex items-center justify-center text-black hover:scale-110 transition-all">
            <span className="text-xl">👤</span>
          </a> */}
          <button 
            onClick={handleLoginClick}
            className="w-11 h-11 bg-[#f4e452] rounded-2xl flex items-center justify-center text-black hover:scale-110 transition-all cursor-pointer"
          >
            <span className="text-xl">👤</span>
          </button>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="flex md:hidden items-center gap-4">
          {/* <a href="/auth/login" className="w-10 h-10 bg-[#f4e452] rounded-xl flex items-center justify-center text-black">
            <span className="text-lg">👤</span>
          </a> */}
          <button 
            onClick={handleLoginClick}
            className="w-10 h-10 bg-[#f4e452] rounded-xl flex items-center justify-center text-black"
          >
            <span className="text-lg">👤</span>
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white text-2xl p-2 bg-white/5 rounded-xl">
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }} 
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150] bg-[#0D0D0D] p-8 flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <Image src="/assets/logo-white.svg" alt="Logo" width={100} height={28} />
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white text-3xl"><FiX /></button>
            </div>

            <div className="flex flex-col gap-8 overflow-y-auto pb-10">
              <div className="space-y-4">
                <p className="text-[#f4e452] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Zelloh Bank</p>
                {bankItems.map(item => {
                  const isActive = pathname === item.href;
                  return (
                    <a 
                      key={item.name} 
                      href={item.href} 
                      className={`block text-2xl font-black uppercase tracking-tighter transition-colors ${isActive ? 'text-[#f4e452]' : 'text-white hover:text-[#f4e452]'}`}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>

              <div className="h-px bg-white/10 w-full" />

              <div className="space-y-6">
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Idioma</p>
                <div className="grid grid-cols-2 gap-4">
                  {languages.map(lang => (
                    <button key={lang.code} onClick={() => handleLanguageChange(lang.code)} className={`p-4 rounded-2xl border ${currentLangLabel === lang.label ? 'border-[#f4e452] bg-[#f4e452]/5 text-[#f4e452]' : 'border-white/10 text-zinc-400'} flex items-center gap-3`}>
                      <span>{lang.flag}</span>
                      <span className="text-xs font-black uppercase">{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};