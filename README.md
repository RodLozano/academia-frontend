# AcademIA — frontend

Frontend de **AcademIA**, una plataforma educativa con IA para profesores, alumnos e instituciones. El sistema ingiere los materiales del centro (PDFs) y, mediante RAG sobre ese corpus, genera exámenes, rúbricas y fichas con **linaje** a los documentos originales de los que salen. La IA propone; **el humano decide**.

> **Estado:** maqueta navegable de las **40 rutas** del inventario, sin backend. Nada de lo que se ve es real: ni las personas, ni las calificaciones, ni los textos legales, ni las cifras. Los formularios validan pero no envían, y el acceso no autentica.
>
> Y una advertencia para quien revise: **17 de las pantallas se construyeron sin consultar su maqueta**, por una decisión explícita de priorizar cobertura sobre fidelidad. Cuáles son, y el resto de decisiones tomadas sin supervisión, está en [docs/decisiones-fase-1.md](docs/decisiones-fase-1.md) — que todavía lista 16, porque la última en llegar, facturación y contrato (2.10), no tiene maqueta que consultar.

- Sitio desplegado: <https://rodlozano.github.io/academia-frontend/>
- Sistema visual: [DESIGN.md](DESIGN.md)
- Inventario de páginas: [docs/inventario-pantallas.md](docs/inventario-pantallas.md)
- Maquetas de referencia: [docs/design-refs/](docs/design-refs/), una carpeta por consola
- Requisitos del backend: [academia-backend/docs/backend-requisitos.md](https://github.com/RodLozano/academia-backend/blob/main/docs/backend-requisitos.md), las 17 capacidades que piden las pantallas. Se movió allí desde este repositorio; es privado.

## Arquitectura: una PWA, cuatro lentes

AcademIA es **una sola aplicación web responsive (PWA)**, no cuatro apps. Las cuatro "consolas" son *lentes* sobre una misma espina de datos (el corpus RAG) y un mismo código base; qué ve cada persona depende de su rol.

| Consola | Quién | Papel |
|---|---|---|
| 0 · Pública | Cualquiera, sin autenticar | Captación: landing, solicitud de piloto, login, legal |
| 1 · Profesor | Docentes | Landing por defecto tras el login. Núcleo del piloto: generar, corregir, asignaturas, clases |
| 2 · Institución | Dirección / jefatura | Lo que hacen los profesores, en agregado + gobierno (usuarios, consumo) |
| 3 · Alumno | Estudiantes | Profundidad anclada al corpus de su clase y a las rúbricas de su profesor, no chat abierto |

Principios que condicionan la UI (detalle en el inventario):

- La **asignatura organiza todo**: materiales, generados, clases y evaluación cuelgan de ella.
- Los contenidos tienen **doble naturaleza**: *originales* (fuente) y *generados* (salidas de IA con linaje a sus originales).
- **Toda evaluación termina en un paso humano** ("confirmar nota").
- Las tres consolas privadas comparten una **carcasa común** (barra superior con selector de asignatura, buscador sobre el corpus, menú de usuario, avisos). La consola pública no la usa.

El **backend** (FastAPI, LangGraph, Qdrant y Ollama sobre AWS) **no forma parte de este repositorio**: vive en [academia-backend](https://github.com/RodLozano/academia-backend), que es privado. El frontend lo consumirá bajo `/api/*` en fases posteriores.

## Identidad visual

La fuente de verdad es [DESIGN.md](DESIGN.md). Resumen de lo que el código debe respetar:

- **La paleta codifica la tesis del producto.**
  - **Teal (`--primary`, `--brand`) = el sistema / la IA.** Marca, navegación, acciones normales.
  - **Naranja (`--human`) = la decisión humana.** Se usa **solo** en acciones que confirma un humano y son irreversibles: confirmar nota, publicar, validar una salida de IA. Si aparece en una pantalla sin decisión humana es un error de diseño.
  - **Neutros cálidos (stone)**, no grises fríos, para sesiones largas.
- Un solo `primary` (teal) por vista.
- **Modo oscuro obligatorio**, con sus propios valores de token.
- Tipografía: **Inter** (interfaz y datos), **serif** (Source Serif 4) solo en titulares de marketing, **mono** (JetBrains Mono) para IDs, versiones y linaje. Pesos 400 y 500 en la UI.
- Densidad cómoda-compacta: base 4px, control de 40px (32px compacto), radio 8px en controles y 12px en tarjetas, bordes finos antes que sombras.
- Sentence case en todo. Los componentes consumen **tokens**, nunca hex sueltos; un token nuevo se añade primero a DESIGN.md.

Los nombres de token de DESIGN.md coinciden con los de shadcn/ui (`--background`, `--primary`, `--ring`…), más `--brand`, `--human`, `--success` y `--warning` como extensiones propias. Viven en [src/styles/globals.css](src/styles/globals.css) y se exponen a Tailwind desde el bloque `@theme`, así que los componentes usan `bg-primary` o `text-human` y nunca un hex.

## Stack

| Capa | Elección |
|---|---|
| Build | Vite |
| UI | React + TypeScript |
| Estilos | Tailwind CSS, con los tokens de DESIGN.md cableados en el tema |
| Componentes | shadcn/ui (código propio en `src/components/ui`) |
| Rutas | React Router con `HashRouter` |
| Despliegue (ahora) | GitHub Pages, repo público, GitHub Actions + `actions/deploy-pages` |

Consecuencias del despliegue en GitHub Pages:

- `base: '/academia-frontend/'` en `vite.config`. Los assets estáticos se referencian con `import.meta.env.BASE_URL`, nunca con rutas absolutas.
- **`HashRouter`**, porque Pages no reescribe rutas: las URLs son `…/academia-frontend/#/login`. Por lo mismo, los anclajes internos de una página no pueden usar `#seccion`.
- Es un repo público: **nada de secretos, claves ni datos reales** en el código, en el historial ni en variables `VITE_*` (todo lo que empieza por `VITE_` acaba en el bundle).

## Pipeline de trabajo

El diseño viaja como contrato por toda la cadena, y cada eslabón produce lo que consume el siguiente:

```
Stitch  →  Figma  →  v0 / shadcn  →  Claude Code  →  GitHub Actions  →  GitHub Pages
(explora)  (afina)   (componentes)   (integra)       (build + deploy)   (publica)
```

- [DESIGN.md](DESIGN.md) define **tokens, no páginas**, y es lo que mantiene coherentes todas las herramientas.
- [docs/inventario-pantallas.md](docs/inventario-pantallas.md) define **qué páginas existen** y cuáles entran en v1.
- [docs/design-refs/](docs/design-refs/) contiene las maquetas, en una carpeta por consola. Son **referencia visual, no especificación**: donde una maqueta contradice DESIGN.md, gana DESIGN.md.
- Todo push a `main` construye y despliega. El objetivo de esta fase es validar esta cadena de punta a punta antes de invertir en pantallas más complejas.

## Qué hay construido

Las 40 rutas del inventario, en cuatro consolas sobre una sola carcasa. Son las
consolas 0 a 3: la consola 4 (interna, 7 rutas) vive en otro repositorio, así
que el total de 48 del inventario no se construye aquí.

El inventario cuenta **páginas**, y este README cuenta lo mismo. `app-routes.tsx`
y `routes.tsx` registran **41** elementos `<Route>` para esas 40 páginas, porque
el centro legal responde a dos patrones (`/legal` y `/legal/:seccion`) y es una
sola página. Si los dos números divergen por cualquier otro motivo, falta una
pantalla.

| Consola | Rutas | Qué cubre |
|---|---|---|
| **0 · Pública** | 7 | Portada, cómo funciona, para centros, solicitud de piloto, acceso, recuperación y el centro legal |
| **1 · Profesor** | 15 | Asignaturas, corpus con linaje, generadores, bandeja de evaluación, corrección, cuaderno, clases, fichas, coordinación y ajustes |
| **2 · Institución** | 10 | Dashboard, usuarios, consumo, políticas, analítica, alertas, coordinación, auditoría, configuración y facturación |
| **3 · Alumno** | 8 | Inicio, tutor, práctica, tareas, mapa de dominio, materiales, autoevaluación y portfolio |

Las tres consolas privadas comparten una carcasa de cuatro niveles —barra global con selector de asignatura y buscador del corpus, pestañas de módulo, secciones en la lateral y contenido—, y cada pantalla se carga en su propio trozo.

**Lo que sostiene el conjunto**, y es lo que hay que preservar al tocar cualquier cosa:

- **La regla del naranja.** Hay exactamente cuatro controles naranjas en las 40 rutas, y los cuatro son actos humanos irreversibles: confirmar nota y firmar acta, ratificar y volcar a actas, ratificar y publicar al campus, y adoptar un generado como propio. No debe haber un quinto.
- **La doble naturaleza del contenido.** El inventario filtra por ella, el detalle muestra el linaje en las dos direcciones, y el espacio de generación obliga a elegir las fuentes antes de generar.
- **La propuesta nunca se confunde con la nota.** En el cuaderno cada celda declara su procedencia; en la bandeja y en la corrección, la nota sugerida y la firmada no comparten presentación.

**Lo que no hay:**

- **Backend.** Ninguna pantalla hace una petición de red. Los datos vienen de `src/mocks/`.
- **Autenticación.** El acceso es una maqueta y las consolas privadas no están protegidas.
- **Plugin PWA** (manifest, service worker, instalabilidad).
- **Verificación visual.** El código es coherente y compila, pero ninguna pantalla se ha revisado renderizada en un navegador.

## Roadmap

1. ~~**Fase 0 — Pantallas públicas.**~~ Hecha. Validó diseño → código → despliegue.
2. ~~**Maqueta completa.**~~ Hecha: las 40 rutas navegables sobre datos inventados.
3. **Reconciliar con las maquetas.** Comparar las 16 pantallas construidas a ciegas con sus PNG de `docs/design-refs/`, y revisarlo todo en navegador.
4. **Núcleo generativo con backend.** Carcasa común, autenticación real, consola del profesor (asignaturas, ingesta de PDFs, generación con linaje, corrección con "confirmar nota") consumiendo `/api/*`. Aquí entra el plugin PWA.
5. **Migración a AWS.** Del despliegue en GitHub Pages a **S3 + CloudFront** junto al backend. Con dominio propio y reescritura de rutas desde CloudFront se podrá pasar de `HashRouter` a `BrowserRouter` y retirar `base: '/academia-frontend/'`. Esta migración es la razón para no acoplar el código a la URL de Pages.

## Estructura

```
academia-frontend/
├── .github/workflows/deploy.yml   # build + actions/deploy-pages
├── docs/                          # inventario de pantallas y maquetas
├── src/
│   ├── main.tsx                   # entrada: fuentes, HashRouter, ThemeProvider
│   ├── app/                       # tabla de rutas, con carga perezosa por pantalla
│   ├── styles/globals.css         # tokens de DESIGN.md (claro/oscuro) + tema Tailwind
│   ├── components/
│   │   ├── ui/                    # shadcn/ui: button, input, select, card…
│   │   ├── brand/                 # logo, vista previa del producto, franja de demo
│   │   ├── form/                  # campo con etiqueta/pista/error, aviso de envío
│   │   ├── site-header.tsx        # navegación de marketing
│   │   ├── site-footer.tsx        # pie completo y pie reducido
│   │   ├── scroll-to-section.tsx  # desplazamiento en la misma página
│   │   └── theme-toggle.tsx       # sistema → claro → oscuro
│   │   ├── app/                   # carcasa privada: cabecera, lateral, migas, buscador
│   │   └── skip-link.tsx          # salto al contenido
│   ├── layouts/                   # PublicLayout, AuthLayout, AppLayout
│   ├── pages/
│   │   ├── app/                   # consola de profesor
│   │   ├── centro/                # consola de institución
│   │   └── alumno/                # consola de alumno
│   ├── mocks/                     # types.ts es el contrato del backend; el resto, datos inventados
│   ├── content/                   # textos y navegación por pantalla
│   └── lib/                       # cn(), asset(), tema y contexto de asignatura
├── DESIGN.md
├── components.json                # configuración de shadcn
├── vite.config.ts
└── README.md
```

Las pantallas no llevan textos incrustados: cada una lee su contenido de `src/content/`. Cuando llegue el backend, lo que sea dato real se sustituye ahí sin tocar la maquetación.

`src/mocks/types.ts` merece atención aparte: es el **contrato que tendrá que cumplir `/api/*`**, y se queda cuando los datos inventados se borren.

## Decisiones de esta fase

Puntos donde el código se aparta de las maquetas, y por qué:

- **Sin naranja accionable.** Las maquetas pintan en naranja los botones de «solicitar piloto». En la consola pública no hay ninguna decisión humana irreversible, así que todos los controles van en teal. El naranja aparece **una sola vez**, dentro de la vista previa del producto, representando el botón de «confirmar nota», con una leyenda que enseña el código de color. Es la tesis del producto, y la landing existe para explicarla.
- **Un solo formulario de piloto.** La maqueta de la landing incrusta el formulario completo. Aquí la landing cierra con una llamada a la acción que lleva a `/piloto`, que es el formulario canónico: un único esquema de validación en lugar de dos.
- **Vista previa en vez de foto.** El hero de la maqueta usa una fotografía. El código construye un cuaderno de evaluación con los tokens, así que la vista previa sigue siendo coherente cuando cambie un token y no hay que producir una imagen.
- **Login sin carcasa.** La maqueta muestra el acceso dentro de la barra del profesor (selector de asignatura, avisos, usuario). Quien aún no ha entrado no tiene ninguna de esas cosas, así que es una tarjeta centrada.
- **Contenido de maqueta señalado.** Franja permanente en todas las pantallas, `noindex` en el HTML, aviso propio en la cabecera del documento legal y una etiqueta de «contenido de ejemplo» sobre los testimonios.
- **Secciones legales como ruta** (`/legal/ai-act`), no como ancla: con `HashRouter` el `#` de la URL lo consume el router. Por lo mismo, la navegación de la landing usa botones de desplazamiento en lugar de enlaces con `#`.

## Desarrollo

Requisitos: la versión de Node que indica [.nvmrc](.nvmrc) y npm. El CI lee ese mismo archivo, así que local y pipeline compilan siempre en la misma versión.

```bash
npm install
npm run dev        # servidor de desarrollo en /academia-frontend/
npm run build      # typecheck + build de producción en dist/
npm run preview    # sirve dist/ con el mismo base que Pages
npm run lint
npm run typecheck
```

`npm run dev` sirve en `http://localhost:5173/academia-frontend/`. Al revisar una pantalla, compararla con su PNG de `docs/design-refs/` **en claro y en oscuro**, y a 1280px y 400px de ancho.

## Publicación en GitHub Pages

El workflow se dispara con cada push a `main` y también a mano desde la pestaña Actions. Para que funcione, en el repositorio: **Settings → Pages → Source: GitHub Actions**.
