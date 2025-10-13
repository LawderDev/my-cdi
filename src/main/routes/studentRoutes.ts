import { ipcMain } from 'electron'
import { StudentController } from '../controllers/StudentController'

export function registerStudentRoutes(studentController: StudentController): void {
  ipcMain.on('student:helloWorld', (event) => {
    event.reply('student:helloWorld:response', studentController.helloWorld())
  })

  ipcMain.on('student:add', (event, { nom, prenom, classe }) => {
    const result = studentController.addStudent(nom, prenom, classe)
    event.reply('student:add:response', result)
  })

  ipcMain.on('student:getAll', (event) => {
    const result = studentController.getAllStudents()
    event.reply('student:getAll:response', result)
  })

  ipcMain.on('student:getWithoutFrequentationAt', (event, date) => {
    const result = studentController.getStudentsWithoutFrequentationAt(date)
    event.reply('student:getWithoutFrequentationAt:response', result)
  })

  ipcMain.on('student:getByClass', (event, classe) => {
    const result = studentController.getStudentsByClass(classe)
    event.reply('student:getByClass:response', result)
  })
}
