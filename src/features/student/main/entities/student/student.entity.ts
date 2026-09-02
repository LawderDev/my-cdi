import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'

export const studentTable = sqliteTable(
  'students',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    nom: text('nom').notNull(),
    prenom: text('prenom').notNull(),
    classe: text('classe').notNull(),
    // Uniqueness of `ine` is enforced by the idx_students_ine unique index,
    // created by the guarded helper src/shared/db/helpers/ensureStudentsIneUniqueIndex
    // at startup — not declared here, so a future drizzle-kit generate never
    // emits a second CREATE UNIQUE INDEX that could fail on legacy databases.
    ine: text('ine').notNull(),
    createdAt: text('created_at')
      .notNull()
      .$defaultFn(() => new Date().toISOString()),
    updatedAt: text('updated_at')
      .notNull()
      .$defaultFn(() => new Date().toISOString())
  },
  (table) => [
    index('idx_students_nom').on(table.nom, table.prenom),
    index('idx_students_classe').on(table.classe)
  ]
)

export const studentEntitySchema = z.object({
  id: z.number().int().positive(),
  nom: z.string().min(1),
  prenom: z.string().min(1),
  classe: z.string().min(1),
  ine: z.string().min(1),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type StudentEntity = z.infer<typeof studentEntitySchema>

export type InsertStudentEntity = typeof studentTable.$inferInsert

export type SelectStudentEntity = typeof studentTable.$inferSelect
