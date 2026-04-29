import { describe, it, expect } from 'vitest'
import { ActivityType, ACTIVITY_LABELS } from '../index'

describe('ActivityType', () => {
  it('has all expected values', () => {
    expect(ActivityType.WORK).toBe('work')
    expect(ActivityType.READING).toBe('reading')
    expect(ActivityType.COMPUTER).toBe('computer')
    expect(ActivityType.RELAXATION).toBe('relaxation')
    expect(ActivityType.OTHER).toBe('other')
  })

  it('has labels for all activity types', () => {
    const activityTypes = Object.values(ActivityType) as ActivityType[]
    for (const type of activityTypes) {
      expect(ACTIVITY_LABELS[type]).toBeDefined()
    }
  })
})
