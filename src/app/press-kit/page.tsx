"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiArrowDown, FiExternalLink, FiHash, FiActivity, 
  FiLayers, FiX, FiDownloadCloud, FiZap, FiChevronRight,
  FiUser, FiMail, FiFileText, FiCheck
} from "react-icons/fi";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JoinModal } from "@/components/sections/JoinModal";

const EXPO_EASE = [0.16, 1, 0.3, 1] as const;

// --- COMPONENTE: PRESS CARD ---
const PressCard = ({ title, image, index, onDownload }: { title: string, image: string, index: number, onDownload: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 1.2, ease: EXPO_EASE }}
    viewport={{ once: true }}
    className="group relative bg-[#070707] border border-white/5 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden aspect-[2/3] flex flex-col hover:border-[#E6F379]/30 transition-all duration-700"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-[#E6F379]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    
    <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 md:gap-3 z-20">
      <div className="w-1.5 h-1.5 bg-[#E6F379] rounded-full animate-pulse" />
      <span className="text-[8px] md:text-[10px] font-black text-[#E6F379]/50 font-mono tracking-tighter">REF_00{index}</span>
    </div>

    <div className="flex-1 flex items-center justify-center p-8 md:p-14 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(230,243,121,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <motion.img 
        whileHover={{ scale: 1.05, rotate: -2 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        src={image} 
        alt={title} 
        className="w-full h-full object-contain z-10 filter grayscale group-hover:grayscale-0 contrast-125 transition-all duration-700" 
      />
    </div>

    <div className="p-6 md:p-8 bg-zinc-950/40 backdrop-blur-xl border-t border-white/5 relative z-20">
      <div className="flex justify-between items-center gap-4">
        <div className="min-w-0">
          <p className="text-[7px] md:text-[8px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-1 truncate">Vault / Asset</p>
          <h3 className="text-xl md:text-3xl font-[1000] italic tracking-tighter uppercase leading-none truncate">{title}</h3>
        </div>
        <button 
          onClick={onDownload}
          className="w-10 h-10 md:w-14 md:h-14 flex-shrink-0 bg-[#E6F379] rounded-xl md:rounded-2xl flex items-center justify-center text-black hover:rotate-90 transition-all duration-500 shadow-[0_0_30px_rgba(230,243,121,0.15)] group-hover:shadow-[#E6F379]/30"
        >
          <FiArrowDown className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
        </button>
      </div>
    </div>
  </motion.div>
);

// --- FORMULARIO SIMPLE: Nombre, Email, Motivo + Descarga ZIP ---
const RequestFormModal = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    motivo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const motivos = [
    { value: 'prensa', label: 'Prensa / Medios' },
    { value: 'partners', label: 'Partners / Colaboración' },
    { value: 'inversores', label: 'Inversores' },
    { value: 'marketing', label: 'Marketing / Branding' },
    { value: 'otros', label: 'Otros' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.email || !formData.motivo) return;
    
    setIsSubmitting(true);
    
    // Simular pequeño delay para feedback visual
    setTimeout(() => {
      // Crear link de descarga al archivo ZIP desde /public
      const link = document.createElement('a');
      link.href = '/press-kit-zelloh.zip'; // Asume que el archivo está en /public/press-kit-zelloh.zip
      link.download = 'press-kit-zelloh.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsSubmitting(false);
      onClose();
      
      // Reset form
      setFormData({ nombre: '', email: '', motivo: '' });
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose} 
          className="absolute inset-0 bg-black/95 backdrop-blur-xl" 
        />
        
        <motion.div 
          initial={{ y: 50, opacity: 0, scale: 0.95 }} 
          animate={{ y: 0, opacity: 1, scale: 1 }} 
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          className="bg-gradient-to-b from-[#0C0C0C] to-[#050505] border border-[#E6F379]/30 w-full max-w-md rounded-[2.5rem] md:rounded-[3rem] p-8 relative z-10 shadow-[0_0_100px_rgba(230,243,121,0.15)]"
        >
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 text-zinc-600 hover:text-[#E6F379] transition-colors"
            disabled={isSubmitting}
          >
            <FiX size={24} />
          </button>

          <div className="w-16 h-16 bg-[#E6F379] rounded-2xl flex items-center justify-center text-black mb-6">
            <FiDownloadCloud size={32} strokeWidth={2} />
          </div>
          
          <h3 className="text-3xl font-[1000] italic uppercase tracking-tighter mb-2 leading-none">
            Descargar<br /><span className="text-[#E6F379]">Press Kit_</span>
          </h3>
          
          <p className="text-zinc-500 text-sm mb-8 border-l-2 border-[#E6F379]/30 pl-3">
            Completa el formulario para acceder a los activos.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Nombre */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-2">
                <FiUser className="w-3 h-3" /> NOMBRE COMPLETO
              </label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#E6F379] focus:outline-none transition-colors"
                placeholder="Ej: Ana García López"
                disabled={isSubmitting}
              />
            </div>

            {/* Campo Email */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-2">
                <FiMail className="w-3 h-3" /> EMAIL
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#E6F379] focus:outline-none transition-colors"
                placeholder="ej: ana@empresa.com"
                disabled={isSubmitting}
              />
            </div>

            {/* Dropdown Motivo */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-2">
                <FiFileText className="w-3 h-3" /> MOTIVO DE DESCARGA
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.motivo}
                  onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#E6F379] focus:outline-none transition-colors appearance-none cursor-pointer"
                  disabled={isSubmitting}
                >
                  <option value="" disabled>Selecciona un motivo</option>
                  {motivos.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-zinc-500">
                  <FiChevronRight className="w-4 h-4 rotate-90" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#E6F379] text-black py-4 rounded-xl font-[1000] italic uppercase text-sm hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  PROCESANDO...
                </>
              ) : (
                <>
                  DESCARGAR ZIP <FiArrowDown size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-[8px] text-zinc-700 font-mono text-center mt-4">
            ZELLOH_SECURE_NODE • v9.0.4 • PRESS_KIT_{new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default function PressKitPro() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isDownloadInfoOpen, setIsDownloadInfoOpen] = useState(false);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleOpenJoin = () => {
    setIsJoinModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleOpenRequestForm = () => {
    setIsDownloadInfoOpen(false);
    setIsRequestFormOpen(true);
  };

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="bg-[#020202] text-white min-h-screen w-full relative selection:bg-[#E6F379] selection:text-black font-sans overflow-x-hidden">
      <Header />

      {/* MARCO DE INGENIERÍA */}
      <div className="fixed inset-0 border-[1px] border-white/5 z-50 pointer-events-none m-4 md:m-8 hidden sm:block" />
      <div className="fixed top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent z-50 pointer-events-none hidden lg:block" />
      
      {/* Textura de ruido */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none z-[60]" />

      <section className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-32 pt-32 md:pt-48 pb-20 md:pb-32">
        
        {/* HERO SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 md:mb-40 gap-10 lg:gap-16">
          <div className="relative w-full lg:w-auto">
            <div className="flex items-center gap-3 mb-6 md:mb-10 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: 30 }} transition={{ duration: 1 }} className="h-[1px] bg-[#E6F379]" />
              <FiZap className="text-[#E6F379] animate-bounce w-3 h-3 md:w-4 md:h-4" />
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.8em] text-zinc-500 whitespace-nowrap">Archive_v9.0</span>
            </div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EXPO_EASE }}
              className="text-[14vw] sm:text-[12vw] lg:text-[11rem] font-[1000] leading-[0.85] lg:leading-[0.75] tracking-[-0.07em] uppercase italic"
            >
              Kit de <br />
              <span className="text-zinc-900 text-stroke-premium relative inline-block">
                Prensa_
                <span className="absolute -top-2 -right-4 md:-top-4 md:-right-8 text-xs md:text-xl not-italic font-mono opacity-50">®</span>
              </span>
            </motion.h1>
          </div>
          
          <div className="max-w-xs lg:text-right space-y-4 md:space-y-6">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900/50 border border-white/5 rounded-full">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">Servidores_Online</span>
             </div>
             <p className="text-zinc-500 text-xs md:text-sm font-bold leading-relaxed uppercase tracking-tighter">
                Activos digitales de alta resolución para prensa y partners verificados.
             </p>
          </div>
        </div>

        {/* GRID DE RECURSOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 mb-32 md:mb-64">
          <PressCard 
            title="Logos" 
            image="/assets/logo_asset_2.png"
            index={1} 
            onDownload={() => setIsDownloadInfoOpen(true)} 
          />
          <PressCard 
            title="Producto" 
            image="/assets/zelloh_product.png"
            index={2} 
            onDownload={() => setIsDownloadInfoOpen(true)} 
          />
          <PressCard 
            title="Hardware" 
            image="/assets/zelloh_hardward.png"
            index={3} 
            onDownload={() => setIsDownloadInfoOpen(true)} 
          />
          <PressCard 
            title="Identidad" 
            image="/assets/zelloh_identity.png"
            index={4} 
            onDownload={() => setIsDownloadInfoOpen(true)} 
          />
        </div>

        {/* CONTACT SECTION */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#E6F379]/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="bg-[#050505] rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-24 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 md:p-20 opacity-[0.02] text-white pointer-events-none select-none">
               <FiHash className="text-[150px] md:text-[400px]" />
            </div>

            <div className="relative z-10">
              <h2 className="text-5xl md:text-9xl font-[1000] italic tracking-tighter uppercase leading-[0.8] mb-12 md:mb-16">
                Contacto <br /><span className="text-zinc-800">Directo_</span>
              </h2>

              <div className="grid grid-cols-1 gap-1">
                {[
                  { label: "Prensa", email: "press@zelloh.app" },
                  { label: "Marketing", email: "marketing@zelloh.app" },
                  { label: "Partners", email: "boost@zelloh.app" }
                ].map((item, i) => (
                  <motion.a 
                    key={i}
                    href={`mailto:${item.email}`}
                    whileHover={{ x: 10 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 md:p-12 border-b border-white/5 transition-all duration-500 hover:bg-[#E6F379] hover:text-black rounded-[1.5rem] md:rounded-[2rem] group"
                  >
                    <div className="space-y-1 mb-4 md:mb-0">
                      <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-black/50 block">
                        Zelloh // {item.label}
                      </span>
                      <span className="text-xl sm:text-2xl md:text-5xl font-[1000] italic tracking-tight uppercase break-all">
                        {item.email}
                      </span>
                    </div>
                    <FiChevronRight className="w-8 h-8 md:w-12 md:h-12 opacity-0 group-hover:opacity-100 -translate-x-4 md:-translate-x-10 group-hover:translate-x-0 transition-all duration-500 hidden sm:block" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* MODAL DE DESCARGA INICIAL */}
      <AnimatePresence>
        {isDownloadInfoOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsDownloadInfoOpen(false)} 
              className="absolute inset-0 bg-black/95 backdrop-blur-xl" 
            />
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }} 
              animate={{ y: 0, opacity: 1, scale: 1 }} 
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              className="bg-[#0A0A0A] border border-[#E6F379]/30 w-full max-w-xl rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 relative z-10 shadow-[0_0_100px_rgba(230,243,121,0.1)]"
            >
              <button 
                onClick={() => setIsDownloadInfoOpen(false)} 
                className="absolute top-6 right-6 md:top-10 md:right-10 text-zinc-600 hover:text-[#E6F379] transition-colors"
              >
                <FiX size={24}/>
              </button>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#E6F379] rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center text-black mb-6 md:mb-10">
                <FiDownloadCloud className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
              </div>
              <h3 className="text-3xl md:text-5xl font-[1000] italic uppercase tracking-tighter mb-4 md:mb-6 leading-none">
                Acceso<br /><span className="text-[#E6F379]">Restringido_</span>
              </h3>
              <p className="text-zinc-400 font-bold text-sm md:text-lg leading-relaxed mb-8 md:mb-10 uppercase tracking-tighter">
                El archivo maestro requiere verificación.
              </p>
              <button 
                onClick={handleOpenRequestForm}
                className="w-full bg-[#E6F379] text-black py-5 md:py-6 rounded-2xl font-[1000] italic uppercase text-sm md:text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
              >
                COMPLETAR FORMULARIO <FiChevronRight size={18} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FORMULARIO DE SOLICITUD */}
      <RequestFormModal 
        isOpen={isRequestFormOpen}
        onClose={() => setIsRequestFormOpen(false)}
      />

      <JoinModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />

      <style jsx global>{`
        .text-stroke-premium {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.08);
          color: transparent;
        }
        @media (min-width: 768px) {
          .text-stroke-premium { -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.08); }
          .text-stroke-premium:hover { -webkit-text-stroke: 1.5px rgba(230, 243, 121, 0.4); }
        }
        body { background-color: #020202; }
      `}</style>
    </main>
  );
}