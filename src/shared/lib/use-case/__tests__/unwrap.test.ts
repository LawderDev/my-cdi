import { describe, it, expect } from 'vitest'
import { unwrap } from '../unwrap'

describe('unwrap', () => {
  it('returns data when result is successful', () => {
    const data = { id: 1, name: 'test' }
    expect(unwrap({ success: true, data })).toBe(data)
  })

  it('throws an Error with the result error when result fails', () => {
    expect(() => unwrap({ success: false, error: 'boom' })).toThrow('boom')
  })
})
