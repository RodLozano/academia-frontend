import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Search, Sparkles, User } from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { alumnos, contenidos } from '@/mocks/data'

/**
 * Buscador sobre el corpus, una de las cuatro piezas de la carcasa según el
 * inventario. Busca en local sobre los datos de maqueta; cuando exista el
 * backend, la consulta se irá a /api/* y el resto del componente no cambia.
 */
export function CorpusSearch() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const ir = (to: string) => {
    setOpen(false)
    navigate(to)
  }

  const originales = contenidos.filter((c) => c.naturaleza === 'original')
  const generados = contenidos.filter((c) => c.naturaleza === 'generado')

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="border-input bg-muted/60 text-muted-foreground hover:bg-muted focus-visible:ring-ring/50 flex h-9 w-full items-center gap-2.5 rounded-lg border px-3 transition-colors outline-none focus-visible:ring-[3px]"
      >
        <Search className="size-4 shrink-0" aria-hidden />
        <span className="truncate">
          Buscar apuntes, rúbricas, estudiantes o análisis…
        </span>
        <kbd className="bg-card text-muted-foreground ml-auto hidden shrink-0 rounded border px-1.5 py-0.5 font-mono text-xs sm:block">
          ⌘K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl gap-0 p-0" showClose={false}>
          <DialogTitle className="sr-only">Buscar en el corpus</DialogTitle>
          <Command>
            <CommandInput placeholder="Buscar en el corpus de la cátedra…" />
            <CommandList>
              <CommandEmpty>
                Nada coincide en el corpus de esta cátedra.
              </CommandEmpty>

              <CommandGroup heading="Originales">
                {originales.map((contenido) => (
                  <CommandItem
                    key={contenido.id}
                    value={`${contenido.titulo} ${contenido.unidad}`}
                    onSelect={() => ir(`/app/contenidos/${contenido.id}`)}
                  >
                    <FileText className="text-muted-foreground" />
                    <span className="truncate">{contenido.titulo}</span>
                    <span className="text-muted-foreground ml-auto shrink-0 text-xs">
                      {contenido.unidad}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading="Generados">
                {generados.map((contenido) => (
                  <CommandItem
                    key={contenido.id}
                    value={`${contenido.titulo} ${contenido.unidad}`}
                    onSelect={() => ir(`/app/contenidos/${contenido.id}`)}
                  >
                    <Sparkles className="text-primary" />
                    <span className="truncate">{contenido.titulo}</span>
                    <span className="text-muted-foreground ml-auto shrink-0 font-mono text-xs">
                      v{contenido.version}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading="Estudiantes">
                {alumnos.map((alumno) => (
                  <CommandItem
                    key={alumno.id}
                    value={alumno.nombre}
                    onSelect={() => ir(`/app/alumnos/${alumno.id}`)}
                  >
                    <User className="text-muted-foreground" />
                    {alumno.nombre}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}
