"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { FiPlusCircle, FiMinusCircle, FiDownload, FiPrinter, FiMenu, FiX } from "react-icons/fi";

const legalCategories = [
  { id: 'general', name: 'General', icon: '📱', active: true },
  { id: 'servicios', name: 'Nuestros servicios', icon: '📗' },
  { id: 'acceso', name: 'Acceso', icon: '🔐' },
  { id: 'cuenta', name: 'Tu cuenta', icon: '🖥️' },
  { id: 'socios', name: 'Socios y proveedores', icon: '📄' },
  { id: 'productos', name: 'Productos', icon: '📚' },
  { id: 'tarifas', name: 'Tarifas', icon: '💸' },
  { id: 'derechos', name: 'Derechos de modificacion', icon: '📝' },
  { id: 'garantias', name: 'Garantias', icon: '✏️' },
  { id: 'responsabilidad', name: 'Nuestra responsabilidad', icon: '💬' },
  { id: 'indemnizacion', name: 'Indemnizacion', icon: '⚠️' },
  { id: 'cancelaciones', name: 'Cancelaciones', icon: '❌' },
  { id: 'terminos', name: 'Otros terminos', icon: '🔎' },
  { id: 'fraude', name: 'Fraude', icon: '👮' },
  { id: 'transferencias', name: 'Transferencias', icon: '📍' },
  { id: 'kids', name: 'Zelloh Kids', icon: '🤵' },
  { id: 'domiciliaciones', name: 'Domiciliaciones', icon: '❓' },
  { id: 'cuotas', name: 'Cuotas', icon: '📮' },
  { id: 'nfts', name: 'Arte digital y NFT’s', icon: '🦄' },
];

