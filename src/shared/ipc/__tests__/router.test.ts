import { describe, it, expect, vi } from 'vitest'
import { createMainRouter } from '../router'

describe('createMainRouter', () => {
  it('registers and calls a procedure', async () => {
    const mockIpcMain = {
      handle: vi.fn(),
      removeHandler: vi.fn()
    }
    const router = createMainRouter(mockIpcMain)

    const handler = vi.fn().mockResolvedValue({ id: 1, nom: 'Test' })
    router.procedure('student.create', handler)

    expect(mockIpcMain.handle).toHaveBeenCalledWith('student.create', expect.any(Function))
  })

  it('wraps procedure calls with error handling', async () => {
    const mockIpcMain = {
      handle: vi.fn()
    }
    const router = createMainRouter(mockIpcMain)

    const handler = vi.fn().mockRejectedValue(new Error('DB error'))
    router.procedure('student.create', handler)

    const registeredHandler = mockIpcMain.handle.mock.calls[0][1]

    const result = await registeredHandler({}, { nom: 'Test' })
    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })
})
