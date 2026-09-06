import { eq } from 'drizzle-orm'
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import type { SettingEntity } from '@settings/entities/setting'
import { settingEntitySchema, settingTable } from '@settings/entities/setting'
import type { SettingGateway } from './setting.gateway'

function mapSettingRow(row: { key: string; value: string }): SettingEntity {
  return settingEntitySchema.parse(row)
}

export class SettingGatewayDrizzle implements SettingGateway {
  constructor(private db: BetterSQLite3Database<Record<string, unknown>>) {}

  async getByKey(key: string): Promise<SettingEntity | null> {
    const result = await this.db.select().from(settingTable).where(eq(settingTable.key, key))
    const row = result[0]
    if (!row) {
      return null
    }
    return mapSettingRow(row)
  }

  async create(setting: { key: string; value: string }): Promise<SettingEntity> {
    const result = await this.db.insert(settingTable).values(setting).returning()
    const inserted = result[0]
    if (!inserted) {
      throw new Error('Failed to create setting')
    }
    return mapSettingRow(inserted)
  }

  async update(key: string, value: string): Promise<SettingEntity | null> {
    const existing = await this.getByKey(key)
    if (!existing) {
      return null
    }
    const result = await this.db
      .update(settingTable)
      .set({ value })
      .where(eq(settingTable.key, key))
      .returning()
    const updated = result[0]
    if (!updated) {
      return null
    }
    return mapSettingRow(updated)
  }
}
