// Student Module Controller
// IPC handlers for student operations

import { ipcMain } from 'electron'
import { StudentManager, StudentController } from './types'
import {
  CreateStudentDto,
  UpdateStudentDto,
  StudentListResponseDto,
  StudentApiResponseDto,
  BulkStudentResponseDto
} from '../../../shared/types'

export class StudentModuleController implements StudentController {
  constructor(private studentManager: StudentManager) {
    this.registerHandlers()
  }

  registerHandlers(): void {
    // Create student
    ipcMain.handle(
      'student:create',
      async (_event, createDto: CreateStudentDto): Promise<StudentApiResponseDto> => {
        try {
          const result = await this.studentManager.create(createDto)

          if (!result.success) {
            return {
              success: false,
              error: result.error || result.errors?.join(', ')
            }
          }

          const dto = this.studentManager.toResponseDto(result.data!)

          return {
            success: true,
            data: dto
          }
        } catch (error) {
          return {
            success: false,
            error: `Erreur serveur: ${error}`
          }
        }
      }
    )

    // Get all students
    ipcMain.handle('student:getAll', async (): Promise<StudentListResponseDto> => {
      try {
        const students = await this.studentManager.findAll()
        const dtos = await this.studentManager.toResponseDtos(students)

        return {
          students: dtos,
          total: dtos.length
        }
      } catch (error) {
        throw new Error(`Erreur lors de la récupération des étudiants: ${error}`)
      }
    })

    // Get student by ID
    ipcMain.handle(
      'student:getById',
      async (_event, id: number): Promise<StudentApiResponseDto> => {
        try {
          const student = await this.studentManager.findById(id)

          if (!student) {
            return {
              success: false,
              error: 'Étudiant non trouvé'
            }
          }

          const dto = this.studentManager.toResponseDto(student)

          return {
            success: true,
            data: dto
          }
        } catch (error) {
          return {
            success: false,
            error: `Erreur lors de la récupération de l'étudiant: ${error}`
          }
        }
      }
    )

    // Update student
    ipcMain.handle(
      'student:update',
      async (_event, id: number, updateDto: UpdateStudentDto): Promise<StudentApiResponseDto> => {
        try {
          const result = await this.studentManager.update(id, updateDto)

          if (!result.success) {
            return {
              success: false,
              error: result.error || result.errors?.join(', ')
            }
          }

          const dto = this.studentManager.toResponseDto(result.data!)

          return {
            success: true,
            data: dto
          }
        } catch (error) {
          return {
            success: false,
            error: `Erreur lors de la mise à jour de l'étudiant: ${error}`
          }
        }
      }
    )

    // Delete student
    ipcMain.handle(
      'student:delete',
      async (
        _event,
        payload: { ids: number[] }
      ): Promise<{ success: boolean; count?: number; error?: string }> => {
        const { ids } = payload
        try {
          const results = await Promise.all(ids.map((id) => this.studentManager.delete(id)))
          const successCount = results.filter((r) => r.success).length

          if (successCount === ids.length) {
            return { success: true, count: successCount }
          } else {
            return {
              success: false,
              count: successCount,
              error: `Échec de la suppression de ${ids.length - successCount} étudiant(s)`
            }
          }
        } catch (error) {
          return {
            success: false,
            error: `Erreur lors de la suppression des étudiants: ${error}`
          }
        }
      }
    )

    // Get students by class
    ipcMain.handle(
      'student:getByClass',
      async (_event, classe: string): Promise<StudentListResponseDto> => {
        try {
          const students = await this.studentManager.findByClass(classe)
          const dtos = await this.studentManager.toResponseDtos(students)

          return {
            students: dtos,
            total: dtos.length
          }
        } catch (error) {
          throw new Error(
            `Erreur lors de la récupération des étudiants de la classe ${classe}: ${error}`
          )
        }
      }
    )

    // Get student statistics
    ipcMain.handle(
      'student:getStats',
      async (): Promise<{ total: number; byClass: Record<string, number> }> => {
        try {
          return await this.studentManager.getStudentStats()
        } catch (error) {
          throw new Error(`Erreur lors de la récupération des statistiques: ${error}`)
        }
      }
    )

    // Create multiple students
    ipcMain.handle(
      'student:createBatch',
      async (_event, createDtos: CreateStudentDto[]): Promise<BulkStudentResponseDto> => {
        try {
          const result = await this.studentManager.createBatch(createDtos)

          if (!result.success) {
            return {
              success: false,
              errors: result.data?.errors || ['Erreur lors de la création en lot']
            }
          }

          return {
            success: true,
            created: result.data!.students.length
          }
        } catch (error) {
          return {
            success: false,
            errors: [`Erreur serveur: ${error}`]
          }
        }
      }
    )

    // Validate student data
    ipcMain.handle(
      'student:validate',
      async (
        _event,
        studentDto: CreateStudentDto | UpdateStudentDto
      ): Promise<{ isValid: boolean; errors: string[] }> => {
        try {
          return this.studentManager.validate(studentDto)
        } catch (error) {
          return {
            isValid: false,
            errors: [`Erreur de validation: ${error}`]
          }
        }
      }
    )

    // Legacy compatibility handler for old update format
    ipcMain.handle(
      'student:updateLegacy',
      async (
        _event,
        { id, nom, prenom, classe }
      ): Promise<{ success: boolean; changes?: number; error?: string }> => {
        try {
          const updateData: UpdateStudentDto = {
            nom,
            prenom,
            ...(classe && { classe })
          }

          const result = await this.studentManager.update(id, updateData)

          if (!result.success) {
            return {
              success: false,
              changes: 0,
              error: result.error || result.errors?.join(', ')
            }
          }

          return {
            success: true,
            changes: 1
          }
        } catch (error) {
          return {
            success: false,
            changes: 0,
            error: `Erreur lors de la mise à jour de l'étudiant: ${error}`
          }
        }
      }
    )

    // Get students without frequentation at specific date
    ipcMain.handle(
      'student:getWithoutFrequentationAt',
      async (_event, date: string): Promise<StudentListResponseDto> => {
        try {
          const students = await this.studentManager.findWithoutFrequentationAtDate(date)
          const dtos = await this.studentManager.toResponseDtos(students)

          return {
            students: dtos,
            total: dtos.length
          }
        } catch (error) {
          throw new Error(
            `Erreur lors de la récupération des étudiants sans fréquentation à la date ${date}: ${error}`
          )
        }
      }
    )
  }
}
