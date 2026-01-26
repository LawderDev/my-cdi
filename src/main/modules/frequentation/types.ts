// Frequentation Module Types
// Module-specific types and interfaces for the frequentation feature

import { FrequentationModel } from '../../../shared/types/models/frequentation.model'
import {
  CreateFrequentationDto,
  UpdateFrequentationDto,
  FrequentationResponseDto
} from '../../../shared/types/dtos/frequentation.dto'
import {
  FrequentationEntity,
  FrequentationWithStudentEntity
} from '../../../main/types/entities/frequentation.entity'

// Module-specific interfaces
export interface FrequentationModule {
  repository: FrequentationRepository
  manager: FrequentationManager
  controller: FrequentationController
}

// Repository interface (module-specific)
export interface FrequentationRepository {
  create(frequentationDto: CreateFrequentationDto): Promise<FrequentationEntity>
  findAll(): Promise<FrequentationEntity[]>
  findById(id: number): Promise<FrequentationEntity | null>
  update(id: number, updateDto: UpdateFrequentationDto): Promise<FrequentationEntity | null>
  delete(id: number): Promise<boolean>
  findByStudentId(studentId: number): Promise<FrequentationEntity[]>
  findByDateRange(startDate: Date, endDate: Date): Promise<FrequentationWithStudentEntity[]>
  findAllWithStudent(): Promise<FrequentationWithStudentEntity[]>
  count(): Promise<number>
  deleteByStudentId(studentId: number): Promise<number>
}

// Manager interface (module-specific)
export interface FrequentationManager {
  create(createDto: CreateFrequentationDto): Promise<ManagerResponse<FrequentationModel>>
  findById(id: number): Promise<FrequentationModel | null>
  findAll(): Promise<FrequentationModel[]>
  update(
    id: number,
    updateDto: UpdateFrequentationDto
  ): Promise<ManagerResponse<FrequentationModel>>
  delete(id: number): Promise<ManagerResponse<boolean>>
  validate(createDto: CreateFrequentationDto | UpdateFrequentationDto): {
    isValid: boolean
    errors: string[]
  }
  findByStudentId(studentId: number): Promise<FrequentationModel[]>
  findByDateRange(startDate: Date, endDate: Date): Promise<FrequentationModel[]>
  findAllWithStudent(): Promise<FrequentationModel[]>
  createBatch(createDtos: CreateFrequentationDto[]): Promise<
    ManagerResponse<{
      created: number
      errors: string[]
      frequentations: FrequentationModel[]
    }>
  >
  toResponseDto(model: FrequentationModel): FrequentationResponseDto
  toResponseDtos(models: FrequentationModel[]): Promise<FrequentationResponseDto[]>
  deleteByStudentId(studentId: number): Promise<number>
}

// Controller interface (module-specific)
export interface FrequentationController {
  registerHandlers(): void
}

// Manager response type (reused from base)
export interface ManagerResponse<T> {
  success: boolean
  data?: T
  error?: string
  errors?: string[]
}

// Module-specific error types
export class FrequentationModuleError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message)
    this.name = 'FrequentationModuleError'
  }
}

// Validation result interface
export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

// Date range for queries
export interface DateRange {
  start: Date
  end: Date
}

// Module configuration
export interface FrequentationModuleConfig {
  enableValidation: boolean
  enableStats: boolean
  maxBatchSize: number
  defaultActivityDuration: number // in minutes
}

// Default module configuration
export const DEFAULT_FREQUENTATION_MODULE_CONFIG: FrequentationModuleConfig = {
  enableValidation: true,
  enableStats: true,
  maxBatchSize: 100,
  defaultActivityDuration: 60
}
