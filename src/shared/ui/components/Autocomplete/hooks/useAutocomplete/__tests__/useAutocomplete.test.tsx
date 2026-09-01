import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAutocomplete } from '../useAutocomplete'
import type { AutocompleteOption } from '../../../types/AutocompleteProps'

const STUDENT_ID_ALICE = 1
const STUDENT_ID_BOB = 2

const STUDENT_OPTIONS: AutocompleteOption<number>[] = [
  { value: STUDENT_ID_ALICE, label: 'Alice Martin' },
  { value: STUDENT_ID_BOB, label: 'Bob Dupont' }
]

describe('useAutocomplete', () => {
  it('excludes the excluded values from the option list', () => {
    const { result } = renderHook(() =>
      useAutocomplete({
        options: STUDENT_OPTIONS,
        onSelect: vi.fn(),
        excludedValues: [STUDENT_ID_ALICE]
      })
    )

    expect(result.current.options).toEqual([STUDENT_OPTIONS[1]])
  })

  it('forwards selection and clears the input on change', () => {
    const onSelect = vi.fn()
    const onInputChange = vi.fn()
    const { result } = renderHook(() =>
      useAutocomplete<number>({ options: STUDENT_OPTIONS, onSelect, onInputChange })
    )

    result.current.onChange(null, STUDENT_OPTIONS[0] ?? null)

    expect(onSelect).toHaveBeenCalledWith(STUDENT_OPTIONS[0])
    expect(onInputChange).toHaveBeenCalledWith('')
  })

  it('ignores a null change value', () => {
    const onSelect = vi.fn()
    const { result } = renderHook(() => useAutocomplete({ options: STUDENT_OPTIONS, onSelect }))

    result.current.onChange(null, null)

    expect(onSelect).not.toHaveBeenCalled()
  })
})
