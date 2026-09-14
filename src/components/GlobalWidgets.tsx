import { useCallback, useEffect, useRef, useState } from 'react'
import { SITE_SEARCH_ITEMS } from '../lib/siteContent'

/**
 * ───────────────────── ELEMENTOS GLOBALES DEL SITIO ───────────────────────
 *
 * Estos componentes aparecen en varias páginas. Aquí se administran el
 * cargador, redes sociales, botón de regreso, pagos Coovipay y migas de pan.
 * Si cambia un enlace de redes, WhatsApp o Coovipay, actualízalo en este archivo
 * para que el cambio se aplique en todo el sitio.
 * ──────────────────────────────────────────────────────────────────────────
 */

/** Muestra una capa breve de carga al cambiar de página. */
export function PageLoader({ visible }: { visible: boolean }) {
  return visible ? <div className="page-loader" role="status" aria-label="Cargando contenido"><span /></div> : null
}

export function InstagramIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" /></svg>
}

export function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26C2.16 6.44 6.6 2.01 12.05 2.01c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.88 9.89" /></svg>
}

/**
 * Barra flotante de redes sociales. `open` controla su apertura; los enlaces
 * internos son el único lugar que debe editarse si cambia una red social.
 */
const whatsappMessages: Record<string, string> = {
  productos: 'Hola, quiero información sobre los productos y simuladores de COOVITEL.',
  bienestar: 'Hola, quiero información sobre los beneficios y asistencias de COOVITEL.',
  asociate: 'Hola, quiero información para asociarme a COOVITEL.',
  contacto: 'Hola, necesito ayuda de Atención al Asociado.',
  documentos: 'Hola, necesito ayuda para consultar o solicitar un documento de COOVITEL.',
  actualidad: 'Hola, quiero ampliar la información sobre las novedades de COOVITEL.',
  confianza: 'Hola, quiero información sobre confianza y seguridad en COOVITEL.',
}

export function SocialDock({ page }: { page: string }) {
  const [open, setOpen] = useState(false)
  const message = whatsappMessages[page] ?? 'Hola, quiero recibir información sobre COOVITEL.'
  const whatsappHref = `https://api.whatsapp.com/send?phone=573160189853&text=${encodeURIComponent(message)}`
  return <aside className={`social-dock ${open ? 'is-open' : ''}`} aria-label="Redes sociales"><div className="social-dock__links"><a className="social--facebook" href="https://www.facebook.com/coovitelcol/" target="_blank" rel="noreferrer" aria-label="Facebook">f</a><a className="social--instagram" href="https://www.instagram.com/coovitel_oficial/" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a><a className="social--linkedin" href="https://co.linkedin.com/company/cooviteloficial" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a><a className="social--whatsapp" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp sobre esta sección"><WhatsAppIcon /></a></div><button className="social-dock__trigger" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Ocultar redes sociales" : "Mostrar redes sociales"}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.9 7.5-4.4M8.2 13.1l7.5 4.4"/></svg></button></aside>
}

/**
 * Botón flotante para volver suavemente al inicio. También dibuja el progreso
 * de lectura alrededor del icono según el desplazamiento de la página.
 */
