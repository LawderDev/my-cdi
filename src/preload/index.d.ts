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
import type { PeriodRangeDto, StatsForPeriodDto } from '@statistics-shared'
import type {
  UpdateAvailableInfo,
  DownloadProgressInfo,
  UpdateDownloadedInfo,
  UpdateErrorInfo
} from '@shared/types/updater'

export type Unsubscribe = () => void

export interface StudentApi {
  create: (input: CreateStudentDto) => Promise<IpcResult<StudentResponseDto>>
  get: (input: { id: number }) => Promise<IpcResult<StudentResponseDto>>
  list: (input: { classe?: string }) => Promise<IpcResult<StudentListResponseDto>>
  update: (input: { id: number } & UpdateStudentDto) => Promise<IpcResult<StudentResponseDto>>
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

export interface StatisticsApi {
  getStats: (input: PeriodRangeDto) => Promise<IpcResult<StatsForPeriodDto>>
}

export interface UpdaterAPI {
  onUpdateAvailable: (listener: (info: UpdateAvailableInfo) => void) => Unsubscribe
  onUpdateNotAvailable: (listener: () => void) => Unsubscribe
  onDownloadProgress: (listener: (progress: DownloadProgressInfo) => void) => Unsubscribe
  onUpdateDownloaded: (listener: (info: UpdateDownloadedInfo) => void) => Unsubscribe
  onUpdateError: (listener: (error: UpdateErrorInfo) => void) => Unsubscribe
  checkForUpdates: () => Promise<unknown>
  quitAndInstall: () => Promise<void>
}

export interface ElectronAPI {
  student: StudentApi
  frequentation: FrequentationApi
  statistics: StatisticsApi
  getAppVersion: () => Promise<string>
  updater: UpdaterAPI
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
