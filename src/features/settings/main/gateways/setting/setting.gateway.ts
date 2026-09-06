import type { SettingEntity } from '@settings/entities/setting'

export interface SettingGateway {
  getByKey(key: string): Promise<SettingEntity | null>
  create(setting: { key: string; value: string }): Promise<SettingEntity>
  update(key: string, value: string): Promise<SettingEntity | null>
}
