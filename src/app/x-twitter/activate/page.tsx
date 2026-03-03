"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCopy, FiCheck, FiShield, FiLock, FiAlertTriangle, FiSmartphone, FiArrowRight } from "react-icons/fi";
import { RiTwitterXFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

export default function XWalletRitualPro() {
  const router = useRouter();
  const [step, setStep] = useState<"qr" | "authorize" | "coordinates" | "verify" | "success">("qr");
  const [coords, setCoords] = useState<string[]>([]);
  const [verificationIndices, setVerificationIndices] = useState<number[]>([]);
  const [userInputs, setUserInputs] = useState<{ [key: number]: string }>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const words = ["Alpha", "Zenith", "Quantum", "Vortex", "Cipher", "Aegis", "Flux", "Nexus", "Titan", "Solar", "Logic", "Pulse", "Orbit", "Echo", "Grid"];
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setCoords(shuffled);

    const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .sort((a, b) => a - b);
    setVerificationIndices(indices);
  }, []);

  const handleVerify = () => {
    const allCorrect = verificationIndices.every(
      (index) => userInputs[index]?.toLowerCase() === coords[index].toLowerCase()
    );
    if (allCorrect) {
      setStep("success");
      setTimeout(() => router.push("/dashboard"), 2000);
    } else {
      alert("Some words don't match. Please check your notes.");
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-[80vh] w-full flex items-center justify-center p-6 bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E6F379] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-500 text-sm">Loading secure environment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center p-6 bg-black">
      <AnimatePresence mode="wait">
        
        {/* STEP 1: QR SYNC */}
        {step === "qr" && (
          <motion.div key="qr" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center space-y-8 max-w-md">
            <div className="bg-white p-4 rounded-[2rem] inline-block shadow-[0_0_50px_rgba(255,255,255,0.1)]">
              {/* Simulación de QR Pro */}
              <div className="w-64 h-64 bg-black rounded-xl flex items-center justify-center border-8 border-black">
                <div className="grid grid-cols-4 gap-2 opacity-80">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className={`w-8 h-8 ${i % 3 === 0 ? 'bg-[#E6F379]' : 'bg-white'} rounded-sm`} />
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-[1000] tracking-tighter uppercase italic">Scan to Sync_</h2>
              <p className="text-zinc-500 text-xs font-bold uppercase">Open Zelloh App to link your X profile</p>
              <button onClick={() => setStep("authorize")} className="flex items-center gap-3 bg-zinc-900 mx-auto px-8 py-4 rounded-2xl hover:bg-zinc-800 transition-all">
                <FiSmartphone className="text-[#E6F379]" />
                <span className="font-black text-xs uppercase italic">Sync Manually</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: AUTHORIZE X */}
        {step === "authorize" && (
          <motion.div key="auth" initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-zinc-950 border border-white/10 p-12 rounded-[3rem] text-center space-y-8 max-w-lg shadow-2xl">
            <RiTwitterXFill size={60} className="mx-auto text-white" />
            <h2 className="text-2xl font-black uppercase italic">Authorize Zelloh to <br/> access your X account?</h2>
            <div className="space-y-3">
              <button onClick={() => setStep("coordinates")} className="w-full bg-white text-black py-5 rounded-2xl font-[1000] uppercase italic hover:bg-[#E6F379] transition-colors">
                Authorize App
              </button>
              <button onClick={() => setStep("qr")} className="w-full text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Cancel</button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: COORDINATES */}
        {step === "coordinates" && (
          <motion.div key="coords" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-5xl space-y-10">
            <div className="text-center">
              <h2 className="text-5xl font-[1000] tracking-tighter uppercase italic mb-2">Your Security Coords_</h2>
              <p className="text-[#E6F379] font-black uppercase text-[10px] tracking-[0.3em]">Save them now or lose access forever</p>
            </div>
            <div className="bg-[#E6F379] rounded-[3.5rem] p-12 grid grid-cols-3 md:grid-cols-5 gap-8">
              {coords.map((word, i) => (
                <div key={i} className="text-center border-b border-black/10 pb-2">
                  <span className="text-[9px] font-black text-black/40 block">{(i+1).toString().padStart(2, '0')}</span>
                  <p className="text-xl font-[1000] text-black uppercase italic">{word}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-6 py-3 rounded-xl">
                <FiAlertTriangle className="text-red-500" />
                <span className="text-[10px] font-black text-red-500 uppercase">Do not share these words with anyone</span>
              </div>
              <button onClick={() => setStep("verify")} className="bg-white text-black px-16 py-6 rounded-full font-[1000] uppercase italic text-xl hover:scale-105 transition-all">
                Yes, I have save it
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: VERIFICATION EXAM */}
        {step === "verify" && (
          <motion.div key="verify" className="w-full max-w-2xl bg-zinc-950 border border-white/5 p-16 rounded-[4rem] space-y-10">
            <div className="text-center space-y-2">
              <FiShield size={40} className="mx-auto text-[#E6F379] mb-4" />
              <h2 className="text-3xl font-[1000] tracking-tighter uppercase italic">Security Check_</h2>
              <p className="text-zinc-500 text-xs font-bold uppercase">Enter the requested words to verify your backup</p>
            </div>

            <div className="space-y-6">
              {verificationIndices.map((index) => (
                <div key={index} className="flex items-center gap-6 bg-black p-4 rounded-2xl border border-zinc-800 focus-within:border-[#E6F379] transition-all">
                  <span className="w-12 text-[#E6F379] font-black italic">#{index + 1}</span>
                  <input 
                    type="text"
                    placeholder="Type word..."
                    className="bg-transparent w-full outline-none font-bold uppercase italic tracking-tighter text-xl text-white placeholder:text-zinc-800"
                    onChange={(e) => setUserInputs({...userInputs, [index]: e.target.value})}
                  />
                </div>
              ))}
            </div>

            <button onClick={handleVerify} className="w-full bg-[#E6F379] text-black py-6 rounded-2xl font-[1000] uppercase italic text-xl hover:shadow-[0_0_30px_rgba(230,243,121,0.3)] transition-all">
              Verify & Complete
            </button>
          </motion.div>
        )}

        {/* STEP 5: SUCCESS REDIRECT */}
        {step === "success" && (
          <motion.div key="success" className="text-center space-y-6">
            <div className="w-24 h-24 bg-[#E6F379] rounded-full mx-auto flex items-center justify-center text-black">
              <FiCheck size={48} strokeWidth={3} className="animate-bounce" />
            </div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Access Granted_</h2>
            <p className="text-zinc-500 uppercase text-[10px] font-black tracking-[0.4em] animate-pulse">Entering Dashboard...</p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// ✅ SOLO ESTAS DOS LÍNEAS AL FINAL (ELIMINA LAS DEL PRINCIPIO)
export const dynamic = 'force-dynamic';
export const runtime = 'edge';