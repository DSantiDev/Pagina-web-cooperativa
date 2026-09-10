import { useState } from 'react'
import { getCoovitelYears } from '../lib/brand'
import { WhatsAppIcon } from '../components/GlobalWidgets'

/* ─── Brand colours ─────────────────────────────────────── */
const BLUE = '#173C6E'
const NAVY = '#131739'
const YELLOW = '#EBC302'
const COOVITEL_YEARS = getCoovitelYears()

/* ─── Types ──────────────────────────────────────────────── */
type Tab = 'quienes' | 'pasos' | 'faq' | 'formulario'

/* ─── Data ───────────────────────────────────────────────── */
const eligibilityCriteria = [
  { icon: '🏢', title: 'Empleados', desc: 'Personas vinculadas a empresas con código de descuento por nómina o libranza con COOVITEL, con contrato a término indefinido o nombramiento oficial.' },
  { icon: '💼', title: 'Independientes', desc: 'Personas que generan ingresos por una actividad sin dependencia laboral.' },
  { icon: '👴', title: 'Pensionados', desc: 'Pensionados de entidades como Caprecom, ISS, Fomprecom, CAR, FOPEP y otras a nivel nacional.' },
  { icon: '👨‍👩‍👧', title: 'Familiares de asociados', desc: 'Familiares que acrediten el parentesco con los documentos legales correspondientes.' },
  { icon: '📝', title: 'Formulario de ingreso', desc: 'Diligencia el formulario de ingreso y entrega la documentación requerida.' },
  { icon: '💰', title: 'Aportes mensuales', desc: 'Realiza los aportes mensuales conforme a la tabla de aportes vigente.' },
]

const affiliationCosts = [
  { concept: 'Cuota de afiliación', amount: '$40.000', note: 'Pago único indicado en el proceso de afiliación', highlight: false },
  { concept: 'Aportes mensuales', amount: 'Según tabla', note: 'Se realizan conforme a la tabla de aportes vigente', highlight: false },
  { concept: 'Familiares asociados', amount: 'Sin cuota', note: 'No pagan cuota de afiliación', highlight: true },
]

const monthlyContributions = [
  { type: 'Aporte mensual', amount: 'Según tabla de aportes', desc: 'Aplica para empleados, independientes y pensionados.' },
  { type: 'Autorización de descuento', amount: 'Cuando aplica', desc: 'Requerida para afiliados por nómina o libranza.' },
  { type: 'Familiares asociados', amount: 'Exentos de cuota', desc: 'Deben acreditar el parentesco y diligenciar el formato de afiliación.' },
]

const steps = [
  {
    n: '01', title: 'Contáctanos',
    desc: 'Visita la sede más cercana o comunícate con COOVITEL para iniciar tu solicitud de afiliación.',
    icon: '📞',
  },
  {
    n: '02', title: 'Recibe asesoría',
    desc: 'Recibe orientación sobre el tipo de afiliación y los requisitos que aplican a tu caso.',
    icon: '💬',
  },
  {
    n: '03', title: 'Entrega documentos',
    desc: 'Diligencia el formulario de ingreso y adjunta la fotocopia de tu documento de identidad.',
    icon: '📄',
  },
  {
    n: '04', title: 'Autoriza el descuento',
    desc: 'Si eres empleado vinculado por nómina o libranza, firma la autorización de descuento correspondiente.',
    icon: '✍️',
  },
  {
    n: '05', title: 'Realiza tu aporte inicial',
    desc: 'Cancela la cuota de afiliación de $40.000 y realiza tus aportes mensuales según la tabla vigente.',
    icon: '💳',
  },
  {
    n: '06', title: '¡Bienvenido(a)!',
    desc: 'Al completar la documentación, podrás disfrutar las soluciones financieras y sociales de tu cooperativa.',
    icon: '🎉',
  },
]

const documents = [
  'Formulario de ingreso diligenciado',
  'Fotocopia del documento de identidad',
  'Autorización de descuento para afiliados por nómina o libranza',
  'Tabla de aportes aplicable a tu afiliación',
  'Registro civil de nacimiento, matrimonio, declaración extrajuicio u otro documento legal para acreditar parentesco, cuando aplique',
]

