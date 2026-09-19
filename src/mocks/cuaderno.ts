/**
 * Matriz del cuaderno de calificaciones. DATOS INVENTADOS.
 *
 * Cada celda declara su **procedencia**, que es la información que el cuaderno
 * existe para mostrar:
 *
 * - `ia-aceptada`: el docente ratificó la propuesta del motor sin cambiarla.
 * - `docente`: el docente se apartó de la propuesta. Guarda el delta, porque
 *   esa diferencia es la huella de la supervisión humana.
 * - `manual`: evaluación sin intervención del motor.
 * - `pendiente`: hay propuesta, pero nadie la ha ratificado. No cuenta para la
 *   nota final.
 *
 * Se guarda aparte de `entregas` porque el cuaderno necesita la rejilla
 * completa (alumnos × tareas) y las entregas son una lista dispersa.
 */

export type Procedencia = 'ia-aceptada' | 'docente' | 'manual' | 'pendiente'

export type Celda = {
  nota: number | null
  procedencia: Procedencia
  /** Diferencia respecto a la propuesta del motor. Solo en `docente`. */
  delta?: number
}

export type ColumnaCuaderno = {
  id: string
  titulo: string
  /** Clave corta, peso y tipo, se muestra en mono bajo el título. */
  meta: string
  peso: number
  /** ¿Se evaluó con una rúbrica generada? */
  conRubrica: boolean
}

export const columnas: ColumnaCuaderno[] = [
  { id: 'c1', titulo: 'Bandung 1955', meta: 'T1 · 15 % · indiv.', peso: 15, conRubrica: false },
  { id: 'c2', titulo: 'Crisis de los misiles', meta: 'T2 · 25 % · rúbrica', peso: 25, conRubrica: true },
  { id: 'c3', titulo: 'Descolonización', meta: 'P1 · 15 % · fuentes', peso: 15, conRubrica: true },
  { id: 'c4', titulo: 'Guerra Fría', meta: 'Debate · 10 %', peso: 10, conRubrica: false },
  { id: 'c5', titulo: 'Examen parcial', meta: 'Bloques I-II · 20 %', peso: 20, conRubrica: false },
  { id: 'c6', titulo: 'Seminario', meta: 'Socrático · 15 %', peso: 15, conRubrica: true },
]

export type FilaCuaderno = {
  alumnoId: string
  apellidos: string
  nombre: string
  /** Identificador académico, en mono. */
  nia: string
  celdas: Record<string, Celda>
}

const c = (
  nota: number | null,
  procedencia: Procedencia,
  delta?: number,
): Celda => ({ nota, procedencia, delta })

export const filas: FilaCuaderno[] = [
  {
    alumnoId: 'al-1',
    apellidos: 'Belmonte Ibáñez',
    nombre: 'Aitana',
    nia: '#80421',
    celdas: {
      c1: c(8.5, 'manual'),
      c2: c(9.2, 'ia-aceptada'),
      c3: c(8.8, 'manual'),
      c4: c(9.0, 'manual'),
      c5: c(8.4, 'manual'),
      c6: c(9.5, 'ia-aceptada'),
    },
  },
  {
    alumnoId: 'al-2',
    apellidos: 'Duarte Salom',
    nombre: 'Cristina',
    nia: '#80435',
    celdas: {
      c1: c(6.0, 'manual'),
      c2: c(7.5, 'docente', 1.3),
      c3: c(6.8, 'manual'),
      c4: c(7.0, 'manual'),
      c5: c(5.9, 'manual'),
      c6: c(7.0, 'ia-aceptada'),
    },
  },
  {
    alumnoId: 'al-3',
    apellidos: 'Ferrán Arjona',
    nombre: 'Lucas',
    nia: '#80442',
    celdas: {
      c1: c(9.5, 'manual'),
      c2: c(9.8, 'ia-aceptada'),
      c3: c(9.2, 'manual'),
      c4: c(9.6, 'manual'),
      c5: c(9.4, 'manual'),
      c6: c(10, 'ia-aceptada'),
    },
  },
  {
    alumnoId: 'al-4',
    apellidos: 'Iriarte Beltrán',
    nombre: 'Miriam',
    nia: '#80468',
    celdas: {
      c1: c(4.5, 'manual'),
      c2: c(5.0, 'ia-aceptada'),
      c3: c(4.0, 'manual'),
      c4: c(5.5, 'manual'),
      c5: c(4.2, 'manual'),
      c6: c(5.0, 'ia-aceptada'),
    },
  },
  {
    alumnoId: 'al-5',
    apellidos: 'Oliva Salgado',
    nombre: 'Néstor',
    nia: '#80456',
    celdas: {
      c1: c(7.0, 'manual'),
      c2: c(7.2, 'ia-aceptada'),
      c3: c(7.5, 'manual'),
      c4: c(6.5, 'manual'),
      c5: c(6.8, 'manual'),
      c6: c(7.5, 'ia-aceptada'),
    },
  },
  {
    alumnoId: 'al-6',
    apellidos: 'Sandoval Otero',
    nombre: 'Rocío',
    nia: '#80479',
    celdas: {
      c1: c(null, 'pendiente'),
      c2: c(5.2, 'pendiente'),
      c3: c(null, 'pendiente'),
      c4: c(4.8, 'manual'),
      c5: c(null, 'pendiente'),
      c6: c(5.0, 'pendiente'),
    },
  },
  {
    alumnoId: 'al-7',
    apellidos: 'Vilanova Castejón',
    nombre: 'Teo',
    nia: '#80491',
    celdas: {
      c1: c(8.5, 'manual'),
      c2: c(8.0, 'docente', -0.8),
      c3: c(8.2, 'manual'),
      c4: c(8.0, 'manual'),
      c5: c(8.7, 'manual'),
      c6: c(8.5, 'ia-aceptada'),
    },
  },
  {
    alumnoId: 'al-8',
    apellidos: 'Corral Marín',
    nombre: 'Yaiza',
    nia: '#80504',
    celdas: {
      c1: c(6.5, 'manual'),
      c2: c(6.8, 'ia-aceptada'),
      c3: c(7.0, 'manual'),
      c4: c(6.0, 'manual'),
      c5: c(6.2, 'manual'),
      c6: c(6.5, 'ia-aceptada'),
    },
  },
]

/** Nota final ponderada. Las celdas pendientes no cuentan: nadie las ha firmado. */
export function notaFinal(fila: FilaCuaderno) {
  let suma = 0
  let peso = 0
  for (const columna of columnas) {
    const celda = fila.celdas[columna.id]
    if (!celda || celda.nota === null || celda.procedencia === 'pendiente') {
      continue
    }
    suma += celda.nota * columna.peso
    peso += columna.peso
  }
  return peso > 0 ? { nota: suma / peso, cobertura: peso } : null
}

export function dictamen(nota: number) {
  if (nota < 5) return { label: 'Suspenso', variant: 'destructive' as const }
  if (nota < 7) return { label: 'Aprobado', variant: 'muted' as const }
  if (nota < 9) return { label: 'Notable', variant: 'outline' as const }
  return { label: 'Sobresaliente', variant: 'success' as const }
}

export const hashActa = 'e8f92a1…bc74'
