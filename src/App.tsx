import Asociate from './pages/Asociate'
import Bienestar from './pages/Bienestar'
import Confianza from './pages/Confianza'
import Contacto from './pages/Contacto'
import Documentos from './pages/Documentos'
import Home from './pages/Home'
import Institucional from './pages/Institucional'
import NotFound from './pages/NotFound'
import Actualidad from './pages/Actualidad'
import Productos from './pages/Productos'
import QuienesSomos from './pages/QuienesSomos'
import SiteLayout from './components/SiteLayout'
import Tutoriales from './pages/Tutoriales'

const pages = {
  '/': { component: Home, name: 'home' },
  '/asociate': { component: Asociate, name: 'asociate' },
  '/bienestar': { component: Bienestar, name: 'bienestar' },
  '/confianza': { component: Confianza, name: 'confianza' },
  '/contacto': { component: Contacto, name: 'contacto' },
  '/documentos': { component: Documentos, name: 'documentos' },
  '/actualidad': { component: Actualidad, name: 'actualidad' },
  '/tutoriales': { component: Tutoriales, name: 'tutoriales' },
  '/productos': { component: Productos, name: 'productos' },
  '/quienes-somos': { component: QuienesSomos, name: 'quienes-somos' },
  '/estamentos-directivos': { component: () => <Institucional type="estamentos" />, name: 'estamentos-directivos' },
  '/normatividad': { component: () => <Institucional type="normatividad" />, name: 'normatividad' },
  '/informacion-estrategica': { component: () => <Institucional type="estrategica" />, name: 'informacion-estrategica' },
  '/404': { component: NotFound, name: '404' },
} as const

export default function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
  const selected = pages[currentPath as keyof typeof pages] ?? pages['/404']
  const Page = selected.component

  return <SiteLayout page={selected.name}><Page /></SiteLayout>
}
