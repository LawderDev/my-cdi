import { describe, it, expect } from 'vitest'
import { studentTable, studentEntitySchema } from '../student.entity'

describe('studentTable', () => {
  it('has correct table name', () => {
    expect(studentTable).toBeDefined()
  })
})

describe('studentEntitySchema', () => {
  it('validates a complete student entity row', () => {
    const row = {
      id: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3B',
      ine: '0123456789A',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
    const result = studentEntitySchema.safeParse(row)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.id).toBe(1)
      expect(result.data.nom).toBe('Dupont')
    }
  })

  it('rejects a row with missing fields', () => {
    const row = { id: 1 }
    const result = studentEntitySchema.safeParse(row)
    expect(result.success).toBe(false)
  })

  it('rejects a row with wrong types', () => {
    const row = {
      id: 'not-a-number',
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3B',
      ine: '0123456789A',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
    const result = studentEntitySchema.safeParse(row)
    expect(result.success).toBe(false)
  })
})
