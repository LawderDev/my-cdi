import type { SidebarItem } from '../../../types/SidebarProps'

export interface SidebarViewProps {
  items: SidebarItem[]
  activePath: string
  onNavigate: (path: string) => void
  onSettingsClick: () => void
}
