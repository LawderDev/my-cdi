import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

const LOADING_MIN_HEIGHT_VH = 40

export const StatisticsLoadingShell = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: `${LOADING_MIN_HEIGHT_VH}vh`
}))

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
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '1fr'
  }
}))

export const StatisticsFullGrid = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr'
}))
