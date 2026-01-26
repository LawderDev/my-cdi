// Frequentation DTOs - Data Transfer Objects for Frequentation API

// Create frequentation request
export interface CreateFrequentationDto {
  startsAt: string // ISO string
  activity: string
  studentId: number
}

// Update frequentation request
export interface UpdateFrequentationDto {
  startsAt?: string // ISO string
  activity?: string
  studentId?: number
}

// Frequentation response (what frontend receives)
export interface FrequentationResponseDto {
  id: number
  startsAt: string // ISO string
  activity: string
  student: {
    id: number
    nom: string
    prenom: string
    classe: string
  }
}

// Frequentation list response
export interface FrequentationListResponseDto {
  frequentations: FrequentationResponseDto[]
  total: number
}

// API response wrapper
export interface FrequentationApiResponseDto<T = FrequentationResponseDto> {
  success: boolean
  data?: T
  error?: string
}

// Bulk operations
export interface CreateMultipleFrequentationsDto {
  frequentations: CreateFrequentationDto[]
}

export interface BulkFrequentationResponseDto {
  success: boolean
  created?: number
  errors?: string[]
}

// Journal specific DTOs (for daily/monthly views)
export interface JournalEntryDto {
  id: number
  startsAt: string
  activity: string
  studentId: number
  studentName: string // "prenom nom" for display
  studentClass: string
}
