import { describe, it, expect } from 'vitest'
import {
  formatStudentDisplayName,
  formatStudentClass,
  formatStudentIne,
  formatBatchDeleteMessage
} from '../studentFormatters'

const SINGLE_COUNT = 1
const ZERO_COUNT = 0
const PLURAL_COUNT = 5

describe('formatStudentDisplayName', () => {
  it('formats as "prenom nom"', () => {
    expect(formatStudentDisplayName('Jean', 'Dupont')).toBe('Jean Dupont')
  })

  it('trims whitespace', () => {
    expect(formatStudentDisplayName('  Jean  ', '  Dupont  ')).toBe('Jean Dupont')
  })
})

describe('formatStudentClass', () => {
  it('returns trimmed classe', () => {
    expect(formatStudentClass('  3ème A  ')).toBe('3ème A')
  })
})

describe('formatStudentIne', () => {
  it('returns trimmed INE', () => {
    expect(formatStudentIne('  1234567890A  ')).toBe('1234567890A')
  })
})

describe('formatBatchDeleteMessage', () => {
  it('formats singular message for 1', () => {
    expect(formatBatchDeleteMessage(SINGLE_COUNT)).toBe('Voulez-vous vraiment supprimer 1 élève ?')
  })

  it('formats plural message for 0', () => {
    expect(formatBatchDeleteMessage(ZERO_COUNT)).toBe('Voulez-vous vraiment supprimer 0 élève(s) ?')
  })

  it('formats plural message for 5', () => {
    expect(formatBatchDeleteMessage(PLURAL_COUNT)).toBe(
      'Voulez-vous vraiment supprimer 5 élève(s) ?'
    )
  })
})
