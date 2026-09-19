import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Share2, Sparkles, User } from 'lucide-react'

import { PageBar } from '@/components/app/page-bar'
import { AppLayout } from '@/layouts/app-layout'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { modulosProfesor } from '@/content/app-nav'
import { contenidos, docente, usuariosCentro } from '@/mocks/data'

/** Ajustes del profesor (1.15). Perfil, preferencias y avisos. */
export function AjustesPage() {
  const [prefs, setPrefs] = useState({
    avisoDiscrepancia: true,
    avisoPlazoActas: true,
    resumenSemanal: false,
    sugerirRefuerzo: true,
  })

  const alternar = (clave: keyof typeof prefs) =>
    setPrefs((p) => ({ ...p, [clave]: !p[clave] }))

  const opciones: { clave: keyof typeof prefs; label: string; ayuda: string }[] =
    [
      {
        clave: 'avisoDiscrepancia',
        label: 'Avisarme de discrepancias del motor',
        ayuda:
          'Cuando una propuesta se aparte notablemente de tu criterio histórico.',
      },
      {
        clave: 'avisoPlazoActas',
        label: 'Avisarme de plazos de actas',
        ayuda: 'Cuatro días antes del cierre de secretaría.',
      },
      {
        clave: 'resumenSemanal',
        label: 'Resumen semanal por correo',
        ayuda: 'Estado de tus colas de evaluación cada lunes.',
      },
      {
        clave: 'sugerirRefuerzo',
        label: 'Sugerir refuerzo automáticamente',
        ayuda:
          'El motor propone fichas cuando una competencia del grupo baja del 70 %.',
      },
    ]

  return (
    <AppLayout rotulo="Panel docente" modulos={modulosProfesor}>
      <PageBar migas={[{ label: 'Configuración de materia' }, { label: 'Ajustes' }]} />

      <div className="max-w-3xl p-4 lg:p-6">
        <h1 className="text-3xl font-medium">Ajustes</h1>
        <p className="text-muted-foreground mt-1.5">
          Tu perfil, tus preferencias de evaluación y qué avisos quieres recibir.
        </p>

        <Card className="mt-6 p-5">
          <h2 className="flex items-center gap-2 font-medium">
            <User className="text-muted-foreground size-4" aria-hidden />
            Perfil
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <Avatar className="size-14">
              <AvatarFallback className="text-base">
                {docente.iniciales}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" defaultValue={docente.nombre} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="depto">Departamento</Label>
                <Input id="depto" defaultValue={docente.adscripcion} className="mt-2" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="mt-4 p-5">
          <h2 className="flex items-center gap-2 font-medium">
            <Sparkles className="text-primary size-4" aria-hidden />
            Asistencia del motor
          </h2>
          <p className="text-muted-foreground mt-1 text-xs">
            El motor nunca cierra una nota: estas opciones solo deciden cuánto
            te propone.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="detalle">Detalle de la retroalimentación</Label>
              <Select defaultValue="granular">
                <SelectTrigger id="detalle" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breve">Breve</SelectItem>
                  <SelectItem value="granular">Granular por criterio</SelectItem>
                  <SelectItem value="extenso">Extensa con ejemplos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="umbral">Umbral de aviso por discrepancia</Label>
              <Select defaultValue="1">
                <SelectTrigger id="umbral" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">0,5 puntos</SelectItem>
                  <SelectItem value="1">1 punto</SelectItem>
                  <SelectItem value="2">2 puntos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="mt-4 p-5">
          <h2 className="flex items-center gap-2 font-medium">
            <Bell className="text-muted-foreground size-4" aria-hidden />
            Avisos
          </h2>
          <ul className="mt-4 space-y-3">
            {opciones.map((opcion) => (
              <li key={opcion.clave} className="flex gap-3">
                <Checkbox
                  id={opcion.clave}
                  checked={prefs[opcion.clave]}
                  onCheckedChange={() => alternar(opcion.clave)}
                  className="mt-0.5"
                />
                <div>
                  <Label htmlFor={opcion.clave} className="font-normal">
                    {opcion.label}
                  </Label>
                  <p className="text-muted-foreground text-xs">{opcion.ayuda}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost">Descartar</Button>
          <Button>Guardar cambios</Button>
        </div>
        <p className="text-muted-foreground mt-2 text-right text-xs">
          No hay backend: guardar no persiste nada.
        </p>
      </div>
    </AppLayout>
  )
}

/** Coordinación de departamento (1.14), en versión ligera como pide el inventario. */
export function CoordinacionPage() {
  const compartibles = contenidos.filter((c) => c.naturaleza === 'generado')
  const companeros = usuariosCentro.filter((u) => u.rol === 'Profesor')

  return (
    <AppLayout rotulo="Panel docente" modulos={modulosProfesor}>
      <PageBar
        migas={[{ label: 'Evidencias y linaje' }, { label: 'Coordinación' }]}
        estado={{ label: 'Versión ligera', variant: 'muted' }}
      />

      <div className="p-4 lg:p-6">
        <h1 className="flex items-center gap-2.5 text-3xl font-medium">
          <Share2 className="text-muted-foreground size-6" aria-hidden />
          Coordinación de departamento
        </h1>
        <p className="text-muted-foreground mt-1.5 max-w-2xl">
          Comparte rúbricas y secuencias con otros docentes. Lo que compartes es
          el generado con su linaje, para que quien lo reciba pueda ver de qué
          fuentes salió.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
          <div>
            <h2 className="text-xl font-medium">Mis generados compartibles</h2>
            <Card className="mt-3 divide-y overflow-hidden">
              {compartibles.map((contenido) => (
                <div
                  key={contenido.id}
                  className="flex flex-wrap items-center gap-3 p-4"
                >
                  <Sparkles className="text-primary size-4 shrink-0" aria-hidden />
                  <div className="min-w-40 flex-1">
                    <Link
                      to={`/app/contenidos/${contenido.id}`}
                      className="font-medium hover:underline"
                    >
                      {contenido.titulo}
                    </Link>
                    <p className="text-muted-foreground text-xs">
                      {contenido.unidad} · v{contenido.version} ·{' '}
                      {contenido.linaje?.length ?? 0} originales de origen
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0">
                    Compartir
                  </Button>
                </div>
              ))}
            </Card>
          </div>

          <aside>
            <h2 className="text-xl font-medium">Departamento</h2>
            <Card className="mt-3 divide-y overflow-hidden">
              {companeros.map((persona) => (
                <div key={persona.id} className="flex items-center gap-3 p-3.5">
                  <Avatar className="size-8 shrink-0">
                    <AvatarFallback>
                      {persona.nombre
                        .split(' ')
                        .slice(1, 3)
                        .map((p) => p[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{persona.nombre}</p>
                    <p className="text-muted-foreground truncate text-xs">
                      {persona.facultad}
                    </p>
                  </div>
                  {persona.estado !== 'activo' && (
                    <Badge variant="muted" className="shrink-0">
                      {persona.estado}
                    </Badge>
                  )}
                </div>
              ))}
            </Card>

            <div className="bg-muted/50 mt-4 rounded-xl border p-4">
              <p className="text-muted-foreground text-xs leading-relaxed">
                La secuenciación entre cursos y la visión curricular de centro
                son de la consola de institución, y quedan para v2.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  )
}
