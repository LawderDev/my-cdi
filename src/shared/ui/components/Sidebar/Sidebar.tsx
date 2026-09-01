import { useSidebar } from './hooks/useSidebar'
import { SidebarView } from './components/SidebarView'

const SETTINGS_PLACEHOLDER_HASH = '#'

export function Sidebar() {
  const { navItems, activePath } = useSidebar()

  function handleSettingsClick() {
    window.location.hash = SETTINGS_PLACEHOLDER_HASH
  }

  return (
    <SidebarView
      navItems={navItems}
      activePath={activePath}
      onSettingsClick={handleSettingsClick}
    />
  )
}
