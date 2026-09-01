import Box from '@mui/material/Box'
import type { ReactNode } from 'react'
import { GRID_COLUMNS } from './ActivityGridPresenter.styles'

export interface ActivityGridPresenterProps {
  tileNodes: ReactNode[]
}

export function ActivityGridPresenter({ tileNodes }: ActivityGridPresenterProps) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`, gap: 1 }}>
      {tileNodes}
    </Box>
  )
}
