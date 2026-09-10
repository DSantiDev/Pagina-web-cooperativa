import { useEffect, useState } from "react";
import { SIMULADORES_AHORRO, SIMULADORES_CREDITO } from "../lib/simuladores";

/* ─── Data ─────────────────────────────────────────────────── */
const CREDITO_PRODUCTS = [
  {
    id: "educacion",
    icon: "🎓",
    title: "Educación",
    tagline: "Haz realidad tu sueño de estudiar",
    desc: "Atiende necesidades de educación formal y no formal.",
    detail: "Esta línea de crédito atiende tus necesidades de educación formal y no formal, para ti y tu grupo familiar.",
    features: ["Educación formal", "Educación no formal", "Para ti y tu grupo familiar", "Simula tus cuotas"],
    color: "#27548F",
    bg: "#CFE0FF",
  },
  {
    id: "recreacion",
    icon: "✈️",
    title: "Recreación",
    tagline: "Haz realidad el viaje de tus sueños",
    desc: "Planea y disfruta vacaciones en familia con tarifas preferenciales.",
    detail: "La línea de crédito de recreación te permite planear y disfrutar las vacaciones que siempre has querido hacer en familia, con tarifas preferenciales.",
    features: ["Vacaciones en familia", "Tarifas preferenciales", "Planea tu viaje", "Simula tus cuotas"],
    color: "#1B65A6",
    bg: "#CFE0FF",
  },
  {
    id: "fidelizacion",
    icon: "⭐",
    title: "Fidelización",
    tagline: "Tu fidelidad cuenta",
    desc: "Montos y tasas preferenciales según tu antigüedad como asociado.",
    detail: "Línea de crédito que te permite adquirir montos y tasas preferenciales de acuerdo con tu antigüedad como asociado.",
    features: ["Según antigüedad", "Tasas preferenciales", "Montos preferenciales", "Simula tus cuotas"],
    color: "#EBC302",
    bg: "#F7F0FF",
  },
  {
    id: "vehiculo",
    icon: "🚗",
    title: "Vehículo",
    tagline: "Tu movilidad, tu decisión",
    desc: "Nuevo, usado o bicicleta eléctrica a tu medida.",
    detail: "Adquiere el vehículo que necesitas: automóvil nuevo o usado, moto, bicicleta eléctrica o patineta. Financiamos hasta el 80% del valor comercial.",
    features: ["Hasta 72 meses plazo", "Tasa desde 1.1% M.V.", "Financia hasta 80%", "Incluye bici eléctrica"],
    color: "#1B65A6",
    bg: "#CFE0FF",
  },
  {
    id: "libre-inversion",
    icon: "💼",
    title: "Libre Inversión",
    tagline: "Sin restricciones",
    desc: "Financia cualquier proyecto sin restricciones.",
    detail: "El crédito más flexible de COOVITEL. Usa el dinero para lo que necesites: remodelación, negocio, emergencias o cualquier gasto personal sin justificar el destino.",
    features: ["Hasta 48 meses plazo", "Tasa desde 1.4% M.V.", "Monto hasta $50M", "Sin destino específico"],
    color: "#800080",
    bg: "#F7F0FF",
  },
  {
    id: "credisalud",
    icon: "🏥",
    title: "CrediSalud",
    tagline: "Tu salud es importante para nosotros",
    desc: "Procedimientos médicos, quirúrgicos, medicina prepagada y salud estética.",
    detail: "Te permite atender procedimientos médicos, quirúrgicos, medicina prepagada y, en general, todo lo relacionado con la salud estética.",
    features: ["Procedimientos médicos", "Procedimientos quirúrgicos", "Medicina prepagada", "Simula tus cuotas"],
    color: "#A90072",
    bg: "#F7F0FF",
  },
  {
    id: "vivienda",
    icon: "🏠",
    title: "Vivienda",
    tagline: "Haz realidad tu sueño de tener casa propia",
    desc: "Adquiere o remodela vivienda nueva o usada.",
    detail: "Línea de crédito que facilita adquirir o remodelar tu vivienda nueva o usada, de manera fácil y a una excelente tasa.",
    features: ["Vivienda nueva", "Vivienda usada", "Adquisición", "Remodelación"],
    color: "#EBC302",
    bg: "#F7F0FF",
  },
  {
    id: "crediseguros",
    icon: "🛡️",
    title: "Crediseguros",
    tagline: "Protege lo que amas",
    desc: "Pólizas para proteger a tu familia y bienes.",
    detail: "Financia la prima de seguros de vida, hogar, vehículo o salud en cómodas cuotas mensuales. Accede a pólizas de nuestras aseguradoras aliadas con tarifas preferenciales.",
    features: ["Sin intereses hasta 12 cuotas", "Seguros vida, hogar y auto", "Aseguradoras aliadas", "Gestión en línea"],
    color: "#1B65A6",
    bg: "#CFE0FF",
  },
  {
    id: "cupo-rotativo",
    icon: "🔄",
    title: "Cupo Rotativo",
    tagline: "Renovamos el crédito a tu medida",
    desc: "Cupo de crédito personal con pago mensual renovable.",
    detail: "Cupo de crédito personal con pago mensual, donde tu cupo se va renovando a medida que vas abonando a tu obligación.",
    features: ["Pago mensual", "Cupo renovable", "Abonos a la obligación", "Crédito personal"],
    color: "#1B65A6",
    bg: "#CFE0FF",
  },
  {
    id: "compra-cartera",
    icon: "💳",
    title: "Compra de Cartera",
    tagline: "¿Qué esperas para unificar tus deudas?",
    desc: "Consolida obligaciones a una tasa competitiva y amplios plazos.",
    detail: "Línea de crédito que te permite consolidar todas tus obligaciones a una tasa competitiva y amplios plazos.",
    features: ["Consolidación de obligaciones", "Tasa competitiva", "Amplios plazos", "Simula tus cuotas"],
    color: "#1B65A6",
    bg: "#CFE0FF",
  },
];

