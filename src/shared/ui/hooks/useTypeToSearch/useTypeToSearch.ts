import { useEffect } from 'react'
import type { RefObject } from 'react'
import { isPrintableKeyEvent } from './helpers/isPrintableKeyEvent'
import { isEditableTarget } from './helpers/isEditableTarget'

/**
 * Focuses the referenced input when the user starts typing while nothing is
 * focused (e.g. right after opening the app). The keydown handler never calls
 * preventDefault: the input is focused during the event, so the browser's
 * default text insertion lands in it and the character is not lost.
 */
export function useTypeToSearch(inputRef: RefObject<HTMLInputElement | null>) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isPrintableKeyEvent(event) || isEditableTarget(event.target)) {
        return
      }
      // Only when nothing is focused (document.body): keeps typing inside an
      // open dialog or menu from silently focusing the hidden input behind it.
      if (document.activeElement !== document.body) {
        return
      }
      inputRef.current?.focus()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [inputRef])
}
