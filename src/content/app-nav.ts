/**
 * Navegación de las tres consolas privadas.
 *
 * Las referencias de diseño muestran cuatro niveles y los dos primeros son
 * navegación: `modulos` son las pestañas de la fila 2 y `secciones` la barra
 * lateral. Se separan así porque la consola de profesor tiene 15 rutas y no
 * caben en un solo nivel; agrupadas por módulo, sí.
 */

export type NavSeccion = {
  label: string
  to: string
  /** Nombre del icono de lucide, resuelto en el componente. */
  icon: string
  /** Contador que se pinta a la derecha, si aplica. */
  badge?: string
}

export type NavGrupo = {
  titulo: string
  items: NavSeccion[]
}

export type NavModulo = {
  label: string
  /** Prefijo de ruta que activa esta pestaña. */
  base: string
  grupos: NavGrupo[]
}

export const modulosProfesor: NavModulo[] = [
  {
    label: 'Cuaderno de evaluación',
    base: '/app',
    grupos: [
      {
        titulo: 'Visión académica',
        items: [
          { label: 'Resumen de curso', to: '/app', icon: 'LayoutPanelLeft' },
          { label: 'Evaluaciones', to: '/app/evaluar', icon: 'ClipboardList', badge: '18' },
          { label: 'Cuaderno de calificaciones', to: '/app/cuaderno', icon: 'Table2' },
          { label: 'Mis clases', to: '/app/clases', icon: 'Users' },
        ],
      },
      {
        titulo: 'Asignaturas',
        items: [
          { label: 'Todas mis asignaturas', to: '/app/asignaturas', icon: 'Library' },
        ],
      },
    ],
  },
  {
    label: 'Generador de contenidos',
    base: '/app/generar',
    grupos: [
      {
        titulo: 'Generadores',
        items: [
          { label: 'Hub de generación', to: '/app/generar', icon: 'Sparkles' },
          { label: 'Exámenes', to: '/app/generar/examen', icon: 'FileQuestion' },
          { label: 'Rúbricas', to: '/app/generar/rubrica', icon: 'ListChecks' },
          { label: 'Fichas de refuerzo', to: '/app/generar/ficha', icon: 'Layers' },
          { label: 'Situaciones de aprendizaje', to: '/app/generar/situacion', icon: 'Presentation' },
        ],
      },
    ],
  },
  {
    label: 'Evidencias y linaje',
    base: '/app/contenidos',
    grupos: [
      {
        titulo: 'Corpus de la cátedra',
        items: [
          { label: 'Inventario de contenidos', to: '/app/contenidos', icon: 'FolderTree' },
        ],
      },
      {
        titulo: 'Herramientas IA',
        items: [
          { label: 'Coordinación de departamento', to: '/app/coordinacion', icon: 'Share2' },
        ],
      },
    ],
  },
  {
    label: 'Configuración de materia',
    base: '/app/ajustes',
    grupos: [
      {
        titulo: 'Preferencias',
        items: [
          { label: 'Ajustes del profesor', to: '/app/ajustes', icon: 'Settings' },
        ],
      },
    ],
  },
]

export const modulosInstitucion: NavModulo[] = [
  {
    label: 'Gobierno del centro',
    base: '/centro',
    grupos: [
      {
        titulo: 'Visión de centro',
        items: [
          { label: 'Dashboard de centro', to: '/centro', icon: 'LayoutPanelLeft' },
          { label: 'Usuarios y roles', to: '/centro/usuarios', icon: 'Users' },
          { label: 'Consumo y licencias', to: '/centro/consumo', icon: 'Gauge' },
        ],
      },
      {
        titulo: 'Gobierno y cumplimiento',
        items: [
          { label: 'Políticas y permisos', to: '/centro/politicas', icon: 'ShieldCheck' },
          { label: 'Analítica académica', to: '/centro/analitica', icon: 'Network' },
          { label: 'Alertas tempranas', to: '/centro/alertas', icon: 'AlertTriangle', badge: '4' },
          { label: 'Coordinación de centro', to: '/centro/coordinacion', icon: 'CalendarRange' },
          { label: 'Trazabilidad y auditoría', to: '/centro/auditoria', icon: 'FileSearch' },
          { label: 'Configuración del centro', to: '/centro/configuracion', icon: 'Settings2' },
        ],
      },
    ],
  },
]

export const modulosAlumno: NavModulo[] = [
  {
    label: 'Mi aprendizaje',
    base: '/alumno',
    grupos: [
      {
        titulo: 'Mis asignaturas',
        items: [
          { label: 'Inicio', to: '/alumno', icon: 'LayoutPanelLeft' },
          { label: 'Tutor de refuerzo', to: '/alumno/tutor', icon: 'MessageCircleQuestion' },
          { label: 'Práctica adaptativa', to: '/alumno/practica', icon: 'Dumbbell' },
          { label: 'Mis tareas y feedback', to: '/alumno/tareas', icon: 'ClipboardCheck' },
        ],
      },
      {
        titulo: 'Mi progreso',
        items: [
          { label: 'Mi mapa de dominio', to: '/alumno/dominio', icon: 'Compass' },
          { label: 'Mis materiales de clase', to: '/alumno/materiales', icon: 'FolderOpen' },
          { label: 'Autoevaluación con rúbrica', to: '/alumno/autoevaluacion', icon: 'ListChecks' },
          { label: 'Portfolio', to: '/alumno/portfolio', icon: 'BookOpen' },
        ],
      },
    ],
  },
]

/** Pie de las consolas privadas: la nota de cumplimiento va siempre visible. */
export const notaCumplimiento =
  'Modelo de IA conforme con el reglamento europeo de IA (supervisión humana activa)'
