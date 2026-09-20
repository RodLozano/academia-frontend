# DESIGN.md — AcademIA

Contrato de estilo. Es la fuente de verdad del sistema visual y viaja por
todo el pipeline (Stitch → Figma → v0/shadcn → Claude Code). Define tokens,
no páginas. Versión 0.2 — propuesta, **pendiente de aprobar y de sincronizar
con la copia de `academia-admin`**.

> **Qué cambia en 0.2 y por qué.** La 0.1 dejaba el teal solo en controles y
> marca, así que en pantalla el producto se lee en blanco y negro: los
> controles son una fracción minúscula de los píxeles. Y la densidad estaba
> definida con dos cifras (alto de control y alto de fila) que no bastaban
> para decidir nada. La 0.2 añade dos cosas: **superficies teal con
> significado** y un **ritmo vertical completo**, más una paleta de gráficas
> que hasta ahora no existía. No toca la regla del naranja.

## Principio rector

Herramienta de uso diario para profesores, con pantallas densas de datos y
contexto institucional/AI Act. Prioridades, en orden: baja fatiga visual,
legibilidad en tablas, credibilidad sobria. Se evita deliberadamente el
morado-degradado genérico de "IA de consumo".

## Sistema de color con significado

La paleta no es decorativa, codifica la tesis del producto (la IA propone,
el humano decide):

- **Teal = el sistema / la IA.** Navegación, acciones normales, marca.
- **Naranja = la decisión humana.** Reservado EXCLUSIVAMENTE para el acto
  humano irreversible: "Confirmar nota", "Publicar", validar una salida de
  IA. No usar naranja para nada más, o pierde el significado.
- **Neutros cálidos (stone)** en lugar de gris frío, para sesiones largas.

### La intensidad también significa (0.2)

El teal aparecerá mucho más a partir de 0.2, y eso solo funciona si la
intensidad dice algo. Dice esto:

| Intensidad | Qué significa | Dónde |
|---|---|---|
| **Teal saturado** (`--primary`) | el sistema **actúa**: púlsalo y algo pasa | botones, enlaces, pestaña activa, foco |
| **Teal diluido** (`--brand-surface`, `--brand-line`) | **territorio** del sistema: esto lo sostiene o lo produjo la máquina | cabeceras de tabla, carcasa, estados vacíos, tintes |

Saturado se pulsa; diluido no se pulsa nunca. Una superficie teal que sea
cliqueable es un error: confunde territorio con acción.

El neutro **no cambia**. Los stone cálidos siguen siendo el fondo de todo,
porque la razón por la que se eligieron —sesiones largas, baja fatiga— no ha
cambiado. El teal entra en zonas delimitadas, no tiñendo el lienzo.

## Tokens — modo claro

Nomenclatura compatible con shadcn/ui. `--accent` se mantiene como superficie
neutra de hover (convención shadcn); los acentos de marca van en tokens
propios `--brand` y `--human`.

| Token | Valor | Uso |
|---|---|---|
| `--background` | `#FAFAF9` | Fondo de página (stone-50, cálido) |
| `--foreground` | `#1C1917` | Texto principal (stone-900) |
| `--card` | `#FFFFFF` | Superficie de tarjeta |
| `--muted` | `#F5F5F4` | Fondo sutil |
| `--muted-foreground` | `#57534E` | Texto secundario (stone-600, AA) |
| `--border` | `#E7E5E4` | Hairline (stone-200) |
| `--input` | `#E7E5E4` | Borde de campo |
| `--accent` | `#F5F5F4` | Superficie de hover neutra (NO marca) |
| `--primary` | `#0F766E` | Marca / sistema (teal-700) |
| `--primary-foreground` | `#FFFFFF` | Texto sobre primary (AA ✓ ~4.8:1) |
| `--brand` | `#0F766E` | Alias explícito de marca |
| `--human` | `#C2410C` | Acción humana (orange-700, AA ✓) |
| `--human-foreground` | `#FFFFFF` | Texto sobre human |
| `--ring` | `#0F766E` | Foco |
| `--success` | `#15803D` | green-700 |
| `--warning` | `#CA8A04` | yellow-600 (texto oscuro encima) |
| `--destructive` | `#B91C1C` | red-700 (AA ✓) |
| `--radius` | `0.5rem` | 8px por defecto |

## Tokens — modo oscuro (obligatorio)

Profesores corrigiendo de noche; no es opcional.

