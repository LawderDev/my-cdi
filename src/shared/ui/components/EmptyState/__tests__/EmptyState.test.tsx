import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EmptyState } from '../EmptyState'

describe('EmptyState', () => {
  it('renders the message text', () => {
    render(<EmptyState iconName="inbox" message="Aucune entrée" />)
    expect(screen.getByText('Aucune entrée')).toBeInTheDocument()
  })

  it('renders the icon by name', () => {
    render(<EmptyState iconName="inbox" message="Aucune entrée" />)
    expect(screen.getByText('inbox')).toBeInTheDocument()
  })

  it('renders the description when provided', () => {
    render(
      <EmptyState
        iconName="inbox"
        message="Aucune entrée"
        description="Commencez par ajouter une fréquentation."
      />
    )
    expect(screen.getByText('Commencez par ajouter une fréquentation.')).toBeInTheDocument()
  })

  it('omits the description paragraph when not provided', () => {
    const { container } = render(<EmptyState iconName="inbox" message="x" />)
    const paragraphs = container.querySelectorAll('p')
    const expectedParagraphs = 1
    expect(paragraphs.length).toBe(expectedParagraphs)
  })

  it('uses muted/centered layout classes from the codesign empty-state block', () => {
    const { container } = render(<EmptyState iconName="inbox" message="x" />)
    const root = container.firstElementChild
    expect(root?.className).toContain('flex')
    expect(root?.className).toContain('flex-col')
    expect(root?.className).toContain('items-center')
    expect(root?.className).toContain('text-text-dim')
  })

  it('appends custom className', () => {
    const { container } = render(<EmptyState iconName="inbox" message="x" className="my-extra" />)
    expect(container.firstElementChild?.className).toContain('my-extra')
  })
})
