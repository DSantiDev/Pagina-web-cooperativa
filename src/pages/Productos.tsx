import { useState } from "react";

/* ─── Data ─────────────────────────────────────────────────── */
const NAV_LINKS = ["Inicio", "Productos", "Quiénes Somos", "Confianza", "Beneficios", "Contacto"];

const CREDITO_PRODUCTS = [
  {
    id: "educacion",
    icon: "🎓",
    title: "Educación",
    tagline: "Invierte en tu futuro",
    desc: "Pregrado, postgrado, técnico y educación continua.",
    detail: "Financia tus estudios o los de tu familia con tasas preferenciales. Cubre matrícula, libros, transporte y gastos de sostenimiento en instituciones nacionales e internacionales.",
    features: ["Hasta 48 meses plazo", "Tasa desde 1.2% M.V.", "Sin codeudor hasta $30M", "Desembolso en 24 horas"],
    color: "#6c63ff",
    bg: "#f0effe",
  },
  {
    id: "recreacion",
    icon: "✈️",
    title: "Recreación",
    tagline: "Vive sin límites",
    desc: "Viajes y gastos totales de tus destinos favoritos.",
    detail: "Viaja nacional o internacionalmente con financiación total de tiquetes, hospedaje, tours y gastos de viaje. Ideal para vacaciones en familia o escapadas de descanso.",
    features: ["Hasta 36 meses plazo", "Tasa desde 1.3% M.V.", "Cubre tiquetes y hospedaje", "Aprobación en línea"],
    color: "#0ea5e9",
    bg: "#e0f5fe",
  },
  {
    id: "fidelizacion",
    icon: "⭐",
    title: "Fidelización",
    tagline: "Más antigüedad, mejor tasa",
    desc: "Tasas y plazos que mejoran con tu antigüedad.",
    detail: "Cuanto más tiempo llevas con nosotros, mejores condiciones obtienes. Tu lealtad se convierte en beneficios reales: menos tasa, más plazo y mayor monto aprobado.",
    features: ["Tasa mejora cada año", "Hasta 60 meses plazo", "Monto hasta $80M", "Sin trámites adicionales"],
    color: "#f59e0b",
    bg: "#fef9e7",
  },
  {
    id: "vehiculo",
    icon: "🚗",
    title: "Vehículo",
    tagline: "Tu movilidad, tu decisión",
    desc: "Nuevo, usado o bicicleta eléctrica a tu medida.",
    detail: "Adquiere el vehículo que necesitas: automóvil nuevo o usado, moto, bicicleta eléctrica o patineta. Financiamos hasta el 80% del valor comercial.",
    features: ["Hasta 72 meses plazo", "Tasa desde 1.1% M.V.", "Financia hasta 80%", "Incluye bici eléctrica"],
    color: "#10b981",
    bg: "#e6faf4",
  },
  {
    id: "libre-inversion",
    icon: "💼",
    title: "Libre Inversión",
    tagline: "Sin restricciones",
    desc: "Financia cualquier proyecto sin restricciones.",
    detail: "El crédito más flexible de COOVITEL. Usa el dinero para lo que necesites: remodelación, negocio, emergencias o cualquier gasto personal sin justificar el destino.",
    features: ["Hasta 48 meses plazo", "Tasa desde 1.4% M.V.", "Monto hasta $50M", "Sin destino específico"],
    color: "#8b5cf6",
    bg: "#f3f0ff",
  },
  {
    id: "credisalud",
    icon: "🏥",
    title: "CrediSalud",
    tagline: "Tu salud primero",
    desc: "Médico, dental, óptico y cirugías estéticas.",
    detail: "Atiende tus necesidades de salud sin preocuparte por el costo. Cubre procedimientos médicos, odontológicos, ópticos y estéticos en clínicas y consultorios aliados.",
    features: ["Hasta 36 meses plazo", "Tasa desde 1.2% M.V.", "Clínicas aliadas", "Aprobación express"],
    color: "#ef4444",
    bg: "#fff0f0",
  },
  {
    id: "vivienda",
    icon: "🏠",
    title: "Vivienda",
    tagline: "El hogar que mereces",
    desc: "Adquiere, construye o mejora tu hogar.",
    detail: "Cumple el sueño de tener casa propia o mejora tu vivienda actual. Financia compra, construcción, remodelación o ampliación con las mejores condiciones del mercado cooperativo.",
    features: ["Hasta 120 meses plazo", "Tasa desde 0.9% M.V.", "Monto hasta $200M", "Compra y remodelación"],
    color: "#f97316",
    bg: "#fff4ed",
  },
  {
    id: "crediseguros",
    icon: "🛡️",
    title: "Crediseguros",
    tagline: "Protege lo que amas",
    desc: "Pólizas para proteger a tu familia y bienes.",
    detail: "Financia la prima de seguros de vida, hogar, vehículo o salud en cómodas cuotas mensuales. Accede a pólizas de nuestras aseguradoras aliadas con tarifas preferenciales.",
    features: ["Sin intereses hasta 12 cuotas", "Seguros vida, hogar y auto", "Aseguradoras aliadas", "Gestión en línea"],
    color: "#3b82f6",
    bg: "#eff6ff",
  },
  {
    id: "cupo-rotativo",
    icon: "🔄",
    title: "Cupo Rotativo",
    tagline: "Siempre disponible",
    desc: "Cupo personal reutilizable siempre disponible.",
    detail: "Un cupo de crédito preaprobado que se renueva a medida que pagas. Disponible 24/7 desde tu app o sucursal virtual, sin trámites adicionales cada vez que lo usas.",
    features: ["Cupo desde $2M", "Reutilizable automático", "Disponible 24/7", "Sin trámite adicional"],
    color: "#06b6d4",
    bg: "#ecfeff",
  },
  {
    id: "compra-cartera",
    icon: "💳",
    title: "Compra de Cartera",
    tagline: "Unifica y ahorra",
    desc: "Unifica tus deudas con mejor tasa y plazo.",
    detail: "Consolida todas tus deudas en un solo crédito con menor tasa y una sola cuota mensual. Reduce tu carga financiera y simplifica tu vida.",
    features: ["Tasa siempre menor", "Una sola cuota", "Todas las entidades", "Ahorro garantizado"],
    color: "#84cc16",
    bg: "#f4ffe6",
  },
];

