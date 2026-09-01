import Box from '@mui/material/Box'
import type { ReactNode } from 'react'
import { GRID_COLUMNS } from './ActivityGrid.styles'

export interface ActivityGridProps {
  tileNodes: ReactNode[]
}

export function ActivityGrid({ tileNodes }: ActivityGridProps) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`, gap: 1 }}>
      {tileNodes}
    </Box>
  )
}