| Token | Valor |
|---|---|
| `--background` | `#1C1917` |
| `--foreground` | `#FAFAF9` |
| `--card` | `#292524` |
| `--muted` | `#292524` |
| `--muted-foreground` | `#A8A29E` |
| `--border` | `#44403C` |
| `--primary` | `#2DD4BF` (teal-400, texto oscuro encima) |
| `--primary-foreground` | `#06302B` |
| `--human` | `#FB923C` (orange-400, texto oscuro) |
| `--human-foreground` | `#431407` |
| `--success` | `#4ADE80` |
| `--warning` | `#FACC15` |
| `--destructive` | `#F87171` |

## Superficies teal (0.2)

Cuatro tokens nuevos. No son una paleta nueva: son el mismo teal, diluido.

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--brand-surface` | `#CCFBF1` (teal-100) | `#132E2B` | superficie de una zona del sistema |
| `--brand-surface-strong` | `#99F6E4` (teal-200) | `#17403B` | un escalón más: hover dentro de la zona |
| `--brand-line` | `#5EEAD4` (teal-300) | `#1F5A53` | hairline que delimita la zona |
| `--brand-ink` | `#0F766E` | `#2DD4BF` | texto e iconos **sobre** `--brand-surface` (= `--primary`) |

> **Corregido al aplicarlo (paso 2b).** La primera escala ponía el claro en
> teal-50 / teal-100 / teal-200. Renderizado, **en claro no se veía nada**:
> teal-50 sobre stone-50 es un tinte que el ojo no registra a tamaño de
> pantalla completa. En oscuro, en cambio, el valor equivalente funcionaba a
> la primera. La escala clara sube un peldaño entera; la oscura no se toca.
> Es asimétrica a propósito: un tinte frío sobre un fondo casi blanco necesita
> más croma que sobre uno casi negro.

Contrastes medidos sobre `--brand-surface`, los dos modos: texto principal
15,5:1 / 13,8:1 · texto secundario 6,8:1 / 5,7:1 · `--brand-ink` 4,9:1 /
7,8:1. Todos pasan AA.

**`--brand-ink` no va sobre `--brand-surface-strong`**: da 4,34:1, por debajo
del 4,5:1 de AA para texto normal. Sobre el escalón fuerte, el texto es
`--foreground`.

**Regla del hairline.** Aun subida, `--brand-surface` se distingue del fondo
por tono y no por claridad (1,08:1 en claro, 1,05:1 en oscuro). Es lo que se
quiere —un tinte, no un escalón— pero implica que en escala de grises o en
modo de alto contraste desaparece. Por eso **toda superficie teal lleva
siempre `--brand-line`**, y la zona nunca depende solo del color para leerse.

### Dónde entra el teal

| Sitio | Qué recibe |
|---|---|
| Cabecera de tabla (`thead`) | fondo `--brand-surface`, borde inferior `--brand-line`, texto `--foreground` |
| Barra lateral de secciones | fondo `--brand-surface`, borde derecho `--brand-line` |
| Fila de pestañas de módulo | fondo `--brand-surface`; la pestaña activa sigue en `--primary` con su subrayado |
| Estado vacío | superficie `--brand-surface`, borde `--brand-line`, icono `--brand-ink` |
| Bloque producido por el motor (propuesta de nota, generado, sugerencia) | superficie `--brand-surface` + `--brand-line`, igual que el naranja marca hoy los bloques de decisión humana |
| Cifra destacada de una tarjeta | ya va en `--primary`; se mantiene, **una sola por tarjeta** |
| Gráficas | ver la sección siguiente |
| Barras de progreso y medidores | relleno `--primary`, canal `--muted` |

### Dónde NO entra

- **Ningún botón nuevo.** El número de controles teal no sube por esta
  revisión; lo que sube es la superficie teal.
- Fondo de página completo, degradados, sombras de color, bordes decorativos.
- Distintivos (`Badge`) que no signifiquen "esto lo hizo o lo sostiene el
  sistema". Un estado neutro es `muted`, no teal.
- La barra global de la cabecera: se queda en `--card`, o compite con la fila
  de pestañas que tiene justo debajo.
- El naranja. La regla del naranja no la toca esta revisión: siguen siendo
  **exactamente cuatro controles naranjas** en todo el producto.

### La prueba del significado

Ante cualquier teal nuevo hay que poder terminar esta frase:

> «Esto es teal porque aquí el sistema ______.»

Si no se puede terminar, es decoración y se quita. Es la misma prueba que
protege al naranja, aplicada al otro extremo de la paleta: el día que el teal
signifique "bonito", habrá dejado de significar "el sistema".

