"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { FiPlus, FiMinus, FiMapPin, FiExternalLink, FiChevronRight, FiArrowRight, FiX, FiCreditCard, FiUser, FiMail, FiPhone, FiHome } from "react-icons/fi";
import { FaTicketAlt, FaGlobeAmericas, FaVrCardboard, FaDiscord, FaTwitter } from "react-icons/fa";
import { SiDecentraland } from "react-icons/si";
import { useState, useRef, useEffect } from "react";
import { FaX } from "react-icons/fa6";

// Tipos para tickets
type TicketType = {
  name: string;
  price: number;
  quantity: number;
  available: number;
  isSoldOut: boolean;
};

export default function VirtualOfficePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Estados para el formulario
  const [tickets, setTickets] = useState<TicketType[]>([
    { name: "Decenter Pass", price: 50, quantity: 1, available: 25, isSoldOut: false },
    { name: "Blockchain VIP", price: 500, quantity: 2, available: 100, isSoldOut: false },
    { name: "Decentralized Elite", price: 995, quantity: 0, available: 0, isSoldOut: true },
  ]);

  const [formData, setFormData] = useState({
    fullName: "",
    surname: "",
    email: "",
    phoneNumber: "+34",
    accountNumber: "",
    address: "",
    addressComplement: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const [paymentData, setPaymentData] = useState({
    cardName: "Ricardo Mandini",
    cardNumber: "XXXX XXXX XXXX XXXX",
    expiration: "",
    country: "",
    issueCountry: "",
  });

  // Calcular total
  const totalAmount = tickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0);
  const totalQuantity = tickets.reduce((sum, ticket) => sum + ticket.quantity, 0);

  // Efecto de spotlight siguiendo el mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const steps = [
    { 
      n: "01", 
      t: "Acceso Universal", 
      d: "Web, móvil o VR. Sin barreras, entra a Decentraland al instante.", 
      icon: <FaGlobeAmericas />,
      color: "from-blue-500 to-cyan-400"
    },
    { 
      n: "02", 
      t: "Avatar Digital", 
      d: "Tu identidad Web3 personalizada lista para explorar Zellohland.", 
      icon: <FaVrCardboard />,
      color: "from-purple-500 to-pink-500"
    },
    { 
      n: "03", 
      t: "District X", 
      d: "Navega a las coordenadas 8,68. El epicentro del lujo virtual.", 
      icon: <FiMapPin />,
      color: "from-[#E6F379] to-yellow-400"
    },
    { 
      n: "04", 
      t: "Live Support", 
      d: "Atención real dentro del metaverso. Banca humana en 3D.", 
      icon: <FiExternalLink />,
      color: "from-green-500 to-emerald-400"
    }
  ];

  // Efectos de parallax
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.5]);

  // Funciones para manejar tickets
  const updateTicketQuantity = (index: number, change: number) => {
    if (tickets[index].isSoldOut) return;
    
    const newTickets = [...tickets];
    const newQuantity = newTickets[index].quantity + change;
    
    if (newQuantity >= 0 && newQuantity <= newTickets[index].available) {
      newTickets[index].quantity = newQuantity;
      setTickets(newTickets);
    }
  };

  // Funciones para navegación entre modales
  const handleGetTickets = () => {
    setShowTicketModal(true);
  };

  const handleContinueToDetails = () => {
    if (totalQuantity > 0) {
      setShowTicketModal(false);
      setShowDetailsModal(true);
    }
  };

  const handleContinueToPayment = () => {
    // Validación básica del formulario
    if (formData.fullName && formData.email) {
      setShowDetailsModal(false);
      setShowPaymentModal(true);
    }
  };

  const handleCompletePayment = () => {
    setShowPaymentModal(false);
    setShowSuccessModal(true);
  };

  // Renderizar modal de tickets
  const renderTicketModal = () => (
    <AnimatePresence>
      {showTicketModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl"
          onClick={(e) => e.target === e.currentTarget && setShowTicketModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gradient-to-br from-[#050505] to-[#0a0a0a] rounded-2xl sm:rounded-[2rem] border border-white/10 shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 md:p-8 border-b border-white/10 sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-10">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black">Tickets</h2>
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <FiX className="text-sm sm:text-base" />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400">Selecciona tus entradas para el evento</p>
            </div>

            {/* Ticket List */}
            <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
              {tickets.map((ticket, index) => (
                <div key={index} className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">{ticket.name}</h3>
                      <p className="text-2xl sm:text-3xl font-black text-[#E6F379]">${ticket.price}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-xs sm:text-sm text-zinc-400 mb-2">Quantity</div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          onClick={() => updateTicketQuantity(index, -1)}
                          disabled={ticket.quantity === 0 || ticket.isSoldOut}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          <FiMinus className="text-xs sm:text-sm" />
                        </button>
                        <span className="text-base sm:text-xl font-bold w-6 sm:w-8 text-center">{ticket.quantity}</span>
                        <button
                          onClick={() => updateTicketQuantity(index, 1)}
                          disabled={ticket.quantity >= ticket.available || ticket.isSoldOut}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          <FiPlus className="text-xs sm:text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-400 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span>{ticket.isSoldOut ? "Sold Out" : `${ticket.available} seats available`}</span>
                    {ticket.quantity > 0 && (
                      <span className="text-white font-bold text-sm sm:text-base">
                        ${(ticket.price * ticket.quantity).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="p-4 sm:p-6 md:p-8 border-t border-white/10 bg-black/30 sticky bottom-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div>
                  <div className="text-xs sm:text-sm text-zinc-400">Quantity:</div>
                  <div className="text-xl sm:text-2xl font-bold">{totalQuantity}</div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-xs sm:text-sm text-zinc-400">Total:</div>
                  <div className="text-2xl sm:text-3xl font-black text-[#E6F379]">${totalAmount.toLocaleString()}</div>
                </div>
              </div>
              <button
                onClick={handleContinueToDetails}
                disabled={totalQuantity === 0}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-[#E6F379] to-[#7D26FF] text-black font-bold rounded-xl sm:rounded-2xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <FaTicketAlt />
                Get tickets
                <FiArrowRight />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Renderizar modal de detalles personales
  const renderDetailsModal = () => (
    <AnimatePresence>
      {showDetailsModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl"
          onClick={(e) => e.target === e.currentTarget && setShowDetailsModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gradient-to-br from-[#050505] to-[#0a0a0a] rounded-2xl sm:rounded-[2rem] border border-white/10 shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 md:p-8 border-b border-white/10 sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-10">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black">Enter event details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <FiX className="text-sm sm:text-base" />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#E6F379] text-black flex items-center justify-center text-xs font-bold">1</div>
                  <span>Personal Information</span>
                </div>
                <div className="hidden sm:block flex-1 h-px bg-white/10"></div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/20 text-xs flex items-center justify-center">2</div>
                  <span className="text-white/30">Payment</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
              {[
                { label: "Full Name", icon: <FiUser />, value: formData.fullName, placeholder: "Enter your full name", field: "fullName" },
                { label: "Surname", icon: <FiUser />, value: formData.surname, placeholder: "Enter your surname", field: "surname" },
                { label: "Email (Associated with Zelloh INC)", icon: <FiMail />, value: formData.email, placeholder: "Enter your email address", field: "email", type: "email" },
                { label: "Phone Number", icon: <FiPhone />, value: formData.phoneNumber, placeholder: "+34", field: "phoneNumber" },
                { label: "Account Number", icon: <FiCreditCard />, value: formData.accountNumber, placeholder: "Account Number", field: "accountNumber" },
                { label: "Your address", icon: <FiHome />, value: formData.address, placeholder: "Search your address", field: "address" },
                { label: "Address complement", icon: <FiHome />, value: formData.addressComplement, placeholder: "Search your address", field: "addressComplement" },
                { label: "City", icon: <FiHome />, value: formData.city, placeholder: "Search your address", field: "city" },
                { label: "Zip code", icon: <FiHome />, value: formData.zipCode, placeholder: "Search your address", field: "zipCode" },
                { label: "Country", icon: <FiHome />, value: formData.country, placeholder: "Search your address", field: "country" },
              ].map((field, index) => (
                <div key={index} className="space-y-1 sm:space-y-2">
                  <label className="text-xs sm:text-sm text-zinc-400 font-medium">{field.label}</label>
                  <div className="relative">
                    <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 text-sm sm:text-base">
                      {field.icon}
                    </div>
                    <input
                      type={field.type || "text"}
                      value={field.value}
                      onChange={(e) => setFormData({...formData, [field.field]: e.target.value})}
                      placeholder={field.placeholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl pl-9 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-sm sm:text-base focus:outline-none focus:border-[#E6F379]/50 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 md:p-8 border-t border-white/10 sticky bottom-0 bg-[#050505]/80 backdrop-blur-xl">
              <button
                onClick={handleContinueToPayment}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-[#E6F379] to-[#7D26FF] text-black font-bold rounded-xl sm:rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                Continue
                <FiArrowRight />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Renderizar modal de pago
  const renderPaymentModal = () => (
    <AnimatePresence>
      {showPaymentModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl"
          onClick={(e) => e.target === e.currentTarget && setShowPaymentModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gradient-to-br from-[#050505] to-[#0a0a0a] rounded-2xl sm:rounded-[2rem] border border-white/10 shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 md:p-8 border-b border-white/10 sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-10">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black">Pay with card</h2>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <FiX className="text-sm sm:text-base" />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 mb-4 sm:mb-6">
                We don't accept prepaid or business cards.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/20 text-xs flex items-center justify-center">1</div>
                  <span className="text-white/30">Personal Information</span>
                </div>
                <div className="hidden sm:block flex-1 h-px bg-white/10"></div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#E6F379] text-black flex items-center justify-center text-xs font-bold">2</div>
                  <span>Payment</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs sm:text-sm text-zinc-400 font-medium">Name on card</label>
                <input
                  type="text"
                  value={paymentData.cardName}
                  onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base focus:outline-none focus:border-[#E6F379]/50 transition-colors"
                />
              </div>

              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs sm:text-sm text-zinc-400 font-medium">Card number</label>
                <div className="relative">
                  <input
                    type="text"
                    value={paymentData.cardNumber}
                    onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 sm:py-4 pl-12 sm:pl-16 text-sm sm:text-base focus:outline-none focus:border-[#E6F379]/50 transition-colors"
                  />
                  <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-blue-500 font-bold text-xs sm:text-sm">
                    VISA
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <label className="text-xs sm:text-sm text-zinc-400 font-medium">Expiration MM/YY</label>
                  <input
                    type="text"
                    value={paymentData.expiration}
                    onChange={(e) => setPaymentData({...paymentData, expiration: e.target.value})}
                    placeholder="MM/YY"
                    className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base focus:outline-none focus:border-[#E6F379]/50 transition-colors"
                  />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <label className="text-xs sm:text-sm text-zinc-400 font-medium">Country</label>
                  <input
                    type="text"
                    value={paymentData.country}
                    onChange={(e) => setPaymentData({...paymentData, country: e.target.value})}
                    placeholder="Country"
                    className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base focus:outline-none focus:border-[#E6F379]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs sm:text-sm text-zinc-400 font-medium">Issue Country</label>
                <input
                  type="text"
                  value={paymentData.issueCountry}
                  onChange={(e) => setPaymentData({...paymentData, issueCountry: e.target.value})}
                  placeholder="Issue Country"
                  className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base focus:outline-none focus:border-[#E6F379]/50 transition-colors"
                />
              </div>

              <p className="text-xs text-zinc-400">
                By adding a new card, you agree to the <a href="#" className="text-[#E6F379] underline">credit/debit terms</a>.
              </p>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 md:p-8 border-t border-white/10 sticky bottom-0 bg-[#050505]/80 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div className="text-xs sm:text-sm text-zinc-400">
                  Total Amount:
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#E6F379]">
                  ${totalAmount.toLocaleString()}
                </div>
              </div>
              <button
                onClick={handleCompletePayment}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-[#E6F379] to-[#7D26FF] text-black font-bold rounded-xl sm:rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <FiCreditCard />
                Pay now
              </button>
              <p className="text-center text-xs text-zinc-400 mt-4">
                Processed by Zelloh
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Renderizar modal de éxito
  const renderSuccessModal = () => (
    <AnimatePresence>
      {showSuccessModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl"
          onClick={(e) => e.target === e.currentTarget && setShowSuccessModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gradient-to-br from-[#050505] to-[#0a0a0a] rounded-2xl sm:rounded-[2rem] border border-white/10 shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 md:p-8 border-b border-white/10 sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="text-xl sm:text-2xl md:text-3xl font-black">zeljoh</div>
                  <div className="px-2 sm:px-3 py-1 bg-[#E6F379] text-black rounded-full text-xs font-bold">
                    ADMIT ONE
                  </div>
                </div>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <FiX className="text-sm sm:text-base" />
                </button>
              </div>
              <div className="text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">¿You are ready?</h3>
                <p className="text-xs sm:text-sm text-[#E6F379] font-medium">
                  CONGRATULATIONS, you have purchase sucessful the tickets for our METAVERSE EVENT on DECENTERLAND WORLD.
                </p>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
              {/* Ticket Info */}
              <div className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                  <div>
                    <div className="text-xs text-zinc-400">Ticket ID</div>
                    <div className="text-base sm:text-xl font-bold">0523771</div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-xs text-zinc-400">Date</div>
                    <div className="text-base sm:text-xl font-bold">05/25/77</div>
                  </div>
                </div>
                <div className="text-center text-2xl sm:text-3xl font-black text-[#E6F379]">X3</div>
              </div>

              {/* Personal Details */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-base sm:text-lg font-bold">Check your details</h4>
                <div className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 space-y-3">
                  <div>
                    <div className="text-xs text-zinc-400 mb-1">Name</div>
                    <div className="text-sm sm:text-lg font-bold">Ricardo Valentino Mandini Zanchetta (29y)</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400 mb-1">Email</div>
                    <div className="text-sm sm:text-lg">mvndini@gmail.com</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400 mb-1">Phone</div>
                    <div className="text-sm sm:text-lg">+34 622 773 276</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400 mb-1">Address</div>
                    <div className="text-sm sm:text-lg">Calle Odonnell 19, 2C, 28009, Madrid, Spain</div>
                  </div>
                </div>
              </div>

              {/* Purchase Details */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-base sm:text-lg font-bold">Check your purchase details</h4>
                <div className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
                  <div className="space-y-2 sm:space-y-3 mb-4">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>X1 - General seat - Happy Hour Ticket</span>
                      <span className="font-bold">$50</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>X2 - V.I.Z seat - Very Important Zeller Ticket</span>
                      <span className="font-bold">$1,000</span>
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-3 sm:pt-4 flex justify-between text-base sm:text-xl font-bold">
                    <span>TOTAL:</span>
                    <span className="text-[#E6F379]">$1,050.00</span>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs sm:text-sm text-zinc-400">
                Your TICKETS for the event access has been sent to mvndini@gmail.com
              </p>
            </div>

            {/* Action Buttons */}
            <div className="p-4 sm:p-6 md:p-8 border-t border-white/10 sticky bottom-0 bg-[#050505]/80 backdrop-blur-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <button className="py-2.5 sm:py-3 bg-white/5 hover:bg-white/10 rounded-xl sm:rounded-2xl font-bold transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                  <span>Add to Apple Wallet</span>
                </button>
                <button className="py-2.5 sm:py-3 bg-gradient-to-r from-[#E6F379] to-[#7D26FF] text-black rounded-xl sm:rounded-2xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                  Download on PDF
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <main ref={containerRef} className="bg-[#050505] text-white min-h-screen font-sans overflow-x-hidden selection:bg-[#E6F379] selection:text-black">
      {/* Spotlight Background */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px sm:radial-gradient(800px at ${mousePos.x}px ${mousePos.y}px, rgba(230, 243, 121, 0.05), transparent 70%)`
        }}
      />
      
      {/* Grid background animado */}
      <div className="fixed inset-0 z-0 opacity-5 sm:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(230, 243, 121, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(230, 243, 121, 0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px sm:50px 50px',
        }} />
      </div>

      <Header />

      {/* 1. HERO: EXPERIENCIA INMERSIVA */}
      <section className="relative pt-32 sm:pt-40 md:pt-56 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 flex flex-col items-center min-h-screen">
        {/* Fondos animados */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-0 left-0 w-full h-[100vh] sm:h-[120vh] bg-gradient-to-b from-[#7D26FF]/10 via-transparent to-transparent pointer-events-none"
        />
        
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-0 right-0 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-gradient-to-tr from-[#E6F379]/5 to-transparent rounded-full blur-3xl pointer-events-none"
        />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10 relative w-full max-w-7xl mx-auto"
        >
          {/* Tag animado */}
          <motion.span 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="inline-block bg-gradient-to-r from-[#7D26FF] to-[#E6F379] text-black px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-black tracking-widest uppercase mb-4 sm:mb-6 md:mb-8"
          >
            Digital Borderless Banking
          </motion.span>
          
          <h1 className="text-[15vw] sm:text-[12vw] md:text-[10vw] font-[1000] leading-[0.75] tracking-[-0.06em] uppercase mb-4 sm:mb-6 md:mb-8">
            Zelloh
            <motion.span 
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 5,
                ease: "linear"
              }}
              className="block bg-gradient-to-r from-[#E6F379] via-white to-[#E6F379] bg-clip-text text-transparent bg-[length:200%_auto] mt-2 sm:mt-3 md:mt-4"
            >
              Land
            </motion.span>
          </h1>

          {/* Subtítulo con efecto de escritura */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-400 font-medium max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4"
          >
            El primer banco nativo del metaverso donde las finanzas se encuentran con la realidad virtual
          </motion.p>
        </motion.div>

        {/* Tarjeta principal con glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-[1400px] mt-8 sm:mt-12 md:mt-16 relative group px-4 sm:px-6"
        >
          <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-[#7D26FF] via-[#E6F379] to-[#7D26FF] rounded-2xl sm:rounded-3xl md:rounded-[4rem] blur-lg sm:blur-xl opacity-20 group-hover:opacity-30 transition-all duration-1000 animate-gradient"></div>
          
          <div className="relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-2xl sm:rounded-3xl md:rounded-[4rem] p-4 sm:p-6 md:p-10 lg:p-16 border border-white/10 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-12">
              <div className="lg:w-1/2 z-10">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black mb-3 sm:mb-4 md:mb-6 tracking-tighter">
                  El banco que 
                  <span className="block text-[#E6F379]">nunca duerme</span>
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-zinc-300 font-medium mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                  Hemos construido una infraestructura financiera dentro de <span className="text-[#E6F379] font-bold">District X</span>. 
                  Soporte real, eventos exclusivos y gestión de activos en tiempo real desde cualquier parte del mundo.
                </p>
                
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group/btn"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#E6F379] to-[#7D26FF] rounded-xl sm:rounded-2xl blur opacity-30 group-hover/btn:opacity-50 transition-opacity"></div>
                    <div className="relative bg-black text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-widest border border-white/20 flex items-center gap-2 sm:gap-3">
                      <SiDecentraland className="text-base sm:text-lg md:text-xl" />
                      <span className="hidden xs:inline">Entrar ahora</span>
                      <span className="xs:hidden">Entrar</span>
                      <FiArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                    </div>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-widest border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    <span className="hidden xs:inline">Ver Coordenadas</span>
                    <span className="xs:hidden">Coordenadas</span>
                  </motion.button>
                </div>
              </div>
              
              <div className="lg:w-1/2 relative">
                {/* Avatar 3D con efectos */}
                <div className="relative">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotateY: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#7D26FF] to-[#E6F379] rounded-2xl sm:rounded-3xl md:rounded-[3rem] blur-xl sm:blur-2xl opacity-20" />
                    <img 
                      src="/public/assets/logo-white.svg" 
                      className="relative w-full max-w-[250px] sm:max-w-[350px] md:max-w-[500px] mx-auto rounded-xl sm:rounded-2xl md:rounded-[2rem] shadow-2xl"
                      alt="Zelloh Metaverse"
                    />
                  </motion.div>
                  
                  {/* Partículas flotantes */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-[#E6F379] rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <span className="text-[10px] sm:text-xs text-zinc-500 font-bold tracking-widest">EXPLORAR</span>
            <div className="w-0.5 h-6 sm:h-8 bg-gradient-to-b from-[#E6F379] to-transparent rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* 2. PASOS DE ACCESO - CARDS INTERACTIVAS */}
      <section className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-3 sm:mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-white to-[#E6F379] bg-clip-text text-transparent">
                Acceso al Metaverso
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-400 max-w-2xl mx-auto px-4">
              4 pasos simples para entrar al futuro de las finanzas
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setActiveStep(i)}
                onMouseLeave={() => setActiveStep(null)}
                className="relative group"
              >
                {/* Card principal */}
                <div className={`relative h-full bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/10 shadow-xl transition-all duration-500 ${
                  activeStep === i ? 'scale-105 shadow-2xl' : ''
                }`}>
                  {/* Número grande */}
                  <div className="mb-4 sm:mb-6 md:mb-8">
                    <span className="text-4xl sm:text-5xl md:text-6xl font-black text-zinc-900 italic leading-none">
                      {step.n}
                    </span>
                  </div>
                  
                  {/* Ícono */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-base sm:text-lg md:text-2xl text-white mb-3 sm:mb-4 md:mb-6 shadow-lg ${
                    activeStep === i ? 'scale-110 rotate-12' : ''
                  } transition-transform duration-500`}>
                    {step.icon}
                  </div>
                  
                  {/* Contenido */}
                  <div>
                    <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 tracking-tight">
                      {step.t}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {step.d}
                    </p>
                  </div>
                </div>
                
                {/* Línea conectora (excepto última) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 w-6 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-full -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MAPA INTERACTIVO */}
      <section className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E6F379]/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Información */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6 md:space-y-8"
            >
              <div>
                <span className="text-[#E6F379] font-bold uppercase tracking-widest text-xs sm:text-sm mb-2 sm:mb-4 block">
                  Ubicación Digital
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[100px] font-black leading-[0.8] mb-4 sm:mb-6 md:mb-8">
                  Encuéntranos
                  <span className="block text-[#E6F379]">en el mapa</span>
                </h2>
              </div>
              
              {/* Tarjeta de coordenadas */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#E6F379] rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl text-black">
                    <FiMapPin />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-zinc-400 uppercase tracking-widest mb-1">
                      Coordenadas exactas
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black">
                      District X • 8,68
                    </p>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                      Decentraland • Planta baja del lujo virtual
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <p className="text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed max-w-md">
                El primer banco con presencia física en Madrid y presencia virtual permanente en el corazón de Decentraland.
              </p>
            </motion.div>
            
            {/* Mapa 3D */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl sm:rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl group">
                {/* Mapa con efecto de profundidad */}
                <img 
                  src="/public/assets/logo-white.svg" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[4s]"
                />
                
                {/* Overlay de gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Punto de localización */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity 
                  }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#E6F379] rounded-full border-2 sm:border-4 border-white" />
                    <div className="absolute -inset-2 sm:-inset-4 border-2 border-[#E6F379] rounded-full animate-ping" />
                  </div>
                </motion.div>
              </div>
              
              {/* Etiqueta flotante */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 md:-top-6 md:-right-6 bg-gradient-to-r from-[#7D26FF] to-[#E6F379] text-black px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full font-bold text-xs sm:text-sm shadow-lg"
              >
                ¡Aquí estamos!
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. EVENTOS - FULLSCREEN INMERSIVO */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 relative">
        <div className="max-w-[1600px] mx-auto relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-[4rem] overflow-hidden group">
          {/* Imagen de fondo con parallax */}
          <motion.div
            style={{ scale: useTransform(scrollYProgress, [0, 1], [1, 1.1]) }}
            className="absolute inset-0"
          >
            <img 
              src="/event-photo.jpg" 
              className="w-full h-full object-cover"
              alt="Evento Zelloh Metaverse"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </motion.div>
          
          {/* Contenido centrado */}
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-4 sm:space-y-6 md:space-y-8 max-w-4xl"
            >
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block bg-white/10 backdrop-blur-md px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest border border-white/20 mb-3 sm:mb-4 md:mb-6"
                >
                  Próximo Evento • 15 Feb 2024
                </motion.span>
                
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[100px] xl:text-[150px] font-black uppercase tracking-tighter leading-[0.9] mb-3 sm:mb-4 md:mb-6">
                  Zelloh
                  <span className="block text-[#E6F379]">Metaverse Gala</span>
                </h2>
                
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-zinc-300 font-medium max-w-2xl mx-auto px-4">
                  La inauguración oficial de nuestro espacio en District X. Networking, NFTs y finanzas del futuro.
                </p>
              </div>
              
              <motion.button
                onClick={handleGetTickets}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group/btn2 inline-block"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#E6F379] to-[#7D26FF] rounded-xl sm:rounded-2xl blur opacity-30 group-hover/btn2:opacity-50 transition-opacity"></div>
                <div className="relative bg-black text-white px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg uppercase tracking-widest border border-white/20 flex items-center gap-2 sm:gap-3 md:gap-4 mx-auto">
                  <FaTicketAlt />
                  <span>Obtener Entrada</span>
                  <FiArrowRight className="group-hover/btn2:translate-x-2 transition-transform" />
                </div>
              </motion.button>
            </motion.div>
          </div>
          
          {/* Elementos flotantes */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-[#E6F379] rounded-full"
              style={{
                left: `${10 + i * 20}%`,
                top: `${30 + Math.sin(i) * 20}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </section>

      {/* 5. FAQ - GLASSMORPHISM */}
      <section className="py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto">
          {/* Encabezado */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[100px] font-black mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-white to-[#E6F379] bg-clip-text text-transparent">
                Preguntas Frecuentes
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-zinc-400">
              Todo lo que necesitas saber sobre Zelloh en el metaverso
            </p>
          </motion.div>
          
          {/* FAQ Items */}
          <div className="space-y-3 sm:space-y-4">
            {[
              { 
                q: "¿Qué es el Metaverso de Zelloh?", 
                a: "Es una extensión completa de nuestros servicios bancarios donde los límites físicos desaparecen. Ofrecemos gestión de NFTs, soporte VR en tiempo real, eventos exclusivos y consultoría financiera dentro de entornos virtuales inmersivos." 
              },
              { 
                q: "¿Necesito gafas VR para entrar?", 
                a: "No es obligatorio. Zellohland es 100% accesible desde cualquier navegador web moderno en PC o móvil. Sin embargo, las gafas VR ofrecen la experiencia inmersiva completa con realidad virtual, recomendadas para eventos especiales y tours virtuales." 
              },
              { 
                q: "¿Cómo funcionan los eventos en el metaverso?", 
                a: "Los tickets se adquieren directamente en nuestra plataforma y se validan mediante tu wallet digital al ingresar a las coordenadas especificadas en District X. Cada evento incluye acceso exclusivo, networking con otros asistentes y oportunidades únicas de inversión." 
              },
              { 
                q: "¿Es seguro realizar transacciones en el metaverso?", 
                a: "Totalmente seguro. Utilizamos tecnología blockchain con encriptación de última generación, contratos inteligentes auditados y verificación multifactor. Todas las transacciones están aseguradas y monitorizadas 24/7 por nuestro equipo de seguridad." 
              }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden shadow-xl hover:shadow-2xl transition-all">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 p-4 sm:p-6 md:p-8 text-left"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center transition-all shrink-0 ${
                        openFaq === i 
                          ? 'bg-gradient-to-r from-[#E6F379] to-yellow-400 text-black' 
                          : 'bg-white/5 text-white'
                      }`}>
                        <span className="text-xs sm:text-sm md:text-base font-bold">{i + 1}</span>
                      </div>
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-tight">
                        {faq.q}
                      </span>
                    </div>
                    
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all self-end sm:self-center ${
                      openFaq === i 
                        ? 'bg-[#E6F379] text-black rotate-180' 
                        : 'bg-white/5 text-white'
                    }`}>
                      {openFaq === i ? <FiMinus className="text-xs sm:text-sm" /> : <FiPlus className="text-xs sm:text-sm" />}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8">
                          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-zinc-300 leading-relaxed pl-0 sm:pl-10 md:pl-14 lg:pl-20">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA FINAL - COMUNIDAD */}
      <section className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7D26FF]/10 via-transparent to-[#E6F379]/10" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[120px] font-black mb-4 sm:mb-6 md:mb-8 leading-[0.9]">
              Únete a la
              <span className="block text-[#E6F379]">Revolución</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-400 max-w-2xl mx-auto px-4">
              Conecta con miles de early adopters que están dando forma al futuro de las finanzas digitales
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-4xl mx-auto px-4">
            {[
              {
                title: "Discord Community",
                desc: "Chat en tiempo real con el equipo y otros miembros",
                icon: <FaDiscord />,
                color: "from-indigo-500 to-purple-500",
                action: "Unirse"
              },
              {
                title: "X Spaces",
                desc: "Eventos semanales y anuncios exclusivos",
                icon: <FaX />,
                color: "from-blue-400 to-cyan-400",
                action: "Seguir"
              },
              {
                title: "Newsletter VIP",
                desc: "Contenido exclusivo y early access a features",
                icon: <FiChevronRight />,
                color: "from-[#E6F379] to-yellow-400",
                action: "Suscribirse"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 border border-white/10 h-full flex flex-col justify-between hover:border-white/20 transition-all">
                  <div>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-3 sm:mb-4 md:mb-5 lg:mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mb-4 sm:mb-5 md:mb-6">
                      {item.desc}
                    </p>
                  </div>
                  
                  <button className="w-full py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 transition-colors font-bold text-xs sm:text-sm">
                    {item.action} →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Renderizar modales */}
      {renderTicketModal()}
      {renderDetailsModal()}
      {renderPaymentModal()}
      {renderSuccessModal()}
    </main>
  );
}