// TODOS LOS TÉRMINOS LEGALES POR CATEGORÍA (se mantiene igual)
const legalItemsByCategory = {
  general: [
    {
      q: "¿Qué es Zelloh y qué servicios ofrece?",
      a: "Zelloh es una entidad de pago electrónico autorizada y regulada por el Banco de España (nº 15756). Ofrecemos servicios de pago, cuentas de pago electrónico, tarjetas prepago, transferencias SEPA, pagos internacionales, gestión de criptoactivos y servicios relacionados con NFTs. Nuestros servicios están disponibles a través de aplicación móvil y web, y operamos bajo la Directiva de Servicios de Pago (PSD2) y normativa española."
    },
    {
      q: "¿Cuál es la base legal de nuestra relación contractual?",
      a: "La relación entre Zelloh y el cliente se rige por: 1) Estos Términos y Condiciones, 2) Condiciones específicas de cada producto, 3) Tarifas vigentes, 4) Política de Privacidad, 5) Política de Cookies, 6) Legislación aplicable española y europea. Al registrarte, aceptas expresamente todos estos documentos que constituyen el contrato completo entre las partes."
    },
    {
      q: "¿Cuál es el ámbito territorial de nuestros servicios?",
      a: "Zelloh opera en todo el Espacio Económico Europeo (EEE). Los servicios están disponibles para residentes en países del EEE con dirección verificada. Para no residentes, se aplican restricciones específicas. Los servicios de criptoactivos pueden estar sujetos a regulaciones locales adicionales en cada país miembro."
    },
    {
      q: "¿Qué legislación aplicable y jurisdicción nos rige?",
      a: "Estos términos se rigen e interpretan conforme a la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de Madrid capital, renunciando expresamente a cualquier otro fuero que pudiera corresponderles. En caso de controversias de consumo, el cliente podrá acudir también a los tribunales de su domicilio."
    },
    {
      q: "¿Cómo contactar con el servicio de atención al cliente?",
      a: "Puedes contactarnos: 1) Por chat en la app (24/7), 2) Email legal: legal@zelloh.com, 3) Correo postal: Zelloh Finance S.L., Calle Serrano 123, 28006 Madrid, 4) Teléfono: 900 123 456 (España), +34 911 234 567 (internacional). Para reclamaciones formales, se debe utilizar el correo postal o email registrado."
    }
  ],
  servicios: [
    {
      q: "¿Qué servicios de pago ofrece Zelloh?",
      a: "Zelloh ofrece: 1) Cuentas de pago electrónico en euros, 2) Tarjetas de débito Mastercard, 3) Transferencias SEPA e instantáneas, 4) Domiciliaciones SEPA, 5) Pagos con QR, 6) Pagos internacionales (SWIFT), 7) Cambio de divisas, 8) Servicios de agregación de cuentas (AIS), 9) Iniciación de pagos (PIS), 10) Servicios de información de cuentas."
    },
    {
      q: "¿Cuáles son los límites operativos estándar?",
      a: "Límites por defecto: 1) Ingresos: €10,000/mes, 2) Retiradas: €5,000/día, 3) Transferencias: €15,000/día, 4) Compras online: €2,500/transacción. Estos límites pueden aumentarse tras verificación de ingresos. Límites específicos por producto se detallan en sus condiciones particulares."
    },
    {
      q: "¿Qué servicios de criptoactivos están disponibles?",
      a: "Zelloh ofrece: 1) Compra/venta de Bitcoin, Ethereum y principales stablecoins, 2) Custodia de criptoactivos, 3) Staking de ciertos activos, 4) Conversión cripto-fíat automática, 5) Pagos con cripto a través de tarjeta, 6) Servicios de wallet para NFTs. Estos servicios están sujetos a regulación específica y disponibilidad por país."
    },
    {
      q: "¿Qué servicios NO ofrece Zelloh?",
      a: "Zelloh NO es un banco tradicional y NO ofrece: 1) Créditos o préstamos, 2) Depósitos a plazo, 3) Seguros de vida o inversión, 4) Servicios de asesoramiento financiero, 5) Trading de valores, 6) Servicios de cambio físico de moneda. Somos una entidad de pago especializada en servicios digitales."
    }
  ],
  acceso: [
    {
      q: "¿Qué requisitos necesito para abrir una cuenta?",
      a: "Para abrir una cuenta necesitas: 1) Ser mayor de 18 años (o 14 con tutor para Zelloh Kids), 2) Residencia en el EEE, 3) Documento de identidad válido (DNI, pasaporte o NIE), 4) Número de teléfono móvil personal, 5) Dirección de email válida, 6) Selfie para verificación biométrica, 7) Aceptación de términos y políticas."
    },
    {
      q: "¿Cómo se realiza la verificación de identidad?",
      a: "La verificación se realiza mediante: 1) Lectura del documento de identidad con tecnología OCR, 2) Selfie con verificación de vida (liveness detection), 3) Verificación de datos cruzados con bases autorizadas, 4) En algunos casos, videollamada con agente, 5) Verificación de dirección mediante factura o extracto bancario. El proceso suele completarse en menos de 10 minutos."
    },
    {
      q: "¿Puedo acceder desde varios dispositivos?",
      a: "Sí, puedes acceder desde múltiples dispositivos, pero con limitaciones de seguridad: 1) Máximo 3 dispositivos activos simultáneamente, 2) Inicio de sesión requiere verificación en cada dispositivo nuevo, 3) Las operaciones sensibles requieren verificación biométrica adicional, 4) Puedes ver/cerrar sesiones activas desde la app."
    },
    {
      q: "¿Qué medidas de seguridad aplicamos en el acceso?",
      a: "Implementamos: 1) Autenticación de dos factores (2FA), 2) Verificación biométrica (huella/rostro), 3) Cifrado extremo a extremo, 4) Detección de dispositivos no reconocidos, 5) Notificaciones push para operaciones, 6) Timeout automático tras inactividad, 7) Lista blanca de dispositivos confiables."
    }
  ],
  cuenta: [
    {
      q: "¿Cómo funciona mi cuenta de pago electrónico?",
      a: "Tu cuenta Zelloh es una cuenta de pago electrónico: 1) Almacena fondos en euros, 2) Está protegida por el Fondo de Garantía de Depósitos hasta €100,000, 3) Genera un IBAN español único, 4) Permite todas las operaciones SEPA, 5) No genera intereses, 6) Los fondos se custodian en cuentas segregadas en bancos colaboradores."
    },
    {
      q: "¿Cómo puedo ingresar dinero en mi cuenta?",
      a: "Puedes ingresar dinero mediante: 1) Transferencia SEPA desde cualquier banco europeo, 2) Tarjeta de crédito/débito (comisión aplicable), 3) PayPal y otras wallets digitales, 4) Efectivo en comercios colaboradores, 5) Saldo de otras cuentas Zelloh (instantáneo y gratuito). Los tiempos varían según método (instantáneo a 1-2 días hábiles)."
    },
    {
      q: "¿Cómo puedo retirar dinero de mi cuenta?",
      a: "Puedes retirar dinero mediante: 1) Transferencia SEPA a otra cuenta bancaria, 2) Retiro en cajeros con tu tarjeta Zelloh (límites aplicables), 3) Retiro sin tarjeta en comercios colaboradores, 4) Transferencia instantánea a otro usuario Zelloh, 5) Conversión a criptoactivos (sujeto a regulación)."
    },
    {
      q: "¿Qué información debo mantener actualizada?",
      a: "Debes mantener actualizados: 1) Datos personales (cambio de nombre, documento), 2) Dirección postal, 3) Número de teléfono, 4) Dirección de email, 5) Información fiscal, 6) Información laboral si cambia. Cualquier cambio debe notificarse en un plazo máximo de 30 días. La no actualización puede resultar en bloqueo de la cuenta."
    }
  ],
  socios: [
    {
      q: "¿Quiénes son nuestros socios bancarios?",
      a: "Zelloh trabaja con: 1) Banco colaborador principal: BBVA España (custodia de fondos), 2) Mastercard Europe (procesamiento de tarjetas), 3) CurrencyCloud (cambio de divisas), 4) Modulr (infraestructura de pagos), 5) Onfido (verificación de identidad), 6) Chainalysis (monitorización blockchain), 7) Plaid (conexión bancaria)."
    },
    {
      q: "¿Cómo afectan estos acuerdos a mis datos?",
      a: "Los datos compartidos con socios se rigen por: 1) Acuerdos de procesamiento de datos (DPA), 2) Cifrado de extremo a extremo, 3) Minimización de datos (solo lo necesario), 4) Retención limitada al tiempo necesario, 5) Cumplimiento GDPR, 6) Prohibición de uso comercial por socios. Consulta nuestra Política de Privacidad para detalles."
    },
    {
      q: "¿Qué garantías ofrecen nuestros proveedores tecnológicos?",
      a: "Nuestros proveedores ofrecen: 1) SLA del 99.95% de disponibilidad, 2) Certificaciones ISO 27001, 3) Cumplimiento PCI-DSS para pagos, 4) Copias de seguridad redundantes, 5) Centros de datos Tier III+ en la UE, 6) Auditorías de seguridad periódicas, 7) Planes de continuidad de negocio."
    },
    {
      q: "¿Qué sucede si un socio deja de trabajar con Zelloh?",
      a: "En caso de terminación con un socio: 1) Notificaremos con 60 días de antelación, 2) Migraremos los servicios sin interrupción, 3) Mantendremos la seguridad de tus datos, 4) Actualizaremos los términos si es necesario, 5) Garantizaremos continuidad del servicio. La terminación no afecta tus derechos como cliente."
    }
  ],
  productos: [
    {
      q: "¿Qué tipos de tarjetas ofrece Zelloh?",
      a: "Zelloh ofrece: 1) Tarjeta Virtual Gratuita (sin coste, solo online), 2) Tarjeta Física Estándar (€5 emisión, Mastercard), 3) Tarjeta Premium (€12/mes, cashback 2%, seguros), 4) Tarjeta Metal Elite (€25/mes, beneficios premium), 5) Tarjetas Zelloh Kids (prepagas controladas por padres). Todas son de débito prepago."
    },
    {
      q: "¿Qué es Zelloh Spaces y cómo funciona?",
      a: "Zelloh Spaces son subcuentas para ahorrar con objetivos: 1) Creas Spaces para diferentes metas, 2) Configuras aportaciones automáticas, 3) Ganas 1.5% TAE interés, 4) Puedes tener hasta 10 Spaces, 5) Fondos igualmente protegidos, 6) Transferencias instantáneas entre Spaces, 7) Estadísticas de progreso."
    },
    {
      q: "¿Cómo funcionan los préstamos entre usuarios?",
      a: "Los préstamos P2P en Zelloh: 1) Límite máximo €500 por préstamo, 2) Plazo máximo 30 días, 3) Sin intereses (solo comisión de servicio), 4) Requiere historial de uso mínimo 3 meses, 5) Sistema de reputación entre usuarios, 6) Recordatorios automáticos, 7) Opción de financiación colectiva."
    },
    {
      q: "¿Qué es Zelloh Vault y cómo protege mis activos?",
      a: "Zelloh Vault es almacenamiento seguro para: 1) Documentos digitales, 2) Claves de recuperación, 3) Información sensible, 4) Copias de seguridad. Características: cifrado AES-256, acceso biométrico, redundancia geográfica, herencia digital, y sincronización encriptada entre dispositivos."
    }
  ],
  tarifas: [
    {
      q: "¿Cuál es la estructura de comisiones de Zelloh?",
      a: "Estructura principal: 1) Mantenimiento cuenta: Gratis, 2) Emisión tarjeta física: €5 (solo primera), 3) Retiros en cajero: €200/mes gratis luego 2%, 4) Transferencias SEPA: Gratis, 5) Transferencias instantáneas: Gratis entre Zelloh, €0.50 otras, 6) Cambio divisa: 0.5% sobre tipo interbancario, 7) Cripto: 1% compra/venta."
    },
    {
      q: "¿Qué operaciones son siempre gratuitas?",
      a: "Son siempre gratuitas: 1) Apertura de cuenta, 2) Mantenimiento de cuenta, 3) Transferencias SEPA estándar, 4) Transferencias entre usuarios Zelloh, 5) Pagos con tarjeta en zona euro, 6) Notificaciones push, 7) Soporte al cliente, 8) App y actualizaciones, 9) IBAN y servicios básicos."
    },
    {
      q: "¿Cómo se aplican las comisiones de cambio de divisa?",
      a: "Cambio de divisa: 1) Usamos tipo interbancario real (sin markup oculto), 2) Aplicamos comisión transparente del 0.5%, 3) Mostramos el tipo final antes de confirmar, 4) Guardamos el tipo por 60 segundos, 5) Para cantidades >€10,000 negociable, 6) Historial de cambios disponible 12 meses."
    },
    {
      q: "¿Qué ocurre con las devoluciones de cargo?",
      a: "Devoluciones (chargebacks): 1) €15 por gestión si la reclamación es infundada, 2) Gratis si Zelloh determina fraude, 3) Plazo máximo 120 días desde la transacción, 4) Requiere documentación de soporte, 5) Proceso gestionado según reglas Mastercard, 6) Fondos bloqueados durante investigación."
    }
  ],
  derechos: [
    {
      q: "¿Con qué frecuencia pueden cambiar los términos?",
      a: "Podemos modificar los términos: 1) Cambios materiales: notificación con 2 meses de antelación, 2) Cambios no materiales: notificación con 1 mes, 3) Cambios por requisito legal: efecto inmediato con notificación posterior, 4) Siempre publicamos versiones anteriores, 5) El cliente puede rechazar cambios y cerrar cuenta sin penalización."
    },
    {
      q: "¿Cómo se notifican los cambios en los términos?",
      a: "Las notificaciones se realizan mediante: 1) Mensaje en la app (obligatorio leer), 2) Email a dirección registrada, 3) Publicación en web zelloh.com/legal, 4) Para cambios importantes, notificación push adicional. Se considera recibida la notificación al enviarse a los canales registrados."
    },
    {
      q: "¿Qué derechos tengo si no acepto los cambios?",
      a: "Si no aceptas cambios: 1) Puedes cerrar tu cuenta sin coste antes de que entren en vigor, 2) Recibirás saldo completo más intereses devengados, 3) Conservarás acceso a extractos históricos, 4) No se aplicarán penalizaciones, 5) Podrás reabrir cuenta aceptando nuevos términos en cualquier momento."
    },
    {
      q: "¿Pueden cambiar las tarifas unilateralmente?",
      a: "Las tarifas pueden cambiar: 1) Con 2 meses de preaviso para aumentos, 2) Reducciones pueden aplicar inmediatamente, 3) Cambios por regulación: notificación explicativa, 4) El cliente siempre podrá rechazar nuevos precios y terminar, 5) Se mantienen precios para operaciones ya contratadas hasta su vencimiento."
    }
  ],
  garantias: [
    {
      q: "¿Qué garantías ofrece Zelloh sobre el servicio?",
      a: "Zelloh garantiza: 1) Cumplimiento de la normativa de servicios de pago, 2) Seguridad de fondos mediante segregación en bancos autorizados, 3) Protección de datos según GDPR, 4) Disponibilidad del servicio 99.5% anual, 5) Resolución de incidencias en 72 horas, 6) Transparencia en comisiones y condiciones."
    },
    {
      q: "¿Están mis fondos asegurados?",
      a: "Sí, tus fondos están: 1) Segregados en cuentas específicas en BBVA, 2) Protegidos por el Fondo de Garantía de Depósitos hasta €100,000, 3) No forman parte del patrimonio de Zelloh, 4) Auditados trimestralmente por firma externa, 5) Cubiertos por seguro de responsabilidad civil, 6) Disponibles incluso en caso de insolvencia de Zelloh."
    },
    {
      q: "¿Qué garantías hay sobre la seguridad de mis datos?",
      a: "Garantías de datos: 1) Cifrado AES-256 en reposo y tránsito, 2) Certificaciones ISO 27001/27701, 3) Auditorías periódicas por terceros, 4) Cumplimiento GDPR verificable, 5) Derechos ARCO garantizados, 6) Notificación de brechas en 72 horas, 7) Retención limitada al tiempo legalmente necesario."
    },
    {
      q: "¿Qué garantía hay sobre la disponibilidad del servicio?",
      a: "Disponibilidad garantizada: 1) SLA del 99.5% mensual, 2) Mantenimientos programados en fin de semana, 3) Notificación de interrupciones no programadas, 4) Compensación proporcional si SLA no se cumple, 5) Sistemas redundantes en múltiples centros de datos, 6) Backups automáticos cada 4 horas."
    }
  ],
  responsabilidad: [
    {
      q: "¿Cuál es nuestra responsabilidad por errores en transacciones?",
      a: "Nuestra responsabilidad: 1) Errores nuestros: corrección inmediata + compensación por daños directos, 2) Errores del cliente: asistencia para recuperación sin garantía, 3) Errores de terceros: mediación con el proveedor, 4) Límite de responsabilidad: importe de la transacción + daños directos demostrables, excluyendo lucro cesante."
    },
    {
      q: "¿Qué ocurre si hay un fallo técnico en la plataforma?",
      a: "En caso de fallo técnico: 1) Notificación inmediata a clientes afectados, 2) Restauración prioritaria del servicio, 3) Corrección de transacciones afectadas, 4) Compensación por daños directos demostrables, 5) Exención de responsabilidad por fuerza mayor (ataques DDoS, desastres naturales)."
    },
    {
      q: "¿Somos responsables por decisiones de inversión con criptoactivos?",
      a: "NO somos responsables por: 1) Pérdidas por volatilidad de criptoactivos, 2) Decisiones de compra/venta del cliente, 3) Cambios regulatorios que afecten cripto, 4) Fallos en blockchains externas, 5) Proyectos DeFi o NFTs de terceros. Solo garantizamos la ejecución técnica correcta de las órdenes."
    },
    {
      q: "¿Qué responsabilidad tenemos con Zelloh Kids?",
      a: "Con Zelloh Kids: 1) Responsabilidad limitada al correcto funcionamiento técnico, 2) Los padres/tutores son responsables del uso por menores, 3) No somos responsables de contenido o compras aprobadas por tutores, 4) Cumplimos con regulación de protección del menor, 5) Ofrecemos herramientas de control parental, pero la supervisión es responsabilidad del tutor."
    }
  ],
  indemnizacion: [
    {
      q: "¿En qué casos debo indemnizar a Zelloh?",
      a: "Debes indemnizar a Zelloh por: 1) Uso fraudulento de la cuenta, 2) Reclamaciones infundadas (chargebacks), 3) Daños intencionados a la plataforma, 4) Incumplimiento de regulación antilavado, 5) Uso para actividades ilegales, 6) Costes legales por incumplimiento de términos, 7) Daños a otros usuarios por tu acción."
    },
    {
      q: "¿Cómo se calculan las indemnizaciones?",
      a: "Las indemnizaciones se calculan: 1) Daños directos demostrables, 2) Costes de gestión y recuperación, 3) Multas impuestas a Zelloh por tu acción, 4) Honorarios legales razonables, 5) Pérdida de ingresos directamente atribuible, 6) Con límite máximo del doble de los daños directos."
    },
    {
      q: "¿Qué ocurre si no pago una indemnización?",
      a: "Si no pagas indemnización: 1) Retendremos fondos de tu cuenta, 2) Suspenderemos servicios hasta pago, 3) Iniciaremos procedimiento de cobro, 4) Reportaremos a centrales de riesgo si aplicable, 5) Tomaremos acciones legales, 6) Podremos cerrar tu cuenta definitivamente."
    },
    {
      q: "¿Hay límites a mi responsabilidad indemnizatoria?",
      a: "Tu responsabilidad está limitada a: 1) Daños causados por dolo o negligencia grave, 2) Excluye responsabilidad por uso normal del servicio, 3) No aplica por fuerza mayor o causas ajenas, 4) Requiere prueba causal por parte de Zelloh, 5) Tiene prescripción de 1 año desde el hecho."
    }
  ],
  cancelaciones: [
    {
      q: "¿Cómo puedo cancelar mi cuenta Zelloh?",
      a: "Para cancelar tu cuenta: 1) Solicitud por app o email, 2) Saldo debe ser cero o transferido, 3) No tener transacciones pendientes, 4) Confirmación de identidad, 5) Plazo de resolución: 30 días hábiles, 6) Recibirás confirmación por email, 7) Conservarás acceso a extractos 5 años."
    },
    {
      q: "¿Hay costes por cancelación?",
      a: "La cancelación es gratuita si: 1) Cuenta activa más de 6 meses, 2) No hay reclamaciones pendientes, 3) Se siguen los pasos correctos. Costes aplican si: 1) Cancelación antes de 6 meses: €10, 2) Con saldo pendiente: comisión de transferencia, 3) Con deudas pendientes: costes de gestión."
    },
    {
      q: "¿En qué casos cancela Zelloh una cuenta?",
      a: "Zelloh puede cancelar cuentas por: 1) Actividad fraudulenta, 2) Incumplimiento grave de términos, 3) Inactividad >12 meses, 4) Requerimiento regulatorio, 5) Falsificación de datos, 6) Uso para actividades ilegales, 7) Múltiples reclamaciones infundadas. Notificaremos con 30 días de antelación salvo casos de fraude."
    },
    {
      q: "¿Qué pasa con mis datos tras cancelar?",
      a: "Tras cancelación: 1) Datos personales: conservados 5 años por obligación legal, 2) Datos financieros: 10 años por obligación fiscal, 3) Datos de uso: anonimizados para estadísticas, 4) Derecho a supresión parcial ejercitable, 5) Extractos disponibles para descarga 30 días tras cancelación."
    }
  ],
  terminos: [
    {
      q: "¿Cómo funciona la herencia digital en Zelloh?",
      a: "Herencia digital: 1) Designa beneficiarios en configuración, 2) Requiere documentación notarial en fallecimiento, 3) Proceso tarda 30-60 días, 4) Límite €100,000 sin testamento, 5) Impuestos de sucesión aplicables, 6) Criptoactivos transferibles según legislación, 7) Coste gestión: €50."
    },
    {
      q: "¿Qué ocurre en caso de fallecimiento del titular?",
      a: "En fallecimiento: 1) La cuenta se congela inmediatamente al notificar, 2) Se requiere certificado de defunción, 3) Los beneficiarios designados reciben acceso, 4) Sin beneficiarios: sigue legislación sucesoria, 5) Fondos transferidos a herederos legales, 6) Comisión de cierre: €25."
    },
    {
      q: "¿Cómo se resuelven las disputas?",
      a: "Disputas se resuelven: 1) Primero: mediación interna (15 días), 2) Segundo: arbitraje de consumo (www.arbitrajedeconsumo.es), 3) Tercero: tribunales de Madrid, 4) Para profesionales: tribunales de Madrid exclusivamente, 5) Clientes UE pueden usar plataforma ODR de la UE."
    },
    {
      q: "¿Qué leyes especiales aplican a nuestros servicios?",
      a: "Aplican: 1) Ley 16/2009 de servicios de pago, 2) Reglamento GDPR, 3) Ley 10/2010 de prevención de blanqueo, 4) Directiva PSD2, 5) Reglamento MiCA para cripto, 6) Ley de consumidores, 7) Reglamento eIDAS, 8) Normativa local de cada país EEE."
    }
  ],
  fraude: [
    {
      q: "¿Qué debo hacer si detecto actividad fraudulenta?",
      a: "Si detectas fraude: 1) Bloquea tu tarjeta inmediatamente en la app, 2) Reporta la transacción como fraudulenta, 3) Cambia tu contraseña y PIN, 4) Contacta con soporte anti-fraude, 5) Denuncia policial si supera €300, 6) Monitoriza otras cuentas vinculadas. Nuestro equipo responde en <2 horas."
    },
    {
      q: "¿Qué protección ofrece Zelloh contra el fraude?",
      a: "Protección anti-fraude: 1) Seguro de €50,000 contra fraude online, 2) Detección en tiempo real de patrones sospechosos, 3) Verificación 3D Secure para compras online, 4) Notificaciones push para todas las transacciones, 5) Opción de bloquear categorías de comercio, 6) Geolocalización de transacciones."
    },
    {
      q: "¿Soy responsable de transacciones fraudulentas?",
      a: "Responsabilidad fraude: 1) Notificado en <2 horas: €0 responsabilidad, 2) Notificado en 2-48 horas: máximo €50, 3) Notificado después 48 horas: hasta €150, 4) Negligencia grave (compartir PIN): hasta €500, 5) Fraude propio o consentido: responsabilidad total. Consulta cobertura específica en póliza."
    },
    {
      q: "¿Cómo prevenimos el fraude interno?",
      a: "Prevención fraude interno: 1) Auditorías de seguridad periódicas, 2) Acceso mínimo necesario a datos, 3) Monitorización de actividad empleados, 4) Formación obligatoria anti-fraude, 5) Canales anónimos de denuncia, 6) Seguros de fidelidad, 7) Verificación en dos pasos para empleados."
    }
  ],
  transferencias: [
    {
      q: "¿Cómo funcionan las transferencias SEPA?",
      a: "Transferencias SEPA: 1) Gratuitas entre cuentas SEPA, 2) Límite estándar €15,000/día, 3) Horario: 24/7 los 365 días, 4) Tiempo: instantáneas (segundos) o estándar (1-2 días hábiles), 5) Requiere IBAN completo y nombre coincidente, 6) Puedes programar transferencias recurrentes."
    },
    {
      q: "¿Qué son las transferencias instantáneas?",
      a: "Transferencias instantáneas: 1) Llegan en <10 segundos, 2) Límite €100,000/día verificando ingresos, 3) Horario: 24/7, 4) Comisión: gratis entre Zelloh, €0.50 a otros bancos, 5) Disponible en zona SEPA, 6) No reversible una vez completada."
    },
    {
      q: "¿Cómo funcionan las transferencias internacionales?",
      a: "Transferencias internacionales: 1) SWIFT a más de 50 países, 2) Comisión fija €5 + comisión corresponsal, 3) Tiempo: 1-5 días hábiles, 4) Límite €50,000/día, 5) Requiere IBAN, BIC, dirección beneficiario, 6) Mostramos tipo de cambio final antes de enviar."
    },
    {
      q: "¿Qué hacer si una transferencia no llega?",
      a: "Si transferencia no llega: 1) Espera plazo máximo (SEPA: 2 días, SWIFT: 7 días), 2) Verifica datos del beneficiario, 3) Contacta con soporte con número de transacción, 4) Podemos iniciar trazabilidad (SEPA: 3 días, SWIFT: 10 días), 5) Si error nuestro: reenvío inmediato + compensación."
    }
  ],
  kids: [
    {
      q: "¿Qué es Zelloh Kids y para qué edades?",
      a: "Zelloh Kids es: 1) Cuentas prepago controladas por padres, 2) Para niños de 6-17 años, 3) Tarjeta física o virtual, 4) App con interfaz infantil, 5) Coste: €2/mes por niño, 6) Primer mes gratis. Los padres establecen todos los límites y controles."
    },
    {
      q: "¿Qué controles parentales incluye?",
      a: "Controles parentales: 1) Límite de gasto diario/semanal/mensual, 2) Bloqueo por categorías (juegos, restaurantes, etc.), 3) Aprobación manual de compras >€20, 4) Geolocalización de gastos, 5) Alertas instantáneas a padres, 6) Estadísticas educativas, 7) Tareas con recompensas programables."
    },
    {
      q: "¿Es seguro para menores?",
      a: "Seguridad niños: 1) Sin publicidad, 2) Sin compras in-app automáticas, 3) Sin acceso a crédito, 4) Verificación de edad en comercios, 5) Protección contra bullying financiero, 6) Educación financiera integrada, 7) Seguro anti-fraude igual que adultos."
    },
    {
      q: "¿Qué documentación necesito para Zelloh Kids?",
      a: "Documentación necesaria: 1) DNI/pasaporte del padre/tutor, 2) Libro de familia o documento de tutela, 3) DNI del menor (si >14 años), 4) Selfie del tutor, 5) Dirección familiar, 6) Aceptación de términos por tutor. Proceso completo en 15 minutos."
    }
  ],
  domiciliaciones: [
    {
      q: "¿Cómo funciona el sistema de domiciliaciones?",
      a: "Domiciliaciones SEPA: 1) Das mandato a comercio para cargar tu cuenta, 2) Notificamos 3 días antes de cada cargo, 3) Puedes rechazar hasta día anterior sin coste, 4) Historial completo en app, 5) Límite: máximo 20 domiciliaciones activas, 6) Sin comisiones por Zelloh."
    },
    {
      q: "¿Qué hacer si un comercio me cobra incorrectamente?",
      a: "Si cobro incorrecto: 1) Primero contacta con el comercio, 2) Si no resuelve, disputa en app en 8 semanas, 3) Proporciona documentación de soporte, 4) Zelloh media con el comercio, 5) Si fraude: recuperación en 10 días, 6) Coste: gratis si Zelloh determina error comercio, €15 si disputa infundada."
    },
    {
      q: "¿Cómo cancelo una domiciliación?",
      a: "Para cancelar domiciliación: 1) En app: desactiva el mandato, 2) También notifica al comercio por escrito, 3) La cancelación es efectiva inmediatamente, 4) Los cargos futuros se rechazarán, 5) Conserva comprobante de cancelación, 6) No hay costes por cancelación."
    },
    {
      q: "¿Qué pasa si no tengo saldo para una domiciliación?",
      a: "Si sin saldo: 1) Primer rechazo: notificación y €0 comisión, 2) Segundo rechazo mismo mandato: €2 comisión, 3) Tercer rechazo: mandato cancelado automáticamente, 4) Notificamos al comercio del rechazo, 5) Te sugerimos alternativas de pago."
    }
  ],
  cuotas: [
    {
      q: "¿Cómo funcionan las cuotas fraccionadas?",
      a: "Cuotas fraccionadas: 1) Divide compras >€50 en 3-12 meses, 2) TAE desde 0% (promociones) hasta 15%, 3) Sin comisión de apertura, 4) Aprobación instantánea según historial, 5) Puedes adelantar pagos sin penalización, 6) Historial de pagos en app."
    },
    {
      q: "¿Qué costes tienen las cuotas?",
      a: "Costes cuotas: 1) Comisión de gestión: 0-2% según plazo, 2) TAE variable según cliente, 3) Sin costes ocultos, 4) Mostramos cuadro de amortización completo, 5) Impago: €5 comisión + intereses de demora (20% TAE), 6) Sin costes por cancelación anticipada."
    },
    {
      q: "¿Qué ocurre si no puedo pagar una cuota?",
      a: "Si no puedes pagar: 1) Notificación 3 días antes del vencimiento, 2) Día 1: recordatorio, 3) Día 7: €5 comisión, 4) Día 15: informe a ASNEF si >€50, 5) Día 30: demanda judicial si >€300, 6) Ofrecemos reestructuración antes de impago."
    },
    {
      q: "¿En qué comercios están disponibles las cuotas?",
      a: "Cuotas disponibles en: 1) Todos los comercios online que acepten Zelloh, 2) Comercios físicos con TPV contactless, 3) Límite cuotas activas: 5 simultáneas, 4) Límite total financiado: €2,000, 5) Excluye: juegos de azar, cripto, forex."
    }
  ],
  nfts: [
    {
      q: "¿Qué servicios NFT ofrece Zelloh?",
      a: "Servicios NFT: 1) Compra/venta en marketplaces integrados (OpenSea, Rarible), 2) Wallet NFT integrada, 3) Creación de NFTs (próximamente), 4) Staking de NFTs, 5) Préstamos con NFTs como colateral, 6) Visualizador 3D, 7) Mercado P2P Zelloh."
    },
    {
      q: "¿Cómo se almacenan mis NFTs de forma segura?",
      a: "Almacenamiento NFTs: 1) Hot wallet: acceso rápido, seguro para NFTs de menor valor, 2) Cold storage: offline, para NFTs valiosos (>€1,000), 3) Multi-signature: requiere 2 de 3 firmas, 4) Backup en múltiples ubicaciones, 5) Seguro hasta €10,000 contra hackeo/pérdida."
    },
    {
      q: "¿Qué comisiones aplican a las transacciones NFT?",
      a: "Comisiones NFT: 1) Compra/venta: 1% (vs 2.5% OpenSea), 2) Minting: coste gas + €5 fijo, 3) Transferencias entre usuarios Zelloh: gratis, 4) Transferencias externas: coste gas + €2, 5) Conversión NFT-fíat: 2%, 6) Almacenamiento cold: €10/mes por NFT."
    },
    {
      q: "¿Qué responsabilidad tiene Zelloh sobre NFTs?",
      a: "Responsabilidad NFTs: 1) Solo garantizamos custodia técnica, 2) No verificamos autenticidad o derechos de NFTs, 3) No responsables por proyectos rug-pull, 4) No asesoramos sobre valor de NFTs, 5) Los smart contracts son de terceros, 6) Recomendamos due diligence antes de comprar."
    }
  ]
};

