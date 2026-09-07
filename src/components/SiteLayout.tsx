import { type ReactNode, useEffect, useState } from 'react'

const links = [
  { href: '/', label: 'Inicio' }, { href: '/productos', label: 'Productos' }, { href: '/quienes-somos', label: 'Quiénes Somos' }, { href: '/confianza', label: 'Confianza' }, { href: '/beneficios', label: 'Beneficios' }, { href: '/#contacto', label: 'Contacto' },
]

function SiteHeader({ isHome }: { isHome: boolean }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 12); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
  const solid = !isHome || scrolled || open
  return <header className={`site-header ${solid ? 'is-solid' : 'is-transparent'}`}><div className="site-header__inner"><a className="site-brand" href="/" aria-label="COOVITEL - Inicio"><img src="/images/logo-coovitel.png" alt="COOVITEL" /></a><nav className="site-nav" aria-label="Navegación principal">{links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}<a className="site-nav__virtual" href="https://coovitel.coop/oficina-virtual" target="_blank" rel="noreferrer">Oficina Virtual</a><a className="site-nav__associate" href="/asociate">Asóciate</a></nav><button className="site-menu-button" aria-expanded={open} aria-label="Abrir menú" onClick={() => setOpen(!open)}>☰</button></div>{open && <nav className="site-nav-mobile" aria-label="Navegación móvil">{links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}<a href="/asociate">Asóciate</a><a href="https://coovitel.coop/oficina-virtual" target="_blank" rel="noreferrer">Oficina Virtual</a></nav>}</header>
}

function SiteFooter() {
  return <footer className="site-footer"><div className="site-footer__inner"><div><p className="site-footer__brand">COOVITEL</p><p>Cooperativa Empresarial de Ahorro y Crédito.</p></div><nav aria-label="Enlaces del pie">{links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</nav></div><p className="site-footer__copy">© 2026 COOVITEL · Vigilada por Supersolidaria</p></footer>
}

export default function SiteLayout({ page, children }: { page: string; children: ReactNode }) {
  return <div className={`site-shell page--${page}`}><SiteHeader isHome={page === 'home'} /><main className="site-content">{children}</main><SiteFooter /></div>
}
