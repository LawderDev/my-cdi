import { ROUTES } from '@lib/routes'

const TITLE_KEY_JOURNAL = 'page.journal.title'
const TITLE_KEY_STATISTICS = 'page.statistics.title'
const TITLE_KEY_STUDENTS = 'page.students.title'

const SUBTITLE_KEY_JOURNAL = 'page.journal.subtitle'
const SUBTITLE_KEY_STATISTICS = 'page.statistics.subtitle'
const SUBTITLE_KEY_STUDENTS = 'page.students.subtitle'

export interface PageTitleKeys {
  titleKey: string
  subtitleKey: string
}

export function resolvePageTitle(pathname: string): PageTitleKeys {
  if (pathname.startsWith(ROUTES.STATISTICS)) {
    return { titleKey: TITLE_KEY_STATISTICS, subtitleKey: SUBTITLE_KEY_STATISTICS }
  }
  if (pathname.startsWith(ROUTES.STUDENTS)) {
    return { titleKey: TITLE_KEY_STUDENTS, subtitleKey: SUBTITLE_KEY_STUDENTS }
  }
  return { titleKey: TITLE_KEY_JOURNAL, subtitleKey: SUBTITLE_KEY_JOURNAL }
}
