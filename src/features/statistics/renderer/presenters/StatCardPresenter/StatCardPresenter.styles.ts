import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { FONT_WEIGHTS, MONO_FONT_FAMILY, RADII, TYPE_SCALE } from '@ui/theme'

export const ICON_SIZE_PX = 40
export const ICON_FONT_SIZE_PX = TYPE_SCALE.h5

export const StatCardIcon = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})<{ $bg: string; $color: string }>(({ theme, $bg, $color }) => ({
  width: `${ICON_SIZE_PX}px`,
  height: `${ICON_SIZE_PX}px`,
  borderRadius: RADII.small,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(1.5),
  fontSize: ICON_FONT_SIZE_PX,
  flexShrink: 0,
  backgroundColor: $bg,
  color: $color
}))

export const StatCardLabel = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  color: theme.palette.text.disabled,
  letterSpacing: '0.8px',
  marginBottom: theme.spacing(1)
}))

export const StatCardValue = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontFamily: MONO_FONT_FAMILY,
  fontWeight: FONT_WEIGHTS.bold,
  letterSpacing: '-1px',
  lineHeight: 1
})

export const StatCardDelta = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  marginTop: theme.spacing(0.75),
  color: theme.palette.error.main,
  '&[data-sign="up"]': {
    color: theme.palette.success.main
  }
}))
