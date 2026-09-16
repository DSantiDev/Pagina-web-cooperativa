import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from 'react'
import { getCoovitelYears } from '../lib/brand'
import MEDIA, { getHomeSliderSlides, imageWithParams } from '../lib/media'
import { NAME_PATTERN, PHONE_PATTERN, clearFieldError, sanitizeName, sanitizePhone, showFieldError } from '../lib/formValidation'

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, inView }
}

function useCounter(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = Date.now()
    const id = setInterval(() => {
      const p = Math.min((Date.now() - start) / duration, 1)
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p >= 1) clearInterval(id)
    }, 16)
    return () => clearInterval(id)
  }, [active, target, duration])
  return count
}

// ─── AnimIn: scroll-triggered entrance ───────────────────────────────────────

type Dir = 'up' | 'left' | 'right' | 'scale' | 'fade'

function AnimIn({
  children, delay = 0, dir = 'up', className = '', style,
}: {
  children: ReactNode; delay?: number; dir?: Dir; className?: string; style?: CSSProperties
}) {
  const { ref, inView } = useInView()

  const transforms: Record<Dir, [string, string]> = {
    up:    ['translateY(0)', 'translateY(52px)'],
    left:  ['translateX(0)', 'translateX(-52px)'],
    right: ['translateX(0)', 'translateX(52px)'],
    scale: ['scale(1) translateY(0)', 'scale(0.88) translateY(28px)'],
    fade:  ['none', 'none'],
  }
  const [to, from] = transforms[dir]
  const easing = `cubic-bezier(0.16,1,0.3,1) ${delay}ms`

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? to : from,
        transition: `opacity 0.9s ${easing}, transform 0.9s ${easing}`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  )
}


// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: getCoovitelYears(), suffix: '+', label: 'Años de trayectoria' },
  { value: 17000, suffix: '+', label: 'Asociados activos' },
  { value: 9, suffix: '', label: 'Ciudades con presencia' },
  { value: 200, suffix: '+', label: 'Empresas aliadas' },
]

const benefits = [
  { icon: '🏥', title: 'Asistencias', desc: 'Salud preventiva con optometría, odontología, bienestar y orientación emocional; además de asistencia para hogar, mascotas, orientación vial y legal para nuestros asociados.' },
  { icon: '🕊️', title: 'Auxilio Funerario', desc: 'Acompañamiento y apoyo económico para el asociado y su familia.' },
  { icon: '🎓', title: 'Subsidio Educativo', desc: 'Becas y auxilios para la educación superior de tus hijos.' },
  { icon: '🏖️', title: 'Recreación', desc: 'Disfruta beneficios en boletería de cine y confitería.' },
  { icon: '📖', title: 'Formación Continua', desc: 'Talleres, cursos y capacitaciones gratuitas para asociados.' },
  { icon: '🤝', title: 'Convenios para tu familia', desc: 'Accede a convenios en salud, educación, viajes, restaurantes y comercios aliados.' },
]

const affiliations = ['Confecoop', 'Ascoop', 'Fogacoop', 'Supersolidaria']
const coovitelYears = getCoovitelYears()

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ value, suffix, label, active, delay }: {
  value: number; suffix: string; label: string; active: boolean; delay: number
}) {
  const count = useCounter(value, 2000, active)
  return (
    <div
      className="text-center transition-all duration-700"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(32px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <p className="font-black mb-1" style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: '#173C6E', lineHeight: 1.1 }}>
        {value >= 1000 ? count.toLocaleString('es-CO') : count}{suffix}
      </p>
      <p className="text-sm text-gray-500 font-medium leading-tight">{label}</p>
    </div>
  )
}

// ─── HeroBannerCarousel ───────────────────────────────────────────────────────

type SliderCorner = { label: string; value: string; detail?: string }

type HeroSlide = {
  mediaType: 'image' | 'video'; src: string; alt: string; caption: string; sub: string; href?: string;
  topLeft?: SliderCorner; topRight?: SliderCorner; bottomLeft?: SliderCorner; bottomRight?: SliderCorner;
}

