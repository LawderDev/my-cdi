import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useJournalEntries } from '../useFrequentationQueries'
import { ActivityType } from '@types'

const STUDENT_ID = 7

function createWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('useJournalEntries', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      frequentation: {
        getJournalEntries: vi.fn().mockResolvedValue({
          success: true,
          data: [
            {
              frequentation: {
                id: 1,
                startsAt: '2026-04-01T09:00:00.000Z',
                activity: ActivityType.WORK,
                studentId: STUDENT_ID,
                studentName: 'Jean Dupont',
                studentClass: '3ème A',
                studentIne: 'INE-1',
                createdAt: '2026-04-01T09:00:00.000Z',
                updatedAt: '2026-04-01T09:00:00.000Z'
              },
              student: {
                id: STUDENT_ID,
                nom: 'Dupont',
                prenom: 'Jean',
                classe: '3ème A',
                ine: 'INE-1'
              }
            }
          ]
        })
      }
    })
  })

  it('fetches journal entries by date range', async () => {
    const { result } = renderHook(
      () => useJournalEntries({ startDate: '2026-04-01', endDate: '2026-04-01' }),
      { wrapper: createWrapper() }
    )
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toHaveLength(1)
    expect(window.electronAPI.frequentation.getJournalEntries).toHaveBeenCalledWith({
      startDate: '2026-04-01',
      endDate: '2026-04-01'
    })
  })

  it('throws when ipc result indicates failure', async () => {
    vi.stubGlobal('electronAPI', {
      frequentation: {
        getJournalEntries: vi.fn().mockResolvedValue({ success: false, error: 'boom' })
      }
    })
    const { result } = renderHook(
      () => useJournalEntries({ startDate: '2026-04-01', endDate: '2026-04-01' }),
      { wrapper: createWrapper() }
    )
    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toBeInstanceOf(Error)
  })
})
