import { useEffect, useState } from "react";
import { getCoovitelYears } from "../lib/brand";
import redVitalLogo from "../assets/redvital/redvital-total-logo.png";
import appDescuentos from "../assets/redvital/app-descuentos.jpeg";
import appCategorias from "../assets/redvital/app-categorias.jpeg";
import appConvenios from "../assets/redvital/app-convenios.jpeg";
import appPlan from "../assets/redvital/app-plan.jpeg";
import BOGOTA_IMAGES from "../lib/media";

const COOVITEL_YEARS = getCoovitelYears();

function GooglePlayIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.2 2.1v19.8L14.1 12 3.2 2.1Z" fill="#12B9E8" />
      <path d="M3.2 2.1 14.1 12l4.15-3.7L5.45 1.12a1.62 1.62 0 0 0-2.25.98Z" fill="#00E676" />
      <path d="m14.1 12 4.15-3.7 2.56 1.45c1.58.9 1.58 3.2 0 4.1l-2.56 1.45L14.1 12Z" fill="#FFD21E" />
      <path d="M3.2 21.9 14.1 12l4.15 3.7-12.8 7.18a1.62 1.62 0 0 1-2.25-.98Z" fill="#FF3D57" />
    </svg>
  );
}

type Tab = "sociales" | "financieros" | "redvital" | "exequial" | "educacion";

const TABS: { id: Tab; label: string; shortLabel: string; group: string }[] = [
  { id: "redvital", label: "RedVital", shortLabel: "RedVital", group: "Asistencias" },
  { id: "sociales", label: "Beneficios", shortLabel: "Beneficios", group: "Beneficios" },
  { id: "exequial", label: "Auxilios Cooperativos", shortLabel: "Auxilios", group: "Auxilios" },
];

const REDVITAL_ASSISTANCES = [
  { title: "Asistencia Médica", icon: "⚕️", services: [
    { name: "Orientación médica telefónica.", detail: "Un profesional brinda recomendaciones generales sobre síntomas o situaciones de salud; no reemplaza una consulta médica, diagnóstico ni tratamiento." },
    { name: "Médico a domicilio por accidente o enfermedad.", detail: "Tras orientación médica previa y autorización, se coordina una visita para situaciones que pueden ser atendidas en casa y no requieren traslado hospitalario." },
    { name: "Traslado médico por accidente o enfermedad.", detail: "Se coordina el traslado terrestre de emergencia al centro médico más cercano, sujeto a valoración telefónica e infraestructura disponible." },
    { name: "Consulta de optometría.", detail: "Atención primaria de salud visual en consultorios autorizados; no incluye lentes, monturas ni tratamientos ópticos." },
    { name: "Acompañamiento y traslado a citas médicas.", detail: "Para citas o terapias programadas, ofrece acompañamiento o vehículo dentro de la ciudad. La solicitud debe hacerse con anticipación." },
  ] },
  { title: "Asistencia Vehicular", icon: "🚗", services: [
    { name: "Servicio de grúa.", detail: "Remolque para vehículo liviano o moto del asociado hasta el destino indicado dentro de la misma ciudad, según cobertura." },
    { name: "Servicio técnico en carro taller.", detail: "Cuando una batería descargada o una llanta pinchada inmovilizan el vehículo, se coordina un técnico al lugar." },
    { name: "Paso de corriente.", detail: "Un técnico apoya el encendido cuando la batería requiere energía. No incluye cambio ni compra de batería." },
    { name: "Cambio de llanta.", detail: "Se coordina un técnico para instalar la llanta de repuesto que debe aportar el asociado; no incluye reparación de la llanta afectada." },
    { name: "Conductor elegido.", detail: "Con solicitud previa, un conductor traslada el vehículo y sus ocupantes al domicilio cuando el asociado no puede conducir por ingesta de alcohol." },
  ] },
  { title: "Asistencia para el Hogar", icon: "⌂", services: [
    { name: "Servicio de handyman.", detail: "Apoyo en reparaciones y tareas sencillas como instalar cortinas, cuadros, accesorios, espejos o televisores en la residencia habitual." },
    { name: "Cerrajería.", detail: "Atención de urgencia cuando no es posible entrar o salir de la vivienda por pérdida de llaves, robo o daño de la cerradura." },
    { name: "Electricidad.", detail: "Se envía un técnico ante fallas súbitas en la instalación eléctrica que causen falta total o parcial de energía; los materiales los asume el asociado." },
    { name: "Plomería.", detail: "Atención de urgencias en tuberías visibles de agua limpia o sanitaria para controlar el daño y restablecer el funcionamiento básico." },
  ] },
  { title: "Asistencia para Mascotas", icon: "🐾", services: [
    { name: "Orientación veterinaria telefónica.", detail: "Un profesional orienta sobre molestias, lesiones o enfermedades de perros y gatos, con acciones provisionales o preventivas." },
    { name: "Refuerzo de vacunación para perro o gato.", detail: "Se coordina el refuerzo anual para una mascota mayor de seis meses, a domicilio o en clínica aliada, previa revisión del carné." },
    { name: "Veterinario a domicilio por accidente o enfermedad.", detail: "Para accidentes o enfermedades graves que comprometan la vida de perros o gatos, se coordina un veterinario de la red de proveedores." },
  ] },
  { title: "Asistencia Emocional y Legal", icon: "💬", services: [
    { name: "Orientación psicológica telefónica.", detail: "Un psicólogo brinda apoyo y orientación telefónica en temas como familia, pareja, ansiedad, bullying o trastornos alimenticios; no prescribe medicamentos." },
    { name: "Orientación legal telefónica.", detail: "Orientación en distintas ramas del derecho. Es un servicio de consulta telefónica y no representa acompañamiento legal presencial o procesal." },
  ] },
];

