import { describe, it, expect } from 'vitest'
import { formatDate, formatDateTime } from '../formatDate'

describe('formatDate', () => {
  it('formats a date string in French locale', () => {
    const result = formatDate('2024-12-25')
    expect(result).toBe('25/12/2024')
  })
})

describe('formatDateTime', () => {
  it('formats a datetime with time', () => {
    const result = formatDateTime('2024-12-25T14:30:00')
    expect(result).toContain('25/12/2024')
    expect(result).toContain('14')
  })
})