## Color en gráficas (0.2)

La 0.1 no decía nada de gráficas, y el código acabó pintando una serie en
`--primary` y la otra en `--muted-foreground`: teal contra gris, que es
justamente el aspecto "blanco y negro" del que venimos.

Todas las paletas de aquí abajo están **validadas por cálculo** (banda de
luminosidad, suelo de croma, separación para daltonismo protan/deutan/tritan,
suelo de visión normal y contraste contra la superficie), no elegidas a ojo.

### Categórica — identidad (hasta 4 series)

Orden **fijo**. La serie 1 es siempre el teal, porque en este producto la
primera serie es casi siempre el sistema. Nunca se cicla: una quinta serie no
inventa un tono, se pliega en «otros» o se separa en gráficas pequeñas.

| Slot | Claro | Oscuro |
|---|---|---|
| `--chart-1` | `#0D9488` | `#0D9488` |
| `--chart-2` | `#4338CA` | `#6366F1` |
| `--chart-3` | `#BE185D` | `#EC4899` |
| `--chart-4` | `#0369A1` | `#0284C7` |

Condiciones que salen de la validación, y que son parte de la regla:

- **3 series pasan limpio** en los dos modos.
- **La cuarta solo en barras, líneas y áreas apiladas**, y obliga a leyenda
  más etiquetas directas: el par 3↔4 queda en la banda 6–8 ΔE para visión
  protan, que es legal únicamente con un segundo canal de codificación.
- **Nunca cuatro series en dispersión, burbujas ni mapas.** Ahí se comparan
  todos los pares contra todos, y la paleta falla. Con cuatro entidades en
  una dispersión: se facetea.

### Secuencial — magnitud (un solo tono)

| Paso | Claro | Oscuro |
|---|---|---|
| 1 (menos) | `#14B8A6` | `#115E59` |
| 2 | `#0D9488` | `#0F766E` |
| 3 | `#0F766E` | `#0D9488` |
| 4 (más) | `#134E4A` | `#2DD4BF` |

El extremo claro **no puede ser más pálido que teal-500** (`#14B8A6`): por
debajo no llega a 2:1 contra una tarjeta blanca y deja de leerse como marca.
Es el motivo por el que `--primary` en claro (teal-700, `#0F766E`) **no sirve
como color de marca de gráfica**: cae por debajo del suelo de croma y se lee
como gris. El teal de la UI y el teal de las gráficas son escalones distintos
del mismo tono, a propósito.

### Reglas que no dependen de la paleta

1. **Un solo eje.** Nunca dos escalas verticales. Dos medidas de magnitud
   distinta son dos gráficas, o una serie indexada a una base común.
2. **El color sigue a la entidad, nunca a su posición.** Filtrar series no
   repinta a las que quedan.
3. **Los colores de estado están reservados.** `--success`, `--warning` y
   `--destructive` no se reutilizan como "serie 4", y siempre van con icono y
   etiqueta, nunca solo color.
4. **El naranja en una gráfica solo si la serie *es* el acto humano** (notas
   ratificadas, tasa de modificación). Nunca como cuarto color disponible.
5. **Rejilla y ejes recesivos**: `--border` para la rejilla, sin línea de eje
   vertical, texto de eje en `--muted-foreground` a 12px.
6. **El texto lleva tokens de texto, no el color de la serie.** La marca de
   color al lado basta para la identidad.
7. **Leyenda siempre con dos o más series**, y etiqueta directa cuando son
   cuatro o menos. Una serie sola no lleva leyenda: la lleva el título.
   **En el mismo orden que las marcas**, y la leyenda se escribe en HTML, no
   con el componente de la librería de gráficas: Recharts ordena por registro
   interno —que no es el de pintado— y pinta el texto con el color de la
   serie, que es justo lo que prohíbe la regla 6.
8. **Capa de hover por defecto**: cursor con tooltip en línea y área, tooltip
   por marca en barra y punto.

## Tipografía

- **Inter** (variable) — interfaz, cuerpo y datos. Todo el producto. Elegida
  por legibilidad a 12–14px en tablas (cuaderno, inventario, consumo).
- **Serif** (p. ej. Source Serif 4) — SOLO titulares de la landing/marketing.
  No entra en la app. Da credibilidad académica sin coste de rendimiento
  dentro del producto. Opcional en v0.1.
- **Mono** (p. ej. JetBrains Mono) — IDs, referencias de linaje y versiones
  (el contenido tiene naturaleza original/generado con linaje).

