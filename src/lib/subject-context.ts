import { createContext, useContext } from 'react'

import type { Asignatura } from '@/mocks/types'

/**
 * El eje de asignatura vive en la carcasa, no dentro de cada página
 * (inventario, consola 3): se elige una vez en la barra superior y el resto de
 * las pantallas quedan filtradas por ese contexto.
 */
export type SubjectContextValue = {
  asignatura: Asignatura
  asignaturas: Asignatura[]
  setAsignaturaId: (id: string) => void
}

export const SubjectContext = createContext<SubjectContextValue | null>(null)

export function useSubject() {
  const context = useContext(SubjectContext)
  if (!context) {
    throw new Error('useSubject debe usarse dentro de <AppLayout>')
  }
  return context
}
