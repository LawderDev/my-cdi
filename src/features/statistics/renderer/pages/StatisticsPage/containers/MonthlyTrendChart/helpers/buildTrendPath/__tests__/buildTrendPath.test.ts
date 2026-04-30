import { describe, it, expect } from 'vitest'
import { buildTrendPath } from '../buildTrendPath'

const FIVE = 5
const TEN = 10
const FIFTEEN = 15
const EXPECTED_THREE_LABELS = 3

describe('buildTrendPath', () => {
  it('returns an empty path when there are no daily counts', () => {
    const trend = buildTrendPath([])
    expect(trend.path).toBe('')
    expect(trend.dots).toHaveLength(0)
  })

  it('produces one dot per daily count, sorted by date', () => {
    const trend = buildTrendPath([
      { date: '2026-04-03', count: FIFTEEN },
      { date: '2026-04-01', count: FIVE },
      { date: '2026-04-02', count: TEN }
    ])
    expect(trend.dots).toHaveLength(EXPECTED_THREE_LABELS)
    // dots should be ordered by ascending date, so first dot has the smallest cx
    expect(trend.dots[0]?.cx).toBeLessThan(trend.dots[1]?.cx ?? 0)
    expect(trend.dots[1]?.cx).toBeLessThan(trend.dots[2]?.cx ?? 0)
  })

  it('starts the line path with M', () => {
    const trend = buildTrendPath([
      { date: '2026-04-01', count: FIVE },
      { date: '2026-04-02', count: TEN }
    ])
    expect(trend.path.startsWith('M')).toBe(true)
  })

  it('builds an area path that closes with Z', () => {
    const trend = buildTrendPath([
      { date: '2026-04-01', count: FIVE },
      { date: '2026-04-02', count: TEN }
    ])
    expect(trend.areaPath.endsWith('Z')).toBe(true)
  })

  it('produces three Y axis labels', () => {
    const trend = buildTrendPath([
      { date: '2026-04-01', count: FIVE },
      { date: '2026-04-02', count: TEN }
    ])
    expect(trend.yLabels).toHaveLength(EXPECTED_THREE_LABELS)
  })
})
