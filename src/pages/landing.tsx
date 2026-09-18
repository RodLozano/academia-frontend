import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Check,
  FileText,
  ShieldCheck,
  UserCheck,
  X,
} from 'lucide-react'

import { ProductPreview } from '@/components/brand/product-preview'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PublicLayout } from '@/layouts/public-layout'
import {
  comparativa,
  ecosistema,
  heroStats,
  pilares,
  testimonios,
} from '@/content/landing'
import { complianceClaim } from '@/content/site'

const pilarIcons = {
  human: UserCheck,
  governance: ShieldCheck,
  student: BookOpen,
}

/** Encabezado de sección de marketing: etiqueta, titular y entradilla. */
function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: React.ReactNode
  lead: string
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display text-display-sm sm:text-display-md mt-3 text-balance">
        {title}
      </h2>
      <p className="text-muted-foreground mt-4 text-lg">{lead}</p>
    </div>
  )
}

export function LandingPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            {/* Frase larga: se deja envolver en lugar de desbordar a 400px. */}
            <Badge className="mx-auto items-start rounded-lg px-3 py-1.5 text-left whitespace-normal">
              <ShieldCheck className="mt-0.5 size-3 shrink-0" aria-hidden />
              {complianceClaim}
            </Badge>

            <h1 className="font-display text-display-md sm:text-display-lg mt-6 text-balance">
              La inteligencia artificial al servicio de la cátedra,{' '}
              <span className="text-primary italic">no en su sustitución.</span>
            </h1>

            <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg">
              Una infraestructura ética de IA diseñada para potenciar la labor
              docente, garantizar la soberanía de datos del centro y
              personalizar el aprendizaje del alumnado sin perder un ápice de
              rigor académico.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/piloto">
                  Solicitar piloto institucional (curso 2025/26)
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/legal">
                  <FileText className="size-4" />
                  Ver dossier técnico y gobernanza
                </Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <ProductPreview />
          </div>

          <dl className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-xl border px-4 py-4"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="text-primary text-2xl font-medium">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 block font-medium">{stat.label}</span>
                  <span className="text-muted-foreground mt-0.5 block text-xs">
                    {stat.detail}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Tres pilares. Doble id: la navegación apunta a "propuesta" y a
          "gobernanza", y ambos temas viven en esta sección. */}
      <section
        id="propuesta"
        tabIndex={-1}
        aria-labelledby="pilares-titulo"
        className="scroll-mt-24 border-b"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
          <SectionHeading
            eyebrow="Principios pedagógicos"
            title={
              <span id="pilares-titulo">
                Tres pilares diseñados para el estándar académico europeo
              </span>
            }
            lead="Frente a la adopción caótica de herramientas desconectadas, AcademIA ofrece una arquitectura institucional verificable."
          />

          <div
            id="gobernanza"
            tabIndex={-1}
            className="mt-12 grid scroll-mt-24 gap-5 md:grid-cols-3"
          >
            {pilares.map((pilar) => {
              const Icon = pilarIcons[pilar.icon]
              return (
                <Card key={pilar.title} className="p-6">
                  <span className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-lg">
                    <Icon className="size-4.5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-medium">{pilar.title}</h3>
                  <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
                    {pilar.body}
                  </p>
                  <p className="text-primary mt-5 flex items-center gap-1.5 text-sm font-medium">
                    {pilar.link}
                    <ArrowRight className="size-3.5" aria-hidden />
                  </p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparativa */}
      <section
        id="diferenciacion"
        tabIndex={-1}
        aria-labelledby="comparativa-titulo"
        className="bg-muted/30 scroll-mt-24 border-b"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
          <SectionHeading
            eyebrow="Diferenciación técnica"
            title={
              <span id="comparativa-titulo">
                ¿Por qué AcademIA no es otra IA genérica de consumo?
              </span>
            }
            lead="Las herramientas comerciales de chatbot no fueron concebidas para la integridad de los títulos universitarios ni para la responsabilidad de un tribunal evaluador."
          />

          <div className="bg-card mt-12 overflow-x-auto rounded-xl border">
            <table className="w-full min-w-3xl border-collapse text-left">
              <thead>
                <tr className="bg-muted/60">
                  <th scope="col" className="px-4 py-3 font-medium">
                    {comparativa.head[0]}
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground px-4 py-3 font-medium"
                  >
                    {comparativa.head[1]}
                  </th>
                  <th
                    scope="col"
                    className="text-primary bg-primary/5 px-4 py-3 font-medium"
                  >
                    {comparativa.head[2]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparativa.rows.map(([criterio, genericos, academia]) => (
                  <tr key={criterio} className="border-t align-top">
                    <th scope="row" className="px-4 py-4 font-medium">
                      {criterio}
                    </th>
                    <td className="text-muted-foreground px-4 py-4">
                      <span className="flex gap-2">
                        <X
                          className="text-destructive mt-0.5 size-4 shrink-0"
                          aria-hidden
                        />
                        {genericos}
                      </span>
                    </td>
                    <td className="bg-primary/5 px-4 py-4">
                      <span className="flex gap-2">
                        <Check
                          className="text-primary mt-0.5 size-4 shrink-0"
                          aria-hidden
                        />
                        {academia}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonios y ecosistema */}
      <section
        id="casos"
        tabIndex={-1}
        aria-labelledby="casos-titulo"
        className="scroll-mt-24 border-b"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Evidencia en las aulas</p>
            <h2
              id="casos-titulo"
              className="font-display text-display-sm sm:text-display-md mt-3 text-balance"
            >
              La confianza del cuerpo docente universitario
            </h2>
            <Badge variant="muted" className="mt-4">
              Contenido de ejemplo
            </Badge>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonios.map((testimonio) => (
              <figure
                key={testimonio.author}
                className="bg-card flex flex-col rounded-xl border p-6"
              >
                <blockquote className="flex-1 font-serif leading-relaxed italic">
                  “{testimonio.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t pt-5">
                  <span className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-medium">
                    {testimonio.initials}
                  </span>
                  <span className="text-sm">
                    <span className="block font-medium">
                      {testimonio.author}
                    </span>
                    <span className="text-muted-foreground block text-xs">
                      {testimonio.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-14 text-center">
            <h3 className="text-muted-foreground text-xs font-medium tracking-[0.1em] uppercase">
              Compatibilidad nativa con el ecosistema universitario
            </h3>
            <ul className="text-muted-foreground mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {ecosistema.map((item) => (
                <li key={item} className="font-medium">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section aria-labelledby="cierre-titulo">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
          <Card className="shadow-panel mx-auto max-w-2xl p-8 text-center sm:p-10">
            <Badge variant="success" className="mx-auto">
              Convocatoria abierta semestre 2025/26
            </Badge>
            <h2
              id="cierre-titulo"
              className="font-display text-display-sm mt-5 text-balance"
            >
              Inicie el programa piloto en su facultad o departamento
            </h2>
            <p className="text-muted-foreground mt-4">
              Despliegue una prueba de concepto en hasta tres cátedras durante
              60 días sin coste presupuestario. Incluye conector LTI y soporte
              técnico integral.
            </p>

            <ul className="text-muted-foreground mx-auto mt-6 max-w-sm space-y-2.5 text-left text-sm">
              {[
                'Instancia soberana aislada, activa en 48 horas',
                'Sin compromiso de permanencia ni coste para el centro',
                'Validación técnica previa con su unidad de campus virtual',
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check
                    className="text-primary mt-0.5 size-4 shrink-0"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>

            <Button asChild size="lg" className="mt-8 w-full sm:w-auto">
              <Link to="/piloto">
                Solicitar acceso al piloto institucional
                <ArrowRight className="size-4" />
              </Link>
            </Button>

            <p className="text-muted-foreground mt-4 text-xs">
              Implantación del conector en menos de 48 horas, sin interrumpir
              las clases en curso.
            </p>
          </Card>
        </div>
      </section>
    </PublicLayout>
  )
}
