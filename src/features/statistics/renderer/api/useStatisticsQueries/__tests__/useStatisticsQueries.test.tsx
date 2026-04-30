import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useStatsForPeriod } from '../useStatisticsQueries'
import { ActivityType } from '@types'

function createWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

const SAMPLE_TOTAL = 12

describe('useStatsForPeriod', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      statistics: {
        getStats: vi.fn().mockResolvedValue({
          success: true,
          data: {
            totalVisits: SAMPLE_TOTAL,
            averagePerDay: 1,
            morningRate: 0,
            afternoonRate: 0,
            dailyCounts: [],
            activityCounts: [{ activity: ActivityType.WORK, count: 1 }],
            classCounts: []
          }
        })
      }
    })
  })

  it('fetches stats for the given period', async () => {
    const { result } = renderHook(
      () => useStatsForPeriod({ startDate: '2026-04-01', endDate: '2026-04-30' }),
      { wrapper: createWrapper() }
    )
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.totalVisits).toBe(SAMPLE_TOTAL)
    expect(window.electronAPI.statistics.getStats).toHaveBeenCalledWith({
      startDate: '2026-04-01',
      endDate: '2026-04-30'
    })
  })

  it('throws when ipc result indicates failure', async () => {
    vi.stubGlobal('electronAPI', {
      statistics: {
        getStats: vi.fn().mockResolvedValue({ success: false, error: 'boom' })
      }
    })
    const { result } = renderHook(
      () => useStatsForPeriod({ startDate: '2026-04-01', endDate: '2026-04-30' }),
      { wrapper: createWrapper() }
    )
    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toBeInstanceOf(Error)
  })
})
