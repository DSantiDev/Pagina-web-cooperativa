import { useState } from "react";

const NAV_ITEMS = [
  { label: "Inicio", href: "#" },
  { label: "Productos", href: "#" },
  { label: "Quiénes Somos", href: "#" },
  { label: "Confianza", href: "#" },
  { label: "Beneficios", href: "#", active: true },
  { label: "Contacto", href: "#" },
];

type Tab = "sociales" | "financieros" | "redvital" | "exequial" | "educacion";

const TABS: { id: Tab; label: string; shortLabel: string; group: string }[] = [
  { id: "sociales", label: "Beneficios Sociales", shortLabel: "Sociales", group: "Beneficios" },
  { id: "financieros", label: "Beneficios Financieros", shortLabel: "Financieros", group: "Beneficios" },
  { id: "redvital", label: "RedVital", shortLabel: "RedVital", group: "Asistencias" },
  { id: "exequial", label: "Plan Exequial", shortLabel: "Plan Exequial", group: "Auxilios" },
  { id: "educacion", label: "Educación Cooperativa", shortLabel: "Educación", group: "Educación" },
];

const SOCIAL_BENEFITS = [
  {
    icon: "🎭",
    title: "Recreación y Cultura",
    description:
      "Acceso a eventos culturales, deportivos y recreativos con descuentos exclusivos para asociados y su grupo familiar.",
  },
  {
    icon: "🎁",
    title: "Subsidio de Navidad",
    description:
      "Cada año, nuestros asociados activos reciben un subsidio especial en temporada navideña como muestra de nuestro aprecio.",
  },
  {
    icon: "👶",
    title: "Subsidio de Natalidad",
    description:
      "Al llegar un nuevo integrante a tu familia, COOVITEL te acompaña con un auxilio especial de bienvenida.",
  },
  {
    icon: "🎓",
    title: "Subsidio Educativo",
    description:
      "Apoyo económico para los hijos de asociados en su formación académica desde preescolar hasta universitaria.",
  },
  {
    icon: "💍",
    title: "Auxilio de Matrimonio",
    description:
      "Celebra este momento especial con el respaldo de tu cooperativa. Solicita tu auxilio de matrimonio.",
  },
  {
    icon: "⚕️",
    title: "Convenios de Salud",
    description:
      "Descuentos en clínicas, laboratorios, ópticas y droguerías a través de nuestra red de convenios en todo el país.",
  },
];

const FINANCIAL_BENEFITS = [
  {
    icon: "📉",
    title: "Tasas Preferenciales",
    description:
      "Accede a créditos con tasas de interés por debajo del mercado, diseñadas para el bienestar financiero de nuestros asociados.",
    highlight: "Desde 0.9% M.V.",
  },
  {
    icon: "💰",
    title: "Ahorro con Rentabilidad",
    description:
      "Tus ahorros generan rendimientos superiores al promedio del sistema financiero tradicional, garantizando tu crecimiento.",
    highlight: "Hasta 8% E.A.",
  },
  {
    icon: "🏦",
    title: "CDAT Cooperativo",
    description:
      "Certificados de depósito a término con excelentes tasas y plazos flexibles para maximizar el retorno de tu inversión.",
    highlight: "Plazos desde 30 días",
  },
  {
    icon: "🔄",
    title: "Crédito Rotativo",
    description:
      "Cupo de crédito disponible permanentemente para que accedas a recursos cuando los necesites sin trámites adicionales.",
    highlight: "Disponible 24/7",
  },
  {
    icon: "🏠",
    title: "Crédito de Vivienda",
    description:
      "Haz realidad el sueño de tu hogar con nuestras líneas especiales de financiación para compra, construcción o mejora.",
    highlight: "Largo plazo",
  },
  {
    icon: "📊",
    title: "Portafolio de Inversión",
    description:
      "Asesoría personalizada para estructurar tu portafolio de ahorro e inversión de acuerdo a tus metas y horizonte de tiempo.",
    highlight: "Asesoría gratuita",
  },
];

