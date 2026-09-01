import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { MONO_FONT_FAMILY } from '@ui/theme'

const HEADER_HEIGHT_PX = 56
const PADDING_X_STEPS = 3.5
const GAP_MEDIUM = 2
const GAP_SMALL = 1.5

export const HeaderRoot = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  height: `${HEADER_HEIGHT_PX}px`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingInline: theme.spacing(PADDING_X_STEPS),
  borderBottom: `1px solid ${theme.palette.divider}`,
  flexShrink: 0,
  backgroundColor: theme.palette.background.default
}))

export const TitleBlock = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(GAP_MEDIUM)
}))

export const Title = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  letterSpacing: '-0.3px',
  color: theme.palette.text.primary
}))

export const Subtitle = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  color: theme.palette.text.disabled
}))

export const ClockArea = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(GAP_SMALL)
}))

export const Clock = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  fontFamily: MONO_FONT_FAMILY,
  fontSize: theme.typography.body1.fontSize,
  color: theme.palette.text.disabled
}))
