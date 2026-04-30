import { Outlet, useNavigate } from 'react-router'
import Box from '@mui/material/Box'
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

const MAIN_PADDING_X = 3.5
const MAIN_PADDING_Y = 3

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
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', overflow: 'hidden' }}>
        <Header />
        <UpdateBanner />
        <Box
          component="main"
          sx={{ flex: 1, overflowY: 'auto', px: MAIN_PADDING_X, py: MAIN_PADDING_Y }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
