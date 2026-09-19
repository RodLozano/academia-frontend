import { Link } from 'react-router-dom'
import { ArrowLeft, SearchX } from 'lucide-react'

import { PageBar } from '@/components/app/page-bar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

/**
 * Lo que se muestra cuando la URL pide un recurso que no existe.
 *
 * Existe porque la alternativa que tenían las páginas de detalle era peor:
 * replegarse en silencio al primer elemento de la lista. Eso no da un error,
 * da **datos de otro** con aspecto de ser los pedidos, y en un cuaderno de
 * notas eso es exactamente el fallo que no se puede permitir.
 */
export function RecursoNoEncontrado({
  que,
  id,
  volverA,
  volverLabel,
  migas,
}: {
  /** Qué se buscaba: «la asignatura», «el contenido»… */
  que: string
  /** El identificador que venía en la URL, para que se pueda depurar. */
  id?: string
  volverA: string
  volverLabel: string
  migas: { label: string; to?: string }[]
}) {
  return (
    <>
      <PageBar
        migas={migas}
        estado={{ label: 'No encontrado', variant: 'muted' }}
      />

      <div className="p-4 lg:p-6">
        <Card className="mx-auto max-w-lg p-8 text-center">
          <span className="bg-muted text-muted-foreground mx-auto flex size-11 items-center justify-center rounded-xl">
            <SearchX className="size-5" aria-hidden />
          </span>
          <h1 className="mt-4 text-xl font-medium">No encontramos {que}</h1>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            La dirección apunta a un recurso que no existe en esta instancia, o
            al que no tienes acceso.
          </p>
          {id && (
            <p className="text-muted-foreground bg-muted mt-4 inline-block rounded-md px-2.5 py-1 font-mono text-xs break-all">
              {id}
            </p>
          )}
          <Button asChild className="mt-6">
            <Link to={volverA}>
              <ArrowLeft className="size-4" />
              {volverLabel}
            </Link>
          </Button>
        </Card>
      </div>
    </>
  )
}
