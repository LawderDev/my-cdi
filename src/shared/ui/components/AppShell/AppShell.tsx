import { Outlet, useNavigate } from 'react-router'
import { ROUTES } from '@lib/routes'
import { Sidebar } from '../Sidebar'
import { Header } from '../Header'
import { UpdateBanner } from '../UpdateBanner'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'
import type { KeyboardShortcut } from '../../hooks/useKeyboardShortcuts'

const SHORTCUT_KEY_JOURNAL = '1'
const SHORTCUT_KEY_STATISTICS = '2'
const SHORTCUT_KEY_STUDENTS = '3'

export function AppShell() {
  const navigate = useNavigate()
  usePageTitle()

  const shortcuts: KeyboardShortcut[] = [
    { key: SHORTCUT_KEY_JOURNAL, ctrlOrMeta: true, handler: () => navigate(ROUTES.JOURNAL) },
    { key: SHORTCUT_KEY_STATISTICS, ctrlOrMeta: true, handler: () => navigate(ROUTES.STATISTICS) },
    { key: SHORTCUT_KEY_STUDENTS, ctrlOrMeta: true, handler: () => navigate(ROUTES.STUDENTS) }
  ]
  useKeyboardShortcuts(shortcuts)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <UpdateBanner />
        <main className="flex-1 overflow-y-auto px-7 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
