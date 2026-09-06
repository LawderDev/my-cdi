import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import type { IpcMain } from 'electron'
import { SettingGatewayDrizzle } from './gateways/setting'
import { registerSettingsController } from './controllers/settings'

export function initializeSettingsModule(
  db: BetterSQLite3Database<Record<string, unknown>>,
  ipcMain: IpcMain
): void {
  const settingGateway = new SettingGatewayDrizzle(db)
  registerSettingsController(ipcMain, settingGateway)
}
