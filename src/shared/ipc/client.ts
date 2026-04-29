import type { IpcRenderer } from 'electron'
import type { IpcResult } from './types'

export function createIpcClient(ipcRenderer: IpcRenderer) {
  return {
    async invoke<Input, Output>(channel: string, input: Input): Promise<IpcResult<Output>> {
      return ipcRenderer.invoke(channel, input)
    }
  }
}
