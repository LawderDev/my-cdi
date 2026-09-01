import { describe, it, expect, vi } from 'vitest'
import { updateStudent } from '../updateStudent'
import type { StudentGateway } from '@student/gateways/student'
import type { StudentEntity } from '@student/entities/student'
import { ErrorCode } from '@lib/errors'

const STUDENT_ID = 1
const OTHER_STUDENT_ID = 2
const NONEXISTENT_ID = 9999

const UPDATED_ENTITY: StudentEntity = {
  id: STUDENT_ID,
  nom: 'Martin',
  prenom: 'Jean',
  classe: '3B',
  ine: '0123456789A',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-06-01T00:00:00.000Z'
}

function createMockGateway(overrides: Partial<StudentGateway> = {}): StudentGateway {
  return {
    create: vi.fn().mockResolvedValue(null),
    getById: vi.fn().mockResolvedValue(UPDATED_ENTITY),
    getAll: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockResolvedValue(UPDATED_ENTITY),
    delete: vi.fn().mockResolvedValue(false),
    getByClass: vi.fn().mockResolvedValue([]),
    getByIds: vi.fn().mockResolvedValue([]),
    ...overrides
  }
}

describe('updateStudent', () => {
  it('updates a student and returns success response', async () => {
    const gateway = createMockGateway({
      update: vi.fn().mockResolvedValue(UPDATED_ENTITY)
    })
    const result = await updateStudent({ gateway }, { id: STUDENT_ID, dto: { nom: 'Martin' } })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.nom).toBe('Martin')
      expect(result.data.fullName).toBe('Jean Martin')
    }
  })

  it('returns error when student not found', async () => {
    const gateway = createMockGateway({
      getById: vi.fn().mockResolvedValue(null)
    })
    const result = await updateStudent({ gateway }, { id: NONEXISTENT_ID, dto: { nom: 'Martin' } })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.code).toBe(ErrorCode.STUDENT_NOT_FOUND)
    }
  })

  it('rejects duplicate INE from another student', async () => {
    const gateway = createMockGateway({
      getAll: vi.fn().mockResolvedValue([
        {
          id: OTHER_STUDENT_ID,
          nom: 'Autre',
          prenom: 'Eleve',
          classe: '3A',
          ine: 'DUPLICATE_INE',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z'
        }
      ])
    })
    const result = await updateStudent(
      { gateway },
      { id: STUDENT_ID, dto: { ine: 'DUPLICATE_INE' } }
    )
    expect(result.success).toBe(false)
  })

  it('rejects empty string values', async () => {
    const gateway = createMockGateway()
    const result = await updateStudent({ gateway }, { id: STUDENT_ID, dto: { nom: '   ' } })
    expect(result.success).toBe(false)
  })
})
