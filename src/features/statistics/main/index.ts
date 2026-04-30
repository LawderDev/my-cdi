import type { IpcMain } from 'electron'
import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import { registerStatisticsController } from './controllers/statistics'

export function initializeStatisticsModule(
  ipcMain: IpcMain,
  frequentationGateway: FrequentationGateway
): void {
  registerStatisticsController(ipcMain, frequentationGateway)
}
