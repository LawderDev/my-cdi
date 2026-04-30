import type { IpcMain } from 'electron'
import { getDb } from '@shared/db/connection'
import { initializeStudentModule } from '@student/index'
import { initializeFrequentationModule } from '@frequentation/index'
import { cleanupOldFrequentations } from '@frequentation/use-cases/cleanupOldFrequentations'

export async function initializeModules(ipcMain: IpcMain): Promise<void> {
  const db = getDb()
  const studentGateway = initializeStudentModule(db, ipcMain)
  const frequentationGateway = initializeFrequentationModule(db, ipcMain, studentGateway)

  const cleanupResult = await cleanupOldFrequentations(frequentationGateway)
  if (cleanupResult.success && cleanupResult.data.deletedCount > 0) {
    console.log(`Cleaned up ${cleanupResult.data.deletedCount} old frequentations`)
  } else if (!cleanupResult.success) {
    console.error(`Failed to cleanup old frequentations: ${cleanupResult.error}`)
  }
}
