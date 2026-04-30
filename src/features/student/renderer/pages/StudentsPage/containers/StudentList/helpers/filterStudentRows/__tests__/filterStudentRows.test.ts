import { describe, it, expect } from 'vitest'
import { filterStudentRows } from '../filterStudentRows'
import type { StudentViewModel } from '@student/types'

const ID_FIRST = 1
const ID_SECOND = 2
const ID_THIRD = 3

const TOTAL_STUDENTS = 3
const COUNT_3EME = 2
const COUNT_SINGLE = 1
const COUNT_NONE = 0

const STUDENTS: StudentViewModel[] = [
  {
    id: ID_FIRST,
    nom: 'Dupont',
    prenom: 'Jean',
    classe: '3ème A',
    ine: '111A',
    fullName: 'Jean Dupont',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    displayName: 'Jean Dupont',
    classLabel: '3ème A'
  },
  {
    id: ID_SECOND,
    nom: 'Martin',
    prenom: 'Marie',
    classe: '3ème B',
    ine: '222B',
    fullName: 'Marie Martin',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    displayName: 'Marie Martin',
    classLabel: '3ème B'
  },
  {
    id: ID_THIRD,
    nom: 'Bernard',
    prenom: 'Luc',
    classe: '4ème C',
    ine: '333C',
    fullName: 'Luc Bernard',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    displayName: 'Luc Bernard',
    classLabel: '4ème C'
  }
]

describe('filterStudentRows', () => {
  it('returns all students when search term is empty', () => {
    expect(filterStudentRows(STUDENTS, '')).toHaveLength(TOTAL_STUDENTS)
  })

  it('filters by last name (nom)', () => {
    const result = filterStudentRows(STUDENTS, 'dup')
    expect(result).toHaveLength(COUNT_SINGLE)
    expect(result[0]?.nom).toBe('Dupont')
  })

  it('filters by first name (prenom)', () => {
    const result = filterStudentRows(STUDENTS, 'mar')
    expect(result).toHaveLength(COUNT_SINGLE)
    expect(result[0]?.prenom).toBe('Marie')
  })

  it('filters by class (classe)', () => {
    const result = filterStudentRows(STUDENTS, '3ème')
    expect(result).toHaveLength(COUNT_3EME)
  })

  it('filters by INE', () => {
    const result = filterStudentRows(STUDENTS, '333')
    expect(result).toHaveLength(COUNT_SINGLE)
    expect(result[0]?.ine).toBe('333C')
  })

  it('is case-insensitive', () => {
    expect(filterStudentRows(STUDENTS, 'DUPONT')).toHaveLength(COUNT_SINGLE)
    expect(filterStudentRows(STUDENTS, 'dupont')).toHaveLength(COUNT_SINGLE)
  })

  it('trims search term', () => {
    expect(filterStudentRows(STUDENTS, '  dup  ')).toHaveLength(COUNT_SINGLE)
  })

  it('returns empty for no matches', () => {
    expect(filterStudentRows(STUDENTS, 'zzzzz')).toHaveLength(COUNT_NONE)
  })
})
