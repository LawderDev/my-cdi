import Database from 'better-sqlite3'

// Base repository with common database operations
export abstract class BaseRepository {
  constructor(protected db: Database.Database) {}

  protected executeQuery<T>(sql: string, params: any[] = []): Promise<T[]> {
    try {
      const stmt = this.db.prepare(sql)
      const rows = stmt.all(params) as T[]
      return Promise.resolve(rows)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  protected executeGet<T>(sql: string, params: any[] = []): Promise<T | null> {
    try {
      const stmt = this.db.prepare(sql)
      const row = stmt.get(params) as T | undefined
      return Promise.resolve(row || null)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  protected executeRun(
    sql: string,
    params: any[] = []
  ): Promise<{ lastID: number; changes: number }> {
    try {
      const stmt = this.db.prepare(sql)
      const result = stmt.run(params)
      return Promise.resolve({ lastID: result.lastInsertRowid as number, changes: result.changes })
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