const AHORRO_PRODUCTS = [
  {
    id: "ahorro-vista",
    icon: "💰",
    title: "Ahorro a la Vista",
    tagline: "Flexible y disponible",
    desc: "Tu dinero disponible cuando lo necesites.",
    detail: "Cuenta de ahorro cooperativo con rentabilidad superior al promedio bancario. Depósitos y retiros libres, sin saldo mínimo y con abono mensual de rendimientos.",
    features: ["Tasa E.A. hasta 4.2%", "Depósitos libres", "Sin saldo mínimo", "Abono mensual"],
    color: "#10b981",
    bg: "#e6faf4",
  },
  {
    id: "cdat",
    icon: "📈",
    title: "CDAT",
    tagline: "Máxima rentabilidad",
    desc: "Certificado de Ahorro a Término con la mejor tasa.",
    detail: "Invierte a plazos fijos de 90, 180 o 360 días y obtén la mejor rentabilidad del mercado cooperativo. Ideal para quienes quieren hacer crecer sus ahorros de forma segura.",
    features: ["Tasa E.A. hasta 11.5%", "Plazos 90, 180 y 360 días", "Monto desde $1M", "Renovación automática"],
    color: "#f59e0b",
    bg: "#fef9e7",
  },
  {
    id: "coovinomina",
    icon: "🏦",
    title: "Coovinómina",
    tagline: "Ahorra desde tu nómina",
    desc: "Descuento automático de nómina para ahorrar sin esfuerzo.",
    detail: "Programa de ahorro por descuento directo de nómina. Cada mes se descuenta automáticamente el monto que elijas, sin que tengas que recordarlo. Tu empresa aliada hace el resto.",
    features: ["Descuento nómina", "Monto desde $50.000", "Sin comisiones", "Retiro con aviso previo"],
    color: "#6c63ff",
    bg: "#f0effe",
  },
  {
    id: "ahorro-proposito",
    icon: "🎯",
    title: "Ahorro Propósito",
    tagline: "Ahorra con una meta",
    desc: "Programa de ahorro orientado a un objetivo específico.",
    detail: "Define tu meta (vacaciones, educación, vivienda) y crea un plan de ahorro mensual. COOVITEL te ayuda a mantener el rumbo con recordatorios y seguimiento de tu progreso.",
    features: ["Meta personalizada", "Rentabilidad progresiva", "Seguro de vida incluido", "App de seguimiento"],
    color: "#ef4444",
    bg: "#fff0f0",
  },
];

const FOOTER_PRODUCTS = ["Crédito Propósito", "Ahorro Propósito", "CDAT", "Cupo Rotativo", "CrediSalud", "Coovinómina"];
const FOOTER_INSTITUCIONAL = ["Quiénes Somos", "Plan de Beneficios", "Asistencias Gratis", "Sucursal Virtual", "Formación", "Contacto"];

type Product = typeof CREDITO_PRODUCTS[number];
type AhorroProduct = typeof AHORRO_PRODUCTS[number];

