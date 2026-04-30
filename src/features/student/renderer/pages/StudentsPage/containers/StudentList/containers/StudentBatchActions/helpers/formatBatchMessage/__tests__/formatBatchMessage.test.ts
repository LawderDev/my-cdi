import { describe, it, expect } from 'vitest'
import { formatBatchMessage } from '../formatBatchMessage'

const SINGLE_ITEM = 1
const FIVE_ITEMS = 5
const ZERO_ITEMS = 0

describe('formatBatchMessage', () => {
  it('formats singular form for one item', () => {
    expect(formatBatchMessage(SINGLE_ITEM)).toBe('1 élève sélectionné')
  })

  it('formats plural form for multiple items', () => {
    expect(formatBatchMessage(FIVE_ITEMS)).toBe('5 élèves sélectionnés')
  })

  it('formats plural form for zero', () => {
    expect(formatBatchMessage(ZERO_ITEMS)).toBe('0 élève sélectionné')
  })
})
