import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from '../Card'

describe('Card', () => {
  it('renders children inside a div', () => {
    render(
      <Card>
        <p>hello</p>
      </Card>
    )
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('applies the codesign card surface classes', () => {
    const { container } = render(
      <Card>
        <p>x</p>
      </Card>
    )
    const div = container.firstElementChild
    expect(div?.className).toContain('bg-card')
    expect(div?.className).toContain('border')
    expect(div?.className).toContain('border-border')
    expect(div?.className).toContain('rounded')
    expect(div?.className).toContain('shadow')
  })

  it('applies default padding when padding is unset', () => {
    const { container } = render(
      <Card>
        <p>x</p>
      </Card>
    )
    const div = container.firstElementChild
    expect(div?.className).toContain('p-5')
  })

  it('applies compact padding', () => {
    const { container } = render(
      <Card padding="compact">
        <p>x</p>
      </Card>
    )
    const div = container.firstElementChild
    expect(div?.className).toContain('p-4')
  })

  it('omits padding when padding="none"', () => {
    const { container } = render(
      <Card padding="none">
        <p>x</p>
      </Card>
    )
    const div = container.firstElementChild
    expect(div?.className).not.toContain('p-5')
    expect(div?.className).not.toContain('p-4')
  })

  it('appends custom className', () => {
    const { container } = render(
      <Card className="my-extra">
        <p>x</p>
      </Card>
    )
    const div = container.firstElementChild
    expect(div?.className).toContain('my-extra')
    expect(div?.className).toContain('bg-card')
  })

  it('forwards arbitrary HTML props like data attributes', () => {
    const { container } = render(
      <Card data-testid="card-host">
        <p>x</p>
      </Card>
    )
    expect(container.firstElementChild?.getAttribute('data-testid')).toBe('card-host')
  })
})
