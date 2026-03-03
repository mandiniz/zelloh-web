"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RiTwitterXFill, RiMoneyDollarCircleLine, RiShieldCheckFill, RiFlashlightFill, RiSendPlaneFill, RiGlobalLine, RiShieldUserLine } from "react-icons/ri";
import { FiArrowRight, FiLock, FiZap, FiUsers, FiGlobe, FiChevronRight, FiCheckCircle, FiActivity } from "react-icons/fi";
import { IoSparkles, IoRocket } from "react-icons/io5";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { SiFramer } from "react-icons/si";

export default function TwitterSignupUltraPro() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // SOLO ejecutar en cliente
  useEffect(() => {
    setIsMounted(true);
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Progress bar animada
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Efectos parallax avanzados (solo si está montado)
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.8, 0.6, 0.4]);

  // Mouse tracking con useMotionValue
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (!isMounted) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMounted, mouseX, mouseY]);

  // Steps con autoplay
  useEffect(() => {
    if (!isMounted) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMounted]);

  // Características dinámicas
  const features = [
    {
      icon: RiSendPlaneFill,
      title: "Pagos Instantáneos",
      description: "Envía dinero con un simple @mencion o DM",
      gradient: "from-[#1D9BF0] to-cyan-400",
      stat: "0.5s",
      statLabel: "Tiempo promedio"
    },
    {
      icon: RiShieldUserLine,
      title: "Seguridad Biométrica",
      description: "Verificación facial y huella dactilar",
      gradient: "from-[#E6F379] to-emerald-400",
      stat: "256-bit",
      statLabel: "Encriptación"
    },
    {
      icon: RiGlobalLine,
      title: "Cobertura Global",
      description: "Disponible en 150+ países al instante",
      gradient: "from-purple-500 to-pink-500",
      stat: "150+",
      statLabel: "Países"
    },
    {
      icon: IoRocket,
      title: "Tecnología Web3",
      description: "Integración nativa con blockchain",
      gradient: "from-orange-500 to-red-500",
      stat: "Web3",
      statLabel: "Ready"
    }
  ];

  // Steps del proceso
  const processSteps = [
    {
      number: "01",
      title: "Conecta tu cuenta",
      description: "Vincula Zelloh con X en segundos",
      icon: <RiTwitterXFill />,
      color: "text-[#1D9BF0]"
    },
    {
      number: "02",
      title: "Menciona y envía",
      description: "@usuario + cantidad en cualquier tweet",
      icon: <RiMoneyDollarCircleLine />,
      color: "text-[#E6F379]"
    },
    {
      number: "03",
      title: "Confirma con biometría",
      description: "Verificación rápida y segura",
      icon: <RiShieldCheckFill />,
      color: "text-emerald-400"
    },
    {
      number: "04",
      title: "Dinero recibido",
      description: "Transferencia completada al instante",
      icon: <IoSparkles />,
      color: "text-purple-400"
    }
  ];

  // Estadísticas en tiempo real
  const stats = [
    { value: "2.5M+", label: "Transacciones diarias", change: "+25%" },
    { value: "150+", label: "Países activos", change: "+10" },
    { value: "99.9%", label: "Tiempo activo", change: "▲ 0.1%" },
    { value: "<1s", label: "Transferencia promedio", change: "-0.2s" }
  ];

  // Transformaciones condicionales
  const spotlightX = isMounted ? useTransform(mouseX, [0, windowSize.width], ["0%", "100%"]) : useMotionValue("0%");
  const spotlightY = isMounted ? useTransform(mouseY, [0, windowSize.height], ["0%", "100%"]) : useMotionValue("0%");

  // Renderizado condicional inicial
  if (!isMounted) {
    return (
      <main className="bg-[#0A0A0A] text-white min-h-screen font-sans">
        <Header />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#E6F379] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-500 text-sm">Loading experience...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main ref={containerRef} className="relative bg-[#0A0A0A] text-white min-h-screen font-sans overflow-hidden">
      {/* Spotlight que sigue el mouse */}
      <motion.div
        style={{
          background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 155, 240, 0.08), transparent 80%)`,
        }}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Progress bar superior */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1D9BF0] via-[#E6F379] to-[#1D9BF0] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Grid interactivo de fondo */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(29, 155, 240, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(29, 155, 240, 0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          backgroundPosition: 'center center',
        }} />
      </div>

      {/* Partículas 3D */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-[#1D9BF0] to-[#E6F379]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <Header />

      {/* --- SECCIÓN HERO --- */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-7xl mx-auto w-full relative">
          {/* Anillo orbital */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1D9BF0] rounded-full" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#E6F379] rounded-full" />
          </motion.div>

          {/* Contenido principal */}
          <div className="relative z-10 text-center">
            {/* Badge animado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 mb-12"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-[#E6F379] rounded-full"
              />
              <span className="text-sm font-bold uppercase tracking-widest text-[#E6F379]">
                Lanzamiento Exclusivo
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="w-2 h-2 bg-[#E6F379] rounded-full"
              />
            </motion.div>

            {/* Título principal con efecto de gradiente animado */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black leading-[0.9] mb-8">
                <span className="block text-white">Banca Social</span>
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="block bg-gradient-to-r from-[#1D9BF0] via-[#E6F379] to-[#1D9BF0] bg-clip-text text-transparent bg-[length:200%_auto]"
                >
                  en Tiempo Real
                </motion.span>
              </h1>

              <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-16 leading-relaxed">
                La primera integración bancaria nativa en X. Transfiere dinero, recibe pagos y gestiona 
                tus finanzas directamente desde Twitter. Revolucionando los pagos sociales.
              </p>
            </motion.div>

            {/* CTA Principal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative inline-block"
            >
              {/* Efecto de pulso */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-4 bg-gradient-to-r from-[#1D9BF0] to-[#E6F379] rounded-full blur-xl opacity-30"
              />

              <button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative group"
              >
                <div className="relative flex items-center bg-gradient-to-r from-black to-black rounded-full overflow-hidden border-2 border-transparent bg-clip-padding before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#1D9BF0] before:to-[#E6F379] before:rounded-full before:-z-10 before:p-[2px]">
                  {/* Lado izquierdo - Icono X */}
                  <div className="pl-10 pr-8 py-6 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: isHovered ? [0, 15, -15, 0] : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <RiTwitterXFill size={36} className="text-white" />
                    </motion.div>
                  </div>
                  
                  {/* Separador animado */}
                  <motion.div
                    animate={{ height: isHovered ? "60%" : "40%" }}
                    className="w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"
                  />
                  
                  {/* Lado derecho - Texto */}
                  <div className="pl-10 pr-14 py-6">
                    <div className="flex items-center gap-6">
                      <div className="text-left">
                        <div className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                          Conectar ahora
                        </div>
                        <div className="text-2xl font-black">Sign in with X</div>
                      </div>
                      <motion.div
                        animate={{ x: isHovered ? 10 : 0 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <FiArrowRight size={24} />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Efecto de brillo interno */}
                <motion.div
                  animate={{ 
                    x: isHovered ? "100%" : "-100%",
                  }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
                />
              </button>

              {/* Etiqueta de seguridad */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 flex items-center justify-center gap-3 text-sm text-zinc-500"
              >
                <FiLock size={14} />
                <span>End-to-end encryption • 256-bit security • GDPR compliant</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-bold tracking-widest text-zinc-600">EXPLORAR</span>
              <div className="w-px h-12 bg-gradient-to-b from-[#1D9BF0] via-[#E6F379] to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECCIÓN ESTADÍSTICAS EN TIEMPO REAL --- */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="text-4xl font-black mb-2">
                  {stat.value}
                  <span className="text-sm font-bold text-emerald-400 ml-2">
                    {stat.change}
                  </span>
                </div>
                <div className="text-sm text-zinc-400">{stat.label}</div>
                <div className="mt-4 h-1 bg-gradient-to-r from-[#1D9BF0] to-[#E6F379] rounded-full w-full group-hover:w-3/4 transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- SECCIÓN CARACTERÍSTICAS --- */}
      <section className="py-32 px-6 relative">
        {/* Fondo de sección */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1D9BF0]/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative">
          {/* Encabezado */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl px-6 py-3 rounded-full mb-8">
              <IoSparkles className="text-[#E6F379]" />
              <span className="font-bold text-sm uppercase tracking-widest">
                Tecnología Avanzada
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-[#1D9BF0] bg-clip-text text-transparent">
                Características Exclusivas
              </span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Diseñado para la era de los pagos sociales. Rápido, seguro y sin fronteras.
            </p>
          </motion.div>

          {/* Grid de características */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: i * 0.1
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="relative group"
              >
                {/* Card */}
                <div className="relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-3xl p-8 border border-white/10 h-full overflow-hidden">
                  {/* Icono */}
                  <div className="mb-6 relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl text-white shadow-xl`}>
                      <feature.icon />
                    </div>
                    {/* Efecto de brillo */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-transparent via-white/5 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Contenido */}
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm mb-6">{feature.description}</p>

                  {/* Stat */}
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-black">{feature.stat}</div>
                      <div className="text-xs text-zinc-500">{feature.statLabel}</div>
                    </div>
                    <motion.div
                      whileHover={{ rotate: 45 }}
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors"
                    >
                      <FiChevronRight />
                    </motion.div>
                  </div>
                </div>

                {/* Línea conectora (solo en desktop) */}
                {i < features.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 w-12 h-px bg-gradient-to-r from-white/10 to-transparent transform translate-x-full -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN PROCESO INTERACTIVO --- */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visualización del proceso */}
            <div className="relative">
              {/* Orb central */}
              <div className="relative aspect-square max-w-[500px] mx-auto">
                {/* Anillos concéntricos */}
                {[1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 20 * ring, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-white/5 rounded-full"
                    style={{
                      inset: `${ring * 40}px`,
                    }}
                  />
                ))}

                {/* Steps activos */}
                {processSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: activeStep === i ? 1.1 : 1,
                      opacity: activeStep === i ? 1 : 0.3,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`absolute ${i === 0 ? 'top-0 left-1/2 -translate-x-1/2' : ''} 
                               ${i === 1 ? 'right-0 top-1/2 -translate-y-1/2' : ''}
                               ${i === 2 ? 'bottom-0 left-1/2 -translate-x-1/2' : ''}
                               ${i === 3 ? 'left-0 top-1/2 -translate-y-1/2' : ''}`}
                  >
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 ${activeStep === i ? 'border-[#E6F379]' : 'border-white/10'} flex items-center justify-center text-3xl ${step.color}`}>
                      {step.icon}
                    </div>
                  </motion.div>
                ))}

                {/* Centro */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#1D9BF0] to-[#E6F379] rounded-full flex items-center justify-center text-4xl">
                    <RiTwitterXFill />
                  </div>
                </div>
              </div>
            </div>

            {/* Descripción del proceso */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-6xl font-black mb-8">
                  <span className="bg-gradient-to-r from-white to-[#E6F379] bg-clip-text text-transparent">
                    Cómo funciona
                  </span>
                </h2>
                
                <div className="space-y-8">
                  {processSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className={`flex items-start gap-6 p-6 rounded-2xl transition-all cursor-pointer ${
                        activeStep === i 
                          ? 'bg-gradient-to-r from-white/10 to-white/5 border border-white/20' 
                          : 'hover:bg-white/5'
                      }`}
                      onClick={() => setActiveStep(i)}
                    >
                      <div className={`text-2xl font-black ${step.color}`}>
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-zinc-400">{step.description}</p>
                      </div>
                      <div className={`transition-transform ${activeStep === i ? 'scale-125' : ''}`}>
                        {activeStep === i ? (
                          <FiCheckCircle className="text-2xl text-emerald-400" />
                        ) : (
                          <div className="w-8 h-8 rounded-full border border-white/20" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN CTA FINAL --- */}
      <section className="py-40 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1D9BF0]/10 via-transparent to-[#E6F379]/10" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#1D9BF0] to-[#E6F379] text-black px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest">
              <RiFlashlightFill />
              <span>Únete a la Revolución</span>
            </div>

            {/* Título */}
            <h2 className="text-5xl md:text-7xl font-black leading-tight">
              ¿Listo para el futuro de
              <span className="block text-[#E6F379]">los pagos sociales?</span>
            </h2>

            {/* Descripción */}
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Conecta tu cuenta Zelloh con X hoy y comienza a enviar dinero al instante. 
              Seguro, rápido y sin complicaciones.
            </p>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#1D9BF0] to-[#E6F379] rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-black text-white px-12 py-5 rounded-full text-lg font-bold flex items-center gap-4">
                  <RiTwitterXFill />
                  Conectar con X ahora
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.button>

              <button className="px-12 py-5 rounded-full text-lg font-bold border-2 border-white/20 hover:bg-white/10 transition-colors">
                Ver Demostración
              </button>
            </div>

            {/* Información de seguridad */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl font-black text-[#E6F379]">256-bit</div>
                <div className="text-sm text-zinc-400">Encriptación</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-[#E6F379]">99.9%</div>
                <div className="text-sm text-zinc-400">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-[#E6F379]">50+</div>
                <div className="text-sm text-zinc-400">Regulaciones</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Forzar que la página sea dinámica
export const dynamic = 'force-dynamic';
export const runtime = 'edge';