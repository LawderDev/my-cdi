import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useBatchDelete } from '../useBatchDelete'

const STUDENT_ID_FIRST = 1
const STUDENT_ID_SECOND = 2
const FIRST_CALL = 1
const SECOND_CALL = 2

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('useBatchDelete', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        delete: vi.fn().mockResolvedValue({ success: true, data: undefined })
      }
    })
  })

  it('deletes each selected student via single-id calls', async () => {
    const onSuccess = vi.fn()
    const { result } = renderHook(() => useBatchDelete({ onSuccess }), {
      wrapper: createWrapper()
    })

    act(() => {
      result.current.mutate([STUDENT_ID_FIRST, STUDENT_ID_SECOND])
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(window.electronAPI.student.delete).toHaveBeenCalledTimes(SECOND_CALL)
    expect(window.electronAPI.student.delete).toHaveBeenNthCalledWith(FIRST_CALL, {
      id: STUDENT_ID_FIRST
    })
    expect(window.electronAPI.student.delete).toHaveBeenNthCalledWith(SECOND_CALL, {
      id: STUDENT_ID_SECOND
    })
    expect(onSuccess).toHaveBeenCalled()
  })

  it('throws when ipc result indicates failure', async () => {
    vi.stubGlobal('electronAPI', {
      student: {
        delete: vi.fn().mockResolvedValue({ success: false, error: 'boom' })
      }
    })

    const { result } = renderHook(() => useBatchDelete(), { wrapper: createWrapper() })

    act(() => {
      result.current.mutate([STUDENT_ID_FIRST])
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})
