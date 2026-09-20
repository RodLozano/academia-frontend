import { lazy } from 'react'
import { Route } from 'react-router-dom'

/**
 * Rutas de las tres consolas privadas, una por fila del inventario.
 *
 * Cada pantalla se carga en su propio trozo. Sin esto, quien solo abre la
 * landing descargaba también las 22 pantallas privadas, con recharts y todos
 * los primitivos de radix dentro.
 *
 * `perezosa` existe porque las páginas son exportaciones con nombre y `lazy`
 * espera una por omisión.
 */
function perezosa<K extends string>(
  cargar: () => Promise<Record<K, React.ComponentType>>,
  nombre: K,
) {
  return lazy(() => cargar().then((modulo) => ({ default: modulo[nombre] })))
}

const InicioDocentePage = perezosa(
  () => import('@/pages/app/inicio-docente'),
  'InicioDocentePage',
)
const EvaluarBandejaPage = perezosa(
  () => import('@/pages/app/evaluar-bandeja'),
  'EvaluarBandejaPage',
)
const CorreccionPage = perezosa(
  () => import('@/pages/app/correccion'),
  'CorreccionPage',
)
const CuadernoPage = perezosa(
  () => import('@/pages/app/cuaderno'),
  'CuadernoPage',
)
const AsignaturasPage = perezosa(
  () => import('@/pages/app/asignaturas'),
  'AsignaturasPage',
)
const AsignaturaDetallePage = perezosa(
  () => import('@/pages/app/asignatura-detalle'),
  'AsignaturaDetallePage',
)
const ContenidosPage = perezosa(
  () => import('@/pages/app/contenidos'),
  'ContenidosPage',
)
const ContenidoDetallePage = perezosa(
  () => import('@/pages/app/contenido-detalle'),
  'ContenidoDetallePage',
)
const GenerarPage = perezosa(() => import('@/pages/app/generar'), 'GenerarPage')
const EspacioGeneracionPage = perezosa(
  () => import('@/pages/app/espacio-generacion'),
  'EspacioGeneracionPage',
)
const ClasesPage = perezosa(() => import('@/pages/app/clases'), 'ClasesPage')
const ClaseDetallePage = perezosa(
  () => import('@/pages/app/clases'),
  'ClaseDetallePage',
)
const AlumnoFichaPage = perezosa(
  () => import('@/pages/app/clases'),
  'AlumnoFichaPage',
)
const CoordinacionPage = perezosa(
  () => import('@/pages/app/ajustes-coordinacion'),
  'CoordinacionPage',
)
const AjustesPage = perezosa(
  () => import('@/pages/app/ajustes-coordinacion'),
  'AjustesPage',
)

const CentroDashboardPage = perezosa(
  () => import('@/pages/centro/institucion'),
  'CentroDashboardPage',
)
const CentroUsuariosPage = perezosa(
  () => import('@/pages/centro/institucion'),
  'CentroUsuariosPage',
)
const CentroConsumoPage = perezosa(
  () => import('@/pages/centro/institucion'),
  'CentroConsumoPage',
)

const AlumnoInicioPage = perezosa(
  () => import('@/pages/alumno/alumno'),
  'AlumnoInicioPage',
)
const AlumnoTutorPage = perezosa(
  () => import('@/pages/alumno/alumno'),
  'AlumnoTutorPage',
)
const AlumnoPracticaPage = perezosa(
  () => import('@/pages/alumno/alumno'),
  'AlumnoPracticaPage',
)
const AlumnoTareasPage = perezosa(
  () => import('@/pages/alumno/alumno'),
  'AlumnoTareasPage',
)

const CentroPoliticasPage = perezosa(
  () => import('@/pages/centro/v2'),
  'CentroPoliticasPage',
)
const CentroAnaliticaPage = perezosa(
  () => import('@/pages/centro/v2'),
  'CentroAnaliticaPage',
)
const CentroAlertasPage = perezosa(
  () => import('@/pages/centro/v2'),
  'CentroAlertasPage',
)
const CentroCoordinacionPage = perezosa(
  () => import('@/pages/centro/v2'),
  'CentroCoordinacionPage',
)
const CentroAuditoriaPage = perezosa(
  () => import('@/pages/centro/v2'),
  'CentroAuditoriaPage',
)
const CentroConfiguracionPage = perezosa(
  () => import('@/pages/centro/v2'),
  'CentroConfiguracionPage',
)
const CentroFacturacionPage = perezosa(
  () => import('@/pages/centro/v2'),
  'CentroFacturacionPage',
)
const AlumnoDominioPage = perezosa(
  () => import('@/pages/alumno/v2'),
  'AlumnoDominioPage',
)
const AlumnoMaterialesPage = perezosa(
  () => import('@/pages/alumno/v2'),
  'AlumnoMaterialesPage',
)
const AlumnoAutoevaluacionPage = perezosa(
  () => import('@/pages/alumno/v2'),
  'AlumnoAutoevaluacionPage',
)
const AlumnoPortfolioPage = perezosa(
  () => import('@/pages/alumno/v2'),
  'AlumnoPortfolioPage',
)

