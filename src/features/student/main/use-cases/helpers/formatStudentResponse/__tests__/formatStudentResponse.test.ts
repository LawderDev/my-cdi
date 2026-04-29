import { describe, it, expect } from 'vitest'
import { formatStudentResponse } from '../formatStudentResponse'
import type { StudentEntity } from '@student/entities/student'

describe('formatStudentResponse', () => {
  it('maps entity to StudentResponseDto', () => {
    const entity: StudentEntity = {
      id: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3B',
      ine: '0123456789A',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
    const dto = formatStudentResponse(entity)
    expect(dto.id).toBe(1)
    expect(dto.nom).toBe('Dupont')
    expect(dto.prenom).toBe('Jean')
    expect(dto.classe).toBe('3B')
    expect(dto.ine).toBe('0123456789A')
    expect(dto.fullName).toBe('Jean Dupont')
    expect(dto.createdAt).toBe('2024-01-01T00:00:00.000Z')
    expect(dto.updatedAt).toBe('2024-01-01T00:00:00.000Z')
  })
})
