import type { IpcResult } from '@shared/ipc/types'
import type {
  CreateStudentDto,
  UpdateStudentDto,
  StudentResponseDto,
  StudentListResponseDto,
  BulkStudentResponseDto
} from '@student-shared'
import type {
  CreateFrequentationDto,
  UpdateFrequentationDto,
  CreateFrequentationBatchDto,
  FrequentationResponseDto,
  JournalEntryDto
} from '@frequentation-shared'

export interface StudentApi {
  create: (input: CreateStudentDto) => Promise<IpcResult<StudentResponseDto>>
  get: (input: { id: number }) => Promise<IpcResult<StudentResponseDto>>
  list: (input: { classe?: string }) => Promise<IpcResult<StudentListResponseDto>>
  update: (
    input: { id: number } & UpdateStudentDto
  ) => Promise<IpcResult<StudentResponseDto>>
  delete: (input: { id: number }) => Promise<IpcResult<void>>
  importCsv: (input: { csv: string }) => Promise<IpcResult<BulkStudentResponseDto>>
}

export interface FrequentationApi {
  create: (input: CreateFrequentationDto) => Promise<IpcResult<FrequentationResponseDto>>
  get: (input: { id: number }) => Promise<IpcResult<FrequentationResponseDto>>
  list: (input: { studentId?: number }) => Promise<IpcResult<FrequentationResponseDto[]>>
  update: (
    input: { id: number } & UpdateFrequentationDto
  ) => Promise<IpcResult<FrequentationResponseDto>>
  delete: (input: { id: number }) => Promise<IpcResult<void>>
  createBatch: (input: CreateFrequentationBatchDto) => Promise<IpcResult<{ created: number }>>
  getJournalEntries: (input: {
    startDate: string
    endDate: string
  }) => Promise<IpcResult<JournalEntryDto[]>>
}

export interface ElectronAPI {
  student: StudentApi
  frequentation: FrequentationApi
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
