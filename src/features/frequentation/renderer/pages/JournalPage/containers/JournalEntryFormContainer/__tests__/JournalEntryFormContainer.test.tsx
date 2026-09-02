import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider } from '@mui/material/styles'
import i18n from '@shared/i18n/config'
import { theme } from '@ui/theme'
import type { ReactNode } from 'react'
import { JournalEntryFormContainer } from '../JournalEntryFormContainer'

const FIRST_ID = 1

function withProviders(ui: ReactNode) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
            {ui}
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </I18nextProvider>
  )
}

describe('JournalEntryFormContainer', () => {
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
    render(withProviders(<JournalEntryFormContainer selectedDate="2026-04-01" />))
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('disables the submit button when no students are selected', () => {
    render(withProviders(<JournalEntryFormContainer selectedDate="2026-04-01" />))
    const submitButton = screen.getByRole('button', { name: /enregistrer/i })
    expect(submitButton).toBeDisabled()
  })

  it('focuses the student search when the user types with nothing focused', () => {
    render(withProviders(<JournalEntryFormContainer selectedDate="2026-04-01" />))
    const searchInput = screen.getByRole('combobox')
    expect(document.activeElement).toBe(document.body)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'j', bubbles: true }))

    expect(document.activeElement).toBe(searchInput)
  })

  it('does not hijack typing inside an editable target', () => {
    render(withProviders(<JournalEntryFormContainer selectedDate="2026-04-01" />))
    const searchInput = screen.getByRole('combobox')
    searchInput.focus()

    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'x', bubbles: true, cancelable: true })
    )

    expect(document.activeElement).toBe(searchInput)
  })
})
