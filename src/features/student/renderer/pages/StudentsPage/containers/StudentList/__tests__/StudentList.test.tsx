import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import type { ReactNode } from 'react'
import i18n from '@shared/i18n/config'
import { StudentList } from '../StudentList'
import type { StudentResponseDto } from '@student-shared'

const STUDENT_ID_FIRST = 1

const MOCK_DTOS: StudentResponseDto[] = [
  {
    id: STUDENT_ID_FIRST,
    nom: 'Dupont',
    prenom: 'Jean',
    classe: '3ème A',
    ine: '111A',
    fullName: 'Jean Dupont',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  }
]

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </I18nextProvider>
    )
  }
}

describe('StudentList', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        list: vi.fn().mockResolvedValue({ success: true, data: { students: MOCK_DTOS } }),
        delete: vi.fn().mockResolvedValue({ success: true })
      }
    })
  })

  it('renders the toolbar with the add button', async () => {
    render(<StudentList onEditStudent={vi.fn()} onAddStudent={vi.fn()} onImportCsv={vi.fn()} />, {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(screen.getByText('Ajouter un élève')).toBeInTheDocument()
    })
  })
})
