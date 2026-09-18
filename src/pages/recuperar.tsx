import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, AtSign, Headset, Send } from 'lucide-react'

import { Field, fieldAria } from '@/components/form/field'
import { NoBackendNotice } from '@/components/form/no-backend-notice'
import { AuthLayout } from '@/layouts/auth-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const schema = z.object({
  correo: z
    .string()
    .min(1, 'Indica tu correo institucional.')
    .email('Introduce un correo válido.'),
})

type RecuperarValues = z.infer<typeof schema>

/**
 * Recuperación de contraseña. Instancia del acceso (0.4 del inventario): mismo
 * AuthLayout, mismo lenguaje de campos, un solo paso.
 */
export function RecuperarPage() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecuperarValues>({
    resolver: zodResolver(schema),
    defaultValues: { correo: '' },
  })

  return (
    <AuthLayout
      title="Restablecer contraseña"
      description="Te enviamos un enlace de un solo uso al correo institucional asociado a tu cátedra"
      footnote="El enlace caduca en 30 minutos y solo puede usarse una vez."
    >
      <div className="space-y-6">
        {submitted ? (
          <div className="space-y-4">
            <NoBackendNotice title="Correo validado en el navegador" />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setSubmitted(false)}
            >
              Probar con otro correo
            </Button>
          </div>
        ) : (
          <form
            noValidate
            className="space-y-5"
            onSubmit={handleSubmit(() => setSubmitted(true))}
          >
            <Field
              id="correo"
              label="Correo institucional"
              hint="Preferentemente dominio .es o .edu."
              error={errors.correo?.message}
              required
            >
              <div className="relative">
                <AtSign
                  className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  aria-hidden
                />
                <Input
                  {...register('correo')}
                  {...fieldAria('correo', {
                    error: errors.correo?.message,
                    hint: 'Preferentemente dominio .es o .edu.',
                  })}
                  type="email"
                  autoComplete="email"
                  placeholder="profesor@universidad.es"
                  className="pl-9"
                />
              </div>
            </Field>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              <Send className="size-4" />
              Enviar enlace de restablecimiento
            </Button>
          </form>
        )}

        <Button asChild variant="ghost" className="w-full">
          <Link to="/login">
            <ArrowLeft className="size-4" />
            Volver al acceso al campus
          </Link>
        </Button>

        <div className="bg-muted text-muted-foreground flex gap-3 rounded-xl p-4 text-xs">
          <Headset className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>
            Si entras con Google Workspace o Microsoft, la contraseña la gestiona
            tu universidad: escribe al CAU de tu centro.
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
