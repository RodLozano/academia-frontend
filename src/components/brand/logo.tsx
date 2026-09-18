import { GraduationCap } from 'lucide-react'

import { cn } from '@/lib/utils'

type LogoProps = {
  /** Rótulo bajo la marca, p. ej. "Educación superior". */
  subtitle?: string
  size?: 'sm' | 'md' | 'lg'
  /** Solo el símbolo, sin palabra. */
  markOnly?: boolean
  className?: string
}

const sizes = {
  sm: { mark: 'size-6 rounded-md', icon: 'size-3.5', word: 'text-base' },
  md: { mark: 'size-8 rounded-lg', icon: 'size-4.5', word: 'text-lg' },
  lg: { mark: 'size-11 rounded-xl', icon: 'size-6', word: 'text-2xl' },
} as const

/**
 * Marca de AcademIA. El "IA" va en teal porque el teal es el sistema: la marca
 * y la IA son lo mismo (DESIGN.md).
 */
export function Logo({
  subtitle,
  size = 'md',
  markOnly = false,
  className,
}: LogoProps) {
  const scale = sizes[size]

  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'bg-primary text-primary-foreground flex shrink-0 items-center justify-center',
          scale.mark,
        )}
      >
        <GraduationCap className={scale.icon} aria-hidden />
      </span>
      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span className={cn('font-medium tracking-tight', scale.word)}>
            Academ<span className="text-primary">IA</span>
          </span>
          {subtitle && (
            <span className="text-muted-foreground mt-1 text-xs tracking-[0.08em] uppercase">
              {subtitle}
            </span>
          )}
        </span>
      )}
      <span className="sr-only">AcademIA</span>
    </span>
  )
}
