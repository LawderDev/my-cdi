import Box from '@mui/material/Box'
import { styled } from '@ui/helpers/styled'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { MONO_FONT_FAMILY } from '@ui/theme'

export const ICON_SIZE_PX = 40
export const ICON_FONT_SIZE_PX = 20
export const LABEL_FONT_SIZE_PX = 11
export const LABEL_FONT_WEIGHT = 600
export const VALUE_FONT_SIZE_PX = 28
export const VALUE_FONT_WEIGHT = 700
export const DELTA_FONT_SIZE_PX = 12
export const DELTA_FONT_WEIGHT = 500

export const StatCardIcon = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})<{ $bg: string; $color: string }>(({ $bg, $color }) => ({
  width: `${ICON_SIZE_PX}px`,
  height: `${ICON_SIZE_PX}px`,
  borderRadius: 'var(--radius-sm)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mb: 1.5,
  fontSize: `${ICON_FONT_SIZE_PX}px`,
  flexShrink: 0,
  bgcolor: $bg,
  color: $color
}))

export const StatCardLabel = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontSize: `${LABEL_FONT_SIZE_PX}px`,
  fontWeight: LABEL_FONT_WEIGHT,
  color: 'var(--text-dim)',
  textTransform: 'uppercase',
  letterSpacing: '0.8px',
  mb: 1
})

export const StatCardValue = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontFamily: MONO_FONT_FAMILY,
  fontSize: `${VALUE_FONT_SIZE_PX}px`,
  fontWeight: VALUE_FONT_WEIGHT,
  letterSpacing: '-1px',
  lineHeight: 1
})

export const StatCardDelta = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontSize: `${DELTA_FONT_SIZE_PX}px`,
  mt: 0.75,
  fontWeight: DELTA_FONT_WEIGHT,
  color: 'var(--danger)',
  '&[data-sign="up"]': {
    color: 'var(--success)'
  }
})
