import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import {
  useCreateFrequentationBatch,
  useUpdateFrequentation,
  useDeleteFrequentation
} from '../useFrequentationMutations'
import { ActivityType } from '@types'
import { statisticsKeys } from '@statistics/api/statisticsKeys'

const FREQUENTATION_ID_TARGET = 5
const FREQUENTATION_ID_UPDATE = 1
const STUDENT_ID_FIRST = 1
const STUDENT_ID_SECOND = 2
const BATCH_CREATED_COUNT = 2

function createInvalidationSpiedWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')
  function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
  return { wrapper: Wrapper, invalidateSpy }
}

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('useCreateFrequentationBatch', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      frequentation: {
        createBatch: vi
          .fn()
          .mockResolvedValue({ success: true, data: { created: BATCH_CREATED_COUNT } })
      }
    })
  })

  it('submits a batch payload', async () => {
    const { result } = renderHook(() => useCreateFrequentationBatch(), {
      wrapper: createWrapper()
    })

    act(() => {
      result.current.mutate({
        frequentations: [
          {
            startsAt: '2026-04-01T09:00:00.000Z',
            activity: ActivityType.WORK,
            studentId: STUDENT_ID_FIRST
          },
          {
            startsAt: '2026-04-01T09:00:00.000Z',
            activity: ActivityType.READING,
            studentId: STUDENT_ID_SECOND
          }
        ]
      })
    })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(window.electronAPI.frequentation.createBatch).toHaveBeenCalledOnce()
  })

  it('invalidates statistics queries after a successful batch creation', async () => {
    const { wrapper, invalidateSpy } = createInvalidationSpiedWrapper()
    const { result } = renderHook(() => useCreateFrequentationBatch(), { wrapper })

    act(() => {
      result.current.mutate({
        frequentations: [
          {
            startsAt: '2026-04-01T09:00:00.000Z',
            activity: ActivityType.WORK,
            studentId: STUDENT_ID_FIRST
          }
        ]
      })
    })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: statisticsKeys.all })
  })

  it('surfaces the ipc error when creation fails', async () => {
    vi.stubGlobal('electronAPI', {
      frequentation: {
        createBatch: vi.fn().mockResolvedValue({ success: false, error: 'boom' })
      }
    })
    const { result } = renderHook(() => useCreateFrequentationBatch(), {
      wrapper: createWrapper()
    })

    act(() => {
      result.current.mutate({
        frequentations: [
          {
            startsAt: '2026-04-01T09:00:00.000Z',
            activity: ActivityType.WORK,
            studentId: STUDENT_ID_FIRST
          }
        ]
      })
    })
    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error?.message).toBe('boom')
  })
})

describe('useDeleteFrequentation', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      frequentation: {
        delete: vi.fn().mockResolvedValue({ success: true })
      }
    })
  })

  it('deletes a frequentation by id', async () => {
    const { result } = renderHook(() => useDeleteFrequentation(), { wrapper: createWrapper() })

    act(() => result.current.mutate({ id: FREQUENTATION_ID_TARGET }))
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(window.electronAPI.frequentation.delete).toHaveBeenCalledWith({
      id: FREQUENTATION_ID_TARGET
    })
  })

  it('invalidates statistics queries after a successful delete', async () => {
    const { wrapper, invalidateSpy } = createInvalidationSpiedWrapper()
    const { result } = renderHook(() => useDeleteFrequentation(), { wrapper })

    act(() => result.current.mutate({ id: FREQUENTATION_ID_TARGET }))
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: statisticsKeys.all })
  })

  it('surfaces the ipc error when deletion fails', async () => {
    vi.stubGlobal('electronAPI', {
      frequentation: {
        delete: vi.fn().mockResolvedValue({ success: false, error: 'boom' })
      }
    })
    const { result } = renderHook(() => useDeleteFrequentation(), { wrapper: createWrapper() })

    act(() => result.current.mutate({ id: FREQUENTATION_ID_TARGET }))
    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error?.message).toBe('boom')
  })
})

describe('useUpdateFrequentation', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      frequentation: {
        update: vi.fn().mockResolvedValue({ success: true, data: { id: FREQUENTATION_ID_UPDATE } })
      }
    })
  })

  it('updates an entry activity', async () => {
    const { result } = renderHook(() => useUpdateFrequentation(), { wrapper: createWrapper() })

    act(() =>
      result.current.mutate({ id: FREQUENTATION_ID_UPDATE, activity: ActivityType.READING })
    )
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(window.electronAPI.frequentation.update).toHaveBeenCalledWith({
      id: FREQUENTATION_ID_UPDATE,
      activity: ActivityType.READING
    })
  })

  it('invalidates statistics queries after a successful update', async () => {
    const { wrapper, invalidateSpy } = createInvalidationSpiedWrapper()
    const { result } = renderHook(() => useUpdateFrequentation(), { wrapper })

    act(() =>
      result.current.mutate({ id: FREQUENTATION_ID_UPDATE, activity: ActivityType.READING })
    )
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: statisticsKeys.all })
  })

  it('surfaces the ipc error when update fails', async () => {
    vi.stubGlobal('electronAPI', {
      frequentation: {
        update: vi.fn().mockResolvedValue({ success: false, error: 'boom' })
      }
    })
    const { result } = renderHook(() => useUpdateFrequentation(), { wrapper: createWrapper() })

    act(() =>
      result.current.mutate({ id: FREQUENTATION_ID_UPDATE, activity: ActivityType.READING })
    )
    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error?.message).toBe('boom')
  })
})
