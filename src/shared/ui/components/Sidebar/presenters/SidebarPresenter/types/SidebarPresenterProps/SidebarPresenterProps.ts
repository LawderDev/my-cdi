import type { ReactNode } from 'react'

export interface SidebarPresenterProps {
  navButtonNodes: ReactNode[]
  isSettingsActive: boolean
  onSettingsClick: () => void
}
