import { describe, it, expect } from 'vitest'
import { computeStudentFields } from '../computeStudentFields'

describe('computeStudentFields', () => {
  it('computes fullName as "prenom nom"', () => {
    const result = computeStudentFields({ prenom: 'Jean', nom: 'Dupont' })
    expect(result.fullName).toBe('Jean Dupont')
  })

  it('trims whitespace in fullName', () => {
    const result = computeStudentFields({ prenom: '  Jean  ', nom: '  Dupont  ' })
    expect(result.fullName).toBe('Jean Dupont')
  })
})
