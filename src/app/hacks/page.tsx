"use client";
import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiSearch, FiTarget, FiZap, FiActivity, FiArrowLeft, FiX, FiLock, FiGlobe, FiChevronRight, FiCheck, FiCopy, FiMail, FiAlertCircle } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';

// API Base URL - cambiar según tu entorno
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Definimos la estructura de continentes y países
const WORLD_DATA = [
  {
    continent: "GLOBAL",
    continentId: "global",
    flag: "🌍",
    countries: [
      { id: "global-all", name: "TODOS LOS PAÍSES", flag: "🌍", description: "Promociones internacionales" }
    ]
  },
  {
    continent: "EUROPA",
    continentId: "europe",
    flag: "🇪🇺",
    countries: [
      { id: "europe-all", name: "TODA EUROPA", flag: "🇪🇺", description: "Promociones válidas en toda Europa" },
      { id: "spain", name: "ESPAÑA", flag: "🇪🇸", description: "Ofertas exclusivas para España" },
      { id: "uk", name: "REINO UNIDO", flag: "🇬🇧", description: "Deals for UK members" },
      { id: "france", name: "FRANCIA", flag: "🇫🇷", description: "Offres spéciales France" },
      { id: "germany", name: "ALEMANIA", flag: "🇩🇪", description: "Angebote für Deutschland" },
      { id: "italy", name: "ITALIA", flag: "🇮🇹", description: "Offerte speciali Italia" },
      { id: "portugal", name: "PORTUGAL", flag: "🇵🇹", description: "Promoções em Portugal" },
    ]
  },
  {
    continent: "AMÉRICA",
    continentId: "america",
    flag: "🌎",
    countries: [
      { id: "america-all", name: "TODA AMÉRICA", flag: "🌎", description: "Promociones para todo el continente americano" },
      { id: "usa", name: "EE.UU.", flag: "🇺🇸", description: "US exclusive deals" },
      { id: "canada", name: "CANADÁ", flag: "🇨🇦", description: "Canadian special offers" },
      { id: "mexico", name: "MÉXICO", flag: "🇲🇽", description: "Ofertas exclusivas México" },
      { id: "brazil", name: "BRASIL", flag: "🇧🇷", description: "Ofertas exclusivas Brasil" },
      { id: "argentina", name: "ARGENTINA", flag: "🇦🇷", description: "Promociones en Argentina" },
      { id: "colombia", name: "COLOMBIA", flag: "🇨🇴", description: "Ofertas en Colombia" },
      { id: "chile", name: "CHILE", flag: "🇨🇱", description: "Promociones en Chile" },
    ]
  },
  {
    continent: "ASIA",
    continentId: "asia",
    flag: "🌏",
    countries: [
      { id: "asia-all", name: "TODA ASIA", flag: "🌏", description: "Promociones para toda Asia" },
      { id: "japan", name: "JAPÓN", flag: "🇯🇵", description: "日本の特別オファー" },
      { id: "china", name: "CHINA", flag: "🇨🇳", description: "中国特别优惠" },
      { id: "korea", name: "COREA", flag: "🇰🇷", description: "한국 특별 혜택" },
      { id: "india", name: "INDIA", flag: "🇮🇳", description: "Indian special offers" },
    ]
  },
  {
    continent: "ÁFRICA",
    continentId: "africa",
    flag: "🌍",
    countries: [
      { id: "africa-all", name: "TODA ÁFRICA", flag: "🌍", description: "Promociones para toda África" },
      { id: "south-africa", name: "SUDÁFRICA", flag: "🇿🇦", description: "South African deals" },
      { id: "nigeria", name: "NIGERIA", flag: "🇳🇬", description: "Nigerian special offers" },
    ]
  },
  {
    continent: "OCEANÍA",
    continentId: "oceania",
    flag: "🌏",
    countries: [
      { id: "oceania-all", name: "TODA OCEANÍA", flag: "🌏", description: "Promociones para toda Oceanía" },
      { id: "australia", name: "AUSTRALIA", flag: "🇦🇺", description: "Australian exclusive deals" },
      { id: "new-zealand", name: "NUEVA ZELANDA", flag: "🇳🇿", description: "New Zealand specials" },
    ]
  },
];

