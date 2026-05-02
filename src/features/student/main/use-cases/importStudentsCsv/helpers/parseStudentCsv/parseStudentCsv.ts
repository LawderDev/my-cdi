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

function stripBom(text: string): string {
  if (text.charCodeAt(0) === 0xfeff) {
    return text.slice(1)
  }
  return text
}

function normaliseHeader(header: string): string {
  return header
    .replace(/^﻿/, '')
    .trim()
    .toLowerCase()
    .normalize('NFC')
}

const NORMALISED_REQUIRED_COLUMNS = CSV_REQUIRED_COLUMNS.map(normaliseHeader)

export function parseStudentCsv(rawCsvText: string): ParseResult {
  const cleanText = stripBom(rawCsvText)

  const parsed = Papa.parse<Record<string, string>>(cleanText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => normaliseHeader(header)
  })

  const headers = parsed.meta.fields ?? []
  const missingColumns = NORMALISED_REQUIRED_COLUMNS.filter((col) => !headers.includes(col))

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
