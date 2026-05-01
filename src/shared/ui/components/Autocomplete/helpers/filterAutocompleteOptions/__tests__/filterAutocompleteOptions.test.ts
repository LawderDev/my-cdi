import { describe, it, expect } from 'vitest'
import { filterAutocompleteOptions } from '../filterAutocompleteOptions'

describe('filterAutocompleteOptions', () => {
  const options = [
    { value: 1, label: 'Apple' },
    { value: 2, label: 'Banana' },
    { value: 3, label: 'Cherry' },
    { value: 4, label: 'Apricot' }
  ]

  it('returns all candidates when input is empty', () => {
    const result = filterAutocompleteOptions(options, { inputValue: '' }, 10)
    expect(result).toHaveLength(4)
  })

  it('filters by label containing term (case insensitive)', () => {
    const result = filterAutocompleteOptions(options, { inputValue: 'ap' }, 10)
    expect(result).toHaveLength(2)
    expect(result.map((o) => o.label)).toEqual(['Apple', 'Apricot'])
  })

  it('limits results to maxResults', () => {
    const result = filterAutocompleteOptions(options, { inputValue: '' }, 2)
    expect(result).toHaveLength(2)
  })
})
