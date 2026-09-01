import { describe, it, expect } from 'vitest'
import { formatImportError, formatRowIssues, isStructuralError } from '../formatImportError'
import type { CsvImportError, CsvRowIssue } from '@student-shared'

function createTranslate(): (key: string, options?: Record<string, unknown>) => string {
  return (key: string, options?: Record<string, unknown>) => {
    if (options) {
      return `${key}(${JSON.stringify(options)})`
    }
    return key
  }
}

describe('formatImportError', () => {
  it('formats MISSING_COLUMNS error', () => {
    const t = createTranslate()
    const error: CsvImportError = { type: 'MISSING_COLUMNS', columns: ['nom', 'prenom'] }
    expect(formatImportError(error, t)).toContain('csvImport.error.missingColumns')
    expect(formatImportError(error, t)).toContain('nom, prenom')
  })

  it('formats ROW_VALIDATION error', () => {
    const t = createTranslate()
    const issues: CsvRowIssue[] = [{ field: 'nom', code: 'too_small' }]
    const error: CsvImportError = { type: 'ROW_VALIDATION', rowNumber: 3, issues }
    expect(formatImportError(error, t)).toContain('csvImport.error.rowValidation')
    expect(formatImportError(error, t)).toContain('3')
  })

  it('formats DUPLICATE_INE error', () => {
    const t = createTranslate()
    const error: CsvImportError = { type: 'DUPLICATE_INE', studentName: 'Jean Dupont' }
    expect(formatImportError(error, t)).toContain('csvImport.error.duplicateIne')
    expect(formatImportError(error, t)).toContain('Jean Dupont')
  })

  it('formats DATABASE_ERROR error', () => {
    const t = createTranslate()
    const error: CsvImportError = {
      type: 'DATABASE_ERROR',
      studentName: 'Jean Dupont',
      message: 'DB fail'
    }
    expect(formatImportError(error, t)).toContain('csvImport.error.databaseError')
    expect(formatImportError(error, t)).toContain('DB fail')
  })
})

describe('formatRowIssues', () => {
  it('formats single issue', () => {
    const t = createTranslate()
    const issues: CsvRowIssue[] = [{ field: 'nom', code: 'too_small' }]
    expect(formatRowIssues(issues, t)).toBe('validation.too_small({"field":"fields.nom"})')
  })

  it('formats multiple issues joined by comma', () => {
    const t = createTranslate()
    const issues: CsvRowIssue[] = [
      { field: 'nom', code: 'too_small' },
      { field: 'prenom', code: 'too_small' }
    ]
    const result = formatRowIssues(issues, t)
    expect(result).toContain('fields.nom')
    expect(result).toContain('fields.prenom')
  })
})

describe('isStructuralError', () => {
  it('returns true for MISSING_COLUMNS', () => {
    expect(isStructuralError({ type: 'MISSING_COLUMNS', columns: [] })).toBe(true)
  })

  it('returns false for ROW_VALIDATION', () => {
    expect(isStructuralError({ type: 'ROW_VALIDATION', rowNumber: 2, issues: [] })).toBe(false)
  })
})