const faqs = [
  {
    q: '¿Cuánto tiempo tarda el proceso de afiliación?',
    a: 'El tiempo de trámite depende de la validación de la documentación. Acércate a una sede o comunícate con COOVITEL para conocer el estado de tu solicitud.',
  },
  {
    q: '¿Puedo afiliarme si no trabajo en una empresa aliada a COOVITEL?',
    a: 'Sí. COOVITEL contempla afiliación para independientes, pensionados y familiares de asociados, cumpliendo los requisitos definidos para cada modalidad.',
  },
  {
    q: '¿Qué sucede con mis aportes si decido retirarme?',
    a: 'Tus aportes de capital son reembolsables. Al momento del retiro voluntario, COOVITEL devuelve el total de tus aportes ordinarios más los rendimientos generados, descontando únicamente obligaciones pendientes, según los estatutos vigentes.',
  },
  {
    q: '¿Puedo solicitar crédito inmediatamente después de afiliarme?',
    a: 'Las condiciones de crédito se evalúan de acuerdo con el producto solicitado y las políticas vigentes de COOVITEL. Un asesor puede orientarte sobre tu caso.',
  },
  {
    q: '¿Existe algún costo mensual además del aporte?',
    a: 'Debes realizar aportes mensuales según la tabla de aportes vigente. La cuota de afiliación publicada es de $40.000; los familiares asociados no pagan esa cuota.',
  },
  {
    q: '¿Dónde puedo asociarme presencialmente?',
    a: 'COOVITEL publica atención en Bogotá, Tunja, Barranquilla, Cúcuta, Cali, Bucaramanga, Medellín, Manizales e Ibagué. Consulta dirección y horario antes de visitar la sede.',
  },
  {
    q: '¿Es seguro el dinero que aporto a COOVITEL?',
    a: 'Sí. COOVITEL está vigilada por la Superintendencia de la Economía Solidaria, cuenta con calificación A+ Value & Risk y la certificación ISO 9001:2015 de Bureau Veritas. Tus aportes están protegidos por los estatutos cooperativos y la regulación colombiana.',
  },
]

/* ─── Sub-components ─────────────────────────────────────── */

function PillBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full"
      style={{ border: `1.5px solid ${YELLOW}`, color: YELLOW }}
    >
      <span style={{ color: YELLOW }}>+</span> {children}
    </span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: YELLOW }}>
      {children}
    </p>
  )
}

function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`} style={{ marginBottom: -2 }}>
      <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="w-full h-16 md:h-20" fill="white">
        <path d="M0,35 C240,70 480,0 720,35 C960,70 1200,5 1440,35 L1440,70 L0,70 Z" />
      </svg>
    </div>
  )
}

/* ─── Navbar ──────────────────────────────────────────────── */
function HeroSection({ onJoin }: { onJoin: () => void }) {
  return (
    <section className="relative pt-24 pb-0 overflow-hidden" style={{ background: `linear-gradient(135deg, #131739 0%, ${BLUE} 60%, #27548F 100%)` }}>
      {/* Decorative circles */}
      <div className="absolute top-10 right-8 w-64 h-64 rounded-full opacity-10" style={{ background: YELLOW }} />
      <div className="absolute bottom-12 left-4 w-44 h-44 rounded-full opacity-8" style={{ background: '#27548F' }} />
      <div className="absolute top-20 right-1/3 w-20 h-20 rounded-full opacity-20" style={{ background: '#81A1DB' }} />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 pt-8 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-5">
              <PillBadge>Membresía COOVITEL</PillBadge>
            </div>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-[1.1] mb-5">
              Sé parte de<br />
              algo <span style={{ color: YELLOW }}>grande</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-md">
              Únete a los más de 17.000 asociados que ya disfrutan de bienestar financiero, créditos preferenciales y beneficios exclusivos en todo el país.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="#formulario"
                onClick={(event) => { event.preventDefault(); onJoin(); }}
                className="font-bold px-7 py-3 rounded-full text-sm transition-opacity hover:opacity-90"
                style={{ background: YELLOW, color: NAVY }}
              >
                Afíliate ahora →
              </a>
              <a
                href="#quienes"
                className="font-semibold px-7 py-3 rounded-full text-sm text-white border border-white/30 hover:border-white transition-colors"
              >
                Conoce los requisitos
              </a>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { val: '17.000+', label: 'Asociados activos' },
              { val: `${COOVITEL_YEARS}+`, label: 'Años de trayectoria' },
              { val: '9', label: 'Ciudades con presencia' },
              { val: 'A+', label: 'Calificación Value & Risk' },
            ].map(({ val, label }) => (
              <div key={label} className="rounded-2xl p-5 flex flex-col gap-1" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <span className="text-2xl font-extrabold text-white">{val}</span>
                <span className="text-white/60 text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave */}
      <WaveDivider />
    </section>
  )
}

