import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Chip } from '../Chip'

describe('Chip', () => {
  it('renders the label text', () => {
    render(<Chip label="Math 101" />)
    expect(screen.getByText('Math 101')).toBeInTheDocument()
  })

  it('uses the accent tone classes by default', () => {
    const { container } = render(<Chip label="x" />)
    const chip = container.firstElementChild
    expect(chip?.className).toContain('bg-accent-bg')
    expect(chip?.className).toContain('text-accent')
  })

  it('uses the neutral tone classes when tone="neutral"', () => {
    const { container } = render(<Chip label="x" tone="neutral" />)
    const chip = container.firstElementChild
    expect(chip?.className).toContain('bg-surface')
    expect(chip?.className).toContain('text-text')
  })

  it('does not render a remove button when onRemove is omitted', () => {
    render(<Chip label="x" />)
    expect(screen.queryByRole('button', { name: /remove|retirer|supprimer/i })).toBeNull()
  })

  it('renders a remove button and triggers onRemove when clicked', async () => {
    const onRemove = vi.fn()
    render(<Chip label="x" onRemove={onRemove} />)
    const btn = screen.getByRole('button')
    await userEvent.click(btn)
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('applies custom className alongside tone classes', () => {
    const { container } = render(<Chip label="x" className="my-extra" />)
    const chip = container.firstElementChild
    expect(chip?.className).toContain('my-extra')
    expect(chip?.className).toContain('bg-accent-bg')
  })
})