const REDVITAL_FEATURES = [
  {
    icon: "🏥",
    title: "Red Médica Amplia",
    description:
      "Acceso a más de 500 profesionales de la salud y 200 instituciones médicas en todo el territorio nacional.",
  },
  {
    icon: "🚑",
    title: "Urgencias 24/7",
    description:
      "Línea de atención de urgencias disponible las 24 horas del día, los 365 días del año para ti y tu familia.",
  },
  {
    icon: "💊",
    title: "Descuentos en Medicamentos",
    description:
      "Hasta el 30% de descuento en una amplia red de droguerías y farmacias aliadas con tu carné de asociado.",
  },
  {
    icon: "🔬",
    title: "Laboratorio Clínico",
    description:
      "Exámenes de laboratorio con descuentos especiales en las mejores instituciones diagnósticas del país.",
  },
  {
    icon: "👁️",
    title: "Salud Visual",
    description:
      "Convenios con ópticas especializadas para exámenes, monturas y lentes con precios preferenciales para asociados.",
  },
  {
    icon: "🧘",
    title: "Bienestar Integral",
    description:
      "Programas de prevención y promoción de la salud: nutrición, actividad física, salud mental y hábitos saludables.",
  },
];

const EXEQUIAL_FEATURES = [
  { label: "Cobertura titular", value: "Sin costo adicional" },
  { label: "Grupo familiar incluido", value: "Hasta 5 beneficiarios" },
  { label: "Servicio exequial completo", value: "Incluido" },
  { label: "Traslado nacional", value: "Incluido" },
  { label: "Sala de velación", value: "Hasta 24 horas" },
  { label: "Urna o ataúd", value: "Incluido" },
  { label: "Arreglo floral", value: "Incluido" },
  { label: "Trámites legales", value: "Incluido" },
];

const EDUCATION_PROGRAMS = [
  {
    icon: "📚",
    title: "Becas Educativas",
    description:
      "Apoyamos la formación superior de hijos de asociados con becas parciales en universidades aliadas a nivel nacional.",
    badge: "Convocatoria anual",
  },
  {
    icon: "💼",
    title: "Educación Financiera",
    description:
      "Talleres y webinars gratuitos sobre finanzas personales, inversión, ahorro y planificación económica familiar.",
    badge: "Gratuito",
  },
  {
    icon: "🤝",
    title: "Formación Cooperativa",
    description:
      "Programas de formación en valores cooperativos, economía solidaria y liderazgo para asociados y directivos.",
    badge: "Permanente",
  },
  {
    icon: "💻",
    title: "Plataforma E-learning",
    description:
      "Acceso a cursos virtuales en alianza con plataformas educativas líderes para el desarrollo profesional de asociados.",
    badge: "Online",
  },
];

function CoovitelLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 flex items-center justify-center">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" fill="#173C6E" />
          <polygon points="18,8 28,13.5 28,22.5 18,28 8,22.5 8,13.5" fill="white" opacity="0.3" />
          <polygon points="18,13 23,15.5 23,20.5 18,23 13,20.5 13,15.5" fill="white" />
        </svg>
      </div>
      <div>
        <div className="font-bold text-[#173C6E] text-lg leading-none tracking-wide">COOVITEL</div>
        <div className="text-[9px] text-gray-500 leading-none">Cooperativa Empresarial de Ahorro y Crédito</div>
      </div>
    </div>
  );
}

