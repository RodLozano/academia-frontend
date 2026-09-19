import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Check,
  Compass,
  Download,
  FileText,
  FolderOpen,
  Send,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'

import { PageBar } from '@/components/app/page-bar'
import { AppLayout } from '@/layouts/app-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { modulosAlumno } from '@/content/app-nav'
import { cn } from '@/lib/utils'
import { alumnos, contenidos, entregas, estudiante, rubrica } from '@/mocks/data'

/**
 * Consola del alumno, rutas de v2. Las cuatro que el inventario difiere son
 * justamente las de **metacognición**: saber qué dominas, qué te falta y
 * autoevaluarte antes de entregar.
 *
 * El principio que las rige: dan agencia, no nota pública. El mapa de dominio
 * no es un ranking ni una calificación paralela; es información sobre uno mismo
 * para decidir qué estudiar.
 */
function AlumnoLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout rotulo="Mi aprendizaje" modulos={modulosAlumno} persona={estudiante}>
      {children}
    </AppLayout>
  )
}

const yo = alumnos[0]

/** Mi mapa de dominio (3.5). Qué domino, qué me falta, el siguiente paso. */
export function AlumnoDominioPage() {
  const ordenado = [...yo.dominio].sort((a, b) => a.nivel - b.nivel)
  const flojo = ordenado[0]
  const fuerte = ordenado[ordenado.length - 1]

  return (
    <AlumnoLayout>
      <PageBar migas={[{ label: 'Mi aprendizaje' }, { label: 'Mi mapa de dominio' }]} />

      <div className="max-w-4xl p-4 lg:p-6">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium">
          <Compass className="text-primary size-6" aria-hidden />
          Mi mapa de dominio
        </h1>
        <p className="text-muted-foreground mt-1.5 max-w-2xl">
          Dónde estás en cada competencia. No es una nota ni se compara con
          nadie: es para que decidas qué estudiar a continuación.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card className="border-l-primary border-l-2 p-5">
            <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <TrendingUp className="size-3.5" aria-hidden />
              Tu punto fuerte
            </p>
            <p className="mt-2 text-lg font-medium">{fuerte.competencia}</p>
            <p className="text-primary font-mono text-2xl">{fuerte.nivel} %</p>
          </Card>
          <Card className="border-l-human border-l-2 p-5">
            <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <Target className="size-3.5" aria-hidden />
              Tu siguiente paso
            </p>
            <p className="mt-2 text-lg font-medium">{flojo.competencia}</p>
            <p className="text-human font-mono text-2xl">{flojo.nivel} %</p>
          </Card>
        </div>

        <Card className="mt-4 p-5">
          <h2 className="font-medium">Todas mis competencias</h2>
          <dl className="mt-4 space-y-4">
            {ordenado.map((d) => (
              <div key={d.competencia}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <dt className="font-medium">{d.competencia}</dt>
                  <dd className="text-muted-foreground shrink-0 text-xs">
                    <span className="text-foreground font-mono">{d.nivel} %</span>
                    {d.nivel < 60
                      ? ' · conviene reforzar'
                      : d.nivel < 80
                        ? ' · vas bien'
                        : ' · dominado'}
                  </dd>
                </div>
                <Progress
                  value={d.nivel}
                  className="mt-1.5"
                  indicatorClassName={
                    d.nivel < 60 ? 'bg-human' : d.nivel < 80 ? 'bg-warning' : 'bg-primary'
                  }
                />
              </div>
            ))}
          </dl>
        </Card>

        <Card className="mt-4 p-5">
          <h2 className="flex items-center gap-2 font-medium">
            <Sparkles className="text-primary size-4" aria-hidden />
            Qué puedes hacer ahora
          </h2>
          <ul className="mt-3 space-y-2">
            <li>
              <Link
                to="/alumno/practica"
                className="hover:bg-accent flex items-center gap-3 rounded-lg border p-3 transition-colors"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">
                    Practicar {flojo.competencia.toLowerCase()}
                  </span>
                  <span className="text-muted-foreground block text-xs">
                    Ejercicios del material de tu clase
                  </span>
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/alumno/tutor"
                className="hover:bg-accent flex items-center gap-3 rounded-lg border p-3 transition-colors"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">Preguntar al tutor</span>
                  <span className="text-muted-foreground block text-xs">
                    Te da pistas ancladas a tus apuntes
                  </span>
                </span>
              </Link>
            </li>
          </ul>
        </Card>

        <p className="text-muted-foreground mt-4 text-xs">
          Tu profesorado ve esta misma información. No se publica ni se comparte
          con el resto de la clase.
        </p>
      </div>
    </AlumnoLayout>
  )
}

