import { describe, it, expect } from 'vitest'
import { ROUTES } from '@lib/routes'
import { resolvePageTitle } from '../resolvePageTitle'

describe('resolvePageTitle', () => {
  it('returns journal keys for the journal route', () => {
    expect(resolvePageTitle(ROUTES.JOURNAL)).toEqual({
      titleKey: 'page.journal.title',
      subtitleKey: 'page.journal.subtitle'
    })
  })

  it('returns statistics keys for a statistics sub-route', () => {
    expect(resolvePageTitle(`${ROUTES.STATISTICS}/2026`)).toEqual({
      titleKey: 'page.statistics.title',
      subtitleKey: 'page.statistics.subtitle'
    })
  })

  it('returns students keys for a students sub-route', () => {
    expect(resolvePageTitle(`${ROUTES.STUDENTS}/123`)).toEqual({
      titleKey: 'page.students.title',
      subtitleKey: 'page.students.subtitle'
    })
  })

  it('falls back to journal keys for an unknown path', () => {
    expect(resolvePageTitle('/some-unknown-path')).toEqual({
      titleKey: 'page.journal.title',
      subtitleKey: 'page.journal.subtitle'
    })
  })
})
