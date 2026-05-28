// Glosario técnico local de TeMapeo.
// Cada entrada: { term, etymology, definition, example? }
// Las claves están normalizadas (minúsculas, sin tildes) para facilitar la búsqueda.

const RAW_GLOSSARY = [
  {
    keys: ['ndvi'],
    term: 'NDVI',
    etymology: 'Sigla en inglés de "Normalized Difference Vegetation Index" (Índice de Vegetación de Diferencia Normalizada).',
    definition:
      'Índice que mide qué tan sana y verde está la vegetación. Compara la luz roja que la planta absorbe con la luz infrarroja cercana que refleja. Va de -1 a 1: mientras más cercano a 1, más vigor y clorofila tiene el cultivo.',
    example: 'Un NDVI bajo en una zona del huerto suele indicar plantas con estrés o poco follaje.',
  },
  {
    keys: ['ndre'],
    term: 'NDRE',
    etymology: 'Sigla de "Normalized Difference Red Edge" (Índice de Diferencia Normalizada del Borde Rojo).',
    definition:
      'Índice parecido al NDVI pero que usa la banda "Red Edge". Penetra mejor en follaje denso y detecta problemas de nitrógeno o madurez antes de que sean visibles a simple vista.',
  },
  {
    keys: ['gndvi'],
    term: 'GNDVI',
    etymology: 'Sigla de "Green Normalized Difference Vegetation Index" (usa la banda verde en lugar de la roja).',
    definition:
      'Variante del NDVI que utiliza la luz verde. Es más sensible a la concentración de clorofila, útil en etapas avanzadas del cultivo cuando el NDVI ya se "satura".',
  },
  {
    keys: ['osavi'],
    term: 'OSAVI',
    etymology: 'Sigla de "Optimized Soil Adjusted Vegetation Index" (Índice de Vegetación Ajustado al Suelo).',
    definition:
      'Índice que corrige la influencia del suelo desnudo entre las plantas. Es ideal para cultivos jóvenes o muy espaciados, donde el suelo distorsiona otras mediciones.',
  },
  {
    keys: ['lidar'],
    term: 'LiDAR',
    etymology: 'Sigla en inglés de "Light Detection and Ranging" (Detección y Medición por Luz).',
    definition:
      'Tecnología que dispara pulsos de láser hacia el suelo y mide cuánto tardan en volver para calcular distancias con altísima precisión. Genera modelos 3D del terreno incluso atravesando la vegetación densa.',
    example: 'Con LiDAR podemos ver el suelo real bajo un bosque, algo imposible con una foto normal.',
  },
  {
    keys: ['ortomosaico', 'ortomosaicos'],
    term: 'Ortomosaico',
    etymology: 'Del griego "orthós" (recto, correcto) + "mosaico" (composición de piezas).',
    definition:
      'Imagen única y gigante formada al unir cientos de fotos aéreas corregidas geométricamente. A diferencia de una foto normal, está "ortorrectificada": cada punto está en su posición real, por lo que puedes medir distancias y áreas sobre ella.',
  },
  {
    keys: ['ortofoto'],
    term: 'Ortofoto',
    etymology: 'Del griego "orthós" (recto) + "foto" (luz/imagen).',
    definition:
      'Fotografía aérea corregida para que no tenga deformaciones de perspectiva ni de relieve. Equivale a mirar el terreno perfectamente desde arriba, con escala uniforme.',
  },
  {
    keys: ['fotogrametria'],
    term: 'Fotogrametría',
    etymology: 'Del griego "phōs/photós" (luz) + "gramma" (dibujo/registro) + "metría" (medición).',
    definition:
      'Ciencia de obtener medidas reales del terreno a partir de fotografías. Tomando muchas fotos solapadas desde distintos ángulos, el software reconstruye la forma y el tamaño 3D de lo fotografiado.',
  },
  {
    keys: ['gsd'],
    term: 'GSD',
    etymology: 'Sigla en inglés de "Ground Sample Distance" (Distancia de Muestreo en el Suelo).',
    definition:
      'Tamaño real que representa un píxel de la imagen sobre el terreno. Si el GSD es 2 cm/píxel, cada punto de la foto equivale a 2 cm reales. Mientras menor el GSD, mayor el detalle.',
  },
  {
    keys: ['gcp', 'gcps', 'punto de control terrestre', 'puntos de control terrestre'],
    term: 'GCP (Punto de Control Terrestre)',
    etymology: 'Sigla en inglés de "Ground Control Point".',
    definition:
      'Marca física colocada en el suelo cuya coordenada exacta se mide con GPS de precisión. Sirve para "amarrar" el mapa del dron a la realidad y garantizar que las medidas sean exactas.',
  },
  {
    keys: ['rtk'],
    term: 'RTK',
    etymology: 'Sigla en inglés de "Real-Time Kinematic" (Cinemático en Tiempo Real).',
    definition:
      'Método de posicionamiento GPS que corrige la señal en tiempo real para lograr precisión de centímetros (en vez de varios metros). Permite mapear sin necesidad de tantos puntos de control en el suelo.',
  },
  {
    keys: ['mdt'],
    term: 'MDT (Modelo Digital del Terreno)',
    etymology: 'Sigla de "Modelo Digital del Terreno".',
    definition:
      'Representación 3D del suelo desnudo, sin árboles, edificios ni vegetación. Muestra la forma real del terreno y se usa para calcular pendientes, drenajes y diseñar riego.',
  },
  {
    keys: ['mds'],
    term: 'MDS (Modelo Digital de Superficie)',
    etymology: 'Sigla de "Modelo Digital de Superficie".',
    definition:
      'Representación 3D que incluye TODO lo que sobresale del suelo: árboles, techos, postes. Restando el MDT al MDS se obtiene, por ejemplo, la altura de los árboles.',
  },
  {
    keys: ['mde'],
    term: 'MDE (Modelo Digital de Elevación)',
    etymology: 'Sigla de "Modelo Digital de Elevación".',
    definition:
      'Término general para un modelo de alturas del terreno. Según el contexto puede referirse al MDT (solo suelo) o al MDS (suelo + objetos).',
  },
  {
    keys: ['reflectancia'],
    term: 'Reflectancia',
    etymology: 'Del latín "reflectere" (volver hacia atrás, reflejar).',
    definition:
      'Porcentaje de luz que una superficie refleja en lugar de absorber. Cada material y cada planta refleja la luz de forma distinta, y esa "firma" permite identificar su estado de salud.',
  },
  {
    keys: ['multiespectral', 'multispectral'],
    term: 'Multiespectral',
    etymology: 'Del latín "multus" (muchos) + "spectrum" (imagen/aparición de la luz).',
    definition:
      'Cámara o imagen que captura varias bandas de luz por separado (verde, roja, borde rojo, infrarroja), incluyendo colores que el ojo humano no ve. Con ellas se calculan índices como el NDVI.',
  },
  {
    keys: ['teledeteccion'],
    term: 'Teledetección',
    etymology: 'Del griego "tēle" (lejos, a distancia) + "detección".',
    definition:
      'Disciplina que obtiene información de la Tierra sin tocarla, mediante sensores en drones, aviones o satélites que captan la luz reflejada o emitida por las superficies.',
  },
  {
    keys: ['geomatica'],
    term: 'Geomática',
    etymology: 'Del griego "gē" (Tierra) + "(infor)mática".',
    definition:
      'Conjunto de tecnologías para capturar, gestionar y analizar datos con ubicación geográfica: GPS, drones, SIG/GIS y teledetección integrados.',
  },
  {
    keys: ['nir', 'infrarrojo cercano'],
    term: 'NIR (Infrarrojo Cercano)',
    etymology: 'Sigla en inglés de "Near Infrared".',
    definition:
      'Banda de luz justo más allá del rojo, invisible al ojo humano. La vegetación sana la refleja con mucha fuerza, por eso es clave para medir el vigor de los cultivos.',
  },
  {
    keys: ['red edge', 'borde rojo'],
    term: 'Red Edge (Borde Rojo)',
    etymology: 'Del inglés "red edge" (borde del rojo).',
    definition:
      'Zona de transición entre la luz roja y la infrarroja cercana. Es muy sensible al estado de la clorofila y al estrés temprano de la planta.',
  },
  {
    keys: ['nube de puntos', 'nube de puntos lidar'],
    term: 'Nube de puntos',
    etymology: 'Traducción del inglés "point cloud".',
    definition:
      'Conjunto de millones de puntos con coordenadas X, Y, Z que representan en 3D una superficie escaneada (por LiDAR o fotogrametría). Es la materia prima para generar modelos del terreno.',
  },
  {
    keys: ['falso color', 'falsos colores'],
    term: 'Falso color',
    etymology: 'Composición de "falso" + "color".',
    definition:
      'Imagen donde se asignan colores visibles a bandas invisibles (como el infrarrojo). Por eso la vegetación sana suele verse en rojo intenso: ayuda a interpretar datos que el ojo no podría ver.',
  },
  {
    keys: ['estres hidrico'],
    term: 'Estrés hídrico',
    etymology: 'De "estrés" (tensión) + del griego "hýdōr" (agua).',
    definition:
      'Condición de una planta que no recibe el agua que necesita. Provoca cierre de estomas y aumento de temperatura de la hoja, detectable con cámaras térmicas antes de que el daño sea visible.',
  },
  {
    keys: ['termografia', 'termografico', 'termico'],
    term: 'Termografía',
    etymology: 'Del griego "thérmē" (calor) + "graphía" (registro/dibujo).',
    definition:
      'Técnica que mide la temperatura de las superficies mediante una cámara térmica. En agricultura revela estrés hídrico, fallas de riego y diferencias de temperatura en el cultivo.',
  },
  {
    keys: ['banda', 'banda espectral', 'bandas espectrales'],
    term: 'Banda espectral',
    etymology: 'De "banda" (franja) + "espectral" (relativo al espectro de la luz).',
    definition:
      'Franja específica de longitudes de onda de la luz que un sensor capta por separado (por ejemplo: azul, verde, rojo, borde rojo, infrarrojo). Combinarlas permite calcular índices de vegetación.',
  },
  {
    keys: ['georreferenciacion', 'georreferenciado', 'georreferenciada'],
    term: 'Georreferenciación',
    etymology: 'Del griego "gē" (Tierra) + "referencia".',
    definition:
      'Proceso de asignar coordenadas reales del mundo a una imagen o mapa, para que cada punto coincida exactamente con su ubicación en el terreno.',
  },
  {
    keys: ['curvas de nivel', 'curva de nivel'],
    term: 'Curvas de nivel',
    etymology: 'De "curva" + "nivel" (del latín "libella", nivelar).',
    definition:
      'Líneas en un mapa que unen todos los puntos que están a la misma altura. Cuando están muy juntas, el terreno es empinado; cuando están separadas, es plano.',
  },
  {
    keys: ['pendiente', 'pendientes'],
    term: 'Pendiente',
    etymology: 'Del latín "pendere" (colgar, inclinarse).',
    definition:
      'Grado de inclinación del terreno, normalmente expresado en porcentaje o grados. Es clave para diseñar riego por gravedad, prevenir erosión y planificar plantaciones.',
  },
  {
    keys: ['dron', 'drone', 'uav', 'dron de juguete'],
    term: 'Dron (UAV)',
    etymology: 'Del inglés "drone" (zángano). UAV: "Unmanned Aerial Vehicle" (Vehículo Aéreo No Tripulado).',
    definition:
      'Aeronave sin piloto a bordo, controlada de forma remota o autónoma. En geomática transporta cámaras y sensores para capturar datos del terreno desde el aire.',
  },
  {
    keys: ['dgac'],
    term: 'DGAC',
    etymology: 'Sigla de "Dirección General de Aeronáutica Civil" (Chile).',
    definition:
      'Organismo estatal que regula la aviación civil en Chile, incluyendo la operación legal de drones y la certificación de operadores aéreos.',
  },
  {
    keys: ['aoc'],
    term: 'AOC',
    etymology: 'Sigla en inglés de "Air Operator Certificate" (Certificado de Operador Aéreo).',
    definition:
      'Certificación que autoriza a una empresa a realizar operaciones aéreas de forma legal, segura y trazable. TeMapeo opera con certificación AOC de la DGAC.',
  },
  {
    keys: ['fenologia', 'fenologico', 'fenologica'],
    term: 'Fenología',
    etymology: 'Del griego "phaínō" (mostrar, aparecer) + "logía" (estudio).',
    definition:
      'Estudio de las etapas del ciclo de vida de las plantas (brotación, floración, fruta, cosecha) y su relación con el clima. Define cuándo conviene volar para obtener datos útiles.',
  },
  {
    keys: ['vigor', 'vigor vegetal'],
    term: 'Vigor vegetal',
    etymology: 'Del latín "vigor" (fuerza, energía).',
    definition:
      'Medida de la fortaleza y desarrollo de una planta. Un cultivo con alto vigor tiene abundante follaje sano; los índices como el NDVI lo cuantifican zona por zona.',
  },
  {
    keys: ['clorofila'],
    term: 'Clorofila',
    etymology: 'Del griego "chlōrós" (verde) + "phýllon" (hoja).',
    definition:
      'Pigmento verde que permite a las plantas convertir la luz en energía (fotosíntesis). Su cantidad refleja la salud de la planta y es lo que detectan los índices multiespectrales.',
  },
  {
    keys: ['solapamiento', 'traslape', 'traslapo'],
    term: 'Solapamiento (traslape)',
    etymology: 'De "solapa" (parte que se monta sobre otra).',
    definition:
      'Porcentaje en que una foto aérea se superpone con la siguiente. Un buen solapamiento (frontal y lateral, ~70-80%) es indispensable para que la fotogrametría reconstruya el terreno sin huecos.',
  },
  {
    keys: ['resolucion'],
    term: 'Resolución',
    etymology: 'Del latín "resolutio" (acción de descomponer en partes).',
    definition:
      'Nivel de detalle de una imagen. En mapas de dron se mide con el GSD: a menor GSD (cm por píxel), mayor resolución y más detalle visible.',
  },
  {
    keys: ['cartografia'],
    term: 'Cartografía',
    etymology: 'Del griego "chártēs" (mapa, papiro) + "graphía" (registro/dibujo).',
    definition:
      'Arte y ciencia de elaborar mapas. A partir de imágenes aéreas se generan mapas personalizados para construcción, agricultura, urbanismo y silvicultura.',
  },
  {
    keys: ['volumen', 'volumenes', 'acopio', 'acopios'],
    term: 'Cálculo de volúmenes',
    etymology: 'Del latín "volumen" (rollo, masa) + "acopio" del latín "ad-copia" (reunir abundancia).',
    definition:
      'Medición de la cantidad de material en un montón o excavación (m³). Se obtiene comparando el modelo 3D del terreno con una superficie de referencia; muy usado en acopios de áridos o movimientos de tierra.',
  },
  {
    keys: ['silvicultura'],
    term: 'Silvicultura',
    etymology: 'Del latín "silva" (bosque) + "cultura" (cultivo).',
    definition:
      'Cultivo y manejo de bosques y plantaciones forestales. Los datos de drones ayudan a estimar altura, densidad y salud de los árboles.',
  },
  {
    keys: ['sig', 'gis', 'visor gis'],
    term: 'SIG / GIS',
    etymology: 'Sigla de "Sistema de Información Geográfica" ("Geographic Information System").',
    definition:
      'Sistema para almacenar, visualizar y analizar información ligada a un lugar del mapa. Permite cruzar capas (relieve, cultivos, riego) para tomar decisiones.',
  },
]

