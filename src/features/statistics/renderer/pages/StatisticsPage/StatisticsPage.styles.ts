import Box from '@mui/material/Box'
import { styled } from '@ui/helpers/styled'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const RESPONSIVE_BREAKPOINT_PX = 1100

export const StatisticsLoading = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  color: 'var(--text-dim)'
})

export const StatisticsLayout = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  flexDirection: 'column',
  gap: 3
})

export const StatisticsChartGrid = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: 2.5,
  [`@media (max-width: ${RESPONSIVE_BREAKPOINT_PX}px)`]: {
    gridTemplateColumns: '1fr'
  }
})
