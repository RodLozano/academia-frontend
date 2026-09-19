import { Link } from 'react-router-dom'
import { ArrowRight, Library, Sparkles, Users } from 'lucide-react'

import { PageBar } from '@/components/app/page-bar'
import { AppLayout } from '@/layouts/app-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { modulosProfesor } from '@/content/app-nav'
import { asignaturas, contenidos, entregas } from '@/mocks/data'

/**
 * Asignaturas (1.2). El hub que organiza el trabajo del docente.
 *
 * Es la vista global: la única del profesor que no está filtrada por la
 * asignatura de la carcasa, igual que el inicio del alumno es la única suya que
 * muestra todas.
 */
export function AsignaturasPage() {
  const activas = asignaturas.filter((a) => a.activa)
  const cerradas = asignaturas.filter((a) => !a.activa)

  const tarjeta = (asignatura: (typeof asignaturas)[number]) => {
    const suyas = entregas.filter((e) => e.asignaturaId === asignatura.id)
    const pendientes = suyas.filter((e) => e.estado === 'propuesta').length
    const corpus = contenidos.filter((c) => c.asignaturaId === asignatura.id)
    const generados = corpus.filter((c) => c.naturaleza === 'generado').length

    return (
      <Card key={asignatura.id} className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-muted-foreground font-mono text-xs tracking-[0.06em] uppercase">
              {asignatura.codigo} · {asignatura.grupo} · {asignatura.curso}
            </p>
            <h2 className="mt-1.5 text-lg font-medium">{asignatura.nombre}</h2>
            <p className="text-muted-foreground text-sm">
              {asignatura.titulacion}
            </p>
          </div>
          {pendientes > 0 ? (
            <Badge variant="human">{pendientes} esperan ratificación</Badge>
          ) : asignatura.activa ? (
            <Badge variant="muted">Al día</Badge>
          ) : (
            <Badge variant="muted">Cerrada</Badge>
          )}
        </div>

        <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
          {asignatura.descripcion}
        </p>

        <dl className="mt-4 grid grid-cols-3 gap-3 border-t pt-3 text-xs">
          <div>
            <dt className="text-muted-foreground flex items-center gap-1.5">
              <Users className="size-3.5" aria-hidden />
              Alumnos
            </dt>
            <dd className="mt-0.5 font-mono">{asignatura.alumnos}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground flex items-center gap-1.5">
              <Library className="size-3.5" aria-hidden />
              Corpus
            </dt>
            <dd className="mt-0.5 font-mono">{corpus.length}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="size-3.5" aria-hidden />
              Generados
            </dt>
            <dd className="text-primary mt-0.5 font-mono">{generados}</dd>
          </div>
        </dl>

        <div className="mt-4 flex justify-end">
          <Button asChild size="sm" variant={asignatura.activa ? 'default' : 'outline'}>
            <Link to={`/app/asignaturas/${asignatura.id}`}>
              Abrir materia
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <AppLayout rotulo="Panel docente" modulos={modulosProfesor}>
      <PageBar migas={[{ label: 'Cuaderno de evaluación' }, { label: 'Asignaturas' }]} />

      <div className="p-4 lg:p-6">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium">
          <Library className="text-muted-foreground size-6" aria-hidden />
          Mis asignaturas
        </h1>
        <p className="text-muted-foreground mt-1.5">
          De cada asignatura cuelgan sus originales, sus generados, sus clases y
          su evaluación.
        </p>

        <h2 className="text-muted-foreground mt-8 text-xs font-medium tracking-[0.1em] uppercase">
          En curso ({activas.length})
        </h2>
        <div className="mt-3 grid gap-4 lg:grid-cols-2">
          {activas.map(tarjeta)}
        </div>

        {cerradas.length > 0 && (
          <>
            <h2 className="text-muted-foreground mt-8 text-xs font-medium tracking-[0.1em] uppercase">
              Cerradas ({cerradas.length})
            </h2>
            <div className="mt-3 grid gap-4 lg:grid-cols-2">
              {cerradas.map(tarjeta)}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  )
}
