import { describe, it, expect } from 'vitest'
import {
  frequentationTable,
  FrequentationEntitySchema,
  FrequentationWithStudentEntitySchema
} from '../frequentation.entity'

describe('frequentationTable', () => {
  it('has all required columns', () => {
    const columns = Object.keys(frequentationTable)
    expect(columns).toContain('id')
    expect(columns).toContain('startsAt')
    expect(columns).toContain('activity')
    expect(columns).toContain('studentId')
    expect(columns).toContain('createdAt')
    expect(columns).toContain('updatedAt')
  })
})

describe('FrequentationEntitySchema', () => {
  it('validates a valid frequentation entity', () => {
    const input = {
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1,
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    }
    const result = FrequentationEntitySchema.safeParse(input)
    expect(result.success).toBe(true)
  })

  it('rejects missing required fields', () => {
    const result = FrequentationEntitySchema.safeParse({
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z'
    })
    expect(result.success).toBe(false)
  })

  it('rejects invalid activity', () => {
    const result = FrequentationEntitySchema.safeParse({
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'invalid_activity',
      studentId: 1,
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    })
    expect(result.success).toBe(false)
  })

  it('rejects non-positive studentId', () => {
    const result = FrequentationEntitySchema.safeParse({
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 0,
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    })
    expect(result.success).toBe(false)
  })
})

describe('FrequentationWithStudentEntitySchema', () => {
  it('validates a frequentation with student data', () => {
    const input = {
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
    const result = FrequentationWithStudentEntitySchema.safeParse(input)
    expect(result.success).toBe(true)
  })

  it('rejects missing student fields', () => {
    const result = FrequentationWithStudentEntitySchema.safeParse({
      id: 1,
      startsAt: '2026-01-15T09:00:00.000Z',
      activity: 'work',
      studentId: 1,
      studentNom: 'Dupont',
      createdAt: '2026-01-15T09:00:00.000Z',
      updatedAt: '2026-01-15T09:00:00.000Z'
    })
    expect(result.success).toBe(false)
  })
})
