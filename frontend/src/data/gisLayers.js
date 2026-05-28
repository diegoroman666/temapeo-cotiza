// Capas del Visor GIS de TeMapeo.
// Imágenes reales de la galería fotográfica de temapeo.com
// (CDN de GoDaddy / wsimg "isteam"), categorizadas por tipo de entregable.

const BASE = 'https://img1.wsimg.com/isteam/ip/4a3db976-02e4-465e-adf7-66c4885de0ac'

// Construye una URL con redimensionado por ancho.
const img = (file, w = 1280) => `${BASE}/${file}/:/rs=w:${w}`

const FILES = {
  // Ortomosaicos RGB de la plataforma multiespectral (M3M)
  rgbMandarinos: 'Captura%20de%20pantalla%202025-01-31%20a%20la(s)%205.53.14.png',
  rgbVinas: 'Captura%20de%20pantalla%202025-01-31%20a%20la(s)%205.54.40.png',
  rgbLimones: 'Captura%20de%20pantalla%202025-01-31%20a%20la(s)%205.57.47.png',
  // Índices de vegetación
  ndviMandarinos: 'Captura%20de%20pantalla%202025-01-31%20a%20la(s)%205.53.33.png',
  lciMandarinos: 'Captura%20de%20pantalla%202025-01-31%20a%20la(s)%205.53.58.png',
  ndviVinas: 'Captura%20de%20pantalla%202025-01-31%20a%20la(s)%205.54.59.png',
  lciVinas: 'Captura%20de%20pantalla%202025-01-31%20a%20la(s)%205.55.18.png',
  indexLimones: 'Captura%20de%20pantalla%202025-01-31%20a%20la(s)%205.58.29.png',
  multispectral2024: 'Captura%20de%20pantalla%202024-09-22%20a%20la(s)%205.58.44.png',
  // Ortomosaico forestal con delineación
  orthoForest: 'Captura%20de%20pantalla%202024-09-21%20a%20la(s)%2010.52.4.png',
  // Fotos / ortofotos nadir
  orchardNadir: 'DB125983-B6E2-4609-9FC7-D136C438E9C2_1_105_c.jpeg',
  parcelsNadir: '5B74C434-7D25-46AB-91E1-821ED6AFA918_1_105_c.jpeg',
  djiVineyardNadir: 'DJI_0549.jpeg',
  djiForestPlantation: 'DJI_0997.JPG',
  djiForestHarvest: 'DJI_0378.JPG',
  djiForestDense: 'DJI_0973.JPG',
  // Panorámicas / vuelos oblicuos
  valleyPano: '9D1A77E5-D4CF-43F3-844D-E05CE5E6B861_1_105_c.jpeg',
  valleyVineyardSunset: 'DJI_0676.jpeg',
  valley1: '458DF502-62EB-47DB-9F7E-F512E8563D19_1_105_c.jpeg',
  valley2: 'CDC8B960-2B49-4973-A5B8-398B1D441EDE_1_105_c.jpeg',
  // Modelo 3D
  model3d: 'blob-cf4429c.png',
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
      item('rgbMandarinos', 'Ortomosaico RGB · Mandarinos (78,4 ha)', 'Ortomosaico de color natural del huerto de mandarinos, base para mediciones y comparación con los índices.'),
      item('rgbVinas', 'Ortomosaico RGB · Viñas (50,4 ha)', 'Ortomosaico de color natural del viñedo levantado con cámara multiespectral M3M.'),
      item('rgbLimones', 'Ortomosaico RGB · Limones (17,7 ha)', 'Ortomosaico de color natural del huerto de limones.'),
      item('orthoForest', 'Ortomosaico · delimitación de rodales', 'Ortomosaico forestal de alta resolución con delineación de rodales.'),
      item('orchardNadir', 'Ortofoto nadir · huerto y canal', 'Vista cenital (nadir) de huerto frutal con su canal de riego.'),
      item('parcelsNadir', 'Ortofoto nadir · parcelas y suelo', 'Vista cenital de parcelas con preparación de suelo y caminos.'),
      item('djiVineyardNadir', 'Vuelo nadir · hileras de viñedo', 'Captura cenital de las hileras del viñedo y su trazado.'),
      item('djiForestPlantation', 'Vuelo forestal · plantación', 'Vuelo cenital sobre plantación forestal y áreas de cosecha.'),
      item('djiForestHarvest', 'Vuelo forestal · faena de cosecha', 'Vuelo sobre faena forestal: bosque, despeje y acopio.'),
      item('valleyPano', 'Panorámica aérea · valle agrícola', 'Vista panorámica del valle: parcelas, cultivos y cordillera.'),
      item('valleyVineyardSunset', 'Panorámica · viñedos al atardecer', 'Vuelo oblicuo sobre viñedos con la cordillera al fondo.'),
      item('valley2', 'Vuelo aéreo · huertos y relieve', 'Panorámica aérea con huertos, topografía y borde de cerros.'),
    ],
  },
  {
    id: 'ndvi',
    label: 'Mapa NDVI',
    name: 'Índices de Vegetación (NDVI / NDRE / LCI)',
    iconKey: 'leaf',
    accent: 'bg-emerald-500',
    text: 'text-emerald-400',
    ring: 'shadow-[0_0_10px_rgba(16,185,129,0.8)]',
    items: [
      item('ndviMandarinos', 'NDVI · Mandarinos', 'Mapa NDVI del huerto de mandarinos: el rojo indica menor vigor y el verde mayor vigor vegetal.'),
      item('ndviVinas', 'NDVI · Viñas', 'Mapa NDVI del viñedo, útil para detectar zonas de estrés y variabilidad por hilera.'),
      item('lciMandarinos', 'Índice LCI · Mandarinos', 'Índice de clorofila (LCI) en mandarinos, sensible al estado nutricional del follaje.'),
      item('lciVinas', 'Índice LCI · Viñas', 'Índice de clorofila (LCI) en viñas para evaluar madurez y nitrógeno.'),
      item('indexLimones', 'Índice de vegetación · Limones', 'Mapa de índice de vegetación del huerto de limones (17,7 ha).'),
      item('multispectral2024', 'Composición multiespectral', 'Comparación de bandas: Color Natural, Color Infrarrojo, Tierra/Agua y Vegetación.'),
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
      item('model3d', 'Modelo 3D texturizado', 'Modelo tridimensional por fotogrametría: navegable, con herramientas de medición y recorte del terreno.'),
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
