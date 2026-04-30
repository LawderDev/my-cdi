import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useKeyboardShortcuts } from '../useKeyboardShortcuts'
import type { KeyboardShortcut } from '../types/KeyboardShortcut'

const SHORTCUT_KEY_ONE = '1'
const SHORTCUT_KEY_TWO = '2'

function dispatchKey(options: KeyboardEventInit & { key: string }) {
  window.dispatchEvent(new KeyboardEvent('keydown', { ...options, bubbles: true }))
}

describe('useKeyboardShortcuts', () => {
  it('invokes the handler when a matching shortcut fires', () => {
    const handler = vi.fn()
    const shortcuts: KeyboardShortcut[] = [{ key: SHORTCUT_KEY_ONE, ctrlOrMeta: true, handler }]
    renderHook(() => useKeyboardShortcuts(shortcuts))
    dispatchKey({ key: SHORTCUT_KEY_ONE, ctrlKey: true })
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('does not invoke handlers for non-matching events', () => {
    const handler = vi.fn()
    const shortcuts: KeyboardShortcut[] = [{ key: SHORTCUT_KEY_ONE, ctrlOrMeta: true, handler }]
    renderHook(() => useKeyboardShortcuts(shortcuts))
    dispatchKey({ key: SHORTCUT_KEY_TWO, ctrlKey: true })
    expect(handler).not.toHaveBeenCalled()
  })

  it('removes the listener on unmount', () => {
    const handler = vi.fn()
    const shortcuts: KeyboardShortcut[] = [{ key: SHORTCUT_KEY_ONE, ctrlOrMeta: true, handler }]
    const { unmount } = renderHook(() => useKeyboardShortcuts(shortcuts))
    unmount()
    dispatchKey({ key: SHORTCUT_KEY_ONE, ctrlKey: true })
    expect(handler).not.toHaveBeenCalled()
  })
})
