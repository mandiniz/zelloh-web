"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function CookiesPage() {
  const cookieTypes = [
    { title: 'Necesarias', desc: 'Esenciales para el funcionamiento de la banca online y seguridad.', status: 'Siempre activas', color: '#f4e452' },
    { title: 'Analíticas', desc: 'Nos ayudan a entender cómo usas la app para mejorar la interfaz.', status: 'Opcional', color: '#white' },
    { title: 'Marketing', desc: 'Permiten mostrarte hacks y bonuses personalizados según tus gastos.', status: 'Opcional', color: '#white' },
  ];

  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans">
      <Header />

      <section className="pt-40 pb-40 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <div className="inline-block px-4 py-1 border border-[#f4e452] text-[#f4e452] rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
            Privacy First
          </div>
          <h1 className="text-6xl md:text-8xl font-[1000] italic uppercase tracking-tighter mb-8">
            Política de <span className="text-[#f4e452]">Cookies</span>
          </h1>
          <p className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed">
            En Zelloh usamos cookies para que tu experiencia financiera sea fluida, segura y personalizada.
          </p>
        </div>

        <div className="space-y-6">
          {cookieTypes.map((cookie, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.01 }}
              className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-8"
            >
              <div>
                <h3 className="text-2xl font-black italic uppercase tracking-tight mb-2" style={{ color: cookie.color }}>
                  {cookie.title}
                </h3>
                <p className="text-zinc-500 font-medium">{cookie.desc}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{cookie.status}</span>
                <div className={`w-14 h-8 rounded-full p-1 flex items-center ${cookie.status === 'Siempre activas' ? 'bg-[#f4e452]' : 'bg-zinc-800'}`}>
                  <div className={`w-6 h-6 rounded-full shadow-lg ${cookie.status === 'Siempre activas' ? 'bg-black ml-6' : 'bg-zinc-500'}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-[#f4e452] rounded-[3rem] text-black">
          <h2 className="text-4xl font-[1000] italic uppercase tracking-tighter mb-6">Tu privacidad es tuya.</h2>
          <p className="text-lg font-bold mb-8 opacity-80">
            A diferencia de otros bancos, Zelloh nunca vende tus datos a terceros. Las cookies solo sirven para que nuestra tecnología funcione mejor para ti.
          </p>
          <button className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase italic hover:scale-105 transition-transform">
            Guardar Preferencias
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}