import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  ArrowRight,
  AtSign,
  Eye,
  EyeOff,
  Headset,
  Lock,
} from 'lucide-react'

import { Field, fieldAria } from '@/components/form/field'
import { NoBackendNotice } from '@/components/form/no-backend-notice'
import { AuthLayout } from '@/layouts/auth-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  identificador: z
    .string()
    .min(1, 'Indica tu correo institucional o tu identificador.')
    .refine(
      (value) => value.includes('@') || /^[A-Za-z0-9._-]{4,}$/.test(value),
      'Usa un correo institucional o un identificador PDI/alumno válido.',
    ),
  contrasena: z.string().min(8, 'La contraseña tiene al menos 8 caracteres.'),
  equipoSeguro: z.boolean(),
})

type LoginValues = z.infer<typeof schema>

/** Proveedores de identidad federada. Sin flujo real en esta fase. */
const providers = [
  { id: 'google', label: 'Continuar con Google Workspace' },
  { id: 'microsoft', label: 'Continuar con Microsoft (Office 365)' },
]

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sso, setSso] = useState<string | null>(null)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { identificador: '', contrasena: '', equipoSeguro: false },
  })

  return (
    <AuthLayout
      title="Acceso al campus"
      description="Entorno universitario de docencia y aprendizaje con IA soberana"
      footnote="Algoritmos supervisados y auditados de acuerdo con el marco regulatorio europeo."
    >
      <div className="space-y-6">
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-muted-foreground text-xs tracking-[0.06em] uppercase">
              Acceso institucional federado
            </h2>
            <Badge variant="muted" className="font-mono">
              RedIRIS / SAML
            </Badge>
          </div>

          <div className="space-y-2">
            {providers.map((provider) => (
              <Button
                key={provider.id}
                variant="outline"
                className="w-full justify-center"
                onClick={() => setSso(provider.label)}
              >
                {provider.label}
              </Button>
            ))}
          </div>

          {sso && (
            <p role="status" className="text-muted-foreground text-xs">
              El acceso federado no está conectado en esta maqueta. Llegará con
              la autenticación real en la fase del núcleo generativo.
            </p>
          )}

          <p className="text-muted-foreground text-xs">
            Acceso federado mediante credenciales universitarias (
            <code className="font-mono">.edu</code>,{' '}
            <code className="font-mono">.es</code>, Eduroam, SIR).
          </p>
        </section>

        <div className="flex items-center gap-3">
          <span className="bg-border h-px flex-1" />
          <span className="text-muted-foreground text-xs tracking-[0.06em] uppercase">
            o credenciales de cátedra
          </span>
          <span className="bg-border h-px flex-1" />
        </div>

        {submitted ? (
          <div className="space-y-4">
            <NoBackendNotice title="Credenciales validadas en el navegador" />
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
            className="space-y-5"
            onSubmit={handleSubmit(() => setSubmitted(true))}
          >
            <Field
              id="identificador"
              label="Correo institucional o identificador PDI / alumno"
              error={errors.identificador?.message}
              required
            >
              <div className="relative">
                <AtSign
                  className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  aria-hidden
                />
                <Input
                  {...register('identificador')}
                  {...fieldAria('identificador', {
                    error: errors.identificador?.message,
                  })}
                  type="text"
                  autoComplete="username"
                  placeholder="profesor@universidad.es"
                  className="pl-9"
                />
              </div>
            </Field>

            <Field
              id="contrasena"
              label="Contraseña"
              error={errors.contrasena?.message}
              required
            >
              <div className="relative">
                <Lock
                  className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  aria-hidden
                />
                <Input
                  {...register('contrasena')}
                  {...fieldAria('contrasena', {
                    error: errors.contrasena?.message,
                  })}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  className="px-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={
                    showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                  }
                  className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 absolute top-1/2 right-2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-offset-0"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </Field>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {/* Radix no expone un input nativo, así que el control va
                    por Controller y no por register. */}
                <Controller
                  control={control}
                  name="equipoSeguro"
                  render={({ field }) => (
                    <Checkbox
                      id="equipo-seguro"
                      name={field.name}
                      ref={field.ref}
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                      onBlur={field.onBlur}
                    />
                  )}
                />
                <Label htmlFor="equipo-seguro" className="text-sm font-normal">
                  Equipo seguro
                </Label>
              </div>
              <Link
                to="/recuperar"
                className="text-primary text-sm underline-offset-4 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Entrar al campus
              <ArrowRight className="size-4" />
            </Button>
          </form>
        )}

        <div className="bg-muted text-muted-foreground flex gap-3 rounded-xl p-4 text-xs">
          <Headset className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>
            ¿Incidencias con el SSO o con tu rol docente? Contacta con el
            administrador de cátedra o con el CAU de tu universidad.
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
