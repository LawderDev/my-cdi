import { ipcMain } from 'electron'
import { StudentController } from '../controllers/StudentController'

export function registerStudentRoutes(studentController: StudentController): void {
  ipcMain.on('student:helloWorld', () => {
    return studentController.helloWorld()
  })

  ipcMain.on('student:add', (_, { nom, prenom, classe }) => {
    return studentController.addStudent(nom, prenom, classe)
  })

  ipcMain.on('student:getAll', () => {
    return studentController.getAllStudents()
  })

  ipcMain.on('student:getByClass', (_, classe) => {
    return studentController.getStudentsByClass(classe)
  })
}
