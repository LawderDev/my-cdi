import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import dayjs from 'dayjs'
import { useMonthEntryCounts } from '../useMonthEntryCounts'
import { ActivityType } from '@types'

const STUDENT_ID = 7
const ENTRY_ID_FIRST = 1
const ENTRY_ID_SECOND = 2
const ENTRY_ID_THIRD = 3
const EXPECTED_UNIQUE_DAYS = 2

function createWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

function buildDto(id: number, startsAt: string) {
  return {
    frequentation: {
      id,
      startsAt,
      activity: ActivityType.WORK,
      studentId: STUDENT_ID,
      studentName: 'Jean Dupont',
      studentClass: '3ème A',
      studentIne: 'INE-1',
      createdAt: startsAt,
      updatedAt: startsAt
    },
    student: {
      id: STUDENT_ID,
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3ème A',
      ine: 'INE-1'
    }
  }
}

describe('useMonthEntryCounts', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      frequentation: {
        getJournalEntries: vi.fn().mockResolvedValue({
          success: true,
          data: [
            buildDto(ENTRY_ID_FIRST, '2026-04-03T09:00:00.000Z'),
            buildDto(ENTRY_ID_SECOND, '2026-04-03T10:00:00.000Z'),
            buildDto(ENTRY_ID_THIRD, '2026-04-15T13:00:00.000Z')
          ]
        })
      }
    })
  })

  it('returns a Set of unique ISO date strings (YYYY-MM-DD) extracted from startsAt', async () => {
    const { result } = renderHook(() => useMonthEntryCounts(dayjs('2026-04-15')), {
      wrapper: createWrapper()
    })
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.daysWithVisits.has('2026-04-03')).toBe(true)
    expect(result.current.daysWithVisits.has('2026-04-15')).toBe(true)
    expect(result.current.daysWithVisits.size).toBe(EXPECTED_UNIQUE_DAYS)
  })

  it('queries the IPC channel with the month range', async () => {
    renderHook(() => useMonthEntryCounts(dayjs('2026-04-15')), { wrapper: createWrapper() })
    await waitFor(() => {
      expect(window.electronAPI.frequentation.getJournalEntries).toHaveBeenCalledWith({
        startDate: '2026-04-01',
        endDate: '2026-04-30'
      })
    })
  })
})
