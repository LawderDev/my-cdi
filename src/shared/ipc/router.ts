import type { IpcMain } from 'electron'
import type { IpcResult } from './types'
import { ErrorCode } from '@lib/errors'

export function createMainRouter(ipcMain: IpcMain) {
  return {
    procedure<Input, Output>(channel: string, handler: (input: Input) => Promise<Output>) {
      ipcMain.handle(channel, async (_event, input: Input): Promise<IpcResult<Output>> => {
        try {
          const data = await handler(input)
          return { success: true, data }
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error'
          const code =
            error instanceof Error && 'code' in error
              ? (error as { code: string }).code
              : ErrorCode.UNKNOWN_ERROR
          return { success: false, error: message, code: String(code) }
        }
      })
    }
  }
}
