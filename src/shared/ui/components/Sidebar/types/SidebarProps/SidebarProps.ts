export interface SidebarItem {
  path: string
  iconName: string
  labelKey: string
}

export interface SidebarNavItem {
  path: string
  iconName: string
  labelKey: string
  onClick: () => void
}
