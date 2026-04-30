import { useAutoUpdater } from '../../hooks/useAutoUpdater'
import { UpdateBannerView } from './components/UpdateBannerView'

export function UpdateBanner() {
  const { status, availableInfo, downloadedInfo, progress, errorInfo, installNow, dismiss } =
    useAutoUpdater()
  return (
    <UpdateBannerView
      status={status}
      versionAvailable={availableInfo?.version}
      versionDownloaded={downloadedInfo?.version}
      progressPercent={progress?.percent}
      errorMessage={errorInfo?.message}
      onInstall={installNow}
      onDismiss={dismiss}
    />
  )
}
