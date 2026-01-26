import { contextBridge, ipcRenderer } from 'electron'

// Import types for better type safety
import {
  CreateStudentDto,
  UpdateStudentDto,
  StudentListResponseDto,
  StudentApiResponseDto,
  BulkStudentResponseDto,
  CreateFrequentationDto,
  UpdateFrequentationDto,
  FrequentationResponseDto,
  FrequentationApiResponseDto,
  BulkFrequentationResponseDto,
  JournalEntryDto
} from '../shared/types'

// Import legacy types for compatibility
import type { Student } from '../renderer/src/types/student'
import type { CreateFrequentationPayload } from '../renderer/src/types/frequentation'

// Enhanced API with both new and legacy methods
const api = {
  // Generic invoke method for new APIs
  invoke: <T = any>(channel: string, ...args: any[]): Promise<T> => {
    return ipcRenderer.invoke(channel, ...args)
  },

  // New Student APIs - type safe
  student: {
    create: (data: CreateStudentDto): Promise<StudentApiResponseDto> =>
      ipcRenderer.invoke('student:create', data),

    getAll: (): Promise<StudentListResponseDto> => ipcRenderer.invoke('student:getAll'),

    getById: (id: number): Promise<StudentApiResponseDto> =>
      ipcRenderer.invoke('student:getById', id),

    update: (id: number, data: UpdateStudentDto): Promise<StudentApiResponseDto> =>
      ipcRenderer.invoke('student:update', id, data),

    delete: (id: number): Promise<{ success: boolean; error?: string }> =>
      ipcRenderer.invoke('student:delete', id),

    getByClass: (classe: string): Promise<StudentListResponseDto> =>
      ipcRenderer.invoke('student:getByClass', classe),

    createBatch: (students: CreateStudentDto[]): Promise<BulkStudentResponseDto> =>
      ipcRenderer.invoke('student:createBatch', students),

    getStats: (): Promise<{ total: number; byClass: Record<string, number> }> =>
      ipcRenderer.invoke('student:getStats'),

    validate: (
      data: CreateStudentDto | UpdateStudentDto
    ): Promise<{ isValid: boolean; errors: string[] }> =>
      ipcRenderer.invoke('student:validate', data)
  },

  // New Frequentation APIs - type safe
  frequentation: {
    create: (data: CreateFrequentationDto): Promise<FrequentationApiResponseDto> =>
      ipcRenderer.invoke('frequentation:create', data),

    getAll: (): Promise<{ success: boolean; data?: FrequentationResponseDto[]; error?: string }> =>
      ipcRenderer.invoke('frequentation:getAll'),

    getById: (id: number): Promise<FrequentationApiResponseDto> =>
      ipcRenderer.invoke('frequentation:getById', id),

    update: (id: number, data: UpdateFrequentationDto): Promise<FrequentationApiResponseDto> =>
      ipcRenderer.invoke('frequentation:update', id, data),

    delete: (id: number): Promise<{ success: boolean; error?: string }> =>
      ipcRenderer.invoke('frequentation:delete', id),

    getByDateRange: (
      startDate: string,
      endDate: string
    ): Promise<{ success: boolean; data?: FrequentationResponseDto[]; error?: string }> =>
      ipcRenderer.invoke('frequentation:getByDateRange', startDate, endDate),

    getByStudent: (
      studentId: number
    ): Promise<{ success: boolean; data?: FrequentationResponseDto[]; error?: string }> =>
      ipcRenderer.invoke('frequentation:getByStudent', studentId),

    getByActivity: (
      activity: string
    ): Promise<{ success: boolean; data?: FrequentationResponseDto[]; error?: string }> =>
      ipcRenderer.invoke('frequentation:getByActivity', activity),

    createBatch: (
      frequentations: CreateFrequentationDto[]
    ): Promise<BulkFrequentationResponseDto> =>
      ipcRenderer.invoke('frequentation:createBatch', frequentations),

    getJournal: (
      startDate: string,
      endDate: string
    ): Promise<{ success: boolean; data?: JournalEntryDto[]; error?: string }> =>
      ipcRenderer.invoke('frequentation:getJournal', startDate, endDate),

    getStats: (
      startDate?: string,
      endDate?: string
    ): Promise<{
      total: number
      byActivity: Record<string, number>
      byStudent: Record<string, number>
      averageDuration?: string
    }> => ipcRenderer.invoke('frequentation:getStats', startDate, endDate),

    validate: (
      data: CreateFrequentationDto | UpdateFrequentationDto
    ): Promise<{ isValid: boolean; errors: string[] }> =>
      ipcRenderer.invoke('frequentation:validate', data)
  },

  // Legacy compatibility APIs - these will be gradually removed
  fetchStudentsWithoutFrequentationAt: (
    date: string
  ): Promise<{ success: boolean; data?: Student[]; error?: string }> =>
    ipcRenderer.invoke('student:getWithoutFrequentationAt', date),

  fetchAllStudents: (): Promise<{ success: boolean; data?: Student[]; error?: string }> =>
    ipcRenderer.invoke('student:getAll'),

  updateStudent: (
    id: number,
    nom: string,
    prenom: string,
    classe: string
  ): Promise<{ success: boolean; changes?: number; error?: string }> =>
    ipcRenderer.invoke('student:update', { id, nom, prenom, classe }),

  addMultipleStudents: (
    students: Array<{ nom: string; prenom: string; classe?: string }>
  ): Promise<{ success: boolean; count?: number; error?: string }> =>
    ipcRenderer.invoke('student:addMultiple', { students }),

  deleteStudents: (ids: number[]): Promise<{ success: boolean; count?: number; error?: string }> =>
    ipcRenderer.invoke('student:delete', { ids }),

  fetchFrequentationsAt: (
    date: string
  ): Promise<{ success: boolean; data?: Student[]; error?: string }> =>
    ipcRenderer.invoke('frequentation:getByDate', date),

  createFrequentations: (
    payload: CreateFrequentationPayload[]
  ): Promise<{ success: boolean; data?: Student[]; error?: string }> =>
    ipcRenderer.invoke('frequentation:addMultiple', { frequentations: payload }),

  deleteFrequentations: (
    ids: number[]
  ): Promise<{ success: boolean; ids?: number[]; error?: string }> =>
    ipcRenderer.invoke('frequentation:delete', { ids })
}

try {
  contextBridge.exposeInMainWorld('electronAPI', api)
} catch (error) {
  console.error('Failed to expose electronAPI:', error)
}

// Export types for TypeScript usage
export type ElectronAPI = typeof api
