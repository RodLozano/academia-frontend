# DESIGN.md — AcademIA

Contrato de estilo. Es la fuente de verdad del sistema visual y viaja por
todo el pipeline (Stitch → Figma → v0/shadcn → Claude Code). Define tokens,
no páginas. Versión 0.1 — borrador base desde cero, pendiente de validar.

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

Dos pesos: 400 regular, 500 medio. Nada de 600/700 en UI.
La escala de marketing es aparte y mayor.

## Densidad — "cómoda-compacta"

- Unidad base 4px; ritmo en múltiplos de 8.
- Altura de control por defecto 40px; compacto 32px (barras y tablas).
- Fila de tabla 40px por defecto, 36px en modo compacto.
- Formularios con más aire que las tablas.

## Radio y elevación

- `--radius` 8px para controles e inputs; 12px para tarjetas; full para pills.
- Preferir bordes de 0.5px sobre sombras. Máximo dos niveles de sombra
  (panel, popover). Sombras suaves, nunca glow ni degradados.

## Reglas de uso

1. Un solo primary (teal) por vista.
2. El naranja `--human` no se usa por estética: solo marca el paso humano.
   Si aparece en una pantalla sin decisión humana, es un error de diseño.
3. Texto sobre color: usar el tono 800/900 de la misma familia, nunca negro
   plano (salvo los pares *-foreground definidos arriba).
4. Sentence case en todo (botones, títulos, etiquetas).
5. Todo token nuevo se añade aquí primero; los componentes solo consumen
   tokens, no hex sueltos.
