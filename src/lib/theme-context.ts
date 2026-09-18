import { createContext, useContext } from 'react'

/** `system` sigue a prefers-color-scheme; el resto fija el modo. */
export type Theme = 'light' | 'dark' | 'system'

export type ThemeContextValue = {
  theme: Theme
  /** Modo realmente aplicado al DOM una vez resuelto `system`. */
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export const THEME_STORAGE_KEY = 'academia-theme'

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme debe usarse dentro de <ThemeProvider>')
  }
  return context
}
