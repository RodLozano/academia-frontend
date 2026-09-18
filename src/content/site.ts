/**
 * Textos compartidos por las pantallas públicas. Contenido provisional de
 * maqueta: al llegar el backend, lo que sea dato real sale de /api/*.
 *
 * `to` ausente = destino que aún no existe en esta fase. Se pinta como texto
 * inerte en lugar de como enlace roto.
 */

export type NavItem = {
  label: string
  /** Ruta del router. */
  to?: string
  /** Id de sección de la landing, para desplazamiento en la misma página. */
  section?: string
}

export const landingNav: NavItem[] = [
  { label: 'Propuesta docente', section: 'propuesta' },
  { label: 'Gobernanza y EU AI Act', section: 'gobernanza' },
  { label: 'Rigor vs. IA genérica', section: 'diferenciacion' },
  { label: 'Casos en cátedra', section: 'casos' },
]

export const footerColumns: { title: string; items: NavItem[] }[] = [
  {
    title: 'Plataforma',
    items: [
      { label: 'Cuaderno de evaluación' },
      { label: 'Generador de rúbricas' },
      { label: 'Trazabilidad y linaje' },
      { label: 'Conector LTI Moodle/Canvas' },
    ],
  },
  {
    title: 'Gobernanza',
    items: [
      { label: 'Declaración EU AI Act', to: '/legal/ai-act' },
      { label: 'Encargo de tratamiento (DPA)', to: '/legal/dpa' },
      { label: 'Aislamiento y no-entrenamiento', to: '/legal/privacidad' },
      { label: 'Auditoría criptográfica' },
    ],
  },
  {
    title: 'Institucional',
    items: [
      { label: 'Solicitar piloto 2025/26', to: '/piloto' },
      { label: 'Acceso al campus', to: '/login' },
      { label: 'Centro legal y gobernanza', to: '/legal' },
      { label: 'Contacto académico directo' },
    ],
  },
]

export const footerLegalLinks: NavItem[] = [
  { label: 'Aviso legal', to: '/legal/terminos' },
  { label: 'Política de privacidad', to: '/legal/privacidad' },
  { label: 'Encargo de tratamiento', to: '/legal/dpa' },
  { label: 'EU AI Act', to: '/legal/ai-act' },
]

export const complianceClaim =
  'Conforme con el marco europeo EU AI Act (categoría educación / alto riesgo)'

export const platformVersion = 'v2.4 · kernel pedagógico soberano'
