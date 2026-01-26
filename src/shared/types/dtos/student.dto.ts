// Student DTOs - Data Transfer Objects for Student API

// Create student request
export interface CreateStudentDto {
  nom: string
  prenom: string
  classe: string
}

// Update student request (all fields optional for partial updates)
export interface UpdateStudentDto {
  nom?: string
  prenom?: string
  classe?: string
}

// Student response (what frontend receives)
export interface StudentResponseDto {
  id: number
  nom: string
  prenom: string
  classe: string
}

// Student list response
export interface StudentListResponseDto {
  students: StudentResponseDto[]
  total: number
}

// API response wrapper
export interface StudentApiResponseDto<T = StudentResponseDto> {
  success: boolean
  data?: T
  error?: string
}

// Bulk operations
export interface CreateMultipleStudentsDto {
  students: CreateStudentDto[]
}

export interface BulkStudentResponseDto {
  success: boolean
  created?: number
  errors?: string[]
}
