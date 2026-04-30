import type {
  UpdateAvailableInfo,
  UpdateDownloadedInfo,
  DownloadProgressInfo,
  UpdateErrorInfo
} from '@shared/types/updater'

export type UpdaterStatus = 'idle' | 'available' | 'downloading' | 'downloaded' | 'error'

export interface UseAutoUpdaterReturn {
  status: UpdaterStatus
  availableInfo: UpdateAvailableInfo | null
  downloadedInfo: UpdateDownloadedInfo | null
  progress: DownloadProgressInfo | null
  errorInfo: UpdateErrorInfo | null
  installNow: () => void
  dismiss: () => void
}
