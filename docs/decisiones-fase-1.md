# Decisiones de la fase 1 — pendientes de revisión

Registro de las decisiones tomadas **sin supervisión** al construir la carcasa y
las consolas de profesor, institución y alumno. Cada entrada dice qué se decidió
y por qué, para poder revisarlas de golpe y revertir lo que no encaje.

No entran aquí las decisiones que ya resuelven [DESIGN.md](../DESIGN.md) o el
[inventario](inventario-pantallas.md): esas no son decisiones, son lectura del
contrato. Solo lo que esos documentos no cubren.

**Cómo leer la columna «riesgo»:** alto = cambia el producto o afecta a muchas
pantallas; medio = afecta a una pantalla o a un patrón; bajo = cosmético o
reversible en un minuto.

---

## Marco que me he dado

Tres reglas para decidir cuando la maqueta y el contrato no llegan:

1. **Gana DESIGN.md.** Donde una maqueta lo contradiga, se sigue el contrato y se
   anota aquí.
2. **El naranja es un significado, no un color.** En la consola pública no había
   ninguna decisión humana irreversible, así que no había naranja accionable. En
   la consola de profesor sí la hay: DESIGN.md nombra «confirmar nota» de forma
   literal. Ahí el naranja es obligatorio, no opcional.
3. **Los datos falsos se declaran.** El repo es público. Cualquier dato inventado
   que pueda leerse como real (nombres de alumnos, calificaciones, métricas de
   centro) va acompañado de una marca visible o de nombres evidentemente de
   ejemplo.

---

## Advertencia importante sobre las 15 últimas pantallas

Solo consulté el PNG de cuatro pantallas: estructura de aplicación, inicio del
docente, corrección de entrega y cuaderno de calificaciones. **Las otras 18 las
construí sin abrir su maqueta**, desde el sistema de diseño y el inventario, a
petición expresa de priorizar volumen sobre fidelidad.

Consecuencia: la composición de esas pantallas es mía, no de la maqueta. Al
revisarlas hay que compararlas con su PNG, y es de esperar que haya
divergencias de disposición, de nomenclatura y de qué datos se destacan. Los
PNG sin consultar son los de inventario de contenidos, detalle de contenido y
linaje, generador de contenidos y rúbricas, ajustes del profesor, los dos de
institución y los cuatro de alumno.

## Pasada de revisión

Repaso del código sin escribir pantallas nuevas. Lo encontrado y corregido:

| Qué | Dónde | Gravedad |
|---|---|---|
| Un **array interpolado** en una plantilla de texto: el distintivo pintaba `[object Object],[object Object] generados`. | Detalle de asignatura | **Fallo visible** |
| **Nueve pestañas decorativas**: tres grupos de `Tabs` sin ningún panel detrás. Parecían interactivas y no hacían nada. Ahora las de corrección y la de comparación funcionan; las dos que no tenían contenido distinto se han quitado. | Corrección, inventario, detalle de contenido | **Fallo visible** |
| Un **estado muerto**: `vista` se escribía y nunca se leía, así que el conmutador «documento / motor frente a docente» era inerte. Ahora filtra la matriz y muestra solo los criterios que tocó una persona. | Detalle de contenido | **Fallo visible** |
| Una **página importaba de otra página** (`espacio-generacion` de `generar`). La configuración de los generadores se ha movido a `src/content/generadores.ts`. | Generación | Arquitectura |

Avisos de lint: de 4 a 3. Los tres que quedan son el patrón canónico de shadcn
al exportar `buttonVariants` y `badgeVariants`, y no son corregibles sin
apartarse de la convención.

## Segunda pasada: URLs y accesibilidad

