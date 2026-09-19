import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookMarked,
  Check,
  Download,
  ExternalLink,
  FileText,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'

import { PageBar } from '@/components/app/page-bar'
import { AppLayout } from '@/layouts/app-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { modulosProfesor } from '@/content/app-nav'
import { useSubject } from '@/lib/subject-context'
import { cn } from '@/lib/utils'
import { contenidos } from '@/mocks/data'
import type { Contenido } from '@/mocks/types'

/**
 * Inventario de contenidos (1.4). Repositorio documental con registro de
 * linaje.
 *
 * La columna que hace especial a esta tabla es **naturaleza**: dice si el
 * material lo subió una persona o lo produjo un motor, y en el segundo caso
 * cuál. Esa columna es lo que una auditoría viene a leer.
 *
 * El detalle vive en un **panel lateral**, no en otra página: comprobar la
 * procedencia de veinte materiales seguidos exige no perder la lista de vista.
 * La ruta /app/contenidos/:id sigue existiendo para enlazar uno concreto.
 */

/**
 * Etiqueta del motor. Deliberadamente genérica: la maqueta nombra modelos
 * comerciales concretos (Claude, GPT-4o, Llama) y el repositorio es público,
 * así que nombrarlos se leería como una afirmación sobre la infraestructura
 * real, que es Ollama sobre servidores propios.
 */
function motorDe(contenido: Contenido) {
  if (contenido.naturaleza === 'original') return null
  const grande = contenido.hash.charCodeAt(0) % 2 === 0
  return grande ? 'Modelo local 70B' : 'Modelo local 8B'
}

/** Formato de archivo derivado del tipo. Dato de maqueta. */
function formatoDe(contenido: Contenido) {
  if (contenido.naturaleza === 'original') return 'PDF'
  switch (contenido.tipo) {
    case 'rubrica':
      return 'JSON / rúbrica'
    case 'examen':
      return 'PDF'
    case 'ficha':
      return 'Markdown'
    default:
      return 'DOCX'
  }
}

/** Identificador de linaje, en mono. Dato de maqueta. */
function idLinajeDe(contenido: Contenido) {
  const prefijo =
    contenido.naturaleza === 'original'
      ? 'orig'
      : contenido.tipo === 'rubrica'
        ? 'rub'
        : contenido.tipo === 'examen'
          ? 'exm'
          : 'gen'
  return `${prefijo}_v${contenido.version}·${contenido.hash.slice(0, 4)}`
}

type Naturaleza = 'todos' | 'original' | 'generado'
type Orden = 'recientes' | 'titulo'

