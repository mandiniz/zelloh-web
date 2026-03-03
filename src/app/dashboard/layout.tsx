"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, CreditCard, Users, Gift, Settings, 
  LogOut, Wallet, PersonStandingIcon, HelpCircle, Trophy,
  ChevronDown, MessageSquare, Send, Instagram
} from 'lucide-react';
import { MdAccountCircle } from 'react-icons/md';
import { BiDollarCircle, BiWallet } from 'react-icons/bi';
import { RiTwitterXFill, RiWhatsappFill, RiMessengerFill, RiDiscordFill } from "react-icons/ri";
import { FiCheckCircle } from 'react-icons/fi';

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Resumen', href: '/dashboard' },
  { icon: MdAccountCircle, label: 'Perfil', href: '/dashboard/profile' },
  { icon: PersonStandingIcon, label: 'Cuenta', href: '/dashboard/account' },
  { icon: CreditCard, label: 'Mis Tarjetas', href: '/dashboard/cards' },
  { icon: BiDollarCircle, label: 'Suscripción', href: '/dashboard/subscription' },
  { icon: Wallet, label: 'Metaverse & NFT', href: '/dashboard/metaverse' },
  { icon: Users, label: 'Amigos', href: '/dashboard/referrals' },
  { icon: Gift, label: 'Zelloh Hacks', href: '/dashboard/hacks' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cargar datos del usuario y cerrar dropdown al cambiar de ruta
  useEffect(() => {
    const savedImg = localStorage.getItem("zelloh_profile_img");
    const verifiedStatus = localStorage.getItem("zelloh_verified");
    
    if (savedImg) setProfileImg(savedImg);
    if (verifiedStatus === "true") setIsVerified(true);
    
    setIsDropdownOpen(false);
  }, [pathname]);

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Limpia o redirige
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-zinc-900 hidden md:flex flex-col p-6 fixed h-full bg-black z-50">
        <div className="text-2xl font-black italic mb-10 tracking-tighter text-[#E6F379]">
          zelloh_
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
                  isActive ? 'bg-[#E6F379] text-black shadow-[0_0_20px_rgba(230,243,121,0.2)]' : 'text-zinc-500 hover:bg-zinc-900 hover:text-white'
                }`}>
                  <item.icon size={18} />
                  <span className="text-sm">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-zinc-900 mt-4">
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-zinc-500 font-bold hover:text-white transition-colors">
            <Settings size={20} /> Ajustes
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-64 flex flex-col">
        {/* TOPBAR */}
        <header className="h-20 border-b border-zinc-900 flex items-center justify-between px-8 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
          <h1 className="text-xl font-[1000] uppercase italic tracking-tighter">
            {MENU_ITEMS.find(item => item.href === pathname)?.label || "Dashboard"}
          </h1>
          
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block border-r border-zinc-800 pr-6">
              <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Balance Total</p>
              <p className="text-[#E6F379] font-[1000] text-lg">$1,250.00</p>
            </div>

            {/* PERFIL CON DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 p-1 pr-3 bg-zinc-900 rounded-full border border-zinc-800 hover:border-[#E6F379] transition-all group"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700 relative">
                  {profileImg ? (
                    <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600">👤</div>
                  )}
                  {isVerified && (
                    <div className="absolute bottom-0 right-0 bg-yellow-400 rounded-full p-0.5 border border-black">
                      <FiCheckCircle size={8} className="text-black" />
                    </div>
                  )}
                </div>
                <ChevronDown size={14} className={`text-zinc-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* DROPDOWN MENU */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-72 bg-zinc-950 border border-zinc-800 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden p-2"
                  >
                    <div className="p-4 space-y-4">
                      {/* BOTS SECTION */}
                      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-4">Zelloh Bots_</p>
                      <div className="grid grid-cols-3 gap-2">
                        <BotIcon icon={<Send size={18} />} label="TG" href="https://t.me/zelloh_bot" color="hover:bg-blue-500" />
                        <BotIcon icon={<RiDiscordFill size={18} />} label="DC" href="https://discord.gg/zelloh" color="hover:bg-indigo-500" />
                        <BotIcon icon={<RiWhatsappFill size={18} />} label="WA" href="https://wa.me/zelloh" color="hover:bg-green-500" />
                        <BotIcon icon={<RiTwitterXFill size={18} />} label="X" href="https://x.com/zelloh" color="hover:bg-zinc-800" />
                        <BotIcon icon={<RiMessengerFill size={18} />} label="MS" href="#" color="hover:bg-blue-600" />
                        <BotIcon icon={<Instagram size={18} />} label="IG" href="#" color="hover:bg-pink-600" />
                      </div>

                      <div className="h-[1px] bg-zinc-900 mx-4" />

                      {/* EXTRA LINKS */}
                      <div className="space-y-1">
                        <DropdownLink icon={<HelpCircle size={18} />} label="FAQs & Soporte" href="/faqs" />
                        <DropdownLink icon={<Trophy size={18} />} label="Mis Trofeos" href="/dashboard/trophies" />
                        <DropdownLink icon={<Settings size={18} />} label="Perfil Settings" href="/dashboard/profile" />
                      </div>

                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-bold hover:bg-red-500/10 rounded-2xl transition-colors mt-2"
                      >
                        <LogOut size={18} /> Salir de la cuenta
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

// COMPONENTES MINI PARA EL DROPDOWN
function BotIcon({ icon, label, href, color }: any) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`flex flex-col items-center justify-center p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800 transition-all ${color} group`}
    >
      <div className="text-zinc-400 group-hover:text-white">{icon}</div>
      <span className="text-[8px] font-black mt-1 text-zinc-600 group-hover:text-white/80">{label}</span>
    </a>
  );
}

function DropdownLink({ icon, label, href }: any) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 text-zinc-400 font-bold hover:text-white hover:bg-white/5 rounded-2xl transition-all">
      {icon}
      <span className="text-xs">{label}</span>
    </Link>
  );
}