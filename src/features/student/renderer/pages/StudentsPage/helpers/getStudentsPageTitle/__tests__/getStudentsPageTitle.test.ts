import { describe, it, expect } from 'vitest'
import { getStudentsPageTitle } from '../getStudentsPageTitle'

const NO_STUDENTS = 0
const TWELVE_STUDENTS = 12

describe('getStudentsPageTitle', () => {
  it('returns base title with no count', () => {
    expect(getStudentsPageTitle('Élèves', NO_STUDENTS)).toBe('Élèves')
  })

  it('appends count when greater than zero', () => {
    expect(getStudentsPageTitle('Élèves', TWELVE_STUDENTS)).toBe('Élèves (12)')
  })
})
