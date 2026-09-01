import { useNavigate } from 'react-router'
import { ROUTES } from '@lib/routes'
import type { KeyboardShortcut } from '@ui/hooks/useKeyboardShortcuts'

const SHORTCUT_KEY_JOURNAL = '1'
const SHORTCUT_KEY_STATISTICS = '2'
const SHORTCUT_KEY_STUDENTS = '3'

export function useAppShellShortcuts(): KeyboardShortcut[] {
  const navigate = useNavigate()

  return [
    { key: SHORTCUT_KEY_JOURNAL, ctrlOrMeta: true, handler: () => navigate(ROUTES.JOURNAL) },
    { key: SHORTCUT_KEY_STATISTICS, ctrlOrMeta: true, handler: () => navigate(ROUTES.STATISTICS) },
    { key: SHORTCUT_KEY_STUDENTS, ctrlOrMeta: true, handler: () => navigate(ROUTES.STUDENTS) }
  ]
}
