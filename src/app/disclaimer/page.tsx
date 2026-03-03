"use client";
import { motion, Variants } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function DisclaimerPage() {
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
    <main className="bg-black text-white min-h-screen w-full font-sans flex flex-col">
      <Header />

      {/* Contenido Principal */}
      <section className="flex-1 max-w-7xl mx-auto px-6 pt-56 pb-32">
        <motion.div 
          className="flex flex-col items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          {/* TÍTULO ESTILO ZELLOH */}
          <div className="mb-24 text-center">
            <h1 className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] font-black leading-[0.9] tracking-tighter uppercase">
              <motion.span variants={lineVariants} className="block">
                Legal
              </motion.span>
              <motion.span variants={lineVariants} className="block text-zinc-600">
                Disclaimer
              </motion.span>
            </h1>
          </div>

          {/* CAJA DE TEXTO LEGAL ENFOCADA */}
          <motion.div 
            variants={lineVariants}
            className="max-w-4xl mx-auto bg-[#1A1A1A]/40 border border-zinc-800 p-8 md:p-16 rounded-[3rem] backdrop-blur-sm shadow-2xl"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-sm md:text-base text-zinc-400 leading-[1.8] text-justify font-medium">
                We do not guarantee, represent or warrant that your use of our Service will be uninterrupted, 
                timely, secure, or error-free. We do not warrant that the results that may be obtained 
                from the use of the Service will be accurate or reliable. You agree that from time to 
                time, we may remove the Service for indefinite periods of time or cancel the Service at 
                any time, without notice to you. 
                <br /><br />
                You expressly agree that your use or inability to use 
                the Service is at your sole risk. The Service and all products and services delivered 
                to you through the website are (except as expressly stated by us) provided 
                <span className="text-white italic"> &apos;as is&apos; </span> and 
                <span className="text-white italic"> &apos;as available&apos; </span> for your use, without any representation, warranties, or conditions of 
                any kind, either express or implied, including all implied warranties or conditions of 
                merchantability, merchantable quality, fitness for a particular purpose, durability, 
                title, and non-infringement. 
                <br /><br />
                In no case shall <span className="text-[#E6F379]">Zelloh</span>, our directors, officers, employees, 
                affiliates, agents, contractors, interns, suppliers, service providers, or licensors 
                be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, 
                special, or consequential damages of any kind, including, without limitation lost profits, 
                lost revenue, lost savings, loss of data, replacement costs, or any similar damages, 
                whether based in contract, tort (including negligence), strict liability or otherwise, 
                arising from your use of any of the Service or any products procured using the Service.
                <br /><br />
                Because some jurisdictions do not allow the exclusion 
                or the limitation of liability for consequential or incidental damages, in such 
                jurisdictions, our liability shall be limited to the maximum extent permitted by law.
              </p>
            </div>
          </motion.div>

          {/* BOTÓN DE RETORNO O CONTACTO */}
          <motion.div variants={lineVariants} className="mt-16">
            <a 
              href="mailto:legal@zelloh.com" 
              className="text-[#E6F379] font-black text-xs uppercase tracking-[0.3em] border-b-2 border-[#E6F379] pb-1 hover:opacity-70 transition-opacity"
            >
              Contact Legal Dept
            </a>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}