import { type ReactNode, useEffect, useState } from 'react'
import { Breadcrumb, CoviPayButton, InstagramIcon, PageLoader, ScrollTop, SocialDock, WhatsAppIcon } from './GlobalWidgets'
import { getCurrentYear } from '../lib/brand'

const links = [
  { href: '/', label: 'Inicio' }, { href: '/productos', label: 'Productos' }, { href: '/quienes-somos', label: 'Quiénes Somos' }, { href: '/confianza', label: 'Confianza' }, { href: '/beneficios', label: 'Bienestar' }, { href: '/contacto', label: 'Contacto' },
]

const pageMetadata: Record<string, { title: string; description: string }> = {
  home: { title: 'COOVITEL | Cooperativa Empresarial de Ahorro y Crédito', description: 'Productos financieros, bienestar y beneficios para los asociados de COOVITEL.' },
  productos: { title: 'Productos financieros | COOVITEL', description: 'Conoce los productos de crédito, ahorro y CDAT de COOVITEL.' },
  'quienes-somos': { title: 'Quiénes somos | COOVITEL', description: 'Conoce la historia, propósito y equipo de COOVITEL.' },
  confianza: { title: 'Confianza y seguridad | COOVITEL', description: 'Información institucional, seguridad y transparencia de COOVITEL.' },
  bienestar: { title: 'Bienestar y asistencias | COOVITEL', description: 'Beneficios, auxilios y asistencias para asociados COOVITEL.' },
  asociate: { title: 'Asóciate | COOVITEL', description: 'Inicia tu proceso de afiliación a COOVITEL.' },
  contacto: { title: 'Contacto | COOVITEL', description: 'Canales de atención, oficinas y formulario de contacto de COOVITEL.' },
  'estamentos-directivos': { title: 'Estamentos directivos | COOVITEL', description: 'Consulta los estamentos directivos de COOVITEL.' },
  normatividad: { title: 'Normatividad | COOVITEL', description: 'Consulta la normatividad institucional de COOVITEL.' },
  'informacion-estrategica': { title: 'Información estratégica | COOVITEL', description: 'Consulta la información estratégica de COOVITEL.' },
  '404': { title: 'Página no encontrada | COOVITEL', description: 'La página solicitada no está disponible.' },
}

function SiteHeader({ isHome }: { isHome: boolean }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 12); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
  const solid = !isHome || scrolled || open
  return <header className={`site-header ${solid ? 'is-solid' : 'is-transparent'}`}><div className="site-header__inner"><a className="site-brand" href="/" aria-label="COOVITEL - Inicio"><img src="/images/logo-coovitel-nuevo.png" alt="COOVITEL" width="1900" height="600" /></a><nav className="site-nav" aria-label="Navegación principal">{links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}<a className="site-nav__covipay" href="https://coovitel.zolev.co/CentralPagos/Index" target="_blank" rel="noreferrer">CoviPay</a><a className="site-nav__virtual" href="https://odin.selsacloud.com/linix/v7/8e273b00-cfc0-48eb-bcff-10ba62e64fe5/servicio/identidad/autenticar/gui/autenticacion-gui/ingresousuario" target="_blank" rel="noreferrer">Oficina Virtual</a><a className="site-nav__associate" href="/asociate">Asóciate</a></nav><button type="button" className="site-menu-button" aria-expanded={open} aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)}>☰</button></div>{open && <nav className="site-nav-mobile" aria-label="Navegación móvil">{links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}<a href="https://coovitel.zolev.co/CentralPagos/Index" target="_blank" rel="noreferrer">CoviPay</a><a href="/asociate">Asóciate</a><a href="https://odin.selsacloud.com/linix/v7/8e273b00-cfc0-48eb-bcff-10ba62e64fe5/servicio/identidad/autenticar/gui/autenticacion-gui/ingresousuario" target="_blank" rel="noreferrer">Oficina Virtual</a></nav>}</header>
}

function SiteFooter() {
  return <footer className="site-footer"><div className="site-footer__inner site-footer__grid"><div className="site-footer__about"><a className="site-footer__logo-link" href="/" aria-label="Volver al inicio"><img className="site-footer__logo" src="/images/logo-coovitel-nuevo.png" alt="COOVITEL" width="1900" height="600" /></a><p>Cooperativa Empresarial de Ahorro y Crédito. Construimos bienestar financiero con solidaridad y transparencia.</p><div className="site-footer__social"><a className="social--facebook" href="https://www.facebook.com/coovitelcol/" target="_blank" rel="noreferrer" aria-label="Facebook">f</a><a className="social--instagram" href="https://www.instagram.com/coovitel_oficial/" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a><a className="social--linkedin" href="https://co.linkedin.com/company/cooviteloficial" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a><a className="social--whatsapp" href="https://api.whatsapp.com/send/?phone=573160189853&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsAppIcon /></a></div></div><div><p className="site-footer__title">Productos</p><nav aria-label="Productos"><a href="/productos?producto=educacion">Educación</a><a href="/productos?producto=fidelizacion">Fidelización</a><a href="/productos?producto=compra-cartera">Compra de Cartera</a><a href="/productos?producto=cdat">CDAT</a></nav></div><div><p className="site-footer__title">Institucional</p><nav aria-label="Institucional"><a href="/quienes-somos">Quiénes Somos</a><a href="/estamentos-directivos">Estamentos Directivos</a><a href="/normatividad">Normatividad</a><a href="/informacion-estrategica">Información Estratégica</a><a href="/quienes-somos?section=trabaja">Trabaja con nosotros</a></nav></div><div><p className="site-footer__title">Atención</p><nav aria-label="Atención"><a href="/asociate">Asóciate</a><a href="https://odin.selsacloud.com/linix/v7/8e273b00-cfc0-48eb-bcff-10ba62e64fe5/servicio/identidad/autenticar/gui/autenticacion-gui/ingresousuario" target="_blank" rel="noreferrer">Oficina Virtual</a><a className="footer-whatsapp" href="https://api.whatsapp.com/send/?phone=573160189853&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp</a></nav></div></div><p className="site-footer__copy">© {getCurrentYear()} COOVITEL · Cooperativa Empresarial de Ahorro y Crédito · Vigilada por Supersolidaria</p></footer>
}

export default function SiteLayout({ page, children }: { page: string; children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 350)
    const metadata = pageMetadata[page] ?? pageMetadata['404']
    document.title = metadata.title
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    description?.setAttribute('content', metadata.description)
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    canonical?.setAttribute('href', new URL(window.location.pathname, window.location.origin).toString())
    return () => window.clearTimeout(timer)
  }, [page])
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".site-content > section, .site-content > div > section"))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("is-revealed")
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.08, rootMargin: "0px 0px -5%" })
    sections.forEach((section, index) => {
      section.classList.add("site-reveal")
      section.style.setProperty("--reveal-delay", `${Math.min(index * 45, 180)}ms`)
      observer.observe(section)
    })
    return () => observer.disconnect()
  }, [page])
  return <div className={`site-shell page--${page}`}><a className="skip-link" href="#main-content">Saltar al contenido principal</a><PageLoader visible={loading} /><SiteHeader isHome={page === 'home'} /><Breadcrumb page={page} /><main id="main-content" className="site-content" tabIndex={-1}>{children}</main><SiteFooter /><SocialDock /><ScrollTop /><CoviPayButton /></div>
}
