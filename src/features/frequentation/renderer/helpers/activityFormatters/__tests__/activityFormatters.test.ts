import { describe, it, expect } from 'vitest'
import { getActivityColor, getActivityIcon } from '../activityFormatters'
import { ActivityType } from '@types'

describe('getActivityColor', () => {
  it('returns a color for each ActivityType', () => {
    expect(getActivityColor(ActivityType.WORK)).toBeTypeOf('string')
    expect(getActivityColor(ActivityType.READING)).toBeTypeOf('string')
    expect(getActivityColor(ActivityType.COMPUTER)).toBeTypeOf('string')
    expect(getActivityColor(ActivityType.RELAXATION)).toBeTypeOf('string')
    expect(getActivityColor(ActivityType.OTHER)).toBeTypeOf('string')
  })

  it('returns distinct colors for distinct activities', () => {
    const seen = new Set([
      getActivityColor(ActivityType.WORK),
      getActivityColor(ActivityType.READING),
      getActivityColor(ActivityType.COMPUTER),
      getActivityColor(ActivityType.RELAXATION),
      getActivityColor(ActivityType.OTHER)
    ])
    const expectedDistinct = 5
    expect(seen.size).toBe(expectedDistinct)
  })
})

describe('getActivityIcon', () => {
  it('returns an icon name for each ActivityType', () => {
    expect(getActivityIcon(ActivityType.WORK)).toBeTypeOf('string')
    expect(getActivityIcon(ActivityType.READING)).toBeTypeOf('string')
  })
})
