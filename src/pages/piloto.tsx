import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from 'lucide-react'

import { Logo } from '@/components/brand/logo'
import { Field, fieldAria } from '@/components/form/field'
import { NoBackendNotice } from '@/components/form/no-backend-notice'
import { ThemeToggle } from '@/components/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { PublicLayout } from '@/layouts/public-layout'
import {
  campusVirtual,
  cifras,
  compatibilidad,
  escalas,
  garantias,
  testimonio,
} from '@/content/piloto'

const schema = z.object({
  centro: z.string().min(3, 'Indica el nombre del centro o la facultad.'),
  contacto: z
    .string()
    .min(3, 'Indica la persona de contacto y su cargo institucional.'),
  correo: z
    .string()
    .min(1, 'Indica el correo institucional.')
    .email('Introduce un correo válido.'),
  telefono: z
    .string()
    .min(9, 'Indica un teléfono de contacto de al menos 9 dígitos.')
    .regex(/^[+\d\s().-]+$/, 'El teléfono solo admite números y separadores.'),
  escala: z.string().min(1, 'Selecciona la escala del piloto.'),
  campus: z.string().min(1, 'Selecciona el campus virtual del centro.'),
  mensaje: z.string().max(1000, 'Máximo 1000 caracteres.').optional(),
  consentimiento: z.literal(true, {
    errorMap: () => ({
      message: 'Necesitamos tu consentimiento para tramitar la solicitud.',
    }),
  }),
})

type PilotoValues = z.input<typeof schema>

