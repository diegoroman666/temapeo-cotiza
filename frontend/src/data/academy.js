// Contenido de los módulos de la Academia TeMapeo.
// Cada módulo tiene pasos (steps) explicados paso a paso, mezclando
// lenguaje declarativo e imperativo. El usuario puede avanzar y retroceder.

const MODULES = [
  {
    id: 'm1',
    num: 1,
    level: 'Principiante',
    title: 'El Píxel con Coordenadas',
    desc:
      'Entiende la diferencia entre una foto de un dron de juguete y la fotogrametría. Qué es el GSD (resolución), cómo se solapan las imágenes y por qué necesitamos Puntos de Control Terrestre (GCPs).',
    img: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=600&q=80',
    imgAlt: 'Cámara de dron',
    steps: [
      {
        title: 'Una foto no es un mapa',
        body: [
          'Antes de empezar, ten clara una idea: una fotografía aérea normal NO sirve para medir. La perspectiva deforma las distancias y los bordes se ven inclinados.',
          'La fotogrametría resuelve esto. Toma muchas fotos solapadas y, con software, reconstruye la forma 3D real del terreno para que cada punto quede en su lugar exacto.',
        ],
        tip: 'Regla simple: si no puedes medir distancias reales sobre la imagen, todavía es una foto, no un mapa.',
      },
      {
        title: 'Conoce el GSD (la resolución real)',
        body: [
          'El GSD (Ground Sample Distance) es cuántos centímetros del suelo representa cada píxel de tu imagen.',
          'Observa la relación: si vuelas más bajo, el GSD baja (más detalle); si vuelas más alto, el GSD sube (menos detalle, pero cubres más rápido).',
          'Define el GSD ANTES de volar según lo que necesites ver. Para contar árboles basta 4–5 cm/píxel; para detectar plagas finas conviene 1–2 cm/píxel.',
        ],
        tip: 'Menor GSD = más detalle = vuelos más lentos y más fotos. Es un equilibrio, no un "más siempre es mejor".',
      },
      {
        title: 'Asegura el solapamiento',
        body: [
          'Para que el software reconstruya el terreno, cada foto debe superponerse con las vecinas. A eso se le llama solapamiento (traslape).',
          'Configura dos valores: solapamiento frontal (entre fotos de la misma línea) y lateral (entre líneas de vuelo).',
          'Usa al menos 70–80% de solapamiento. Si es menor, aparecerán huecos y zonas deformadas en el resultado.',
        ],
        tip: 'En cultivos altos o terrenos con relieve, sube el solapamiento: el software necesita más coincidencias para no perderse.',
      },
      {
        title: 'Coloca Puntos de Control Terrestre (GCP)',
        body: [
          'Un GCP es una marca en el suelo cuya coordenada exacta mides con un GPS de precisión.',
          'Sirven para "amarrar" el mapa del dron a la realidad: sin ellos, el mapa puede estar desplazado varios metros.',
          'Distribuye los GCP por todo el terreno (no todos juntos) y mide cada uno con cuidado. Si usas RTK con buena señal, necesitarás menos GCP.',
        ],
        tip: 'Pocos GCP mal repartidos engañan al software. Mejor 5 bien distribuidos que 10 amontonados en una esquina.',
      },
      {
        title: 'Repaso del Módulo 1',
        body: [
          'Ya sabes lo esencial para que un vuelo se convierta en datos confiables:',
          '1) Una foto no mide; la fotogrametría sí. 2) El GSD define el detalle. 3) El solapamiento evita huecos. 4) Los GCP dan precisión real.',
          'Con esto puedes leer una propuesta técnica sin perderte y saber por qué un mapa es preciso o no.',
        ],
        tip: 'Si una palabra te suena rara (NDVI, GSD, RTK...), selecciónala en pantalla y pulsa el botón del asistente para que te la explique.',
      },
    ],
  },
  {
    id: 'm2',
    num: 2,
    level: 'Intermedio',
    title: 'Traduciendo Ortomosaicos y Elevaciones',
    desc:
      'Aprende a leer Modelos Digitales de Terreno (MDT) vs Modelos de Superficie (MDS). Cómo interpretar curvas de nivel, calcular pendientes para riego y medir volúmenes de acopios correctamente.',
    img: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=600&q=80',
    imgAlt: 'Mapa topográfico',
    steps: [
      {
        title: 'Del montón de fotos al ortomosaico',
        body: [
          'El ortomosaico es la imagen única y gigante que el software arma uniendo todas tus fotos ya corregidas.',
          'Su gran ventaja: está ortorrectificado, es decir, cada punto está en su posición real y puedes medir distancias y áreas directamente sobre él.',
          'Abre el ortomosaico y comprueba la escala: una distancia conocida (un galpón, una calle) debe medir lo mismo en el mapa que en terreno.',
        ],
        tip: 'Si las medidas no calzan con la realidad, revisa los GCP y el procesamiento antes de confiar en el mapa.',
      },
      {
        title: 'Distingue MDT y MDS',
        body: [
          'El MDS (Modelo Digital de Superficie) incluye TODO lo que sobresale: árboles, techos, postes.',
          'El MDT (Modelo Digital del Terreno) muestra solo el suelo desnudo, sin vegetación ni construcciones.',
          'Recuerda esta resta clave: MDS − MDT = altura de los objetos. Así obtienes, por ejemplo, la altura de cada árbol.',
        ],
        tip: 'Para diseñar riego o caminos usa el MDT. Para medir vegetación o estructuras usa la diferencia MDS − MDT.',
      },
      {
        title: 'Lee las curvas de nivel',
        body: [
          'Las curvas de nivel unen puntos que están a la misma altura.',
          'Interprétalas así: líneas muy juntas = terreno empinado; líneas separadas = terreno plano.',
          'Sigue una curva con el dedo: nunca cambia de altura. Cruzar varias curvas en poca distancia significa una subida o bajada fuerte.',
        ],
        tip: 'El espaciado entre curvas (la "equidistancia") debe estar indicado en el plano; sin ese dato, no puedes juzgar la pendiente.',
      },
      {
        title: 'Calcula pendientes para riego',
        body: [
          'La pendiente es la inclinación del terreno, normalmente en porcentaje.',
          'Calcúlala como: (diferencia de altura ÷ distancia horizontal) × 100. Por ejemplo, 2 m de desnivel en 100 m = 2% de pendiente.',
          'Usa la pendiente para decidir el riego: en terrenos muy inclinados el agua escurre y erosiona; en planos puede encharcarse.',
        ],
        tip: 'Las zonas de pendiente brusca son candidatas a erosión: márcalas para protegerlas o nivelarlas.',
      },
      {
        title: 'Mide volúmenes de acopios',
        body: [
          'Para medir cuánto material hay en un montón (m³), el software compara el modelo 3D con una superficie de referencia (la base del acopio).',
          'Define bien esa base: si la marcas mal, el volumen sale mal. Es el error más común.',
          'Verifica el resultado con sentido común y, si es posible, con una medición de control en terreno.',
        ],
        tip: 'El mismo método sirve para movimientos de tierra: comparas el "antes" y el "después" para saber cuánto se movió.',
      },
      {
        title: 'Repaso del Módulo 2',
        body: [
          'Ahora puedes interpretar entregables topográficos como un profesional:',
          'El ortomosaico mide en 2D; el MDT/MDS describe el relieve; las curvas de nivel muestran la forma; la pendiente guía el riego; y los volúmenes cuantifican material.',
          'Con esto traduces "imágenes bonitas" en decisiones de ingeniería y manejo del campo.',
        ],
        tip: '¿Te perdiste en algún término? Vuelve al paso anterior con el botón "Anterior" o selecciona la palabra para que el asistente te la explique.',
      },
    ],
  },
  {
    id: 'm3',
    num: 3,
    level: 'Experto',
    title: 'La Ciencia Detrás del Espectro (LiDAR & Multi)',
    desc:
      'Domina el lenguaje agrícola y forestal. Qué es la reflectancia, cómo interpretar falsos colores, mapas NDVI, estrés hídrico térmico y clasificación de nubes de puntos LiDAR bajo bosque denso.',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
    imgAlt: 'Análisis de datos',
    steps: [
      {
        title: 'Entiende la reflectancia',
        body: [
          'Cada superficie refleja la luz de forma distinta. A ese porcentaje de luz reflejada se le llama reflectancia.',
          'Lo clave: una planta sana refleja mucha luz infrarroja cercana (NIR) y poca luz roja, porque la clorofila absorbe el rojo.',
          'Memoriza esta idea: midiendo cómo cambia la reflectancia en distintas bandas, podemos "ver" la salud de la planta sin tocarla.',
        ],
        tip: 'El ojo humano solo ve rojo, verde y azul. Los sensores multiespectrales ven además el borde rojo y el infrarrojo.',
      },
      {
        title: 'Interpreta el falso color',
        body: [
          'El falso color asigna colores visibles a bandas que el ojo no ve (como el infrarrojo).',
          'Por eso en estas imágenes la vegetación sana suele aparecer en rojo intenso: no está "enferma", es solo una convención visual.',
          'Antes de interpretar, revisa la leyenda: te dice qué banda se asignó a cada color.',
        ],
        tip: 'No confundas falso color con un problema. Sin leer la leyenda, cualquier interpretación es una adivinanza.',
      },
      {
        title: 'Lee un mapa NDVI',
        body: [
          'El NDVI combina la banda roja y la NIR en un solo número entre -1 y 1 que resume el vigor de la vegetación.',
          'Interpreta la escala: valores altos (verdes) = vegetación densa y sana; valores bajos (rojos/amarillos) = suelo, estrés o poca planta.',
          'Compara zonas dentro del mismo campo y la misma fecha. No compares NDVI de cultivos o fechas distintas sin contexto.',
        ],
        tip: 'En follaje muy denso el NDVI se "satura". Ahí conviene cambiar a NDRE o GNDVI, que distinguen mejor los matices.',
      },
      {
        title: 'Detecta estrés hídrico con termografía',
        body: [
          'Cuando una planta no tiene suficiente agua, cierra sus poros (estomas) y su hoja se calienta.',
          'La termografía mide esa temperatura: las zonas más calientes suelen ser las más estresadas o con falla de riego.',
          'Cruza el mapa térmico con el de riego: si una sección caliente coincide con un sector de riego, revisa goteros o presión.',
        ],
        tip: 'La termografía detecta el problema antes de que la planta se vea marchita a simple vista: es una alerta temprana.',
      },
      {
        title: 'Clasifica nubes de puntos LiDAR',
        body: [
          'El LiDAR dispara láser y genera una nube de millones de puntos 3D, incluso atravesando huecos del follaje.',
          'El paso clave es la clasificación: separar los puntos de "suelo" de los de "vegetación" y "construcciones".',
          'Con los puntos de suelo se genera el MDT real bajo el bosque, algo que la fotogrametría con cámara no puede lograr en bosque denso.',
        ],
        tip: 'Si la clasificación está mal hecha, el "suelo" incluirá arbustos y tu MDT quedará inflado. Siempre revisa un perfil de control.',
      },
      {
        title: 'Repaso del Módulo 3',
        body: [
          'Llegaste al nivel experto. Ya manejas el lenguaje del espectro y del 3D:',
          'Reflectancia → falso color → NDVI/NDRE → termografía → LiDAR. Cada herramienta responde una pregunta distinta del cultivo o del terreno.',
          'Con esto puedes dialogar de igual a igual con agrónomos, ingenieros y proveedores de servicios geoespaciales.',
        ],
        tip: '¡Felicitaciones! Completar los tres módulos te da la base para interpretar cualquier entregable de TeMapeo.',
      },
    ],
  },
]

export default MODULES
