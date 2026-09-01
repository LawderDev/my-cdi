import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { JournalBatchActionsContainer } from '../JournalBatchActionsContainer'
import '@shared/i18n/config'

const TOTAL_COUNT = 5
const ID_FIRST = 1
const ID_SECOND = 2

function withQueryClient(ui: ReactNode) {
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } })
  return <QueryClientProvider client={client}>{ui}</QueryClientProvider>
}

describe('JournalBatchActionsContainer', () => {
  it('renders selectedCount and disables actions when empty', () => {
    render(
      withQueryClient(
        <JournalBatchActionsContainer
          selectedIds={[]}
          totalCount={TOTAL_COUNT}
          onSelectAll={vi.fn()}
          onClearSelection={vi.fn()}
          onAfterDelete={vi.fn()}
          onAfterUpdate={vi.fn()}
        />
      )
    )
    expect(screen.getByRole('button', { name: /supprimer/i })).toBeDisabled()
  })

  it('shows confirm dialog on delete click', () => {
    render(
      withQueryClient(
        <JournalBatchActionsContainer
          selectedIds={[ID_FIRST, ID_SECOND]}
          totalCount={TOTAL_COUNT}
          onSelectAll={vi.fn()}
          onClearSelection={vi.fn()}
          onAfterDelete={vi.fn()}
          onAfterUpdate={vi.fn()}
        />
      )
    )
    fireEvent.click(screen.getByRole('button', { name: /supprimer/i }))
    expect(screen.getByText(/confirmer la suppression/i)).toBeInTheDocument()
  })
})
