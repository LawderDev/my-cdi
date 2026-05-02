import Papa from 'papaparse'
import { csvRowSchema } from '../../validations/csvRowSchema'
import {
  CSV_REQUIRED_COLUMNS,
  FIRST_DATA_ROW_NUMBER,
  UTF8_BOM_CHARACTER,
  HEADER_ALIASES
} from '../csvConstants'
import type { CsvImportError, CsvRowIssue } from '@student-shared'
import type { CsvRow } from '../../validations/csvRowSchema'
import type { ParseResult, ParsedCsv, RowValidationResult } from './parseStudentCsv.types'

const NORMALISED_REQUIRED_COLUMNS = CSV_REQUIRED_COLUMNS.map(normaliseHeader)

function stripBom(text: string): string {
  if (text.charCodeAt(0) === UTF8_BOM_CHARACTER) {
    return text.slice(1)
  }
  return text
}

function normaliseHeader(header: string): string {
  return header.trim().toLowerCase().normalize('NFC')
}

function resolveHeaderAlias(normalised: string): string {
  return HEADER_ALIASES[normalised] ?? normalised
}

function parseCsvText(text: string): ParsedCsv {
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => resolveHeaderAlias(normaliseHeader(header))
  })
  return {
    headers: parsed.meta.fields ?? [],
    rows: parsed.data
  }
}

function validateHeaders(headers: string[]): CsvImportError | null {
  const missingColumns = NORMALISED_REQUIRED_COLUMNS.filter((col) => !headers.includes(col))
  if (missingColumns.length > 0) {
    return { type: 'MISSING_COLUMNS', columns: missingColumns }
  }
  return null
}

function buildRowIssues(
  errorIssues: Array<{ path: (string | number)[]; code: string }>
): CsvRowIssue[] {
  return errorIssues.map((issue) => ({
    field: String(issue.path[0]),
    code: issue.code
  }))
}

function validateRows(rows: Record<string, string>[]): RowValidationResult {
  const validRows: CsvRow[] = []
  const errors: CsvImportError[] = []

  for (const [index, row] of rows.entries()) {
    const result = csvRowSchema.safeParse(row)
    if (result.success) {
      validRows.push(result.data)
    } else {
      const rowNumber = index + FIRST_DATA_ROW_NUMBER
      const issues = buildRowIssues(result.error.issues)
      errors.push({ type: 'ROW_VALIDATION', rowNumber, issues })
    }
  }

  return { validRows, errors }
}

export function parseStudentCsv(rawCsvText: string): ParseResult {
  const cleanText = stripBom(rawCsvText)
  const { headers, rows } = parseCsvText(cleanText)

  const headerError = validateHeaders(headers)
  if (headerError) {
    return { data: [], errors: [headerError] }
  }

  const { validRows, errors } = validateRows(rows)
  return { data: validRows, errors }
}
