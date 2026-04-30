import { describe, it, expect, vi } from 'vitest'
import { ActivityType } from '@types'
import { cleanupOldFrequentations, CLEANUP_RETENTION_YEARS } from '../cleanupOldFrequentations'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationWithStudentEntity } from '@frequentation/entities/frequentation'

const EXTRA_YEARS = 1

function createMockGateway(overrides: Partial<FrequentationGateway> = {}): FrequentationGateway {
  return {
    create: vi.fn(),
    getById: vi.fn(),
    getAll: vi.fn().mockResolvedValue([]),
    getByStudentId: vi.fn(),
    getByDateRange: vi.fn(),
    update: vi.fn(),
    delete: vi.fn().mockResolvedValue(true),
    deleteByStudentId: vi.fn(),
    count: vi.fn().mockResolvedValue(0),
    ...overrides
  }
}

function buildOldEntry(): FrequentationWithStudentEntity {
  const old = new Date()
  old.setFullYear(old.getFullYear() - (CLEANUP_RETENTION_YEARS + EXTRA_YEARS))
  return {
    id: 1,
    startsAt: old.toISOString(),
    activity: ActivityType.WORK,
    studentId: 1,
    studentNom: 'Dupont',
    studentPrenom: 'Jean',
    studentClasse: '6ème A',
    studentIne: '12345678X',
    createdAt: old.toISOString(),
    updatedAt: old.toISOString()
  }
}

describe('cleanupOldFrequentations', () => {
  it('returns deletedCount of 0 when no entries', async () => {
    const gateway = createMockGateway()
    const result = await cleanupOldFrequentations(gateway)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.deletedCount).toBe(0)
    }
  })

  it('deletes entries older than retention years', async () => {
    const oldEntry = buildOldEntry()
    const gateway = createMockGateway({
      getAll: vi.fn().mockResolvedValue([oldEntry])
    })
    const result = await cleanupOldFrequentations(gateway)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.deletedCount).toBe(1)
    }
    expect(gateway.delete).toHaveBeenCalledWith(oldEntry.id)
  })

  it('does not delete recent entries', async () => {
    const recentEntry: FrequentationWithStudentEntity = {
      ...buildOldEntry(),
      startsAt: new Date().toISOString()
    }
    const gateway = createMockGateway({
      getAll: vi.fn().mockResolvedValue([recentEntry])
    })
    const result = await cleanupOldFrequentations(gateway)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.deletedCount).toBe(0)
    }
    expect(gateway.delete).not.toHaveBeenCalled()
  })

  it('returns error when gateway throws', async () => {
    const gateway = createMockGateway({
      getAll: vi.fn().mockRejectedValue(new Error('DB error'))
    })
    const result = await cleanupOldFrequentations(gateway)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('DB error')
    }
  })

  it('exposes CLEANUP_RETENTION_YEARS constant equal to expected value', () => {
    const EXPECTED_RETENTION_YEARS = 2
    expect(CLEANUP_RETENTION_YEARS).toBe(EXPECTED_RETENTION_YEARS)
  })
})
