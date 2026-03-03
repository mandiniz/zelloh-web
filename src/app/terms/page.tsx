"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import { motion } from "framer-motion";

const termSections = [
  { 
    id: 'general', 
    title: '1. Términos Generales', 
    content: `Bienvenido a Zelloh. Al acceder o utilizar nuestros servicios, usted acepta cumplir integralmente con estos Términos y Condiciones. Zelloh es una plataforma tecnológica financiera operada bajo las licencias regulatorias correspondientes en cada jurisdicción donde opera, actuando como un habilitador tecnológico que conecta a los usuarios con servicios financieros proporcionados por entidades reguladas.

Zelloh no es un banco ni una institución de crédito, sino un interfaz tecnológico que facilita el acceso a productos financieros. Los fondos de los usuarios están protegidos en cuentas de custodia separadas y no se utilizan para operaciones propias de la plataforma. La empresa se reserva el derecho de modificar estos términos en cualquier momento, notificando los cambios con al menos 15 días de antelación.` 
  },
  { 
    id: 'registro', 
    title: '2. Registro y Cuentas', 
    content: `Para ser un "Zeller", debe ser mayor de 18 años (o 14 con supervisión parental en Zelloh Kids). El registro requiere información veraz, completa y actualizada, incluyendo documento de identidad válido, comprobante de domicilio y, en algunos casos, información fiscal.

Usted es responsable de mantener la confidencialidad de sus credenciales y de todas las actividades que ocurran bajo su cuenta. Zelloh implementa autenticación de dos factores (2FA) y recomienda su activación. En caso de pérdida o robo de credenciales, debe notificarlo inmediatamente a soporte@zelloh.com. La empresa no se responsabiliza por accesos no autorizados debido a negligencia del usuario.` 
  },
  { 
    id: 'uso', 
    title: '3. Uso Aceptable', 
    content: `Queda estrictamente prohibido el uso de Zelloh para: (i) actividades ilícitas, lavado de dinero o financiación del terrorismo; (ii) transacciones con criptomonedas en jurisdicciones no habilitadas; (iii) vulneración de derechos de propiedad intelectual; (iv) acoso, fraude o suplantación de identidad; (v) explotación de menores o pornografía infantil.

Zelloh implementa sistemas de monitoreo automatizado y reporta actividades sospechosas a las autoridades competentes (UIF/AML). El incumplimiento resultará en suspensión inmediata de la cuenta y posible acción legal. Los usuarios aceptan someterse a verificaciones periódicas de cumplimiento normativo.` 
  },
  { 
    id: 'tarjetas', 
    title: '4. Emisión de Tarjetas', 
    content: `Las tarjetas Zelloh (físicas y virtuales) son emitidas por nuestros partners bancarios autorizados por Mastercard® y Visa®, bajo licencia oficial. El plástico es propiedad del emisor y debe devolverse al cancelar la cuenta.

El uso de la tarjeta está sujeto a límites de gasto configurables en la aplicación. Zelloh no cobra comisiones por emisión, pero pueden aplicar cargos por: reposición ($5.00), transacciones internacionales (1.5%), y uso en cajeros fuera de la red ($2.00). Los cargos no autorizados deben reportarse dentro de 48 horas hábiles.` 
  },
  { 
    id: 'nfts', 
    title: '5. Activos Digitales y NFTs', 
    content: `Zelloh facilita el acceso a mercados de NFTs y criptoactivos a través de integración con exchanges regulados. Usted reconoce que: (i) los activos digitales son altamente volátiles y no están garantizados por ningún gobierno o banco central; (ii) Zelloh no ofrece asesoramiento financiero ni garantiza rentabilidad; (iii) las transacciones en blockchain son irreversibles.

La custodia de activos digitales se realiza mediante wallets con seguridad de grado institucional (multifirma y almacenamiento en frío). Zelloh no se responsabiliza por pérdidas derivadas de fluctuaciones del mercado, errores en direcciones de envío, o forks de blockchain no soportados.` 
  },
  { 
    id: 'cancelacion', 
    title: '6. Cancelación y Suspensión', 
    content: `Zelloh puede suspender cuentas que: (i) muestren patrones de fraude o actividad sospechosa; (ii) incumplan estos términos; (iii) presenten deudas vencidas por más de 90 días; (iv) sean objeto de requerimientos judiciales o regulatorios.

Usted puede cerrar su cuenta en cualquier momento desde la configuración, siempre que no existan transacciones pendientes, saldos negativos o disputas activas. Los fondos remanentes se transferirán a su cuenta bancaria vinculada dentro de 10 días hábiles. Zelloh conservará sus datos por 5 años por obligaciones legales (Ley de Prevención de Lavado de Activos).` 
  },
];

export default function TermsPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#f4e452] selection:text-black">
      <Header />

      <section className="pt-40 pb-20 px-6 max-w-[1400px] mx-auto">
        <div className="mb-20">
          <h1 className="text-7xl md:text-9xl font-[1000] italic uppercase tracking-tighter leading-none mb-6">
            Términos <span className="text-[#f4e452]">Legales</span>
          </h1>
          <p className="text-zinc-500 font-black uppercase tracking-[0.5em] text-xs">
            Última actualización: 30 de Enero, 2026
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* NAVEGACIÓN LATERAL */}
          <aside className="lg:w-1/3 flex flex-col gap-2">
            {termSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`p-6 rounded-2xl text-left transition-all border ${
                  activeTab === section.id 
                  ? 'bg-[#f4e452] text-black border-[#f4e452] font-black italic scale-105 shadow-[0_0_30px_rgba(244,228,82,0.3)]' 
                  : 'bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10'
                }`}
              >
                {section.title}
              </button>
            ))}
          </aside>

          {/* CONTENIDO TEXTUAL */}
          <div className="lg:w-2/3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 p-12 rounded-[3rem] border border-white/10"
            >
              <h2 className="text-4xl font-[1000] italic uppercase tracking-tighter mb-8 text-[#f4e452]">
                {termSections.find(s => s.id === activeTab)?.title}
              </h2>
              <div className="text-zinc-300 text-xl leading-relaxed space-y-6 font-medium">
                {termSections.find(s => s.id === activeTab)?.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-6 last:mb-0">
                    {paragraph}
                  </p>
                ))}
                
                {/* NOTA LEGAL ADICIONAL */}
                <div className="p-8 bg-gradient-to-br from-black to-zinc-900 rounded-3xl border border-[#f4e452]/20 text-sm text-zinc-400 italic mt-10">
                  <p className="font-bold text-[#f4e452] uppercase tracking-wider mb-2 not-italic">
                    ⚖️ Aviso Legal Importante
                  </p>
                  <p>
                    Este documento constituye un resumen ejecutivo de las cláusulas esenciales. El contrato completo, incluyendo los anexos técnicos y el folleto de tarifas, está disponible en formato PDF en el área de usuario. Para transacciones superiores a $10,000, se requerirá firma digital avanzada según la Ley 25.326 de Protección de Datos Personales.
                  </p>
                  <p className="mt-4 text-[10px] text-zinc-600 font-mono">
                    v.2026.01 - Cumple con RGPD (UE), CCPA (California) y Ley de Fintech (LATAM)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}