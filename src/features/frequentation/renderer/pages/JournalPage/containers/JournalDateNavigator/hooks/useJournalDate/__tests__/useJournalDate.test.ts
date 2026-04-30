import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useJournalDate } from '../useJournalDate'

describe('useJournalDate', () => {
  it('moves to previous day via the change callback', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useJournalDate({ selectedDate: '2026-04-02', onSelectedDateChange: onChange })
    )
    act(() => result.current.goToPreviousDay())
    expect(onChange).toHaveBeenCalledWith('2026-04-01')
  })

  it('moves to next day via the change callback', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useJournalDate({ selectedDate: '2026-04-01', onSelectedDateChange: onChange })
    )
    act(() => result.current.goToNextDay())
    expect(onChange).toHaveBeenCalledWith('2026-04-02')
  })

  it('jumps to today via the change callback', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useJournalDate({ selectedDate: '2020-01-01', onSelectedDateChange: onChange })
    )
    act(() => result.current.goToToday())
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0]?.[0]).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})
