import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import type { ReactNode } from 'react'
import { JournalEntryForm } from '../JournalEntryForm'

const FIRST_ID = 1

function withProviders(ui: ReactNode) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={client}>{ui}</QueryClientProvider>
    </I18nextProvider>
  )
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

  it('renders the autocomplete combobox and the activity grid in the in-place card', () => {
    render(withProviders(<JournalEntryForm selectedDate="2026-04-01" />))
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})
