import type { CsvImportError } from '@student-shared'
import type { CsvRow } from '../../validations/csvRowSchema'

export interface ParseResult {
  data: CsvRow[]
  errors: CsvImportError[]
}

export interface ParsedCsv {
  headers: string[]
  rows: Record<string, string>[]
}

export interface RowValidationResult {
  validRows: CsvRow[]
  errors: CsvImportError[]
}
