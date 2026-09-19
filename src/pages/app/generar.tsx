import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Sparkles,
} from 'lucide-react'

import { PageBar } from '@/components/app/page-bar'
import { AppLayout } from '@/layouts/app-layout'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { modulosProfesor } from '@/content/app-nav'
import { useSubject } from '@/lib/subject-context'
import { generadores } from '@/content/generadores'
import { contenidos } from '@/mocks/data'
import type { TipoGenerado } from '@/mocks/types'

/**
 * Hub de generadores (1.6). Cuatro generadores, uno por tipo de salida.
 *
 * Todos parten del mismo sitio: el corpus de originales de la asignatura. Esa
 * es la diferencia con una IA genérica, así que la pantalla lo dice antes de
 * ofrecer nada.
 */


export function GenerarPage() {
  const { asignatura } = useSubject()
  const corpus = contenidos.filter((c) => c.asignaturaId === asignatura.id)
  const originales = corpus.filter((c) => c.naturaleza === 'original')

  const cuenta = (tipo: TipoGenerado) =>
    corpus.filter((c) => c.naturaleza === 'generado' && c.tipo === tipo).length

  return (
    <AppLayout rotulo="Panel docente" modulos={modulosProfesor}>
      <PageBar migas={[{ label: 'Generador de contenidos' }, { label: 'Hub' }]} />

      <div className="p-4 lg:p-6">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium">
          <Sparkles className="text-primary size-6" aria-hidden />
          Generar desde el corpus
        </h1>
        <p className="text-muted-foreground mt-1.5 max-w-2xl">
          Todo lo que generes parte de los{' '}
          <Link to="/app/contenidos" className="text-primary hover:underline">
            {originales.length} originales
          </Link>{' '}
          de {asignatura.nombre}, y queda anclado a ellos. El motor no puede
          usar nada que no esté en el corpus de tu cátedra.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {generadores.map((generador) => {
            const n = cuenta(generador.tipo)
            return (
              <Card key={generador.tipo} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
                    <generador.icon className="size-4.5" aria-hidden />
                  </span>
                  <Badge variant="muted">
                    {n} {n === 1 ? 'generado' : 'generados'}
                  </Badge>
                </div>
                <h2 className="mt-4 text-lg font-medium">{generador.titulo}</h2>
                <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                  {generador.cuerpo}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3 border-t pt-3">
                  <span className="text-muted-foreground text-xs">
                    Salida: {generador.salida}
                  </span>
                  <Link
                    to={`/app/generar/${generador.tipo}`}
                    className="text-primary flex shrink-0 items-center gap-1.5 font-medium"
                  >
                    Abrir espacio
                    <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="border-primary/30 bg-primary/5 mt-6 rounded-xl border p-4">
          <p className="font-medium">Nada se publica solo</p>
          <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
            Lo que salga del motor nace como borrador. Se guarda en el corpus
            como generado, con su linaje, y no puede usarse para evaluar hasta
            que lo adoptas como propio.
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