/* Condiciones específicas por crédito */
const CREDITO_CONDITIONS: Record<string, { label: string; value: string; note: string }[]> = {
  educacion: [
    { label: "Tasa de interés", value: "Desde 1.2% M.V.", note: "Mejora con antigüedad" },
    { label: "Monto máximo", value: "$80.000.000", note: "Según capacidad de pago" },
    { label: "Plazo máximo", value: "48 meses", note: "Para montos altos" },
    { label: "Codeudor", value: "Sin codeudor hasta $30M", note: "Evaluado según perfil" },
    { label: "Desembolso", value: "24 horas hábiles", note: "Tras aprobación" },
    { label: "Seguro de vida", value: "Incluido", note: "Sin costo adicional" },
  ],
  recreacion: [
    { label: "Tasa de interés", value: "Desde 1.3% M.V.", note: "Tasa fija durante el plazo" },
    { label: "Monto máximo", value: "$30.000.000", note: "Según capacidad de pago" },
    { label: "Plazo máximo", value: "36 meses", note: "Plazo flexible" },
    { label: "Destino", value: "Tiquetes, hospedaje, tours", note: "Sin restricción de destino" },
    { label: "Desembolso", value: "24 horas hábiles", note: "En cuenta o agencia" },
    { label: "Seguro de viaje", value: "Disponible", note: "Con aseguradoras aliadas" },
  ],
  fidelizacion: [
    { label: "Tasa inicial", value: "1.35% M.V.", note: "Nuevo asociado" },
    { label: "Tasa 3–5 años", value: "1.20% M.V.", note: "Baja automáticamente" },
    { label: "Tasa +5 años", value: "1.10% M.V.", note: "La mejor del portafolio" },
    { label: "Monto máximo", value: "$80.000.000", note: "Crece con la antigüedad" },
    { label: "Plazo máximo", value: "60 meses", note: "Para asociados senior" },
    { label: "Beneficios extra", value: "Sin trámites adicionales", note: "Renovación automática" },
  ],
  vehiculo: [
    { label: "Tasa de interés", value: "Desde 1.1% M.V.", note: "La más baja del portafolio" },
    { label: "Financiación", value: "Hasta el 80%", note: "Del valor comercial" },
    { label: "Plazo máximo", value: "72 meses", note: "Vehículos nuevos" },
    { label: "Tipos cubiertos", value: "Auto, moto, bici eléctrica", note: "Nuevo o usado" },
    { label: "Monto máximo", value: "$120.000.000", note: "Vehículos nuevos" },
    { label: "Trámite RUNT", value: "Asesoría incluida", note: "Te acompañamos en el proceso" },
  ],
  "libre-inversion": [
    { label: "Tasa de interés", value: "Desde 1.4% M.V.", note: "Sin justificar destino" },
    { label: "Monto máximo", value: "$50.000.000", note: "Según capacidad de pago" },
    { label: "Plazo máximo", value: "48 meses", note: "Plazo flexible" },
    { label: "Destino", value: "Libre uso", note: "Sin restricciones" },
    { label: "Desembolso", value: "24 horas hábiles", note: "Tras aprobación" },
    { label: "Codeudor", value: "Sin codeudor hasta $20M", note: "Evaluado según perfil" },
  ],
  credisalud: [
    { label: "Tasa de interés", value: "Desde 1.2% M.V.", note: "Igual que educación" },
    { label: "Monto máximo", value: "$40.000.000", note: "Según procedimiento" },
    { label: "Plazo máximo", value: "36 meses", note: "Para procedimientos electivos" },
    { label: "Cobertura", value: "Médico, dental, óptico, estético", note: "Clínicas aliadas" },
    { label: "Desembolso", value: "Express 12 horas", note: "Urgencias priorizadas" },
    { label: "Red aliada", value: "+150 clínicas", note: "En 9 ciudades" },
  ],
  vivienda: [
    { label: "Tasa de interés", value: "Desde 0.9% M.V.", note: "La más baja del mercado coop." },
    { label: "Monto máximo", value: "$200.000.000", note: "Compra o construcción" },
    { label: "Plazo máximo", value: "120 meses", note: "10 años" },
    { label: "Modalidades", value: "Compra, construcción, mejora", note: "Vivienda nueva o usada" },
    { label: "Codeudor", value: "Requerido para montos altos", note: "Cónyuge o familiar" },
    { label: "Avalúo", value: "Asesoría incluida", note: "Con peritos aliados" },
  ],
  crediseguros: [
    { label: "Tasa de interés", value: "0% hasta 12 cuotas", note: "Sin costo financiero" },
    { label: "Plazo máximo", value: "24 meses", note: "Con tasa preferencial" },
    { label: "Tipos de seguro", value: "Vida, hogar, vehículo, salud", note: "Pólizas aliadas" },
    { label: "Aseguradoras", value: "Sura, Bolívar, Mapfre", note: "Entre otras aliadas" },
    { label: "Gestión", value: "100% en línea", note: "App y sucursal virtual" },
    { label: "Vigencia", value: "Pago cuota = seguro activo", note: "Sin interrupciones" },
  ],
  "cupo-rotativo": [
    { label: "Cupo mínimo", value: "$2.000.000", note: "Preaprobado" },
    { label: "Cupo máximo", value: "$20.000.000", note: "Según perfil crediticio" },
    { label: "Disponibilidad", value: "24/7", note: "App y sucursal virtual" },
    { label: "Renovación", value: "Automática al pagar", note: "Sin trámites adicionales" },
    { label: "Tasa de interés", value: "1.5% M.V.", note: "Solo sobre saldo usado" },
    { label: "Cuota mínima", value: "10% del saldo utilizado", note: "O $50.000" },
  ],
  "compra-cartera": [
    { label: "Ahorro en tasa", value: "Siempre menor al origen", note: "Garantizado" },
    { label: "Entidades origen", value: "Todos los bancos", note: "Cooperativas incluidas" },
    { label: "Plazo máximo", value: "60 meses", note: "Para reestructuración" },
    { label: "Una sola cuota", value: "Unifica todas las deudas", note: "Simplifica tu vida" },
    { label: "Monto máximo", value: "$80.000.000", note: "Suma de deudas a unificar" },
    { label: "Estudio", value: "Sin costo", note: "Incluido en el proceso" },
  ],
};

