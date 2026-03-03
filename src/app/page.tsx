"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { MessengerPreview } from "@/components/sections/MessengerPreview";
import { ZellohCard } from "@/components/sections/ZellohCard";
import { VoiceControl } from "@/components/sections/VoiceControl";
import { WebPayments } from "@/components/sections/WebPayments";
import { BankTransfer } from "@/components/sections/BankTransfer";
import { Hacks } from "@/components/sections/Hacks";
import { Finance } from "@/components/sections/Finance";
import { Press } from "@/components/sections/Press";
import { Referrals } from "@/components/sections/Referrals";
import { Community } from "@/components/sections/Community";
import { JoinModal } from "@/components/sections/JoinModal";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const viewportConfig = { once: false, amount: 0.1 };

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Función para abrir el modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Escuchar el evento personalizado del Header
  useEffect(() => {
    const handleHeaderOpenModal = () => {
      handleOpenModal();
    };

    window.addEventListener('openJoinModal', handleHeaderOpenModal);
    
    return () => {
      window.removeEventListener('openJoinModal', handleHeaderOpenModal);
    };
  }, []); // Sin dependencias porque handleOpenModal es estable

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Evita el renderizado del lado del servidor que causa el "negro" inicial
  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="bg-black text-white min-h-screen w-full relative overflow-x-hidden">
      <Header />

      {/* Contenedor del Hero con padding superior para el Header Fixed */}
      <div className="relative pt-[80px] md:pt-[100px]">
        <Hero onOpenModal={handleOpenModal} />
      </div>

      <div className="relative z-10">
        <motion.div variants={revealVariants} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <MessengerPreview />
        </motion.div>

        <motion.div variants={revealVariants} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <ZellohCard />
        </motion.div>

        <motion.div variants={revealVariants} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <VoiceControl />
        </motion.div>

        <motion.div variants={revealVariants} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <WebPayments />
        </motion.div>

        <motion.div variants={revealVariants} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <BankTransfer />
        </motion.div>

        <motion.div variants={revealVariants} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <Hacks />
        </motion.div>

        <motion.div variants={revealVariants} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <Finance />
        </motion.div>

        <motion.div variants={revealVariants} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <Press />
        </motion.div>

        <motion.div variants={revealVariants} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <Referrals onOpenModal={handleOpenModal} />
        </motion.div>

        <motion.div variants={revealVariants} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <Community />
        </motion.div>
      </div>

      <Footer />
      
      <JoinModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </main>
  );
}