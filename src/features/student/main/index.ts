import type { IpcMain } from 'electron'
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { StudentGatewayDrizzle } from './gateways/student/student.gateway.drizzle'
import { registerStudentController } from './controllers/student'

export function initializeStudentModule(
  db: BetterSQLite3Database<Record<string, unknown>>,
  ipcMain: IpcMain
): StudentGatewayDrizzle {
  const studentGateway = new StudentGatewayDrizzle(db)
  registerStudentController(ipcMain, studentGateway)
  return studentGateway
}

export { StudentGatewayDrizzle }
