import { useEffect } from 'react'
import { matchShortcut } from './helpers/matchShortcut'
import type { KeyboardShortcut } from './types/KeyboardShortcut'

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      for (const shortcut of shortcuts) {
        if (matchShortcut(event, shortcut)) {
          event.preventDefault()
          shortcut.handler()
          return
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [shortcuts])
}
