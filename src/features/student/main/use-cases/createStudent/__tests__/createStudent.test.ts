import { describe, it, expect, vi } from 'vitest'
import { createStudent } from '../createStudent'
import type { StudentGateway } from '@student/gateways/student'
import type { StudentEntity } from '@student/entities/student'

const SAMPLE_ENTITY: StudentEntity = {
  id: 1,
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
    getById: vi.fn().mockResolvedValue(null),
    getAll: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockResolvedValue(null),
    delete: vi.fn().mockResolvedValue(false),
    getByClass: vi.fn().mockResolvedValue([]),
    getByIds: vi.fn().mockResolvedValue([]),
    ...overrides
  }
}

describe('createStudent', () => {
  it('creates a student and returns success response', async () => {
    const gateway = createMockGateway()
    const result = await createStudent(
      { gateway },
      { nom: 'Dupont', prenom: 'Jean', classe: '3B', ine: '0123456789A' }
    )
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.id).toBe(1)
      expect(result.data.nom).toBe('Dupont')
      expect(result.data.fullName).toBe('Jean Dupont')
    }
  })

  it('rejects duplicate INE', async () => {
    const gateway = createMockGateway({
      getByClass: vi.fn().mockResolvedValue([]),
      getAll: vi.fn().mockResolvedValue([{ ...SAMPLE_ENTITY, ine: '0123456789A' }])
    })
    const result = await createStudent(
      { gateway },
      { nom: 'Martin', prenom: 'Pierre', classe: '3A', ine: '0123456789A' }
    )
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toBeDefined()
    }
  })

  it('rejects invalid input', async () => {
    const gateway = createMockGateway()
    const result = await createStudent(
      { gateway },
      { nom: '', prenom: 'Jean', classe: '3B', ine: '0123456789A' }
    )
    expect(result.success).toBe(false)
  })

  it('calls gateway.create with trimmed values', async () => {
    const gateway = createMockGateway()
    await createStudent(
      { gateway },
      { nom: '  Dupont  ', prenom: '  Jean  ', classe: '  3B  ', ine: '  INE1  ' }
    )
    expect(gateway.create).toHaveBeenCalledWith({
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3B',
      ine: 'INE1'
    })
  })
})
