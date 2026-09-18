import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

/**
 * Etiqueta + control + pista + error. Los formularios llevan más aire que las
 * tablas (DESIGN.md), de ahí el espaciado propio.
 */
export function Field({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label
        htmlFor={id}
        className="text-muted-foreground text-xs tracking-[0.06em] uppercase"
      >
        {label}
        {required && (
          <span className="text-destructive" aria-hidden>
            *
          </span>
        )}
        {required && <span className="sr-only">(obligatorio)</span>}
      </Label>

      {children}

      {error ? (
        <p id={`${id}-error`} role="alert" className="text-destructive text-xs">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="text-muted-foreground text-xs">
            {hint}
          </p>
        )
      )}
    </div>
  )
}

/** Atributos ARIA que ligan un control con su pista y su error. */
export function fieldAria(id: string, options: { error?: string; hint?: string }) {
  return {
    id,
    'aria-invalid': options.error ? true : undefined,
    'aria-describedby': options.error
      ? `${id}-error`
      : options.hint
        ? `${id}-hint`
        : undefined,
  }
}
