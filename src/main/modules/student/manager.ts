// Student Module Manager
// Business logic layer for student operations

import { StudentRepository } from './types'
import { StudentManager, ManagerResponse } from './types'
import {
  StudentModel,
  CreateStudentDto,
  UpdateStudentDto,
  StudentResponseDto
} from '../../../shared/types'
import { createStudentModelFromEntity } from './models'
import { StudentBusinessOperations, StudentCollectionOperations } from './models'

export class StudentModuleManager implements StudentManager {
  constructor(private studentRepository: StudentRepository) {}

  async create(createDto: CreateStudentDto): Promise<ManagerResponse<StudentModel>> {
    try {
      // Validate input
      const validation = StudentBusinessOperations.validate(createDto)
      if (!validation.isValid) {
        return {
          success: false,
          errors: validation.errors
        }
      }

      // Check if student with same name already exists
      const existingStudents = await this.studentRepository.findAll()
      const existingModels = existingStudents.map(createStudentModelFromEntity)
      const duplicate = existingModels.find(
        (s) =>
          s.nom.toLowerCase() === createDto.nom.trim().toLowerCase() &&
          s.prenom.toLowerCase() === createDto.prenom.trim().toLowerCase()
      )

      if (duplicate) {
        return {
          success: false,
          error: 'Un étudiant avec le même nom et prénom existe déjà'
        }
      }

      const entity = await this.studentRepository.create(createDto)
      const model = createStudentModelFromEntity(entity)

      return {
        success: true,
        data: model
      }
    } catch (error) {
      return {
        success: false,
        error: `Erreur lors de la création de l'étudiant: ${error}`
      }
    }
  }

  async findById(id: number): Promise<StudentModel | null> {
    const entity = await this.studentRepository.findById(id)
    return entity ? createStudentModelFromEntity(entity) : null
  }

  async findAll(): Promise<StudentModel[]> {
    const entities = await this.studentRepository.findAll()
    return entities.map(createStudentModelFromEntity)
  }

  async update(id: number, updateDto: UpdateStudentDto): Promise<ManagerResponse<StudentModel>> {
    try {
      // Validate input
      const validation = StudentBusinessOperations.validate(updateDto)
      if (!validation.isValid) {
        return {
          success: false,
          errors: validation.errors
        }
      }

      // Check if student exists
      const existingEntity = await this.studentRepository.findById(id)
      if (!existingEntity) {
        return {
          success: false,
          error: 'Étudiant non trouvé'
        }
      }

      // Check for duplicates (excluding current student)
      if (updateDto.nom || updateDto.prenom) {
        const allEntities = await this.studentRepository.findAll()
        const existingModel = createStudentModelFromEntity(existingEntity)
        const duplicate = allEntities.find(
          (e) =>
            e.id !== id &&
            e.nom.toLowerCase() === (updateDto.nom || existingModel.nom).toLowerCase() &&
            e.prenom.toLowerCase() === (updateDto.prenom || existingModel.prenom).toLowerCase()
        )

        if (duplicate) {
          return {
            success: false,
            error: 'Un étudiant avec le même nom et prénom existe déjà'
          }
        }
      }

      const entity = await this.studentRepository.update(id, updateDto)
      if (!entity) {
        return {
          success: false,
          error: "Échec de la mise à jour de l'étudiant"
        }
      }

      const model = createStudentModelFromEntity(entity)

      return {
        success: true,
        data: model
      }
    } catch (error) {
      return {
        success: false,
        error: `Erreur lors de la mise à jour de l'étudiant: ${error}`
      }
    }
  }

  async delete(id: number): Promise<ManagerResponse<boolean>> {
    try {
      // Check if student exists
      const student = await this.studentRepository.findById(id)
      if (!student) {
        return {
          success: false,
          error: 'Étudiant non trouvé'
        }
      }

      // Note: Frequentation deletion would be handled by the frequentation module
      // or through a service orchestrator

      const deleted = await this.studentRepository.delete(id)

      if (!deleted) {
        return {
          success: false,
          error: "Échec de la suppression de l'étudiant"
        }
      }

      return {
        success: true,
        data: true
      }
    } catch (error) {
      return {
        success: false,
        error: `Erreur lors de la suppression de l'étudiant: ${error}`
      }
    }
  }

  validate(createDto: CreateStudentDto | UpdateStudentDto): { isValid: boolean; errors: string[] } {
    return StudentBusinessOperations.validate(createDto)
  }

  // Business-specific methods
  async findByClass(classe: string): Promise<StudentModel[]> {
    const entities = await this.studentRepository.findByClass(classe)
    return entities.map(createStudentModelFromEntity)
  }

  async getStudentStats(): Promise<{
    total: number
    byClass: Record<string, number>
  }> {
    const models = await this.findAll()
    const stats = StudentCollectionOperations.getStats(models)
    return {
      total: stats.total,
      byClass: stats.byClass
    }
  }

  async createBatch(createDtos: CreateStudentDto[]): Promise<
    ManagerResponse<{
      created: number
      errors: string[]
      students: StudentModel[]
    }>
  > {
    const errors: string[] = []
    const successfulStudents: StudentModel[] = []
    let createdCount = 0

    for (const dto of createDtos) {
      const result = await this.create(dto)
      if (result.success && result.data) {
        createdCount++
        successfulStudents.push(result.data)
      } else {
        errors.push(
          `Étudiant ${dto.prenom} ${dto.nom}: ${result.error || result.errors?.join(', ')}`
        )
      }
    }

    return {
      success: createdCount > 0,
      data: {
        created: createdCount,
        errors,
        students: successfulStudents
      }
    }
  }

  // Transform model to DTO for API responses
  toResponseDto(model: StudentModel): StudentResponseDto {
    return {
      id: model.id,
      nom: model.nom,
      prenom: model.prenom,
      classe: model.classe
    }
  }

  async toResponseDtos(models: StudentModel[]): Promise<StudentResponseDto[]> {
    return models.map((model) => this.toResponseDto(model))
  }

  async findWithoutFrequentationAtDate(date: string): Promise<StudentModel[]> {
    const entities = await this.studentRepository.findWithoutFrequentationAtDate(date)
    return entities.map(createStudentModelFromEntity)
  }
}
