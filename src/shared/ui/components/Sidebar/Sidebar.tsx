import { useSidebar } from './hooks/useSidebar'
import { SidebarView } from './components/SidebarView'

export function Sidebar() {
  const { navButtonNodes, onSettingsClick } = useSidebar()

  return <SidebarView navButtonNodes={navButtonNodes} onSettingsClick={onSettingsClick} />
}
