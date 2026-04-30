import { describe, it, expect } from 'vitest'
import {
  createFrequentationBatchSchema,
  MAX_BATCH_SIZE
} from '../createFrequentationBatchSchema'

const OVER_MAX_SIZE = MAX_BATCH_SIZE + 1

describe('createFrequentationBatchSchema', () => {
  it('validates a valid batch', () => {
    const input = {
      frequentations: [
        { startsAt: '2026-01-15T09:00:00.000Z', activity: 'work', studentId: 1 },
        { startsAt: '2026-01-15T10:00:00.000Z', activity: 'reading', studentId: 2 }
      ]
    }
    const result = createFrequentationBatchSchema.safeParse(input)
    expect(result.success).toBe(true)
  })

  it('rejects empty batch', () => {
    const result = createFrequentationBatchSchema.safeParse({
      frequentations: []
    })
    expect(result.success).toBe(false)
  })

  it('rejects batch with too many items', () => {
    const items = Array.from({ length: OVER_MAX_SIZE }, (_, i) => ({
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: i + 1
    }))
    const result = createFrequentationBatchSchema.safeParse({
      frequentations: items
    })
    expect(result.success).toBe(false)
  })

  it('rejects item with invalid activity', () => {
    const result = createFrequentationBatchSchema.safeParse({
      frequentations: [{ startsAt: '2026-01-15T09:00:00.000Z', activity: 'invalid', studentId: 1 }]
    })
    expect(result.success).toBe(false)
  })
})
