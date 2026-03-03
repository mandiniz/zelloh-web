"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  FiShield, FiEye, FiCheckCircle, FiActivity, 
  FiLock, FiKey, FiExternalLink, FiBarChart2 
} from "react-icons/fi";

const ReserveStat = ({ label, value, subValue }: { label: string, value: string, subValue: string }) => (
  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-24 h-24 bg-[#f4e452]/5 blur-3xl group-hover:bg-[#f4e452]/20 transition-all" />
    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-4">{label}</p>
    <h3 className="text-4xl md:text-5xl font-[1000] italic text-white tracking-tighter mb-2">{value}</h3>
    <p className="text-[#f4e452] text-xs font-bold uppercase tracking-widest">{subValue}</p>
  </div>
);

export default function TransparencyPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen w-full font-sans selection:bg-[#f4e452] selection:text-black">
      <Header />

      <section className="max-w-7xl mx-auto px-6 pt-48 pb-40 relative">
        {/* Radar Scanning Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
          <div className="absolute top-60 left-1/2 -translate-x-1/2 w-[400px] h-[400px] border border-white/10 rounded-full animate-pulse" />
        </div>

        {/* HERO: STATUS CENTER */}
        <div className="text-center mb-40 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em] mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Live System Audit: Normal
          </motion.div>
          <h1 className="text-7xl md:text-[10rem] font-[1000] italic uppercase tracking-tighter leading-[0.8] mb-12">
            PROOF OF <br />
            <span className="text-[#f4e452]">RESERVES</span>
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto font-bold uppercase tracking-[0.3em] text-[10px] leading-loose">
            En Zelloh, creemos en la certeza por encima de la confianza humana. <br />
            Nuestras reservas son auditadas en tiempo real en la cadenal.
          </p>
        </div>

        {/* REAL-TIME STATS BENTO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-40">
          <ReserveStat label="Activos totales bajo custodia" value="$4.28B" subValue="+12,4% vs el mes pasado" />
          <ReserveStat label="Ratio de reserva" value="1:1.08" subValue="Totalmente garantizado" />
          <ReserveStat label="Liquidez en cadena" value="$1.12B" subValue="Disponible 24/7" />
        </div>

        {/* THE TRUST PROTOCOL */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-60">
          <div>
            <h2 className="text-5xl md:text-7xl font-[1000] italic uppercase tracking-tighter leading-none mb-10">
              The Zelloh <br /><span className="text-zinc-800 text-transparent" style={{ WebkitTextStroke: "1px #333" }}>Trust Protocol</span>
            </h2>
            <div className="space-y-12">
              {[
                { icon: <FiCheckCircle />, title: "Real-Time Attestation", desc: "Nuestras pruebas de árbol de Merkle permiten a cualquier usuario verificar criptográficamente que el saldo de su cuenta esté incluido en las reservas." },
                { icon: <FiLock />, title: "Segregated Accounts", desc: "Los fondos de los usuarios nunca se mezclan con los fondos operativos corporativos. Su dinero sigue siendo suyo.." },
                { icon: <FiActivity />, title: "24/7 Monitoring", desc: "ALos sistemas automatizados activan alertas si alguna tasa de reserva cae por debajo del 105 %." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="text-[#f4e452] text-3xl mt-1 group-hover:scale-125 transition-transform">{item.icon}</div>
                  <div>
                    <h4 className="text-xl font-black uppercase italic mb-2">{item.title}</h4>
                    <p className="text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-zinc-900/50 border border-white/10 rounded-[4rem] p-12 md:p-16 relative overflow-hidden">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-2xl font-[1000] italic uppercase">Distribución de activos</h3>
              <FiBarChart2 className="text-[#f4e452]" size={24} />
            </div>
            
            <div className="space-y-8">
              {[
                { asset: "BTC", percent: 45, color: "bg-orange-500" },
                { asset: "USDC / EUR", percent: 35, color: "bg-blue-500" },
                { asset: "ETH", percent: 15, color: "bg-purple-500" },
                { asset: "Other", percent: 5, color: "bg-zinc-500" }
              ].map((bar, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span>{bar.asset}</span>
                    <span>{bar.percent}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      whileInView={{ width: `${bar.percent}%` }}
                      className={`h-full ${bar.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 p-6 bg-black/40 border border-white/5 rounded-3xl">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 italic">Último hash de auditoría:</p>
              <code className="text-[10px] text-emerald-500 break-all font-mono">0x742d35Cc6634C0532925a3b844Bc454e4438f44e...</code>
            </div>
          </div>
        </div>

        {/* VERIFICATION CENTER */}
        <div className="bg-[#f4e452] rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />
          <div className="relative z-10">
            <FiEye className="text-black text-6xl mx-auto mb-10 animate-pulse" />
            <h2 className="text-black text-6xl md:text-8xl font-[1000] italic uppercase tracking-tighter mb-8 leading-none">
              No confíes. <br />Verifica.
            </h2>
            <p className="text-black/60 font-black uppercase tracking-[0.4em] text-xs mb-12 max-w-xl mx-auto">
              Download our latest quarterly audit report or verify our hot/cold wallets directly on Etherscan.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="bg-black text-white px-12 py-6 rounded-2xl font-[1000] italic uppercase text-xl flex items-center gap-3">
                Descarga nuestro reporte PDF<FiExternalLink />
              </button>
              <button className="bg-transparent border-2 border-black text-black px-12 py-6 rounded-2xl font-[1000] italic uppercase text-xl">
                Ver Billetera
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}