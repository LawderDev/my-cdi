import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toast } from '../Toast'
import type { ToastContent } from '../types/ToastProps'

const SUCCESS_TOAST: ToastContent = { id: 1, message: 'Élève ajouté', severity: 'success' }
const ERROR_TOAST: ToastContent = { id: 2, message: 'Échec de la sauvegarde', severity: 'error' }

describe('Toast', () => {
  it('renders nothing when there is no toast', () => {
    render(<Toast toast={null} onClose={vi.fn()} />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('renders the message with the given severity', () => {
    render(<Toast toast={SUCCESS_TOAST} onClose={vi.fn()} />)
    expect(screen.getByText('Élève ajouté')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-colorSuccess')
  })

  it('re-keys the snackbar when a new toast id arrives', () => {
    const { rerender } = render(<Toast toast={SUCCESS_TOAST} onClose={vi.fn()} />)
    const firstKey = screen.getByRole('alert').closest('.MuiSnackbar-root')
    rerender(<Toast toast={ERROR_TOAST} onClose={vi.fn()} />)
    const secondKey = screen.getByRole('alert').closest('.MuiSnackbar-root')
    expect(secondKey).not.toBe(firstKey)
  })

  it('calls onClose when the alert close button is clicked', async () => {
    const onClose = vi.fn()
    render(<Toast toast={SUCCESS_TOAST} onClose={onClose} />)
    await userEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
