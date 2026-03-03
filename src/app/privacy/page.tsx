"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { IoShieldCheckmark, IoLockClosed, IoEyeOff, IoServer, IoClose } from "react-icons/io5";
import { useState } from "react";

const PrivacyCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] hover:border-[#f4e452]/50 transition-all group">
    <div className="w-14 h-14 rounded-2xl bg-[#f4e452] flex items-center justify-center text-black text-2xl mb-8 group-hover:scale-110 transition-transform">
      <Icon />
    </div>
    <h3 className="text-2xl font-[1000] italic uppercase tracking-tighter mb-4">{title}</h3>
    <p className="text-zinc-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

// Modal component
const PrivacyModal = ({ 
  isOpen, 
  onClose, 
  type 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  type: 'access' | 'forget' 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    reason: '',
    confirmDelete: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulación de envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    // Reset después de 3 segundos y cerrar
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ email: '', reason: '', confirmDelete: false });
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-[#111] border border-white/10 rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
          >
            <IoClose size={24} />
          </button>

          {!isSubmitted ? (
            <>
              <div className="w-14 h-14 rounded-2xl bg-[#f4e452] flex items-center justify-center text-black text-2xl mb-6">
                {type === 'access' ? <IoEyeOff /> : <IoShieldCheckmark />}
              </div>

              <h3 className="text-2xl font-[1000] italic uppercase tracking-tighter mb-2">
                {type === 'access' ? 'Solicitar mis datos' : 'Derecho al olvido'}
              </h3>
              
              <p className="text-zinc-500 text-sm mb-6">
                {type === 'access' 
                  ? 'Recibirás un enlace seguro para descargar todos tus datos personales en formato JSON.'
                  : 'Esta acción eliminará permanentemente tu cuenta y todos tus datos. Esta acción no se puede deshacer.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-zinc-400 mb-2">
                    Email asociado a tu cuenta
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#f4e452] focus:outline-none transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>

                {type === 'forget' && (
                  <>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-zinc-400 mb-2">
                        Motivo de eliminación (opcional)
                      </label>
                      <textarea
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#f4e452] focus:outline-none transition-colors h-24 resize-none"
                        placeholder="Ayúdanos a mejorar..."
                      />
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.confirmDelete}
                        onChange={(e) => setFormData({ ...formData, confirmDelete: e.target.checked })}
                        className="mt-1 w-4 h-4 accent-[#f4e452]"
                      />
                      <span className="text-xs text-zinc-400">
                        Confirmo que entiendo que esta acción es <span className="text-[#f4e452] font-bold">IRREVERSIBLE</span> y perderé acceso permanente a mi cuenta y fondos.
                      </span>
                    </label>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#f4e452] text-black p-4 rounded-xl font-black uppercase italic hover:bg-[#f4e452]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Procesando...
                    </span>
                  ) : (
                    type === 'access' ? 'Solicitar mis datos' : 'Eliminar mi cuenta permanentemente'
                  )}
                </button>
              </form>

              <p className="text-[10px] text-zinc-600 text-center mt-4">
                Este proceso puede tardar hasta 48 horas hábiles. Recibirás un email de confirmación.
              </p>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
                  ✓
                </div>
              </div>
              <h4 className="text-xl font-black uppercase italic mb-2">¡Solicitud enviada!</h4>
              <p className="text-zinc-500 text-sm">
                {type === 'access' 
                  ? 'Recibirás un email con el enlace para descargar tus datos en las próximas 48 horas.'
                  : 'Hemos iniciado el proceso de eliminación. Recibirás un email de confirmación cuando se complete.'}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default function PrivacyPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'access' | 'forget'>('access');

  const openModal = (type: 'access' | 'forget') => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#f4e452] selection:text-black">
      <Header />

      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 border border-[#f4e452] text-[#f4e452] rounded-full text-[10px] font-black uppercase tracking-widest mb-8"
          >
            Zero Data Leak Policy
          </motion.div>
          <h1 className="text-7xl md:text-9xl font-[1000] italic uppercase tracking-tighter leading-none mb-8">
            Privacidad <br /> <span className="text-[#f4e452]">Absoluta.</span>
          </h1>
          <p className="text-zinc-400 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            En Zelloh, no solo guardamos tu dinero, custodiamos tu identidad. Tu información financiera está protegida por encriptación de grado militar y leyes de privacidad de la UE.
          </p>
        </div>

        {/* PILARES DE PRIVACIDAD */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-40">
          <PrivacyCard 
            icon={IoLockClosed} 
            title="Encriptación" 
            desc="Tus datos viajan bajo protocolos AES-256. Ni siquiera nosotros podemos ver tus contraseñas."
          />
          <PrivacyCard 
            icon={IoEyeOff} 
            title="Anonimización" 
            desc="Usamos datos agregados para mejorar la app. Tu identidad personal nunca se comparte."
          />
          <PrivacyCard 
            icon={IoServer} 
            title="Soberanía" 
            desc="Toda tu información reside en servidores seguros dentro del territorio de la Unión Europea."
          />
          <PrivacyCard 
            icon={IoShieldCheckmark} 
            title="Cumplimiento" 
            desc="Auditados regularmente para cumplir con GDPR y normativas del Banco de España."
          />
        </div>

        {/* CUERPO LEGAL */}
        <div className="max-w-4xl mx-auto space-y-20">
          <section>
            <h2 className="text-4xl font-[1000] italic uppercase tracking-tighter mb-8 flex items-center gap-4">
              <span className="text-[#f4e452]">01.</span> ¿Qué datos recogemos?
            </h2>
            <div className="prose prose-invert max-w-none text-zinc-400 text-lg leading-relaxed space-y-6">
              <p>
                Para ofrecerte una experiencia bancaria segura, recopilamos información básica como tu nombre, dirección, número de teléfono y documentos de identidad (KYC). También recogemos datos de transacciones para ayudarte a categorizar tus gastos.
              </p>
              <ul className="list-disc pl-6 space-y-4 marker:text-[#f4e452]">
                <li>Información de contacto y verificación de identidad.</li>
                <li>Datos de uso de la aplicación y rendimiento técnico.</li>
                <li>Geolocalización (solo si activas la protección de tarjeta por ubicación).</li>
              </ul>
            </div>
          </section>

          <section className="p-12 bg-white/5 border border-white/10 rounded-[4rem]">
            <h2 className="text-4xl font-[1000] italic uppercase tracking-tighter mb-8">
              Tu control es <span className="text-[#f4e452]">total.</span>
            </h2>
            <p className="text-zinc-300 text-xl mb-10 leading-relaxed">
              Tienes derecho a acceder, rectificar o eliminar tus datos en cualquier momento directamente desde los ajustes de la App.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => openModal('access')}
                className="bg-white text-black p-6 rounded-2xl font-black uppercase italic hover:bg-[#f4e452] transition-colors text-left group"
              >
                <span className="block transform group-hover:translate-x-2 transition-transform">
                  → Solicitar mis datos
                </span>
              </button>
              <button 
                onClick={() => openModal('forget')}
                className="bg-white/10 text-white p-6 rounded-2xl font-black uppercase italic hover:bg-white/20 transition-colors text-left group"
              >
                <span className="block transform group-hover:translate-x-2 transition-transform">
                  → Derecho al olvido
                </span>
              </button>
            </div>
          </section>

          <section className="pb-40">
            <h2 className="text-4xl font-[1000] italic uppercase tracking-tighter mb-8">
              Contacto DPO
            </h2>
            <p className="text-zinc-400 text-lg">
              Si tienes dudas sobre cómo tratamos tus datos, nuestro Delegado de Protección de Datos (DPO) está a tu disposición en: 
              <a href="mailto:dpo@zelloh.com" className="text-[#f4e452] ml-2 font-bold hover:underline">dpo@zelloh.com</a>
            </p>
          </section>
        </div>
      </section>

      <Footer />

      {/* MODAL */}
      <PrivacyModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />
    </main>
  );
}