import { describe, it, expect } from 'vitest'
import { createStudentSchema, updateStudentSchema, NOM_MAX_LENGTH } from '../types'

const OVER_MAX_LENGTH = NOM_MAX_LENGTH + 1

describe('createStudentSchema', () => {
  it('validates a valid student DTO', () => {
    const result = createStudentSchema.safeParse({
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3B',
      ine: '0123456789A'
    })
    expect(result.success).toBe(true)
  })

  it('rejects missing fields', () => {
    const result = createStudentSchema.safeParse({})
    expect(result.success).toBe(false)
  })

  it('trims whitespace from all fields', () => {
    const result = createStudentSchema.safeParse({
      nom: '  Dupont  ',
      prenom: '  Jean  ',
      classe: '  3B  ',
      ine: '  0123456789A  '
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.nom).toBe('Dupont')
      expect(result.data.prenom).toBe('Jean')
      expect(result.data.classe).toBe('3B')
      expect(result.data.ine).toBe('0123456789A')
    }
  })

  it('rejects empty strings after trim', () => {
    const result = createStudentSchema.safeParse({
      nom: '   ',
      prenom: 'Jean',
      classe: '3B',
      ine: '0123456789A'
    })
    expect(result.success).toBe(false)
  })

  it('rejects strings exceeding max length', () => {
    const result = createStudentSchema.safeParse({
      nom: 'x'.repeat(OVER_MAX_LENGTH),
      prenom: 'Jean',
      classe: '3B',
      ine: '0123456789A'
    })
    expect(result.success).toBe(false)
  })
})

describe('updateStudentSchema', () => {
  it('allows partial updates', () => {
    const result = updateStudentSchema.safeParse({ nom: 'Martin' })
    expect(result.success).toBe(true)
  })

  it('allows empty object', () => {
    const result = updateStudentSchema.safeParse({})
    expect(result.success).toBe(true)
  })

  it('rejects empty strings after trim', () => {
    const result = updateStudentSchema.safeParse({ nom: '   ' })
    expect(result.success).toBe(false)
  })

  it('trims whitespace from provided fields', () => {
    const result = updateStudentSchema.safeParse({ nom: '  Martin  ' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.nom).toBe('Martin')
    }
  })
})
