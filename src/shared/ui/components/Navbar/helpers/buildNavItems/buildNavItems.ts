import { ROUTES } from '@lib/routes'
import type { NavItem } from '../../types/NavItem'

const NAV_LABEL_KEY_JOURNAL = 'nav.journal'
const NAV_LABEL_KEY_STUDENTS = 'nav.students'
const NAV_LABEL_KEY_STATISTICS = 'nav.statistics'

export function buildNavItems(): NavItem[] {
  return [
    { path: ROUTES.JOURNAL, labelKey: NAV_LABEL_KEY_JOURNAL },
    { path: ROUTES.STUDENTS, labelKey: NAV_LABEL_KEY_STUDENTS },
    { path: ROUTES.STATISTICS, labelKey: NAV_LABEL_KEY_STATISTICS }
  ]
}
