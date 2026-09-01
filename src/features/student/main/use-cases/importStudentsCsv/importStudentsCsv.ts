import type { StudentGateway } from '@student/gateways/student'
import { parseStudentCsv } from './helpers/parseStudentCsv'
import type { CsvImportError, CsvImportResult } from '@student-shared'
import type { UseCaseResult } from '@lib/use-case'

interface ImportStudentsCsvDeps {
  gateway: StudentGateway
}

interface ImportStudentsCsvInput {
  csv: string
}

export async function importStudentsCsv(
  deps: ImportStudentsCsvDeps,
  input: ImportStudentsCsvInput
): Promise<UseCaseResult<CsvImportResult>> {
  const { data: rows, errors: parseErrors } = parseStudentCsv(input.csv)

  if (parseErrors.length > 0 && rows.length === 0) {
    return {
      success: true,
      data: {
        created: 0,
        errors: parseErrors.length,
        errorDetails: parseErrors
      }
    }
  }

  const existingStudents = await deps.gateway.getAll()
  const existingInes = new Set(existingStudents.map((student) => student.ine.trim().toLowerCase()))

  const seenInes = new Set<string>()
  let created = 0
  const rowErrors: CsvImportError[] = [...parseErrors]

  for (const row of rows) {
    const normalisedIne = row.ine.trim().toLowerCase()

    if (existingInes.has(normalisedIne) || seenInes.has(normalisedIne)) {
      rowErrors.push({
        type: 'DUPLICATE_INE',
        studentName: `${row.prenom} ${row.nom}`
      })
      continue
    }

    try {
      await deps.gateway.create(row)
      created += 1
      seenInes.add(normalisedIne)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      rowErrors.push({
        type: 'DATABASE_ERROR',
        studentName: `${row.prenom} ${row.nom}`,
        message
      })
    }
  }

  return {
    success: true,
    data: {
      created,
      errors: rowErrors.length,
      errorDetails: rowErrors
    }
  }
}