### Escala (app, base 14px)

| Nivel | Tamaño / interlineado |
|---|---|
| xs | 12 / 16 |
| sm | 13 / 18 |
| base | 14 / 20 |
| lg | 16 / 24 |
| xl | 18 / 26 |
| 2xl | 20 / 28 |
| 3xl | 24 / 32 |
| prose *(0.2)* | 14 / 22 |

Dos pesos: 400 regular, 500 medio. Nada de 600/700 en UI.
La escala de marketing es aparte y mayor.

`prose` es nuevo en 0.2 y existe solo para los párrafos explicativos, que en
este producto son largos y abundantes (nota de cumplimiento, por qué una
cifra importa, qué no hace una pantalla). El mismo tamaño que `base` con dos
píxeles más de interlineado. La UI —etiquetas, celdas, controles— sigue en
`base` 14/20: ahí el interlineado extra solo separaría cosas que van juntas.

## Densidad — "cómoda-compacta" (reescrita en 0.2)

La 0.1 decía "control 40, compacto 32, fila 40". Medido en el navegador, el
producto real usa **32px en casi todos los controles** y filas de **57–61px**.
O sea: las filas ya tenían aire y los controles no, y el documento no describía
ninguna de las dos cosas. La sensación de densidad no viene del alto de fila,
viene de que todo control es compacto y de que las secciones se tocan.

Unidad base 4px; ritmo en múltiplos de 8, salvo los pasos de 12 y 20.

### Alturas de control

| Control | 0.1 | 0.2 |
|---|---|---|
| Botón y campo por defecto | 40px | **40px** (sin cambio) |
| Compacto | 32px | **36px** |
| Grande (una sola llamada a la acción por página) | 48px | 48px (sin cambio) |

Lo que de verdad cambia no es el número, es **dónde se permite el compacto**:
solo en barras de acciones y dentro de celdas de tabla. Un formulario, una
tarjeta o un estado vacío usan siempre la altura por defecto. Si una pantalla
no tiene ni barra ni tabla, no debería tener ni un control compacto.

### Filas y celdas

| Medida | 0.2 |
|---|---|
| Fila de tabla, una línea | **48px** mínimo |
| Fila de tabla con avatar o dos líneas | **56px** |
| Cabecera de tabla | **40px**, sobre `--brand-surface` |
| Relleno de celda | 12px vertical · 16px en la primera columna, 12px en el resto |

### Ritmo vertical

Seis pasos con nombre. Se usa el paso, no un número suelto.

| Paso | px | Entre qué |
|---|---|---|
| hair | 4 | icono ↔ su etiqueta |
| tight | 8 | etiqueta ↔ su control |
| item | 12 | hermanos de una lista o de una rejilla de tarjetas |
| block | 16 | titular ↔ el contenido que encabeza |
| group | 24 | campos de un formulario entre sí |
| section | **40** | secciones de una página (era 24–32) |

### Relleno

| Contenedor | 0.2 |
|---|---|
| Página | 16px por debajo de `lg`, 24px a partir de `lg` |
| Tarjeta | 20px por defecto · **24px si contiene un formulario** · 16px si es una ficha de cifra |
| Estado vacío | 32px vertical, y centrado |

### Cuánto aire gana un formulario frente a una tabla

Es la pregunta que la 0.1 dejaba en "más aire" sin cifrar. La respuesta:

| | Alto por dato |
|---|---|
| Fila de tabla | 48px |
| Fila de formulario (etiqueta 8px + control 40px + pista 6px + 24px hasta el siguiente) | **~88px** |

**Un formulario ocupa alrededor de 1,8 veces lo que una tabla por cada dato.**
Si un formulario cabe en la misma altura por fila que una tabla, está mal
maquetado. Y al revés: una tabla con 88px por fila está desperdiciando la
pantalla en la que el profesor pasa el día.

Anchos que acompañan a esa proporción:

- Formulario a una columna: **máximo 640px**. Un campo de texto a 1280px de
  ancho es ilegible y es lo que hace que un formulario parezca un panel.
- Prosa explicativa: **máximo 68 caracteres**.
- Tabla: todo el ancho disponible. Es la única cosa que lo merece.

### Presupuesto por pantalla

- Como mucho **una fila de cifras y una tabla densa** por pantalla. Si hacen
  falta dos tablas, la segunda va a una pestaña.
