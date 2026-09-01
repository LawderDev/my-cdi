import { useLocation, useNavigate } from 'react-router'
import { ROUTES } from '@lib/routes'
import { buildSidebarItems } from '../../helpers/buildSidebarItems'
import type { SidebarNavItem } from '../../types/SidebarProps'

export interface UseSidebarReturn {
  navItems: SidebarNavItem[]
  activePath: string
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
  const activePath = resolveActivePath(location.pathname)
  const navItems: SidebarNavItem[] = buildSidebarItems().map((item) => ({
    ...item,
    onClick: () => {
      reactNavigate(item.path)
    }
  }))

  return { navItems, activePath }
}
