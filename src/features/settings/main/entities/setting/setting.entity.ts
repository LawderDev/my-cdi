import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'

export const settingTable = sqliteTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull()
})

export const settingEntitySchema = z.object({
  key: z.string().min(1),
  value: z.string().min(1)
})

export type SettingEntity = z.infer<typeof settingEntitySchema>

export type InsertSettingEntity = typeof settingTable.$inferInsert

export type SelectSettingEntity = typeof settingTable.$inferSelect