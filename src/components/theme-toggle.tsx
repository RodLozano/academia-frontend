import { Monitor, Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme-context'

const order = ['system', 'light', 'dark'] as const

const labels = {
  system: 'Tema del sistema',
  light: 'Tema claro',
  dark: 'Tema oscuro',
} as const

const icons = {
  system: Monitor,
  light: Sun,
  dark: Moon,
} as const

/** Modo oscuro obligatorio (DESIGN.md): sistema → claro → oscuro. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const Icon = icons[theme]

  const next = order[(order.indexOf(theme) + 1) % order.length]

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className={className}
      onClick={() => setTheme(next)}
      aria-label={`${labels[theme]}. Cambiar a: ${labels[next].toLowerCase()}`}
      title={labels[theme]}
    >
      <Icon className="size-4" />
    </Button>
  )
}
