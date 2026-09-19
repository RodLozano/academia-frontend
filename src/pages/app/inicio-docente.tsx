import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BellRing,
  BookOpen,
  ClipboardList,
  ExternalLink,
  FileCheck2,
  Scale,
  Sparkles,
  TriangleAlert,
  Users,
} from 'lucide-react'

import { PageBar } from '@/components/app/page-bar'
import { AppLayout } from '@/layouts/app-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { modulosProfesor } from '@/content/app-nav'
import { asignaturas, docente, entregas } from '@/mocks/data'

function saludo() {
  const hora = new Date().getHours()
  if (hora < 13) return 'Buenos días'
  if (hora < 21) return 'Buenas tardes'
  return 'Buenas noches'
}

const accesos = [
  {
    icon: Sparkles,
    titulo: 'Generar contenido',
    cuerpo:
      'Creación y ajuste de rúbricas normalizadas, guías docentes y baterías de examen alineadas al corpus de la cátedra.',
    badge: 'Rúbricas y guías',
    pie: 'Marco regulatorio v3.1',
    accion: 'Configurar',
    to: '/app/generar',
    destacado: false,
  },
  {
    icon: ClipboardList,
    titulo: 'Corregir entregas',
    cuerpo:
      'Revisión asistida de argumentación. Propuestas de retroalimentación granular pendientes de validación definitiva.',
    badge: '28 propuestas listas',
    pie: 'Cola de evaluación',
    accion: 'Abrir cola',
    to: '/app/evaluar',
    destacado: true,
  },
  {
    icon: Users,
    titulo: 'Mis clases',
    cuerpo:
      'Control de asistencia, expedientes consolidados y sincronización periódica de notas oficiales con el campus virtual.',
    badge: '3 grupos activos',
    pie: 'Sincronizado con el campus',
    accion: 'Gestionar',
    to: '/app/clases',
    destacado: false,
  },
]

const avisos = [
  {
    tono: 'human' as const,
    titulo: 'Discrepancia en evaluación',
    cuando: 'Hace 42 min',
    cuerpo:
      'Una entrega de Lucas Ferrán presenta una sugerencia del motor (+1,30 puntos) por reconsideración de bibliografía secundaria.',
    etiqueta: 'Requiere criterio docente',
    accion: { label: 'Revisar caso', to: '/app/evaluar/e-3' },
  },
  {
    tono: 'success' as const,
    titulo: 'Rúbrica departamental sincronizada',
    cuando: 'Hoy, 08:30',
    cuerpo:
      'Actualización a la versión 3.1 para ensayos de grado, homologada por la junta de facultad.',
    accion: { label: 'Ver cambios en criterios', to: '/app/contenidos/c-g1' },
  },
  {
    tono: 'warning' as const,
    titulo: 'Plazo de actas ordinarias',
    cuando: '4 días restan',
    cuerpo:
      'El envío definitivo de actas oficiales a secretaría se cierra el 20 de marzo a las 23:59.',
  },
  {
    tono: 'success' as const,
    titulo: 'Trazabilidad y linaje verificados',
    cuando: 'Ayer',
    cuerpo:
      'Informe de explicabilidad registrado para 48 evaluaciones del primer parcial.',
  },
]

/**
 * Barra de progreso de tres segmentos: lo que ya ratificó el docente, lo que el
 * motor ha propuesto y espera, y lo que nadie ha tocado. Es la lectura central
 * de la pantalla, así que el color tiene que distinguir esos tres estados.
 */
function ProgresoRevision({
  ratificadas,
  propuestas,
  total,
}: {
  ratificadas: number
  propuestas: number
  total: number
}) {
  const pct = (n: number) => (total > 0 ? (n / total) * 100 : 0)

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-medium">Progreso de revisión de propuestas</p>
        <p className="text-muted-foreground shrink-0 text-xs">
          <span className="text-foreground font-mono">{ratificadas}</span> /{' '}
          {total} validadas ({Math.round(pct(ratificadas))} %)
        </p>
      </div>

      <div className="bg-muted mt-2 flex h-2 overflow-hidden rounded-full">
        <div className="bg-primary" style={{ width: `${pct(ratificadas)}%` }} />
        <div
          className="bg-primary/35"
          style={{ width: `${pct(propuestas)}%` }}
        />
      </div>

      <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="bg-primary size-2 rounded-full" aria-hidden />
          Ratificado por el docente
        </span>
        <span className="flex items-center gap-1.5">
          <span className="bg-primary/35 size-2 rounded-full" aria-hidden />
          Propuesta del motor
        </span>
        <span className="flex items-center gap-1.5">
          <span className="bg-muted size-2 rounded-full border" aria-hidden />
          Sin revisar
        </span>
      </div>
    </div>
  )
}

