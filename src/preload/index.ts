import { contextBridge, ipcRenderer } from 'electron'
import { STUDENT_CHANNELS, FREQUENTATION_CHANNELS } from '@shared/ipc/channels'

const APP_VERSION_CHANNEL = 'app:getVersion'

function invoke<Output>(channel: string, input: unknown): Promise<Output> {
  return ipcRenderer.invoke(channel, input)
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
  getAppVersion: async (): Promise<string> => {
    const result = await ipcRenderer.invoke(APP_VERSION_CHANNEL)
    if (
      typeof result === 'object' &&
      result !== null &&
      'data' in result &&
      typeof result.data === 'string'
    ) {
      return result.data
    }
    return ''
  }
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
