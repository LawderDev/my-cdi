import { describe, it, expect, beforeEach } from 'vitest'
import Database from 'better-sqlite3'
import { ensureStudentsIneUniqueIndex } from '../ensureStudentsIneUniqueIndex'

const EXPECTED_TWO_IDS = [1, 2]

function createTestDb(): Database.Database {
  const sqlite = new Database(':memory:')
  sqlite.exec(`
    CREATE TABLE students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      prenom TEXT NOT NULL,
      classe TEXT NOT NULL,
      ine TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `)
  return sqlite
}

function insertStudent(sqlite: Database.Database, ine: string): void {
  sqlite
    .prepare(
      'INSERT INTO students (nom, prenom, classe, ine, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
    )
    .run('Dupont', 'Jean', '3A', ine, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z')
}

describe('ensureStudentsIneUniqueIndex', () => {
  let sqlite: Database.Database

  beforeEach(() => {
    sqlite = createTestDb()
  })

  it('creates the unique index when no duplicates exist', () => {
    insertStudent(sqlite, 'INE-1')
    insertStudent(sqlite, 'INE-2')

    const result = ensureStudentsIneUniqueIndex(sqlite)

    expect(result).toEqual({ created: true, duplicates: [] })
    const indexes = sqlite.prepare("SELECT name FROM sqlite_master WHERE type = 'index'").all()
    expect(indexes).toContainEqual({ name: 'idx_students_ine' })
  })

  it('reports duplicates without creating the index or touching data', () => {
    insertStudent(sqlite, 'INE-DUP')
    insertStudent(sqlite, 'ine-dup ')
    insertStudent(sqlite, 'INE-OTHER')

    const result = ensureStudentsIneUniqueIndex(sqlite)

    expect(result.created).toBe(false)
    expect(result.duplicates).toEqual([{ ine: 'ine-dup', ids: EXPECTED_TWO_IDS }])
    const indexes = sqlite.prepare("SELECT name FROM sqlite_master WHERE type = 'index'").all()
    expect(indexes).not.toContainEqual({ name: 'idx_students_ine' })
    const rowCount = sqlite.prepare('SELECT COUNT(*) AS count FROM students').get()
    expect(rowCount).toEqual({ count: 3 })
  })

  it('is idempotent across repeated startups', () => {
    insertStudent(sqlite, 'INE-1')

    const first = ensureStudentsIneUniqueIndex(sqlite)
    const second = ensureStudentsIneUniqueIndex(sqlite)

    expect(first.created).toBe(true)
    expect(second.created).toBe(true)
  })
})
