/**
 * Whether a keydown event is a single printable character typed without
 * modifiers (shift allowed). Named keys (Enter, ArrowLeft…), shortcuts and
 * IME composition inputs are not type-to-search candidates.
 */
export function isPrintableKeyEvent(event: KeyboardEvent): boolean {
  return event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey
}
