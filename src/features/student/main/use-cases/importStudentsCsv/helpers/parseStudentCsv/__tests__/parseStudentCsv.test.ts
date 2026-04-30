import { describe, it, expect } from 'vitest'
import { parseStudentCsv } from '../parseStudentCsv'
import { MAX_CSV_IMPORT_ROWS } from '../../csvConstants'

const EXPECTED_TWO_ROWS = 2
const EXPECTED_ONE_ROW = 1
const FIRST_INDEX = 0

describe('parseStudentCsv', () => {
  it('parses a valid CSV string', () => {
    const csv = `nom,prenom,classe,ine
Dupont,Jean,3B,INE1
Martin,Pierre,3A,INE2`
    const result = parseStudentCsv(csv)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toHaveLength(EXPECTED_TWO_ROWS)
      expect(result.data[FIRST_INDEX]?.nom).toBe('Dupont')
    }
  })

  it('returns error for missing required columns', () => {
    const csv = `nom,prenom
Dupont,Jean`
    const result = parseStudentCsv(csv)
    expect(result.success).toBe(false)
  })

  it('returns error when exceeding max rows', () => {
    const header = 'nom,prenom,classe,ine'
    const rows = Array.from(
      { length: MAX_CSV_IMPORT_ROWS + 1 },
      (_, i) => `Nom${i},Prenom${i},3B,INE${i}`
    )
    const csv = [header, ...rows].join('\n')
    const result = parseStudentCsv(csv)
    expect(result.success).toBe(false)
  })

  it('skips rows that fail validation and collects errors', () => {
    const csv = `nom,prenom,classe,ine
Dupont,Jean,3B,INE1
, Pierre,3A,INE2
Martin, ,3B,INE3`
    const result = parseStudentCsv(csv)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toHaveLength(EXPECTED_ONE_ROW)
      expect(result.data[FIRST_INDEX]?.nom).toBe('Dupont')
    }
  })
})
