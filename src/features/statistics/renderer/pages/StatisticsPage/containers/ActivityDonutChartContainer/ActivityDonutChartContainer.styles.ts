import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { MONO_FONT_FAMILY } from '@ui/theme'

export const CX = 70
export const CY = 70
export const SIZE = 140
export const VALUE_OFFSET = -4
export const LABEL_OFFSET = 12
export const VALUE_FONT_SIZE = 18
export const VALUE_FONT_WEIGHT = 700
export const LABEL_FONT_SIZE = 9
export const LABEL_FONT_WEIGHT = 500
export const FILL_OPACITY = 0.9
export const LEGEND_ITEM_FONT_SIZE_PX = 12
export const LEGEND_VALUE_FONT_SIZE_PX = 12
export const LEGEND_VALUE_FONT_WEIGHT = 600
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
  gap: theme.spacing(1),
  fontSize: `${LEGEND_ITEM_FONT_SIZE_PX}px`
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

export const LegendLabel = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  color: 'var(--text)',
  flex: 1
})

export const LegendValue = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontFamily: MONO_FONT_FAMILY,
  fontWeight: LEGEND_VALUE_FONT_WEIGHT,
  color: 'var(--title)',
  fontSize: `${LEGEND_VALUE_FONT_SIZE_PX}px`
})
