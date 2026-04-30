import { describe, it, expect, vi } from 'vitest'
import { ActivityType } from '@types'
import { createFrequentationBatch } from '../createFrequentationBatch'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'

const VALID_ENTITY: FrequentationEntity = {
  id: 1,
  startsAt: '2026-01-15T09:00:00.000Z',
  activity: ActivityType.WORK,
  studentId: 1,
  createdAt: '2026-01-15T09:00:00.000Z',
  updatedAt: '2026-01-15T09:00:00.000Z'
}

function createMockGateway(overrides: Partial<FrequentationGateway> = {}): FrequentationGateway {
  return {
    create: vi.fn().mockResolvedValue(VALID_ENTITY),
    getById: vi.fn().mockResolvedValue(null),
    getAll: vi.fn().mockResolvedValue([]),
    getByStudentId: vi.fn().mockResolvedValue([]),
    getByDateRange: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockResolvedValue(null),
    delete: vi.fn().mockResolvedValue(false),
    deleteByStudentId: vi.fn().mockResolvedValue(0),
    count: vi.fn().mockResolvedValue(0),
    ...overrides
  }
}

describe('createFrequentationBatch', () => {
  it('creates all frequentations in a valid batch', async () => {
    const gateway = createMockGateway()
    const result = await createFrequentationBatch(gateway, {
      frequentations: [
        { startsAt: '2026-01-15T09:00:00.000Z', activity: ActivityType.WORK, studentId: 1 },
        { startsAt: '2026-01-15T10:00:00.000Z', activity: ActivityType.READING, studentId: 2 }
      ]
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.created).toHaveLength(2)
      expect(result.data.errors).toHaveLength(0)
    }
  })

  it('rejects an empty batch', async () => {
    const gateway = createMockGateway()
    const result = await createFrequentationBatch(gateway, {
      frequentations: []
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('frequentations')
    }
  })

  it('collects errors from gateway failures while creating valid items', async () => {
    let callCount = 0
    const gateway = createMockGateway({
      create: vi.fn().mockImplementation(() => {
        callCount += 1
        if (callCount === 1) {
          return Promise.resolve(VALID_ENTITY)
        }
        return Promise.reject(new Error('DB conflict'))
      })
    })
    const result = await createFrequentationBatch(gateway, {
      frequentations: [
        { startsAt: '2026-01-15T09:00:00.000Z', activity: ActivityType.WORK, studentId: 1 },
        { startsAt: '2026-01-15T10:00:00.000Z', activity: ActivityType.WORK, studentId: 2 }
      ]
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.created).toHaveLength(1)
      expect(result.data.errors).toHaveLength(1)
      expect(result.data.errors[0]?.error).toContain('DB conflict')
    }
  })
})
