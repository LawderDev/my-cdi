import type { SidebarNavItem } from '../../../../types/SidebarProps'

export interface SidebarViewProps {
  navItems: SidebarNavItem[]
  activePath: string
  onSettingsClick: () => void
}
