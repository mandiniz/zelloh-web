"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCode, FiTerminal, FiKey, FiShield, FiChevronRight, FiCopy, FiCheck, FiMenu, FiX } from "react-icons/fi";

const API_SECTIONS = [
  {
    id: "intro",
    title: "Introducción",
    icon: <FiCode />,
    content: "La API de Zelloh permite integrar pagos, gestión de wallets y servicios NFT directamente en tu aplicación. Utilizamos una arquitectura REST estándar con respuestas en formato JSON.",
    endpoint: "GET /v1/status",
    example: `curl -X GET "https://api.zelloh.com/v1/status" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
  },
  {
    id: "auth",
    title: "Autenticación",
    icon: <FiKey />,
    content: "Todas las solicitudes a la API deben incluir tu clave secreta en el header de Authorization. Nunca compartas tus claves privadas en el lado del cliente.",
    endpoint: "AUTH HEADER",
    example: `const response = await fetch('https://api.zelloh.com/v1/user', {
  headers: {
    'Authorization': 'Bearer sk_live_51M...',
    'Content-Type': 'application/json'
  }
});`
  },
  {
    id: "payments",
    title: "Pagos y Checkout",
    icon: <FiTerminal />,
    content: "Crea una sesión de pago para redirigir a tus clientes a nuestro checkout seguro o procesa pagos directos vía API si tienes certificación PCI-DSS.",
    endpoint: "POST /v1/payments",
    example: `{
  "amount": 1000,
  "currency": "eur",
  "payment_method": "card",
  "description": "Zelloh Premium Plan"
}`
  },
  {
    id: "wallets",
    title: "Wallets & NFTs",
    icon: <FiShield />,
    content: "Gestiona activos digitales. Puedes crear wallets de custodia para tus usuarios o interactuar con contratos inteligentes directamente.",
    endpoint: "POST /v1/wallets/create",
    example: `{
  "user_id": "usr_9921",
  "chain": "polygon",
  "type": "custodial"
}`
  }
];

export default function ApiDocs() {
  const [activeSection, setActiveSection] = useState(API_SECTIONS[0]);
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="bg-[#020202] text-white min-h-screen selection:bg-[#E6F379] selection:text-black overflow-x-hidden">
      <Header />

      {/* Botón menú móvil/tablet */}
      {(isMobile || isTablet) && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#E6F379] text-black rounded-full flex items-center justify-center shadow-2xl border border-white/20 md:hidden"
        >
          {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      )}

      <div className="max-w-[1600px] mx-auto pt-20 sm:pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 flex flex-col lg:flex-row gap-4 lg:gap-0 relative">
        
        {/* SIDEBAR NAVEGACIÓN - Responsive */}
        <aside className={`
          ${isMobile || isTablet 
            ? `fixed inset-y-0 left-0 z-40 w-[280px] sm:w-[320px] bg-[#020202] border-r border-white/10 transform transition-transform duration-300 ease-in-out pt-24 px-4 sm:px-6 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'lg:w-64 lg:fixed lg:h-[calc(100vh-150px)] overflow-y-auto border-r border-white/5 pr-6 pb-10'
          }
        `}>
          {/* Overlay para móvil/tablet */}
          {(isMobile || isTablet) && sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <div className="space-y-6 sm:space-y-8 relative z-40">
            <div>
              <p className="text-[#E6F379] font-black uppercase text-[9px] sm:text-[10px] tracking-widest mb-4 sm:mb-6">API v1.0.4</p>
              <nav className="space-y-1">
                {API_SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section);
                      if (isMobile || isTablet) setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      activeSection.id === section.id 
                      ? 'bg-white/10 text-white' 
                      : 'text-zinc-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-2 sm:gap-3">
                      <span className="text-sm sm:text-base">{section.icon}</span> 
                      <span className="truncate">{section.title}</span>
                    </span>
                    {activeSection.id === section.id && <FiChevronRight className="text-[#E6F379] shrink-0" />}
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-6 sm:pt-8 border-t border-white/5">
              <p className="text-zinc-600 font-bold uppercase text-[8px] sm:text-[9px] mb-3 sm:mb-4">Recursos</p>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-zinc-400 font-medium">
                <li className="hover:text-[#E6F379] cursor-pointer transition-colors">Postman Collection</li>
                <li className="hover:text-[#E6F379] cursor-pointer transition-colors">SDK Node.js</li>
                <li className="hover:text-[#E6F379] cursor-pointer transition-colors">Webhooks</li>
              </ul>
            </div>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL - Responsive */}
        <section className={`
          flex-1 
          ${!isMobile && !isTablet ? 'lg:ml-80' : 'ml-0'} 
          ${!isMobile && !isTablet ? 'lg:mr-[450px]' : 'mr-0'} 
          py-6 sm:py-8 lg:py-10
          transition-all duration-300
        `}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[1000] italic uppercase tracking-tighter mb-4 sm:mb-6">
                {activeSection.title}
              </h1>
              
              <div className="inline-flex items-center px-2 sm:px-3 py-1 bg-zinc-900 border border-white/10 rounded-full mb-6 sm:mb-8">
                <span className="text-[8px] sm:text-[10px] font-black text-[#E6F379] uppercase tracking-tighter">Endpoint:</span>
                <code className="ml-2 sm:ml-3 text-[8px] sm:text-[10px] text-zinc-300 font-mono break-all">{activeSection.endpoint}</code>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed font-medium">
                  {activeSection.content}
                </p>
                
                <h3 className="text-[#E6F379] uppercase text-xs sm:text-sm font-black tracking-widest mt-8 sm:mt-10 md:mt-12 mb-3 sm:mb-4">Parámetros</h3>
                
                {/* Tabla responsiva con scroll horizontal en móvil */}
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                    <div className="bg-zinc-900/50 rounded-xl sm:rounded-2xl border border-white/5 overflow-hidden">
                      <table className="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-white/5 bg-white/5">
                            <th className="p-3 sm:p-4 font-black uppercase text-[10px] sm:text-xs">Atributo</th>
                            <th className="p-3 sm:p-4 font-black uppercase text-[10px] sm:text-xs">Tipo</th>
                            <th className="p-3 sm:p-4 font-black uppercase text-[10px] sm:text-xs">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="text-zinc-400">
                          <tr>
                            <td className="p-3 sm:p-4 font-mono text-white text-xs sm:text-sm">api_key</td>
                            <td className="p-3 sm:p-4 text-[#E6F379] text-xs sm:text-sm">string</td>
                            <td className="p-3 sm:p-4 text-xs sm:text-sm">Tu clave de acceso única.</td>
                          </tr>
                          <tr className="bg-white/[0.02]">
                            <td className="p-3 sm:p-4 font-mono text-white text-xs sm:text-sm">limit</td>
                            <td className="p-3 sm:p-4 text-[#E6F379] text-xs sm:text-sm">integer</td>
                            <td className="p-3 sm:p-4 text-xs sm:text-sm">Máximo de registros (1-100).</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* CÓDIGO / PLAYGROUND - Responsive */}
        <aside className={`
          ${isMobile || isTablet 
            ? 'mt-6 sm:mt-8 w-full' 
            : 'hidden lg:block fixed right-6 top-32 w-[400px] bottom-24'
          }
        `}>
          <div className={`h-full bg-zinc-900 rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-white/10 overflow-hidden flex flex-col shadow-2xl ${isMobile || isTablet ? 'max-h-[500px]' : ''}`}>
            <div className="p-3 sm:p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
              <div className="flex gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500/50" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500/50" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500/50" />
              </div>
              <span className="text-[8px] sm:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Example Request</span>
            </div>
            
            <div className="relative flex-1 p-4 sm:p-5 lg:p-6 font-mono text-[10px] sm:text-[11px] leading-relaxed overflow-y-auto">
              <button 
                onClick={() => copyToClipboard(activeSection.example)}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                {copied ? <FiCheck className="text-[#E6F379] text-xs sm:text-sm" /> : <FiCopy className="text-zinc-400 text-xs sm:text-sm" />}
              </button>
              <pre className="text-zinc-300 whitespace-pre-wrap break-words">
                <code className="language-javascript text-[9px] sm:text-[10px] lg:text-[11px]">
                  {activeSection.example}
                </code>
              </pre>
            </div>

            <div className="p-3 sm:p-4 bg-black/40 border-t border-white/5">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-[8px] sm:text-[9px] font-black text-zinc-500 uppercase">Response</span>
                <span className="text-[8px] sm:text-[9px] font-bold text-green-400 uppercase">200 OK</span>
              </div>
              <pre className="text-[8px] sm:text-[9px] lg:text-[10px] text-zinc-500 font-mono break-all">
                {`{ "success": true, "status": "active" }`}
              </pre>
            </div>
          </div>
        </aside>

      </div>

      <div className="mt-16 sm:mt-20 lg:mt-24">
        <Footer />
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar { 
          width: 4px; 
          height: 4px;
        }
        ::-webkit-scrollbar-track { 
          background: transparent; 
        }
        ::-webkit-scrollbar-thumb { 
          background: #333; 
          border-radius: 10px; 
        }
        ::-webkit-scrollbar-thumb:hover { 
          background: #E6F379; 
        }
        
        /* Scroll horizontal para tabla en móvil */
        .overflow-x-auto {
          scrollbar-width: thin;
          scrollbar-color: #333 transparent;
        }
        
        .overflow-x-auto::-webkit-scrollbar {
          height: 4px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: #E6F379;
        }
      `}</style>
    </main>
  );
}