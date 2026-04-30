import { ROUTES } from '@lib/routes'

const TITLE_KEY_JOURNAL = 'pageTitles.journal'
const TITLE_KEY_STUDENTS = 'pageTitles.students'
const TITLE_KEY_STATISTICS = 'pageTitles.statistics'
const TITLE_KEY_DEFAULT = 'pageTitles.default'

export function resolveRouteTitle(pathname: string): string {
  if (pathname.startsWith(ROUTES.STUDENTS)) {
    return TITLE_KEY_STUDENTS
  }
  if (pathname.startsWith(ROUTES.STATISTICS)) {
    return TITLE_KEY_STATISTICS
  }
  if (pathname === ROUTES.JOURNAL) {
    return TITLE_KEY_JOURNAL
  }
  return TITLE_KEY_DEFAULT
}