function PilotoHeader() {
  return (
    <header className="bg-card sticky top-[env(safe-area-inset-top,0px)] z-40 border-b">
      <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
        <Link to="/" className="rounded-lg" aria-label="AcademIA — inicio">
          <Logo subtitle="Educación superior" />
        </Link>

        <Badge
          variant="success"
          className="order-3 w-full justify-center whitespace-normal sm:order-none sm:mx-auto sm:w-auto"
        >
          Convocatoria semestre 2025/26 · pilotos activos
        </Badge>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">
                Volver a la web institucional
              </span>
              <span className="sm:hidden">Volver</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export function PilotoPage() {
  const [submitted, setSubmitted] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PilotoValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      centro: '',
      contacto: '',
      correo: '',
      telefono: '',
      escala: '',
      campus: '',
      mensaje: '',
    },
  })

  return (
    <PublicLayout header={<PilotoHeader />}>
      <div className="mx-auto max-w-6xl px-4 py-10 lg:py-14">
        <div className="text-muted-foreground flex flex-wrap items-center justify-between gap-3 text-xs">
          <p>
            Iniciativa de gobernanza tecnológica{' '}
            <span aria-hidden>/</span>{' '}
            <span className="text-foreground">
              Acuerdo de piloto marco universitario
            </span>
          </p>
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="text-primary size-3.5" aria-hidden />
            Conforme al EU AI Act (categoría educación / alto riesgo)
          </p>
        </div>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Argumentario */}
          <div>
            <h1 className="font-display text-display-sm sm:text-display-md text-balance">
              Despliegue un piloto institucional en su facultad o centro
              universitario.
            </h1>
            <p className="text-muted-foreground mt-5 text-lg">
              Evaluamos los requisitos técnicos de su campus (Moodle, Canvas o
              Blackboard) y activamos una instancia soberana aislada para tres
              cátedras en 48 horas, sin coste presupuestario.
            </p>

            <ul className="mt-8 space-y-4">
              {garantias.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="bg-primary/10 text-primary mt-0.5 flex size-5 shrink-0 items-center justify-center rounded">
                    <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
                  </span>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">
                      {item.title}
                    </span>{' '}
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>

            <dl className="mt-8 grid grid-cols-3 gap-3">
              {cifras.map((cifra) => (
                <div
                  key={cifra.label}
                  className="bg-card rounded-xl border px-3 py-4 text-center"
                >
                  <dt className="sr-only">{cifra.label}</dt>
                  <dd>
                    <span className="text-2xl font-medium">{cifra.value}</span>
                    <span className="text-muted-foreground mt-1 block text-xs tracking-[0.06em] uppercase">
                      {cifra.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <figure className="bg-muted/50 mt-8 rounded-xl border p-5">
              <blockquote className="font-serif text-lg italic">
                “{testimonio.quote}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-full text-xs font-medium">
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
          </div>

          {/* Formulario */}
          <Card className="shadow-panel p-6 sm:p-8">
            <h2 className="text-xl font-medium">
              Formulario de adhesión al piloto
            </h2>
            <p className="text-muted-foreground mt-1.5 text-sm">
              Completar este expediente inicia la validación técnica preliminar
              con el servicio de soporte al campus.
            </p>

            <div className="bg-border my-6 h-px" />

            {submitted ? (
              <div className="space-y-4">
                <NoBackendNotice title="Solicitud validada en el navegador" />
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSubmitted(false)}
                >
                  Volver al formulario
                </Button>
              </div>
            ) : (
              <form
                noValidate
                className="space-y-6"
                onSubmit={handleSubmit(() => setSubmitted(true))}
              >
                <Field
                  id="centro"
                  label="Nombre del centro o facultad"
                  error={errors.centro?.message}
                  required
                >
                  <Input
                    {...register('centro')}
                    {...fieldAria('centro', { error: errors.centro?.message })}
                    autoComplete="organization"
                    placeholder="Ej. Facultad de Humanidades / Universidad de Salamanca"
                  />
                </Field>

                <Field
                  id="contacto"
                  label="Persona de contacto y cargo institucional"
                  error={errors.contacto?.message}
                  required
                >
                  <Input
                    {...register('contacto')}
                    {...fieldAria('contacto', {
                      error: errors.contacto?.message,
                    })}
                    autoComplete="name"
                    placeholder="Dra. Carmen Fernández — Decana / Directora de departamento"
                  />
                </Field>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    id="correo"
                    label="Correo institucional oficial"
                    hint="Preferentemente dominio .es o .edu."
                    error={errors.correo?.message}
                    required
                  >
                    <Input
                      {...register('correo')}
                      {...fieldAria('correo', {
                        error: errors.correo?.message,
                        hint: 'Preferentemente dominio .es o .edu.',
                      })}
                      type="email"
                      autoComplete="email"
                      placeholder="c.fernandez@universidad.es"
                    />
                  </Field>

                  <Field
                    id="telefono"
                    label="Teléfono de coordinación"
                    hint="Para agendar la validación técnica LTI."
                    error={errors.telefono?.message}
                    required
                  >
                    <Input
                      {...register('telefono')}
                      {...fieldAria('telefono', {
                        error: errors.telefono?.message,
                        hint: 'Para agendar la validación técnica LTI.',
                      })}
                      type="tel"
                      autoComplete="tel"
                      placeholder="+34 923 29 44 00"
                    />
                  </Field>
                </div>

                <Field
                  id="escala"
                  label="Número estimado de docentes en el piloto"
                  error={errors.escala?.message}
                  required
                >
                  <Controller
                    control={control}
                    name="escala"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                          {...fieldAria('escala', {
                            error: errors.escala?.message,
                          })}
                        >
                          <SelectValue placeholder="Selecciona la escala del piloto inicial…" />
                        </SelectTrigger>
                        <SelectContent>
                          {escalas.map((escala) => (
                            <SelectItem key={escala.value} value={escala.value}>
                              {escala.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>

                {/* Radios nativos con apariencia de tarjeta: el navegador ya
                    da el comportamiento de grupo y el recorrido con flechas. */}
                <fieldset className="flex flex-col gap-2">
                  <legend className="text-muted-foreground mb-2 text-xs tracking-[0.06em] uppercase">
                    Sistema de campus virtual actual
                    <span className="text-destructive" aria-hidden>
                      {' '}
                      *
                    </span>
                  </legend>
                  <div className="grid grid-cols-2 gap-2">
                    {campusVirtual.map((option) => (
                      <label
                        key={option.value}
                        className="hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:focus-visible]:ring-ring/50 flex cursor-pointer flex-col items-center gap-0.5 rounded-lg border px-3 py-3 text-center transition-colors has-[:focus-visible]:ring-[3px]"
                      >
                        <input
                          {...register('campus')}
                          type="radio"
                          value={option.value}
                          className="sr-only"
                        />
                        <span className="font-medium">{option.label}</span>
                        <span className="text-muted-foreground text-xs">
                          {option.detail}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.campus?.message && (
                    <p role="alert" className="text-destructive text-xs">
                      {errors.campus.message}
                    </p>
                  )}
                </fieldset>

                <Field
                  id="mensaje"
                  label="Mensaje o necesidades específicas de la cátedra"
                  error={errors.mensaje?.message}
                >
                  <Textarea
                    {...register('mensaje')}
                    {...fieldAria('mensaje', {
                      error: errors.mensaje?.message,
                    })}
                    rows={4}
                    placeholder="Indique brevemente las materias de interés o los requisitos de gobernanza de su centro…"
                  />
                </Field>

                <div className="flex gap-3">
                  <Controller
                    control={control}
                    name="consentimiento"
                    render={({ field }) => (
                      <Checkbox
                        id="consentimiento"
                        name={field.name}
                        ref={field.ref}
                        checked={field.value === true}
                        onCheckedChange={(checked) =>
                          field.onChange(checked === true)
                        }
                        onBlur={field.onBlur}
                        aria-invalid={
                          errors.consentimiento ? true : undefined
                        }
                        aria-describedby={
                          errors.consentimiento
                            ? 'consentimiento-error'
                            : undefined
                        }
                        className="mt-0.5"
                      />
                    )}
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="consentimiento"
                      className="text-muted-foreground block text-sm leading-relaxed font-normal"
                    >
                      Acepto el tratamiento de datos institucionales para la
                      formalización del protocolo piloto bajo el marco de
                      garantías éticas del EU AI Act y el RGPD universitario.
                    </Label>
                    {errors.consentimiento?.message && (
                      <p
                        id="consentimiento-error"
                        role="alert"
                        className="text-destructive text-xs"
                      >
                        {errors.consentimiento.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  Solicitar activación de piloto institucional
                  <ArrowRight className="size-4" />
                </Button>

                <p className="text-muted-foreground text-center text-xs">
                  Sin compromiso de permanencia ni coste para el centro durante
                  el periodo piloto de 60 días.
                </p>
              </form>
            )}
          </Card>
        </div>

        <section className="mt-16 border-t pt-10 text-center">
          <h2 className="text-muted-foreground text-xs font-medium tracking-[0.1em] uppercase">
            Compatibilidad con infraestructura académica europea
          </h2>
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {compatibilidad.map((item) => (
              <li key={item}>
                <Badge variant="outline" className="px-3 py-1.5">
                  {item}
                </Badge>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PublicLayout>
  )
}
