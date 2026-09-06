import { useSidebar } from './hooks/useSidebar'
import { SidebarPresenter } from './presenters/SidebarPresenter'

export function Sidebar() {
  const { navButtonNodes, isSettingsActive, onSettingsClick } = useSidebar()

  return (
    <SidebarPresenter
      navButtonNodes={navButtonNodes}
      isSettingsActive={isSettingsActive}
      onSettingsClick={onSettingsClick}
    />
  )
}
