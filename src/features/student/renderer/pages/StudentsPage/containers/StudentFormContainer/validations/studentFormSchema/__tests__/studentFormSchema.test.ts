import { describe, it, expect } from 'vitest'
import { studentFormSchema } from '../studentFormSchema'

const NOM_OVERFLOW_LENGTH = 101

describe('studentFormSchema', () => {
  it('accepts valid student form data', () => {
    const result = studentFormSchema.safeParse({
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3ème A',
      ine: '1234567890A'
    })
    expect(result.success).toBe(true)
  })

  it('rejects missing nom', () => {
    const result = studentFormSchema.safeParse({
      nom: '',
      prenom: 'Jean',
      classe: '3A',
      ine: '123A'
    })
    expect(result.success).toBe(false)
  })

  it('rejects missing prenom', () => {
    const result = studentFormSchema.safeParse({
      nom: 'Dupont',
      prenom: '',
      classe: '3A',
      ine: '123A'
    })
    expect(result.success).toBe(false)
  })

  it('rejects missing classe', () => {
    const result = studentFormSchema.safeParse({
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '',
      ine: '123A'
    })
    expect(result.success).toBe(false)
  })

  it('rejects missing ine', () => {
    const result = studentFormSchema.safeParse({
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3A',
      ine: ''
    })
    expect(result.success).toBe(false)
  })

  it('rejects whitespace-only fields', () => {
    const result = studentFormSchema.safeParse({
      nom: '   ',
      prenom: '   ',
      classe: '   ',
      ine: '   '
    })
    expect(result.success).toBe(false)
  })

  it('rejects nom over 100 chars', () => {
    const result = studentFormSchema.safeParse({
      nom: 'A'.repeat(NOM_OVERFLOW_LENGTH),
      prenom: 'Jean',
      classe: '3A',
      ine: '123A'
    })
    expect(result.success).toBe(false)
  })
})
