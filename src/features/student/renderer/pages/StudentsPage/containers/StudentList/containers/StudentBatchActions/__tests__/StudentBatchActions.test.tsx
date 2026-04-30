import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { StudentBatchActions } from '../StudentBatchActions'

const STUDENT_ID_FIRST = 1
const STUDENT_ID_SECOND = 2
const STUDENT_ID_THIRD = 3
const SELECTED_COUNT = 2
const ZERO_SELECTED = 0
const TOTAL_COUNT = 10
const THREE_SELECTED = 3
const SELECTED_IDS_PAIR = [STUDENT_ID_FIRST, STUDENT_ID_SECOND]
const SELECTED_IDS_TRIPLE = [STUDENT_ID_FIRST, STUDENT_ID_SECOND, STUDENT_ID_THIRD]

function renderWithClient(node: ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return render(<QueryClientProvider client={queryClient}>{node}</QueryClientProvider>)
}

describe('StudentBatchActions', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        delete: vi.fn().mockResolvedValue({ success: true, data: undefined })
      }
    })
  })

  it('renders select all and delete buttons', () => {
    renderWithClient(
      <StudentBatchActions
        selectedIds={SELECTED_IDS_PAIR}
        selectedCount={SELECTED_COUNT}
        totalCount={TOTAL_COUNT}
        onSelectAll={vi.fn()}
        onClearSelection={vi.fn()}
        onDeleteSelected={vi.fn()}
      />
    )

    expect(screen.getByText('Tout sélectionner')).toBeInTheDocument()
    expect(screen.getByText('Supprimer la sélection')).toBeInTheDocument()
    expect(screen.getByText(/sélectionné/)).toBeInTheDocument()
  })

  it('disables delete button when nothing selected', () => {
    renderWithClient(
      <StudentBatchActions
        selectedIds={[]}
        selectedCount={ZERO_SELECTED}
        totalCount={TOTAL_COUNT}
        onSelectAll={vi.fn()}
        onClearSelection={vi.fn()}
        onDeleteSelected={vi.fn()}
      />
    )

    const deleteButton = screen.getByText('Supprimer la sélection')
    expect(deleteButton).toBeDisabled()
  })

  it('shows confirmation dialog when delete is clicked', () => {
    renderWithClient(
      <StudentBatchActions
        selectedIds={SELECTED_IDS_TRIPLE}
        selectedCount={THREE_SELECTED}
        totalCount={TOTAL_COUNT}
        onSelectAll={vi.fn()}
        onClearSelection={vi.fn()}
        onDeleteSelected={vi.fn()}
      />
    )

    const deleteButton = screen.getByText('Supprimer la sélection')
    fireEvent.click(deleteButton)

    expect(screen.getByText('Confirmer la suppression')).toBeInTheDocument()
  })
})
