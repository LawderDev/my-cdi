import { describe, it, expect, vi } from 'vitest'
import { ActivityType } from '@types'
import { createFrequentation } from '../createFrequentation'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'
import type { CreateFrequentationDto } from '@frequentation-shared'
import { ErrorCode } from '@lib/errors'

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

describe('createFrequentation', () => {
  it('creates a frequentation successfully', async () => {
    const gateway = createMockGateway()
    const result = await createFrequentation(gateway, {
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: ActivityType.WORK,
      studentId: 1
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(VALID_ENTITY)
    }
  })

  it('validates required fields', async () => {
    const gateway = createMockGateway()
    const result = await createFrequentation(gateway, {
      startsAt: '',
      activity: ActivityType.WORK,
      studentId: 1
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.code).toBe(ErrorCode.VALIDATION_ERROR)
    }
  })

  it('rejects empty activity', async () => {
    const gateway = createMockGateway()
    const dto: CreateFrequentationDto = {
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: ActivityType.WORK,
      studentId: 1
    }
    const invalidDto: CreateFrequentationDto = { ...dto, activity: ActivityType.WORK }
    Object.assign(invalidDto, { activity: '' })
    const result = await createFrequentation(gateway, invalidDto)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.code).toBe(ErrorCode.VALIDATION_ERROR)
    }
  })

  it('rejects non-positive studentId', async () => {
    const gateway = createMockGateway()
    const result = await createFrequentation(gateway, {
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: ActivityType.WORK,
      studentId: 0
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.code).toBe(ErrorCode.VALIDATION_ERROR)
    }
  })

  it('returns error when gateway throws', async () => {
    const gateway = createMockGateway({
      create: vi.fn().mockRejectedValue(new Error('DB error'))
    })
    const result = await createFrequentation(gateway, {
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: ActivityType.WORK,
      studentId: 1
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('DB error')
    }
  })
})
