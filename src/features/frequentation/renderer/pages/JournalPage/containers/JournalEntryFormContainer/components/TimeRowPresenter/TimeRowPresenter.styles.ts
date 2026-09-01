import ButtonBase from '@mui/material/ButtonBase'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import { styled } from '@ui/helpers/styled'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { MONO_FONT_FAMILY } from '@ui/theme'

export const TIME_ICON_FONT_SIZE_PX = 18
export const TIME_DISPLAY_FONT_SIZE_PX = 20
export const TIME_DISPLAY_FONT_WEIGHT = 600
export const TIME_PERIOD_FONT_SIZE_PX = 11
export const TIME_PERIOD_FONT_WEIGHT = 500

export const TimeRow = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  mb: 2
})

export const TimeButton = styled(ButtonBase, {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  borderRadius: 'var(--radius-xs)',
  px: 0.5,
  py: 0.25,
  transition: 'background 0.15s',
  '&:hover': { bgcolor: 'var(--surface)' },
  '&:focus-visible': { outline: '2px solid var(--accent-border)', outlineOffset: '2px' }
})

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
})({
  fontSize: `${TIME_PERIOD_FONT_SIZE_PX}px`,
  color: 'var(--text-dim)',
  fontWeight: TIME_PERIOD_FONT_WEIGHT,
  px: 1,
  py: 0.25,
  bgcolor: 'var(--surface)',
  borderRadius: 'var(--radius-xs)'
})
