import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  FileUp,
  GitBranch,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from 'lucide-react'

import { ProductPreview } from '@/components/brand/product-preview'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PublicLayout } from '@/layouts/public-layout'
import { cn } from '@/lib/utils'

/**
 * Páginas públicas de v2 (0.6 y 0.7). Ambas son marketing, así que siguen la
 * escala tipográfica de marketing y no la de la app.
 *
 * Y ambas respetan la regla del naranja igual que la landing: no hay ninguna
 * decisión humana irreversible en una página de venta, así que todos sus
 * controles van en teal.
 */

/** Producto / cómo funciona (0.6). El detalle funcional. */
export function ProductoPage() {
  const pasos = [
    {
      icon: FileUp,
      titulo: 'Subes tus materiales',
      cuerpo:
        'Los PDF de la cátedra —apuntes, bibliografía, guías docentes, fuentes primarias— pasan a ser el corpus de la asignatura. No salen de la instancia del centro y no se usan para entrenar nada.',
    },
    {
      icon: Sparkles,
      titulo: 'El motor propone desde ese corpus',
      cuerpo:
        'Exámenes, rúbricas, fichas y situaciones de aprendizaje, ancladas a las fuentes que has marcado. Si algo no está en tu corpus, el motor no puede usarlo.',
    },
    {
      icon: UserCheck,
      titulo: 'Tú decides y firmas',
      cuerpo:
        'Nada se publica ni consta en un expediente hasta que lo ratificas. La propuesta se presenta siempre como propuesta, con la nota sugerida separada de la nota firmada.',
    },
    {
      icon: GitBranch,
      titulo: 'Todo queda con su linaje',
      cuerpo:
        'Cada generado sabe de qué originales salió y cuánto pesó cada uno. Cada criterio que modificas queda registrado con qué cambiaste y cuándo.',
    },
  ]

  return (
    <PublicLayout>
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Cómo funciona</p>
            <h1 className="font-display text-display-md sm:text-display-lg mt-4 text-balance">
              Cuatro pasos, y el tercero es una persona.
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg">
              AcademIA no es un chatbot con vestido académico. Es una tubería
              cerrada que va de tus materiales a tus actas, y que en el punto
              decisivo se para y espera a que decidas tú.
            </p>
          </div>

          <ol className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
            {pasos.map((paso, i) => (
              <li key={paso.titulo}>
                <Card
                  className={cn(
                    'h-full p-6',
                    i === 2 && 'border-l-human border-l-2',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={cn(
                        'flex size-9 shrink-0 items-center justify-center rounded-lg',
                        i === 2
                          ? 'bg-human/10 text-human'
                          : 'bg-primary/10 text-primary',
                      )}
                    >
                      <paso.icon className="size-4.5" aria-hidden />
                    </span>
                    <span className="text-muted-foreground font-mono text-xs">
                      0{i + 1}
                    </span>
                  </div>
                  <h2 className="mt-4 text-lg font-medium">{paso.titulo}</h2>
                  <p className="text-muted-foreground mt-2 leading-relaxed">
                    {paso.cuerpo}
                  </p>
                  {i === 2 && (
                    <p className="text-human mt-3 flex items-center gap-1.5 text-xs font-medium">
                      <ShieldCheck className="size-3.5" aria-hidden />
                      Este paso no se puede automatizar ni delegar
                    </p>
                  )}
                </Card>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-12 max-w-4xl">
            <ProductPreview />
          </div>
        </div>
      </section>

      <section className="bg-muted/30 border-b">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Las tres consolas</p>
            <h2 className="font-display text-display-sm sm:text-display-md mt-3 text-balance">
              Una plataforma, tres formas de mirarla
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                titulo: 'Profesorado',
                cuerpo:
                  'Genera desde su corpus, corrige con asistencia y cierra actas. Es quien firma, y por tanto quien manda.',
                items: [
                  'Cuaderno con procedencia por celda',
                  'Corrección con rúbrica desglosada',
                  'Linaje de todo lo generado',
                ],
              },
              {
                titulo: 'Institución',
                cuerpo:
                  'Ve en agregado lo que hace el profesorado y gobierna permisos, políticas y trazabilidad.',
                items: [
                  'Analítica sin nombres',
                  'Registro de auditoría inmutable',
                  'Políticas por rol',
                ],
              },
              {
                titulo: 'Alumnado',
                cuerpo:
                  'Trabaja sobre el material de su clase y las rúbricas de su profesorado, con guardarraíles.',
                items: [
                  'Tutor que da pistas, no respuestas',
                  'Autoevaluación con la rúbrica real',
                  'Mapa de dominio propio',
                ],
              },
            ].map((consola) => (
              <Card key={consola.titulo} className="p-6">
                <h3 className="text-lg font-medium">{consola.titulo}</h3>
                <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                  {consola.cuerpo}
                </p>
                <ul className="mt-4 space-y-2 border-t pt-4">
                  {consola.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm">
                      <Check
                        className="text-primary mt-0.5 size-4 shrink-0"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
          <Card className="shadow-panel mx-auto max-w-2xl p-8 text-center sm:p-10">
            <h2 className="font-display text-display-sm text-balance">
              Véalo sobre los materiales de su propia cátedra
            </h2>
            <p className="text-muted-foreground mt-4">
              El piloto despliega una instancia aislada para hasta tres cátedras
              durante 60 días, sin coste.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/piloto">
                  Solicitar piloto institucional
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/centros">Ver modelo de licencias</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </PublicLayout>
  )
}

/** Para centros / precios (0.7). Modelo de licencias y canal institucional. */
export function CentrosPage() {
  const planes = [
    {
      nombre: 'Piloto',
      precio: 'Sin coste',
      periodo: '60 días',
      cuerpo: 'Para evaluar el encaje con una o tres cátedras.',
      items: [
        'Hasta 3 cátedras',
        'Instancia aislada del centro',
        'Conector con el campus virtual',
        'Soporte de implantación',
      ],
      destacado: false,
    },
    {
      nombre: 'Departamento',
      precio: 'Por asiento',
      periodo: 'curso académico',
      cuerpo: 'Para un departamento o una facultad completa.',
      items: [
        'Asientos docentes sin límite de alumnado',
        'Consola de institución',
        'Registro de auditoría exportable',
        'Rúbricas departamentales compartidas',
      ],
      destacado: true,
    },
    {
      nombre: 'Campus',
      precio: 'A convenio',
      periodo: 'plurianual',
      cuerpo: 'Para el despliegue completo de una universidad.',
      items: [
        'Todas las facultades',
        'Identidad federada institucional',
        'Analítica y coordinación de centro',
        'Acuerdo marco con secretaría general',
      ],
      destacado: false,
    },
  ]

  return (
    <PublicLayout>
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Para centros</p>
            <h1 className="font-display text-display-md sm:text-display-lg mt-4 text-balance">
              Se licencia por docente, no por alumno.
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg">
              El alumnado accede sin coste adicional. Cobrar por estudiante
              penalizaría precisamente lo que queremos que ocurra, que es que la
              cátedra entera lo use.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {planes.map((plan) => (
              <Card
                key={plan.nombre}
                className={cn(
                  'p-6',
                  plan.destacado && 'border-primary shadow-panel',
                )}
              >
                {plan.destacado && (
                  <Badge className="mb-3 w-fit">Más habitual</Badge>
                )}
                <h2 className="text-lg font-medium">{plan.nombre}</h2>
                <p className="mt-3">
                  <span className="font-display text-display-sm">
                    {plan.precio}
                  </span>
                  <span className="text-muted-foreground block text-xs">
                    {plan.periodo}
                  </span>
                </p>
                <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
                  {plan.cuerpo}
                </p>
                <ul className="mt-4 space-y-2 border-t pt-4">
                  {plan.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm">
                      <Check
                        className="text-primary mt-0.5 size-4 shrink-0"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={plan.destacado ? 'default' : 'outline'}
                  className="mt-5"
                >
                  <Link to="/piloto">
                    {plan.nombre === 'Piloto' ? 'Solicitar piloto' : 'Hablar con el equipo'}
                  </Link>
                </Button>
              </Card>
            ))}
          </div>

          <p className="text-muted-foreground mx-auto mt-8 max-w-2xl text-center text-xs">
            Los importes por asiento se fijan en convenio con cada centro y no se
            publican aquí: dependen del volumen, del plazo y de los requisitos
            de soporte.
          </p>
        </div>
      </section>

      <section className="bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-display-sm text-balance">
              Lo que está incluido en todos los planes
            </h2>
            <ul className="mt-6 space-y-3">
              {[
                'Inferencia en servidores de la Unión Europea, sin excepciones.',
                'Cero reentrenamiento con los materiales del centro ni con los trabajos del alumnado.',
                'Supervisión humana obligatoria: ninguna nota se consolida sin firma docente.',
                'Registro de auditoría inmutable y exportable.',
                'Titularidad de los materiales íntegra para el centro y sus autores.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <ShieldCheck
                    className="text-primary mt-0.5 size-4 shrink-0"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-6 text-sm">
              Las cinco condiciones figuran en el{' '}
              <Link to="/legal/dpa" className="text-primary hover:underline">
                acuerdo de encargo de tratamiento
              </Link>
              , no solo en esta página.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
