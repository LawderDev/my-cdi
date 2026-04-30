import { describe, it, expect } from 'vitest'
import { activityTypeSchema } from '../activityTypeSchema'
import { ActivityType } from '@types'

const NON_STRING_VALUE = 42

describe('activityTypeSchema', () => {
  it('accepts every ActivityType value', () => {
    for (const value of Object.values(ActivityType)) {
      expect(activityTypeSchema.safeParse(value).success).toBe(true)
    }
  })

  it('rejects unknown strings', () => {
    expect(activityTypeSchema.safeParse('UNKNOWN').success).toBe(false)
  })

  it('rejects non-string values', () => {
    expect(activityTypeSchema.safeParse(NON_STRING_VALUE).success).toBe(false)
  })
})
