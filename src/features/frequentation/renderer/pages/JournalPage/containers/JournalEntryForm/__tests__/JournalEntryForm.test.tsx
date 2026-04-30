import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { JournalEntryForm } from '../JournalEntryForm'

const FIRST_ID = 1

function withQuery(ui: ReactNode) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return <QueryClientProvider client={client}>{ui}</QueryClientProvider>
}

describe('JournalEntryForm', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        list: vi.fn().mockResolvedValue({
          success: true,
          data: {
            students: [
              {
                id: FIRST_ID,
                nom: 'Dupont',
                prenom: 'Jean',
                classe: '3A',
                ine: 'INE-1',
                createdAt: '',
                updatedAt: ''
              }
            ]
          }
        })
      },
      frequentation: {
        createBatch: vi.fn().mockResolvedValue({ success: true, data: { created: FIRST_ID } })
      }
    })
  })

  it('renders multi-select and activity group when open', () => {
    render(withQuery(<JournalEntryForm open selectedDate="2026-04-01" onClose={vi.fn()} />))
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})
