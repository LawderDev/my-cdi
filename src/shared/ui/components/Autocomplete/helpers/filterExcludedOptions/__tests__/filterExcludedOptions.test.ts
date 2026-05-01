import { describe, it, expect } from 'vitest'
import { filterExcludedOptions } from '../filterExcludedOptions'

describe('filterExcludedOptions', () => {
  const options = [
    { value: 1, label: 'One' },
    { value: 2, label: 'Two' },
    { value: 3, label: 'Three' }
  ]

  it('returns all options when excludedValues is undefined', () => {
    const result = filterExcludedOptions(options, undefined)
    expect(result).toHaveLength(3)
  })

  it('filters out excluded values', () => {
    const result = filterExcludedOptions(options, [2])
    expect(result).toHaveLength(2)
    expect(result.map((o) => o.value)).toEqual([1, 3])
  })

  it('returns empty array when all values are excluded', () => {
    const result = filterExcludedOptions(options, [1, 2, 3])
    expect(result).toHaveLength(0)
  })
})
