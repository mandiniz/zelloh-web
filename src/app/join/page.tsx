"use client";
import { motion, Variants } from "framer-motion";
import { FaWhatsapp, FaDiscord, FaTelegramPlane, FaSlack } from "react-icons/fa";
import { FaXTwitter, FaThreads } from "react-icons/fa6";
import { SiViber, SiMessenger, SiTwitch, SiImessage, SiWechat, SiLine } from "react-icons/si";
import { FiChevronRight, FiShield, FiZap, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Definimos los variantes para las animaciones
const reveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1]
    } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Función para manejar clics en plataformas
const handlePlatformClick = (url: string) => {
  window.open(url, '_blank');
};

const PLATFORMS = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: <FaWhatsapp />,
    color: "#25D366",
    link: "https://wa.me/+19792715884?text=Hola, quiero%20unirme%20a%20Zelloh🤑",
    desc: "Activación inmediata",
    active: true
  },
  {
    id: "discord",
    name: "Discord",
    icon: <FaDiscord />,
    color: "#5865F2",
    link: "https://discord.com/oauth2/authorize?client_id=1093856214426849361",
    desc: "Comunidad Elite",
    active: true
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: <FaTelegramPlane />,
    color: "#26A5E4",
    link: "https://t.me/zellohbot",
    desc: "Protocolo seguro",
    active: true
  },
  {
    id: "imessage",
    name: "iMessage",
    icon: <SiImessage />,
    color: "#5EFFB1",
    link: "https://messages.zelloh.com",
    desc: "Apple Gateway",
    active: true
  },
  {
    id: "messenger",
    name: "Messenger",
    icon: <SiMessenger />,
    color: "#006AFF",
    link: "https://m.me/zelloh",
    desc: "Meta Gateway",
    active: true
  },
  {
    id: "x",
    name: "X / Twitter",
    icon: <FaXTwitter />,
    color: "#FFFFFF",
    link: "https://x.com/zellohbot",
    desc: "Global Terminal",
    active: true
  },
  {
    id: "twitch",
    name: "Twitch",
    icon: <SiTwitch />,
    color: "#9146FF",
    link: "https://twitch.tv/zelloh",
    desc: "Próximamente",
    active: false
  },
  {
    id: "line",
    name: "Line",
    icon: <SiLine />,
    color: "#00B900",
    link: "https://line.me/zelloh",
    desc: "Próximamente",
    active: false
  },
  {
    id: "viber",
    name: "Viber",
    icon: <SiViber />,
    color: "#7360F2",
    link: "viber://pa?chatURI=zelloh",
    desc: "Próximamente",
    active: false
  },
  {
    id: "wechat",
    name: "WeChat",
    icon: <SiWechat />,
    color: "#07C160",
    link: "https://wechat.com/zelloh",
    desc: "Próximamente",
    active: false
  },
  {
    id: "threads",
    name: "Threads",
    icon: <FaThreads />,
    color: "#FFFFFF",
    link: "https://threads.net/@zelloh",
    desc: "Próximamente",
    active: false
  },
  {
    id: "slack",
    name: "Slack",
    icon: <FaSlack />,
    color: "#4A154B",
    link: "https://zelloh.slack.com",
    desc: "Próximamente",
    active: false
  }
];

