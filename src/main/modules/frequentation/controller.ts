// Frequentation Module Controller
// IPC handlers for frequentation operations

import { ipcMain } from 'electron'
import { FrequentationManager, FrequentationController } from './types'
import {
  CreateFrequentationDto,
  UpdateFrequentationDto,
  FrequentationResponseDto,
  FrequentationApiResponseDto,
  BulkFrequentationResponseDto
} from '../../../shared/types'

export class FrequentationModuleController implements FrequentationController {
  constructor(private frequentationManager: FrequentationManager) {
    this.registerHandlers()
  }

  registerHandlers(): void {
    // Create frequentation
    ipcMain.handle(
      'frequentation:create',
      async (_event, createDto: CreateFrequentationDto): Promise<FrequentationApiResponseDto> => {
        try {
          const result = await this.frequentationManager.create(createDto)

          if (!result.success) {
            return {
              success: false,
              error: result.error || result.errors?.join(', ')
            }
          }

          const dto = this.frequentationManager.toResponseDto(result.data!)

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

    // Get all frequentations
    ipcMain.handle(
      'frequentation:getAll',
      async (): Promise<FrequentationApiResponseDto<FrequentationResponseDto[]>> => {
        try {
          const frequentations = await this.frequentationManager.findAll()
          const dtos = await this.frequentationManager.toResponseDtos(frequentations)

          return {
            success: true,
            data: dtos
          }
        } catch (error) {
          return {
            success: false,
            error: `Erreur lors de la récupération des fréquentations: ${error}`
          }
        }
      }
    )

    // Get frequentation by ID
    ipcMain.handle(
      'frequentation:getById',
      async (_event, id: number): Promise<FrequentationApiResponseDto> => {
        try {
          const frequentation = await this.frequentationManager.findById(id)

          if (!frequentation) {
            return {
              success: false,
              error: 'Fréquentation non trouvée'
            }
          }

          const dto = this.frequentationManager.toResponseDto(frequentation)

          return {
            success: true,
            data: dto
          }
        } catch (error) {
          return {
            success: false,
            error: `Erreur lors de la récupération de la fréquentation: ${error}`
          }
        }
      }
    )

    // Update frequentation
    ipcMain.handle(
      'frequentation:update',
      async (
        _event,
        id: number,
        updateDto: UpdateFrequentationDto
      ): Promise<FrequentationApiResponseDto> => {
        try {
          const result = await this.frequentationManager.update(id, updateDto)

          if (!result.success) {
            return {
              success: false,
              error: result.error || result.errors?.join(', ')
            }
          }

          const dto = this.frequentationManager.toResponseDto(result.data!)

          return {
            success: true,
            data: dto
          }
        } catch (error) {
          return {
            success: false,
            error: `Erreur lors de la mise à jour de la fréquentation: ${error}`
          }
        }
      }
    )

    // Delete frequentation
    ipcMain.handle(
      'frequentation:delete',
      async (_event, id: number): Promise<{ success: boolean; error?: string }> => {
        try {
          const result = await this.frequentationManager.delete(id)

          if (!result.success) {
            return {
              success: false,
              error: result.error
            }
          }

          return {
            success: true
          }
        } catch (error) {
          return {
            success: false,
            error: `Erreur lors de la suppression de la fréquentation: ${error}`
          }
        }
      }
    )

    // Get frequentations by student ID
    ipcMain.handle(
      'frequentation:getByStudentId',
      async (
        _event,
        studentId: number
      ): Promise<FrequentationApiResponseDto<FrequentationResponseDto[]>> => {
        try {
          const frequentations = await this.frequentationManager.findByStudentId(studentId)
          const dtos = await this.frequentationManager.toResponseDtos(frequentations)

          return {
            success: true,
            data: dtos
          }
        } catch (error) {
          return {
            success: false,
            error: `Erreur lors de la récupération des fréquentations de l'étudiant ${studentId}: ${error}`
          }
        }
      }
    )

    // Get frequentations by date range
    ipcMain.handle(
      'frequentation:getByDateRange',
      async (
        _event,
        startDate: string,
        endDate: string
      ): Promise<FrequentationApiResponseDto<FrequentationResponseDto[]>> => {
        try {
          const frequentations = await this.frequentationManager.findByDateRange(
            new Date(startDate),
            new Date(endDate)
          )
          const dtos = await this.frequentationManager.toResponseDtos(frequentations)

          return {
            success: true,
            data: dtos
          }
        } catch (error) {
          return {
            success: false,
            error: `Erreur lors de la récupération des fréquentations pour la période: ${error}`
          }
        }
      }
    )

    // Create multiple frequentations
    ipcMain.handle(
      'frequentation:createBatch',
      async (
        _event,
        createDtos: CreateFrequentationDto[]
      ): Promise<BulkFrequentationResponseDto> => {
        try {
          const result = await this.frequentationManager.createBatch(createDtos)

          if (!result.success) {
            return {
              success: false,
              errors: result.data?.errors || ['Erreur lors de la création en lot']
            }
          }

          return {
            success: true,
            created: result.data!.frequentations.length
          }
        } catch (error) {
          return {
            success: false,
            errors: [`Erreur serveur: ${error}`]
          }
        }
      }
    )

    // Validate frequentation data
    ipcMain.handle(
      'frequentation:validate',
      async (
        _event,
        frequentationDto: CreateFrequentationDto | UpdateFrequentationDto
      ): Promise<{ isValid: boolean; errors: string[] }> => {
        try {
          return this.frequentationManager.validate(frequentationDto)
        } catch (error) {
          return {
            isValid: false,
            errors: [`Erreur de validation: ${error}`]
          }
        }
      }
    )

    // Delete frequentations by student ID (used when deleting a student)
    ipcMain.handle(
      'frequentation:deleteByStudentId',
      async (_event, studentId: number): Promise<{ deleted: number; error?: string }> => {
        try {
          const deletedCount = await this.frequentationManager.deleteByStudentId(studentId)
          return { deleted: deletedCount }
        } catch (error) {
          return {
            deleted: 0,
            error: `Erreur lors de la suppression des fréquentations de l'étudiant: ${error}`
          }
        }
      }
    )

    // Get frequentations by single date (wrapper around getByDateRange)
    ipcMain.handle(
      'frequentation:getByDate',
      async (
        _event,
        date: string
      ): Promise<FrequentationApiResponseDto<FrequentationResponseDto[]>> => {
        try {
          // Create date range for entire day
          const queryDate = new Date(date)
          const startOfDay = new Date(queryDate)
          startOfDay.setHours(0, 0, 0, 0)

          const endOfDay = new Date(queryDate)
          endOfDay.setHours(23, 59, 59, 999)

          const frequentations = await this.frequentationManager.findByDateRange(
            startOfDay,
            endOfDay
          )
          const dtos = await this.frequentationManager.toResponseDtos(frequentations)

          return {
            success: true,
            data: dtos
          }
        } catch (error) {
          return {
            success: false,
            error: `Erreur lors de la récupération des fréquentations pour la date ${date}: ${error}`
          }
        }
      }
    )

    // Alias for getByStudentId
    ipcMain.handle(
      'frequentation:getByStudent',
      async (
        _event,
        studentId: number
      ): Promise<FrequentationApiResponseDto<FrequentationResponseDto[]>> => {
        try {
          const frequentations = await this.frequentationManager.findByStudentId(studentId)
          const dtos = await this.frequentationManager.toResponseDtos(frequentations)

          return {
            success: true,
            data: dtos
          }
        } catch (error) {
          return {
            success: false,
            error: `Erreur lors de la récupération des fréquentations de l'étudiant ${studentId}: ${error}`
          }
        }
      }
    )
  }
}
