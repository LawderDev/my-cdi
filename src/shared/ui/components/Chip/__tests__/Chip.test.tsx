import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Chip } from '../Chip'

describe('Chip', () => {
  it('renders the label text', () => {
    render(<Chip label="Math 101" />)
    expect(screen.getByText('Math 101')).toBeInTheDocument()
  })

  it('exposes data-tone="accent" by default', () => {
    const { container } = render(<Chip label="x" />)
    const chip = container.firstElementChild
    expect(chip?.getAttribute('data-tone')).toBe('accent')
  })

  it('exposes data-tone="neutral" when tone="neutral"', () => {
    const { container } = render(<Chip label="x" tone="neutral" />)
    const chip = container.firstElementChild
    expect(chip?.getAttribute('data-tone')).toBe('neutral')
  })

  it('does not render a delete affordance when onRemove is omitted', () => {
    const { container } = render(<Chip label="x" />)
    const deleteIcon = container.querySelector('[class*="MuiChip-deleteIcon"]')
    expect(deleteIcon).toBeNull()
  })

  it('renders a delete affordance and triggers onRemove when clicked', async () => {
    const onRemove = vi.fn()
    const { container } = render(<Chip label="x" onRemove={onRemove} />)
    const deleteIcon = container.querySelector('[class*="MuiChip-deleteIcon"]')
    if (!(deleteIcon instanceof HTMLElement) && !(deleteIcon instanceof SVGElement)) {
      throw new Error('delete icon not rendered')
    }
    await userEvent.click(deleteIcon)
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    const { container } = render(<Chip label="x" className="my-extra" />)
    const chip = container.firstElementChild
    expect(chip?.className).toContain('my-extra')
  })
})
