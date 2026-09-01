import { alpha, styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { Icon } from '@ui/components/Icon'
import { FONT_WEIGHTS, RADII, TINT_ALPHAS } from '@ui/theme'

export const BTN_HEIGHT_PX = 32

export const PeriodFilterRow = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexWrap: 'wrap'
}))

export const PeriodFilterButton = styled('button', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  height: `${BTN_HEIGHT_PX}px`,
  paddingInline: theme.spacing(1.75),
  borderRadius: RADII.small,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: FONT_WEIGHTS.medium,
  border: '1px solid',
  borderColor: theme.palette.divider,
  transition: theme.transitions.create(['background-color', 'border-color', 'color']),
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  cursor: 'pointer',
  backgroundColor: 'transparent',
  color: theme.palette.text.disabled,
  '&[data-active="true"]': {
    fontWeight: FONT_WEIGHTS.semibold,
    borderColor: alpha(theme.palette.primary.main, TINT_ALPHAS.border),
    backgroundColor: alpha(theme.palette.primary.main, TINT_ALPHAS.surface),
    color: theme.palette.primary.main
  },
  '&:hover': {
    borderColor: theme.palette.dividerStrong,
    color: theme.palette.text.primary
  },
  '&[data-active="true"]:hover': {
    borderColor: alpha(theme.palette.primary.main, TINT_ALPHAS.border),
    color: theme.palette.primary.main
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed'
  }
}))

export const PeriodFilterIcon = styled(Icon, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  fontSize: theme.typography.subtitle2.fontSize
}))
