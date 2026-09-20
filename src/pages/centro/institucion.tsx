import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Gauge, Search, ShieldCheck, UserPlus, Users } from 'lucide-react'

import { PageBar } from '@/components/app/page-bar'
import { AppLayout } from '@/layouts/app-layout'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { modulosInstitucion } from '@/content/app-nav'
import { cn } from '@/lib/utils'
import { centro, direccion, facturacion, usuariosCentro } from '@/mocks/data'

/** Carcasa común de la consola de institución: sin selector de asignatura. */
function CentroLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout
      rotulo="Gobierno del centro"
      modulos={modulosInstitucion}
      persona={direccion}
      conAsignatura={false}
    >
      {children}
    </AppLayout>
  )
}

/**
 * Dashboard de centro (2.1), en versión mínima como pide el inventario.
 *
 * La institución ve **en agregado** lo que hacen los profesores. El indicador
 * que de verdad le importa no es cuánto se usa el motor, sino con qué
 * frecuencia un docente se aparta de él: esa es la prueba de que la
 * supervisión humana es real y no un sello.
 */
export function CentroDashboardPage() {
  const modificacion = Math.round(centro.tasaModificacionHumana * 100)

  return (
    <CentroLayout>
      <PageBar
        migas={[{ label: 'Gobierno del centro' }, { label: 'Dashboard' }]}
        estado={{ label: 'Versión mínima', variant: 'muted' }}
      />

      <div className="p-4 lg:p-6">
        <h1 className="text-3xl font-medium">Dashboard de centro</h1>
        <p className="text-muted-foreground mt-1.5">
          Actividad agregada de {centro.docentesActivos} docentes en{' '}
          {centro.catedrasActivas} cátedras.
        </p>

        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Docentes activos', String(centro.docentesActivos), 'En el último mes'],
            ['Cátedras con instancia', String(centro.catedrasActivas), 'Desplegadas'],
            ['Alumnos alcanzados', centro.alumnosAlcanzados.toLocaleString('es-ES'), 'Con acceso'],
            ['Notas ratificadas', centro.notasRatificadas.toLocaleString('es-ES'), 'Con firma docente'],
          ].map(([label, valor, nota]) => (
            <Card key={label} className="p-4">
              <dt className="text-muted-foreground text-xs">{label}</dt>
              <dd>
                <span className="text-primary mt-1.5 block font-mono text-2xl">
                  {valor}
                </span>
                <span className="text-muted-foreground text-xs">{nota}</span>
              </dd>
            </Card>
          ))}
        </dl>

        <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <Card className="p-5">
            <h2 className="font-medium">Uso mensual</h2>
            <p className="text-muted-foreground mt-1 text-xs">
              Generaciones frente a correcciones asistidas.
            </p>
            <ul className="text-muted-foreground mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs">
              {[
                ['Generaciones', 'bg-chart-1'],
                ['Correcciones', 'bg-chart-2'],
              ].map(([etiqueta, color]) => (
                <li key={etiqueta} className="flex items-center gap-1.5">
                  <span
                    className={cn('size-2 shrink-0 rounded-full', color)}
                    aria-hidden
                  />
                  {etiqueta}
                </li>
              ))}
            </ul>
            <div className="mt-3 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={centro.usoMensual} barGap={2}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="mes"
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--popover)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)',
                      fontSize: 13,
                      color: 'var(--popover-foreground)',
                    }}
                  />
                  <Bar
                    dataKey="generaciones"
                    name="Generaciones"
                    fill="var(--chart-1)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="correcciones"
                    name="Correcciones"
                    fill="var(--chart-2)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* El indicador de gobernanza que de verdad importa */}
          <Card className="p-5">
            <h2 className="flex items-center gap-2 font-medium">
              <ShieldCheck className="text-human size-4" aria-hidden />
              Supervisión humana efectiva
            </h2>
            <p className="text-muted-foreground mt-1.5 text-prose">
              Proporción de propuestas del motor que un docente modificó antes
              de firmar.
            </p>
            <p className="mt-4">
              <span className="text-human font-mono text-4xl">
                {modificacion} %
              </span>
            </p>
            <Progress
              value={modificacion}
              className="mt-3"
              indicatorClassName="bg-human"
            />
            <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
              Una cifra cercana a cero no sería una buena noticia: significaría
              que el profesorado está ratificando sin revisar, que es
              exactamente el riesgo que el reglamento europeo obliga a evitar.
            </p>
          </Card>
        </div>
      </div>
    </CentroLayout>
  )
}

