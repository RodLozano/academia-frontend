# Inventario de páginas — 4 consolas

**Convención:** cuento **rutas** (páginas navegables con URL propia). Lo que es *modal/panel/drawer* se anota aparte y **no suma** al total. La columna **v1** marca lo que entra en el piloto (⭐ = sí; — = v2 o posterior).

**Principios que se reflejan en las páginas:** el corpus RAG es la espina compartida · **la asignatura organiza todo** (materiales, generados, clases y evaluación cuelgan de ella) · los contenidos tienen doble naturaleza —**originales** (fuente) y **generados** (salidas de IA, con linaje a sus originales)— · la consola de profesor es el *landing* por defecto · toda evaluación termina en un paso humano · la institución ve en agregado lo que hacen los profesores · el alumno gana valor por **profundidad anclada y metacognición**, no por autonomía.

---

## Consola 0 — Pública / captación (sin autenticar)

Superficie de entrada y venta. Aquí vive la propuesta de valor del one-pager y se solicita el piloto.

| # | Página | Qué es | v1 |
|---|--------|--------|----|
| 0.1 | Landing / propuesta de valor | Home comercial: profesor en el centro, control institucional, valor al alumno. | ⭐ |
| 0.2 | Solicitar piloto | Formulario de captación de centro (lead) → dispara el proceso de piloto. | ⭐ |
| 0.3 | Login | Acceso con SSO (Google/Microsoft) + credenciales. | ⭐ |
| 0.4 | Recuperación / callback SSO | Restablecer contraseña y páginas de retorno de la autenticación. | ⭐ |
| 0.5 | Legal | Privacidad, términos, DPA y nota de cumplimiento AI Act (un hub con secciones). | ⭐ |
| 0.6 | Producto / cómo funciona | Página de marketing con el detalle funcional. | — |
| 0.7 | Para centros / precios | Modelo de licencias y canal institucional. | — |

*Modales/paneles:* selector de idioma; aviso de cookies.
**Total: 7 rutas (5 en v1).**

---

## Consola 1 — Profesor (landing por defecto)

Núcleo del piloto: aquí se prueba el foso. Va **completa** en v1.

| # | Página | Qué es | v1 |
|---|--------|--------|----|
| 1.1 | Inicio del docente | Panel de arranque: accesos a generar, corregir, clases y avisos. | ⭐ |
| 1.2 | Asignaturas | Hub que organiza el trabajo por asignatura del docente. | ⭐ |
| 1.3 | Asignatura (detalle) | De una asignatura cuelgan sus originales, generados, clases y evaluación. | ⭐ |
| 1.4 | Inventario de contenidos | Todo el contenido, filtrable por **naturaleza** (original/generado) y asignatura. | ⭐ |
| 1.5 | Contenido (detalle) | Visor con versiones; en los generados, **linaje a los originales** de los que salió. | ⭐ |
| 1.6 | Generar | Hub de generadores (situaciones, exámenes, rúbricas, fichas). | ⭐ |
| 1.7 | Espacio de generación | Workspace: genera desde el corpus, edita y guarda como *generado* con su linaje. | ⭐ |
| 1.8 | Evaluar (bandeja) | Cola de entregas/tareas pendientes de corregir. | ⭐ |
| 1.9 | Corrección de entrega | Corrección asistida por IA que **cierra en "confirmar nota" humano**. | ⭐ |
| 1.10 | Cuaderno / gradebook | Calificaciones consolidadas por grupo. | ⭐ |
| 1.11 | Mis clases | Lista de grupos/asignaturas del docente. | ⭐ |
| 1.12 | Clase (detalle) | Alumnado del grupo, contenidos y estado. | ⭐ |
| 1.13 | Ficha de alumno | Progreso individual y refuerzo personalizado anclado a su clase. | ⭐ |
| 1.14 | Coordinación de departamento | Compartir y secuenciar contenidos con otros docentes. | ⭐ ligero |
| 1.15 | Ajustes del profesor | Perfil, preferencias y notificaciones. | ⭐ |

*Modales/paneles:* subir/ingesta de originales (drawer); previsualización rápida; asignar tarea a un grupo.
**Total: 15 rutas (todas en v1; coordinación en versión ligera).**

---

## Consola 2 — Institución (dirección / jefatura)

La misma actividad del profesor, vista en agregado + gobierno. En v1 solo lo mínimo para que la institución "vea que controla".

