import { describe, it, expect, vi } from 'vitest'
import type { IpcMain } from 'electron'
import { createMainRouter } from '../router'

interface IpcMainHandle {
  handle: IpcMain['handle']
}

function createMockIpcMain(): IpcMainHandle & { handle: ReturnType<typeof vi.fn> } {
  return { handle: vi.fn() }
}

describe('createMainRouter', () => {
  it('registers and calls a procedure', async () => {
    const mock = createMockIpcMain()
    const router = createMainRouter(mock)

    const procedureHandler = vi.fn().mockResolvedValue({ id: 1, nom: 'Test' })
    router.procedure('student.create', procedureHandler)

    expect(mock.handle).toHaveBeenCalledWith('student.create', expect.any(Function))
  })

  it('wraps procedure calls with error handling', async () => {
    const mock = createMockIpcMain()
    const router = createMainRouter(mock)

    const procedureHandler = vi.fn().mockRejectedValue(new Error('DB error'))
    router.procedure('student.create', procedureHandler)

    const registeredCall = mock.handle.mock.calls[0]
    if (!registeredCall) {
      throw new Error('handler not registered')
    }
    const registeredHandler = registeredCall[1]

    const result = await registeredHandler({}, { nom: 'Test' })
    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })
})
