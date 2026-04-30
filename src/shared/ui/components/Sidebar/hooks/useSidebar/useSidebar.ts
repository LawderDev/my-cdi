import { useLocation, useNavigate } from 'react-router'
import { ROUTES } from '@lib/routes'
import { buildSidebarItems } from '../../helpers/buildSidebarItems'
import type { SidebarItem } from '../../types/SidebarProps'

export interface UseSidebarReturn {
  items: SidebarItem[]
  activePath: string
  navigate: (path: string) => void
}

function resolveActivePath(pathname: string): string {
  if (pathname.startsWith(ROUTES.STATISTICS)) {
    return ROUTES.STATISTICS
  }
  if (pathname.startsWith(ROUTES.STUDENTS)) {
    return ROUTES.STUDENTS
  }
  return ROUTES.JOURNAL
}

export function useSidebar(): UseSidebarReturn {
  const reactNavigate = useNavigate()
  const location = useLocation()
  const items = buildSidebarItems()
  const activePath = resolveActivePath(location.pathname)

  function navigate(path: string) {
    reactNavigate(path)
  }

  return { items, activePath, navigate }
}
