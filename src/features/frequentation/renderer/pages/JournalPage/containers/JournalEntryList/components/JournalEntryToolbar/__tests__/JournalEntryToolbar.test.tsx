import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { JournalEntryToolbar } from '../JournalEntryToolbar'

const ENTRY_COUNT = 3

function renderToolbar(overrides: Partial<Parameters<typeof JournalEntryToolbar>[0]> = {}) {
  const props = {
    entryCount: ENTRY_COUNT,
    period: 'all' as const,
    onPeriodChange: vi.fn(),
    ...overrides
  }
  return {
    ...props,
    ...render(
      <I18nextProvider i18n={i18n}>
        <JournalEntryToolbar {...props} />
      </I18nextProvider>
    )
  }
}

describe('JournalEntryToolbar', () => {
  it('renders the entry count badge', () => {
    renderToolbar()
    expect(screen.getByText(String(ENTRY_COUNT))).toBeInTheDocument()
  })

  it('triggers onPeriodChange when the period select changes', () => {
    const onPeriodChange = vi.fn()
    renderToolbar({ onPeriodChange })
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'matin' } })
    expect(onPeriodChange).toHaveBeenCalledWith('matin')
  })
})
