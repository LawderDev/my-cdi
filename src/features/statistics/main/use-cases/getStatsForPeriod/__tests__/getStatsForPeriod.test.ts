import { describe, it, expect, vi } from 'vitest'
import { ActivityType } from '@types'
import { getStatsForPeriod } from '../getStatsForPeriod'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type {
  FrequentationEntity,
  FrequentationWithStudentEntity
} from '@frequentation/entities/frequentation'
import type { PeriodRangeDto } from '@statistics-shared'

const TWO = 2
const THREE = 3
const FOUR = 4
const FIFTY = 50

const FALLBACK_ENTITY: FrequentationEntity = {
  id: 0,
  startsAt: '2026-01-15T09:00:00.000Z',
  activity: ActivityType.WORK,
  studentId: 1,
  createdAt: '2026-01-15T09:00:00.000Z',
  updatedAt: '2026-01-15T09:00:00.000Z'
}

function makeFrequentation(
  overrides: Partial<FrequentationWithStudentEntity>
): FrequentationWithStudentEntity {
  return {
    id: 1,
    startsAt: '2026-01-15T09:00:00.000Z',
    activity: ActivityType.WORK,
    studentId: 1,
    studentNom: 'Dupont',
    studentPrenom: 'Jean',
    studentClasse: '6ème A',
    studentIne: '12345678X',
    createdAt: '2026-01-15T09:00:00.000Z',
    updatedAt: '2026-01-15T09:00:00.000Z',
    ...overrides
  }
}

function createMockFrequentationGateway(
  frequentations: FrequentationWithStudentEntity[]
): FrequentationGateway {
  return {
    create: vi.fn().mockResolvedValue(FALLBACK_ENTITY),
    getById: vi.fn().mockResolvedValue(null),
    getAll: vi.fn().mockResolvedValue(frequentations),
    getByStudentId: vi.fn().mockResolvedValue(frequentations),
    getByDateRange: vi.fn().mockResolvedValue(frequentations),
    update: vi.fn().mockResolvedValue(null),
    delete: vi.fn().mockResolvedValue(false),
    deleteByStudentId: vi.fn().mockResolvedValue(0),
    count: vi.fn().mockResolvedValue(0)
  }
}

const RANGE: PeriodRangeDto = { startDate: '2026-01-01', endDate: '2026-01-31' }

describe('getStatsForPeriod', () => {
  it('returns zero stats when no frequentations in range', async () => {
    const gateway = createMockFrequentationGateway([])

    const result = await getStatsForPeriod(gateway, RANGE)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.totalVisits).toBe(0)
      expect(result.data.averagePerDay).toBe(0)
      expect(result.data.morningRate).toBe(0)
      expect(result.data.afternoonRate).toBe(0)
      expect(result.data.dailyCounts).toHaveLength(0)
      expect(result.data.activityCounts).toHaveLength(0)
      expect(result.data.classCounts).toHaveLength(0)
    }
  })

  it('aggregates total visits and daily counts grouped by date', async () => {
    const gateway = createMockFrequentationGateway([
      makeFrequentation({ id: 1, startsAt: '2026-01-15T09:00:00.000Z' }),
      makeFrequentation({ id: TWO, startsAt: '2026-01-15T10:00:00.000Z' }),
      makeFrequentation({ id: THREE, startsAt: '2026-01-16T08:00:00.000Z' })
    ])

    const result = await getStatsForPeriod(gateway, RANGE)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.totalVisits).toBe(THREE)
      expect(result.data.dailyCounts).toEqual([
        { date: '2026-01-15', count: TWO },
        { date: '2026-01-16', count: 1 }
      ])
    }
  })

  it('aggregates activity counts by activity type', async () => {
    const gateway = createMockFrequentationGateway([
      makeFrequentation({ id: 1, activity: ActivityType.WORK }),
      makeFrequentation({ id: TWO, activity: ActivityType.WORK }),
      makeFrequentation({ id: THREE, activity: ActivityType.READING })
    ])

    const result = await getStatsForPeriod(gateway, RANGE)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.activityCounts).toContainEqual({
        activity: ActivityType.WORK,
        count: TWO
      })
      expect(result.data.activityCounts).toContainEqual({
        activity: ActivityType.READING,
        count: 1
      })
    }
  })

  it('aggregates class counts and sorts them descending', async () => {
    const gateway = createMockFrequentationGateway([
      makeFrequentation({ id: 1, studentClasse: '6ème A' }),
      makeFrequentation({ id: TWO, studentClasse: '6ème B' }),
      makeFrequentation({ id: THREE, studentClasse: '6ème B' }),
      makeFrequentation({ id: FOUR, studentClasse: '6ème B' })
    ])

    const result = await getStatsForPeriod(gateway, RANGE)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.classCounts[0]).toEqual({ classe: '6ème B', count: THREE })
      expect(result.data.classCounts[1]).toEqual({ classe: '6ème A', count: 1 })
    }
  })

  it('computes morning and afternoon rates from UTC hour', async () => {
    const gateway = createMockFrequentationGateway([
      makeFrequentation({ id: 1, startsAt: '2026-01-15T08:00:00.000Z' }),
      makeFrequentation({ id: TWO, startsAt: '2026-01-15T11:00:00.000Z' }),
      makeFrequentation({ id: THREE, startsAt: '2026-01-15T14:00:00.000Z' }),
      makeFrequentation({ id: FOUR, startsAt: '2026-01-15T16:00:00.000Z' })
    ])

    const result = await getStatsForPeriod(gateway, RANGE)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.morningRate).toBe(FIFTY)
      expect(result.data.afternoonRate).toBe(FIFTY)
    }
  })

  it('computes average per day rounded to one decimal', async () => {
    const gateway = createMockFrequentationGateway([
      makeFrequentation({ id: 1, startsAt: '2026-01-15T09:00:00.000Z' }),
      makeFrequentation({ id: TWO, startsAt: '2026-01-15T10:00:00.000Z' }),
      makeFrequentation({ id: THREE, startsAt: '2026-01-15T11:00:00.000Z' }),
      makeFrequentation({ id: FOUR, startsAt: '2026-01-16T09:00:00.000Z' })
    ])

    const result = await getStatsForPeriod(gateway, RANGE)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.averagePerDay).toBe(TWO)
    }
  })

  it('returns failure when frequentation gateway throws', async () => {
    const gateway = createMockFrequentationGateway([])
    gateway.getByDateRange = vi.fn().mockRejectedValue(new Error('DB error'))

    const result = await getStatsForPeriod(gateway, RANGE)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('DB error')
    }
  })
})
