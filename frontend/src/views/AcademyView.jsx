import { useState, useEffect } from 'react'
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  Lightbulb,
  GraduationCap,
  BookOpen,
} from 'lucide-react'
import MODULES from '../data/academy'

const LEVEL_STYLES = {
  Principiante: 'bg-emerald-100 text-emerald-700',
  Intermedio: 'bg-amber-100 text-amber-700',
  Experto: 'bg-rose-100 text-rose-700',
}

const STORAGE_KEY = 'temapeo_academy_progress'

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { completed: {}, lastStep: {} }
  } catch {
    return { completed: {}, lastStep: {} }
  }
}

export default function AcademyView() {
  const [activeModuleId, setActiveModuleId] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(loadProgress)

  // Persiste el progreso en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const activeModule = MODULES.find((m) => m.id === activeModuleId) || null

  const enterModule = (mod) => {
    const savedStep = progress.lastStep[mod.id] ?? 0
    setActiveModuleId(mod.id)
    setCurrentStep(Math.min(savedStep, mod.steps.length - 1))
    window.scrollTo(0, 0)
  }

  const exitModule = () => {
    setActiveModuleId(null)
    window.scrollTo(0, 0)
  }

  const goToStep = (idx) => {
    if (!activeModule) return
    const clamped = Math.max(0, Math.min(idx, activeModule.steps.length - 1))
    setCurrentStep(clamped)
    setProgress((p) => ({ ...p, lastStep: { ...p.lastStep, [activeModule.id]: clamped } }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const finishModule = () => {
    if (!activeModule) return
    setProgress((p) => ({
      ...p,
      completed: { ...p.completed, [activeModule.id]: true },
      lastStep: { ...p.lastStep, [activeModule.id]: 0 },
    }))
    exitModule()
  }

  // ---------- VISTA DETALLE DE MÓDULO ----------
  if (activeModule) {
    const total = activeModule.steps.length
    const step = activeModule.steps[currentStep]
    const isFirst = currentStep === 0
    const isLast = currentStep === total - 1
    const progressPct = ((currentStep + 1) / total) * 100

    return (
      <section className="bg-slate-50 py-12 animate-in">
        <div className="max-w-3xl mx-auto px-4">
          {/* Encabezado */}
          <button
            onClick={exitModule}
            className="inline-flex items-center text-slate-500 hover:text-slate-800 font-semibold mb-6 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> Volver a la Academia
          </button>

          <div className="flex items-center flex-wrap gap-3 mb-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${LEVEL_STYLES[activeModule.level]}`}>
              {activeModule.level}
            </span>
            <span className="text-sm font-semibold text-slate-400">
              Módulo {activeModule.num}
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6">{activeModule.title}</h2>

          {/* Barra de progreso por pasos */}
          <div className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-500">
            <span>Paso {currentStep + 1} de {total}</span>
            <span>{Math.round(progressPct)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            ></div>
          </div>

          {/* Puntos de navegación rápida */}
          <div className="flex flex-wrap gap-2 mb-8">
            {activeModule.steps.map((s, i) => (
              <button
                key={i}
                onClick={() => goToStep(i)}
                title={s.title}
                className={`w-8 h-8 rounded-full text-xs font-bold border-2 transition-colors ${
                  i === currentStep
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : i < currentStep
                      ? 'bg-emerald-100 border-emerald-200 text-emerald-600'
                      : 'bg-white border-slate-200 text-slate-400 hover:border-emerald-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Tarjeta del paso */}
          <div key={currentStep} className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 slide-in">
            <div className="flex items-start gap-3 mb-5">
              <div className="bg-emerald-100 text-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0">
                {currentStep + 1}
              </div>
              <h3 className="text-2xl font-bold text-slate-800 pt-1">{step.title}</h3>
            </div>

            <div className="space-y-4 text-slate-600 leading-relaxed text-[1.05rem]">
              {step.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {step.tip && (
              <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3">
                <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800"><span className="font-bold">Consejo: </span>{step.tip}</p>
              </div>
            )}
          </div>

          {/* Navegación anterior / siguiente */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => goToStep(currentStep - 1)}
              disabled={isFirst}
              className="inline-flex items-center font-bold px-5 py-3 rounded-lg transition-colors text-slate-600 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Anterior
            </button>

            {!isLast ? (
              <button
                onClick={() => goToStep(currentStep + 1)}
                className="inline-flex items-center bg-slate-900 text-white font-bold px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors shadow-lg"
              >
                Siguiente <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={finishModule}
                className="inline-flex items-center bg-emerald-500 text-slate-900 font-bold px-6 py-3 rounded-lg hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                Finalizar módulo <CheckCircle2 className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            ¿Te perdiste? Usa "Anterior" para repasar el paso previo. Tu avance se guarda automáticamente.
          </p>
        </div>
      </section>
    )
  }

  // ---------- VISTA LISTA DE MÓDULOS ----------
  return (
    <section className="bg-slate-50 py-16 animate-in">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-600 font-bold px-4 py-1 rounded-full text-sm mb-4">
            <GraduationCap className="w-4 h-4" /> Certificación TeMapeo
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Curso Gratuito: De la Foto al Dato Técnico</h2>
          <p className="text-lg text-slate-600">
            Nuestro objetivo es capacitarte. Aprende a interpretar entregables geoespaciales y traduce las "fotos
            bonitas" de los drones en lenguaje técnico y decisiones rentables para tu industria. Entra a cada módulo y
            avanza a tu ritmo, paso a paso.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-emerald-200 transform md:-translate-x-1/2 z-0 rounded-full"></div>

          {MODULES.map((mod, idx) => {
            const reverse = idx % 2 === 1
            const isCompleted = progress.completed[mod.id]
            const inProgress = !isCompleted && (progress.lastStep[mod.id] ?? 0) > 0

            return (
              <div
                key={mod.id}
                className={`relative z-10 flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center mb-16`}
              >
                <div className={`md:w-1/2 ${reverse ? 'md:pl-16 text-left' : 'md:pr-16 md:text-right'} w-full pl-24 ${reverse ? 'md:pl-16' : 'md:pl-0'}`}>
                  <div className={`flex items-center gap-2 mb-2 ${reverse ? 'justify-start' : 'md:justify-end'}`}>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${LEVEL_STYLES[mod.level]}`}>{mod.level}</span>
                    {isCompleted && (
                      <span className="inline-flex items-center text-xs font-bold text-emerald-600">
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Completado
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-1">Módulo {mod.num}</h3>
                  <h4 className="text-xl text-emerald-600 font-semibold mb-3">{mod.title}</h4>
                  <p className="text-slate-600 mb-2">{mod.desc}</p>
                  <p className={`text-xs text-slate-400 mb-4 ${reverse ? '' : 'md:text-right'}`}>
                    {mod.steps.length} pasos
                  </p>
                  <button
                    onClick={() => enterModule(mod)}
                    className="inline-flex items-center bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-bold py-2 px-6 rounded-lg transition-colors shadow-sm"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    {isCompleted ? 'Repasar módulo' : inProgress ? 'Continuar módulo' : `Iniciar módulo ${mod.num}`}
                  </button>
                </div>

                <div
                  className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-xl z-20 border-4 ${
                    isCompleted
                      ? 'bg-emerald-500 border-white text-white'
                      : 'bg-white border-emerald-500 text-emerald-500'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-7 h-7" /> : mod.num}
                </div>

                <div className={`md:w-1/2 ${reverse ? 'md:pr-16 text-right' : 'md:pl-16'} hidden md:block`}>
                  <img
                    src={mod.img}
                    className={`rounded-xl shadow-md ${reverse ? 'ml-auto' : ''}`}
                    alt={mod.imgAlt}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
