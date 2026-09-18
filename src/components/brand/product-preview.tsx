import { Check, Sparkles } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { previewRows } from '@/content/landing'

/**
 * Vista previa del cuaderno de evaluación, construida con los tokens en lugar
 * de una captura de pantalla: no hay app todavía y una imagen quedaría
 * desalineada del sistema visual en cuanto cambie un token.
 *
 * Es el único sitio de la consola pública donde aparece el naranja, y aparece
 * representando lo que significa: el paso de ratificación humana. La leyenda
 * inferior enseña el código de color, que es la tesis del producto. No hay
 * ningún control naranja accionable en estas pantallas.
 */
export function ProductPreview() {
  return (
    <figure className="shadow-panel bg-card overflow-hidden rounded-xl border">
      {/* Barra de navegador */}
      <div className="bg-muted/70 flex items-center gap-3 border-b px-3 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="bg-border size-2.5 rounded-full" />
          <span className="bg-border size-2.5 rounded-full" />
          <span className="bg-border size-2.5 rounded-full" />
        </div>
        <p className="text-muted-foreground bg-card hidden flex-1 truncate rounded px-2 py-1 font-mono text-xs sm:block">
          app.academia.edu/catedra/historia-contemporanea/evaluacion
        </p>
        <p className="text-muted-foreground ml-auto flex shrink-0 items-center gap-1.5 font-mono text-xs sm:ml-0">
          <span className="bg-success size-1.5 rounded-full" aria-hidden />
          Supervisión humana activa
        </p>
      </div>

      {/* Cuaderno */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-medium">
            Cuaderno de evaluación · grupo 4B
          </h3>
          <Badge variant="muted" className="font-mono">
            Trabajo final · historiografía
          </Badge>
        </div>

        <table className="mt-4 w-full border-collapse text-left">
          <caption className="sr-only">
            Ejemplo de calificaciones propuestas por el sistema y su estado de
            ratificación docente
          </caption>
          <thead>
            <tr className="text-muted-foreground text-xs">
              <th scope="col" className="pb-2 font-normal">
                Alumno
              </th>
              <th scope="col" className="pb-2 font-normal">
                Propuesta de la IA
              </th>
              <th scope="col" className="pb-2 text-right font-normal">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {previewRows.map((row) => (
              <tr key={row.alumno} className="h-10 border-t">
                <td className="pr-2">{row.alumno}</td>
                <td className="pr-2">
                  <span className="text-primary inline-flex items-center gap-1.5 font-mono">
                    <Sparkles className="size-3" aria-hidden />
                    {row.propuesta}
                  </span>
                </td>
                <td className="text-right">
                  {row.estado === 'ratificada' ? (
                    <span className="text-success inline-flex items-center gap-1 text-xs">
                      <Check className="size-3.5" aria-hidden />
                      Ratificada
                    </span>
                  ) : row.estado === 'pendiente' ? (
                    // Representación del control de ratificación. No es un
                    // botón: es la ilustración del paso humano.
                    <span className="bg-human text-human-foreground inline-flex h-8 items-center rounded-lg px-3 text-xs font-medium">
                      Confirmar nota
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-xs">
                      Sin revisar
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <figcaption className="bg-muted/40 text-muted-foreground flex flex-wrap items-center gap-x-5 gap-y-2 border-t px-4 py-3 text-xs sm:px-5">
        <span className="flex items-center gap-2">
          <span className="bg-primary size-2.5 rounded-sm" aria-hidden />
          Teal: lo que propone el sistema
        </span>
        <span className="flex items-center gap-2">
          <span className="bg-human size-2.5 rounded-sm" aria-hidden />
          Naranja: lo que decide una persona
        </span>
      </figcaption>
    </figure>
  )
}
