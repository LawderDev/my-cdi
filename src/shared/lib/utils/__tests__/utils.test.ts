import { describe, it, expect } from 'vitest'
import { generateId, assertNever } from '../utils'

describe('generateId', () => {
  it('returns a string', () => {
    const id = generateId()
    expect(typeof id).toBe('string')
  })

  it('returns unique values', () => {
    const ids = new Set(Array.from({ length: 100 }, generateId))
    expect(ids.size).toBe(100)
  })
})

describe('assertNever', () => {
  it('throws for any value at runtime', () => {
    expect(() => assertNever('test' as never)).toThrow()
  })
})
