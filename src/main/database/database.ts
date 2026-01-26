import Database from 'better-sqlite3'
import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'

class CDIDatabase {
  db: Database.Database

  constructor() {
    // Use Electron's userData directory for a safe, writable location
    const dbDir = join(__dirname, '../../data')
    const dbPath = join(dbDir, 'database.db')
    if (!existsSync(dbDir)) {
      mkdirSync(dbDir, { recursive: true })
    }
    this.db = new Database(dbPath)

    this.initTables()
  }

  // Getter method to access the database from controllers
  getDb(): Database.Database {
    return this.db
  }

  initTables(): void {
    const createTables = `
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        prenom TEXT NOT NULL,
        classe TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

       CREATE TABLE IF NOT EXISTS frequentation (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         starts_at DATETIME NOT NULL,
         activity TEXT NOT NULL,
         student_id INTEGER NOT NULL,
         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
         FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE
       );

      -- Index pour les performances
      CREATE INDEX IF NOT EXISTS idx_students_nom ON students(nom, prenom);
      CREATE INDEX IF NOT EXISTS idx_students_classe ON students(classe);
      CREATE INDEX IF NOT EXISTS idx_freq_date ON frequentation(DATE(starts_at));
      CREATE INDEX IF NOT EXISTS idx_freq_student ON frequentation(student_id);
    `

    try {
      this.db.exec(createTables)

      // Add updated_at column to frequentation table if it doesn't exist (migration)
      try {
        this.db.exec(
          `ALTER TABLE frequentation ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP`
        )
        console.log('✅ Migration: added updated_at column to frequentation table')
      } catch (alterError) {
        // Column might already exist, ignore error
      }

      console.log('✅ Tables créées/vérifiées')
    } catch (error) {
      console.error('❌ Erreur création tables:', error)
    }
  }

  close(): void {
    if (this.db) {
      this.db.close()
      console.log('✅ Base de données fermée')
    }
  }

  // Nettoyage automatique au démarrage
  cleanup(): void {
    try {
      // Supprimer les anciennes fréquentations (ex: > 2 ans)
      const cutoffDate = new Date()
      cutoffDate.setFullYear(cutoffDate.getFullYear() - 2)

      const result = this.db
        .prepare(
          `
        DELETE FROM frequentation
        WHERE starts_at < ?
      `
        )
        .run(cutoffDate.toISOString())

      if (result.changes > 0) {
        console.log(`🧹 ${result.changes} anciennes fréquentations supprimées`)
      }
    } catch (error) {
      console.error('❌ Erreur nettoyage:', error)
    }
  }
}

export { CDIDatabase }
