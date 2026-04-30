import type { IpcMain } from 'electron'
import { getDb } from '@shared/db/connection'
import { initializeStudentModule } from '@student/index'
import { initializeFrequentationModule } from '@frequentation/index'

export async function initializeModules(ipcMain: IpcMain): Promise<void> {
  const db = getDb()
  const studentGateway = initializeStudentModule(db, ipcMain)
  initializeFrequentationModule(db, ipcMain, studentGateway)
}