export function ScrollTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const handler = () => {
      const maximum = document.documentElement.scrollHeight - window.innerHeight
      setProgress(maximum > 0 ? Math.min(window.scrollY / maximum, 1) : 0)
      setVisible(window.scrollY > 180)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  const circumference = 138.2
  return <button className={`scroll-top ${visible ? 'is-visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Volver arriba"><svg viewBox="0 0 52 52" aria-hidden="true"><circle className="scroll-top__track" cx="26" cy="26" r="22" /><circle className="scroll-top__progress" cx="26" cy="26" r="22" style={{ strokeDasharray: `${progress * circumference} ${circumference}` }} /></svg><span>↑</span><i>Volver arriba</i></button>
}

/** Acceso global a Coovipay; modifica `href` si cambia la plataforma de pagos. */
export function CoovipayButton() {
  return <a className="coovipay-button" href="https://coovitel.zolev.co/CentralPagos/Index" target="_blank" rel="noreferrer" aria-label="Conoce nuestros pagos con Coovipay"><img src="/images/coovipay-lateralderecho.png" alt="Coovipay" width="221" height="305" /><span>Conoce nuestros pagos</span></a>
}

/** Lector local: usa la voz disponible en el navegador y no envía contenido a servicios externos. */
export function PageReader({ embedded = false }: { embedded?: boolean }) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'playing' | 'paused'>('idle')
  const [rate, setRate] = useState(0.9)
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const [hasSelection, setHasSelection] = useState(false)
  const [selectionMessage, setSelectionMessage] = useState('')
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const cancelled = useRef(false)
  const audioContext = useRef<AudioContext | null>(null)

  const stopReading = useCallback(() => {
    if (!supported) return
    cancelled.current = true
    window.speechSynthesis.cancel()
    setStatus('idle')
    setProgress({ current: 0, total: 0 })
  }, [supported])

  const startReading = useCallback((nextRate = rate) => {
    if (!supported) return
    const text = window.getSelection()?.toString().replace(/\s+/g, ' ').trim() ?? ''
    if (!text) {
      setSelectionMessage('Selecciona primero el texto que quieres escuchar.')
      setHasSelection(false)
      return
    }
    const pieces = (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [text]).reduce<string[]>((chunks, sentence) => {
      const clean = sentence.trim()
      const previous = chunks[chunks.length - 1]
      if (previous && `${previous} ${clean}`.length <= 240) chunks[chunks.length - 1] = `${previous} ${clean}`
      else chunks.push(clean)
      return chunks
    }, [])
    let index = 0
    cancelled.current = false
    setSelectionMessage('')
    window.speechSynthesis.cancel()
    setProgress({ current: 1, total: pieces.length })
    setStatus('playing')

    const speakNext = () => {
      if (cancelled.current || index >= pieces.length) {
        if (!cancelled.current) {
          setStatus('idle')
          setProgress({ current: 0, total: 0 })
        }
        return
      }
      const utterance = new SpeechSynthesisUtterance(pieces[index])
      utterance.lang = 'es-CO'
      utterance.rate = nextRate
      const voice = window.speechSynthesis.getVoices().find((item) => item.lang.toLowerCase().startsWith('es-co')) ?? window.speechSynthesis.getVoices().find((item) => item.lang.toLowerCase().startsWith('es-'))
      if (voice) utterance.voice = voice
      utterance.onend = () => {
        if (cancelled.current) return
        index += 1
        setProgress({ current: Math.min(index + 1, pieces.length), total: pieces.length })
        speakNext()
      }
      utterance.onerror = () => { if (!cancelled.current) stopReading() }
      window.speechSynthesis.speak(utterance)
    }
    speakNext()
  }, [rate, stopReading, supported])

  useEffect(() => () => stopReading(), [stopReading])
  useEffect(() => {
    const updateSelection = () => {
      const selection = window.getSelection()
      const selectedText = selection?.toString().trim() ?? ''
      const source = document.querySelector('#main-content')
      const parent = selection?.anchorNode?.nodeType === Node.ELEMENT_NODE ? selection.anchorNode as Element : selection?.anchorNode?.parentElement
      setHasSelection(Boolean(selectedText && source && parent && source.contains(parent)))
    }
    document.addEventListener('selectionchange', updateSelection)
    return () => document.removeEventListener('selectionchange', updateSelection)
  }, [])
  useEffect(() => {
    if (status !== 'playing') return
    const playConfirmation = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest('button')) return
      try {
        const context = audioContext.current ?? new AudioContext()
        audioContext.current = context
        const oscillator = context.createOscillator()
        const gain = context.createGain()
        oscillator.frequency.value = 660
        gain.gain.setValueAtTime(0.035, context.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.06)
        oscillator.connect(gain).connect(context.destination)
        oscillator.start()
        oscillator.stop(context.currentTime + 0.06)
      } catch { /* El lector continúa aunque el navegador no permita el sonido de confirmación. */ }
    }
    document.addEventListener('click', playConfirmation, true)
    return () => document.removeEventListener('click', playConfirmation, true)
  }, [status])

  const playOrPause = () => {
    if (!supported) return
    if (status === 'playing') {
      window.speechSynthesis.pause()
      setStatus('paused')
    } else if (status === 'paused') {
      window.speechSynthesis.resume()
      setStatus('playing')
    } else startReading()
  }

  const controls = <div className={`page-reader__panel ${embedded ? 'page-reader__panel--embedded' : ''}`} role="region" aria-label="Controles de lectura">
      <strong>Escuchar selección</strong>
      <p aria-live="polite">{supported ? status === 'idle' ? selectionMessage || (hasSelection ? 'El texto seleccionado está listo para escucharse.' : 'Selecciona un texto de la página y pulsa Escuchar.') : `${status === 'paused' ? 'En pausa' : 'Leyendo'} · ${progress.current} de ${progress.total}` : 'Tu navegador no permite la lectura en voz alta.'}</p>
      {supported && <><div className="page-reader__controls"><button type="button" onClick={playOrPause}>{status === 'playing' ? 'Pausar' : status === 'paused' ? 'Continuar' : 'Escuchar'}</button><button type="button" onClick={stopReading} disabled={status === 'idle'}>Detener</button></div><label>Velocidad<select value={rate} onChange={(event) => { const nextRate = Number(event.target.value); setRate(nextRate); if (status !== 'idle') startReading(nextRate) }}><option value="0.8">Lenta · 0.8×</option><option value="0.9">Recomendada · 0.9×</option><option value="1">Normal · 1×</option><option value="1.1">Rápida · 1.1×</option></select></label></>}
    </div>
  if (embedded) return controls
  return <aside className={`page-reader ${open ? 'is-open' : ''}`} aria-label="Lector de esta página">
    {open && controls}
    <button type="button" className="page-reader__trigger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Cerrar lector de selección' : 'Escuchar texto seleccionado'}><span aria-hidden="true">🔊</span><i>Escuchar</i></button>
  </aside>
}

/** Buscador global disponible desde la cabecera de cualquier página. */
export function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  useEffect(() => { if (!open) setQuery('') }, [open])
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])
  if (!open) return null
  const normalized = query.trim().toLowerCase()
  const results = normalized ? SITE_SEARCH_ITEMS.filter((item) => `${item.title} ${item.description} ${item.section}`.toLowerCase().includes(normalized)) : SITE_SEARCH_ITEMS.slice(0, 6)
  return <div className="global-search" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section role="dialog" aria-modal="true" aria-label="Buscar en COOVITEL">
    <div className="global-search__heading"><div><p>BUSCADOR GLOBAL</p><h2>¿Qué necesitas encontrar?</h2></div><button type="button" onClick={onClose} aria-label="Cerrar búsqueda">×</button></div>
    <label><span className="sr-only">Buscar en COOVITEL</span><input autoFocus type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Productos, asistencias, beneficios o preguntas frecuentes..." /></label>
    <div className="global-search__results">{results.length ? results.map((item) => <a key={item.title} href={item.href} onClick={onClose}><span>{item.section}</span><strong>{item.title}</strong><p>{item.description}</p></a>) : <p className="global-search__empty">No encontramos resultados. Prueba con otra palabra.</p>}</div>
  </section></div>
}

type AccessibilityPreferences = {
  fontSize: 'normal' | 'large' | 'larger'
  darkMode: boolean
  contrast: boolean
  reduceMotion: boolean
  tahoma: boolean
  keyboardFocus: boolean
}

const accessibilityDefaults: AccessibilityPreferences = { fontSize: 'normal', darkMode: false, contrast: false, reduceMotion: false, tahoma: false, keyboardFocus: true }

function getAccessibilityPreferences(): AccessibilityPreferences {
  if (typeof window === 'undefined') return accessibilityDefaults
  try {
    const saved = JSON.parse(sessionStorage.getItem('coovitel-accessibility') ?? '{}')
    return { ...accessibilityDefaults, ...saved }
  } catch { return accessibilityDefaults }
}

/** Preferencias de accesibilidad. Se conservan en esta sesión, incluso al navegar o recargar. */
export function AccessibilityControls() {
  const [open, setOpen] = useState(false)
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(getAccessibilityPreferences)
  const { fontSize, darkMode, contrast, reduceMotion, tahoma, keyboardFocus } = preferences
  const updatePreference = <K extends keyof AccessibilityPreferences>(key: K, value: AccessibilityPreferences[K]) => setPreferences((current) => ({ ...current, [key]: value }))

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('accessibility-font-large', fontSize === 'large')
    root.classList.toggle('accessibility-font-larger', fontSize === 'larger')
    root.classList.toggle('accessibility-dark', darkMode)
    root.classList.toggle('accessibility-high-contrast', contrast)
    root.classList.toggle('accessibility-reduce-motion', reduceMotion)
    root.classList.toggle('accessibility-tahoma', tahoma)
    root.classList.toggle('accessibility-keyboard-focus', keyboardFocus)
    sessionStorage.setItem('coovitel-accessibility', JSON.stringify(preferences))
  }, [preferences])

  return <aside className={`accessibility-controls ${open ? 'is-open' : ''}`} aria-label="Accesibilidad">
    <button type="button" className="accessibility-controls__trigger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Opciones de accesibilidad"><span aria-hidden="true">A<small>a</small></span><span className="sr-only">Opciones de accesibilidad</span></button>
    {open && <div className="accessibility-controls__panel">
      <strong>Accesibilidad</strong><p>Tamaño de texto</p>
      <div className="accessibility-controls__sizes"><button type="button" className={fontSize === 'normal' ? 'is-active' : ''} onClick={() => updatePreference('fontSize', 'normal')}>A</button><button type="button" className={fontSize === 'large' ? 'is-active' : ''} onClick={() => updatePreference('fontSize', 'large')}>A+</button><button type="button" className={fontSize === 'larger' ? 'is-active' : ''} onClick={() => updatePreference('fontSize', 'larger')}>A++</button></div>
      <label><input type="checkbox" checked={darkMode} onChange={(event) => updatePreference('darkMode', event.target.checked)} /> Modo oscuro</label>
      <label><input type="checkbox" checked={contrast} onChange={(event) => updatePreference('contrast', event.target.checked)} /> Alto contraste</label>
      <label><input type="checkbox" checked={tahoma} onChange={(event) => updatePreference('tahoma', event.target.checked)} /> Usar fuente Tahoma</label>
      <label><input type="checkbox" checked={keyboardFocus} onChange={(event) => updatePreference('keyboardFocus', event.target.checked)} /> Resaltar navegación con teclado</label>
      <label><input type="checkbox" checked={reduceMotion} onChange={(event) => updatePreference('reduceMotion', event.target.checked)} /> Reducir animaciones</label>
      <PageReader embedded />
      <small className="accessibility-controls__session">Tus preferencias se conservan mientras esta sesión esté abierta.</small>
    </div>}
  </aside>
}

/** Acceso flotante a los tutoriales para aprender a usar las secciones del sitio. */
export function TutorialsButton() {
  return <a className="tutorials-button" href="/tutoriales" aria-label="Ver tutoriales de la página"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m10 8 5 3.1-5 3.1V8Z" fill="currentColor" /><path d="M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg><span>No sabes cómo hacerlo, mira los tutoriales</span></a>
}

/** Aviso visible en secciones con cifras, tarifas o condiciones que pueden cambiar. */
export function SensitiveInfoNotice({ page }: { page: string }) {
  if (!['productos', 'bienestar', 'documentos', 'actualidad'].includes(page)) return null
  return <aside className="sensitive-info-notice" role="note"><span aria-hidden="true">i</span><p><strong>Información sujeta a actualización.</strong> Verifica la vigencia de tasas, tarifas, límites, convenios, condiciones y horarios antes de realizar una solicitud.</p><a href="/actualidad">Ver novedades</a></aside>
}

/** Traducción de los identificadores internos de ruta a su nombre visible. */
const names: Record<string, string> = { productos: 'Productos', 'quienes-somos': 'Quiénes Somos', confianza: 'Confianza', bienestar: 'Bienestar', asociate: 'Asóciate', contacto: 'Contacto', documentos: 'Documentos', actualidad: 'Actualidad', tutoriales: 'Tutoriales', 'estamentos-directivos': 'Estamentos Directivos', normatividad: 'Normatividad', 'informacion-estrategica': 'Información Estratégica', '404': 'Página no encontrada' }

/** Miga de pan: se oculta en Inicio y muestra la ruta en las demás páginas. */
export function Breadcrumb({ page }: { page: string }) {
  if (page === 'home') return null
  return <nav className="site-breadcrumb" aria-label="Ruta de navegación"><a href="/">Inicio</a><span aria-hidden="true">/</span><span aria-current="page">{names[page] ?? page}</span></nav>
}
