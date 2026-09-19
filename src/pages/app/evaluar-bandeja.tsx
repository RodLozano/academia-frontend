import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CircleCheck,
  CircleDashed,
  Clock,
  Sparkles,
} from 'lucide-react'

import { PageBar } from '@/components/app/page-bar'
import { AppLayout } from '@/layouts/app-layout'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { modulosProfesor } from '@/content/app-nav'
import { useSubject } from '@/lib/subject-context'
import { cn } from '@/lib/utils'
import { entregas } from '@/mocks/data'
import type { EstadoEntrega } from '@/mocks/types'

/**
 * Bandeja de evaluación (1.8). La cola de trabajo del docente.
 *
 * El orden no es cronológico: primero lo que espera una decisión humana,
 * porque es lo único que bloquea el cierre de un acta. Lo ya ratificado baja
 * al final, que es donde deja de requerir atención.
 */

const ESTADOS: Record<
  EstadoEntrega,
  {
    label: string
    /** Prioridad en la cola: menor va antes. */
    orden: number
    variant: 'human' | 'muted' | 'success' | 'outline'
    icon: typeof Clock
    /** ¿Reclama una decisión de una persona? */
    reclama: boolean
  }
> = {
  propuesta: {
    label: 'Espera ratificación',
    orden: 0,
    variant: 'human',
    icon: Sparkles,
    reclama: true,
  },
  'sin-revisar': {
    label: 'Sin analizar',
    orden: 1,
    variant: 'outline',
    icon: CircleDashed,
    reclama: false,
  },
  'pendiente-alumno': {
    label: 'Sin entregar',
    orden: 2,
    variant: 'muted',
    icon: Clock,
    reclama: false,
  },
  ratificada: {
    label: 'Ratificada',
    orden: 3,
    variant: 'success',
    icon: CircleCheck,
    reclama: false,
  },
}

type Filtro = 'reclaman' | 'todas' | 'ratificadas'

