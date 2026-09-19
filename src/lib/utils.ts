import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Resuelve una ruta de `public/` respetando el `base` de Vite. En GitHub Pages
 * el sitio vive bajo /academia-frontend/, así que nunca se usan rutas
 * absolutas para los estáticos.
 */
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
