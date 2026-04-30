import { describe, it, expect, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useAutocomplete } from '../useAutocomplete'
import type { AutocompleteOption } from '../../../types/AutocompleteProps'

const STUDENT_ID_ALICE = 1
const STUDENT_ID_BOB = 2
const STUDENT_ID_CHARLIE = 3

const STUDENT_OPTIONS: AutocompleteOption<number>[] = [
  { value: STUDENT_ID_ALICE, label: 'Alice Martin' },
  { value: STUDENT_ID_BOB, label: 'Bob Dupont' },
  { value: STUDENT_ID_CHARLIE, label: 'Charlie Durand' }
]

describe('useAutocomplete', () => {
  it('returns all options when input is empty', () => {
    const { result } = renderHook(() =>
      useAutocomplete({ options: STUDENT_OPTIONS, onSelect: vi.fn() })
    )
    expect(result.current.filteredOptions).toHaveLength(STUDENT_OPTIONS.length)
  })

  it('filters by case-insensitive label match', () => {
    const { result } = renderHook(() =>
      useAutocomplete({ options: STUDENT_OPTIONS, onSelect: vi.fn() })
    )
    act(() => {
      result.current.setInputValue('aliCE')
    })
    expect(result.current.filteredOptions).toHaveLength(1)
    expect(result.current.filteredOptions[0]?.label).toBe('Alice Martin')
  })

  it('excludes values listed in excludedValues', () => {
    const { result } = renderHook(() =>
      useAutocomplete({
        options: STUDENT_OPTIONS,
        onSelect: vi.fn(),
        excludedValues: [STUDENT_ID_ALICE]
      })
    )
    expect(result.current.filteredOptions.map((o) => o.value)).toEqual([
      STUDENT_ID_BOB,
      STUDENT_ID_CHARLIE
    ])
  })

  it('truncates the result list to maxResults', () => {
    const TRUNCATED_LIMIT = 2
    const { result } = renderHook(() =>
      useAutocomplete({
        options: STUDENT_OPTIONS,
        onSelect: vi.fn(),
        maxResults: TRUNCATED_LIMIT
      })
    )
    expect(result.current.filteredOptions).toHaveLength(TRUNCATED_LIMIT)
  })

  it('opens the dropdown when setInputValue is called', () => {
    const { result } = renderHook(() =>
      useAutocomplete({ options: STUDENT_OPTIONS, onSelect: vi.fn() })
    )
    expect(result.current.isOpen).toBe(false)
    act(() => {
      result.current.setInputValue('a')
    })
    expect(result.current.isOpen).toBe(true)
  })

  it('starts with no highlight and isOpen=false', () => {
    const { result } = renderHook(() =>
      useAutocomplete({ options: STUDENT_OPTIONS, onSelect: vi.fn() })
    )
    expect(result.current.highlightedIndex).toBe(-1)
    expect(result.current.isOpen).toBe(false)
  })

  it('moves the highlight via highlight() helper', () => {
    const { result } = renderHook(() =>
      useAutocomplete({ options: STUDENT_OPTIONS, onSelect: vi.fn() })
    )
    act(() => {
      result.current.highlight(1)
    })
    expect(result.current.highlightedIndex).toBe(1)
  })

  it('selectAt invokes onSelect with the corresponding option', () => {
    const onSelect = vi.fn()
    const { result } = renderHook(() => useAutocomplete({ options: STUDENT_OPTIONS, onSelect }))
    act(() => {
      result.current.selectAt(0)
    })
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith(STUDENT_OPTIONS[0])
  })

  it('selectAt does nothing for an out-of-range index', () => {
    const onSelect = vi.fn()
    const { result } = renderHook(() => useAutocomplete({ options: STUDENT_OPTIONS, onSelect }))
    act(() => {
      result.current.selectAt(STUDENT_OPTIONS.length)
    })
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('clears the internal input after a selection in uncontrolled mode', () => {
    const onSelect = vi.fn()
    const { result } = renderHook(() => useAutocomplete({ options: STUDENT_OPTIONS, onSelect }))
    act(() => {
      result.current.setInputValue('alice')
    })
    expect(result.current.inputValue).toBe('alice')
    act(() => {
      result.current.selectAt(0)
    })
    expect(result.current.inputValue).toBe('')
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('open() opens the dropdown; close() closes it and clears highlight', () => {
    const { result } = renderHook(() =>
      useAutocomplete({ options: STUDENT_OPTIONS, onSelect: vi.fn() })
    )
    act(() => {
      result.current.open()
      result.current.highlight(1)
    })
    expect(result.current.isOpen).toBe(true)
    expect(result.current.highlightedIndex).toBe(1)
    act(() => {
      result.current.close()
    })
    expect(result.current.isOpen).toBe(false)
    expect(result.current.highlightedIndex).toBe(-1)
  })

  it('honors a controlled inputValue prop', () => {
    const onInputChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ inputValue }: { inputValue: string }) =>
        useAutocomplete({
          options: STUDENT_OPTIONS,
          onSelect: vi.fn(),
          inputValue,
          onInputChange
        }),
      { initialProps: { inputValue: 'alice' } }
    )
    expect(result.current.inputValue).toBe('alice')
    expect(result.current.filteredOptions).toHaveLength(1)

    act(() => {
      result.current.setInputValue('bob')
    })
    expect(onInputChange).toHaveBeenCalledWith('bob')

    rerender({ inputValue: 'bob' })
    expect(result.current.inputValue).toBe('bob')
  })
})
