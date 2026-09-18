import { DemoNotice } from '@/components/brand/demo-notice'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

/**
 * Carcasa de las pantallas públicas: franja de demostración, cabecera y pie.
 * No es la carcasa de la app (barra con selector de asignatura, buscador y
 * avisos): esa llega en la fase del núcleo generativo.
 */
export function PublicLayout({
  children,
  header,
  footerVariant = 'full',
}: {
  children: React.ReactNode
  /** Cabecera propia; por omisión, la navegación de marketing. */
  header?: React.ReactNode
  footerVariant?: 'full' | 'slim'
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <DemoNotice />
      {header ?? <SiteHeader />}
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <SiteFooter variant={footerVariant} />
    </div>
  )
}
