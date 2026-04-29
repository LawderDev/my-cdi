import { describe, it, expect } from 'vitest'
import { mapStudentRow } from '../mapStudentRow'

describe('mapStudentRow', () => {
  it('maps a Drizzle row to a StudentEntity', () => {
    const row = {
      id: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3B',
      ine: '0123456789A',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
    const entity = mapStudentRow(row)
    expect(entity.id).toBe(1)
    expect(entity.nom).toBe('Dupont')
    expect(entity.prenom).toBe('Jean')
    expect(entity.classe).toBe('3B')
    expect(entity.ine).toBe('0123456789A')
    expect(entity.createdAt).toBe('2024-01-01T00:00:00.000Z')
  })

  it('throws on invalid row data', () => {
    const row = {
      id: 1,
      nom: '',
      prenom: 'Jean',
      classe: '3B',
      ine: '0123456789A',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
    expect(() => mapStudentRow(row)).toThrow()
  })
})
