"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiArrowLeft, FiPhone, FiLock, FiShield, FiLoader } from "react-icons/fi";
import Link from "next/link";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState(false);
  const [loading, setLoading] = useState(false);
  const totalSteps = 3;

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const nextStep = () => {
    if (step === 3) {
      validateOtp();
    } else {
      setStep((s) => Math.min(s + 1, totalSteps));
    }
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && step !== 3) {
      e.preventDefault();
      nextStep();
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setOtpError(false);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
    if (value && index === 5) {
      setTimeout(() => validateOtp(newOtp.join("")), 100);
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const validateOtp = (codeString?: string) => {
    const code = codeString || otp.join("");
    if (code === "123456") {
      handleFinalize();
    } else {
      setOtpError(true);
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    }
  };

  const handleFinalize = () => {
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 2500);
  };

  useEffect(() => {
    if (step === 3) {
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#020202] flex items-center justify-center z-[9999] p-4 overflow-hidden" onKeyDown={handleKeyDown}>
      {/* Glow de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E6F379]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="relative">
                <FiLoader className="text-[#E6F379] text-6xl animate-spin" />
                <div className="absolute inset-0 blur-2xl bg-[#E6F379]/30 animate-pulse" />
              </div>
              <h2 className="text-2xl font-[1000] uppercase italic tracking-tighter text-white">Acceso_Autorizado</h2>
              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em]">Cargando tu entorno seguro...</p>
            </motion.div>
          ) : (
            <motion.div key="form" exit={{ opacity: 0, scale: 0.95 }}>
              
              <div className="text-center mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#E6F379] mb-4 block">Login_Step_{step}/{totalSteps}</span>
              </div>

              <motion.div layout className="bg-zinc-900/60 border border-white/10 p-10 md:p-12 rounded-[3.5rem] backdrop-blur-3xl shadow-2xl relative">
                <AnimatePresence mode="wait">
                  {/* PASO 1: TELÉFONO */}
                  {step === 1 && (
                    <StepContent key="1" emoji="📱" title="Acceso_" desc="Introduce tu teléfono de red">
                      <div className="flex gap-3 mt-4">
                        <select className="w-28 bg-black border border-white/20 py-5 px-4 rounded-2xl outline-none focus:border-[#E6F379] font-[1000] text-white text-xs cursor-pointer hover:border-white/40 transition-colors">
                          <option className="bg-zinc-900">+34</option>
                          <option className="bg-zinc-900">+1</option>
                          <option className="bg-zinc-900">+52</option>
                        </select>
                        <Input Icon={<FiPhone />} Placeholder="600 000 000" Type="tel" autoFocus />
                      </div>
                    </StepContent>
                  )}

                  {/* PASO 2: CONTRASEÑA */}
                  {step === 2 && (
                    <StepContent key="2" emoji="🔐" title="Clave_" desc="Verifica tu identidad digital">
                      <Input Icon={<FiLock />} Placeholder="••••••••" Type="password" autoFocus />
                    </StepContent>
                  )}

                  {/* PASO 3: OTP */}
                  {step === 3 && (
                    <StepContent key="3" emoji="🛡️" title="OTP_" desc="Código de seguridad de 6 dígitos">
                      <motion.div animate={otpError ? { x: [-10, 10, -10, 10, 0] } : {}} className="flex justify-between gap-2 mt-4">
                        {otp.map((digit, i) => (
                          <input
                            key={i}
                            ref={(el) => { otpRefs.current[i] = el; }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(e.target.value, i)}
                            onKeyDown={(e) => handleOtpKeyDown(e, i)}
                            className={`w-full h-16 bg-black border ${otpError ? 'border-red-500' : 'border-white/20'} rounded-2xl text-center text-2xl font-black focus:border-[#E6F379] outline-none transition-all text-[#E6F379] shadow-inner`}
                          />
                        ))}
                      </motion.div>
                    </StepContent>
                  )}
                </AnimatePresence>

                <div className="flex gap-4 mt-12">
                  {step > 1 && (
                    <button 
                      onClick={prevStep} 
                      className="p-5 rounded-2xl bg-black border border-white/10 hover:border-white/30 transition-all text-white"
                    >
                      <FiArrowLeft size={20} />
                    </button>
                  )}
                  <button 
                    onClick={nextStep} 
                    className={`flex-1 py-5 rounded-2xl font-[1000] uppercase text-[11px] tracking-[0.25em] transition-all flex items-center justify-center gap-4 group ${step === totalSteps ? 'bg-[#E6F379] text-black shadow-[0_0_40px_rgba(230,243,121,0.3)]' : 'bg-white text-black hover:bg-zinc-200'}`}
                  >
                    {step === totalSteps ? "Verificar" : "Continuar"} <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>

              <div className="text-center mt-12">
                <Link href="/register" className="text-zinc-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
                  ¿Nuevo en la red? <span className="text-white border-b border-[#E6F379] pb-1 ml-2">Regístrate</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Componentes consistentes
function StepContent({ children, emoji, title, desc }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="flex flex-col items-center text-center">
      <div className="text-6xl mb-8 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">{emoji}</div>
      <h2 className="text-4xl font-[1000] uppercase italic tracking-tighter mb-2 leading-none text-white">{title}</h2>
      <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.4em] mb-12">{desc}</p>
      <div className="w-full text-left">{children}</div>
    </motion.div>
  );
}

function Input({ Icon, Placeholder, Type = "text", autoFocus }: any) {
  return (
    <div className="relative group w-full mt-2">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#E6F379] text-xl z-10 group-focus-within:scale-110 transition-transform duration-300">
        {Icon}
      </div>
      <input 
        autoFocus={autoFocus} 
        type={Type} 
        placeholder={Placeholder}
        className="w-full bg-black border border-white/20 py-6 px-16 rounded-[1.5rem] outline-none 
                   focus:border-[#E6F379] focus:ring-1 focus:ring-[#E6F379]/50 transition-all 
                   font-black text-white text-sm tracking-wide
                   placeholder:text-zinc-600 placeholder:uppercase placeholder:text-[9px] placeholder:tracking-[0.3em]"
      />
    </div>
  );
}