import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useJournalEntrySelection } from '../useJournalEntrySelection'

const ID_FIRST = 1
const ID_SECOND = 2
const ID_THIRD = 3
const ALL_IDS = [ID_FIRST, ID_SECOND, ID_THIRD]
const ALL_IDS_COUNT = 3

describe('useJournalEntrySelection', () => {
  it('toggles entry selection', () => {
    const { result } = renderHook(() => useJournalEntrySelection())
    act(() => result.current.toggle(ID_FIRST))
    expect(result.current.isSelected(ID_FIRST)).toBe(true)
    act(() => result.current.toggle(ID_FIRST))
    expect(result.current.isSelected(ID_FIRST)).toBe(false)
  })

  it('selects all and clears selection', () => {
    const { result } = renderHook(() => useJournalEntrySelection())
    act(() => result.current.selectAll(ALL_IDS))
    expect(result.current.selectedCount).toBe(ALL_IDS_COUNT)
    act(() => result.current.clearSelection())
    expect(result.current.selectedCount).toBe(0)
  })
})
