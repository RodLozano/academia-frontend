import { useMemo, useState } from 'react'
import {
  CircleCheck,
  CircleDashed,
  Columns3,
  Download,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

import { PageBar } from '@/components/app/page-bar'
import { AppLayout } from '@/layouts/app-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { modulosProfesor } from '@/content/app-nav'
import { useSubject } from '@/lib/subject-context'
import { cn } from '@/lib/utils'
import {
  columnas,
  dictamen,
  filas,
  hashActa,
  notaFinal,
  type Celda,
} from '@/mocks/cuaderno'

/**
 * Cuaderno de calificaciones (1.10). La matriz consolidada del grupo.
 *
 * Lo que distingue este cuaderno de una hoja de cálculo es que cada celda
 * declara **de dónde sale su nota**: si el docente aceptó la propuesta del
 * motor, si se apartó de ella (y cuánto), o si evaluó sin motor. Esa es la
 * huella de la supervisión humana, y es lo que una auditoría viene a mirar.
 *
 * Las celdas pendientes de ratificación se muestran pero **no computan** en la
 * nota final: una propuesta sin firma no es una nota.
 */

function Nota({ celda }: { celda: Celda }) {
  if (celda.nota === null) {
    return <span className="text-muted-foreground font-mono">—</span>
  }

  const suspenso = celda.nota < 5

  if (celda.procedencia === 'pendiente') {
    return (
      <span
        className="text-muted-foreground inline-flex items-center gap-1 font-mono"
        title="Propuesta del motor sin ratificar: no computa"
      >
        {celda.nota.toFixed(1)}
        <CircleDashed className="size-3" aria-hidden />
      </span>
    )
  }

  if (celda.procedencia === 'docente') {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span
          className={cn('font-mono', suspenso ? 'text-destructive' : 'text-human')}
        >
          {celda.nota.toFixed(1)}
        </span>
        <span className="bg-human/10 text-human rounded px-1 font-mono text-xs">
          {celda.delta! > 0 ? '+' : ''}
          {celda.delta!.toFixed(1)}
        </span>
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn('font-mono', suspenso && 'text-destructive')}>
        {celda.nota.toFixed(1)}
      </span>
      {celda.procedencia === 'ia-aceptada' && (
        <span
          className="bg-primary size-1.5 rounded-full"
          title="Sugerencia del motor aceptada sin cambios"
          aria-label="sugerencia aceptada"
        />
      )}
    </span>
  )
}

