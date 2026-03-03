"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link"; // Importante para la redirección
import { 
  FiCode, FiCpu, FiGlobe, FiLock, 
  FiCopy, FiCheck, FiTerminal, FiLayers, FiBookOpen, FiArrowRight 
} from "react-icons/fi";

// --- COMPONENTE DE BLOQUE DE CÓDIGO INTERACTIVO ---
const CodeBlock = ({ code, language }: { code: string, language: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group bg-[#0D0D0D] border border-white/10 rounded-2xl overflow-hidden font-mono text-sm shadow-2xl">
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/5">
        <span className="text-zinc-500 uppercase tracking-widest text-[10px] font-black">{language}</span>
        <button onClick={copyToClipboard} className="text-zinc-400 hover:text-[#f4e452] transition-colors">
          {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
        </button>
      </div>
      <pre className="p-6 overflow-x-auto text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default function ZellohApiPage() {
  const sampleCode = `
curl -X POST https://api.zelloh.com/v1/payments \\
  -H "Authorization: Bearer ZELLOH_SECRET_KEY" \\
  -d amount=100 \\
  -d currency="eur" \\
  -d recipient="@username"
  `;

  return (
    <main className="bg-[#050505] text-white min-h-screen w-full font-sans selection:bg-[#f4e452] selection:text-black">
      <Header />

      <section className="max-w-7xl mx-auto px-6 pt-48 pb-32 relative">
        {/* Background Tech Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
        
        {/* HERO SECTION */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-60">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-8">
              <FiTerminal /> API Version 2.4.0
            </div>
            <h1 className="text-6xl md:text-8xl font-[1000] italic uppercase tracking-tighter leading-none mb-8">
              Construye el futuro<br />
              <span className="text-[#f4e452]"> Financiero</span>
            </h1>
            <p className="text-zinc-400 text-xl font-medium leading-relaxed max-w-lg mb-10">
              Integra la infraestructura bancaria de Zelloh en tus apps. Rápido, seguro y pensado para la próxima generación de creadores.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-black px-8 py-4 rounded-xl font-[1000] italic uppercase tracking-tighter text-lg hover:bg-[#f4e452] transition-colors shadow-lg">
                Obtener mis claves API
              </button>
              
              {/* REDIRECCIÓN A /api/doc */}
              <Link href="/api/doc">
                <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-[1000] italic uppercase tracking-tighter text-lg hover:bg-white/10 transition-all flex items-center gap-3 group">
                  <FiBookOpen className="group-hover:text-[#f4e452] transition-colors" />
                  Documentación
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full opacity-50" />
            <CodeBlock code={sampleCode} language="bash / terminal" />
          </motion.div>
        </div>

        {/* PROMPT DE REDIRECCIÓN FLOTANTE (NUEVO) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-60 bg-gradient-to-r from-[#f4e452]/20 to-transparent border-l-4 border-[#f4e452] p-10 rounded-r-3xl flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <h3 className="text-3xl font-[1000] italic uppercase tracking-tighter mb-2">¿Buscas los Endpoints?</h3>
            <p className="text-zinc-400 font-medium tracking-tight">Explora nuestra referencia técnica completa de la API, desde Webhooks hasta Web3 Rails.</p>
          </div>
          <Link href="/api/doc">
            <button className="whitespace-nowrap bg-[#f4e452] text-black px-8 py-4 rounded-full font-[1000] italic uppercase tracking-tighter flex items-center gap-2 hover:scale-105 transition-transform">
              Ir a Docs <FiArrowRight />
            </button>
          </Link>
        </motion.div>

        {/* STATS BENTO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-60">
          {[
            { icon: <FiCpu />, title: "99.9% Uptime", desc: "Infraestructura de nivel empresarial" },
            { icon: <FiGlobe />, title: "Global Rails", desc: "Envía dinero a más de 150 países" },
            { icon: <FiLock />, title: "E2E Encryption", desc: "Protección de datos de nivel militar" }
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] group hover:border-[#f4e452]/30 transition-all">
              <div className="text-[#f4e452] text-3xl mb-6">{stat.icon}</div>
              <h3 className="text-2xl font-[1000] italic uppercase mb-2 tracking-tight">{stat.title}</h3>
              <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* INTEGRATION HIGHLIGHT */}
        <div className="mb-60">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-[1000] italic uppercase tracking-tighter">
              Un motor. <br /><span className="text-zinc-700">POSIBILIDADES infinitas.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-zinc-900 to-black p-12 rounded-[3.5rem] border border-white/5">
              <FiCode className="text-4xl text-blue-500 mb-8" />
              <h3 className="text-4xl font-[1000] italic uppercase mb-6 tracking-tight">Pagos API</h3>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Realiza transferencias internaciones y pagos instantáneos de Zelloh a Zelloh con solo un comando.
              </p>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-zinc-500">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Webhooks para alertas en tiempo real</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Conversión automática: de criptomonedas a moneda fiduciaria</li>
              </ul>
              <Link href="/api/doc#payments" className="inline-block mt-8 text-[#f4e452] font-black uppercase text-xs tracking-widest hover:underline">Ver referencia técnica →</Link>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-black p-12 rounded-[3.5rem] border border-white/5">
              <FiLayers className="text-4xl text-[#f4e452] mb-8" />
              <h3 className="text-4xl font-[1000] italic uppercase mb-6 tracking-tight">Motor de acuñación de Activos</h3>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Escala tu dinero. Crea, transfiere y verifica tus activos programáticamente en múltiples cadenas.
              </p>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-zinc-500">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#f4e452] rounded-full" /> Contratos optimizados para gas</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#f4e452] rounded-full" /> Soporte multicadena (Eth, Poly, Sol)</li>
              </ul>
              <Link href="/api/doc#assets" className="inline-block mt-8 text-[#f4e452] font-black uppercase text-xs tracking-widest hover:underline">Ver referencia técnica →</Link>
            </div>
          </div>
        </div>

        {/* DEVELOPER CTA */}
        <div className="relative bg-[#f4e452] rounded-[4rem] p-16 md:p-24 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative z-10"
          >
            <h2 className="text-black text-6xl md:text-8xl font-[1000] italic uppercase tracking-[ -0.05em] mb-10 leading-none">
              Listo para <br /> unirte?
            </h2>
            <p className="text-black/60 font-black uppercase tracking-[0.4em] text-xs mb-12">
              Unete a mas de 5,000+ programadores desarrolando en el protocolo de Zelloh.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="bg-black text-white px-12 py-6 rounded-2xl font-[1000] italic uppercase text-2xl shadow-2xl transition-transform hover:-translate-y-1">
                Crear una cuenta
              </button>
              <Link href="/api/doc">
                <button className="bg-white/20 backdrop-blur-md border border-black/10 text-black px-12 py-6 rounded-2xl font-[1000] italic uppercase text-2xl transition-transform hover:-translate-y-1">
                  Leer Documentación
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}