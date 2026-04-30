import { describe, it, expect } from 'vitest'
import { renderSortIndicator } from '../renderSortIndicator'

describe('renderSortIndicator', () => {
  it('returns empty string when field is not active', () => {
    expect(renderSortIndicator({ field: 'nom', direction: 'asc' }, 'classe')).toBe('')
  })

  it('returns ascending arrow when active and asc', () => {
    expect(renderSortIndicator({ field: 'nom', direction: 'asc' }, 'nom')).toBe(' ↑')
  })

  it('returns descending arrow when active and desc', () => {
    expect(renderSortIndicator({ field: 'nom', direction: 'desc' }, 'nom')).toBe(' ↓')
  })
})