export function InicioDocentePage() {
  const activas = asignaturas.filter((a) => a.activa)

  const pendientes = entregas.filter((e) => e.estado === 'propuesta').length

  return (
    <AppLayout rotulo="Panel docente" modulos={modulosProfesor}>
      <PageBar
        migas={[{ label: 'Cuaderno de evaluación' }, { label: 'Resumen de curso' }]}
        estado={{ label: 'Semestre activo' }}
        acciones={
          <Button asChild size="sm" variant="outline">
            <Link to="/app/cuaderno">
              <FileCheck2 className="size-4" />
              <span className="hidden sm:inline">Exportar acta oficial</span>
              <span className="sm:hidden">Acta</span>
            </Link>
          </Button>
        }
      />

      <div className="p-4 lg:p-6">
        {/* Encabezado */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-muted-foreground font-mono text-xs tracking-[0.08em] uppercase">
              Curso 2024/25 · semestre de primavera · convocatoria ordinaria
            </p>
            <h1 className="mt-2 text-3xl font-medium">
              {saludo()}, {docente.nombre}
            </h1>
            <p className="text-muted-foreground mt-1">
              Departamento de {docente.adscripcion} · cátedra de Historia
              Contemporánea
            </p>
          </div>

          <div className="text-muted-foreground flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="bg-success size-2 rounded-full" aria-hidden />
              Soporte analítico activo
            </span>
            <span className="bg-border h-4 w-px" aria-hidden />
            <span>
              <span className="text-foreground font-mono">14</span> borradores
              pendientes
            </span>
          </div>
        </div>

        {/* Accesos directos */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {accesos.map((acceso) => (
            <Card
              key={acceso.titulo}
              className={
                acceso.destacado
                  ? 'border-l-primary p-5 border-l-2'
                  : 'p-5'
              }
            >
              <div className="flex items-start justify-between gap-3">
                <span className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
                  <acceso.icon className="size-4.5" aria-hidden />
                </span>
                <Badge variant={acceso.destacado ? 'default' : 'muted'}>
                  {acceso.badge}
                </Badge>
              </div>
              <h2 className="mt-4 text-lg font-medium">{acceso.titulo}</h2>
              <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                {acceso.cuerpo}
              </p>
              <div className="mt-4 flex items-center justify-between gap-3 border-t pt-3">
                <span className="text-muted-foreground text-xs">
                  {acceso.pie}
                </span>
                <Link
                  to={acceso.to}
                  className="text-primary flex shrink-0 items-center gap-1.5 font-medium"
                >
                  {acceso.accion}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          {/* Resumen por asignatura */}
          <section aria-labelledby="resumen-asignaturas">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2
                id="resumen-asignaturas"
                className="flex items-center gap-2 text-xl font-medium"
              >
                <BookOpen className="text-muted-foreground size-4.5" aria-hidden />
                Resumen por asignatura
              </h2>
              <Button asChild variant="ghost" size="sm">
                <Link to="/app/asignaturas">Todas ({activas.length})</Link>
              </Button>
            </div>

            <div className="mt-4 space-y-4">
              {activas.map((asignatura) => {
                const suyas = entregas.filter(
                  (e) => e.asignaturaId === asignatura.id,
                )
                const ratificadas = suyas.filter(
                  (e) => e.estado === 'ratificada',
                ).length
                const propuestas = suyas.filter(
                  (e) => e.estado === 'propuesta',
                ).length

                return (
                  <Card key={asignatura.id} className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-muted-foreground font-mono text-xs tracking-[0.06em] uppercase">
                          {asignatura.codigo} · {asignatura.titulacion} ·{' '}
                          {asignatura.grupo}
                        </p>
                        <h3 className="mt-1.5 text-lg font-medium">
                          {asignatura.nombre}
                        </h3>
                        <p className="text-muted-foreground mt-0.5 text-sm">
                          {asignatura.alumnos} estudiantes matriculados ·{' '}
                          {asignatura.grupos}{' '}
                          {asignatura.grupos === 1 ? 'grupo' : 'grupos'}
                        </p>
                      </div>
                      {propuestas > 0 ? (
                        <Badge variant="human">
                          {propuestas} esperan ratificación
                        </Badge>
                      ) : (
                        <Badge variant="muted">Al día</Badge>
                      )}
                    </div>

                    {suyas.length > 0 && (
                      <div className="bg-muted/40 mt-4 rounded-xl border p-4">
                        <ProgresoRevision
                          ratificadas={ratificadas}
                          propuestas={propuestas}
                          total={suyas.length}
                        />
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-3">
                      <p className="text-muted-foreground text-xs">
                        {asignatura.descripcion.slice(0, 64)}…
                      </p>
                      <div className="flex shrink-0 gap-2">
                        <Button asChild variant="ghost" size="sm">
                          <Link to={`/app/asignaturas/${asignatura.id}`}>
                            Ver materia
                          </Link>
                        </Button>
                        <Button asChild size="sm">
                          <Link to="/app/cuaderno">Abrir cuaderno</Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Supervisión y avisos */}
          <aside aria-labelledby="avisos" className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 id="avisos" className="flex items-center gap-2 text-xl font-medium">
                <BellRing className="text-muted-foreground size-4.5" aria-hidden />
                Supervisión y avisos
              </h2>
              <span className="text-muted-foreground text-xs">
                {avisos.length} activos
              </span>
            </div>

            <Card className="divide-y">
              {avisos.map((aviso) => (
                <div key={aviso.titulo} className="p-4">
                  <div className="flex items-start gap-2.5">
                    <span
                      className={
                        aviso.tono === 'human'
                          ? 'bg-human mt-1.5 size-2 shrink-0 rounded-full'
                          : aviso.tono === 'warning'
                            ? 'bg-warning mt-1.5 size-2 shrink-0 rounded-full'
                            : 'bg-success mt-1.5 size-2 shrink-0 rounded-full'
                      }
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="font-medium">{aviso.titulo}</p>
                        <span className="text-muted-foreground shrink-0 text-xs">
                          {aviso.cuando}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                        {aviso.cuerpo}
                      </p>
                      {(aviso.etiqueta || aviso.accion) && (
                        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                          {aviso.etiqueta && (
                            <span className="text-human flex items-center gap-1.5 text-xs font-medium">
                              <TriangleAlert className="size-3.5" aria-hidden />
                              {aviso.etiqueta}
                            </span>
                          )}
                          {aviso.accion && (
                            <Link
                              to={aviso.accion.to}
                              className="text-primary ml-auto flex items-center gap-1 text-xs font-medium"
                            >
                              {aviso.accion.label}
                              <ExternalLink className="size-3" aria-hidden />
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Card>

            <Card className="p-4">
              <h3 className="flex items-center gap-2 font-medium">
                <Scale className="text-primary size-4" aria-hidden />
                Principio de primacía docente
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Conforme a las directrices europeas de inteligencia artificial
                para el entorno educativo, ningún dictamen predictivo ni nota
                sugerida tiene carácter resolutivo sin la confirmación
                individualizada y consciente del profesor responsable.
              </p>
              <dl className="mt-4 space-y-2 border-t pt-3 text-xs">
                {[
                  ['Entregas esperando ratificación', String(pendientes)],
                  ['Tiempo medio de revisión', '4,2 min/alumno'],
                  ['Propuestas modificadas por el docente', '23 %'],
                ].map(([clave, valor]) => (
                  <div key={clave} className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">{clave}</dt>
                    <dd className="text-primary shrink-0 font-mono">{valor}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </aside>
        </div>
      </div>
    </AppLayout>
  )
}
