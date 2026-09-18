import { Info } from 'lucide-react'

/**
 * El sitio está publicado en una URL pública pero sus cifras, testimonios,
 * textos legales y declaraciones de cumplimiento son de maqueta. La franja lo
 * dice de forma visible; el `noindex` de index.html lo mantiene fuera de los
 * buscadores. Se retira cuando el contenido deje de ser provisional.
 */
export function DemoNotice() {
  return (
    <div className="bg-muted text-muted-foreground border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center text-xs">
        <Info className="size-3.5 shrink-0" aria-hidden />
        <p>
          Maqueta de demostración. Las cifras, testimonios y textos legales son
          contenido de ejemplo y no describen un servicio en producción.
        </p>
      </div>
    </div>
  )
}
