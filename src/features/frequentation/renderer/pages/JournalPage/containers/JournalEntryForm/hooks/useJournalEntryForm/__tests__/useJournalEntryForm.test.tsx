import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useJournalEntryForm } from '../useJournalEntryForm'
import { ActivityType } from '@types'

const FIRST_ID = 1
const SECOND_ID = 2

function createWrapper() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
  }
}

describe('useJournalEntryForm', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        list: vi.fn().mockResolvedValue({ success: true, data: { students: [] } })
      },
      frequentation: {
        createBatch: vi.fn().mockResolvedValue({ success: true, data: { created: SECOND_ID } })
      }
    })
  })

  it('submits the batch and calls onSubmitted on success', async () => {
    const onSubmitted = vi.fn()
    const { result } = renderHook(
      () => useJournalEntryForm({ selectedDate: '2026-04-01', onSubmitted }),
      { wrapper: createWrapper() }
    )

    act(() => {
      result.current.handleSubmit({
        studentIds: [FIRST_ID, SECOND_ID],
        activity: ActivityType.WORK,
        time: '10:30'
      })
    })
    await waitFor(() => {
      expect(onSubmitted).toHaveBeenCalled()
    })
    expect(window.electronAPI.frequentation.createBatch).toHaveBeenCalledOnce()
  })
})
