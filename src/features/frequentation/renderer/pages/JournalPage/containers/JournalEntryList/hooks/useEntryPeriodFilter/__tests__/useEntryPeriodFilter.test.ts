import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useEntryPeriodFilter } from '../useEntryPeriodFilter'

describe('useEntryPeriodFilter', () => {
  it('starts with "all"', () => {
    const { result } = renderHook(() => useEntryPeriodFilter())
    expect(result.current.period).toBe('all')
  })

  it('updates when setPeriod is called', () => {
    const { result } = renderHook(() => useEntryPeriodFilter())
    act(() => {
      result.current.setPeriod('morning')
    })
    expect(result.current.period).toBe('morning')
    act(() => {
      result.current.setPeriod('afternoon')
    })
    expect(result.current.period).toBe('afternoon')
  })
})
