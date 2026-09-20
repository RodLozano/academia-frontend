import { Link, useLocation } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

import { NavIcon } from '@/components/app/nav-icon'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { NavModulo } from '@/content/app-nav'

/** ¿Es `to` la ruta activa? Exacta en las raíces, por prefijo en el resto. */
function esActiva(pathname: string, to: string, raices: string[]) {
  if (raices.includes(to)) return pathname === to
  return pathname === to || pathname.startsWith(`${to}/`)
}

/**
 * Barra lateral de secciones del módulo activo. Es el tercer nivel de la
 * carcasa: las 15 rutas del profesor no caben en un solo nivel de pestañas,
 * agrupadas por módulo sí.
 */
export function AppSidebar({
  modulo,
  raices,
  className,
}: {
  modulo: NavModulo
  /** Rutas que solo se activan por coincidencia exacta. */
  raices: string[]
  className?: string
}) {
  const { pathname } = useLocation()

  return (
    <nav
      aria-label={`Secciones de ${modulo.label}`}
      className={cn('bg-brand-surface flex flex-col gap-8', className)}
    >
      {modulo.grupos.map((grupo) => (
        <div key={grupo.titulo}>
          <h2 className="text-muted-foreground px-3 text-xs font-medium tracking-[0.1em] uppercase">
            {grupo.titulo}
          </h2>
          <ul className="mt-2 space-y-0.5">
            {grupo.items.map((item) => {
              const activa = esActiva(pathname, item.to, raices)
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    aria-current={activa ? 'page' : undefined}
                    className={cn(
                      'hover:bg-brand-surface-strong flex items-center gap-2.5 rounded-lg px-3 py-2.5 transition-colors',
                      activa && 'bg-card text-brand-ink font-medium',
                    )}
                  >
                    <NavIcon
                      name={item.icon}
                      className={cn(
                        'size-4 shrink-0',
                        activa ? 'text-brand-ink' : 'text-muted-foreground',
                      )}
                    />
                    <span className="min-w-0 flex-1 truncate">
                      {item.label}
                    </span>
                    {item.badge && (
                      <Badge variant="muted" className="shrink-0">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}

      {/* La nota de supervisión humana va anclada al pie de la lateral en las
          referencias: es el recordatorio de que la IA no cierra nada sola. */}
      <div className="border-human/30 bg-human/5 mt-auto rounded-xl border p-3">
        <p className="text-human flex items-center gap-2 font-medium">
          <ShieldCheck className="size-4 shrink-0" aria-hidden />
          Supervisión humana
        </p>
        <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
          Ninguna calificación se consolida sin la ratificación explícita de un
          docente.
        </p>
      </div>
    </nav>
  )
}
