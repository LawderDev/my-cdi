import type { UpdaterStatus } from '../../../../../../hooks/useAutoUpdater'

export interface UpdateBannerPresenterProps {
  status: UpdaterStatus
  versionAvailable?: string
  versionDownloaded?: string
  fillPercent: number
  percentDisplay: string
  errorMessage?: string
  onInstall: () => void
  onDismiss: () => void
}
