import { Link } from 'react-router-dom'

import { Logo } from '@/components/brand/logo'
import { Separator } from '@/components/ui/separator'
import {
  footerColumns,
  footerLegalLinks,
  platformVersion,
  type NavItem,
} from '@/content/site'
import { cn } from '@/lib/utils'

function FooterLink({ item }: { item: NavItem }) {
  if (!item.to) {
    return (
      <span
        className="text-muted-foreground/60 cursor-default"
        title="Disponible en una fase posterior"
      >
        {item.label}
      </span>
    )
  }

  return (
    <Link
      to={item.to}
      className="hover:text-foreground rounded-sm transition-colors"
    >
      {item.label}
    </Link>
  )
}

export function SiteFooter({
  variant = 'full',
  className,
}: {
  variant?: 'full' | 'slim'
  className?: string
}) {
  if (variant === 'slim') {
    return (
      <footer
        className={cn(
          'bg-muted/40 text-muted-foreground border-t text-xs',
          className,
        )}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-5 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" markOnly />
            <span>
              Infraestructura de IA soberana para la educación superior
            </span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {footerLegalLinks.map((item) => (
              <FooterLink key={item.label} item={item} />
            ))}
            <span className="font-mono">{platformVersion}</span>
          </nav>
        </div>
      </footer>
    )
  }

  return (
    <footer className={cn('bg-muted/40 border-t', className)}>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,1fr))]">
          <div className="max-w-xs">
            <Logo size="md" />
            <p className="text-muted-foreground mt-4 text-sm">
              Infraestructura ética y soberana de inteligencia artificial para
              la educación superior. Diseñada para preservar la autoridad de la
              cátedra y la integridad del título universitario.
            </p>
            <p className="text-muted-foreground/70 bg-muted mt-4 inline-block rounded-md px-2 py-1 font-mono text-xs">
              {platformVersion}
            </p>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-labelledby={`footer-${column.title}`}>
              <h2
                id={`footer-${column.title}`}
                className="text-muted-foreground text-xs font-medium tracking-[0.1em] uppercase"
              >
                {column.title}
              </h2>
              <ul className="text-muted-foreground mt-4 space-y-2.5 text-sm">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="text-muted-foreground flex flex-col gap-4 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2025 AcademIA Technologies S.L. — maqueta de demostración, sin
            servicio asociado.
          </p>
          <nav className="flex flex-wrap gap-x-4 gap-y-1">
            {footerLegalLinks.map((item) => (
              <FooterLink key={item.label} item={item} />
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
