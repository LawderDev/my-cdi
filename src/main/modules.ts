import type { IpcMain } from 'electron'
import { getDb } from '@shared/db/connection'
import { initializeStudentModule } from '@student/index'

export function initializeModules(ipcMain: IpcMain): void {
  const db = getDb()
  initializeStudentModule(db, ipcMain)
}
