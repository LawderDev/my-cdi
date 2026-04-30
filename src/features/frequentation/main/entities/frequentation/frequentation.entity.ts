import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'
import { ActivityType } from '../../../../../shared/types'
import { studentTable } from '@student/entities/student'

export const frequentationTable = sqliteTable(
  'frequentation',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    startsAt: text('starts_at').notNull(),
    activity: text('activity', {
      enum: [
        ActivityType.WORK,
        ActivityType.READING,
        ActivityType.COMPUTER,
        ActivityType.RELAXATION,
        ActivityType.OTHER
      ]
    }).notNull(),
    studentId: integer('student_id')
      .notNull()
      .references(() => studentTable.id, { onDelete: 'cascade' }),
    createdAt: text('created_at')
      .notNull()
      .$defaultFn(() => new Date().toISOString()),
    updatedAt: text('updated_at')
      .notNull()
      .$defaultFn(() => new Date().toISOString())
  },
  (table) => [
    index('idx_freq_student').on(table.studentId),
    index('idx_freq_starts_at').on(table.startsAt)
  ]
)

export const ActivityTypeSchema = z.nativeEnum(ActivityType)

export const FrequentationEntitySchema = z.object({
  id: z.number().int().positive(),
  startsAt: z.string().min(1),
  activity: ActivityTypeSchema,
  studentId: z.number().int().positive(),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1)
})

export const FrequentationWithStudentEntitySchema = FrequentationEntitySchema.extend({
  studentNom: z.string().min(1),
  studentPrenom: z.string().min(1),
  studentClasse: z.string().min(1),
  studentIne: z.string().min(1)
})

export type FrequentationEntity = z.infer<typeof FrequentationEntitySchema>
export type FrequentationWithStudentEntity = z.infer<typeof FrequentationWithStudentEntitySchema>

export type InsertFrequentationEntity = typeof frequentationTable.$inferInsert
export type SelectFrequentationEntity = typeof frequentationTable.$inferSelect
