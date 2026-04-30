import Papa from 'papaparse'
import { csvRowSchema } from '../../validations/csvRowSchema'
import { CSV_REQUIRED_COLUMNS, MAX_CSV_IMPORT_ROWS } from '../csvConstants'
import type { CsvRow } from '../../validations/csvRowSchema'

interface ParseSuccess {
  success: true
  data: CsvRow[]
  errors: string[]
}

interface ParseFailure {
  success: false
  error: string
}

type ParseResult = ParseSuccess | ParseFailure

const HEADER_AND_ONE_INDEXED_OFFSET = 2

export function parseStudentCsv(commaSeparatedValuesString: string): ParseResult {
  const parsed = Papa.parse<Record<string, string>>(commaSeparatedValuesString, {
    header: true,
    skipEmptyLines: true
  })

  const headers = parsed.meta.fields ?? []
  const missingColumns = CSV_REQUIRED_COLUMNS.filter((col) => !headers.includes(col))

  if (missingColumns.length > 0) {
    return {
      success: false,
      error: `Colonnes manquantes: ${missingColumns.join(', ')}`
    }
  }

  const dataRows = parsed.data

  if (dataRows.length > MAX_CSV_IMPORT_ROWS) {
    return {
      success: false,
      error: `Limite dépassée: ${MAX_CSV_IMPORT_ROWS} lignes maximum`
    }
  }

  const validRows: CsvRow[] = []
  const errors: string[] = []

  for (const [index, row] of dataRows.entries()) {
    const result = csvRowSchema.safeParse(row)
    if (result.success) {
      validRows.push(result.data)
    } else {
      const rowNum = index + HEADER_AND_ONE_INDEXED_OFFSET
      const messages = result.error.issues.map((issue) => issue.message).join(', ')
      errors.push(`Ligne ${rowNum}: ${messages}`)
    }
  }

  return { success: true, data: validRows, errors }
}
