/**
 * Fixture de una entrega concreta, para la pantalla de corrección. Texto
 * inventado, como el resto de src/mocks.
 *
 * Las anotaciones son el mecanismo central de la pantalla: cada una ancla una
 * observación del motor a un fragmento del texto del alumno, y las de tipo
 * `alerta` son las que reclaman criterio docente.
 */

export type Anotacion = {
  id: string
  /** `observacion` = el motor explica; `alerta` = el motor pide criterio. */
  tipo: 'observacion' | 'alerta'
  etiqueta: string
  /** Referencia corta, se muestra en mono. */
  ref: string
  texto: string
  /** Fragmento del texto que la anotación resalta, si lo hay. */
  resaltado?: string
}

export const parrafos = [
  'Los trece días de octubre de 1962 constituyen el punto de inflexión más crítico del siglo XX. El descubrimiento por parte de los aviones espía U-2 estadounidenses de las instalaciones de lanzamiento de misiles balísticos soviéticos en territorio cubano quebró la premisa de la vulnerabilidad asimétrica norteamericana.',
  'En última instancia, la distensión no implicó la extinción del antagonismo ideológico ni la desmilitarización global, sino su canalización mediante normas de contención mutua y disuasión formalizada. Los acuerdos de Helsinki de 1975 no hicieron sino consolidar un statu quo nacido del pavor compartido a la aniquilación atómica desencadenada en el Caribe trece años atrás.',
]

export const anotaciones: Anotacion[] = [
  {
    id: 'an-1',
    tipo: 'observacion',
    etiqueta: 'Observación vinculada (criterio 1: fuentes primarias)',
    ref: '#REF-01',
    texto:
      'La resolución del conflicto evidenció la insuficiencia de las vías diplomáticas tradicionales ante la velocidad del apocalipsis nuclear. Los canales paralelos permitieron forjar un compromiso confidencial: el retiro de las ojivas quedó condicionado al desmantelamiento de los silos de Anatolia y al compromiso explícito de no agresión a la isla.',
  },
  {
    id: 'an-2',
    tipo: 'alerta',
    etiqueta: 'Alerta de validación docente (posible desliz cronológico)',
    ref: '#FLAG-CRON',
    texto:
      'A raíz de esta experiencia casi terminal, la necesidad de una comunicación perentoria cristalizó en la creación del llamado «teléfono rojo», inaugurado en junio de 1963. Inmediatamente después, el Tratado de Prohibición Parcial de Ensayos Nucleares sentó el sustrato para la doctrina de la destrucción mutua asegurada.',
    resaltado:
      'La ulterior firma del Tratado de No Proliferación en 1968 y la ratificación de los acuerdos SALT I en 1972 coronaron este marco de equilibrio estratégico antes de la entrada de Johnson en la presidencia.',
  },
]

export const bibliografia = [
  'Jrushchov, N. (1970). Khrushchev Remembers. Little, Brown & Company.',
  'Dobrynin, A. (1995). In Confidence: Moscow’s Ambassador to America’s Six Cold War Presidents. Random House.',
  'Garthoff, R. L. (1989). Reflections on the Cuban Missile Crisis. Brookings Institution Press.',
]

/** Desglose por criterio de la propuesta del motor. */
export const desglose = [
  {
    criterio: 'Rigor historiográfico y fuentes primarias',
    puntos: 1.8,
    sobre: 2.5,
    comentario:
      'Cita adecuadamente las memorias de Jrushchov, pero omite la correspondencia diplomática desclasificada del gabinete Kennedy.',
  },
  {
    criterio: 'Capacidad analítica y argumentación',
    puntos: 2.3,
    sobre: 2.5,
    comentario:
      'Análisis sólido del impacto geopolítico global y del cambio de doctrina hacia la destrucción mutua asegurada.',
  },
  {
    criterio: 'Estructura y coherencia hermenéutica',
    puntos: 1.9,
    sobre: 2.5,
    comentario:
      'Introducción y cuerpo narrativo bien proporcionados; el cierre sobre los acuerdos de Helsinki es excesivamente sintético.',
  },
  {
    criterio: 'Aparato crítico y citación',
    puntos: 1.5,
    sobre: 2.5,
    comentario:
      'Inconsistencia de formato en las fuentes secundarias; falta consignar números de página en las citas textuales directas.',
  },
]

export const atencionDocente = {
  titulo: 'Atención docente: posible error cronológico',
  cuerpo:
    'El texto sitúa la firma de los acuerdos SALT I (1972) antes del mandato de Lyndon B. Johnson (1963–1969). Conviene verificar si se trata de una errata de redacción o de una laguna conceptual antes de ratificar el criterio 1.',
}

export const retroalimentacion =
  'Buen trabajo de síntesis geopolítica. La exposición sobre la Operación Anádir y las conversaciones secretas es clara y madura. No obstante, revisa la cronología del tercer párrafo (SALT I se suscribió bajo la administración Nixon, no antes de Johnson) y recuerda unificar el estilo de citación incorporando la foliación exacta de las monografías.'

export const trazaInferencia = '#eval-982f1c0'
