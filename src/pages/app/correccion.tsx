import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CircleCheck,
  FileText,
  Highlighter,
  Link2,
  RotateCcw,
  Save,
  ShieldCheck,
  Sparkles,
  StickyNote,
  TriangleAlert,
} from 'lucide-react'

import { PageBar } from '@/components/app/page-bar'
import { RecursoNoEncontrado } from '@/components/app/recurso-no-encontrado'
import { AppLayout } from '@/layouts/app-layout'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { modulosProfesor } from '@/content/app-nav'
import { entregas } from '@/mocks/data'
import {
  anotaciones,
  atencionDocente,
  bibliografia,
  desglose,
  parrafos,
  retroalimentacion,
  trazaInferencia,
} from '@/mocks/entrega-ejemplo'

/**
 * Corrección de entrega (1.9). Es la pantalla donde se juega la tesis del
 * producto, así que su estructura la dice literalmente:
 *
 * - Izquierda: lo que escribió la persona. Es el original y ocupa más espacio.
 * - Derecha: lo que propone el motor. Está etiquetado como propuesta en todo
 *   momento y su nota se presenta como «sugerida», nunca como nota.
 * - Abajo, fijo: el paso humano. «Confirmar nota y firmar acta» es el único
 *   control naranja de la pantalla, porque es el único acto irreversible que
 *   ejecuta una persona (DESIGN.md lo nombra de forma literal).
 *
 * Mientras no se firma, la barra inferior recuerda que la propuesta no tiene
 * efecto: es la traducción a interfaz del principio de primacía docente.
 */
