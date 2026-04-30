import { useEffect, useState } from 'react'
import type {
  UpdateAvailableInfo,
  UpdateDownloadedInfo,
  DownloadProgressInfo,
  UpdateErrorInfo
} from '@shared/types/updater'
import type { UseAutoUpdaterReturn, UpdaterStatus } from './types/UseAutoUpdaterReturn'

const STATUS_IDLE: UpdaterStatus = 'idle'
const STATUS_AVAILABLE: UpdaterStatus = 'available'
const STATUS_DOWNLOADING: UpdaterStatus = 'downloading'
const STATUS_DOWNLOADED: UpdaterStatus = 'downloaded'
const STATUS_ERROR: UpdaterStatus = 'error'

export function useAutoUpdater(): UseAutoUpdaterReturn {
  const [status, setStatus] = useState<UpdaterStatus>(STATUS_IDLE)
  const [availableInfo, setAvailableInfo] = useState<UpdateAvailableInfo | null>(null)
  const [downloadedInfo, setDownloadedInfo] = useState<UpdateDownloadedInfo | null>(null)
  const [progress, setProgress] = useState<DownloadProgressInfo | null>(null)
  const [errorInfo, setErrorInfo] = useState<UpdateErrorInfo | null>(null)

  useEffect(() => {
    const updater = window.electronAPI?.updater
    if (!updater) {
      return
    }
    const unsubscribers = [
      updater.onUpdateAvailable((info) => {
        setAvailableInfo(info)
        setStatus(STATUS_AVAILABLE)
      }),
      updater.onDownloadProgress((info) => {
        setProgress(info)
        setStatus(STATUS_DOWNLOADING)
      }),
      updater.onUpdateDownloaded((info) => {
        setDownloadedInfo(info)
        setStatus(STATUS_DOWNLOADED)
      }),
      updater.onUpdateError((info) => {
        setErrorInfo(info)
        setStatus(STATUS_ERROR)
      })
    ]
    return () => {
      for (const unsubscribe of unsubscribers) {
        unsubscribe()
      }
    }
  }, [])

  function installNow() {
    void window.electronAPI?.updater?.quitAndInstall()
  }

  function dismiss() {
    setStatus(STATUS_IDLE)
    setAvailableInfo(null)
    setDownloadedInfo(null)
    setProgress(null)
    setErrorInfo(null)
  }

  return {
    status,
    availableInfo,
    downloadedInfo,
    progress,
    errorInfo,
    installNow,
    dismiss
  }
}