interface Hack {
  id: string;
  name: string;
  offer: string;
  type: string;
  category: string;
  special?: boolean;
  logo: string;
  promoCode: string;
  description: string;
  region: string;
  regionName: string;
  continentId: string;
  continentName: string;
  global?: boolean;
}

const HACKS: Hack[] = [
  // GLOBAL
  { 
    id: "tesla-global", 
    name: "TESLA", 
    offer: "FREE_VOLT", 
    type: "ENERGY", 
    category: "MOBILITY", 
    logo: "tesla-logo.svg", 
    promoCode: "TESLAGLOBAL", 
    description: "Carga gratuita en superchargers a nivel global.",
    region: "global-all",
    regionName: "GLOBAL",
    continentId: "global",
    continentName: "GLOBAL",
    global: true
  },
  { 
    id: "spotify-global", 
    name: "SPOTIFY", 
    offer: "3 MONTHS FREE", 
    type: "STREAMING", 
    category: "ENTERTAINMENT", 
    logo: "spotify-logo.svg", 
    promoCode: "SPOTIFYFREE3", 
    description: "3 meses gratis de Premium en cualquier país.",
    region: "global-all",
    regionName: "GLOBAL",
    continentId: "global",
    continentName: "GLOBAL",
    global: true
  },

  // EUROPA - TODA EUROPA
  { 
    id: "decathlon-eu-all", 
    name: "DECATHLON", 
    offer: "20% YIELD", 
    type: "PERFORMANCE", 
    category: "EQUIPMENT", 
    special: true, 
    logo: "decathlon-logo.svg", 
    promoCode: "DECATHEU20", 
    description: "Válido en todas las tiendas Decathlon de Europa.",
    region: "europe-all",
    regionName: "TODA EUROPA",
    continentId: "europe",
    continentName: "EUROPA"
  },

  // EUROPA - ESPAÑA
  { 
    id: "tenis-es", 
    name: "CLUB TENIS", 
    offer: "10% ACCESS", 
    type: "ELITE", 
    category: "SPORT", 
    logo: "tsc-logo.svg", 
    promoCode: "TENISESP10", 
    description: "Acceso preferente a pistas y torneos nacionales en España.",
    region: "spain",
    regionName: "ESPAÑA",
    continentId: "europe",
    continentName: "EUROPA"
  },
  { 
    id: "leroy-es", 
    name: "LEROY MERLIN", 
    offer: "30% CREDIT", 
    type: "LIFESTYLE", 
    category: "HOME", 
    logo: "leroy-logo.svg", 
    promoCode: "LEROYZELLOH30", 
    description: "Crédito acumulable para compras de hogar en tiendas españolas.",
    region: "spain",
    regionName: "ESPAÑA",
    continentId: "europe",
    continentName: "EUROPA"
  },

  // EUROPA - REINO UNIDO
  { 
    id: "boxing-uk", 
    name: "FIT BOXING", 
    offer: "50% REBATE", 
    type: "COMBAT", 
    category: "WELLNESS", 
    logo: "brooklyn-logo.svg", 
    promoCode: "BROOKLYN50UK", 
    description: "Descuento directo en gimnasios seleccionados de Reino Unido.",
    region: "uk",
    regionName: "REINO UNIDO",
    continentId: "europe",
    continentName: "EUROPA"
  },

  // EUROPA - FRANCIA
  { 
    id: "decathlon-fr", 
    name: "DECATHLON FR", 
    offer: "25% YIELD", 
    type: "PERFORMANCE", 
    category: "EQUIPMENT", 
    special: true, 
    logo: "decathlon-logo.svg", 
    promoCode: "DECATHFR25", 
    description: "Offre spéciale pour les membres Zelloh en France.",
    region: "france",
    regionName: "FRANCIA",
    continentId: "europe",
    continentName: "EUROPA"
  },

  // EUROPA - ALEMANIA
  { 
    id: "adidas-de", 
    name: "ADIDAS DE", 
    offer: "30% CASH", 
    type: "GEAR", 
    category: "APPAREL", 
    logo: "adidas-logo.svg", 
    promoCode: "ADIGERMAN30", 
    description: "Exklusives Angebot für deutsche Kunden.",
    region: "germany",
    regionName: "ALEMANIA",
    continentId: "europe",
    continentName: "EUROPA"
  },

  // EUROPA - ITALIA
  { 
    id: "nike-it", 
    name: "NIKE IT", 
    offer: "25% CASH", 
    type: "SPEED", 
    category: "APPAREL", 
    logo: "nike-logo.svg", 
    promoCode: "NIKEITALY25", 
    description: "Offerta speciale per i membri italiani.",
    region: "italy",
    regionName: "ITALIA",
    continentId: "europe",
    continentName: "EUROPA"
  },

  // EUROPA - PORTUGAL
  { 
    id: "sportzone-pt", 
    name: "SPORT ZONE", 
    offer: "15% CASH", 
    type: "SPORTS", 
    category: "APPAREL", 
    logo: "sportzone-logo.svg", 
    promoCode: "SPORTZONE15", 
    description: "Desconto especial para membros Zelloh em Portugal.",
    region: "portugal",
    regionName: "PORTUGAL",
    continentId: "europe",
    continentName: "EUROPA"
  },

  // AMÉRICA - TODA AMÉRICA
  { 
    id: "nike-america", 
    name: "NIKE", 
    offer: "20% CASH", 
    type: "SPEED", 
    category: "APPAREL", 
    logo: "nike-logo.svg", 
    promoCode: "NIKEMERICA20", 
    description: "Válido en todas las tiendas Nike de América.",
    region: "america-all",
    regionName: "TODA AMÉRICA",
    continentId: "america",
    continentName: "AMÉRICA"
  },

  // AMÉRICA - USA
  { 
    id: "apple-us", 
    name: "APPLE ST.", 
    offer: "15% REFUND", 
    type: "SYSTEM", 
    category: "TECH", 
    logo: "apple-logo.svg", 
    promoCode: "APPLEZELL15", 
    description: "Reembolso directo en Apple Stores de EE.UU.",
    region: "usa",
    regionName: "EE.UU.",
    continentId: "america",
    continentName: "AMÉRICA"
  },
  { 
    id: "tesla-us", 
    name: "TESLA", 
    offer: "FREE_VOLT", 
    type: "ENERGY", 
    category: "MOBILITY", 
    logo: "tesla-logo.svg", 
    promoCode: "TESLAVOLTZ", 
    description: "Carga gratuita en superchargers de Estados Unidos.",
    region: "usa",
    regionName: "EE.UU.",
    continentId: "america",
    continentName: "AMÉRICA"
  },

  // AMÉRICA - CANADÁ
  { 
    id: "lululemon-ca", 
    name: "LULULEMON", 
    offer: "20% OFF", 
    type: "ACTIVE", 
    category: "APPAREL", 
    logo: "lululemon-logo.svg", 
    promoCode: "LULUCA20", 
    description: "Special discount for Canadian members.",
    region: "canada",
    regionName: "CANADÁ",
    continentId: "america",
    continentName: "AMÉRICA"
  },

  // AMÉRICA - MÉXICO
  { 
    id: "decathlon-mx", 
    name: "DECATHLON", 
    offer: "15% YIELD", 
    type: "PERFORMANCE", 
    category: "EQUIPMENT", 
    logo: "decathlon-logo.svg", 
    promoCode: "DECAMX15", 
    description: "Válido en tiendas Decathlon de México.",
    region: "mexico",
    regionName: "MÉXICO",
    continentId: "america",
    continentName: "AMÉRICA"
  },

  // AMÉRICA - BRASIL
  { 
    id: "centauro-br", 
    name: "CENTAURO", 
    offer: "20% CASH", 
    type: "SPORTS", 
    category: "APPAREL", 
    logo: "centauro-logo.svg", 
    promoCode: "CENTAURO20", 
    description: "Ofertas exclusivas para membros brasileiros.",
    region: "brazil",
    regionName: "BRASIL",
    continentId: "america",
    continentName: "AMÉRICA"
  },

  // AMÉRICA - ARGENTINA
  { 
    id: "dexter-ar", 
    name: "DEXTER", 
    offer: "25% CASH", 
    type: "SPORTS", 
    category: "APPAREL", 
    logo: "dexter-logo.svg", 
    promoCode: "DEXTERAR25", 
    description: "Descuentos en artículos deportivos en Argentina.",
    region: "argentina",
    regionName: "ARGENTINA",
    continentId: "america",
    continentName: "AMÉRICA"
  },

  // ASIA - TODA ASIA
  { 
    id: "adidas-asia", 
    name: "ADIDAS", 
    offer: "20% YIELD", 
    type: "GEAR", 
    category: "APPAREL", 
    logo: "adidas-logo.svg", 
    promoCode: "ADIASIA20", 
    description: "Promoción exclusiva para mercados asiáticos.",
    region: "asia-all",
    regionName: "TODA ASIA",
    continentId: "asia",
    continentName: "ASIA"
  },

  // ASIA - JAPÓN
  { 
    id: "uniqlo-jp", 
    name: "UNIQLO", 
    offer: "20% CASH", 
    type: "LIFESTYLE", 
    category: "APPAREL", 
    logo: "uniqlo-logo.svg", 
    promoCode: "UNIQLOJP20", 
    description: "日本限定の特別オファー",
    region: "japan",
    regionName: "JAPÓN",
    continentId: "asia",
    continentName: "ASIA"
  },

  // ASIA - CHINA
  { 
    id: "li-ning-cn", 
    name: "LI-NING", 
    offer: "30% CASH", 
    type: "SPORTS", 
    category: "APPAREL", 
    logo: "lining-logo.svg", 
    promoCode: "LININGCN30", 
    description: "中国特别优惠",
    region: "china",
    regionName: "CHINA",
    continentId: "asia",
    continentName: "ASIA"
  },

  // ASIA - COREA
  { 
    id: "fila-kr", 
    name: "FILA", 
    offer: "25% CASH", 
    type: "LIFESTYLE", 
    category: "APPAREL", 
    logo: "fila-logo.svg", 
    promoCode: "FILAKR25", 
    description: "한국 특별 혜택",
    region: "korea",
    regionName: "COREA",
    continentId: "asia",
    continentName: "ASIA"
  },

  // ASIA - INDIA
  { 
    id: "hrx-in", 
    name: "HRX", 
    offer: "20% CASH", 
    type: "ACTIVE", 
    category: "APPAREL", 
    logo: "hrx-logo.svg", 
    promoCode: "HRXIN20", 
    description: "Exclusive offers for Indian members.",
    region: "india",
    regionName: "INDIA",
    continentId: "asia",
    continentName: "ASIA"
  },

  // ÁFRICA - TODA ÁFRICA
  { 
    id: "mtn-africa", 
    name: "MTN", 
    offer: "15% CASH", 
    type: "TELCO", 
    category: "SERVICES", 
    logo: "mtn-logo.svg", 
    promoCode: "MTNAFRICA15", 
    description: "Promociones para toda África.",
    region: "africa-all",
    regionName: "TODA ÁFRICA",
    continentId: "africa",
    continentName: "ÁFRICA"
  },

  // ÁFRICA - SUDÁFRICA
  { 
    id: "mrprice-za", 
    name: "MR PRICE", 
    offer: "20% CASH", 
    type: "FASHION", 
    category: "APPAREL", 
    logo: "mrprice-logo.svg", 
    promoCode: "MRPRICEZA20", 
    description: "South African exclusive fashion deals.",
    region: "south-africa",
    regionName: "SUDÁFRICA",
    continentId: "africa",
    continentName: "ÁFRICA"
  },

  // OCEANÍA - TODA OCEANÍA
  { 
    id: "canterbury-oceania", 
    name: "CANTERBURY", 
    offer: "20% CASH", 
    type: "RUGBY", 
    category: "APPAREL", 
    logo: "canterbury-logo.svg", 
    promoCode: "CANTERBURY20", 
    description: "Rugby gear discounts across Oceania.",
    region: "oceania-all",
    regionName: "TODA OCEANÍA",
    continentId: "oceania",
    continentName: "OCEANÍA"
  },

  // OCEANÍA - AUSTRALIA
  { 
    id: "rebel-au", 
    name: "REBEL", 
    offer: "15% CASH", 
    type: "SPORTS", 
    category: "EQUIPMENT", 
    logo: "rebel-logo.svg", 
    promoCode: "REBELAU15", 
    description: "Australian sports equipment discounts.",
    region: "australia",
    regionName: "AUSTRALIA",
    continentId: "oceania",
    continentName: "OCEANÍA"
  },
];

