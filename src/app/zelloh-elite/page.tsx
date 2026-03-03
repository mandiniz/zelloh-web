"use client";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiChevronRight, FiStar, FiTriangle, FiZap, 
  FiShield, FiGlobe, FiCommand, FiX, FiCheckCircle 
} from "react-icons/fi";

// --- COMPONENTE: CARD DE BENEFICIO CON MODAL ---
const AlphaPerkCard = ({ icon: Icon, title, desc, index, onOpen }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    onClick={() => onOpen({ icon: Icon, title, desc })}
    className="relative group h-full cursor-pointer"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-b from-[#f4e452]/20 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-all blur-sm" />
    <div className="relative h-full flex flex-col gap-6 p-8 md:p-10 bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] group-hover:border-[#f4e452]/30 transition-all duration-500">
      <div className="text-[#f4e452] text-3xl"><Icon /></div>
      <div className="space-y-4">
        <h3 className="text-2xl md:text-3xl font-[1000] italic uppercase tracking-tighter text-white">{title}</h3>
        <p className="text-zinc-500 font-medium text-sm line-clamp-2">{desc}</p>
      </div>
      <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
        <span className="text-[8px] font-black text-[#f4e452] uppercase tracking-widest">Ver detalles</span>
        <div className="w-1.5 h-1.5 bg-[#f4e452] rounded-full" />
      </div>
    </div>
  </motion.div>
);

export default function ZellohAlpha() {
  const [selectedPerk, setSelectedPerk] = useState<any>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const perks = [
    { icon: FiZap, title: "Liquidez Inmediata", desc: "Acceso instantáneo a tus fondos sin periodos de retención. Transferencias SEPA y Faster Payments ejecutadas en milisegundos las 24 horas del día." },
    { icon: FiStar, title: "Conserje 24/7", desc: "Soporte humano de nivel institucional. Gestión de límites, consultas complejas y asistencia en viajes o eventos exclusivos Zelloh." },
    { icon: FiShield, title: "Seguro Global", desc: "Tus activos están protegidos por pólizas líderes en el mercado contra accesos no autorizados y fallos de protocolo hasta 1M€." },
    { icon: FiGlobe, title: "Salas Privadas", desc: "Acceso ilimitado a Lounges VIP en aeropuertos y entrada a los Zelloh Hubs privados en ciudades capitales." },
    { icon: FiTriangle, title: "Alpha Drops", desc: "Prioridad en el ecosistema. Whitelists garantizadas para colecciones Alpha y acceso a rondas de inversión pre-seed." },
    { icon: FiStar, title: "Sin Comisiones", desc: "Estructura de costes 0%. Sin tarifas de emisión, mantenimiento o conversión de activos para miembros Alpha." },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="bg-[#020202] text-white min-h-screen w-full font-sans selection:bg-[#f4e452] selection:text-black overflow-x-hidden">
      <Header />

      <section className="relative px-6 pt-32 md:pt-56 pb-40">
        <div className="max-w-7xl mx-auto">
          {/* Hero & Card principal igual que antes... */}
          <div className="text-center mb-32 md:mb-60">
             <h1 className="text-[12vw] md:text-[13rem] font-[1000] italic uppercase tracking-tighter leading-[0.8] mb-12">ALPHA<br /><span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>MEMBRESÍA</span></h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-60">
            {perks.map((p, i) => (
              <AlphaPerkCard key={i} {...p} index={i} onOpen={setSelectedPerk} />
            ))}
          </div>

          <div className="bg-white text-black rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden">
            <h2 className="text-6xl md:text-8xl font-[1000] italic uppercase tracking-tighter mb-10">Solicita <br /> Acceso.</h2>
            <button onClick={() => setIsApplyModalOpen(true)} className="bg-black text-white px-16 py-8 rounded-2xl font-[1000] italic uppercase text-2xl hover:scale-105 transition-all flex items-center gap-4 mx-auto">
              Unirse a la lista <FiChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* --- MODAL DE BENEFICIOS --- */}
      <AnimatePresence>
        {selectedPerk && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPerk(null)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-[#0D0D0D] border border-white/10 p-10 rounded-[3rem] max-w-lg w-full shadow-2xl">
              <button onClick={() => setSelectedPerk(null)} className="absolute top-6 right-6 text-zinc-500 hover:text-white"><FiX size={24} /></button>
              <div className="text-[#f4e452] text-4xl mb-6"><selectedPerk.icon /></div>
              <h3 className="text-4xl font-[1000] italic uppercase tracking-tighter mb-4">{selectedPerk.title}</h3>
              <p className="text-zinc-400 leading-relaxed font-bold uppercase text-xs tracking-widest">{selectedPerk.desc}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL DE APLICACIÓN --- */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setIsApplyModalOpen(false); setIsSubmitted(false); }} className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="relative bg-[#0D0D0D] border border-[#f4e452]/20 p-8 md:p-14 rounded-[3rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <button onClick={() => setIsApplyModalOpen(false)} className="absolute top-8 right-8 text-zinc-500 hover:text-white"><FiX size={24} /></button>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="mb-10 text-center">
                    <h3 className="text-4xl md:text-5xl font-[1000] italic uppercase tracking-tighter">Únete a la Élite_</h3>
                    <p className="text-zinc-500 font-bold uppercase text-[10px] mt-2 tracking-[0.3em]">Alpha Waitlist Tier 001</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 ml-4">Nombre</label>
                      <input required type="text" placeholder="Ej. Juan" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#f4e452] transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 ml-4">Apellidos</label>
                      <input required type="text" placeholder="Ej. Pérez" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#f4e452] transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 ml-4">Email</label>
                    <input required type="email" autoComplete="email" placeholder="nombre@dominio.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#f4e452] transition-colors" />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2 col-span-1">
                      <label className="text-[10px] font-black uppercase text-zinc-500 ml-4">Código</label>
                      <input required type="text" placeholder="+34" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#f4e452] transition-colors" />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 ml-4">Teléfono</label>
                      <input required type="tel" placeholder="600 000 000" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#f4e452] transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 ml-4">País</label>
                      <select required className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#f4e452] appearance-none text-zinc-400">
                        <option value="">Seleccionar...</option>
                        <option value="ES">España</option>
                        <option value="MX">México</option>
                        <option value="US">Estados Unidos</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 ml-4">Ciudad</label>
                      <select required className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#f4e452] appearance-none text-zinc-400">
                        <option value="">Seleccionar...</option>
                        <option value="MAD">Madrid</option>
                        <option value="BCN">Barcelona</option>
                        <option value="CDMX">Ciudad de México</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-[#f4e452] text-black py-6 rounded-2xl font-[1000] italic uppercase text-xl hover:scale-[1.02] transition-transform active:scale-95 mt-6">
                    Enviar Solicitud
                  </button>
                </form>
              ) : (
                <div className="text-center py-20">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex justify-center mb-8 text-[#f4e452]">
                    <FiCheckCircle size={100} />
                  </motion.div>
                  <h3 className="text-5xl font-[1000] italic uppercase tracking-tighter mb-4">¡Recibido!</h3>
                  <p className="text-zinc-500 font-bold uppercase text-xs tracking-[0.3em] leading-relaxed">
                    Tu solicitud está siendo procesada. <br /> Te contactaremos en breve vía email.
                  </p>
                  <button onClick={() => setIsApplyModalOpen(false)} className="mt-12 text-zinc-400 hover:text-white font-black uppercase text-[10px] tracking-widest border-b border-white/10">Cerrar Ventana</button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}