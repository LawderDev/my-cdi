import { describe, it, expect } from 'vitest'
import { getEntryPeriod } from '../getEntryPeriod'

describe('getEntryPeriod', () => {
  it('returns morning before noon', () => {
    expect(getEntryPeriod('2026-04-30T08:00:00')).toBe('morning')
    expect(getEntryPeriod('2026-04-30T11:59:00')).toBe('morning')
  })

  it('returns afternoon at noon and after', () => {
    expect(getEntryPeriod('2026-04-30T12:00:00')).toBe('afternoon')
    expect(getEntryPeriod('2026-04-30T15:30:00')).toBe('afternoon')
  })
})
