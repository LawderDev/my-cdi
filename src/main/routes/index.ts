import { StudentController, FrequentationController } from '../controllers'
import { CDIDatabase } from '../database/database'
import { registerStudentRoutes } from './studentRoutes'
import { registerFrequentationRoutes } from './frequentationRoutes'

export function registerAllRoutes(database: CDIDatabase): void {
  registerStudentRoutes(new StudentController(database))
  registerFrequentationRoutes(new FrequentationController(database))
}