/* ─── Tab navigation ─────────────────────────────────────── */
function TabNav({ active, setActive }: { active: Tab; setActive: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string; short: string; icon: string }[] = [
    { id: 'quienes', label: '¿Quiénes pueden asociarse?', short: '¿Quiénes?', icon: '👥' },
    { id: 'pasos',   label: 'Paso a paso',                short: 'Paso a paso', icon: '📋' },
    { id: 'faq',     label: 'Preguntas frecuentes',       short: 'Preguntas',   icon: '❓' },
    { id: 'formulario', label: 'Formulario de afiliación', short: 'Formulario', icon: '📝' },
  ]

  return (
    <div className="sticky top-[72px] z-40 shadow-sm" style={{ background: 'white', borderBottom: '1px solid #CFE0FF' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-12">

        {/* ── Mobile: 2×2 grid ── */}
        <div className="grid grid-cols-2 gap-2 py-3 md:hidden">
          {tabs.map(t => {
            const isActive = active === t.id
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl font-semibold text-sm transition-all text-left"
                style={{
                  background: isActive ? BLUE : '#F7F0FF',
                  color: isActive ? 'white' : '#1A2842',
                  border: `1.5px solid ${isActive ? BLUE : '#CFE0FF'}`,
                }}
              >
                <span className="text-xl leading-none flex-shrink-0">{t.icon}</span>
                <span className="text-xs font-bold leading-tight">{t.short}</span>
              </button>
            )
          })}
        </div>

        {/* ── Desktop: single row ── */}
        <div className="hidden md:flex">
          {tabs.map(t => {
            const isActive = active === t.id
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className="flex items-center gap-2 px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2"
                style={{
                  color: isActive ? BLUE : '#1A2842',
                  borderBottomColor: isActive ? BLUE : 'transparent',
                  background: 'transparent',
                }}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            )
          })}
        </div>

      </div>
    </div>
  )
}

