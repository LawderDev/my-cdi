import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useClock } from '../useClock'

const FIXED_DATE_INITIAL = new Date('2026-04-30T08:30:00Z')
const TIME_REGEX = /^\d{2}:\d{2}$/
const ADVANCE_MS = 1000
const MORNING_HOUR = 9
const AFTERNOON_HOUR = 14

describe('useClock', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(FIXED_DATE_INITIAL)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns a HH:MM-formatted string', () => {
    const { result } = renderHook(() => useClock())
    expect(result.current.time).toMatch(TIME_REGEX)
  })

  it('updates every second', () => {
    const { result } = renderHook(() => useClock())
    const initial = result.current.time
    act(() => {
      vi.setSystemTime(new Date('2026-04-30T08:31:00Z'))
      vi.advanceTimersByTime(ADVANCE_MS)
    })
    expect(result.current.time).not.toBe(initial)
  })

  it('returns matin period when before noon (local time)', () => {
    const morning = new Date()
    morning.setHours(MORNING_HOUR, 0, 0, 0)
    vi.setSystemTime(morning)
    const { result } = renderHook(() => useClock())
    expect(result.current.period).toBe('matin')
  })

  it('returns aprem period at or after noon (local time)', () => {
    const afternoon = new Date()
    afternoon.setHours(AFTERNOON_HOUR, 0, 0, 0)
    vi.setSystemTime(afternoon)
    const { result } = renderHook(() => useClock())
    expect(result.current.period).toBe('aprem')
  })

  it('cleans up the interval on unmount', () => {
    const clearSpy = vi.spyOn(globalThis, 'clearInterval')
    const { unmount } = renderHook(() => useClock())
    unmount()
    expect(clearSpy).toHaveBeenCalled()
    clearSpy.mockRestore()
  })
})
