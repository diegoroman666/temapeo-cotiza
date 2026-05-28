import { Crosshair, Calculator, Plane, MessageSquare, PlaneTakeoff, Cpu, Presentation } from 'lucide-react'

export default function HomeView({ navigateTo }) {
  return (
    <section className="animate-in">
      {/* Hero Section */}
      <div className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900 via-slate-900 to-slate-900"></div>
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(52, 211, 153, 0.15)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full mb-6 border border-emerald-500/30">
              <Crosshair className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide uppercase">Drones • Topografía • Agronomía</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-8">
              Traducimos tu terreno a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                decisiones exactas.
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              En <b>TeMapeo</b> capturamos la realidad con precisión milimétrica usando tecnología dron y la convertimos en reportes que optimizan tus recursos, agua y tiempo.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={() => navigateTo('simulator')}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-4 px-8 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center space-x-3 transition-all transform hover:scale-105"
              >
                <Calculator className="w-5 h-5" />
                <span>Calculadora de Servicios</span>
              </button>
              <button
                onClick={() => navigateTo('fleet')}
                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold py-4 px-8 rounded-xl flex items-center space-x-3 transition-all"
              >
                <Plane className="w-5 h-5" />
                <span>Ver Nuestra Flota</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* El Método Temapeo */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">¿Cómo trabajamos? El Método TeMapeo</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Una interacción transparente paso a paso, desde el primer contacto hasta que tomas la decisión basada en nuestros datos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-slate-100 z-0"></div>

            {[
              { icon: MessageSquare, title: '1. Contacto y Cotización', desc: 'Usas nuestra calculadora online o conversamos. Definimos el objetivo (topografía, vigor vegetal, volumen) y te enviamos la propuesta formal.' },
              { icon: PlaneTakeoff, title: '2. Vuelo y Terreno', desc: 'Desplegamos el dron adecuado (LiDAR, RGB o Multiespectral) y equipos GNSS en tu terreno para capturar los datos brutos con alta precisión.' },
              { icon: Cpu, title: '3. Procesamiento IA', desc: 'Traducimos miles de fotos en ortomosaicos, modelos 3D o mapas de salud vegetal usando software fotogramétrico de última generación.' },
              { icon: Presentation, title: '4. Entrega e Interpretación', desc: 'No te dejamos solo con un archivo pesado. Te entregamos un informe claro, acceso a nuestro Visor Web y una reunión de análisis de resultados.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-slate-50 border-4 border-white shadow-xl rounded-full flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-slate-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
