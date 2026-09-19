import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type Miga = { label: string; to?: string }

/**
 * Barra de migas y acciones de página. Cuarto elemento de la carcasa en las
 * referencias: sitúa dónde estás y ofrece las acciones de esta pantalla.
 */
export function PageBar({
  migas,
  estado,
  acciones,
}: {
  migas: Miga[]
  /** Distintivo de estado a la derecha de las migas. */
  estado?: { label: string; variant?: 'success' | 'muted' | 'human' }
  acciones?: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b px-4 py-2.5">
      <nav aria-label="Ruta de navegación" className="min-w-0">
        <ol className="text-muted-foreground flex min-w-0 flex-wrap items-center gap-1.5 text-xs">
          {migas.map((miga, index) => {
            const ultima = index === migas.length - 1
            return (
              <li key={miga.label} className="flex min-w-0 items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight className="size-3 shrink-0" aria-hidden />
                )}
                {miga.to && !ultima ? (
                  <Link to={miga.to} className="hover:text-foreground truncate">
                    {miga.label}
                  </Link>
                ) : (
                  <span
                    className={cn('truncate', ultima && 'text-foreground')}
                    aria-current={ultima ? 'page' : undefined}
                  >
                    {miga.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>

      {estado && (
        <Badge variant={estado.variant ?? 'success'}>{estado.label}</Badge>
      )}

      {acciones && (
        <div className="ml-auto flex shrink-0 items-center gap-2">
          {acciones}
        </div>
      )}
    </div>
  )
}