export function CuadernoPage() {
  const { asignatura } = useSubject()
  const [filtro, setFiltro] = useState('')
  const [escala, setEscala] = useState<'0-10' | 'cualitativa'>('0-10')

  const visibles = useMemo(() => {
    const q = filtro.trim().toLowerCase()
    if (!q) return filas
    return filas.filter(
      (f) =>
        `${f.apellidos} ${f.nombre}`.toLowerCase().includes(q) ||
        f.nia.toLowerCase().includes(q),
    )
  }, [filtro])

  const ajustesHumanos = filas.reduce(
    (n, f) =>
      n +
      Object.values(f.celdas).filter((c) => c.procedencia === 'docente').length,
    0,
  )
  const pendientes = filas.reduce(
    (n, f) =>
      n +
      Object.values(f.celdas).filter((c) => c.procedencia === 'pendiente')
        .length,
    0,
  )

  const finales = filas
    .map((f) => notaFinal(f)?.nota)
    .filter((n): n is number => n !== undefined)
  const media = finales.reduce((a, b) => a + b, 0) / (finales.length || 1)
  const aptos = finales.filter((n) => n >= 5).length

  /** Media por columna, contando solo lo ratificado. */
  const mediaColumna = (columnaId: string) => {
    const notas = filas
      .map((f) => f.celdas[columnaId])
      .filter(
        (c): c is Celda =>
          !!c && c.nota !== null && c.procedencia !== 'pendiente',
      )
      .map((c) => c.nota as number)
    if (notas.length === 0) return null
    return notas.reduce((a, b) => a + b, 0) / notas.length
  }

  return (
    <AppLayout rotulo="Panel docente" modulos={modulosProfesor}>
      <PageBar
        migas={[
          { label: 'Cuaderno de evaluación' },
          { label: 'Calificaciones' },
        ]}
        estado={
          pendientes > 0
            ? { label: `${pendientes} sin ratificar`, variant: 'human' }
            : { label: 'Todo ratificado' }
        }
      />

      <div className="p-4 lg:p-6">
        {/* Barra de herramientas */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-medium">
              {asignatura.grupo} — convocatoria ordinaria
            </h1>
            <p className="text-muted-foreground text-xs">
              {filas.length} alumnos · cálculo ponderado según la guía docente
            </p>
          </div>

          <div className="relative w-full min-w-40 sm:w-64">
            <Search
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
              aria-hidden
            />
            <Input
              value={filtro}
              onChange={(event) => setFiltro(event.target.value)}
              placeholder="Filtrar por nombre o identificador…"
              aria-label="Filtrar alumnos"
              className="pl-9"
            />
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <Badge variant="muted">Media: {media.toFixed(2)}</Badge>
            <Badge variant={ajustesHumanos > 0 ? 'human' : 'muted'}>
              Ajustes humanos: {ajustesHumanos}
            </Badge>
            <Badge variant="muted">
              <Columns3 className="size-3" aria-hidden />
              Columnas ({columnas.length}/{columnas.length})
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="size-4" />
              Exportar
            </Button>
            {/* Decisión humana en lote: el único control naranja. */}
            <Button variant="human" size="sm" disabled={pendientes > 0}>
              <ShieldCheck className="size-4" />
              Ratificar y volcar a actas
            </Button>
          </div>
        </div>

        {pendientes > 0 && (
          <p className="text-muted-foreground mt-2 text-xs">
            Volcar a actas está bloqueado: quedan {pendientes} celdas con
            propuesta del motor sin ratificar.
          </p>
        )}

        {/* Escala y leyenda */}
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <div className="flex gap-1" role="group" aria-label="Escala">
            {(['0-10', 'cualitativa'] as const).map((e) => (
              <Button
                key={e}
                variant={escala === e ? 'default' : 'ghost'}
                size="sm"
                aria-pressed={escala === e}
                onClick={() => setEscala(e)}
              >
                {e === '0-10' ? '0–10' : 'Cualitativa'}
              </Button>
            ))}
          </div>

          <ul className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            <li className="flex items-center gap-1.5">
              <span className="bg-primary size-1.5 rounded-full" aria-hidden />
              Sugerencia del motor aceptada
            </li>
            <li className="flex items-center gap-1.5">
              <span className="bg-human size-1.5 rounded-full" aria-hidden />
              Modificación docente directa
            </li>
            <li className="flex items-center gap-1.5">
              <CircleDashed className="size-3" aria-hidden />
              Sin ratificar, no computa
            </li>
          </ul>
        </div>

        {/* Matriz */}
        <div className="mt-4 overflow-x-auto rounded-xl border">
          <table className="w-full min-w-5xl border-collapse text-left">
            <caption className="sr-only">
              Calificaciones de {asignatura.nombre}, {asignatura.grupo}. Cada
              nota indica su procedencia.
            </caption>
            <thead className="bg-brand-surface border-b-brand-line border-b">
              <tr>
                <th
                  scope="col"
                  className="bg-brand-surface sticky left-0 px-4 py-2.5 font-medium"
                >
                  Estudiante ({filas.length})
                </th>
                {columnas.map((columna) => (
                  <th key={columna.id} scope="col" className="px-3 py-2 font-medium">
                    <span className="flex items-center gap-1.5">
                      {columna.titulo}
                      {columna.conRubrica && (
                        <Sparkles
                          className="text-primary size-3"
                          aria-label="evaluada con rúbrica generada"
                        />
                      )}
                    </span>
                    <span className="text-muted-foreground block font-mono text-xs font-normal">
                      {columna.meta}
                    </span>
                  </th>
                ))}
                <th scope="col" className="bg-brand-surface-strong px-3 py-2.5 font-medium">
                  Final
                  <span className="text-muted-foreground block font-mono text-xs font-normal">
                    100 %
                  </span>
                </th>
                <th scope="col" className="px-3 py-2.5 font-medium">
                  Dictamen
                </th>
                <th scope="col" className="px-3 py-2.5 font-medium">
                  Acta
                </th>
              </tr>
            </thead>

            <tbody>
              {visibles.map((fila) => {
                const final = notaFinal(fila)
                const completa = final?.cobertura === 100
                const d = final ? dictamen(final.nota) : null

                return (
                  <tr key={fila.alumnoId} className="hover:bg-accent/40 border-t">
                    <th
                      scope="row"
                      className="bg-card sticky left-0 px-4 py-2.5 font-normal"
                    >
                      <span className="block">
                        {fila.apellidos}, {fila.nombre}
                      </span>
                      <span className="text-muted-foreground font-mono text-xs">
                        {fila.nia}
                      </span>
                    </th>

                    {columnas.map((columna) => (
                      <td key={columna.id} className="px-3 py-2.5">
                        <Nota celda={fila.celdas[columna.id]} />
                      </td>
                    ))}

                    <td className="bg-muted/50 px-3 py-2.5">
                      {final ? (
                        escala === '0-10' ? (
                          <span
                            className={cn(
                              'font-mono',
                              final.nota < 5 ? 'text-destructive' : 'text-primary',
                            )}
                          >
                            {final.nota.toFixed(2)}
                          </span>
                        ) : (
                          <span>{d!.label}</span>
                        )
                      ) : (
                        <span className="text-muted-foreground font-mono">—</span>
                      )}
                      {final && !completa && (
                        <span className="text-muted-foreground block text-xs">
                          sobre {final.cobertura} %
                        </span>
                      )}
                    </td>

                    <td className="px-3 py-2.5">
                      {d && <Badge variant={d.variant}>{d.label}</Badge>}
                    </td>

                    <td className="px-3 py-2.5">
                      {completa ? (
                        <CircleCheck
                          className="text-success size-4"
                          aria-label="lista para acta"
                        />
                      ) : (
                        <CircleDashed
                          className="text-human size-4"
                          aria-label="incompleta: falta ratificar"
                        />
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>

            <tfoot className="bg-brand-surface border-t-brand-line border-t">
              <tr className="border-t">
                <th scope="row" className="bg-brand-surface sticky left-0 px-4 py-2.5 font-medium">
                  Media aritmética
                </th>
                {columnas.map((columna) => {
                  const m = mediaColumna(columna.id)
                  return (
                    <td key={columna.id} className="px-3 py-2.5 font-mono">
                      {m === null ? '—' : m.toFixed(2)}
                    </td>
                  )
                })}
                <td className="bg-brand-surface-strong px-3 py-2.5 font-mono">
                  {media.toFixed(2)}
                </td>
                <td className="text-muted-foreground px-3 py-2.5 text-xs">
                  {aptos} / {finales.length} aptos
                </td>
                <td className="text-muted-foreground px-3 py-2.5">—</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Pie técnico */}
        <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
          <p>
            Mostrando {visibles.length} de {filas.length} alumnos
          </p>
          <p className="ml-auto flex items-center gap-2">
            <span className="font-mono">SHA256: {hashActa}</span>
            <Badge variant="muted">Registro de auditoría</Badge>
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