/** Mis materiales de clase (3.6). Lectura del corpus que le han compartido. */
export function AlumnoMaterialesPage() {
  const compartidos = contenidos.filter(
    (c) => c.naturaleza === 'original' || c.tipo === 'ficha' || c.tipo === 'rubrica',
  )

  return (
    <AlumnoLayout>
      <PageBar migas={[{ label: 'Mi aprendizaje' }, { label: 'Mis materiales' }]} />

      <div className="p-4 lg:p-6">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium">
          <FolderOpen className="text-muted-foreground size-6" aria-hidden />
          Mis materiales de clase
        </h1>
        <p className="text-muted-foreground mt-1.5 max-w-2xl">
          Lo que tu profesorado ha compartido contigo. Solo lectura: son sus
          materiales.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {compartidos.map((contenido) => {
            const esGenerado = contenido.naturaleza === 'generado'
            return (
              <Card key={contenido.id} className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-lg',
                      esGenerado ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {esGenerado ? (
                      <Sparkles className="size-4" aria-hidden />
                    ) : (
                      <FileText className="size-4" aria-hidden />
                    )}
                  </span>
                  <Badge variant="muted">{contenido.unidad}</Badge>
                </div>
                <h2 className="mt-3 flex-1 font-medium">{contenido.titulo}</h2>
                <p className="text-muted-foreground mt-1 text-xs">
                  {contenido.extension}
                  {esGenerado && ' · preparado por tu profesora'}
                </p>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  <Download className="size-4" />
                  Abrir
                </Button>
              </Card>
            )
          })}
        </div>
      </div>
    </AlumnoLayout>
  )
}

