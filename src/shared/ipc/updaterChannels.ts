export const UPDATER_CHANNELS = {
  UPDATE_AVAILABLE: 'updater:update-available',
  UPDATE_NOT_AVAILABLE: 'updater:update-not-available',
  DOWNLOAD_PROGRESS: 'updater:download-progress',
  UPDATE_DOWNLOADED: 'updater:update-downloaded',
  UPDATE_ERROR: 'updater:update-error',
  CHECK_FOR_UPDATES: 'updater:check-for-updates',
  QUIT_AND_INSTALL: 'updater:quit-and-install'
} as const

export type UpdaterChannel = (typeof UPDATER_CHANNELS)[keyof typeof UPDATER_CHANNELS]
