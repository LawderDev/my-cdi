import { describe, it, expect, vi, beforeEach } from 'vitest'
import { act, renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { ActivityType } from '@types'
import { useStatisticsPage } from '../useStatisticsPage'

const SAMPLE_TOTAL = 12

function createWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('useStatisticsPage', () => {
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

  it('defaults to "month" period and exposes stats once loaded', async () => {
    const { result } = renderHook(() => useStatisticsPage(), { wrapper: createWrapper() })
    expect(result.current.period).toBe('month')
    await waitFor(() => expect(result.current.stats).toBeDefined())
    expect(result.current.stats?.totalVisits).toBe(SAMPLE_TOTAL)
  })

  it('updates the period when setPeriod is called', () => {
    const { result } = renderHook(() => useStatisticsPage(), { wrapper: createWrapper() })
    act(() => {
      result.current.setPeriod('week')
    })
    expect(result.current.period).toBe('week')
  })
})
