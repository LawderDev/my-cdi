import type { CsvImportError, CsvRowIssue } from '@student-shared'

export function formatRowIssues(
  issues: CsvRowIssue[],
  translate: (key: string, options?: Record<string, unknown>) => string
): string {
  return issues
    .map((issue) =>
      translate(`validation.${issue.code}`, { field: translate(`fields.${issue.field}`) })
    )
    .join(', ')
}

export function formatImportError(
  error: CsvImportError,
  translate: (key: string, options?: Record<string, unknown>) => string
): string {
  switch (error.type) {
    case 'MISSING_COLUMNS':
      return translate('csvImport.error.missingColumns', { columns: error.columns.join(', ') })
    case 'ROW_VALIDATION':
      return translate('csvImport.error.rowValidation', {
        rowNumber: error.rowNumber,
        message: formatRowIssues(error.issues, translate)
      })
    case 'DUPLICATE_INE':
      return translate('csvImport.error.duplicateIne', { studentName: error.studentName })
    case 'DATABASE_ERROR':
      return translate('csvImport.error.databaseError', {
        studentName: error.studentName,
        message: error.message
      })
  }
}

export function isStructuralError(error: CsvImportError): boolean {
  return error.type === 'MISSING_COLUMNS'
}
