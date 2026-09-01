import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useBatchUpdateActivity } from '../useBatchUpdateActivity'
import { ActivityType } from '@types'

const ID_FIRST = 1
const ID_SECOND = 2
const EXPECTED_CALL_COUNT = 2

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('useBatchUpdateActivity', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      frequentation: {
        update: vi.fn().mockResolvedValue({ success: true, data: { id: 1 } })
      }
    })
  })

  it('updates activity for each selected id', async () => {
    const onSuccess = vi.fn()
    const { result } = renderHook(() => useBatchUpdateActivity({ onSuccess }), {
      wrapper: createWrapper()
    })

    act(() => result.current.mutate({ ids: [ID_FIRST, ID_SECOND], activity: ActivityType.READING }))
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(window.electronAPI.frequentation.update).toHaveBeenCalledTimes(EXPECTED_CALL_COUNT)
    expect(onSuccess).toHaveBeenCalled()
  })

  it('stops and surfaces the ipc error when an update fails', async () => {
    vi.stubGlobal('electronAPI', {
      frequentation: {
        update: vi.fn().mockResolvedValue({ success: false, error: 'boom' })
      }
    })
    const onSuccess = vi.fn()
    const { result } = renderHook(() => useBatchUpdateActivity({ onSuccess }), {
      wrapper: createWrapper()
    })

    act(() => result.current.mutate({ ids: [ID_FIRST, ID_SECOND], activity: ActivityType.READING }))
    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error?.message).toBe('boom')
    expect(window.electronAPI.frequentation.update).toHaveBeenCalledOnce()
    expect(onSuccess).not.toHaveBeenCalled()
  })
})
