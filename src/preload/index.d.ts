import { ElectronAPI } from '@electron-toolkit/preload'

// Import shared types for new APIs
import {
  CreateStudentDto,
  UpdateStudentDto,
  StudentApiResponseDto,
  StudentListResponseDto,
  BulkStudentResponseDto,
  CreateFrequentationDto,
  UpdateFrequentationDto,
  FrequentationResponseDto,
  FrequentationApiResponseDto,
  BulkFrequentationResponseDto,
  JournalEntryDto
} from '../../../shared/types'

// Legacy types for compatibility
export interface Student {
  id: number
  nom: string
  prenom: string
  classe: string
}

export interface CreateFrequentationPayload {
  startsAt: string
  activity: string
  studentId: number
}

export interface Frequentation {
  id: number
  starts_at: string
  activity: string
  created_at: string
  student: Student
  formattedStartTime: string
}

// Enhanced ElectronAPI interface
export interface ElectronAPIExtended extends ElectronAPI {
  // Generic invoke method for new APIs
  invoke<T = unknown>(channel: string, ...args: unknown[]): Promise<T>

  // New Student APIs - type safe
  student: {
    create: (data: CreateStudentDto) => Promise<StudentApiResponseDto>
    getAll: () => Promise<StudentListResponseDto>
    getById: (id: number) => Promise<StudentApiResponseDto>
    update: (id: number, data: UpdateStudentDto) => Promise<StudentApiResponseDto>
    delete: (id: number) => Promise<{ success: boolean; error?: string }>
    getByClass: (classe: string) => Promise<StudentListResponseDto>
    createBatch: (students: CreateStudentDto[]) => Promise<BulkStudentResponseDto>
    getStats: () => Promise<{ total: number; byClass: Record<string, number> }>
    validate: (
      data: CreateStudentDto | UpdateStudentDto
    ) => Promise<{ isValid: boolean; errors: string[] }>
  }

  // New Frequentation APIs - type safe
  frequentation: {
    create: (data: CreateFrequentationDto) => Promise<FrequentationApiResponseDto>
    getAll: () => Promise<{ success: boolean; data?: FrequentationResponseDto[]; error?: string }>
    getById: (id: number) => Promise<FrequentationApiResponseDto>
    update: (id: number, data: UpdateFrequentationDto) => Promise<FrequentationApiResponseDto>
    delete: (id: number) => Promise<{ success: boolean; error?: string }>
    getByDateRange: (
      startDate: string,
      endDate: string
    ) => Promise<{ success: boolean; data?: FrequentationResponseDto[]; error?: string }>
    getByStudent: (
      studentId: number
    ) => Promise<{ success: boolean; data?: FrequentationResponseDto[]; error?: string }>
    getByActivity: (
      activity: string
    ) => Promise<{ success: boolean; data?: FrequentationResponseDto[]; error?: string }>
    createBatch: (frequentations: CreateFrequentationDto[]) => Promise<BulkFrequentationResponseDto>
    getJournal: (
      startDate: string,
      endDate: string
    ) => Promise<{ success: boolean; data?: JournalEntryDto[]; error?: string }>
    getStats: (
      startDate?: string,
      endDate?: string
    ) => Promise<{
      total: number
      byActivity: Record<string, number>
      byStudent: Record<string, number>
      averageDuration?: string
    }>
    validate: (
      data: CreateFrequentationDto | UpdateFrequentationDto
    ) => Promise<{ isValid: boolean; errors: string[] }>
  }

  // Legacy compatibility APIs
  fetchStudentsWithoutFrequentationAt(date: string): Promise<{
    success: boolean
    data?: Student[]
    error?: string
  }>

  fetchAllStudents(): Promise<{ success: boolean; data?: Student[]; error?: string }>

  updateStudent(
    id: number,
    nom: string,
    prenom: string,
    classe: string
  ): Promise<{ success: boolean; changes?: number; error?: string }>

  addMultipleStudents(
    students: Array<{ nom: string; prenom: string; classe?: string }>
  ): Promise<{ success: boolean; count?: number; error?: string }>

  deleteStudents(ids: number[]): Promise<{ success: boolean; count?: number; error?: string }>

  fetchFrequentationsAt(date: string): Promise<{
    success: boolean
    data?: Student[]
    error?: string
  }>

  createFrequentations(payload: CreateFrequentationPayload[]): Promise<{
    success: boolean
    data?: Student[]
    error?: string
  }>

  deleteFrequentations(ids: number[]): Promise<{
    success: boolean
    ids?: number[]
    error?: string
  }>
}

declare global {
  interface Window {
    electronAPI: ElectronAPIExtended
  }
}
