import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

// Fuentes autoalojadas: sin Google Fonts, no se llama a terceros. Cada
// @font-face lleva unicode-range, así que el navegador solo descarga los
// subsets que la página usa, aunque el bundle incluya todos.
// La serif añade su itálica real, que el hero y las citas necesitan.
import '@fontsource-variable/inter'
import '@fontsource-variable/source-serif-4'
import '@fontsource-variable/source-serif-4/wght-italic.css'
import '@fontsource-variable/jetbrains-mono'
import './styles/globals.css'

import { AppRoutes } from '@/app/routes'
import { SubjectProvider } from '@/lib/subject-provider'
import { ThemeProvider } from '@/lib/theme-provider'

const container = document.getElementById('root')
if (!container) {
  throw new Error('No se encontró el contenedor #root')
}

createRoot(container).render(
  <StrictMode>
    {/* HashRouter, no BrowserRouter: GitHub Pages no reescribe rutas. */}
    <HashRouter>
      <ThemeProvider>
        {/* Por encima de las rutas: las páginas leen la asignatura en su
            propio cuerpo, antes de montar la carcasa. */}
        <SubjectProvider>
          <AppRoutes />
        </SubjectProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)
