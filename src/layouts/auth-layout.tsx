import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

import { DemoNotice } from '@/components/brand/demo-notice'
import { Logo } from '@/components/brand/logo'
import { SiteFooter } from '@/components/site-footer'
import { ThemeToggle } from '@/components/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

/**
 * Tarjeta centrada para acceso y recuperación. Sin carcasa de app a propósito:
 * quien aún no ha entrado no tiene asignatura, buscador ni avisos.
 */
export function AuthLayout({
  title,
  description,
  children,
  footnote,
}: {
  title: string
  description: string
  children: React.ReactNode
  footnote?: React.ReactNode
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <DemoNotice />

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="rounded-lg" aria-label="AcademIA — inicio">
          <Logo size="sm" />
        </Link>
        <ThemeToggle />
      </div>

      <main
        id="contenido"
        className="flex flex-1 flex-col items-center justify-center px-4 py-8"
      >
        <Badge variant="muted" className="mb-6">
          <ShieldCheck className="size-3" aria-hidden />
          Conexión segura federada · conforme EU AI Act
        </Badge>

        <Card className="shadow-panel w-full max-w-md p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <Logo size="lg" markOnly />
            <h1 className="mt-4 text-2xl font-medium">{title}</h1>
            <p className="text-muted-foreground mt-2 text-sm">{description}</p>
          </div>
          <div className="mt-6">{children}</div>
        </Card>

        {footnote && (
          <div className="text-muted-foreground mt-6 max-w-md text-center text-xs">
            {footnote}
          </div>
        )}
      </main>

      <SiteFooter variant="slim" />
    </div>
  )
}
