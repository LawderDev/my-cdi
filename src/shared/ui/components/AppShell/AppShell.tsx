import { Outlet } from 'react-router'
import Box from '@mui/material/Box'
import { Sidebar } from '../Sidebar'
import { Header } from '../Header'
import { UpdateBanner } from '../UpdateBanner'
import { usePageTitle } from '../../hooks/usePageTitle'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'
import { useAppShellShortcuts } from './hooks/useAppShellShortcuts'
import { CONTENT_COLUMN_SX, MAIN_SX, SHELL_SX } from './AppShell.styles'

export function AppShell() {
  usePageTitle()
  useKeyboardShortcuts(useAppShellShortcuts())

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