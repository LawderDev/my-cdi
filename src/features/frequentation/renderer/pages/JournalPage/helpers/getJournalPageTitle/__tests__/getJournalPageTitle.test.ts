import { describe, it, expect } from 'vitest'
import { getJournalPageTitle } from '../getJournalPageTitle'

const SEVEN = 7

describe('getJournalPageTitle', () => {
  it('returns base title when count is zero', () => {
    expect(getJournalPageTitle('Journal', 0)).toBe('Journal')
  })

  it('appends count when greater than zero', () => {
    expect(getJournalPageTitle('Journal', SEVEN)).toBe('Journal (7)')
  })
})
