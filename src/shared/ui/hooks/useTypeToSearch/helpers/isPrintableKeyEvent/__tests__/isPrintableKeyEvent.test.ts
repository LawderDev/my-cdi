import { describe, it, expect } from 'vitest'
import { isPrintableKeyEvent } from '../isPrintableKeyEvent'

function keyEvent(key: string, overrides: Partial<KeyboardEventInit> = {}): KeyboardEvent {
  return new KeyboardEvent('keydown', {
    key,
    ctrlKey: false,
    metaKey: false,
    altKey: false,
    shiftKey: false,
    ...overrides
  })
}

describe('isPrintableKeyEvent', () => {
  it('accepts a plain single character', () => {
    expect(isPrintableKeyEvent(keyEvent('a'))).toBe(true)
  })

  it('accepts an accented character and allows shift', () => {
    expect(isPrintableKeyEvent(keyEvent('é'))).toBe(true)
    expect(isPrintableKeyEvent(keyEvent('A', { shiftKey: true }))).toBe(true)
  })

  it('rejects named keys', () => {
    expect(isPrintableKeyEvent(keyEvent('Enter'))).toBe(false)
    expect(isPrintableKeyEvent(keyEvent('ArrowLeft'))).toBe(false)
    expect(isPrintableKeyEvent(keyEvent('Backspace'))).toBe(false)
  })

  it('rejects ctrl/meta/alt combinations', () => {
    expect(isPrintableKeyEvent(keyEvent('a', { ctrlKey: true }))).toBe(false)
    expect(isPrintableKeyEvent(keyEvent('a', { metaKey: true }))).toBe(false)
    expect(isPrintableKeyEvent(keyEvent('a', { altKey: true }))).toBe(false)
  })
})
