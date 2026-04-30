import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { StudentCard } from '../StudentCard'
import type { StudentViewModel } from '@student/types'

const STUDENT_ID = 1

const STUDENT: StudentViewModel = {
  id: STUDENT_ID,
  nom: 'Dupont',
  prenom: 'Jean',
  classe: '3ème A',
  ine: '123A',
  fullName: 'Jean Dupont',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
  displayName: 'Jean Dupont',
  classLabel: '3ème A'
}

describe('StudentCard', () => {
  it('renders student display name and class', () => {
    render(<StudentCard student={STUDENT} onClick={vi.fn()} />)

    expect(screen.getByText('Jean Dupont')).toBeInTheDocument()
    expect(screen.getByText('3ème A')).toBeInTheDocument()
  })

  it('renders INE', () => {
    render(<StudentCard student={STUDENT} onClick={vi.fn()} />)

    expect(screen.getByText(/INE:/)).toBeInTheDocument()
    expect(screen.getByText(/123A/)).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<StudentCard student={STUDENT} onClick={onClick} />)

    fireEvent.click(screen.getByText('Jean Dupont'))
    expect(onClick).toHaveBeenCalledWith(STUDENT)
  })
})
