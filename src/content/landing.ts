/** Contenido provisional de la landing comercial (0.1). */

export const heroStats = [
  {
    value: '+45',
    label: 'Cátedras activas',
    detail: 'En universidades públicas y privadas',
  },
  {
    value: '100 %',
    label: 'Trazabilidad ética',
    detail: 'Auditabilidad total en cada calificación',
  },
  {
    value: '0 %',
    label: 'Datos usados para entrenamiento',
    detail: 'Aislamiento y secreto de la propiedad intelectual',
  },
]

/** Los tres pilares. `icon` se resuelve en la página. */
export const pilares = [
  {
    icon: 'human' as const,
    title: 'El profesor en el centro (human-in-the-loop)',
    body: 'La IA genera sugerencias preliminares de corrección, rúbricas y contrastes historiográficos. La ratificación docente es obligatoria y cada modificación humana retroalimenta el criterio propio del departamento sin transferir datos al exterior.',
    link: 'Control soberano de actas y ponderaciones',
  },
  {
    icon: 'governance' as const,
    title: 'Gobernanza institucional y EU AI Act',
    body: 'Cumplimiento riguroso de la clasificación de alto riesgo en educación según el reglamento europeo: registro de exámenes, evidencias documentadas de decisiones y trazabilidad completa del linaje documental.',
    link: 'Auditable ante comisiones de calidad',
  },
  {
    icon: 'student' as const,
    title: 'Valor formativo real para el alumno',
    body: 'Tutor socrático anclado que no resuelve ejercicios ni regala respuestas automáticas. Fomenta el razonamiento crítico y apoya la autoevaluación basándose únicamente en el corpus bibliográfico y las rúbricas aprobadas por su docente.',
    link: 'Cero alucinaciones sin referencia bibliográfica',
  },
]

export const comparativa = {
  head: [
    'Criterio institucional',
    'Modelos de consumo abiertos',
    'AcademIA (infraestructura de cátedra)',
  ] as [string, string, string],
  rows: [
    [
      'Supervisión en la nota final',
      'Caja negra no auditable, con riesgo de automatización ciega.',
      'Human-in-the-loop estricto, con ratificación de cada ponderación y rúbrica.',
    ],
    [
      'Privacidad y derechos de autor',
      'Entrenamiento con trabajos, tesis y apuntes de alumnos y profesores.',
      'Aislamiento por cátedra: cero datos exportados para entrenar modelos públicos.',
    ],
    [
      'Cumplimiento del reglamento europeo de IA',
      'Sin garantías de registro técnico ni trazabilidad para auditorías.',
      'Sellado criptográfico en actas, evidencias documentadas y linaje de fuentes.',
    ],
    [
      'Integración con el campus virtual',
      'Copiar y pegar manual, con fragmentación del flujo de trabajo.',
      'Conector bidireccional LTI con Moodle, Canvas y Blackboard en un solo clic.',
    ],
    [
      'Método de aprendizaje para el alumno',
      'Entrega respuestas directas, lo que inhibe el esfuerzo cognitivo.',
      'Diálogo socrático restringido a las fuentes oficiales aprobadas por el docente.',
    ],
  ] as [string, string, string][],
}

export const testimonios = [
  {
    quote:
      'AcademIA nos ha permitido reducir los plazos de entrega de correcciones cualitativas de tres semanas a dos días, sin perder el control de la calificación. Saber que el sistema cumple el reglamento europeo da una tranquilidad absoluta a nuestro decanato.',
    author: 'Dra. Elena Ramos',
    role: 'Catedrática de Historia Contemporánea',
    initials: 'ER',
  },
  {
    quote:
      'El mayor acierto pedagógico es el tutor socrático. Los alumnos ya no usan la IA para que les escriba el ensayo, sino como un ejercicio conceptual que les interroga sobre la bibliografía obligatoria.',
    author: 'Dr. Marc Alcaraz',
    role: 'Director del Departamento de Ciencias Políticas',
    initials: 'MA',
  },
  {
    quote:
      'La integración técnica con Moodle se completó en una sola mañana de coordinación con el vicerrectorado de transformación digital. Rigurosa, transparente y con trazabilidad criptográfica.',
    author: 'Ing. Teresa Guzmán',
    role: 'Coordinadora TIC de Grado',
    initials: 'TG',
  },
]

export const ecosistema = [
  'Moodle LMS',
  'Canvas LTI 1.3',
  'Blackboard Learn',
  'Guías docentes ANECA',
  'Protocolos RedIRIS',
]

/** Filas del cuaderno que se muestra en la vista previa del producto. */
export const previewRows = [
  { alumno: 'A. Belmonte', propuesta: '8,4', estado: 'ratificada' as const },
  { alumno: 'C. Duarte', propuesta: '7,1', estado: 'ratificada' as const },
  { alumno: 'L. Ferrán', propuesta: '9,0', estado: 'pendiente' as const },
  { alumno: 'M. Iriarte', propuesta: '6,5', estado: 'propuesta' as const },
]
