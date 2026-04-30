import { useSidebar } from './hooks/useSidebar'
import { SidebarView } from './components/SidebarView'

const SETTINGS_PLACEHOLDER_HASH = '#'

export function Sidebar() {
  const { items, activePath, navigate } = useSidebar()

  function handleSettingsClick() {
    window.location.hash = SETTINGS_PLACEHOLDER_HASH
  }

  return (
    <SidebarView
      items={items}
      activePath={activePath}
      onNavigate={navigate}
      onSettingsClick={handleSettingsClick}
    />
  )
}
