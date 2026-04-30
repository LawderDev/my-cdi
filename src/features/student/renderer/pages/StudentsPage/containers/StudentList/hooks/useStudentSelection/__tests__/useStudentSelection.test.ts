import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useStudentSelection } from '../useStudentSelection'

const ID_FIRST = 1
const ID_SECOND = 2
const ID_THIRD = 3
const ID_FIFTH = 5
const ID_OTHER = 99

const ALL_IDS = [ID_FIRST, ID_SECOND, ID_THIRD]
const PAIR_IDS = [ID_FIRST, ID_SECOND]

describe('useStudentSelection', () => {
  it('starts with empty selection', () => {
    const { result } = renderHook(() => useStudentSelection())
    const { selectedIds, selectedCount } = result.current
    expect(selectedIds).toEqual([])
    expect(selectedCount).toBe(0)
  })

  it('toggles a student id on', () => {
    const { result } = renderHook(() => useStudentSelection())

    act(() => {
      result.current.toggle(ID_FIRST)
    })

    expect(result.current.selectedIds).toEqual([ID_FIRST])
    expect(result.current.selectedCount).toBe(1)
  })

  it('toggles a student id off', () => {
    const { result } = renderHook(() => useStudentSelection())

    act(() => {
      result.current.toggle(ID_FIRST)
    })
    act(() => {
      result.current.toggle(ID_FIRST)
    })

    expect(result.current.selectedIds).toEqual([])
  })

  it('selects all ids', () => {
    const { result } = renderHook(() => useStudentSelection())

    act(() => {
      result.current.selectAll(ALL_IDS)
    })

    expect(result.current.selectedIds).toEqual(ALL_IDS)
  })

  it('clears selection', () => {
    const { result } = renderHook(() => useStudentSelection())

    act(() => {
      result.current.selectAll(PAIR_IDS)
    })
    act(() => {
      result.current.clearSelection()
    })

    expect(result.current.selectedIds).toEqual([])
  })

  it('checks if id is selected', () => {
    const { result } = renderHook(() => useStudentSelection())

    act(() => {
      result.current.toggle(ID_FIFTH)
    })

    expect(result.current.isSelected(ID_FIFTH)).toBe(true)
    expect(result.current.isSelected(ID_OTHER)).toBe(false)
  })
})
