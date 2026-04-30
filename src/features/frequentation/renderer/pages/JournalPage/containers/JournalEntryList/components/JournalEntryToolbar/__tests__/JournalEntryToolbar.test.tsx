import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('triggers onPeriodChange when the period select changes', async () => {
    const user = userEvent.setup()
    const onPeriodChange = vi.fn()
    renderToolbar({ onPeriodChange })
    const select = screen.getByRole('combobox')
    await user.click(select)
    const listbox = await screen.findByRole('listbox')
    await user.click(within(listbox).getByRole('option', { name: 'Matin' }))
    expect(onPeriodChange).toHaveBeenCalledWith('matin')
  })
})
