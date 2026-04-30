import { Box } from '@mui/material'
import type { AppLayoutViewProps } from './types/AppLayoutViewProps'

const MAIN_PADDING = 3

export function AppLayoutView({ navbar, children }: AppLayoutViewProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {navbar}
      <Box component="main" sx={{ flexGrow: 1, p: MAIN_PADDING }}>
        {children}
      </Box>
    </Box>
  )
}
