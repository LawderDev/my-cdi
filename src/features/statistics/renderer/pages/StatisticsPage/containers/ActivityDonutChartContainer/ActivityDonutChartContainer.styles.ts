import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { FONT_WEIGHTS, MONO_FONT_FAMILY, TYPE_SCALE } from '@ui/theme'

export const CX = 70
export const CY = 70
export const SIZE = 140
export const VALUE_OFFSET = -4
export const LABEL_OFFSET = 12
export const VALUE_FONT_SIZE = TYPE_SCALE.h6
export const VALUE_FONT_WEIGHT = FONT_WEIGHTS.bold
export const LABEL_FONT_SIZE = TYPE_SCALE.caption
export const LABEL_FONT_WEIGHT = FONT_WEIGHTS.medium
export const FILL_OPACITY = 0.9
export const LEGEND_DOT_SIZE_PX = 8
export const LEGEND_DOT_BORDER_RADIUS_PX = 2

export const ChartBody = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3)
}))

export const ChartSvg = styled('svg', {
  shouldForwardProp: shouldForwardStyledProp
})({
  flexShrink: 0
})

export const LegendItem = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1)
}))

export const LegendDot = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})<{ $color: string }>(({ $color }) => ({
  width: `${LEGEND_DOT_SIZE_PX}px`,
  height: `${LEGEND_DOT_SIZE_PX}px`,
  borderRadius: `${LEGEND_DOT_BORDER_RADIUS_PX}px`,
  flexShrink: 0,
  background: $color
}))

export const LegendLabel = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  color: theme.palette.text.secondary,
  flex: 1
}))

export const LegendValue = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  fontFamily: MONO_FONT_FAMILY,
  fontWeight: FONT_WEIGHTS.semibold,
  color: theme.palette.text.primary
}))