// Construye un mapa de búsqueda { claveNormalizada -> entrada }
const normalize = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // quita tildes (marcas diacríticas combinantes)
    .replace(/[^\w\s]/g, ' ') // quita puntuación
    .replace(/\s+/g, ' ')
    .trim()

const GLOSSARY_MAP = {}
for (const entry of RAW_GLOSSARY) {
  for (const k of entry.keys) {
    GLOSSARY_MAP[normalize(k)] = entry
  }
}

/**
 * Busca una explicación para el texto seleccionado.
 * 1) Intenta la frase completa.
 * 2) Si no, busca término por término (palabras significativas).
 * Devuelve un array de entradas encontradas (puede estar vacío).
 */
export function lookupTerms(rawText) {
  const text = normalize(rawText)
  if (!text) return []

  // 1) frase exacta
  if (GLOSSARY_MAP[text]) return [GLOSSARY_MAP[text]]

  // 2) buscar coincidencias por palabras / pares de palabras
  const words = text.split(' ').filter((w) => w.length > 1)
  const found = []
  const seen = new Set()

  // pares de palabras (ej. "red edge", "curvas de nivel")
  for (let i = 0; i < words.length - 1; i++) {
    const pair = words[i] + ' ' + words[i + 1]
    const trio = words[i + 2] ? pair + ' ' + words[i + 2] : null
    if (trio && GLOSSARY_MAP[trio] && !seen.has(GLOSSARY_MAP[trio].term)) {
      found.push(GLOSSARY_MAP[trio])
      seen.add(GLOSSARY_MAP[trio].term)
    } else if (GLOSSARY_MAP[pair] && !seen.has(GLOSSARY_MAP[pair].term)) {
      found.push(GLOSSARY_MAP[pair])
      seen.add(GLOSSARY_MAP[pair].term)
    }
  }

  // palabras sueltas
  for (const w of words) {
    if (GLOSSARY_MAP[w] && !seen.has(GLOSSARY_MAP[w].term)) {
      found.push(GLOSSARY_MAP[w])
      seen.add(GLOSSARY_MAP[w].term)
    }
  }

  return found
}

export default RAW_GLOSSARY
