// Frequentation Module Manager
// Business logic layer for frequentation operations

import { FrequentationRepository } from './types'
import { FrequentationManager, ManagerResponse } from './types'
import {
  FrequentationModel,
  CreateFrequentationDto,
  UpdateFrequentationDto,
  FrequentationResponseDto
} from '../../../shared/types'
import { createFrequentationModelFromEntityWithStudent } from './models'
import { FrequentationBusinessOperations } from './models'

export class FrequentationModuleManager implements FrequentationManager {
  constructor(private frequentationRepository: FrequentationRepository) {}

  async create(createDto: CreateFrequentationDto): Promise<ManagerResponse<FrequentationModel>> {
    try {
      // Validate input
      const validation = FrequentationBusinessOperations.validate({
        startsAt: new Date(createDto.startsAt),
        activity: createDto.activity,
        studentId: createDto.studentId
      } as Partial<FrequentationModel>)

      if (!validation.isValid) {
        return {
          success: false,
          errors: validation.errors
        }
      }

      // Validate that startsAt is not empty (basic business rule)
      const startsAt = new Date(createDto.startsAt)
      if (!startsAt || isNaN(startsAt.getTime())) {
        return {
          success: false,
          error: 'Date et heure de fréquentation invalides'
        }
      }

      const entity = await this.frequentationRepository.create(createDto)

      // Get frequentation with student info for the model
      const frequentationsWithStudent = await this.frequentationRepository.findAllWithStudent()
      const createdWithStudent = frequentationsWithStudent.find((f) => f.id === entity.id)

      if (!createdWithStudent) {
        return {
          success: false,
          error: 'Erreur lors de la récupération de la fréquentation créée'
        }
      }

      const model = createFrequentationModelFromEntityWithStudent(createdWithStudent)

      return {
        success: true,
        data: model
      }
    } catch (error) {
      return {
        success: false,
        error: `Erreur lors de la création de la fréquentation: ${error}`
      }
    }
  }

  async findById(id: number): Promise<FrequentationModel | null> {
    // For single frequentation lookup, we need to get with student info
    const frequentationsWithStudent = await this.frequentationRepository.findAllWithStudent()
    const entity = frequentationsWithStudent.find((f) => f.id === id)

    return entity ? createFrequentationModelFromEntityWithStudent(entity) : null
  }

  async findAll(): Promise<FrequentationModel[]> {
    const entities = await this.frequentationRepository.findAllWithStudent()
    return entities.map(createFrequentationModelFromEntityWithStudent)
  }

  async update(
    id: number,
    updateDto: UpdateFrequentationDto
  ): Promise<ManagerResponse<FrequentationModel>> {
    try {
      // Validate input - only validate provided fields for partial updates
      const validationObject: Partial<FrequentationModel> = {}
      if (updateDto.startsAt !== undefined) {
        validationObject.startsAt = new Date(updateDto.startsAt)
      }
      if (updateDto.activity !== undefined) {
        validationObject.activity = updateDto.activity
      }
      if (updateDto.studentId !== undefined) {
        validationObject.studentId = updateDto.studentId
      }

      const validation = FrequentationBusinessOperations.validate(validationObject)

      if (!validation.isValid) {
        return {
          success: false,
          errors: validation.errors
        }
      }

      // Check if frequentation exists
      const existingEntity = await this.frequentationRepository.findById(id)
      if (!existingEntity) {
        return {
          success: false,
          error: 'Fréquentation non trouvée'
        }
      }

      // Validate date constraints if updating startsAt
      if (updateDto.startsAt) {
        const newStartsAt = new Date(updateDto.startsAt)
        if (newStartsAt > new Date()) {
          return {
            success: false,
            error: 'La date et heure de fréquentation ne peuvent pas être dans le futur'
          }
        }
      }

      const entity = await this.frequentationRepository.update(id, updateDto)

      if (!entity) {
        return {
          success: false,
          error: 'Échec de la mise à jour de la fréquentation'
        }
      }

      // Get updated frequentation with student info
      const frequentationsWithStudent = await this.frequentationRepository.findAllWithStudent()
      const updatedWithStudent = frequentationsWithStudent.find((f) => f.id === entity.id)

      if (!updatedWithStudent) {
        return {
          success: false,
          error: 'Erreur lors de la récupération de la fréquentation mise à jour'
        }
      }

      const model = createFrequentationModelFromEntityWithStudent(updatedWithStudent)

      return {
        success: true,
        data: model
      }
    } catch (error) {
      return {
        success: false,
        error: `Update failed: ${error}`
      }
    }
  }

