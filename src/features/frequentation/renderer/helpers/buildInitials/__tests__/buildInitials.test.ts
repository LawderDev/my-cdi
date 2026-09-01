import { describe, it, expect } from 'vitest'
import { buildInitials } from '../buildInitials'

describe('buildInitials', () => {
  it('returns uppercase initials from prenom and nom', () => {
    expect(buildInitials('Jean', 'Dupont')).toBe('JD')
  })

  it('handles lowercase input', () => {
    expect(buildInitials('jean', 'dupont')).toBe('JD')
  })

  it('handles mixed case input', () => {
    expect(buildInitials('Marie', 'CURIE')).toBe('MC')
  })
})