/* Configuración del simulador por producto de ahorro */
const AHORRO_SIMULATOR_CONFIG: Record<string, {
  plazos: { label: string; dias: number; tasa: number }[];
  montoMin: number;
  montoMax: number;
  montoDefault: number;
  tipo: "termino_fijo" | "libre" | "nomina" | "meta";
}> = {
  "ahorro-vista": {
    tipo: "libre",
    montoMin: 50000,
    montoMax: 50000000,
    montoDefault: 5000000,
    plazos: [
      { label: "1 mes", dias: 30, tasa: 0.042 },
      { label: "3 meses", dias: 90, tasa: 0.042 },
      { label: "6 meses", dias: 180, tasa: 0.042 },
      { label: "12 meses", dias: 365, tasa: 0.042 },
    ],
  },
  cdat: {
    tipo: "termino_fijo",
    montoMin: 1000000,
    montoMax: 500000000,
    montoDefault: 10000000,
    plazos: [
      { label: "90 días", dias: 90, tasa: 0.085 },
      { label: "180 días", dias: 180, tasa: 0.102 },
      { label: "270 días", dias: 270, tasa: 0.109 },
      { label: "360 días", dias: 360, tasa: 0.115 },
    ],
  },
  coovinomina: {
    tipo: "nomina",
    montoMin: 50000,
    montoMax: 5000000,
    montoDefault: 200000,
    plazos: [
      { label: "6 meses", dias: 180, tasa: 0.038 },
      { label: "12 meses", dias: 365, tasa: 0.040 },
      { label: "24 meses", dias: 730, tasa: 0.042 },
      { label: "36 meses", dias: 1095, tasa: 0.045 },
    ],
  },
  "ahorro-proposito": {
    tipo: "meta",
    montoMin: 100000,
    montoMax: 20000000,
    montoDefault: 500000,
    plazos: [
      { label: "6 meses", dias: 180, tasa: 0.044 },
      { label: "12 meses", dias: 365, tasa: 0.050 },
      { label: "24 meses", dias: 730, tasa: 0.056 },
      { label: "36 meses", dias: 1095, tasa: 0.062 },
    ],
  },
};

/* ─── Header ────────────────────────────────────────────────── */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm" style={{ background: "linear-gradient(135deg, #12187a 0%, #1e25a8 100%)" }}>
              <span style={{ color: "#f5a200" }}>CV</span>
            </div>
            <div>
              <p className="font-black text-lg leading-none" style={{ color: "#12187a" }}>COOVITEL</p>
              <p className="text-[9px] leading-none" style={{ color: "#6b7280" }}>Cooperativa Empresarial de Ahorro y Crédito</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="px-3 py-2 text-sm rounded-md transition-colors hover:text-amber-500"
                style={{ color: link === "Productos" ? "#12187a" : "#374151", fontWeight: link === "Productos" ? "600" : "500" }}
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-semibold rounded-full border-2 transition-colors hover:bg-navy/5" style={{ borderColor: "#12187a", color: "#12187a" }}>
              Oficina Virtual
            </button>
            <button className="px-4 py-2 text-sm font-bold rounded-full transition-colors hover:opacity-90" style={{ background: "#f5a200", color: "#0d1260" }}>
              Asóciate
            </button>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "#12187a" }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t px-4 py-4 flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" className="py-2 text-sm font-medium" style={{ color: "#374151" }}>{link}</a>
          ))}
          <div className="flex gap-2 pt-2">
            <button className="flex-1 py-2 text-sm font-semibold rounded-full border-2" style={{ borderColor: "#12187a", color: "#12187a" }}>Oficina Virtual</button>
            <button className="flex-1 py-2 text-sm font-bold rounded-full" style={{ background: "#f5a200", color: "#0d1260" }}>Asóciate</button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─── Page Hero ─────────────────────────────────────────────── */
