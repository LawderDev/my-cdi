import { createStudentSchema } from '@student-shared'
import type { StudentGateway } from '@student/gateways/student'
import { parseStudentCsv } from './helpers/parseStudentCsv'
import type { CsvImportResult } from './types/CsvImportResult'
import type { UseCaseResult } from '../types/UseCaseResult'

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
  const parseResult = parseStudentCsv(input.csv)
  if (!parseResult.success) {
    return { success: false, error: parseResult.error }
  }

  const existingStudents = await deps.gateway.getAll()
  const existingInes = new Set(existingStudents.map((student) => student.ine.trim().toLowerCase()))

  const seenInes = new Set<string>()
  let created = 0
  const errorMessages: string[] = [...parseResult.errors]

  for (const row of parseResult.data) {
    const normalisedIne = row.ine.trim().toLowerCase()

    if (existingInes.has(normalisedIne) || seenInes.has(normalisedIne)) {
      errorMessages.push(`${row.prenom} ${row.nom}: INE déjà existant`)
      continue
    }

    const validated = createStudentSchema.safeParse(row)
    if (!validated.success) {
      const message = validated.error.issues.map((issue) => issue.message).join(', ')
      errorMessages.push(`${row.prenom} ${row.nom}: ${message}`)
      continue
    }

    try {
      await deps.gateway.create(validated.data)
      created += 1
      seenInes.add(normalisedIne)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      errorMessages.push(`${row.prenom} ${row.nom}: ${message}`)
    }
  }

  return {
    success: true,
    data: {
      created,
      errors: errorMessages.length,
      errorMessages
    }
  }
}
