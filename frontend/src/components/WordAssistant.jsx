import { useEffect, useState, useCallback } from 'react'
import { Sparkles, X, BookOpen, Search } from 'lucide-react'
import { lookupTerms } from '../data/glossary'

export default function WordAssistant() {
  const [btn, setBtn] = useState(null) // { x, y, text } posición del botón flotante
  const [modal, setModal] = useState(null) // { text, results }

  // Detecta la selección de texto del usuario
  const handleSelection = useCallback(() => {
    const sel = window.getSelection()
    const text = sel ? sel.toString().trim() : ''

    // Ignora selecciones vacías, demasiado largas o dentro de campos de formulario
    if (!text || text.length < 2 || text.length > 80) {
      setBtn(null)
      return
    }
    const anchor = sel.anchorNode
    const el = anchor && (anchor.nodeType === 3 ? anchor.parentElement : anchor)
    if (el && el.closest('input, textarea, [contenteditable="true"], .word-assistant-ui')) {
      setBtn(null)
      return
    }

    try {
      const rect = sel.getRangeAt(0).getBoundingClientRect()
      if (rect.width === 0 && rect.height === 0) {
        setBtn(null)
        return
      }
      setBtn({
        x: rect.left + rect.width / 2,
        y: rect.top,
        text,
      })
    } catch {
      setBtn(null)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mouseup', handleSelection)
    document.addEventListener('touchend', handleSelection)
    const hideOnScroll = () => setBtn(null)
    window.addEventListener('scroll', hideOnScroll, true)
    window.addEventListener('resize', hideOnScroll)
    return () => {
      document.removeEventListener('mouseup', handleSelection)
      document.removeEventListener('touchend', handleSelection)
      window.removeEventListener('scroll', hideOnScroll, true)
      window.removeEventListener('resize', hideOnScroll)
    }
  }, [handleSelection])

  // Cierra el modal con Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setModal(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const openModal = () => {
    if (!btn) return
    const results = lookupTerms(btn.text)
    setModal({ text: btn.text, results })
    setBtn(null)
    // Limpia la selección para que el botón no reaparezca
    window.getSelection()?.removeAllRanges()
  }

  return (
    <>
      {/* Botón flotante que aparece al seleccionar texto */}
      {btn && (
        <button
          onMouseDown={(e) => e.preventDefault()} // evita perder la selección
          onClick={openModal}
          className="word-assistant-ui fixed z-[100] -translate-x-1/2 -translate-y-full mt-[-8px] flex items-center gap-1.5 bg-slate-900 text-white text-sm font-semibold px-3 py-2 rounded-full shadow-xl hover:bg-emerald-500 hover:text-slate-900 transition-colors animate-in"
          style={{ left: `${btn.x}px`, top: `${btn.y - 8}px` }}
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          Explicar palabra
        </button>
      )}

      {/* Modal con la explicación */}
      {modal && (
        <div
          className="word-assistant-ui fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-y-auto zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Encabezado */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-100 text-emerald-600 w-9 h-9 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Asistente TeMapeo</p>
                  <p className="text-sm font-bold text-slate-800 leading-tight">Explicación de término</p>
                </div>
              </div>
              <button
                onClick={() => setModal(null)}
                className="text-slate-400 hover:text-slate-700 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cuerpo */}
            <div className="px-6 py-5">
              <p className="text-sm text-slate-500 mb-4">
                Seleccionaste: <span className="font-semibold text-slate-800">“{modal.text}”</span>
              </p>

              {modal.results.length > 0 ? (
                <div className="space-y-5">
                  {modal.results.map((r) => (
                    <div key={r.term} className="border-l-4 border-emerald-400 pl-4">
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{r.term}</h4>
                      <p className="text-xs text-emerald-700 italic mb-2">
                        <span className="font-semibold not-italic">Origen: </span>{r.etymology}
                      </p>
                      <p className="text-slate-600 leading-relaxed text-[0.95rem]">{r.definition}</p>
                      {r.example && (
                        <p className="text-sm text-slate-500 mt-2 bg-slate-50 rounded-lg p-3">
                          <span className="font-semibold">Ejemplo: </span>{r.example}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="bg-slate-100 text-slate-400 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6" />
                  </div>
                  <p className="text-slate-600 font-semibold mb-1">No tengo ese término en el glosario todavía.</p>
                  <p className="text-sm text-slate-500">
                    Prueba seleccionando una sola palabra técnica (por ejemplo: <span className="font-semibold">NDVI</span>,{' '}
                    <span className="font-semibold">LiDAR</span> u <span className="font-semibold">ortomosaico</span>).
                  </p>
                </div>
              )}
            </div>

            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
              <p className="text-[0.7rem] text-slate-400 text-center">
                Glosario local de TeMapeo · explicaciones con origen etimológico, sin conexión externa.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