export function EvaluarBandejaPage() {
  const { asignatura } = useSubject()
  const [filtro, setFiltro] = useState<Filtro>('reclaman')

  const deLaAsignatura = entregas.filter(
    (e) => e.asignaturaId === asignatura.id,
  )

  const reclaman = deLaAsignatura.filter((e) => ESTADOS[e.estado].reclama)
  const ratificadas = deLaAsignatura.filter((e) => e.estado === 'ratificada')

  const visibles = (
    filtro === 'reclaman'
      ? reclaman
      : filtro === 'ratificadas'
        ? ratificadas
        : deLaAsignatura
  )
    .slice()
    .sort((a, b) => ESTADOS[a.estado].orden - ESTADOS[b.estado].orden)

  const filtros: { id: Filtro; label: string; n: number }[] = [
    { id: 'reclaman', label: 'Esperan mi decisión', n: reclaman.length },
    { id: 'todas', label: 'Todas', n: deLaAsignatura.length },
    { id: 'ratificadas', label: 'Ratificadas', n: ratificadas.length },
  ]

  return (
    <AppLayout rotulo="Panel docente" modulos={modulosProfesor}>
      <PageBar
        migas={[
          { label: 'Cuaderno de evaluación' },
          { label: 'Evaluaciones' },
        ]}
        estado={
          reclaman.length > 0
            ? { label: `${reclaman.length} esperan ratificación`, variant: 'human' }
            : { label: 'Al día' }
        }
      />

      <div className="p-4 lg:p-6">
        <h1 className="text-3xl font-medium">Bandeja de evaluación</h1>
        <p className="text-muted-foreground mt-1.5">
          {asignatura.nombre} · {asignatura.grupo}. El motor propone; la cola se
          vacía cuando ratificas.
        </p>

        {/* Resumen */}
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              ['propuesta', 'Esperan ratificación'],
              ['sin-revisar', 'Sin analizar'],
              ['ratificada', 'Ratificadas'],
              ['pendiente-alumno', 'Sin entregar'],
            ] as const
          ).map(([estado, label]) => {
            const n = deLaAsignatura.filter((e) => e.estado === estado).length
            const meta = ESTADOS[estado]
            return (
              <Card key={estado} className="p-4">
                <dt className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <meta.icon
                    className={cn(
                      'size-3.5',
                      meta.reclama ? 'text-human' : 'text-muted-foreground',
                    )}
                    aria-hidden
                  />
                  {label}
                </dt>
                <dd
                  className={cn(
                    'mt-1.5 font-mono text-2xl',
                    meta.reclama && n > 0 && 'text-human',
                  )}
                >
                  {n}
                </dd>
              </Card>
            )
          })}
        </dl>

        {/* Filtros */}
        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filtrar la cola">
          {filtros.map((f) => (
            <Button
              key={f.id}
              variant={filtro === f.id ? 'default' : 'outline'}
              size="sm"
              aria-pressed={filtro === f.id}
              onClick={() => setFiltro(f.id)}
            >
              {f.label}
              <span className="font-mono">({f.n})</span>
            </Button>
          ))}
        </div>

        {/* Cola */}
        {visibles.length === 0 ? (
          <Card className="mt-4 p-10 text-center">
            <CircleCheck className="text-success mx-auto size-6" aria-hidden />
            <p className="mt-3 font-medium">Nada espera tu decisión</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Toda la cola de {asignatura.nombre} está ratificada.
            </p>
          </Card>
        ) : (
          <Card className="mt-4 divide-y overflow-hidden">
            {visibles.map((entrega) => {
              const meta = ESTADOS[entrega.estado]
              const accionable = entrega.estado !== 'pendiente-alumno'

              return (
                <div
                  key={entrega.id}
                  className="flex flex-wrap items-center gap-x-4 gap-y-3 p-4"
                >
                  <Avatar className="size-9 shrink-0">
                    <AvatarFallback>{entrega.iniciales}</AvatarFallback>
                  </Avatar>

                  <div className="min-w-40 flex-1">
                    <p className="font-medium">{entrega.alumnoNombre}</p>
                    <p className="text-muted-foreground truncate text-xs">
                      {entrega.tarea}
                    </p>
                  </div>

                  {/* La propuesta y la nota firmada nunca se confunden. */}
                  <div className="w-32 shrink-0">
                    {entrega.notaRatificada !== null ? (
                      <>
                        <p className="text-muted-foreground text-xs">
                          Nota firmada
                        </p>
                        <p className="font-mono">
                          {entrega.notaRatificada.toFixed(2)}
                        </p>
                      </>
                    ) : entrega.notaPropuesta !== null ? (
                      <>
                        <p className="text-muted-foreground flex items-center gap-1 text-xs">
                          <Sparkles className="text-primary size-3" aria-hidden />
                          Propuesta
                        </p>
                        <p className="text-primary font-mono">
                          {entrega.notaPropuesta.toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <p className="text-muted-foreground font-mono">—</p>
                    )}
                  </div>

                  <div className="w-36 shrink-0">
                    <Badge variant={meta.variant}>
                      <meta.icon className="size-3" aria-hidden />
                      {meta.label}
                    </Badge>
                    {entrega.confianza !== null && (
                      <p className="text-muted-foreground mt-1 text-xs">
                        Confianza {Math.round(entrega.confianza * 100)} %
                      </p>
                    )}
                  </div>

                  <div className="ml-auto shrink-0">
                    {accionable ? (
                      <Button
                        asChild
                        size="sm"
                        variant={meta.reclama ? 'default' : 'outline'}
                      >
                        <Link to={`/app/evaluar/${entrega.id}`}>
                          {meta.reclama ? 'Revisar' : 'Abrir'}
                          <ArrowRight className="size-4" />
                        </Link>
                      </Button>
                    ) : (
                      <span className="text-muted-foreground text-xs">
                        Sin entrega
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </Card>
        )}

        <p className="text-muted-foreground mt-4 text-xs">
          Ninguna nota propuesta por el motor consta en el expediente hasta que
          se firma el acta en la pantalla de corrección.
        </p>
      </div>
    </AppLayout>
  )
}