export function CorreccionPage() {
  const { id } = useParams()
  const entrega = entregas.find((e) => e.id === id)

  const sugerida = entrega?.notaPropuesta ?? 0
  const [nota, setNota] = useState(sugerida.toFixed(2))
  const [motivo, setMotivo] = useState('')
  const [feedback, setFeedback] = useState(retroalimentacion)
  const [firmada, setFirmada] = useState(entrega?.estado === 'ratificada')
  const [panel, setPanel] = useState<'texto' | 'citas' | 'versiones'>('texto')

  const notaNum = Number(nota.replace(',', '.'))
  const notaValida = Number.isFinite(notaNum) && notaNum >= 0 && notaNum <= 10
  const modificada = notaValida && Math.abs(notaNum - sugerida) > 0.001

  // El guardia va tras los hooks: React exige que se llamen siempre y en el
  // mismo orden, así que no puede haber un return antes de ellos.
  if (!entrega) {
    return (
      <AppLayout rotulo="Panel docente" modulos={modulosProfesor} conLateral={false}>
        <RecursoNoEncontrado
          que="esa entrega"
          id={id}
          volverA="/app/evaluar"
          volverLabel="Ver la bandeja"
          migas={[{ label: 'Evaluaciones', to: '/app/evaluar' }, { label: 'No encontrada' }]}
        />
      </AppLayout>
    )
  }

  return (
    // Trabajo enfocado: a todo el ancho, como su maqueta.
    <AppLayout rotulo="Panel docente" modulos={modulosProfesor} conLateral={false}>
      <PageBar
        migas={[
          { label: 'Evaluaciones', to: '/app/evaluar' },
          { label: entrega.tarea },
        ]}
        acciones={
          <>
            <Button variant="outline" size="sm">
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">Entrega anterior</span>
            </Button>
            <span className="text-muted-foreground shrink-0 font-mono text-xs">
              2 / 32
            </span>
            <Button variant="outline" size="sm">
              <span className="hidden sm:inline">Siguiente entrega</span>
              <ArrowRight className="size-4" />
            </Button>
          </>
        }
      />

      {/* Identificación de la entrega */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b px-4 py-3">
        <Avatar className="size-9">
          <AvatarFallback>{entrega.iniciales}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-lg font-medium">{entrega.alumnoNombre}</h1>
            <span className="text-muted-foreground font-mono text-xs">
              2024-HIS-7124
            </span>
            {firmada ? (
              <Badge variant="success">
                <CircleCheck className="size-3" aria-hidden />
                Acta firmada
              </Badge>
            ) : (
              <Badge variant="human">Revisión pendiente</Badge>
            )}
          </div>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Entregada el {entrega.entregadoEl} (en plazo) ·{' '}
            {entrega.palabras.toLocaleString('es-ES')} palabras · 4 páginas
          </p>
        </div>
      </div>

      <div className="grid items-start gap-0 pb-24 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        {/* ---------- Lo que escribió la persona ---------- */}
        <section
          aria-labelledby="texto-alumno"
          className="min-w-0 border-b xl:border-r xl:border-b-0"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-2.5">
            <Tabs
              value={panel}
              onValueChange={(valor) => setPanel(valor as typeof panel)}
            >
              <TabsList>
                <TabsTrigger value="texto" id="texto-alumno">
                  <FileText />
                  Texto del estudiante
                </TabsTrigger>
                <TabsTrigger value="citas">Metadatos y citas (14)</TabsTrigger>
                <TabsTrigger value="versiones">Versiones (v2)</TabsTrigger>
              </TabsList>
            </Tabs>
            <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <span className="bg-success size-2 rounded-full" aria-hidden />
              Índice de originalidad: 96 %
            </p>
          </div>

          {panel === 'texto' && (
          <div className="bg-muted/40 text-muted-foreground flex flex-wrap items-center gap-2 border-b px-4 py-2 text-xs">
            <span>Herramientas del evaluador:</span>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              <Highlighter className="size-3.5" />
              Subrayar
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              <StickyNote className="size-3.5" />
              Nota al margen
            </Button>
            <span className="ml-auto flex items-center gap-1.5 font-mono">
              <Link2 className="size-3.5" aria-hidden />
              Selecciona texto para vincular
            </span>
          </div>
          )}

          {panel === 'texto' && (
          <article className="p-4 lg:p-6">
            <h2 className="font-serif text-2xl leading-snug">
              La crisis de los misiles y la génesis de la distensión: de la
              disuasión nuclear a la coexistencia pactada (1962–1975)
            </h2>
            <p className="text-muted-foreground mt-2 text-xs">
              {entrega.alumnoNombre} · Historia Contemporánea II · Grado en
              Humanidades
            </p>

            <p className="mt-6 leading-relaxed">{parrafos[0]}</p>

            {anotaciones.map((anotacion) => (
              <div
                key={anotacion.id}
                className={
                  anotacion.tipo === 'alerta'
                    ? 'border-l-human bg-human/5 mt-5 rounded-r-lg border-l-2 p-4'
                    : 'border-l-primary bg-primary/5 mt-5 rounded-r-lg border-l-2 p-4'
                }
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p
                    className={
                      anotacion.tipo === 'alerta'
                        ? 'text-human flex items-center gap-1.5 text-xs font-medium'
                        : 'text-primary flex items-center gap-1.5 text-xs font-medium'
                    }
                  >
                    {anotacion.tipo === 'alerta' ? (
                      <TriangleAlert className="size-3.5" aria-hidden />
                    ) : (
                      <Sparkles className="size-3.5" aria-hidden />
                    )}
                    {anotacion.etiqueta}
                  </p>
                  <span className="text-muted-foreground shrink-0 font-mono text-xs">
                    {anotacion.ref}
                  </span>
                </div>
                <p className="mt-2 leading-relaxed">{anotacion.texto}</p>
                {anotacion.resaltado && (
                  <p className="bg-warning/20 mt-2 rounded px-1 leading-relaxed">
                    {anotacion.resaltado}
                  </p>
                )}
              </div>
            ))}

            <p className="mt-5 leading-relaxed">{parrafos[1]}</p>

            <div className="bg-muted/50 mt-6 rounded-xl border p-4">
              <h3 className="text-muted-foreground text-xs font-medium tracking-[0.06em] uppercase">
                Aparato bibliográfico
              </h3>
              <ol className="text-muted-foreground mt-2.5 space-y-1.5 text-sm">
                {bibliografia.map((ref, i) => (
                  <li key={ref} className="flex gap-2">
                    <span className="font-mono">[{i + 1}]</span>
                    <span>{ref}</span>
                  </li>
                ))}
              </ol>
            </div>
          </article>
          )}

          {panel === 'citas' && (
            <div className="p-4 lg:p-6">
              <h3 className="font-medium">Referencias detectadas</h3>
              <p className="text-muted-foreground mt-1 text-xs">
                Extraídas del texto y cotejadas contra el corpus de la cátedra.
              </p>
              <ol className="mt-4 space-y-2">
                {bibliografia.map((ref, i) => (
                  <li
                    key={ref}
                    className="flex gap-3 rounded-xl border p-3.5 text-sm"
                  >
                    <span className="text-muted-foreground shrink-0 font-mono text-xs">
                      [{i + 1}]
                    </span>
                    <span className="min-w-0 flex-1">{ref}</span>
                    <Badge variant="success" className="shrink-0">
                      Verificada
                    </Badge>
                  </li>
                ))}
              </ol>
              <p className="text-muted-foreground mt-4 text-xs">
                Las referencias que no aparecen en el corpus se marcarían como
                no verificables, no como incorrectas: el criterio es del
                docente.
              </p>
            </div>
          )}

          {panel === 'versiones' && (
            <div className="p-4 lg:p-6">
              <h3 className="font-medium">Historial de la entrega</h3>
              <ol className="mt-4 space-y-3">
                {[
                  ['v2', entrega.entregadoEl, 'Entrega definitiva', true],
                  ['v1', '2025-03-09', 'Primer borrador del alumno', false],
                ].map(([v, fecha, nota, actual]) => (
                  <li key={v as string} className="flex items-start gap-3">
                    <span
                      className={
                        actual
                          ? 'bg-primary mt-1.5 size-2 shrink-0 rounded-full'
                          : 'bg-border mt-1.5 size-2 shrink-0 rounded-full'
                      }
                      aria-hidden
                    />
                    <div>
                      <p className="flex items-center gap-2">
                        <span className="font-mono text-sm">{v}</span>
                        {actual && <Badge variant="success">Evaluada</Badge>}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {fecha} · {nota}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>

        {/* ---------- Lo que propone el motor ---------- */}
        <section
          aria-labelledby="propuesta-ia"
          className="min-w-0 space-y-4 p-4 lg:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2
              id="propuesta-ia"
              className="text-primary flex items-center gap-2 font-medium"
            >
              <Sparkles className="size-4" aria-hidden />
              Propuesta analítica del motor
            </h2>
            <Badge variant="muted">
              <ShieldCheck className="size-3" aria-hidden />
              Conforme EU AI Act
            </Badge>
          </div>
          <p className="text-muted-foreground flex flex-wrap justify-between gap-2 text-xs">
            <span className="font-mono">
              Modelo analítico de la instancia del centro
            </span>
            <span>
              Confianza:{' '}
              <span className="text-foreground font-medium">
                media-alta ({Math.round((entrega.confianza ?? 0) * 100)} %)
              </span>
            </span>
          </p>

          {/* Nota sugerida, presentada siempre como propuesta */}
          <Card className="bg-muted/40 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-muted-foreground text-xs font-medium tracking-[0.06em] uppercase">
                  Calificación sugerida
                </p>
                <p className="mt-1.5">
                  <span className="text-primary font-mono text-3xl">
                    {sugerida.toFixed(2)}
                  </span>
                  <span className="text-muted-foreground font-mono">
                    {' '}
                    / 10,00
                  </span>
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Basada en la rúbrica departamental
                </p>
              </div>
              <div className="border-primary/40 flex size-16 shrink-0 flex-col items-center justify-center rounded-full border-2 border-dashed">
                <span className="text-xs font-medium">Notable</span>
              </div>
            </div>
          </Card>

          {/* Desglose por criterio */}
          <div>
            <h3 className="text-muted-foreground text-xs font-medium tracking-[0.06em] uppercase">
              Desglose de rúbrica ({desglose.length} criterios)
            </h3>
            <ol className="mt-2.5 space-y-2">
              {desglose.map((item, i) => (
                <li key={item.criterio} className="bg-muted/40 rounded-xl border p-3.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-medium">
                      {i + 1}. {item.criterio}
                    </p>
                    <p className="shrink-0 font-mono text-sm">
                      <span className="text-foreground">{item.puntos}</span>
                      <span className="text-muted-foreground">
                        {' '}
                        / {item.sobre}
                      </span>
                    </p>
                  </div>
                  <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                    {item.comentario}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Lo que el motor no resuelve y devuelve a la persona */}
          <div className="border-human/30 bg-human/5 rounded-xl border p-4">
            <p className="text-human flex items-center gap-1.5 font-medium">
              <TriangleAlert className="size-4 shrink-0" aria-hidden />
              {atencionDocente.titulo}
            </p>
            <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
              {atencionDocente.cuerpo}
            </p>
          </div>

          {/* Retroalimentación, editable: la escribe el motor, la firma la persona */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Label htmlFor="feedback" className="font-medium">
                Retroalimentación al estudiante
              </Label>
              <button
                type="button"
                className="text-primary flex items-center gap-1.5 text-xs font-medium"
              >
                <RotateCcw className="size-3" aria-hidden />
                Regenerar sugerencia
              </button>
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              Propuesta por el motor. Es un borrador: lo que se envía es lo que
              quede aquí escrito al firmar.
            </p>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              rows={6}
              className="mt-2"
            />
          </div>

          {/* El ajuste humano prevalece sobre el cálculo */}
          <Card className="p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <Label htmlFor="nota" className="font-medium">
                Ajuste manual de nota final
              </Label>
              <span className="text-muted-foreground text-xs">
                Prevalece sobre el cálculo del motor
              </span>
            </div>
            <div className="mt-2.5 flex flex-wrap items-start gap-2">
              <div className="relative w-28 shrink-0">
                <Input
                  id="nota"
                  inputMode="decimal"
                  value={nota}
                  onChange={(event) => setNota(event.target.value)}
                  aria-invalid={!notaValida || undefined}
                  aria-describedby="nota-ayuda"
                  className="pr-10 font-mono"
                />
                <span className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 font-mono text-xs">
                  /10
                </span>
              </div>
              <Input
                aria-label="Motivo de la modificación"
                placeholder="Motivo de la modificación (opcional)…"
                value={motivo}
                onChange={(event) => setMotivo(event.target.value)}
                className="min-w-40 flex-1"
              />
            </div>
            <p id="nota-ayuda" className="text-muted-foreground mt-2 text-xs">
              {!notaValida
                ? 'Introduce un valor entre 0 y 10.'
                : modificada
                  ? `Te apartas ${(notaNum - sugerida > 0 ? '+' : '') + (notaNum - sugerida).toFixed(2)} puntos de la propuesta. La diferencia queda registrada en el linaje.`
                  : 'Coincide con la propuesta del motor. Puedes cambiarla sin justificación.'}
            </p>
          </Card>
        </section>
      </div>

      {/* ---------- El paso humano ---------- */}
      <div className="bg-card fixed inset-x-0 bottom-0 z-30 border-t">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <p className="text-muted-foreground flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="flex items-center gap-1.5">
              <span
                className={
                  firmada
                    ? 'bg-success size-2 rounded-full'
                    : 'bg-human size-2 rounded-full'
                }
                aria-hidden
              />
              Traza de inferencia:{' '}
              <span className="font-mono">{trazaInferencia}</span>
            </span>
            <span className="bg-border hidden h-3 w-px sm:block" aria-hidden />
            <span>
              {firmada
                ? 'Acta firmada. La nota consta en el expediente.'
                : 'Sin efecto sobre el expediente hasta la firma docente.'}
            </span>
          </p>

          <div className="ml-auto flex shrink-0 flex-wrap items-center gap-2">
            {firmada ? (
              <>
                <Badge variant="success">
                  <BadgeCheck className="size-3" aria-hidden />
                  Firmada: {notaNum.toFixed(2)}
                </Badge>
                <Button variant="outline" onClick={() => setFirmada(false)}>
                  Revocar firma
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost">
                  <Save className="size-4" />
                  Guardar borrador
                </Button>
                <Button variant="outline">
                  <RotateCcw className="size-4" />
                  <span className="hidden sm:inline">
                    Devolver para reescritura
                  </span>
                  <span className="sm:hidden">Devolver</span>
                </Button>
                {/* El único control naranja de la pantalla. */}
                <Button
                  variant="human"
                  disabled={!notaValida}
                  onClick={() => setFirmada(true)}
                >
                  <ShieldCheck className="size-4" />
                  Confirmar nota y firmar acta
                  {notaValida && (
                    <span className="font-mono">({notaNum.toFixed(2)})</span>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
