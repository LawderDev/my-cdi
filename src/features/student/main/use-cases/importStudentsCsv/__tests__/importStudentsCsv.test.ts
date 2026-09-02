import { describe, it, expect, vi } from 'vitest'
import { importStudentsCsv } from '../importStudentsCsv'
import type { StudentGateway } from '@student/gateways/student'
import type { StudentEntity } from '@student/entities/student'

const CREATED_ENTITY_ID = 1
const EXPECTED_TWO_CREATED = 2
const EXPECTED_ONE_CREATED = 1
const EXPECTED_ZERO_CREATED = 0

const CREATED_ENTITY: StudentEntity = {
  id: CREATED_ENTITY_ID,
  nom: 'Dupont',
  prenom: 'Jean',
  classe: '3B',
  ine: 'INE1',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z'
}

function createMockGateway(overrides: Partial<StudentGateway> = {}): StudentGateway {
  return {
    create: vi.fn().mockResolvedValue(CREATED_ENTITY),
    getById: vi.fn().mockResolvedValue(null),
    getAll: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockResolvedValue(null),
    delete: vi.fn().mockResolvedValue(false),
    getByClass: vi.fn().mockResolvedValue([]),
    getByIds: vi.fn().mockResolvedValue([]),
    ...overrides
  }
}

describe('importStudentsCsv', () => {
  it('imports valid CSV and returns count', async () => {
    const gateway = createMockGateway()
    const csv = `nom;prenom;classe;ine
Dupont;Jean;3B;INE1
Martin;Pierre;3A;INE2`
    const result = await importStudentsCsv({ gateway }, { csv })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.created).toBe(EXPECTED_TWO_CREATED)
      expect(result.data.errorDetails).toHaveLength(0)
    }
    expect(gateway.create).toHaveBeenCalledTimes(EXPECTED_TWO_CREATED)
  })

  it('skips rows with duplicate INE within the CSV', async () => {
    const gateway = createMockGateway()
    const csv = `nom;prenom;classe;ine
Dupont;Jean;3B;INE_DUP
Martin;Pierre;3A;INE_DUP`
    const result = await importStudentsCsv({ gateway }, { csv })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.created).toBe(EXPECTED_ONE_CREATED)
      expect(result.data.errorDetails.length).toBeGreaterThanOrEqual(EXPECTED_ONE_CREATED)
      expect(result.data.errorDetails[0]?.type).toBe('DUPLICATE_INE')
    }
  })

  it('skips rows with INE that already exists in database', async () => {
    const gateway = createMockGateway({
      getAll: vi.fn().mockResolvedValue([{ ...CREATED_ENTITY, id: 7, ine: 'EXISTING_INE' }])
    })
    const csv = `nom;prenom;classe;ine
Dupont;Jean;3B;EXISTING_INE`
    const result = await importStudentsCsv({ gateway }, { csv })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.created).toBe(EXPECTED_ZERO_CREATED)
      expect(result.data.updated).toBe(EXPECTED_ZERO_CREATED)
      const duplicateError = result.data.errorDetails[0]
      expect(duplicateError?.type).toBe('DUPLICATE_INE')
      if (duplicateError?.type === 'DUPLICATE_INE') {
        expect(duplicateError.existingName).toBe('Jean Dupont')
        expect(duplicateError.existingClasse).toBe('3B')
      }
    }
    expect(gateway.update).not.toHaveBeenCalled()
  })

  it('updates existing students when onDuplicateIne is replace', async () => {
    const gateway = createMockGateway({
      getAll: vi.fn().mockResolvedValue([{ ...CREATED_ENTITY, id: 7, ine: 'EXISTING_INE' }])
    })
    const csv = `nom;prenom;classe;ine
Dupont;Jean;3B;EXISTING_INE`
    const result = await importStudentsCsv({ gateway }, { csv, onDuplicateIne: 'replace' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.created).toBe(EXPECTED_ZERO_CREATED)
      expect(result.data.updated).toBe(EXPECTED_ONE_CREATED)
      expect(result.data.errors).toBe(EXPECTED_ZERO_CREATED)
    }
    expect(gateway.update).toHaveBeenCalledWith(7, {
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3B'
    })
    expect(gateway.create).not.toHaveBeenCalled()
  })

  it('still skips in-file duplicates when onDuplicateIne is replace', async () => {
    const gateway = createMockGateway({
      getAll: vi.fn().mockResolvedValue([])
    })
    const csv = `nom;prenom;classe;ine
Dupont;Jean;3B;INE_DUP
Martin;Pierre;3A;INE_DUP`
    const result = await importStudentsCsv({ gateway }, { csv, onDuplicateIne: 'replace' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.created).toBe(EXPECTED_ONE_CREATED)
      expect(result.data.updated).toBe(EXPECTED_ZERO_CREATED)
      expect(result.data.errorDetails[0]?.type).toBe('DUPLICATE_INE')
    }
  })

  it('returns error for malformed CSV', async () => {
    const gateway = createMockGateway()
    const csv = `nom;prenom
Dupont;Jean`
    const result = await importStudentsCsv({ gateway }, { csv })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.created).toBe(EXPECTED_ZERO_CREATED)
      expect(result.data.errorDetails[0]?.type).toBe('MISSING_COLUMNS')
    }
  })
})
