import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { JournalEntryList } from '../JournalEntryList'
import { ActivityType } from '@types'
import '@shared/i18n/config'

const STUDENT_ID = 7

function withQuery(ui: ReactNode) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return <QueryClientProvider client={client}>{ui}</QueryClientProvider>
}

describe('JournalEntryList', () => {
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

  it('renders entries for the selected date', async () => {
    render(
      withQuery(
        <JournalEntryList selectedDate="2026-04-01" onAddClick={vi.fn()} onEditEntry={vi.fn()} />
      )
    )
    await waitFor(() => expect(screen.getByText('Jean Dupont')).toBeInTheDocument())
  })
})
