import { ROUTES } from '@lib/routes'
import type { SidebarItem } from '../../types/SidebarProps'

const ICON_NAME_JOURNAL = 'edit_note'
const ICON_NAME_STATISTICS = 'bar_chart'
const ICON_NAME_STUDENTS = 'people'

const LABEL_KEY_JOURNAL = 'nav.journal'
const LABEL_KEY_STATISTICS = 'nav.statistics'
const LABEL_KEY_STUDENTS = 'nav.students'

export function buildSidebarItems(): SidebarItem[] {
  return [
    { path: ROUTES.JOURNAL, iconName: ICON_NAME_JOURNAL, labelKey: LABEL_KEY_JOURNAL },
    { path: ROUTES.STATISTICS, iconName: ICON_NAME_STATISTICS, labelKey: LABEL_KEY_STATISTICS },
    { path: ROUTES.STUDENTS, iconName: ICON_NAME_STUDENTS, labelKey: LABEL_KEY_STUDENTS }
  ]
}
