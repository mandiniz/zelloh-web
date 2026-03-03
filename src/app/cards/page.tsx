"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JoinModal } from "@/components/sections/JoinModal";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { IoCard, IoFlash, IoGlobe, IoColorPalette, IoShieldCheckmark, IoClose, IoSparkles, IoLockOpen } from "react-icons/io5";

// --- SUBCOMPONENTES ---

const BenefitItem = ({ title, text }: { title: string, text: string }) => (
  <div className="border-b border-white/5 py-6 last:border-0">
    <h4 className="text-[#f4e452] font-[1000] italic uppercase text-xl mb-2 tracking-tighter">{title}</h4>
    <p className="text-zinc-400 font-medium leading-relaxed">{text}</p>
  </div>
);

const CardFeature = ({ icon: Icon, title, desc, details }: { icon: any, title: string, desc: string, details: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="flex flex-col gap-6 p-10 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-white/10 transition-all group cursor-pointer"
      >
        <div className="w-16 h-16 rounded-2xl bg-[#f4e452] flex items-center justify-center text-black text-3xl group-hover:rotate-12 transition-transform">
          <Icon />
        </div>
        <h3 className="text-3xl font-[1000] italic uppercase tracking-tighter">{title}</h3>
        <p className="text-zinc-500 font-medium leading-relaxed">{desc}</p>
        <span className="text-[#f4e452] text-xs font-bold uppercase tracking-widest mt-auto opacity-0 group-hover:opacity-100 transition-opacity">Saber más +</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 border border-white/10 w-full max-w-lg rounded-[3rem] p-10 relative z-10 shadow-2xl"
            >
              <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"><IoClose size={24}/></button>
              <div className="text-[#f4e452] text-5xl mb-6"><Icon /></div>
              <h3 className="text-4xl font-[1000] italic uppercase tracking-tighter mb-4">{title}</h3>
              <div className="text-zinc-400 space-y-4 font-medium leading-relaxed">
                {details}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- COMPONENTE PRINCIPAL ---

export default function ZellohCards() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end end"]
  });

  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, 25]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  const handleOpenJoinModal = () => {
    setIsJoinModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseJoinModal = () => {
    setIsJoinModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  if (!mounted) return <div className="bg-[#050505] min-h-screen" />;

  return (
    <main ref={containerRef} className="bg-[#050505] text-white min-h-screen w-full font-sans selection:bg-[#f4e452] selection:text-black relative">
      <Header />

      {/* HERO: EL RENDER DE LA TARJETA */}
      <section className="h-screen flex flex-col items-center justify-center sticky top-0 overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f4e452]/5 to-transparent pointer-events-none" />
        
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-center z-10 mb-20">
          <h1 className="text-6xl md:text-[12rem] font-[1000] italic uppercase tracking-tighter leading-none mb-6">
            Zelloh <span className="text-[#f4e452]">Card</span>
          </h1>
          <p className="text-zinc-500 font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs">
            La única tarjeta que realmente vas a necesitar
          </p>
        </motion.div>

        <motion.div style={{ rotateX: rotate, scale, perspective: 1000 }} className="relative w-full max-w-[350px] md:max-w-[600px] aspect-[1.58/1] z-20">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black rounded-[1.5rem] md:rounded-[2rem] border border-white/20 p-6 md:p-10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
            <div className="flex justify-between items-start relative z-10">
                <IoFlash className="text-[#f4e452] text-3xl md:text-4xl" />
                <div className="relative w-24 h-6 md:w-32 md:h-8">
                  <Image src="/assets/logo-white.svg" alt="Zelloh Logo" fill className="object-contain object-right brightness-110" priority />
                </div>
            </div>
            <div className="relative z-10">
                <p className="font-mono text-lg md:text-3xl tracking-[0.2em] mb-4">**** **** **** 8890</p>
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-zinc-500 font-bold">TITULAR</p>
                        <p className="font-bold uppercase tracking-tight italic text-sm md:text-base">Matias Leon M. B.</p>
                    </div>
                    {/* Logo Mastercard - sustituye al cuadrado gris */}
                    <div className="relative w-12 h-8 md:w-16 md:h-10">
                      <Image 
                        src="/assets/Mastercard-Logo.wine.png" 
                        alt="Mastercard" 
                        fill
                        className="object-contain brightness-0 invert opacity-90"
                      />
                    </div>
                </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECCIÓN DE CARACTERÍSTICAS (GRID) */}
      <section className="relative z-30 bg-[#050505] pt-20 md:pt-40 pb-40 md:pb-60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CardFeature 
              icon={IoColorPalette} 
              title="Personalizable" 
              desc="Elige tu estilo único: Negro Mate, Púrpura Galáctico o Edición Oro." 
              details={
                <>
                  <p>Refleja tu personalidad con materiales premium. Nuestras tarjetas no solo son funcionales, son una pieza de diseño de vanguardia.</p>
                  <ul className="space-y-2 text-[#f4e452] text-xs font-bold uppercase italic mt-4">
                    <li>• Acabado en Metal Cepillado</li>
                    <li>• Grabado Láser de Alta Precisión</li>
                    <li>• Ediciones Limitadas para Fundadores</li>
                  </ul>
                </>
              }
            />
            <CardFeature 
              icon={IoGlobe} 
              title="Gasto Global" 
              desc="Aceptada en todo el mundo sin comisiones ocultas ni sorpresas." 
              details={
                <>
                  <p>Viaja sin preocupaciones. Zelloh Card utiliza el tipo de cambio oficial de la red sin márgenes bancarios adicionales.</p>
                  <ul className="space-y-2 text-[#f4e452] text-xs font-bold uppercase italic mt-4">
                    <li>• Más de 60 millones de comercios</li>
                    <li>• Retiros en cajeros internacionales</li>
                    <li>• Conversión de divisas en tiempo real</li>
                  </ul>
                </>
              }
            />
            <CardFeature 
              icon={IoShieldCheckmark} 
              title="CVV Dinámico" 
              desc="Seguridad de grado militar que se regenera cada 24 horas." 
              details={
                <>
                  <p>Olvídate del fraude online. Tu código de seguridad cambia automáticamente en la aplicación, haciendo que tus datos sean inútiles para cualquier atacante.</p>
                  <ul className="space-y-2 text-[#f4e452] text-xs font-bold uppercase italic mt-4">
                    <li>• Protección avanzada contra clonación</li>
                    <li>• Notificaciones push instantáneas</li>
                    <li>• Bloqueo de tarjeta con un toque</li>
                  </ul>
                </>
              }
            />
          </div>

          {/* BANNER INFERIOR */}
          <div className="mt-40 md:mt-60 bg-white text-black rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-32 flex flex-col lg:flex-row items-center gap-12 md:gap-20 overflow-hidden relative shadow-2xl">
             <div className="flex-1 text-center lg:text-left relative z-10">
                <h2 className="text-5xl md:text-8xl font-[1000] italic uppercase tracking-tighter leading-none mb-8">
                    Consigue tu <br /> tarjeta <span className="text-[#f4e452] bg-black px-4 italic">GRATIS_</span>
                </h2>
                <div className="flex flex-wrap gap-4 md:gap-6 justify-center lg:justify-start">
                    <button onClick={handleOpenJoinModal} className="bg-black text-white px-8 md:px-12 py-5 md:py-6 rounded-2xl font-[1000] italic uppercase text-lg md:text-2xl hover:scale-105 transition-transform shadow-xl">
                        Pedir Mi Tarjeta
                    </button>
                    <button onClick={() => setShowBenefits(true)} className="border-2 border-black text-black px-8 md:px-12 py-5 md:py-6 rounded-2xl font-[1000] italic uppercase text-lg md:text-2xl hover:bg-black hover:text-white transition-all">
                        Ver Beneficios
                    </button>
                </div>
             </div>
             <div className="flex-1 flex justify-center relative w-full lg:w-auto">
                <div className="absolute inset-0 bg-[#f4e452] blur-[120px] opacity-20 pointer-events-none" />
                <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
                  <IoCard className="relative z-10 -rotate-12 text-black drop-shadow-2xl w-[250px] md:w-[350px] h-auto" size={350} />
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* MODAL GENERAL DE BENEFICIOS */}
      <AnimatePresence>
        {showBenefits && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowBenefits(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }} className="bg-[#0f0f0f] border border-white/10 w-full max-w-2xl rounded-[3.5rem] p-10 md:p-16 relative z-10 max-h-[85vh] overflow-y-auto">
              <button onClick={() => setShowBenefits(false)} className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors"><IoClose size={35} /></button>
              <h2 className="text-4xl md:text-6xl font-[1000] italic uppercase tracking-tighter mb-10 leading-none">Beneficios <br /> <span className="text-[#f4e452]">Zelloh Exclusive_</span></h2>
              <div className="space-y-2">
                <BenefitItem title="Cashback Ilimitado" text="Recibe hasta un 3% de devolución en todas tus compras realizadas con Zelloh Card." />
                <BenefitItem title="Cripto Nativa" text="Recarga tu saldo directamente con tus activos digitales sin fricción." />
                <BenefitItem title="Soporte VIP 24/7" text="Acceso prioritario a nuestro equipo de conserjería financiera dedicada." />
              </div>
              <button onClick={() => { setShowBenefits(false); handleOpenJoinModal(); }} className="w-full mt-10 bg-[#f4e452] text-black py-6 rounded-2xl font-[1000] italic uppercase text-xl hover:scale-[1.02] transition-transform">¡Quiero estos beneficios!</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
      <JoinModal isOpen={isJoinModalOpen} onClose={handleCloseJoinModal} />
    </main>
  );
}