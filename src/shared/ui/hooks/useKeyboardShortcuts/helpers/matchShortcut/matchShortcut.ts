import type { KeyboardShortcut } from '../../types/KeyboardShortcut'

export function matchShortcut(event: KeyboardEvent, shortcut: KeyboardShortcut): boolean {
  if (event.key !== shortcut.key) {
    return false
  }
  const hasCtrlOrMeta = event.ctrlKey || event.metaKey
  if (shortcut.ctrlOrMeta && !hasCtrlOrMeta) {
    return false
  }
  if (!shortcut.ctrlOrMeta && hasCtrlOrMeta) {
    return false
  }
  if (shortcut.shift !== undefined && shortcut.shift !== event.shiftKey) {
    return false
  }
  if (shortcut.alt !== undefined && shortcut.alt !== event.altKey) {
    return false
  }
  return true
}
