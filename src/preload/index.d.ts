import { ElectronAPI } from '@electron-toolkit/preload'

// Extend the toolkit's ElectronAPI with our custom IPC methods
export interface ElectronAPIExtended extends ElectronAPI {
  fetchStudentsWithoutFrequentationAt(date: string): {
    success: boolean
    data?: Student[]
    error?: string
  }
  fetchFrequentationsAt(date: string): {
    success: boolean
    data?: Frequentation[]
    error?: string
  }
  createFrequentations(payload: Array<Record<string, unknown>>): {
    success: boolean
    data?: Frequentation[]
    error?: string
  }
  deleteFrequentations(ids: number[]): {
    success: boolean
    ids?: number[]
    error?: string
  }
}

declare global {
  interface Window {
    electronAPI: ElectronAPIExtended
  }
}
