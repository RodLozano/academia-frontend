import { CircleCheck } from 'lucide-react'

/**
 * Resultado de cualquier envío en esta fase. El formulario valida en cliente,
 * pero no hay backend detrás: conviene decirlo, no simular un éxito.
 */
export function NoBackendNotice({
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
}) {
  return (
    <div
      role="status"
      className="border-primary/30 bg-primary/5 flex gap-3 rounded-xl border p-4"
    >
      <CircleCheck className="text-primary mt-0.5 size-4 shrink-0" aria-hidden />
      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        <p className="text-muted-foreground text-sm">
          Esta maqueta no tiene backend: no se ha enviado ninguna petición ni se
          ha guardado ningún dato. La conexión con la API llega en la fase del
          núcleo generativo.
        </p>
        {children}
      </div>
    </div>
  )
}