function SliderCornerBadge({ corner, position }: { corner?: SliderCorner; position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' }) {
  if (!corner) return null
  const positions = { topLeft: '-top-3 -left-5', topRight: '-top-3 -right-5', bottomLeft: '-bottom-3 -left-5', bottomRight: '-bottom-3 -right-5' }
  const tones = {
    topLeft: 'bg-white text-[#173C6E]',
    topRight: 'bg-white text-[#173C6E]',
    bottomLeft: 'bg-[#131739] text-white',
    bottomRight: 'bg-[#EBC302] text-white',
  }
  const labelTone = position === 'bottomLeft' || position === 'bottomRight' ? 'text-white/70' : 'text-[#1B65A6]/70'
  return <div className={`absolute z-10 w-fit max-w-[150px] rounded-xl px-3 py-2 shadow-lg ${positions[position]} ${tones[position]}`}><p className={`text-[10px] font-semibold leading-tight ${labelTone}`}>{corner.label}</p><p className="mt-0.5 text-lg font-black leading-tight">{corner.value}</p>{corner.detail && <p className={`mt-1 text-[9px] font-medium leading-tight ${position === 'bottomLeft' || position === 'bottomRight' ? 'text-white/70' : 'text-gray-500'}`}>{corner.detail}</p>}</div>
}

const heroBannerSlides: HeroSlide[] = getHomeSliderSlides(coovitelYears)

function HeroBannerCarousel() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const slide = heroBannerSlides[current]
  const goTo = (index: number) => { if (index === current) return; setFading(true); window.setTimeout(() => { setCurrent(index); setFading(false) }, 320) }
  const goPrevious = () => goTo((current - 1 + heroBannerSlides.length) % heroBannerSlides.length)
  const goNext = () => goTo((current + 1) % heroBannerSlides.length)
  useEffect(() => {
    if (slide.mediaType === 'video') return
    timerRef.current = setTimeout(() => goTo((current + 1) % heroBannerSlides.length), 4500)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current, slide.mediaType])
  const mediaStyle = { filter: 'brightness(0.75) saturate(0.85)', opacity: fading ? 0 : 1, transition: 'opacity .32s ease' }
  const isExternalLink = Boolean(slide.href?.startsWith('http'))
  return <div className="hidden md:flex justify-center items-center"><div className="relative animate-float w-full max-w-[400px]"><div className={`hero-slider-media relative rounded-3xl overflow-hidden shadow-2xl ${slide.mediaType === 'video' ? 'hero-slider-media--video' : ''}`} style={{ border: '1px solid rgba(255,255,255,.1)' }}>{slide.mediaType === 'video' ? <video src={slide.src} className="w-full h-full object-cover" style={mediaStyle} autoPlay muted playsInline preload="metadata" aria-label={slide.alt} onEnded={goNext} onError={goNext} /> : <img src={slide.src} alt={slide.alt} width="1080" height="1350" loading="eager" fetchPriority="high" className="w-full h-full object-cover" style={mediaStyle} />}{slide.href && <a href={slide.href} target={isExternalLink ? '_blank' : undefined} rel={isExternalLink ? 'noreferrer' : undefined} aria-label={`Ver más sobre: ${slide.caption}`} className="absolute inset-0 z-[1] cursor-pointer" />}<div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,21,84,.7), transparent 50%)' }} /><div className="absolute z-10 bottom-6 left-6 right-6"><p className="text-white font-bold">{slide.caption}</p><p className="text-white/60 text-sm">{slide.sub}</p>{slide.href && <span className="mt-2 inline-flex text-xs font-bold text-[#EBC302]">Conocer más →</span>}</div><div className="absolute z-10 bottom-4 right-5 flex gap-1.5">{heroBannerSlides.map((_, index) => <button key={index} aria-label={`Mostrar banner ${index + 1}`} onClick={() => goTo(index)} style={{ width: index === current ? 18 : 6, height: 6, borderRadius: 3, backgroundColor: index === current ? '#EBC302' : 'rgba(255,255,255,.4)', border: 0, padding: 0 }} />)}</div></div>{heroBannerSlides.length > 1 && <><button type="button" aria-label="Ver slide anterior" onClick={goPrevious} className="absolute z-20 top-1/2 -left-4 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-[#173C6E]/90 text-xl font-bold text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-[#EBC302] hover:text-[#173C6E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EBC302]">‹</button><button type="button" aria-label="Ver siguiente slide" onClick={goNext} className="absolute z-20 top-1/2 -right-4 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-[#173C6E]/90 text-xl font-bold text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-[#EBC302] hover:text-[#173C6E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EBC302]">›</button></>}<SliderCornerBadge corner={slide.topLeft} position="topLeft" /><SliderCornerBadge corner={slide.topRight} position="topRight" /><SliderCornerBadge corner={slide.bottomLeft} position="bottomLeft" /><SliderCornerBadge corner={slide.bottomRight} position="bottomRight" /></div></div>
}
// ─── Main App ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [scrollPct, setScrollPct] = useState(0)
  const [contactForm, setContactForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' })
  const [contactSent, setContactSent] = useState(false)

  const submitContactForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setContactSent(true)
    setContactForm({ nombre: '', email: '', telefono: '', mensaje: '' })
  }

  // Parallax refs — direct DOM manipulation, no re-renders
  const pBlob1 = useRef<HTMLDivElement>(null)
  const pBlob2 = useRef<HTMLDivElement>(null)
  const pBlob3 = useRef<HTMLDivElement>(null)
  const pGrid  = useRef<HTMLDivElement>(null)

  const statsSection    = useInView(0.2)
  const aboutSection    = useInView(0.1)
  const trustSection    = useInView(0.08)
  const benefitsSection = useInView(0.06)
  const contactSection  = useInView(0.06)

  useEffect(() => {
    let rafId: number
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const sy = window.scrollY
        const total = document.documentElement.scrollHeight - window.innerHeight
        setScrollPct(total > 0 ? (sy / total) * 100 : 0)

        // Parallax — different speeds per layer
        if (pBlob1.current) pBlob1.current.style.transform = `translateY(${sy * 0.32}px)`
        if (pBlob2.current) pBlob2.current.style.transform = `translateY(${sy * 0.18}px) translateX(${sy * 0.04}px)`
        if (pBlob3.current) pBlob3.current.style.transform = `translateY(${sy * -0.12}px)`
        if (pGrid.current)  pGrid.current.style.transform  = `translateY(${sy * 0.08}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId) }
  }, [])

  return (
    <div className="min-h-screen antialiased" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#f7f0ff' }}>

      {/* Scroll progress bar */}
      <div id="scroll-bar" style={{ width: `${scrollPct}%` }} />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section id="inicio" className="hero-gradient relative min-h-screen flex items-center overflow-hidden">

        {/* Background photo — sits behind gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={imageWithParams(MEDIA.homeFondoHero, 'w=1800&h=1200')}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{ opacity: 0.12, mixBlendMode: 'luminosity' }}
          />
        </div>

        {/* Parallax layer 1 — large back blobs */}
        <div ref={pBlob1} className="absolute inset-0 pointer-events-none" style={{ willChange: 'transform' }}>
          <div className="animate-blob blob-delay-1 absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(200,184,255,0.18) 0%, transparent 70%)' }} />
          <div className="animate-blob blob-delay-2 absolute top-1/2 -left-48 w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,160,32,0.12) 0%, transparent 70%)' }} />
        </div>

        {/* Parallax layer 2 — mid blobs */}
        <div ref={pBlob2} className="absolute inset-0 pointer-events-none" style={{ willChange: 'transform' }}>
          <div className="animate-blob absolute top-1/4 right-1/4 w-56 h-56 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(200,184,255,0.10) 0%, transparent 70%)', animationDelay: '-6s' }} />
        </div>

        {/* Parallax layer 3 — dot grid slow drift */}
        <div ref={pGrid} className="absolute inset-0 pointer-events-none" style={{ willChange: 'transform' }}>
          <div className="absolute inset-[-20%]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />
        </div>

        {/* Parallax layer 4 — front accent lines */}
        <div ref={pBlob3} className="absolute inset-0 pointer-events-none" style={{ willChange: 'transform' }}>
          <svg className="absolute bottom-0 right-0 opacity-[0.05]" width="800" height="600" viewBox="0 0 800 600" fill="none">
            <circle cx="600" cy="300" r="280" stroke="white" strokeWidth="1" />
            <circle cx="600" cy="300" r="200" stroke="white" strokeWidth="0.8" />
            <circle cx="600" cy="300" r="120" stroke="white" strokeWidth="0.6" />
          </svg>
          {/* Gold accent top-left */}
          <div className="absolute top-24 left-12 w-24 h-24 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #EBC302 0%, transparent 70%)' }} />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-12 items-center w-full">

          {/* Left: Copy */}
          <div>
            <div className="hero-enter hero-enter-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
              style={{ backgroundColor: 'rgba(232,160,32,0.15)', color: '#EBC302', border: '1px solid rgba(232,160,32,0.3)' }}>
              ✦ Cooperativa · {coovitelYears} años de confianza
            </div>

            <h1 className="hero-enter hero-enter-2 font-black text-white leading-[1.08] mb-6"
              style={{ fontSize: 'clamp(2.6rem,5.5vw,4rem)' }}>
              Más de una razón<br />para ser{' '}
              <span className="relative inline-block">
                <span style={{ color: '#EBC302' }}>nuestro asociado</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 380 10" fill="none" style={{ height: '8px' }}>
                  <path className="underline-path" d="M3 6 C70 1, 150 9, 230 5 C290 2, 340 8, 377 4"
                    stroke="#EBC302" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="hero-enter hero-enter-3 text-base text-white/60 mb-10 leading-relaxed max-w-md">
              Bienestar financiero para ti, tu familia y tu empresa. Ahorra, invierte y accede a crédito con propósito en 9 ciudades de Colombia.
            </p>

            <div className="hero-enter hero-enter-4 flex flex-wrap gap-4 mb-14">
              <a href="/productos"
                className="px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: '#EBC302', color: '#131739' }}>
                Conoce nuestros productos
              </a>
              <a href="/asociate"
                className="px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all duration-200 hover:bg-white/10"
                style={{ border: '1.5px solid rgba(255,255,255,0.25)' }}>
                Asóciate hoy →
              </a>
            </div>

          </div>

          {/* Right: Hero carousel */}
          <HeroBannerCarousel />
        </div>

        {/* Ola integrada: conserva el movimiento visual sin crear un corte blanco. */}
        <div className="absolute bottom-0 inset-x-0 leading-none pointer-events-none">
          <svg viewBox="0 0 1440 90" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[90px]">
            <path d="M0 90 L0 45 Q180 0 360 35 Q540 70 720 40 Q900 10 1080 45 Q1260 80 1440 50 L1440 90 Z" fill="#173C6E" />
          </svg>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────── */}
      <section
        ref={statsSection.ref as React.RefObject<HTMLElement>}
        className="pt-10 pb-20 relative overflow-hidden"
        style={{ backgroundColor: '#f7f0ff' }}
      >
        {/* Background photo with navy tint */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src={imageWithParams(MEDIA.homeFondoEstadisticas, 'w=1800&h=600')}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{ opacity: 0.07, filter: 'saturate(0.3)' }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(27,42,143,0.04)' }} />
        </div>
        <div className="absolute inset-0 pattern-diagonal pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {stats.map((s, i) => <StatCard key={i} {...s} active={statsSection.inView} delay={i * 120} />)}
          </div>
          {/* Decorative divider */}
          <div className="mt-16 flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #CFE0FF)' }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#EBC302' }} />
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #CFE0FF, transparent)' }} />
          </div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────── */}
      <section
        id="nosotros"
        ref={aboutSection.ref as React.RefObject<HTMLElement>}
        className="py-24 relative overflow-hidden"
        style={{ backgroundColor: '#f7f0ff' }}
      >
        {/* Background photo */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src={imageWithParams(MEDIA.homeFondoNosotros, 'w=1800&h=1000')}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{ opacity: 0.055, filter: 'saturate(0.2) hue-rotate(200deg)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(27,42,143,0.06), rgba(200,184,255,0.04))' }} />
        </div>
        <div className="absolute inset-0 pattern-diagonal pointer-events-none" />
        {/* Large decorative circle */}
        <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(200,184,255,0.12) 0%, transparent 70%)' }} />

        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <AnimIn dir="left">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-xl" style={{ backgroundColor: '#CFE0FF' }}>
                <img
                  src={MEDIA.homeImagenNosotros}
                  alt={MEDIA.homeImagenNosotrosAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,21,84,0.5) 0%, transparent 55%)' }} />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-lg">{coovitelYears} años de trayectoria</p>
                  <p className="text-white/65 text-sm">construyendo bienestar cooperativo</p>
                </div>
              </div>
              {/* Decorative blocks */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl -z-10" style={{ backgroundColor: '#EBC302' }} />
              <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full -z-10 opacity-50" style={{ backgroundColor: '#C9DCFF' }} />
            </div>
          </AnimIn>

          {/* Text */}
          <AnimIn dir="right" delay={120}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#EBC302' }}>
              Quiénes Somos
            </p>
            <h2 className="text-4xl font-black mb-6 leading-tight" style={{ color: '#131739' }}>
              Una cooperativa construida sobre confianza
            </h2>
            <p className="text-gray-500 leading-relaxed mb-5 text-sm">
              COOVITEL es una Cooperativa Empresarial de Ahorro y Crédito con más de {coovitelYears} años de historia, dedicada a mejorar la calidad de vida de más de 17.000 asociados en 9 ciudades de Colombia.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8 text-sm">
              Más de 200 empresas confían en nosotros para llevarle bienestar financiero a sus empleados. Operamos bajo los más altos estándares de seguridad, ética y responsabilidad social cooperativa.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {affiliations.map(a => (
                <div key={a} className="flex items-center gap-3 p-3 rounded-xl bg-white"
                  style={{ border: '1px solid #CFE0FF', boxShadow: '0 2px 8px rgba(27,42,143,0.04)' }}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#EBC302' }} />
                  <span className="text-sm font-semibold" style={{ color: '#173C6E' }}>{a}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <a href="/asociate"
                className="px-6 py-3 rounded-full text-sm font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: '#173C6E' }}>
                Afíliate ahora
              </a>
              <a href="/quienes-somos"
                className="px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 hover:bg-white"
                style={{ color: '#173C6E', border: '2px solid #CFE0FF' }}>
                Conoce más de nosotros →
              </a>
            </div>
          </AnimIn>
        </div>
      </section>

      {/* ── Trust / Confianza ──────────────────────────────────── */}
      <section
        id="confianza"
        ref={trustSection.ref as React.RefObject<HTMLElement>}
        className="py-24 relative overflow-hidden"
        style={{ backgroundColor: '#131739' }}
      >
        {/* Background photo with deep navy overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src={imageWithParams(MEDIA.homeFondoConfianza, 'w=1800&h=1000')}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{ opacity: 0.34, filter: 'saturate(0.55) hue-rotate(200deg)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(13,23,57,0.76), rgba(23,60,110,0.58))' }} />
        </div>
        {/* Blobs + dots */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.08]"
            style={{ background: 'radial-gradient(circle, #C9DCFF 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #EBC302 0%, transparent 70%)' }} />
          <div className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <AnimIn className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#EBC302' }}>
              Evaluación y Compromiso
            </p>
            <h2 className="text-4xl font-black text-white mb-4">
              Confianza respaldada por calificaciones
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
              Nuestros indicadores de solidez financiera y calidad de servicio están validados por organismos independientes de primer nivel.
            </p>
          </AnimIn>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Value & Risk A+ */}
            <AnimIn delay={80} dir="scale">
              <div className="card-shimmer relative rounded-3xl p-8 flex flex-col items-center text-center h-full transition-all duration-300 hover:scale-[1.03]"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <div className="relative w-28 h-28 mb-6">
                  <div className="w-28 h-28 rounded-full flex items-center justify-center shadow-xl"
                    style={{ background: 'linear-gradient(135deg, #131739, #173C6E)', border: '3px solid rgba(200,184,255,0.3)' }}>
                    <div className="text-center">
                      <p className="text-white font-black text-3xl leading-none">A+</p>
                      <p className="text-white/50 text-[9px] font-bold tracking-wider mt-1">VALUE & RISK</p>
                    </div>
                  </div>
                  {/* Ribbon */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-1">
                    <div style={{ width: 14, height: 28, backgroundColor: '#173C6E', clipPath: 'polygon(0 0,100% 0,75% 100%,25% 100%)' }} />
                    <div style={{ width: 14, height: 28, backgroundColor: '#131739', clipPath: 'polygon(0 0,100% 0,75% 100%,25% 100%)' }} />
                  </div>
                </div>
                <p className="font-black text-white text-base mt-2">Fortaleza Institucional</p>
                <p className="text-sm text-white/45 mt-2 leading-relaxed flex-1">Calificación otorgada por Value &amp; Risk Rating que acredita la solidez de COOVITEL.</p>
                <div className="mt-5 px-4 py-1.5 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(232,160,32,0.15)', color: '#EBC302', border: '1px solid rgba(232,160,32,0.25)' }}>
                  Calificación 2026
                </div>
              </div>
            </AnimIn>

            {/* Value & Risk A VrR2 */}
            <AnimIn delay={180} dir="scale">
              <div className="card-shimmer relative rounded-3xl p-8 flex flex-col items-center text-center h-full transition-all duration-300 hover:scale-[1.03]"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <div className="relative w-28 h-28 mb-6">
                  <div className="w-28 h-28 rounded-full flex items-center justify-center shadow-xl"
                    style={{ background: 'linear-gradient(135deg, #173C6E, #27548F)', border: '3px solid rgba(200,184,255,0.3)' }}>
                    <div className="text-center">
                      <p className="text-white font-black text-2xl leading-none">A</p>
                      <p className="text-white/90 font-black text-sm leading-none">VrR 2</p>
                      <p className="text-white/40 text-[8px] tracking-wider mt-0.5">VALUE & RISK</p>
                    </div>
                  </div>
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-1">
                    <div style={{ width: 14, height: 28, backgroundColor: '#27548F', clipPath: 'polygon(0 0,100% 0,75% 100%,25% 100%)' }} />
                    <div style={{ width: 14, height: 28, backgroundColor: '#173C6E', clipPath: 'polygon(0 0,100% 0,75% 100%,25% 100%)' }} />
                  </div>
                </div>
                <p className="font-black text-white text-base mt-2">Deuda de Largo y Corto Plazo</p>
                <p className="text-sm text-white/45 mt-2 leading-relaxed flex-1">Calificación de solidez en gestión de deuda emitida por Value &amp; Risk Rating.</p>
                <div className="mt-5 px-4 py-1.5 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(232,160,32,0.15)', color: '#EBC302', border: '1px solid rgba(232,160,32,0.25)' }}>
                  Calificación 2026
                </div>
              </div>
            </AnimIn>

            {/* Bureau Veritas */}
            <AnimIn delay={280} dir="scale">
              <div className="card-shimmer relative rounded-3xl p-8 flex flex-col items-center text-center h-full transition-all duration-300 hover:scale-[1.03]"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <div className="w-28 h-28 rounded-2xl flex items-center justify-center shadow-xl mb-6"
                  style={{ backgroundColor: 'white', border: '3px solid rgba(200,184,255,0.3)' }}>
                  <div className="text-center px-1">
                    <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">Certificado</p>
                    <p className="font-black text-lg leading-tight" style={{ color: '#173C6E' }}>ISO</p>
                    <p className="font-black text-xl leading-none" style={{ color: '#173C6E' }}>9001</p>
                    <p className="text-gray-400 text-xs font-semibold">:2015</p>
                  </div>
                </div>
                <p className="font-black text-white text-base">Bureau Veritas</p>
                <p className="text-sm text-white/45 mt-2 leading-relaxed flex-1">Sistema de Gestión de Calidad certificado bajo norma internacional ISO 9001:2015.</p>
                <div className="mt-5 px-4 py-1.5 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(232,160,32,0.15)', color: '#EBC302', border: '1px solid rgba(232,160,32,0.25)' }}>
                  Certificación 2026
                </div>
              </div>
            </AnimIn>
          </div>

          {/* Ver certificaciones CTA */}
          <AnimIn delay={350} className="flex justify-center mt-4">
            <a
              href="/confianza?section=certificaciones"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: 'white',
                border: '1.5px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(232,160,32,0.15)'; e.currentTarget.style.borderColor = '#EBC302'; e.currentTarget.style.color = '#EBC302' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'white' }}
            >
              <span>📄</span>
              <span>Ver certificaciones →</span>
            </a>
          </AnimIn>
        </div>
      </section>

      {/* ── Benefits ───────────────────────────────────────────── */}
      <section
        id="beneficios"
        ref={benefitsSection.ref as React.RefObject<HTMLElement>}
        className="home-benefits--light py-24 relative overflow-hidden"
        style={{ backgroundColor: '#f7f0ff' }}
      >
        {/* Background photo */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src={imageWithParams(MEDIA.homeFondoBeneficios, 'w=1800&h=1000')}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{ opacity: 0.32, filter: 'saturate(0.55) hue-rotate(200deg)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(125deg, rgba(247,240,255,0.72), rgba(255,255,255,0.66))' }} />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-48 top-0 w-[600px] h-[600px] rounded-full opacity-[0.07]"
            style={{ background: 'radial-gradient(circle, #C9DCFF 0%, transparent 70%)' }} />
          <div className="absolute -left-32 bottom-0 w-80 h-80 rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #EBC302 0%, transparent 70%)' }} />
          <div className="absolute inset-0"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <AnimIn className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#EBC302' }}>
              Plan de Beneficios
            </p>
            <h2 className="text-4xl font-black text-white mb-4">
              Ser asociado tiene muchas ventajas
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm">
              Tu asociación en COOVITEL va mucho más allá de los productos financieros.<br /><strong className="text-[#EBC302]">Aplican términos y condiciones.</strong>
            </p>
          </AnimIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="home-benefit-card relative overflow-hidden rounded-2xl p-6 cursor-default transition-all duration-500 hover:scale-[1.025]"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(8px)',
                  transitionDelay: `${i * 80}ms`,
                  opacity: benefitsSection.inView ? 1 : 0,
                  transform: benefitsSection.inView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                  transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
                  style={{ background: 'linear-gradient(135deg, rgba(232,160,32,0.06), transparent)' }} />
                <div className="w-11 h-11 rounded-xl mb-4 flex items-center justify-center text-2xl"
                  style={{ backgroundColor: 'rgba(232,160,32,0.1)', border: '1px solid rgba(232,160,32,0.2)' }}>
                  {b.icon}
                </div>
                <h3 className="font-bold text-white mb-2">{b.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

          <AnimIn delay={550} className="text-center mt-14">
            <a href="/bienestar"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: '#EBC302', color: '#131739' }}>
              Conoce todos los beneficios →
            </a>
          </AnimIn>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────── */}
      <section
        id="contacto"
        ref={contactSection.ref as React.RefObject<HTMLElement>}
        className="home-contact--dark py-24 relative overflow-hidden"
        style={{ backgroundColor: '#131739' }}
      >
        {/* Background photo */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src={imageWithParams(MEDIA.homeFondoContacto, 'w=1800&h=1000')}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{ opacity: 0.05, filter: 'saturate(0.2) hue-rotate(210deg)' }}
          />
        </div>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(27,42,143,0.04) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <AnimIn className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#EBC302' }}>
              Contacto
            </p>
            <h2 className="text-4xl font-black mb-4" style={{ color: '#131739' }}>
              Estamos aquí para ayudarte
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto text-sm">
              Comunícate con nosotros por el canal que prefieras. Atención al cliente te atenderá con gusto.
            </p>
          </AnimIn>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Channels */}
            <AnimIn dir="left" delay={80}>
              <div className="space-y-4">
                {[
                  { label: 'Línea gratuita nacional', value: '018000 967 474', icon: '☎️', accent: '#CFE0FF', href: 'tel:018000967474' },
                  { label: 'Sucursal Virtual', value: 'Ingresa a la sucursal virtual', icon: '🌐', accent: '#CFE0FF', href: 'https://odin.selsacloud.com/linix/v7/8e273b00-cfc0-48eb-bcff-10ba62e64fe5/servicio/identidad/autenticar/gui/autenticacion-gui/ingresousuario' },
                ].map(item => (
                  <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="flex items-center gap-4 p-5 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                    style={{ backgroundColor: '#f7f0ff', border: '1px solid #CFE0FF', textDecoration: 'none' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ backgroundColor: item.accent }}>{item.icon}</div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                      <p className="font-bold text-sm" style={{ color: '#173C6E' }}>{item.value}</p>
                    </div>
                    <span className="ml-auto text-gray-300 text-lg">→</span>
                  </a>
                ))}
                <a href="/contacto?tab=oficinas" className="home-contact__offices flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold">📍 Conoce nuestras sedes <span aria-hidden="true">→</span></a>
                <div className="flex gap-3 pt-2">
                  {[
                    { label: 'Facebook', href: 'https://www.facebook.com/coovitelcol/?locale=es_LA', color: '#1B65A6', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                    { label: 'Instagram', href: 'https://www.instagram.com/coovitel_oficial/?hl=es', color: '#A90072', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
                    { label: 'LinkedIn', href: 'https://co.linkedin.com/company/cooviteloficial', color: '#1B65A6', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                    { label: 'WhatsApp', href: 'https://wa.me/573160189853?text=', color: '#1B65A6', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
                  ].map(n => (
                    <a key={n.label} href={n.href} target="_blank" rel="noopener noreferrer"
                      className={`flex-1 py-3 rounded-xl flex flex-col items-center gap-1 transition-all duration-200 hover:scale-105 hover:shadow-md ${n.label === 'WhatsApp' ? 'home-social-whatsapp' : ''}`}
                      style={{ backgroundColor: '#f7f0ff', border: '1px solid #CFE0FF', color: n.color, textDecoration: 'none' }}>
                      {n.icon}
                      <span className="text-[9px] font-semibold text-gray-400">{n.label}</span>
                    </a>
                  ))}
                </div>

                <a
                  href="/contacto"
                  className="mt-4 flex items-center justify-center gap-3 w-full py-4 rounded-full font-bold text-sm text-white transition-all duration-200 hover:scale-105 hover:shadow-2xl"
                  style={{ background: 'linear-gradient(135deg, #173C6E, #27548F)', boxShadow: '0 4px 24px rgba(27,42,143,0.3)' }}
                >
                  <span>💬</span>
                  <span>Contáctanos y asegura tus sueños</span>
                  <span>→</span>
                </a>
              </div>
            </AnimIn>

            {/* Form */}
            <AnimIn dir="right" delay={160}>
              <div className="rounded-3xl p-8" style={{ backgroundColor: '#f7f0ff', border: '1px solid #CFE0FF', boxShadow: '0 4px 24px rgba(27,42,143,0.06)' }}>
                <h3 className="font-black text-lg mb-1" style={{ color: '#131739' }}>Envíanos un mensaje</h3>
                <p className="text-xs text-gray-400 mb-6">Te responderemos en menos de 24 horas hábiles</p>
                <form className="form-validation space-y-4" onSubmit={submitContactForm} onInvalid={showFieldError} onInput={clearFieldError}>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Nombre completo *</label>
                    <input required pattern={NAME_PATTERN} minLength={2} autoComplete="name" value={contactForm.nombre} onChange={e => setContactForm({ ...contactForm, nombre: sanitizeName(e.target.value) })} placeholder="Tu nombre completo" className="w-full px-4 py-3 rounded-xl text-sm bg-white outline-none transition-all duration-200" style={{ border: '1.5px solid #CFE0FF' }} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Correo electrónico *</label>
                    <input required type="email" autoComplete="email" value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value.trimStart() })} placeholder="tucorreo@dominio.com" className="w-full px-4 py-3 rounded-xl text-sm bg-white outline-none transition-all duration-200" style={{ border: '1.5px solid #CFE0FF' }} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Teléfono *</label>
                    <input required type="tel" inputMode="numeric" pattern={PHONE_PATTERN} minLength={10} maxLength={10} value={contactForm.telefono} onChange={e => setContactForm({ ...contactForm, telefono: sanitizePhone(e.target.value) })} placeholder="3000000000" className="w-full px-4 py-3 rounded-xl text-sm bg-white outline-none transition-all duration-200" style={{ border: '1.5px solid #CFE0FF' }} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Mensaje</label>
                    <textarea required minLength={10} maxLength={1000} value={contactForm.mensaje} onChange={e => setContactForm({ ...contactForm, mensaje: e.target.value })} rows={4} placeholder="¿En qué podemos ayudarte?"
                      className="w-full px-4 py-3 rounded-xl text-sm bg-white outline-none resize-none transition-all duration-200"
                      style={{ border: '1.5px solid #CFE0FF' }}
                      onFocus={e => { e.target.style.borderColor = '#173C6E'; e.target.style.boxShadow = '0 0 0 3px rgba(27,42,143,0.08)' }}
                      onBlur={e => { e.target.style.borderColor = '#CFE0FF'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                  <label className="flex items-start gap-2 text-[11px] leading-relaxed text-gray-500 cursor-pointer">
                    <input required type="checkbox" className="mt-0.5 h-3.5 w-3.5 accent-[#173C6E]" />
                    <span>Acepto el tratamiento de mis datos personales conforme a la política de privacidad.</span>
                  </label>
                  <button type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.99]"
                    style={{ backgroundColor: '#173C6E' }}>
                    {contactSent ? 'Mensaje enviado ✓' : 'Enviar mensaje'}
                  </button>
                </form>
              </div>
            </AnimIn>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: '#131739' }} className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#EBC302' }}>
                  <span className="font-black text-xs tracking-wider" style={{ color: '#131739' }}>CV</span>
                </div>
                <span className="font-black text-xl text-white tracking-tight">COOVITEL</span>
              </div>
              <p className="text-white/35 text-sm leading-relaxed mb-6 max-w-sm">
                Cooperativa Empresarial de Ahorro y Crédito. 64 años construyendo bienestar financiero con solidaridad y transparencia en Colombia.
              </p>
              <div className="flex gap-2">
                {['FB','IG','YT','TW'].map(s => (
                  <div key={s} className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black cursor-pointer transition-all duration-200 hover:scale-110"
                    style={{ backgroundColor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)' }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white font-bold mb-5 text-sm">Productos</p>
              <ul className="space-y-2.5">
                {['Crédito Propósito','Ahorro Propósito','CDAT','Cupo Rotativo','CrediSalud','Coovinómina'].map(item => (
                  <li key={item}><a href="#productos" className="text-white/35 text-sm hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-bold mb-5 text-sm">Institucional</p>
              <ul className="space-y-2.5">
                {['Quiénes Somos','Plan de Beneficios','Asistencias Gratis','Sucursal Virtual','Formación','Contacto'].map(item => (
                  <li key={item}><a href="/" className="text-white/35 text-sm hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/20 text-xs text-center md:text-left">
              © 2026 COOVITEL — Cooperativa Empresarial de Ahorro y Crédito · Vigilada por Supersolidaria
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              {affiliations.map(a => <span key={a} className="text-white/20 text-xs">{a}</span>)}
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
