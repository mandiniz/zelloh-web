"use client";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaWhatsapp, FaDiscord, FaTelegramPlane, FaSlack } from "react-icons/fa";
import { FaXTwitter, FaThreads } from "react-icons/fa6";
import { SiViber, SiMessenger, SiTwitch, SiImessage, SiWechat, SiLine } from "react-icons/si";
import { QRCodeSVG } from "qrcode.react";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinModal = ({ isOpen, onClose }: JoinModalProps) => {
  const joinUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/join` 
    : "http://zelloh.co/join";

  // Función para manejar clics en plataformas activas
  const handlePlatformClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-[1200px] z-[999999] mt-10 md:mt-0"
          >
            {/* Efecto visual de tarjetas apiladas */}
            <div className="absolute -top-6 md:-top-10 left-1/2 -translate-x-1/2 w-[88%] md:w-[92%] h-12 md:h-20 bg-white rounded-t-[2rem] md:rounded-t-[3rem] z-[-2] shadow-xl" />
            <div className="absolute -top-3 md:-top-5 left-1/2 -translate-x-1/2 w-[94%] md:w-[96%] h-12 md:h-20 bg-[#E6F379] rounded-t-[2rem] md:rounded-t-[3rem] z-[-1] shadow-lg" />

            <div className="relative bg-[#111111] w-full rounded-[2rem] md:rounded-[2.5rem] overflow-y-auto max-h-[90vh] md:max-h-none md:overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5">
              
              {/* Botón Cerrar */}
              <button 
                onClick={onClose} 
                className="absolute top-5 right-5 md:top-7 md:right-7 text-white/90 hover:text-white text-2xl md:text-3xl z-[1000000] transition-all hover:rotate-90 cursor-pointer"
              >
                <IoClose />
              </button>

              <div className="px-6 py-10 md:px-16 md:py-16 flex flex-col items-center">
                
                {/* Títulos */}
                <div className="text-center mb-8 md:mb-10 max-w-4xl">
                  <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold leading-tight flex flex-wrap items-center justify-center gap-2 md:gap-4">
                    Unete a Zelloh 
                    <span className="inline-block w-9 md:w-12 h-1.5 md:h-2 bg-[#E6F379] rounded-full" />
                    y consigue $20 en
                  </h2>
                  <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mt-1">
                    bonus después de tu primera compra
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 w-full max-w-5xl">
                  
                  {/* Bloque QR */}
                  <div className="flex flex-col items-center">
                    <p className="text-white text-sm md:text-base font-normal text-center mb-5 md:mb-6 max-w-[220px] leading-relaxed">
                      Escanea el codigo QR con tu movil para comenzar
                    </p>
                    
                    <div className="relative scale-85 md:scale-95">
                      <div className="absolute -inset-1.5 md:-inset-2 bg-cyan-400 rounded-[2.4rem] translate-x-[-3px] md:translate-x-[-5px] translate-y-[-3px] md:translate-y-[-5px]" />
                      <div className="absolute -inset-1.5 md:-inset-2 bg-red-500 rounded-[2.4rem] translate-x-[3px] md:translate-x-[5px] translate-y-[3px] md:translate-y-[5px]" />
                      
                      <div className="relative bg-white p-3.5 md:p-5 rounded-[2.2rem] shadow-2xl flex items-center justify-center">
                        <QRCodeSVG 
                          value={joinUrl} 
                          size={180} 
                          level={"H"}
                          className="w-32 h-32 md:w-48 md:h-48"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bloque Aplicaciones - 3 COLUMNAS */}
                  <div className="flex flex-col items-center">
                    <p className="text-white text-sm md:text-base font-normal text-center mb-5 md:mb-6 max-w-[300px] leading-relaxed">
                      O escoge tu app de in-messenger favorita para añadir a Zelloh a movil.
                    </p>
                    
                    <div className="bg-[#181818] p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] grid grid-cols-3 gap-x-5 md:gap-x-8 gap-y-4 md:gap-y-6 w-full items-center">
                      {/* ACTIVAS */}
                      <FaWhatsapp 
                        onClick={() => handlePlatformClick("https://wa.me/+19792715884?text=Hola, quiero%20unirme%20a%20Zelloh🤑")}
                        className="text-[#25D366] text-3.5xl md:text-5xl cursor-pointer hover:scale-110 transition-transform mx-auto" 
                      />
                      <FaDiscord 
                        onClick={() => handlePlatformClick("https://discord.com/oauth2/authorize?client_id=1093856214426849361")}
                        className="text-[#5865F2] text-3.5xl md:text-5xl cursor-pointer hover:scale-110 transition-transform mx-auto" 
                      />
                      <FaTelegramPlane 
                        onClick={() => handlePlatformClick("https://t.me/zellohbot")}
                        className="text-[#26A5E4] text-3.5xl md:text-5xl cursor-pointer hover:scale-110 transition-transform mx-auto" 
                      />
                      
                      {/* iMessage - ACTIVO */}
                      <SiImessage 
                        onClick={() => handlePlatformClick("https://messages.zelloh.com")}
                        className="text-[#5EFFB1] text-3.5xl md:text-5xl cursor-pointer hover:scale-110 transition-transform mx-auto" 
                      />

                      {/* Messenger - ACTIVO */}
                      <SiMessenger 
                        onClick={() => handlePlatformClick("https://m.me/zelloh")}
                        className="text-3.5xl md:text-5xl cursor-pointer hover:scale-110 transition-transform mx-auto" 
                        style={{ fill: "url(#messenger-grad)" }}
                      />

                      {/* X/Twitter - ACTIVO */}
                      <FaXTwitter 
                        onClick={() => handlePlatformClick("https://x.com/zellohbot")}
                        className="text-white text-3.5xl md:text-5xl cursor-pointer hover:scale-110 transition-transform mx-auto" 
                      />

                      {/* SOON: Twitch */}
                      <div className="relative group mx-auto flex flex-col items-center">
                        <span className="absolute -top-4 md:-top-6 text-[7px] md:text-[9px] font-black text-[#E6F379] opacity-0 group-hover:opacity-100 transition-all tracking-widest uppercase">Soon</span>
                        <SiTwitch 
                          onClick={() => handlePlatformClick("https://twitch.tv/zelloh")}
                          className="text-[#9146FF] text-3.5xl md:text-5xl cursor-pointer hover:scale-110 transition-transform mx-auto opacity-40 hover:opacity-100" 
                        />
                      </div>

                      {/* SOON: Line */}
                      <div className="relative group mx-auto flex flex-col items-center">
                        <span className="absolute -top-4 md:-top-6 text-[7px] md:text-[9px] font-black text-[#E6F379] opacity-0 group-hover:opacity-100 transition-all tracking-widest uppercase">Soon</span>
                        <SiLine 
                          onClick={() => handlePlatformClick("https://line.me/zelloh")}
                          className="text-[#00B900] text-3.5xl md:text-5xl cursor-pointer hover:scale-110 transition-transform mx-auto opacity-40 hover:opacity-100" 
                        />
                      </div>

                      {/* SOON: Viber */}
                      <div className="relative group mx-auto flex flex-col items-center">
                        <span className="absolute -top-4 md:-top-6 text-[7px] md:text-[9px] font-black text-[#E6F379] opacity-0 group-hover:opacity-100 transition-all tracking-widest uppercase">Soon</span>
                        <SiViber 
                          onClick={() => handlePlatformClick("viber://pa?chatURI=zelloh")}
                          className="text-[#7360F2] text-3.5xl md:text-5xl cursor-pointer hover:scale-110 transition-transform mx-auto opacity-40 hover:opacity-100" 
                        />
                      </div>

                      {/* SOON: WeChat */}
                      <div className="relative group mx-auto flex flex-col items-center">
                        <span className="absolute -top-4 md:-top-6 text-[7px] md:text-[9px] font-black text-[#E6F379] opacity-0 group-hover:opacity-100 transition-all tracking-widest uppercase">Soon</span>
                        <SiWechat 
                          onClick={() => handlePlatformClick("https://wechat.com/zelloh")}
                          className="text-[#07C160] text-3.5xl md:text-5xl cursor-pointer hover:scale-110 transition-transform mx-auto opacity-40 hover:opacity-100" 
                        />
                      </div>

                      {/* SOON: Threads */}
                      <div className="relative group mx-auto flex flex-col items-center">
                        <span className="absolute -top-4 md:-top-6 text-[7px] md:text-[9px] font-black text-[#E6F379] opacity-0 group-hover:opacity-100 transition-all tracking-widest uppercase">Soon</span>
                        <FaThreads 
                          onClick={() => handlePlatformClick("https://threads.net/@zelloh")}
                          className="text-white text-3.5xl md:text-5xl cursor-pointer hover:scale-110 transition-transform mx-auto opacity-40 hover:opacity-100" 
                        />
                      </div>

                      {/* SOON: Slack */}
                      <div className="relative group mx-auto flex flex-col items-center">
                        <span className="absolute -top-4 md:-top-6 text-[7px] md:text-[9px] font-black text-[#E6F379] opacity-0 group-hover:opacity-100 transition-all tracking-widest uppercase">Soon</span>
                        <FaSlack 
                          onClick={() => handlePlatformClick("https://zelloh.slack.com")}
                          className="text-[#4A154B] text-3.5xl md:text-5xl cursor-pointer hover:scale-110 transition-transform mx-auto opacity-40 hover:opacity-100" 
                        />
                      </div>

                      {/* Gradiente para Messenger */}
                      <svg width="0" height="0" className="absolute">
                        <linearGradient id="messenger-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: "#00B2FF", stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: "#006AFF", stopOpacity: 1 }} />
                        </linearGradient>
                      </svg>
                    </div>

                    {/* Nota sobre Soon */}
                    <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mt-6">
                      *Las plataformas con "Soon" estarán disponibles próximamente
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};