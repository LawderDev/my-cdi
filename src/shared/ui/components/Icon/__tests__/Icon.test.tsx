import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Icon } from '../Icon'

describe('Icon', () => {
  it('renders a span containing the icon name', () => {
    const { container } = render(<Icon name="search" />)
    const span = container.querySelector('span')
    expect(span).not.toBeNull()
    expect(span?.textContent).toBe('search')
  })

  it('applies the material-icons-round class', () => {
    const { container } = render(<Icon name="edit" />)
    const span = container.querySelector('span')
    expect(span?.className).toContain('material-icons-round')
  })

  it('merges the provided className alongside the icon class', () => {
    const customClass = 'custom-test-class'
    const { container } = render(<Icon name="edit" className={customClass} />)
    const span = container.querySelector('span')
    expect(span?.className).toContain('material-icons-round')
    expect(span?.className).toContain(customClass)
  })

  it('passes through inline style', () => {
    const FONT_SIZE_PX = 22
    render(<Icon name="edit" style={{ fontSize: FONT_SIZE_PX }} />)
    const span = screen.getByText('edit')
    expect(span.style.fontSize).toBe(`${FONT_SIZE_PX}px`)
  })

  it('sets aria-label when provided and removes aria-hidden', () => {
    render(<Icon name="edit" ariaLabel="modifier" />)
    const labeled = screen.getByLabelText('modifier')
    expect(labeled).toBeInTheDocument()
    expect(labeled.getAttribute('aria-hidden')).toBeNull()
  })

  it('marks the span as aria-hidden by default', () => {
    const { container } = render(<Icon name="edit" />)
    const span = container.querySelector('span')
    expect(span?.getAttribute('aria-hidden')).toBe('true')
  })
})
