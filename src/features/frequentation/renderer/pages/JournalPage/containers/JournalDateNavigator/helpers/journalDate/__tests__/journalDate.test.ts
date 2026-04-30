import { describe, it, expect } from 'vitest'
import { formatJournalDate, previousDayIso, nextDayIso, todayIso, isoToDayjs } from '../journalDate'

describe('formatJournalDate', () => {
  it('produces a long French label', () => {
    const result = formatJournalDate('2026-04-01')
    expect(result).toMatch(/avril/i)
    expect(result).toContain('2026')
  })
})

describe('previousDayIso', () => {
  it('returns the previous ISO day', () => {
    expect(previousDayIso('2026-04-02')).toBe('2026-04-01')
  })
})

describe('nextDayIso', () => {
  it('returns the next ISO day', () => {
    expect(nextDayIso('2026-04-01')).toBe('2026-04-02')
  })
})

describe('todayIso', () => {
  it('returns an ISO-formatted today', () => {
    expect(todayIso()).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})

describe('isoToDayjs', () => {
  it('parses ISO date string', () => {
    expect(isoToDayjs('2026-04-01').isValid()).toBe(true)
  })
})
