import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useStudentForm } from '../useStudentForm'
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

describe('useStudentForm', () => {
  it('initializes form for create mode', () => {
    const { result } = renderHook(() =>
      useStudentForm({
        mode: 'create',
        student: null,
        onCreateSubmit: vi.fn().mockResolvedValue(true),
        onUpdateSubmit: vi.fn().mockResolvedValue(true),
        onClose: vi.fn()
      })
    )

    expect(result.current.formValues.nom).toBe('')
    expect(result.current.formValues.prenom).toBe('')
    expect(result.current.mode).toBe('create')
  })

  it('initializes form for edit mode', () => {
    const { result } = renderHook(() =>
      useStudentForm({
        mode: 'edit',
        student: STUDENT,
        onCreateSubmit: vi.fn().mockResolvedValue(true),
        onUpdateSubmit: vi.fn().mockResolvedValue(true),
        onClose: vi.fn()
      })
    )

    expect(result.current.formValues.nom).toBe('Dupont')
    expect(result.current.formValues.prenom).toBe('Jean')
    expect(result.current.mode).toBe('edit')
  })

  it('updates form values on field change', () => {
    const { result } = renderHook(() =>
      useStudentForm({
        mode: 'create',
        student: null,
        onCreateSubmit: vi.fn().mockResolvedValue(true),
        onUpdateSubmit: vi.fn().mockResolvedValue(true),
        onClose: vi.fn()
      })
    )

    act(() => {
      result.current.setFieldValue('nom', 'Martin')
    })

    expect(result.current.formValues.nom).toBe('Martin')
  })

  it('resets form', () => {
    const { result } = renderHook(() =>
      useStudentForm({
        mode: 'create',
        student: null,
        onCreateSubmit: vi.fn().mockResolvedValue(true),
        onUpdateSubmit: vi.fn().mockResolvedValue(true),
        onClose: vi.fn()
      })
    )

    act(() => {
      result.current.setFieldValue('nom', 'Martin')
    })
    act(() => {
      result.current.resetForm()
    })

    expect(result.current.formValues.nom).toBe('')
  })

  it('submits create form with current values', async () => {
    const onCreateSubmit = vi.fn().mockResolvedValue(true)
    const onClose = vi.fn()
    const { result } = renderHook(() =>
      useStudentForm({
        mode: 'create',
        student: null,
        onCreateSubmit,
        onUpdateSubmit: vi.fn().mockResolvedValue(true),
        onClose
      })
    )

    act(() => {
      result.current.setFieldValue('nom', 'Dupont')
    })
    act(() => {
      result.current.setFieldValue('prenom', 'Jean')
    })
    act(() => {
      result.current.setFieldValue('classe', '3A')
    })
    act(() => {
      result.current.setFieldValue('ine', '123A')
    })

    await act(async () => {
      await result.current.handleSubmit()
    })

    expect(onCreateSubmit).toHaveBeenCalledWith({
      nom: 'Dupont',
      prenom: 'Jean',
      classe: '3A',
      ine: '123A'
    })
    expect(onClose).toHaveBeenCalled()
  })

  it('submits update form with student and current values', async () => {
    const onUpdateSubmit = vi.fn().mockResolvedValue(true)
    const onClose = vi.fn()
    const { result } = renderHook(() =>
      useStudentForm({
        mode: 'edit',
        student: STUDENT,
        onCreateSubmit: vi.fn().mockResolvedValue(true),
        onUpdateSubmit,
        onClose
      })
    )

    act(() => {
      result.current.setFieldValue('nom', 'Updated')
    })

    await act(async () => {
      await result.current.handleSubmit()
    })

    expect(onUpdateSubmit).toHaveBeenCalledWith(
      STUDENT,
      expect.objectContaining({ nom: 'Updated' })
    )
    expect(onClose).toHaveBeenCalled()
  })
})
