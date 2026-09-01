import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider } from '@mui/material/styles'
import i18n from '@shared/i18n/config'
import { theme } from '@ui/theme'
import type { ReactNode } from 'react'
import { JournalEntryListContainer } from '../JournalEntryListContainer'
import { ActivityType } from '@types'

const STUDENT_ID = 7

function withProviders(ui: ReactNode) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>{ui}</ThemeProvider>
      </QueryClientProvider>
    </I18nextProvider>
  )
}

describe('JournalEntryListContainer', () => {
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
                studentClass: '3A',
                studentIne: 'INE-1',
                createdAt: '2026-04-01T09:00:00.000Z',
                updatedAt: '2026-04-01T09:00:00.000Z'
              },
              student: {
                id: STUDENT_ID,
                nom: 'Dupont',
                prenom: 'Jean',
                classe: '3A',
                ine: 'INE-1'
              }
            }
          ]
        })
      }
    })
  })

  it('renders attendance rows for the selected date', async () => {
    render(
      withProviders(<JournalEntryListContainer selectedDate="2026-04-01" onEditEntry={vi.fn()} />)
    )
    await waitFor(() => expect(screen.getByText('Jean Dupont')).toBeInTheDocument())
  })
})
