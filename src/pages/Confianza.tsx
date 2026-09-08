import { useEffect, useState } from "react";

type Section = "porque" | "transparencia" | "seguridad" | "faq";
type TransSub = "informes" | "solicitudes" | "obituarios";
type SegSub = "fraude" | "recomendaciones" | "datos" | "suplantacion";

const NAV_ITEMS = [
  "Inicio",
  "Productos",
  "Quiénes Somos",
  "Confianza",
  "Beneficios",
  "Contacto",
];

const SUBMENU: { id: Section; label: string }[] = [
  { id: "porque", label: "¿Por qué confiar en COOVITEL?" },
  { id: "transparencia", label: "Transparencia" },
  { id: "seguridad", label: "Seguridad" },
  { id: "faq", label: "Preguntas Frecuentes" },
];

const TRANS_TABS: { id: TransSub; label: string }[] = [
  { id: "informes", label: "Informes de Gestión" },
  { id: "solicitudes", label: "Solicitudes y Certificaciones" },
  { id: "obituarios", label: "Obituarios" },
];

const SEG_TABS: { id: SegSub; label: string }[] = [
  { id: "fraude", label: "Prevención de Fraude" },
  { id: "recomendaciones", label: "Recomendaciones de Seguridad" },
  { id: "datos", label: "Protección de Datos Personales" },
  { id: "suplantacion", label: "Prevención de Suplantación" },
];

const FAQ_ITEMS = [
  {
    q: "¿Cuáles son los derechos de un asociado de COOVITEL?",
    a: "Como asociado tienes derecho a participar en las asambleas generales con voz y voto, elegir y ser elegido para cargos directivos, recibir información clara sobre el estado financiero de la cooperativa, acceder a todos los productos y servicios disponibles, y recibir excedentes según tu participación.",
  },
  {
    q: "¿Cuáles son los deberes del asociado?",
    a: "Los asociados deben cumplir con el Estatuto y Reglamentos de COOVITEL, asistir a las asambleas convocadas, cancelar oportunamente sus obligaciones financieras, ahorrar según el monto mínimo establecido, y actuar con ética y solidaridad cooperativa.",
  },
  {
    q: "¿Cómo puedo retirarme de la cooperativa?",
    a: "Para retirarte voluntariamente debes presentar una solicitud escrita al Consejo de Administración. Se realizará la liquidación de tus aportes sociales y ahorros, previa cancelación de todas las obligaciones vigentes. El proceso toma entre 15 y 30 días hábiles.",
  },
  {
    q: "¿Puedo transferir mis aportes a otro asociado?",
    a: "Los aportes sociales no son transferibles entre asociados según la normativa cooperativa colombiana. Sin embargo, en caso de fallecimiento, los aportes se entregan a los beneficiarios debidamente registrados ante COOVITEL.",
  },
  {
    q: "¿Qué pasa si no puedo pagar una cuota de mi crédito?",
    a: "En caso de dificultades financieras, te recomendamos contactar tu asesor antes del vencimiento. COOVITEL ofrece opciones de reestructuración, periodos de gracia y refinanciación para apoyarte sin afectar tu historial crediticio.",
  },
  {
    q: "¿Cómo puedo conocer el estado de mis ahorros y créditos?",
    a: "Puedes consultar el estado de tus productos a través de la Oficina Virtual en nuestra página web, en cualquiera de nuestras 9 oficinas en Colombia, o comunicándote con nuestra línea de atención al asociado.",
  },
];

const INFORMES = [
  { year: "2023", title: "Informe de Gestión Anual 2023", size: "3.2 MB", type: "PDF" },
  { year: "2022", title: "Informe de Gestión Anual 2022", size: "2.8 MB", type: "PDF" },
  { year: "2021", title: "Informe de Gestión Anual 2021", size: "2.5 MB", type: "PDF" },
  { year: "2020", title: "Informe de Gestión Anual 2020", size: "2.1 MB", type: "PDF" },
  { year: "2023", title: "Estados Financieros Dic. 2023", size: "1.4 MB", type: "PDF" },
  { year: "2023", title: "Acta Asamblea General 2023", size: "0.9 MB", type: "PDF" },
];

const CERTIFICACIONES = [
  { icon: "📄", title: "Certificado de Asociado Activo", desc: "Válido para trámites bancarios, visas y entidades oficiales." },
  { icon: "💰", title: "Certificado de Aportes Sociales", desc: "Resumen de tus aportes acumulados en la cooperativa." },
  { icon: "🏦", title: "Certificado de Ahorros", desc: "Estado de tus cuentas de ahorro propósito y CDAT." },
  { icon: "📊", title: "Paz y Salvo", desc: "Confirmación de que no tienes obligaciones pendientes." },
  { icon: "📝", title: "Extracto de Crédito", desc: "Historial de pagos y saldo de tus créditos vigentes." },
  { icon: "🔖", title: "Vinculación Laboral", desc: "Certificado de tu empresa vinculada a COOVITEL." },
];

