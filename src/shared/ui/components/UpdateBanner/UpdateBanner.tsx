import { useAutoUpdater } from '../../hooks/useAutoUpdater'
import { buildProgressDisplay } from './helpers/buildProgressDisplay'
import { UpdateBannerView } from './components/UpdateBannerView'

export function UpdateBanner() {
  const { status, availableInfo, downloadedInfo, progress, errorInfo, installNow, dismiss } =
    useAutoUpdater()
  const { fillPercent, percentDisplay } = buildProgressDisplay(progress?.percent)
  return (
    <UpdateBannerView
      status={status}
      versionAvailable={availableInfo?.version}
      versionDownloaded={downloadedInfo?.version}
      fillPercent={fillPercent}
      percentDisplay={percentDisplay}
      errorMessage={errorInfo?.message}
      onInstall={installNow}
      onDismiss={dismiss}
    />
  )
}
