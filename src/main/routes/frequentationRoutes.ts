import { ipcMain } from 'electron'
import { FrequentationController } from '../controllers/FrequentationController'

export function registerFrequentationRoutes(
  frequentationController: FrequentationController
): void {
  ipcMain.on('frequentation:add', (_, { startsAt, activity, studentId }) => {
    return frequentationController.addFrequentation(startsAt, activity, studentId)
  })

  ipcMain.on('frequentation:getByDate', (_, date) => {
    return frequentationController.getFrequentationByDate(date)
  })
}
