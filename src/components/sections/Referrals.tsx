"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface ReferralsProps {
  onOpenModal?: () => void;
}

const Step = ({ num, text }: { num: string, text: string }) => (
  <div className="flex items-center gap-6">
    <div className="w-12 h-12 bg-[#7D26FF] rounded-full flex items-center justify-center text-white font-black text-xl shrink-0 shadow-lg">
      {num}
    </div>
    <p className="text-2xl font-bold text-zinc-800 leading-tight">{text}</p>
  </div>
);

const STACK_CARDS = [
  {
    id: "card-1",
    bgColor: "bg-[#E6F379]",
    title: "Invita a amigos 🦊",
    subtitle: "Y consigue $5,00 por cada persona que se una gracias a ti",
    extra: "Si tus amigos invitan a sus amigos a Zelloh, cada uno te dará a ti $ 3,00. ¡Genial!"
  },
  {
    id: "card-2",
    bgColor: "bg-white",
    title: "Tres sencillos pasos 🤘",
    subtitle: "es todo lo que necesitas",
    isSteps: true
  },
  {
    id: "card-3",
    bgColor: "bg-[#7D26FF]",
    title: "Mmm ¿Dinero gratis? 💸",
    subtitle: "Impulsa tu Zelloh con los bonus",
    isButton: true
  },
  {
    id: "card-4",
    bgColor: "bg-[#F3E679]",
    title: "Tarjeta de debito 💳",
    subtitle: "Cuenta de corriente, de ahorro, o de empresa, pronto tambien como wallet.",
  }
];

export const Referrals = ({ onOpenModal }: ReferralsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Opening modal from Referrals");
    
    if (onOpenModal && typeof onOpenModal === 'function') {
      onOpenModal();
    } else {
      console.warn("onOpenModal no fue proporcionada, usando estado local");
      setIsModalOpen(true);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    handleOpenModal(e);
  };

  return (
    <section className="bg-black relative pt-20">
      <div className="max-w-7xl mx-auto px-6 relative">
        {STACK_CARDS.map((card, index) => {
          const isLast = index === STACK_CARDS.length - 1;
          
          return (
            <div 
              key={card.id}
              className={`${isLast ? "h-auto" : "h-screen"} sticky top-0 flex items-start justify-center`}
              style={{ 
                top: `${80 + index * 60}px`, 
                zIndex: STACK_CARDS.length - index,
                marginBottom: isLast ? "0px" : "-10vh" 
              }}
            >
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`${card.bgColor} w-full rounded-[3.5rem] p-12 md:p-24 min-h-[70vh] flex flex-col justify-center shadow-[0_-30px_60px_rgba(0,0,0,0.5)] border border-black/10`}
              >
                <div id={card.id} className="max-w-4xl text-left">
                  <h2 className={`text-5xl md:text-7xl font-black leading-tight mb-8 ${card.bgColor === 'bg-[#7D26FF]' ? 'text-white' : 'text-black'}`}>
                    {card.title}
                  </h2>
                  <p className={`text-3xl md:text-5xl font-bold mb-8 ${card.bgColor === 'bg-[#7D26FF]' ? 'text-[#E6F379]' : 'text-zinc-500/60'}`}>
                    {card.subtitle}
                  </p>
                  
                  {card.extra && (
                    <div className="flex items-center gap-3 text-2xl font-bold text-black italic">
                      <span>😎</span>
                      <p>{card.extra}</p>
                    </div>
                  )}

                  {card.isSteps && (
                    <div className="space-y-8 mt-4">
                      <Step num="1" text="Unete a Zelloh" />
                      <Step num="2" text="Consigue el enlace único" />
                      <Step num="3" text="Comparte y gana" />
                    </div>
                  )}

                  {card.isButton && (
                    <button 
                      onClick={handleButtonClick}
                      className="bg-white text-black px-12 py-5 rounded-full font-black text-xl shadow-xl mt-6 cursor-pointer hover:scale-105 active:scale-95 transition-transform relative z-[9999]"
                    >
                      Únete a ZELLOH
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ESTA LÍNEA ES LA QUE SOLUCIONA TU ERROR:
export default Referrals;