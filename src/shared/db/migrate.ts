import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { getDb } from './connection'

const MIGRATIONS_FOLDER = 'drizzle'

export function runMigrations() {
  const db = getDb()
  migrate(db, { migrationsFolder: MIGRATIONS_FOLDER })
}
