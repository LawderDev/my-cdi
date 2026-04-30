import { useLocation, useNavigate } from 'react-router'
import { ROUTES, type RoutePath } from '@lib/routes'
import { NavbarView } from './components/NavbarView'
import { buildNavItems } from './helpers/buildNavItems'

function resolveActivePath(pathname: string): RoutePath {
  if (pathname.startsWith(ROUTES.STUDENTS)) {
    return ROUTES.STUDENTS
  }
  if (pathname.startsWith(ROUTES.STATISTICS)) {
    return ROUTES.STATISTICS
  }
  return ROUTES.JOURNAL
}

export function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const items = buildNavItems()
  const activePath = resolveActivePath(location.pathname)

  function handleNavigate(path: RoutePath) {
    navigate(path)
  }

  return <NavbarView items={items} activePath={activePath} onNavigate={handleNavigate} />
}