export default function LegalPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState('general');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cerrar menú móvil al cambiar categoría
  useEffect(() => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [activeCategory, isMobile]);

  // Obtener items de la categoría activa
  const activeItems = legalItemsByCategory[activeCategory as keyof typeof legalItemsByCategory] || [];
  
  // Obtener datos de la categoría activa
  const activeCatData = legalCategories.find(cat => cat.id === activeCategory);

  return (
    <main className="bg-black text-white min-h-screen font-sans overflow-x-hidden">
      <Header />

      {/* Header legal - Responsive */}
      <div className="pt-20 sm:pt-24 md:pt-32 pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6 max-w-[1500px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="w-full sm:w-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 sm:mb-4">
              Centro <span className="text-[#E6F379]">Legal</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-3xl">
              Documentación legal completa que rige tu relación con Zelloh. 
              Actualizado el 15 de enero de 2024.
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 bg-white/5 hover:bg-white/10 px-3 sm:px-4 py-2 sm:py-3 rounded-xl transition-colors text-sm sm:text-base">
              <FiDownload className="text-base sm:text-lg" />
              <span className="font-medium hidden xs:inline">PDF</span>
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 bg-white/5 hover:bg-white/10 px-3 sm:px-4 py-2 sm:py-3 rounded-xl transition-colors text-sm sm:text-base">
              <FiPrinter className="text-base sm:text-lg" />
              <span className="font-medium hidden xs:inline">Imprimir</span>
            </button>
          </div>
        </div>
      </div>

      <section className="pb-16 sm:pb-20 px-4 sm:px-6 max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-12 relative">
        
        {/* Botón menú móvil */}
        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sticky top-20 z-30 w-full flex items-center justify-between bg-zinc-900 border border-white/10 rounded-xl p-4 mb-2"
          >
            <span className="font-bold">Categorías Legales</span>
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        )}

        {/* 1. NAVEGACIÓN LATERAL LEGAL - Responsive */}
        <aside 
          className={`${
            isMobile 
              ? `fixed inset-x-4 top-24 z-40 transition-all duration-300 ${
                  mobileMenuOpen 
                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 -translate-y-4 pointer-events-none'
                }`
              : 'w-full lg:w-[350px] flex flex-col gap-3 shrink-0'
          }`}
        >
          <div className={`${isMobile ? 'max-h-[70vh] overflow-y-auto' : 'sticky top-32'} bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6`}>
            <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-white/10">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2 sm:mb-4">
                Índice Legal
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400">
                {isMobile ? 'Toca una categoría' : 'Selecciona una categoría para ver los términos específicos'}
              </p>
            </div>
            
            <div className="space-y-1 sm:space-y-2">
              {legalCategories.map((cat) => (
                <button
                  key={cat.id} 
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIndex(0);
                  }}
                  className={`w-full flex items-center gap-2 sm:gap-4 p-2 sm:p-4 rounded-lg sm:rounded-xl transition-all text-left ${
                    activeCategory === cat.id 
                      ? 'bg-gradient-to-r from-[#E6F379]/20 to-transparent border-l-2 sm:border-l-4 border-[#E6F379]' 
                      : 'hover:bg-white/5 opacity-80 hover:opacity-100'
                  }`}
                >
                  <span className="text-xl sm:text-2xl w-6 sm:w-8 text-center">{cat.icon}</span>
                  <div className="flex-1 min-w-0">
                    <span className={`text-sm sm:text-base font-bold tracking-tight block truncate ${
                      activeCategory === cat.id ? 'text-[#E6F379]' : 'text-white'
                    }`}>
                      {cat.name}
                    </span>
                    <span className="text-xs text-zinc-500 mt-0.5 sm:mt-1">
                      {legalItemsByCategory[cat.id as keyof typeof legalItemsByCategory]?.length || 0} artículos
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Información legal - visible en desktop, oculto en móvil dentro del menú */}
            {!isMobile && (
              <div className="mt-6 sm:mt-10 p-4 sm:p-6 bg-white/5 rounded-xl border border-white/10">
                <h4 className="font-bold mb-2 sm:mb-3 text-sm sm:text-base">Información Legal</h4>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-zinc-400">
                  <p><strong>Entidad:</strong> Zelloh Finance S.L.</p>
                  <p><strong>Registro:</strong> Banco de España nº 15756</p>
                  <p><strong>NIF:</strong> B-12345678</p>
                  <p><strong>Domicilio:</strong> Calle Serrano 123, 28006 Madrid</p>
                  <p><strong>Versión:</strong> 3.2.1 (Ene 2024)</p>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Overlay para móvil */}
        {isMobile && mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* 2. ÁREA DE TEXTO LEGAL - Responsive */}
        <div className="flex-1 max-w-4xl w-full">
          {/* Título de Sección con Icono */}
          <div className="flex items-center gap-3 sm:gap-5 mb-6 sm:mb-10 pb-6 sm:pb-8 border-b border-white/10">
            <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#E6F379]/20 to-[#7D26FF]/20 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl md:text-3xl shrink-0">
              {activeCatData?.icon || '📄'}
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-1 sm:mb-2 truncate">
                {activeCatData?.name || 'Términos Legales'}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500">
                {activeItems.length} artículos legales sobre {activeCatData?.name?.toLowerCase()}
              </p>
            </div>
          </div>

          {/* Lista de Acordeones - Responsive */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {activeItems.map((item, i) => (
              <div 
                key={i} 
                className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all"
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex justify-between items-center p-4 sm:p-5 md:p-7 text-left group"
                >
                  <div className="flex items-start gap-2 sm:gap-4 min-w-0">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                      openIndex === i 
                        ? 'bg-[#E6F379] text-black' 
                        : 'bg-white/5 text-white group-hover:bg-white/10'
                    }`}>
                      <span className="text-xs sm:text-sm font-bold">{i + 1}</span>
                    </div>
                    <div className="min-w-0">
                      <span className={`text-sm sm:text-base md:text-lg font-bold tracking-tight block ${openIndex === i ? 'text-white' : 'text-zinc-200'}`}>
                        {item.q}
                      </span>
                      <span className="text-xs text-zinc-500 mt-0.5 sm:mt-1 block">
                        Artículo {i + 1} de {activeItems.length}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`shrink-0 ml-2 sm:ml-4 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}>
                    {openIndex === i ? (
                      <FiMinusCircle className="text-lg sm:text-xl md:text-2xl text-[#E6F379]" />
                    ) : (
                      <FiPlusCircle className="text-lg sm:text-xl md:text-2xl text-zinc-600 group-hover:text-zinc-400" />
                    )}
                  </div>
                </button>
                
                {openIndex === i && (
                  <div className="px-4 sm:px-5 md:px-7 pb-5 sm:pb-6 md:pb-8 pl-10 sm:pl-12 md:pl-20">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4 sm:mb-6" />
                    <div className="text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed font-medium space-y-3 sm:space-y-4">
                      {item.a.split('\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                    
                    {/* Referencia legal */}
                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/5">
                      <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest">
                        Referencia Legal
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                        {activeCategory.toUpperCase()}-{String(i + 1).padStart(2, '0')} • 
                        Última modificación: 15/01/2024
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer de la sección - Responsive */}
          <div className="mt-10 sm:mt-12 md:mt-16 pt-6 sm:pt-8 md:pt-10 border-t border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
              <div>
                <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">¿Necesitas ayuda legal?</h4>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
                  Si tienes preguntas específicas sobre estos términos o necesitas 
                  aclaraciones legales, contacta con nuestro departamento jurídico.
                </p>
              </div>
              <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-[#E6F379] text-black rounded-xl font-bold hover:bg-[#E6F379]/90 transition-colors shrink-0 text-sm sm:text-base">
                Contactar Legal
              </button>
            </div>
            
            {/* Disclaimer - Responsive */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white/5 rounded-xl">
              <p className="text-xs sm:text-sm text-zinc-500 text-center">
                <strong>Importante:</strong> Esta es una versión simplificada para consulta. 
                El documento legal vinculante está disponible en PDF. 
                En caso de discrepancia, prevalece la versión oficial en español.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}