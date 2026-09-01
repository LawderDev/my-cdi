import { describe, it, expect } from 'vitest'
import dayjs from 'dayjs'
import { buildCalendarMonth } from '../buildCalendarMonth'

const EMPTY_VISITS = new Set<string>()
const DAYS_PER_WEEK = 7
const DAYS_IN_APRIL = 30

describe('buildCalendarMonth', () => {
  it('returns total cells as a multiple of 7', () => {
    const cells = buildCalendarMonth(
      dayjs('2026-04-15'),
      dayjs('2026-04-30'),
      '2026-04-15',
      EMPTY_VISITS
    )
    expect(cells.length % DAYS_PER_WEEK).toBe(0)
  })

  it('marks today and selected cells correctly', () => {
    const cells = buildCalendarMonth(
      dayjs('2026-04-15'),
      dayjs('2026-04-30'),
      '2026-04-15',
      EMPTY_VISITS
    )
    const today = cells.find((cell) => cell.isToday)
    const selected = cells.find((cell) => cell.isSelected)
    expect(today?.iso).toBe('2026-04-30')
    expect(selected?.iso).toBe('2026-04-15')
  })

  it('marks days with visits using the provided set', () => {
    const visits = new Set(['2026-04-10', '2026-04-20'])
    const cells = buildCalendarMonth(dayjs('2026-04-01'), dayjs('2026-04-30'), '2026-04-01', visits)
    const visitCells = cells.filter((cell) => cell.hasVisits)
    expect(visitCells.map((cell) => cell.iso).sort()).toEqual(['2026-04-10', '2026-04-20'])
  })

  it('pads previous month when first-of-month is mid-week (April 2026 starts on Wednesday)', () => {
    // April 1 2026 is a Wednesday => 2 leading days from March (Mon=Mar 30, Tue=Mar 31)
    const cells = buildCalendarMonth(
      dayjs('2026-04-01'),
      dayjs('2026-04-30'),
      '2026-04-01',
      EMPTY_VISITS
    )
    const firstCell = cells[0]
    const secondCell = cells[1]
    expect(firstCell?.iso).toBe('2026-03-30')
    expect(firstCell?.isCurrentMonth).toBe(false)
    expect(secondCell?.iso).toBe('2026-03-31')
  })

  it('has no leading padding when first-of-month is a Monday (June 2026 starts on Monday)', () => {
    const cells = buildCalendarMonth(
      dayjs('2026-06-01'),
      dayjs('2026-06-15'),
      '2026-06-01',
      EMPTY_VISITS
    )
    expect(cells[0]?.iso).toBe('2026-06-01')
    expect(cells[0]?.isCurrentMonth).toBe(true)
  })

  it('handles a Sunday-first month (February 2026 starts on Sunday)', () => {
    // Feb 1 2026 is a Sunday => 6 leading days from January
    const cells = buildCalendarMonth(
      dayjs('2026-02-01'),
      dayjs('2026-02-28'),
      '2026-02-01',
      EMPTY_VISITS
    )
    expect(cells[0]?.iso).toBe('2026-01-26')
    expect(cells[0]?.isCurrentMonth).toBe(false)
  })

  it('flags out-of-month cells with isCurrentMonth=false', () => {
    const cells = buildCalendarMonth(
      dayjs('2026-04-15'),
      dayjs('2026-04-30'),
      '2026-04-15',
      EMPTY_VISITS
    )
    const insideCount = cells.filter((cell) => cell.isCurrentMonth).length
    expect(insideCount).toBe(DAYS_IN_APRIL)
  })
})
