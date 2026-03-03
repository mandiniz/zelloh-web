"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { FiSearch, FiArrowRight, FiTarget, FiX, FiLock, FiArrowLeft, FiChevronDown, FiCreditCard, FiCheck, FiAlertCircle } from "react-icons/fi";
import Image from "next/image";

// ==============================================
// CONFIGURACIÓN DE APIS
// ==============================================

const API_CONFIG = {
  IUCN_TOKEN: process.env.NEXT_PUBLIC_IUCN_TOKEN || '9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d9a7c3a6ac77d37d',
  CANDID_API_KEY: process.env.NEXT_PUBLIC_CANDID_API_KEY || 'demo_key',
  STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY || 'pk_test_demo',
};

// ==============================================
// TIPOS DE DATOS
// ==============================================

interface Species {
  id: string;
  name: string;
  scientificName: string;
  population: string;
  populationRaw: number;
  category: 'CR' | 'EN' | 'VU' | 'NT' | 'LC';
  status: string;
  emoji: string;
  image: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  lastAssessment: string;
}

interface NGO {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: 'animals' | 'planet' | 'people' | 'cause';
  verified: boolean;
  rating: number;
  mission: string;
  link: string;
  color: string;
}

interface DonationData {
  ngoId: string;
  amount: number;
  paymentMethod: string;
  donorInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

// ==============================================
// DATOS INICIALES (FALLBACK)
// ==============================================

const FALLBACK_SPECIES: Species[] = [
  {
    id: 'sunda-tiger',
    name: 'Sunda Tiger',
    scientificName: 'Panthera tigris sondaica',
    population: '400',
    populationRaw: 400,
    category: 'CR',
    status: 'Critically Endangered',
    emoji: '🐅',
    image: '/tiger.png',
    trend: 'decreasing',
    lastAssessment: '2024'
  },
  {
    id: 'black-rhino',
    name: 'Black Rhino',
    scientificName: 'Diceros bicornis',
    population: '5,500',
    populationRaw: 5500,
    category: 'CR',
    status: 'Critically Endangered',
    emoji: '🦏',
    image: '/rhino.png',
    trend: 'increasing',
    lastAssessment: '2024'
  }
];

const NGOS: NGO[] = [
  { id: 'wwf', name: 'WWF', logo: '/assets/wwf.svg', description: 'Protección de especies y hábitats', category: 'animals', verified: true, rating: 4.9, mission: 'Construir un futuro donde los humanos vivan en armonía con la naturaleza.', link: 'https://wwf.org', color: '#228B22' },
  { id: 'iucn', name: 'IUCN', logo: '/assets/iucn-logo.svg', description: 'Unión Internacional para la Conservación', category: 'animals', verified: true, rating: 4.8, mission: 'Influir, alentar y ayudar a las sociedades de todo el mundo a conservar la integridad y diversidad de la naturaleza.', link: 'https://iucn.org', color: '#2E8B57' },
  { id: 'peta', name: 'PETA', logo: '/assets/peta_logox.svg', description: 'Defensa de los derechos animales', category: 'animals', verified: true, rating: 4.5, mission: 'Defender los derechos de todos los animales.', link: 'https://peta.org', color: '#000000' },
  { id: 'nature-conservancy', name: 'The Nature Conservancy', logo: '/assets/the-nature-conservancy-logo.svg', description: 'Conservación de tierras y aguas', category: 'planet', verified: true, rating: 4.8, mission: 'Conservar las tierras y aguas de las que depende toda la vida.', link: 'https://nature.org', color: '#006400' },
  { id: 'unicef', name: 'UNICEF', logo: '/assets/logo-unicef.svg', description: 'Ayuda a la infancia', category: 'people', verified: true, rating: 4.9, mission: 'Salvar vidas, defender derechos y ayudar a los niños a alcanzar su potencial.', link: 'https://unicef.org', color: '#1C3664' },
  { id: 'save-children', name: 'Save the Children', logo: '/assets/save_the_children_logo.svg', description: 'Protección infantil', category: 'people', verified: true, rating: 4.7, mission: 'Asegurar que todos los niños tengan derecho a sobrevivir, aprender y estar protegidos.', link: 'https://savethechildren.org', color: '#E5243F' },
  { id: 'ocean-conservancy', name: 'Ocean Conservancy', logo: '/assets/ocean-conservancy-logo.svg', description: 'Protección de océanos', category: 'planet', verified: true, rating: 4.6, mission: 'Crear soluciones basadas en la ciencia para un océano saludable.', link: 'https://oceanconservancy.org', color: '#0077BE' },
  { id: 'red-cross', name: 'Red Cross', logo: '/assets/cruz-roja-logo.svg', description: 'Ayuda humanitaria', category: 'people', verified: true, rating: 4.9, mission: 'Prevenir y aliviar el sufrimiento humano en emergencias.', link: 'https://redcross.org', color: '#ED1B2E' },
  { id: 'greenpeace', name: 'Greenpeace', logo: '/assets/greenpeace-logo.svg', description: 'Activismo ambiental', category: 'planet', verified: true, rating: 4.7, mission: 'Proteger el medio ambiente mediante la acción directa y la presión política.', link: 'https://greenpeace.org', color: '#00A651' },
  { id: 'wcs', name: 'Wildlife Conservation Society', logo: '/assets/wildlife-conservation-society-logo.svg', description: 'Conservación de vida silvestre', category: 'animals', verified: true, rating: 4.8, mission: 'Salvar la vida silvestre y los lugares salvajes en todo el mundo.', link: 'https://wcs.org', color: '#0066B3' },
  { id: 'padi-aware', name: 'PADI AWARE', logo: '/assets/padi.svg', description: 'Protección de ecosistemas marinos', category: 'planet', verified: true, rating: 4.5, mission: 'Impulsar la conservación de los océanos a través de la comunidad de buceo.', link: 'https://padi.com/aware', color: '#00B3E6' },
  { id: 'oceana', name: 'Oceana', logo: '/assets/oceana-logo.svg', description: 'Protección de océanos', category: 'planet', verified: true, rating: 4.6, mission: 'Proteger y restaurar los océanos del mundo.', link: 'https://oceana.org', color: '#006994' },
];

// ==============================================
// SERVICIOS API
// ==============================================

const api = {
  getSpecies: async (): Promise<Species[]> => {
    try {
      const speciesList = ['Panthera tigris sondaica', 'Diceros bicornis'];
      const results = await Promise.all(
        speciesList.map(async (scientific) => {
          const response = await fetch(
            `https://apiv3.iucnredlist.org/api/v3/species/${scientific}?token=${API_CONFIG.IUCN_TOKEN}`
          );
          const data = await response.json();
          
          if (data.result && data.result.length > 0) {
            const species = data.result[0];
            const popResponse = await fetch(
              `https://apiv3.iucnredlist.org/api/v3/population/${species.taxonid}?token=${API_CONFIG.IUCN_TOKEN}`
            );
            const popData = await popResponse.json();
            
            return {
              id: species.taxonid.toString(),
              name: species.scientific_name === 'Panthera tigris sondaica' ? 'Sunda Tiger' : 'Black Rhino',
              scientificName: species.scientific_name,
              population: popData.result?.[0]?.population || (species.scientific_name === 'Panthera tigris sondaica' ? '400' : '5,500'),
              populationRaw: parseInt(popData.result?.[0]?.population?.replace(/,/g, '') || (species.scientific_name === 'Panthera tigris sondaica' ? '400' : '5500')),
              category: species.category,
              status: species.category === 'CR' ? 'Critically Endangered' : 
                     species.category === 'EN' ? 'Endangered' : 
                     species.category === 'VU' ? 'Vulnerable' : 'Other',
              emoji: species.scientific_name === 'Panthera tigris sondaica' ? '🐅' : '🦏',
              image: species.scientific_name === 'Panthera tigris sondaica' ? '/tiger.png' : '/rhino.png',
              trend: popData.result?.[0]?.trend || 'decreasing',
              lastAssessment: species.latest_assessment || '2024'
            };
          }
          return null;
        })
      );
      
      return results.filter(r => r !== null) as Species[];
    } catch (error) {
      console.error('Error fetching IUCN data:', error);
      return FALLBACK_SPECIES;
    }
  },

  getNGOsByCause: async (cause: string): Promise<NGO[]> => {
    try {
      return NGOS.filter(ngo => ngo.category === cause || cause === 'all');
    } catch (error) {
      console.error('Error fetching NGOs:', error);
      return NGOS;
    }
  },

  processDonation: async (data: DonationData): Promise<{ success: boolean; transactionId: string }> => {
    try {
      console.log('Processing donation:', data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        success: true,
        transactionId: `ZLH_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
    } catch (error) {
      console.error('Error processing donation:', error);
      throw error;
    }
  },

  sendConfirmation: async (email: string, transactionId: string, amount: number, ngoName: string) => {
    try {
      console.log(`Email confirmation sent to ${email} for transaction ${transactionId}`);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
};

// ==============================================
// COMPONENTE PRINCIPAL
// ==============================================

export default function EcoCleanProPage() {
  // Estados
  const [species, setSpecies] = useState<Species[]>(FALLBACK_SPECIES);
  const [ngos, setNgos] = useState<NGO[]>(NGOS);
  const [loading, setLoading] = useState(true);
  const [showProtocol, setShowProtocol] = useState(false);
  const [donationStep, setDonationStep] = useState(0);
  const [selectedNGO, setSelectedNGO] = useState<NGO | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [donationData, setDonationData] = useState<Partial<DonationData>>({});
  const [processing, setProcessing] = useState(false);
  const [transactionResult, setTransactionResult] = useState<{ success: boolean; txId?: string } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [email, setEmail] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const domains = ["gmail.com", "hotmail.com", "icloud.com", "outlook.com", "yahoo.com"];
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(true);
  const carouselControls = useAnimation();

  // Efecto para cargar datos
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const speciesData = await api.getSpecies();
      setSpecies(speciesData);
      setLoading(false);
    };
    loadData();
  }, []);

  // Efecto para el carrusel
  useEffect(() => {
    if (isCarouselPlaying) {
      carouselControls.start({
        x: ["0%", "-50%"],
        transition: {
          duration: 60,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        }
      });
    } else {
      carouselControls.stop();
    }
  }, [isCarouselPlaying, carouselControls]);

  // Handlers
  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    setDonationData(prev => ({ ...prev, paymentMethod: method }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setDonationData(prev => ({ 
      ...prev, 
      donorInfo: { ...prev.donorInfo, email: value } as any 
    }));
    
    if (value.includes("@")) {
      const [local, domain] = value.split("@");
      setSuggestions(domains.filter(d => d.startsWith(domain)).map(d => `${local}@${d}`));
    } else {
      setSuggestions([]);
    }
  };

  const openDonation = (ngo: NGO) => {
    setSelectedNGO(ngo);
    setDonationStep(1);
    setTransactionResult(null);
  };

  const handleDonationSubmit = async () => {
    if (!selectedNGO || !donationData.amount || !donationData.paymentMethod || !donationData.donorInfo?.email) {
      return;
    }

    setProcessing(true);
    try {
      const result = await api.processDonation({
        ngoId: selectedNGO.id,
        amount: donationData.amount,
        paymentMethod: donationData.paymentMethod,
        donorInfo: donationData.donorInfo as any
      });

      if (result.success && donationData.donorInfo.email) {
        await api.sendConfirmation(
          donationData.donorInfo.email,
          result.transactionId,
          donationData.amount,
          selectedNGO.name
        );
      }

      setTransactionResult({ success: true, txId: result.transactionId });
      setDonationStep(7);
    } catch (error) {
      setTransactionResult({ success: false });
      setDonationStep(8);
    } finally {
      setProcessing(false);
    }
  };

  // Filtrar ONGs
  const filteredNGOs = ngos.filter(ngo => {
    const matchesSearch = ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ngo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || ngo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalDonated = 100000;

  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#E6F379] selection:text-black overflow-x-hidden">
      <Header />

      {/* Loading overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[1000] flex items-center justify-center"
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-[#E6F379] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-[10px] font-black uppercase tracking-widest text-[#E6F379]">Cargando datos IUCN...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO */}
      <section className="relative min-h-[90vh] md:h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img src="/eco-forest-bg.jpg" alt="Nature" className="w-full h-full object-cover opacity-30 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>
        <div className="relative z-10 max-w-[1400px] w-full text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-[8px] md:text-[10px] font-[1000] uppercase tracking-[0.4em] md:tracking-[0.6em] text-[#E6F379] mb-6 md:mb-8 block">Global_Action_Protocol_2026</span>
            <h1 className="text-[clamp(2.5rem,12vw,10rem)] font-[1000] leading-[0.9] md:leading-[0.8] tracking-tighter uppercase italic mb-8 md:mb-12">Salva al<br /><span className="text-[#E6F379]">Ecosistema_</span></h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-8 md:mt-16">
              <button 
                onClick={() => document.getElementById('ngo-search')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full md:w-auto bg-white text-black px-10 md:px-12 py-5 md:py-7 rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest hover:bg-[#E6F379] transition-all flex items-center justify-center gap-4 group"
              >
                Encuentra tu NGO <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <div className="flex items-center gap-4 px-6 md:px-8 py-4 md:py-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                 <span className="text-xl md:text-3xl">🦍</span>
                 <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">#EcoZelloh movement</span>
                 <span className="text-xl md:text-3xl">🐘</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 space-y-24 md:space-y-40 pb-40">
        
        {/* 2. SPECIES AT RISK */}
        <section className="pt-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-4">
            <h2 className="text-4xl md:text-7xl font-[1000] uppercase italic tracking-tighter">01/ Especies_</h2>
            <div className="h-[1px] flex-grow mx-10 bg-white/10 hidden md:block" />
            <p className="text-zinc-500 font-bold uppercase text-[9px] md:text-[10px] tracking-[0.3em]">Critical_Status_Report • IUCN Red List</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12">
            {species.map((s) => (
              <EcoAnimalCard 
                key={s.id}
                name={s.name}
                emoji={s.emoji}
                population={s.population}
                img={s.image}
                status={s.status}
                trend={s.trend}
                category={s.category}
                lastAssessment={s.lastAssessment}
                onDonate={() => openDonation(NGOS.find(n => n.category === 'animals') || NGOS[0])}
              />
            ))}
          </div>
        </section>

        {/* 3. PARTNERS - Carousel */}
        <section className="pt-20 border-t border-white/5 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />
          
          <div 
            className="flex overflow-hidden py-6 md:py-10"
            onMouseEnter={() => setIsCarouselPlaying(false)}
            onMouseLeave={() => setIsCarouselPlaying(true)}
          >
            <motion.div 
              className="flex gap-12 md:gap-20 items-center flex-nowrap" 
              animate={carouselControls}
            >
              {[...NGOS, ...NGOS, ...NGOS].map((ngo, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 relative hover:scale-110 transition-transform duration-300"
                  style={{ width: '120px', height: '60px' }}
                >
                  <Image
                    src={ngo.logo}
                    alt={ngo.name}
                    fill
                    sizes="100px"
                    className="object-contain grayscale brightness-200 opacity-30 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. DONATION BANNER */}
        <section>
          <div className="bg-[#E6F379] rounded-[2rem] md:rounded-[3rem] p-8 md:p-32 text-black relative overflow-hidden group">
            <div className="relative z-10 max-w-4xl">
              <h2 className="text-4xl md:text-8xl font-[1000] uppercase italic tracking-tighter leading-[0.9] md:leading-[0.85] mb-8 md:mb-12">
                Zelloh donara ${totalDonated.toLocaleString()} a la lucha_
              </h2>
              <button 
                onClick={() => setShowProtocol(true)} 
                className="w-full md:w-auto bg-black text-white px-8 md:px-12 py-5 md:py-6 rounded-xl font-black uppercase text-[10px] md:text-xs tracking-widest hover:scale-105 transition-all"
              >
                Protocolo de Donacion
              </button>
            </div>
            <FiTarget size={200} className="absolute -right-10 -bottom-10 text-black/5 rotate-12 md:text-[300px]" />
          </div>
        </section>

        {/* 5. SOMOS ZELLOH */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center border-y border-white/5 py-20 md:py-32">
          <div className="space-y-2 md:space-y-4 text-center lg:text-left">
            <h3 className="text-5xl md:text-[7rem] font-[1000] uppercase italic tracking-tighter leading-[0.8]">Somos_ <br /> <span className="text-[#E6F379]">Eco.</span></h3>
            <h3 className="text-5xl md:text-[7rem] font-[1000] uppercase italic tracking-tighter leading-[0.8] text-zinc-900">Libertad.</h3>
            <h3 className="text-5xl md:text-[7rem] font-[1000] uppercase italic tracking-tighter leading-[0.8] text-white">Zelloh.</h3>
          </div>
          <div className="flex justify-center">
             <div className="w-64 h-64 md:w-96 md:h-96 rounded-full border border-white/10 flex items-center justify-center relative">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }} 
                  className="absolute inset-0 border-t-2 border-[#E6F379] rounded-full" 
                />
                <span className="text-xl md:text-2xl font-[1000] uppercase italic tracking-widest text-center px-6">Impacto_ <br/> Digital</span>
             </div>
          </div>
        </section>

        {/* 6. SEARCH & CATEGORIES */}
        <section id="ngo-search" className="space-y-16 md:space-y-24">
          <div className="text-center space-y-4 md:space-y-6">
            <h2 className="text-4xl md:text-[9rem] font-[1000] uppercase italic tracking-tighter leading-none">Salva el_Mundo</h2>
            <p className="text-zinc-500 font-black uppercase text-[8px] md:text-[10px] tracking-[0.5em]">Global_NGO_Repository • {filteredNGOs.length} organizaciones</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-10 md:space-y-12">
            <div className="relative group">
              <FiSearch className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 text-[#E6F379] text-xl md:text-2xl" />
              <input 
                type="text" 
                placeholder="Busca por nombre o misión..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900/50 border border-white/5 text-white py-6 md:py-8 px-16 md:px-20 rounded-2xl font-bold outline-none text-sm md:text-base focus:border-[#E6F379] transition-colors"
              />
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
              <CategoryBtn 
                icon="✔️" 
                label="Verified" 
                active={selectedCategory === "all"}
                onClick={() => setSelectedCategory("all")}
              />
              <CategoryBtn 
                icon="🐻" 
                label="Animals" 
                active={selectedCategory === "animals"}
                onClick={() => setSelectedCategory("animals")}
              />
              <CategoryBtn 
                icon="🌍" 
                label="Planet" 
                active={selectedCategory === "planet"}
                onClick={() => setSelectedCategory("planet")}
              />
              <CategoryBtn 
                icon="🏷️" 
                label="Cause" 
                active={selectedCategory === "cause"}
                onClick={() => setSelectedCategory("cause")}
              />
              <CategoryBtn 
                icon="👥" 
                label="People" 
                active={selectedCategory === "people"}
                onClick={() => setSelectedCategory("people")}
              />
              <CategoryBtn 
                icon="✊" 
                label="Support" 
                active={selectedCategory === "support"}
                onClick={() => setSelectedCategory("support")}
              />
            </div>

            {/* Grid de NGOs */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pt-8">
              {filteredNGOs.map((ngo) => (
                <motion.div
                  key={ngo.id}
                  whileHover={{ y: -5 }}
                  onClick={() => openDonation(ngo)}
                  className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 text-center cursor-pointer group hover:border-[#E6F379]/50 transition-all"
                >
                  <div className="w-16 h-16 mx-auto mb-4 relative grayscale group-hover:grayscale-0 transition-all">
                    <img src={ngo.logo} alt={ngo.name} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="font-black text-sm uppercase italic tracking-tighter mb-1">{ngo.name}</h3>
                  <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">{ngo.description}</p>
                  {ngo.verified && (
                    <div className="flex items-center justify-center gap-1 mt-3">
                      <FiCheck className="text-[#E6F379]" size={10} />
                      <span className="text-[6px] font-black text-[#E6F379] uppercase tracking-widest">Verified</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />

      {/* MODAL PROTOCOLO */}
      <AnimatePresence>
        {showProtocol && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white text-black p-8 md:p-10 rounded-[2rem] max-w-sm w-full relative"
            >
              <button onClick={() => setShowProtocol(false)} className="absolute top-4 right-4 text-black/20"><FiX size={24} /></button>
              <h3 className="text-xl md:text-2xl font-[1000] uppercase italic mb-4">Protocolo de Impacto_</h3>
              <p className="text-xs md:text-sm opacity-70 mb-8 leading-relaxed">
                Zelloh garantiza que el 100% de los fondos son rastreados mediante contratos inteligentes. 
                Transparencia total en la blockchain.
              </p>
              <div className="bg-black text-white p-5 md:p-6 rounded-2xl flex items-center justify-between">
                <span className="font-bold text-[10px] uppercase tracking-widest">Verified 2026</span>
                <FiTarget className="text-[#E6F379]" size={20} />
              </div>
              <div className="mt-4 text-[8px] text-black/40 font-black uppercase tracking-widest text-center">
                Contrato: 0xZ3LL0H...EC0
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL DE DONACIÓN */}
      <AnimatePresence>
        {donationStep > 0 && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-4 bg-black/95 backdrop-blur-xl">
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: 20, opacity: 0 }}
              className="bg-[#0f0f0f] border border-white/10 w-full max-w-xl rounded-[2.5rem] p-6 md:p-10 max-h-[95vh] overflow-y-auto custom-scrollbar"
            >
                <div className="flex justify-between items-center mb-8">
                  <span className="text-[10px] font-black text-[#E6F379] uppercase tracking-widest">
                    Step 0{donationStep} / 06
                  </span>
                  <button onClick={() => setDonationStep(0)} className="text-white/20 p-2"><FiX size={20}/></button>
                </div>

                {/* Paso 1: Confirmación */}
                {donationStep === 1 && selectedNGO && (
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-[1000] uppercase italic tracking-tighter">Confirmación_</h3>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[10px] text-zinc-500 uppercase font-black mb-1">Misión seleccionada</p>
                      <p className="text-lg md:text-xl font-black text-[#E6F379]">{selectedNGO.name}</p>
                      <p className="text-xs text-zinc-400 mt-2">{selectedNGO.mission}</p>
                    </div>
                    <button onClick={() => setDonationStep(2)} className="w-full bg-[#E6F379] text-black py-5 rounded-xl font-black uppercase text-[10px] tracking-widest">Siguiente</button>
                  </div>
                )}

                {/* Paso 2: Datos Personales */}
                {donationStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-[1000] uppercase italic">02/ Datos_</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Nombre" 
                        onChange={(e) => setDonationData(prev => ({ 
                          ...prev, 
                          donorInfo: { ...prev.donorInfo, name: e.target.value } as any 
                        }))}
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs outline-none focus:border-[#E6F379]" 
                      />
                      <input 
                        type="text" 
                        placeholder="Apellidos" 
                        onChange={(e) => setDonationData(prev => ({ 
                          ...prev, 
                          donorInfo: { ...prev.donorInfo, lastName: e.target.value } as any 
                        }))}
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs outline-none focus:border-[#E6F379]" 
                      />
                    </div>
                    <div className="relative">
                      <input 
                        type="email" 
                        value={email} 
                        onChange={handleEmailChange} 
                        placeholder="Email" 
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs outline-none focus:border-[#E6F379]" 
                      />
                      {suggestions.length > 0 && (
                        <div className="absolute z-50 w-full bg-zinc-900 border border-white/10 rounded-xl mt-1 overflow-hidden">
                          {suggestions.map((s, i) => (
                            <div 
                              key={i} 
                              onClick={() => {
                                setEmail(s);
                                setDonationData(prev => ({ 
                                  ...prev, 
                                  donorInfo: { ...prev.donorInfo, email: s } as any 
                                }));
                                setSuggestions([]);
                              }} 
                              className="p-3 text-[10px] cursor-pointer hover:bg-[#E6F379] hover:text-black"
                            >
                              {s}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr_100px] gap-4">
                      <select className="bg-white/5 border border-white/10 p-4 rounded-xl text-[10px] outline-none appearance-none cursor-pointer">
                        <option>+34 (ES)</option><option>+1 (US)</option><option>+52 (MX)</option>
                      </select>
                      <input 
                        type="tel" 
                        placeholder="Teléfono" 
                        onChange={(e) => setDonationData(prev => ({ 
                          ...prev, 
                          donorInfo: { ...prev.donorInfo, phone: e.target.value } as any 
                        }))}
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs outline-none" 
                      />
                      <input 
                        type="text" 
                        placeholder="ZIP" 
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs outline-none" 
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button onClick={() => setDonationStep(1)} className="order-2 sm:order-1 flex-1 bg-white/5 py-4 rounded-xl text-[10px] font-black flex items-center justify-center gap-2"><FiArrowLeft/> VOLVER</button>
                      <button onClick={() => setDonationStep(3)} className="order-1 sm:order-2 flex-[2] bg-[#E6F379] text-black py-4 rounded-xl font-black text-[10px] tracking-widest">SIGUIENTE</button>
                    </div>
                  </div>
                )}

                {/* Paso 3: Dirección */}
                {donationStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-[1000] uppercase italic">03/ Dirección_</h3>
                    <input type="text" placeholder="Calle y número" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs outline-none" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <select className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs outline-none appearance-none">
                          <option>País</option><option>España</option><option>México</option>
                        </select>
                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" />
                      </div>
                      <input type="text" placeholder="Ciudad" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs outline-none" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button onClick={() => setDonationStep(2)} className="order-2 sm:order-1 flex-1 bg-white/5 py-4 rounded-xl text-[10px] font-black flex items-center justify-center gap-2"><FiArrowLeft/> VOLVER</button>
                      <button onClick={() => setDonationStep(4)} className="order-1 sm:order-2 flex-[2] bg-[#E6F379] text-black py-4 rounded-xl font-black text-[10px] tracking-widest">SIGUIENTE</button>
                    </div>
                  </div>
                )}

                {/* Paso 4: Monto y Método */}
                {donationStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-xl md:text-2xl font-[1000] uppercase italic">04/ Monto_</h3>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-[#E6F379]">$</span>
                      <input 
                        type="number" 
                        placeholder="0.00" 
                        onChange={(e) => setDonationData(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
                        className="w-full bg-[#1a1a1a] border border-[#E6F379] p-6 rounded-2xl text-3xl font-black outline-none pl-12" 
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {["Tarjeta", "Zelloh", "Crypto", "SMS", "SEPA"].map(m => (
                        <button 
                          key={m} 
                          onClick={() => handlePaymentMethodChange(m)}
                          className={`p-4 rounded-xl border text-[9px] font-black uppercase transition-all ${
                            paymentMethod === m 
                              ? 'bg-[#E6F379] text-black border-[#E6F379]' 
                              : 'bg-white/5 border-white/10 text-zinc-500 hover:bg-white/10'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button onClick={() => setDonationStep(3)} className="order-2 sm:order-1 flex-1 bg-white/5 py-4 rounded-xl text-[10px] font-black flex items-center justify-center gap-2"><FiArrowLeft/> VOLVER</button>
                      <button 
                        onClick={() => setDonationStep(5)} 
                        disabled={!donationData.amount || !paymentMethod} 
                        className="order-1 sm:order-2 flex-[2] bg-[#E6F379] text-black py-4 rounded-xl font-black text-[10px] tracking-widest disabled:opacity-20"
                      >
                        SIGUIENTE
                      </button>
                    </div>
                  </div>
                )}

                {/* Paso 5: Detalles de Pago */}
                {donationStep === 5 && (
                  <div className="space-y-6">
                    <h3 className="text-xl md:text-2xl font-[1000] uppercase italic tracking-tighter">05/ Pago con {paymentMethod}_</h3>
                    
                    {paymentMethod === "Tarjeta" && (
                      <div className="space-y-3">
                        <input type="text" placeholder="Titular de la tarjeta" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs outline-none" />
                        <div className="relative">
                          <input type="text" placeholder="Card Number" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs outline-none pl-12" />
                          <FiCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <input type="text" placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs outline-none" />
                          <input type="text" placeholder="CVV" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs outline-none" />
                        </div>
                      </div>
                    )}

                    {paymentMethod !== "Tarjeta" && paymentMethod !== "" && (
                      <div className="p-8 bg-white/5 border border-dashed border-white/10 rounded-2xl text-center">
                        <p className="text-[10px] font-black uppercase text-zinc-400">
                          Procesando pasarela {paymentMethod}
                        </p>
                        <p className="text-[8px] text-zinc-600 mt-2">Redirigiendo al gateway seguro...</p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button onClick={() => setDonationStep(4)} className="order-2 sm:order-1 flex-1 bg-white/5 py-4 rounded-xl text-[10px] font-black flex items-center justify-center gap-2"><FiArrowLeft/> VOLVER</button>
                      <button 
                        onClick={handleDonationSubmit}
                        disabled={processing || !paymentMethod}
                        className="order-1 sm:order-2 flex-[2] bg-[#E6F379] text-black py-4 rounded-xl font-black text-[10px] tracking-widest disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {processing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            PROCESANDO...
                          </>
                        ) : (
                          'CONFIRMAR'
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Paso 6: Auth Final */}
                {donationStep === 6 && (
                  <div className="space-y-8 text-center py-4">
                    <div className="space-y-2">
                       <FiLock className="mx-auto text-[#E6F379] text-4xl mb-4" />
                       <h3 className="text-2xl font-[1000] uppercase italic">Seguridad_</h3>
                       <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Finaliza tu donación con Zelloh</p>
                    </div>
                    <div className="grid gap-4">
                      <button className="w-full bg-white text-black py-5 rounded-xl font-black uppercase italic text-[10px] tracking-widest">Iniciar Sesión</button>
                      <button className="w-full bg-white/5 border border-white/10 text-white py-5 rounded-xl font-black uppercase italic text-[10px] tracking-widest">Registrarse</button>
                    </div>
                    <button onClick={() => setDonationStep(5)} className="text-[9px] font-black text-zinc-600 uppercase tracking-widest flex items-center justify-center gap-2 mx-auto"><FiArrowLeft/> Volver al pago</button>
                  </div>
                )}

                {/* Paso 7: Éxito */}
                {donationStep === 7 && transactionResult?.success && (
                  <div className="space-y-6 text-center py-4">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                      <FiCheck className="text-black text-4xl" />
                    </div>
                    <h3 className="text-2xl font-[1000] uppercase italic">¡Donación Exitosa!</h3>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-[10px] text-zinc-500 font-black uppercase">Transaction ID</p>
                      <p className="text-xs font-mono text-[#E6F379] break-all">{transactionResult.txId}</p>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Hemos enviado la confirmación a {donationData.donorInfo?.email}
                    </p>
                    <button 
                      onClick={() => setDonationStep(0)}
                      className="w-full bg-[#E6F379] text-black py-5 rounded-xl font-black uppercase text-[10px] tracking-widest mt-4"
                    >
                      CERRAR
                    </button>
                  </div>
                )}

                {/* Paso 8: Error */}
                {donationStep === 8 && !transactionResult?.success && (
                  <div className="space-y-6 text-center py-4">
                    <FiAlertCircle className="mx-auto text-red-500 text-5xl" />
                    <h3 className="text-2xl font-[1000] uppercase italic">Error en la Donación</h3>
                    <p className="text-sm text-zinc-400">
                      No pudimos procesar tu donación. Por favor, intenta de nuevo.
                    </p>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setDonationStep(5)}
                        className="flex-1 bg-white/5 py-4 rounded-xl text-[10px] font-black"
                      >
                        REINTENTAR
                      </button>
                      <button 
                        onClick={() => setDonationStep(0)}
                        className="flex-1 bg-[#E6F379] text-black py-4 rounded-xl text-[10px] font-black"
                      >
                        CERRAR
                      </button>
                    </div>
                  </div>
                )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

// ==============================================
// COMPONENTES AUXILIARES
// ==============================================

function EcoAnimalCard({ 
  name, 
  population, 
  img, 
  status, 
  emoji, 
  trend, 
  category, 
  lastAssessment, 
  onDonate 
}: { 
  name: string;
  population: string;
  img: string;
  status: string;
  emoji: string;
  trend: string;
  category: string;
  lastAssessment: string;
  onDonate: () => void;
}) {
  return (
    <div className="group bg-zinc-900/30 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 p-8 md:p-12 relative overflow-hidden transition-all hover:bg-zinc-900/60 h-full flex flex-col justify-between">
      <div className="relative z-10 space-y-6 md:space-y-8">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[8px] md:text-[10px] font-black text-[#E6F379] uppercase tracking-widest">{status}</span>
            <span className="text-[8px] font-black text-zinc-600 uppercase">{category} • IUCN {lastAssessment}</span>
          </div>
          <h3 className="text-3xl md:text-5xl font-[1000] uppercase italic tracking-tighter leading-none flex flex-wrap items-center gap-3">
            {name} 
          </h3>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
          <div className="space-y-1">
            <p className="text-[8px] md:text-[9px] font-black text-zinc-500 uppercase tracking-widest">Population_Left</p>
            <p className="text-3xl md:text-4xl font-[1000] italic leading-none">{population}</p>
            <p className="text-[8px] text-zinc-600 uppercase tracking-widest">
              {trend === 'decreasing' ? '📉 Disminuyendo' : trend === 'increasing' ? '📈 Aumentando' : '📊 Estable'}
            </p>
          </div>
          <button onClick={onDonate} className="w-full sm:w-auto bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-xl font-black uppercase text-[9px] md:text-[10px] tracking-widest hover:bg-[#E6F379] transition-colors">
            Donar
          </button>
        </div>
      </div>
      <span className="absolute -right-4 -top-4 text-7xl md:text-[120px] opacity-20 md:opacity-30 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 pointer-events-none">
        {emoji}
      </span>
      <img 
        src={img} 
        alt={name} 
        className="absolute -right-8 -bottom-8 w-40 md:w-64 h-auto opacity-20 md:opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
      />
    </div>
  );
}

function CategoryBtn({ icon, label, active, onClick }: { 
  icon: string; 
  label: string; 
  active: boolean; 
  onClick: () => void;
}) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-2 md:gap-4 cursor-pointer group">
      <div className={`w-full aspect-square rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-3xl transition-all duration-500 group-hover:scale-105 ${
        active ? 'bg-[#E6F379]' : 'bg-zinc-900 border border-white/5 group-hover:border-white/20'
      }`}>
        {icon}
      </div>
      <span className="text-[7px] md:text-[9px] font-[1000] uppercase tracking-widest text-zinc-500 group-hover:text-white text-center leading-tight">{label}</span>
    </div>
  );
}