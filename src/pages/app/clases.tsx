import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  CalendarClock,
  MapPin,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react'

import { PageBar } from '@/components/app/page-bar'
import { RecursoNoEncontrado } from '@/components/app/recurso-no-encontrado'
import { AppLayout } from '@/layouts/app-layout'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { modulosProfesor } from '@/content/app-nav'
import { alumnos, asignaturas, clases, entregas } from '@/mocks/data'
import type { Alumno } from '@/mocks/types'

function Tendencia({ tendencia }: { tendencia: Alumno['tendencia'] }) {
  if (tendencia === 'sube') {
    return <TrendingUp className="text-success size-4" aria-label="sube" />
  }
  if (tendencia === 'baja') {
    return <TrendingDown className="text-destructive size-4" aria-label="baja" />
  }
  return <span className="text-muted-foreground text-xs">estable</span>
}

/** Mis clases (1.11). Lista de grupos del docente. */
export function ClasesPage() {
  return (
    <AppLayout rotulo="Panel docente" modulos={modulosProfesor}>
      <PageBar migas={[{ label: 'Cuaderno de evaluación' }, { label: 'Mis clases' }]} />

      <div className="p-4 lg:p-6">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium">
          <Users className="text-muted-foreground size-6" aria-hidden />
          Mis clases
        </h1>
        <p className="text-muted-foreground mt-1.5">
          {clases.length} grupos repartidos entre tus asignaturas.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {clases.map((clase) => {
            const asignatura = asignaturas.find(
              (a) => a.id === clase.asignaturaId,
            )
            const pendientes = entregas.filter(
              (e) => e.claseId === clase.id && e.estado === 'propuesta',
            ).length

            return (
              <Card key={clase.id} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-lg font-medium">{clase.nombre}</h2>
                    <p className="text-muted-foreground text-sm">
                      {asignatura?.nombre}
                    </p>
                  </div>
                  {pendientes > 0 ? (
                    <Badge variant="human">{pendientes} por ratificar</Badge>
                  ) : (
                    <Badge variant="muted">Al día</Badge>
                  )}
                </div>

                <dl className="text-muted-foreground mt-4 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <dt className="sr-only">Horario</dt>
                    <CalendarClock className="size-3.5 shrink-0" aria-hidden />
                    <dd>{clase.franja}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <dt className="sr-only">Aula</dt>
                    <MapPin className="size-3.5 shrink-0" aria-hidden />
                    <dd>
                      {clase.aula} · {clase.alumnos} alumnos
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 flex justify-end border-t pt-3">
                  <Button asChild size="sm">
                    <Link to={`/app/clases/${clase.id}`}>
                      Abrir grupo
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </AppLayout>
  )
}

/** Clase (detalle) (1.12). Alumnado del grupo, contenidos y estado. */
export function ClaseDetallePage() {
  const { id } = useParams()
  const clase = clases.find((c) => c.id === id)

  if (!clase) {
    return (
      <AppLayout rotulo="Panel docente" modulos={modulosProfesor}>
        <RecursoNoEncontrado
          que="el grupo"
          id={id}
          volverA="/app/clases"
          volverLabel="Ver mis clases"
          migas={[{ label: 'Mis clases', to: '/app/clases' }, { label: 'No encontrado' }]}
        />
      </AppLayout>
    )
  }

  const asignatura = asignaturas.find((a) => a.id === clase.asignaturaId)
  const suyos = alumnos.filter((a) => a.claseId === clase.id)

  const conNota = suyos.filter((a) => a.media !== null)
  const media =
    conNota.reduce((suma, a) => suma + (a.media ?? 0), 0) /
    (conNota.length || 1)

  return (
    <AppLayout rotulo="Panel docente" modulos={modulosProfesor}>
      <PageBar
        migas={[
          { label: 'Mis clases', to: '/app/clases' },
          { label: clase.nombre },
        ]}
        estado={{ label: `${suyos.length} alumnos`, variant: 'muted' }}
      />

      <div className="p-4 lg:p-6">
        <h1 className="text-3xl font-medium">{clase.nombre}</h1>
        <p className="text-muted-foreground mt-1.5">
          {asignatura?.nombre} · {clase.franja} · {clase.aula}
        </p>

        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ['Alumnos en el grupo', String(clase.alumnos)],
            ['Media del grupo', media.toFixed(2)],
            [
              'Sin ninguna nota',
              String(suyos.filter((a) => a.media === null).length),
            ],
          ].map(([label, valor]) => (
            <Card key={label} className="p-4">
              <dt className="text-muted-foreground text-xs">{label}</dt>
              <dd className="mt-1.5 font-mono text-2xl">{valor}</dd>
            </Card>
          ))}
        </dl>

        <h2 className="mt-8 text-xl font-medium">Alumnado</h2>
        <Card className="mt-3 divide-y overflow-hidden">
          {suyos.map((alumno) => (
            <div
              key={alumno.id}
              className="flex flex-wrap items-center gap-x-4 gap-y-3 p-4"
            >
              <Avatar className="size-9 shrink-0">
                <AvatarFallback>{alumno.iniciales}</AvatarFallback>
              </Avatar>

              <div className="min-w-40 flex-1">
                <p className="font-medium">{alumno.nombre}</p>
                <p className="text-muted-foreground text-xs">
                  {alumno.entregasPendientes > 0
                    ? `${alumno.entregasPendientes} entregas pendientes`
                    : 'Sin entregas pendientes'}
                </p>
              </div>

              <div className="w-24 shrink-0">
                <p className="text-muted-foreground text-xs">Media</p>
                <p className="font-mono">
                  {alumno.media === null ? '—' : alumno.media.toFixed(1)}
                </p>
              </div>

              <div className="w-8 shrink-0">
                <Tendencia tendencia={alumno.tendencia} />
              </div>

              <div className="ml-auto shrink-0">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/app/alumnos/${alumno.id}`}>
                    Ficha
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </AppLayout>
  )
}

/** Ficha de alumno (1.13). Progreso individual y refuerzo anclado a su clase. */
export function AlumnoFichaPage() {
  const { id } = useParams()
  const alumno = alumnos.find((a) => a.id === id)

  if (!alumno) {
    return (
      <AppLayout rotulo="Panel docente" modulos={modulosProfesor}>
        <RecursoNoEncontrado
          que="a ese alumno"
          id={id}
          volverA="/app/clases"
          volverLabel="Ver mis clases"
          migas={[{ label: 'Mis clases', to: '/app/clases' }, { label: 'No encontrado' }]}
        />
      </AppLayout>
    )
  }

  const clase = clases.find((c) => c.id === alumno.claseId)
  const suyas = entregas.filter((e) => e.alumnoId === alumno.id)

  return (
    <AppLayout rotulo="Panel docente" modulos={modulosProfesor}>
      <PageBar
        migas={[
          { label: 'Mis clases', to: '/app/clases' },
          { label: clase?.nombre ?? 'Grupo', to: `/app/clases/${clase?.id}` },
          { label: alumno.nombre },
        ]}
      />

      <div className="grid items-start gap-6 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:p-6">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarFallback>{alumno.iniciales}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-medium">{alumno.nombre}</h1>
              <p className="text-muted-foreground text-sm">
                {clase?.nombre} · media{' '}
                <span className="font-mono">
                  {alumno.media === null ? '—' : alumno.media.toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          {/* Mapa de dominio: el eje del refuerzo personalizado */}
          <Card className="mt-6 p-5">
            <h2 className="font-medium">Dominio por competencia</h2>
            <p className="text-muted-foreground mt-1 text-xs">
              Calculado sobre las notas ratificadas, no sobre las propuestas.
            </p>
            <dl className="mt-4 space-y-4">
              {alumno.dominio.map((item) => (
                <div key={item.competencia}>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt>{item.competencia}</dt>
                    <dd className="shrink-0 font-mono text-sm">
                      {item.nivel} %
                    </dd>
                  </div>
                  <Progress
                    value={item.nivel}
                    className="mt-1.5"
                    indicatorClassName={
                      item.nivel < 50
                        ? 'bg-destructive'
                        : item.nivel < 70
                          ? 'bg-warning'
                          : 'bg-primary'
                    }
                  />
                </div>
              ))}
            </dl>
          </Card>

          <h2 className="mt-8 text-xl font-medium">Entregas</h2>
          <Card className="mt-3 divide-y overflow-hidden">
            {suyas.length === 0 ? (
              <p className="text-muted-foreground p-6 text-center text-sm">
                Sin entregas registradas.
              </p>
            ) : (
              suyas.map((entrega) => (
                <div key={entrega.id} className="flex flex-wrap items-center gap-3 p-4">
                  <div className="min-w-40 flex-1">
                    <p className="font-medium">{entrega.tarea}</p>
                    <p className="text-muted-foreground text-xs">
                      {entrega.entregadoEl ?? 'Sin entregar'}
                    </p>
                  </div>
                  <div className="w-24 shrink-0">
                    {entrega.notaRatificada !== null ? (
                      <>
                        <p className="text-muted-foreground text-xs">Firmada</p>
                        <p className="font-mono">
                          {entrega.notaRatificada.toFixed(2)}
                        </p>
                      </>
                    ) : entrega.notaPropuesta !== null ? (
                      <>
                        <p className="text-muted-foreground text-xs">
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
                  <Button asChild variant="ghost" size="sm" className="shrink-0">
                    <Link to={`/app/evaluar/${entrega.id}`}>Abrir</Link>
                  </Button>
                </div>
              ))
            )}
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="p-4">
            <h2 className="font-medium">Refuerzo sugerido</h2>
            <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
              El motor propone material de repaso para las competencias por
              debajo del 70 %, generado desde el corpus de{' '}
              {clase?.nombre ?? 'su grupo'}.
            </p>
            <ul className="mt-3 space-y-2">
              {alumno.dominio
                .filter((d) => d.nivel < 70)
                .map((d) => (
                  <li
                    key={d.competencia}
                    className="bg-muted/50 rounded-lg border p-3 text-sm"
                  >
                    {d.competencia}
                    <span className="text-muted-foreground block text-xs">
                      {d.nivel} % de dominio
                    </span>
                  </li>
                ))}
            </ul>
            <Button asChild variant="outline" size="sm" className="mt-3 w-full">
              <Link to="/app/generar/ficha">Generar ficha de refuerzo</Link>
            </Button>
          </Card>

          <div className="bg-muted/50 rounded-xl border p-4">
            <p className="text-muted-foreground text-xs leading-relaxed">
              Este perfil es una herramienta docente. El inventario deja para
              más adelante decidir qué parte de esto ve el propio alumno.
            </p>
          </div>
        </aside>
      </div>
    </AppLayout>
  )
}
