// Student Module Types
// Module-specific types and interfaces for the student feature

import { StudentModel } from '../../../shared/types/models/student.model'
import {
  CreateStudentDto,
  UpdateStudentDto,
  StudentResponseDto
} from '../../../shared/types/dtos/student.dto'
import { StudentEntity } from '../../../main/types/entities/student.entity'

// Module-specific interfaces
export interface StudentModule {
  repository: StudentRepository
  manager: StudentManager
  controller: StudentController
}

// Repository interface (module-specific)
export interface StudentRepository {
  create(studentDto: CreateStudentDto): Promise<StudentEntity>
  findAll(): Promise<StudentEntity[]>
  findById(id: number): Promise<StudentEntity | null>
  update(id: number, updateDto: UpdateStudentDto): Promise<StudentEntity | null>
  delete(id: number): Promise<boolean>
  count(): Promise<number>
  findByClass(classe: string): Promise<StudentEntity[]>
  findWithoutFrequentationAtDate(date: string): Promise<StudentEntity[]>
}

// Manager interface (module-specific)
export interface StudentManager {
  create(createDto: CreateStudentDto): Promise<ManagerResponse<StudentModel>>
  findById(id: number): Promise<StudentModel | null>
  findAll(): Promise<StudentModel[]>
  update(id: number, updateDto: UpdateStudentDto): Promise<ManagerResponse<StudentModel>>
  delete(id: number): Promise<ManagerResponse<boolean>>
  validate(createDto: CreateStudentDto | UpdateStudentDto): { isValid: boolean; errors: string[] }
  findByClass(classe: string): Promise<StudentModel[]>
  getStudentStats(): Promise<{
    total: number
    byClass: Record<string, number>
  }>
  createBatch(createDtos: CreateStudentDto[]): Promise<
    ManagerResponse<{
      created: number
      errors: string[]
      students: StudentModel[]
    }>
  >
  toResponseDto(model: StudentModel): StudentResponseDto
  toResponseDtos(models: StudentModel[]): Promise<StudentResponseDto[]>
  findWithoutFrequentationAtDate(date: string): Promise<StudentModel[]>
}

// Controller interface (module-specific)
export interface StudentController {
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
export class StudentModuleError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message)
    this.name = 'StudentModuleError'
  }
}

// Validation result interface
export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

// Module configuration
export interface StudentModuleConfig {
  enableValidation: boolean
  enableStats: boolean
  maxBatchSize: number
}

// Default module configuration
export const DEFAULT_STUDENT_MODULE_CONFIG: StudentModuleConfig = {
  enableValidation: true,
  enableStats: true,
  maxBatchSize: 100
}
