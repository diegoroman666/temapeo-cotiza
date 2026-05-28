import { MapPin, Calculator } from 'lucide-react'

export default function Navbar({ navigateTo }) {
  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div
            className="flex items-center cursor-pointer space-x-2"
            onClick={() => navigateTo('home')}
          >
            <div className="bg-emerald-500 p-2 rounded-lg">
              <MapPin className="text-slate-900 w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight">TeMapeo</span>
          </div>

          <div className="hidden md:flex space-x-6 lg:space-x-8 text-sm font-medium">
            <button onClick={() => navigateTo('home')} className="hover:text-emerald-400 transition-colors">Inicio</button>
            <button onClick={() => navigateTo('fleet')} className="hover:text-emerald-400 transition-colors">Equipos y Flota</button>
            <button onClick={() => navigateTo('simulator')} className="hover:text-emerald-400 transition-colors flex items-center">
              <Calculator className="w-4 h-4 mr-1" /> Calculadora
            </button>
            <button onClick={() => navigateTo('dashboard')} className="hover:text-emerald-400 transition-colors">Visor GIS</button>
            <button onClick={() => navigateTo('academy')} className="hover:text-emerald-400 transition-colors">Academia</button>
            <button onClick={() => navigateTo('about')} className="hover:text-emerald-400 transition-colors">Nosotros</button>
          </div>

          <div className="hidden sm:block">
            <button
              onClick={() => navigateTo('simulator')}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2 shadow-lg shadow-emerald-500/20"
            >
              <span>Cotizar Ahora</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
