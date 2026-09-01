import ButtonBase from '@mui/material/ButtonBase'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { MONO_FONT_FAMILY } from '@ui/theme'

export const TIME_ICON_FONT_SIZE_PX = 18
export const TIME_DISPLAY_FONT_SIZE_PX = 20
export const TIME_DISPLAY_FONT_WEIGHT = 600
export const TIME_PERIOD_FONT_SIZE_PX = 11
export const TIME_PERIOD_FONT_WEIGHT = 500

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
  borderRadius: 'var(--radius-xs)',
  paddingInline: theme.spacing(0.5),
  paddingBlock: theme.spacing(0.25),
  transition: 'background 0.15s',
  '&:hover': { backgroundColor: 'var(--surface)' },
  '&:focus-visible': { outline: '2px solid var(--accent-border)', outlineOffset: '2px' }
}))

export const TimeDisplay = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontFamily: MONO_FONT_FAMILY,
  fontSize: `${TIME_DISPLAY_FONT_SIZE_PX}px`,
  fontWeight: TIME_DISPLAY_FONT_WEIGHT,
  color: 'var(--accent)',
  letterSpacing: '1px'
})

export const HiddenTimePicker = styled(MobileTimePicker, {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'none'
})

export const PeriodBadge = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  fontSize: `${TIME_PERIOD_FONT_SIZE_PX}px`,
  color: 'var(--text-dim)',
  fontWeight: TIME_PERIOD_FONT_WEIGHT,
  paddingInline: theme.spacing(1),
  paddingBlock: theme.spacing(0.25),
  backgroundColor: 'var(--surface)',
  borderRadius: 'var(--radius-xs)'
}))
