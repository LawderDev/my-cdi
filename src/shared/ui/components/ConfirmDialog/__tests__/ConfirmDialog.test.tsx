import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { ConfirmDialog } from '../ConfirmDialog'

function renderDialog(props: Partial<Parameters<typeof ConfirmDialog>[0]> = {}) {
  const defaults = {
    open: true,
    title: 'Confirmer la suppression',
    message: 'Cette action est irréversible.',
    onConfirm: vi.fn(),
    onClose: vi.fn()
  }
  const merged = { ...defaults, ...props }
  render(
    <I18nextProvider i18n={i18n}>
      <ConfirmDialog {...merged} />
    </I18nextProvider>
  )
  return merged
}

describe('ConfirmDialog', () => {
  it('renders title and message when open', () => {
    renderDialog()
    expect(screen.getByText('Confirmer la suppression')).toBeInTheDocument()
    expect(screen.getByText('Cette action est irréversible.')).toBeInTheDocument()
  })

  it('does not render content when closed', () => {
    renderDialog({ open: false })
    expect(screen.queryByText('Confirmer la suppression')).not.toBeInTheDocument()
  })

  it('calls onConfirm when the confirm button is clicked', async () => {
    const props = renderDialog()
    await userEvent.click(screen.getByRole('button', { name: /confirmer/i }))
    expect(props.onConfirm).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when the cancel button is clicked', async () => {
    const props = renderDialog()
    await userEvent.click(screen.getByRole('button', { name: /annuler/i }))
    expect(props.onClose).toHaveBeenCalledTimes(1)
  })

  it('uses custom labels when provided', () => {
    renderDialog({ confirmLabel: 'Supprimer', cancelLabel: 'Garder' })
    expect(screen.getByRole('button', { name: 'Supprimer' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Garder' })).toBeInTheDocument()
  })

  it('renders the confirm button with the danger variant when destructive', () => {
    renderDialog({ destructive: true, confirmLabel: 'Supprimer' })
    const confirmBtn = screen.getByRole('button', { name: 'Supprimer' })
    expect(confirmBtn.className).toContain('bg-danger-bg')
  })
})
