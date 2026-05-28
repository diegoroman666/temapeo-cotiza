// Capas del Visor GIS de TeMapeo.
// Las imágenes son reales, extraídas de la galería fotográfica de temapeo.com
// (CDN de GoDaddy / wsimg "isteam"). Se sirven con transformaciones de ancho.

const BASE = 'https://img1.wsimg.com/isteam/ip/4a3db976-02e4-465e-adf7-66c4885de0ac'

// Construye una URL con redimensionado por ancho.
const img = (file, w = 1280) => `${BASE}/${file}/:/rs=w:${w}`

const FILES = {
  orthoForest: 'Captura%20de%20pantalla%202024-09-21%20a%20la(s)%2010.52.4.png',
  multispectral: 'Captura%20de%20pantalla%202024-09-22%20a%20la(s)%205.58.44.png',
  model3d: 'blob-cf4429c.png',
  orchardNadir: 'DB125983-B6E2-4609-9FC7-D136C438E9C2_1_105_c.jpeg',
  valley1: '458DF502-62EB-47DB-9F7E-F512E8563D19_1_105_c.jpeg',
  valley2: 'CDC8B960-2B49-4973-A5B8-398B1D441EDE_1_105_c.jpeg',
}

const item = (key, title, desc) => {
  const file = FILES[key]
  return {
    title,
    desc,
    src: img(file, 1280),
    thumb: img(file, 480),
    full: img(file, 1920),
  }
}

// iconKey se resuelve a un icono de lucide-react en el componente.
export const GIS_LAYERS = [
  {
    id: 'rgb',
    label: 'Ortomosaico RGB',
    name: 'Ortomosaico RGB',
    iconKey: 'image',
    accent: 'bg-blue-500',
    text: 'text-blue-400',
    ring: 'shadow-[0_0_10px_rgba(59,130,246,0.8)]',
    items: [
      item('orthoForest', 'Ortomosaico · delimitación de rodales', 'Ortomosaico de alta resolución con delineación de rodales sobre plantación forestal.'),
      item('orchardNadir', 'Ortofoto nadir · huerto y canal', 'Vista cenital (nadir) de huerto frutal con su canal de riego, base para mediciones.'),
      item('valley1', 'Vuelo aéreo · valle frutícola', 'Mosaico aéreo del valle: parcelas, cultivos y red de caminos.'),
      item('valley2', 'Vuelo aéreo · huertos y relieve', 'Panorámica aérea con huertos, topografía y borde de cerros.'),
    ],
  },
  {
    id: 'ndvi',
    label: 'Mapa NDVI',
    name: 'Índice de Vegetación (NDVI)',
    iconKey: 'leaf',
    accent: 'bg-emerald-500',
    text: 'text-emerald-400',
    ring: 'shadow-[0_0_10px_rgba(16,185,129,0.8)]',
    items: [
      item('multispectral', 'Análisis multiespectral', 'Composición de bandas: Color Natural (B4/B3/B2), Color Infrarrojo (B8/B4/B3), Tierra/Agua (B8/B11/B4) y Vegetación (B12/B11/B4) para evaluar vigor y estrés.'),
    ],
  },
  {
    id: 'lidar',
    label: 'MDT LiDAR',
    name: 'Modelo de Elevación / 3D',
    iconKey: 'layers',
    accent: 'bg-purple-500',
    text: 'text-purple-400',
    ring: 'shadow-[0_0_10px_rgba(168,85,247,0.8)]',
    items: [
      item('model3d', 'Modelo 3D texturizado', 'Modelo tridimensional generado por fotogrametría: navegable, con herramientas de medición y recorte del terreno.'),
    ],
  },
  {
    id: 'thermal',
    label: 'Mapa Térmico',
    name: 'Mapa Térmico Radiométrico',
    iconKey: 'flame',
    accent: 'bg-orange-500',
    text: 'text-orange-400',
    ring: 'shadow-[0_0_10px_rgba(249,115,22,0.8)]',
    items: [],
  },
]

export default GIS_LAYERS
