import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { ErrorFallback } from '../ErrorFallback'

describe('ErrorFallback', () => {
  it('renders the title and description', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ErrorFallback error={new Error('boom')} onReload={vi.fn()} />
      </I18nextProvider>
    )
    expect(screen.getByText(/Une erreur est survenue/i)).toBeInTheDocument()
    expect(screen.getByText(/problème inattendu/i)).toBeInTheDocument()
  })

  it('calls onReload when reload button is clicked', async () => {
    const onReload = vi.fn()
    render(
      <I18nextProvider i18n={i18n}>
        <ErrorFallback error={new Error('boom')} onReload={onReload} />
      </I18nextProvider>
    )
    await userEvent.click(screen.getByRole('button', { name: /Recharger/i }))
    expect(onReload).toHaveBeenCalledTimes(1)
  })

  it('exposes error details', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ErrorFallback error={new Error('boom-message')} onReload={vi.fn()} />
      </I18nextProvider>
    )
    expect(screen.getByText('boom-message')).toBeInTheDocument()
  })
})
