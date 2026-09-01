import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const RESPONSIVE_BREAKPOINT_PX = 1100

export const StatisticsLoading = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  color: 'var(--text-dim)'
})

export const StatisticsLayout = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3)
}))

export const StatisticsChartGrid = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: theme.spacing(2.5),
  [`@media (max-width: ${RESPONSIVE_BREAKPOINT_PX}px)`]: {
    gridTemplateColumns: '1fr'
  }
}))
