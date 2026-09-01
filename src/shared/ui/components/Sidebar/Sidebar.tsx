import { useSidebar } from './hooks/useSidebar'
import { SidebarPresenter } from './components/SidebarPresenter'

export function Sidebar() {
  const { navButtonNodes, onSettingsClick } = useSidebar()

  return <SidebarPresenter navButtonNodes={navButtonNodes} onSettingsClick={onSettingsClick} />
}
