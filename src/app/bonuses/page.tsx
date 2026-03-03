"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiArrowUpRight, FiUsers, FiTarget, FiZap } from "react-icons/fi";

export default function BonusesPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const circleY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const textX = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen font-sans overflow-x-hidden">
      <Header />

      {/* 1. HERO CON MOVIMIENTO CINÉTICO - Ajustado para móviles */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center px-4 sm:px-6 md:px-16 overflow-hidden pt-20 md:pt-0">
        {/* Marca de agua dinámica - Oculta en móviles muy pequeños para evitar solapamiento */}
        <motion.div 
          style={{ x: textX }}
          className="absolute -bottom-5 md:-bottom-10 left-0 text-[25vw] md:text-[20vw] font-black text-zinc-900/40 select-none whitespace-nowrap z-0 uppercase tracking-tighter"
        >
          Recompensas Zelloh
        </motion.div>

        {/* Círculos Parallax - Tamaño adaptativo */}
        <motion.div 
          style={{ y: circleY }}
          className="absolute top-1/4 right-[5%] w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-[#7D26FF] rounded-full blur-[80px] md:blur-[120px] opacity-30 z-0" 
        />
        
        <div className="max-w-7xl mx-auto w-full z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[16vw] md:text-[10vw] font-black leading-[0.8] tracking-[-0.05em] uppercase">
              Bonos <br />
              <span className="text-[#E6F379]">Gratis</span>
            </h1>
            <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
              <p className="text-zinc-500 text-xl sm:text-2xl md:text-4xl font-black max-w-2xl leading-tight md:leading-none uppercase tracking-tighter">
                Te devolvemos dinero. <br className="hidden md:block" /> Incluso en cripto. <span className="text-white italic">No es broma.</span>
              </p>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 md:w-32 md:h-32 border-2 border-dashed border-[#E6F379] rounded-full flex items-center justify-center text-[#E6F379] font-black text-[8px] md:text-[10px] uppercase tracking-widest text-center p-2 md:p-4"
              >
                Reclama Ahora • Reclama Ahora • 
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. BENTO GRID: Responsive Grid */}
      <section className="py-16 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          <div className="md:col-span-8 bg-[#111] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 border border-zinc-800 flex flex-col justify-between group overflow-hidden relative">
            <FiZap className="absolute -right-10 -top-10 text-[120px] md:text-[200px] text-white/5 group-hover:text-[#E6F379]/10 transition-colors" />
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-10 md:mb-20 relative z-10">El ciclo del <br /> <span className="text-[#E6F379]">Cashback Infinito</span></h2>
            <div className="flex flex-wrap gap-2 md:gap-4 relative z-10">
              {["Al instante", "Sin comisiones", "Directo a Wallet"].map(tag => (
                <span key={tag} className="px-4 md:px-6 py-2 rounded-full border border-zinc-700 text-[8px] md:text-[10px] font-black uppercase tracking-widest">{tag}</span>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-4 bg-[#7D26FF] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col items-center justify-center text-center group">
             <span className="text-6xl md:text-8xl mb-4 md:mb-6 group-hover:scale-110 transition-transform">💰</span>
             <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">1 BONO = 3$</h3>
          </div>
          
          <div className="md:col-span-4 bg-white text-black rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-between min-h-[180px] md:min-h-0">
            <h4 className="font-black uppercase text-[10px] tracking-widest">Límite Mensual</h4>
            <span className="text-5xl md:text-7xl font-black tracking-tighter leading-none">∞</span>
            <p className="font-bold text-xs md:text-sm uppercase italic">Sin restricciones. Gana cuanto quieras.</p>
          </div>
          
          <div className="md:col-span-8 bg-[#1A1A1A] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 border border-zinc-800 flex items-center gap-6 md:gap-10">
            <div className="text-4xl md:text-5xl shrink-0">🤘</div>
            <p className="text-lg md:text-2xl font-black uppercase tracking-tighter leading-tight">
              Utiliza tus bonos tanto en tiendas <span className="text-zinc-500">físicas</span> como <span className="text-zinc-500">online</span>.
            </p>
          </div>
        </div>
      </section>

      {/* 4. MISSION HUB: Stacked on mobile */}
      <section className="py-16 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#111] rounded-[2.5rem] md:rounded-[4rem] border border-zinc-800 overflow-hidden">
            <div className="p-8 md:p-20 border-b border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
               <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-center md:text-left">Centro de Misiones</h2>
               <div className="flex gap-4">
                  <div className="flex flex-col items-center md:items-end">
                    <span className="text-[8px] md:text-[10px] font-black text-zinc-600 uppercase tracking-widest">Total Disponible</span>
                    <span className="text-3xl md:text-4xl font-black text-[#E6F379]">+$150</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* SOLO MISSIONS */}
              <div className="p-6 md:p-16 border-b md:border-b-0 md:border-r border-zinc-800">
                <div className="flex items-center gap-4 mb-8 md:mb-12">
                  <FiTarget className="text-[#7D26FF] text-xl md:text-2xl" />
                  <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.3em]">Tareas Personales</h3>
                </div>
                <div className="space-y-2 md:space-y-4">
                  {[
                    { n: "Fundador Zelloh", p: "5", d: "Únete a la comunidad oficial" },
                    { n: "Vincula tu Tarjeta", p: "5", d: "Añade Zelloh a Pay" },
                    { n: "Conector Steam", p: "5", d: "Sincroniza tu inventario" },
                    { n: "Hacker Verificado", p: "10", d: "Completa el KYC nivel 1" },
                  ].map((task, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="p-4 md:p-6 rounded-2xl hover:bg-white/5 transition-colors flex justify-between items-center cursor-pointer group"
                    >
                      <div className="max-w-[70%]">
                        <h4 className="text-base md:text-xl font-black uppercase tracking-tighter group-hover:text-[#E6F379] transition-colors truncate">{task.n}</h4>
                        <p className="text-[8px] md:text-[10px] text-zinc-600 font-bold uppercase">{task.d}</p>
                      </div>
                      <span className="text-xl md:text-2xl font-black tracking-tighter shrink-0">+{task.p}$</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* SOCIAL MISSIONS */}
              <div className="p-6 md:p-16">
                <div className="flex items-center gap-4 mb-8 md:mb-12">
                  <FiUsers className="text-[#E6F379] text-xl md:text-2xl" />
                  <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.3em]">Tareas de Equipo</h3>
                </div>
                <div className="space-y-2 md:space-y-4">
                  {[
                    { n: "Recluta", p: "10", d: "Invita a un amigo activo" },
                    { n: "Impulsor de Equipo", p: "10", d: "Tu referido sube de nivel" },
                    { n: "Vínculo Social", p: "5", d: "Sigue nuestras redes" },
                    { n: "Networker", p: "20", d: "Crea un grupo de 5" },
                  ].map((task, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="p-4 md:p-6 rounded-2xl hover:bg-white/5 transition-colors flex justify-between items-center cursor-pointer group"
                    >
                      <div className="max-w-[70%]">
                        <h4 className="text-base md:text-xl font-black uppercase tracking-tighter group-hover:text-[#7D26FF] transition-colors truncate">{task.n}</h4>
                        <p className="text-[8px] md:text-[10px] text-zinc-600 font-bold uppercase">{task.d}</p>
                      </div>
                      <span className="text-xl md:text-2xl font-black tracking-tighter shrink-0">+{task.p}$</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECCIÓN FINAL DINÁMICA - Texto gigante ajustado */}
      <section className="py-24 md:py-40 relative px-6 text-center">
        <h2 className="text-[20vw] md:text-[10vw] font-black uppercase leading-[0.7] tracking-tighter opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none w-full">
          Preguntas
        </h2>
        <div className="relative z-10">
          <p className="text-zinc-500 font-black uppercase tracking-[0.3em] md:tracking-[0.5em] mb-4 md:mb-6 text-xs md:text-base">¿Aún con dudas?</p>
          <motion.a 
            href="/faqs"
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="inline-flex flex-col md:flex-row items-center gap-2 md:gap-4 text-4xl md:text-8xl font-black uppercase tracking-tighter group"
          >
            <span>Ir a las</span> 
            <div className="flex items-center gap-2 md:gap-4">
              <span className="bg-[#E6F379] text-black px-4 md:px-6 py-1 md:py-2">FAQ</span> 
              <FiArrowUpRight className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </div>
          </motion.a>
        </div>
      </section>

      <Footer />
    </main>
  );
}