/** Autoevaluación con rúbrica (3.7). Se autoevalúa antes de entregar. */
export function AlumnoAutoevaluacionPage() {
  const [elegidos, setElegidos] = useState<Record<string, number>>({})
  const [enviada, setEnviada] = useState(false)

  const total = rubrica.length
  const hechos = Object.keys(elegidos).length

  /** Nota que se da a sí mismo, ponderada por los pesos de la rúbrica. */
  const estimacion = rubrica.reduce((suma, criterio) => {
    const nivel = elegidos[criterio.id]
    if (nivel === undefined) return suma
    const valor = [10, 8, 6, 3][nivel] ?? 0
    return suma + (valor * criterio.peso) / 100
  }, 0)

  return (
    <AlumnoLayout>
      <PageBar
        migas={[{ label: 'Mi aprendizaje' }, { label: 'Autoevaluación' }]}
        estado={
          hechos === total
            ? { label: 'Completa' }
            : { label: `${hechos} de ${total}`, variant: 'muted' }
        }
      />

      <div className="max-w-4xl p-4 lg:p-6">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium">
          <Check className="text-primary size-6" aria-hidden />
          Autoevaluación con rúbrica
        </h1>
        <p className="text-muted-foreground mt-1.5 max-w-2xl">
          La misma rúbrica con la que te va a corregir tu profesora. Sitúate en
          cada criterio <strong className="text-foreground">antes de entregar</strong>:
          lo que veas aquí es lo que ella va a mirar.
        </p>

        <ol className="mt-6 space-y-4">
          {rubrica.map((criterio, i) => (
            <li key={criterio.id}>
              <Card className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-medium">
                    {i + 1}. {criterio.criterio}
                  </h2>
                  <Badge variant="muted">{criterio.peso} %</Badge>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {criterio.niveles.map((nivel, n) => {
                    const activo = elegidos[criterio.id] === n
                    return (
                      <button
                        key={nivel.nivel}
                        type="button"
                        aria-pressed={activo}
                        onClick={() =>
                          setElegidos((e) => ({ ...e, [criterio.id]: n }))
                        }
                        className={cn(
                          'focus-visible:ring-ring/50 rounded-lg border p-3 text-left transition-colors outline-none focus-visible:ring-[3px]',
                          activo ? 'border-primary bg-primary/5' : 'hover:bg-accent',
                        )}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="font-medium">{nivel.nivel}</span>
                          {activo && (
                            <Check className="text-primary size-3.5 shrink-0" aria-hidden />
                          )}
                        </span>
                        <span className="text-muted-foreground mt-1.5 block text-sm leading-relaxed">
                          {nivel.descriptor}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </Card>
            </li>
          ))}
        </ol>

        {hechos === total && (
          <Card className="mt-4 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-medium">Dónde te sitúas</h2>
                <p className="text-muted-foreground mt-1 text-xs">
                  Estimación tuya, no una nota. Tu profesora no la ve hasta que
                  la envías.
                </p>
              </div>
              <p className="text-primary shrink-0 font-mono text-3xl">
                {estimacion.toFixed(1)}
              </p>
            </div>

            <div className="mt-4 border-t pt-4">
              <label htmlFor="reflexion" className="font-medium">
                Qué mejorarías antes de entregar
              </label>
              <Textarea
                id="reflexion"
                rows={3}
                placeholder="Lo que has visto al compararte con la rúbrica…"
                className="mt-2"
              />
            </div>

            {enviada ? (
              <Badge variant="success" className="mt-4">
                <Check className="size-3" aria-hidden />
                Enviada a tu profesora
              </Badge>
            ) : (
              <Button className="mt-4" onClick={() => setEnviada(true)}>
                <Send className="size-4" />
                Enviar mi autoevaluación
              </Button>
            )}
          </Card>
        )}
      </div>
    </AlumnoLayout>
  )
}

/** Portfolio (3.8). Colección de sus producciones del curso. */
export function AlumnoPortfolioPage() {
  const mias = entregas.filter((e) => e.alumnoId === yo.id)
  const firmadas = mias.filter((e) => e.notaRatificada !== null)

  return (
    <AlumnoLayout>
      <PageBar
        migas={[{ label: 'Mi aprendizaje' }, { label: 'Portfolio' }]}
        acciones={
          <Button variant="outline" size="sm">
            <Download className="size-4" />
            <span className="hidden sm:inline">Exportar portfolio</span>
          </Button>
        }
      />

      <div className="max-w-4xl p-4 lg:p-6">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium">
          <BookOpen className="text-muted-foreground size-6" aria-hidden />
          Mi portfolio
        </h1>
        <p className="text-muted-foreground mt-1.5 max-w-2xl">
          Todo lo que has producido este curso, en orden. Es tuyo: puedes
          exportarlo y llevártelo.
        </p>

        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ['Producciones', String(mias.length)],
            ['Corregidas', String(firmadas.length)],
            [
              'Palabras escritas',
              mias.reduce((n, e) => n + e.palabras, 0).toLocaleString('es-ES'),
            ],
          ].map(([label, valor]) => (
            <Card key={label} className="p-4">
              <dt className="text-muted-foreground text-xs">{label}</dt>
              <dd className="text-primary mt-1.5 font-mono text-2xl">{valor}</dd>
            </Card>
          ))}
        </dl>

        <ol className="mt-6 space-y-4">
          {mias.map((entrega) => (
            <li key={entrega.id}>
              <Card className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="font-medium">{entrega.tarea}</h2>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      {entrega.entregadoEl ?? 'sin entregar'} ·{' '}
                      {entrega.palabras.toLocaleString('es-ES')} palabras
                    </p>
                  </div>
                  {entrega.notaRatificada !== null ? (
                    <Badge variant="success">
                      {entrega.notaRatificada.toFixed(1)}
                    </Badge>
                  ) : (
                    <Badge variant="muted">Sin corregir</Badge>
                  )}
                </div>
                <div className="mt-3 flex gap-2 border-t pt-3">
                  <Button variant="outline" size="sm">
                    <FileText className="size-4" />
                    Ver entrega
                  </Button>
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/alumno/tareas">Ver devolución</Link>
                  </Button>
                </div>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </AlumnoLayout>
  )
}