const AHORRO_PRODUCTS = [
  {
    id: "coovirenta",
    icon: "💰",
    title: "Coovirenta",
    tagline: "Ahorro que acompaña tus metas",
    desc: "Una alternativa de ahorro pensada para tu bienestar financiero.",
    detail: "Coovirenta es una alternativa de ahorro COOVITEL. Consulta las condiciones y requisitos vigentes con atención al cliente.",
    features: ["Tarjeta débito Visa", "Red Servibanca", "Seguro de depósitos FOGACOOP", "Consulta por Sucursal Virtual"],
    color: "#1B65A6",
    bg: "#CFE0FF",
  },
  {
    id: "cdat",
    icon: "📈",
    title: "CDAT",
    tagline: "Ahorro a término",
    desc: "Consulta las condiciones vigentes para tu Certificado de Depósito a Término.",
    detail: "El CDAT es una alternativa de ahorro a término de COOVITEL. Consulta con un asesor las condiciones, tasas y plazos vigentes antes de constituirlo.",
    features: ["Ahorro a término", "Condiciones vigentes", "Consulta con un asesor", "COOVITEL"],
    color: "#EBC302",
    bg: "#F7F0FF",
  },
  {
    id: "coovikids",
    icon: "🏦",
    title: "Coovikids",
    tagline: "Construye el futuro de los más pequeños",
    desc: "Un ahorro pensado para acompañar sus metas y proyectos.",
    detail: "Coovikids ayuda a crear hábitos de ahorro para los niños. Consulta con atención al cliente las condiciones vigentes.",
    features: ["Apertura desde $1.000", "Plazo desde 6 meses", "Seguro de depósitos FOGACOOP", "Pago por nómina u oficina"],
    color: "#27548F",
    bg: "#CFE0FF",
  },
  {
    id: "coovicasa",
    icon: "🎯",
    title: "Coovicasa",
    tagline: "Ahorra para tu hogar",
    desc: "Una opción de ahorro enfocada en tus proyectos de vivienda.",
    detail: "Coovicasa te acompaña a planear tus metas de vivienda. Consulta condiciones y requisitos vigentes con atención al cliente.",
    features: ["Ahorro para vivienda", "Consulta condiciones vigentes", "Atención COOVITEL", "Sucursal Virtual"],
    color: "#A90072",
    bg: "#F7F0FF",
  },
  {
    id: "coovieducacion",
    icon: "🎓",
    title: "Coovieducación",
    tagline: "Ahorra para aprender y crecer",
    desc: "Una alternativa de ahorro para tus metas educativas.",
    detail: "Coovieducación está diseñado para ayudarte a planear objetivos de formación. Consulta las condiciones vigentes con atención al cliente.",
    features: ["Metas educativas", "Consulta condiciones vigentes", "Atención COOVITEL", "Sucursal Virtual"],
    color: "#27548F",
    bg: "#CFE0FF",
  },
];

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
    { label: "Disponibilidad", value: "En línea", note: "App y sucursal virtual" },
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