function PageHero({ activeTab }: { activeTab: "credito" | "ahorro" }) {
  return (
    <section className="relative overflow-hidden py-14 lg:py-20" style={{ background: "linear-gradient(135deg, #0d1260 0%, #12187a 50%, #1a22a0 100%)" }}>
      <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-10" style={{ background: "#f5a200" }} />
      <div className="absolute -bottom-16 -left-8 w-48 h-48 rounded-full opacity-10" style={{ background: "#f5a200" }} />
      <div className="absolute top-10 right-1/4 w-2 h-2 rounded-full opacity-40" style={{ background: "#f5a200" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm mb-6 opacity-70">
          <a href="#" className="text-white hover:text-amber-300 transition-colors">Inicio</a>
          <svg className="w-4 h-4 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-white font-medium">Productos</span>
          <svg className="w-4 h-4 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span style={{ color: "#f5a200" }} className="font-medium">
            {activeTab === "credito" ? "Crédito Propósito" : "Ahorro Propósito"}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: "rgba(245,162,0,0.18)", color: "#f5c842", border: "1px solid rgba(245,162,0,0.3)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#f5a200" }} />
              PRODUCTOS CON PROPÓSITO
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Apoyando tus{" "}
              <span style={{ color: "#f5a200" }}>sueños y proyectos</span>
            </h1>
            <p className="mt-4 text-white opacity-70 text-sm max-w-lg">
              Cada producto está diseñado para acompañar una etapa de tu vida, con condiciones preferenciales exclusivas para asociados de COOVITEL.
            </p>
          </div>

          {/* Quick benefit pills */}
          <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
            {["✓ Sin cobros ocultos", "✓ Aprobación en 24 horas", "✓ 100% digital", "✓ Atención personalizada"].map((b) => (
              <span key={b} className="px-3 py-1.5 rounded-full text-xs font-semibold text-white" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Product Card ──────────────────────────────────────────── */
function ProductCard({ product, selected, onSelect }: { product: Product; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="text-left rounded-2xl p-5 transition-all duration-200 w-full group"
      style={{
        background: selected ? product.bg : "#ffffff",
        border: `2px solid ${selected ? product.color : "#e5e7f0"}`,
        boxShadow: selected ? `0 4px 20px ${product.color}22` : "0 1px 4px rgba(0,0,0,0.06)",
        transform: selected ? "translateY(-2px)" : "none",
      }}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background: product.bg }}>
        {product.icon}
      </div>

      <h3 className="font-bold text-sm mb-1 group-hover:opacity-80 transition-opacity" style={{ color: "#12187a" }}>
        {product.title}
      </h3>
      <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>{product.desc}</p>

      <div className="flex items-center gap-1 mt-3">
        <span className="text-xs font-semibold" style={{ color: product.color }}>{product.tagline}</span>
        <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" style={{ color: product.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}

/* ─── Product Detail Panel ──────────────────────────────────── */
function ProductDetail({ product }: { product: Product }) {
  const [showConditions, setShowConditions] = useState(false);
  const [plazo, setPlazo] = useState("24");
  const [monto, setMonto] = useState(10000000);

  const tasaNum = parseFloat((product.features.find(f => f.includes("Tasa")) || "1.3% M.V.").replace(/[^0-9.]/g, "")) / 100;
  const plazoNum = parseInt(plazo);
  const cuota = monto * (tasaNum * Math.pow(1 + tasaNum, plazoNum)) / (Math.pow(1 + tasaNum, plazoNum) - 1);

  const conditions = CREDITO_CONDITIONS[product.id] || [];
  const maxPlazo = parseInt((product.features.find(f => f.includes("meses")) || "48 meses").replace(/\D/g, "")) || 48;
  const plazos = [12, 24, 36, maxPlazo].filter((v, i, a) => a.indexOf(v) === i && v <= maxPlazo).slice(0, 4);

  return (
    <div className="rounded-2xl overflow-hidden mb-8" style={{ border: `2px solid ${product.color}33`, background: "white" }}>
      {/* Header strip */}
      <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4" style={{ background: product.bg }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: "white", boxShadow: `0 4px 12px ${product.color}33` }}>
          {product.icon}
        </div>
        <div className="flex-1">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: product.color }}>{product.tagline}</span>
          <h2 className="text-xl font-black" style={{ color: "#12187a" }}>Crédito {product.title}</h2>
        </div>
        <button className="self-start sm:self-center px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 flex-shrink-0" style={{ background: product.color, color: "white" }}>
          Solicitar ahora →
        </button>
      </div>

      {/* Body */}
      <div className="p-6 grid lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-sm mb-2" style={{ color: "#12187a" }}>¿Para qué sirve?</h3>
          <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>{product.detail}</p>
          <div className="mt-5 p-4 rounded-xl" style={{ background: "#f8f9ff", border: "1px solid #e5e7f0" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#9ca3af" }}>Condiciones destacadas</p>
            <ul className="space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white" style={{ background: product.color }}>✓</span>
                  <span style={{ color: "#374151" }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Simulador */}
        <div className="rounded-xl p-5" style={{ background: "#f8f9ff", border: "1px solid #e5e7f0" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "#9ca3af" }}>Simulador rápido</p>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-semibold" style={{ color: "#374151" }}>Monto a solicitar</label>
                <span className="text-xs font-black" style={{ color: "#12187a" }}>${monto.toLocaleString("es-CO")}</span>
              </div>
              <input type="range" min={1000000} max={80000000} step={500000} value={monto}
                onChange={(e) => setMonto(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: product.color }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "#9ca3af" }}>
                <span>$1M</span><span>$80M</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold mb-2 block" style={{ color: "#374151" }}>Plazo</label>
              <div className="grid grid-cols-4 gap-1.5">
                {plazos.map((m) => (
                  <button key={m} onClick={() => setPlazo(String(m))}
                    className="py-2 rounded-lg text-xs font-bold transition-all"
                    style={plazo === String(m)
                      ? { background: product.color, color: "white" }
                      : { background: "white", color: "#6b7280", border: "1px solid #e5e7f0" }
                    }
                  >{m}m</button>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border" style={{ borderColor: "#e5e7f0" }}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs" style={{ color: "#6b7280" }}>Cuota estimada</span>
                <span className="text-xs" style={{ color: "#9ca3af" }}>{plazo} meses</span>
              </div>
              <p className="text-2xl font-black" style={{ color: "#12187a" }}>
                ${Math.round(cuota).toLocaleString("es-CO")}
                <span className="text-sm font-normal" style={{ color: "#6b7280" }}>/mes</span>
              </p>
              <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>*Simulación referencial. Sujeta a estudio de crédito.</p>
            </div>
            <button
              onClick={() => setShowConditions(!showConditions)}
              className="w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
              style={{ background: "#12187a", color: "white" }}
            >
              {showConditions ? "Ocultar condiciones" : "Ver condiciones completas"}
              <svg className="w-4 h-4 transition-transform" style={{ transform: showConditions ? "rotate(180deg)" : "rotate(0deg)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Condiciones expandibles */}
      {showConditions && conditions.length > 0 && (
        <div className="px-6 pb-6 border-t" style={{ borderColor: `${product.color}22` }}>
          <div className="pt-5">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: product.color }}>
              Condiciones completas — Crédito {product.title}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              {conditions.map((c) => (
                <div key={c.label} className="rounded-xl p-4" style={{ background: product.bg, border: `1px solid ${product.color}22` }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#9ca3af" }}>{c.label}</p>
                  <p className="font-black text-sm" style={{ color: "#12187a" }}>{c.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>{c.note}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: "#fef9e7", border: "1px solid #fde68a" }}>
              <span className="text-lg flex-shrink-0">💡</span>
              <p className="text-xs leading-relaxed" style={{ color: "#92400e" }}>
                Las condiciones mostradas son referenciales. La tasa final y el monto aprobado dependen del estudio de crédito individual. Consulta con un asesor para obtener las condiciones exactas según tu perfil.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Ahorro Product Card ───────────────────────────────────── */
function AhorroCard({ product, selected, onSelect }: { product: typeof AHORRO_PRODUCTS[number]; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="text-left rounded-2xl p-5 transition-all duration-200 w-full group"
      style={{
        background: selected ? product.bg : "#ffffff",
        border: `2px solid ${selected ? product.color : "#e5e7f0"}`,
        boxShadow: selected ? `0 4px 20px ${product.color}22` : "0 1px 4px rgba(0,0,0,0.06)",
        transform: selected ? "translateY(-2px)" : "none",
      }}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background: product.bg }}>
        {product.icon}
      </div>
      <h3 className="font-bold text-sm mb-1" style={{ color: "#12187a" }}>{product.title}</h3>
      <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>{product.desc}</p>
      <div className="flex items-center gap-1 mt-3">
        <span className="text-xs font-semibold" style={{ color: product.color }}>{product.tagline}</span>
        <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" style={{ color: product.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}

/* ─── Ahorro Detail Panel ───────────────────────────────────── */
function AhorroDetail({ product }: { product: AhorroProduct }) {
  const [showSimulator, setShowSimulator] = useState(false);
  const cfg = AHORRO_SIMULATOR_CONFIG[product.id];
  const [monto, setMonto] = useState(cfg?.montoDefault ?? 1000000);
  const [plazoIdx, setPlazoIdx] = useState(0);

  const selectedPlazo = cfg?.plazos[plazoIdx];
  const rendimiento = selectedPlazo
    ? monto * (Math.pow(1 + selectedPlazo.tasa, selectedPlazo.dias / 365) - 1)
    : 0;
  const total = monto + rendimiento;

  /* Tabla de proyección rápida (siempre visible) */
  const proyeccion = cfg?.plazos.map((p) => ({
    label: p.label,
    tasa: `${(p.tasa * 100).toFixed(1)}% E.A.`,
    rendimiento: `$${Math.round(monto * (Math.pow(1 + p.tasa, p.dias / 365) - 1)).toLocaleString("es-CO")}`,
    total: `$${Math.round(monto * Math.pow(1 + p.tasa, p.dias / 365)).toLocaleString("es-CO")}`,
  })) ?? [];

  const montoLabel = cfg?.tipo === "nomina" ? "Ahorro mensual" : "Monto a invertir";

  return (
    <div className="rounded-2xl overflow-hidden mb-8" style={{ border: `2px solid ${product.color}33`, background: "white" }}>
      <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4" style={{ background: product.bg }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: "white", boxShadow: `0 4px 12px ${product.color}33` }}>
          {product.icon}
        </div>
        <div className="flex-1">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: product.color }}>{product.tagline}</span>
          <h2 className="text-xl font-black" style={{ color: "#12187a" }}>{product.title}</h2>
        </div>
        <button className="self-start sm:self-center px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 flex-shrink-0" style={{ background: product.color, color: "white" }}>
          Abrir cuenta →
        </button>
      </div>

      <div className="p-6 grid lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-sm mb-2" style={{ color: "#12187a" }}>¿Qué es?</h3>
          <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>{product.detail}</p>
          <div className="mt-5 p-4 rounded-xl" style={{ background: "#f8f9ff", border: "1px solid #e5e7f0" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#9ca3af" }}>Características</p>
            <ul className="space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white" style={{ background: product.color }}>✓</span>
                  <span style={{ color: "#374151" }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Proyección de rentabilidad */}
        <div className="rounded-xl p-5" style={{ background: "#f8f9ff", border: "1px solid #e5e7f0" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#9ca3af" }}>
            Proyección de rentabilidad
          </p>
          <div className="space-y-2 mb-3">
            {proyeccion.map((row) => (
              <div key={row.label} className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5 border" style={{ borderColor: "#e5e7f0" }}>
                <span className="text-xs font-semibold" style={{ color: "#374151" }}>{row.label}</span>
                <span className="text-xs font-bold" style={{ color: product.color }}>{row.tasa}</span>
                <span className="text-xs font-black" style={{ color: "#12187a" }}>{row.total}</span>
              </div>
            ))}
          </div>
          <p className="text-xs mb-4" style={{ color: "#9ca3af" }}>
            *Sobre ${monto.toLocaleString("es-CO")} {cfg?.tipo === "nomina" ? "mensuales" : "invertidos"}. Tasas referenciales.
          </p>
          <button
            onClick={() => setShowSimulator(!showSimulator)}
            className="w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
            style={{ background: "#12187a", color: "white" }}
          >
            {showSimulator ? "Ocultar simulador" : "Simular mi inversión"}
            <svg className="w-4 h-4 transition-transform" style={{ transform: showSimulator ? "rotate(180deg)" : "rotate(0deg)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Simulador expandible */}
      {showSimulator && cfg && (
        <div className="px-6 pb-6 border-t" style={{ borderColor: `${product.color}22` }}>
          <div className="pt-5">
            <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: product.color }}>
              Simulador — {product.title}
            </p>
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Controles */}
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-semibold" style={{ color: "#374151" }}>{montoLabel}</label>
                    <span className="text-sm font-black" style={{ color: "#12187a" }}>${monto.toLocaleString("es-CO")}</span>
                  </div>
                  <input type="range" min={cfg.montoMin} max={cfg.montoMax} step={cfg.montoMin} value={monto}
                    onChange={(e) => setMonto(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: product.color }}
                  />
                  <div className="flex justify-between text-xs mt-1" style={{ color: "#9ca3af" }}>
                    <span>${cfg.montoMin.toLocaleString("es-CO")}</span>
                    <span>${cfg.montoMax.toLocaleString("es-CO")}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: "#374151" }}>Plazo</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {cfg.plazos.map((p, i) => (
                      <button key={p.label} onClick={() => setPlazoIdx(i)}
                        className="py-2.5 rounded-xl text-xs font-bold transition-all"
                        style={plazoIdx === i
                          ? { background: product.color, color: "white", boxShadow: `0 4px 10px ${product.color}44` }
                          : { background: "#f8f9ff", color: "#6b7280", border: "1px solid #e5e7f0" }
                        }
                      >{p.label}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resultado */}
              <div className="rounded-2xl p-5" style={{ background: product.bg, border: `1px solid ${product.color}33` }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: product.color }}>Tu proyección</p>
                <div className="text-center mb-5">
                  <p className="text-xs" style={{ color: "#6b7280" }}>Total al final del período</p>
                  <p className="text-4xl font-black mt-1" style={{ color: "#12187a" }}>
                    ${Math.round(total).toLocaleString("es-CO")}
                  </p>
                  <p className="text-xs mt-1 font-semibold" style={{ color: product.color }}>
                    +${Math.round(rendimiento).toLocaleString("es-CO")} en rendimientos
                  </p>
                </div>
                <div className="space-y-2 mb-4">
                  {[
                    { label: cfg.tipo === "nomina" ? "Ahorro mensual" : "Capital invertido", val: `$${monto.toLocaleString("es-CO")}` },
                    { label: "Plazo seleccionado", val: selectedPlazo?.label ?? "" },
                    { label: "Tasa E.A.", val: selectedPlazo ? `${(selectedPlazo.tasa * 100).toFixed(1)}%` : "" },
                    { label: "Rendimientos", val: `$${Math.round(rendimiento).toLocaleString("es-CO")}` },
                  ].map((r) => (
                    <div key={r.label} className="flex justify-between py-1.5 border-b" style={{ borderColor: `${product.color}22` }}>
                      <span className="text-xs" style={{ color: "#6b7280" }}>{r.label}</span>
                      <span className="text-xs font-bold" style={{ color: "#12187a" }}>{r.val}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-center mb-3" style={{ color: "#9ca3af" }}>*Simulación referencial. Tasas sujetas a cambio.</p>
                <button className="w-full py-2.5 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity" style={{ background: product.color, color: "white" }}>
                  Abrir mi {product.title} ahora →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "#0b0e3d" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm" style={{ background: "#f5a200", color: "#0b0e3d" }}>CV</div>
              <span className="text-white font-black text-lg">COOVITEL</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "#8892b0" }}>
              Cooperativa Empresarial de Ahorro y Crédito. 64 años construyendo bienestar financiero con solidaridad y transparencia en Colombia.
            </p>
            <div className="flex gap-2">
              {["FB", "IG", "YT", "TW"].map((s) => (
                <button key={s} className="w-9 h-9 rounded-lg text-xs font-bold" style={{ background: "rgba(255,255,255,0.08)", color: "#8892b0" }}>{s}</button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Productos</h4>
            <ul className="space-y-2.5">
              {FOOTER_PRODUCTS.map((item) => (
                <li key={item}><a href="#" className="text-sm hover:text-white transition-colors" style={{ color: "#8892b0" }}>{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Institucional</h4>
            <ul className="space-y-2.5">
              {FOOTER_INSTITUCIONAL.map((item) => (
                <li key={item}><a href="#" className="text-sm hover:text-white transition-colors" style={{ color: "#8892b0" }}>{item}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mb-6" style={{ borderColor: "rgba(255,255,255,0.08)" }} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "#4a5568" }}>
            © 2026 COOVITEL — Cooperativa Empresarial de Ahorro y Crédito · Vigilada por Supersolidaria
          </p>
          <div className="flex gap-4">
            {["Confecoop", "Ascoop", "Fogacoop", "Supersolidaria"].map((org) => (
              <a key={org} href="#" className="text-xs hover:text-white transition-colors" style={{ color: "#4a5568" }}>{org}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── App ────────────────────────────────────────────────────── */
export default function Productos() {
  const [activeTab, setActiveTab] = useState<"credito" | "ahorro">("credito");
  const [selectedCredito, setSelectedCredito] = useState<string | null>(null);
  const [selectedAhorro, setSelectedAhorro] = useState<string | null>(null);

  const selectedCreditoProduct = CREDITO_PRODUCTS.find((p) => p.id === selectedCredito);
  const selectedAhorroProduct = AHORRO_PRODUCTS.find((p) => p.id === selectedAhorro);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Accent bar */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #f5a200 0%, #12187a 100%)" }} />

      <Header />
      <PageHero activeTab={activeTab} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">

        {/* Main tab switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-2xl p-1.5" style={{ background: "#edf0fb" }}>
            <button
              onClick={() => setActiveTab("credito")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all"
              style={activeTab === "credito"
                ? { background: "#12187a", color: "white", boxShadow: "0 4px 12px rgba(18,24,122,0.3)" }
                : { background: "transparent", color: "#6b7280" }
              }
            >
              🎯 Crédito Propósito
            </button>
            <button
              onClick={() => setActiveTab("ahorro")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all"
              style={activeTab === "ahorro"
                ? { background: "#12187a", color: "white", boxShadow: "0 4px 12px rgba(18,24,122,0.3)" }
                : { background: "transparent", color: "#6b7280" }
              }
            >
              💰 Ahorro Propósito
            </button>
          </div>
        </div>

        {/* CRÉDITO TAB */}
        {activeTab === "credito" && (
          <>
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#f5a200" }}>APOYANDO SUEÑOS Y PROYECTOS</p>
              <h2 className="text-2xl lg:text-3xl font-black" style={{ color: "#12187a" }}>Créditos para cada etapa de tu vida</h2>
              <p className="text-sm mt-2 max-w-lg mx-auto" style={{ color: "#6b7280" }}>
                Selecciona el producto que mejor se adapta a tu necesidad y conoce todas sus condiciones.
              </p>
            </div>

            {/* Detail panel (shown when a card is selected) */}
            {selectedCreditoProduct && (
              <ProductDetail product={selectedCreditoProduct} />
            )}

            {/* Cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {CREDITO_PRODUCTS.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  selected={selectedCredito === product.id}
                  onSelect={() => setSelectedCredito(selectedCredito === product.id ? null : product.id)}
                />
              ))}
            </div>

            {selectedCredito === null && (
              <p className="text-center text-xs mt-6" style={{ color: "#9ca3af" }}>
                Haz clic en cualquier producto para ver sus condiciones y simular tu cuota
              </p>
            )}
          </>
        )}

        {/* AHORRO TAB */}
        {activeTab === "ahorro" && (
          <>
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#f5a200" }}>TU DINERO TRABAJA PARA TI</p>
              <h2 className="text-2xl lg:text-3xl font-black" style={{ color: "#12187a" }}>Productos de ahorro e inversión</h2>
              <p className="text-sm mt-2 max-w-lg mx-auto" style={{ color: "#6b7280" }}>
                Ahorra con propósito y obtén la mejor rentabilidad del mercado cooperativo colombiano.
              </p>
            </div>

            {selectedAhorroProduct && (
              <AhorroDetail product={selectedAhorroProduct} />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {AHORRO_PRODUCTS.map((product) => (
                <AhorroCard
                  key={product.id}
                  product={product}
                  selected={selectedAhorro === product.id}
                  onSelect={() => setSelectedAhorro(selectedAhorro === product.id ? null : product.id)}
                />
              ))}
            </div>

            {selectedAhorro === null && (
              <p className="text-center text-xs mt-6" style={{ color: "#9ca3af" }}>
                Haz clic en un producto para ver tasas y simular tu rentabilidad
              </p>
            )}

            {/* Comparador */}
            <div className="mt-12 rounded-2xl p-6 lg:p-8" style={{ background: "#f8f9ff", border: "1px solid #e5e7f0" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-black text-lg" style={{ color: "#12187a" }}>Comparador de tasas</h3>
                  <p className="text-sm" style={{ color: "#6b7280" }}>COOVITEL vs. el mercado bancario colombiano</p>
                </div>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: "#f0f2fb", color: "#12187a" }}>Actualizado agosto 2026</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: "2px solid #e5e7f0" }}>
                      <th className="text-left pb-3 font-bold" style={{ color: "#374151" }}>Producto</th>
                      <th className="text-center pb-3 font-bold" style={{ color: "#12187a" }}>COOVITEL</th>
                      <th className="text-center pb-3 font-bold" style={{ color: "#6b7280" }}>Promedio bancario</th>
                      <th className="text-center pb-3 font-bold" style={{ color: "#10b981" }}>Tu ganancia extra</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Ahorro a la Vista", coovitel: "4.2% E.A.", banco: "2.1% E.A.", extra: "+2.1 pp" },
                      { name: "CDAT 90 días", coovitel: "8.5% E.A.", banco: "5.8% E.A.", extra: "+2.7 pp" },
                      { name: "CDAT 180 días", coovitel: "10.2% E.A.", banco: "7.1% E.A.", extra: "+3.1 pp" },
                      { name: "CDAT 360 días", coovitel: "11.5% E.A.", banco: "8.4% E.A.", extra: "+3.1 pp" },
                    ].map((row, i) => (
                      <tr key={row.name} style={{ borderBottom: "1px solid #f0f1f8", background: i % 2 === 0 ? "white" : "transparent" }}>
                        <td className="py-3 px-2 font-medium" style={{ color: "#374151" }}>{row.name}</td>
                        <td className="py-3 px-2 text-center font-black" style={{ color: "#12187a" }}>{row.coovitel}</td>
                        <td className="py-3 px-2 text-center" style={{ color: "#9ca3af" }}>{row.banco}</td>
                        <td className="py-3 px-2 text-center">
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#e6faf4", color: "#10b981" }}>{row.extra}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1260 0%, #12187a 60%, #1a22a0 100%)" }}>
          <div className="p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-black text-xl lg:text-2xl">¿Necesitas asesoría personalizada?</p>
              <p className="text-white opacity-70 text-sm mt-1">Nuestros asesores financieros te ayudan a elegir el producto ideal para ti.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button className="px-5 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity" style={{ background: "#f5a200", color: "#0d1260" }}>
                Hablar con un asesor
              </button>
              <button className="px-5 py-3 rounded-xl text-sm font-semibold border text-white hover:bg-white/10 transition-colors" style={{ borderColor: "rgba(255,255,255,0.3)" }}>
                Oficina Virtual →
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
