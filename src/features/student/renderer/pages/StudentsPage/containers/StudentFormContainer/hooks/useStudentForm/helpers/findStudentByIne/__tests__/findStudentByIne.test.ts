import { describe, it, expect } from 'vitest'
import { findStudentByIne } from '../findStudentByIne'
import type { StudentViewModel } from '@student/types'

const CREATED_AT = '2026-01-01T00:00:00.000Z'

function buildStudent(overrides: Partial<StudentViewModel>): StudentViewModel {
  const defaults: StudentViewModel = {
    id: 1,
    nom: 'Dupont',
    prenom: 'Jean',
    classe: '6A',
    ine: '123456789AB',
    fullName: 'Jean DUPONT',
    displayName: 'Jean Dupont',
    classLabel: '6A',
    createdAt: CREATED_AT,
    updatedAt: CREATED_AT
  }
  return { ...defaults, ...overrides }
}

const STUDENTS = [
  buildStudent({ id: 1, ine: '123456789AB' }),
  buildStudent({ id: 2, ine: '987654321CD', nom: 'Martin' })
]

describe('findStudentByIne', () => {
  it('finds a student by exact INE', () => {
    expect(findStudentByIne(STUDENTS, '123456789AB')?.id).toBe(1)
  })

  it('ignores case and surrounding whitespace', () => {
    expect(findStudentByIne(STUDENTS, '  123456789ab ')?.id).toBe(1)
  })

  it('returns null for an empty INE', () => {
    expect(findStudentByIne(STUDENTS, '   ')).toBeNull()
  })

  it('returns null when no student matches', () => {
    expect(findStudentByIne(STUDENTS, '000000000ZZ')).toBeNull()
  })

  it('excludes the given student id', () => {
    expect(findStudentByIne(STUDENTS, '123456789AB', 1)).toBeNull()
    expect(findStudentByIne(STUDENTS, '123456789AB', 2)?.id).toBe(1)
  })
})