/** Usuarios y roles (2.2). Alta, baja y asignación de roles. */
export function CentroUsuariosPage() {
  const [q, setQ] = useState('')

  const visibles = usuariosCentro.filter((u) =>
    `${u.nombre} ${u.correo} ${u.rol} ${u.facultad}`
      .toLowerCase()
      .includes(q.trim().toLowerCase()),
  )

  const estadoBadge = (estado: (typeof usuariosCentro)[number]['estado']) =>
    estado === 'activo'
      ? ('success' as const)
      : estado === 'invitado'
        ? ('muted' as const)
        : ('destructive' as const)

  return (
    <CentroLayout>
      <PageBar
        migas={[{ label: 'Gobierno del centro' }, { label: 'Usuarios y roles' }]}
        acciones={
          <Button size="sm">
            <UserPlus className="size-4" />
            <span className="hidden sm:inline">Invitar usuario</span>
          </Button>
        }
      />

      <div className="p-4 lg:p-6">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium">
          <Users className="text-muted-foreground size-6" aria-hidden />
          Usuarios y roles
        </h1>
        <p className="text-muted-foreground mt-1.5">
          {usuariosCentro.length} personas con acceso a la instancia del centro.
        </p>

        <div className="relative mt-6 w-full sm:max-w-sm">
          <Search
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
            aria-hidden
          />
          <Input
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder="Buscar por nombre, rol o facultad…"
            aria-label="Buscar usuarios"
            className="pl-9"
          />
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border">
          <table className="w-full min-w-3xl border-collapse text-left">
            <thead className="bg-muted/60">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-medium">Persona</th>
                <th scope="col" className="px-3 py-2.5 font-medium">Rol</th>
                <th scope="col" className="px-3 py-2.5 font-medium">Facultad</th>
                <th scope="col" className="px-3 py-2.5 font-medium">Estado</th>
                <th scope="col" className="px-3 py-2.5 font-medium">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-accent/40 border-t">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-8 shrink-0">
                        <AvatarFallback>
                          {usuario.nombre
                            .split(' ')
                            .slice(1, 3)
                            .map((p) => p[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-medium">{usuario.nombre}</p>
                        <p className="text-muted-foreground font-mono text-xs">
                          {usuario.correo}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">{usuario.rol}</td>
                  <td className="text-muted-foreground px-3 py-3">
                    {usuario.facultad}
                  </td>
                  <td className="px-3 py-3">
                    <Badge variant={estadoBadge(usuario.estado)}>
                      {usuario.estado}
                    </Badge>
                  </td>
                  <td className="px-3 py-3">
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CentroLayout>
  )
}

/** Consumo y licencias (2.7), uso interno. */
export function CentroConsumoPage() {
  const totalGeneraciones = centro.consumoPorFacultad.reduce(
    (n, f) => n + f.generaciones,
    0,
  )
  const totalAsientos = centro.consumoPorFacultad.reduce(
    (n, f) => n + f.asientos,
    0,
  )

  return (
    <CentroLayout>
      <PageBar
        migas={[{ label: 'Gobierno del centro' }, { label: 'Consumo' }]}
        estado={{ label: 'Uso interno', variant: 'muted' }}
      />

      <div className="p-4 lg:p-6">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium">
          <Gauge className="text-muted-foreground size-6" aria-hidden />
          Consumo y licencias
        </h1>
        <p className="text-muted-foreground mt-1.5">
          Uso del motor y reparto de asientos por facultad.
        </p>

        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ['Generaciones del periodo', totalGeneraciones.toLocaleString('es-ES')],
            // El denominador sale del contrato (2.10), no de una constante:
            // las dos pantallas tienen que decir lo mismo.
            ['Asientos asignados', `${totalAsientos} / ${facturacion.asientosContratados}`],
            ['Inferencia en la UE', '100 %'],
          ].map(([label, valor]) => (
            <Card key={label} className="p-4">
              <dt className="text-muted-foreground text-xs">{label}</dt>
              <dd className="text-primary mt-1.5 font-mono text-2xl">{valor}</dd>
            </Card>
          ))}
        </dl>

        <h2 className="mt-10 text-xl font-medium">Reparto por facultad</h2>
        <Card className="mt-3 divide-y overflow-hidden">
          {centro.consumoPorFacultad.map((facultad) => {
            const pct = Math.round(
              (facultad.generaciones / totalGeneraciones) * 100,
            )
            return (
              <div key={facultad.facultad} className="p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="font-medium">{facultad.facultad}</p>
                  <p className="text-muted-foreground shrink-0 text-xs">
                    <span className="text-foreground font-mono">
                      {facultad.generaciones.toLocaleString('es-ES')}
                    </span>{' '}
                    generaciones · {facultad.asientos} asientos
                  </p>
                </div>
                <Progress value={pct} className="mt-2" />
              </div>
            )
          })}
        </Card>

        <p className="text-muted-foreground mt-4 text-xs">
          Los costes de inferencia no se muestran: dependen del contrato del
          centro y no hay backend que los facilite.
        </p>
      </div>
    </CentroLayout>
  )
}
