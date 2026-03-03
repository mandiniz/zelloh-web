"use client";
import { motion, Variants } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

// Definimos los variantes con el tipo explícito para evitar el error de TypeScript
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
      ease: [0.16, 1, 0.3, 1] // Esto ahora funcionará sin errores
    } 
  }
};

export default function FounderPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Header />

      {/* HERO SECTION - FOUNDER */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* TEXTO */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
          >
            <h1 className="text-6xl md:text-8xl font-[1000] italic uppercase leading-none tracking-tighter mb-8">
              The Mind <br /> Behind <span className="text-[#E6F379]">Zelloh.</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed max-w-xl mb-10">
              Construyendo la infraestructura financiera para la generación que no cree en los bancos, pero sí en el movimiento.
            </p>
            <div className="flex gap-6">
              <a href="https://linkedin.com" target="_blank" className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center text-2xl hover:bg-[#E6F379] hover:text-black transition-all">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com" target="_blank" className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center text-2xl hover:bg-[#E6F379] hover:text-black transition-all">
                <FaTwitter />
              </a>
              <a href="mailto:founder@zelloh.com" className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center text-2xl hover:bg-[#E6F379] hover:text-black transition-all">
                <FaEnvelope />
              </a>
            </div>
          </motion.div>

          {/* IMAGEN FOUNDER */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-zinc-900 rounded-[4rem] overflow-hidden border border-white/10 relative z-10">
              {/* Aquí puedes poner un <Image /> de Next.js */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-10 left-10">
                <p className="text-3xl font-black italic uppercase">Richie Rich</p>
                <p className="text-[#E6F379] font-bold uppercase tracking-widest text-sm">Founder & CEO</p>
              </div>
            </div>
            {/* Luces de fondo decorativas */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#7D26FF] rounded-full blur-[120px] opacity-20" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#E6F379] rounded-full blur-[120px] opacity-10" />
          </motion.div>
        </div>
      </section>

      {/* MANIFIESTO SECTION */}
      <section className="py-32 bg-zinc-950 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={reveal}
          >
            <h2 className="text-[#E6F379] font-black uppercase tracking-[0.3em] text-[10px] mb-12">Nuestra Visión</h2>
            <p className="text-3xl md:text-5xl font-bold leading-tight italic uppercase">
              "Zelloh no nació para ser un banco más. Nació porque el sistema actual es lento y no entiende cómo vive nuestra generación."
            </p>
            <div className="w-20 h-1 bg-[#E6F379] mx-auto mt-12 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* VALORES */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Propósito", title: "Libertad Real", desc: "Sin letras pequeñas, sin comisiones ocultas." },
            { label: "Tecnología", title: "AI-Driven", desc: "Control total a través de voz y mensajería." },
            { label: "Comunidad", title: "Movement", desc: "Más que usuarios, somos una red global." }
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

      <Footer />
    </main>
  );
}