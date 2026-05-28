import { useState } from 'react'
import { Map, ArrowRight, Calculator, FileText, Send, CheckCircle2 } from 'lucide-react'

const CROPS = ['Cerezos', 'Paltos', 'Kiwis', 'Cítricos', 'Viñedo', 'Otro']

const FLIGHTS = [
  { name: 'Multiespectral', price: 22000, desc: 'Análisis NDVI, NDRE, Vigor vegetal.' },
  { name: 'Topográfico RTK', price: 18000, desc: 'Ortomosaicos de alta resolución visual.' },
  { name: 'LiDAR', price: 45000, desc: 'Penetración forestal, MDT exacto.' },
  { name: 'Termográfico', price: 25000, desc: 'Estrés hídrico, fugas térmicas.' },
]

const formatCLP = (n) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n)

export default function SimulatorView() {
  const [step, setStep] = useState(1)
  const [width, setWidth] = useState(200)
  const [length, setLength] = useState(300)
  const [cropType, setCropType] = useState('')
  const [numFlights, setNumFlights] = useState(4)
  const [flightType, setFlightType] = useState(null)
  const [results, setResults] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const hectares = (width * length) / 10000

  const progressWidth = ((step - 1) / 2) * 100

  const calculatePlan = async () => {
    try {
      const res = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          width: Number(width),
          length: Number(length),
          num_flights: Number(numFlights),
          price_per_ha: flightType.price,
        }),
      })
      const data = await res.json()
      setResults(data)
    } catch {
      const ha = hectares
      const timePerFlight = Math.round(ha * 4)
      const batteries = Math.max(1, Math.ceil(timePerFlight / 25))
      const totalCost = ha * flightType.price * numFlights
      setResults({ hectares: ha, time_per_flight: timePerFlight, batteries, total_cost: totalCost })
    }
    setStep(3)
  }

  const handleSubmitQuote = async (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const reset = () => {
    setStep(1)
    setCropType('')
    setFlightType(null)
    setResults(null)
    setSubmitted(false)
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10 slide-in">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Simulador de Hectáreas</h2>
        <p className="text-slate-600">Ingresa las dimensiones de tu predio y obtén un plan completo de vuelos, baterías y costos.</p>
      </div>

      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-12 relative slide-in px-4">
        <div className="absolute left-4 right-4 top-1/2 transform -translate-y-1/2 h-1 bg-slate-200 -z-10 rounded-full"></div>
        <div
          className="absolute left-4 top-1/2 transform -translate-y-1/2 h-1 bg-emerald-500 -z-10 rounded-full transition-all duration-500"
          style={{ width: `${progressWidth}%` }}
        ></div>
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 transition-colors duration-300 ${
              step >= n ? 'bg-emerald-500 border-emerald-100 text-white' : 'bg-slate-100 border-white text-slate-400'
            }`}
          >
            {n}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 slide-in">

        {/* STEP 1 */}
        {step === 1 && (
          <div className="animate-in">
            <h3 className="text-xl font-bold mb-6 text-slate-800">1. Dimensiones y Cultivo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Ancho del predio (metros)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Ej. 200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Largo del predio (metros)</label>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Ej. 300"
                />
              </div>
            </div>

            <div className="bg-emerald-50 text-emerald-800 text-sm font-bold px-4 py-2 rounded-lg inline-flex items-center mb-8 border border-emerald-100">
              <Map className="w-4 h-4 mr-2" /> Área calculada: {hectares.toFixed(2)} ha
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Tipo de cultivo</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {CROPS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCropType(c)}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-sm font-semibold ${
                      cropType === c
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 hover:border-emerald-300 text-slate-600'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                disabled={!cropType}
                onClick={() => setStep(2)}
                className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold flex items-center disabled:opacity-50 hover:bg-slate-800 transition-colors"
              >
                Continuar <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="animate-in">
            <h3 className="text-xl font-bold mb-6 text-slate-800">2. Frecuencia y Plan de Vuelo</h3>
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Vuelos por temporada</label>
              <input
                type="number"
                value={numFlights}
                onChange={(e) => setNumFlights(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 transition-colors font-bold text-lg"
              />
              <p className="text-xs text-slate-500 mt-2">Ej: Un vuelo mensual durante el período de mayor desarrollo fenológico.</p>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Tipo de vuelo</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FLIGHTS.map((f) => (
                  <button
                    key={f.name}
                    onClick={() => setFlightType(f)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-left ${
                      flightType?.name === f.name ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <span className="block font-bold text-slate-800">{f.name}</span>
                    <span className="block text-xs text-slate-500 mt-1">{f.desc}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={() => setStep(1)} className="text-slate-500 font-bold px-6 py-3 hover:text-slate-800">Volver</button>
              <button
                disabled={!flightType}
                onClick={calculatePlan}
                className="bg-emerald-500 text-slate-900 px-6 py-3 rounded-lg font-bold flex items-center hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                Calcular Plan <Calculator className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && results && (
          <div className="zoom-in">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Plan de Operación</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-200 shadow-sm">
                <p className="text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wider">Hectáreas totales</p>
                <p className="text-xl font-bold text-slate-800">{results.hectares.toFixed(2)} ha</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-200 shadow-sm">
                <p className="text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wider">Tiempo por vuelo</p>
                <p className="text-xl font-bold text-slate-800">{results.time_per_flight} min</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-200 shadow-sm md:col-span-1 col-span-2">
                <p className="text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wider">Baterías por vuelo</p>
                <p className="text-xl font-bold text-slate-800">{results.batteries}</p>
              </div>
              <div className="bg-emerald-50 p-6 rounded-xl text-center border border-emerald-200 col-span-2 md:col-span-3 shadow-md mt-2">
                <p className="text-sm text-emerald-800 font-bold mb-2 uppercase tracking-wider">Inversión estimada anual</p>
                <p className="text-4xl font-extrabold text-emerald-600 mb-2">{formatCLP(results.total_cost)} CLP</p>
                <p className="text-xs text-emerald-700 font-medium bg-emerald-100 inline-block px-3 py-1 rounded-full">Referencial. Cotización final personalizada.</p>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-8 mt-4">
              <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center justify-center">
                <FileText className="w-5 h-5 text-emerald-500 mr-2" /> Cotizar este plan
              </h4>

              {!submitted ? (
                <form onSubmit={handleSubmitQuote} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Completo</label>
                      <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:border-emerald-500 transition-colors" placeholder="Ej. Juan Pérez" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Empresa / Campo</label>
                      <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:border-emerald-500 transition-colors" placeholder="Nombre de la empresa" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono (WhatsApp)</label>
                      <input type="tel" required className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:border-emerald-500 transition-colors" placeholder="+56 9 ..." />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico</label>
                      <input type="email" required className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:border-emerald-500 transition-colors" placeholder="correo@empresa.com" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-6">
                    <button type="button" onClick={() => setStep(2)} className="text-slate-500 text-sm font-bold hover:text-slate-800">Reconfigurar Plan</button>
                    <button type="submit" className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold flex items-center hover:bg-slate-800 transition-colors shadow-lg">
                      Enviar Solicitud <Send className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8 bg-emerald-50 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-slate-900">¡Solicitud Enviada!</h4>
                  <p className="text-emerald-700 mt-2">Un ingeniero de TeMapeo te contactará con la propuesta final.</p>
                  <button onClick={reset} className="mt-6 text-slate-500 text-sm underline hover:text-slate-800 font-bold">Hacer un nuevo cálculo</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
