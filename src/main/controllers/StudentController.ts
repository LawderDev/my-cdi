import { CDIDatabase } from '../database/database'
import { Student } from '../models'
import Database from 'better-sqlite3'

export class StudentController {
  private db: Database.Database
  private queries: { [key: string]: Database.Statement }

  constructor(database: CDIDatabase) {
    this.db = database.getDb()
    this.queries = {}
    this.prepareStatements()
  }

  private prepareStatements(): void {
    this.queries = {
      addStudent: this.db.prepare(`
        INSERT INTO students (nom, prenom, classe)
        VALUES (?, ?, ?)
      `),

      getAllStudents: this.db.prepare(`
        SELECT * FROM students
        ORDER BY classe, nom, prenom
      `),

      getStudentsByClass: this.db.prepare(`
        SELECT * FROM students
        WHERE classe = ?
        ORDER BY nom, prenom
      `),

      updateStudent: this.db.prepare(`
        UPDATE students
        SET nom = ?, prenom = ?, classe = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `),

      deleteStudent: this.db.prepare(`
        DELETE FROM students WHERE id = ?
      `)
    }
  }

  addStudent(
    nom: string,
    prenom: string,
    classe: string
  ): { success: boolean; id?: number; error?: string } {
    try {
      const result = this.queries.addStudent.run(nom.trim(), prenom.trim(), classe.trim())
      console.log(`✅ Élève ajouté: ${prenom} ${nom} (${classe})`)
      return { success: true, id: result.lastInsertRowid as number }
    } catch (error) {
      console.error('❌ Erreur ajout élève:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  getAllStudents(): { success: boolean; data?: Student[]; error?: string } {
    try {
      const rows = this.queries.getAllStudents.all()
      const students = rows.map((row: Record<string, unknown>) => Student.fromDbRow(row))
      console.log('✅ Élèves récupérés:', students)
      return { success: true, data: students }
    } catch (error) {
      console.error('❌ Erreur récupération élèves:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  getStudentsByClass(classe: string): { success: boolean; data?: Student[]; error?: string } {
    try {
      const rows = this.queries.getStudentsByClass.all(classe)
      const students = rows.map((row: Record<string, unknown>) => Student.fromDbRow(row))
      return { success: true, data: students }
    } catch (error) {
      console.error('❌ Erreur récupération élèves par classe:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  helloWorld(): string {
    console.log('Hello from StudentController!')
    return 'pong from controller'
  }
}