/* ─── Section: Quiénes pueden asociarse ─────────────────── */
function QuienesPuedenSection() {
  return (
    <div id="quienes" className="bg-white">
      {/* Eligibility */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-12">
          <SectionLabel>Requisitos de membresía</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3" style={{ color: NAVY }}>
            ¿Quiénes pueden <span style={{ color: BLUE }}>asociarse?</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
            COOVITEL da la bienvenida a personas que compartan el espíritu cooperativo y deseen construir bienestar financiero colectivo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {eligibilityCriteria.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl p-6 group hover:shadow-lg transition-all border"
              style={{ borderColor: '#CFE0FF', background: '#F7F0FF' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background: `${BLUE}15` }}>
                {icon}
              </div>
              <h3 className="font-bold text-sm mb-1.5" style={{ color: NAVY }}>{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Costos de afiliación */}
      <section className="py-16" style={{ background: '#F7F0FF' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel>Inversión inicial</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-4" style={{ color: NAVY }}>
                Costos de <span style={{ color: BLUE }}>afiliación</span>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Afiliarte a COOVITEL es una inversión en tu bienestar financiero. Los valores son accesibles y el capital aportado es <strong>100% reembolsable</strong> si decides retirarte.
              </p>
              <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: `${YELLOW}15`, border: `1.5px solid ${YELLOW}40` }}>
                <span className="text-2xl">💡</span>
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Tu capital nunca se pierde.</strong> Al retirarte de la cooperativa, recibes de vuelta todos tus aportes de capital más los rendimientos generados.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {affiliationCosts.map(({ concept, amount, note, highlight }) => (
                <div
                  key={concept}
                  className="flex items-center justify-between p-5 rounded-2xl"
                  style={{
                    background: highlight ? BLUE : 'white',
                    border: highlight ? 'none' : '1.5px solid #CFE0FF',
                    boxShadow: highlight ? '0 8px 32px rgba(27,20,184,0.25)' : undefined,
                  }}
                >
                  <div>
                    <p className="font-semibold text-sm" style={{ color: highlight ? 'white' : NAVY }}>{concept}</p>
                    <p className="text-xs mt-0.5" style={{ color: highlight ? 'rgba(255,255,255,0.65)' : '#81A1DB' }}>{note}</p>
                  </div>
                  <span className="text-xl font-extrabold" style={{ color: highlight ? YELLOW : BLUE }}>{amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Aportes mensuales */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <SectionLabel>Compromisos recurrentes</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3" style={{ color: NAVY }}>
              Aportes <span style={{ color: BLUE }}>mensuales</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">
              El compromiso mensual es mínimo y flexible. Cuanto más aportes, mayor será tu capital y tu acceso a créditos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {monthlyContributions.map(({ type, amount, desc }, i) => (
              <div
                key={type}
                className="rounded-2xl p-7 relative overflow-hidden"
                style={{
                  background: i === 0 ? BLUE : '#F7F0FF',
                  border: i === 0 ? 'none' : '1.5px solid #CFE0FF',
                }}
              >
                {i === 0 && (
                  <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-15" style={{ background: YELLOW }} />
                )}
                <span
                  className="text-xs font-bold uppercase tracking-widest mb-2 block"
                  style={{ color: i === 0 ? YELLOW : BLUE }}
                >
                  {i === 0 ? '⭐ Obligatorio' : i === 1 ? 'Opcional' : 'Opcional'}
                </span>
                <p className="font-bold text-sm mb-1" style={{ color: i === 0 ? 'white' : NAVY }}>{type}</p>
                <p className="text-2xl font-extrabold mb-3" style={{ color: i === 0 ? YELLOW : BLUE }}>{amount}</p>
                <p className="text-xs leading-relaxed" style={{ color: i === 0 ? 'rgba(255,255,255,0.65)' : '#1A2842' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

/* ─── Section: Paso a paso ───────────────────────────────── */
function PasoAPasoSection() {
  return (
    <div id="pasos" className="bg-white">
      {/* Steps */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-14">
          <SectionLabel>Proceso de afiliación</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3" style={{ color: NAVY }}>
            Paso a paso para <span style={{ color: BLUE }}>asociarte</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">
            En menos de una semana puedes ser parte de COOVITEL. Así de sencillo.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="hidden md:block absolute top-10 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent" style={{ top: '2.25rem' }} />

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {steps.map(({ n, title, desc, icon }, i) => (
              <div key={n} className="relative flex flex-col">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 relative z-10"
                  style={{ background: i === 5 ? YELLOW : `${BLUE}12`, border: `2px solid ${i === 5 ? YELLOW : `${BLUE}25`}` }}
                >
                  {icon}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: BLUE }}>Paso {n}</span>
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: NAVY }}>{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${BLUE} 100%)` }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel>Lista de requisitos</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-4">
                Documentos <span style={{ color: YELLOW }}>necesarios</span>
              </h2>
              <p className="text-white/65 text-sm leading-relaxed mb-8">
                Ten estos documentos listos antes de iniciar el proceso. Puedes entregarlos de forma digital o presencialmente en nuestras oficinas.
              </p>
              <a
                href="#formulario"
                className="inline-flex items-center gap-2 font-bold px-7 py-3 rounded-full text-sm transition-opacity hover:opacity-90"
                style={{ background: YELLOW, color: NAVY }}
              >
                Iniciar proceso →
              </a>
            </div>

            <ul className="space-y-3">
              {documents.map((doc, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ background: YELLOW }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke={NAVY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-white/85 text-sm leading-relaxed">{doc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ─── Section: FAQ ───────────────────────────────────────── */
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div id="faq" className="bg-white">
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-12">
          <SectionLabel>Resolvemos tus dudas</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3" style={{ color: NAVY }}>
            Preguntas <span style={{ color: BLUE }}>frecuentes</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">
            Todo lo que necesitas saber antes de dar el paso. Si tienes más preguntas, atención al cliente está disponible para ayudarte.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map(({ q, a }, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden transition-all"
              style={{ border: `1.5px solid ${open === i ? BLUE + '40' : '#CFE0FF'}`, background: open === i ? `${BLUE}05` : 'white' }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-sm leading-snug" style={{ color: open === i ? BLUE : NAVY }}>
                  {q}
                </span>
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-transform"
                  style={{
                    background: open === i ? BLUE : '#F7F0FF',
                    transform: open === i ? 'rotate(45deg)' : 'none',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M1 6h10" stroke={open === i ? 'white' : '#1A2842'} strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
              </button>
              <div className={`accordion-content ${open === i ? 'open' : ''}`}>
                <div className="px-6 pb-5">
                  <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA card */}
        <div
          className="mt-12 rounded-3xl p-8 md:p-10 text-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${BLUE} 100%)` }}
        >
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10" style={{ background: YELLOW }} />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10" style={{ background: '#81A1DB' }} />
          <p className="text-white/60 text-sm mb-1">¿Tienes más preguntas?</p>
          <h3 className="text-2xl font-extrabold text-white mb-2">Atención al cliente COOVITEL</h3>
          <p className="text-white/60 text-sm mb-6">Resolvemos tus inquietudes sobre afiliación y productos.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:018000967474" className="font-bold px-7 py-3 rounded-full text-sm" style={{ background: YELLOW, color: NAVY }}>
              📞 Llamar ahora
            </a>
            <a href="https://api.whatsapp.com/send/?phone=573160189853&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold px-7 py-3 rounded-full text-sm text-white border border-white/30 hover:border-white transition-colors">
              <WhatsAppIcon /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ─── Section: Formulario ────────────────────────────────── */
function FormularioSection() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    tipoDoc: '', numDoc: '', nombres: '', apellidos: '',
    email: '', telefono: '', ciudad: '', empresa: '', comoNosConociste: '', acepta: false,
  })

  const ciudades = ['Bogotá', 'Tunja', 'Barranquilla', 'Cúcuta', 'Cali', 'Bucaramanga', 'Medellín', 'Manizales', 'Ibagué', 'Otra']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const inputCls = 'w-full rounded-xl px-4 py-3 text-sm font-medium bg-white border border-gray-200 text-gray-800 transition-all placeholder-gray-400'
  const labelCls = 'block text-xs font-bold uppercase tracking-widest mb-1.5'

  if (sent) {
    return (
      <div id="formulario" className="bg-white py-24">
        <div className="max-w-lg mx-auto px-6 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6" style={{ background: `${BLUE}12` }}>
            🎉
          </div>
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: NAVY }}>¡Solicitud enviada!</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Gracias por tu interés en COOVITEL. Atención al cliente se pondrá en contacto contigo en las próximas <strong>24 horas hábiles</strong> para continuar con tu proceso de afiliación.
          </p>
          <button
            onClick={() => setSent(false)}
            className="font-bold px-8 py-3 rounded-full text-sm"
            style={{ background: YELLOW, color: NAVY }}
          >
            Enviar otro formulario
          </button>
        </div>
      </div>
    )
  }

  return (
    <div id="formulario" className="bg-white">
      {/* Header */}
      <section
        className="py-14 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${BLUE} 100%)` }}
      >
        <div className="absolute -top-10 right-10 w-40 h-40 rounded-full opacity-10" style={{ background: YELLOW }} />
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <PillBadge>Empieza hoy</PillBadge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-3">
            Formulario de <span style={{ color: YELLOW }}>afiliación</span>
          </h2>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Completa este formulario y atención al cliente te contactará en menos de 24 horas para finalizar tu proceso.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16" style={{ background: '#F7F0FF' }}>
        <div className="max-w-2xl mx-auto px-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 shadow-sm" style={{ border: '1.5px solid #CFE0FF' }}>
            <h3 className="font-extrabold text-lg mb-6" style={{ color: NAVY }}>Datos personales</h3>

            {/* Tipo y número doc */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelCls} style={{ color: BLUE }}>Tipo de documento</label>
                <select
                  required
                  className={inputCls}
                  value={form.tipoDoc}
                  onChange={e => setForm({ ...form, tipoDoc: e.target.value })}
                >
                  <option value="">Selecciona</option>
                  <option value="cc">Cédula de ciudadanía</option>
                  <option value="ce">Cédula de extranjería</option>
                  <option value="pp">Pasaporte</option>
                  <option value="nit">NIT</option>
                </select>
              </div>
              <div>
                <label className={labelCls} style={{ color: BLUE }}>Número de documento</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. 1020304050"
                  className={inputCls}
                  value={form.numDoc}
                  onChange={e => setForm({ ...form, numDoc: e.target.value })}
                />
              </div>
            </div>

            {/* Nombres y apellidos */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelCls} style={{ color: BLUE }}>Nombres</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. María Camila"
                  className={inputCls}
                  value={form.nombres}
                  onChange={e => setForm({ ...form, nombres: e.target.value })}
                />
              </div>
              <div>
                <label className={labelCls} style={{ color: BLUE }}>Apellidos</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. López Rodríguez"
                  className={inputCls}
                  value={form.apellidos}
                  onChange={e => setForm({ ...form, apellidos: e.target.value })}
                />
              </div>
            </div>

            {/* Email y teléfono */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelCls} style={{ color: BLUE }}>Correo electrónico</label>
                <input
                  type="email"
                  required
                  placeholder="correo@ejemplo.com"
                  className={inputCls}
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label className={labelCls} style={{ color: BLUE }}>Teléfono / Celular</label>
                <input
                  type="tel"
                  required
                  placeholder="Ej. 3001234567"
                  className={inputCls}
                  value={form.telefono}
                  onChange={e => setForm({ ...form, telefono: e.target.value })}
                />
              </div>
            </div>

            {/* Ciudad y empresa */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelCls} style={{ color: BLUE }}>Ciudad de residencia</label>
                <select
                  required
                  className={inputCls}
                  value={form.ciudad}
                  onChange={e => setForm({ ...form, ciudad: e.target.value })}
                >
                  <option value="">Selecciona</option>
                  {ciudades.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls} style={{ color: BLUE }}>Empresa donde labora</label>
                <input
                  type="text"
                  placeholder="Nombre de la empresa"
                  className={inputCls}
                  value={form.empresa}
                  onChange={e => setForm({ ...form, empresa: e.target.value })}
                />
              </div>
            </div>

            {/* Cómo nos conociste */}
            <div className="mb-6">
              <label className={labelCls} style={{ color: BLUE }}>¿Cómo conociste COOVITEL?</label>
              <select
                className={inputCls}
                value={form.comoNosConociste}
                onChange={e => setForm({ ...form, comoNosConociste: e.target.value })}
              >
                <option value="">Selecciona (opcional)</option>
                <option value="recomendacion">Recomendación de un asociado</option>
                <option value="empresa">Por mi empresa</option>
                <option value="internet">Búsqueda en internet</option>
                <option value="rrss">Redes sociales</option>
                <option value="oficina">Visité una oficina</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {/* Divider */}
            <hr className="border-gray-100 mb-6" />

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer mb-6">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  required
                  checked={form.acepta}
                  onChange={e => setForm({ ...form, acepta: e.target.checked })}
                  className="sr-only"
                />
                <div
                  className="w-5 h-5 rounded flex items-center justify-center border-2 transition-all"
                  style={{ borderColor: form.acepta ? BLUE : '#C9DCFF', background: form.acepta ? BLUE : 'white' }}
                >
                  {form.acepta && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-xs text-gray-500 leading-relaxed">
                Autorizo a COOVITEL el tratamiento de mis datos personales de acuerdo con la{' '}
                <a href="https://coovitel.coop/wp-content/uploads/2025/07/COV-TEC-DOC-005-Politica-para-tratamiento-de-datos-personales-V2.pdf" target="_blank" rel="noreferrer" className="font-semibold underline" style={{ color: BLUE }}>Política de Privacidad</a>{' '}
                y el{' '}
                <a href="https://coovitel.coop/normatividad/" target="_blank" rel="noreferrer" className="font-semibold underline" style={{ color: BLUE }}>Aviso de Privacidad</a>.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-extrabold text-sm tracking-wide transition-opacity hover:opacity-90"
              style={{ background: BLUE, color: 'white' }}
            >
              Enviar solicitud de afiliación →
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              ¿Prefieres atención directa?{' '}
              <a href="tel:+576015666601" className="font-semibold" style={{ color: BLUE }}>Llámanos</a> o{' '}
              <a href="https://api.whatsapp.com/send/?phone=573160189853&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" className="font-semibold" style={{ color: BLUE }}>escríbenos por WhatsApp</a>
            </p>
          </form>
        </div>
      </section>
    </div>
  )
}

/* ─── Footer ─────────────────────────────────────────────── */
export default function Asociate() {
  const [activeTab, setActiveTab] = useState<Tab>('quienes')

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    const sectionId = tab === 'quienes' ? 'quienes' : tab === 'pasos' ? 'pasos' : tab === 'faq' ? 'faq' : 'formulario'
    setTimeout(() => {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <div className="min-h-full flex flex-col" style={{ fontFamily: 'Poppins, sans-serif' }}>
      
      <main className="flex-1 pt-[72px]">
        <HeroSection onJoin={() => handleTabChange('formulario')} />
        <TabNav active={activeTab} setActive={handleTabChange} />
        {activeTab === 'quienes' && <QuienesPuedenSection />}
        {activeTab === 'pasos' && <PasoAPasoSection />}
        {activeTab === 'faq' && <FAQSection />}
        {activeTab === 'formulario' && <FormularioSection />}
      </main>
      
    </div>
  )
}
