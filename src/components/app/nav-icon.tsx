import {
  AlertTriangle,
  BookOpen,
  CalendarRange,
  Compass,
  FileSearch,
  FolderOpen,
  Network,
  Settings2,
  ShieldCheck,
  ClipboardCheck,
  ClipboardList,
  Dumbbell,
  FileQuestion,
  FolderTree,
  Gauge,
  Layers,
  LayoutPanelLeft,
  Library,
  ListChecks,
  MessageCircleQuestion,
  Presentation,
  Settings,
  Share2,
  Sparkles,
  Table2,
  Users,
  type LucideIcon,
} from 'lucide-react'

/**
 * Registro explícito de iconos de navegación. Se hace así, y no importando
 * lucide de forma dinámica, para que el bundle solo incluya los que se usan.
 */
const icons: Record<string, LucideIcon> = {
  AlertTriangle,
  BookOpen,
  CalendarRange,
  Compass,
  FileSearch,
  FolderOpen,
  Network,
  Settings2,
  ShieldCheck,
  ClipboardCheck,
  ClipboardList,
  Dumbbell,
  FileQuestion,
  FolderTree,
  Gauge,
  Layers,
  LayoutPanelLeft,
  Library,
  ListChecks,
  MessageCircleQuestion,
  Presentation,
  Settings,
  Share2,
  Sparkles,
  Table2,
  Users,
}

export function NavIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = icons[name] ?? LayoutPanelLeft
  return <Icon className={className} aria-hidden />
}
