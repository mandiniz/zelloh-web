"use client";
import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { 
  FiCheckCircle, FiLoader, FiCheck, FiCamera, FiTwitch, FiAlertCircle, FiUploadCloud 
} from "react-icons/fi";
import { 
  RiTwitterXFill, RiInstagramFill, RiMessengerFill, 
  RiWhatsappFill, RiDiscordFill, RiTelegramFill, RiTiktokFill 
} from "react-icons/ri";
import { FaSnapchatGhost, FaViber } from "react-icons/fa"; 
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ProfileSettingsFinal() {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // ESTADOS DE KYC
  const [kycStatus, setKycStatus] = useState<"idle" | "verifying" | "pending">("idle");
  const [kycProgress, setKycProgress] = useState(0);

  const [userData, setUserData] = useState({
    displayName: "",
    username: "",
    bio: "",
    countryCode: "+34",
    phone: "",
    email: "",
    fullName: "",
    lastName: "",
    birthDate: "",
    twitter: "",
    instagram: "",
    messenger: "",
    whatsapp: "",
    discord: "",
    telegram: "",
    viber: "",
    twitch: "",
    tiktok: "",
    snapchat: ""
  });

  const [profileImg, setProfileImg] = useState("");
  const [coverImg, setCoverImg] = useState("");

  // CARGAR DATOS DESDE EL REGISTRO
  useEffect(() => {
    const registrationData = localStorage.getItem("zelloh_user");
    const profileData = localStorage.getItem("zelloh_user_profile");
    const savedProfile = localStorage.getItem("zelloh_profile_img");
    const savedCover = localStorage.getItem("zelloh_cover_img");

    let finalData = { ...userData };

    if (registrationData) {
      const reg = JSON.parse(registrationData);
      finalData.fullName = reg.fullName || "";
      finalData.email = reg.email || "";
      finalData.phone = reg.phone || "";
      finalData.birthDate = reg.birthYear || ""; 
    }
    if (profileData) finalData = { ...finalData, ...JSON.parse(profileData) };

    setUserData(finalData);
    if (savedProfile) setProfileImg(savedProfile);
    if (savedCover) setCoverImg(savedCover);
  }, []);

  // Simulación Disponibilidad Username
  useEffect(() => {
    if (userData.username.length > 3) {
      setCheckingUsername(true);
      const timer = setTimeout(() => {
        setUsernameAvailable(!userData.username.endsWith("1"));
        setCheckingUsername(false);
      }, 800);
      return () => clearTimeout(timer);
    }
    setUsernameAvailable(null);
  }, [userData.username]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("zelloh_user_profile", JSON.stringify(userData));
      localStorage.setItem("zelloh_profile_img", profileImg);
      localStorage.setItem("zelloh_cover_img", coverImg);
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const handleChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const startKYC = () => {
    setKycStatus("verifying");
    let prog = 0;
    const interval = setInterval(() => {
      prog += 10;
      setKycProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        setKycStatus("pending");
      }
    }, 150);
  };

  const handleImageChange = (e: any, type: "profile" | "cover") => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (type === "profile") setProfileImg(base64String);
        else setCoverImg(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="bg-black text-white min-h-screen flex flex-col font-sans pb-20">
      <Header />

      <div className="flex-grow max-w-[1100px] mx-auto w-full px-6 py-12">
        <form onSubmit={handleSave} className="space-y-16">
          
          {/* SECCIÓN 1: IMÁGENES */}
          <section className="relative">
            <div className="w-full h-64 bg-zinc-900 rounded-[3.5rem] border border-zinc-800 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${coverImg})` }}>
              {!coverImg && <div className="w-full h-full flex items-center justify-center opacity-10 font-black italic text-4xl uppercase">Zelloh Cover</div>}
              <button type="button" onClick={() => coverInputRef.current?.click()} className="absolute top-6 right-8 bg-white text-black px-6 py-2 rounded-xl text-[10px] font-black uppercase hover:scale-105 transition-transform">
                <FiCamera className="inline mr-2" /> Edit banner
              </button>
              <input type="file" ref={coverInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, "cover")} />
            </div>

            <div className="absolute -bottom-16 left-12">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="w-44 h-44 rounded-full border-[8px] border-black bg-zinc-800 bg-cover bg-center shadow-2xl transition-transform group-hover:scale-105" style={{ backgroundImage: `url(${profileImg})` }} />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiCamera size={30} />
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, "profile")} />
              </div>
            </div>
          </section>

          {/* SECCIÓN 2: DATOS EDITABLES */}
          <section className="pt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ZellohInput label="Display name" name="displayName" value={userData.displayName} onChange={handleChange} placeholder="Tu nombre público" />
            <div className="relative">
              <ZellohInput label="Username" name="username" value={userData.username} onChange={handleChange} prefix="$" placeholder="usuario" />
              <div className="absolute right-4 bottom-5 flex items-center gap-2">
                {checkingUsername && <FiLoader className="animate-spin text-zinc-500" size={14} />}
                {usernameAvailable === true && <span className="text-[10px] font-black text-[#E6F379]">AVAILABLE</span>}
                {usernameAvailable === false && <span className="text-[10px] font-black text-red-500">TAKEN</span>}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-widest mb-3 opacity-40">Bio</label>
              <textarea name="bio" value={userData.bio} onChange={handleChange} placeholder="Cuéntanos quién eres..." className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-sm font-bold focus:border-[#E6F379] outline-none min-h-[100px] resize-none" />
            </div>
          </section>

          {/* SECCIÓN 3: DATOS PROTEGIDOS */}
          <section className="bg-zinc-950 border border-zinc-900 rounded-[3.5rem] p-10 space-y-8">
             <div className="flex items-center gap-4 text-[#E6F379]">
                <FiAlertCircle size={20} />
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">Fixed account details_ Contact support to change</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ZellohInput label="Verified Email" value={userData.email} readOnly isVerified />
                <ZellohInput label="Verified Phone" value={userData.phone} readOnly isVerified />
             </div>
          </section>

          {/* SECCIÓN 4: KYC VERIFICATION FLOW */}
          <section className="bg-zinc-950 border border-zinc-900 rounded-[3.5rem] p-8 md:p-14">
            <AnimatePresence mode="wait">
              {kycStatus === "idle" ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
                  <div className="space-y-2">
                    <h3 className="text-4xl font-[1000] uppercase italic tracking-tighter">Identity_Verification</h3>
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Complete el protocolo KYC para habilitar retiros</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ZellohInput label="Nombres" placeholder="Nombre completo" />
                    <ZellohInput label="Apellidos" placeholder="Tus apellidos" />
                    <ZellohInput label="Fecha de Nacimiento" type="date" />
                    <div className="space-y-3">
                      <label className="block text-[10px] font-black uppercase tracking-widest opacity-40">Documento</label>
                      <select className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-sm font-bold outline-none text-white appearance-none focus:border-[#E6F379]">
                        <option>DNI (España)</option>
                        <option>NIE (Extranjero)</option>
                        <option>Pasaporte</option>
                      </select>
                    </div>
                  </div>

                  {/* CARGA DE DOCUMENTOS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group relative border-2 border-dashed border-zinc-800 rounded-[2.5rem] p-10 text-center hover:border-[#E6F379] transition-all cursor-pointer">
                      <FiUploadCloud className="mx-auto mb-4 text-zinc-700 group-hover:text-[#E6F379]" size={32} />
                      <p className="text-xs font-black uppercase tracking-widest mb-1">Cara Frontal</p>
                      <p className="text-[8px] text-zinc-500 font-bold uppercase">Subir parte delantera</p>
                    </div>
                    <div className="group relative border-2 border-dashed border-zinc-800 rounded-[2.5rem] p-10 text-center hover:border-[#E6F379] transition-all cursor-pointer">
                      <FiUploadCloud className="mx-auto mb-4 text-zinc-700 group-hover:text-[#E6F379]" size={32} />
                      <p className="text-xs font-black uppercase tracking-widest mb-1">Cara Posterior</p>
                      <p className="text-[8px] text-zinc-500 font-bold uppercase">Subir parte trasera</p>
                    </div>
                  </div>

                  <button type="button" onClick={startKYC} className="w-full bg-[#E6F379] text-black py-8 rounded-[2rem] font-[1000] uppercase italic text-xl hover:scale-[1.01] transition-all">
                    Enviar para revisión
                  </button>
                </motion.div>
              ) : kycStatus === "verifying" ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center space-y-8">
                  <div className="relative w-24 h-24 mx-auto">
                    <FiLoader className="text-[#E6F379] animate-spin w-full h-full" strokeWidth={1} />
                    <div className="absolute inset-0 flex items-center justify-center font-black text-xs">{kycProgress}%</div>
                  </div>
                  <h3 className="text-2xl font-[1000] uppercase italic tracking-tighter">Sincronizando_Documentos...</h3>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center space-y-8 max-w-md mx-auto">
                  <div className="w-20 h-20 bg-[#E6F379] rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(230,243,121,0.3)]">
                    <FiCheckCircle size={40} className="text-black" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-[1000] uppercase italic tracking-tighter">Solicitud_Enviada</h3>
                    <p className="text-zinc-500 text-[10px] font-black uppercase leading-relaxed tracking-[0.2em]">
                      Nuestros especialistas están revisando tu documentación. <br/>
                      <span className="text-white mt-4 block">Tiempo estimado: 1 - 5 días hábiles</span>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* SECCIÓN 5: SOCIAL LINKS */}
          <section className="space-y-8">
            <h3 className="text-3xl font-[1000] uppercase italic tracking-tighter text-[#E6F379]">Social Connections_</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SocialInput icon={<RiTwitterXFill />} label="Twitter" name="twitter" value={userData.twitter} onChange={handleChange} />
              <SocialInput icon={<RiInstagramFill />} label="Instagram" name="instagram" value={userData.instagram} onChange={handleChange} />
              <SocialInput icon={<RiDiscordFill />} label="Discord" name="discord" value={userData.discord} onChange={handleChange} />
              <SocialInput icon={<RiTelegramFill />} label="Telegram" name="telegram" value={userData.telegram} onChange={handleChange} />
            </div>
          </section>

          <button type="submit" disabled={loading} className={`w-full py-8 rounded-[2.5rem] font-[1000] uppercase italic text-2xl flex items-center justify-center gap-4 transition-all ${showSuccess ? 'bg-[#E6F379] text-black shadow-[0_0_40px_rgba(230,243,121,0.4)]' : 'bg-white text-black hover:bg-[#E6F379]'}`}>
            {loading ? <FiLoader className="animate-spin" /> : showSuccess ? <><FiCheck /> Settings Updated</> : "Update Profile"}
          </button>
        </form>

        <div className="mt-20">
          <VerifyBadgeBanner />
        </div>
      </div>
    </main>
  );
}

// COMPONENTES AUXILIARES
function VerifyBadgeBanner() {
  return (
    <div className="w-full bg-zinc-900/50 border border-zinc-800 rounded-[3.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
      <div className="relative w-full md:w-1/3 aspect-square max-w-[280px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF00E5] via-[#FFD600] to-[#ADFF00] rounded-[2.5rem] rotate-3 opacity-80" />
        <div className="absolute inset-0 bg-zinc-900 rounded-[2.5rem] flex items-center justify-center overflow-hidden border border-white/10">
           <div className="relative z-10 bg-yellow-400 p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-3">
              <FiCheck size={60} strokeWidth={4} className="text-black" />
           </div>
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
        </div>
      </div>

      <div className="flex-grow space-y-6 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-[1000] uppercase italic tracking-tighter">Verify your account</h2>
        <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-xl">Proceed with verification process to get more visibility and gain trust on Zelloh</p>
        <Link href="/dashboard/profile/verified">
          <button className="px-12 py-5 border-2 border-zinc-700 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all">Get verified</button>
        </Link>
      </div>
    </div>
  );
}

function ZellohInput({ label, name, value, onChange, placeholder, prefix, readOnly, isVerified, type = "text" }: any) {
  return (
    <div className="space-y-3">
      <label className="block text-[10px] font-black uppercase tracking-widest opacity-40">{label}</label>
      <div className={`flex items-center bg-zinc-900 border ${readOnly ? 'border-zinc-800 opacity-60' : 'border-zinc-800 focus-within:border-[#E6F379]'} rounded-2xl overflow-hidden transition-all`}>
        {prefix && <span className="pl-5 text-[#E6F379] font-black italic">{prefix}</span>}
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} readOnly={readOnly} className={`w-full bg-transparent p-5 text-sm font-bold outline-none ${readOnly ? 'cursor-not-allowed' : ''}`} />
        {isVerified && <FiCheckCircle className="mr-5 text-blue-400" size={20} />}
      </div>
    </div>
  );
}

function SocialInput({ icon, label, name, value, onChange }: any) {
  return (
    <div className="flex items-center gap-4 bg-zinc-900/40 p-3 pl-6 rounded-3xl border border-zinc-800 focus-within:border-[#E6F379] transition-all">
      <div className="text-xl text-zinc-400">{icon}</div>
      <div className="flex-grow">
        <p className="text-[7px] font-black uppercase opacity-30">{label}</p>
        <input name={name} value={value} onChange={onChange} placeholder={`@username`} className="w-full bg-transparent text-xs font-bold outline-none text-white" />
      </div>
    </div>
  );
}