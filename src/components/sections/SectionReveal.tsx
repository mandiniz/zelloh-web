"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export const SectionReveal = ({ children }: { children: ReactNode }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }} // Empieza abajo y transparente
      whileInView={{ opacity: 1, y: 0 }} // Sube y se vuelve opaco al verlo
      viewport={{ once: false, amount: 0.2 }} // Se activa cuando el 20% es visible
      transition={{ duration: 0.8, ease: "easeOut" }} // Movimiento suave
    >
      {children}
    </motion.section>
  );
};