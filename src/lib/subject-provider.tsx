import { useMemo, useState } from 'react'

import { SubjectContext } from '@/lib/subject-context'
import { asignaturas as todasAsignaturas } from '@/mocks/data'

/**
 * Provee la asignatura activa a toda la aplicación.
 *
 * Va por encima del router, no dentro de `AppLayout`, por dos razones:
 *
 * 1. Las páginas renderizan `<AppLayout>` desde dentro, así que cualquier
 *    `useSubject()` en el cuerpo de una página se ejecutaba **antes** de que
 *    el proveedor existiera y lanzaba. Cinco pantallas del profesor salían
 *    en blanco por esto.
 * 2. El eje de asignatura es de la sesión, no de una pantalla: con el estado
 *    dentro del layout, cambiar de pantalla remontaba el proveedor y la
 *    selección volvía a la primera asignatura.
 *
 * Que envuelva también a las pantallas públicas no molesta: es estado en
 * memoria y ninguna de ellas lo consume.
 */
export function SubjectProvider({ children }: { children: React.ReactNode }) {
  const [asignaturaId, setAsignaturaId] = useState(todasAsignaturas[0].id)

  const asignatura =
    todasAsignaturas.find((item) => item.id === asignaturaId) ??
    todasAsignaturas[0]

  const value = useMemo(
    () => ({ asignatura, asignaturas: todasAsignaturas, setAsignaturaId }),
    [asignatura],
  )

  return (
    <SubjectContext.Provider value={value}>{children}</SubjectContext.Provider>
  )
}
