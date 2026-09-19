import {
  FileQuestion,
  Layers,
  ListChecks,
  Presentation,
  type LucideIcon,
} from 'lucide-react'

import type { TipoGenerado } from '@/mocks/types'

/**
 * Los cuatro generadores, uno por tipo de salida del inventario (1.6).
 *
 * Vive en content y no en la página porque lo consumen dos pantallas —el hub y
 * el espacio de trabajo— y una página no debe importar de otra.
 */
export type Generador = {
  tipo: TipoGenerado
  icon: LucideIcon
  titulo: string
  cuerpo: string
  salida: string
}

export const generadores: Generador[] = [
  {
    tipo: 'examen',
    icon: FileQuestion,
    titulo: 'Exámenes',
    cuerpo:
      'Baterías de ítems ancladas a las unidades del corpus, con distribución por nivel de dificultad y criterio de corrección asociado.',
    salida: 'Batería de ítems',
  },
  {
    tipo: 'rubrica',
    icon: ListChecks,
    titulo: 'Rúbricas',
    cuerpo:
      'Matrices de evaluación con criterios, pesos y descriptores graduados, alineadas a las competencias de la titulación.',
    salida: 'Matriz de criterios',
  },
  {
    tipo: 'ficha',
    icon: Layers,
    titulo: 'Fichas de refuerzo',
    cuerpo:
      'Material de repaso sobre los puntos donde el grupo muestra menos dominio, con repetición espaciada.',
    salida: 'Juego de tarjetas',
  },
  {
    tipo: 'situacion',
    icon: Presentation,
    titulo: 'Situaciones de aprendizaje',
    cuerpo:
      'Secuencias de sesiones con su desarrollo, agrupamientos y evidencias de evaluación previstas.',
    salida: 'Secuencia de sesiones',
  },
]
