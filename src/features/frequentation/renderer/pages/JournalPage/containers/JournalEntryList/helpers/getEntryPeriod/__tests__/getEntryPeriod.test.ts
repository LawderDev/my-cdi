import { describe, it, expect } from 'vitest'
import { getEntryPeriod } from '../getEntryPeriod'

describe('getEntryPeriod', () => {
  it('returns matin before noon', () => {
    expect(getEntryPeriod('2026-04-30T08:00:00')).toBe('matin')
    expect(getEntryPeriod('2026-04-30T11:59:00')).toBe('matin')
  })

  it('returns aprem at noon and after', () => {
    expect(getEntryPeriod('2026-04-30T12:00:00')).toBe('aprem')
    expect(getEntryPeriod('2026-04-30T15:30:00')).toBe('aprem')
  })
})
