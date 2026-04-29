import type { IpcMain } from 'electron'
import type { IpcResult } from './types'
import { ErrorCode } from '@lib/errors'

export type IpcMainHandle = Pick<IpcMain, 'handle'>

function hasErrorCode(value: unknown): value is { code: string } {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  if (!('code' in value)) {
    return false
  }
  return typeof value.code === 'string'
}

export function createMainRouter(ipcMain: IpcMainHandle) {
  return {
    procedure<Input, Output>(channel: string, handler: (input: Input) => Promise<Output>) {
      ipcMain.handle(channel, async (_event, input: Input): Promise<IpcResult<Output>> => {
        try {
          const data = await handler(input)
          return { success: true, data }
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error'
          const code = hasErrorCode(error) ? error.code : ErrorCode.UNKNOWN_ERROR
          return { success: false, error: message, code: String(code) }
        }
      })
    }
  }
}
