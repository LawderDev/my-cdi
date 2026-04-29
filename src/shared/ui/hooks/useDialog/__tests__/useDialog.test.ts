import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDialog } from '../useDialog'

describe('useDialog', () => {
  it('starts closed by default', () => {
    const { result } = renderHook(() => useDialog())
    expect(result.current.isOpen).toBe(false)
  })

  it('starts open when initialized with true', () => {
    const { result } = renderHook(() => useDialog(true))
    expect(result.current.isOpen).toBe(true)
  })

  it('opens the dialog', () => {
    const { result } = renderHook(() => useDialog())
    act(() => {
      result.current.open()
    })
    expect(result.current.isOpen).toBe(true)
  })

  it('closes the dialog', () => {
    const { result } = renderHook(() => useDialog(true))
    act(() => {
      result.current.close()
    })
    expect(result.current.isOpen).toBe(false)
  })
})
