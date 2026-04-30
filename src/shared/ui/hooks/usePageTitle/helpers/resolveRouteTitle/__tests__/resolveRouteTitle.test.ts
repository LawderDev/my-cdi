import { describe, it, expect } from 'vitest'
import { ROUTES } from '@lib/routes'
import { resolveRouteTitle } from '../resolveRouteTitle'

describe('resolveRouteTitle', () => {
  it('returns the journal title key for the journal path', () => {
    expect(resolveRouteTitle(ROUTES.JOURNAL)).toBe('pageTitles.journal')
  })

  it('returns the students title key for the students path', () => {
    expect(resolveRouteTitle(ROUTES.STUDENTS)).toBe('pageTitles.students')
  })

  it('returns the statistics title key for the statistics path', () => {
    expect(resolveRouteTitle(ROUTES.STATISTICS)).toBe('pageTitles.statistics')
  })

  it('returns the default title key for unknown paths', () => {
    expect(resolveRouteTitle('/unknown-path')).toBe('pageTitles.default')
  })
})
