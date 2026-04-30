import { describe, it, expect } from 'vitest'
import { mapFrequentationRow, mapFrequentationWithStudentRow } from '../mapFrequentationRow'

describe('mapFrequentationRow', () => {
  it('maps a Drizzle row to FrequentationEntity', () => {
    const row = {
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1,
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    }
    const result = mapFrequentationRow(row)
    expect(result).toEqual({
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1,
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    })
  })

  it('maps a Drizzle row with student join to FrequentationWithStudentEntity', () => {
    const row = {
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1,
      studentNom: 'Dupont',
      studentPrenom: 'Jean',
      studentClasse: '6ème A',
      studentIne: '12345678X',
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    }
    const result = mapFrequentationWithStudentRow(row)
    expect(result).toEqual({
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1,
      studentNom: 'Dupont',
      studentPrenom: 'Jean',
      studentClasse: '6ème A',
      studentIne: '12345678X',
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    })
  })
})