/* ─── Header ────────────────────────────────────────────────── */
function PageHero() {
  return (
    <section className="relative overflow-hidden py-14 lg:py-20" style={{ background: "linear-gradient(135deg, #131739 0%, #173C6E 50%, #27548F 100%)" }}>
      <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-10" style={{ background: "#EBC302" }} />
      <div className="absolute -bottom-16 -left-8 w-48 h-48 rounded-full opacity-10" style={{ background: "#EBC302" }} />
      <div className="absolute top-10 right-1/4 w-2 h-2 rounded-full opacity-40" style={{ background: "#EBC302" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: "rgba(245,162,0,0.18)", color: "#EBC302", border: "1px solid rgba(245,162,0,0.3)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#EBC302" }} />
              PRODUCTOS CON PROPÓSITO
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Apoyando tus{" "}
              <span style={{ color: "#EBC302" }}>sueños y proyectos</span>
            </h1>
            <p className="mt-4 text-white opacity-70 text-sm max-w-lg">
              Cada producto está diseñado para acompañar una etapa de tu vida, con condiciones preferenciales exclusivas para asociados de COOVITEL.
            </p>
          </div>

          {/* Quick benefit pills */}
          <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
            {["✓ Portafolio financiero para cada etapa", "✓ Tasas de interés competitivas", "✓ Respaldo cooperativo", "✓ Atención al cliente"].map((b) => (
              <span key={b} className="px-3 py-1.5 rounded-full text-xs font-semibold text-white" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                {b}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-white/75" aria-label="Certificaciones institucionales">
          <span className="font-bold text-[#EBC302]">Entidad confiable</span>
          <span className="rounded-full border border-white/25 px-3 py-1">ISO 9001:2015 · Bureau Veritas</span>
          <span className="rounded-full border border-white/25 px-3 py-1">A+ · Value &amp; Risk</span>
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
        background: selected ? product.bg : "#F7F0FF",
        border: `2px solid ${selected ? product.color : "#C9DCFF"}`,
        boxShadow: selected ? `0 4px 20px ${product.color}22` : "0 1px 4px rgba(0,0,0,0.06)",
        transform: selected ? "translateY(-2px)" : "none",
      }}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background: product.bg }}>
        {product.icon}
      </div>

      <h3 className="font-bold text-sm mb-1 group-hover:opacity-80 transition-opacity" style={{ color: "#173C6E" }}>
        {product.title}
      </h3>
      <p className="text-xs leading-relaxed" style={{ color: "#1A2842" }}>{product.desc}</p>

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
function ProductDetail({ product, showConditionsInitially = false, onClose }: { product: Product; showConditionsInitially?: boolean; onClose: () => void }) {
  const [showConditions, setShowConditions] = useState(showConditionsInitially);
  const cfg = SIMULADORES_CREDITO[product.id];
  const [plazoIdx, setPlazoIdx] = useState(0);
  const [monto, setMonto] = useState(cfg.montoDefault);
  const plazoSeleccionado = cfg.plazos[plazoIdx];
  const { meses: plazoNum, tasaMensual } = plazoSeleccionado;
  const cuota = tasaMensual === 0
    ? monto / plazoNum
    : monto * (tasaMensual * Math.pow(1 + tasaMensual, plazoNum)) / (Math.pow(1 + tasaMensual, plazoNum) - 1);
  const pasoMonto = Math.max(1_000, Math.round(cfg.montoMin / 10_000) * 10_000);

  const conditions = CREDITO_CONDITIONS[product.id] || [];
  return (
    <div className="rounded-2xl overflow-hidden mb-8" style={{ border: `2px solid ${product.color}33`, background: "white" }}>
      {/* Header strip */}
      <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4" style={{ background: product.bg }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: "white", boxShadow: `0 4px 12px ${product.color}33` }}>
          {product.icon}
        </div>
        <div className="flex-1">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: product.color }}>{product.tagline}</span>
          <h2 className="text-xl font-black" style={{ color: "#173C6E" }}>Crédito {product.title}</h2>
        </div>
        <div className="flex gap-2 self-start sm:self-center"><a href="/contacto" className="px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 flex-shrink-0" style={{ background: product.color, color: "white" }}>Atención al cliente →</a><button onClick={onClose} className="w-10 h-10 rounded-xl bg-white font-bold" aria-label="Volver a productos" style={{ color: "#173C6E" }}>←</button></div>
      </div>

      {/* Body */}
      <div className="p-6 grid lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-sm mb-2" style={{ color: "#173C6E" }}>¿Para qué sirve?</h3>
          <p className="text-sm leading-relaxed" style={{ color: "#1A2842" }}>{product.detail}</p>
          <div className="mt-5 p-4 rounded-xl" style={{ background: "#F7F0FF", border: "1px solid #C9DCFF" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#81A1DB" }}>Condiciones destacadas</p>
            <ul className="space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white" style={{ background: product.color }}>✓</span>
                  <span style={{ color: "#1A2842" }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Simulador */}
        <div className="rounded-xl p-5" style={{ background: "#F7F0FF", border: "1px solid #C9DCFF" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "#81A1DB" }}>Simulador rápido</p>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-semibold" style={{ color: "#1A2842" }}>Monto a solicitar</label>
                <span className="text-xs font-black" style={{ color: "#173C6E" }}>${monto.toLocaleString("es-CO")}</span>
              </div>
              <input type="range" min={cfg.montoMin} max={cfg.montoMax} step={pasoMonto} value={monto}
                onChange={(e) => setMonto(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: product.color }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "#81A1DB" }}>
                <span>${cfg.montoMin.toLocaleString("es-CO")}</span><span>${cfg.montoMax.toLocaleString("es-CO")}</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold mb-2 block" style={{ color: "#1A2842" }}>Plazo</label>
              <div className="grid grid-cols-4 gap-1.5">
                {cfg.plazos.map((plazo, index) => (
                  <button key={plazo.meses} onClick={() => setPlazoIdx(index)}
                    className="py-2 rounded-lg text-xs font-bold transition-all"
                    style={plazoIdx === index
                      ? { background: product.color, color: "white" }
                      : { background: "white", color: "#1A2842", border: "1px solid #C9DCFF" }
                    }
                  >{plazo.meses}m</button>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border" style={{ borderColor: "#C9DCFF" }}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs" style={{ color: "#1A2842" }}>Cuota estimada</span>
                <span className="text-xs" style={{ color: "#81A1DB" }}>{plazoNum} meses</span>
              </div>
              <p className="text-2xl font-black" style={{ color: "#173C6E" }}>
                ${Math.round(cuota).toLocaleString("es-CO")}
                <span className="text-sm font-normal" style={{ color: "#1A2842" }}>/mes</span>
              </p>
              <p className="text-xs mt-1" style={{ color: "#81A1DB" }}>*Simulación referencial. Sujeta a estudio de crédito.</p>
              <p className="text-xs mt-1 font-semibold" style={{ color: product.color }}>Tasa simulada: {(tasaMensual * 100).toFixed(2)}% M.V.</p>
            </div>
            <button
              onClick={() => setShowConditions(!showConditions)}
              className="w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
              style={{ background: "#173C6E", color: "white" }}
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
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#81A1DB" }}>{c.label}</p>
                  <p className="font-black text-sm" style={{ color: "#173C6E" }}>{c.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#1A2842" }}>{c.note}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: "#F7F0FF", border: "1px solid #EBC302" }}>
              <span className="text-lg flex-shrink-0">💡</span>
              <p className="text-xs leading-relaxed" style={{ color: "#140E0C" }}>
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
        background: selected ? product.bg : "#F7F0FF",
        border: `2px solid ${selected ? product.color : "#C9DCFF"}`,
        boxShadow: selected ? `0 4px 20px ${product.color}22` : "0 1px 4px rgba(0,0,0,0.06)",
        transform: selected ? "translateY(-2px)" : "none",
      }}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background: product.bg }}>
        {product.icon}
      </div>
      <h3 className="font-bold text-sm mb-1" style={{ color: "#173C6E" }}>{product.title}</h3>
      <p className="text-xs leading-relaxed" style={{ color: "#1A2842" }}>{product.desc}</p>
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
function AhorroDetail({ product, showSimulatorInitially = false, onClose }: { product: AhorroProduct; showSimulatorInitially?: boolean; onClose: () => void }) {
  const [showSimulator, setShowSimulator] = useState(showSimulatorInitially);
  const cfg = SIMULADORES_AHORRO[product.id];
  const [monto, setMonto] = useState(cfg?.montoDefault ?? 1000000);
  const [plazoIdx, setPlazoIdx] = useState(0);

  const selectedPlazo = cfg?.plazos[plazoIdx];
  const calcularProyeccion = (plazoSeleccionado: NonNullable<typeof selectedPlazo>) => {
    if (cfg?.tipo === "nomina") {
      const meses = Math.max(1, Math.round(plazoSeleccionado.dias / 30));
      const tasaMensual = Math.pow(1 + plazoSeleccionado.tasa, 1 / 12) - 1;
      const capital = monto * meses;
      const totalProyectado = tasaMensual === 0
        ? capital
        : monto * ((Math.pow(1 + tasaMensual, meses) - 1) / tasaMensual);

      return { capital, rendimiento: totalProyectado - capital, total: totalProyectado };
    }

    const totalProyectado = monto * Math.pow(1 + plazoSeleccionado.tasa, plazoSeleccionado.dias / 365);
    return { capital: monto, rendimiento: totalProyectado - monto, total: totalProyectado };
  };
  const resultadoSeleccionado = selectedPlazo ? calcularProyeccion(selectedPlazo) : { capital: monto, rendimiento: 0, total: monto };
  const { capital, rendimiento, total } = resultadoSeleccionado;

  /* Tabla de proyección rápida (siempre visible) */
  const proyeccion = cfg?.plazos.map((p) => {
    const resultado = calcularProyeccion(p);
    return {
      label: p.label,
      tasa: `${(p.tasa * 100).toFixed(1)}% E.A.`,
      rendimiento: `$${Math.round(resultado.rendimiento).toLocaleString("es-CO")}`,
      total: `$${Math.round(resultado.total).toLocaleString("es-CO")}`,
    };
  }) ?? [];

  const montoLabel = cfg?.tipo === "nomina" ? "Ahorro mensual" : "Monto a invertir";

  return (
    <div className="rounded-2xl overflow-hidden mb-8" style={{ border: `2px solid ${product.color}33`, background: "white" }}>
      <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4" style={{ background: product.bg }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: "white", boxShadow: `0 4px 12px ${product.color}33` }}>
          {product.icon}
        </div>
        <div className="flex-1">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: product.color }}>{product.tagline}</span>
          <h2 className="text-xl font-black" style={{ color: "#173C6E" }}>{product.title}</h2>
        </div>
        <div className="flex gap-2 self-start sm:self-center"><a href="/contacto" className="px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 flex-shrink-0" style={{ background: product.color, color: "white" }}>Atención al cliente →</a><button onClick={onClose} className="w-10 h-10 rounded-xl bg-white font-bold" aria-label="Volver a productos" style={{ color: "#173C6E" }}>←</button></div>
      </div>

      <div className="p-6 grid lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-sm mb-2" style={{ color: "#173C6E" }}>¿Qué es?</h3>
          <p className="text-sm leading-relaxed" style={{ color: "#1A2842" }}>{product.detail}</p>
          <div className="mt-5 p-4 rounded-xl" style={{ background: "#F7F0FF", border: "1px solid #C9DCFF" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#81A1DB" }}>Características</p>
            <ul className="space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white" style={{ background: product.color }}>✓</span>
                  <span style={{ color: "#1A2842" }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Proyección de rentabilidad */}
        <div className="rounded-xl p-5" style={{ background: "#F7F0FF", border: "1px solid #C9DCFF" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#81A1DB" }}>
            Proyección de rentabilidad
          </p>
          <div className="space-y-2 mb-3">
            {proyeccion.map((row) => (
              <div key={row.label} className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5 border" style={{ borderColor: "#C9DCFF" }}>
                <span className="text-xs font-semibold" style={{ color: "#1A2842" }}>{row.label}</span>
                <span className="text-xs font-bold" style={{ color: product.color }}>{row.tasa}</span>
                <span className="text-xs font-black" style={{ color: "#173C6E" }}>{row.total}</span>
              </div>
            ))}
          </div>
          <p className="text-xs mb-4" style={{ color: "#81A1DB" }}>
            *Sobre ${monto.toLocaleString("es-CO")} {cfg?.tipo === "nomina" ? "mensuales" : "invertidos"}. Tasas referenciales.
          </p>
          <button
            onClick={() => setShowSimulator(!showSimulator)}
            className="w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
            style={{ background: "#173C6E", color: "white" }}
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
                    <label className="text-sm font-semibold" style={{ color: "#1A2842" }}>{montoLabel}</label>
                    <span className="text-sm font-black" style={{ color: "#173C6E" }}>${monto.toLocaleString("es-CO")}</span>
                  </div>
                  <input type="range" min={cfg.montoMin} max={cfg.montoMax} step={cfg.montoMin} value={monto}
                    onChange={(e) => setMonto(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: product.color }}
                  />
                  <div className="flex justify-between text-xs mt-1" style={{ color: "#81A1DB" }}>
                    <span>${cfg.montoMin.toLocaleString("es-CO")}</span>
                    <span>${cfg.montoMax.toLocaleString("es-CO")}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block" style={{ color: "#1A2842" }}>Plazo</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {cfg.plazos.map((p, i) => (
                      <button key={p.label} onClick={() => setPlazoIdx(i)}
                        className="py-2.5 rounded-xl text-xs font-bold transition-all"
                        style={plazoIdx === i
                          ? { background: product.color, color: "white", boxShadow: `0 4px 10px ${product.color}44` }
                          : { background: "#F7F0FF", color: "#1A2842", border: "1px solid #C9DCFF" }
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
                  <p className="text-xs" style={{ color: "#1A2842" }}>Total al final del período</p>
                  <p className="text-4xl font-black mt-1" style={{ color: "#173C6E" }}>
                    ${Math.round(total).toLocaleString("es-CO")}
                  </p>
                  <p className="text-xs mt-1 font-semibold" style={{ color: product.color }}>
                    +${Math.round(rendimiento).toLocaleString("es-CO")} en rendimientos
                  </p>
                </div>
                <div className="space-y-2 mb-4">
                  {[
                    { label: cfg.tipo === "nomina" ? "Ahorro acumulado" : "Capital invertido", val: `$${Math.round(capital).toLocaleString("es-CO")}` },
                    { label: "Plazo seleccionado", val: selectedPlazo?.label ?? "" },
                    { label: "Tasa E.A.", val: selectedPlazo ? `${(selectedPlazo.tasa * 100).toFixed(1)}%` : "" },
                    { label: "Rendimientos", val: `$${Math.round(rendimiento).toLocaleString("es-CO")}` },
                  ].map((r) => (
                    <div key={r.label} className="flex justify-between py-1.5 border-b" style={{ borderColor: `${product.color}22` }}>
                      <span className="text-xs" style={{ color: "#1A2842" }}>{r.label}</span>
                      <span className="text-xs font-bold" style={{ color: "#173C6E" }}>{r.val}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-center mb-3" style={{ color: "#81A1DB" }}>*Simulación referencial. Tasas sujetas a cambio.</p>
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
export default function Productos() {
  const requestedProduct = new URLSearchParams(window.location.search).get("producto");
  const initialCredit = CREDITO_PRODUCTS.some((product) => product.id === requestedProduct) ? requestedProduct : null;
  const initialAhorro = AHORRO_PRODUCTS.some((product) => product.id === requestedProduct) ? requestedProduct : null;
  const [activeTab, setActiveTab] = useState<"credito" | "ahorro" | "cdat">(requestedProduct === "cdat" ? "cdat" : initialAhorro ? "ahorro" : "credito");
  const [selectedCredito, setSelectedCredito] = useState<string | null>(initialCredit);
  const [selectedAhorro, setSelectedAhorro] = useState<string | null>(initialAhorro);

  const selectedCreditoProduct = CREDITO_PRODUCTS.find((p) => p.id === selectedCredito);
  const selectedAhorroProduct = AHORRO_PRODUCTS.find((p) => p.id === selectedAhorro);
  const visibleAhorroProducts = activeTab === "cdat" ? AHORRO_PRODUCTS.filter((product) => product.id === "cdat") : AHORRO_PRODUCTS.filter((product) => product.id !== "cdat");
  const selectTab = (tab: "credito" | "ahorro" | "cdat") => {
    setActiveTab(tab);
    setSelectedCredito(null);
    setSelectedAhorro(tab === "cdat" ? "cdat" : null);
    if (tab === "cdat") window.setTimeout(() => document.getElementById("producto-seleccionado")?.scrollIntoView({ behavior: "smooth", block: "start" }), 70);
  };
  const scrollToDetail = () => window.setTimeout(() => document.getElementById("producto-seleccionado")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  const selectCredito = (id: string) => { const next = selectedCredito === id ? null : id; setSelectedCredito(next); if (next) scrollToDetail(); };
  const selectAhorro = (id: string) => { const next = selectedAhorro === id ? null : id; setSelectedAhorro(next); if (next) scrollToDetail(); };

  useEffect(() => {
    if (!requestedProduct) return;
    const timer = window.setTimeout(() => document.getElementById("producto-seleccionado")?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    return () => window.clearTimeout(timer);
  }, [requestedProduct]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Accent bar */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #EBC302 0%, #173C6E 100%)" }} />

      
      <PageHero />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">

        {/* Main tab switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-2xl p-1.5" style={{ background: "#CFE0FF" }}>
            <button
              onClick={() => selectTab("credito")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all"
              style={activeTab === "credito"
                ? { background: "#173C6E", color: "white", boxShadow: "0 4px 12px rgba(18,24,122,0.3)" }
                : { background: "transparent", color: "#1A2842" }
              }
            >
              🎯 Crédito Propósito
            </button>
            <button
              onClick={() => selectTab("ahorro")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all"
              style={activeTab === "ahorro"
                ? { background: "#173C6E", color: "white", boxShadow: "0 4px 12px rgba(18,24,122,0.3)" }
                : { background: "transparent", color: "#1A2842" }
              }
            >
              💰 Ahorro Propósito
            </button>
            <button
              onClick={() => selectTab("cdat")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all"
              style={activeTab === "cdat"
                ? { background: "#173C6E", color: "white", boxShadow: "0 4px 12px rgba(18,24,122,0.3)" }
                : { background: "transparent", color: "#1A2842" }
              }
            >
              📈 CDAT
            </button>
          </div>
        </div>

        {/* CRÉDITO TAB */}
        <div key={activeTab} className="product-tab-panel">
        {activeTab === "credito" && (
          <>
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#EBC302" }}>APOYANDO SUEÑOS Y PROYECTOS</p>
              <h2 className="text-2xl lg:text-3xl font-black" style={{ color: "#173C6E" }}>Créditos para cada etapa de tu vida</h2>
              <p className="text-sm mt-2 max-w-lg mx-auto" style={{ color: "#1A2842" }}>
                Selecciona el producto que mejor se adapta a tu necesidad y conoce todas sus condiciones.
              </p>
            </div>

            {/* Detail panel (shown when a card is selected) */}
            {selectedCreditoProduct && (
              <div id="producto-seleccionado"><ProductDetail key={selectedCreditoProduct.id} product={selectedCreditoProduct} showConditionsInitially={requestedProduct === selectedCreditoProduct.id} onClose={() => setSelectedCredito(null)} /></div>
            )}

            {/* Cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {CREDITO_PRODUCTS.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  selected={selectedCredito === product.id}
                  onSelect={() => selectCredito(product.id)}
                />
              ))}
            </div>

            {selectedCredito === null && (
              <p className="text-center text-xs mt-6" style={{ color: "#81A1DB" }}>
                Haz clic en cualquier producto para ver sus condiciones y simular tu cuota
              </p>
            )}
          </>
        )}

        {/* AHORRO TAB */}
        {(activeTab === "ahorro" || activeTab === "cdat") && (
          <>
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#EBC302" }}>{activeTab === "cdat" ? "AHORRO A TÉRMINO" : "TU DINERO TRABAJA PARA TI"}</p>
              <h2 className="text-2xl lg:text-3xl font-black" style={{ color: "#173C6E" }}>{activeTab === "cdat" ? "Certificado de Depósito a Término" : "Productos de ahorro e inversión"}</h2>
              <p className="text-sm mt-2 max-w-lg mx-auto" style={{ color: "#1A2842" }}>
                Ahorra con propósito y obtén la mejor rentabilidad del mercado cooperativo colombiano.
              </p>
            </div>

            {selectedAhorroProduct && (
              <div id="producto-seleccionado"><AhorroDetail key={selectedAhorroProduct.id} product={selectedAhorroProduct} showSimulatorInitially={requestedProduct === selectedAhorroProduct.id || activeTab === "cdat"} onClose={() => { setSelectedAhorro(null); setActiveTab("ahorro"); }} /></div>
            )}

            {activeTab !== "cdat" && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {visibleAhorroProducts.map((product) => (
                <AhorroCard
                  key={product.id}
                  product={product}
                  selected={selectedAhorro === product.id}
                  onSelect={() => selectAhorro(product.id)}
                />
              ))}
            </div>}

            {selectedAhorro === null && (
              <p className="text-center text-xs mt-6" style={{ color: "#81A1DB" }}>
                Haz clic en un producto para ver tasas y simular tu rentabilidad
              </p>
            )}

          </>
        )}

        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #131739 0%, #173C6E 60%, #27548F 100%)" }}>
          <div className="p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-black text-xl lg:text-2xl">¿Necesitas atención para elegir tu producto ideal?</p>
              <p className="text-white opacity-70 text-sm mt-1">Nuestro equipo de atención al cliente te orienta según tus necesidades financieras.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a href="/contacto" className="px-5 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity" style={{ background: "#EBC302", color: "#131739" }}>
                Atención al cliente
              </a>
              <a href="https://odin.selsacloud.com/linix/v7/8e273b00-cfc0-48eb-bcff-10ba62e64fe5/servicio/identidad/autenticar/gui/autenticacion-gui/ingresousuario" target="_blank" rel="noreferrer" className="px-5 py-3 rounded-xl text-sm font-semibold border text-white hover:bg-white/10 transition-colors" style={{ borderColor: "rgba(255,255,255,0.3)" }}>
                Oficina Virtual →
              </a>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
}
