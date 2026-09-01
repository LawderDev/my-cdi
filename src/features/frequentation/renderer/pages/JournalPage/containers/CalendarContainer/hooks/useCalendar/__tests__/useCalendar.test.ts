import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCalendar } from '../useCalendar'

const FIXED_TODAY = new Date('2026-04-15T12:00:00.000Z')

describe('useCalendar', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(FIXED_TODAY)
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('initialises viewMonth from selectedDate', () => {
    const { result } = renderHook(() =>
      useCalendar({ selectedDate: '2026-04-15', onSelectDate: vi.fn() })
    )
    expect(result.current.viewMonth.format('YYYY-MM')).toBe('2026-04')
  })

  it('formats monthLabel in French with capitalized first letter', () => {
    const { result } = renderHook(() =>
      useCalendar({ selectedDate: '2026-04-15', onSelectDate: vi.fn() })
    )
    expect(result.current.monthLabel).toBe('Avril 2026')
  })

  it('navigates to the previous month with goToPrevMonth', () => {
    const { result } = renderHook(() =>
      useCalendar({ selectedDate: '2026-04-15', onSelectDate: vi.fn() })
    )
    act(() => {
      result.current.goToPrevMonth()
    })
    expect(result.current.viewMonth.format('YYYY-MM')).toBe('2026-03')
  })

  it('navigates to the next month with goToNextMonth', () => {
    const { result } = renderHook(() =>
      useCalendar({ selectedDate: '2026-04-15', onSelectDate: vi.fn() })
    )
    act(() => {
      result.current.goToNextMonth()
    })
    expect(result.current.viewMonth.format('YYYY-MM')).toBe('2026-05')
  })

  it('goToToday resets viewMonth and calls onSelectDate with todayIso', () => {
    const onSelectDate = vi.fn()
    const { result } = renderHook(() => useCalendar({ selectedDate: '2026-01-10', onSelectDate }))
    act(() => {
      result.current.goToToday()
    })
    expect(result.current.viewMonth.format('YYYY-MM')).toBe('2026-04')
    expect(onSelectDate).toHaveBeenCalledWith('2026-04-15')
  })

  it('selectDay forwards the iso string to onSelectDate', () => {
    const onSelectDate = vi.fn()
    const { result } = renderHook(() => useCalendar({ selectedDate: '2026-04-15', onSelectDate }))
    act(() => {
      result.current.selectDay('2026-04-20')
    })
    expect(onSelectDate).toHaveBeenCalledWith('2026-04-20')
  })
})
