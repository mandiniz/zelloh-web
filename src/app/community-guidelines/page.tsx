"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { IoShieldCheckmarkSharp, IoAlertCircle, IoHeart, IoRocket, IoFingerPrint } from "react-icons/io5";

const GUIDELINES_CONTENT = {
  zellers: {
    title: "For Zellers",
    id: "01",
    cool: {
      char: "/chars/yellow-heart-eyes.png",
      text: "Treat every member with radical kindness. Help newbies understand gas fees and share alpha with transparency. A true Zeller builds bridges, not walls."
    },
    notCool: {
      char: "/chars/blue-scared.png",
      text: "Spamming referral links without context, harassing others in DMs, or spreading FUD without evidence. Toxicity is the only thing we don't bridge."
    }
  },
  creators: {
    title: "For Creators",
    id: "02",
    cool: {
      char: "/chars/yellow-shades.png",
      text: "Originality is your superpower. Credit your inspirations, engage with your collectors, and deliver on your roadmap. Your reputation is your biggest asset."
    },
    notCool: {
      char: "/chars/yellow-sleep.png",
      text: "Copyminting, low-effort rug pulls, or fake engagement. If you didn't create it, don't mint it. The blockchain never forgets a bad actor."
    }
  }
};

const GuidelineSection = ({ data }: { data: any }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div ref={ref} className="mb-60 relative">
      <div className="flex items-end gap-6 mb-20">
        <span className="text-[#f4e452] font-black italic text-4xl opacity-50 leading-none">{data.id}</span>
        <motion.h2 className="text-6xl md:text-8xl font-[1000] italic uppercase tracking-tighter leading-none">
          {data.title}
        </motion.h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* COOL CARD */}
        <motion.div 
          style={{ y }}
          className="relative group bg-[#0A0A0A] border border-white/5 rounded-[4rem] p-12 overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-opacity">
            <IoShieldCheckmarkSharp size={200} className="text-emerald-500" />
          </div>
          <img 
            src={data.cool.char} 
            className="w-40 h-40 mb-10 group-hover:scale-110 transition-transform duration-500" 
            alt="Cool"
          />
          <h3 className="text-[#f4e452] text-4xl font-[1000] italic uppercase mb-6 tracking-tighter">Cool with us</h3>
          <p className="text-zinc-400 text-xl font-medium leading-relaxed max-w-md">{data.cool.text}</p>
        </motion.div>

        {/* NOT COOL CARD */}
        <motion.div 
          className="relative group bg-zinc-950/50 border border-red-500/10 rounded-[4rem] p-12 overflow-hidden mt-12 lg:mt-32"
        >
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-opacity">
            <IoAlertCircle size={200} className="text-red-500" />
          </div>
          <img 
            src={data.notCool.char} 
            className="w-40 h-40 mb-10 grayscale group-hover:grayscale-0 transition-all duration-500" 
            alt="Not Cool"
          />
          <h3 className="text-red-500 text-4xl font-[1000] italic uppercase mb-6 tracking-tighter">Not cool</h3>
          <p className="text-zinc-500 text-xl font-medium leading-relaxed max-w-md">{data.notCool.text}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default function CommunityGuidelines() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <main ref={containerRef} className="bg-[#030303] text-white min-h-screen w-full font-sans overflow-x-hidden selection:bg-[#f4e452] selection:text-black">
      {/* Barra de progreso superior */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#f4e452] z-[100] origin-left" style={{ scaleX }} />
      
      <Header />

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#7D26FF]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#f4e452]/5 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] bg-repeat" />
      </div>

      <section className="max-w-7xl mx-auto px-6 pt-56 pb-20 relative z-10">
        
        {/* HERO EXPERIENCIA */}
        <div className="text-center mb-60">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-4 mb-10"
          >
            {[IoHeart, IoRocket, IoFingerPrint].map((Icon, i) => (
              <div key={i} className="p-4 rounded-full bg-white/5 border border-white/10 text-[#f4e452]">
                <Icon size={20} />
              </div>
            ))}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-[12rem] font-[1000] italic uppercase tracking-[ -0.05em] leading-[0.75] mb-12"
          >
            Community <br />
            <span className="text-transparent stroke-text" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>Guidelines</span>
          </motion.h1>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-xs">The Official Protocol for Zellers</p>
        </div>

        {/* BENTO INTRO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-80">
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-[3.5rem] p-16 relative overflow-hidden group">
             <h2 className="text-5xl font-[1000] italic uppercase tracking-tighter mb-8 leading-none">
               What is it <br /><span className="text-[#f4e452]">all about?</span>
             </h2>
             <p className="text-zinc-400 text-2xl font-medium leading-relaxed max-w-lg mb-10">
               Respect is the primary asset of our ecosystem. Treat people well, be cool, and help us scale kindness.
             </p>
             <div className="flex gap-4">
               <div className="h-12 w-12 rounded-full bg-[#f4e452] flex items-center justify-center text-black font-black">!</div>
               <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest self-center">Violations lead to permanent banishment.</p>
             </div>
          </div>
          <div className="lg:col-span-5 bg-[#f4e452] rounded-[3.5rem] p-2 flex items-center justify-center relative overflow-hidden">
            <motion.img 
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 10, repeat: Infinity }}
              src="/astronaut-zelloh.png" 
              alt="Astronaut" 
              className="w-full h-full object-contain p-10 drop-shadow-2xl"
            />
          </div>
        </div>

        {/* SECCIONES DINÁMICAS */}
        <GuidelineSection data={GUIDELINES_CONTENT.zellers} />
        <GuidelineSection data={GUIDELINES_CONTENT.creators} />

        {/* CTA FINAL DE ALTO IMPACTO */}
        <motion.div 
          whileHover={{ scale: 0.98 }}
          className="relative bg-white text-black rounded-[5rem] p-20 md:p-32 text-center overflow-hidden cursor-pointer"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-80 h-80 bg-[#f4e452] rounded-full blur-[100px] opacity-50" 
          />
          <h2 className="text-6xl md:text-9xl font-[1000] italic uppercase tracking-tighter leading-none mb-10 relative z-10">
            Keep it <br /> Clean.
          </h2>
          <p className="text-black/40 font-black uppercase tracking-[0.3em] text-sm mb-12 relative z-10">
            Something wrong? Help the foundation.
          </p>
          <button className="bg-black text-white px-20 py-8 rounded-full font-[1000] italic uppercase text-3xl hover:bg-[#f4e452] hover:text-black transition-all relative z-10">
            Report Incident
          </button>
        </motion.div>

      </section>

      <Footer />

      <style jsx global>{`
        .stroke-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
        }
      `}</style>
    </main>
  );
}