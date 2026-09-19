import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  BookOpen,
  Copy,
  Download,
  ExternalLink,
  FileText,
  GitBranch,
  Link2,
  Pencil,
  ShieldCheck,
  Sparkles,
  UserPen,
} from 'lucide-react'

import { RecursoNoEncontrado } from '@/components/app/recurso-no-encontrado'
import { AppLayout } from '@/layouts/app-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { modulosProfesor } from '@/content/app-nav'
import { cn } from '@/lib/utils'
import { contenidos, rubrica } from '@/mocks/data'

/**
 * Contenido y linaje (1.5).
 *
 * Lo que hace auditable a esta pantalla no es mostrar el material, es mostrar
 * **dónde intervino una persona**. Cada criterio declara su procedencia, y el
 * que un docente modificó lleva el registro de qué cambió frente a lo que
 * propuso el motor, atado a la versión del linaje en que lo cambió. Eso es lo
 * que exige la explicabilidad del reglamento europeo.
 *
 * Y cada fuente declara su **ponderación en la generación**: cuánto pesó en lo
 * que salió. Sin ese dato, «tiene linaje» no significa gran cosa.
 */

/** Procedencia de cada criterio. Datos de maqueta. */
const linajeCriterios: Record<
  string,
  | { tipo: 'motor'; nota: string }
  | { tipo: 'revisado'; nota: string }
  | { tipo: 'estandar'; nota: string }
  | {
      tipo: 'humano'
      autor: string
      resumen: string
      version: string
      /** Qué pedía el motor y qué exigió la persona. */
      antes: string
      despues: string
    }
> = {
  'r-1': { tipo: 'motor', nota: 'Inferencia del motor, anclaje estricto' },
  'r-2': {
    tipo: 'humano',
    autor: 'Dra. Elena Ramos',
    resumen: 'Mayor exigencia de fuentes primarias',
    version: 'v2.3',
    antes:
      'La propuesta del motor solo exigía fuentes secundarias anglófonas.',
    despues:
      'La docente añadió como requisito indispensable la inclusión de al menos dos fuentes primarias de archivos anticoloniales o manifiestos originales para optar a la franja de notable o excelente.',
  },
  'r-3': { tipo: 'revisado', nota: 'Propuesta revisada sin objeciones' },
  'r-4': { tipo: 'estandar', nota: 'Estándar de facultad' },
}

/** Cuánto pesó cada fuente en la generación. Datos de maqueta. */
const ponderacionFuentes: Record<string, { pct: number; concepto: string; clase: string }> = {
  'c-o1': { pct: 45, concepto: 'de competencias', clase: 'Original docente' },
  'c-o2': { pct: 32, concepto: 'de contexto textual', clase: 'Fuente primaria' },
  'c-o3': { pct: 23, concepto: 'de contexto textual', clase: 'Fuente primaria' },
  'c-o4': { pct: 18, concepto: 'de contexto textual', clase: 'Fuente primaria' },
  'c-o5': { pct: 28, concepto: 'de competencias', clase: 'Original docente' },
}

const franjas = [
  { nivel: 'Excelente', rango: '10 – 9,0', tono: 'success' as const },
  { nivel: 'Notable', rango: '8,9 – 7,0', tono: 'primary' as const },
  { nivel: 'Aprobado', rango: '6,9 – 5,0', tono: 'warning' as const },
  { nivel: 'Insuficiente', rango: '< 5,0', tono: 'destructive' as const },
]

