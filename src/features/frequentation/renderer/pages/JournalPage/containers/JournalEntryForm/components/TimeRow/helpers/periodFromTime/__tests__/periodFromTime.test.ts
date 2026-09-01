import { describe, it, expect } from 'vitest'
import { periodFromTime } from '../periodFromTime'

const MORNING_TIME = '08:30'
const NOON_TIME = '12:00'
const AFTERNOON_TIME = '14:15'
const INVALID_TIME = 'invalid'

describe('periodFromTime', () => {
  it('returns morning before noon', () => {
    expect(periodFromTime(MORNING_TIME)).toBe('morning')
  })

  it('returns afternoon at noon and after', () => {
    expect(periodFromTime(NOON_TIME)).toBe('afternoon')
    expect(periodFromTime(AFTERNOON_TIME)).toBe('afternoon')
  })

  it('returns morning for unparseable times', () => {
    expect(periodFromTime(INVALID_TIME)).toBe('morning')
  })
})
