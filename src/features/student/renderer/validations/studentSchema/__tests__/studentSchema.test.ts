import { describe, it, expect } from 'vitest'
import { nomSchema, prenomSchema, classeSchema, ineSchema } from '../studentSchema'

const NOM_OVER_LIMIT = 101
const PRENOM_OVER_LIMIT = 101
const CLASSE_OVER_LIMIT = 51

describe('nomSchema', () => {
  it('accepts a valid nom', () => {
    expect(nomSchema.safeParse('Dupont').success).toBe(true)
  })

  it('rejects empty string', () => {
    expect(nomSchema.safeParse('').success).toBe(false)
  })

  it('rejects whitespace-only string', () => {
    expect(nomSchema.safeParse('   ').success).toBe(false)
  })

  it('rejects string over 100 chars', () => {
    const longNom = 'A'.repeat(NOM_OVER_LIMIT)
    expect(nomSchema.safeParse(longNom).success).toBe(false)
  })
})

describe('prenomSchema', () => {
  it('accepts a valid prenom', () => {
    expect(prenomSchema.safeParse('Jean').success).toBe(true)
  })

  it('rejects empty string', () => {
    expect(prenomSchema.safeParse('').success).toBe(false)
  })

  it('rejects whitespace-only string', () => {
    expect(prenomSchema.safeParse('   ').success).toBe(false)
  })

  it('rejects string over 100 chars', () => {
    const longPrenom = 'A'.repeat(PRENOM_OVER_LIMIT)
    expect(prenomSchema.safeParse(longPrenom).success).toBe(false)
  })
})

describe('classeSchema', () => {
  it('accepts a valid classe', () => {
    expect(classeSchema.safeParse('3ème A').success).toBe(true)
  })

  it('rejects empty string', () => {
    expect(classeSchema.safeParse('').success).toBe(false)
  })

  it('rejects string over 50 chars', () => {
    const longClasse = 'A'.repeat(CLASSE_OVER_LIMIT)
    expect(classeSchema.safeParse(longClasse).success).toBe(false)
  })
})

describe('ineSchema', () => {
  it('accepts a valid INE', () => {
    expect(ineSchema.safeParse('1234567890A').success).toBe(true)
  })

  it('rejects empty string', () => {
    expect(ineSchema.safeParse('').success).toBe(false)
  })

  it('rejects whitespace-only string', () => {
    expect(ineSchema.safeParse('   ').success).toBe(false)
  })
})