export default function HacksSuperSayayinPage() {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const [selectedHack, setSelectedHack] = useState<Hack | null>(null);
  const [selectedContinent, setSelectedContinent] = useState<string>("global");
  const [selectedCountry, setSelectedCountry] = useState<string>("global-all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estados para el flujo de verificación
  const [verificationStep, setVerificationStep] = useState<'phone' | 'otp' | 'code' | 'error' | 'register'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [unlockedCode, setUnlockedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Obtener los países del continente seleccionado
  const currentContinent = WORLD_DATA.find(c => c.continentId === selectedContinent);
  const availableCountries = currentContinent?.countries || [];

  // Filtrar hacks por país seleccionado y búsqueda
  const filteredHacks = HACKS.filter(hack => {
    const matchesCountry = selectedCountry === "global-all" ? true : hack.region === selectedCountry;
    const matchesSearch = hack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hack.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hack.regionName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  // Función para verificar si el número existe en la base de datos
  const checkUserExists = async (phone: string) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      
      // Llamada a la API para verificar si el usuario existe
      const response = await axios.post(`${API_BASE_URL}/users/check`, {
        phoneNumber: phone
      });
      
      return response.data.exists;
    } catch (error) {
      console.error('Error checking user:', error);
      setErrorMessage('Error al verificar el número. Intenta de nuevo.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para enviar OTP
  const handleSendOTP = async () => {
    if (!phoneNumber) return;
    
    const userExists = await checkUserExists(phoneNumber);
    
    if (userExists) {
      try {
        setIsLoading(true);
        // Aquí iría la llamada real para enviar OTP
        await axios.post(`${API_BASE_URL}/auth/send-otp`, {
          phoneNumber: phoneNumber
        });
        setVerificationStep('otp');
      } catch (error) {
        console.error('Error sending OTP:', error);
        setErrorMessage('Error al enviar el código. Intenta de nuevo.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Usuario no existe - mostrar opción de registro
      setVerificationStep('register');
    }
  };

  // Función para verificar OTP
  const handleVerifyOTP = async () => {
    if (otpCode.length !== 6) return;
    
    try {
      setIsLoading(true);
      // Verificar OTP
      const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
        phoneNumber: phoneNumber,
        otp: otpCode
      });
      
      if (response.data.valid && selectedHack) {
        // OTP válido - mostrar código
        setUnlockedCode(selectedHack.promoCode);
        setVerificationStep('code');
        
        // Opcional: registrar el uso del código
        await axios.post(`${API_BASE_URL}/hacks/use`, {
          hackId: selectedHack.id,
          phoneNumber: phoneNumber
        });
      } else {
        setErrorMessage('Código OTP incorrecto');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setErrorMessage('Error al verificar el código. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para reenviar OTP
  const handleResendOTP = async () => {
    try {
      setIsLoading(true);
      await axios.post(`${API_BASE_URL}/auth/send-otp`, {
        phoneNumber: phoneNumber
      });
      setErrorMessage('Código reenviado');
    } catch (error) {
      console.error('Error resending OTP:', error);
      setErrorMessage('Error al reenviar el código');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para copiar código
  const handleCopyCode = () => {
    navigator.clipboard.writeText(unlockedCode);
    setShowSuccessPopup(true);
    
    // Ocultar popup después de 3 segundos
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };

  // Función para cerrar todo
  const handleCloseAll = () => {
    setSelectedHack(null);
    setVerificationStep('phone');
    setPhoneNumber('');
    setOtpCode('');
    setUnlockedCode('');
    setShowSuccessPopup(false);
    setErrorMessage('');
  };

  return (
    <main className="bg-black text-white min-h-screen font-sans selection:bg-[#E6F379] selection:text-black overflow-x-hidden">
      <Header />

      {/* ATMÓSFERA AMBIENTE */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60%] h-[70%] bg-[#E6F379]/[0.05] blur-[150px] rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-[40%] h-[50%] bg-white/[0.02] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 pt-40 pb-20 min-h-screen">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <Link href="/">
              <motion.div whileHover={{ x: 10 }} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-[#E6F379] mb-8 cursor-pointer">
                <FiArrowLeft /> BACK_TO_SYSTEM
              </motion.div>
            </Link>
            <h1 className="text-[10vw] md:text-[8vw] font-[1000] leading-[0.8] tracking-[-0.05em] uppercase italic italic-mask">
              ACTIVE<br /><span className="text-zinc-900">_HACKS</span>
            </h1>
          </div>
        </div>

        {/* FILTROS */}
        <div className="mb-16 space-y-8">
          {/* Barra de búsqueda */}
          <div className="relative max-w-md">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600" size={20} />
            <input
              type="text"
              placeholder="BUSCAR HACKS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-5 pl-14 pr-6 text-sm font-medium text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#E6F379] transition-colors"
            />
          </div>

          {/* Fila de Continentes */}
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 flex items-center gap-2">
              <FiGlobe /> CONTINENTES
            </p>
            <div className="flex flex-wrap gap-3">
              {WORLD_DATA.map((continent) => (
                <motion.button
                  key={continent.continentId}
                  onClick={() => {
                    setSelectedContinent(continent.continentId);
                    const firstCountry = continent.countries[0]?.id || "global-all";
                    setSelectedCountry(firstCountry);
                  }}
                  whileHover={{ y: -2 }}
                  className={`px-6 py-4 rounded-2xl border text-sm font-black uppercase tracking-wider transition-all flex items-center gap-3
                    ${selectedContinent === continent.continentId 
                      ? 'bg-[#E6F379] border-[#E6F379] text-black' 
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600'
                    }`}
                >
                  <span className="text-xl">{continent.flag}</span>
                  {continent.continent}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Fila de Países */}
          {selectedContinent !== "global" && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 flex items-center gap-2">
                <FiChevronRight /> PAÍSES / REGIONES
              </p>
              <div className="flex flex-wrap gap-3">
                {availableCountries.map((country) => (
                  <motion.button
                    key={country.id}
                    onClick={() => setSelectedCountry(country.id)}
                    whileHover={{ y: -2 }}
                    className={`px-5 py-3 rounded-xl border text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2
                      ${selectedCountry === country.id 
                        ? 'bg-[#E6F379] border-[#E6F379] text-black' 
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600'
                      }`}
                  >
                    <span className="text-base">{country.flag}</span>
                    {country.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Contador de resultados */}
          <motion.div 
            key={selectedCountry}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-bold text-zinc-600 bg-zinc-950/50 px-4 py-2 rounded-full inline-block border border-zinc-800"
          >
            {filteredHacks.length} HACKS DISPONIBLES • {currentContinent?.countries.find(c => c.id === selectedCountry)?.name || 'GLOBAL'}
          </motion.div>
        </div>

        {/* CARDS GRID */}
        {filteredHacks.length > 0 ? (
          <motion.div 
            key={selectedCountry}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredHacks.map((hack) => (
              <motion.div
                key={hack.id}
                onClick={() => setSelectedHack(hack)}
                onMouseEnter={() => setHoveredIndex(hack.id)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="relative group h-[480px] bg-zinc-950 border border-zinc-800 rounded-[2.5rem] p-8 flex flex-col transition-all duration-500 overflow-hidden cursor-pointer"
              >
                {/* Efecto de glow */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] transition-opacity duration-500 ${hoveredIndex === hack.id ? 'opacity-40' : 'opacity-10'} ${hack.special ? 'bg-[#E6F379]' : 'bg-white'}`} />

                {/* HEADER DE LA CARD */}
                <div className="relative z-10 flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-3 shadow-xl transform group-hover:rotate-6 transition-transform">
                    <div className="relative w-full h-full">
                      <Image src={`/assets/${hack.logo}`} alt={hack.name} fill className="object-contain grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                  </div>
                  
                  {/* REGION TAG */}
                  <div className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-zinc-800">
                    <span className="text-sm">{WORLD_DATA.flatMap(c => c.countries).find(ct => ct.id === hack.region)?.flag || '🌍'}</span>
                    <span className="text-[8px] font-black text-zinc-400 tracking-wider">{hack.regionName}</span>
                    {hack.global && (
                      <span className="text-[8px] bg-[#E6F379] text-black px-2 py-0.5 rounded-full ml-1">GLOBAL</span>
                    )}
                  </div>
                </div>

                {/* CONTENIDO PRINCIPAL */}
                <div className="relative z-10 flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-2">
                    {hack.category} // {hack.type}
                  </p>
                  <h3 className="text-3xl font-black tracking-tighter uppercase italic leading-none mb-3">
                    {hack.name}
                  </h3>
                  
                  {/* OFERTA DESTACADA */}
                  <p className={`text-4xl font-[1000] italic leading-none tracking-tighter mb-4 ${hack.special ? 'text-[#E6F379]' : 'text-white'}`}>
                    {hack.offer}
                  </p>
                  
                  {/* DESCRIPCIÓN BREVE */}
                  <p className="text-xs text-zinc-500 line-clamp-2 mb-4">
                    {hack.description}
                  </p>
                </div>

                {/* BOTÓN ACCIÓN */}
                <div className="relative z-10 mt-auto">
                  <button className="w-full py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] group-hover:bg-[#E6F379] group-hover:text-black transition-all flex items-center justify-center gap-2">
                    <span>ACTIVATE_EXPLOIT</span>
                    <FiArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FiGlobe className="mx-auto text-6xl text-zinc-800 mb-4" />
            <p className="text-2xl font-black italic text-zinc-700">NO_HACKS_FOUND</p>
            <p className="text-zinc-600 mt-2">Intenta con otro país o búsqueda</p>
          </motion.div>
        )}
      </div>

      {/* MODAL DE VERIFICACIÓN */}
      <AnimatePresence>
        {selectedHack && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={handleCloseAll}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#111] border border-zinc-800 p-10 rounded-[3rem] max-w-lg w-full relative shadow-2xl overflow-hidden"
            >
              <button onClick={handleCloseAll} className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors">
                <FiX size={24} />
              </button>

              {/* Header del modal siempre visible */}
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center p-4">
                  <div className="relative w-full h-full">
                    <Image src={`/assets/${selectedHack.logo}`} alt={selectedHack.name} fill className="object-contain" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter">{selectedHack.name}</h3>
                  <p className="text-[#E6F379] font-black text-sm uppercase tracking-widest">{selectedHack.offer}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6 bg-zinc-900/80 px-4 py-2 rounded-full border border-zinc-800 inline-flex">
                <span className="text-base">{WORLD_DATA.flatMap(c => c.countries).find(ct => ct.id === selectedHack.region)?.flag || '🌍'}</span>
                <span className="text-xs font-bold text-zinc-400">{selectedHack.regionName}</span>
                {selectedHack.global && (
                  <span className="text-[8px] bg-[#E6F379] text-black px-2 py-0.5 rounded-full ml-2">GLOBAL</span>
                )}
              </div>

              <p className="text-zinc-400 font-medium mb-10 leading-relaxed">{selectedHack.description}</p>

              {/* Mensaje de error si existe */}
              {errorMessage && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-500">
                  <FiAlertCircle size={20} />
                  <span className="text-sm">{errorMessage}</span>
                </div>
              )}

              {/* FLUJO DE VERIFICACIÓN */}
              <AnimatePresence mode="wait">
                {verificationStep === 'phone' && (
                  <motion.div
                    key="phone"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">VERIFICA TU NÚMERO</p>
                    
                    <div className="space-y-4">
                      <PhoneInput
                        country={'es'}
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        inputClass="!bg-zinc-900 !border-zinc-800 !text-white !w-full !py-6 !px-14 !rounded-2xl"
                        buttonClass="!bg-zinc-900 !border-zinc-800 !rounded-l-2xl"
                        dropdownClass="!bg-zinc-900 !text-white"
                        containerClass="!w-full"
                      />
                      
                      <button
                        onClick={handleSendOTP}
                        disabled={!phoneNumber || isLoading}
                        className="w-full py-5 bg-[#E6F379] text-black rounded-2xl font-black uppercase italic tracking-widest text-sm hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            VERIFICANDO...
                          </>
                        ) : (
                          'ENVIAR CÓDIGO'
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {verificationStep === 'register' && (
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6 text-center"
                  >
                    <div className="w-20 h-20 mx-auto bg-zinc-900 rounded-full flex items-center justify-center">
                      <FiAlertCircle size={40} className="text-[#E6F379]" />
                    </div>
                    
                    <h4 className="text-2xl font-black uppercase">¡NO ERES CLIENTE ZELLOH!</h4>
                    
                    <p className="text-zinc-400">
                      Para desbloquear este código necesitas una tarjeta virtual Zelloh.
                      <span className="block mt-2 text-[#E6F379] font-bold">¡Es GRATIS!</span>
                    </p>

                    <div className="space-y-3">
                      <Link href="/auth/register" className="block">
                        <button className="w-full py-5 bg-[#E6F379] text-black rounded-2xl font-black uppercase italic tracking-widest text-sm hover:scale-[1.02] transition-transform">
                          OBTENER TARJETA GRATIS
                        </button>
                      </Link>
                      
                      <button
                        onClick={() => setVerificationStep('phone')}
                        className="w-full text-xs text-zinc-500 hover:text-[#E6F379] transition-colors"
                      >
                        ← INTENTAR OTRO NÚMERO
                      </button>
                    </div>
                  </motion.div>
                )}

                {verificationStep === 'otp' && (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">INGRESA EL CÓDIGO OTP</p>
                    <p className="text-xs text-zinc-500">Hemos enviado un código de verificación al {phoneNumber}</p>
                    
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="123456"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        maxLength={6}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-5 px-6 text-center text-2xl font-black tracking-[0.5em] text-white focus:outline-none focus:border-[#E6F379] transition-colors"
                      />
                      
                      <button
                        onClick={handleVerifyOTP}
                        disabled={otpCode.length !== 6 || isLoading}
                        className="w-full py-5 bg-[#E6F379] text-black rounded-2xl font-black uppercase italic tracking-widest text-sm hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            VERIFICANDO...
                          </>
                        ) : (
                          'VERIFICAR'
                        )}
                      </button>
                      
                      <button
                        onClick={handleResendOTP}
                        disabled={isLoading}
                        className="w-full text-xs text-zinc-500 hover:text-[#E6F379] transition-colors"
                      >
                        REENVIAR CÓDIGO
                      </button>
                      
                      <button
                        onClick={() => setVerificationStep('phone')}
                        className="w-full text-xs text-zinc-500 hover:text-[#E6F379] transition-colors"
                      >
                        ← CAMBIAR NÚMERO
                      </button>
                    </div>
                  </motion.div>
                )}

                {verificationStep === 'code' && (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">CÓDIGO DESBLOQUEADO</p>
                    
                    <div className="relative group">
                      <div className="bg-zinc-900 border-2 border-[#E6F379] p-6 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl font-black tracking-[0.2em] text-[#E6F379]">{unlockedCode}</span>
                      </div>
                      
                      <button
                        onClick={handleCopyCode}
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#E6F379] text-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-transform"
                      >
                        <FiCopy /> COPIAR CÓDIGO
                      </button>
                    </div>

                    <p className="text-xs text-zinc-500 text-center mt-8">
                      <FiMail className="inline mr-1" /> También lo enviamos a tu correo
                    </p>

                    <button
                      onClick={handleCloseAll}
                      className="w-full py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#E6F379] hover:text-black transition-all mt-4"
                    >
                      CERRAR
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* POPUP DE ÉXITO */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-[200] bg-[#E6F379] text-black p-6 rounded-2xl shadow-2xl max-w-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center">
                <FiCheck size={24} className="text-black" />
              </div>
              <div>
                <h4 className="font-black text-lg uppercase">¡CÓDIGO COPIADO!</h4>
                <p className="text-sm opacity-80">Revisa tu correo también lo recibirás</p>
              </div>
            </div>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="absolute top-2 right-2 text-black/50 hover:text-black"
            >
              <FiX size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <Footer />

      <style jsx>{`
        .italic-mask {
          background: linear-gradient(180deg, #fff 0%, #333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </main>
  );
}