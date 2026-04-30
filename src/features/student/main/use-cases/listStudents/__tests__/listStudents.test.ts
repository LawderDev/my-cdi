import { describe, it, expect, vi } from 'vitest'
import { listStudents } from '../listStudents'
import type { StudentGateway } from '@student/gateways/student'
import type { StudentEntity } from '@student/entities/student'

const STUDENT_A_ID = 1
const STUDENT_B_ID = 2
const EXPECTED_TWO = 2
const EXPECTED_ONE = 1

const STUDENT_A: StudentEntity = {
  id: STUDENT_A_ID,
  nom: 'Dupont',
  prenom: 'Jean',
  classe: '3B',
  ine: 'INE1',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z'
}

const STUDENT_B: StudentEntity = {
  id: STUDENT_B_ID,
  nom: 'Martin',
  prenom: 'Pierre',
  classe: '3A',
  ine: 'INE2',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z'
}

function createMockGateway(overrides: Partial<StudentGateway> = {}): StudentGateway {
  return {
    create: vi.fn().mockResolvedValue(STUDENT_A),
    getById: vi.fn().mockResolvedValue(STUDENT_A),
    getAll: vi.fn().mockResolvedValue([STUDENT_A, STUDENT_B]),
    update: vi.fn().mockResolvedValue(STUDENT_A),
    delete: vi.fn().mockResolvedValue(true),
    getByClass: vi.fn().mockResolvedValue([STUDENT_A]),
    getByIds: vi.fn().mockResolvedValue([]),
    ...overrides
  }
}

describe('listStudents', () => {
  it('returns all students when no filter', async () => {
    const gateway = createMockGateway()
    const result = await listStudents({ gateway }, {})
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.students).toHaveLength(EXPECTED_TWO)
    }
  })

  it('filters by class', async () => {
    const gateway = createMockGateway()
    const result = await listStudents({ gateway }, { classe: '3B' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.students).toHaveLength(EXPECTED_ONE)
      expect(result.data.students[0]?.classe).toBe('3B')
    }
    expect(gateway.getByClass).toHaveBeenCalledWith('3B')
  })

  it('returns empty list when no students', async () => {
    const gateway = createMockGateway({
      getAll: vi.fn().mockResolvedValue([])
    })
    const result = await listStudents({ gateway }, {})
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.students).toHaveLength(0)
    }
  })

  it('includes fullName in response', async () => {
    const gateway = createMockGateway()
    const result = await listStudents({ gateway }, {})
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.students[0]?.fullName).toBe('Jean Dupont')
    }
  })
})
