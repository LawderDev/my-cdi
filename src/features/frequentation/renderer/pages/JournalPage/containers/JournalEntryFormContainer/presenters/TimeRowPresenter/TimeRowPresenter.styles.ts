import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import { alpha, styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { Icon } from '@ui/components/Icon'
import { FONT_WEIGHTS, MONO_FONT_FAMILY, RADII, TINT_ALPHAS, TYPE_SCALE } from '@ui/theme'

export const TIME_ICON_FONT_SIZE_PX = TYPE_SCALE.h6

export const TimeIcon = styled(Icon, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  fontSize: TIME_ICON_FONT_SIZE_PX,
  color: theme.palette.text.disabled
}))

export const TimeRow = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2)
}))

export const TimeButton = styled(ButtonBase, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  borderRadius: RADII.small,
  paddingInline: theme.spacing(0.5),
  paddingBlock: theme.spacing(0.25),
  transition: theme.transitions.create('background-color'),
  '&:hover': { backgroundColor: theme.palette.surface },
  '&:focus-visible': {
    outline: `2px solid ${alpha(theme.palette.primary.main, TINT_ALPHAS.border)}`,
    outlineOffset: '2px'
  }
}))

export const TimeDisplay = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  fontFamily: MONO_FONT_FAMILY,
  fontSize: theme.typography.h5.fontSize,
  fontWeight: FONT_WEIGHTS.semibold,
  color: theme.palette.primary.main,
  letterSpacing: '1px'
}))

export const HiddenTimePicker = styled(MobileTimePicker, {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'none'
})

export const PeriodBadge = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  color: theme.palette.text.disabled,
  paddingInline: theme.spacing(1),
  paddingBlock: theme.spacing(0.25),
  backgroundColor: theme.palette.surface,
  borderRadius: RADII.small
}))
