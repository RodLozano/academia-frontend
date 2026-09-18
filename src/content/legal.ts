/**
 * Contenido del hub legal (0.5). TEXTO DE MAQUETA, SIN VALIDEZ JURÍDICA:
 * reproduce la estructura de un documento real para validar la maquetación.
 * El texto definitivo lo redactará asesoría jurídica.
 */

export type LegalBlock =
  | { kind: 'h'; text: string }
  | { kind: 'p'; text: string }
  /** Lista de definiciones: término en negrita + descripción. */
  | { kind: 'terms'; items: { term: string; text: string }[] }
  | { kind: 'table'; head: [string, string]; rows: [string, string][] }
  | { kind: 'callout'; tone: 'neutral' | 'primary'; title: string; text: string }
  /** Parámetro de auditoría → implementación técnica, en mono. */
  | { kind: 'audit'; rows: [string, string][] }

export type LegalSection = {
  /** Segmento de ruta: /legal/:slug */
  slug: string
  /** Numeral mostrado en el índice y el documento. */
  index: string
  navLabel: string
  title: string
  badge?: string
  blocks: LegalBlock[]
}

export const legalSections: LegalSection[] = [
  {
    slug: 'privacidad',
    index: '01',
    navLabel: 'Política de privacidad',
    title: 'Política de privacidad y tratamiento de datos académicos',
    blocks: [
      {
        kind: 'p',
        text: 'La presente política rige el tratamiento de la información recabada a través de las instancias de AcademIA desplegadas en servidores soberanos para universidades públicas y privadas. El responsable del tratamiento es el centro universitario o la cátedra titular de la suscripción, y AcademIA actúa estrictamente como encargado del tratamiento.',
      },
      { kind: 'h', text: 'Principio rector de no reentrenamiento comercial' },
      {
        kind: 'p',
        text: 'Ningún contenido docente, examen, rúbrica o producción de los estudiantes se utiliza para entrenar, ajustar o transferir conocimiento a modelos fundacionales públicos o comerciales. Los pesos de inferencia operan de manera aislada por cátedra e institución, en entornos cerrados con memoria volátil de ejecución.',
      },
      { kind: 'h', text: 'Datos recopilados y categorías de titulares' },
      {
        kind: 'terms',
        items: [
          {
            term: 'Personal docente e investigador',
            text: 'nombre, identificador corporativo, adscripción de departamento, historial de rúbricas y firmas de ratificación.',
          },
          {
            term: 'Alumnado',
            text: 'identificador pseudonimizado, entregas de trabajos, consultas al tutor adaptativo y métricas pedagógicas de refuerzo. En ningún caso se realiza perfilado de conducta externa, scoring crediticio ni biométrico.',
          },
          {
            term: 'Registros técnicos de auditoría',
            text: 'hashes de versiones de contenido, prompts estructurados y sellos temporales conforme a los requisitos de la inspección universitaria.',
          },
        ],
      },
      {
        kind: 'callout',
        tone: 'neutral',
        title: 'Ejercicio de derechos ARCO / RGPD',
        text: 'Cualquier estudiante o docente puede solicitar la exportación íntegra de su expediente en formato estructurado, o la supresión de los datos no vinculados a actas oficiales, a través del delegado de protección de datos del centro.',
      },
    ],
  },
  {
    slug: 'terminos',
    index: '02',
    navLabel: 'Términos del servicio',
    title: 'Términos del servicio institucional',
    blocks: [
      {
        kind: 'p',
        text: 'El acceso a AcademIA se otorga bajo un régimen de licencia institucional para instituciones de educación superior. El servicio está concebido como una infraestructura de cátedra que apoya la docencia y la evaluación cualitativa, sin reemplazar en ningún momento la deliberación pedagógica del tribunal o del profesor responsable.',
      },
      { kind: 'h', text: 'Propiedad intelectual y autoría docente' },
      {
        kind: 'p',
        text: 'Los materiales subidos por el profesorado —corpus documental, bibliografías, apuntes y criterios de evaluación— son y seguirán siendo de la exclusiva titularidad de la universidad y de sus respectivos autores. La plataforma no adquiere derecho alguno de explotación comercial, cesión ni distribución no autorizada. Las sugerencias formuladas por los módulos de asistencia constituyen meros borradores técnicos cuya autoría final corresponde al docente que los ratifica y adopta.',
      },
      { kind: 'h', text: 'Disponibilidad, acuerdos de nivel de servicio y conectores' },
      {
        kind: 'p',
        text: 'Los periodos de mantenimiento programado se notifican con al menos 72 horas lectivas de antelación y nunca coinciden con ventanas oficiales de exámenes finales fijadas por los vicerrectorados. El nivel de servicio y las condiciones de soporte se recogen en el anexo económico de cada convenio.',
      },
    ],
  },
  {
    slug: 'dpa',
    index: '03',
    navLabel: 'Encargo de tratamiento (DPA)',
    title: 'Acuerdo de encargo de tratamiento (DPA)',
    blocks: [
      {
        kind: 'p',
        text: 'De acuerdo con el artículo 28 del Reglamento General de Protección de Datos, este anexo regula de manera vinculante las instrucciones de la universidad (responsable) hacia AcademIA (encargado).',
      },
      {
        kind: 'table',
        head: ['Estipulación RGPD', 'Compromiso técnico de AcademIA'],
        rows: [
          [
            'Ubicación y soberanía',
            'Centros de datos ubicados exclusivamente en la Unión Europea. Cero transferencias internacionales de datos fuera del EEE.',
          ],
          [
            'Subencargados ulteriores',
            'Prohibición de inclusión de subprocesadores de inferencia sin comunicación previa y aprobación formal del responsable, en un plazo de 30 días hábiles.',
          ],
          [
            'Cifrado en reposo y tránsito',
            'Cifrado de extremo a extremo para las comunicaciones y para el almacenamiento persistente, con gestión de claves custodiadas por módulo institucional.',
          ],
          [
            'Auditoría y verificación',
            'Facultad de la universidad para realizar auditorías anuales, presenciales o telemáticas, sobre el linaje de datos y los protocolos de custodia de exámenes.',
          ],
        ],
      },
      { kind: 'h', text: 'Gestión de brechas de seguridad' },
      {
        kind: 'p',
        text: 'En caso de detectarse cualquier incidente de seguridad que afecte a la confidencialidad, integridad o disponibilidad de los datos académicos, el equipo de respuesta notificará a la universidad titular en un plazo máximo de 24 horas hábiles, aportando el análisis preliminar de impacto y las medidas paliativas.',
      },
    ],
  },
  {
    slug: 'ai-act',
    index: '04',
    navLabel: 'Cumplimiento EU AI Act',
    title: 'Declaración de cumplimiento del Reglamento de IA de la UE',
    badge: 'Alto riesgo',
    blocks: [
      {
        kind: 'callout',
        tone: 'primary',
        title: 'Clasificación: sistema de IA de alto riesgo (anexo III, ámbito educativo)',
        text: 'Los sistemas de IA empleados para evaluar los resultados de aprendizaje o influir en la progresión académica están clasificados como de alto riesgo bajo el marco normativo europeo. AcademIA ha sido diseñada desde su núcleo técnico para cumplir los requisitos asociados a esa clasificación.',
      },
      { kind: 'h', text: 'Supervisión humana efectiva (human-in-the-loop)' },
      {
        kind: 'terms',
        items: [
          {
            term: 'La IA solo propone borradores',
            text: 'las notas, ponderaciones numéricas y valoraciones rubricadas elaboradas por el motor tienen carácter meramente consultivo y preliminar.',
          },
          {
            term: 'El profesorado ratifica de forma indelegable',
            text: 'la calificación solo se consolida en el expediente mediante el acto deliberado y consciente del docente, identificado en la interfaz por el botón de ratificación humana.',
          },
          {
            term: 'Capacidad de revocación total',
            text: 'el docente puede ignorar, sobrescribir o ajustar cualquier parámetro sugerido sin limitación técnica.',
          },
        ],
      },
      { kind: 'h', text: 'Trazabilidad, gobernanza de datos y registro técnico' },
      {
        kind: 'p',
        text: 'Cada decisión asistida queda respaldada por un identificador unívoco y un registro técnico inmutable que almacena:',
      },
      {
        kind: 'audit',
        rows: [
          ['Hash criptográfico de versión', 'inmutable por entrega'],
          ['Linaje de fuentes', 'anclaje estricto a corpus bibliográfico acreditado'],
          ['Custodia de registros', 'retención por el plazo legal exigido'],
          ['Pruebas de sesgo y equidad', 'evaluación periódica de disparidad de impacto'],
        ],
      },
      { kind: 'h', text: 'Transparencia e información al alumnado' },
      {
        kind: 'p',
        text: 'Los estudiantes son informados de forma expresa, clara y continua de que están interactuando con un entorno que utiliza asistencia de inteligencia artificial. En todo momento disponen de acceso a los criterios de corrección y a las rúbricas desglosadas, y del derecho a solicitar una revisión manual presencial con el profesor titular sin penalización alguna.',
      },
    ],
  },
]

export const marcosAplicables = [
  'ENS (Esquema Nacional de Seguridad)',
  'Reglamento (UE) 2016/679 (RGPD)',
  'Reglamento de IA de la UE — supervisión humana',
]

export const documentReference = 'DOC-LEG-2025-V2'
export const lastUpdated = '18 de marzo de 2025'
