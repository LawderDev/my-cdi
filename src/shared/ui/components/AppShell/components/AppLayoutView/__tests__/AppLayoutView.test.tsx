import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AppLayoutView } from '../AppLayoutView'

describe('AppLayoutView', () => {
  it('renders the navbar slot', () => {
    render(
      <AppLayoutView navbar={<nav data-testid="navbar-slot">nav</nav>}>
        <div>content</div>
      </AppLayoutView>
    )
    expect(screen.getByTestId('navbar-slot')).toBeInTheDocument()
  })

  it('renders the children inside main', () => {
    render(
      <AppLayoutView navbar={<div>nav</div>}>
        <div data-testid="page-content">content</div>
      </AppLayoutView>
    )
    expect(screen.getByTestId('page-content')).toBeInTheDocument()
    expect(screen.getByRole('main')).toContainElement(screen.getByTestId('page-content'))
  })
})
