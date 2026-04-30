import type { ActivityType } from '@types'

export interface CreateFrequentationDto {
  startsAt: string
  activity: ActivityType
  studentId: number
}

export interface UpdateFrequentationDto {
  startsAt?: string
  activity?: ActivityType
  studentId?: number
}

export interface CreateFrequentationBatchDto {
  frequentations: CreateFrequentationDto[]
}

export interface FrequentationResponseDto {
  id: number
  startsAt: string
  activity: ActivityType
  studentId: number
  studentName: string
  studentClass: string
  studentIne: string
  createdAt: string
  updatedAt: string
}

export interface JournalEntryDto {
  frequentation: FrequentationResponseDto
  student: {
    id: number
    nom: string
    prenom: string
    classe: string
    ine: string
  }
}

export interface DateRangeDto {
  startDate: string
  endDate: string
}
