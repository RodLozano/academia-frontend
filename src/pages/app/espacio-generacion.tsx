import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Check,
  FileText,
  GitBranch,
  RotateCcw,
  Save,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

import { PageBar } from '@/components/app/page-bar'
import { RecursoNoEncontrado } from '@/components/app/recurso-no-encontrado'
import { AppLayout } from '@/layouts/app-layout'
import { generadores } from '@/content/generadores'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { modulosProfesor } from '@/content/app-nav'
import { useSubject } from '@/lib/subject-context'
import { contenidos, rubrica } from '@/mocks/data'
import type { TipoGenerado } from '@/mocks/types'

/**
 * Espacio de generación (1.7). El workspace: se genera desde el corpus, se
 * edita y se guarda como generado con su linaje.
 *
 * Las fuentes se eligen **antes** de generar y quedan a la vista durante todo
 * el proceso: es la interfaz del anclaje, y lo que permite que el resultado
 * tenga linaje en lugar de procedencia desconocida.
 */
export function EspacioGeneracionPage() {
  const { tipo } = useParams<{ tipo: TipoGenerado }>()
  const { asignatura } = useSubject()

  const generador = generadores.find((g) => g.tipo === tipo)

  const originales = contenidos.filter(
    (c) => c.asignaturaId === asignatura.id && c.naturaleza === 'original',
  )

  const [fuentes, setFuentes] = useState<string[]>(
    originales.slice(0, 2).map((o) => o.id),
  )
  const [instrucciones, setInstrucciones] = useState('')
  const [generado, setGenerado] = useState(false)
  const [adoptado, setAdoptado] = useState(false)

  if (!generador) {
    return (
      <AppLayout rotulo="Panel docente" modulos={modulosProfesor} conLateral={false}>
        <RecursoNoEncontrado
          que="ese generador"
          id={tipo}
          volverA="/app/generar"
          volverLabel="Ver los generadores"
          migas={[{ label: 'Generador', to: '/app/generar' }, { label: 'No encontrado' }]}
        />
      </AppLayout>
    )
  }

  const alternar = (id: string) =>
    setFuentes((actuales) =>
      actuales.includes(id)
        ? actuales.filter((f) => f !== id)
        : [...actuales, id],
    )

  return (
    // Trabajo enfocado: a todo el ancho, como su maqueta.
    <AppLayout rotulo="Panel docente" modulos={modulosProfesor} conLateral={false}>
      <PageBar
        migas={[
          { label: 'Generador', to: '/app/generar' },
          { label: generador.titulo },
        ]}
        estado={
          adoptado
            ? { label: 'Adoptado como propio' }
            : generado
              ? { label: 'Borrador sin adoptar', variant: 'human' }
              : { label: 'Sin generar', variant: 'muted' }
        }
      />

      <div className="grid items-start gap-6 p-4 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:p-6">
        {/* Anclaje: de dónde va a salir */}
        <aside className="space-y-4">
          <div>
            <h1 className="flex items-center gap-2 text-xl font-medium">
              <generador.icon className="text-primary size-5" aria-hidden />
              {generador.titulo}
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {generador.cuerpo}
            </p>
          </div>

          <Card className="p-4">
            <h2 className="flex items-center gap-2 font-medium">
              <GitBranch className="text-primary size-4" aria-hidden />
              Fuentes del corpus
            </h2>
            <p className="text-muted-foreground mt-1 text-xs">
              El motor solo podrá usar lo que marques. Será el linaje del
              resultado.
            </p>
            <ul className="mt-3 space-y-2">
              {originales.map((original) => (
                <li key={original.id}>
                  <label className="hover:bg-accent flex cursor-pointer items-start gap-2.5 rounded-lg border p-3 transition-colors">
                    <Checkbox
                      checked={fuentes.includes(original.id)}
                      onCheckedChange={() => alternar(original.id)}
                      className="mt-0.5"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">
                        {original.titulo}
                      </span>
                      <span className="text-muted-foreground block text-xs">
                        {original.unidad} · {original.extension}
                      </span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            {fuentes.length === 0 && (
              <p className="text-destructive mt-2 text-xs">
                Marca al menos una fuente: sin corpus no hay generación anclada.
              </p>
            )}
          </Card>

          <div>
            <Label htmlFor="unidad">Unidad de destino</Label>
            <Select defaultValue="u2">
              <SelectTrigger id="unidad" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="u1">Unidad 1</SelectItem>
                <SelectItem value="u2">Unidad 2</SelectItem>
                <SelectItem value="u3">Unidad 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="instrucciones">Instrucciones para el motor</Label>
            <Textarea
              id="instrucciones"
              value={instrucciones}
              onChange={(event) => setInstrucciones(event.target.value)}
              placeholder="Nivel de exigencia, competencias a cubrir, formato…"
              rows={4}
              className="mt-2"
            />
          </div>

          <Button
            className="w-full"
            disabled={fuentes.length === 0}
            onClick={() => {
              setGenerado(true)
              setAdoptado(false)
            }}
          >
            <Sparkles className="size-4" />
            {generado ? 'Regenerar borrador' : 'Generar borrador'}
          </Button>
          <p className="text-muted-foreground text-xs">
            En esta maqueta no hay motor: el resultado es un ejemplo fijo.
          </p>
        </aside>

        {/* Resultado editable */}
        <section aria-labelledby="resultado" className="min-w-0">
          {!generado ? (
            <Card className="p-10 text-center">
              <span className="bg-muted text-muted-foreground mx-auto flex size-11 items-center justify-center rounded-xl">
                <Sparkles className="size-5" aria-hidden />
              </span>
              <h2 id="resultado" className="mt-4 text-lg font-medium">
                Espacio de trabajo preparado
              </h2>
              <p className="text-muted-foreground mx-auto mt-2 max-w-sm text-sm leading-relaxed">
                Elige las fuentes de la izquierda y genera un borrador. Podrás
                editarlo antes de guardarlo en el corpus.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 id="resultado" className="text-xl font-medium">
                  Borrador generado
                </h2>
                <Badge variant={adoptado ? 'success' : 'human'}>
                  {adoptado ? 'Adoptado como propio' : 'Sin adoptar'}
                </Badge>
              </div>

              {/* Linaje del borrador, siempre visible */}
              <div className="bg-muted/50 rounded-xl border p-3">
                <p className="text-muted-foreground text-xs">
                  Anclado a {fuentes.length}{' '}
                  {fuentes.length === 1 ? 'fuente' : 'fuentes'}:
                </p>
                <ul className="mt-1.5 flex flex-wrap gap-1.5">
                  {fuentes.map((id) => {
                    const fuente = originales.find((o) => o.id === id)
                    return (
                      <li key={id}>
                        <Badge variant="outline">
                          <FileText className="size-3" aria-hidden />
                          {fuente?.titulo.slice(0, 32)}
                        </Badge>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <Card className="p-5">
                <ol className="space-y-3">
                  {rubrica.map((criterio, i) => (
                    <li key={criterio.id} className="rounded-xl border p-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-medium">
                          {i + 1}. {criterio.criterio}
                        </h3>
                        <span className="text-primary shrink-0 font-mono text-sm">
                          {criterio.peso} %
                        </span>
                      </div>
                      <dl className="mt-2.5 space-y-1.5 text-sm">
                        {criterio.niveles.map((nivel) => (
                          <div key={nivel.nivel} className="flex gap-2">
                            <dt className="w-24 shrink-0 font-medium">
                              {nivel.nivel}
                            </dt>
                            <dd className="text-muted-foreground">
                              {nivel.descriptor}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </li>
                  ))}
                </ol>
              </Card>

              {/* El paso humano: adoptarlo */}
              <div className="bg-card flex flex-wrap items-center gap-3 rounded-xl border p-4">
                <p className="text-muted-foreground min-w-0 flex-1 text-xs">
                  {adoptado
                    ? 'Guardado en el corpus como generado, con su linaje. Ya puede usarse para evaluar.'
                    : 'Un borrador no puede usarse para evaluar. Adoptarlo lo convierte en contenido de tu autoría.'}
                </p>
                {adoptado ? (
                  <>
                    <Badge variant="success">
                      <Check className="size-3" aria-hidden />
                      En el corpus
                    </Badge>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/app/contenidos">Ver en el inventario</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm">
                      <Save className="size-4" />
                      Guardar borrador
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setGenerado(false)}>
                      <RotateCcw className="size-4" />
                      Descartar
                    </Button>
                    {/* Adoptar es el acto humano: asumes la autoría. */}
                    <Button variant="human" size="sm" onClick={() => setAdoptado(true)}>
                      <ShieldCheck className="size-4" />
                      Adoptar como propio
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  )
}
