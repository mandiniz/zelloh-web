"use client";
import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaDiscord, FaTelegramPlane, FaFacebookMessenger, FaTwitch, FaCreditCard } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiViber, SiImessage } from "react-icons/si";
import { IoClose } from "react-icons/io5";
import { QRCodeSVG } from "qrcode.react";

export const MessengerPreview = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);
  
  const [boltOffset, setBoltOffset] = useState({ x: 0, y: 0 });

  const escapeFromCursor = () => {
    const randomX = (Math.random() - 0.5) * 150; 
    const randomY = (Math.random() - 0.5) * 100;
    setBoltOffset({ x: randomX, y: randomY });
  };

  const resetBolt = () => {
    setBoltOffset({ x: 0, y: 0 });
  };

  const platforms = [
    { id: "whatsapp", name: "WhatsApp", icon: <FaWhatsapp />, bg: "bg-white", text: "text-green-500", link: "https://wa.me/zelloh" },
    { id: "discord", name: "Discord", icon: <FaDiscord />, bg: "bg-[#5865F2]", text: "text-white", link: "https://discord.gg/zelloh" },
    { id: "telegram", name: "Telegram", icon: <FaTelegramPlane />, bg: "bg-[#0088cc]", text: "text-white", link: "https://t.me/zelloh_bot" },
    { id: "viber", name: "Viber", icon: <SiViber />, bg: "bg-[#7360F2]", text: "text-white", link: "viber://pa?chatURI=zelloh" },
    { id: "messenger", name: "Messenger", icon: <FaFacebookMessenger />, bg: "bg-gradient-to-br from-[#00B2FF] to-[#006AFF]", text: "text-white", link: "https://m.me/zelloh" },
    // Twitch comentado - disponible para futuro
    // { id: "twitch", name: "Twitch", icon: <FaTwitch />, bg: "bg-[#9146FF]", text: "text-white", link: "https://twitch.tv/zelloh" },
    { id: "x", name: "X / Twitter", icon: <FaXTwitter />, bg: "bg-white", text: "text-black", link: "https://x.com/zelloh" },
    { 
      id: "imessage", 
      name: "iMessage", 
      icon: <SiImessage />, 
      bg: "bg-gradient-to-br from-[#5EFFB1] to-[#00B76A]", 
      text: "text-white", 
      link: "https://messages.zelloh.com" 
    }
  ];

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative bg-black text-white py-5 px-6 md:px-5 flex items-center overflow-hidden">
      
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#E6F379]/10 blur-[120px] rounded-full" 
        />
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-6 relative z-10">
        
        <motion.div className="flex-[1.6] z-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={textVariants}>
          <div className="space-y-2">
            <motion.h2 
              className="text-[32px] sm:text-[45px] md:text-[52px] lg:text-[62px] font-black leading-[1.4] tracking-tighter uppercase"
              onMouseLeave={resetBolt}
            >
              <motion.span variants={lineVariants} className="block whitespace-nowrap">
                Sin instalación {" "}
                <motion.span 
                  onMouseMove={escapeFromCursor}
                  animate={{ 
                    x: boltOffset.x, 
                    y: boltOffset.y,
                    filter: boltOffset.x !== 0 ? "drop-shadow(0 0 20px #E6F379)" : "none",
                    scale: boltOffset.x !== 0 ? 1.4 : 1
                  }}
                  transition={{ type: "spring", stiffness: 1000, damping: 30 }}
                  className="inline-block text-[#E6F379] cursor-none select-none"
                >
                  ⚡️
                </motion.span>
              </motion.span>
              <motion.span variants={lineVariants} className="block text-zinc-600">Comienza con tu</motion.span>
              <motion.span variants={lineVariants} className="block text-zinc-600">in- messenger fav.</motion.span>
            </motion.h2>
          </div>

          <motion.div variants={lineVariants} className="flex flex-wrap gap-4 mt-10">
            {platforms.map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedPlatform(item)}
                className={`w-12 h-12 md:w-14 md:h-14 ${item.bg} ${item.text} rounded-full flex items-center justify-center text-2xl md:text-3xl shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-pointer transition-shadow hover:shadow-[#E6F379]/20`}
              >
                {item.icon}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative flex-1 flex flex-col items-center lg:items-end w-full">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} className="flex flex-col items-center mb-10 lg:mr-20">
            <motion.div 
              animate={{ boxShadow: ["0 0 0px rgba(230,243,121,0)", "0 0 30px rgba(230,243,121,0.2)", "0 0 0px rgba(230,243,121,0)"] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-b from-[#E6F379] to-[#7D26FF] flex items-center justify-center relative p-1"
            >
               <div className="flex flex-col items-center">
                  <div className="flex gap-1 mb-1">
                    <motion.div animate={{ height: [15, 24, 15] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1 bg-[#7D26FF] rounded-full" />
                    <motion.div animate={{ height: [24, 15, 24] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1 bg-[#7D26FF] rounded-full" />
                  </div>
                  <span className="text-[8px] md:text-[10px] font-black italic tracking-tighter text-white uppercase">zelloh</span>
               </div>
               <div className="absolute bottom-1 right-1 w-5 h-5 md:w-6 md:h-6 bg-green-500 border-4 border-black rounded-full" />
            </motion.div>
            <span className="font-black mt-3 text-lg md:text-xl flex items-center gap-2">
              Zelloh <span className="bg-blue-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">✓</span>
            </span>
          </motion.div>

          {/* CHAT ACTUALIZADO CON BOTÓN */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4 w-full max-w-[400px] lg:max-w-[450px]">
            <ChatBubble side="right" color="bg-[#608AF1]" delay={0.8}>Hey!! Quiero unirme a Zelloh!</ChatBubble>
            <ChatBubble side="left" color="bg-zinc-800" delay={1.6}>¡Hola Zeller!! 👋 Aquí Zelloh</ChatBubble>
            <ChatBubble side="left" color="bg-zinc-800" delay={2.4}>Comenzamos. ¿Cuál es tu nombre completo?</ChatBubble>
            <ChatBubble side="right" color="bg-[#608AF1]" delay={3.2}>Matías León M.</ChatBubble>
            
            {/* BOTÓN TIPO BOT */}
            <ChatButton delay={4.0}>Create 💳 my card</ChatButton>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedPlatform && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedPlatform(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-[#111111] border border-white/10 p-8 rounded-[2.5rem] w-full max-w-[350px] flex flex-col items-center text-center shadow-2xl"
            >
              <button onClick={() => setSelectedPlatform(null)} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
                <IoClose size={24} />
              </button>
              <div className={`w-16 h-16 ${selectedPlatform.bg} ${selectedPlatform.text} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-xl`}>
                {selectedPlatform.icon}
              </div>
              <h3 className="text-xl font-black uppercase italic mb-2">Conectar {selectedPlatform.name}</h3>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6">Escanea con tu cámara</p>
              <div className="bg-white p-4 rounded-[1.8rem] shadow-[0_0_40px_rgba(230,243,121,0.25)] border-4 border-[#E6F379]">
                <QRCodeSVG value={selectedPlatform.link} size={180} level="H" />
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 w-full text-[10px] text-[#E6F379] font-black uppercase italic tracking-[0.3em]">
                Zelloh_Secure_Node
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ChatBubble = ({ children, side, color, delay }: { children: React.ReactNode, side: 'left' | 'right', color: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: side === 'left' ? -30 : 30, scale: 0.9 }}
    whileInView={{ opacity: 1, x: 0, scale: 1 }}
    transition={{ duration: 0.5, delay: delay, ease: "backOut" }}
    className={`flex ${side === 'right' ? 'justify-end' : 'justify-start'}`}
  >
    <motion.div 
      whileHover={{ y: -2 }}
      className={`${color} px-5 py-3 rounded-[1.2rem] ${side === 'right' ? 'rounded-tr-none' : 'rounded-tl-none'} max-w-[90%] text-base md:text-lg font-medium shadow-2xl relative overflow-hidden group`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      {children}
    </motion.div>
  </motion.div>
);

// NUEVO COMPONENTE: BOTÓN DE BOT
const ChatButton = ({ children, delay }: { children: React.ReactNode, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20, scale: 0.8 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay: delay, ease: "backOut" }}
    className="flex justify-start pl-4"
  >
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: "#E6F379", color: "#000" }}
      whileTap={{ scale: 0.95 }}
      className="bg-transparent border-2 border-[#E6F379] text-[#E6F379] px-6 py-2 rounded-full text-sm md:text-base font-black uppercase italic tracking-tight transition-colors duration-300 shadow-[0_0_15px_rgba(230,243,121,0.2)]"
    >
      {children}
    </motion.button>
  </motion.div>
);