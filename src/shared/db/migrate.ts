import { app } from 'electron'
import { join } from 'path'
import log from 'electron-log/main'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { getDb } from './connection'
import { ensureStudentsIneUniqueIndex } from './helpers/ensureStudentsIneUniqueIndex'

const MIGRATIONS_FOLDER = join(app.getAppPath(), 'drizzle')

export function runMigrations() {
  const db = getDb()
  migrate(db, { migrationsFolder: MIGRATIONS_FOLDER })

  const indexResult = ensureStudentsIneUniqueIndex(db.$client)
  if (!indexResult.created) {
    const details = indexResult.duplicates
      .map((duplicate) => `${duplicate.ine} (ids: ${duplicate.ids.join(', ')})`)
      .join('; ')
    log.warn(`Duplicate student INEs found, unique index not created: ${details}`)
    return
  }
  log.info('students.ine unique index ready')
}
