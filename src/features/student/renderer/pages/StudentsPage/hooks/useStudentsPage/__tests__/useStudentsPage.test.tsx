import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
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

describe('useStudentsPage', () => {
  it('starts with all dialogs closed', () => {
    const { result } = renderHook(() => useStudentsPage())
    expect(result.current.isAddDialogOpen).toBe(false)
    expect(result.current.editingStudent).toBeNull()
  })

  it('toggles add dialog', () => {
    const { result } = renderHook(() => useStudentsPage())
    act(() => result.current.openAddDialog())
    expect(result.current.isAddDialogOpen).toBe(true)
    act(() => result.current.closeAddDialog())
    expect(result.current.isAddDialogOpen).toBe(false)
  })

  it('manages editing student', () => {
    const { result } = renderHook(() => useStudentsPage())
    act(() => result.current.setEditingStudent(sampleStudent))
    expect(result.current.editingStudent).toEqual(sampleStudent)
    act(() => result.current.closeEditDialog())
    expect(result.current.editingStudent).toBeNull()
  })
})
