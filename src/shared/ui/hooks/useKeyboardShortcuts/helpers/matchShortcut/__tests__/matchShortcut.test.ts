import { describe, it, expect } from 'vitest'
import { matchShortcut } from '../matchShortcut'
import type { KeyboardShortcut } from '../../../types/KeyboardShortcut'

const SHORTCUT_KEY_ONE = '1'
const SHORTCUT_KEY_TWO = '2'

const BASE_SHORTCUT: KeyboardShortcut = {
  key: SHORTCUT_KEY_ONE,
  ctrlOrMeta: true,
  handler: () => {}
}

interface EventOverrides {
  key?: string
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
}

function makeEvent(overrides: EventOverrides = {}): KeyboardEvent {
  return new KeyboardEvent('keydown', {
    key: overrides.key ?? SHORTCUT_KEY_ONE,
    ctrlKey: overrides.ctrlKey ?? true,
    metaKey: overrides.metaKey ?? false,
    shiftKey: overrides.shiftKey ?? false,
    altKey: overrides.altKey ?? false
  })
}

describe('matchShortcut', () => {
  it('matches when key + ctrl matches', () => {
    expect(matchShortcut(makeEvent(), BASE_SHORTCUT)).toBe(true)
  })

  it('matches when key + meta matches and ctrlOrMeta is true', () => {
    expect(matchShortcut(makeEvent({ ctrlKey: false, metaKey: true }), BASE_SHORTCUT)).toBe(true)
  })

  it('does not match when key differs', () => {
    expect(matchShortcut(makeEvent({ key: SHORTCUT_KEY_TWO }), BASE_SHORTCUT)).toBe(false)
  })

  it('does not match when ctrl/meta is required but neither pressed', () => {
    expect(matchShortcut(makeEvent({ ctrlKey: false }), BASE_SHORTCUT)).toBe(false)
  })

  it('honors shift requirement', () => {
    const shortcut: KeyboardShortcut = { ...BASE_SHORTCUT, shift: true }
    expect(matchShortcut(makeEvent({ shiftKey: true }), shortcut)).toBe(true)
    expect(matchShortcut(makeEvent({ shiftKey: false }), shortcut)).toBe(false)
  })
})
