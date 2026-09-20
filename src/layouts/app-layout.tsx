import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PanelLeft, ShieldCheck } from 'lucide-react'

import { AppHeader } from '@/components/app/app-header'
import { AppSidebar } from '@/components/app/app-sidebar'
import { DemoNotice } from '@/components/brand/demo-notice'
import { SkipLink } from '@/components/skip-link'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogDrawer,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { docente } from '@/mocks/data'
import type { NavModulo } from '@/content/app-nav'
import { notaCumplimiento } from '@/content/app-nav'
import type { Persona } from '@/mocks/types'

/** Rutas raíz de cada consola: se activan solo por coincidencia exacta. */
const RAICES = ['/app', '/app/generar', '/centro', '/alumno']

/**
 * Carcasa de las tres consolas privadas. Cuatro niveles, como muestran las
 * referencias: barra global, pestañas de módulo, secciones en la lateral y
 * contenido.
 *
 * Es una sola carcasa para las tres lentes porque, como dice el inventario,
 * sostienen una única espina de datos. Lo que cambia es la persona, el rótulo
 * y los módulos.
 */
export function AppLayout({
  persona = docente,
  rotulo,
  modulos,
  conAsignatura = true,
  conLateral = true,
  children,
}: {
  persona?: Persona
  rotulo: string
  modulos: NavModulo[]
  conAsignatura?: boolean
  /**
   * Las maquetas distinguen dos clases de pantalla, y con criterio: las de
   * navegación y resumen llevan barra lateral, y las de trabajo enfocado
   * —corrección, visor de contenido, tablas densas— van a todo el ancho.
   *
   * Cuando se oculta, las secciones siguen accesibles en el panel lateral
   * desplegable, que entonces se muestra en todos los anchos.
   */
  conLateral?: boolean
  children: React.ReactNode
}) {
  const { pathname } = useLocation()
  const [menuAbierto, setMenuAbierto] = useState(false)

  // El módulo activo es el de prefijo más largo que casa con la ruta, para que
  // /app/generar/examen active "Generador" y no "Cuaderno".
  const moduloActivo =
    [...modulos]
      .sort((a, b) => b.base.length - a.base.length)
      .find(
        (modulo) =>
          pathname === modulo.base || pathname.startsWith(`${modulo.base}/`),
      ) ?? modulos[0]

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Las pantallas privadas muestran nombres de alumnos y notas
          inventados, y el repositorio es público: se declara igual que en la
          consola pública. */}
      <SkipLink />
      <DemoNotice />
      <AppHeader
        persona={persona}
        rotulo={rotulo}
        conAsignatura={conAsignatura}
      />

      {/* Pestañas de módulo */}
      {/* Solo se fija a partir de lg: por debajo, la cabecera tiene una
          segunda fila y el desplazamiento no cuadraría. */}
      <div className="bg-card z-30 border-b lg:sticky lg:top-16">
        <div className="flex items-center gap-1 overflow-x-auto px-2">
          <Dialog open={menuAbierto} onOpenChange={setMenuAbierto}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className={cn('shrink-0', conLateral && 'lg:hidden')}
                aria-label="Abrir secciones"
              >
                <PanelLeft className="size-4" />
              </Button>
            </DialogTrigger>
            <DialogDrawer className="max-w-xs">
              <DialogTitle className="sr-only">Secciones</DialogTitle>
              <AppSidebar
                modulo={moduloActivo}
                raices={RAICES}
                className="min-h-full"
              />
            </DialogDrawer>
          </Dialog>

          {modulos.map((modulo) => {
            const activo = modulo.base === moduloActivo.base
            return (
              <Link
                key={modulo.base}
                to={modulo.base}
                aria-current={activo ? 'page' : undefined}
                className={cn(
                  'hover:text-foreground relative shrink-0 px-3 py-3 whitespace-nowrap transition-colors',
                  activo
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground',
                )}
              >
                {modulo.label}
                {activo && (
                  <span
                    className="bg-primary absolute inset-x-2 bottom-0 h-0.5 rounded-t"
                    aria-hidden
                  />
                )}
              </Link>
            )
          })}
        </div>
      </div>

      <div className="flex flex-1 items-start">
        {conLateral && (
          <AppSidebar
            modulo={moduloActivo}
            raices={RAICES}
            className="sticky top-[7.5rem] hidden h-[calc(100dvh-7.5rem)] w-64 shrink-0 overflow-y-auto border-r p-4 lg:flex"
          />
        )}

        <main id="contenido" tabIndex={-1} className="min-w-0 flex-1 outline-none">
          {children}
        </main>
      </div>

      <footer className="bg-muted/40 text-muted-foreground border-t text-xs">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="text-primary size-3.5" aria-hidden />
            AcademIA · {notaCumplimiento}
          </p>
          <nav className="ml-auto flex flex-wrap gap-x-4">
            <Link to="/legal/privacidad" className="hover:text-foreground">
              Privacidad
            </Link>
            <Link to="/legal/ai-act" className="hover:text-foreground">
              Auditoría de sesgo
            </Link>
            <Link to="/legal" className="hover:text-foreground">
              Centro legal
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
