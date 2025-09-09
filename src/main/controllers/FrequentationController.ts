import { CDIDatabase } from '../database/database'
import { Frequentation } from '../models'
import Database from 'better-sqlite3'

export class FrequentationController {
  private db: Database.Database
  private queries: { [key: string]: Database.Statement }

  constructor(database: CDIDatabase) {
    this.db = database.getDb()
    this.queries = {}
    this.prepareStatements()
  }

  private prepareStatements(): void {
    this.queries = {
      addFrequentation: this.db.prepare(`
        INSERT INTO frequentation (starts_at, activity, student_id)
        VALUES (?, ?, ?)
      `),

      getFrequentationByDate: this.db.prepare(`
        SELECT
          f.id, f.starts_at, f.activity, f.created_at,
          s.id as student_id, s.nom, s.prenom, s.classe
        FROM frequentation f
        JOIN students s ON f.student_id = s.id
        WHERE DATE(f.starts_at) = ?
        ORDER BY f.starts_at DESC
      `),

      getFrequentationByDateRange: this.db.prepare(`
        SELECT
          f.id, f.starts_at, f.activity, f.created_at,
          s.id as student_id, s.nom, s.prenom, s.classe
        FROM frequentation f
        JOIN students s ON f.student_id = s.id
        WHERE DATE(f.starts_at) BETWEEN ? AND ?
        ORDER BY f.starts_at DESC
      `)
    }
  }

  addFrequentation(
    startsAt: string,
    activity: string,
    studentId: number
  ): { success: boolean; id?: number; error?: string } {
    try {
      const result = this.queries.addFrequentation.run(startsAt, activity, studentId)
      console.log(`✅ Fréquentation ajoutée: ${activity} pour élève ${studentId}`)
      return { success: true, id: result.lastInsertRowid as number }
    } catch (error) {
      console.error('❌ Erreur ajout fréquentation:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  getFrequentationByDate(date: string): Frequentation[] {
    try {
      const rows = this.queries.getFrequentationByDate.all(date)
      return rows.map((row: Record<string, unknown>) => Frequentation.fromDbRow(row))
    } catch (error) {
      console.error('❌ Erreur récupération fréquentation:', error)
      return []
    }
  }
}
