import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useJournalBatchActions } from '../useJournalBatchActions'
import '@shared/i18n/config'

const ID_FIRST = 1
const ID_SECOND = 2
const TOTAL_COUNT = 5

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('useJournalBatchActions', () => {
  it('reports hasSelection and isTotalEmpty correctly', () => {
    const { result } = renderHook(
      () =>
        useJournalBatchActions({
          selectedIds: [ID_FIRST, ID_SECOND],
          totalCount: TOTAL_COUNT,
          onSelectAll: vi.fn(),
          onClearSelection: vi.fn(),
          onAfterDelete: vi.fn(),
          onAfterUpdate: vi.fn()
        }),
      { wrapper: createWrapper() }
    )
    expect(result.current.hasSelection).toBe(true)
    expect(result.current.isTotalEmpty).toBe(false)
  })

  it('opens and closes the confirm delete dialog', () => {
    const { result } = renderHook(
      () =>
        useJournalBatchActions({
          selectedIds: [ID_FIRST],
          totalCount: TOTAL_COUNT,
          onSelectAll: vi.fn(),
          onClearSelection: vi.fn(),
          onAfterDelete: vi.fn(),
          onAfterUpdate: vi.fn()
        }),
      { wrapper: createWrapper() }
    )
    act(() => result.current.openConfirmDelete())
    expect(result.current.confirmOpen).toBe(true)
    act(() => result.current.closeConfirmDelete())
    expect(result.current.confirmOpen).toBe(false)
  })

  it('does not open confirm delete when there is no selection', () => {
    const { result } = renderHook(
      () =>
        useJournalBatchActions({
          selectedIds: [],
          totalCount: TOTAL_COUNT,
          onSelectAll: vi.fn(),
          onClearSelection: vi.fn(),
          onAfterDelete: vi.fn(),
          onAfterUpdate: vi.fn()
        }),
      { wrapper: createWrapper() }
    )
    act(() => result.current.openConfirmDelete())
    expect(result.current.confirmOpen).toBe(false)
  })
})