| Qué | Gravedad |
|---|---|
| **Repliegue silencioso en seis páginas de detalle.** `/app/asignaturas/inventado` mostraba la primera asignatura de la lista como si fuera la pedida. Enseñar datos de otro con aspecto de correctos es peor que un error, y en un cuaderno de notas es inaceptable. Ahora hay un estado de «no encontrado» con el identificador a la vista. | **Corrección** |
| **Hooks llamados condicionalmente.** Al añadir esos guardias, uno quedó antes de los `useState` de su página. TypeScript no lo ve; revienta en cuanto navegas de un contenido válido a uno inexistente. Lo cazó el lint, que es el argumento para tenerlo en CI. | **Corrección** |
| **Faltaba el enlace de salto al contenido.** Los `<main id="contenido">` estaban puestos desde el principio pero el enlace nunca. Añadido a las tres carcasas. | Accesibilidad |
| Y al añadirlo introduje otro: con HashRouter, un `href="#contenido"` **lo consume el router**. El componente mueve el foco a mano y no toca el hash. Los `<main>` llevan `tabIndex={-1}` para poder recibirlo. | **Corrección** |
| **CI en los pull request.** Estaba acordado desde el primer corte y sin hacer. Los checks corren en los PR sin desplegar; `configure-pages`, la subida del artefacto y el trabajo de despliegue se saltan cuando el evento es un PR. | Proceso |

## La barra lateral: resuelto

Estaba anotado como hallazgo estructural sin decidir. Al releer las seis
maquetas, el patrón no es que sobre: **es mixto y tiene lógica**. Las pantallas
de navegación y resumen (inicio del docente, cuaderno) la llevan; las de trabajo
enfocado (corrección, inventario, detalle de contenido, detalle de asignatura,
espacio de generación) van a todo el ancho.

Implementado como `conLateral` en la carcasa, aplicado a esas cinco. Cuando se
oculta, el panel desplegable de secciones pasa a estar disponible en todos los
anchos, así que no se pierde navegación.

## Decisiones