function Header({ mobileOpen, setMobileOpen }: { mobileOpen: boolean; setMobileOpen: (v: boolean) => void }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <CoovitelLogo />
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                item.active
                  ? "text-[#173C6E] border-b-2 border-[#EBC302] pb-0.5"
                  : "text-gray-600 hover:text-[#173C6E]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#"
            className="text-sm font-semibold text-[#173C6E] border border-[#173C6E] rounded-full px-4 py-1.5 hover:bg-[#173C6E] hover:text-white transition-colors"
          >
            Oficina Virtual
          </a>
          <a
            href="#"
            className="text-sm font-semibold bg-[#EBC302] text-white rounded-full px-4 py-1.5 hover:bg-[#EBC302] transition-colors"
          >
            Asóciate
          </a>
        </div>
        <button
          className="lg:hidden p-2 rounded-md text-gray-600"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-medium py-1 ${item.active ? "text-[#173C6E]" : "text-gray-600"}`}
            >
              {item.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <a href="#" className="text-xs font-semibold text-[#173C6E] border border-[#173C6E] rounded-full px-3 py-1.5">
              Oficina Virtual
            </a>
            <a href="#" className="text-xs font-semibold bg-[#EBC302] text-white rounded-full px-3 py-1.5">
              Asóciate
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function HeroBanner({ activeTab }: { activeTab: Tab }) {
  const tab = TABS.find((t) => t.id === activeTab)!;
  return (
    <div className="relative bg-[#173C6E] overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1603367563698-67012943fd67?w=1400&h=400&fit=crop&auto=format')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #131739 0%, #173C6E 60%, #27548F 100%)" }} />
      {/* decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
      <div className="absolute -bottom-10 left-1/3 w-48 h-48 bg-[#EBC302]/10 rounded-full" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
          <div className="w-2 h-2 rounded-full bg-[#EBC302]" />
          <span className="text-white/90 text-xs font-semibold uppercase tracking-widest">Plan de Beneficios COOVITEL</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
          {tab.label}
        </h1>
        <p className="text-white/70 text-base md:text-lg max-w-xl">
          Porque ser asociado de COOVITEL va más allá del crédito y el ahorro. Descubre todos los privilegios que tenemos para ti y tu familia.
        </p>
      </div>
      {/* wave bottom */}
      <div className="relative">
        <svg viewBox="0 0 1440 40" fill="none" className="w-full block" preserveAspectRatio="none">
          <path d="M0 40 C360 0 1080 40 1440 10 L1440 40 Z" fill="white" />
        </svg>
      </div>
    </div>
  );
}

function TabNav({ activeTab, setActiveTab }: { activeTab: Tab; setActiveTab: (t: Tab) => void }) {
  return (
    <nav className="benefits-tab-nav bg-white z-40 border-b border-gray-100 shadow-sm" aria-label="Secciones de beneficios">
      <div className="benefits-tab-nav__container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="benefits-tab-nav__mobile" aria-label="Secciones de beneficios">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={activeTab === tab.id ? "is-active" : ""}>
              <span>{tab.group}</span><strong>{tab.shortLabel}</strong>
            </button>
          ))}
        </div>
        <div className="benefits-tab-nav__list">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`benefits-tab-nav__item relative flex flex-col items-start transition-all ${
                  isActive
                    ? "is-active text-[#173C6E]"
                    : "text-gray-500 hover:text-[#173C6E]"
                }`}
              >
                <span className="text-[10px] font-semibold uppercase tracking-widest mb-0.5 text-[#173C6E] opacity-80">
                  {tab.group}
                </span>
                <span className="text-sm font-semibold">{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#173C6E] rounded-t" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function BeneficiosSociales() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="text-[#173C6E] text-xs font-bold uppercase tracking-widest">Beneficios · Sociales</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#173C6E] mt-2 mb-4 leading-tight">
              Bienestar para ti<br />y tu familia
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              En COOVITEL creemos que el bienestar integral va mucho más allá de lo financiero. Por eso, nuestro plan de beneficios sociales está diseñado para acompañarte en cada etapa de tu vida y la de tu familia.
            </p>
            <div className="flex gap-3 flex-wrap">
              <div className="bg-[#173C6E]/5 rounded-xl px-4 py-2 text-center">
                <div className="font-bold text-[#173C6E] text-xl">17.000+</div>
                <div className="text-xs text-gray-500">Asociados beneficiados</div>
              </div>
              <div className="bg-[#EBC302]/10 rounded-xl px-4 py-2 text-center">
                <div className="font-bold text-[#173C6E] text-xl">64+</div>
                <div className="text-xs text-gray-500">Años de trayectoria</div>
              </div>
              <div className="bg-[#173C6E]/5 rounded-xl px-4 py-2 text-center">
                <div className="font-bold text-[#173C6E] text-xl">9</div>
                <div className="text-xs text-gray-500">Ciudades</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=420&fit=crop&auto=format"
              alt="Familia feliz beneficiada por COOVITEL"
              className="w-full h-72 object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-4 -left-4 bg-[#EBC302] text-white rounded-xl px-4 py-3 shadow-lg">
              <div className="font-bold text-lg">200+</div>
              <div className="text-xs opacity-90">Empresas aliadas</div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOCIAL_BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#173C6E]/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#173C6E]/8 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-[#173C6E]/15 transition-colors">
                {benefit.icon}
              </div>
              <h3 className="font-bold text-[#173C6E] text-base mb-2">{benefit.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#173C6E] to-[#27548F] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-bold text-xl mb-1">¿Quieres acceder a estos beneficios?</h3>
            <p className="text-white/70 text-sm">Asóciate hoy y comienza a disfrutar de todos nuestros privilegios.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href="/asociate" className="bg-[#EBC302] hover:bg-[#EBC302] text-white font-semibold rounded-full px-6 py-3 text-sm transition-colors">
              Asóciate ahora
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function BeneficiosFinancieros() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-12">
        <span className="text-[#173C6E] text-xs font-bold uppercase tracking-widest">Beneficios · Financieros</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#173C6E] mt-2 mb-4">
          Tu dinero, trabajando para ti
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
          Como asociado COOVITEL tienes acceso a condiciones financieras exclusivas que el mercado tradicional no puede ofrecerte. Ahorra más, paga menos.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        {FINANCIAL_BENEFITS.map((benefit) => (
          <div
            key={benefit.title}
            className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#EBC302]/8 rounded-bl-[48px]" />
            <div className="text-2xl mb-3">{benefit.icon}</div>
            <h3 className="font-bold text-[#173C6E] text-base mb-2">{benefit.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{benefit.description}</p>
            <div className="inline-flex items-center gap-1.5 bg-[#EBC302]/15 rounded-full px-3 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#EBC302]" />
              <span className="text-[#173C6E] text-xs font-semibold">{benefit.highlight}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#F7F0FF] rounded-2xl p-8 border border-[#173C6E]/10">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Tasa mínima crédito", value: "0.9%", sub: "mensual vencido" },
            { label: "Rendimiento ahorro", value: "8%", sub: "efectivo anual" },
            { label: "Plazo crédito", value: "96", sub: "meses máximo" },
            { label: "Tiempo aprobación", value: "48h", sub: "horas hábiles" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-[#173C6E] mb-1">{stat.value}</div>
              <div className="text-xs text-[#173C6E] font-semibold uppercase tracking-wide">{stat.sub}</div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RedVital() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Hero intro */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="order-2 md:order-1 relative">
          <img
            src="https://images.unsplash.com/photo-1694113280467-b742509058d1?w=600&h=440&fit=crop&auto=format"
            alt="RedVital asistencia médica"
            className="w-full h-80 object-cover rounded-2xl shadow-xl"
          />
          <div className="absolute -top-4 -right-4 bg-white border border-gray-100 rounded-xl p-4 shadow-lg">
            <div className="text-[#173C6E] font-bold text-2xl">500+</div>
            <div className="text-xs text-gray-500">Médicos aliados</div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <span className="text-[#173C6E] text-xs font-bold uppercase tracking-widest">Asistencias · RedVital</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#173C6E] mt-2 mb-4 leading-tight">
            Tu salud, nuestra<br />prioridad
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            RedVital es nuestro programa de asistencia médica integral que garantiza acceso a salud de calidad para ti y tu familia. Con cobertura nacional y atención permanente, siempre tendrás respaldo médico.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Todos los beneficios de RedVital se gestionan y solicitan directamente desde la <span className="font-semibold text-[#173C6E]">App RedVital</span> — tu portal de salud disponible en tu celular las 24 horas del día.
          </p>
          <ul className="space-y-3">
            {["Cobertura para asociado y grupo familiar", "Atención de urgencias 24/7", "Red nacional de más de 200 instituciones", "Sin períodos de carencia", "Todos los servicios desde la app"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-gray-600 text-sm">
                <div className="w-5 h-5 rounded-full bg-[#EBC302] flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* App highlight banner */}
      <div className="bg-gradient-to-br from-[#131739] to-[#173C6E] rounded-3xl p-8 md:p-12 mb-14 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-[#EBC302]/10 rounded-full translate-y-1/2" />
        <div className="relative grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#EBC302]/20 border border-[#EBC302]/40 rounded-full px-3 py-1 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#EBC302] animate-pulse" />
              <span className="text-[#173C6E] text-xs font-bold uppercase tracking-widest">App oficial</span>
            </div>
            <h3 className="text-white font-bold text-2xl md:text-3xl mb-4 leading-tight">
              Descarga la App<br />
              <span className="text-[#173C6E]">Red Vital</span> y gestiona<br />
              todo desde tu celular
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Con la App RedVital tienes en la palma de tu mano todos los beneficios de asistencia médica de COOVITEL. Solicita citas, consulta tu red de médicos, activa servicios de urgencias, descarga tu carné digital y mucho más — todo sin filas, sin llamadas, sin complicaciones.
            </p>

            <div className="space-y-2 mb-8">
              {[
                "Solicita y gestiona todos tus beneficios médicos",
                "Consulta la red de médicos y especialistas cercanos",
                "Carné digital de afiliado siempre disponible",
                "Historial de servicios utilizados",
                "Activación de urgencias con un solo toque",
                "Descuentos en medicamentos y laboratorios",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-white/80 text-sm">
                  <svg className="w-4 h-4 text-[#173C6E] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Google Play */}
              <a
                href="https://play.google.com/store/apps/details?id=redvitalapp.laaseguradora.com&hl=es_CO"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-black hover:bg-gray-900 border border-white/20 rounded-xl px-4 py-3 transition-all hover:scale-105"
              >
                <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M3.18 23.5c.3.17.65.19.97.05L15.66 12 11.1 7.44 3.18 23.5z" fill="#A90072"/>
                  <path d="M20.5 10.56l-3-1.72-3.84 3.16 3.84 3.16 3.03-1.74c.86-.5.86-1.86-.03-2.86z" fill="#EBC302"/>
                  <path d="M3.18.5C2.88.66 2.67 1 2.67 1.44v21.12c0 .44.21.78.51.94l12.48-11.5L3.18.5z" fill="#1B65A6"/>
                  <path d="M3.18 23.5l7.92-7.94 4.56 4.56-11.51 3.43c-.16.05-.32.05-.48.02c.17.04.35.03.51-.07z" fill="#1B65A6"/>
                </svg>
                <div>
                  <div className="text-white/60 text-[10px] leading-none mb-0.5">Disponible en</div>
                  <div className="text-white font-semibold text-sm leading-none">Google Play</div>
                </div>
              </a>

              {/* App Store */}
              <a
                href="https://apps.apple.com/co/app/red-vital-app/id1643637462"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-black hover:bg-gray-900 border border-white/20 rounded-xl px-4 py-3 transition-all hover:scale-105"
              >
                <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <div className="text-white/60 text-[10px] leading-none mb-0.5">Descarga en</div>
                  <div className="text-white font-semibold text-sm leading-none">App Store</div>
                </div>
              </a>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-52 h-96 bg-white/10 border-2 border-white/20 rounded-[2.5rem] p-3 backdrop-blur-sm shadow-2xl">
                <div className="w-full h-full bg-gradient-to-b from-[#173C6E] to-[#131739] rounded-[2rem] flex flex-col items-center justify-start pt-8 px-4 overflow-hidden relative">
                  <div className="w-16 h-1.5 bg-white/20 rounded-full mb-6" />
                  <div className="w-14 h-14 bg-[#EBC302] rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="text-white font-bold text-base mb-1">Red Vital</div>
                  <div className="text-white/50 text-xs mb-5">Tu salud en tu mano</div>
                  <div className="w-full space-y-2">
                    {["🏥 Buscar médico", "📋 Mis servicios", "💊 Descuentos", "🚑 Urgencias"].map((item) => (
                      <div key={item} className="bg-white/10 rounded-xl px-3 py-2 text-white/80 text-xs flex items-center gap-2">
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-4 w-full px-4">
                    <div className="bg-[#EBC302] rounded-xl py-2 text-center text-white text-xs font-bold">
                      Solicitar beneficio
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 bg-[#EBC302] text-white rounded-xl px-3 py-2 text-center shadow-lg">
                <div className="font-bold text-sm">4.8 ★</div>
                <div className="text-[10px] opacity-90">App Store</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {REDVITAL_FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#173C6E]/20 transition-all"
          >
            <div className="w-11 h-11 bg-[#EBC302]/12 rounded-xl flex items-center justify-center text-xl mb-4">
              {feature.icon}
            </div>
            <h3 className="font-bold text-[#173C6E] text-sm mb-2">{feature.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            <p className="text-[#173C6E] text-xs font-semibold mt-3">Disponible en la App →</p>
          </div>
        ))}
      </div>

      {/* Bottom download CTA */}
      <div className="mt-10 bg-[#F7F0FF] border border-[#173C6E]/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#173C6E] rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div>
            <div className="font-bold text-[#173C6E] text-sm">Descarga la App RedVital ahora</div>
            <div className="text-gray-500 text-xs">Gestiona todos tus beneficios médicos desde tu smartphone</div>
          </div>
        </div>
        <div className="flex gap-3 shrink-0">
          <a
            href="https://play.google.com/store/apps/details?id=redvitalapp.laaseguradora.com&hl=es_CO"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#173C6E] hover:bg-[#131739] text-white rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
              <path d="M3.18 23.5c.3.17.65.19.97.05L15.66 12 11.1 7.44 3.18 23.5z" fill="#A90072"/>
              <path d="M20.5 10.56l-3-1.72-3.84 3.16 3.84 3.16 3.03-1.74c.86-.5.86-1.86-.03-2.86z" fill="#EBC302"/>
              <path d="M3.18.5C2.88.66 2.67 1 2.67 1.44v21.12c0 .44.21.78.51.94l12.48-11.5L3.18.5z" fill="#1B65A6"/>
              <path d="M3.18 23.5l7.92-7.94 4.56 4.56-11.51 3.43c-.16.05-.32.05-.48.02c.17.04.35.03.51-.07z" fill="#1B65A6"/>
            </svg>
            Google Play
          </a>
          <a
            href="https://apps.apple.com/co/app/red-vital-app/id1643637462"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#173C6E] hover:bg-[#131739] text-white rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            App Store
          </a>
        </div>
      </div>
    </div>
  );
}

function PlanExequial() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-12">
        <span className="text-[#173C6E] text-xs font-bold uppercase tracking-widest">Auxilios · Plan Exequial</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#173C6E] mt-2 mb-4">
          Acompañamiento en los<br />momentos más difíciles
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
          El Plan Exequial COOVITEL brinda acompañamiento humano y apoyo logístico integral a los asociados y su grupo familiar, sin costo adicional a su membresía.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-[#173C6E] px-6 py-4">
            <h3 className="text-white font-bold text-lg">Servicios incluidos</h3>
            <p className="text-white/60 text-sm">Todo lo que cubre tu Plan Exequial</p>
          </div>
          <div className="divide-y divide-gray-50">
            {EXEQUIAL_FEATURES.map((item) => (
              <div key={item.label} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#EBC302]" />
                  <span className="text-gray-700 text-sm font-medium">{item.label}</span>
                </div>
                <span className="text-[#173C6E] text-sm font-semibold bg-[#173C6E]/8 rounded-full px-3 py-0.5">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <img
            src="https://images.unsplash.com/photo-1681311311149-7254102442de?w=600&h=300&fit=crop&auto=format"
            alt="Familia COOVITEL - Plan Exequial"
            className="w-full h-52 object-cover rounded-2xl shadow-md"
          />
          <div className="bg-[#F7F0FF] rounded-2xl p-6 border border-[#173C6E]/10">
            <h4 className="font-bold text-[#173C6E] text-base mb-3">¿Quién está cubierto?</h4>
            <div className="space-y-2">
              {["Titular asociado", "Cónyuge o compañero(a) permanente", "Hijos hasta 25 años", "Padres del titular", "Suegros"].map((person) => (
                <div key={person} className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-5 h-5 rounded-full bg-[#173C6E] flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {person}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#EBC302]/12 border border-[#EBC302]/30 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📞</span>
              <div>
                <h4 className="font-bold text-[#173C6E] text-sm mb-1">Línea de atención 24/7</h4>
                <p className="text-gray-600 text-sm">En el momento que lo necesites, nuestro equipo está disponible para orientarte y activar el servicio.</p>
                <a href="tel:018000" className="mt-2 inline-block text-[#173C6E] font-bold text-base">01 8000 XXX XXX</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EducacionCooperativa() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <span className="text-[#173C6E] text-xs font-bold uppercase tracking-widest">Educación Cooperativa</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#173C6E] mt-2 mb-4 leading-tight">
            Crecer juntos es<br />nuestra filosofía
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            La educación cooperativa es el corazón de COOVITEL. Creemos que el conocimiento transforma vidas y fortalece la comunidad. Por eso invertimos permanentemente en la formación de nuestros asociados, sus familias y nuestro equipo.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Talleres realizados", value: "120+" },
              { label: "Becas otorgadas", value: "450+" },
              { label: "Asociados formados", value: "3.200+" },
              { label: "Alianzas educativas", value: "25+" },
            ].map((s) => (
              <div key={s.label} className="bg-[#F7F0FF] rounded-xl p-4 border border-[#173C6E]/10">
                <div className="font-bold text-[#173C6E] text-2xl">{s.value}</div>
                <div className="text-gray-500 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&h=440&fit=crop&auto=format"
            alt="Educación cooperativa COOVITEL"
            className="w-full h-80 object-cover rounded-2xl shadow-xl"
          />
          <div className="absolute -bottom-5 -right-5 bg-[#EBC302] rounded-2xl p-4 shadow-lg">
            <div className="text-white font-bold text-lg">100%</div>
            <div className="text-white/80 text-xs">Gratuito para<br />asociados</div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {EDUCATION_PROGRAMS.map((program) => (
          <div
            key={program.title}
            className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#EBC302]/40 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-3xl mb-3">{program.icon}</div>
            <div className="inline-block bg-[#EBC302]/15 text-[#173C6E] text-[10px] font-bold uppercase tracking-wide rounded-full px-2.5 py-0.5 mb-3">
              {program.badge}
            </div>
            <h3 className="font-bold text-[#173C6E] text-sm mb-2">{program.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{program.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#173C6E] rounded-2xl p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-white font-bold text-2xl mb-3">Próximos eventos formativos</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Inscríbete a nuestros próximos talleres, webinars y programas de formación cooperativa. ¡Cupos limitados!
            </p>
          </div>
          <div className="space-y-3">
            {[
              { fecha: "Oct 15", evento: "Taller de Finanzas Personales", modo: "Virtual" },
              { fecha: "Oct 22", evento: "Educación Cooperativa Básica", modo: "Presencial" },
              { fecha: "Nov 5", evento: "Convocatoria Becas 2027", modo: "Online" },
            ].map((ev) => (
              <div key={ev.evento} className="flex items-center gap-4 bg-white/10 rounded-xl px-4 py-3">
                <div className="bg-[#EBC302] rounded-lg px-3 py-2 text-center shrink-0">
                  <div className="text-white font-bold text-xs">{ev.fecha}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{ev.evento}</div>
                  <div className="text-white/50 text-xs">{ev.modo}</div>
                </div>
                <a href="#" className="text-[#173C6E] text-xs font-semibold shrink-0 hover:underline">
                  Inscribirse →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#131739] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#EBC302] rounded-lg flex items-center justify-center text-white font-bold text-sm">CV</div>
              <span className="font-bold text-lg tracking-wide">COOVITEL</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Cooperativa Empresarial de Ahorro y Crédito. 64 años construyendo bienestar financiero con solidaridad y transparencia en Colombia.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 text-white/90">Productos</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              {["Crédito Propósito", "Ahorro Propósito", "CDAT", "Crédito Educativo"].map((item) => (
                <li key={item}><a href="#" className="hover:text-[#173C6E] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 text-white/90">Institucional</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              {["Quiénes Somos", "Plan de Beneficios", "Asistencias Gratis", "Educación Cooperativa"].map((item) => (
                <li key={item}><a href="#" className="hover:text-[#173C6E] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 text-white/90">Beneficios</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              {["Beneficios Sociales", "Beneficios Financieros", "RedVital", "Plan Exequial"].map((item) => (
                <li key={item}><a href="#" className="hover:text-[#173C6E] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">© 2026 COOVITEL. Todos los derechos reservados. Vigilada Supersolidaria.</p>
          <div className="flex gap-4 text-white/30 text-xs">
            <a href="#" className="hover:text-white/60 transition-colors">Política de privacidad</a>
            <a href="#" className="hover:text-white/60 transition-colors">Términos y condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Beneficios() {
  const [activeTab, setActiveTab] = useState<Tab>("sociales");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-full bg-white flex flex-col">
      <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <HeroBanner activeTab={activeTab} />
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 bg-white">
        {activeTab === "sociales" && <BeneficiosSociales />}
        {activeTab === "financieros" && <BeneficiosFinancieros />}
        {activeTab === "redvital" && <RedVital />}
        {activeTab === "exequial" && <PlanExequial />}
        {activeTab === "educacion" && <EducacionCooperativa />}
      </main>

      <Footer />
    </div>
  );
}
