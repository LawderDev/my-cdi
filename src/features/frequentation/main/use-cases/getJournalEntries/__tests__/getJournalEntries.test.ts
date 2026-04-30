import { describe, it, expect, vi } from 'vitest'
import { ActivityType } from '@types'
import { getJournalEntries } from '../getJournalEntries'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { StudentGateway } from '@student/gateways/student'
import type {
  FrequentationWithStudentEntity,
  FrequentationEntity
} from '@frequentation/entities/frequentation'
import type { StudentEntity } from '@student/entities/student'
import type { DateRangeDto } from '@frequentation-shared'

const FALLBACK_ENTITY: FrequentationEntity = {
  id: 0,
  startsAt: '2026-01-15T09:00:00.000Z',
  activity: ActivityType.WORK,
  studentId: 1,
  createdAt: '2026-01-15T09:00:00.000Z',
  updatedAt: '2026-01-15T09:00:00.000Z'
}

const FREQUENTATION_ENTITY: FrequentationWithStudentEntity = {
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

const STUDENT_ENTITY: StudentEntity = {
  id: 1,
  nom: 'Dupont',
  prenom: 'Jean',
  classe: '6ème A',
  ine: '12345678X',
  createdAt: '2026-01-15T09:00:00.000Z',
  updatedAt: '2026-01-15T09:00:00.000Z'
}

function createMockFrequentationGateway(
  overrides: Partial<FrequentationGateway> = {}
): FrequentationGateway {
  return {
    create: vi.fn().mockResolvedValue(FALLBACK_ENTITY),
    getById: vi.fn().mockResolvedValue(null),
    getAll: vi.fn().mockResolvedValue([FREQUENTATION_ENTITY]),
    getByStudentId: vi.fn().mockResolvedValue([FREQUENTATION_ENTITY]),
    getByDateRange: vi.fn().mockResolvedValue([FREQUENTATION_ENTITY]),
    update: vi.fn().mockResolvedValue(null),
    delete: vi.fn().mockResolvedValue(false),
    deleteByStudentId: vi.fn().mockResolvedValue(0),
    count: vi.fn().mockResolvedValue(0),
    ...overrides
  }
}

function createMockStudentGateway(): StudentGateway {
  return {
    create: vi.fn().mockResolvedValue(STUDENT_ENTITY),
    getById: vi.fn().mockResolvedValue(STUDENT_ENTITY),
    getAll: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockResolvedValue(STUDENT_ENTITY),
    delete: vi.fn().mockResolvedValue(true),
    getByClass: vi.fn().mockResolvedValue([]),
    getByIds: vi.fn().mockResolvedValue([])
  }
}

describe('getJournalEntries', () => {
  it('returns journal entries for a date range', async () => {
    const frequentationGateway = createMockFrequentationGateway()
    const studentGateway = createMockStudentGateway()
    const dateRange: DateRangeDto = { startDate: '2026-01-15', endDate: '2026-01-15' }

    const result = await getJournalEntries(frequentationGateway, studentGateway, dateRange)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toHaveLength(1)
      const entry = result.data[0]
      expect(entry?.frequentation.id).toBe(1)
      expect(entry?.student.nom).toBe('Dupont')
    }
  })

  it('returns empty array when no frequentations in range', async () => {
    const frequentationGateway = createMockFrequentationGateway({
      getByDateRange: vi.fn().mockResolvedValue([])
    })
    const studentGateway = createMockStudentGateway()
    const dateRange: DateRangeDto = { startDate: '2026-01-15', endDate: '2026-01-15' }

    const result = await getJournalEntries(frequentationGateway, studentGateway, dateRange)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toHaveLength(0)
    }
  })

  it('returns error when frequentation gateway throws', async () => {
    const frequentationGateway = createMockFrequentationGateway({
      getByDateRange: vi.fn().mockRejectedValue(new Error('DB error'))
    })
    const studentGateway = createMockStudentGateway()
    const dateRange: DateRangeDto = { startDate: '2026-01-15', endDate: '2026-01-15' }

    const result = await getJournalEntries(frequentationGateway, studentGateway, dateRange)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('DB error')
    }
  })
})
