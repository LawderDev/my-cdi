import Box from '@mui/material/Box'
import type { ChartLegendProps } from './types/ChartLegendProps'

export function ChartLegend({ legendNodes }: ChartLegendProps) {
  return <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>{legendNodes}</Box>
}
