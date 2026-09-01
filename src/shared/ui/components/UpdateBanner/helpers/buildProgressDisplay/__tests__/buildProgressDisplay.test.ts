import { describe, it, expect } from 'vitest'
import { buildProgressDisplay } from '../buildProgressDisplay'

const PROGRESS_PERCENT_42 = 42.4
const PROGRESS_PERCENT_OVER_MAX = 120
const PERCENT_MAX = 100

describe('buildProgressDisplay', () => {
  it('returns clamped fill percent and integer display', () => {
    expect(buildProgressDisplay(PROGRESS_PERCENT_42)).toEqual({
      fillPercent: PROGRESS_PERCENT_42,
      percentDisplay: '42'
    })
  })

  it('falls back to zero when no percent is provided', () => {
    expect(buildProgressDisplay()).toEqual({ fillPercent: 0, percentDisplay: '0' })
  })

  it('clamps the fill percent to 100', () => {
    expect(buildProgressDisplay(PROGRESS_PERCENT_OVER_MAX).fillPercent).toBe(PERCENT_MAX)
  })
})
