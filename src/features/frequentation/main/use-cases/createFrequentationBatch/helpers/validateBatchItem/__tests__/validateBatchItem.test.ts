import { describe, it, expect } from 'vitest'
import { ActivityType } from '@types'
import { validateBatchItem } from '../validateBatchItem'
import type { CreateFrequentationDto } from '@frequentation-shared'

const ITEM_INDEX_5 = 5

describe('validateBatchItem', () => {
  it('returns valid for a correct dto', () => {
    const dto: CreateFrequentationDto = {
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: ActivityType.WORK,
      studentId: 1
    }
    const result = validateBatchItem(dto, 0)
    expect(result.valid).toBe(true)
  })

  it('returns invalid for empty startsAt', () => {
    const dto: CreateFrequentationDto = {
      startsAt: '',
      activity: ActivityType.WORK,
      studentId: 1
    }
    const result = validateBatchItem(dto, 0)
    expect(result.valid).toBe(false)
    expect(result.error).toContain('startsAt')
  })

  it('returns invalid for non-positive studentId', () => {
    const dto: CreateFrequentationDto = {
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: ActivityType.WORK,
      studentId: 0
    }
    const result = validateBatchItem(dto, 0)
    expect(result.valid).toBe(false)
    expect(result.error).toContain('studentId')
  })

  it('includes the index in error message', () => {
    const dto: CreateFrequentationDto = {
      startsAt: '',
      activity: ActivityType.WORK,
      studentId: 1
    }
    const result = validateBatchItem(dto, ITEM_INDEX_5)
    expect(result.error).toContain('5')
  })
})
