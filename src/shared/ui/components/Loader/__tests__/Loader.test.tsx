import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Loader } from '../Loader'

describe('Loader', () => {
  it('renders a status region with a spinner and no message by default', () => {
    render(<Loader />)
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByRole('status').getAttribute('aria-busy')).toBe('true')
    expect(screen.queryByText('Chargement')).not.toBeInTheDocument()
  })

  it('renders the optional message', () => {
    render(<Loader message="Chargement des élèves" />)
    expect(screen.getByText('Chargement des élèves')).toBeInTheDocument()
  })
})
