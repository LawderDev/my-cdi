import { ipcMain } from 'electron'
import { FrequentationController } from '../controllers/FrequentationController'

export function registerFrequentationRoutes(
  frequentationController: FrequentationController
): void {
  ipcMain.handle('frequentation:getAll', async (_event, { withStudent }) => {
    return frequentationController.getAllFrequentations(withStudent)
  })

  ipcMain.handle('frequentation:add', async (_event, { startsAt, activity, studentId }) => {
    return frequentationController.addFrequentation(startsAt, activity, studentId)
  })

  ipcMain.handle('frequentation:delete', async (_event, { ids }) => {
    return frequentationController.deleteFrequentations(ids)
  })

  ipcMain.handle('frequentation:addMultiple', async (_event, { frequentations }) => {
    return frequentationController.addMultipleFrequentations(frequentations)
  })

  ipcMain.handle('frequentation:getByDate', async (_event, date) => {
    return frequentationController.getFrequentationByDateWithStudent(date)
  })
}
