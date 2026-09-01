import type { ReactNode } from 'react'

export interface SidebarPresenterProps {
  navButtonNodes: ReactNode[]
  onSettingsClick: () => void
}
