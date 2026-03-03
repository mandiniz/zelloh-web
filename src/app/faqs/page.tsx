"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { FiPlusCircle, FiMinusCircle, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: 'cuenta', name: 'Cuenta', icon: '🏦', active: true },
  { id: 'tarjeta', name: 'Tarjeta', icon: '💳' },
  { id: 'bonuses', name: 'Bonuses', icon: '🎁' },
  { id: 'seguridad', name: 'Seguridad', icon: '🔐' },
  { id: 'pagos', name: 'Pagos', icon: '💸' },
  { id: 'kids', name: 'Zelloh Kids', icon: '🤵' },
  { id: 'nfts', name: 'NFT’s', icon: '🦄' },
  { id: 'juega', name: 'Juega y gana', icon: '🎮' },
  { id: 'dogtor', name: 'Zelloh by Dogtor Pay', icon: '❓' },
  { id: 'contacto', name: 'Contactanos', icon: '💬' },
];

// TODAS LAS FAQS POR CATEGORÍA (se mantiene igual)
const faqsByCategory = {
  cuenta: [
    {
      q: "¿Cómo puedo registrarme en Zelloh?",
      a: "Registrarse en Zelloh es rápido y fácil. Solo necesitas tu teléfono móvil, una dirección de correo electrónico y tu DNI o pasaporte. Descarga la app desde la tienda oficial (App Store o Google Play), introduce tu número de teléfono, verifica tu identidad con un selfie y tu documento de identidad, y en menos de 5 minutos tendrás tu cuenta activa. ¡Sin papeleos, sin visitas a sucursales!"
    },
    { 
      q: "¿Puedo ser un Zeller si tengo menos de 18 años?", 
      a: "Sí, a partir de los 14 años puedes abrir una cuenta Zelloh Kids bajo la supervisión de un tutor legal. Los jóvenes de 16-17 años pueden tener una cuenta Zelloh Youth con límites controlados. Ambos productos están diseñados para enseñar educación financiera a los más jóvenes de forma segura y controlada por los padres." 
    },
    { 
      q: "¿Cuál es mi IBAN en Zelloh?", 
      a: "Cada cuenta Zelloh tiene un IBAN único europeo (comienza con ES para España). Lo encontrarás en la sección 'Cuenta' de tu app, bajo 'Detalles de la cuenta'. Este IBAN es válido para recibir transferencias SEPA desde cualquier banco de la zona euro. Es tu número de cuenta bancaria internacional." 
    },
    { 
      q: "¿Cuál es mi BIC/SWIFT?", 
      a: "El BIC de Zelloh es ZLLHESMMXXX. Este código identifica a Zelloh en el sistema bancario internacional. Lo necesitarás para recibir transferencias desde fuera de la zona SEPA. Para transferencias dentro de Europa, con tu IBAN es suficiente." 
    },
    { 
      q: "¿Qué pasa si he cometido un error al indicar mi nombre al registrarme?", 
      a: "Si detectas un error en tu nombre, contacta inmediatamente con nuestro soporte desde la app. Podemos corregir datos personales verificando nuevamente tu identidad. Es importante que los datos coincidan exactamente con tu documento oficial para evitar problemas con transferencias o verificaciones de identidad." 
    },
    { 
      q: "¿Puedo tener mi cuenta Zelloh en diferentes teléfonos?", 
      a: "Tu cuenta Zelloh está vinculada a tu número de teléfono principal. Puedes iniciar sesión en múltiples dispositivos, pero solo un dispositivo puede estar activo al mismo tiempo por seguridad. Si inicias sesión en un nuevo dispositivo, se cerrará la sesión automáticamente en el anterior." 
    },
    { 
      q: "¿Cómo puedo cerrar sesión en mi cuenta?", 
      a: "Ve a 'Configuración' → 'Seguridad' → 'Cerrar sesión en todos los dispositivos'. Esto cerrará tu sesión en todos los teléfonos, tablets o navegadores donde tengas Zelloh abierto. Para cerrar solo en el dispositivo actual, también puedes usar la opción 'Cerrar sesión' en el menú principal." 
    },
    { 
      q: "¿Cómo puedo eliminar mi cuenta de Zelloh?", 
      a: "Para eliminar tu cuenta permanentemente, ve a 'Configuración' → 'Ayuda' → 'Eliminar cuenta'. Ten en cuenta que necesitarás tener saldo cero y no tener transacciones pendientes. El proceso puede tardar hasta 30 días hábiles para completar todas las verificaciones regulatorias. Una vez eliminada, no podrás recuperar tu historial." 
    },
    { 
      q: "He cambiado de teléfono. ¿Qué debo hacer?", 
      a: "1. Instala Zelloh en tu nuevo teléfono. 2. Inicia sesión con tu número de teléfono (el mismo que registraste). 3. Recibirás un código de verificación por SMS. 4. Si has perdido el acceso al número anterior, contacta con soporte para verificación alternativa. Te recomendamos actualizar tu número en la app antes de cambiar de dispositivo." 
    },
    {
      q: "¿Cómo cambio mi contraseña o PIN?",
      a: "Para cambiar tu contraseña: Configuración → Seguridad → Cambiar contraseña. Para cambiar el PIN de tu tarjeta: Tarjetas → Selecciona tu tarjeta → Cambiar PIN. Ambos cambios requieren verificación biométrica (huella o rostro) o código SMS. Los cambios son efectivos inmediatamente."
    }
  ],
  tarjeta: [
    {
      q: "¿Qué tarjetas ofrece Zelloh y cuáles son sus costes?",
      a: "Zelloh ofrece tres tipos de tarjetas: 1) Tarjeta Virtual Gratuita (sin coste, para compras online), 2) Tarjeta Física Estándar (€5 de emisión, sin cuota mensual), 3) Tarjeta Premium Metaverse (€12/mes, incluye cashback del 2% en compras digitales y seguros). Todas son Mastercard aceptadas mundialmente. Sin comisiones por uso en zona euro."
    },
    {
      q: "¿Cómo activo mi tarjeta física cuando la reciba?",
      a: "Cuando recibas tu tarjeta física, ábrela y ve a la sección 'Tarjetas' en la app Zelloh. Selecciona 'Activar nueva tarjeta', escanea el código QR que viene en la tarjeta o introduce el código manualmente, establece tu PIN de 4 dígitos y ¡listo! La tarjeta estará activa en menos de 2 minutos."
    },
    {
      q: "¿Qué hago si pierdo mi tarjeta o me la roban?",
      a: "En la app Zelloh, ve a 'Tarjetas' → selecciona la tarjeta perdida → 'Bloquear tarjeta inmediatamente'. La tarjeta se bloqueará al instante. Después, contacta con soporte para solicitar una reposición (€5 de coste). Mientras tanto, puedes usar tu tarjeta virtual desde el móvil. El saldo está protegido por nuestro seguro anti-fraude."
    },
    {
      q: "¿Puedo retirar efectivo sin comisiones?",
      a: "Sí, hasta €200/mes sin comisiones en cualquier cajero mundial (Mastercard). Después de €200: 2% de comisión. Para evitar comisiones: usa nuestra red de comercios partners donde puedes retirar efectivo al comprar (como Carrefour, Mercadona). Encuentra cajeros sin comisión en el mapa de la app."
    },
    {
      q: "¿Cómo configuro límites de gasto en mi tarjeta?",
      a: "Ve a 'Tarjetas' → selecciona tu tarjeta → 'Límites de gasto'. Puedes configurar: límite diario, límite por transacción, bloqueo de comercios por categoría (ej: apuestas online), y geolocalización (solo usar tarjeta en ciertos países). Los cambios son instantáneos y reversibles en cualquier momento."
    }
  ],
  bonuses: [
    {
      q: "¿Cómo funcionan los bonuses de referidos?",
      a: "Por cada amigo que invites y se registre usando tu enlace único, recibes €5 inmediatamente cuando complete su primera transacción. Tu amigo también recibe €5 de bienvenida. Si tu amigo después invita a sus amigos, tú recibes €3 por cada uno de ellos (recompensa de segundo nivel). No hay límite de referidos."
    },
    {
      q: "¿Qué son los Zelloh Hacks y cómo los activo?",
      a: "Los Zelloh Hacks son descuentos exclusivos en marcas como Spotify, Netflix, Amazon, etc. Para activarlos: 1) Ve a 'Hacks' en la app, 2) Elige la oferta, 3) Paga con tu tarjeta Zelloh y el descuento se aplica automáticamente. Los hacks se renuevan mensualmente y algunos son de uso único. ¡Siempre hay nuevas ofertas!"
    },
    {
      q: "¿Cómo funciona el cashback de Zelloh?",
      a: "Recibes cashback automático en ciertas categorías: 1% en supermercados, 2% en transporte, 3% en compras del Metaverse/NFTs, y hasta 5% en marcas partners. El cashback se acumula en tu 'Wallet de Recompensas' y puedes transferirlo a tu cuenta principal cualquier día o canjearlo por gift cards. Sin límites mensuales."
    },
    {
      q: "¿Qué es el programa Zelloh Elite y cómo me uno?",
      a: "Zelloh Elite es nuestro programa de fidelidad premium. Te unes automáticamente al mantener €5,000 en tu cuenta o gastar €1,000/mes. Beneficios: cashback del 3% en todas las compras, seguro de viaje, lounge en aeropuertos, y atención prioritaria 24/7. Sin cuota de membresía."
    }
  ],
  seguridad: [
    {
      q: "¿Es seguro Zelloh? ¿Dónde está mi dinero?",
      a: "Extremadamente seguro. Tu dinero está protegido por: 1) Seguro de depósitos hasta €100,000 por la FGD, 2) Encriptación bancaria de 256-bit, 3) Autenticación biométrica, 4) Seguro anti-fraude en todas las transacciones. Los fondos se custodian en cuentas segregadas en bancos autorizados (BBVA, Santander). Zelloh está regulado por el Banco de España."
    },
    {
      q: "¿Qué pasa si alguien hace una compra fraudulenta con mi tarjeta?",
      a: "Si detectas una transacción fraudulenta: 1) Bloquea la tarjeta inmediatamente en la app, 2) Reporta la transacción como fraudulenta, 3) Nuestro equipo investiga en menos de 24h, 4) Recibes el reembolso completo (garantía de 0% responsabilidad). Todas las compras online tienen 3D Secure (verificación adicional)."
    },
    {
      q: "¿Cómo protege Zelloh mis datos personales?",
      a: "Cumplimos con GDPR y regulaciones españolas. Tus datos están: 1) Encriptados de extremo a extremo, 2) Almacenados en servidores certificados ISO 27001 en la UE, 3) Nunca vendidos a terceros, 4) Accesibles solo con tu autorización explícita. Puedes descargar o eliminar todos tus datos cuando quieras."
    }
  ],
  pagos: [
    {
      q: "¿Cómo puedo hacer transferencias inmediatas?",
      a: "Transferencias instantáneas 24/7: 1) En la app, toca 'Enviar dinero', 2) Elige contacto o introduce IBAN, 3) Confirma con huella/face ID, 4) El dinero llega en segundos (hasta €15,000/día). Para transferencias a otros Zellers: solo necesitas su número de teléfono o @usuario. Sin comisiones entre Zellers."
    },
    {
      q: "¿Cómo funcionan los pagos recurrentes y domiciliaciones?",
      a: "Configura pagos automáticos para Netflix, luz, agua, etc. desde la sección 'Pagos'. Zelloh notifica 3 días antes del cargo. Puedes pausar/cancelar cualquier domiciliación en un clic. Las devoluciones de domiciliaciones son automáticas y gratuitas si hay fondos insuficientes (sin comisiones de rechazo)."
    },
    {
      q: "¿Puedo recibir transferencias desde el extranjero?",
      a: "Sí, puedes recibir transferencias SWIFT de cualquier país. Proporciona tu IBAN y BIC (ZLLHESMMXXX). Las transferencias en euros llegan sin comisión. Para divisas extranjeras: conversión automática a tipo de cambio real (sin markup oculto) + €5 comisión fija por transferencia."
    },
    {
      q: "¿Cómo pago con Apple Pay/Google Pay?",
      a: "Añade tu tarjeta Zelloh a Apple Pay o Google Pay desde la app: 'Tarjetas' → 'Añadir a Apple Pay/Google Pay'. Una vez añadida, paga acercando tu teléfono en terminales contactless. Igual de seguro que tu tarjeta física, con verificación biométrica adicional."
    }
  ],
  kids: [
    {
      q: "¿Cómo funciona Zelloh Kids?",
      a: "Zelloh Kids permite a padres crear cuentas controladas para hijos de 6-17 años. Los padres: establecen límites de gasto, reciben notificaciones de transacciones, bloquean categorías de gasto (como juegos online). Los niños: aprenden a gestionar dinero con tarjeta prepago, app amigable y recompensas por tareas. Coste: €2/mes por niño, primer mes gratis."
    },
    {
      q: "¿Qué controles parentales ofrece Zelloh Kids?",
      a: "Controles completos: 1) Límite de gasto diario/semanal, 2) Bloqueo por categorías (juegos, restaurantes, etc.), 3) Geolocalización de gastos, 4) Aprobación manual de compras grandes, 5) Alertas instantáneas, 6) Estadísticas de gastos educativas, 7) Tareas y recompensas programables."
    },
    {
      q: "¿Es seguro Zelloh Kids para niños?",
      a: "Totalmente seguro: 1) Sin publicidad, 2) Sin compras in-app automáticas, 3) Sin acceso a crédito, 4) Verificación de edad en todos los comercios, 5) Protección contra bullying financiero, 6) Educación financiera integrada, 7) Seguro anti-fraude igual que cuentas adultas."
    }
  ],
  nfts: [
    {
      q: "¿Puedo comprar y vender NFTs con Zelloh?",
      a: "Sí, Zelloh tiene integración directa con OpenSea, Rarible y principales marketplaces de NFTs. Conéctate desde la app, explora NFTs, compra con un clic usando tu saldo Zelloh. También puedes recibir y enviar NFTs a otros Zellers gratuitamente. Próximamente: creación de NFTs directamente desde la app y mercado P2P interno."
    },
    {
      q: "¿Cómo almaceno mis NFTs de forma segura?",
      a: "Zelloh ofrece wallet NFT integrada: 1) Almacenamiento en frío para NFTs valiosos, 2) Backup automático en múltiples ubicaciones, 3) Seguro hasta €10,000 contra pérdida/hackeo, 4) Herencia digital (designa beneficiarios), 5) Visualizador 3D integrado, 6) Metadata completa accesible."
    },
    {
      q: "¿Puedo usar mis NFTs como colateral para préstamos?",
      a: "Sí, con Zelloh NFT Loans. Pignora tu NFT (BAYC, CryptoPunks, etc.) y recibe hasta el 40% de su valor en euros inmediatamente. Tasa desde el 5% anual. Si el valor del NFT sube, puedes aumentar el préstamo. Si baja, tienes 30 días para añadir garantía adicional antes de liquidación."
    }
  ],
  juega: [
    {
      q: "¿Cómo juego y gana recompensas en Zelloh?",
      a: "En la sección 'Juega' encontrarás: 1) Ruleta diaria (gira y gana hasta €50), 2) Retos semanales (ej: 'gasta €100 en restaurantes, gana €10'), 3) Torneos (compite con otros Zellers, premios hasta €1000), 4) Zelloh Arcade (minijuegos con premios en cripto). Todo gratuito, solo para clientes activos."
    },
    {
      q: "¿Qué son los Zelloh Tournaments?",
      a: "Competiciones mensuales donde compites contra otros Zellers en desafíos financieros: ahorro inteligente, inversión, educación financiera. Premios: 1er puesto €1,000, 2do €500, 3ro €250 + 10 premios de €100. Basado en puntos por buenas decisiones financieras, no en suerte."
    },
    {
      q: "¿Puedo ganar criptomonedas jugando?",
      a: "Sí, en Zelloh Arcade: completa minijuegos educativos y gana 'Z-Coins' canjeables por Bitcoin, Ethereum o stablecoins. También hay 'Learn & Earn': completa lecciones de finanzas y gana cripto. Todo regulado y declarable para impuestos automáticamente."
    }
  ],
  dogtor: [
    {
      q: "¿Qué es Zelloh by Dogtor Pay?",
      a: "Es nuestra tecnología patentada de pagos P2P ultra-rápidos. Usa identificación por voz + geolocalización para enviar dinero diciendo 'Paga €20 a María'. Funciona en WhatsApp, Telegram, Signal y mensajes nativos del teléfono. El receptor recibe notificación push y el dinero en su cuenta al instante, sin necesidad de estar en la app."
    },
    {
      q: "¿Es seguro pagar por voz?",
      a: "Totalmente seguro: 1) Verificación de voz única (imposible de imitar), 2) Geolocalización coincidente, 3) Límites de seguridad por contacto, 4) Confirmación por huella/rostro para cantidades grandes, 5) Grabación encriptada de todas las transacciones, 6) Reversión instantánea si detecta anomalías."
    },
    {
      q: "¿En qué apps funciona Dogtor Pay?",
      a: "Funciona en: WhatsApp, Telegram, Signal, iMessage, SMS, Discord, Slack, y cualquier app de mensajería. Solo necesitas decir el comando mágico '@zelloh pay' seguido de la cantidad y el contacto. También funciona con asistentes de voz: 'Hey Siri, paga €15 a Juan con Zelloh'."
    }
  ],
  contacto: [
    {
      q: "¿Cómo contacto con soporte de Zelloh?",
      a: "1) Chat en la app 24/7 (respuesta en <2 minutos), 2) Teléfono: 900 123 456 (España) o +34 911 234 567 (internacional), 3) Email: hola@zelloh.com, 4) Redes: @zellohbank en Twitter/Instagram, 5) Oficinas físicas en Madrid y Barcelona (con cita previa). Soporte en español, inglés, catalán y gallego."
    },
    {
      q: "¿Qué países soporta Zelloh actualmente?",
      a: "Zelloh está disponible en toda la Unión Europea, Reino Unido y Suiza. Próximamente en 2024: México, Colombia, Argentina y Chile. Para residentes fuera de la UE puedes abrir cuenta si tienes NIE español o pasaporte europeo. Las transferencias internacionales están disponibles a más de 50 países."
    },
    {
      q: "¿Hay límites de operativa en mi cuenta?",
      a: "Límites estándar: Ingresos €10,000/mes, Retiradas €5,000/día, Transferencias €15,000/día, Compras online €2,500/transacción. Puedes solicitar aumentos verificando ingresos. Límites para cuentas verificadas Plus: hasta €50,000/mes. Empresas y freelancers pueden solicitar límites personalizados."
    },
    {
      q: "¿Cuál es el horario de atención al cliente?",
      a: "Chat y teléfono: 24/7 los 365 días del año. Oficinas físicas: L-V 9:00-19:00, S 10:00-14:00 (con cita previa). Respuesta a emails: <4 horas en horario laboral, <12 horas fuera de horario. Emergencias (bloqueo de cuenta, fraude): respuesta inmediata 24/7."
    }
  ]
};

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState('cuenta');
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

  // Obtener FAQs de la categoría activa
  const activeFaqs = faqsByCategory[activeCategory as keyof typeof faqsByCategory] || [];
  
  // Obtener icono y título de la categoría activa
  const activeCatData = categories.find(cat => cat.id === activeCategory);

  // Cerrar sidebar al cambiar categoría en móvil/tablet
  useEffect(() => {
    if (isMobile || isTablet) {
      setSidebarOpen(false);
    }
  }, [activeCategory, isMobile, isTablet]);

  return (
    <main className="bg-black text-white min-h-screen font-sans overflow-x-hidden">
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

      <section className="pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 max-w-[1400px] mx-auto flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-20 relative">
        
        {/* 1. SIDEBAR DE CATEGORÍAS - Responsive */}
        <aside className={`
          ${isMobile || isTablet 
            ? `fixed inset-y-0 left-0 z-40 w-[280px] sm:w-[320px] bg-black border-r border-white/10 transform transition-transform duration-300 ease-in-out pt-24 px-4 sm:px-6 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'w-full md:w-64 lg:w-80 flex flex-col gap-2 sm:gap-3 shrink-0'
          }
        `}>
          {/* Overlay para móvil/tablet */}
          {(isMobile || isTablet) && sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <div className="space-y-1 sm:space-y-2 relative z-40">
            {categories.map((cat) => (
              <button
                key={cat.id} 
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(0);
                }}
                className={`w-full flex items-center gap-3 sm:gap-4 cursor-pointer transition-all group text-left p-3 sm:p-4 rounded-lg sm:rounded-xl ${
                  activeCategory === cat.id 
                    ? 'bg-gradient-to-r from-[#E6F379]/20 to-transparent opacity-100 border-l-2 sm:border-l-4 border-[#E6F379]' 
                    : 'opacity-70 hover:opacity-100 hover:bg-white/5'
                }`}
              >
                <span className="text-xl sm:text-2xl lg:text-3xl filter drop-shadow-md shrink-0">{cat.icon}</span>
                <span className={`text-base sm:text-lg lg:text-xl xl:text-2xl font-black tracking-tighter ${
                  activeCategory === cat.id ? 'text-[#E6F379]' : 'text-zinc-300'
                }`}>
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* 2. CONTENIDO PRINCIPAL: ACORDEONES - Responsive */}
        <div className={`
          flex-1 
          ${isMobile || isTablet ? 'w-full' : ''}
          transition-all duration-300
        `}>
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 lg:mb-12">
            <span className="text-3xl sm:text-4xl lg:text-5xl">{activeCatData?.icon || '❓'}</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter">{activeCatData?.name || 'Ayuda'}</h1>
          </div>

          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-zinc-400 mb-6 sm:mb-8 lg:mb-10 max-w-4xl">
            {activeCategory === 'cuenta' && "Todo sobre tu cuenta Zelloh: registro, gestión, problemas comunes y configuración."}
            {activeCategory === 'tarjeta' && "Información sobre tarjetas virtuales y físicas, activación, bloqueos y límites."}
            {activeCategory === 'bonuses' && "Cómo ganar dinero extra con referidos, cashback, hacks y programas de fidelidad."}
            {activeCategory === 'seguridad' && "Protección de tu dinero, seguros, privacidad y medidas de seguridad avanzadas."}
            {activeCategory === 'pagos' && "Transferencias, domiciliaciones, pagos internacionales y métodos de pago modernos."}
            {activeCategory === 'kids' && "Cuentas para menores, controles parentales, educación financiera y seguridad infantil."}
            {activeCategory === 'nfts' && "Compra, venta, almacenamiento y financiación de NFTs con tecnología blockchain."}
            {activeCategory === 'juega' && "Minijuegos, retos, torneos y programas de recompensas gamificados."}
            {activeCategory === 'dogtor' && "Tecnología de pagos por voz, mensajería y asistentes virtuales inteligentes."}
            {activeCategory === 'contacto' && "Canales de soporte, horarios, países disponibles y límites de operativa."}
          </p>

          <div className="space-y-3 sm:space-y-4">
            {activeFaqs.map((faq, i) => (
              <div 
                key={i} 
                className="bg-[#0A0A0A] border border-white/5 rounded-xl sm:rounded-2xl overflow-hidden transition-all hover:border-white/10 hover:bg-white/2"
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex justify-between items-center p-4 sm:p-5 lg:p-8 text-left group"
                >
                  <span className={`text-sm sm:text-base lg:text-lg xl:text-xl font-bold tracking-tight pr-3 sm:pr-4 lg:pr-8 ${
                    openIndex === i ? 'text-white' : 'text-zinc-200'
                  }`}>
                    {faq.q}
                  </span>
                  <div className="flex-shrink-0">
                    {openIndex === i ? (
                      <FiMinusCircle className="text-lg sm:text-xl lg:text-2xl text-[#E6F379]" />
                    ) : (
                      <FiPlusCircle className="text-lg sm:text-xl lg:text-2xl text-zinc-500 group-hover:text-zinc-300" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 lg:px-8 pb-4 sm:pb-5 lg:pb-8 text-xs sm:text-sm lg:text-base xl:text-lg text-zinc-300 leading-relaxed font-medium max-w-5xl">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* BOTÓN DE AYUDA ADICIONAL - Responsive con enlace a WhatsApp */}
          <div className="mt-10 sm:mt-12 lg:mt-16 p-4 sm:p-5 lg:p-8 bg-gradient-to-r from-[#E6F379]/10 to-[#7D26FF]/10 rounded-2xl sm:rounded-3xl border border-white/5">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-black mb-2 sm:mb-3 lg:mb-4">¿No encuentras lo que buscas?</h3>
            <p className="text-xs sm:text-sm lg:text-base text-zinc-400 mb-4 sm:mb-5 lg:mb-6">Nuestro equipo de soporte está disponible 24/7 para ayudarte con cualquier duda o problema.</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a 
                href="https://wa.me/34900123456?text=Hola%20Zelloh%2C%20necesito%20ayuda%20con..."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#E6F379] text-black px-4 sm:px-5 lg:px-8 py-3 sm:py-3 lg:py-4 rounded-full font-bold text-xs sm:text-sm lg:text-base hover:scale-105 transition-transform"
              >
                💬 WhatsApp Support
              </a>
              <a 
                href="tel:900123456"
                className="inline-flex items-center justify-center bg-transparent border border-zinc-700 text-white px-4 sm:px-5 lg:px-8 py-3 sm:py-3 lg:py-4 rounded-full font-bold text-xs sm:text-sm lg:text-base hover:bg-white/5 transition-colors"
              >
                📞 900 123 456
              </a>
              <a 
                href="mailto:hola@zelloh.com"
                className="inline-flex items-center justify-center bg-transparent border border-zinc-700 text-white px-4 sm:px-5 lg:px-8 py-3 sm:py-3 lg:py-4 rounded-full font-bold text-xs sm:text-sm lg:text-base hover:bg-white/5 transition-colors"
              >
                📧 support@zelloh.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}