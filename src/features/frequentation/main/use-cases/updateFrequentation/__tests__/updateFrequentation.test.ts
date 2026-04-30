import { describe, it, expect, vi } from 'vitest'
import { ActivityType } from '@types'
import { updateFrequentation } from '../updateFrequentation'
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

const UPDATED_ENTITY: FrequentationEntity = {
  ...EXISTING_ENTITY,
  activity: ActivityType.READING,
  updatedAt: '2026-01-15T10:00:00.000Z'
}

function createMockGateway(overrides: Partial<FrequentationGateway> = {}): FrequentationGateway {
  return {
    create: vi.fn().mockResolvedValue(EXISTING_ENTITY),
    getById: vi.fn().mockResolvedValue(EXISTING_ENTITY),
    getAll: vi.fn().mockResolvedValue([]),
    getByStudentId: vi.fn().mockResolvedValue([]),
    getByDateRange: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockResolvedValue(UPDATED_ENTITY),
    delete: vi.fn().mockResolvedValue(false),
    deleteByStudentId: vi.fn().mockResolvedValue(0),
    count: vi.fn().mockResolvedValue(0),
    ...overrides
  }
}

describe('updateFrequentation', () => {
  it('updates a frequentation activity successfully', async () => {
    const gateway = createMockGateway()
    const result = await updateFrequentation(gateway, 1, { activity: ActivityType.READING })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.activity).toBe('reading')
    }
  })

  it('returns error when frequentation not found', async () => {
    const gateway = createMockGateway({
      getById: vi.fn().mockResolvedValue(null)
    })
    const result = await updateFrequentation(gateway, NONEXISTENT_ID, {
      activity: ActivityType.READING
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('introuvable')
    }
  })

  it('validates updated fields', async () => {
    const gateway = createMockGateway()
    const result = await updateFrequentation(gateway, 1, { studentId: 0 })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('élève')
    }
  })

  it('returns error when gateway update fails', async () => {
    const gateway = createMockGateway({
      update: vi.fn().mockRejectedValue(new Error('Update failed'))
    })
    const result = await updateFrequentation(gateway, 1, { activity: ActivityType.READING })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('Update failed')
    }
  })
})
