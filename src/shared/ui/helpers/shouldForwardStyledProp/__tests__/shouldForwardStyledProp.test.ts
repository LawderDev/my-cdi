import { describe, it, expect } from 'vitest'
import { shouldForwardStyledProp } from '../shouldForwardStyledProp'

const NON_STRING_PROP_KEY = 42

describe('shouldForwardStyledProp', () => {
  it('forwards regular props to the DOM', () => {
    expect(shouldForwardStyledProp('data-selected')).toBe(true)
    expect(shouldForwardStyledProp('aria-pressed')).toBe(true)
    expect(shouldForwardStyledProp('href')).toBe(true)
  })

  it('drops transient $ props', () => {
    expect(shouldForwardStyledProp('$isSelected')).toBe(false)
    expect(shouldForwardStyledProp('$padding')).toBe(false)
  })

  it('drops MUI runtime props that must not reach the DOM', () => {
    expect(shouldForwardStyledProp('sx')).toBe(false)
    expect(shouldForwardStyledProp('theme')).toBe(false)
    expect(shouldForwardStyledProp('as')).toBe(false)
    expect(shouldForwardStyledProp('ownerState')).toBe(false)
  })

  it('rejects non-string prop keys', () => {
    expect(shouldForwardStyledProp(NON_STRING_PROP_KEY)).toBe(false)
    expect(shouldForwardStyledProp(Symbol('x'))).toBe(false)
  })
})
