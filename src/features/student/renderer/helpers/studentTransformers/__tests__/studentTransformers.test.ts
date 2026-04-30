import { describe, it, expect } from 'vitest'
import { toViewModel, toViewModelList } from '../studentTransformers'
import type { StudentResponseDto } from '@student-shared'

const STUDENT_ID_FIRST = 1
const STUDENT_ID_SECOND = 2

const studentDtoStub: StudentResponseDto = {
  id: STUDENT_ID_FIRST,
  nom: 'Dupont',
  prenom: 'Jean',
  classe: '3ème A',
  ine: '1234567890A',
  fullName: 'Jean Dupont',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z'
}

describe('toViewModel', () => {
  it('transforms a StudentResponseDto to StudentViewModel', () => {
    const result = toViewModel(studentDtoStub)

    expect(result.id).toBe(STUDENT_ID_FIRST)
    expect(result.nom).toBe('Dupont')
    expect(result.prenom).toBe('Jean')
    expect(result.classe).toBe('3ème A')
    expect(result.ine).toBe('1234567890A')
    expect(result.displayName).toBe('Jean Dupont')
    expect(result.classLabel).toBe('3ème A')
  })

  it('handles extra whitespace in names', () => {
    const studentData: StudentResponseDto = {
      ...studentDtoStub,
      nom: '  Dupont  ',
      prenom: '  Jean  '
    }
    const result = toViewModel(studentData)

    expect(result.displayName).toBe('Jean Dupont')
  })
})

describe('toViewModelList', () => {
  it('transforms an array of DTOs', () => {
    const students: StudentResponseDto[] = [
      studentDtoStub,
      { ...studentDtoStub, id: STUDENT_ID_SECOND, nom: 'Martin', prenom: 'Marie' }
    ]
    const result = toViewModelList(students)

    expect(result).toHaveLength(students.length)
    expect(result[0]?.displayName).toBe('Jean Dupont')
    expect(result[1]?.displayName).toBe('Marie Martin')
  })

  it('returns empty array for empty input', () => {
    expect(toViewModelList([])).toEqual([])
  })
})
