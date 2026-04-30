import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StudentsPageHeader } from '../StudentsPageHeader'

describe('StudentsPageHeader', () => {
  it('renders the title text passed via props', () => {
    render(<StudentsPageHeader title="Élèves (3)" />)
    expect(screen.getByRole('heading', { name: 'Élèves (3)' })).toBeInTheDocument()
  })
})
