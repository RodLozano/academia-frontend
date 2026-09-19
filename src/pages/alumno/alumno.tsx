import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Check,
  ClipboardCheck,
  Dumbbell,
  Lightbulb,
  MessageCircleQuestion,
  Quote,
  Send,
  Sparkles,
} from 'lucide-react'

import { PageBar } from '@/components/app/page-bar'
import { AppLayout } from '@/layouts/app-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { modulosAlumno } from '@/content/app-nav'
import { alumnos, asignaturas, entregas, estudiante } from '@/mocks/data'

/**
 * Consola del alumno. El valor no está en un chat abierto —eso ya lo dan gratis
 * otros— sino en trabajar sobre **el corpus de su clase y las rúbricas de su
 * profesor**, con guardarraíles y metacognición.
 *
 * Por eso el tutor da pistas y no respuestas, y la práctica sale del contenido
 * de la asignatura y no de un temario genérico.
 */
function AlumnoLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout rotulo="Mi aprendizaje" modulos={modulosAlumno} persona={estudiante}>
      {children}
    </AppLayout>
  )
}

const yo = alumnos[0]

/** Inicio del alumno (3.1). La única pantalla suya con la vista global. */
export function AlumnoInicioPage() {
  const activas = asignaturas.filter((a) => a.activa)
  const mias = entregas.filter((e) => e.alumnoId === yo.id)
  const conFeedback = mias.filter((e) => e.estado === 'ratificada').length

  return (
    <AlumnoLayout>
      <PageBar migas={[{ label: 'Mi aprendizaje' }, { label: 'Inicio' }]} />

      <div className="p-4 lg:p-6">
        <h1 className="text-3xl font-medium">Hola, {estudiante.nombre}</h1>
        <p className="text-muted-foreground mt-1.5">
          {estudiante.adscripcion} · {activas.length} asignaturas en curso
        </p>

        <h2 className="mt-8 text-xl font-medium">Mis asignaturas</h2>
        <div className="mt-3 grid gap-4 lg:grid-cols-3">
          {activas.map((asignatura) => {
            const dominio = Math.round(
              yo.dominio.reduce((n, d) => n + d.nivel, 0) / yo.dominio.length,
            )
            return (
              <Card key={asignatura.id} className="p-5">
                <p className="text-muted-foreground font-mono text-xs uppercase">
                  {asignatura.codigo}
                </p>
                <h3 className="mt-1.5 text-lg font-medium">
                  {asignatura.nombre}
                </h3>
                <p className="text-muted-foreground mt-0.5 flex-1 text-sm">
                  {asignatura.titulacion}
                </p>
                <div className="mt-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-muted-foreground text-xs">
                      Mi avance
                    </span>
                    <span className="font-mono text-xs">{dominio} %</span>
                  </div>
                  <Progress value={dominio} className="mt-1.5" />
                </div>
                <Button asChild size="sm" className="mt-4">
                  <Link to="/alumno/tareas">
                    Qué tengo que hacer
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: MessageCircleQuestion,
              titulo: 'Tutor de refuerzo',
              cuerpo:
                'Pregunta sobre el material de tu clase. Te da pistas, no respuestas.',
              to: '/alumno/tutor',
            },
            {
              icon: Dumbbell,
              titulo: 'Práctica adaptativa',
              cuerpo:
                'Ejercicios generados desde el contenido de tu asignatura.',
              to: '/alumno/practica',
            },
            {
              icon: ClipboardCheck,
              titulo: 'Mis tareas',
              cuerpo: `${conFeedback} con devolución del profesor.`,
              to: '/alumno/tareas',
            },
          ].map((item) => (
            <Card key={item.titulo} className="p-5">
              <span className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-lg">
                <item.icon className="size-4.5" aria-hidden />
              </span>
              <h3 className="mt-4 font-medium">{item.titulo}</h3>
              <p className="text-muted-foreground mt-1.5 flex-1 text-sm">
                {item.cuerpo}
              </p>
              <Link
                to={item.to}
                className="text-primary mt-4 flex items-center gap-1.5 font-medium"
              >
                Entrar
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </AlumnoLayout>
  )
}

/** Tutor de refuerzo (3.2). Asistente anclado a las fuentes, con pistas. */
export function AlumnoTutorPage() {
  const [pregunta, setPregunta] = useState('')
  const [enviada, setEnviada] = useState(false)

  return (
    <AlumnoLayout>
      <PageBar migas={[{ label: 'Mi aprendizaje' }, { label: 'Tutor' }]} />

      <div className="mx-auto max-w-3xl p-4 lg:p-6">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium">
          <MessageCircleQuestion className="text-primary size-6" aria-hidden />
          Tutor de refuerzo
        </h1>
        <p className="text-muted-foreground mt-1.5">
          Responde solo con el material que tu profesora ha aprobado, y te
          orienta en lugar de resolverte el ejercicio.
        </p>

        <div className="border-primary/30 bg-primary/5 mt-5 rounded-xl border p-4">
          <p className="flex items-center gap-2 font-medium">
            <Lightbulb className="text-primary size-4" aria-hidden />
            Cómo funciona
          </p>
          <ul className="text-muted-foreground mt-2 space-y-1.5 text-sm">
            <li>· No escribe tus trabajos ni te da la respuesta final.</li>
            <li>· Cita siempre de qué documento de clase sale cada pista.</li>
            <li>· Si algo no está en el corpus de tu clase, te lo dice.</li>
          </ul>
        </div>

        {enviada && (
          <Card className="mt-5 p-5">
            <p className="text-muted-foreground flex items-center gap-2 text-xs">
              <Sparkles className="text-primary size-3.5" aria-hidden />
              Pista, no respuesta
            </p>
            <p className="mt-2 leading-relaxed">
              Antes de responder, fíjate en dos fechas: cuándo se firmó el
              tratado que mencionas y cuándo empezó el mandato del presidente al
              que lo atribuyes. Si no encajan, ahí tienes el hilo del que tirar.
            </p>
            <div className="mt-4 border-t pt-3">
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <Quote className="size-3" aria-hidden />
                Anclado a: «Guerra Fría: bloques y no alineados», unidad 2,
                páginas 31–34.
              </p>
            </div>
          </Card>
        )}

        <form
          className="mt-5 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault()
            if (pregunta.trim()) setEnviada(true)
          }}
        >
          <Input
            value={pregunta}
            onChange={(event) => setPregunta(event.target.value)}
            placeholder="Pregunta sobre el material de tu clase…"
            aria-label="Tu pregunta"
          />
          <Button type="submit" disabled={!pregunta.trim()}>
            <Send className="size-4" />
            <span className="hidden sm:inline">Preguntar</span>
          </Button>
        </form>
        <p className="text-muted-foreground mt-2 text-xs">
          En esta maqueta la respuesta es un ejemplo fijo: no hay motor detrás.
        </p>
      </div>
    </AlumnoLayout>
  )
}

/** Práctica adaptativa (3.3). Ejercicios desde el contenido de su clase. */
export function AlumnoPracticaPage() {
  const [elegida, setElegida] = useState<number | null>(null)
  const correcta = 1

  const opciones = [
    'Porque los misiles soviéticos en Cuba igualaban el número de ojivas de ambos bloques.',
    'Porque acortaban drásticamente el tiempo de aviso ante un ataque, quebrando la ventaja geográfica estadounidense.',
    'Porque Cuba pasaba a formar parte del Pacto de Varsovia con garantías de defensa mutua.',
  ]

  return (
    <AlumnoLayout>
      <PageBar migas={[{ label: 'Mi aprendizaje' }, { label: 'Práctica' }]} />

      <div className="mx-auto max-w-3xl p-4 lg:p-6">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium">
          <Dumbbell className="text-primary size-6" aria-hidden />
          Práctica adaptativa
        </h1>
        <p className="text-muted-foreground mt-1.5">
          Los ejercicios salen del contenido de tu clase, y la dificultad se
          ajusta a lo que ya dominas.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Badge variant="muted">Unidad 2 · Guerra Fría</Badge>
          <Badge variant="muted">Pregunta 3 de 10</Badge>
          <div className="ml-auto w-32">
            <Progress value={30} />
          </div>
        </div>

        <Card className="mt-4 p-5 lg:p-6">
          <h2 className="text-lg font-medium">
            ¿Por qué el despliegue de misiles en Cuba alteró el equilibrio
            estratégico, más allá del número de ojivas?
          </h2>

          <ul className="mt-5 space-y-2">
            {opciones.map((opcion, i) => {
              const seleccionada = elegida === i
              const esCorrecta = i === correcta
              const resuelto = elegida !== null

              return (
                <li key={opcion}>
                  <button
                    type="button"
                    onClick={() => setElegida(i)}
                    disabled={resuelto}
                    className={[
                      'w-full rounded-xl border p-4 text-left transition-colors',
                      'focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px]',
                      !resuelto && 'hover:bg-accent cursor-pointer',
                      resuelto && esCorrecta && 'border-success bg-success/5',
                      resuelto &&
                        seleccionada &&
                        !esCorrecta &&
                        'border-destructive bg-destructive/5',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <span className="flex items-start gap-3">
                      <span className="text-muted-foreground mt-0.5 font-mono text-xs">
                        {String.fromCharCode(97 + i)})
                      </span>
                      <span className="flex-1">{opcion}</span>
                      {resuelto && esCorrecta && (
                        <Check className="text-success mt-0.5 size-4 shrink-0" aria-hidden />
                      )}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          {elegida !== null && (
            <div className="bg-muted/50 mt-5 rounded-xl border p-4">
              <p className="font-medium">
                {elegida === correcta ? 'Correcto' : 'No era esa'}
              </p>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                La clave es el tiempo de aviso: la proximidad geográfica
                reducía los minutos de reacción, no el recuento de ojivas. Lo
                tienes desarrollado en «Crisis de los misiles: cronología
                documental», unidad 2.
              </p>
              <Button size="sm" className="mt-3" onClick={() => setElegida(null)}>
                Siguiente pregunta
              </Button>
            </div>
          )}
        </Card>
      </div>
    </AlumnoLayout>
  )
}

/** Mis tareas y feedback (3.4). Entregas y devoluciones del docente. */
export function AlumnoTareasPage() {
  const mias = entregas.filter((e) => e.alumnoId === yo.id)

  return (
    <AlumnoLayout>
      <PageBar migas={[{ label: 'Mi aprendizaje' }, { label: 'Tareas' }]} />

      <div className="p-4 lg:p-6">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium">
          <ClipboardCheck className="text-muted-foreground size-6" aria-hidden />
          Mis tareas y feedback
        </h1>
        <p className="text-muted-foreground mt-1.5">
          Tus entregas y lo que te ha devuelto tu profesora.
        </p>

        <div className="mt-6 space-y-4">
          {mias.map((entrega) => {
            const firmada = entrega.notaRatificada !== null
            return (
              <Card key={entrega.id} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-lg font-medium">{entrega.tarea}</h2>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      Entregada el {entrega.entregadoEl} ·{' '}
                      {entrega.palabras.toLocaleString('es-ES')} palabras
                    </p>
                  </div>
                  {firmada ? (
                    <div className="text-right">
                      <p className="text-muted-foreground text-xs">
                        Nota definitiva
                      </p>
                      <p className="font-mono text-2xl">
                        {entrega.notaRatificada!.toFixed(2)}
                      </p>
                    </div>
                  ) : (
                    <Badge variant="muted">Pendiente de corrección</Badge>
                  )}
                </div>

                {firmada ? (
                  <div className="bg-muted/50 mt-4 rounded-xl border p-4">
                    <p className="flex items-center gap-2 font-medium">
                      <BookOpen className="text-primary size-4" aria-hidden />
                      Devolución de tu profesora
                    </p>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      Buen trabajo de síntesis. Revisa la cronología del tercer
                      párrafo y unifica el estilo de citación incorporando la
                      foliación exacta de las monografías.
                    </p>
                    <p className="text-muted-foreground mt-3 border-t pt-2.5 text-xs">
                      Puedes pedir una revisión presencial con tu profesora sin
                      penalización.
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground mt-4 text-sm">
                    Tu profesora todavía no ha firmado la corrección. Hasta
                    entonces no hay nota.
                  </p>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </AlumnoLayout>
  )
}
