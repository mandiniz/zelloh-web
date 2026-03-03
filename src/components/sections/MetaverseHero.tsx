"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  "/assets/metaverse-bank-card.png",
  "/assets/metaverse-bank-nfts.svg",
  "/assets/metaverse-bank-nfts-2.svg",
  "/assets/metaverse-bank-nfts-3.svg",
  "/assets/metaverse-bank-wallet.png",
  "/assets/metaverse-bank-steam.png",
  "/assets/metaverse-bank-card-2.svg",
];

export const MetaverseHero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 pt-40 lg:pt-52 pb-20">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
        <div className="w-full lg:w-1/2">
          <div className="mb-12">
            <h1 className="text-7xl md:text-[100px] font-bold leading-[0.85] tracking-tighter uppercase mb-4">
              El banco del
            </h1>
            <img src="/assets/metaverse.svg" alt="Metaverse" className="h-16 md:h-24 object-contain" />
          </div>
          
          <div className="space-y-10 max-w-xl">
            <p className="text-2xl md:text-3xl text-white leading-tight">
              Consigue una tarjeta <span className="inline-block bg-[#E6F379] h-1.5 w-10 mb-2 mx-1"></span> lista para tus compras & ofertas de botín de juegos. Tus fondos están asegurados por <span className="text-[#E6F379] font-bold">FDIC</span> hasta $250,000.
            </p>
            <button className="bg-[#E6F379] text-black px-14 py-5 rounded-full font-bold text-2xl hover:scale-105 transition-transform active:scale-95">
              Unete a Zelloh
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[500px] flex flex-col items-center">
          <div className="w-full h-[600px] relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full flex items-center justify-center"
              >
                <img src={SLIDES[activeSlide]} alt="Feature" className="w-full h-full object-contain" />
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex gap-3 mt-8">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-2 rounded-full transition-all duration-500 ${activeSlide === i ? "bg-[#E6F379] w-12" : "bg-zinc-800 w-2"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};