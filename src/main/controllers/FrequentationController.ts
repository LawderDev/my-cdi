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

      // Méthode pour préparer dynamiquement une requête d'insertion multiple
      prepareMultipleInsert: (count: number) => {
        const placeholders = Array(count).fill('(?, ?, ?)').join(', ')
        return this.db.prepare(`
          INSERT INTO frequentation (starts_at, activity, student_id)
          VALUES ${placeholders}
        `)
      },

      getAllFrequentationsWithStudent: this.db.prepare(`
        SELECT
          f.id, f.starts_at, f.activity, f.created_at,
          s.id as student_id, s.nom, s.prenom, s.classe
        FROM frequentation f
        JOIN students s ON f.student_id = s.id
        ORDER BY f.starts_at DESC
      `),

      getAllFrequentations: this.db.prepare(`
        SELECT * FROM frequentation
        ORDER BY starts_at DESC
      `),

      getFrequentationByDate: this.db.prepare(`
        SELECT * FROM frequentation
        WHERE DATE(starts_at) = ?
        ORDER BY starts_at DESC
      `),

      getFrequentationByDateWithStudent: this.db.prepare(`
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
      `),

      // La requête sera préparée dynamiquement dans la méthode deleteFrequentations
    }
  }

  getAllFrequentations(withStudent: boolean = false): {
    success: boolean
    data?: object[]
    error?: string
  } {
    try {
      let rows: Record<string, unknown>[] = []
      if (withStudent) {
        rows = this.queries.getAllFrequentationsWithStudent.all()
      } else {
        rows = this.queries.getAllFrequentations.all()
      }

      const frequentations = rows.map((row) => Frequentation.fromDbRow(row).toJSON())
      console.log('✅ Fréquentations récupérées:', frequentations)
      return { success: true, data: frequentations }
    } catch (error) {
      console.error('❌ Erreur récupération fréquentations:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
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

  addMultipleFrequentations(
    frequentations: Array<{ startsAt: string; activity: string; studentId: number }>,
    batchSize: number = 200
  ): { success: boolean; count?: number; changes?: number; error?: string } {
    try {
      if (!frequentations || frequentations.length === 0) {
        return { success: false, error: 'Aucune fréquentation à ajouter' }
      }

      // Validation des données
      for (let i = 0; i < frequentations.length; i++) {
        const freq = frequentations[i]
        if (!freq.startsAt || !freq.activity || !freq.studentId) {
          return {
            success: false,
            error: `Données manquantes pour la fréquentation ${i + 1}`
          }
        }
      }

      let totalChanges = 0

      // Traitement par batch pour optimiser les performances
      if (frequentations.length <= batchSize) {
        // Si petit nombre, une seule requête suffit
        const stmt = this.queries.prepareMultipleInsert(frequentations.length)
        const params: (string | number)[] = []
        frequentations.forEach((freq) => {
          params.push(freq.startsAt, freq.activity, freq.studentId)
        })

        const result = stmt.run(...params)
        totalChanges = result.changes
        console.log(`✅ ${frequentations.length} fréquentations ajoutées en une requête`)
      } else {
        // Si grand nombre, traitement par batch
        console.log(
          `🔄 Traitement de ${frequentations.length} fréquentations par batch de ${batchSize}`
        )

        for (let i = 0; i < frequentations.length; i += batchSize) {
          const batch = frequentations.slice(i, i + batchSize)
          const stmt = this.queries.prepareMultipleInsert(batch.length)

          const params: (string | number)[] = []
          batch.forEach((freq) => {
            params.push(freq.startsAt, freq.activity, freq.studentId)
          })

          const result = stmt.run(...params)
          totalChanges += result.changes

          console.log(
            `✅ Batch ${Math.floor(i / batchSize) + 1}: ${batch.length} fréquentations ajoutées`
          )
        }
      }

      return {
        success: true,
        count: frequentations.length,
        changes: totalChanges
      }
    } catch (error) {
      console.error('❌ Erreur ajout multiple fréquentations:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  deleteFrequentations(ids: number[]): { success: boolean; ids?: number[]; error?: string } {
    try {
      if (!ids || ids.length === 0) {
        return { success: false, error: 'Aucun ID de fréquentation fourni pour la suppression' }
      }

      // Génère dynamiquement les placeholders (?, ?, ...)
      const placeholders = ids.map(() => '?').join(', ')
      const query = `DELETE FROM frequentation WHERE id IN (${placeholders})`
      this.db.prepare(query).run(...ids)
      console.log(`✅ Fréquentations supprimées: ${ids}`)
      return { success: true, ids: ids }
    } catch (error) {
      console.error('❌ Erreur suppression fréquentations:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  getFrequentationByDateWithStudent(date: string): {
    success: boolean
    data?: object[]
    error?: string
  } {
    try {
      const rows = this.queries.getFrequentationByDateWithStudent.all(date)
      const frequentations = rows.map((row) => Frequentation.fromDbRow(row).toJSON())
      console.log('✅ Fréquentations récupérées:', frequentations)
      return { success: true, data: frequentations }
    } catch (error) {
      console.error('❌ Erreur récupération fréquentation:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }
}
