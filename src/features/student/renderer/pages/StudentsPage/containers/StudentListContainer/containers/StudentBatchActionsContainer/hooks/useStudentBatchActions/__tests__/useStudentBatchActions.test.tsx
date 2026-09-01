import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useStudentBatchActions } from '../useStudentBatchActions'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'

function wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  })
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </I18nextProvider>
  )
}

describe('useStudentBatchActions', () => {
  const baseOptions = {
    selectedIds: [1, 2, 3],
    selectedCount: 3,
    totalCount: 10,
    onSelectAll: vi.fn(),
    onClearSelection: vi.fn(),
    onAfterDelete: vi.fn()
  }

  it('returns hasSelection true when selectedCount > 0', () => {
    const { result } = renderHook(() => useStudentBatchActions(baseOptions), { wrapper })
    expect(result.current.hasSelection).toBe(true)
  })

  it('returns hasSelection false when selectedCount is 0', () => {
    const { result } = renderHook(
      () => useStudentBatchActions({ ...baseOptions, selectedIds: [], selectedCount: 0 }),
      { wrapper }
    )
    expect(result.current.hasSelection).toBe(false)
  })

  it('returns isAllSelected true when all items are selected', () => {
    const { result } = renderHook(
      () => useStudentBatchActions({ ...baseOptions, selectedCount: 10 }),
      { wrapper }
    )
    expect(result.current.isAllSelected).toBe(true)
  })

  it('calls onClearSelection when toggle is clicked and all are selected', () => {
    const { result } = renderHook(
      () => useStudentBatchActions({ ...baseOptions, selectedCount: 10 }),
      { wrapper }
    )
    act(() => {
      result.current.handleSelectToggle()
    })
    expect(baseOptions.onClearSelection).toHaveBeenCalled()
  })

  it('calls onSelectAll when toggle is clicked and not all are selected', () => {
    const { result } = renderHook(() => useStudentBatchActions(baseOptions), { wrapper })
    act(() => {
      result.current.handleSelectToggle()
    })
    expect(baseOptions.onSelectAll).toHaveBeenCalled()
  })

  it('opens confirm dialog on delete click when there is a selection', () => {
    const { result } = renderHook(() => useStudentBatchActions(baseOptions), { wrapper })
    act(() => {
      result.current.handleDeleteClick()
    })
    expect(result.current.showConfirm).toBe(true)
  })

  it('closes confirm dialog', () => {
    const { result } = renderHook(() => useStudentBatchActions(baseOptions), { wrapper })
    act(() => {
      result.current.handleDeleteClick()
    })
    expect(result.current.showConfirm).toBe(true)

    act(() => {
      result.current.closeConfirm()
    })
    expect(result.current.showConfirm).toBe(false)
  })
})
