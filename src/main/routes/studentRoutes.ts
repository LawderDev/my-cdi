import { ipcMain } from 'electron'
import { StudentController } from '../controllers/StudentController'

export function registerStudentRoutes(studentController: StudentController): void {
  ipcMain.handle('student:add', async (_event, { nom, prenom, classe }) => {
    return studentController.addStudent(nom, prenom, classe)
  })

  ipcMain.handle('student:getAll', async () => {
    return studentController.getAllStudents()
  })

  ipcMain.handle('student:getWithoutFrequentationAt', async (_event, date) => {
    return studentController.getStudentsWithoutFrequentationAt(date)
  })

  ipcMain.handle('student:getByClass', async (_event, classe) => {
    return studentController.getStudentsByClass(classe)
  })
}