export const appRoutes = [
  // Consola 1 — profesor (15 rutas)
  <Route key="/app" path="/app" element={<InicioDocentePage />} />,
  <Route key="/app/asignaturas" path="/app/asignaturas" element={<AsignaturasPage />} />,
  <Route key="/app/asignaturas/:id" path="/app/asignaturas/:id" element={<AsignaturaDetallePage />} />,
  <Route key="/app/contenidos" path="/app/contenidos" element={<ContenidosPage />} />,
  <Route key="/app/contenidos/:id" path="/app/contenidos/:id" element={<ContenidoDetallePage />} />,
  <Route key="/app/generar" path="/app/generar" element={<GenerarPage />} />,
  <Route key="/app/generar/:tipo" path="/app/generar/:tipo" element={<EspacioGeneracionPage />} />,
  <Route key="/app/evaluar" path="/app/evaluar" element={<EvaluarBandejaPage />} />,
  <Route key="/app/evaluar/:id" path="/app/evaluar/:id" element={<CorreccionPage />} />,
  <Route key="/app/cuaderno" path="/app/cuaderno" element={<CuadernoPage />} />,
  <Route key="/app/clases" path="/app/clases" element={<ClasesPage />} />,
  <Route key="/app/clases/:id" path="/app/clases/:id" element={<ClaseDetallePage />} />,
  <Route key="/app/alumnos/:id" path="/app/alumnos/:id" element={<AlumnoFichaPage />} />,
  <Route key="/app/coordinacion" path="/app/coordinacion" element={<CoordinacionPage />} />,
  <Route key="/app/ajustes" path="/app/ajustes" element={<AjustesPage />} />,

  // Consola 2 — institución (3 rutas en v1)
  <Route key="/centro" path="/centro" element={<CentroDashboardPage />} />,
  <Route key="/centro/usuarios" path="/centro/usuarios" element={<CentroUsuariosPage />} />,
  <Route key="/centro/consumo" path="/centro/consumo" element={<CentroConsumoPage />} />,

  // Consola 3 — alumno (4 rutas en v1)
  <Route key="/alumno" path="/alumno" element={<AlumnoInicioPage />} />,
  <Route key="/alumno/tutor" path="/alumno/tutor" element={<AlumnoTutorPage />} />,
  <Route key="/alumno/practica" path="/alumno/practica" element={<AlumnoPracticaPage />} />,
  <Route key="/alumno/tareas" path="/alumno/tareas" element={<AlumnoTareasPage />} />,

  // Rutas de v2
  <Route key="/centro/politicas" path="/centro/politicas" element={<CentroPoliticasPage />} />,
  <Route key="/centro/analitica" path="/centro/analitica" element={<CentroAnaliticaPage />} />,
  <Route key="/centro/alertas" path="/centro/alertas" element={<CentroAlertasPage />} />,
  <Route key="/centro/coordinacion" path="/centro/coordinacion" element={<CentroCoordinacionPage />} />,
  <Route key="/centro/auditoria" path="/centro/auditoria" element={<CentroAuditoriaPage />} />,
  <Route key="/centro/configuracion" path="/centro/configuracion" element={<CentroConfiguracionPage />} />,
  <Route key="/centro/facturacion" path="/centro/facturacion" element={<CentroFacturacionPage />} />,
  <Route key="/alumno/dominio" path="/alumno/dominio" element={<AlumnoDominioPage />} />,
  <Route key="/alumno/materiales" path="/alumno/materiales" element={<AlumnoMaterialesPage />} />,
  <Route key="/alumno/autoevaluacion" path="/alumno/autoevaluacion" element={<AlumnoAutoevaluacionPage />} />,
  <Route key="/alumno/portfolio" path="/alumno/portfolio" element={<AlumnoPortfolioPage />} />,
]
