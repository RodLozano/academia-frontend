import { Link } from 'react-router-dom'
import {
  Bell,
  Check,
  ChevronsUpDown,
  CircleHelp,
  Cloud,
  GraduationCap,
  LogOut,
  Settings,
} from 'lucide-react'

import { CorpusSearch } from '@/components/app/corpus-search'
import { Logo } from '@/components/brand/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSubject } from '@/lib/subject-context'
import { cn } from '@/lib/utils'
import type { Persona } from '@/mocks/types'

function SubjectPicker() {
  const { asignatura, asignaturas, setAsignaturaId } = useSubject()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="hover:bg-accent focus-visible:ring-ring/50 flex max-w-64 items-center gap-2.5 rounded-lg border px-3 py-1.5 text-left transition-colors outline-none focus-visible:ring-[3px]"
        >
          <GraduationCap className="text-primary size-4 shrink-0" aria-hidden />
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate font-medium">
              {asignatura.nombre}
            </span>
            <span className="text-muted-foreground block truncate text-xs">
              {asignatura.grupo} · {asignatura.curso}
            </span>
          </span>
          <ChevronsUpDown
            className="text-muted-foreground size-3.5 shrink-0"
            aria-hidden
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel>Cambiar de asignatura</DropdownMenuLabel>
        {asignaturas.map((item) => (
          <DropdownMenuItem
            key={item.id}
            onSelect={() => setAsignaturaId(item.id)}
            className="items-start gap-3"
          >
            <Check
              className={cn(
                'text-primary mt-0.5 size-4 shrink-0',
                item.id !== asignatura.id && 'opacity-0',
              )}
              aria-hidden
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium">{item.nombre}</span>
              <span className="text-muted-foreground block truncate text-xs">
                <span className="font-mono">{item.codigo}</span> · {item.grupo}{' '}
                · {item.curso}
              </span>
            </span>
            {!item.activa && (
              <Badge variant="muted" className="shrink-0">
                Cerrada
              </Badge>
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/app/asignaturas">Ver todas mis asignaturas</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function UserMenu({ persona }: { persona: Persona }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="hover:bg-accent focus-visible:ring-ring/50 flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors outline-none focus-visible:ring-[3px]"
        >
          <span className="hidden text-right leading-tight sm:block">
            <span className="block font-medium">{persona.nombre}</span>
            <span className="text-muted-foreground block text-xs">
              {persona.adscripcion}
            </span>
          </span>
          <Avatar>
            <AvatarFallback>{persona.iniciales}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{persona.nombre}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/app/ajustes">
            <Settings />
            Ajustes
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Cambiar de consola</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link to="/app">Profesor</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/centro">Institución</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/alumno">Alumno</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/login">
            <LogOut />
            Salir
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/**
 * Barra global. Las cuatro piezas que pide el inventario: selector de
 * asignatura, buscador sobre el corpus, menú de usuario y bandeja de avisos.
 *
 * El selector solo aparece donde hay asignatura: la consola de institución
 * mira el centro en agregado, no una materia.
 */
export function AppHeader({
  persona,
  rotulo,
  conAsignatura = true,
}: {
  persona: Persona
  /** Texto bajo la marca: "Panel docente", "Gobierno del centro"… */
  rotulo: string
  conAsignatura?: boolean
}) {
  return (
    <header className="bg-card sticky top-[env(safe-area-inset-top,0px)] z-40 border-b">
      <div className="flex h-16 items-center gap-3 px-4">
        <Link to="/" className="shrink-0 rounded-lg" aria-label="AcademIA">
          <span className="flex items-center gap-2.5">
            <Logo markOnly />
            <span className="hidden leading-tight lg:block">
              <span className="block font-medium">AcademIA</span>
              <span className="text-muted-foreground block text-xs">
                {rotulo}
              </span>
            </span>
          </span>
        </Link>

        {conAsignatura && (
          <div className="hidden shrink-0 md:block">
            <SubjectPicker />
          </div>
        )}

        <div className="mx-auto hidden w-full max-w-lg lg:block">
          <CorpusSearch />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <Badge
            variant="success"
            className="mr-1 hidden xl:inline-flex"
            title="Última sincronización con el campus: hoy, 09:42"
          >
            <Cloud className="size-3" aria-hidden />
            Sincronizado
          </Badge>

          <Button
            variant="ghost"
            size="icon-sm"
            className="relative"
            aria-label="Avisos: 4 sin leer"
          >
            <Bell className="size-4" />
            <span
              className="bg-human absolute top-1 right-1 size-1.5 rounded-full"
              aria-hidden
            />
          </Button>

          <Button variant="ghost" size="icon-sm" aria-label="Ayuda">
            <CircleHelp className="size-4" />
          </Button>

          <ThemeToggle />

          <UserMenu persona={persona} />
        </div>
      </div>

      {/* El buscador y el selector no caben arriba en pantallas estrechas. */}
      <div className="flex items-center gap-2 border-t px-4 py-2 lg:hidden">
        {conAsignatura && (
          <div className="md:hidden">
            <SubjectPicker />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <CorpusSearch />
        </div>
      </div>
    </header>
  )
}
