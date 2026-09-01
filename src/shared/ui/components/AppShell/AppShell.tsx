import { Outlet, useNavigate } from 'react-router'
import Box from '@mui/material/Box'
import { ROUTES } from '@lib/routes'
import { Sidebar } from '../Sidebar'
import { Header } from '../Header'
import { UpdateBanner } from '../UpdateBanner'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'
import type { KeyboardShortcut } from '../../hooks/useKeyboardShortcuts'
import { CONTENT_COLUMN_SX, MAIN_SX, SHELL_SX } from './AppShell.styles'

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
    <Box sx={SHELL_SX}>
      <Sidebar />
      <Box sx={CONTENT_COLUMN_SX}>
        <Header />
        <UpdateBanner />
        <Box component="main" sx={MAIN_SX}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
