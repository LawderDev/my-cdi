import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { ActivityType } from '@types'
import { FrequentationGatewayDrizzle } from '../frequentation.gateway.drizzle'

const NONEXISTENT_ID = 999
const EXPECTED_TWO = 2

function createTestDb(): { sqlite: Database.Database; db: ReturnType<typeof drizzle> } {
  const sqlite = new Database(':memory:')
  sqlite.pragma('foreign_keys = ON')
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
    CREATE TABLE frequentation (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      starts_at TEXT NOT NULL,
      activity TEXT NOT NULL,
      student_id INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    );
    CREATE INDEX idx_freq_starts_at ON frequentation(starts_at);
    CREATE INDEX idx_freq_student ON frequentation(student_id);
  `)
  const now = '2026-01-01T00:00:00.000Z'
  sqlite
    .prepare(
      `INSERT INTO students (nom, prenom, classe, ine, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run('Dupont', 'Jean', '6ème A', '12345678X', now, now)
  sqlite
    .prepare(
      `INSERT INTO students (nom, prenom, classe, ine, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run('Martin', 'Marie', '5ème B', '87654321Y', now, now)
  return { sqlite, db: drizzle(sqlite) }
}

describe('FrequentationGatewayDrizzle', () => {
  let gateway: FrequentationGatewayDrizzle
  let sqlite: Database.Database

  beforeEach(() => {
    const testSetup = createTestDb()
    sqlite = testSetup.sqlite
    gateway = new FrequentationGatewayDrizzle(testSetup.db)
  })

  afterEach(() => {
    sqlite.close()
  })

  describe('create', () => {
    it('creates a frequentation and returns entity', async () => {
      const result = await gateway.create({
        startsAt: '2026-01-15T09:00:00.000Z',
        activity: ActivityType.WORK,
        studentId: 1
      })
      expect(result.id).toBe(1)
      expect(result.startsAt).toBe('2026-01-15T09:00:00.000Z')
      expect(result.activity).toBe('work')
      expect(result.studentId).toBe(1)
    })
  })

  describe('getById', () => {
    it('returns frequentation by id', async () => {
      await gateway.create({
        startsAt: '2026-01-15T09:00:00.000Z',
        activity: ActivityType.WORK,
        studentId: 1
      })
      const result = await gateway.getById(1)
      expect(result).not.toBeNull()
      expect(result?.id).toBe(1)
    })

    it('returns null for non-existent id', async () => {
      const result = await gateway.getById(NONEXISTENT_ID)
      expect(result).toBeNull()
    })
  })

  describe('getAll', () => {
    it('returns all frequentations with student data', async () => {
      await gateway.create({
        startsAt: '2026-01-15T09:00:00.000Z',
        activity: ActivityType.WORK,
        studentId: 1
      })
      await gateway.create({
        startsAt: '2026-01-15T10:00:00.000Z',
        activity: ActivityType.READING,
        studentId: 2
      })
      const results = await gateway.getAll()
      expect(results).toHaveLength(EXPECTED_TWO)
      expect(results[0]?.studentNom).toBeDefined()
    })
  })

  describe('getByStudentId', () => {
    it('returns frequentations for a specific student', async () => {
      await gateway.create({
        startsAt: '2026-01-15T09:00:00.000Z',
        activity: ActivityType.WORK,
        studentId: 1
      })
      await gateway.create({
        startsAt: '2026-01-15T10:00:00.000Z',
        activity: ActivityType.READING,
        studentId: 2
      })
      const results = await gateway.getByStudentId(1)
      expect(results).toHaveLength(1)
      expect(results[0]?.studentId).toBe(1)
    })
  })

  describe('getByDateRange', () => {
    it('returns frequentations within date range', async () => {
      await gateway.create({
        startsAt: '2026-01-15T09:00:00.000Z',
        activity: ActivityType.WORK,
        studentId: 1
      })
      await gateway.create({
        startsAt: '2026-01-20T10:00:00.000Z',
        activity: ActivityType.READING,
        studentId: 2
      })
      const results = await gateway.getByDateRange('2026-01-15', '2026-01-15')
      expect(results).toHaveLength(1)
    })
  })

  describe('update', () => {
    it('updates activity field', async () => {
      await gateway.create({
        startsAt: '2026-01-15T09:00:00.000Z',
        activity: ActivityType.WORK,
        studentId: 1
      })
      const result = await gateway.update(1, { activity: ActivityType.READING })
      expect(result).not.toBeNull()
      expect(result?.activity).toBe('reading')
    })

    it('returns null for non-existent id', async () => {
      const result = await gateway.update(NONEXISTENT_ID, { activity: ActivityType.READING })
      expect(result).toBeNull()
    })
  })

  describe('delete', () => {
    it('deletes a frequentation', async () => {
      await gateway.create({
        startsAt: '2026-01-15T09:00:00.000Z',
        activity: ActivityType.WORK,
        studentId: 1
      })
      const deleted = await gateway.delete(1)
      expect(deleted).toBe(true)
      const found = await gateway.getById(1)
      expect(found).toBeNull()
    })

    it('returns false for non-existent id', async () => {
      const result = await gateway.delete(NONEXISTENT_ID)
      expect(result).toBe(false)
    })
  })

  describe('deleteByStudentId', () => {
    it('deletes all frequentations for a student', async () => {
      await gateway.create({
        startsAt: '2026-01-15T09:00:00.000Z',
        activity: ActivityType.WORK,
        studentId: 1
      })
      await gateway.create({
        startsAt: '2026-01-15T10:00:00.000Z',
        activity: ActivityType.READING,
        studentId: 1
      })
      await gateway.create({
        startsAt: '2026-01-15T11:00:00.000Z',
        activity: ActivityType.COMPUTER,
        studentId: 2
      })
      const count = await gateway.deleteByStudentId(1)
      expect(count).toBe(EXPECTED_TWO)
    })
  })

  describe('count', () => {
    it('returns total frequentation count', async () => {
      await gateway.create({
        startsAt: '2026-01-15T09:00:00.000Z',
        activity: ActivityType.WORK,
        studentId: 1
      })
      await gateway.create({
        startsAt: '2026-01-15T10:00:00.000Z',
        activity: ActivityType.READING,
        studentId: 2
      })
      const result = await gateway.count()
      expect(result).toBe(EXPECTED_TWO)
    })
  })
})
