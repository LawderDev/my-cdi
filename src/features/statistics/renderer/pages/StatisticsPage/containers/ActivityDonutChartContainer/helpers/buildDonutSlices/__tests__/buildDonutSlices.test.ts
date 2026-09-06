import { describe, it, expect } from 'vitest'
import { theme } from '@ui/theme'
import { ActivityType } from '@types'
import { buildDonutSlices } from '../buildDonutSlices'

const VALUE_HALF = 5
const EXPECTED_TWO = 2

describe('buildDonutSlices', () => {
  it('returns an empty array when total count is zero', () => {
    const slices = buildDonutSlices([], theme.palette.activity)
    expect(slices).toHaveLength(0)
  })

  it('returns one slice per activity', () => {
    const slices = buildDonutSlices(
      [
        { activity: ActivityType.WORK, count: VALUE_HALF },
        { activity: ActivityType.READING, count: VALUE_HALF }
      ],
      theme.palette.activity
    )
    expect(slices).toHaveLength(EXPECTED_TWO)
    expect(slices[0]?.activity).toBe(ActivityType.WORK)
    expect(slices[1]?.activity).toBe(ActivityType.READING)
  })

  it('produces a non-empty SVG path string for each slice', () => {
    const slices = buildDonutSlices(
      [
        { activity: ActivityType.WORK, count: VALUE_HALF },
        { activity: ActivityType.READING, count: VALUE_HALF }
      ],
      theme.palette.activity
    )
    expect(slices[0]?.d.startsWith('M')).toBe(true)
    expect(slices[1]?.d.startsWith('M')).toBe(true)
  })

  it('preserves the original count as value', () => {
    const slices = buildDonutSlices(
      [{ activity: ActivityType.WORK, count: VALUE_HALF }],
      theme.palette.activity
    )
    expect(slices[0]?.value).toBe(VALUE_HALF)
  })
})
