import { MapPin } from 'lucide-react'

export default function Footer({ navigateTo }) {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="text-emerald-500 w-6 h-6" />
            <span className="font-extrabold text-xl text-white tracking-tight">TeMapeo</span>
          </div>
          <p className="text-sm">Inteligencia geoespacial, drones y topografía para decisiones exactas y rentables.</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Divisiones</h4>
          <ul className="space-y-2 text-sm">
            <li>Agrícola / Forestal (Multiespectral/LiDAR)</li>
            <li>Ingeniería / Obras (RGB/Térmico)</li>
            <li>Topografía Legal (GNSS RTK)</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Plataforma</h4>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer hover:text-emerald-400" onClick={() => navigateTo('simulator')}>Calculadora de Presupuesto</li>
            <li className="cursor-pointer hover:text-emerald-400" onClick={() => navigateTo('fleet')}>Catálogo de Equipos</li>
            <li className="cursor-pointer hover:text-emerald-400" onClick={() => navigateTo('academy')}>Curso Gratuito (Academia)</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contacto Directo</h4>
          <button
            onClick={() => navigateTo('simulator')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold w-full py-2 rounded-lg transition-colors text-sm mb-2"
          >
            Solicitar Cotización
          </button>
          <p className="text-xs text-slate-500 text-center">contacto@temapeo.cl</p>
        </div>
      </div>
    </footer>
  )
}