- Fila de cifras: **4 fichas como máximo** a partir de 1280px, 2 a partir de
  640px, 1 por debajo. Y una sola cifra destacada dentro de cada ficha.
- **Ninguna pantalla desborda en horizontal a 400px.** Una tabla ancha se
  desplaza dentro de su contenedor, y ese contenedor lleva `position:
  relative` si dentro hay algo `sr-only` (si no, el elemento absoluto se
  ancla al bloque inicial y arrastra la página entera).

## Radio y elevación

- `--radius` 8px para controles e inputs; 12px para tarjetas; full para pills.
- Preferir bordes de 0.5px sobre sombras. Máximo dos niveles de sombra
  (panel, popover). Sombras suaves, nunca glow ni degradados.

## Tokens derivados

shadcn/ui pide pares `*-foreground` y superficies que no estaban en las tablas
de arriba. No son decisiones nuevas de diseño: se deducen de la misma familia
de la que cuelgan. Se listan aquí porque ningún token puede vivir solo en el
código.

| Token | Claro | Oscuro | Se deduce de |
|---|---|---|---|
| `--card-foreground` | `#1C1917` | `#FAFAF9` | igual que `--foreground` |
| `--popover` | `#FFFFFF` | `#292524` | igual que `--card` |
| `--popover-foreground` | `#1C1917` | `#FAFAF9` | igual que `--foreground` |
| `--secondary` | `#F5F5F4` | `#292524` | igual que `--muted` |
| `--secondary-foreground` | `#1C1917` | `#FAFAF9` | igual que `--foreground` |
| `--accent-foreground` | `#1C1917` | `#FAFAF9` | igual que `--foreground` |
| `--brand-foreground` | `#FFFFFF` | `#06302B` | igual que `--primary-foreground` |
| `--success-foreground` | `#FFFFFF` | `#052E16` | par legible sobre `--success` |
| `--warning-foreground` | `#1C1917` | `#1C1917` | «texto oscuro encima» |
| `--destructive-foreground` | `#FFFFFF` | `#450A0A` | par legible sobre `--destructive` |
| `--input` (oscuro) | — | `#44403C` | igual que `--border` |
| `--ring` (oscuro) | — | `#2DD4BF` | igual que `--primary` |
| `--brand` (oscuro) | — | `#2DD4BF` | igual que `--primary` |
| `--overlay` | `rgb(28 25 23 / 0.45)` | `rgb(0 0 0 / 0.65)` | velo de modal; en oscuro el fondo ya es stone-900, así que un velo de ese tono no oscurecería nada |
| `--accent` (oscuro) | — | `#44403C` | stone-700: en oscuro, `--muted` coincide con `--card` y el hover sería invisible |

Consecuencia de `--warning-foreground`: el amarillo solo se usa **lleno**, con
texto oscuro encima. Un `--warning` translúcido con ese texto no contrasta en
modo oscuro.

## Peso en marketing

La regla de dos pesos (400 y 500) rige la **UI**. Los titulares de marketing en
serif usan **600**, y solo ellos: es la única excepción, va atada a la clase
`.font-display` y no entra en la app.

## Reglas de uso

1. Un solo primary (teal) por vista.
2. El naranja `--human` no se usa por estética: solo marca el paso humano.
   Si aparece en una pantalla sin decisión humana, es un error de diseño.
3. Texto sobre color: usar el tono 800/900 de la misma familia, nunca negro
   plano (salvo los pares *-foreground definidos arriba).
4. Sentence case en todo (botones, títulos, etiquetas).
5. Todo token nuevo se añade aquí primero; los componentes solo consumen
   tokens, no hex sueltos.
6. *(0.2)* Teal saturado se pulsa; teal diluido no se pulsa nunca. Una
   superficie `--brand-surface` cliqueable es un error.
7. *(0.2)* Toda superficie teal va acompañada de `--brand-line`. El tinte
   solo no basta para delimitar una zona.
8. *(0.2)* Un teal nuevo tiene que poder completar «esto es teal porque aquí
   el sistema ___». Si no, es decoración y se quita.
9. *(0.2)* Las opacidades sueltas (`bg-primary/5`, `border-primary/30`) se
   sustituyen por los tokens de superficie. Una opacidad se comporta distinto
   sobre stone cálido que sobre la tarjeta oscura, y era la vía por la que el
   teal entraba sin decidirlo nadie.
10. *(0.2)* Ninguna paleta de gráfica se elige a ojo: se valida (banda de
    luminosidad, croma, daltonismo, contraste) antes de entrar aquí.