export default function JoinPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Header />

      {/* HERO SECTION - ESTILO LAYER como FounderPage */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* TEXTO IZQUIERDO */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
          >
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-white/10 px-4 py-1.5 rounded-full mb-6">
              <FiZap className="text-[#E6F379]" size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Zelloh_Mobile_Node</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-[1000] italic uppercase leading-none tracking-tighter mb-8">
              Choose your <br />
              <span className="text-[#E6F379]">Gateway_</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed max-w-xl mb-10">
              Consigue tu bonus de <span className="text-white font-bold">$20</span> seleccionando una plataforma. 
              Activación inmediata, sin burocracia.
            </p>

            <div className="flex items-center gap-4 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-zinc-600 font-black uppercase tracking-widest text-[10px]">
                {PLATFORMS.filter(p => p.active).length} PLATAFORMAS ACTIVAS • {PLATFORMS.length} TOTALES
              </span>
            </div>
          </motion.div>

          {/* ILUSTRACIÓN O ICONOS DERECHA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square bg-zinc-900 rounded-[4rem] overflow-hidden border border-white/10 relative z-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E6F379]/10 via-transparent to-[#7D26FF]/10" />
              
              {/* Círculo decorativo tipo "layer" */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#7D26FF] rounded-full blur-[120px] opacity-20" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#E6F379] rounded-full blur-[120px] opacity-10" />
              
              {/* Grid de iconos flotantes */}
              <div className="grid grid-cols-3 gap-6 p-12 relative z-20">
                <FaWhatsapp className="text-[#25D366] text-5xl" />
                <FaTelegramPlane className="text-[#26A5E4] text-5xl" />
                <FaDiscord className="text-[#5865F2] text-5xl" />
                <SiImessage className="text-[#5EFFB1] text-5xl" />
                <SiMessenger className="text-[#006AFF] text-5xl" />
                <FaXTwitter className="text-white text-5xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LISTA DE PLATAFORMAS - ESTILO CARDS */}
      <section className="py-20 bg-zinc-950 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {PLATFORMS.map((platform, index) => (
              <motion.div
                key={platform.id}
                variants={reveal}
                onClick={() => platform.active && handlePlatformClick(platform.link)}
                className={`group relative block p-[1px] rounded-[2.2rem] transition-all cursor-pointer ${
                  platform.active ? 'bg-gradient-to-r from-white/10 to-transparent hover:from-[#E6F379]/30' : 'opacity-30'
                }`}
              >
                <div className="bg-[#0A0A0A] rounded-[2rem] p-5 flex items-center justify-between border border-white/5 hover:border-[#E6F379]/30 transition-colors">
                  <div className="flex items-center gap-5">
                    <div className="text-4xl" style={{ color: platform.active ? platform.color : '#555' }}>
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-black italic uppercase tracking-tighter leading-none">{platform.name}</h3>
                      <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{platform.desc}</p>
                    </div>
                  </div>
                  {platform.active ? (
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-[#E6F379] group-hover:bg-[#E6F379] group-hover:text-black transition-all">
                      <FiChevronRight size={20} />
                    </div>
                  ) : (
                    <div className="relative group/soon">
                      <span className="absolute -top-8 right-0 text-[8px] font-black text-[#E6F379] opacity-0 group-hover/soon:opacity-100 transition-all whitespace-nowrap">
                        Soon
                      </span>
                      <FiShield className="text-zinc-800 mr-2" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* NOTA DE SEGURIDAD */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 text-zinc-700 text-[10px] font-black uppercase tracking-widest">
              <FiShield />
              <span>Encriptación end-to-end • Datos protegidos</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN DE BONUS */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={reveal}
          >
            <h2 className="text-[#E6F379] font-black uppercase tracking-[0.3em] text-[10px] mb-12">Tu primer movimiento</h2>
            <p className="text-3xl md:text-5xl font-bold leading-tight italic uppercase">
              "Después de tu primera compra, <br />
              <span className="text-[#E6F379]">$20 en bonus</span> caen directo a tu cuenta."
            </p>
            <div className="w-20 h-1 bg-[#E6F379] mx-auto mt-12 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN DE BENEFICIOS */}
      <section className="py-20 px-6 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Velocidad", title: "30 segundos", desc: "Activa tu cuenta en menos de lo que tarda un café." },
            { label: "Seguridad", title: "AES-256", desc: "Encriptación de grado militar en todos los mensajes." },
            { label: "Bonus", title: "$20 USD", desc: "Después de tu primera transacción." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-zinc-900/50 p-12 rounded-[3.5rem] border border-white/5 hover:border-[#E6F379]/30 transition-colors group"
            >
              <p className="text-[#E6F379] font-black uppercase text-[10px] mb-4 tracking-widest">{item.label}</p>
              <h3 className="text-3xl font-black italic uppercase mb-4 group-hover:text-[#E6F379] transition-colors">{item.title}</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gradiente para Messenger */}
      <svg width="0" height="0" className="absolute">
        <linearGradient id="messenger-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#00B2FF", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#006AFF", stopOpacity: 1 }} />
        </linearGradient>
      </svg>

      <Footer />
    </main>
  );
}