export function ContenidoDetallePage() {
  const { id } = useParams()
  const contenido = contenidos.find((c) => c.id === id)

  const sinRatificar = contenido?.autor.includes('sin ratificar') ?? false

  // Los hooks van antes de cualquier return: React exige que se llamen
  // siempre y en el mismo orden en cada renderizado.
  const [vista, setVista] = useState<'documento' | 'diff'>('documento')
  const [ratificado, setRatificado] = useState(!sinRatificar)

  if (!contenido) {
    return (
      <AppLayout rotulo="Panel docente" modulos={modulosProfesor} conLateral={false}>
        <RecursoNoEncontrado
          que="el contenido"
          id={id}
          volverA="/app/contenidos"
          volverLabel="Ver el inventario"
          migas={[{ label: 'Inventario', to: '/app/contenidos' }, { label: 'No encontrado' }]}
        />
      </AppLayout>
    )
  }

  const esGenerado = contenido.naturaleza === 'generado'

  const origenes = (contenido.linaje ?? [])
    .map((origenId) => contenidos.find((c) => c.id === origenId))
    .filter((c): c is (typeof contenidos)[number] => !!c)

  const derivados = contenidos.filter((c) => c.linaje?.includes(contenido.id))

  /** Criterios en los que una persona se apartó del motor. */
  const intervenidos = rubrica.filter(
    (c) => linajeCriterios[c.id]?.tipo === 'humano',
  )
  const criteriosVisibles = vista === 'diff' ? intervenidos : rubrica


  return (
    // Trabajo enfocado: a todo el ancho, como su maqueta.
    <AppLayout rotulo="Panel docente" modulos={modulosProfesor} conLateral={false}>
      {/* Migas con el sello de auditoría a la derecha */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b px-4 py-2.5">
        <Link
          to="/app/contenidos"
          className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          Inventario de contenidos
        </Link>
        <span className="text-muted-foreground text-xs" aria-hidden>
          /
        </span>
        <span className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">
          {contenido.hash}
        </span>
        <p className="text-muted-foreground ml-auto flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs">
          <span>SHA256: {contenido.hash}</span>
          <span className="flex items-center gap-1.5">
            <span className="bg-success size-1.5 rounded-full" aria-hidden />
            Auditoría: conforme
          </span>
        </p>
      </div>

      <div className="p-4 lg:p-6">
        {/* Cabecera */}
        <Card className="p-5 lg:p-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="muted">{contenido.unidad}</Badge>
            {esGenerado && (
              <Badge>
                <Sparkles className="size-3" aria-hidden />
                Asistido por el motor
              </Badge>
            )}
            <Badge variant={ratificado ? 'success' : 'human'}>
              Versión {contenido.version} ·{' '}
              {ratificado ? 'ratificada' : 'sin ratificar'}
            </Badge>
            <Badge variant="muted">
              <ShieldCheck className="size-3" aria-hidden />
              Explicabilidad alta
            </Badge>
          </div>

          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 max-w-2xl">
              <h1 className="text-2xl font-medium">{contenido.titulo}</h1>
              <dl className="text-muted-foreground mt-3 space-y-1 text-xs">
                <div className="flex gap-1.5">
                  <dt>Última ratificación:</dt>
                  <dd>
                    {ratificado
                      ? `${contenido.actualizado} por ${contenido.autor.replace(/^Motor \+ ratificación de /, '')}`
                      : 'sin ratificar'}
                  </dd>
                </div>
                <div className="flex gap-1.5">
                  <dt>Fuentes cotejadas:</dt>
                  <dd>{origenes.length}</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt>Identificador:</dt>
                  <dd className="font-mono">
                    urn:academia:{contenido.id}:v{contenido.version}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Download className="size-4" />
                Acta de linaje
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="size-4" />
                Duplicar
              </Button>
              <Button size="sm">
                <Pencil className="size-4" />
                Modificar criterios
              </Button>
              {/* Publicar al campus es irreversible: lo hace una persona. */}
              {ratificado ? (
                <Badge variant="success" className="self-center">
                  Publicada en el campus
                </Badge>
              ) : (
                <Button
                  variant="human"
                  size="sm"
                  onClick={() => setRatificado(true)}
                >
                  <ShieldCheck className="size-4" />
                  Ratificar y publicar
                </Button>
              )}
            </div>
          </div>
        </Card>

        <div className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          {/* Documento */}
          <div className="min-w-0">
            {/* Barra de vista */}
            <div className="flex flex-wrap items-center gap-2">
              <Select defaultValue={String(contenido.version)}>
                <SelectTrigger aria-label="Versión" className="w-full sm:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: contenido.version }, (_, i) => {
                    const v = contenido.version - i
                    return (
                      <SelectItem key={v} value={String(v)}>
                        v{v}
                        {v === contenido.version
                          ? ' (actual · ratificada)'
                          : ' (anterior)'}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>

              <Tabs
                value={vista}
                onValueChange={(valor) => setVista(valor as typeof vista)}
              >
                <TabsList>
                  <TabsTrigger value="documento">
                    <FileText />
                    Documento
                  </TabsTrigger>
                  <TabsTrigger value="diff">
                    <GitBranch />
                    Motor frente a docente
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <ul className="text-muted-foreground ml-auto flex items-center gap-3 text-xs">
                <li className="flex items-center gap-1.5">
                  <span className="bg-primary size-2 rounded-full" aria-hidden />
                  Propuesta del motor
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="bg-human size-2 rounded-full" aria-hidden />
                  Ajuste humano
                </li>
              </ul>
            </div>

            {/* Ficha de competencias */}
            <div className="bg-muted/50 mt-4 rounded-xl border p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-muted-foreground text-xs font-medium tracking-[0.08em] uppercase">
                  Ficha de competencias y validación
                </h2>
                <span className="text-muted-foreground font-mono text-xs">
                  COMP-{contenido.hash.slice(0, 4).toUpperCase()}
                </span>
              </div>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Esta matriz se aplica al ensayo monográfico obligatorio del
                módulo. Evalúa la capacidad crítica del estudiante para
                contraponer los discursos de los actores implicados con los
                archivos diplomáticos de las potencias metropolitanas.
              </p>
              <p className="text-primary mt-2.5 flex items-center gap-1.5 text-xs">
                <Sparkles className="size-3.5 shrink-0" aria-hidden />
                Propuesta inicial generada a partir de los descriptores
                oficiales de la memoria de verificación del grado.
              </p>
            </div>

            {/* Matriz de criterios */}
            <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-xl font-medium">
                Matriz de criterios y niveles de desempeño
              </h2>
              <Badge variant="muted">{rubrica.length} criterios</Badge>
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              Ponderación total acumulada: 100 % · escala adaptada al baremo
              0–10.
            </p>

            {vista === 'diff' && (
              <p className="border-human/30 bg-human/5 text-muted-foreground mt-4 rounded-xl border p-3.5 text-sm">
                Comparación: se muestran solo los criterios en los que una
                persona se apartó de la propuesta del motor.{' '}
                {intervenidos.length} de {rubrica.length}.
              </p>
            )}

            <ol className="mt-4 space-y-4">
              {criteriosVisibles.map((criterio) => {
                const i = rubrica.indexOf(criterio)
                const linaje = linajeCriterios[criterio.id]
                const intervenido = linaje?.tipo === 'humano'

                return (
                  <li
                    key={criterio.id}
                    className={cn(
                      'rounded-r-xl border-l-2 pl-4',
                      intervenido ? 'border-l-human' : 'border-l-primary',
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium">
                        {i + 1}. {criterio.criterio}
                      </h3>
                      <Badge variant="muted">
                        Ponderación: {criterio.peso} %
                      </Badge>
                      {linaje && (
                        <span
                          className={cn(
                            'ml-auto flex items-center gap-1.5 text-xs',
                            intervenido ? 'text-human' : 'text-primary',
                          )}
                        >
                          {intervenido ? (
                            <UserPen className="size-3.5" aria-hidden />
                          ) : (
                            <Link2 className="size-3.5" aria-hidden />
                          )}
                          {intervenido
                            ? `Modificado por ${linaje.autor}`
                            : linaje.nota}
                        </span>
                      )}
                    </div>

                    {/* El registro de la intervención humana */}
                    {intervenido && (
                      <div className="border-human/30 bg-human/5 mt-3 rounded-xl border p-3.5">
                        <p className="text-human flex items-center gap-1.5 font-medium">
                          <UserPen className="size-4 shrink-0" aria-hidden />
                          Intervención humana registrada en el linaje (
                          {linaje.version})
                        </p>
                        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                          {linaje.antes}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed">
                          <span className="bg-warning/20 rounded px-1">
                            {linaje.despues}
                          </span>
                        </p>
                      </div>
                    )}

                    <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                      {criterio.niveles.map((nivel, n) => {
                        const franja = franjas[n] ?? franjas[3]
                        return (
                          <div
                            key={nivel.nivel}
                            className="bg-muted/40 rounded-lg border p-3"
                          >
                            <div className="flex items-baseline justify-between gap-2">
                              <p className="font-medium">{franja.nivel}</p>
                              <span
                                className={cn(
                                  'shrink-0 font-mono text-xs',
                                  franja.tono === 'success' && 'text-success',
                                  franja.tono === 'primary' && 'text-primary',
                                  franja.tono === 'warning' &&
                                    'text-warning-foreground',
                                  franja.tono === 'destructive' &&
                                    'text-destructive',
                                )}
                              >
                                {franja.rango}
                              </span>
                            </div>
                            <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                              {nivel.descriptor}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </li>
                )
              })}
            </ol>

            {/* Sello */}
            <div className="text-muted-foreground mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border p-4 font-mono text-xs">
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="text-primary size-3.5" aria-hidden />
                Sello de verificación docente: RAMOS-E-09418-UNIV
              </p>
              <p className="ml-auto">
                Registro curricular: #{contenido.hash.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Corpus de origen */}
          <aside className="space-y-4">

            {esGenerado ? (
              <>
                <Card className="p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-medium">
                      Fuentes de origen ({origenes.length})
                    </h2>
                    <Badge variant="success">Indexación verificada</Badge>
                  </div>
                  <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
                    Documentos suministrados al contexto del motor para guiar
                    las competencias formativas y evitar invenciones.
                  </p>
                </Card>

                {origenes.map((origen) => {
                  const peso = ponderacionFuentes[origen.id] ?? {
                    pct: 20,
                    concepto: 'de contexto textual',
                    clase: 'Original docente',
                  }
                  return (
                    <Card key={origen.id} className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex min-w-0 gap-2.5">
                          <BookOpen
                            className="text-muted-foreground mt-0.5 size-4 shrink-0"
                            aria-hidden
                          />
                          <div className="min-w-0">
                            <p className="font-medium">{origen.titulo}</p>
                            <p className="text-muted-foreground text-xs">
                              {origen.unidad} · {origen.extension}
                            </p>
                          </div>
                        </div>
                        <Badge variant="muted" className="shrink-0">
                          {peso.clase}
                        </Badge>
                      </div>

                      {/* Cuánto pesó esta fuente en lo que salió */}
                      <div className="bg-muted/50 mt-3 rounded-lg border p-3">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="text-muted-foreground text-xs">
                            Ponderación en la generación
                          </p>
                          <p className="shrink-0 font-mono text-xs">
                            {peso.pct} % {peso.concepto}
                          </p>
                        </div>
                        <Progress value={peso.pct} className="mt-2" />
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <span className="text-muted-foreground font-mono text-xs">
                          hash: {origen.hash}
                        </span>
                        <Link
                          to={`/app/contenidos/${origen.id}`}
                          className="text-primary flex shrink-0 items-center gap-1 text-xs font-medium"
                        >
                          Ver original
                          <ExternalLink className="size-3" aria-hidden />
                        </Link>
                      </div>
                    </Card>
                  )
                })}
              </>
            ) : (
              <Card className="p-4">
                <h2 className="flex items-center gap-2 font-medium">
                  <FileText className="text-muted-foreground size-4" aria-hidden />
                  Es fuente original
                </h2>
                <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                  Lo subió una persona. No deriva de nada: es el punto de
                  partida del linaje.
                </p>
                {derivados.length > 0 && (
                  <>
                    <h3 className="mt-4 border-t pt-3 font-medium">
                      De aquí salieron {derivados.length}
                    </h3>
                    <ul className="mt-2 space-y-2">
                      {derivados.map((derivado) => (
                        <li key={derivado.id}>
                          <Link
                            to={`/app/contenidos/${derivado.id}`}
                            className="hover:bg-accent flex items-center gap-2 rounded-lg border p-2.5 text-sm transition-colors"
                          >
                            <Sparkles
                              className="text-primary size-3.5 shrink-0"
                              aria-hidden
                            />
                            <span className="min-w-0 flex-1 truncate">
                              {derivado.titulo}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </Card>
            )}

            <Card className="p-4">
              <h2 className="flex items-center gap-2 font-medium">
                <ShieldCheck className="text-primary size-4" aria-hidden />
                Responsabilidad pedagógica
              </h2>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                El uso de este material cuenta con la aprobación del
                vicedecanato de calidad docente. Cualquier reclamación sobre
                este baremo se dirige a la comisión de evaluación del centro.
              </p>
            </Card>
          </aside>
        </div>
      </div>
    </AppLayout>
  )
}
