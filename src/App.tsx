import Asociate from './pages/Asociate'
import Beneficios from './pages/Beneficios'
import Confianza from './pages/Confianza'
import Home from './pages/Home'
import Productos from './pages/Productos'
import QuienesSomos from './pages/QuienesSomos'

const pages = {
  '/': Home,
  '/asociate': Asociate,
  '/beneficios': Beneficios,
  '/confianza': Confianza,
  '/productos': Productos,
  '/quienes-somos': QuienesSomos,
} as const

export default function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
  const Page = pages[currentPath as keyof typeof pages] ?? Productos

  return <Page />
}
