import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useToast } from '../useToast'

describe('useToast', () => {
  it('starts with no toast', () => {
    const { result } = renderHook(() => useToast())
    expect(result.current.toast).toBeNull()
  })

  it('show displays a toast with the default severity', () => {
    const { result } = renderHook(() => useToast())
    act(() => {
      result.current.show('Élève ajouté')
    })
    expect(result.current.toast).toEqual({
      id: 1,
      message: 'Élève ajouté',
      severity: 'success'
    })
  })

  it('show accepts an explicit severity', () => {
    const { result } = renderHook(() => useToast())
    act(() => {
      result.current.show('Échec', 'error')
    })
    expect(result.current.toast?.severity).toBe('error')
  })

  it('consecutive shows produce distinct ids so the snackbar re-animates', () => {
    const { result } = renderHook(() => useToast())
    act(() => {
      result.current.show('Premier')
    })
    const firstId = result.current.toast?.id
    act(() => {
      result.current.show('Premier')
    })
    expect(result.current.toast?.id).not.toBe(firstId)
  })

  it('dismiss clears the toast', () => {
    const { result } = renderHook(() => useToast())
    act(() => {
      result.current.show('Élève ajouté')
    })
    act(() => {
      result.current.dismiss()
    })
    expect(result.current.toast).toBeNull()
  })
})
