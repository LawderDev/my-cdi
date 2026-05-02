import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'

const DB_PATH = 'data/database.db'

let sqliteInstance: Database.Database | null = null
let databaseInstance: ReturnType<typeof drizzle> | null = null

export function createDbConnection(databasePath: string = DB_PATH) {
  sqliteInstance = new Database(databasePath)
  sqliteInstance.pragma('journal_mode = WAL')
  sqliteInstance.pragma('foreign_keys = ON')
  databaseInstance = drizzle(sqliteInstance, { schema })
  return databaseInstance
}

export function getDb() {
  if (!databaseInstance) {
    throw new Error('Database not initialized. Call createDbConnection() first.')
  }
  return databaseInstance
}

export function closeDbConnection() {
  sqliteInstance?.pragma('wal_checkpoint(TRUNCATE)')
  sqliteInstance?.close()
  sqliteInstance = null
  databaseInstance = null
}
