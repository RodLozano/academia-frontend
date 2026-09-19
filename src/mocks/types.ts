/**
 * Modelo de datos de la maqueta. Refleja los principios del inventario:
 *
 * - La asignatura organiza todo: materiales, generados, clases y evaluación
 *   cuelgan de ella.
 * - Los contenidos tienen doble naturaleza: `original` (fuente subida por el
 *   docente) y `generado` (salida de IA, con linaje a los originales de los que
 *   salió).
 * - Toda evaluación termina en un paso humano: una entrega no está cerrada
 *   hasta que un docente ratifica la nota.
 *
 * Cuando exista el backend, estos tipos son el contrato que debe cumplir
 * /api/*. Los datos de src/mocks/data.ts son inventados y desechables; estos
 * tipos no.
 */

export type Rol = 'profesor' | 'institucion' | 'alumno'

export type Persona = {
  id: string
  nombre: string
  /** Departamento, facultad o grupo, según el rol. */
  adscripcion: string
  iniciales: string
  rol: Rol
}

export type Asignatura = {
  id: string
  /** Código oficial de la materia, se muestra en mono. */
  codigo: string
  nombre: string
  titulacion: string
  grupo: string
  curso: string
  descripcion: string
  alumnos: number
  grupos: number
  activa: boolean
}

/** La doble naturaleza del contenido. */
export type NaturalezaContenido = 'original' | 'generado'

export type TipoGenerado =
  | 'examen'
  | 'rubrica'
  | 'ficha'
  | 'situacion'

export type Contenido = {
  id: string
  titulo: string
  naturaleza: NaturalezaContenido
  /** Solo en generados. */
  tipo?: TipoGenerado
  asignaturaId: string
  unidad: string
  version: number
  /** Hash de versión; en la maqueta es decorativo. */
  hash: string
  actualizado: string
  /** Ids de contenidos originales de los que salió. Solo en generados. */
  linaje?: string[]
  /** Páginas, en originales; ítems, en generados. */
  extension: string
  autor: string
}

/** El estado recorre el ciclo: la IA propone, el humano ratifica. */
export type EstadoEntrega =
  /** Entregado, sin pasar por el motor. */
  | 'sin-revisar'
  /** El motor ha propuesto nota; falta el paso humano. */
  | 'propuesta'
  /** Un docente la ha ratificado. Terminal. */
  | 'ratificada'
  /** El alumno no ha entregado. */
  | 'pendiente-alumno'

export type Entrega = {
  id: string
  alumnoId: string
  alumnoNombre: string
  iniciales: string
  tareaId: string
  tarea: string
  asignaturaId: string
  claseId: string
  entregadoEl: string | null
  estado: EstadoEntrega
  /** Nota propuesta por el motor, sobre 10. Orientativa. */
  notaPropuesta: number | null
  /** Nota que ratificó el docente. Es la única que cuenta. */
  notaRatificada: number | null
  /** Confianza declarada por el motor, 0-1. */
  confianza: number | null
  palabras: number
}

export type Tarea = {
  id: string
  titulo: string
  asignaturaId: string
  claseId: string
  unidad: string
  rubricaId: string | null
  limite: string
  entregas: number
  total: number
}

export type Clase = {
  id: string
  nombre: string
  asignaturaId: string
  alumnos: number
  franja: string
  aula: string
}

export type Alumno = {
  id: string
  nombre: string
  iniciales: string
  claseId: string
  /** Media de las notas ratificadas, sobre 10. */
  media: number | null
  entregasPendientes: number
  /** Competencias con su nivel de dominio, 0-100. */
  dominio: { competencia: string; nivel: number }[]
  /** Tendencia respecto al corte anterior. */
  tendencia: 'sube' | 'baja' | 'estable'
}

/** Criterio de una rúbrica, con su peso. */
export type CriterioRubrica = {
  id: string
  criterio: string
  peso: number
  niveles: { nivel: string; descriptor: string }[]
}
