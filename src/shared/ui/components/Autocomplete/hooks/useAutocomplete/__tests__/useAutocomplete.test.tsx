import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAutocomplete } from '../useAutocomplete'
import type { AutocompleteOption } from '../../../types/AutocompleteProps'

const STUDENT_ID_ALICE = 1
const STUDENT_ID_BOB = 2

const STUDENT_OPTIONS: AutocompleteOption<number>[] = [
  { value: STUDENT_ID_ALICE, label: 'Alice Martin' },
  { value: STUDENT_ID_BOB, label: 'Bob Dupont' }
]

function firstOption(): AutocompleteOption<number> {
  const option = STUDENT_OPTIONS[0]
  if (option === undefined) {
    throw new Error('missing fixture option')
  }
  return option
}

describe('useAutocomplete', () => {
  it('excludes the excluded values from the option list', () => {
    const { result } = renderHook(() =>
      useAutocomplete({
        options: STUDENT_OPTIONS,
        onSelect: () => undefined,
        excludedValues: [STUDENT_ID_ALICE]
      })
    )

    expect(result.current.options).toEqual([STUDENT_OPTIONS[1]])
  })

  it('labels options by their label field', () => {
    const { result } = renderHook(() =>
      useAutocomplete({ options: STUDENT_OPTIONS, onSelect: () => undefined })
    )
    const getOptionLabel = result.current.getOptionLabel

    expect(getOptionLabel?.(firstOption())).toBe('Alice Martin')
  })

  it('compares options by value', () => {
    const { result } = renderHook(() =>
      useAutocomplete({ options: STUDENT_OPTIONS, onSelect: () => undefined })
    )
    const isOptionEqualToValue = result.current.isOptionEqualToValue

    expect(isOptionEqualToValue?.(firstOption(), firstOption())).toBe(true)
  })
})