| # | Página | Qué es | v1 |
|---|--------|--------|----|
| 2.1 | Dashboard de centro | KPIs de uso y actividad; punto de entrada de dirección. | ⭐ mínimo |
| 2.2 | Usuarios y roles | Alta/baja y asignación de roles (dirección, jefatura, tutor, profesor, alumno). | ⭐ |
| 2.3 | Políticas y permisos | Qué materiales y qué modelos se permiten; reglas por rol. | — |
| 2.4 | Analítica académica | Brechas de conocimiento y patrones de aprendizaje agregados. | — |
| 2.5 | Alertas tempranas | Bandeja de riesgo académico/absentismo para tutor y jefatura. | — |
| 2.6 | Coordinación de centro | Secuenciación entre cursos y departamentos; visión curricular. | — |
| 2.7 | Consumo y licencias | Uso de IA, coste de inferencia y gestión de asientos. | ⭐ interno |
| 2.8 | Trazabilidad / auditoría | Registro de acciones y linaje de contenidos (requisito AI Act). | — |
| 2.9 | Configuración del centro | Integraciones (Classroom/Moodle/gestión), SSO, datos y DPA. | — |

*Modales/paneles:* invitar usuario; exportar informe; detalle de una alerta.
**Total: 9 rutas (3 en v1: dashboard mínimo, usuarios y roles, consumo interno).**

---

## Consola 3 — Alumno (profundidad anclada, no autonomía)

Ampliada respecto a la versión mínima. El valor no está en un chat abierto (eso ya lo dan gratis ChatGPT/Gemini/Claude), sino en trabajar sobre **el corpus de su clase y las rúbricas de su profesor**, con guardarraíles y metacognición.

| # | Página | Qué aporta | v1 |
|---|--------|-----------|----|
| 3.1 | Inicio del alumno | Vista "todas mis asignaturas" (el alumno tiene varias) → al elegir una, resumen de qué hacer y avance en esa asignatura. | ⭐ |
| 3.2 | Tutor / refuerzo | Asistente *source-grounded* con pistas, no respuestas. | ⭐ |
| 3.3 | Práctica | Ejercicios generados desde el contenido de su clase, con repetición espaciada y dificultad adaptativa. | ⭐ |
| 3.4 | Mis tareas y feedback | Entregas y devoluciones del docente. | ⭐ |
| 3.5 | Mi mapa de dominio | Qué domina, qué le falta y el siguiente paso — metacognición que da agencia (no nota pública). | — |
| 3.6 | Mis materiales de clase | Acceso de lectura al corpus y a las fichas que su profesor le ha compartido. | — |
| 3.7 | Autoevaluación con rúbrica | Se autoevalúa contra la rúbrica del docente **antes de entregar**. | — |
| 3.8 | Portfolio | Colección de sus producciones a lo largo del curso. | — |

*Modales/paneles:* abrir una pista; enviar entrega.

*Agrupación por asignatura:* el alumno cursa **varias asignaturas**, así que el eje de asignatura vive en la **carcasa** (selector en la barra superior), no dentro de cada página. Se elige asignatura una vez y tutor, práctica, tareas y materiales quedan filtrados por ese contexto. El inicio (3.1) es la única página que muestra la vista global "todas mis asignaturas".
**Total: 8 rutas (4 en v1).**

---

## Resumen

| Consola | Rutas totales | Rutas en v1 |
|---------|:---:|:---:|
| 0 · Pública / captación | 7 | 5 |
| 1 · Profesor | 15 | 15 |
| 2 · Institución | 9 | 3 |
| 3 · Alumno | 8 | 4 |
| **Total** | **39** | **27** |

**La superficie del piloto (v1) son ~27 páginas**, y la consola del profesor sigue siendo el grueso (~55%) — coherente con que el piloto existe para validar el foso ahí. La consola de institución arranca casi vacía a propósito y crece en v2. El alumno gana cuerpo, pero en v1 se mantiene ceñido a lo que ancla valor (tutor, práctica y tareas); mapa de dominio, portfolio y autoevaluación esperan a v2.

**Carcasa común (no son páginas, envuelven a las tres consolas privadas):** barra superior con **selector de asignatura** (para profesor y alumno, que cursan/imparten varias), buscador sobre el corpus, menú de usuario y bandeja de avisos. Se construye en v1 porque sostiene las tres lentes sobre una sola espina de datos.
