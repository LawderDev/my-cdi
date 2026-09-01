import Box from '@mui/material/Box'
import type { ChartLegendPresenterProps } from './types/ChartLegendPresenterProps'

export function ChartLegendPresenter({ legendNodes }: ChartLegendPresenterProps) {
  return <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>{legendNodes}</Box>
}
