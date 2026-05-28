import { useState, useEffect } from 'react'
import {
  Monitor, Image, Leaf, Layers, Flame,
  ChevronLeft, ChevronRight, Maximize2, X, Loader2, ImageOff,
} from 'lucide-react'
import { GIS_LAYERS } from '../data/gisLayers'

const ICONS = { image: Image, leaf: Leaf, layers: Layers, flame: Flame }

export default function DashboardView() {
  const [activeId, setActiveId] = useState('rgb')
  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [lightbox, setLightbox] = useState(false)

  const layer = GIS_LAYERS.find((l) => l.id === activeId)
  const items = layer.items
  const current = items[index] || null
  const hasItems = items.length > 0

  // Al cambiar de capa, reinicia índice y estado de carga
  const selectLayer = (id) => {
    setActiveId(id)
    setIndex(0)
    setLoaded(false)
    setLightbox(false)
  }

  const goTo = (i) => {
    if (!hasItems) return
    const n = (i + items.length) % items.length
    setIndex(n)
    setLoaded(false)
  }

  // Navegación con teclado dentro del visor / lightbox
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false)
      if (!hasItems) return
      if (e.key === 'ArrowRight') goTo(index + 1)
      if (e.key === 'ArrowLeft') goTo(index - 1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, hasItems]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="h-[calc(100vh-64px)] flex flex-col md:flex-row bg-slate-900 text-white overflow-hidden animate-in">
      {/* ===== Sidebar ===== */}
      <div className="w-full md:w-80 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col z-20 shadow-2xl shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold flex items-center">
            <Monitor className="text-emerald-500 w-6 h-6 mr-2" /> Visor GIS TeMapeo
          </h2>
          <p className="text-xs text-slate-400 mt-1">Entregables reales por tipo de capa</p>
        </div>

        <div className="p-4 md:p-6 flex-1 overflow-y-auto">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Capas de datos</h3>
          <div className="space-y-3">
            {GIS_LAYERS.map((l) => {
              const Icon = ICONS[l.iconKey]
              const isActive = activeId === l.id
              return (
                <button
                  key={l.id}
                  onClick={() => selectLayer(l.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                    isActive ? 'bg-slate-800 border-slate-600' : 'bg-transparent border-transparent hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`${l.accent} p-2 rounded text-white`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="block text-sm font-semibold">{l.label}</span>
                      <span className="block text-[0.7rem] text-slate-500">
                        {l.items.length > 0 ? `${l.items.length} imagen${l.items.length > 1 ? 'es' : ''}` : 'Sin muestras'}
                      </span>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${isActive ? `bg-emerald-500 ${l.ring}` : 'bg-slate-700'}`}></div>
                </button>
              )
            })}
          </div>

          <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-xl p-4">
            <p className="text-xs text-slate-400 leading-relaxed">
              Imágenes obtenidas de la galería de <span className="text-emerald-400 font-semibold">temapeo.com</span>.
              Selecciona una capa y usa las flechas o las miniaturas para recorrer los entregables.
            </p>
          </div>
        </div>
      </div>

      {/* ===== Map / Viewer Area ===== */}
      <div className="flex-1 relative bg-slate-950 flex flex-col overflow-hidden">
        {hasItems ? (
          <>
            {/* Visor principal */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                </div>
              )}

              <img
                key={current.src}
                src={current.src}
                alt={current.title}
                onLoad={() => setLoaded(true)}
                className={`max-w-full max-h-full object-contain transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              />

              {/* Badge de capa */}
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700 px-4 py-2 rounded-lg text-sm shadow-xl z-20">
                <span className={`font-bold uppercase tracking-wider ${layer.text}`}>{layer.name}</span>
              </div>

              {/* Botón pantalla completa */}
              <button
                onClick={() => setLightbox(true)}
                className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur border border-slate-700 p-2 rounded-lg hover:bg-slate-800 transition-colors z-20"
                title="Ver en pantalla completa"
              >
                <Maximize2 className="w-5 h-5 text-slate-200" />
              </button>

              {/* Flechas */}
              {items.length > 1 && (
                <>
                  <button
                    onClick={() => goTo(index - 1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-900/70 hover:bg-emerald-600 border border-slate-700 p-2 rounded-full transition-colors z-20"
                    title="Anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => goTo(index + 1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900/70 hover:bg-emerald-600 border border-slate-700 p-2 rounded-full transition-colors z-20"
                    title="Siguiente"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Pie con descripción */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-5 pt-12 z-20">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{current.title}</h3>
                    <p className="text-sm text-slate-300 max-w-2xl">{current.desc}</p>
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700 shrink-0">
                    {index + 1} / {items.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Tira de miniaturas */}
            {items.length > 1 && (
              <div className="bg-slate-900 border-t border-slate-800 p-3 flex gap-3 overflow-x-auto no-scrollbar shrink-0">
                {items.map((it, i) => (
                  <button
                    key={it.thumb}
                    onClick={() => goTo(i)}
                    className={`relative h-16 w-24 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      i === index ? 'border-emerald-500 scale-105' : 'border-slate-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={it.thumb} alt={it.title} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          /* Estado vacío (p.ej. Térmico sin muestras) */
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <ImageOff className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-2">Aún no hay muestras de {layer.label}</h3>
              <p className="text-slate-400 text-sm">
                Todavía no publicamos imágenes de esta capa en la galería. Escríbenos si necesitas un levantamiento
                {layer.id === 'thermal' ? ' termográfico' : ''} para tu campo.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ===== Lightbox ===== */}
      {lightbox && current && (
        <div
          className="fixed inset-0 z-[120] bg-black/95 flex items-center justify-center p-4 animate-in"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-5 right-5 text-white/70 hover:text-white z-10"
            aria-label="Cerrar"
          >
            <X className="w-8 h-8" />
          </button>

          {items.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goTo(index - 1) }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goTo(index + 1) }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </>
          )}

          <figure className="max-w-6xl max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img src={current.full} alt={current.title} className="max-w-full max-h-[80vh] object-contain rounded-lg" />
            <figcaption className="mt-4 text-center">
              <p className="text-white font-bold">{current.title}</p>
              <p className="text-slate-400 text-sm max-w-2xl">{current.desc}</p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
