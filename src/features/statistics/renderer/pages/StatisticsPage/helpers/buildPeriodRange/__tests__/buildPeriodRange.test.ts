import { describe, it, expect } from 'vitest'
import { buildPeriodRange } from '../buildPeriodRange'

describe('buildPeriodRange', () => {
  it('returns the Monday-Sunday week containing today', () => {
    // Wednesday 2026-04-29
    const today = new Date('2026-04-29T12:00:00.000Z')
    const range = buildPeriodRange('week', today)
    expect(range).toEqual({ startDate: '2026-04-27', endDate: '2026-05-03' })
  })

  it('handles Sunday by treating it as the last day of the week', () => {
    const today = new Date('2026-05-03T12:00:00.000Z')
    const range = buildPeriodRange('week', today)
    expect(range).toEqual({ startDate: '2026-04-27', endDate: '2026-05-03' })
  })

  it('returns the full current month for "month"', () => {
    const today = new Date('2026-04-15T12:00:00.000Z')
    const range = buildPeriodRange('month', today)
    expect(range).toEqual({ startDate: '2026-04-01', endDate: '2026-04-30' })
  })

  it('returns the current calendar quarter', () => {
    const today = new Date('2026-05-15T12:00:00.000Z')
    const range = buildPeriodRange('quarter', today)
    expect(range).toEqual({ startDate: '2026-04-01', endDate: '2026-06-30' })
  })

  it('returns first semester when month is January-June', () => {
    const today = new Date('2026-03-15T12:00:00.000Z')
    const range = buildPeriodRange('semester', today)
    expect(range).toEqual({ startDate: '2026-01-01', endDate: '2026-06-30' })
  })

  it('returns second semester when month is July-December', () => {
    const today = new Date('2026-09-15T12:00:00.000Z')
    const range = buildPeriodRange('semester', today)
    expect(range).toEqual({ startDate: '2026-07-01', endDate: '2026-12-31' })
  })

  it('returns the full current year for "year"', () => {
    const today = new Date('2026-04-15T12:00:00.000Z')
    const range = buildPeriodRange('year', today)
    expect(range).toEqual({ startDate: '2026-01-01', endDate: '2026-12-31' })
  })

  it('falls back to the current month for "custom"', () => {
    const today = new Date('2026-04-15T12:00:00.000Z')
    const range = buildPeriodRange('custom', today)
    expect(range).toEqual({ startDate: '2026-04-01', endDate: '2026-04-30' })
  })
})
