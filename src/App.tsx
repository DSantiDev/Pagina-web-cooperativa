import Asociate from './pages/Asociate'
import Beneficios from './pages/Beneficios'
import Confianza from './pages/Confianza'
import Home from './pages/Home'
import Productos from './pages/Productos'
import QuienesSomos from './pages/QuienesSomos'
import SiteLayout from './components/SiteLayout'

const pages = {
  '/': { component: Home, name: 'home' },
  '/asociate': { component: Asociate, name: 'asociate' },
  '/beneficios': { component: Beneficios, name: 'beneficios' },
  '/confianza': { component: Confianza, name: 'confianza' },
  '/productos': { component: Productos, name: 'productos' },
  '/quienes-somos': { component: QuienesSomos, name: 'quienes-somos' },
} as const

export default function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
  const selected = pages[currentPath as keyof typeof pages] ?? pages['/']
  const Page = selected.component

  return <SiteLayout page={selected.name}><Page /></SiteLayout>
}
