import { useState } from 'react'
import { MapPin, Calculator, Menu, X } from 'lucide-react'

const LINKS = [
  { id: 'home', label: 'Inicio' },
  { id: 'fleet', label: 'Equipos y Flota' },
  { id: 'simulator', label: 'Calculadora', icon: Calculator },
  { id: 'dashboard', label: 'Visor GIS' },
  { id: 'academy', label: 'Academia' },
  { id: 'about', label: 'Nosotros' },
]

export default function Navbar({ navigateTo }) {
  const [open, setOpen] = useState(false)

  const go = (id) => {
    navigateTo(id)
    setOpen(false)
  }

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer space-x-2" onClick={() => go('home')}>
            <div className="bg-emerald-500 p-2 rounded-lg">
              <MapPin className="text-slate-900 w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight">TeMapeo</span>
          </div>

          {/* Links de escritorio */}
          <div className="hidden md:flex space-x-6 lg:space-x-8 text-sm font-medium">
            {LINKS.map((l) => {
              const Icon = l.icon
              return (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="hover:text-emerald-400 transition-colors flex items-center"
                >
                  {Icon && <Icon className="w-4 h-4 mr-1" />} {l.label}
                </button>
              )
            })}
          </div>

          {/* CTA escritorio */}
          <div className="hidden md:block">
            <button
              onClick={() => go('simulator')}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2 shadow-lg shadow-emerald-500/20"
            >
              <span>Cotizar Ahora</span>
            </button>
          </div>

          {/* Botón hamburguesa (móvil) */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Panel desplegable (móvil) */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden border-t border-slate-800 transition-[max-height] duration-300 ease-in-out ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-3 space-y-1">
          {LINKS.map((l) => {
            const Icon = l.icon
            return (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="w-full text-left flex items-center px-3 py-3 rounded-lg text-base font-medium hover:bg-slate-800 hover:text-emerald-400 transition-colors"
              >
                {Icon && <Icon className="w-5 h-5 mr-2" />} {l.label}
              </button>
            )
          })}
          <button
            onClick={() => go('simulator')}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center mt-2 shadow-lg shadow-emerald-500/20"
          >
            Cotizar Ahora
          </button>
        </div>
      </div>
    </nav>
  )
}
