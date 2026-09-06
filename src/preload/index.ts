import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron'
import {
  APP_CHANNELS,
  STUDENT_CHANNELS,
  FREQUENTATION_CHANNELS,
  STATISTICS_CHANNELS,
  SETTINGS_CHANNELS
} from '@shared/ipc/channels'
import { UPDATER_CHANNELS, type UpdaterChannel } from '@shared/ipc/updaterChannels'
import { parseThemePreferenceFromArgv } from '@lib/themePreference'

function invoke<Output>(channel: string, input: unknown): Promise<Output> {
  return ipcRenderer.invoke(channel, input)
}

type UpdaterListener = (...args: unknown[]) => void

function subscribeToChannel(channel: UpdaterChannel, listener: UpdaterListener): () => void {
  const wrapped = (_event: IpcRendererEvent, ...args: unknown[]) => listener(...args)
  ipcRenderer.on(channel, wrapped)
  return () => {
    ipcRenderer.removeListener(channel, wrapped)
  }
}

const electronAPI = {
  student: {
    create: (input: unknown) => invoke(STUDENT_CHANNELS.CREATE, input),
    get: (input: unknown) => invoke(STUDENT_CHANNELS.GET, input),
    list: (input: unknown) => invoke(STUDENT_CHANNELS.LIST, input),
    update: (input: unknown) => invoke(STUDENT_CHANNELS.UPDATE, input),
    delete: (input: unknown) => invoke(STUDENT_CHANNELS.DELETE, input),
    importCsv: (input: unknown) => invoke(STUDENT_CHANNELS.IMPORT_CSV, input)
  },
  frequentation: {
    create: (input: unknown) => invoke(FREQUENTATION_CHANNELS.CREATE, input),
    get: (input: unknown) => invoke(FREQUENTATION_CHANNELS.GET, input),
    list: (input: unknown) => invoke(FREQUENTATION_CHANNELS.LIST, input),
    update: (input: unknown) => invoke(FREQUENTATION_CHANNELS.UPDATE, input),
    delete: (input: unknown) => invoke(FREQUENTATION_CHANNELS.DELETE, input),
    createBatch: (input: unknown) => invoke(FREQUENTATION_CHANNELS.CREATE_BATCH, input),
    getJournalEntries: (input: unknown) => invoke(FREQUENTATION_CHANNELS.GET_JOURNAL_ENTRIES, input)
  },
  statistics: {
    getStats: (input: unknown) => invoke(STATISTICS_CHANNELS.GET_STATS, input)
  },
  settings: {
    getTheme: () => invoke(SETTINGS_CHANNELS.GET_THEME, undefined),
    setTheme: (input: unknown) => invoke(SETTINGS_CHANNELS.SET_THEME, input)
  },
  getInitialThemePreference: () => parseThemePreferenceFromArgv(process.argv),
  getAppVersion: async (): Promise<string> => {
    const result = await ipcRenderer.invoke(APP_CHANNELS.GET_VERSION)
    if (
      typeof result === 'object' &&
      result !== null &&
      'data' in result &&
      typeof result.data === 'string'
    ) {
      return result.data
    }
    return ''
  },
  updater: {
    onUpdateAvailable: (listener: UpdaterListener) =>
      subscribeToChannel(UPDATER_CHANNELS.UPDATE_AVAILABLE, listener),
    onUpdateNotAvailable: (listener: UpdaterListener) =>
      subscribeToChannel(UPDATER_CHANNELS.UPDATE_NOT_AVAILABLE, listener),
    onDownloadProgress: (listener: UpdaterListener) =>
      subscribeToChannel(UPDATER_CHANNELS.DOWNLOAD_PROGRESS, listener),
    onUpdateDownloaded: (listener: UpdaterListener) =>
      subscribeToChannel(UPDATER_CHANNELS.UPDATE_DOWNLOADED, listener),
    onUpdateError: (listener: UpdaterListener) =>
      subscribeToChannel(UPDATER_CHANNELS.UPDATE_ERROR, listener),
    checkForUpdates: () => ipcRenderer.invoke(UPDATER_CHANNELS.CHECK_FOR_UPDATES),
    quitAndInstall: () => ipcRenderer.invoke(UPDATER_CHANNELS.QUIT_AND_INSTALL)
  }
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
