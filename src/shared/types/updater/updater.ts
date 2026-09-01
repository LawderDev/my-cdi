export interface UpdateAvailableInfo {
  version: string
  releaseDate?: string
  releaseNotes?: string
}

export interface DownloadProgressInfo {
  percent: number
  bytesPerSecond: number
  transferred: number
  total: number
}

export interface UpdateDownloadedInfo {
  version: string
  releaseDate?: string
}

export interface UpdateErrorInfo {
  message: string
}

export type UpdaterEvent =
  | { kind: 'available'; payload: UpdateAvailableInfo }
  | { kind: 'not-available' }
  | { kind: 'progress'; payload: DownloadProgressInfo }
  | { kind: 'downloaded'; payload: UpdateDownloadedInfo }
  | { kind: 'error'; payload: UpdateErrorInfo }
