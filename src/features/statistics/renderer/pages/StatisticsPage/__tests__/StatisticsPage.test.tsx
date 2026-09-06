import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@ui/theme'
import type { ReactNode } from 'react'
import { ActivityType } from '@types'
import { StatisticsPage } from '../StatisticsPage'
import '@shared/i18n/config'

const SAMPLE_TOTAL = 12
const SAMPLE_AVERAGE = 2.4
const SAMPLE_MORNING = 60
const SAMPLE_AFTERNOON = 40

function createWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </QueryClientProvider>
    )
  }
}

describe('StatisticsPage', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      statistics: {
        getStats: vi.fn().mockResolvedValue({
          success: true,
          data: {
            totalVisits: SAMPLE_TOTAL,
            averagePerDay: SAMPLE_AVERAGE,
            morningRate: SAMPLE_MORNING,
            afternoonRate: SAMPLE_AFTERNOON,
            dailyCounts: [{ date: '2026-04-27', count: SAMPLE_TOTAL }],
            activityCounts: [{ activity: ActivityType.WORK, count: SAMPLE_TOTAL }],
            classCounts: []
          }
        })
      }
    })
  })

  it('renders the loading state initially', () => {
    render(<StatisticsPage />, { wrapper: createWrapper() })
    expect(screen.getByText('Chargement…')).toBeInTheDocument()
  })

  it('renders KPI labels, period filter and chart titles once stats load', async () => {
    render(<StatisticsPage />, { wrapper: createWrapper() })
    await waitFor(() => expect(screen.getByText('Visites totales')).toBeInTheDocument())
    expect(screen.getByText('Moyenne / jour')).toBeInTheDocument()
    expect(screen.getByText('Ce mois')).toBeInTheDocument()
    expect(screen.getByText('Fréquentation par jour')).toBeInTheDocument()
    expect(screen.getByText('Activités')).toBeInTheDocument()
    expect(screen.getByText('Évolution sur la période')).toBeInTheDocument()
  })
})
