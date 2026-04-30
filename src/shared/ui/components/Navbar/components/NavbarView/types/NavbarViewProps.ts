import type { RoutePath } from '@lib/routes'
import type { NavItem } from '../../../types/NavItem'

export interface NavbarViewProps {
  items: NavItem[]
  activePath: RoutePath
  onNavigate: (path: RoutePath) => void
}
