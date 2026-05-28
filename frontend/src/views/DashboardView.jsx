import { useState, useRef, useEffect } from 'react'
import { Monitor, Image, Leaf, Layers, Flame, UploadCloud, Loader2, CheckCircle2, Cpu } from 'lucide-react'

const LAYERS = [
  { id: 'rgb', label: 'Ortomosaico RGB', name: 'Ortomosaico RGB', icon: Image, iconBg: 'bg-blue-500' },
  { id: 'ndvi', label: 'Mapa NDVI', name: 'Índice NDVI (Vigor)', icon: Leaf, iconBg: 'bg-emerald-500' },
  { id: 'lidar', label: 'MDT LiDAR', name: 'Modelo Elevación LiDAR', icon: Layers, iconBg: 'bg-purple-500' },
  { id: 'thermal', label: 'Mapa Térmico', name: 'Mapa Térmico Radiométrico', icon: Flame, iconBg: 'bg-orange-500' },
]

const BASE_IMG = 'https://images.unsplash.com/photo-1590682680695-02b1c4c1143c?w=1600&q=80'

export default function DashboardView() {
  const [activeLayer, setActiveLayer] = useState('rgb')
  const [uploadState, setUploadState] = useState('default')
  const [fileName, setFileName] = useState('')
  const [bgImg, setBgImg] = useState(BASE_IMG)
  const [terrainVisible, setTerrainVisible] = useState(false)
  const fileInputRef = useRef(null)
  const dropzoneRef = useRef(null)

  const activeLayerData = LAYERS.find((l) => l.id === activeLayer)

  const handleUpload = (files) => {
    if (!files || files.length === 0) return
    const file = files[0]
    const ext = file.name.split('.').pop().toLowerCase()
    if (!['kml', 'kmz', 'jpg', 'jpeg', 'png'].includes(ext)) {
      alert('Sube un formato válido (.jpg, .png, .kml o .kmz)')
      return
    }
    setUploadState('loading')
    setFileName(file.name)

    if (['jpg', 'jpeg', 'png'].includes(ext)) {
      const reader = new FileReader()
      reader.onload = (e) => setBgImg(e.target.result)
      reader.readAsDataURL(file)
    }

    setTimeout(() => {
      setUploadState('success')
      setTerrainVisible(true)
      setActiveLayer('rgb')
    }, 1800)
  }

  const resetUpload = () => {
    if (fileInputRef.current) fileInputRef.current.value = ''
    setUploadState('default')
    setBgImg(BASE_IMG)
    setTerrainVisible(false)
  }

  useEffect(() => {
    const dz = dropzoneRef.current
    if (!dz) return
    const prevent = (e) => { e.preventDefault(); e.stopPropagation() }
    const onEnter = () => dz.classList.add('border-emerald-500', 'bg-slate-700/50')
    const onLeave = () => dz.classList.remove('border-emerald-500', 'bg-slate-700/50')
    const onDrop = (e) => { onLeave(); handleUpload(e.dataTransfer.files) }

    dz.addEventListener('dragenter', prevent)
    dz.addEventListener('dragover', (e) => { prevent(e); onEnter() })
    dz.addEventListener('dragleave', onLeave)
    dz.addEventListener('drop', (e) => { prevent(e); onDrop(e) })
    return () => {
      dz.removeEventListener('dragenter', prevent)
      dz.removeEventListener('dragover', prevent)
      dz.removeEventListener('dragleave', onLeave)
      dz.removeEventListener('drop', onDrop)
    }
  }, [])

  return (
    <section className="h-[calc(100vh-64px)] flex flex-col md:flex-row bg-slate-900 text-white overflow-hidden animate-in">
      {/* Sidebar */}
      <div className="w-full md:w-80 bg-slate-900 border-r border-slate-800 flex flex-col z-20 shadow-2xl relative">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold flex items-center">
            <Monitor className="text-emerald-500 w-6 h-6 mr-2" /> Visor TeMapeo
          </h2>
          <p className="text-xs text-slate-400 mt-1">Sube una foto y prueba las capas</p>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Capas de Datos</h3>
          <div className="space-y-3">
            {LAYERS.map((layer) => {
              const Icon = layer.icon
              const isActive = activeLayer === layer.id
              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                    isActive ? 'bg-slate-800 border-slate-600' : 'bg-transparent border-transparent hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`${layer.iconBg} p-2 rounded text-white`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold">{layer.label}</span>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-slate-700'}`}></div>
                </button>
              )
            })}
          </div>

          {/* File upload */}
          <div className="mt-8">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Procesa tu terreno</h3>
            <div
              ref={dropzoneRef}
              className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl text-center border-dashed transition-all relative"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".kml,.kmz,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => handleUpload(e.target.files)}
              />

              {uploadState === 'default' && (
                <div>
                  <UploadCloud className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm font-bold text-slate-200">Inserta tu Imagen / KML</p>
                  <p className="text-xs text-slate-500 mt-1 mb-3">Formatos: .jpg, .png, .kmz</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-slate-700 hover:bg-emerald-600 text-xs px-4 py-2 rounded font-semibold transition-colors cursor-pointer relative z-10 text-white"
                  >
                    Examinar Archivos
                  </button>
                </div>
              )}

              {uploadState === 'loading' && (
                <div className="py-2">
                  <Loader2 className="w-6 h-6 mx-auto mb-2 text-emerald-500 animate-spin" />
                  <p className="text-sm font-bold text-emerald-400">Procesando archivo...</p>
                  <p className="text-xs text-slate-400 mt-1">Generando capas con IA</p>
                </div>
              )}

              {uploadState === 'success' && (
                <div className="py-2">
                  <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-emerald-500" />
                  <p className="text-sm font-bold text-slate-200 truncate px-2">{fileName}</p>
                  <p className="text-xs text-emerald-400 mt-1 font-semibold">¡Capas generadas!</p>
                  <button onClick={resetUpload} className="text-xs text-slate-500 mt-3 underline hover:text-slate-300 relative z-10">
                    Subir otro archivo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-slate-950 flex items-center justify-center overflow-hidden">
        {/* RGB layer */}
        <div
          className={`absolute inset-0 transition-all duration-1000 bg-cover bg-center ${activeLayer === 'rgb' ? 'opacity-50' : 'opacity-0'} mix-blend-luminosity grayscale-[30%] sepia-[20%]`}
          style={{ backgroundImage: `url('${bgImg}')` }}
        />

        {/* NDVI layer */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${activeLayer === 'ndvi' ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-red-900/60 via-yellow-600/60 to-emerald-600/60 mix-blend-overlay z-10"></div>
          <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale" style={{ backgroundImage: `url('${bgImg}')` }}></div>
        </div>

        {/* LiDAR layer */}
        <div className={`absolute inset-0 transition-opacity duration-1000 bg-slate-950 ${activeLayer === 'lidar' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #a855f7 1px, transparent 1px)', backgroundSize: '15px 15px', opacity: 0.5, transform: 'perspective(500px) rotateX(60deg) scale(2)' }}></div>
          <div className="absolute inset-0 bg-cover bg-center opacity-20 sepia invert" style={{ backgroundImage: `url('${bgImg}')` }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-slate-900/80 px-6 py-4 rounded-xl border border-purple-500/30 backdrop-blur z-10">
            <Layers className="text-purple-500 w-12 h-12 mx-auto mb-2 animate-pulse" />
            <p className="text-purple-300 font-mono text-sm uppercase tracking-widest">Modelo de Elevación</p>
          </div>
        </div>

        {/* Thermal layer */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${activeLayer === 'thermal' ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700/80 via-yellow-500/80 to-red-600/80 mix-blend-overlay z-10"></div>
          <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale invert" style={{ backgroundImage: `url('${bgImg}')` }}></div>
        </div>

        {/* Terrain polygon overlay */}
        {terrainVisible && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
            <svg className="w-3/4 h-3/4 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] mb-4" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="10,20 90,10 80,90 20,80" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4" />
            </svg>
            <div className="absolute bg-slate-900/80 backdrop-blur-sm text-emerald-400 text-xs px-4 py-2 rounded-full border border-emerald-500/50 shadow-lg font-mono tracking-widest uppercase flex items-center">
              <Cpu className="w-3 h-3 mr-2" /> Área Escaneada
            </div>
          </div>
        )}

        {/* Active layer label */}
        <div className="absolute inset-0 border border-slate-700/30 m-8 rounded-2xl pointer-events-none z-30">
          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700 px-4 py-2 rounded-lg text-sm shadow-xl">
            <span className="text-emerald-400 font-bold uppercase tracking-wider">{activeLayerData?.name}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
