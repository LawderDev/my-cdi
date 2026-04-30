import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'

describe('Button', () => {
  it('renders the children inside a <button>', () => {
    render(<Button>Click me</Button>)
    const btn = screen.getByRole('button', { name: /click me/i })
    expect(btn).toBeInTheDocument()
  })

  it('exposes data-variant="primary" by default', () => {
    render(<Button>Save</Button>)
    const btn = screen.getByRole('button', { name: /save/i })
    expect(btn.getAttribute('data-variant')).toBe('primary')
  })

  it('exposes data-variant="secondary" when variant="secondary"', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const btn = screen.getByRole('button', { name: /secondary/i })
    expect(btn.getAttribute('data-variant')).toBe('secondary')
  })

  it('exposes data-variant="danger" when variant="danger"', () => {
    render(<Button variant="danger">Delete</Button>)
    const btn = screen.getByRole('button', { name: /delete/i })
    expect(btn.getAttribute('data-variant')).toBe('danger')
  })

  it('marks disabled state on the underlying button', () => {
    render(<Button disabled>Disabled</Button>)
    const btn = screen.getByRole('button', { name: /disabled/i })
    expect(btn.hasAttribute('disabled')).toBe(true)
  })

  it('expands to full width when fullWidth is true', () => {
    render(<Button fullWidth>Wide</Button>)
    const btn = screen.getByRole('button', { name: /wide/i })
    expect(btn.className).toMatch(/MuiButton-fullWidth/)
  })

  it('renders iconLeft before the children', () => {
    render(
      <Button iconLeft={<span data-testid="left-icon">L</span>}>
        <span>label</span>
      </Button>
    )
    const btn = screen.getByRole('button')
    const icon = screen.getByTestId('left-icon')
    const labelIndex = btn.textContent?.indexOf('label') ?? -1
    expect(icon).toBeInTheDocument()
    expect(btn.textContent?.indexOf('L')).toBeLessThan(labelIndex)
  })

  it('renders iconRight after the children', () => {
    render(
      <Button iconRight={<span data-testid="right-icon">R</span>}>
        <span>label</span>
      </Button>
    )
    const btn = screen.getByRole('button')
    const icon = screen.getByTestId('right-icon')
    const labelIndex = btn.textContent?.indexOf('label') ?? -1
    const iconIndex = btn.textContent?.indexOf('R') ?? -1
    expect(icon).toBeInTheDocument()
    expect(iconIndex).toBeGreaterThan(labelIndex)
  })

  it('forwards onClick handler', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    await userEvent.click(screen.getByRole('button', { name: /click/i }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('appends custom className to the rendered button', () => {
    render(<Button className="custom-extra">x</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('custom-extra')
  })
})
