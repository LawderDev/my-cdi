import type { UpdaterStatus } from '../../../../../../hooks/useAutoUpdater'

export interface UpdateBannerViewProps {
  status: UpdaterStatus
  versionAvailable?: string
  versionDownloaded?: string
  progressPercent?: number
  errorMessage?: string
  onInstall: () => void
  onDismiss: () => void
}
