import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PublicLayout } from '@/layouts/public-layout'

export function NotFoundPage() {
  return (
    <PublicLayout footerVariant="slim">
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
        <p className="text-primary font-mono text-sm">404</p>
        <h1 className="font-display text-display-sm mt-3">
          Esta página no existe
        </h1>
        <p className="text-muted-foreground mt-4">
          En esta fase solo están publicadas las pantallas públicas: portada,
          acceso al campus, solicitud de piloto y centro legal.
        </p>
        <Button asChild className="mt-8">
          <Link to="/">
            <ArrowLeft className="size-4" />
            Volver a la portada
          </Link>
        </Button>
      </div>
    </PublicLayout>
  )
}
