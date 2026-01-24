import { contextBridge, ipcRenderer } from 'electron'

const api = {
  fetchStudentsWithoutFrequentationAt: (date: string) =>
    ipcRenderer.invoke('student:getWithoutFrequentationAt', date),
  fetchFrequentationsAt: (date: string) => ipcRenderer.invoke('frequentation:getByDate', date),
  createFrequentations: (payload: Array<Record<string, unknown>>) =>
    ipcRenderer.invoke('frequentation:addMultiple', { frequentations: payload }),
  deleteFrequentations: (ids: number[]) => ipcRenderer.invoke('frequentation:delete', { ids })
}

try {
  contextBridge.exposeInMainWorld('electronAPI', api)
} catch (error) {
  console.error(error)
}
