import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check, Info, Mail, ShieldAlert, ShieldCheck } from 'lucide-react'

import { Logo } from '@/components/brand/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PublicLayout } from '@/layouts/public-layout'
import {
  documentReference,
  lastUpdated,
  legalSections,
  marcosAplicables,
  type LegalBlock,
  type LegalSection,
} from '@/content/legal'
import { cn } from '@/lib/utils'

function LegalHeader() {
  return (
    <header className="bg-card sticky top-[env(safe-area-inset-top,0px)] z-40 border-b">
      <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
        <Link to="/" className="rounded-lg" aria-label="AcademIA — inicio">
          <Logo subtitle="Educación superior" />
        </Link>
        <span className="text-muted-foreground hidden text-sm sm:inline">
          Centro legal y gobernanza
        </span>
        <Badge variant="success" className="hidden md:inline-flex">
          Vigente curso 2024-2025
        </Badge>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm">
            <Link to="/">Portal institucional</Link>
          </Button>
        </div>
      </div>

      <div className="bg-muted/50 text-muted-foreground border-t">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2 text-xs">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="text-primary size-3.5" aria-hidden />
            Gobernanza verificada
          </span>
          <span className="hidden sm:inline">
            Conforme al marco europeo de IA y al RGPD / LOPDGDD
          </span>
          <span className="ml-auto font-mono">
            Referencia: {documentReference}
          </span>
        </div>
      </div>
    </header>
  )
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case 'h':
      return <h3 className="mt-8 text-lg font-medium">{block.text}</h3>

    case 'p':
      return (
        <p className="text-muted-foreground mt-4 leading-relaxed">
          {block.text}
        </p>
      )

    case 'terms':
      return (
        <ul className="mt-4 space-y-3">
          {block.items.map((item) => (
            <li key={item.term} className="flex gap-3">
              <span
                className="bg-primary/60 mt-2 size-1.5 shrink-0 rounded-full"
                aria-hidden
              />
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">
                  {item.term}:
                </span>{' '}
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      )

    case 'table':
      return (
        <div className="mt-5 overflow-x-auto rounded-xl border">
          <table className="w-full min-w-xl border-collapse text-left">
            <thead className="bg-muted/60">
              <tr>
                {block.head.map((cell) => (
                  <th
                    key={cell}
                    scope="col"
                    className="px-4 py-2.5 font-medium"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map(([term, detail]) => (
                <tr key={term} className="border-t align-top">
                  <th
                    scope="row"
                    className="w-1/3 px-4 py-3 font-normal"
                  >
                    {term}
                  </th>
                  <td className="text-muted-foreground px-4 py-3 leading-relaxed">
                    {detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'callout':
      return (
        <div
          className={cn(
            'mt-5 flex gap-3 rounded-xl border p-4',
            block.tone === 'primary'
              ? 'border-primary/30 bg-primary/5'
              : 'bg-muted/50',
          )}
        >
          <Info
            className={cn(
              'mt-0.5 size-4 shrink-0',
              block.tone === 'primary' ? 'text-primary' : 'text-muted-foreground',
            )}
            aria-hidden
          />
          <div>
            <p className="font-medium">{block.title}</p>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
              {block.text}
            </p>
          </div>
        </div>
      )

    case 'audit':
      return (
        <dl className="bg-muted/60 mt-5 divide-y rounded-xl border font-mono text-xs">
          {block.rows.map(([param, impl]) => (
            <div
              key={param}
              className="flex flex-col gap-1 px-4 py-2.5 sm:flex-row sm:justify-between sm:gap-6"
            >
              <dt className="text-muted-foreground">{param}</dt>
              <dd className="text-primary sm:text-right">{impl}</dd>
            </div>
          ))}
        </dl>
      )
  }
}

function Section({ section }: { section: LegalSection }) {
  return (
    <section
      id={section.slug}
      tabIndex={-1}
      aria-labelledby={`${section.slug}-titulo`}
      className="scroll-mt-28 border-b pb-10 last:border-b-0"
    >
      <div className="flex items-baseline gap-3">
        <span className="text-primary font-mono text-sm">{section.index}</span>
        <h2 id={`${section.slug}-titulo`} className="text-xl font-medium">
          {section.title}
        </h2>
        {section.badge && <Badge variant="warning">{section.badge}</Badge>}
      </div>
      {section.blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </section>
  )
}

export function LegalPage() {
  const { seccion } = useParams()
  const active = legalSections.find((section) => section.slug === seccion)?.slug
  const mounted = useRef(false)

  // La sección de la ruta solo mueve el desplazamiento: el documento es uno.
  // Al llegar de fuera se coloca de golpe; al cambiar de apartado ya dentro,
  // se anima, que es lo que hace legible el salto.
  useEffect(() => {
    const target = seccion ? document.getElementById(seccion) : null
    const animate = mounted.current
    mounted.current = true

    if (!target) return
    target.scrollIntoView({
      behavior: animate ? 'smooth' : 'instant',
      block: 'start',
    })
    target.focus({ preventScroll: true })
  }, [seccion])

  return (
    <PublicLayout header={<LegalHeader />} footerVariant="slim">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[17rem_minmax(0,1fr)]">
        {/* Índice y metadatos */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <nav aria-label="Secciones del documento">
            <h2 className="text-muted-foreground text-xs font-medium tracking-[0.1em] uppercase">
              Secciones del documento
            </h2>
            <ul className="mt-3 space-y-1">
              {legalSections.map((section) => (
                <li key={section.slug}>
                  <Link
                    to={`/legal/${section.slug}`}
                    aria-current={active === section.slug ? 'true' : undefined}
                    className={cn(
                      'hover:bg-accent flex items-center gap-2 rounded-lg px-3 py-2 transition-colors',
                      active === section.slug &&
                        'bg-primary/10 text-primary font-medium',
                    )}
                  >
                    <span className="font-mono text-xs opacity-70">
                      {section.index}
                    </span>
                    {section.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="bg-muted/50 mt-6 rounded-xl border p-4">
            <h2 className="flex items-center gap-2 font-medium">
              <Mail className="text-primary size-4" aria-hidden />
              Canal de gobernanza
            </h2>
            <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
              Para consultas de auditoría de cátedra, ejercicio de derechos ARCO
              o inspección del linaje de modelos, escribe al delegado de
              protección de datos de tu centro.
            </p>
            <p className="text-muted-foreground mt-3 text-xs">
              Última actualización jurídica:{' '}
              <span className="text-foreground">{lastUpdated}</span>
            </p>
          </div>

          <div className="bg-muted/50 mt-4 rounded-xl border p-4">
            <h2 className="text-muted-foreground text-xs font-medium tracking-[0.1em] uppercase">
              Marcos aplicables
            </h2>
            <ul className="mt-3 space-y-2">
              {marcosAplicables.map((marco) => (
                <li
                  key={marco}
                  className="text-muted-foreground flex gap-2 text-xs"
                >
                  <Check
                    className="text-primary mt-0.5 size-3.5 shrink-0"
                    aria-hidden
                  />
                  {marco}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Documento */}
        <article>
          <p className="eyebrow font-mono">
            Marco contractual y gobernanza institucional · {documentReference}
          </p>
          <h1 className="font-display text-display-sm mt-3 text-balance">
            Compromiso legal, privacidad y régimen de IA responsable
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Este centro normativo regula el uso, el tratamiento de datos
            federados y las garantías de supervisión humana activa dentro de la
            plataforma AcademIA en instituciones universitarias.
          </p>

          <div className="border-warning/40 bg-warning/10 mt-6 flex gap-3 rounded-xl border p-4">
            <ShieldAlert className="text-warning mt-0.5 size-4 shrink-0" aria-hidden />
            <p className="text-sm leading-relaxed">
              <span className="font-medium">Texto de maqueta.</span> Este
              documento reproduce la estructura de un marco legal para validar
              la maquetación, pero no tiene validez jurídica ni vincula a nadie.
              El texto definitivo lo redactará asesoría jurídica.
            </p>
          </div>

          <div className="mt-10 space-y-10">
            {legalSections.map((section) => (
              <Section key={section.slug} section={section} />
            ))}
          </div>
        </article>
      </div>
    </PublicLayout>
  )
}
