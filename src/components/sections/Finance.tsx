"use client";
import React, { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { FiX, FiArrowRight } from "react-icons/fi";

// Definimos la interfaz para los artículos
interface Article {
  title: string;
  desc: string;
  emoji: string;
  tag: string;
  content: string; // Texto detallado para el modal
}

const ARTICLES: Article[] = [
  {
    title: "Tus compras online, mas seguras que nunca",
    desc: "Nuestra nueva actualización: ahora el CVV de tu ZELLOH Card es dinámico y ultra seguro.",
    emoji: "🔒",
    tag: "SEGURIDAD",
    content: "Hemos implementado la tecnología de CVV Dinámico. Esto significa que el código de seguridad de tu tarjeta cambia cada 5 minutos desde la app, haciendo que sea prácticamente imposible que clonen tu tarjeta en compras online. La seguridad no es una opción, es nuestro estándar."
  },
  {
    title: "Que nadie te de-FRAUDE",
    desc: "LifeHacks esenciales que te ayudarán a prevenir cualquier tipo de fraude en tus cuentas.",
    emoji: "🛡️",
    tag: "PREVENCIÓN",
    content: "El phishing es cada vez más sofisticado. En este artículo detallamos cómo identificar correos falsos, por qué Zelloh nunca te pedirá tu clave por SMS y cómo configurar la autenticación de dos factores (2FA) para que tu cuenta sea un búnker impenetrable."
  },
  {
    title: "Zelloh Bank: El futuro",
    desc: "¿Sabias que al recibir tu Zelloh Card te conviertes oficialmente en un Lifehacker?",
    emoji: "🎮",
    tag: "GEN Z BANK",
    content: "Estamos integrando Zelloh con los principales metaversos. Pronto podrás usar tu Zelloh Card para adquirir activos digitales, skins y parcelas con liquidación instantánea en el mundo real. Tu avatar merece la mejor economía, y nosotros la estamos construyendo."
  }
];

export const Finance = () => {
  const [selectedArticle, setSelectedArticle] = useState<null | Article>(null);

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative bg-black text-white py-32 px-6 md:px-16 overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* CABECERA CENTRADA */}
        <motion.div 
          className="mb-24 text-center flex flex-col items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          <div className="space-y-1">
            <motion.h2 className="text-[32px] sm:text-[45px] md:text-[52px] lg:text-[62px] font-black text-white leading-[1.1] tracking-tighter uppercase">
              <motion.span variants={lineVariants} className="block whitespace-nowrap">
                Zelloh Finance <span className="text-[#E6F379]">💰</span>
              </motion.span>
              <motion.span variants={lineVariants} className="block text-zinc-600 whitespace-nowrap">
                Nuestra presencia_
              </motion.span>
            </motion.h2>
          </div>
        </motion.div>

        {/* GRID DE ARTÍCULOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((art, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -12 }}
              onClick={() => setSelectedArticle(art)}
              className="bg-[#1A1A1A] rounded-[2.5rem] overflow-hidden flex flex-col h-full border border-zinc-800 group cursor-pointer"
            >
              <div className="bg-[#E6F379] h-56 flex items-center justify-center p-8 relative overflow-hidden">
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-7xl z-10"
                >
                  {art.emoji}
                </motion.div>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:10px_10px]" />
              </div>

              <div className="p-8 flex flex-col flex-1">
                <span className="text-[#E6F379] text-[10px] font-black tracking-[0.2em] mb-3 uppercase">
                  {art.tag}
                </span>
                <h3 className="text-xl md:text-2xl font-black leading-tight mb-4 text-white uppercase tracking-tighter">
                  {art.title}
                </h3>
                <p className="text-zinc-500 font-bold text-sm leading-relaxed mb-8 flex-1">
                  {art.desc}
                </p>
                <button className="text-white font-black text-sm uppercase tracking-widest border-b-2 border-[#E6F379] self-start pb-1 group-hover:text-[#E6F379] transition-colors">
                  Leer artículo
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PAGINACIÓN */}
        <div className="flex justify-center gap-3 mt-16">
          <div className="w-8 h-1.5 rounded-full bg-[#E6F379]" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
        </div>
      </div>

      {/* MODAL DEL ARTÍCULO */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#111] border border-zinc-800 rounded-[3rem] max-w-2xl w-full relative overflow-hidden shadow-[0_0_50px_rgba(230,243,121,0.1)]"
            >
              {/* CERRAR */}
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-8 right-8 text-zinc-500 hover:text-white z-20"
              >
                <FiX size={28} />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                {/* Lateral con Emoji */}
                <div className="bg-[#E6F379] w-full md:w-1/3 p-12 flex items-center justify-center text-8xl">
                  {selectedArticle.emoji}
                </div>

                {/* Contenido del Modal */}
                <div className="p-10 md:p-12 flex-1">
                  <span className="text-[#E6F379] text-[10px] font-black tracking-[0.3em] uppercase mb-4 block">
                    {selectedArticle.tag} // NEWSFEED
                  </span>
                  <h3 className="text-3xl font-black uppercase italic italic-mask leading-none mb-6">
                    {selectedArticle.title}
                  </h3>
                  <p className="text-zinc-400 font-bold leading-relaxed mb-10">
                    {selectedArticle.content}
                  </p>
                  
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="flex items-center gap-3 text-black bg-[#E6F379] px-8 py-4 rounded-2xl font-black uppercase italic text-sm hover:scale-[1.02] transition-transform"
                  >
                    Ir a la noticia <FiArrowRight />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .italic-mask {
          background: linear-gradient(180deg, #fff 0%, #666 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  );
};