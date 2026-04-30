import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IconButton } from '../IconButton'

describe('IconButton', () => {
  it('renders a button with the icon name in its content', () => {
    render(<IconButton iconName="close" aria-label="close" />)
    const btn = screen.getByRole('button', { name: /close/i })
    expect(btn).toBeInTheDocument()
    expect(btn.textContent).toContain('close')
  })

  it('applies the size and base classes for a 36x36 icon button', () => {
    render(<IconButton iconName="edit" aria-label="edit" />)
    const btn = screen.getByRole('button', { name: /edit/i })
    expect(btn.className).toContain('w-9')
    expect(btn.className).toContain('h-9')
  })

  it('applies default tone classes', () => {
    render(<IconButton iconName="edit" aria-label="edit" />)
    const btn = screen.getByRole('button', { name: /edit/i })
    expect(btn.className).toContain('text-text-dim')
  })

  it('applies danger tone classes', () => {
    render(<IconButton iconName="delete" tone="danger" aria-label="delete" />)
    const btn = screen.getByRole('button', { name: /delete/i })
    expect(btn.className).toContain('text-danger')
  })

  it('forwards onClick handler', async () => {
    const onClick = vi.fn()
    render(<IconButton iconName="edit" aria-label="edit" onClick={onClick} />)
    await userEvent.click(screen.getByRole('button', { name: /edit/i }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('appends custom className alongside the base classes', () => {
    render(<IconButton iconName="edit" aria-label="edit" className="custom-extra" />)
    const btn = screen.getByRole('button', { name: /edit/i })
    expect(btn.className).toContain('custom-extra')
    expect(btn.className).toContain('text-text-dim')
  })
})
