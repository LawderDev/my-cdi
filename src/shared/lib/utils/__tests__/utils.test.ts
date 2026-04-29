import { describe, it, expect } from 'vitest'
import { generateId, assertNever } from '../utils'

describe('generateId', () => {
  it('returns a string', () => {
    const id = generateId()
    expect(typeof id).toBe('string')
  })

  const SAMPLE_COUNT = 100

  it('returns unique values', () => {
    const ids = new Set(Array.from({ length: SAMPLE_COUNT }, generateId))
    expect(ids.size).toBe(SAMPLE_COUNT)
  })
})

describe('assertNever', () => {
  it('throws for any value at runtime', () => {
    expect(() => assertNever('test' as never)).toThrow()
  })
})
