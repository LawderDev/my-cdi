import { describe, it, expect, vi } from 'vitest'
import { ActivityType } from '@types'
import { deleteFrequentation } from '../deleteFrequentation'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'
import { ErrorCode } from '@lib/errors'

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
    delete: vi.fn().mockResolvedValue(true),
    deleteByStudentId: vi.fn().mockResolvedValue(0),
    count: vi.fn().mockResolvedValue(0),
    ...overrides
  }
}

describe('deleteFrequentation', () => {
  it('deletes a frequentation successfully', async () => {
    const gateway = createMockGateway()
    const result = await deleteFrequentation(gateway, 1)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toBe(true)
    }
  })

  it('returns error when frequentation not found', async () => {
    const gateway = createMockGateway({
      getById: vi.fn().mockResolvedValue(null)
    })
    const result = await deleteFrequentation(gateway, NONEXISTENT_ID)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.code).toBe(ErrorCode.FREQUENTATION_NOT_FOUND)
    }
  })

  it('returns error when gateway delete fails', async () => {
    const gateway = createMockGateway({
      delete: vi.fn().mockRejectedValue(new Error('Delete failed'))
    })
    const result = await deleteFrequentation(gateway, 1)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('Delete failed')
    }
  })
})
