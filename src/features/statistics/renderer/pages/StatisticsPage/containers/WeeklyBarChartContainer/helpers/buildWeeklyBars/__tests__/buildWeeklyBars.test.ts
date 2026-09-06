import { describe, it, expect } from 'vitest'
import { buildWeeklyBars } from '../buildWeeklyBars'

const EXPECTED_BARS = 7
const COUNT_FIVE = 5
const COUNT_THREE = 3
const COUNT_SEVEN = 7
const WEEKDAY_COLOR_STUB = '#112233'
const WEEKEND_COLOR_STUB = '#445566'
const BAR_COLORS = { weekday: WEEKDAY_COLOR_STUB, weekend: WEEKEND_COLOR_STUB }

describe('buildWeeklyBars', () => {
  it('returns 7 bars labelled Mon..Sun', () => {
    const bars = buildWeeklyBars([], BAR_COLORS)
    expect(bars).toHaveLength(EXPECTED_BARS)
    expect(bars.map((bar) => bar.label)).toEqual(['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'])
  })

  it('returns zero-value bars when there are no counts', () => {
    const bars = buildWeeklyBars([], BAR_COLORS)
    expect(bars.every((bar) => bar.value === 0)).toBe(true)
    expect(bars.every((bar) => bar.heightPx === 0)).toBe(true)
  })

  it('aggregates counts by ISO weekday', () => {
    // 2026-04-27 is Monday, 2026-04-29 is Wednesday
    const wednesdayIndex = 2
    const bars = buildWeeklyBars(
      [
        { date: '2026-04-27', count: COUNT_FIVE },
        { date: '2026-04-29', count: COUNT_THREE }
      ],
      BAR_COLORS
    )
    expect(bars[0]?.value).toBe(COUNT_FIVE)
    expect(bars[wednesdayIndex]?.value).toBe(COUNT_THREE)
  })

  it('treats Sunday as the last bar', () => {
    const bars = buildWeeklyBars([{ date: '2026-05-03', count: COUNT_SEVEN }], BAR_COLORS)
    expect(bars[COUNT_SEVEN - 1]?.value).toBe(COUNT_SEVEN)
  })

  it('colors weekdays with the weekday color and the weekend with the weekend color', () => {
    const bars = buildWeeklyBars([], BAR_COLORS)
    expect(bars[0]?.color).toBe(WEEKDAY_COLOR_STUB)
    expect(bars[5]?.color).toBe(WEEKEND_COLOR_STUB)
    expect(bars[6]?.color).toBe(WEEKEND_COLOR_STUB)
  })
})
