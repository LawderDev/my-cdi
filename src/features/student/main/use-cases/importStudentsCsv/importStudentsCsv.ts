import type { StudentGateway } from '@student/gateways/student'
import { parseStudentCsv } from './helpers/parseStudentCsv'
import type {
  CsvDuplicateInePolicy,
  CsvImportError,
  CsvImportResult,
  ImportStudentsCsvPayload
} from '@student-shared'
import type { UseCaseResult } from '@lib/use-case'

interface ImportStudentsCsvDeps {
  gateway: StudentGateway
}

const DEFAULT_DUPLICATE_POLICY: CsvDuplicateInePolicy = 'skip'

export async function importStudentsCsv(
  deps: ImportStudentsCsvDeps,
  input: ImportStudentsCsvPayload
): Promise<UseCaseResult<CsvImportResult>> {
  const duplicatePolicy = input.onDuplicateIne ?? DEFAULT_DUPLICATE_POLICY
  const { data: rows, errors: parseErrors } = parseStudentCsv(input.csv)

  if (parseErrors.length > 0 && rows.length === 0) {
    return {
      success: true,
      data: {
        created: 0,
        updated: 0,
        errors: parseErrors.length,
        errorDetails: parseErrors
      }
    }
  }

  const existingStudents = await deps.gateway.getAll()
  const existingByIne = new Map(
    existingStudents.map((student) => [student.ine.trim().toLowerCase(), student])
  )

  const seenInes = new Set<string>()
  let created = 0
  let updated = 0
  const rowErrors: CsvImportError[] = [...parseErrors]

  for (const row of rows) {
    const normalisedIne = row.ine.trim().toLowerCase()

    // Two rows of the same file with the same INE are contradictory: always skip
    // and report, regardless of the duplicate policy.
    if (seenInes.has(normalisedIne)) {
      rowErrors.push({
        type: 'DUPLICATE_INE',
        studentName: `${row.prenom} ${row.nom}`
      })
      continue
    }

    const existingStudent = existingByIne.get(normalisedIne)

    if (existingStudent !== undefined) {
      if (duplicatePolicy === 'replace') {
        seenInes.add(normalisedIne)
        try {
          await deps.gateway.update(existingStudent.id, {
            nom: row.nom,
            prenom: row.prenom,
            classe: row.classe
          })
          updated += 1
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Unknown error'
          rowErrors.push({
            type: 'DATABASE_ERROR',
            studentName: `${row.prenom} ${row.nom}`,
            message
          })
        }
      } else {
        rowErrors.push({
          type: 'DUPLICATE_INE',
          studentName: `${row.prenom} ${row.nom}`,
          existingName: `${existingStudent.prenom} ${existingStudent.nom}`,
          existingClasse: existingStudent.classe
        })
      }
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
      updated,
      errors: rowErrors.length,
      errorDetails: rowErrors
    }
  }
}
