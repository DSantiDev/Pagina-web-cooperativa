import { useEffect, useState } from 'react'

/**
 * ───────────────────── ELEMENTOS GLOBALES DEL SITIO ───────────────────────
 *
 * Estos componentes aparecen en varias páginas. Aquí se administran el
 * cargador, redes sociales, botón de regreso, pagos CoviPay y migas de pan.
 * Si cambia un enlace de redes, WhatsApp o CoviPay, actualízalo en este archivo
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
export function SocialDock() {
  const [open, setOpen] = useState(false)
  return <aside className={`social-dock ${open ? 'is-open' : ''}`} aria-label="Redes sociales"><div className="social-dock__links"><a className="social--facebook" href="https://www.facebook.com/coovitelcol/" target="_blank" rel="noreferrer" aria-label="Facebook">f</a><a className="social--instagram" href="https://www.instagram.com/coovitel_oficial/" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a><a className="social--linkedin" href="https://co.linkedin.com/company/cooviteloficial" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a><a className="social--whatsapp" href="https://api.whatsapp.com/send/?phone=573160189853&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsAppIcon /></a></div><button className="social-dock__trigger" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Ocultar redes sociales" : "Mostrar redes sociales"}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.9 7.5-4.4M8.2 13.1l7.5 4.4"/></svg></button></aside>
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

/** Acceso global a CoviPay; modifica `href` si cambia la plataforma de pagos. */
export function CoviPayButton() {
  return <a className="covipay-button" href="https://coovitel.zolev.co/CentralPagos/Index" target="_blank" rel="noreferrer" aria-label="Conoce nuestros pagos con CoviPay"><img src="/images/coovipay-lateralderecho.png" alt="CoviPay" width="221" height="305" /><span>Conoce nuestros pagos</span></a>
}

/** Traducción de los identificadores internos de ruta a su nombre visible. */
const names: Record<string, string> = { productos: 'Productos', 'quienes-somos': 'Quiénes Somos', confianza: 'Confianza', bienestar: 'Bienestar', asociate: 'Asóciate', contacto: 'Contacto', 'estamentos-directivos': 'Estamentos Directivos', normatividad: 'Normatividad', 'informacion-estrategica': 'Información Estratégica', '404': 'Página no encontrada' }

/** Miga de pan: se oculta en Inicio y muestra la ruta en las demás páginas. */
export function Breadcrumb({ page }: { page: string }) {
  if (page === 'home') return null
  return <nav className="site-breadcrumb" aria-label="Ruta de navegación"><a href="/">Inicio</a><span aria-hidden="true">/</span><span aria-current="page">{names[page] ?? page}</span></nav>
}
