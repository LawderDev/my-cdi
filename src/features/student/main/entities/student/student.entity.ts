import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'

export const studentTable = sqliteTable('students', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nom: text('nom').notNull(),
  prenom: text('prenom').notNull(),
  classe: text('classe').notNull(),
  ine: text('ine').notNull(),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString())
})

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
