import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import type { ReactNode } from 'react'
import i18n from '@shared/i18n/config'
import { useStudentsPage } from '../useStudentsPage'
import type { StudentViewModel } from '@student/types'

const STUDENT_ID = 1

const sampleStudent: StudentViewModel = {
  id: STUDENT_ID,
  nom: 'A',
  prenom: 'B',
  classe: 'C',
  ine: 'D',
  fullName: 'B A',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
  displayName: 'B A',
  classLabel: 'C'
}

function Wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </I18nextProvider>
  )
}

describe('useStudentsPage', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      student: {
        list: vi.fn().mockResolvedValue({ success: true, data: { students: [] } })
      }
    })
  })

  it('exposes a translated title', () => {
    const { result } = renderHook(() => useStudentsPage(), { wrapper: Wrapper })
    expect(result.current.title).toBeTypeOf('string')
    expect(result.current.title.length).toBeGreaterThan(0)
  })

  it('starts with all dialogs closed', () => {
    const { result } = renderHook(() => useStudentsPage(), { wrapper: Wrapper })
    expect(result.current.isAddDialogOpen).toBe(false)
    expect(result.current.editingStudent).toBeNull()
  })

  it('toggles add dialog', () => {
    const { result } = renderHook(() => useStudentsPage(), { wrapper: Wrapper })
    act(() => result.current.openAddDialog())
    expect(result.current.isAddDialogOpen).toBe(true)
    act(() => result.current.closeAddDialog())
    expect(result.current.isAddDialogOpen).toBe(false)
  })

  it('manages editing student', () => {
    const { result } = renderHook(() => useStudentsPage(), { wrapper: Wrapper })
    act(() => result.current.setEditingStudent(sampleStudent))
    expect(result.current.editingStudent).toEqual(sampleStudent)
    act(() => result.current.closeEditDialog())
    expect(result.current.editingStudent).toBeNull()
  })
})
