/**
 * Enlace de salto al contenido. Primer elemento enfocable de la página, oculto
 * hasta que recibe el foco.
 *
 * Es un ancla por semántica, pero **no navega**: con HashRouter el hash de la
 * URL lo consume el router, así que un `href="#contenido"` cambiaría de ruta en
 * lugar de saltar. El `preventDefault` mueve el foco a mano.
 *
 * El destino necesita `tabIndex={-1}` para poder recibir el foco, y lo llevan
 * los `<main>` de las tres carcasas.
 */
export function SkipLink() {
  return (
    <a
      href="#contenido"
      onClick={(event) => {
        event.preventDefault()
        const main = document.getElementById('contenido')
        main?.focus()
        main?.scrollIntoView({ block: 'start' })
      }}
      className="bg-primary text-primary-foreground focus-visible:ring-ring/50 sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:rounded-lg focus-visible:px-3 focus-visible:py-2 focus-visible:ring-[3px]"
    >
      Saltar al contenido
    </a>
  )
}
