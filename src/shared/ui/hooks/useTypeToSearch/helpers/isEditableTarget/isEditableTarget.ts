const EDITABLE_TAGS = ['INPUT', 'TEXTAREA', 'SELECT']

/**
 * Whether the event target is an editable element (text field, textarea,
 * select, or a contenteditable region) that should receive the keystroke
 * instead of being hijacked by type-to-search.
 */
export function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false
  }
  return (
    target.isContentEditable ||
    target.getAttribute('contenteditable') === 'true' ||
    EDITABLE_TAGS.includes(target.tagName)
  )
}
