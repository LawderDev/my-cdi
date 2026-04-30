import { Outlet, useNavigate } from 'react-router'
import { ROUTES } from '@lib/routes'
import { Navbar } from '../Navbar'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'
import type { KeyboardShortcut } from '../../hooks/useKeyboardShortcuts'
import { AppLayoutView } from './components/AppLayoutView'

const SHORTCUT_KEY_JOURNAL = '1'
const SHORTCUT_KEY_STUDENTS = '2'
const SHORTCUT_KEY_STATISTICS = '3'

export function AppShell() {
  const navigate = useNavigate()
  usePageTitle()

  const shortcuts: KeyboardShortcut[] = [
    {
      key: SHORTCUT_KEY_JOURNAL,
      ctrlOrMeta: true,
      handler: () => navigate(ROUTES.JOURNAL)
    },
    {
      key: SHORTCUT_KEY_STUDENTS,
      ctrlOrMeta: true,
      handler: () => navigate(ROUTES.STUDENTS)
    },
    {
      key: SHORTCUT_KEY_STATISTICS,
      ctrlOrMeta: true,
      handler: () => navigate(ROUTES.STATISTICS)
    }
  ]
  useKeyboardShortcuts(shortcuts)

  return (
    <AppLayoutView navbar={<Navbar />}>
      <Outlet />
    </AppLayoutView>
  )
}
