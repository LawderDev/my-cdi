import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { FONT_WEIGHTS, MONO_FONT_FAMILY } from '@ui/theme'

export const CHART_HEIGHT_PX = 180
export const BAR_MAX_WIDTH_PX = 36
export const BAR_MIN_HEIGHT_PX = 4
export const BAR_BORDER_RADIUS_PX = 6

export const BarChartRow = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  gap: theme.spacing(1),
  height: `${CHART_HEIGHT_PX}px`,
  paddingTop: theme.spacing(1)
}))

export const BarColumn = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(0.75),
  height: '100%',
  justifyContent: 'flex-end'
}))

export const BarValue = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  fontFamily: MONO_FONT_FAMILY,
  fontWeight: FONT_WEIGHTS.semibold,
  color: theme.palette.text.primary
}))

export const BarFill = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})<{ $heightPx: number; $color: string }>(({ theme, $heightPx, $color }) => ({
  width: '100%',
  maxWidth: `${BAR_MAX_WIDTH_PX}px`,
  borderTopLeftRadius: `${BAR_BORDER_RADIUS_PX}px`,
  borderTopRightRadius: `${BAR_BORDER_RADIUS_PX}px`,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: 'ease-out'
  }),
  cursor: 'default',
  minHeight: `${BAR_MIN_HEIGHT_PX}px`,
  height: `${$heightPx}px`,
  background: $color
}))

export const BarLabel = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  color: theme.palette.text.disabled,
  whiteSpace: 'nowrap'
}))
