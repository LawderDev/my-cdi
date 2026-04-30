import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StudentAvatar } from '../StudentAvatar'

const STUDENT_ID = 1

describe('StudentAvatar', () => {
  it('renders initials from prenom and nom', () => {
    render(<StudentAvatar id={STUDENT_ID} prenom="Jean" nom="Dupont" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('handles single-character names', () => {
    render(<StudentAvatar id={STUDENT_ID} prenom="A" nom="B" />)
    expect(screen.getByText('AB')).toBeInTheDocument()
  })
})
