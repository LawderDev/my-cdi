import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { StudentForm } from '../StudentForm'
import type { StudentViewModel } from '@student/types'

const STUDENT_ID = 1

const STUDENT: StudentViewModel = {
  id: STUDENT_ID,
  nom: 'Dupont',
  prenom: 'Jean',
  classe: '3A',
  ine: '123A',
  fullName: 'Jean Dupont',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
  displayName: 'Jean Dupont',
  classLabel: '3A'
}

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('StudentForm', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        create: vi.fn().mockResolvedValue({ success: true, data: STUDENT }),
        update: vi.fn().mockResolvedValue({ success: true, data: STUDENT })
      }
    })
  })

  it('renders in create mode', () => {
    render(<StudentForm mode="create" student={null} open onClose={vi.fn()} />, {
      wrapper: createWrapper()
    })

    expect(screen.getByText('Ajouter un élève')).toBeInTheDocument()
  })

  it('renders in edit mode with student data', () => {
    render(<StudentForm mode="edit" student={STUDENT} open onClose={vi.fn()} />, {
      wrapper: createWrapper()
    })

    expect(screen.getByText("Modifier l'élève")).toBeInTheDocument()
  })
})
