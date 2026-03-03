"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { FiCheck, FiX, FiInfo, FiLoader } from "react-icons/fi";
import { motion } from "framer-motion";

export default function VerifiedFormPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // ESTADO DEL FORMULARIO
  const [form, setForm] = useState({
    profileLink: "",
    wallet: "",
    who: "",
    about: "",
    workInProgress: "",
    twitter: "",
    instagram: "",
    website: "",
    email: "",
    comments: "",
    subscription: "monthly", // monthly | yearly
    paymentMethod: "card"    // card | crypto
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica manual (aunque el 'required' de HTML5 ayuda)
    if (!form.profileLink || !form.email || !form.who) {
      alert("Por favor, rellena los campos obligatorios.");
      return;
    }

    setLoading(true);

    // SIMULACIÓN DE PROCESO DE PAGO Y VERIFICACIÓN
    setTimeout(() => {
      // GUARDAR ESTADO DE VERIFICADO EN LOCALSTORAGE
      localStorage.setItem("zelloh_verified", "true");
      
      // Opcional: Guardar también el tipo de suscripción
      localStorage.setItem("zelloh_subscription", form.subscription);
      
      setLoading(false);
      router.push("/dashboard/profile");
    }, 2500);
  };

  return (
    <main className="bg-black text-white min-h-screen flex flex-col font-sans">
      <Header />

      <div className="flex-grow max-w-[1200px] mx-auto w-full px-6 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* LADO IZQUIERDO: FORMULARIO */}
        <div className="flex-grow space-y-12">
          <header className="space-y-4">
            <h1 className="text-4xl font-[1000] uppercase italic tracking-tighter">
              Zelloh Profile Verification Request
            </h1>
            <p className="text-zinc-500 text-sm font-bold">
              Thank you for seeking Zelloh Profile Verification! Please fill out the form and we will review it as soon as we can.
            </p>
          </header>

          <form id="verify-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <VerifiedInput name="profileLink" placeholder="Profile link *" value={form.profileLink} onChange={handleInputChange} required />
              <VerifiedInput name="wallet" placeholder="Wallet Address *" value={form.wallet} onChange={handleInputChange} required />
              <VerifiedInput name="who" placeholder="Who are you? (Artist, Creator, Brand) *" value={form.who} onChange={handleInputChange} required />
              
              <textarea 
                name="about"
                required
                value={form.about}
                onChange={handleInputChange}
                placeholder="About yourself *"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 text-sm font-bold outline-none focus:border-[#E6F379] min-h-[150px] transition-all"
              />

              <VerifiedInput name="workInProgress" placeholder="Work in progress" value={form.workInProgress} onChange={handleInputChange} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <VerifiedInput name="twitter" placeholder="Twitter URL *" value={form.twitter} onChange={handleInputChange} required />
                <VerifiedInput name="instagram" placeholder="Instagram URL *" value={form.instagram} onChange={handleInputChange} required />
              </div>

              <VerifiedInput name="website" placeholder="Website / Portfolio" value={form.website} onChange={handleInputChange} />
              <VerifiedInput name="email" type="email" placeholder="Email associated *" value={form.email} onChange={handleInputChange} required />
              
              <textarea 
                name="comments"
                value={form.comments}
                onChange={handleInputChange}
                placeholder="Additional Comments"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 text-sm font-bold outline-none focus:border-[#E6F379] min-h-[100px] transition-all"
              />
            </div>

            {/* SECCIÓN VENTAJAS */}
            <section className="pt-10 space-y-8">
              <h2 className="text-3xl font-[1000] uppercase italic">Verify By Zelloh</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <BenefitItem 
                  icon="🟡" 
                  title="A verified badge" 
                  desc="Your audience can trust that you're a real person, sharing your real stories" 
                />
                <BenefitItem 
                  icon="🛡️" 
                  title="Increased Account Protection" 
                  desc="Worry less about impersonation with proactive identity monitoring" 
                />
              </div>
            </section>

            {/* SUSCRIPCIÓN */}
            <section className="pt-10 space-y-6">
              <h2 className="text-3xl font-[1000] uppercase italic">Selecciona tu suscripción</h2>
              <div className="space-y-4">
                <SubscriptionOption 
                  active={form.subscription === "monthly"}
                  onClick={() => setForm({...form, subscription: "monthly"})}
                  price="€ 9,99 por mes" 
                  desc="Al seleccionar esta opción se cobrara el valor estándar cobrado por Zelloh..." 
                />
                <SubscriptionOption 
                  active={form.subscription === "yearly"}
                  onClick={() => setForm({...form, subscription: "yearly"})}
                  price="€ 99,99 por año" 
                  desc="Al seleccionar esta opción se cobrara el valor estándar cobrado por Zelloh anualmente..." 
                  highlight
                />
              </div>
            </section>

            {/* MÉTODO DE PAGO */}
            <section className="pt-6 space-y-4 pb-20">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Payment Method</p>
              <div className="flex flex-col gap-3">
                <PaymentOption 
                  active={form.paymentMethod === "card"} 
                  onClick={() => setForm({...form, paymentMethod: "card"})}
                  label="Add funds and pay with card" 
                />
                <PaymentOption 
                  active={form.paymentMethod === "crypto"} 
                  onClick={() => setForm({...form, paymentMethod: "crypto"})}
                  label="Add funds and pay with crypto wallet" 
                />
              </div>
            </section>
          </form>
        </div>

        {/* LADO DERECHO: CARD FLOTANTE */}
        <div className="lg:w-[400px]">
          <div className="sticky top-32 bg-zinc-900 border border-zinc-800 rounded-[3.5rem] overflow-hidden shadow-2xl">
            <div className="aspect-square bg-gradient-to-br from-[#FF00E5] via-[#FFD600] to-[#ADFF00] flex items-center justify-center p-12 relative">
                <button onClick={() => router.back()} className="absolute top-6 right-6 text-black hover:scale-110 transition-transform">
                    <FiX size={24} />
                </button>
                <motion.div 
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: -3 }}
                  className="bg-yellow-400 p-8 rounded-[2.5rem] shadow-2xl"
                >
                    <FiCheck size={80} strokeWidth={4} className="text-black" />
                </motion.div>
            </div>
            <div className="p-10 text-center space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 text-white">Verify your account</p>
              <h3 className="text-4xl font-[1000] uppercase italic tracking-tighter">Zelloh Verify</h3>
              <p className="text-zinc-400 text-sm font-bold">Proceed with verification process to get more visibility and gain trust on Zelloh</p>
              
              <button 
                type="submit"
                form="verify-form"
                disabled={loading}
                className="w-full bg-[#E6F379] text-black py-5 rounded-full font-[1000] uppercase italic text-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <><FiLoader className="animate-spin" /> Procesando...</> : "Enviar y Pagar"}
              </button>
              
              <button onClick={() => router.back()} className="text-zinc-500 font-bold uppercase text-xs tracking-widest hover:text-white transition-colors">
                Cancelar proceso
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// COMPONENTES REUTILIZABLES CON PROPS DE ESTADO
function VerifiedInput({ placeholder, name, value, onChange, required, type = "text" }: any) {
  return (
    <input 
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder} 
      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 text-sm font-bold outline-none focus:border-[#E6F379] transition-all placeholder:opacity-30"
    />
  );
}

function BenefitItem({ icon, title, desc }: any) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-12 h-12 shrink-0 bg-zinc-900 rounded-2xl flex items-center justify-center text-xl border border-zinc-800">{icon}</div>
      <div className="space-y-1">
        <h4 className="font-black text-sm uppercase text-white">{title}</h4>
        <p className="text-zinc-500 text-xs font-bold leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function SubscriptionOption({ price, desc, highlight, active, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex gap-4 ${
        active 
          ? 'border-[#E6F379] bg-[#E6F379]/10' 
          : 'border-zinc-800 bg-zinc-900/30 hover:border-zinc-700'
      }`}
    >
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${active ? 'border-[#E6F379]' : 'border-zinc-700'}`}>
        {active && <div className="w-3 h-3 rounded-full bg-[#E6F379]" />}
      </div>
      <div className="space-y-1">
        <p className="font-[1000] text-lg uppercase italic tracking-tighter">{price}</p>
        <p className="text-zinc-500 text-[10px] font-black uppercase leading-tight tracking-widest">{desc}</p>
      </div>
    </div>
  );
}

function PaymentOption({ label, active, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-3 cursor-pointer group w-fit"
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${active ? 'border-[#E6F379]' : 'border-zinc-700 group-hover:border-zinc-500'}`}>
        <div className={`w-2 h-2 rounded-full bg-[#E6F379] transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`} />
      </div>
      <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${active ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
        <FiInfo size={14} /> {label}
      </span>
    </div>
  );
}