import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import type { ReactNode } from 'react'
import i18n from '@shared/i18n/config'
import { JournalDateNavigator } from '../JournalDateNavigator'

function Wrapper({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

describe('JournalDateNavigator', () => {
  it('shows the formatted date label and forwards date changes', () => {
    const onSelectedDateChange = vi.fn()
    render(
      <JournalDateNavigator
        selectedDate="2026-04-01"
        onSelectedDateChange={onSelectedDateChange}
      />,
      { wrapper: Wrapper }
    )
    expect(screen.getByText(/avril/i)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /suivant/i }))
    expect(onSelectedDateChange).toHaveBeenCalledWith('2026-04-02')
  })
})
