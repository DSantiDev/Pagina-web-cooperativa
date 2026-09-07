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

const TABS: { id: Tab; label: string; group: string }[] = [
  { id: "sociales", label: "Beneficios Sociales", group: "Beneficios" },
  { id: "financieros", label: "Beneficios Financieros", group: "Beneficios" },
  { id: "redvital", label: "RedVital", group: "Asistencias" },
  { id: "exequial", label: "Plan Exequial", group: "Auxilios" },
  { id: "educacion", label: "Educación Cooperativa", group: "Educación" },
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
          <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" fill="#1a2580" />
          <polygon points="18,8 28,13.5 28,22.5 18,28 8,22.5 8,13.5" fill="white" opacity="0.3" />
          <polygon points="18,13 23,15.5 23,20.5 18,23 13,20.5 13,15.5" fill="white" />
        </svg>
      </div>
      <div>
        <div className="font-bold text-[#1a2580] text-lg leading-none tracking-wide">COOVITEL</div>
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
                  ? "text-[#1a2580] border-b-2 border-[#f5a623] pb-0.5"
                  : "text-gray-600 hover:text-[#1a2580]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#"
            className="text-sm font-semibold text-[#1a2580] border border-[#1a2580] rounded-full px-4 py-1.5 hover:bg-[#1a2580] hover:text-white transition-colors"
          >
            Oficina Virtual
          </a>
          <a
            href="#"
            className="text-sm font-semibold bg-[#f5a623] text-white rounded-full px-4 py-1.5 hover:bg-[#e8941a] transition-colors"
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
              className={`text-sm font-medium py-1 ${item.active ? "text-[#1a2580]" : "text-gray-600"}`}
            >
              {item.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <a href="#" className="text-xs font-semibold text-[#1a2580] border border-[#1a2580] rounded-full px-3 py-1.5">
              Oficina Virtual
            </a>
            <a href="#" className="text-xs font-semibold bg-[#f5a623] text-white rounded-full px-3 py-1.5">
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
    <div className="relative bg-[#1a2580] overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1603367563698-67012943fd67?w=1400&h=400&fit=crop&auto=format')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0d1547 0%, #1a2580 60%, #2d3a9e 100%)" }} />
      {/* decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
      <div className="absolute -bottom-10 left-1/3 w-48 h-48 bg-[#f5a623]/10 rounded-full" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
          <a href="#" className="hover:text-white transition-colors">Inicio</a>
          <span>/</span>
          <a href="#" className="hover:text-white transition-colors">{tab.group}</a>
          <span>/</span>
          <span className="text-[#f5a623]">{tab.label}</span>
        </div>
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
          <div className="w-2 h-2 rounded-full bg-[#f5a623]" />
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
  const groups = ["Beneficios", "Asistencias", "Auxilios", "Educación"];
  return (
    <div className="bg-white sticky top-16 z-40 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => {
            const groupIndex = groups.indexOf(tab.group);
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-col items-start py-4 px-5 whitespace-nowrap transition-all min-w-max ${
                  isActive
                    ? "text-[#1a2580]"
                    : "text-gray-500 hover:text-[#1a2580]"
                }`}
              >
                <span className="text-[10px] font-semibold uppercase tracking-widest mb-0.5 text-[#f5a623] opacity-80">
                  {tab.group}
                </span>
                <span className="text-sm font-semibold">{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a2580] rounded-t" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function BeneficiosSociales() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="text-[#f5a623] text-xs font-bold uppercase tracking-widest">Beneficios · Sociales</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2580] mt-2 mb-4 leading-tight">
              Bienestar para ti<br />y tu familia
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              En COOVITEL creemos que el bienestar integral va mucho más allá de lo financiero. Por eso, nuestro plan de beneficios sociales está diseñado para acompañarte en cada etapa de tu vida y la de tu familia.
            </p>
            <div className="flex gap-3 flex-wrap">
              <div className="bg-[#1a2580]/5 rounded-xl px-4 py-2 text-center">
                <div className="font-bold text-[#1a2580] text-xl">17.000+</div>
                <div className="text-xs text-gray-500">Asociados beneficiados</div>
              </div>
              <div className="bg-[#f5a623]/10 rounded-xl px-4 py-2 text-center">
                <div className="font-bold text-[#1a2580] text-xl">64+</div>
                <div className="text-xs text-gray-500">Años de trayectoria</div>
              </div>
              <div className="bg-[#1a2580]/5 rounded-xl px-4 py-2 text-center">
                <div className="font-bold text-[#1a2580] text-xl">9</div>
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
            <div className="absolute -bottom-4 -left-4 bg-[#f5a623] text-white rounded-xl px-4 py-3 shadow-lg">
              <div className="font-bold text-lg">200+</div>
              <div className="text-xs opacity-90">Empresas aliadas</div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOCIAL_BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#1a2580]/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#1a2580]/8 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-[#1a2580]/15 transition-colors">
                {benefit.icon}
              </div>
              <h3 className="font-bold text-[#1a2580] text-base mb-2">{benefit.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#1a2580] to-[#2d3a9e] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-bold text-xl mb-1">¿Quieres acceder a estos beneficios?</h3>
            <p className="text-white/70 text-sm">Asóciate hoy y comienza a disfrutar de todos nuestros privilegios.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href="#" className="bg-[#f5a623] hover:bg-[#e8941a] text-white font-semibold rounded-full px-6 py-3 text-sm transition-colors">
              Asóciate ahora
            </a>
            <a href="#" className="border border-white/40 text-white hover:bg-white/10 font-semibold rounded-full px-6 py-3 text-sm transition-colors">
              Más información
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
        <span className="text-[#f5a623] text-xs font-bold uppercase tracking-widest">Beneficios · Financieros</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a2580] mt-2 mb-4">
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
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#f5a623]/8 rounded-bl-[48px]" />
            <div className="text-2xl mb-3">{benefit.icon}</div>
            <h3 className="font-bold text-[#1a2580] text-base mb-2">{benefit.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{benefit.description}</p>
            <div className="inline-flex items-center gap-1.5 bg-[#f5a623]/15 rounded-full px-3 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" />
              <span className="text-[#1a2580] text-xs font-semibold">{benefit.highlight}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#f8f9ff] rounded-2xl p-8 border border-[#1a2580]/10">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Tasa mínima crédito", value: "0.9%", sub: "mensual vencido" },
            { label: "Rendimiento ahorro", value: "8%", sub: "efectivo anual" },
            { label: "Plazo crédito", value: "96", sub: "meses máximo" },
            { label: "Tiempo aprobación", value: "48h", sub: "horas hábiles" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-[#1a2580] mb-1">{stat.value}</div>
              <div className="text-xs text-[#f5a623] font-semibold uppercase tracking-wide">{stat.sub}</div>
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
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="order-2 md:order-1 relative">
          <img
            src="https://images.unsplash.com/photo-1694113280467-b742509058d1?w=600&h=440&fit=crop&auto=format"
            alt="RedVital asistencia médica"
            className="w-full h-80 object-cover rounded-2xl shadow-xl"
          />
          <div className="absolute -top-4 -right-4 bg-white border border-gray-100 rounded-xl p-4 shadow-lg">
            <div className="text-[#f5a623] font-bold text-2xl">500+</div>
            <div className="text-xs text-gray-500">Médicos aliados</div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <span className="text-[#f5a623] text-xs font-bold uppercase tracking-widest">Asistencias · RedVital</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2580] mt-2 mb-4 leading-tight">
            Tu salud, nuestra<br />prioridad
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            RedVital es nuestro programa de asistencia médica integral que garantiza acceso a salud de calidad para ti y tu familia. Con cobertura nacional y atención permanente, siempre tendrás respaldo médico.
          </p>
          <ul className="space-y-3">
            {["Cobertura para asociado y grupo familiar", "Atención de urgencias 24/7", "Red nacional de más de 200 instituciones", "Sin períodos de carencia"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-gray-600 text-sm">
                <div className="w-5 h-5 rounded-full bg-[#f5a623] flex items-center justify-center shrink-0">
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {REDVITAL_FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#1a2580]/20 transition-all"
          >
            <div className="w-11 h-11 bg-[#f5a623]/12 rounded-xl flex items-center justify-center text-xl mb-4">
              {feature.icon}
            </div>
            <h3 className="font-bold text-[#1a2580] text-sm mb-2">{feature.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a href="#" className="inline-flex items-center gap-2 bg-[#1a2580] hover:bg-[#0d1547] text-white font-semibold rounded-full px-8 py-3.5 transition-colors text-sm">
          Consulta tu red de médicos
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function PlanExequial() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-12">
        <span className="text-[#f5a623] text-xs font-bold uppercase tracking-widest">Auxilios · Plan Exequial</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a2580] mt-2 mb-4">
          Acompañamiento en los<br />momentos más difíciles
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
          El Plan Exequial COOVITEL brinda acompañamiento humano y apoyo logístico integral a los asociados y su grupo familiar, sin costo adicional a su membresía.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-[#1a2580] px-6 py-4">
            <h3 className="text-white font-bold text-lg">Servicios incluidos</h3>
            <p className="text-white/60 text-sm">Todo lo que cubre tu Plan Exequial</p>
          </div>
          <div className="divide-y divide-gray-50">
            {EXEQUIAL_FEATURES.map((item) => (
              <div key={item.label} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#f5a623]" />
                  <span className="text-gray-700 text-sm font-medium">{item.label}</span>
                </div>
                <span className="text-[#1a2580] text-sm font-semibold bg-[#1a2580]/8 rounded-full px-3 py-0.5">
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
          <div className="bg-[#f8f9ff] rounded-2xl p-6 border border-[#1a2580]/10">
            <h4 className="font-bold text-[#1a2580] text-base mb-3">¿Quién está cubierto?</h4>
            <div className="space-y-2">
              {["Titular asociado", "Cónyuge o compañero(a) permanente", "Hijos hasta 25 años", "Padres del titular", "Suegros"].map((person) => (
                <div key={person} className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-5 h-5 rounded-full bg-[#1a2580] flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {person}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#f5a623]/12 border border-[#f5a623]/30 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📞</span>
              <div>
                <h4 className="font-bold text-[#1a2580] text-sm mb-1">Línea de atención 24/7</h4>
                <p className="text-gray-600 text-sm">En el momento que lo necesites, nuestro equipo está disponible para orientarte y activar el servicio.</p>
                <a href="tel:018000" className="mt-2 inline-block text-[#f5a623] font-bold text-base">01 8000 XXX XXX</a>
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
          <span className="text-[#f5a623] text-xs font-bold uppercase tracking-widest">Educación Cooperativa</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2580] mt-2 mb-4 leading-tight">
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
              <div key={s.label} className="bg-[#f8f9ff] rounded-xl p-4 border border-[#1a2580]/10">
                <div className="font-bold text-[#1a2580] text-2xl">{s.value}</div>
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
          <div className="absolute -bottom-5 -right-5 bg-[#f5a623] rounded-2xl p-4 shadow-lg">
            <div className="text-white font-bold text-lg">100%</div>
            <div className="text-white/80 text-xs">Gratuito para<br />asociados</div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {EDUCATION_PROGRAMS.map((program) => (
          <div
            key={program.title}
            className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#f5a623]/40 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-3xl mb-3">{program.icon}</div>
            <div className="inline-block bg-[#f5a623]/15 text-[#1a2580] text-[10px] font-bold uppercase tracking-wide rounded-full px-2.5 py-0.5 mb-3">
              {program.badge}
            </div>
            <h3 className="font-bold text-[#1a2580] text-sm mb-2">{program.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{program.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#1a2580] rounded-2xl p-8 md:p-12">
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
                <div className="bg-[#f5a623] rounded-lg px-3 py-2 text-center shrink-0">
                  <div className="text-white font-bold text-xs">{ev.fecha}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{ev.evento}</div>
                  <div className="text-white/50 text-xs">{ev.modo}</div>
                </div>
                <a href="#" className="text-[#f5a623] text-xs font-semibold shrink-0 hover:underline">
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
    <footer className="bg-[#0d1547] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#f5a623] rounded-lg flex items-center justify-center text-white font-bold text-sm">CV</div>
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
                <li key={item}><a href="#" className="hover:text-[#f5a623] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 text-white/90">Institucional</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              {["Quiénes Somos", "Plan de Beneficios", "Asistencias Gratis", "Educación Cooperativa"].map((item) => (
                <li key={item}><a href="#" className="hover:text-[#f5a623] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 text-white/90">Beneficios</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              {["Beneficios Sociales", "Beneficios Financieros", "RedVital", "Plan Exequial"].map((item) => (
                <li key={item}><a href="#" className="hover:text-[#f5a623] transition-colors">{item}</a></li>
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
