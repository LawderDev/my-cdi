import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'

const DB_PATH = 'data/database.db'

let databaseInstance: ReturnType<typeof drizzle> | null = null

export function createDbConnection(databasePath: string = DB_PATH) {
  const sqlite = new Database(databasePath)
  sqlite.pragma('journal_mode = WAL')
  sqlite.pragma('foreign_keys = ON')
  databaseInstance = drizzle(sqlite, { schema })
  return databaseInstance
}

export function getDb() {
  if (!databaseInstance) {
    throw new Error('Database not initialized. Call createDbConnection() first.')
  }
  return databaseInstance
}

export function closeDbConnection() {
  databaseInstance = null
}
