import { Plane, Satellite, Check, ArrowRight, ScanLine, Thermometer, MapPin, Globe2 } from 'lucide-react'

const drones = [
  {
    badge: 'Visual RGB',
    badgeClass: 'bg-blue-100 text-blue-800',
    img: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&q=80',
    imgClass: 'mix-blend-multiply opacity-80',
    title: 'Dron Fotogramétrico RGB',
    subtitle: 'Ej: Serie Mavic Enterprise / Phantom 4 RTK',
    desc: 'Captura imágenes de alta resolución en el espectro visible (lo que ve el ojo humano) pero georreferenciadas con precisión RTK.',
    services: ['Ortomosaicos de alta resolución', 'Topografía a cielo abierto (sin bosque)', 'Control de avance de obras 3D'],
  },
  {
    badge: 'Multiespectral',
    badgeClass: 'bg-emerald-100 text-emerald-800',
    img: 'https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=500&q=80',
    imgClass: 'mix-blend-multiply opacity-80 filter sepia-[.3] hue-rotate-90',
    title: 'Dron Multiespectral',
    subtitle: 'Ej: Mavic 3 Multispectral / P4 Multispectral',
    desc: 'Ve más allá del ojo humano (Infrarrojo cercano, Red Edge) para detectar la actividad fotosintética y el vigor de las plantas.',
    services: ['Agricultura de Precisión', 'Mapas de Índices (NDVI, NDRE)', 'Conteo de plantas y fallas'],
  },
]

export default function FleetView() {
  return (
    <section className="bg-slate-50 pb-24 animate-in">
      <div className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4">Nuestra Flota Tecnológica</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">No existe un dron mágico para todo. En TeMapeo asignamos el sensor exacto según el servicio que tu proyecto necesita.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
          <Plane className="text-emerald-500 mr-2" /> Captura Aérea (Drones)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {drones.map((d) => (
            <div key={d.title} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col">
              <div className="h-40 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                <div className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded ${d.badgeClass}`}>{d.badge}</div>
                <img src={d.img} alt={d.title} className={`w-full h-full object-cover ${d.imgClass}`} />
              </div>
              <div className="p-6 flex-grow">
                <h4 className="text-lg font-bold mb-1">{d.title}</h4>
                <p className="text-xs text-slate-400 mb-4 font-mono">{d.subtitle}</p>
                <p className="text-sm text-slate-600 mb-4">{d.desc}</p>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase">Servicios asociados:</span>
                  <ul className="mt-2 text-sm text-slate-700 space-y-1">
                    {d.services.map((s) => (
                      <li key={s} className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-500 mr-1 shrink-0" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {/* LiDAR Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col">
            <div className="h-40 bg-slate-100 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded">Láser LiDAR</div>
              <div className="w-full h-full bg-slate-900 flex items-center justify-center relative">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #a855f7 1px, transparent 1px)', backgroundSize: '10px 10px', opacity: 0.5 }}></div>
                <ScanLine className="text-purple-400 w-16 h-16 z-10" />
              </div>
            </div>
            <div className="p-6 flex-grow">
              <h4 className="text-lg font-bold mb-1">Dron con Sensor LiDAR</h4>
              <p className="text-xs text-slate-400 mb-4 font-mono">Ej: Matrice 350 RTK + Zenmuse L2</p>
              <p className="text-sm text-slate-600 mb-4">Emite millones de pulsos láser que penetran la vegetación para medir directamente la superficie del suelo bajo los árboles.</p>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase">Servicios asociados:</span>
                <ul className="mt-2 text-sm text-slate-700 space-y-1">
                  {['Topografía bajo vegetación densa', 'Modelos Digitales de Terreno (MDT)', 'Inventario Forestal (Altura de dosel)'].map(s => (
                    <li key={s} className="flex items-center"><Check className="w-4 h-4 text-emerald-500 mr-1 shrink-0" /> {s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Thermal Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col">
            <div className="h-40 bg-slate-100 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded">Radiométrico</div>
              <div className="w-full h-full bg-gradient-to-tr from-blue-700 via-yellow-500 to-red-600 flex items-center justify-center opacity-80">
                <Thermometer className="text-white w-16 h-16 drop-shadow-md" />
              </div>
            </div>
            <div className="p-6 flex-grow">
              <h4 className="text-lg font-bold mb-1">Dron Térmico</h4>
              <p className="text-xs text-slate-400 mb-4 font-mono">Ej: Mavic 3 Thermal / Zenmuse H20T</p>
              <p className="text-sm text-slate-600 mb-4">Captura firmas de calor con precisión radiométrica. Ideal para inspecciones industriales y análisis de humedad en cultivos.</p>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase">Servicios asociados:</span>
                <ul className="mt-2 text-sm text-slate-700 space-y-1">
                  {['Inspección de Plantas Solares', 'Estrés hídrico en agricultura', 'Fugas térmicas en construcción'].map(s => (
                    <li key={s} className="flex items-center"><Check className="w-4 h-4 text-emerald-500 mr-1 shrink-0" /> {s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Non-Drone Services */}
        <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center mt-12">
          <Satellite className="text-blue-500 mr-2" /> Servicios sin Drones (Topografía y Satélite)
        </h3>
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <p className="text-slate-600 mb-8">Sabemos que el dron no siempre es la herramienta adecuada. Si hay restricciones de vuelo, zonas urbanas densas, o necesitas certificados legales específicos, TeMapeo ofrece servicios tradicionales y satelitales.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex">
              <div className="bg-slate-100 p-4 rounded-xl mr-4 h-fit">
                <MapPin className="w-8 h-8 text-slate-700" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Topografía Terrestre (GNSS / Estación Total)</h4>
                <p className="text-sm text-slate-600 mb-3">Medición de puntos exactos en el terreno utilizando receptores satelitales de grado topográfico (Rover RTK/PPK) y estaciones totales.</p>
                <ul className="text-sm text-slate-700 space-y-1">
                  {[
                    ['Subdivisiones y Loteos:', 'Planos certificados para inscripción en Bienes Nacionales o CBR.'],
                    ['Replanteo de Obras:', 'Marcar en terreno dónde construir según los planos arquitectónicos.'],
                    ['Puntos de Control Fotogramétrico (GCP):', 'Apoyo terrestre necesario para calibrar y certificar los vuelos de nuestros drones.'],
                  ].map(([bold, rest]) => (
                    <li key={bold} className="flex">
                      <ArrowRight className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" />
                      <span><b>{bold}</b> {rest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex">
              <div className="bg-slate-100 p-4 rounded-xl mr-4 h-fit">
                <Globe2 className="w-8 h-8 text-slate-700" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Monitoreo Satelital</h4>
                <p className="text-sm text-slate-600 mb-3">Adquisición y procesamiento de imágenes de constelaciones satelitales (Sentinel, Planet, Maxar) para proyectos de escala macro.</p>
                <ul className="text-sm text-slate-700 space-y-1">
                  {[
                    ['Histórico de Vigor Vegetal:', 'Ver cómo se ha comportado un campo en los últimos 3 años antes de comprarlo.'],
                    ['Monitoreo Macro:', 'Análisis de cuencas hídricas o grandes extensiones forestales (>5.000 ha) donde el dron no es costo-eficiente.'],
                  ].map(([bold, rest]) => (
                    <li key={bold} className="flex">
                      <ArrowRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5 shrink-0" />
                      <span><b>{bold}</b> {rest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
