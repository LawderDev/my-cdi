import { describe, it, expect } from 'vitest'
import dayjs from 'dayjs'
import { monthRange } from '../monthRange'

describe('monthRange', () => {
  it('returns first-of-month and last-of-month ISO strings', () => {
    const result = monthRange(dayjs('2026-04-15'))
    expect(result).toEqual({ startDate: '2026-04-01', endDate: '2026-04-30' })
  })

  it('handles February in a leap year', () => {
    const result = monthRange(dayjs('2024-02-10'))
    expect(result).toEqual({ startDate: '2024-02-01', endDate: '2024-02-29' })
  })

  it('handles February in a non-leap year', () => {
    const result = monthRange(dayjs('2025-02-10'))
    expect(result).toEqual({ startDate: '2025-02-01', endDate: '2025-02-28' })
  })

  it('handles December (31-day month)', () => {
    const result = monthRange(dayjs('2026-12-05'))
    expect(result).toEqual({ startDate: '2026-12-01', endDate: '2026-12-31' })
  })
})
