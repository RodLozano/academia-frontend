import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  AlertTriangle,
  CalendarRange,
  Check,
  CreditCard,
  Download,
  FileSearch,
  FileText,
  Network,
  Plug,
  Receipt,
  ScrollText,
  Settings2,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Users,
  X,
} from 'lucide-react'

import { PageBar } from '@/components/app/page-bar'
import { AppLayout } from '@/layouts/app-layout'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { modulosInstitucion } from '@/content/app-nav'
import { cn } from '@/lib/utils'
import {
  alumnos,
  asignaturas,
  centro,
  direccion,
  facturacion,
} from '@/mocks/data'

/**
 * Consola de institución, rutas de v2. El inventario las difiere a propósito:
 * en v1 la institución solo necesita «ver que controla». Seis de las siete
 * son el gobierno de verdad; la séptima, facturación y contrato, es
 * administrativa y se explica en su propio comentario.
 *
 * Todas comparten un rasgo: la institución mira **en agregado**. Ninguna de
 * estas pantallas debe permitir a dirección tocar la nota de un alumno
 * concreto, porque eso rompería la primacía docente que sostiene el producto.
 */
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

const roles = ['Dirección', 'Jefatura', 'Tutor', 'Profesor', 'Alumno'] as const

/** Políticas y permisos (2.3). Qué materiales y qué motores se permiten. */
export function CentroPoliticasPage() {
  const [permisos, setPermisos] = useState<Record<string, string[]>>({
    'Subir originales': ['Profesor', 'Jefatura'],
    'Generar contenido': ['Profesor'],
    'Ratificar notas': ['Profesor'],
    'Publicar al campus': ['Profesor', 'Jefatura'],
    'Ver agregados de centro': ['Dirección', 'Jefatura'],
    'Exportar expedientes': ['Dirección'],
  })

  const alternar = (accion: string, rol: string) =>
    setPermisos((p) => ({
      ...p,
      [accion]: p[accion].includes(rol)
        ? p[accion].filter((r) => r !== rol)
        : [...p[accion], rol],
    }))

  return (
    <CentroLayout>
      <PageBar
        migas={[{ label: 'Gobierno del centro' }, { label: 'Políticas y permisos' }]}
        acciones={
          <Button size="sm">
            <Check className="size-4" />
            Guardar políticas
          </Button>
        }
      />

      <div className="p-4 lg:p-6">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium">
          <ShieldCheck className="text-muted-foreground size-6" aria-hidden />
          Políticas y permisos
        </h1>
        <p className="text-muted-foreground mt-1.5 max-w-2xl">
          Qué puede hacer cada rol y con qué materiales. Las casillas de
          ratificar notas están fijadas al profesorado por diseño: el reglamento
          europeo exige que quien firma sea quien imparte.
        </p>

        <div className="mt-6 overflow-x-auto rounded-xl border">
          <table className="w-full min-w-3xl border-collapse text-left">
            <thead className="bg-muted/60">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-medium">Acción</th>
                {roles.map((rol) => (
                  <th key={rol} scope="col" className="px-3 py-2.5 text-center font-medium">
                    {rol}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(permisos).map(([accion, permitidos]) => {
                const fijada = accion === 'Ratificar notas'
                return (
                  <tr key={accion} className="border-t">
                    <th scope="row" className="px-4 py-3 font-normal">
                      {accion}
                      {fijada && (
                        <Badge variant="human" className="ml-2">
                          Fijada
                        </Badge>
                      )}
                    </th>
                    {roles.map((rol) => (
                      <td key={rol} className="px-3 py-3 text-center">
                        <Checkbox
                          checked={permitidos.includes(rol)}
                          disabled={fijada}
                          onCheckedChange={() => alternar(accion, rol)}
                          aria-label={`${accion} para ${rol}`}
                        />
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <Card className="mt-6 p-5">
          <h2 className="font-medium">Motores permitidos</h2>
          <p className="text-muted-foreground mt-1 text-xs">
            Solo instancias desplegadas en servidores del centro. No hay
            proveedores externos disponibles.
          </p>
          <ul className="mt-4 space-y-2">
            {[
              ['Modelo local 8B', 'Generación rápida de fichas y práctica', true],
              ['Modelo local 70B', 'Rúbricas y análisis de argumentación', true],
              ['Proveedores comerciales externos', 'Bloqueado por política de centro', false],
            ].map(([nombre, nota, activo]) => (
              <li
                key={nombre as string}
                className="flex flex-wrap items-center gap-3 rounded-lg border p-3"
              >
                <div className="min-w-40 flex-1">
                  <p className="font-medium">{nombre}</p>
                  <p className="text-muted-foreground text-xs">{nota}</p>
                </div>
                <Badge variant={activo ? 'success' : 'destructive'}>
                  {activo ? 'Permitido' : 'Bloqueado'}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </CentroLayout>
  )
}

/** Analítica académica (2.4). Brechas de conocimiento en agregado. */
export function CentroAnaliticaPage() {
  const competencias = alumnos[0].dominio.map((d) => ({
    competencia: d.competencia,
    media: Math.round(
      alumnos.reduce(
        (n, a) =>
          n + (a.dominio.find((x) => x.competencia === d.competencia)?.nivel ?? 0),
        0,
      ) / alumnos.length,
    ),
  }))

  const evolucion = centro.usoMensual.map((m, i) => ({
    mes: m.mes,
    dominio: 58 + i * 3,
    participacion: 72 + i * 2,
  }))

  return (
    <CentroLayout>
      <PageBar
        migas={[{ label: 'Gobierno del centro' }, { label: 'Analítica académica' }]}
        estado={{ label: 'Solo agregados', variant: 'muted' }}
      />

      <div className="p-4 lg:p-6">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium">
          <Network className="text-muted-foreground size-6" aria-hidden />
          Analítica académica
        </h1>
        <p className="text-muted-foreground mt-1.5 max-w-2xl">
          Brechas de conocimiento y patrones de aprendizaje del centro. Sin
          nombres: dirección ve tendencias, no expedientes.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="p-5">
            <h2 className="font-medium">Dominio medio por competencia</h2>
            <p className="text-muted-foreground mt-1 text-xs">
              Calculado solo sobre calificaciones ratificadas.
            </p>
            <dl className="mt-4 space-y-4">
              {competencias.map((c) => (
                <div key={c.competencia}>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt>{c.competencia}</dt>
                    <dd className="shrink-0 font-mono text-sm">{c.media} %</dd>
                  </div>
                  <Progress
                    value={c.media}
                    className="mt-1.5"
                    indicatorClassName={
                      c.media < 60 ? 'bg-destructive' : c.media < 75 ? 'bg-warning' : 'bg-primary'
                    }
                  />
                </div>
              ))}
            </dl>
            <p className="text-muted-foreground mt-4 border-t pt-3 text-xs">
              La brecha más marcada está en aparato bibliográfico. Es la
              candidata natural a refuerzo transversal.
            </p>
          </Card>

          <Card className="p-5">
            <h2 className="font-medium">Evolución del semestre</h2>
            <p className="text-muted-foreground mt-1 text-xs">
              Dominio medio y participación, en porcentaje.
            </p>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={evolucion}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="mes" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--popover)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)',
                      fontSize: 13,
                      color: 'var(--popover-foreground)',
                    }}
                  />
                  <Line type="monotone" dataKey="dominio" name="Dominio" stroke="var(--primary)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="participacion" name="Participación" stroke="var(--muted-foreground)" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </CentroLayout>
  )
}

/** Alertas tempranas (2.5). Bandeja de riesgo para tutor y jefatura. */
export function CentroAlertasPage() {
  const enRiesgo = alumnos.filter(
    (a) => a.media === null || a.media < 6 || a.tendencia === 'baja',
  )

  const severidad = (a: (typeof alumnos)[number]) => {
    if (a.media === null) return { label: 'Sin evaluar', variant: 'destructive' as const }
    if (a.media < 5) return { label: 'Riesgo alto', variant: 'destructive' as const }
    if (a.tendencia === 'baja') return { label: 'Tendencia a la baja', variant: 'human' as const }
    return { label: 'Seguimiento', variant: 'muted' as const }
  }

  return (
    <CentroLayout>
      <PageBar
        migas={[{ label: 'Gobierno del centro' }, { label: 'Alertas tempranas' }]}
        estado={{ label: `${enRiesgo.length} abiertas`, variant: 'human' }}
      />

      <div className="p-4 lg:p-6">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium">
          <AlertTriangle className="text-human size-6" aria-hidden />
          Alertas tempranas
        </h1>
        <p className="text-muted-foreground mt-1.5 max-w-2xl">
          Riesgo académico detectado sobre calificaciones ya ratificadas. Una
          alerta es una invitación a que un tutor mire, nunca una decisión
          automática sobre el expediente.
        </p>

        <Card className="mt-6 divide-y overflow-hidden">
          {enRiesgo.map((alumno) => {
            const sev = severidad(alumno)
            return (
              <div key={alumno.id} className="flex flex-wrap items-center gap-x-4 gap-y-3 p-4">
                <Avatar className="size-9 shrink-0">
                  <AvatarFallback>{alumno.iniciales}</AvatarFallback>
                </Avatar>
                <div className="min-w-40 flex-1">
                  <p className="font-medium">{alumno.nombre}</p>
                  <p className="text-muted-foreground text-xs">
                    {alumno.entregasPendientes} entregas pendientes · media{' '}
                    {alumno.media === null ? 'sin datos' : alumno.media.toFixed(1)}
                  </p>
                </div>
                <div className="w-40 shrink-0">
                  <Badge variant={sev.variant}>{sev.label}</Badge>
                </div>
                <div className="w-8 shrink-0">
                  {alumno.tendencia === 'baja' && (
                    <TrendingDown className="text-destructive size-4" aria-label="baja" />
                  )}
                </div>
                <div className="ml-auto flex shrink-0 gap-2">
                  <Button variant="ghost" size="sm">Descartar</Button>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/app/alumnos/${alumno.id}`}>Asignar tutoría</Link>
                  </Button>
                </div>
              </div>
            )
          })}
        </Card>

        <p className="text-muted-foreground mt-4 text-xs">
          Las alertas no se comunican al alumnado de forma automática: las
          traslada su tutor.
        </p>
      </div>
    </CentroLayout>
  )
}

/** Coordinación de centro (2.6). Secuenciación entre cursos y departamentos. */
export function CentroCoordinacionPage() {
  return (
    <CentroLayout>
      <PageBar
        migas={[{ label: 'Gobierno del centro' }, { label: 'Coordinación de centro' }]}
      />

      <div className="p-4 lg:p-6">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium">
          <CalendarRange className="text-muted-foreground size-6" aria-hidden />
          Coordinación de centro
        </h1>
        <p className="text-muted-foreground mt-1.5 max-w-2xl">
          Visión curricular: qué se imparte, cuándo, y dónde se solapan o se
          dejan huecos las competencias entre asignaturas.
        </p>

        <h2 className="mt-8 text-xl font-medium">Secuenciación por asignatura</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border">
          <table className="w-full min-w-3xl border-collapse text-left">
            <thead className="bg-muted/60">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-medium">Asignatura</th>
                {['Unidad 1', 'Unidad 2', 'Unidad 3', 'Unidad 4'].map((u) => (
                  <th key={u} scope="col" className="px-3 py-2.5 font-medium">{u}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {asignaturas.filter((a) => a.activa).map((asignatura, fila) => (
                <tr key={asignatura.id} className="border-t">
                  <th scope="row" className="px-4 py-3 font-normal">
                    <span className="block font-medium">{asignatura.nombre}</span>
                    <span className="text-muted-foreground font-mono text-xs">
                      {asignatura.codigo}
                    </span>
                  </th>
                  {[0, 1, 2, 3].map((col) => {
                    const cubierta = (fila + col) % 4 !== 3
                    const solapada = fila === 1 && col === 1
                    return (
                      <td key={col} className="px-3 py-3">
                        {solapada ? (
                          <Badge variant="warning">Solape</Badge>
                        ) : cubierta ? (
                          <Badge variant="success">Cubierta</Badge>
                        ) : (
                          <Badge variant="muted">Hueco</Badge>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Card className="mt-6 p-5">
          <h2 className="font-medium">Lecturas de la matriz</h2>
          <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
            <li className="flex gap-2.5">
              <span className="bg-warning mt-1.5 size-1.5 shrink-0 rounded-full" aria-hidden />
              Un solape entre métodos historiográficos e historia contemporánea
              en la unidad 2: ambas cubren crítica de fuentes.
            </li>
            <li className="flex gap-2.5">
              <span className="bg-border mt-1.5 size-1.5 shrink-0 rounded-full" aria-hidden />
              Huecos en la unidad 4 de dos asignaturas. Conviene revisar si es
              deliberado o arrastre de calendario.
            </li>
          </ul>
        </Card>
      </div>
    </CentroLayout>
  )
}

/** Trazabilidad / auditoría (2.8). Registro de acciones y linaje. */
export function CentroAuditoriaPage() {
  const [q, setQ] = useState('')

  const registro = [
    { id: 'a-1', sello: '2025-03-14T10:15', actor: 'Dra. Elena Ramos', accion: 'Ratificó calificación', objeto: 'Ensayo crítico · A. Belmonte', hash: '4f9e881a', humano: true },
    { id: 'a-2', sello: '2025-03-14T09:42', actor: 'Motor local 70B', accion: 'Propuso calificación', objeto: 'Ensayo crítico · L. Ferrán', hash: '7b21c04d', humano: false },
    { id: 'a-3', sello: '2025-03-13T16:40', actor: 'Dra. Elena Ramos', accion: 'Modificó criterio de rúbrica', objeto: 'Rúbrica ensayo crítico v2.3', hash: 'f3a81c04', humano: true },
    { id: 'a-4', sello: '2025-03-12T11:02', actor: 'Motor local 8B', accion: 'Generó ficha de refuerzo', objeto: 'Periodización Guerra Fría', hash: '1c7d3a95', humano: false },
    { id: 'a-5', sello: '2025-03-10T08:30', actor: 'Ing. Teresa Guzmán', accion: 'Sincronizó con el campus', objeto: 'Conector LTI', hash: '0b54e2f7', humano: true },
    { id: 'a-6', sello: '2025-03-08T14:21', actor: 'Dr. Marc Alcaraz', accion: 'Exportó informe agregado', objeto: 'Analítica de centro', hash: 'd18f6350', humano: true },
  ]

  const visibles = registro.filter((r) =>
    `${r.actor} ${r.accion} ${r.objeto} ${r.hash}`
      .toLowerCase()
      .includes(q.trim().toLowerCase()),
  )

  return (
    <CentroLayout>
      <PageBar
        migas={[{ label: 'Gobierno del centro' }, { label: 'Trazabilidad' }]}
        acciones={
          <Button variant="outline" size="sm">
            <Download className="size-4" />
            <span className="hidden sm:inline">Exportar registro</span>
          </Button>
        }
      />

      <div className="p-4 lg:p-6">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium">
          <FileSearch className="text-muted-foreground size-6" aria-hidden />
          Trazabilidad y auditoría
        </h1>
        <p className="text-muted-foreground mt-1.5 max-w-2xl">
          Registro inmutable de acciones. Cada fila dice si la ejecutó una
          persona o un motor, que es la distinción que una inspección viene a
          comprobar.
        </p>

        <div className="mt-6 w-full sm:max-w-sm">
          <Input
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder="Buscar por actor, acción o hash…"
            aria-label="Buscar en el registro"
          />
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border">
          <table className="w-full min-w-4xl border-collapse text-left">
            <thead className="bg-muted/60">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-medium">Sello temporal</th>
                <th scope="col" className="px-3 py-2.5 font-medium">Origen</th>
                <th scope="col" className="px-3 py-2.5 font-medium">Actor</th>
                <th scope="col" className="px-3 py-2.5 font-medium">Acción</th>
                <th scope="col" className="px-3 py-2.5 font-medium">Objeto</th>
                <th scope="col" className="px-3 py-2.5 font-medium">Hash</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="text-muted-foreground px-4 py-3 font-mono text-xs">
                    {r.sello}
                  </td>
                  <td className="px-3 py-3">
                    <Badge variant={r.humano ? 'human' : 'default'}>
                      {r.humano ? (
                        <><Users className="size-3" aria-hidden />Persona</>
                      ) : (
                        <><Sparkles className="size-3" aria-hidden />Motor</>
                      )}
                    </Badge>
                  </td>
                  <td className="px-3 py-3">{r.actor}</td>
                  <td className="px-3 py-3">{r.accion}</td>
                  <td className="text-muted-foreground px-3 py-3">{r.objeto}</td>
                  <td className="px-3 py-3 font-mono text-xs">{r.hash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-muted-foreground mt-4 text-xs">
          El registro es de solo lectura: ni dirección ni soporte pueden
          alterarlo. Es la condición para que sirva como evidencia.
        </p>
      </div>
    </CentroLayout>
  )
}

/** Configuración del centro (2.9). Integraciones, SSO, datos y DPA. */
export function CentroConfiguracionPage() {
  const integraciones = [
    { nombre: 'Moodle', detalle: 'Conector LTI 1.3', estado: 'conectado' as const },
    { nombre: 'Canvas', detalle: 'Conector LTI 1.3', estado: 'disponible' as const },
    { nombre: 'Blackboard', detalle: 'Learn / Ultra', estado: 'disponible' as const },
    { nombre: 'Federación de identidad', detalle: 'SAML institucional', estado: 'conectado' as const },
  ]

  return (
    <CentroLayout>
      <PageBar
        migas={[{ label: 'Gobierno del centro' }, { label: 'Configuración' }]}
        acciones={
          <Button size="sm">
            <Check className="size-4" />
            Guardar
          </Button>
        }
      />

      <div className="max-w-4xl p-4 lg:p-6">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium">
          <Settings2 className="text-muted-foreground size-6" aria-hidden />
          Configuración del centro
        </h1>
        <p className="text-muted-foreground mt-1.5">
          Integraciones con el campus virtual, identidad federada y régimen de
          datos.
        </p>

        <Card className="mt-6 p-5">
          <h2 className="flex items-center gap-2 font-medium">
            <Plug className="text-muted-foreground size-4" aria-hidden />
            Integraciones
          </h2>
          <ul className="mt-4 space-y-2">
            {integraciones.map((i) => (
              <li key={i.nombre} className="flex flex-wrap items-center gap-3 rounded-lg border p-3">
                <div className="min-w-40 flex-1">
                  <p className="font-medium">{i.nombre}</p>
                  <p className="text-muted-foreground text-xs">{i.detalle}</p>
                </div>
                <Badge variant={i.estado === 'conectado' ? 'success' : 'muted'}>
                  {i.estado === 'conectado' ? (
                    <><Check className="size-3" aria-hidden />Conectado</>
                  ) : (
                    'Disponible'
                  )}
                </Badge>
                <Button variant="outline" size="sm" className="shrink-0">
                  {i.estado === 'conectado' ? 'Configurar' : 'Conectar'}
                </Button>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="mt-4 p-5">
          <h2 className="flex items-center gap-2 font-medium">
            <ScrollText className="text-muted-foreground size-4" aria-hidden />
            Régimen de datos
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="retencion">Retención de expedientes</Label>
              <Select defaultValue="5">
                <SelectTrigger id="retencion" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 años</SelectItem>
                  <SelectItem value="5">5 años (plazo legal)</SelectItem>
                  <SelectItem value="10">10 años</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dpo">Delegado de protección de datos</Label>
              <Input id="dpo" defaultValue="dpo@ejemplo.edu" className="mt-2 font-mono" />
            </div>
          </div>

          <ul className="mt-5 space-y-2.5 border-t pt-4">
            {[
              ['Inferencia exclusivamente en la Unión Europea', true],
              ['Cero reentrenamiento con material del centro', true],
              ['Exportación de expedientes a proveedores externos', false],
            ].map(([texto, activo]) => (
              <li key={texto as string} className="flex items-start gap-2.5 text-sm">
                <span
                  className={cn(
                    'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded',
                    activo ? 'bg-success/15 text-success' : 'bg-destructive/15 text-destructive',
                  )}
                >
                  {activo ? <Check className="size-3" aria-hidden /> : <X className="size-3" aria-hidden />}
                </span>
                {texto}
              </li>
            ))}
          </ul>

          <p className="text-muted-foreground mt-4 border-t pt-3 text-xs">
            Estas tres condiciones no son configurables: forman parte del
            acuerdo de encargo de tratamiento.{' '}
            <Link to="/legal/dpa" className="text-primary hover:underline">
              Ver el DPA
            </Link>
            .
          </p>
        </Card>
      </div>
    </CentroLayout>
  )
}

/**
 * Facturación y contrato (2.10). La única pantalla de esta consola que no es
 * de gobierno: el centro ve su plan, sus asientos y sus facturas.
 *
 * Es **de lectura**, y eso es la decisión de diseño, no una limitación de la
 * maqueta: emitir, reclamar y contabilizar vive en la consola interna y en
 * las herramientas de gestión. Aquí no hay un solo control que cambie el
 * contrato. Existe porque «mándame otra vez la factura» es la petición de
 * soporte que más se repite, y atenderla sola cuesta cero.
 *
 * Los asientos usados se derivan del mismo reparto por facultad que pinta
 * «Consumo y licencias»: son la misma cifra vista dos veces, y si divergieran
 * el centro no sabría a cuál creer.
 */
export function CentroFacturacionPage() {
  const asientosUsados = centro.consumoPorFacultad.reduce(
    (n, f) => n + f.asientos,
    0,
  )
  const ocupacion = Math.round(
    (asientosUsados / facturacion.asientosContratados) * 100,
  )
  const asientosLibres = facturacion.asientosContratados - asientosUsados
  const pendientes = facturacion.facturas.filter((f) => f.estado === 'pendiente')

  const euros = (n: number) =>
    n.toLocaleString('es-ES', {
      style: 'currency',
      currency: facturacion.moneda,
      maximumFractionDigits: 0,
    })

  const estadoFactura = {
    pagada: { variant: 'success' as const, label: 'Pagada' },
    pendiente: { variant: 'muted' as const, label: 'Pendiente' },
  }

  // Más recientes primero: quien entra aquí busca la última factura.
  const facturas = [...facturacion.facturas].sort((a, b) =>
    b.emitida.localeCompare(a.emitida),
  )

  return (
    <CentroLayout>
      <PageBar
        migas={[{ label: 'Gobierno del centro' }, { label: 'Facturación' }]}
        estado={{ label: 'De lectura', variant: 'muted' }}
      />

      <div className="p-4 lg:p-6">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium">
          <Receipt className="text-muted-foreground size-6" aria-hidden />
          Facturación y contrato
        </h1>
        <p className="text-muted-foreground mt-1.5 max-w-2xl">
          Su plan, los asientos contratados frente a los usados y las facturas
          del periodo. Esta pantalla muestra lo que el sistema de facturación
          ya sabe; no emite nada.
        </p>

        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          <Card className="p-5">
            <h2 className="flex items-center gap-2 font-medium">
              <FileText className="text-muted-foreground size-4" aria-hidden />
              Plan contratado
            </h2>
            <p className="text-primary mt-3 text-xl font-medium">
              {facturacion.plan}
            </p>
            <dl className="mt-3 space-y-1.5 text-sm">
              {[
                ['Periodo', facturacion.periodo],
                ['Renovación', facturacion.renovacion],
                ['Preaviso de baja', facturacion.preaviso],
                ['Precio por asiento', `${euros(facturacion.precioAsiento)} / año`],
              ].map(([label, valor]) => (
                <div key={label} className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="text-right">{valor}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card className="p-5">
            <h2 className="flex items-center gap-2 font-medium">
              <Users className="text-muted-foreground size-4" aria-hidden />
              Asientos
            </h2>
            <p className="mt-3">
              <span className="text-primary font-mono text-4xl">
                {asientosUsados}
              </span>
              <span className="text-muted-foreground font-mono text-xl">
                {' / '}
                {facturacion.asientosContratados}
              </span>
            </p>
            <Progress value={ocupacion} className="mt-3" />
            <p className="text-muted-foreground mt-3 text-sm">
              {asientosLibres} asientos libres · {ocupacion} % de ocupación.
            </p>
            <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
              Un asiento se ocupa al activar a una persona, no al invitarla.
              Ampliar el contrato se pide a administración.
            </p>
          </Card>

          <Card className="p-5">
            <h2 className="flex items-center gap-2 font-medium">
              <CreditCard className="text-muted-foreground size-4" aria-hidden />
              Estado de pago
            </h2>
            <p className="mt-3">
              <Badge variant={pendientes.length ? 'muted' : 'success'}>
                {pendientes.length === 0
                  ? 'Al corriente'
                  : pendientes.length === 1
                    ? '1 factura pendiente'
                    : `${pendientes.length} facturas pendientes`}
              </Badge>
            </p>
            <dl className="mt-3 space-y-1.5 text-sm">
              {[
                ['Importe anual', euros(facturacion.importeAnual)],
                ['Forma de pago', facturacion.formaPago],
                ['Se factura a', facturacion.facturacionA],
              ].map(([label, valor]) => (
                <div key={label}>
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd>{valor}</dd>
                </div>
              ))}
            </dl>
            <p className="text-muted-foreground mt-3 text-xs">
              Dudas de facturación:{' '}
              <span className="font-mono">{facturacion.contacto}</span>
            </p>
          </Card>
        </div>

        <h2 className="mt-8 text-xl font-medium">Facturas</h2>
        {/* `relative` no es decorativo: la cabecera de la última columna lleva
            un rótulo `sr-only`, que se posiciona en absoluto. Sin un ancestro
            posicionado se ancla al bloque inicial, no al contenedor con
            scroll, y arrastra la página entera a scroll horizontal a 400px. */}
        <div className="relative mt-3 overflow-x-auto rounded-xl border">
          <table className="w-full min-w-3xl border-collapse text-left">
            <thead className="bg-muted/60">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-medium">Número</th>
                <th scope="col" className="px-3 py-2.5 font-medium">Concepto</th>
                <th scope="col" className="px-3 py-2.5 font-medium">Emitida</th>
                <th scope="col" className="px-3 py-2.5 font-medium">Vencimiento</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">Importe</th>
                <th scope="col" className="px-3 py-2.5 font-medium">Estado</th>
                <th scope="col" className="px-3 py-2.5 font-medium">
                  <span className="sr-only">Descargar</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {facturas.map((factura) => (
                <tr key={factura.id} className="border-t">
                  <td className="px-4 py-3 font-mono text-xs">{factura.id}</td>
                  <td className="px-3 py-3">{factura.concepto}</td>
                  <td className="text-muted-foreground px-3 py-3 font-mono text-xs">
                    {factura.emitida}
                  </td>
                  <td className="text-muted-foreground px-3 py-3 font-mono text-xs">
                    {factura.vence}
                  </td>
                  <td className="px-3 py-3 text-right font-mono">
                    {euros(factura.importe)}
                  </td>
                  <td className="px-3 py-3">
                    <Badge variant={estadoFactura[factura.estado].variant}>
                      {estadoFactura[factura.estado].label}
                    </Badge>
                  </td>
                  <td className="px-3 py-3">
                    <Button variant="outline" size="sm" className="shrink-0">
                      <Download className="size-4" />
                      <span className="sr-only sm:not-sr-only">PDF</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-muted-foreground mt-4 max-w-2xl text-xs leading-relaxed">
          Aquí no se emiten facturas, no se reclaman impagos y no se cambia el
          contrato: eso lo hace administración con sus propias herramientas. Lo
          que el centro necesita del producto es poder consultarlo y
          descargarlo sin abrir un ticket.
        </p>
      </div>
    </CentroLayout>
  )
}
