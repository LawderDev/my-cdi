import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { ReactNode } from 'react'
import i18n from '@shared/i18n/config'
import { JournalPage } from '../JournalPage'

function withQuery(ui: ReactNode) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return (
    <QueryClientProvider client={client}>
      <I18nextProvider i18n={i18n}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
          {ui}
        </LocalizationProvider>
      </I18nextProvider>
    </QueryClientProvider>
  )
}

describe('JournalPage', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        list: vi.fn().mockResolvedValue({ success: true, data: { students: [] } })
      },
      frequentation: {
        getJournalEntries: vi.fn().mockResolvedValue({ success: true, data: [] }),
        createBatch: vi.fn(),
        update: vi.fn(),
        delete: vi.fn()
      }
    })
  })

  it('renders the calendar, in-place form, and the attendance list shell', async () => {
    render(withQuery(<JournalPage />))
    // Calendar renders weekday headers
    expect(screen.getByText('Lun')).toBeInTheDocument()
    // Attendance list header (Présents) rendered
    await waitFor(() => {
      expect(screen.getByText('Présents')).toBeInTheDocument()
    })
  })
})
