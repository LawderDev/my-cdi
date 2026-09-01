import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useBatchDelete } from '../useBatchDelete'

const ID_FIRST = 1
const ID_SECOND = 2
const ID_THIRD = 3
const EXPECTED_CALL_COUNT = 3

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('useBatchDelete (frequentation)', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      frequentation: {
        delete: vi.fn().mockResolvedValue({ success: true })
      }
    })
  })

  it('deletes each selected entry', async () => {
    const onSuccess = vi.fn()
    const { result } = renderHook(() => useBatchDelete({ onSuccess }), {
      wrapper: createWrapper()
    })

    act(() => result.current.mutate([ID_FIRST, ID_SECOND, ID_THIRD]))
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(window.electronAPI.frequentation.delete).toHaveBeenCalledTimes(EXPECTED_CALL_COUNT)
    expect(onSuccess).toHaveBeenCalled()
  })

  it('stops and surfaces the ipc error when a delete fails', async () => {
    vi.stubGlobal('electronAPI', {
      frequentation: {
        delete: vi.fn().mockResolvedValue({ success: false, error: 'boom' })
      }
    })
    const onSuccess = vi.fn()
    const { result } = renderHook(() => useBatchDelete({ onSuccess }), {
      wrapper: createWrapper()
    })

    act(() => result.current.mutate([ID_FIRST, ID_SECOND, ID_THIRD]))
    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error?.message).toBe('boom')
    expect(window.electronAPI.frequentation.delete).toHaveBeenCalledOnce()
    expect(onSuccess).not.toHaveBeenCalled()
  })
})
