import { ipcMain } from 'electron'
import { FrequentationController } from '../controllers/FrequentationController'

export function registerFrequentationRoutes(
  frequentationController: FrequentationController
): void {
  ipcMain.on('frequentation:getAll', (event, { withStudent }) => {
    const result = frequentationController.getAllFrequentations(withStudent)
    event.reply('frequentation:getAll:response', result)
  })

  ipcMain.on('frequentation:add', (event, { startsAt, activity, studentId }) => {
    const result = frequentationController.addFrequentation(startsAt, activity, studentId)
    event.reply('frequentation:add:response', result)
  })

  ipcMain.on('frequentation:addMultiple', (event, { frequentations }) => {
    const result = frequentationController.addMultipleFrequentations(frequentations)
    event.reply('frequentation:addMultiple:response', result)
  })

  ipcMain.on('frequentation:getByDate', (event, date) => {
    const result = frequentationController.getFrequentationByDate(date)
    event.reply('frequentation:getByDate:response', result)
  })
}
