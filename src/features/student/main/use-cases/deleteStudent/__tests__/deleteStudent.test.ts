import { describe, it, expect, vi } from 'vitest'
import { deleteStudent } from '../deleteStudent'
import type { StudentGateway } from '@student/gateways/student'
import type { StudentEntity } from '@student/entities/student'

const STUDENT_ID = 1
const NONEXISTENT_ID = 9999

const SAMPLE_ENTITY: StudentEntity = {
  id: STUDENT_ID,
  nom: 'Dupont',
  prenom: 'Jean',
  classe: '3B',
  ine: '0123456789A',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z'
}

function createMockGateway(overrides: Partial<StudentGateway> = {}): StudentGateway {
  return {
    create: vi.fn().mockResolvedValue(SAMPLE_ENTITY),
    getById: vi.fn().mockResolvedValue(SAMPLE_ENTITY),
    getAll: vi.fn().mockResolvedValue([SAMPLE_ENTITY]),
    update: vi.fn().mockResolvedValue(SAMPLE_ENTITY),
    delete: vi.fn().mockResolvedValue(true),
    getByClass: vi.fn().mockResolvedValue([]),
    getByIds: vi.fn().mockResolvedValue([]),
    ...overrides
  }
}

describe('deleteStudent', () => {
  it('deletes a student by id', async () => {
    const gateway = createMockGateway()
    const result = await deleteStudent({ gateway }, { id: STUDENT_ID })
    expect(result.success).toBe(true)
    expect(gateway.delete).toHaveBeenCalledWith(STUDENT_ID)
  })

  it('returns error when student not found', async () => {
    const gateway = createMockGateway({
      getById: vi.fn().mockResolvedValue(null),
      delete: vi.fn().mockResolvedValue(false)
    })
    const result = await deleteStudent({ gateway }, { id: NONEXISTENT_ID })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('introuvable')
    }
  })
})
