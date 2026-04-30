import { describe, it, expect, vi } from 'vitest'
import { ActivityType } from '@types'
import { listFrequentations } from '../listFrequentations'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationWithStudentEntity } from '@frequentation/entities/frequentation'
import type { DateRangeDto } from '@frequentation-shared'

const EXPECTED_TWO = 2
const SECOND_ID = 2

const ENTITY_ONE: FrequentationWithStudentEntity = {
  id: 1,
  startsAt: '2026-01-15T09:00:00.000Z',
  activity: ActivityType.WORK,
  studentId: 1,
  studentNom: 'Dupont',
  studentPrenom: 'Jean',
  studentClasse: '6ème A',
  studentIne: '12345678X',
  createdAt: '2026-01-15T09:00:00.000Z',
  updatedAt: '2026-01-15T09:00:00.000Z'
}

const ENTITY_TWO: FrequentationWithStudentEntity = {
  id: SECOND_ID,
  startsAt: '2026-01-15T10:00:00.000Z',
  activity: ActivityType.READING,
  studentId: SECOND_ID,
  studentNom: 'Martin',
  studentPrenom: 'Marie',
  studentClasse: '5ème B',
  studentIne: '87654321Y',
  createdAt: '2026-01-15T10:00:00.000Z',
  updatedAt: '2026-01-15T10:00:00.000Z'
}

const ENTITIES: FrequentationWithStudentEntity[] = [ENTITY_ONE, ENTITY_TWO]

function createMockGateway(overrides: Partial<FrequentationGateway> = {}): FrequentationGateway {
  return {
    create: vi.fn().mockResolvedValue(ENTITY_ONE),
    getById: vi.fn().mockResolvedValue(null),
    getAll: vi.fn().mockResolvedValue(ENTITIES),
    getByStudentId: vi.fn().mockResolvedValue([ENTITY_ONE]),
    getByDateRange: vi.fn().mockResolvedValue([ENTITY_ONE]),
    update: vi.fn().mockResolvedValue(null),
    delete: vi.fn().mockResolvedValue(false),
    deleteByStudentId: vi.fn().mockResolvedValue(0),
    count: vi.fn().mockResolvedValue(ENTITIES.length),
    ...overrides
  }
}

describe('listFrequentations', () => {
  it('returns all frequentations when no filters', async () => {
    const gateway = createMockGateway()
    const result = await listFrequentations(gateway)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toHaveLength(EXPECTED_TWO)
    }
  })

  it('returns frequentations filtered by studentId', async () => {
    const gateway = createMockGateway()
    const result = await listFrequentations(gateway, { studentId: 1 })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toHaveLength(1)
    }
    expect(gateway.getByStudentId).toHaveBeenCalledWith(1)
  })

  it('returns frequentations filtered by date range', async () => {
    const gateway = createMockGateway()
    const dateRange: DateRangeDto = { startDate: '2026-01-15', endDate: '2026-01-15' }
    const result = await listFrequentations(gateway, { dateRange })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toHaveLength(1)
    }
    expect(gateway.getByDateRange).toHaveBeenCalledWith('2026-01-15', '2026-01-15')
  })

  it('returns empty array when no results', async () => {
    const gateway = createMockGateway({
      getAll: vi.fn().mockResolvedValue([])
    })
    const result = await listFrequentations(gateway)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toHaveLength(0)
    }
  })

  it('returns error when gateway throws', async () => {
    const gateway = createMockGateway({
      getAll: vi.fn().mockRejectedValue(new Error('DB error'))
    })
    const result = await listFrequentations(gateway)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('DB error')
    }
  })
})
