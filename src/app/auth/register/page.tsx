"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiArrowRight, 
  FiArrowLeft, 
  FiMail, 
  FiPhone, 
  FiLock, 
  FiUser, 
  FiGlobe, 
  FiLoader, 
  FiCalendar 
} from "react-icons/fi";
import Link from "next/link";

const DOMAINS = ["gmail.com", "hotmail.com", "outlook.com", "icloud.com", "yahoo.com", "aol.com"];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // ESTADO DEL FORMULARIO
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    nombre: "",
    apellido: "",
    nacimiento: "",
    pais: "España",
    password: ""
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState(false);
  const totalSteps = 8;
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // LÓGICA DE AUTOCOMPLETADO DE EMAIL
  const emailSuggestions = useMemo(() => {
    if (!formData.email.includes("@")) {
      const prefix = formData.email;
      if (prefix.length < 2) return [];
      return DOMAINS.map(d => `${prefix}@${d}`);
    }
    const [prefix, domain] = formData.email.split("@");
    return DOMAINS
      .filter(d => d.startsWith(domain) && d !== domain)
      .map(d => `${prefix}@${d}`);
  }, [formData.email]);

  const handleSelectEmail = (val: string) => {
    setFormData({ ...formData, email: val });
    setShowSuggestions(false);
  };

  const nextStep = () => {
    if (step === 3) {
      validateOtp();
    } else if (step === totalSteps) {
      handleFinalize();
    } else {
      setStep((s) => Math.min(s + 1, totalSteps));
    }
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && step !== 3) {
      if (step === 1 && emailSuggestions.length > 0 && showSuggestions) {
        handleSelectEmail(emailSuggestions[0]);
      } else {
        e.preventDefault();
        nextStep();
      }
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setOtpError(false);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
    if (value && index === 5) setTimeout(() => validateOtp(newOtp.join("")), 100);
  };

  const validateOtp = (codeString?: string) => {
    const code = codeString || otp.join("");
    if (code === "123456") setStep(4);
    else {
      setOtpError(true);
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    }
  };

  const handleFinalize = () => {
    setLoading(true);
    
    // GUARDAR DATOS PARA EL DASHBOARD
    const birthYear = formData.nacimiento ? formData.nacimiento.split("-")[0] : "2024";
    const userData = {
      fullName: `${formData.nombre} ${formData.apellido}`,
      birthYear: birthYear,
      email: formData.email
    };
    
    localStorage.setItem("zelloh_user", JSON.stringify(userData));

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 3000);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#020202] flex items-center justify-center z-[9999] overflow-y-auto" onKeyDown={handleKeyDown}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E6F379]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md p-6 relative">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center text-center space-y-6">
              <FiLoader className="text-[#E6F379] text-6xl animate-spin" />
              <h2 className="text-2xl font-[1000] uppercase italic text-white tracking-tighter">Sincronizando_Protocolo</h2>
              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em] animate-pulse">Guardando perfil encriptado...</p>
            </motion.div>
          ) : (
            <motion.div key="form" exit={{ opacity: 0, scale: 0.95 }}>
              <div className="flex justify-center gap-2 mb-12">
                {[...Array(totalSteps)].map((_, i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${i + 1 <= step ? 'bg-[#E6F379]' : 'bg-white/5'}`} />
                ))}
              </div>

              <motion.div layout className="bg-zinc-900/60 border border-white/10 p-10 md:p-12 rounded-[3.5rem] backdrop-blur-3xl shadow-2xl relative">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <StepContent key="1" emoji="📧" title="Email_" desc="Acceso_Inicial">
                      <div className="relative">
                        <Input 
                          Icon={<FiMail />} Placeholder="TU@EMAIL.COM" Type="email" Value={formData.email}
                          OnChange={(e:any) => { setFormData({...formData, email: e.target.value}); setShowSuggestions(true); }}
                          autoFocus 
                        />
                        {showSuggestions && emailSuggestions.length > 0 && (
                          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute z-50 w-full mt-2 bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                            {emailSuggestions.map((s) => (
                              <button key={s} onClick={() => handleSelectEmail(s)} className="w-full px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:bg-[#E6F379] hover:text-black transition-colors border-b border-white/5 last:border-0">{s}</button>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </StepContent>
                  )}

                  {step === 2 && (
                    <StepContent key="2" emoji="📱" title="Teléfono_" desc="Seguridad_Móvil">
                      <div className="flex gap-3 mt-4">
                        <select className="w-28 bg-black border border-white/20 py-5 px-4 rounded-2xl outline-none focus:border-[#E6F379] font-black text-white text-xs cursor-pointer">
                          <option>+34</option><option>+1</option><option>+52</option>
                        </select>
                        <Input Icon={<FiPhone />} Placeholder="600 000 000" Type="tel" Value={formData.phone} OnChange={(e:any) => setFormData({...formData, phone: e.target.value})} autoFocus />
                      </div>
                    </StepContent>
                  )}

                  {step === 3 && (
                    <StepContent key="3" emoji="🛡️" title="OTP_" desc="Introduce 123456">
                      <div className="flex justify-between gap-2 mt-4">
                        {otp.map((digit, i) => (
                          <input
                            key={i} ref={(el) => { otpRefs.current[i] = el; }}
                            type="text" maxLength={1} value={digit}
                            onChange={(e) => handleOtpChange(e.target.value, i)}
                            className="w-full h-16 bg-black border border-white/20 rounded-2xl text-center text-2xl font-black focus:border-[#E6F379] outline-none text-[#E6F379]"
                          />
                        ))}
                      </div>
                    </StepContent>
                  )}

                  {step === 4 && <StepContent key="4" emoji="👤" title="Nombre_" desc="Identidad_Digital"><Input Icon={<FiUser />} Placeholder="TU NOMBRE" Value={formData.nombre} OnChange={(e:any) => setFormData({...formData, nombre: e.target.value})} autoFocus /></StepContent>}
                  {step === 5 && <StepContent key="5" emoji="✍️" title="Apellido_" desc="Firma_Protocolo"><Input Icon={<FiUser />} Placeholder="TU APELLIDO" Value={formData.apellido} OnChange={(e:any) => setFormData({...formData, apellido: e.target.value})} autoFocus /></StepContent>}
                  {step === 6 && <StepContent key="6" emoji="🎂" title="Nacimiento_" desc="Verificación_Cronológica"><Input Icon={<FiCalendar />} Type="date" Value={formData.nacimiento} OnChange={(e:any) => setFormData({...formData, nacimiento: e.target.value})} autoFocus /></StepContent>}
                  
                  {step === 7 && (
                    <StepContent key="7" emoji="🌍" title="País_" desc="Ubicación_Global">
                      <div className="relative mt-4">
                        <FiGlobe className="absolute left-6 top-1/2 -translate-y-1/2 text-[#E6F379] z-10" />
                        <select 
                          value={formData.pais} onChange={(e) => setFormData({...formData, pais: e.target.value})}
                          className="w-full bg-black border border-white/20 py-6 px-16 rounded-[1.5rem] outline-none focus:border-[#E6F379] appearance-none font-black text-white cursor-pointer"
                        >
                          <option>España</option><option>United States</option><option>México</option>
                        </select>
                      </div>
                    </StepContent>
                  )}

                  {step === 8 && <StepContent key="8" emoji="🔐" title="Seguridad_" desc="Password_Maestra"><Input Icon={<FiLock />} Placeholder="••••••••" Type="password" Value={formData.password} OnChange={(e:any) => setFormData({...formData, password: e.target.value})} autoFocus /></StepContent>}
                </AnimatePresence>

                <div className="flex gap-4 mt-12">
                  {step > 1 && (
                    <button onClick={prevStep} className="p-5 rounded-2xl bg-black border border-white/10 text-white hover:bg-white/5 transition-all"><FiArrowLeft size={20} /></button>
                  )}
                  <button onClick={nextStep} className={`flex-1 py-5 rounded-2xl font-[1000] uppercase text-[11px] tracking-[0.25em] transition-all flex items-center justify-center gap-4 ${step === totalSteps ? 'bg-[#E6F379] text-black' : 'bg-white text-black'}`}>
                    {step === totalSteps ? "Finalizar" : "Siguiente"} <FiArrowRight />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepContent({ children, emoji, title, desc }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="flex flex-col items-center text-center">
      <div className="text-6xl mb-8">{emoji}</div>
      <h2 className="text-4xl font-[1000] uppercase italic text-white leading-none tracking-tighter">{title}</h2>
      <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.4em] mb-12">{desc}</p>
      <div className="w-full text-left">{children}</div>
    </motion.div>
  );
}

function Input({ Icon, Placeholder, Type = "text", Value, OnChange, autoFocus }: any) {
  return (
    <div className="relative group w-full mt-2">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#E6F379] text-xl z-10 transition-transform group-focus-within:scale-110">{Icon}</div>
      <input 
        autoFocus={autoFocus} type={Type} placeholder={Placeholder} value={Value} onChange={OnChange}
        className="w-full bg-black border border-white/20 py-6 px-16 rounded-[1.5rem] outline-none focus:border-[#E6F379] font-black text-white text-sm placeholder:text-zinc-600 placeholder:uppercase placeholder:text-[9px]"
      />
    </div>
  );
}