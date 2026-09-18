import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

import { Logo } from '@/components/brand/logo'
import { ScrollToSection } from '@/components/scroll-to-section'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { landingNav } from '@/content/site'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-card/90 sticky top-[env(safe-area-inset-top,0px)] z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <Link
          to="/"
          className="rounded-lg"
          aria-label="AcademIA — inicio"
          onClick={() => setOpen(false)}
        >
          <Logo subtitle="Educación superior" />
        </Link>

        <nav className="text-muted-foreground ml-auto hidden items-center gap-6 text-sm lg:flex">
          {landingNav.map((item) => (
            <ScrollToSection
              key={item.label}
              section={item.section!}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </ScrollToSection>
          ))}
          <Link to="/login" className="hover:text-foreground transition-colors">
            Acceso al campus
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/piloto">Solicitar piloto</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      <div
        id="menu-movil"
        hidden={!open}
        className="bg-card border-t lg:hidden"
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
          {landingNav.map((item) => (
            <ScrollToSection
              key={item.label}
              section={item.section!}
              onNavigate={() => setOpen(false)}
              className="hover:bg-accent rounded-lg px-2 py-2.5 transition-colors"
            >
              {item.label}
            </ScrollToSection>
          ))}
          <Link
            to="/login"
            className="hover:bg-accent rounded-lg px-2 py-2.5 transition-colors"
            onClick={() => setOpen(false)}
          >
            Acceso al campus
          </Link>
          <Button asChild className="mt-2 sm:hidden">
            <Link to="/piloto" onClick={() => setOpen(false)}>
              Solicitar piloto
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