const OBITUARIOS = [
  { nombre: "Carlos Alberto Pérez Muñoz", empresa: "ETB S.A.", fecha: "15 de agosto de 2024", mensaje: "COOVITEL expresa sus condolencias a la familia y compañeros del asociado." },
  { nombre: "María del Pilar Rodríguez Gómez", empresa: "Claro Colombia", fecha: "3 de julio de 2024", mensaje: "Compartimos el dolor de sus seres queridos. Que descanse en paz." },
  { nombre: "José Hernando Torres Ávila", empresa: "Telmex Colombia", fecha: "20 de junio de 2024", mensaje: "COOVITEL acompaña a la familia en este momento de dolor." },
];

export default function Confianza() {
  const directSection = new URLSearchParams(window.location.search).get("section");
  const [activeSection, setActiveSection] = useState<Section>(directSection === "solicitudes" || directSection === "certificaciones" ? "transparencia" : "porque");
  const [transSub, setTransSub] = useState<TransSub>(directSection === "solicitudes" ? "solicitudes" : "informes");
  const [segSub, setSegSub] = useState<SegSub>("fraude");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<string | null>(directSection === "certificaciones" ? "fortaleza" : null);

  const openRatings = (rating: string) => {
    setSelectedRating(rating);
    window.setTimeout(() => document.getElementById("calificaciones")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  useEffect(() => {
    if (directSection === "certificaciones") openRatings("fortaleza");
  }, [directSection]);

  return (
    <div className="min-h-full bg-[#f7f0ff] font-[Inter,sans-serif]">
      {/* ── HEADER ── */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 bg-[#EBC302] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm font-[Montserrat,sans-serif]">CV</span>
              </div>
              <div>
                <div className="text-[#173C6E] font-black text-lg font-[Montserrat,sans-serif] leading-none tracking-wide">COOVITEL</div>
                <div className="text-[#173C6E]/50 text-[9px] leading-none">Cooperativa Empresarial de Ahorro y Crédito</div>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href="/"
                  className={`text-sm font-medium transition-colors ${
                    item === "Confianza"
                      ? "text-[#173C6E] font-bold border-b-2 border-[#EBC302] pb-1"
                      : "text-gray-600 hover:text-[#173C6E]"
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <button className="border-2 border-[#173C6E] text-[#173C6E] text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#173C6E] hover:text-white transition-colors">
                Oficina Virtual
              </button>
              <button className="bg-[#EBC302] text-white text-sm font-bold px-5 py-2 rounded-full hover:bg-[#EBC302] transition-colors">
                Asóciate
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 text-[#173C6E]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            {NAV_ITEMS.map((item) => (
              <a key={item} href="/" className="block text-sm font-medium text-gray-700 hover:text-[#173C6E]">
                {item}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <button className="border-2 border-[#173C6E] text-[#173C6E] text-sm font-semibold px-4 py-2 rounded-full">Oficina Virtual</button>
              <button className="bg-[#EBC302] text-white text-sm font-bold px-4 py-2 rounded-full">Asóciate</button>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO BANNER ── */}
      <section className="bg-[#173C6E] relative overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#EBC302]/10 pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-0">
          <div className="flex flex-col lg:flex-row lg:items-end gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-[#EBC302]/20 border border-[#EBC302]/40 text-[#EBC302] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
                <span>◆</span> COOPERATIVA · CONFIANZA Y TRANSPARENCIA
              </div>
              <h1 className="font-[Montserrat,sans-serif] font-black text-4xl md:text-5xl xl:text-6xl text-white leading-tight mb-4">
                Tu bienestar<br />
                <span className="text-[#EBC302]">es nuestra prioridad</span>
              </h1>
              <p className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed mb-8">
                En COOVITEL construimos relaciones basadas en la transparencia, la seguridad y el respeto.
                Conoce todo lo que hacemos para protegerte.
              </p>
            </div>
            <div className="hidden lg:flex items-end gap-6 pb-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/10">
                <div className="font-[Montserrat,sans-serif] font-black text-3xl text-[#EBC302]">64+</div>
                <div className="text-white/60 text-xs mt-1">Años de confianza</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/10">
                <div className="font-[Montserrat,sans-serif] font-black text-3xl text-[#EBC302]">A+</div>
                <div className="text-white/60 text-xs mt-1">Value & Risk</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/10">
                <div className="font-[Montserrat,sans-serif] font-black text-3xl text-[#EBC302]">ISO</div>
                <div className="text-white/60 text-xs mt-1">9001:2015</div>
              </div>
            </div>
          </div>

          {/* Submenu — dropdown en móvil, tabs en desktop */}
          <div className="pt-5">
            {/* Mobile dropdown */}
            <div className="md:hidden pb-4">
              <div className="relative">
                <select
                  value={activeSection}
                  onChange={(e) => setActiveSection(e.target.value as Section)}
                  className="w-full appearance-none bg-white/15 border border-white/30 text-white font-semibold text-sm rounded-xl px-4 py-3 pr-10 focus:outline-none focus:border-[#EBC302] cursor-pointer"
                >
                  {SUBMENU.map((item) => (
                    <option key={item.id} value={item.id} className="text-[#173C6E] bg-white">
                      {item.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Desktop tabs */}
            <div className="hidden md:flex gap-1 -mb-px">
              {SUBMENU.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex-shrink-0 px-5 py-3 text-sm font-semibold rounded-t-xl transition-all whitespace-nowrap ${
                    activeSection === item.id
                      ? "bg-[#f7f0ff] text-[#173C6E] shadow-sm"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ─ ¿Por qué confiar? ─ */}
        {activeSection === "porque" && (
          <div className="space-y-12">
            {/* Intro */}
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[#EBC302] font-bold text-sm uppercase tracking-widest mb-3">¿POR QUÉ CONFIAR EN COOVITEL?</p>
                <h2 className="font-[Montserrat,sans-serif] font-black text-3xl md:text-4xl text-[#173C6E] leading-tight mb-5">
                  64 años construyendo confianza cooperativa
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  COOVITEL es una Cooperativa Empresarial de Ahorro y Crédito vigilada por la Superintendencia de la Economía Solidaria de Colombia.
                  Operamos bajo los más altos estándares éticos, con certificación ISO 9001:2015 y calificación A+ de riesgo.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Más de 17.000 asociados y 200 empresas confían en nosotros. No somos un banco: somos una cooperativa donde los
                  asociados son dueños, los beneficios se distribuyen y cada decisión se toma pensando en el bienestar colectivo.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=420&fit=crop&auto=format"
                  alt="Equipo COOVITEL atendiendo a asociados"
                  className="rounded-2xl w-full object-cover h-72 shadow-xl"
                />
                <div className="absolute -bottom-4 -left-4 bg-[#EBC302] rounded-2xl px-6 py-4 shadow-lg">
                  <div className="font-[Montserrat,sans-serif] font-black text-2xl text-white">17.000+</div>
                  <div className="text-white/80 text-xs">Asociados activos</div>
                </div>
              </div>
            </div>

            {/* Pilares */}
            <div>
              <h3 className="font-[Montserrat,sans-serif] font-bold text-2xl text-[#173C6E] mb-6 text-center">
                Los pilares de nuestra confianza
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: "🏛️", title: "Vigilada y regulada", desc: "Supervisada por la Supersolidaria, con auditorías externas anuales y cumplimiento de la Ley 79 de 1988." },
                  { icon: "🔐", title: "Seguridad financiera", desc: "Calificación A+ Value & Risk. Tus ahorros están protegidos bajo los más estrictos controles de solvencia." },
                  { icon: "🌟", title: "Certificación ISO", desc: "ISO 9001:2015 Bureau Veritas. Procesos estandarizados de calidad en todos nuestros servicios." },
                  { icon: "🤝", title: "Modelo cooperativo", desc: "Los asociados son los dueños. Los excedentes se reinvierten en beneficios para la comunidad cooperativa." },
                  { icon: "📊", title: "Transparencia total", desc: "Publicamos informes de gestión, estados financieros y actas de asamblea anualmente." },
                  { icon: "🛡️", title: "Sistema SARLAFT", desc: "Sistema de administración del riesgo de lavado de activos, en cumplimiento normativo estricto." },
                ].map((item) => (
                  <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <h4 className="font-[Montserrat,sans-serif] font-bold text-[#173C6E] text-lg mb-2 group-hover:text-[#EBC302] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Afiliaciones */}
            <div className="bg-[#173C6E] rounded-3xl p-8 md:p-12">
              <h3 className="font-[Montserrat,sans-serif] font-bold text-2xl text-white mb-2 text-center">
                Avalados por las principales organizaciones cooperativas
              </h3>
              <p className="text-white/60 text-center text-sm mb-8">Pertenecemos a los organismos de mayor credibilidad del sector solidario colombiano</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Confecoop", "Ascoop", "Fogacoop", "Supersolidaria"].map((org) => (
                  <div key={org} className="bg-white/10 border border-white/10 rounded-xl px-4 py-5 flex items-center gap-3 hover:bg-white/15 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-[#EBC302] flex-shrink-0" />
                    <span className="text-white font-semibold text-sm">{org}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─ Transparencia ─ */}
        {activeSection === "transparencia" && (
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[#EBC302] font-bold text-sm uppercase tracking-widest mb-2">TRANSPARENCIA</p>
              <h2 className="font-[Montserrat,sans-serif] font-black text-3xl md:text-4xl text-[#173C6E] mb-4">
                Información abierta para todos
              </h2>
              <p className="text-gray-500 max-w-2xl">
                La transparencia es un valor fundamental de COOVITEL. Aquí encontrarás nuestros informes, documentos legales
                y la información institucional que te corresponde como asociado.
              </p>
            </div>

            <section className="order-last mt-8 pt-12 border-t border-[#C9DCFF] rounded-3xl p-6 md:p-9 bg-[#131739] relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(135deg, transparent 0%, #27548F 100%)" }} />
              <div className="relative">
                <div className="text-center mb-7">
                  <p className="text-[#EBC302] font-bold text-xs uppercase tracking-[0.2em] mb-2">SOLIDEZ Y CALIDAD</p>
                  <h3 className="font-[Montserrat,sans-serif] font-black text-2xl md:text-3xl text-white">Calificaciones y certificaciones</h3>
                  <p className="text-[#CFE0FF] text-sm mt-2">Respaldo institucional, solidez financiera y compromiso con la calidad.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { id: "fortaleza", mark: "A+", sub: "VALUE & RISK", title: "Fortaleza Institucional", text: "Calificación otorgada por Value & Risk Rating que acredita la solidez de COOVITEL.", button: "Calificación 2026" },
                    { id: "deuda", mark: "A", sub: "VrR2 · VALUE & RISK", title: "Deuda de Largo y Corto Plazo", text: "Calificación de solidez en gestión de deuda emitida por Value & Risk Rating.", button: "Calificación 2026" },
                    { id: "iso", mark: "ISO\n9001", sub: "CERTIFICADO · 2015", title: "Bureau Veritas", text: "Sistema de Gestión de Calidad certificado bajo la norma internacional ISO 9001:2015.", button: "Certificación 2026" },
                  ].map((item) => <article key={item.title} className="rounded-2xl p-6 border border-[#81A1DB]/40 bg-[#173C6E]/60 text-center flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-2 border-[#81A1DB] bg-[#27548F] flex flex-col justify-center items-center text-[#F7F0FF] mb-5 whitespace-pre-line">
                      <strong className="font-black text-2xl leading-none">{item.mark}</strong><span className="text-[9px] font-bold mt-1">{item.sub}</span>
                    </div>
                    <h4 className="font-[Montserrat,sans-serif] font-bold text-white">{item.title}</h4>
                    <p className="text-[#CFE0FF] text-sm leading-relaxed mt-3 min-h-14">{item.text}</p>
                    <button type="button" onClick={() => openRatings(item.id)} className="mt-5 px-4 py-2 rounded-full border border-[#EBC302]/60 text-[#EBC302] text-xs font-bold hover:bg-[#EBC302] hover:text-[#131739] transition-colors">{item.button}</button>
                  </article>)}
                </div>
              </div>
            </section>

            {selectedRating && <section id="calificaciones" className="order-last scroll-mt-28 rounded-3xl bg-white border border-[#C9DCFF] p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7"><div><p className="text-[#EBC302] font-bold text-xs tracking-[0.18em]">DETALLE INSTITUCIONAL</p><h3 className="font-[Montserrat,sans-serif] font-black text-2xl text-[#173C6E] mt-1">{selectedRating === "fortaleza" ? "Fortaleza Institucional" : selectedRating === "deuda" ? "Deuda de Largo y Corto Plazo" : "Sistema de Gestión de Calidad"}</h3></div><button type="button" onClick={() => setSelectedRating(null)} className="text-[#173C6E] text-sm font-semibold hover:text-[#EBC302]">Cerrar detalle</button></div>
              {selectedRating === "fortaleza" && <article className="rounded-2xl bg-[#F7F0FF] border border-[#C9DCFF] p-5"><span className="text-[#EBC302] text-xs font-bold">VALUE & RISK RATING</span><h4 className="text-[#173C6E] font-bold text-lg mt-2">Calificación A+</h4><dl className="mt-4 grid sm:grid-cols-3 gap-4 text-sm"><div><dt className="text-[#81A1DB]">Calificación</dt><dd className="text-[#1A2842] font-semibold">A+ · Fortaleza Institucional</dd></div><div><dt className="text-[#81A1DB]">Entidad calificadora</dt><dd className="text-[#1A2842] font-semibold">Value & Risk Rating</dd></div><div><dt className="text-[#81A1DB]">Vigencia publicada</dt><dd className="text-[#1A2842] font-semibold">2026</dd></div></dl></article>}
              {selectedRating === "deuda" && <article className="rounded-2xl bg-[#F7F0FF] border border-[#C9DCFF] p-5"><span className="text-[#EBC302] text-xs font-bold">VALUE & RISK RATING</span><h4 className="text-[#173C6E] font-bold text-lg mt-2">Calificación A / VrR2</h4><dl className="mt-4 grid sm:grid-cols-3 gap-4 text-sm"><div><dt className="text-[#81A1DB]">Calificación</dt><dd className="text-[#1A2842] font-semibold">A / VrR2</dd></div><div><dt className="text-[#81A1DB]">Alcance</dt><dd className="text-[#1A2842] font-semibold">Gestión de deuda de largo y corto plazo</dd></div><div><dt className="text-[#81A1DB]">Vigencia publicada</dt><dd className="text-[#1A2842] font-semibold">2026</dd></div></dl></article>}
              {selectedRating === "iso" && <article className="rounded-2xl bg-[#F7F0FF] border border-[#C9DCFF] p-5"><span className="text-[#EBC302] text-xs font-bold">BUREAU VERITAS</span><h4 className="text-[#173C6E] font-bold text-lg mt-2">Certificación ISO 9001:2015</h4><dl className="mt-4 grid sm:grid-cols-3 gap-4 text-sm"><div><dt className="text-[#81A1DB]">Norma</dt><dd className="text-[#1A2842] font-semibold">ISO 9001:2015</dd></div><div><dt className="text-[#81A1DB]">Certificadora</dt><dd className="text-[#1A2842] font-semibold">Bureau Veritas</dd></div><div><dt className="text-[#81A1DB]">Vigencia publicada</dt><dd className="text-[#1A2842] font-semibold">2026</dd></div></dl></article>}
            </section>}

            <div className="grid md:grid-cols-3 gap-4">
              <a href="/estamentos-directivos" className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#173C6E]/40 hover:shadow-md transition-all group">
                <span className="text-xs font-bold tracking-widest text-[#EBC302]">INSTITUCIONAL</span>
                <h3 className="font-[Montserrat,sans-serif] font-bold text-[#173C6E] mt-2">Estamentos Directivos</h3>
                <p className="text-gray-500 text-sm mt-2">Conoce a los representantes y órganos de gobierno de la Cooperativa.</p>
                <span className="inline-block mt-4 text-[#173C6E] text-sm font-semibold group-hover:text-[#EBC302]">Consultar →</span>
              </a>
              <a href="/normatividad" className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#173C6E]/40 hover:shadow-md transition-all group">
                <span className="text-xs font-bold tracking-widest text-[#EBC302]">TRANSPARENCIA</span>
                <h3 className="font-[Montserrat,sans-serif] font-bold text-[#173C6E] mt-2">Normatividad</h3>
                <p className="text-gray-500 text-sm mt-2">Estatutos, políticas, acuerdos, informes y calificaciones institucionales.</p>
                <span className="inline-block mt-4 text-[#173C6E] text-sm font-semibold group-hover:text-[#EBC302]">Consultar →</span>
              </a>
              <a href="/informacion-estrategica" className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#173C6E]/40 hover:shadow-md transition-all group">
                <span className="text-xs font-bold tracking-widest text-[#EBC302]">GESTIÓN</span>
                <h3 className="font-[Montserrat,sans-serif] font-bold text-[#173C6E] mt-2">Información Estratégica</h3>
                <p className="text-gray-500 text-sm mt-2">Información y resultados para conocer la gestión de COOVITEL.</p>
                <span className="inline-block mt-4 text-[#173C6E] text-sm font-semibold group-hover:text-[#EBC302]">Consultar →</span>
              </a>
            </div>

            {/* Sub tabs */}
            <div className="flex flex-wrap gap-2">
              {TRANS_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTransSub(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    transSub === tab.id
                      ? "bg-[#173C6E] text-white shadow-md"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-[#173C6E] hover:text-[#173C6E]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Informes de gestión */}
            {transSub === "informes" && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-[Montserrat,sans-serif] font-bold text-xl text-[#173C6E]">Informes de Gestión</h3>
                  <span className="text-xs text-gray-400">{INFORMES.length} documentos disponibles</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {INFORMES.map((doc) => (
                    <div
                      key={doc.title}
                      className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#173C6E]/30 hover:shadow-md transition-all group cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-[#173C6E] text-sm leading-snug group-hover:text-[#EBC302] transition-colors">{doc.title}</div>
                          <div className="text-gray-400 text-xs mt-1">{doc.type} · {doc.size}</div>
                        </div>
                      </div>
                      <button className="mt-4 w-full flex items-center justify-center gap-2 border border-[#173C6E]/20 rounded-lg py-2 text-[#173C6E] text-xs font-semibold hover:bg-[#173C6E] hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Descargar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Solicitudes y Certificaciones */}
            {transSub === "solicitudes" && (
              <div>
                <h3 className="font-[Montserrat,sans-serif] font-bold text-xl text-[#173C6E] mb-5">Solicitudes y Certificaciones</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {CERTIFICACIONES.map((cert) => (
                    <div
                      key={cert.title}
                      className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#EBC302]/50 hover:shadow-md transition-all group cursor-pointer"
                    >
                      <div className="text-4xl mb-4">{cert.icon}</div>
                      <h4 className="font-[Montserrat,sans-serif] font-bold text-[#173C6E] mb-2 group-hover:text-[#EBC302] transition-colors">
                        {cert.title}
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">{cert.desc}</p>
                      <button className="text-[#173C6E] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                        Solicitar <span>→</span>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">ℹ️</div>
                    <div>
                      <div className="font-semibold text-[#173C6E] mb-1">¿Cómo solicitar un certificado?</div>
                      <p className="text-gray-600 text-sm">
                        Puedes solicitar tus certificados en línea a través de la Oficina Virtual, en cualquiera de nuestras
                        oficinas presentando tu documento de identidad, o llamando a nuestra línea de atención.
                        El tiempo de entrega es de 1 a 3 días hábiles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Obituarios */}
            {transSub === "obituarios" && (
              <div>
                <h3 className="font-[Montserrat,sans-serif] font-bold text-xl text-[#173C6E] mb-2">Obituarios</h3>
                <p className="text-gray-500 text-sm mb-6">COOVITEL rinde homenaje a los asociados que han partido. Nuestras condolencias a sus familias.</p>
                <div className="space-y-4">
                  {OBITUARIOS.map((obit) => (
                    <div key={obit.nombre} className="bg-white rounded-2xl p-6 border border-gray-100 flex gap-5 items-start">
                      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-2xl">
                        🕊️
                      </div>
                      <div>
                        <h4 className="font-[Montserrat,sans-serif] font-bold text-[#173C6E] text-lg">{obit.nombre}</h4>
                        <p className="text-[#EBC302] font-semibold text-sm">{obit.empresa}</p>
                        <p className="text-gray-400 text-xs mt-1 mb-2">Falleció el {obit.fecha}</p>
                        <p className="text-gray-600 text-sm italic">{obit.mensaje}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─ Seguridad ─ */}
        {activeSection === "seguridad" && (
          <div className="space-y-8">
            <div>
              <p className="text-[#EBC302] font-bold text-sm uppercase tracking-widest mb-2">SEGURIDAD</p>
              <h2 className="font-[Montserrat,sans-serif] font-black text-3xl md:text-4xl text-[#173C6E] mb-4">
                Tu seguridad es lo más importante
              </h2>
              <p className="text-gray-500 max-w-2xl">
                Protegemos tu información y tu patrimonio con tecnología, protocolos y educación financiera. Conoce cómo mantenerte seguro.
              </p>
            </div>

            {/* Sub tabs */}
            <div className="flex flex-wrap gap-2">
              {SEG_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSegSub(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    segSub === tab.id
                      ? "bg-[#173C6E] text-white shadow-md"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-[#173C6E] hover:text-[#173C6E]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Prevención de fraude */}
            {segSub === "fraude" && (
              <div className="space-y-6">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">⚠️</div>
                    <div>
                      <h4 className="font-[Montserrat,sans-serif] font-bold text-amber-800 text-lg mb-1">Alerta de Seguridad</h4>
                      <p className="text-amber-700 text-sm">
                        COOVITEL NUNCA te solicitará claves, contraseñas ni datos sensibles por teléfono, correo electrónico o
                        mensajes de texto. Si recibes este tipo de solicitudes, no las atiendas y repórtalo inmediatamente.
                      </p>
                    </div>
                  </div>
                </div>
                <h3 className="font-[Montserrat,sans-serif] font-bold text-xl text-[#173C6E]">Tipos de fraude más comunes</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { icon: "📧", title: "Phishing", desc: "Correos falsos que imitan a COOVITEL para robar tus datos. Verifica siempre el dominio @coovitel.coop antes de hacer clic en cualquier enlace." },
                    { icon: "📱", title: "Smishing", desc: "Mensajes de texto fraudulentos que solicitan datos personales o te redirigen a sitios falsos. COOVITEL no te enviará links de pago por SMS." },
                    { icon: "📞", title: "Vishing", desc: "Llamadas telefónicas donde fingimos ser COOVITEL para obtener tus claves. Cuelga y llama directamente a nuestra línea oficial." },
                    { icon: "🖥️", title: "Sitios falsos", desc: "Páginas web que copian nuestra apariencia. Asegúrate de que la URL sea https://coovitel.coop antes de ingresar datos." },
                  ].map((item) => (
                    <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h4 className="font-[Montserrat,sans-serif] font-bold text-[#173C6E] text-lg mb-2">{item.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-[#173C6E] rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6">
                  <div className="text-5xl">🚨</div>
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="font-[Montserrat,sans-serif] font-bold text-white text-xl mb-2">¿Fuiste víctima de fraude?</h4>
                    <p className="text-white/70 text-sm">Repórtalo inmediatamente. Entre más rápido actúes, más posibilidades tenemos de recuperar tus recursos.</p>
                  </div>
                  <button onClick={() => { window.location.href = "/contacto" }} className="bg-[#EBC302] text-white font-bold px-6 py-3 rounded-full hover:bg-[#EBC302] transition-colors flex-shrink-0">
                    Reportar ahora
                  </button>
                </div>
              </div>
            )}

            {/* Recomendaciones de seguridad */}
            {segSub === "recomendaciones" && (
              <div className="space-y-6">
                <h3 className="font-[Montserrat,sans-serif] font-bold text-xl text-[#173C6E]">
                  10 recomendaciones para estar seguro
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { n: "01", title: "Usa contraseñas fuertes", desc: "Combina mayúsculas, números y símbolos. No uses la misma clave para todo." },
                    { n: "02", title: "Actualiza regularmente", desc: "Cambia tu contraseña de Oficina Virtual cada 3 meses." },
                    { n: "03", title: "Verifica el sitio web", desc: "Asegúrate de estar en coovitel.coop con candado de seguridad HTTPS." },
                    { n: "04", title: "No uses redes públicas", desc: "Evita acceder a tu cuenta desde WiFi de cafés, aeropuertos o centros comerciales." },
                    { n: "05", title: "Activa las notificaciones", desc: "Recibe alertas de cada transacción en tiempo real por correo y SMS." },
                    { n: "06", title: "Cierra sesión siempre", desc: "Al terminar de usar la Oficina Virtual, cierra sesión correctamente." },
                    { n: "07", title: "Cuida tus documentos", desc: "No compartas fotos de tu cédula, tarjeta o extractos en redes sociales." },
                    { n: "08", title: "Desconfía de ofertas", desc: "Si suena demasiado bueno para ser verdad, probablemente sea una estafa." },
                    { n: "09", title: "Reporta lo sospechoso", desc: "Si notas algo extraño en tu cuenta, repórtalo de inmediato." },
                    { n: "10", title: "Mantén datos actualizados", desc: "Teléfono y correo actualizados garantizan que recibas alertas oportunas." },
                  ].map((item) => (
                    <div key={item.n} className="bg-white rounded-2xl p-5 border border-gray-100 flex gap-4 items-start hover:shadow-md transition-shadow">
                      <div className="font-[Montserrat,sans-serif] font-black text-2xl text-[#EBC302]/30 leading-none flex-shrink-0 w-10">{item.n}</div>
                      <div>
                        <div className="font-[Montserrat,sans-serif] font-bold text-[#173C6E] mb-1">{item.title}</div>
                        <p className="text-gray-500 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Protección de datos */}
            {segSub === "datos" && (
              <div className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-[Montserrat,sans-serif] font-bold text-xl text-[#173C6E] mb-4">
                      Protección de Datos Personales
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      COOVITEL cumple con la Ley 1581 de 2012 de Protección de Datos Personales de Colombia.
                      Tus datos son recolectados, tratados y almacenados de forma segura, con finalidades claras y bajo tu consentimiento.
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Contamos con políticas de privacidad actualizadas, cifrado de datos en tránsito y en reposo,
                      y protocolos de control de acceso que garantizan que solo el personal autorizado puede consultar tu información.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { title: "Finalidad del tratamiento", desc: "Gestión de servicios cooperativos, contacto, cobranza y análisis estadístico interno." },
                      { title: "Tus derechos ARCO", desc: "Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al tratamiento de tus datos." },
                      { title: "Responsable del tratamiento", desc: "COOVITEL, Calle 67 # 9 - 34, Bogotá D.C." },
                      { title: "Canal de atención", desc: "Consulta los canales vigentes en coovitel.coop/contacto" },
                    ].map((item) => (
                      <div key={item.title} className="bg-white rounded-xl p-4 border border-gray-100">
                        <div className="font-semibold text-[#173C6E] text-sm mb-1">{item.title}</div>
                        <p className="text-gray-500 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h4 className="font-[Montserrat,sans-serif] font-bold text-[#173C6E] mb-4">Medidas técnicas implementadas</h4>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { icon: "🔒", label: "Cifrado SSL/TLS en todos los canales digitales" },
                      { icon: "🗄️", label: "Servidores con acceso restringido y monitoreados 24/7" },
                      { icon: "🔑", label: "Autenticación de doble factor para accesos críticos" },
                      { icon: "🧹", label: "Política de retención y eliminación segura de datos" },
                      { icon: "📋", label: "Auditorías periódicas de seguridad informática" },
                      { icon: "👤", label: "Perfiles de acceso diferenciados por rol" },
                    ].map((m) => (
                      <div key={m.label} className="flex items-start gap-3">
                        <span className="text-xl">{m.icon}</span>
                        <span className="text-gray-600 text-sm leading-snug">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Prevención de suplantación */}
            {segSub === "suplantacion" && (
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🚫</div>
                    <div>
                      <h4 className="font-[Montserrat,sans-serif] font-bold text-red-700 text-lg mb-1">Suplantación de identidad</h4>
                      <p className="text-red-600 text-sm">
                        Personas malintencionadas pueden hacerse pasar por ti para solicitar créditos, retiros o modificaciones
                        en tu cuenta. Aprende a protegerte.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h4 className="font-[Montserrat,sans-serif] font-bold text-[#173C6E] text-lg mb-4">¿Cómo nos verificamos?</h4>
                    <ul className="space-y-3">
                      {[
                        "Verificación biométrica para trámites presenciales de alto valor",
                        "Preguntas de seguridad configuradas por el asociado",
                        "Token digital para operaciones desde la Oficina Virtual",
                        "Confirmación vía SMS o correo registrado para cambios de datos",
                        "Validación en listas restrictivas (CIFIN, Transunion) en cada solicitud",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                          <div className="w-5 h-5 rounded-full bg-[#173C6E] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h4 className="font-[Montserrat,sans-serif] font-bold text-[#173C6E] text-lg mb-4">Señales de alerta</h4>
                    <ul className="space-y-3">
                      {[
                        "Recibes documentos de crédito que no solicitaste",
                        "Observas movimientos que no reconoces en tu extracto",
                        "Te llegan cobros de obligaciones desconocidas",
                        "Alguien te pide prestarle tu documento de identidad",
                        "Recibes llamadas preguntando por tus datos personales",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                          <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-red-400" />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-[#173C6E] rounded-3xl p-8 text-center">
                  <h4 className="font-[Montserrat,sans-serif] font-bold text-white text-2xl mb-3">
                    ¿Sospechas de suplantación?
                  </h4>
                  <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
                    Actúa de inmediato. Bloquea tu cuenta y contáctanos. Nuestro equipo de seguridad está disponible
                    las 24 horas para atender tu caso.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button className="bg-[#EBC302] text-white font-bold px-8 py-3 rounded-full hover:bg-[#EBC302] transition-colors">
                      Bloquear cuenta
                    </button>
                    <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-[#173C6E] transition-colors">
                      601 741 5000
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─ Preguntas Frecuentes ─ */}
        {activeSection === "faq" && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-1">
                <p className="text-[#EBC302] font-bold text-sm uppercase tracking-widest mb-3">PREGUNTAS FRECUENTES</p>
                <h2 className="font-[Montserrat,sans-serif] font-black text-3xl text-[#173C6E] leading-tight mb-4">
                  Derechos y Deberes del Asociado
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Como asociado de COOVITEL tienes derechos garantizados y deberes que contribuyen al bienestar colectivo.
                  Aquí respondemos las preguntas más comunes.
                </p>
                <div className="bg-[#173C6E] rounded-2xl p-6 text-white">
                  <div className="text-3xl mb-3">💬</div>
                  <h4 className="font-[Montserrat,sans-serif] font-bold text-lg mb-2">¿No encuentras tu respuesta?</h4>
                  <p className="text-white/70 text-sm mb-4">Nuestros asesores están listos para ayudarte en cualquier momento.</p>
                  <a href="https://api.whatsapp.com/send/?phone=573160189853&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" className="block text-center bg-[#EBC302] text-white font-bold px-5 py-2.5 rounded-full text-sm hover:bg-[#EBC302] transition-colors w-full">
                    Hablar con un asesor
                  </a>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-3">
                {FAQ_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                      openFaq === i ? "border-[#173C6E]/30 shadow-md" : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <button
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className="font-[Montserrat,sans-serif] font-bold text-[#173C6E] text-sm leading-snug">
                        {item.q}
                      </span>
                      <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${
                        openFaq === i ? "bg-[#EBC302]" : "bg-gray-100"
                      }`}>
                        <svg
                          className={`w-4 h-4 transition-transform ${openFaq === i ? "rotate-180 text-white" : "text-gray-500"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-5 border-t border-gray-50">
                        <p className="text-gray-600 text-sm leading-relaxed pt-4">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Estatutos banner */}
            <div className="bg-gradient-to-r from-[#173C6E] to-[#27548F] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-[Montserrat,sans-serif] font-black text-white text-2xl md:text-3xl mb-3">
                  Conoce el Estatuto Cooperativo
                </h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-lg">
                  El Estatuto de COOVITEL define los derechos, deberes, estructura de gobierno y normas de convivencia cooperativa.
                  Es el documento fundamental que rige la relación entre todos los asociados.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-[#EBC302] text-white font-bold px-7 py-3 rounded-full hover:bg-[#EBC302] transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Descargar Estatuto
                </button>
                <a href="/quienes-somos?section=estatutos" className="border-2 border-white text-white font-semibold px-7 py-3 rounded-full hover:bg-white hover:text-[#173C6E] transition-colors">
                  Ver Reglamentos
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#131739] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#EBC302] rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-xs font-[Montserrat,sans-serif]">CV</span>
                </div>
                <span className="text-white font-black text-lg font-[Montserrat,sans-serif]">COOVITEL</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Cooperativa Empresarial de Ahorro y Crédito. 64 años construyendo bienestar financiero con solidaridad y transparencia en Colombia.
              </p>
            </div>
            <div>
              <h5 className="text-white font-bold text-sm mb-4 font-[Montserrat,sans-serif]">Productos</h5>
              <ul className="space-y-2 text-white/50 text-sm">
                {["Crédito Propósito", "Ahorro Propósito", "CDAT", "Libranza"].map((p) => (
                  <li key={p}><a href="/" className="hover:text-[#EBC302] transition-colors">{p}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold text-sm mb-4 font-[Montserrat,sans-serif]">Institucional</h5>
              <ul className="space-y-2 text-white/50 text-sm">
                {["Quiénes Somos", "Confianza", "Beneficios", "Trabaja con nosotros"].map((p) => (
                  <li key={p}><a href="/" className="hover:text-[#EBC302] transition-colors">{p}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold text-sm mb-4 font-[Montserrat,sans-serif]">Contacto</h5>
              <ul className="space-y-2 text-white/50 text-sm">
                <li>📞 601 741 5000</li>
                <li>✉️ info@coovitel.coop</li>
                <li>📍 Bogotá, Colombia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/30 text-xs">© 2024 COOVITEL. Todos los derechos reservados. Vigilada por Supersolidaria.</p>
            <p className="text-white/30 text-xs">Política de Privacidad · Términos y Condiciones</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
