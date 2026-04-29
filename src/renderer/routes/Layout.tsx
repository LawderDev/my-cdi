import { Outlet } from 'react-router'
import { Box } from '@mui/material'

const MAIN_PADDING = 3

export function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box component="main" sx={{ flexGrow: 1, p: MAIN_PADDING }}>
        <Outlet />
      </Box>
    </Box>
  )
}
