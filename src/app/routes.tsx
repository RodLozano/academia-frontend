import { Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { appRoutes } from '@/app/app-routes'
import { LandingPage } from '@/pages/landing'
import { CentrosPage, ProductoPage } from '@/pages/publica-v2'
import { LegalPage } from '@/pages/legal'
import { LoginPage } from '@/pages/login'
import { NotFoundPage } from '@/pages/not-found'
import { PilotoPage } from '@/pages/piloto'
import { RecuperarPage } from '@/pages/recuperar'

/** Rutas que apuntan a un apartado concreto y se colocan ellas mismas. */
const HANDLES_OWN_SCROLL = /^\/legal\/.+/

/**
 * Al cambiar de ruta se vuelve arriba, salvo en las rutas que apuntan a un
 * apartado: ahí las dos posiciones competirían y ganaría la última.
 */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (HANDLES_OWN_SCROLL.test(pathname)) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      {/* Las pantallas privadas llegan en trozos aparte. El respaldo es sobrio
          a propósito: en local se resuelve antes de que se vea. */}
      <Suspense
        fallback={
          <div
            role="status"
            aria-live="polite"
            className="text-muted-foreground flex min-h-dvh items-center justify-center text-sm"
          >
            Cargando…
          </div>
        }
      >
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/piloto" element={<PilotoPage />} />
        <Route path="/producto" element={<ProductoPage />} />
        <Route path="/centros" element={<CentrosPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recuperar" element={<RecuperarPage />} />
        {/* Un solo documento legal. Sin sección se abre por arriba; con
            sección se abre en ese apartado, para poder enlazarlo. */}
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/legal/:seccion" element={<LegalPage />} />

        {/* Consolas privadas: profesor, institución y alumno. */}
        {appRoutes}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  )
}