const REDVITAL_APP_SCREENS = [
  { src: appPlan, alt: "Pantalla Mi Plan de la App RedVital", label: "Mi plan" },
  { src: appDescuentos, alt: "Pantalla de descuentos de la App RedVital", label: "Descuentos" },
  { src: appCategorias, alt: "Pantalla de categorías de la App RedVital", label: "Categorías" },
  { src: appConvenios, alt: "Pantalla de convenios de la App RedVital", label: "Convenios" },
];

const SOCIAL_BENEFITS = [
  {
    icon: "🎬", title: "Cine y confitería", description: "Boletería y confitería de cine con precios especiales en Cine Colombia y Royal Films.",
  },
  {
    icon: "🎁", title: "Obsequio de fidelización", description: "Premiamos tu lealtad y antigüedad con tu cooperativa mediante un detalle de fidelización.",
  },
  {
    icon: "🎉", title: "Eventos", description: "Accede a celebraciones y eventos culturales masivos a lo largo del año, como la Terapia de la Felicidad.",
  },
  {
    icon: "📈", title: "Beneficios financieros", description: "Desde la afiliación: créditos sociales con tasas preferenciales para vivienda, educación, vehículo, compra de cartera y Crediseguro.",
  },
  {
    icon: "🤝", title: "Convenios para tu familia", description: "Convenios en salud —medicina complementaria y prepagada con Colsanitas y Medisanitas—, educación, planes exequiales, viajes, restaurantes y comercios.",
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
    highlight: "Disponible en línea",
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

const EXEQUIAL_FEATURES = [
  { label: "Por fallecimiento del asociado", value: "$1.5 millones" },
  { label: "Por fallecimiento de padre", value: "$1 millón" },
  { label: "Por fallecimiento de madre", value: "$1 millón" },
  { label: "Por fallecimiento de cónyuge", value: "$1 millón" },
  { label: "Hijos menores de 18 años", value: "$1 millón" },
  { label: "Hijos de 18 a 20 años con discapacidad", value: "$1 millón" },
  { label: "Auxilios solidarios", value: "Sujetos a comité" },
];

function HeroBanner({ activeTab: _activeTab }: { activeTab: Tab }) {
  return (
    <div className="relative bg-[#173C6E] overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            `url('${BOGOTA_IMAGES.bienestarHero}&w=1400&h=400')`,
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
          <span className="text-white/90 text-xs font-semibold uppercase tracking-widest">Bienestar COOVITEL</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
          Bienestar
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
          <span className="text-[#173C6E] text-xs font-bold uppercase tracking-widest">Beneficios COOVITEL</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#173C6E] mt-2 mb-4 leading-tight">
              Bienestar para ti<br />y tu familia
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Disfruta experiencias, convenios y condiciones preferenciales para ti y tu grupo familiar.
            </p>
            <div className="flex gap-3 flex-wrap">
              <div className="bg-[#173C6E]/5 rounded-xl px-4 py-2 text-center">
                <div className="font-bold text-[#173C6E] text-xl">17.000+</div>
                <div className="text-xs text-gray-500">Asociados beneficiados</div>
              </div>
              <div className="bg-[#EBC302]/10 rounded-xl px-4 py-2 text-center">
                <div className="font-bold text-[#173C6E] text-xl">{COOVITEL_YEARS}+</div>
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
              src={`${BOGOTA_IMAGES.bienestarImagenBeneficios}&w=600&h=420`}
              alt="Personas de la comunidad en Bogotá, Colombia"
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
              <p className="mt-4 border-t border-[#C9DCFF] pt-3 text-xs font-semibold text-[#1B65A6]">Sujeto a términos y condiciones.</p>
            </div>
          ))}
          <div className="group bg-[#173C6E] rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl mb-4">ℹ️</div>
            <h3 className="font-bold text-white text-base mb-2">Términos y condiciones</h3>
            <p className="text-white/75 text-sm leading-relaxed">Consulta las condiciones de acceso, vigencias y disponibilidad de cada beneficio antes de solicitarlo.</p>
          </div>
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
  const [activeScreen, setActiveScreen] = useState(0);
  const [selectedAssistance, setSelectedAssistance] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const screen = REDVITAL_APP_SCREENS[activeScreen];
  const activeAssistance = REDVITAL_ASSISTANCES.find((item) => item.title === selectedAssistance);
  const activeService = activeAssistance?.services.find((item) => item.name === selectedService);

  useEffect(() => {
    const slider = window.setInterval(() => setActiveScreen((current) => (current + 1) % REDVITAL_APP_SCREENS.length), 3800);
    return () => window.clearInterval(slider);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <section className="mb-14">
        <div className="max-w-3xl mb-8">
          <span className="text-[#173C6E] text-xs font-bold uppercase tracking-widest">Asistencias RedVital</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#173C6E]">Acompañamiento para cada momento</h2>
          <p className="mt-3 text-gray-600 leading-relaxed">Conoce las asistencias disponibles para ti. Cada servicio está sujeto a cobertura, condiciones y límites establecidos.</p>
        </div>
        <div className="grid lg:grid-cols-[270px_minmax(0,1fr)] gap-6 items-start">
          <aside className="overflow-hidden rounded-2xl border border-[#C9DCFF] bg-white shadow-sm">
            <div className="bg-[#131739] px-5 py-4 text-xs font-black uppercase tracking-widest text-white">Asistencias</div>
            <nav className="p-2" aria-label="Categorías de asistencias">
              {REDVITAL_ASSISTANCES.map((assistance) => {
                const isSelected = selectedAssistance === assistance.title;
                return <div key={assistance.title} className={`rounded-xl ${isSelected ? "bg-[#CFE0FF]" : ""}`}><button type="button" onClick={() => { if (isSelected) { setSelectedAssistance(null); setSelectedService(null); return; } setSelectedAssistance(assistance.title); setSelectedService(assistance.services[0].name); }} className={`w-full rounded-xl px-4 py-3 text-left transition-colors ${isSelected ? "text-[#173C6E]" : "text-[#1A2842] hover:bg-[#F7F0FF]"}`} aria-expanded={isSelected}><span className="flex items-center justify-between gap-3 font-bold text-sm"><span>{assistance.icon} {assistance.title}</span><span aria-hidden="true">{isSelected ? "⌃" : "⌄"}</span></span></button>{isSelected && <div className="mb-2 ml-5 border-l-2 border-[#81A1DB] pl-3 pr-2">{assistance.services.map((service) => <button key={service.name} type="button" onClick={() => setSelectedService(service.name)} className={`block w-full rounded-lg px-2 py-2 text-left text-xs transition-all ${selectedService === service.name ? "bg-white font-bold text-[#173C6E] shadow-sm" : "text-[#1A2842] hover:bg-white/70 hover:translate-x-1"}`}>{service.name}</button>)}</div>}</div>;
              })}
            </nav>
          </aside>
          {activeAssistance && activeService ? <section key={activeService.name} className="rounded-2xl border border-[#C9DCFF] bg-[#F7F0FF] p-6 md:p-8 animate-[content-reveal_.35s_ease-out]">
            <div className="mb-6 flex items-center gap-4"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#173C6E] text-2xl">{activeAssistance.icon}</span><div><p className="text-xs font-bold uppercase tracking-widest text-[#1B65A6]">{activeAssistance.title}</p><h3 className="text-2xl font-bold text-[#173C6E]">{activeService.name}</h3></div></div>
            <article className="rounded-xl border border-[#C9DCFF] bg-white p-5"><p className="text-base leading-relaxed text-[#1A2842]">{activeService.detail}</p></article>
            <p className="mt-6 border-t border-[#C9DCFF] pt-4 text-xs font-semibold text-[#1B65A6]">Aplican términos y condiciones.</p>
          </section> : <section className="relative overflow-hidden rounded-2xl border border-[#C9DCFF] bg-gradient-to-br from-[#131739] to-[#173C6E] p-8 md:p-12 text-white animate-[content-reveal_.35s_ease-out]"><div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#EBC302]/20" /><div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-[#5FA8FF]/20" /><div className="relative max-w-xl"><span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#EBC302] text-2xl">✨</span><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#EBC302]">Tu bienestar, a un clic</p><h3 className="mt-2 text-3xl font-bold leading-tight">Elige una asistencia para conocer cómo te acompaña</h3><p className="mt-4 leading-relaxed text-[#F7F0FF]">Explora las opciones del menú y descubre el respaldo disponible para tu salud, hogar, vehículo, mascotas y bienestar emocional.</p><div className="mt-7 flex flex-wrap gap-2">{["Salud", "Hogar", "Vehículo", "Mascotas", "Bienestar"].map((item) => <span key={item} className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold transition-transform hover:-translate-y-1">{item}</span>)}</div></div></section>}
        </div>
      </section>

      {/* App highlight banner */}
      <div className="bg-gradient-to-br from-[#131739] to-[#173C6E] rounded-3xl p-8 md:p-12 mb-14 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-[#EBC302]/10 rounded-full translate-y-1/2" />
        <div className="relative grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="inline-flex rounded-xl bg-white p-2 shadow-lg">
                <img src={redVitalLogo} alt="RedVital Total" className="h-11 w-auto" />
              </div>
              <div className="inline-flex items-center gap-2 bg-[#EBC302]/20 border border-[#EBC302]/40 rounded-full px-3 py-1">
                <div className="w-2 h-2 rounded-full bg-[#EBC302] animate-pulse" />
                <span className="text-[#F7F0FF] text-xs font-bold uppercase tracking-widest">App oficial</span>
              </div>
            </div>
            <h3 className="text-white font-bold text-2xl md:text-3xl mb-4 leading-tight">
              Descarga la App<br />
              <span className="text-[#EBC302]">Red Vital</span> y gestiona<br />
              todo desde tu celular
            </h3>
            <p className="text-[#F7F0FF] text-sm leading-relaxed mb-6">
              Pensando en tu bienestar, COOVITEL pone a tu disposición un programa de asistencias que te brinda respaldo en salud, hogar, vehículo y mascotas, con atención oportuna y acceso fácil a través de la aplicación Red Vital.
            </p>

            <div className="space-y-2 mb-8">
              {[
                "Un solo punto de acceso para todas tus asistencias.",
                "Atención especializada según el servicio requerido.",
                "Consulta las condiciones, coberturas y eventos de cada asistencia.",
                "Reporta requerimientos de forma rápida y sencilla.",
                "Lleva tus asistencias siempre a la mano desde tu dispositivo móvil.",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-[#F7F0FF] text-sm">
                  <svg className="w-4 h-4 text-[#EBC302] shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
                className="group flex items-center gap-3 bg-[#131739] hover:bg-[#173C6E] border border-[#C9DCFF] rounded-xl px-4 py-3 transition-all hover:scale-105"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#F7F0FF]"><GooglePlayIcon className="h-6 w-6" /></span>
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

          {/* App screens */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <div className="w-56 sm:w-64 rounded-[2.7rem] border-[9px] border-[#C9DCFF]/40 bg-[#131739] p-2 shadow-2xl">
                <div className="overflow-hidden rounded-[2rem] bg-white">
                  <div className="flex h-7 items-center justify-center bg-[#173C6E]"><span className="h-1.5 w-16 rounded-full bg-white/40" /></div>
                  <img key={screen.src} src={screen.src} alt={screen.alt} className="redvital-screen h-[23rem] w-full object-cover object-top" />
                </div>
              </div>
              <div className="absolute -bottom-3 -right-5 rounded-xl bg-[#EBC302] px-3 py-2 text-center text-white shadow-lg"><div className="font-bold text-sm">RedVital</div><div className="text-[10px] opacity-90">App oficial</div></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function AuxiliosCooperativos() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-12">
          <span className="text-[#173C6E] text-xs font-bold uppercase tracking-widest">Auxilios Cooperativos</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#173C6E] mt-2 mb-4">
          Respaldo solidario<br />en momentos difíciles
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
          Conoce los auxilios económicos disponibles para el asociado y su familia, sujetos a las condiciones vigentes de la cooperativa.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-[#173C6E] px-6 py-4">
            <h3 className="text-white font-bold text-lg">Auxilios disponibles</h3>
            <p className="text-white/60 text-sm">Apoyos económicos para nuestros asociados</p>
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
          <div className="bg-[#F7F0FF] rounded-2xl p-6 border border-[#173C6E]/10">
            <h4 className="font-bold text-[#173C6E] text-base mb-3">Información importante</h4>
            <p className="text-sm leading-relaxed text-gray-600">Los auxilios se otorgan de acuerdo con el reglamento vigente, los soportes requeridos y la validación de cada caso.</p>
            <p className="mt-4 border-t border-[#C9DCFF] pt-4 text-xs font-semibold text-[#1B65A6]">Sujeto a términos y condiciones.</p>
          </div>
          <div className="bg-[#EBC302]/12 border border-[#EBC302]/30 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📞</span>
              <div>
                <h4 className="font-bold text-[#173C6E] text-sm mb-1">Canal de orientación</h4>
                <p className="text-gray-600 text-sm">En el momento que lo necesites, nuestro equipo está disponible para orientarte y activar el servicio.</p>
                <a href="tel:018000967474" className="mt-2 inline-block text-[#173C6E] font-bold text-base">01 8000 967474</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Bienestar() {
  const [activeTab, setActiveTab] = useState<Tab>("redvital");

  return (
    <div className="min-h-full bg-white flex flex-col">
      
      <HeroBanner activeTab={activeTab} />
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 bg-white">
        {activeTab === "sociales" && <><BeneficiosSociales /><div className="hidden"><BeneficiosFinancieros /></div></>}
        {activeTab === "redvital" && <RedVital />}
        {activeTab === "exequial" && <AuxiliosCooperativos />}
      </main>

      
    </div>
  );
}
