import type { IpcMain } from 'electron'
import log from 'electron-log/main'
import { getDb } from '@shared/db/connection'
import { initializeStudentModule } from '@student/index'
import { initializeFrequentationModule } from '@frequentation/index'
import { initializeStatisticsModule } from '@statistics/index'
import { cleanupOldFrequentations } from '@frequentation/use-cases/cleanupOldFrequentations'

export async function initializeModules(ipcMain: IpcMain): Promise<void> {
  const db = getDb()
  const studentGateway = initializeStudentModule(db, ipcMain)
  const frequentationGateway = initializeFrequentationModule(db, ipcMain, studentGateway)
  initializeStatisticsModule(ipcMain, frequentationGateway)

  const cleanupResult = await cleanupOldFrequentations(frequentationGateway)
  if (cleanupResult.success && cleanupResult.data.deletedCount > 0) {
    log.info(`Cleaned up ${cleanupResult.data.deletedCount} old frequentations`)
  } else if (!cleanupResult.success) {
    log.error(`Failed to cleanup old frequentations: ${cleanupResult.error}`)
  }
}