export function ContenidosPage() {
  const { asignatura, asignaturas } = useSubject()
  const [naturaleza, setNaturaleza] = useState<Naturaleza>('todos')
  const [q, setQ] = useState('')
  const [orden, setOrden] = useState<Orden>('recientes')
  const [ambito, setAmbito] = useState(asignatura.id)
  const [seleccionado, setSeleccionado] = useState<string | null>(null)

  const delAmbito = useMemo(
    () =>
      ambito === 'todas'
        ? contenidos
        : contenidos.filter((c) => c.asignaturaId === ambito),
    [ambito],
  )

  const originales = delAmbito.filter((c) => c.naturaleza === 'original')
  const generados = delAmbito.filter((c) => c.naturaleza === 'generado')

  const visibles = useMemo(() => {
    const texto = q.trim().toLowerCase()
    const filtrados = delAmbito.filter(
      (c) =>
        (naturaleza === 'todos' || c.naturaleza === naturaleza) &&
        (!texto ||
          c.titulo.toLowerCase().includes(texto) ||
          c.unidad.toLowerCase().includes(texto) ||
          idLinajeDe(c).toLowerCase().includes(texto)),
    )
    return filtrados.sort((a, b) =>
      orden === 'titulo'
        ? a.titulo.localeCompare(b.titulo, 'es')
        : b.actualizado.localeCompare(a.actualizado),
    )
  }, [delAmbito, naturaleza, q, orden])

  const detalle = contenidos.find((c) => c.id === seleccionado) ?? null

  const pct = (n: number) =>
    delAmbito.length > 0 ? ((n / delAmbito.length) * 100).toFixed(1) : '0,0'

  const filtros: { id: Naturaleza; label: string; n: number }[] = [
    { id: 'todos', label: 'Todos', n: delAmbito.length },
    { id: 'original', label: 'Original docente', n: originales.length },
    { id: 'generado', label: 'Generado por el motor', n: generados.length },
  ]

  return (
    // Trabajo enfocado: a todo el ancho, como su maqueta.
    <AppLayout rotulo="Panel docente" modulos={modulosProfesor} conLateral={false}>
      <PageBar
        migas={[{ label: 'Evidencias y linaje' }, { label: 'Inventario' }]}
        acciones={
          <>
            <Button variant="outline" size="sm">
              <Download className="size-4" />
              <span className="hidden sm:inline">Exportar catálogo</span>
            </Button>
            <Button asChild size="sm">
              <Link to="/app/generar">
                <Plus className="size-4" />
                <span className="hidden sm:inline">Subir o generar</span>
              </Link>
            </Button>
          </>
        }
      />

      <div className="p-4 lg:p-6">
        <p className="text-muted-foreground flex items-center gap-2 font-mono text-xs tracking-[0.08em] uppercase">
          <BookMarked className="size-3.5" aria-hidden />
          Gestión curricular y linaje documental
        </p>
        <h1 className="mt-2 text-3xl font-medium">
          Inventario de contenidos y repositorio documental
        </h1>
        <p className="text-muted-foreground mt-1.5 max-w-3xl">
          Materiales docentes, enunciados, exámenes, rúbricas y borradores, con
          registro auditable de linaje: original frente a generado.
        </p>

        {/* Indicadores del repositorio */}
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: 'Total de materiales',
              valor: String(delAmbito.length),
              nota: 'documentos',
              tono: 'neutro' as const,
            },
            {
              label: 'Originales docentes',
              valor: String(originales.length),
              nota: `${pct(originales.length)} %`,
              tono: 'neutro' as const,
            },
            {
              label: 'Asistidos por el motor',
              valor: String(generados.length),
              nota: `${pct(generados.length)} %`,
              tono: 'primary' as const,
            },
            {
              label: 'Sincronización con el campus',
              valor: '100 %',
              nota: 'Conector activo',
              tono: 'success' as const,
            },
          ].map((item) => (
            <Card key={item.label} className="p-4">
              <dt className="text-muted-foreground flex items-center justify-between gap-2 text-xs">
                {item.label}
                <span
                  className={cn(
                    'size-1.5 shrink-0 rounded-full',
                    item.tono === 'primary'
                      ? 'bg-primary'
                      : item.tono === 'success'
                        ? 'bg-success'
                        : 'bg-border',
                  )}
                  aria-hidden
                />
              </dt>
              <dd className="mt-1.5 flex items-baseline justify-between gap-2">
                <span
                  className={cn(
                    'font-mono text-2xl',
                    item.tono === 'primary' && 'text-primary',
                  )}
                >
                  {item.valor}
                </span>
                <span className="text-muted-foreground font-mono text-xs">
                  {item.nota}
                </span>
              </dd>
            </Card>
          ))}
        </dl>

        {/* Filtros */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <div className="relative min-w-48 flex-1">
            <Search
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
              aria-hidden
            />
            <Input
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Buscar por título, palabra clave o identificador de linaje…"
              aria-label="Buscar en el repositorio"
              className="pl-9"
            />
          </div>

          <Select value={ambito} onValueChange={setAmbito}>
            <SelectTrigger aria-label="Ámbito" className="w-full sm:w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas mis asignaturas</SelectItem>
              {asignaturas.map((a) => (
                <SelectItem key={a.id} value={a.id}>
                  {a.nombre} ({a.grupo})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={orden}
            onValueChange={(valor) => setOrden(valor as Orden)}
          >
            <SelectTrigger aria-label="Orden" className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recientes">Más recientes primero</SelectItem>
              <SelectItem value="titulo">Por título</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <div
            className="bg-muted flex flex-wrap gap-1 rounded-lg p-1"
            role="group"
            aria-label="Filtrar por naturaleza"
          >
            {filtros.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={naturaleza === f.id}
                onClick={() => setNaturaleza(f.id)}
                className={cn(
                  'focus-visible:ring-ring/50 flex h-7 items-center gap-1.5 rounded-md px-3 font-medium transition-colors outline-none focus-visible:ring-[3px]',
                  naturaleza === f.id
                    ? 'bg-card text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {f.label}
                <span className="font-mono text-xs">({f.n})</span>
                {f.id === 'generado' && f.n > 0 && (
                  <span className="bg-primary size-1.5 rounded-full" aria-hidden />
                )}
              </button>
            ))}
          </div>

          <p className="text-muted-foreground ml-auto text-xs">
            Mostrando {visibles.length} de {delAmbito.length} contenidos
          </p>
        </div>

        {/* Tabla + panel de detalle */}
        <div
          className={cn(
            'mt-4 grid items-start gap-4',
            detalle && 'xl:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]',
          )}
        >
          <div className="min-w-0 overflow-x-auto rounded-xl border">
            <table className="w-full min-w-4xl border-collapse text-left">
              <caption className="sr-only">
                Materiales del repositorio, con su naturaleza y su linaje
              </caption>
              <thead className="bg-muted/60">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-medium">
                    Título del material
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium">
                    Naturaleza
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium">
                    Linaje / ID
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium">
                    Actualizado
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium">
                    Formato
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium">
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibles.map((contenido) => {
                  const motor = motorDe(contenido)
                  const activa = contenido.id === seleccionado
                  return (
                    <tr
                      key={contenido.id}
                      className={cn(
                        'hover:bg-accent/40 cursor-pointer border-t',
                        activa && 'bg-accent/60',
                      )}
                      onClick={() =>
                        setSeleccionado(activa ? null : contenido.id)
                      }
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-start gap-2.5">
                          {motor ? (
                            <Sparkles
                              className="text-primary mt-0.5 size-4 shrink-0"
                              aria-hidden
                            />
                          ) : (
                            <FileText
                              className="text-muted-foreground mt-0.5 size-4 shrink-0"
                              aria-hidden
                            />
                          )}
                          <div className="min-w-0">
                            <p className="font-medium">{contenido.titulo}</p>
                            <p className="text-muted-foreground text-xs">
                              {contenido.unidad} · {contenido.extension}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-3">
                        {motor ? (
                          <Badge className="font-mono">
                            <Sparkles className="size-3" aria-hidden />
                            {motor}
                          </Badge>
                        ) : (
                          <Badge variant="muted">Original docente</Badge>
                        )}
                      </td>

                      <td className="px-3 py-3">
                        <span className="font-mono text-xs">
                          {idLinajeDe(contenido)}
                        </span>
                        {contenido.linaje && (
                          <span className="text-muted-foreground block text-xs">
                            {contenido.linaje.length} fuentes
                          </span>
                        )}
                      </td>

                      <td className="text-muted-foreground px-3 py-3 font-mono text-xs">
                        {contenido.actualizado}
                      </td>

                      <td className="text-muted-foreground px-3 py-3 font-mono text-xs">
                        {formatoDe(contenido)}
                      </td>

                      <td className="px-3 py-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(event) => {
                            event.stopPropagation()
                            setSeleccionado(contenido.id)
                          }}
                        >
                          Detalle
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {visibles.length === 0 && (
              <p className="text-muted-foreground p-10 text-center text-sm">
                Nada coincide. Prueba con otro término o cambia el filtro.
              </p>
            )}
          </div>

          {/* Panel de detalle: los metadatos que audita una comisión */}
          {detalle && (
            <Card className="xl:sticky xl:top-32 p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>
                    <ShieldCheck className="size-3" aria-hidden />
                    {detalle.naturaleza === 'generado'
                      ? 'Motor supervisado'
                      : 'Fuente original'}
                  </Badge>
                  <span className="text-muted-foreground text-xs">
                    {
                      asignaturas.find((a) => a.id === detalle.asignaturaId)
                        ?.nombre
                    }
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Cerrar detalle"
                  onClick={() => setSeleccionado(null)}
                >
                  <X className="size-4" />
                </Button>
              </div>

              <h2 className="mt-3 text-lg font-medium">{detalle.titulo}</h2>
              <p className="text-muted-foreground mt-1 font-mono text-xs break-all">
                ID: {idLinajeDe(detalle)} · SHA: {detalle.hash}
              </p>


              {/* Clasificación regulatoria */}
              <div className="border-primary/30 bg-primary/5 mt-4 rounded-xl border p-3.5">
                <p className="text-primary flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="size-4 shrink-0" aria-hidden />
                  {detalle.naturaleza === 'generado'
                    ? 'Riesgo limitado: soporte pedagógico'
                    : 'No sujeto: material de fuente'}
                </p>
                <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                  {detalle.naturaleza === 'generado'
                    ? 'Generado como soporte bajo supervisión humana activa. Requiere validación docente antes de publicarse al alumnado.'
                    : 'Documento subido por el profesorado. No es salida de un sistema de IA.'}
                </p>
                {!detalle.autor.includes('sin ratificar') && (
                  <p className="text-success mt-2 flex items-center gap-1.5 text-xs">
                    <Check className="size-3.5 shrink-0" aria-hidden />
                    Ratificado por {detalle.autor.replace(/^Motor \+ /, '')}
                  </p>
                )}
              </div>

              {/* Metadatos del motor */}
              {detalle.naturaleza === 'generado' && (
                <>
                  <h3 className="text-muted-foreground mt-5 text-xs font-medium tracking-[0.08em] uppercase">
                    Detalles del motor y el linaje
                  </h3>
                  <dl className="mt-2.5 space-y-2 text-sm">
                    {[
                      ['Modelo base', motorDe(detalle) ?? '—'],
                      ['Anclaje', 'Estricto al corpus'],
                      ['Corpus de referencia', `${detalle.unidad} de la cátedra`],
                    ].map(([clave, valor]) => (
                      <div key={clave} className="flex justify-between gap-3">
                        <dt className="text-muted-foreground">{clave}</dt>
                        <dd className="shrink-0 text-right font-mono text-xs">
                          {valor}
                        </dd>
                      </div>
                    ))}
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted-foreground">
                        Instrucción docente
                      </dt>
                      <dd>
                        <button
                          type="button"
                          className="text-primary flex items-center gap-1 text-xs font-medium"
                        >
                          Ver instrucción
                          <ExternalLink className="size-3" aria-hidden />
                        </button>
                      </dd>
                    </div>
                  </dl>

                  <h3 className="text-muted-foreground mt-5 text-xs font-medium tracking-[0.08em] uppercase">
                    Fuentes indexadas
                  </h3>
                  <ul className="mt-2.5 space-y-2">
                    {(detalle.linaje ?? []).map((origenId) => {
                      const origen = contenidos.find((c) => c.id === origenId)
                      if (!origen) return null
                      return (
                        <li key={origenId}>
                          <Link
                            to={`/app/contenidos/${origen.id}`}
                            className="hover:bg-accent flex items-start gap-2 rounded-lg border p-2.5 text-sm transition-colors"
                          >
                            <FileText
                              className="text-muted-foreground mt-0.5 size-3.5 shrink-0"
                              aria-hidden
                            />
                            <span className="min-w-0">
                              <span className="block">{origen.titulo}</span>
                              <span className="text-muted-foreground block font-mono text-xs">
                                {idLinajeDe(origen)}
                              </span>
                            </span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </>
              )}

              <div className="mt-5 grid gap-2 border-t pt-4 sm:grid-cols-2">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/app/contenidos/${detalle.id}`}>
                    <Pencil className="size-4" />
                    Abrir material
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="size-4" />
                  Acta de trazabilidad
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
