import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { StudentGatewayDrizzle } from '../student.gateway.drizzle'

const NONEXISTENT_ID = 9999
const EXPECTED_TWO_STUDENTS = 2
const EXPECTED_ONE_STUDENT = 1

function createTestDb() {
  const sqlite = new Database(':memory:')
  sqlite.pragma('journal_mode = WAL')
  sqlite.pragma('foreign_keys = ON')
  const db = drizzle(sqlite)

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
    CREATE INDEX idx_students_nom ON students(nom, prenom);
    CREATE INDEX idx_students_classe ON students(classe);
  `)

  return { db, sqlite }
}

describe('StudentGatewayDrizzle', () => {
  let gateway: StudentGatewayDrizzle
  let sqlite: Database.Database

  beforeEach(() => {
    const { db, sqlite: sql } = createTestDb()
    sqlite = sql
    gateway = new StudentGatewayDrizzle(db)
  })

  afterEach(() => {
    sqlite.close()
  })

  describe('create', () => {
    it('creates a student and returns entity', async () => {
      const entity = await gateway.create({
        nom: 'Dupont',
        prenom: 'Jean',
        classe: '3B',
        ine: '0123456789A'
      })
      expect(entity.id).toBeGreaterThan(0)
      expect(entity.nom).toBe('Dupont')
      expect(entity.prenom).toBe('Jean')
      expect(entity.classe).toBe('3B')
      expect(entity.ine).toBe('0123456789A')
    })
  })

  describe('getById', () => {
    it('returns student by id', async () => {
      const created = await gateway.create({
        nom: 'Dupont',
        prenom: 'Jean',
        classe: '3B',
        ine: '0123456789A'
      })
      const found = await gateway.getById(created.id)
      expect(found).not.toBeNull()
      expect(found?.id).toBe(created.id)
      expect(found?.nom).toBe('Dupont')
    })

    it('returns null for nonexistent id', async () => {
      const found = await gateway.getById(NONEXISTENT_ID)
      expect(found).toBeNull()
    })
  })

  describe('getAll', () => {
    it('returns all students', async () => {
      await gateway.create({ nom: 'A', prenom: 'B', classe: '1A', ine: 'INE1' })
      await gateway.create({ nom: 'C', prenom: 'D', classe: '1A', ine: 'INE2' })
      const all = await gateway.getAll()
      expect(all).toHaveLength(EXPECTED_TWO_STUDENTS)
    })

    it('returns empty array when no students', async () => {
      const all = await gateway.getAll()
      expect(all).toHaveLength(0)
    })
  })

  describe('update', () => {
    it('updates specified fields', async () => {
      const created = await gateway.create({
        nom: 'Dupont',
        prenom: 'Jean',
        classe: '3B',
        ine: '0123456789A'
      })
      const updated = await gateway.update(created.id, { nom: 'Martin' })
      expect(updated).not.toBeNull()
      expect(updated?.nom).toBe('Martin')
      expect(updated?.prenom).toBe('Jean')
    })

    it('returns null for nonexistent id', async () => {
      const updated = await gateway.update(NONEXISTENT_ID, { nom: 'Martin' })
      expect(updated).toBeNull()
    })
  })

  describe('delete', () => {
    it('deletes a student and returns true', async () => {
      const created = await gateway.create({
        nom: 'Dupont',
        prenom: 'Jean',
        classe: '3B',
        ine: '0123456789A'
      })
      const deleted = await gateway.delete(created.id)
      expect(deleted).toBe(true)
      const found = await gateway.getById(created.id)
      expect(found).toBeNull()
    })

    it('returns false for nonexistent id', async () => {
      const deleted = await gateway.delete(NONEXISTENT_ID)
      expect(deleted).toBe(false)
    })
  })

  describe('getByClass', () => {
    it('returns students of a specific class', async () => {
      await gateway.create({ nom: 'A', prenom: 'B', classe: '3B', ine: 'INE1' })
      await gateway.create({ nom: 'C', prenom: 'D', classe: '3A', ine: 'INE2' })
      const result = await gateway.getByClass('3B')
      expect(result).toHaveLength(EXPECTED_ONE_STUDENT)
      expect(result[0]?.classe).toBe('3B')
    })

    it('returns empty array for class with no students', async () => {
      const result = await gateway.getByClass('ZZZ')
      expect(result).toHaveLength(0)
    })
  })

  describe('getByIds', () => {
    it('returns students matching given ids', async () => {
      const s1 = await gateway.create({ nom: 'A', prenom: 'B', classe: '3B', ine: 'INE1' })
      const s2 = await gateway.create({ nom: 'C', prenom: 'D', classe: '3A', ine: 'INE2' })
      const result = await gateway.getByIds([s1.id, s2.id])
      expect(result).toHaveLength(EXPECTED_TWO_STUDENTS)
    })

    it('returns empty array for empty ids', async () => {
      const result = await gateway.getByIds([])
      expect(result).toHaveLength(0)
    })
  })
})
