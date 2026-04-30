import { describe, it, expect } from 'vitest'
import { csvRowSchema } from '../csvRowSchema'

describe('csvRowSchema', () => {
  it('validates a valid CSV row', () => {
    const result = csvRowSchema.safeParse({
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3B',
      ine: '0123456789A'
    })
    expect(result.success).toBe(true)
  })

  it('trims whitespace from fields', () => {
    const result = csvRowSchema.safeParse({
      nom: '  Dupont  ',
      prenom: '  Jean  ',
      classe: '  3B  ',
      ine: '  0123456789A  '
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.nom).toBe('Dupont')
    }
  })

  it('rejects missing fields', () => {
    const result = csvRowSchema.safeParse({ nom: 'Dupont' })
    expect(result.success).toBe(false)
  })

  it('rejects empty strings after trim', () => {
    const result = csvRowSchema.safeParse({
      nom: '   ',
      prenom: 'Jean',
      classe: '3B',
      ine: 'INE1'
    })
    expect(result.success).toBe(false)
  })
})