| # | Ámbito | Decisión | Por qué | Riesgo |
|---|---|---|---|---|
| 1 | Carcasa | Navegación de **cuatro niveles**: barra global → pestañas de módulo → barra lateral de secciones → contenido. | Las dos referencias de profesor la muestran así, y coinciden. Además, las 15 rutas del profesor no caben en un nivel; agrupadas por módulo, sí. | **Alto** |
| 2 | Carcasa | Reparto de las 15 rutas del profesor entre los 4 módulos que nombran las maquetas. | Las maquetas dan los nombres de las pestañas pero no dicen qué ruta cuelga de cuál. El reparto es mío y está en `src/content/app-nav.ts`. | **Alto** |
| 3 | Carcasa | **Una sola** carcasa para las tres consolas; cambian persona, rótulo y módulos. | El inventario dice que las tres lentes sostienen una única espina de datos. Tres carcasas serían tres sitios donde arreglar el mismo fallo. | Medio |
| 4 | Carcasa | El selector de asignatura **no aparece** en la consola de institución. | Dirección mira el centro en agregado, no una materia. | Bajo |
| 5 | Color | Punto **naranja** en la campana de avisos. | La maqueta lo pinta así y señala «hay algo esperando tu decisión». Es el uso más discutible del naranja en todo lo que he escrito: no es un acto humano, es un aviso de que hace falta uno. Si lo consideras decorativo, va fuera. | Medio |
| 6 | Color | Distintivo **naranja** «N esperan ratificación» en las tarjetas de asignatura, y rótulo naranja «requiere criterio docente» en los avisos. | Marcan exactamente el paso humano pendiente, que es lo que DESIGN.md reserva al naranja. | Medio |
| 7 | Color | Caja **naranja** «supervisión humana» al pie de la barra lateral. | Sale así en la maqueta del inicio del docente. Es un recordatorio permanente, no una acción: mismo reparo que la fila 5. | Medio |
| 8 | Inicio docente | Barra de progreso de **dos tonos de teal** (ratificado / propuesto) sobre hueco gris, en vez de los tres colores de la maqueta. | Los tres estados son grados del mismo eje «cuánto ha pasado ya por una persona». Dos tonos del color del sistema lo dicen mejor que tres colores sin relación. | Bajo |
| 9 | Datos | Ocho alumnos, cuatro asignaturas, doce contenidos y diez entregas, con nombres ficticios y dominio `@ejemplo.edu`. | Volumen suficiente para juzgar tablas y estados vacíos sin inflar el repositorio. Al ser público, una tabla de notas con nombres se lee como un expediente real, así que la franja de demostración también sale en las pantallas privadas. | Medio |
| 10 | Rutas | Las 21 pantallas sin construir apuntan a `PendientePage`, que dice qué falta y qué PNG la especifica. | Mejor que 21 rutas en 404: la carcasa se puede recorrer completa y se ve el hueco. | Bajo |
| 11 | Carcasa | Las pestañas de módulo **no se fijan** por debajo de `lg`. | Ahí la cabecera tiene una segunda fila (buscador y selector) y el desplazamiento pegajoso no cuadraría. | Bajo |
| 13 | Corrección | La nota propuesta y la nota firmada **nunca comparten presentación**: la propuesta va en teal con el icono del motor, la firmada en texto normal. En la bandeja ocupan la misma columna pero con rótulo distinto. | Si se parecen, el docente acaba leyendo la propuesta como si fuera la nota, que es justo el riesgo que el producto existe para evitar. | Medio |
| 14 | Corrección | Firmar un acta es **revocable** en la maqueta (botón «revocar firma»). | Necesitaba un camino de vuelta para poder probar la pantalla, pero es una decisión de gobernanza que no me corresponde: si un acta firmada se puede desfirmar, y quién puede, lo dice el reglamento del centro. | **Alto** |
| 15 | Corrección | El motivo de apartarse de la propuesta es **opcional**, como en la maqueta, aunque la interfaz avisa de cuánto te apartas y de que queda en el linaje. | Obligar a justificar convertiría el criterio docente en algo que hay que defender ante la máquina, que es lo contrario de la primacía docente. Pero es discutible de cara a una auditoría. | Medio |
| 16 | Bandeja | La cola se ordena por **si reclama decisión humana**, no por fecha. Lo ratificado baja al final. | Es lo único que bloquea el cierre de un acta. | Bajo |
| 17 | Cuaderno | Las celdas sin ratificar **se muestran pero no computan** en la nota final, y la final avisa «sobre 85 %» cuando está incompleta. | Una propuesta sin firma no es una nota. Si computara, la media mentiría. | Medio |
| 18 | Cuaderno | «Ratificar y volcar a actas» está **deshabilitado** mientras quede una celda sin ratificar, con el motivo escrito debajo. | Volcar un acta a medias es el fallo más caro de la pantalla. | Medio |
| 19 | Cuaderno | Dejé dos escalas, 0–10 y cualitativa, y **quité «Pond. %»** que aparece en la maqueta. | No sé qué mostraría de distinto: los pesos ya están en las cabeceras de columna. Si tiene sentido, dime cuál. | Bajo |
| 20 | Sistema | Añadí la variante `destructive` al distintivo, para los suspensos. | Un suspenso no es un aviso ni un estado neutro. El token ya existía en DESIGN.md. | Bajo |
| 12 | Contenido | **No** he reproducido el distintivo «Motor GPT-4o / Claude 3.5» de la maqueta, ni «Turnitin» en el índice de originalidad, ni «Claude 3.5 Sonnet» como modelo en la corrección. | Nombra modelos de terceros concretos. En un sitio público se lee como una afirmación sobre la infraestructura real, y el backend de AcademIA es Ollama. Lo he dejado sin distintivo de motor. | Medio |

---

## Cosas que dejo sin decidir

Lo que considero que no me corresponde y por tanto queda a medias, señalado en el
código con un comentario:

| Ámbito | Qué falta | Por qué no lo decido |
|---|---|---|
| Nombres de los módulos | El primer módulo se llama «Cuaderno de evaluación» (viene de la maqueta), pero contiene resumen de curso, evaluaciones, calificaciones y clases. El nombre se le queda corto. | Es una decisión de producto sobre cómo se llama lo que el profesor hace a diario, no una de maquetación. |
| Alcance de las tres ambiguas | «Coordinación en versión ligera», «dashboard mínimo» y «consumo interno» del inventario. | Cada una admite desde una tabla hasta una pantalla entera. Necesito saber qué tiene que demostrar el piloto en cada caso. |
| Ficha de alumno | Si el «mapa de dominio» (competencias con nivel) se le muestra al alumno o solo al docente. El inventario lo pone en v2 para el alumno, pero los datos ya están en el modelo. | Afecta a qué ve un estudiante sobre sí mismo, que es una decisión pedagógica. |