  async delete(id: number): Promise<ManagerResponse<boolean>> {
    try {
      // Check if frequentation exists
      const frequentation = await this.frequentationRepository.findById(id)
      if (!frequentation) {
        return {
          success: false,
          error: 'Fréquentation non trouvée'
        }
      }

      const deleted = await this.frequentationRepository.delete(id)

      if (!deleted) {
        return {
          success: false,
          error: 'Échec de la suppression de la fréquentation'
        }
      }

      return {
        success: true,
        data: true
      }
    } catch (error) {
      return {
        success: false,
        error: `Erreur lors de la suppression de la fréquentation: ${error}`
      }
    }
  }

  validate(createDto: CreateFrequentationDto | UpdateFrequentationDto): {
    isValid: boolean
    errors: string[]
  } {
    const validationObject: Partial<FrequentationModel> = {}
    if (createDto.startsAt !== undefined) {
      validationObject.startsAt = new Date(createDto.startsAt)
    }
    if (createDto.activity !== undefined) {
      validationObject.activity = createDto.activity
    }
    if (createDto.studentId !== undefined) {
      validationObject.studentId = createDto.studentId
    }
    return FrequentationBusinessOperations.validate(validationObject)
  }

  // Business-specific methods
  async findByStudentId(studentId: number): Promise<FrequentationModel[]> {
    const entities = await this.frequentationRepository.findAllWithStudent()
    const studentFrequentations = entities.filter((f) => f.student_id === studentId)
    return studentFrequentations.map(createFrequentationModelFromEntityWithStudent)
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<FrequentationModel[]> {
    const entities = await this.frequentationRepository.findByDateRange(startDate, endDate)
    return entities.map(createFrequentationModelFromEntityWithStudent)
  }

  async findAllWithStudent(): Promise<FrequentationModel[]> {
    const entities = await this.frequentationRepository.findAllWithStudent()
    return entities.map(createFrequentationModelFromEntityWithStudent)
  }

  async createBatch(createDtos: CreateFrequentationDto[]): Promise<
    ManagerResponse<{
      created: number
      errors: string[]
      frequentations: FrequentationModel[]
    }>
  > {
    const errors: string[] = []
    const successfulFrequentations: FrequentationModel[] = []
    let createdCount = 0

    for (const dto of createDtos) {
      const result = await this.create(dto)
      if (result.success && result.data) {
        createdCount++
        successfulFrequentations.push(result.data)
      } else {
        errors.push(
          `Fréquentation ${dto.activity} (${dto.startsAt}): ${result.error || result.errors?.join(', ')}`
        )
      }
    }

    return {
      success: createdCount > 0,
      data: {
        created: createdCount,
        errors,
        frequentations: successfulFrequentations
      }
    }
  }

  // Transform model to DTO for API responses
  toResponseDto(model: FrequentationModel): FrequentationResponseDto {
    return {
      id: model.id,
      startsAt: model.startsAt.toISOString(),
      activity: model.activity,
      student: {
        id: model.studentId,
        nom: model.studentName.split(' ')[1] || '',
        prenom: model.studentName.split(' ')[0] || '',
        classe: model.studentClass
      }
    }
  }

  async toResponseDtos(models: FrequentationModel[]): Promise<FrequentationResponseDto[]> {
    return models.map((model) => this.toResponseDto(model))
  }

  async deleteByStudentId(studentId: number): Promise<number> {
    return await this.frequentationRepository.deleteByStudentId(studentId)
  }
}
