import { ROUTES } from '@lib/routes'

const TITLE_KEY_JOURNAL = 'page.journal.title'
const TITLE_KEY_STATISTICS = 'page.statistics.title'
const TITLE_KEY_STUDENTS = 'page.students.title'
const TITLE_KEY_SETTINGS = 'page.settings.title'

const SUBTITLE_KEY_JOURNAL = 'page.journal.subtitle'
const SUBTITLE_KEY_STATISTICS = 'page.statistics.subtitle'
const SUBTITLE_KEY_STUDENTS = 'page.students.subtitle'
const SUBTITLE_KEY_SETTINGS = 'page.settings.subtitle'

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
  if (pathname.startsWith(ROUTES.SETTINGS)) {
    return { titleKey: TITLE_KEY_SETTINGS, subtitleKey: SUBTITLE_KEY_SETTINGS }
  }
  return { titleKey: TITLE_KEY_JOURNAL, subtitleKey: SUBTITLE_KEY_JOURNAL }
}
