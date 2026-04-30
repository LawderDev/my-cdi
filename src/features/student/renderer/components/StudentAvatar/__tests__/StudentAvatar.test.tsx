import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StudentAvatar } from '../StudentAvatar'

describe('StudentAvatar', () => {
  it('renders initials from prenom and nom', () => {
    render(<StudentAvatar prenom="Jean" nom="Dupont" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('handles single-character names', () => {
    render(<StudentAvatar prenom="A" nom="B" />)
    expect(screen.getByText('AB')).toBeInTheDocument()
  })
})
