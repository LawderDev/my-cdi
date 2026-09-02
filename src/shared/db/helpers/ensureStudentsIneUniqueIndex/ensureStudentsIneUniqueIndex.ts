import type Database from 'better-sqlite3'

const INDEX_NAME = 'idx_students_ine'

export interface StudentIneDuplicates {
  ine: string
  ids: number[]
}

export interface EnsureStudentsIneUniqueIndexResult {
  created: boolean
  duplicates: StudentIneDuplicates[]
}

interface DuplicateRow {
  ine: string
  ids: string
}

const IDS_SEPARATOR = ','

/**
 * Creates the unique index on `students.ine` unless legacy rows already
 * contain duplicate INEs — in which case nothing is touched (a destructive
 * merge at startup would risk data loss) and the duplicates are reported so
 * the log can point at the rows to fix. Idempotent thanks to IF NOT EXISTS.
 */
export function ensureStudentsIneUniqueIndex(
  sqlite: Database.Database
): EnsureStudentsIneUniqueIndexResult {
  const duplicateRows = sqlite
    .prepare<unknown[], DuplicateRow>(
      `SELECT LOWER(TRIM(ine)) AS ine, GROUP_CONCAT(id) AS ids
       FROM students
       GROUP BY LOWER(TRIM(ine))
       HAVING COUNT(*) > 1`
    )
    .all()

  const duplicates = duplicateRows.map((row) => ({
    ine: row.ine,
    ids: row.ids.split(IDS_SEPARATOR).map(Number)
  }))

  if (duplicates.length > 0) {
    return { created: false, duplicates }
  }

  sqlite.prepare(`CREATE UNIQUE INDEX IF NOT EXISTS ${INDEX_NAME} ON students (ine)`).run()

  return { created: true, duplicates: [] }
}
