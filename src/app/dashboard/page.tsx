"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiCopy, FiCheck, FiPlus, FiTrendingUp, 
  FiArrowUpRight, FiSearch, FiFilter 
} from "react-icons/fi";

interface Asset {
  id: number;
  name: string;
  symbol: string;
  balance: number;
  valueUsd: number;
  change: number;
}

export default function DashboardHome() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState("");
  const [balanceVisible, setBalanceVisible] = useState(true);
  
  // ESTADO PARA LA VERIFICACIÓN
  const [isVerified, setIsVerified] = useState(false);

  // ESTADO PARA EL USUARIO REAL
  const [user, setUser] = useState({
    fullName: "Guest User",
    birthYear: "2024"
  });

  useEffect(() => {
    setMounted(true);
    
    // 1. CARGAR DATOS DEL REGISTRO
    const savedUser = localStorage.getItem("zelloh_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // 2. COMPROBAR SI COMPRÓ LA VERIFICACIÓN
    const verifiedStatus = localStorage.getItem("zelloh_verified");
    if (verifiedStatus === "true") {
      setIsVerified(true);
    }
  }, []);

  // LÓGICA DINÁMICA: Toma los datos guardados en el registro
  const referralCode = useMemo(() => {
    const names = user.fullName.split(" ");
    const initials = names
      .filter(n => n.length > 0)
      .map(name => name[0].toLowerCase())
      .join("")
      .substring(0, 6);
    
    return `zelloh.me/${initials}${user.birthYear}`;
  }, [user]);

  const [assets] = useState<Asset[]>([
    { id: 1, name: "Zelloh Coin", symbol: "ZLL", balance: 1250.50, valueUsd: 3126.25, change: 12.5 },
    { id: 2, name: "Ethereum", symbol: "ETH", balance: 1.24, valueUsd: 2850.10, change: -2.4 },
    { id: 3, name: "USD Coin", symbol: "USDC", balance: 500.00, valueUsd: 500.00, change: 0.01 },
  ]);

  const filteredAssets = useMemo(() => {
    return assets.filter(a => 
      a.name.toLowerCase().includes(search.toLowerCase()) || 
      a.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, assets]);

  const totalBalance = useMemo(() => 
    assets.reduce((acc, curr) => acc + curr.valueUsd, 0), [assets]
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null; 

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-20 p-4 md:p-8">
      
      {/* SALUDO DINÁMICO + BADGE DE VERIFICACIÓN */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-[1000] uppercase italic tracking-tighter text-white">
            Bienvenido, {user.fullName.split(" ")[0]}_
          </h1>
          
          {/* BADGE AMARILLO TIPO TWITTER/INSTAGRAM (SOLO SI COMPRÓ) */}
          {isVerified && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-yellow-400 p-1 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.4)]"
              title="Perfil Verificado por Zelloh"
            >
              <FiCheck size={14} className="text-black" strokeWidth={5} />
            </motion.div>
          )}
        </div>
        {isVerified && (
          <p className="text-[#E6F379] text-[8px] font-black uppercase tracking-[0.3em] mt-1">
            Zelloh Pro Member
          </p>
        )}
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#E6F379] p-10 rounded-[3rem] text-black flex flex-col justify-between min-h-[280px] shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-60">Total Portfolio Value</p>
                <h2 className="text-6xl md:text-7xl font-[1000] tracking-tighter tabular-nums">
                  {balanceVisible ? formatCurrency(totalBalance) : "••••••"}
                </h2>
              </div>
              <button 
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="bg-black/10 px-4 py-2 rounded-xl hover:bg-black/20 transition-colors text-[10px] font-black uppercase"
              >
                {balanceVisible ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>
          
          <div className="flex gap-4 relative z-10">
            <button className="bg-black text-white px-8 py-4 rounded-2xl font-black uppercase text-xs flex items-center gap-2 hover:scale-105 transition-transform">
              <FiPlus /> Add Liquidity
            </button>
            <button className="bg-white/30 backdrop-blur-md border border-black/10 px-8 py-4 rounded-2xl font-black uppercase text-xs flex items-center gap-2 hover:bg-white/50 transition-colors">
              Withdraw
            </button>
          </div>
        </div>

        {/* CARD REFERRAL */}
        <div className="bg-zinc-900 p-8 rounded-[3rem] border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#E6F379] rounded-xl flex items-center justify-center text-black shadow-[0_0_15px_rgba(230,243,121,0.3)]">
                <FiTrendingUp />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tighter text-white">Refer & Earn</h3>
            </div>
            <p className="text-zinc-500 text-[10px] font-bold uppercase leading-tight mb-6">
              ID ASOCIADO: <span className="text-white">{user.fullName.toUpperCase()}</span><br/>
              Gana 5% por cada nodo activado con tu link.
            </p>
          </div>

          <div className="space-y-3">
            <div className="bg-black border border-zinc-800 p-4 rounded-2xl flex items-center justify-between">
              <code className="text-[#E6F379] text-sm font-black italic truncate">{referralCode}</code>
              <button onClick={handleCopy} className="text-zinc-400 hover:text-white transition-colors">
                {copied ? <FiCheck className="text-[#E6F379]" /> : <FiCopy />}
              </button>
            </div>
            <button 
              onClick={handleCopy}
              className={`w-full py-4 rounded-2xl font-[1000] uppercase text-[10px] tracking-widest transition-all ${copied ? 'bg-[#E6F379] text-black scale-95' : 'bg-white text-black hover:bg-zinc-200'}`}
            >
              {copied ? "Link_Copiado!" : "Copiar_Invitación"}
            </button>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE ASSETS */}
      <section className="bg-zinc-950 border border-zinc-900 rounded-[3.5rem] p-8 md:p-12 shadow-2xl">
        <div className="flex flex-col md:row md:items-center justify-between gap-6 mb-12">
          <h3 className="text-2xl font-black uppercase tracking-tighter italic text-white">Network_Assets_</h3>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#E6F379] transition-colors" />
              <input 
                type="text"
                placeholder="BUSCAR ACTIVO..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-black border border-zinc-800 rounded-2xl py-3 pl-12 pr-6 text-xs font-black focus:outline-none focus:border-[#E6F379] transition-all w-full md:w-64 text-white uppercase"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-6 pb-4">Asset</th>
                <th className="px-6 pb-4">Balance</th>
                <th className="px-6 pb-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="group bg-zinc-900/30 hover:bg-zinc-900/60 transition-all">
                  <td className="px-6 py-6 rounded-l-3xl border-y border-l border-zinc-900">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-black border border-zinc-800 rounded-full flex items-center justify-center font-black text-[#E6F379] text-xs">
                        {asset.symbol}
                      </div>
                      <p className="font-black uppercase text-sm text-white">{asset.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-6 border-y border-zinc-900 font-black text-white tabular-nums">
                    {asset.balance} <span className="text-zinc-500 text-[10px]">{asset.symbol}</span>
                  </td>
                  <td className="px-6 py-6 rounded-r-3xl border-y border-r border-zinc-900 text-right">
                    <button className="p-3 bg-white/5 rounded-xl hover:bg-[#E6F379] hover:text-black transition-all group">
                      <FiArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}