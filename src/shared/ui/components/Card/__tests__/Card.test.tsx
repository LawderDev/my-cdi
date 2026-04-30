import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from '../Card'

describe('Card', () => {
  it('renders children inside a paper element', () => {
    render(
      <Card>
        <p>hello</p>
      </Card>
    )
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('renders an MUI Paper as the root element', () => {
    const { container } = render(
      <Card>
        <p>x</p>
      </Card>
    )
    const root = container.firstElementChild
    expect(root?.className).toMatch(/MuiPaper-root/)
  })

  it('appends custom className', () => {
    const { container } = render(
      <Card className="my-extra">
        <p>x</p>
      </Card>
    )
    const root = container.firstElementChild
    expect(root?.className).toContain('my-extra')
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
