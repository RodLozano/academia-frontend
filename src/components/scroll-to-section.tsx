import { cn } from '@/lib/utils'

/**
 * Desplazamiento a una sección de la misma página.
 *
 * Con HashRouter el hash de la URL lo consume el router, así que un
 * `href="#seccion"` rompería la navegación. Por eso es un botón y no un
 * enlace: el destino no es una URL, es una posición del documento.
 */
export function ScrollToSection({
  section,
  children,
  className,
  onNavigate,
}: {
  section: string
  children: React.ReactNode
  className?: string
  /** Se llama tras desplazarse, p. ej. para cerrar el menú móvil. */
  onNavigate?: () => void
}) {
  return (
    <button
      type="button"
      onClick={() => {
        const target = document.getElementById(section)
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // El foco sigue al desplazamiento para quien navega con teclado.
        target?.focus({ preventScroll: true })
        onNavigate?.()
      }}
      className={cn('cursor-pointer text-left', className)}
    >
      {children}
    </button>
  )
}
