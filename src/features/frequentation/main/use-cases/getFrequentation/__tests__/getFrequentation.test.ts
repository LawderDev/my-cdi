import { describe, it, expect, vi } from 'vitest'
import { ActivityType } from '@types'
import { getFrequentation } from '../getFrequentation'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'

const NONEXISTENT_ID = 999

const EXISTING_ENTITY: FrequentationEntity = {
  id: 1,
  startsAt: '2026-01-15T09:00:00.000Z',
  activity: ActivityType.WORK,
  studentId: 1,
  createdAt: '2026-01-15T09:00:00.000Z',
  updatedAt: '2026-01-15T09:00:00.000Z'
}

function createMockGateway(overrides: Partial<FrequentationGateway> = {}): FrequentationGateway {
  return {
    create: vi.fn().mockResolvedValue(EXISTING_ENTITY),
    getById: vi.fn().mockResolvedValue(EXISTING_ENTITY),
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

describe('getFrequentation', () => {
  it('returns frequentation when found', async () => {
    const gateway = createMockGateway()
    const result = await getFrequentation(gateway, 1)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.id).toBe(1)
    }
  })

  it('returns error when not found', async () => {
    const gateway = createMockGateway({
      getById: vi.fn().mockResolvedValue(null)
    })
    const result = await getFrequentation(gateway, NONEXISTENT_ID)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('not found')
    }
  })

  it('returns error when gateway throws', async () => {
    const gateway = createMockGateway({
      getById: vi.fn().mockRejectedValue(new Error('DB error'))
    })
    const result = await getFrequentation(gateway, 1)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('DB error')
    }
  })
})
