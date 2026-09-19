import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  ClipboardList,
  FileCheck2,
  FileText,
  ShieldCheck,
  Sparkles,
  Table2,
  Users,
} from 'lucide-react'

import { PageBar } from '@/components/app/page-bar'
import { RecursoNoEncontrado } from '@/components/app/recurso-no-encontrado'
import { AppLayout } from '@/layouts/app-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { modulosProfesor } from '@/content/app-nav'
import { asignaturas, clases, contenidos, entregas } from '@/mocks/data'

/**
 * Asignatura (detalle) (1.3). De ella cuelgan originales, generados, clases y
 * evaluación, que es el principio organizador de todo el producto.
 *
 * La pantalla es por tanto un repartidor: su trabajo es llevarte al módulo
 * correcto con el contexto ya puesto, no contener las cuatro cosas.
 */
export function AsignaturaDetallePage() {
  const { id } = useParams()
  const asignatura = asignaturas.find((a) => a.id === id)

  if (!asignatura) {
    return (
      <AppLayout rotulo="Panel docente" modulos={modulosProfesor} conLateral={false}>
        <RecursoNoEncontrado
          que="la asignatura"
          id={id}
          volverA="/app/asignaturas"
          volverLabel="Ver mis asignaturas"
          migas={[{ label: 'Asignaturas', to: '/app/asignaturas' }, { label: 'No encontrada' }]}
        />
      </AppLayout>
    )
  }

  const corpus = contenidos.filter((c) => c.asignaturaId === asignatura.id)
  const originales = corpus.filter((c) => c.naturaleza === 'original')
  const generados = corpus.filter((c) => c.naturaleza === 'generado')
  const suyas = entregas.filter((e) => e.asignaturaId === asignatura.id)
  const pendientes = suyas.filter((e) => e.estado === 'propuesta').length
  const ratificadas = suyas.filter((e) => e.estado === 'ratificada').length
  const susClases = clases.filter((c) => c.asignaturaId === asignatura.id)

  const modulos = [
    {
      icon: Table2,
      titulo: 'Cuaderno de evaluación',
      cuerpo:
        'Califica con asistencia del motor, revisa los análisis preliminares y consolida las notas con supervisión activa.',
      badge: pendientes > 0 ? `${pendientes} por ratificar` : 'Al día',
      destacado: pendientes > 0,
      pie: `${ratificadas} ratificadas`,
      to: '/app/cuaderno',
    },
    {
      icon: Sparkles,
      titulo: 'Generador de contenidos',
      cuerpo:
        'Estructura matrices de evaluación, exámenes y fichas a partir del corpus de la cátedra, con su linaje.',
      badge: `${generados.length} generados`,
      destacado: false,
      pie: `${originales.length} originales de partida`,
      to: '/app/generar',
    },
    {
      icon: FileText,
      titulo: 'Evidencias y linaje',
      cuerpo:
        'Registro de decisiones y anclaje de cada generado a los originales de los que salió.',
      badge: 'Trazable',
      destacado: false,
      pie: `${corpus.length} elementos en el corpus`,
      to: '/app/contenidos',
    },
  ]


  return (
    // Trabajo enfocado: a todo el ancho, como su maqueta.
    <AppLayout rotulo="Panel docente" modulos={modulosProfesor} conLateral={false}>
      <PageBar
        migas={[
          { label: 'Asignaturas', to: '/app/asignaturas' },
          { label: `${asignatura.nombre} (${asignatura.grupo})` },
        ]}
        estado={
          asignatura.activa
            ? { label: 'Semestre activo' }
            : { label: 'Cerrada', variant: 'muted' }
        }
        acciones={
          <Button variant="outline" size="sm">
            <FileCheck2 className="size-4" />
            <span className="hidden sm:inline">Exportar acta oficial</span>
            <span className="sm:hidden">Acta</span>
          </Button>
        }
      />

      <div className="p-4 lg:p-6">
        {/* Cabecera de la materia */}
        <Card className="p-5 lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 max-w-2xl">
              <p className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
                <span className="bg-muted rounded px-1.5 py-0.5 font-mono">
                  {asignatura.codigo}
                </span>
                Última sincronización con el campus: hoy, 09:42
              </p>
              <h1 className="mt-2.5 text-2xl font-medium">
                {asignatura.nombre}
              </h1>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {asignatura.descripcion}
              </p>
            </div>

            <div className="space-y-3">
              <div className="bg-muted/50 rounded-xl border p-3 text-center">
                <p className="text-muted-foreground text-xs">
                  Estudiantes matriculados
                </p>
                <p className="mt-1 flex items-center justify-center gap-2">
                  <Users className="text-muted-foreground size-4" aria-hidden />
                  <span className="font-mono text-lg">
                    {asignatura.alumnos}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    ({asignatura.grupos}{' '}
                    {asignatura.grupos === 1 ? 'grupo' : 'grupos'})
                  </span>
                </p>
              </div>
              <p className="text-primary flex items-center gap-1.5 text-xs">
                <ShieldCheck className="size-3.5" aria-hidden />
                Supervisión humana habilitada
              </p>
            </div>
          </div>

          {/* Indicadores */}
          <dl className="bg-muted/40 mt-5 grid gap-4 rounded-xl border p-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: 'Entregas pendientes de revisión',
                valor: String(pendientes),
                nota: pendientes > 0 ? 'Requieren firma docente' : 'Ninguna',
                humano: pendientes > 0,
              },
              {
                label: 'Notas ratificadas',
                valor: String(ratificadas),
                nota: 'Constan en el expediente',
                humano: false,
              },
              {
                label: 'Generados publicados',
                valor: String(generados.length),
                nota: `de ${originales.length} originales`,
                humano: false,
              },
              {
                label: 'Trazabilidad',
                valor: '100 %',
                nota: 'Linaje completo',
                humano: false,
              },
            ].map((item) => (
              <div key={item.label}>
                <dt className="text-muted-foreground text-xs">{item.label}</dt>
                <dd>
                  <span
                    className={
                      item.humano
                        ? 'text-human font-mono text-2xl'
                        : 'text-primary font-mono text-2xl'
                    }
                  >
                    {item.valor}
                  </span>
                  <span
                    className={
                      item.humano
                        ? 'text-human mt-0.5 block text-xs'
                        : 'text-muted-foreground mt-0.5 block text-xs'
                    }
                  >
                    {item.nota}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Card>

        {/* Módulos operativos */}
        <h2 className="mt-8 text-xl font-medium">Módulos de la materia</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Acceso a corrección, diseño curricular y trazabilidad.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {modulos.map((modulo) => (
            <Card
              key={modulo.titulo}
              className={modulo.destacado ? 'border-l-human border-l-2 p-5' : 'p-5'}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
                  <modulo.icon className="size-4.5" aria-hidden />
                </span>
                <Badge variant={modulo.destacado ? 'human' : 'muted'}>
                  {modulo.badge}
                </Badge>
              </div>
              <h3 className="mt-4 text-lg font-medium">{modulo.titulo}</h3>
              <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                {modulo.cuerpo}
              </p>
              <div className="mt-4 flex items-center justify-between gap-3 border-t pt-3">
                <span className="text-muted-foreground text-xs">
                  {modulo.pie}
                </span>
                <Link
                  to={modulo.to}
                  className="text-primary flex shrink-0 items-center gap-1.5 font-medium"
                >
                  Abrir
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Clases */}
        <h2 className="mt-8 text-xl font-medium">Grupos de la materia</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {susClases.map((clase) => (
            <Card key={clase.id} className="flex-row items-center gap-4 p-4">
              <span className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
                <ClipboardList className="size-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{clase.nombre}</p>
                <p className="text-muted-foreground truncate text-xs">
                  {clase.franja} · {clase.aula} · {clase.alumnos} alumnos
                </p>
              </div>
              <Button asChild variant="ghost" size="icon-sm">
                <Link
                  to={`/app/clases/${clase.id}`}
                  aria-label={`Abrir ${clase.nombre}`}
                >
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
